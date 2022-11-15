import {
    CreateTokensProps,
    GetUserItByDeviceIDProps,
    UpdateTokenByIdProps
} from "../interfaces/registration-types/interface";
import {TokensModel} from "../DB/tokens-scheme";

export const tokensRepository = {
    setToken: async ({issueAt, ip, userId, deviceName, deviceId, finishedDate}: CreateTokensProps) => {
        const currentToken: CreateTokensProps = {
            ip, issueAt, finishedDate, userId, deviceName, deviceId
        };

        const tokenResult = new TokensModel(currentToken)

        try {
            return await tokenResult.save()
        } catch (e) {
            return null
        }
    },
    getUserItByDeviceID: async ({deviceId, issueAt}: GetUserItByDeviceIDProps) => {
        try {
            return await TokensModel.findOne({deviceId, issueAt})
        } catch (e) {
            return null
        }
    },
    updateTokenByDeviceId: async ({token}: UpdateTokenByIdProps) => {
        try {
            return await TokensModel.updateOne({deviceId: token.deviceId}, {
                $set: {
                    issueAt: token.issueAt,
                    finishedDate: token.finishedDate
                }
            })
        } catch (e) {
            return null
        }
    },
    getAllTokens: async () => {
        try {
            const result = await TokensModel.find({});
            console.log(result, 'result')
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
}