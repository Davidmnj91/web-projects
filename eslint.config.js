import { configs, defineConfig } from '@web-projects/eslint'

export default defineConfig(
  {
    ignores: ['apps', 'libs', 'config', 'tools', 'prettier.config.js', 'lint-staged.config.js', 'commitlint.config.js'],
  },
  ...configs.base,
)
