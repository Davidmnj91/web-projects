const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || 'Lista de Victoria <victoria@send.petrolab.es>'

interface SendEmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  if (!RESEND_API_KEY) {
    console.log('\n==================================================')
    console.log(`[SIMULACIÓN EMAIL RESEND]`)
    console.log(`De: ${FROM_EMAIL}`)
    console.log(`Para: ${to}`)
    console.log(`Asunto: ${subject}`)
    console.log(`--------------------------------------------------`)
    console.log(html)
    console.log('==================================================\n')
    return { success: true, simulated: true }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        subject,
        html,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`Resend API Error (${response.status}): ${errText}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error sending email via Resend:', error)
    return { success: false, error }
  }
}

// Generates the confirmation / cancel email in HTML
export async function sendReservationEmail({
  name,
  email,
  giftTitle,
  reservationId,
  isPurchase,
  domainUrl,
}: {
  name: string
  email: string
  giftTitle: string
  reservationId: string
  isPurchase: boolean
  domainUrl: string
}) {
  const confirmUrl = `${domainUrl}/reservation/${reservationId}/confirm`
  const cancelUrl = `${domainUrl}/reservation/${reservationId}/cancel`

  let subject = ''
  let title = ''
  let bodyContent = ''

  if (isPurchase) {
    subject = `💖 ¡Muchas gracias por tu regalo para Victoria!`
    title = `¡Muchísimas gracias, ${name}!`
    bodyContent = `
      <p style="font-size: 16px; line-height: 1.6; color: #4A4A4A; margin-bottom: 20px;">
        Hemos recibido la confirmación de que has comprado el detalle <strong>"${giftTitle}"</strong> para la llegada de Victoria.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4A4A4A; margin-bottom: 20px;">
        Nos hace muchísima ilusión y nos ayuda a prepararnos para su llegada. Gracias de corazón por formar parte de este momento tan especial en nuestras vidas.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4A4A4A; margin-bottom: 24px;">
        Si deseas cambiar el nombre que aparecerá en la web o dejarnos un mensaje bonito personalizado para el recuerdo, puedes hacerlo usando el siguiente enlace:
      </p>
      <div style="text-align: center; margin-bottom: 30px;">
        <a href="${confirmUrl}" style="background-color: #A3B18A; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px; transition: background-color 0.3s ease;">
          Ver y Editar mi Dedicatoria
        </a>
      </div>
      <div style="background-color: #FAF8F5; border-radius: 8px; padding: 16px; margin-top: 30px; border: 1px dashed #A3B18A;">
        <p style="font-size: 14px; margin: 0 0 8px 0; font-weight: bold; color: #3A3A3A;">¿Necesitas enviarlo directamente?</p>
        <p style="font-size: 14px; margin: 0; color: #666;">Escríbenos y te pasaremos la dirección de envío:</p>
        <p style="font-size: 14px; margin: 4px 0 0 0; color: #333;"><strong>María José:</strong> 695 26 76 80 | <strong>David:</strong> 672 25 84 29</p>
      </div>
    `
  } else {
    subject = `🎁 Has reservado un detalle para Victoria`
    title = `¡Hola, ${name}!`
    bodyContent = `
      <p style="font-size: 16px; line-height: 1.6; color: #4A4A4A; margin-bottom: 20px;">
        Queríamos darte las gracias por reservar el detalle <strong>"${giftTitle}"</strong> para la llegada de Victoria.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4A4A4A; margin-bottom: 20px;">
        Este detalle ha quedado marcado como **Reservado** en la lista para que nadie más lo elija. Ahora puedes comprarlo en la tienda física u online que prefieras.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4A4A4A; margin-bottom: 24px;">
        Una vez que lo hayas comprado, o si necesitas cancelar la reserva porque has cambiado de idea, utiliza los siguientes botones para gestionarlo de forma automática:
      </p>
      <div style="text-align: center; margin: 24px 0 30px 0;">
        <a href="${confirmUrl}" style="background-color: #DDA15E; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px; margin: 8px; min-width: 180px;">
          Confirmar Compra ➔
        </a>
        <a href="${cancelUrl}" style="background-color: #E63946; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px; margin: 8px; min-width: 180px;">
          Cancelar Reserva ✕
        </a>
      </div>
      <p style="font-size: 14px; line-height: 1.5; color: #777;">
        <em>Nota: Recuerda que la reserva es solo una guía para evitar regalos duplicados. Puedes comprarlo donde te sea más cómodo.</em>
      </p>
    `
  }

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF8F5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03); border: 1px solid #EAEAEA;">
              <!-- Header -->
              <tr>
                <td align="center" style="background: linear-gradient(135deg, #BC6C25, #DDA15E); padding: 40px 20px;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 1px;">Victoria viene en camino</h1>
                  <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0; font-size: 16px;">Lista de Nacimiento</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="font-size: 22px; color: #2C3E50; margin-top: 0; margin-bottom: 20px; font-weight: 400;">${title}</h2>
                  ${bodyContent}
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td align="center" style="background-color: #F4F1DE; padding: 30px 20px; border-top: 1px solid #EAEAEA; color: #8C8C8C; font-size: 12px; line-height: 1.5;">
                  <p style="margin: 0 0 8px 0;">Este es un correo automático enviado en relación a la lista de nacimiento de Victoria.</p>
                  <p style="margin: 0;">Con cariño, María José & David.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

  return sendEmail({ to: email, subject, html })
}
