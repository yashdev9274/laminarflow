import {MailtrapClient} from "mailtrap";

export const emailClient = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN!,
})