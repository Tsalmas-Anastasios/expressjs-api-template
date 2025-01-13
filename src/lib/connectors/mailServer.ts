import { EmailDetails, SimpleEmailAttributes } from '../../models';
import * as nodemailer from 'nodemailer';


class MailServer {

    async send_email(data: SimpleEmailAttributes): Promise<string> {

        try {

            if (!await this.verifyEmail(data.email))
                return Promise.reject({ code: 500, message: 'Email credentials are invalid, e-mail server is wrong or configuration closed unexpectable' });



            const transporter = nodemailer.createTransport({ ...data.email, tls: { rejectUnauthorized: true } });

            const mail = await transporter.sendMail({
                from: `"${data.email.defaults.name}" <${data.email.auth.user}>`,
                to: data.to,
                cc: data?.cc ? data.cc : null,
                bcc: data?.bcc ? data.bcc : null,
                subject: `${data.subject} - Clients Agency Management System`,
                text: data?.text ? data.text : null,
                html: data?.html ? data.html : null
            });



            return Promise.resolve(mail.messageId);

        } catch (error) {
            return Promise.reject(error);
        }

    }




    // verify email
    async verifyEmail(email: EmailDetails): Promise<boolean> {

        try {

            const transporter = nodemailer.createTransport({
                host: email?.host || null,
                port: email?.port || null,
                secure: email?.secure ? true : false,
                auth: {
                    user: email?.auth?.user || null,
                    pass: email?.auth?.password || null
                }
            });



            let transporter_status: boolean;
            await transporter.verify()
                .then(() => transporter_status = true)
                .catch(() => transporter_status = false);


            return Promise.resolve(transporter_status);

        } catch (error) {
            return Promise.reject(error);
        }

    }

}



export const mailServer = new MailServer();
