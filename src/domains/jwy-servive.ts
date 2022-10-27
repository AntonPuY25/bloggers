import jwt from 'jsonwebtoken'
import {settings} from "../settings/settings";
import {CreateJWTTokenType, RegisterUserType} from "../interfaces/registration-types/interface";
import {usersRepository} from "../Repositories/users-repository";


export const jwtService = {
    async createJwt({expiresIn, user}: CreateJWTTokenType) {
        const token = jwt.sign({userId: user.id},
            settings.JWT_SECRET,
            {expiresIn})

        return  token;

    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (e) {

            return null
        }
    },

    async refreshToken(token:string){
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)

            if(result){
                const currentUser:RegisterUserType|undefined = await usersRepository.getCurrentUserById(result.userId)
                if(currentUser){
                    const deadRefreshTokensFromBd = [...currentUser.userData.deadRefreshTokens]
                    if(deadRefreshTokensFromBd.includes(token)){
                        return null
                    }
                        deadRefreshTokensFromBd.push(token)
                    await usersRepository.updateJwtTokensUser(currentUser.id,deadRefreshTokensFromBd)
                    const newRefreshToken = await this.createJwt({expiresIn:'20s',user:currentUser})
                    const newAccessToken = await this.createJwt({expiresIn:'10s',user:currentUser})
                    return {
                        refreshToken: newRefreshToken,
                        accessToken: newAccessToken
                    }
                }
            }
            return null;

        } catch (e) {
            return null
        }
    },

    async logout(refresh_token:string){
        const currentUserId = await this.getUserIdByToken(refresh_token)
        if(!currentUserId) return null;
        const currentUser:RegisterUserType|undefined = await usersRepository.getCurrentUserById(currentUserId)
        if(!currentUser) return null

        const deadRefreshTokensFromBd = [...currentUser.userData.deadRefreshTokens]

        if(deadRefreshTokensFromBd.includes(refresh_token)){
            return null
        }
        deadRefreshTokensFromBd.push(refresh_token)
        await usersRepository.updateJwtTokensUser(currentUser.id,deadRefreshTokensFromBd)

        return true

    }
}