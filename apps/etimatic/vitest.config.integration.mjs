import { configs } from '@web-projects/vitest'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
  configs.node,
  defineConfig({
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
