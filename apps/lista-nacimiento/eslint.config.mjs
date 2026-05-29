// @ts-check
import eslint from '@web-projects/eslint'

export default [
  ...eslint.configs.astro,
  {
    ignores: ['dist', '.astro'],
  },
]
