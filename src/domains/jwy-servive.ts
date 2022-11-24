import jwt from 'jsonwebtoken'
import {settings} from "../settings/settings";
import {
    CreateJWTTokenType,
    JWTTokenMethodType,
    JWTTokenType,
    RegisterUserType
} from "../interfaces/registration-types/interface";
import {usersRepository} from "../Repositories/users-repository";
import {tokensRepository} from "../Repositories/tokens-repository";
import {ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME} from "../interfaces/registration-types/constants";


export const jwtService = {
    async createJwt({expiresIn, user, type, deviceId, device, methodType,ip}: CreateJWTTokenType) {
        const token = jwt.sign({deviceId},
            settings.JWT_SECRET,
            {expiresIn})

        const verifyToken: any = jwt.verify(token, settings.JWT_SECRET);

        const createdToken = {
            userId: user.id,
            deviceId,
            deviceName: device,
            ip: ip || '',
            issueAt: new Date(verifyToken.iat).toISOString(),
            finishedDate: verifyToken.exp
        };

        if (type === JWTTokenType.refreshToken && verifyToken) {
            methodType === JWTTokenMethodType.create ?
                await tokensRepository.setToken(createdToken)
                : await tokensRepository.updateTokenByDeviceId({token: createdToken})
        }

        return token;

    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            console.log(result,'result')
            console.log(new Date(result.iat).toISOString(),'new Date(result.iat).toISOString()')
            const currentToken = await tokensRepository.getUserItByDeviceID({
                deviceId: result.deviceId,
                issueAt: new Date(result.iat).toISOString()
            })
            console.log(currentToken,'currentToken')

            if (!currentToken) {
                return null
            }
            return currentToken.userId;
        } catch (e) {
            return null

        }
    },


    async refreshToken(token: string, device?: string, ip?:string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)

            if (result) {
                const currentToken = await tokensRepository.getUserItByDeviceID({
                    deviceId: result.deviceId,
                    issueAt: new Date(result.iat).toISOString()
                })

                if (!currentToken) return null;

                const currentUser: RegisterUserType | undefined = await usersRepository.getCurrentUserById(currentToken.userId)
                if (currentUser) {

                    const newRefreshToken = await this.createJwt({
                        expiresIn: ACCESS_TOKEN_TIME,
                        user: currentUser,
                        type: JWTTokenType.refreshToken,
                        deviceId:result.deviceId,
                        device,
                        methodType: JWTTokenMethodType.update,
                        ip,
                    })

                    const newAccessToken = await this.createJwt({
                        expiresIn: REFRESH_TOKEN_TIME,
                        user: currentUser,
                        type: JWTTokenType.accessToken,
                        deviceId:result.deviceId,
                        device,
                        methodType: JWTTokenMethodType.update,
                        ip,
                    })

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

    async logout(refresh_token: string) {
        const currentUserId = await this.getUserIdByToken(refresh_token)
        if (!currentUserId) return null;
        const currentUser: RegisterUserType | undefined = await usersRepository.getCurrentUserById(currentUserId)
        if (!currentUser) return null
        return true

    },
    async getCurrentIssueAt(token:string){
       try{
           const verifyToken: any = jwt.verify(token, settings.JWT_SECRET);
           if(!verifyToken) return  null;
           if(verifyToken){
               return new Date(verifyToken.iat).toISOString();
           }
       }catch (e) {
           return null
       }

    },
    async getCurrentDeviceId(token:string){
       try{
           const verifyToken: any = jwt.verify(token, settings.JWT_SECRET);
           if(!verifyToken) return  null;
           if(verifyToken){
               return verifyToken.deviceId;
           }
       }catch (e) {
           return null
       }

    }
}