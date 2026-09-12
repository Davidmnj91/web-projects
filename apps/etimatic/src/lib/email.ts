import nodemailer from 'nodemailer'

import { Constants } from '../config/constants.ts'

interface SendEmail {
  from: string
  html: string
  subject: string
}

export function getEmailTransporter() {
  const host = process.env.MAIL_HOST
  const port = Number(process.env.MAIL_PORT)
  const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'

  if (!host || !port) {
    throw new Error('Missing mail configuration: MAIL_HOST and MAIL_PORT are required')
  }

  if (isDev) {
    return nodemailer.createTransport({
      host,
      port,
      secure: false,
    })
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: {
      user: Constants.mail,
      pass: process.env.MAIL_PASSWORD,
    },
  })
}

export async function sendEmail({ html, subject, from }: SendEmail) {
  const mailData = {
    from: from,
    to: Constants.mail,
    subject: subject,
    html: html,
  }

  const transporter = getEmailTransporter()
  return await transporter.sendMail(mailData)
}
