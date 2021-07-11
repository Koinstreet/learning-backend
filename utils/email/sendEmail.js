/*eslint-disable*/
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Error
const AppError = require("../appError");

dotenv.config();

export  default (message, subject, userEmail) => {
        try{const transporter = nodemailer.createTransport({
                host: "mail.minorityprogrammers.org",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.PARENT_EMAIL,
                    pass: process.env.PARENT_PASSWORD
                }
            });

            transporter.sendMail({
                from: process.env.PARENT_EMAIL,
                to: `${userEmail}`,
                subject: `${subject}`,
                html: `${message}`
            });
           
    }catch(error){
        const _error = `Failed sending the email to ${userEmail}, Please try again ...`;
        return AppError.tryCatchError(res, _error);
    }
}
