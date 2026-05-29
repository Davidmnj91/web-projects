import type { APIRoute } from 'astro'
import { exchangePocketIdCode, signSession, cookieConfig } from '../../../lib/auth'

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const savedState = cookies.get('oauth_state')?.value

  if (!code) {
    return new Response('Missing authorization code', { status: 400 })
  }

  if (!state || state !== savedState) {
    return new Response('Security state validation failed. Possible CSRF attempt.', { status: 400 })
  }

  const user = await exchangePocketIdCode(code)
  if (!user) {
    return new Response('Failed to exchange code for user information from PocketID.', { status: 401 })
  }

  // Generate signed secure session cookie
  const sessionToken = signSession(user)
  cookies.set(cookieConfig.name, sessionToken, cookieConfig.options)

  // Clean up state cookie
  cookies.delete('oauth_state', { path: '/' })

  return redirect('/admin')
}
