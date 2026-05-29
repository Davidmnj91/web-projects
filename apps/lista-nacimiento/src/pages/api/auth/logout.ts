import type { APIRoute } from 'astro'
import { cookieConfig } from '../../../lib/auth'

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(cookieConfig.name, { path: '/' })
  return redirect('/')
}
