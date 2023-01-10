import {Request, Response, Router} from "express";
import {SendEmailAdaptorTypes} from "../adapters/types";
import {EmailService} from "../domains/email-service";

export const emailRouter = Router({});

class EmailController {
    emailService: EmailService;

    constructor() {
        this.emailService = new EmailService();
    }


    async sendEmail(req: Request<{}, {}, SendEmailAdaptorTypes, {}>, res: Response) {
        const {subject, message, email} = req.body


        const emailData = await this.emailService.sendEmail({email, message, subject})

        res.send(emailData)

    }
}

const instanceEmailController = new EmailController();

emailRouter.post('/', instanceEmailController.sendEmail.bind(instanceEmailController))