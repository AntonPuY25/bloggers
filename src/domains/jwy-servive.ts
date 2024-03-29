import jwt from 'jsonwebtoken'
import {settings} from "../settings/settings";
import {
    CreateJWTTokenType,
    JWTTokenMethodType,
    JWTTokenType,
    RegisterUserType
} from "../interfaces/registration-types/interface";
import {ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME} from "../interfaces/registration-types/constants";
import {UsersRepository} from "../Repositories/users-repository";
import {TokensRepository} from "../Repositories/tokens-repository";

export class JwtService {

    constructor(protected usersRepository: UsersRepository,
                protected tokensRepository: TokensRepository) {
    }

    async createJwt({expiresIn, user, type, deviceId, device, methodType, ip}: CreateJWTTokenType) {
        const token = jwt.sign({deviceId, userId: user.id},
            settings.JWT_SECRET,
            {expiresIn})

        const verifyToken: any = jwt.verify(token, settings.JWT_SECRET);

        const createdToken = {
            userId: user.id,
            deviceId,
            deviceName: device,
            ip: ip || '',
            issueAt: new Date(verifyToken.iat).toISOString(),
            finishedDate: new Date(verifyToken.exp).toISOString(),
        };


        if (type === JWTTokenType.refreshToken && verifyToken) {
            methodType === JWTTokenMethodType.create ?
                await this.tokensRepository.setToken(createdToken)
                : await this.tokensRepository.updateTokenByDeviceId({token: createdToken})
        }

        return token;
    }

    async getUserIdByToken(token: string) {

        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)

            const currentToken = await this.tokensRepository.getUserItByDeviceID({
                deviceId: result.deviceId,
                issueAt: new Date(result.iat).toISOString()
            })

            if (!currentToken) {
                return null
            }

            return currentToken.userId;

        } catch (e) {
            return null

        }
    }

    async refreshToken(token: string, ip?: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)

            if (result) {
                const currentDevice = await this.tokensRepository.getUserItByDeviceID({
                    deviceId: result.deviceId,
                    issueAt: new Date(result.iat).toISOString()
                })

                if (!currentDevice) return null;

                const currentUser: RegisterUserType | undefined = await this.usersRepository.getCurrentUserById(currentDevice.userId)
                if (currentUser) {
                    const newRefreshToken = await this.createJwt({
                        expiresIn: REFRESH_TOKEN_TIME,
                        user: currentUser,
                        type: JWTTokenType.refreshToken,
                        deviceId: result.deviceId,
                        device: currentDevice.deviceName,
                        methodType: JWTTokenMethodType.update,
                        ip,
                    })

                    const newAccessToken = await this.createJwt({
                        expiresIn: ACCESS_TOKEN_TIME,
                        user: currentUser,
                        type: JWTTokenType.accessToken,
                        deviceId: result.deviceId,
                        device: currentDevice.deviceName,
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
    }

    async logout(userId: string) {

        const currentUser: RegisterUserType | undefined = await this.usersRepository.getCurrentUserById(userId)
        if (!currentUser) return null
        return true

    }

    async getCurrentIssueAt(token: string) {
        try {
            const verifyToken: any = jwt.verify(token, settings.JWT_SECRET);
            if (!verifyToken) return null;
            if (verifyToken) {
                return {
                    issueAt: new Date(verifyToken.iat).toISOString(),
                    userId: verifyToken.userId,
                }
            }
        } catch (e) {
            return null
        }

    }

    async getCurrentDeviceId(token: string) {
        try {
            const verifyToken: any = jwt.verify(token, settings.JWT_SECRET);
            if (!verifyToken) return null;
            if (verifyToken) {
                return {
                    userId: verifyToken.userId,
                    deviceId: verifyToken.deviceId,
                };
            }
        } catch (e) {
            return null
        }

    }
}