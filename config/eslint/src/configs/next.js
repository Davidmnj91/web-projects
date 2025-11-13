import eslintPluginNext from '@next/eslint-plugin-next'

import { defineConfig } from '../utils.js'
import { base } from './base.js'
import { react } from './react.js'

export const next = defineConfig(
  ...react,
  {
    ignores: ['.next', 'postcss.config.mjs', ...base.flatMap((c) => c.ignores ?? [])],
  },
  eslintPluginNext.configs.recommended,
  eslintPluginNext.configs['core-web-vitals'],
)
