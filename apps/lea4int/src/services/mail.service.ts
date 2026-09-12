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
    const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'

    if (isDev) {
      const host = process.env.MAIL_HOST
      const port = Number(process.env.MAIL_PORT)

      if (!host || !port) {
        throw new Error('Missing mail configuration: MAIL_HOST and MAIL_PORT are required')
      }

      transport = { host, port, secure: false }
    } else {
      const token = await getAuthToken()
      transport = transportFactory(token)
    }
    const mailer = nodemailer.createTransport(transport)
    return await mailer.sendMail({
      from: process.env.MAIL_USER,
      to: to,
      subject: subject,
      html: template,
    })
  } catch (e) {
    console.error(e)
    throw e
  }
}
