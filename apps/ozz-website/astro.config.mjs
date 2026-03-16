// @ts-check
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, memoryCache } from 'astro/config'

const websiteUrl = 'https://ozzphoto.com'

// https://astro.build/config
export default defineConfig({
  site: websiteUrl,
  adapter: vercel(),
  integrations: [sitemap()],
  experimental: {
    cache: { provider: memoryCache() },
  },
  vite: {
    plugins: [
      tailwindcss(),
      sitemap({
        changefreq: 'weekly',
        priority: 0.7,
      }),
    ],
  },
})
