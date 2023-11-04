import nodemailer from 'nodemailer'
import { Contact } from '../@types/contact'

export class Mailer {

    private transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            subject: 'Message',
            auth: {
                user: "edc6ca27ae498e",
                pass: "2ecf93a9a0f9ea"
            }
        })
    }

    async sendMail(contact: Contact) {
        const msg = await this.transporter.sendMail({
            from: contact.email,
            to: 'rafael.tiburcio@live.com',
            subject: contact.subject,
            text: contact.message,
            html: `<b>${contact.message}</b>`
        })

        console.log("Message sent: %s", msg.messageId)
    }
}

