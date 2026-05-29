// @ts-check
import { configs, defineConfig } from '@web-projects/eslint'

export default defineConfig(
  {
    ignores: ['.vercel', 'dist', '.astro'],
  },
  ...configs.base,
  ...configs.astro,
  {
    files: ['**/*.astro'],
    rules: {
      '@typescript-eslint/no-misused-promises': 'off',
    },
  }
)
