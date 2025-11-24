import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: ['node_modules', 'dist'],
    coverage: {
      reporter: ['text', 'json', 'json-summary', 'html'],
      reportOnFailure: true,
    },
  },
})
