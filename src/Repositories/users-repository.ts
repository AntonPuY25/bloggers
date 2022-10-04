import {UsersType, UserWithPasswordType} from "../interfaces/interfaces";
import {UsersModel} from "../DB/users-scheme";
import bcrypt from 'bcrypt';
import {getGeneratedHashPassword} from "../helpers/helpers";


export const usersRepository = {

    async createUser(newUser: UserWithPasswordType) {
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await getGeneratedHashPassword(newUser.password, passwordSalt)
        console.log(passwordHash,'passwordHash')
        const currentUser = new UsersModel({...newUser, password: passwordHash, salt: passwordSalt})
        return currentUser.save()
            .then((result: any) => {
                if (result) {
                    return {
                        id: result.id,
                        email: result.email,
                        login: result.login,
                        createdAt: result.createdAt,
                    } as UsersType
                }
            })
            .catch(() => null)
    },
    async getCurrentUser(login:string) {

        return UsersModel.find({login})
            .then((result: any) =>result[0])
            .catch(() => null)
    }

}