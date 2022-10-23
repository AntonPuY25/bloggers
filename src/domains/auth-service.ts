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
import {isError} from "util";


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
            const email = await emailManager.getRecoveryMessageEmail(currentUser)
            const sentEmail = await emailAdapter.sendEmail(email)

            if (sentEmail) {
                return {
                    message: 'Hello'
                }
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
            if (currentUser.emailConfirmation.isConfirmed) return isConfirmedEmailError()
            if (currentUser.emailConfirmation.expirationDate < new Date()) return {
                isError:true,
                message:''
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
                message:''
            }
        }

    },

    async resendEmail({email}: RegistrationResendingEmailBodyTypes) {

        const currentUser: RegisterUserType = await usersRepository.getCurrentUserByEmail({email})

        if (currentUser) {
            if (currentUser.emailConfirmation.isConfirmed) return isConfirmedEmailError()
            const email = await emailManager.getRecoveryMessageEmail(currentUser)
            const sentEmail = await emailAdapter.sendEmail(email)

            if (sentEmail) {
                return {
                    isError:false,
                    message: '',
                }
            }

        } else {
            return {
                isError:true,
                message: '',
            }
        }

    },

    async authUser({login, password}: AuthRequestBodyType) {

        const currentUser = await usersRepository.getCurrentUser(login);
        if (!currentUser) return null

        const passwordSalt = currentUser.salt;
        const passwordHash = await getGeneratedHashPassword(password, passwordSalt)
        if (passwordHash === currentUser.password) return currentUser;

        return null
    }
}