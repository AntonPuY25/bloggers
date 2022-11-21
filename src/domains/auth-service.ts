import {AuthRequestBodyType} from "../interfaces/interfaces";
import {usersRepository} from "../Repositories/users-repository";
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



export const authService = {

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
                deadRefreshTokens:[]
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1
                }),
                isConfirmed: false,
            }
        }

        const currentUser = await usersRepository.createUser(userDb)
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
    },

    async confirmEmail({code}: RegistrationConfirmationBodyTypes) {

        const currentUser: RegisterUserType = await usersRepository.getCurrentUserByCode({code})

        if (currentUser) {
            if (currentUser.emailConfirmation.isConfirmed) return isConfirmedEmailError('code')
            if (currentUser.emailConfirmation.expirationDate < new Date()) return {
                isError:true,
                message:isConfirmedEmailError('code')
            };

            const updatedUser = await usersRepository.confirmEmail(currentUser.id)

            if (updatedUser) {
                return {
                    isError: false,
                    message: ''
                }
            }

        } else {
            return {
                isError:true,
                message:{ errorsMessages: [{ message: 'This User is not found', field: 'code' }] }
            }
        }

    },

    async resendEmail({email}: RegistrationResendingEmailBodyTypes) {

        const currentUser: RegisterUserType = await usersRepository.getCurrentUserByEmail({email})

        if (currentUser) {
            if (currentUser.emailConfirmation.isConfirmed) return isConfirmedEmailError('email')

            const newCode = uuidv4()

            const isUpdatedUser = await usersRepository.updateCodeUser(currentUser.id , newCode)

            if(isUpdatedUser){
                const email = await emailManager.getRecoveryMessageEmailByConfirmationCode(currentUser.userData.email,newCode)
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
                isError:true,
                message: { errorsMessages: [{ message: 'This User is not found', field: 'email' }] },
            }
        }

    },

    async authUser({login, password}: AuthRequestBodyType) {
        const currentUser:RegisterUserType = await usersRepository.getCurrentUser(login);

        if (!currentUser) return null

        const passwordSalt = currentUser.userData.salt;
        const passwordHash = await getGeneratedHashPassword(password, passwordSalt)
        if (passwordHash === currentUser.userData.password) return currentUser;

        return null
    }
}