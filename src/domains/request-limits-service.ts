import {SetLimitProps} from "../interfaces/request-limits-types/interface";
import {RequestLimitsRepository} from "../Repositories/request-limits-repository";

export class RequestLimitsService {

    constructor(protected requestLimitsRepository: RequestLimitsRepository) {}

    async setRequestLimit(limit: SetLimitProps) {
        return await this.requestLimitsRepository.setLimit(limit)
    }

    async getLimitsByIp(limit: SetLimitProps) {
        return await this.requestLimitsRepository.getCurrentLimitByIp(limit);
    }

    async deleteLimitsByIp(ip: string) {
        return await this.requestLimitsRepository.deleteLimitsByIp(ip)

    }
}