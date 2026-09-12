import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { configs } from '@web-projects/vitest'
import { defineConfig, mergeConfig } from 'vitest/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default mergeConfig(
  configs.node,
  defineConfig({
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    test: {
      include: ['src/**/*.integration.spec.ts'],
      testTimeout: 60000,
      hookTimeout: 60000,
      pool: 'threads',
      maxWorkers: 1,
      isolate: false,
      sequence: {
        concurrent: false,
      },
    },
  }),
)
