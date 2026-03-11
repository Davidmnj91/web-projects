import * as eslintPluginAstro from 'eslint-plugin-astro'

import { defineConfig } from '../utils.js'

export const astro = defineConfig(
  ...(Array.isArray(eslintPluginAstro.configs.recommended)
    ? eslintPluginAstro.configs.recommended
    : [eslintPluginAstro.configs.recommended]),
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        // Disable projectService for Astro files as it's not fully supported yet by the parser
        projectService: false,
        project: true,
      },
    },
    rules: {
      // Disable some type-checked rules in Astro files if they cause issues with the parser
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
)
