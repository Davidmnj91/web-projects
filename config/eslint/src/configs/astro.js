import * as eslintPluginAstro from 'eslint-plugin-astro'

import { defineConfig } from '../utils.js'

export const astro = defineConfig(...eslintPluginAstro.configs.recommended, { ignores: ['.astro'] })
