import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LEA4Int',
    short_name: 'LEA4Int',
    start_url: '.',
    display: 'standalone',
    theme_color: '#2E3B48',
    background_color: '#2E3B48',
    description: 'Erasmus programs',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}
