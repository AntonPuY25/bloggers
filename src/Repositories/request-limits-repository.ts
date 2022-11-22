import {RequestLimitsModel} from "../DB/request-limits";
import {SetLimitProps} from "../interfaces/request-limits-types/interface";

export const requestLimitsRepository = {
    setLimit: async (limit: SetLimitProps) => {

        const newLimitModel = new RequestLimitsModel(limit)

        try {
            return await newLimitModel.save()
        } catch (e) {
            return null;
        }

    },

    getCurrentLimitByIp: async (limit: SetLimitProps) => {
        try {
            return await RequestLimitsModel.find({ip: limit.ip, type: limit.type})
        } catch (e) {
            return null
        }
    },

    deleteLimitsByIp: async (ip: string) => {
        try {
            return await RequestLimitsModel.deleteMany({ip})
        } catch (e) {
            return null;
        }
    }

}