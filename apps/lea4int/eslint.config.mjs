import { configs, defineConfig } from '@web-projects/eslint'

export default defineConfig(...configs.base, ...configs.next, {
  ignores: ['**/*.svg.tsx', 'src/messages/*.json'],
})
