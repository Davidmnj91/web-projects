import { configs, defineConfig } from '@web-projects/eslint'

export default defineConfig(
  {
    ignores: ['.vercel', 'dist', '.astro', 'public'],
  },
  ...configs.base,
  ...configs.astro,
)
