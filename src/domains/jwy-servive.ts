import {UsersType} from "../interfaces/interfaces";
import jwt from 'jsonwebtoken'
import {settings} from "../settings/settings";
import {RegisterUserType} from "../interfaces/registration-types/interface";


export const jwtService = {
    async createJwt(user: RegisterUserType) {
        const token = jwt.sign({userId: user.id},
            settings.JWT_SECRET,
            {expiresIn: '1h'})

        return {
            resultCode: 0,
            data: {
                accessToken: token
            }
        }
    },

    async getUserIdNyToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)

            return result.userId

        } catch (e) {
            return null
        }
    }
}