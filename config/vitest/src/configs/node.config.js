import { defineConfig } from 'vitest/config'

export const nodeConfig = defineConfig({
  test: {
    globals: true,
    environment: 'node',
    env: {
      APP_ENV: 'test',
    },
  },
})
