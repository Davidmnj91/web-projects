import { createHmac } from 'node:crypto'

const SESSION_SECRET = process.env.SESSION_SECRET ?? 'al-infinito-y-mas-alla-de-victoria-secret-key-2026'
const COOKIE_NAME = 'victoria_admin_session'

// PocketID configurations from environment variables
const POCKETID_URL = process.env.POCKETID_URL
const POCKETID_CLIENT_ID = process.env.POCKETID_CLIENT_ID
const POCKETID_CLIENT_SECRET = process.env.POCKETID_CLIENT_SECRET
const POCKETID_REDIRECT_URI = process.env.POCKETID_REDIRECT_URI

export interface SessionUser {
  id: string
  name: string
  email: string
  avatar?: string
  isAdmin: boolean
}

// Check if we should run in Mock mode (local development)
export function isMockAuthEnabled(): boolean {
  return !POCKETID_URL || process.env.NODE_ENV === 'development'
}

// Session signing via native Node.js crypto HMAC
export function signSession(user: SessionUser): string {
  const payload = Buffer.from(JSON.stringify(user)).toString('base64url')
  const signature = createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

export function verifySession(cookieValue: string | undefined): SessionUser | null {
  if (!cookieValue) return null

  const parts = cookieValue.split('.')
  if (parts.length !== 2) return null

  const [payload, signature] = parts
  const expectedSignature = createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url')

  // Safe comparison
  if (signature !== expectedSignature) return null

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return decoded as SessionUser
  } catch {
    return null
  }
}

// PocketID OAuth2 Redirection URL
export function getPocketIdAuthUrl(state: string): string {
  if (isMockAuthEnabled()) {
    return `/api/auth/mock?state=${state}`
  }

  const url = new URL(`${POCKETID_URL ?? ''}/oauth/authorize`)
  url.searchParams.append('client_id', POCKETID_CLIENT_ID ?? '')
  url.searchParams.append('redirect_uri', POCKETID_REDIRECT_URI ?? '')
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('scope', 'openid profile email')
  url.searchParams.append('state', state)

  return url.toString()
}

// Exchange authorization code for user info
export async function exchangePocketIdCode(code: string): Promise<SessionUser | null> {
  if (isMockAuthEnabled()) {
    return {
      id: 'mock-admin-id',
      name: 'David (Homelab Admin)',
      email: 'david@petrolab.es',
      isAdmin: true,
    }
  }

  try {
    // 1. Post code to token endpoint
    const tokenUrl = `${POCKETID_URL ?? ''}/oauth/token`
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: POCKETID_REDIRECT_URI ?? '',
        client_id: POCKETID_CLIENT_ID ?? '',
        client_secret: POCKETID_CLIENT_SECRET ?? '',
      }),
    })

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text()
      console.error('PocketID Token Error:', errText)
      return null
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    if (!accessToken) return null

    // 2. Fetch UserInfo
    const userInfoUrl = `${POCKETID_URL ?? ''}/oauth/userinfo`
    const userResponse = await fetch(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!userResponse.ok) {
      console.error('PocketID UserInfo Error:', await userResponse.text())
      return null
    }

    const userData = (await userResponse.json()) as {
      sub?: string
      id?: string
      name?: string
      username?: string
      email?: string
      picture?: string
      avatar?: string
    }

    return {
      id: userData.sub ?? userData.id ?? '',
      name: userData.name ?? userData.username ?? 'Admin User',
      email: userData.email ?? '',
      avatar: userData.picture ?? userData.avatar ?? '',
      isAdmin: true, // Anyone who successfully logs in via homelab PocketID is an admin
    }
  } catch (error) {
    console.error('Failed to authenticate with PocketID:', error)
    return null
  }
}

// Cookie Helper Config for Astro
export const cookieConfig = {
  name: COOKIE_NAME,
  options: {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 1 week session
  },
}
