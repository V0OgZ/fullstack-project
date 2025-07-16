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
    // Par défaut headless pour les tests
    headless: true,
    launchOptions: {
      slowMo: 0, // Rapide pour les tests
    },
  },
  projects: [
    // 🧪 TESTS AUTOMATISÉS (headless, rapides, sans son)
    {
      name: 'automated-tests',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        headless: true,
        launchOptions: {
          slowMo: 0, // Rapide
          args: [
            '--no-default-browser-check',
            '--disable-web-security',
            '--mute-audio', // Pas de son
            '--disable-gpu',
            '--disable-extensions',
            '--force-device-scale-factor=1'
          ],
        },
      },
      testMatch: [
        '**/complete-game-turns.spec.ts',
        '**/scripted-game-test.spec.ts',
        '**/hybrid-ui-script-test.spec.ts',
        '**/simple-turn-test.spec.ts',
        '**/turn-zfc-test.spec.ts', 
        '**/quick-verification.spec.ts',
        '**/simple-game-test.spec.ts',
        '**/script-driven-tests.spec.ts',
        '**/hero-movement-fog-test.spec.ts',
        '**/debug-console-errors.spec.ts',
        '**/debug-scenarios.spec.ts'
      ],
    },
    
    // 🎬 DÉMOS (avec interface, lentes, avec son)
    {
      name: 'solo-fullscreen-demo',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        headless: false, // Visible
        launchOptions: {
          slowMo: 100, // Lent pour voir
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
      name: 'multiplayer-demo',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 640, height: 700 },
        headless: false, // Visible
        launchOptions: {
          slowMo: 50,
          args: [
            '--no-default-browser-check',
            '--disable-web-security',
            '--window-position=0,0',     // Premier écran à gauche
            '--window-size=640,700',
            '--force-device-scale-factor=1'
          ],
        },
      },
      testMatch: ['**/multiplayer-demo.spec.ts'],
    },
    
    {
      name: 'multiplayer-demo-player2',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 640, height: 700 },
        headless: false, // Visible
        launchOptions: {
          slowMo: 50,
          args: [
            '--no-default-browser-check',
            '--disable-web-security',
            '--window-position=650,0',   // Deuxième écran à droite (650px décalé)
            '--window-size=640,700',
            '--force-device-scale-factor=1'
          ],
        },
      },
      testMatch: ['**/multiplayer-ui.spec.ts'],
    },
    
    {
      name: 'terrain-demo',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        headless: false, // Visible  
        launchOptions: {
          slowMo: 50,
          args: [
            '--no-default-browser-check',
            '--disable-web-security',
            '--window-position=0,0',
            '--window-size=1280,800',
            '--force-device-scale-factor=1'
          ],
        },
      },
      testMatch: [
        '**/terrain-vision-demo.spec.ts',
        '**/epic-content-demo.spec.ts', 
        '**/fullscreen-demo.spec.ts',
        '**/hexagonal-terrain-test.spec.ts',
        '**/terrain-rendering-test.spec.ts'
      ],
    },
  ],
}); 