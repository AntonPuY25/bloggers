import {SendEmailAdaptorTypes} from "../adapters/types";
import {emailAdapter} from "../adapters/email-adapter";
import {emailManager} from "../managers/email-manager";

export const emailService = {

    async sendEmail({email,subject,message}:SendEmailAdaptorTypes){

        const recoveryData =await emailManager.getRecoveryMessageEmail({user: 'PuY', email,subject,message})
        return await emailAdapter.sendEmail(recoveryData)
    }
}