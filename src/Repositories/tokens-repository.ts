import {
    CreateTokensProps,
    GetUserItByDeviceIDProps,
    UpdateTokenByIdProps
} from "../interfaces/registration-types/interface";
import {TokensModel} from "../DB/tokens-scheme";

export class TokensRepository {
    async setToken({issueAt, ip, userId, deviceName, deviceId, finishedDate}: CreateTokensProps) {
        const currentToken: CreateTokensProps = {
            ip, issueAt, finishedDate, userId, deviceName, deviceId
        };
        const tokenResult = new TokensModel(currentToken)

        try {
            return await tokenResult.save()
        } catch (e) {
            return null
        }
    }

    async getUserItByDeviceID({deviceId, issueAt}: GetUserItByDeviceIDProps) {
        try {
            return await TokensModel.findOne({deviceId, lastActiveDate: issueAt})
        } catch (e) {
            return null
        }
    }

    async updateTokenByDeviceId({token}: UpdateTokenByIdProps) {
        try {
            return await TokensModel.updateOne({deviceId: token.deviceId}, {
                $set: {
                    issueAt: token.issueAt,
                    finishedDate: token.finishedDate
                }
            }) //TODO: upsert
        } catch (e) {
            return null
        }
    }

    async getAllTokens(userId: string) {
        try {
            const result = await TokensModel.find({userId});
            if (result) {
                return result.map((token) => ({
                    ip: token.ip,
                    title: token.deviceName,
                    lastActiveDate: token.issueAt,
                    deviceId: token.deviceId,
                }))
            }
        } catch (e) {
            return null
        }
    }

    async deleteAllExceptCurrent(issueAt: string) {
        try {
            return await TokensModel.remove({issueAt: {$ne: issueAt}})
        } catch (e) {
            return null
        }
    }

    async deleteCurrentToken(deviceId: string) {
        try {
            return await TokensModel.deleteOne({deviceId})
        } catch (e) {
            return null
        }
    }

    async getCurrentSessionByDeviceId(deviceId: string) {
        try {
            return await TokensModel.findOne({deviceId})
        } catch (e) {
            return null
        }
    }
}
