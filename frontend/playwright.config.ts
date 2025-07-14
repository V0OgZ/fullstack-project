import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    video: 'off',
    screenshot: 'off',
    trace: 'off',
  },
}); 