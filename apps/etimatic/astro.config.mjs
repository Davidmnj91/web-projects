// @ts-check
import { fileURLToPath } from 'node:url'

import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const websiteUrl = 'https://etimatic.vercel.app'

const mode = process.env.NODE_ENV ?? 'development'
const appDir = fileURLToPath(new URL('.', import.meta.url))

for (const envFile of [`.env.${mode}.local`, `.env.${mode}`, '.env.local', '.env']) {
  try {
    // Already defined variables are never overwritten, so the order above sets the precedence.
    process.loadEnvFile(`${appDir}${envFile}`)
  } catch (error) {
    // Every env file is optional, anything else is a real problem.
    if (/** @type {NodeJS.ErrnoException} */ (error).code !== 'ENOENT') {
      throw error
    }
  }
}

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
