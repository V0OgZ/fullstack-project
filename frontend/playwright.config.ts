import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: false,
    launchOptions: {
      slowMo: 100,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          slowMo: 100,
          args: ['--no-default-browser-check'],
        },
      },
    },
    {
      name: 'chromium-player2',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          slowMo: 100,
          args: ['--no-default-browser-check', '--window-position=800,0'],
        },
      },
    },
  ],
}); 