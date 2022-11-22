import {SetLimitProps} from "../interfaces/request-limits-types/interface";
import {requestLimitsRepository} from "../Repositories/request-limits-repository";

export const requestLimitsService = {

    setRequestLimit: async (limit:SetLimitProps)=>{
        return await requestLimitsRepository.setLimit(limit)
    },

    getLimitsByIp: async (limit:SetLimitProps)=>{
        return  await  requestLimitsRepository.getCurrentLimitByIp(limit.ip);
    },

    deleteLimitsByIp: async (ip:string)=>{
        return await requestLimitsRepository.deleteLimitsByIp(ip)
    }
}