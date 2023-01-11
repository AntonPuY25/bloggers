import {EmailService} from "../domains/email-service";
import {Request, Response} from "express";
import {SendEmailAdaptorTypes} from "../adapters/types";

export class EmailController {

    constructor(protected emailService: EmailService) {}

    async sendEmail(req: Request<{}, {}, SendEmailAdaptorTypes, {}>, res: Response) {
        const {subject, message, email} = req.body


        const emailData = await this.emailService.sendEmail({email, message, subject})

        res.send(emailData)

    }
}