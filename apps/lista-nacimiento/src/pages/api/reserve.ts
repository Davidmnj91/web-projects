import type { APIRoute } from 'astro'
import { z } from 'zod'
import { db, initDb } from '../../lib/db'
import { generateUniqueReservationId } from '../../lib/funnyNames'
import { sendReservationEmail } from '../../lib/email'

const reserveSchema = z.object({
  giftId: z.string().uuid(),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('El correo electrónico no es válido'),
  message: z.string().optional(),
  type: z.enum(['RESERVE', 'PURCHASE']),
})

export const POST: APIRoute = async ({ request }) => {
  try {
    // Auto initialize DB if not ready
    await initDb()

    const body = await request.json()
    const result = reserveSchema.safeParse(body)

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: result.error.errors[0].message,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const { giftId, name, email, message, type } = result.data
    const status = type === 'RESERVE' ? 'Reserved' : 'Purchased'

    // 1. Verify gift exists and is available
    const giftResult = await db.execute({
      sql: 'SELECT id, title FROM gifts WHERE id = ? LIMIT 1',
      args: [giftId],
    })

    if (giftResult.rows.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El regalo seleccionado ya no existe.',
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const giftTitle = giftResult.rows[0].title as string

    // Check if there are active reservations that are not cancelled
    const activeResResult = await db.execute({
      sql: 'SELECT id, status FROM reservations WHERE giftId = ? AND status != "Cancelled" LIMIT 1',
      args: [giftId],
    })

    if (activeResResult.rows.length > 0) {
      const activeStatus = activeResResult.rows[0].status as string
      const SpanishStatus = activeStatus === 'Reserved' ? 'reservado' : 'comprado'
      return new Response(
        JSON.stringify({
          success: false,
          error: `Este regalo ya ha sido ${SpanishStatus} por otra persona.`,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // 2. Generate unique funny ID in Spanish
    const reservationId = await generateUniqueReservationId()
    const timestamp = Date.now()

    // 3. Insert reservation into SQLite
    await db.execute({
      sql: `
        INSERT INTO reservations (id, name, email, giftId, status, message, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [reservationId, name, email, giftId, status, message || '', timestamp],
    })

    // 4. Send Confirmation Email via Resend
    // Retrieve host URL dynamically or fallback
    const url = new URL(request.url)
    const domainUrl = `${url.protocol}//${url.host}`

    const emailSent = await sendReservationEmail({
      name,
      email,
      giftTitle,
      reservationId,
      isPurchase: type === 'PURCHASE',
      domainUrl,
    })

    return new Response(
      JSON.stringify({
        success: true,
        reservationId,
        status,
        emailSent: emailSent.success,
        simulated: !!(emailSent as any).simulated,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error: any) {
    console.error('API Reserve Error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error interno del servidor al procesar la reserva.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
