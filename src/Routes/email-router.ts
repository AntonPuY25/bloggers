import {Request, Response, Router} from "express";
import {SendEmailAdaptorTypes} from "../adapters/types";
import {emailService} from "../domains/email-service";

export const emailRouter = Router({});

emailRouter
    .post('/', async (req: Request<{}, {}, SendEmailAdaptorTypes, {}>, res: Response) => {
        const {subject, message, email} = req.body


        const emailData =await emailService.sendEmail({email, message, subject})

        res.send(emailData)

    })