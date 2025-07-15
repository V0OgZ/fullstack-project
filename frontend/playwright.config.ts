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
            '--disable-web-security',
            '--window-position=0,0',
            '--window-size=1280,800',
            '--force-device-scale-factor=1'
          ],
        },
      },
      testMatch: ['**/01-single-demo.spec.ts'],
    },
    {
      name: 'multiplayer',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 640, height: 700 },
        launchOptions: {
          slowMo: 50,
          args: [
            '--no-default-browser-check',
            '--disable-web-security',
            '--window-position=0,0',     // Premier browser à gauche
            '--window-size=640,700',
            '--force-device-scale-factor=1'
          ],
        },
      },
      testMatch: ['**/multiplayer-demo.spec.ts', '**/multiplayer-ui.spec.ts'],
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
            '--disable-web-security',
            '--window-position=0,0', // Position 0,0
            '--window-size=1280,800',
            '--force-device-scale-factor=1'
          ],
        },
      },
      testMatch: ['**/debug*.spec.ts', '**/terrain-vision*.spec.ts'],
    },
  ],
}); 