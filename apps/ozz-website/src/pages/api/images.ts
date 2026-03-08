import { getImages } from '../../lib/cloudinary'

import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async (t) => {
  const url = new URL(t.request.url)
  const cursor = url.searchParams.get('next_cursor') ?? ''

  try {
    const data = await getImages('gallery', 10, cursor)
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: `Failed to fetch images, ${error as Error}` }), {
      status: 500,
    })
  }
}
