import { cookieConfig } from '../../../lib/auth'

import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ cookies, redirect }) => {
  cookies.delete(cookieConfig.name, { path: '/' })
  return redirect('/')
}
