import nodemailer from "nodemailer";
import {SendEmailAdaptorTypes} from "./types";

class EmailAdapter {
    async sendEmail({email, subject, message}: SendEmailAdaptorTypes) {
        const transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'rockmenpuy24@gmail.com', // generated ethereal user
                pass: 'mvbsoqxrvhvrgbkh', // generated ethereal password
            },
        })

        return await transporter.sendMail({
            from: 'Anton Kliashchonak',  // sender address
            to: email, // list of receivers
            subject, // Subject line
            html: message, // html body
        });

    }
}

export const emailAdapter = new EmailAdapter();