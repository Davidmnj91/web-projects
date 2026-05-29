import { signSession, cookieConfig, isMockAuthEnabled } from '../../../lib/auth'

import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ cookies, redirect }) => {
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
