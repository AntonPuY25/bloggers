import {SetLimitProps} from "../interfaces/request-limits-types/interface";
import {requestLimitsRepository} from "../Repositories/request-limits-repository";

class RequestLimitsService {
    async setRequestLimit(limit: SetLimitProps) {
        return await requestLimitsRepository.setLimit(limit)
    }

    async getLimitsByIp(limit: SetLimitProps) {
        return await requestLimitsRepository.getCurrentLimitByIp(limit);
    }

    async deleteLimitsByIp(ip: string) {
        return await requestLimitsRepository.deleteLimitsByIp(ip)

    }
}

export const requestLimitsService = new RequestLimitsService();