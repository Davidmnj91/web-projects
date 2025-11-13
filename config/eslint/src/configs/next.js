import { fixupConfigRules } from '@eslint/compat'
import eslintPluginNext from '@next/eslint-plugin-next'
import reactRefresh from 'eslint-plugin-react-refresh'

import { compat, defineConfig } from '../utils.js'
import { base } from './base.js'

export const next = defineConfig(
  {
    ignores: ['.next', 'postcss.config.mjs', ...base.flatMap((c) => c.ignores ?? [])],
  },
  eslintPluginNext.configs.recommended,
  eslintPluginNext.configs['core-web-vitals'],
  ...fixupConfigRules(compat.extends('plugin:react/recommended')),
  ...fixupConfigRules(compat.extends('plugin:react-hooks/recommended')),
  ...fixupConfigRules(compat.extends('plugin:jsx-a11y/strict')),

  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
)
