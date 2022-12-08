import {RegisterUserType} from "../interfaces/registration-types/interface";
import {settings} from "../settings/settings";

export const emailManager = {
    async getRecoveryMessageEmailByUser(user: RegisterUserType) {

        const link = `https://${settings.JWT_SECRET}/auth/registration-confirmation?code=${user.emailConfirmation.confirmationCode}`

        const email = user.userData.email;
        const message = " <h1>Thank for your registration</h1>\n" +
            "       <p>To finish registration please follow the link below:\n" +
            `          <a href=${link}>complete registration</a>\n` +
            "      </p>\n"

        const subject = "Confirm your email, please."

        return {
            email, message, subject
        }

    },
    async getRecoveryMessageEmailByConfirmationCode(email: string, code: string) {

        const link = `https://${settings.JWT_SECRET}/auth/registration-confirmation?code=${code}`

        const message = " <h1>Thank for your registration</h1>\n" +
            "       <p>To finish registration please follow the link below:\n" +
            `          <a href=${link}>complete registration</a>\n` +
            "      </p>\n"

        const subject = "Confirm your email, please."

        return {
            email, message, subject
        }

    },

    async getRecoveryPasswordEmailMessage(email: string, code: string) {

        const link = `https://${settings.JWT_SECRET}/password-recovery?recoveryCode=${code}`

        const message = " <h1>Password recovery</h1>\n" +
            "       <p>To finish password recovery please follow the link below:\n" +
            `          <a href=${link}>recovery password</a>\n` +
            "      </p>\n"

        const subject = "Password recovery"

        return {
            email, message, subject
        }

    }
}