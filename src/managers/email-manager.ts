export const emailManager = {
    async getRecoveryMessageEmail(user: any) {

        const email = user.email;
        const message = "<h1>Hello , thanks fo you attention</h1>"
        const subject = user.subject

        return {
            email, message, subject
        }

    }
}