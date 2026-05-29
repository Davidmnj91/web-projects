import type { APIRoute } from 'astro'
import { signSession, cookieConfig, isMockAuthEnabled } from '../../../lib/auth'

export const GET: APIRoute = async ({ cookies, redirect }) => {
  if (!isMockAuthEnabled()) {
    return new Response(
      'Mock authentication is only available in development or local homelab settings without PocketID URL defined.',
      { status: 403 },
    )
  }

  // Create a simulated administrator session
  const mockUser = {
    id: 'mock-admin-id',
    name: 'David (Homelab Admin)',
    email: 'david@petrolab.es',
    isAdmin: true,
  }

  const sessionToken = signSession(mockUser)
  cookies.set(cookieConfig.name, sessionToken, cookieConfig.options)
  cookies.delete('oauth_state', { path: '/' })

  return redirect('/admin')
}
