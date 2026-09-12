import { MailhogContainer } from '@web-projects/test'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'

import { sendEmail } from './email'
import { Constants } from '../config/constants'

describe('Etimatic Email Integration Test', () => {
  let container: MailhogContainer

  beforeAll(async () => {
    container = await MailhogContainer.create()
    process.env.MAIL_HOST = container.smtpHost
    process.env.MAIL_PORT = String(container.smtpPort)
  }, 60000)

  afterEach(async () => {
    await container.refreshInbox()
  })

  afterAll(async () => {
    await container.stop()
  })

  describe('sendEmail', () => {
    test('should send a contact email and receive it in MailHog', async () => {
      const from = 'cliente@empresa.com'
      const subject = '(WEB) Mensaje de Cliente Test'
      const html = '<div>Mensaje de prueba para Etimatic</div><p>Enviado por: Cliente (cliente@empresa.com)</p>'

      await sendEmail({ from, subject, html })

      const emailClientResponse = await container.client.messages()
      expect(emailClientResponse?.total).toBe(1)

      const received = emailClientResponse?.items[0]
      expect(received).toBeDefined()
      if (!received) {
        throw new Error('No message received in MailHog')
      }

      expect(received.subject).toBe(subject)
      expect(received.to).toBe(Constants.mail)
      expect(received.from).toBe(from)
      expect(received.html).toContain('Mensaje de prueba para Etimatic')
    })
  })
})
