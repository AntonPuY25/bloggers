import {RequestLimitsModel} from "../DB/request-limits";
import {SetLimitProps} from "../interfaces/request-limits-types/interface";

class RequestLimitsRepository {
    async setLimit(limit: SetLimitProps) {
        const newLimitModel = new RequestLimitsModel(limit)

        try {
            return await newLimitModel.save()
        } catch (e) {
            return null;
        }

    }

    async getCurrentLimitByIp(limit: SetLimitProps) {
        try {
            return await RequestLimitsModel.find({ip: limit.ip, type: limit.type})
        } catch (e) {
            return null
        }
    }

    async deleteLimitsByIp(ip: string) {
        try {
            return await RequestLimitsModel.deleteMany({ip})
        } catch (e) {
            return null;
        }
    }
}

export const requestLimitsRepository = new RequestLimitsRepository();