import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import pluginSecurity from 'eslint-plugin-security'
import turboPlugin from 'eslint-plugin-turbo'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import { defineConfig } from '../utils.js'

export const base = defineConfig(
  {
    ignores: [
      'dist',
      'coverage',
      '.turbo',
      'node_modules',
      '**/eslint.config.js',
      '**/eslint.config.mjs',
      '**/*.env',
      '**/*.env.*',
      '**/*.bak',
      '**/*.bak.*',
    ],
  },

  // Base TS configs
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Good to have extras
  pluginSecurity.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
  },

  {
    plugins: { import: importPlugin },
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'type'],
          'newlines-between': 'always',
        },
      ],
    },
  },

  // Prettier config to disable conflicting rules
  prettierConfig,
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...turboPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '(^_)|(Schema$)' }],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],

      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],

      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        {
          allowConstantLoopConditions: true,
        },
      ],
      'security/detect-object-injection': 'off',
    },
  },
)
