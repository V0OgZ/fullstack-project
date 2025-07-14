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
      name: 'solo-fullscreen',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        launchOptions: {
          slowMo: 100,
          args: [
            '--no-default-browser-check',
            '--start-maximized',
            '--disable-web-security'
          ],
        },
      },
      testMatch: ['**/*gameplay-demo.spec.ts', '**/*solo*.spec.ts'],
    },
        {
      name: 'multiplayer',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 640, height: 800 },
        launchOptions: {
          slowMo: 50,
          args: [
            '--no-default-browser-check',
            '--disable-web-security'
          ],
        },
      },
      testMatch: ['**/*multiplayer*.spec.ts'],
    },
    {
      name: 'demo',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        launchOptions: {
          slowMo: 50,
          args: [
            '--no-default-browser-check',
            '--start-maximized'
          ],
        },
      },
      testMatch: ['**/*demo*.spec.ts'],
    },
  ],
}); 