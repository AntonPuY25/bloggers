import {UsersModel} from "../DB/users-scheme";
import {
    RegisterUserType,
    RegistrationConfirmationBodyTypes,
    RegistrationResendingEmailBodyTypes, UpdateUserType
} from "../interfaces/registration-types/interface";


export const usersRepository = {
        async createUser(userDb: RegisterUserType) {
            const user = new UsersModel(userDb)

            try {
                const result = await user.save()
                if (result) {
                    return userDb;
                }
            } catch (e) {
                return null
            }

        },
    async updateUser(id: string, code: string) {
        try {
            await UsersModel.updateOne({id},{
                $set:{
                    'emailConfirmation.confirmationCode':code
                }
            })
            return true
        } catch (e) {
            return null
        }

    },
    async getCurrentUser(login: string) {
        return UsersModel.find({'userData.login':login})
            .then((result: any) => result[0])
            .catch(() => null)
    },
    async getCurrentUserByCode({code}: RegistrationConfirmationBodyTypes) {
        return UsersModel.find({'emailConfirmation.confirmationCode': code})
            .then((result: any) => result[0])
            .catch(() => null)
    },

    async getCurrentUserByEmail({email}: RegistrationResendingEmailBodyTypes) {
        return UsersModel.find({'userData.email': email})
            .then((result: any) => result[0])
            .catch(() => null)
    },

    async confirmEmail (id: string) {
        return UsersModel.updateOne({id}, {
            $set: {
                'emailConfirmation.isConfirmed':true
            }

        })
            .then((result: any) => result)
            .catch(() => null)
    },
}