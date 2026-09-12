import { MailhogContainer } from '@web-projects/test'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'

import { sendMail } from './mail.service'

describe('MailService Integration Test', () => {
  let container: MailhogContainer

  beforeAll(async () => {
    container = await MailhogContainer.create()
    process.env.MAIL_HOST = container.smtpHost
    process.env.MAIL_PORT = String(container.smtpPort)
    process.env.MAIL_USER = 'admin@lea4int.com'
  }, 60000)

  afterEach(async () => {
    await container.refreshInbox()
  })

  afterAll(async () => {
    await container.stop()
  })

  describe('sendMail', () => {
    test('should send a single email and receive it in MailHog', async () => {
      const recipient = 'student@example.com'
      const subject = 'Bienvenido a LEA International'
      const body = '<h1>Hola Estudiante</h1><p>Tu consulta ha sido recibida con éxito.</p>'

      await sendMail(subject, recipient, body)

      const emailClientResponse = await container.client.messages()
      expect(emailClientResponse?.total).toBe(1)

      const received = emailClientResponse?.items[0]
      expect(received).toBeDefined()
      if (!received) {
        throw new Error('No message received in MailHog')
      }

      expect(received.subject).toBe(subject)
      expect(received.to).toBe(recipient)
      expect(received.from).toBe('admin@lea4int.com')
      expect(received.html).toContain('Hola Estudiante')
    })

    test('should send multiple emails (admin + client) and assert all received in MailHog', async () => {
      const adminEmail = 'admin@lea4int.com'
      const clientEmail = 'applicant@example.com'

      // Admin notification email
      await sendMail('Nueva solicitud de contacto', adminEmail, '<p>Hay un nuevo cliente interesado.</p>')

      // Client confirmation email
      await sendMail('Confirmacion de recepcion', clientEmail, '<p>Gracias por contactarnos.</p>')

      const emailClientResponse = await container.client.messages()
      expect(emailClientResponse?.total).toBe(2)

      const items = emailClientResponse?.items ?? []
      expect(items.length).toBe(2)

      const subjects = items.map((item) => item.subject)
      expect(subjects).toContain('Nueva solicitud de contacto')
      expect(subjects).toContain('Confirmacion de recepcion')

      const recipients = items.map((item) => item.to)
      expect(recipients).toContain(adminEmail)
      expect(recipients).toContain(clientEmail)
    })
  })
})
