import { sendEmail } from '../../lib/email.ts'

import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()
    const { name, email, message } = data

    if (!name || !email) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
      })
    }

    const mailData = {
      from: email,
      subject: `(WEB) Mensaje de ${name}`,
      html: `<div>${message}</div><p>Enviado por: ${name} (${email})</p>`,
    }

    await sendEmail(mailData)

    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    })
  }
}
