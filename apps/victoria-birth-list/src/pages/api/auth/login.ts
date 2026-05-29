import { getPocketIdAuthUrl } from '../../../lib/auth'

import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ cookies, redirect }) => {
  const state = Math.random().toString(36).substring(2, 15)

  // Store state in a short-lived secure cookie to prevent CSRF attacks
  cookies.set('oauth_state', state, {
    path: '/',
    maxAge: 300, // 5 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })

  const authUrl = getPocketIdAuthUrl(state)
  return redirect(authUrl)
}
