import {AuthRecoveryPasswordType, AuthRequestBodyType} from "../interfaces/interfaces";
import {UsersRepository} from "../Repositories/users-repository";
import {getGeneratedHashPassword, isConfirmedEmailError} from "../helpers/helpers";
import {
    RegisterUserType,
    RegistrationBodyTypes,
    RegistrationConfirmationBodyTypes, RegistrationResendingEmailBodyTypes
} from "../interfaces/registration-types/interface";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import {add} from "date-fns";
import {emailManager} from "../managers/email-manager";
import {emailAdapter} from "../adapters/email-adapter";


export class AuthService {
    usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async registerUser({email, login, password}: RegistrationBodyTypes) {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await getGeneratedHashPassword(password, passwordSalt)
        const userDb: RegisterUserType = {
            id: uuidv4(),
            userData: {
                login,
                password: passwordHash,
                salt: passwordSalt,
                email,
                deadRefreshTokens: []
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1
                }),
                isConfirmed: false,
            }
        }

        const currentUser = await this.usersRepository.createUser(userDb)
        if (currentUser) {
            const email = await emailManager.getRecoveryMessageEmailByUser(currentUser)
            const sentEmail = await emailAdapter.sendEmail(email)

            if (sentEmail) {
                return currentUser
            } else {
                return null;
            }

        } else {
            return null;
        }
    }

    async confirmEmail({code}: RegistrationConfirmationBodyTypes) {

        const currentUser: RegisterUserType = await this.usersRepository.getCurrentUserByCode({code})

        if (currentUser) {
            if (currentUser.emailConfirmation.isConfirmed) return isConfirmedEmailError('code')
            if (currentUser.emailConfirmation.expirationDate < new Date()) return {
                isError: true,
                message: isConfirmedEmailError('code')
            };

            const updatedUser = await this.usersRepository.confirmEmail(currentUser.id)

            if (updatedUser) {
                return {
                    isError: false,
                    message: ''
                }
            }

        } else {

            return {
                isError: true,
                message: {errorsMessages: [{message: 'This User is not found', field: 'code'}]}
            }
        }

    }

    async resendEmail({email}: RegistrationResendingEmailBodyTypes) {

        const currentUser: RegisterUserType = await this.usersRepository.getCurrentUserByEmail({email})

        if (currentUser) {
            if (currentUser.emailConfirmation.isConfirmed) return isConfirmedEmailError('email')

            const newCode = uuidv4()

            const isUpdatedUser = await this.usersRepository.updateCodeUser(currentUser.id, newCode)

            if (isUpdatedUser) {
                const email = await emailManager.getRecoveryMessageEmailByConfirmationCode(currentUser.userData.email, newCode)
                const sentEmail = await emailAdapter.sendEmail(email)

                if (sentEmail) {
                    return {
                        isError: false,
                        message: '',
                    }
                }
            }

        } else {
            return {
                isError: true,
                message: {errorsMessages: [{message: 'This User is not found', field: 'email'}]},
            }
        }
    }

    async authUser({loginOrEmail, password}: AuthRequestBodyType) {
        const currentUser: RegisterUserType = await this.usersRepository.getCurrentUser(loginOrEmail);

        if (!currentUser) return null;

        const passwordSalt = currentUser.userData.salt;
        const passwordHash = await getGeneratedHashPassword(password, passwordSalt)
        if (passwordHash === currentUser.userData.password) return currentUser;

        return null
    }

    async recoveryPassword({email, code}: AuthRecoveryPasswordType) {

        const currentEmailMessage = await emailManager.getRecoveryPasswordEmailMessage(email, code);

        const sentEmail = await emailAdapter.sendEmail(currentEmailMessage)

        if (sentEmail) {
            return {
                isError: false,
                message: 'Success',
            }
        }

        return null;
    }
}
