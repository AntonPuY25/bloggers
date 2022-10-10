import {AuthRequestBodyType} from "../interfaces/interfaces";
import {usersRepository} from "../Repositories/users-repository";
import {getGeneratedHashPassword} from "../helpers/helpers";

export const authService = {

    async authUser({login, password}: AuthRequestBodyType) {

        const currentUser = await usersRepository.getCurrentUser(login);

        if (currentUser) {
            const passwordSalt = currentUser.salt;
            const passwordHash = await getGeneratedHashPassword(password, passwordSalt)

            if (passwordHash === currentUser.password) {
                return currentUser
            }
            return null
        } else {
            return null
        }


    }

}