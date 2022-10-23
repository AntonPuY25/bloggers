import {RegisterUserType} from "../interfaces/registration-types/interface";
import {settings} from "../settings/settings";

export const emailManager = {
    async getRecoveryMessageEmail(user: RegisterUserType) {

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

    }
}