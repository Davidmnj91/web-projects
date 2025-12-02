import nodemailer from 'nodemailer'

import type SMTPTransport from 'nodemailer/lib/smtp-transport'

import { getAuthToken } from '@/services/oath.service'

const transportFactory = (accessToken: string): SMTPTransport.Options => ({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USER,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    accessToken,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export const sendMail = async (subject: string, to: string, template: string) => {
  try {
    let transport: SMTPTransport.Options
    if (process.env.NODE_ENV === 'development') {
      transport = { host: 'localhost', port: 1025, secure: false }
    } else {
      const token = await getAuthToken()
      transport = transportFactory(token)
    }
    const mailer = nodemailer.createTransport(transport)
    await mailer.sendMail({
      from: process.env.MAIL_USER,
      to: to,
      subject: subject,
      html: template,
    })
  } catch (e) {
    console.error(e)
  }
}
