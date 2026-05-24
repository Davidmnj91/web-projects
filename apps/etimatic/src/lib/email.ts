import nodemailer from 'nodemailer'

import { Constants } from '../config/constants.ts'

interface SendEmail {
  from: string
  html: string
  subject: string
}

const transporter = nodemailer.createTransport({
  host: import.meta.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: Constants.mail,
    pass: import.meta.env.MAIL_PASSWORD,
  },
})

export async function sendEmail({ html, subject, from }: SendEmail) {
  const mailData = {
    from: from,
    to: Constants.mail,
    subject: subject,
    html: html,
  }

  return await transporter.sendMail(mailData)
}
