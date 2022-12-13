import {UsersModel} from "../DB/users-scheme";
import {
    FindBySaltUserTypes,
    RegisterUserType,
    RegistrationConfirmationBodyTypes,
    RegistrationResendingEmailBodyTypes, UpdateCurrentUserSaltType,
} from "../interfaces/registration-types/interface";
import {v4 as uuidv4} from "uuid";

class UsersRepository {
    async createUser(userDb: RegisterUserType) {
        const user = new UsersModel(userDb)

        try {
            const result: any = await user.save()
            if (result && result.userData && result.emailConfirmation) {
                return {
                    id: uuidv4(),
                    userData: {
                        login: result.userData.login,
                        password: result.userData.password,
                        salt: result.userData.salt,
                        email: result.userData.email,
                        deadRefreshTokens: result.userData.deadRefreshTokens,
                    },
                    emailConfirmation: {
                        confirmationCode: result.emailConfirmation.confirmationCode,
                        expirationDate: result.emailConfirmation.expirationDate,
                        isConfirmed: result.emailConfirmation.isConfirmed,
                    },
                    createdAt: result?.createdAt,
                }
            }
        } catch (e) {
            return null
        }

    }

    async updateCodeUser(id: string, code: string) {
        try {
            await UsersModel.updateOne({id}, {
                $set: {
                    'emailConfirmation.confirmationCode': code
                }
            })
            return true
        } catch (e) {
            return null
        }
    }

    async getCurrentUser(login: string) {
        return UsersModel.find({'userData.login': login})
            .then((result: any) => result[0])
            .catch(() => null)
    }

    async getCurrentUserById(id: string) {
        return UsersModel.find({'id': id})
            .then((result: any) => result[0])
            .catch(() => null)
    }

    async getCurrentUserByCode({code}: RegistrationConfirmationBodyTypes) {
        return UsersModel.find({'emailConfirmation.confirmationCode': code})
            .then((result: any) => result[0])
            .catch(() => null)
    }

    async getCurrentUserByEmail({email}: RegistrationResendingEmailBodyTypes) {
        return UsersModel.find({'userData.email': email})
            .then((result: any) => result[0])
            .catch(() => null)
    }

    async getCurrentUserByPassword({password}: FindBySaltUserTypes) {
        return UsersModel.find({'userData.password': password})
            .then((result: any) => result[0])
            .catch(() => null)
    }

    async confirmEmail(id: string) {
        return UsersModel.updateOne({id}, {
            $set: {
                'emailConfirmation.isConfirmed': true
            }

        })
            .then((result: any) => result)
            .catch(() => null)
    }

    async updatedCurrentUserPassword({id, passwordHash, passwordSalt}: UpdateCurrentUserSaltType) {
        try {
            await UsersModel.updateOne({id}, {
                $set: {
                    'userData.password': passwordHash,
                    'userData.salt': passwordSalt,
                }
            })
            return true
        } catch (e) {
            return null
        }
    }
}

export const usersRepository = new UsersRepository();