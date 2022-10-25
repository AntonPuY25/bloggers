import jwt from 'jsonwebtoken'
import {settings} from "../settings/settings";
import {CreateJWTTokenType, JWTTokenType, RegisterUserType} from "../interfaces/registration-types/interface";
import {usersRepository} from "../Repositories/users-repository";


export const jwtService = {
    async createJwt({expiresIn, user, type}: CreateJWTTokenType) {
        const token = jwt.sign({userId: user.id},
            settings.JWT_SECRET,
            {expiresIn})

        return type === JWTTokenType.accessToken ? {
            resultCode: 0,
            data: {
                accessToken: token
            }
        } : token;

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
                    const deadRefreshTokens = [...currentUser.userData.deadRefreshTokens];
                    deadRefreshTokens.push(token)
                    await usersRepository.updateJwtTokensUser(currentUser.id,deadRefreshTokens)
                    const newRefreshToken = await this.createJwt({expiresIn:'1m',type:JWTTokenType.refreshToken,user:currentUser})
                    const newAccessToken = await this.createJwt({expiresIn:'20s',type:JWTTokenType.accessToken,user:currentUser})
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
    }
}