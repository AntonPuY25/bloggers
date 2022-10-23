import {SendEmailAdaptorTypes} from "../adapters/types";
import {emailAdapter} from "../adapters/email-adapter";
import {emailManager} from "../managers/email-manager";

export const emailService = {

    async sendEmail({email, subject, message}: SendEmailAdaptorTypes) {

        const recoveryData = await emailManager.getRecoveryMessageEmail({
            id: '1',
            userData: {email, salt: '123', login: 'PuY', password: '123'},
            emailConfirmation: {confirmationCode: '13sd', isConfirmed: false, expirationDate: new Date()}
        })
        return await emailAdapter.sendEmail(recoveryData)
    }
}