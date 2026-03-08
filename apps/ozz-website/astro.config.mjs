// @ts-check
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const websiteUrl = 'https://ozz-website.vercel.app/'

// https://astro.build/config
export default defineConfig({
  site: websiteUrl,
  adapter: vercel(),
  integrations: [sitemap()],
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
