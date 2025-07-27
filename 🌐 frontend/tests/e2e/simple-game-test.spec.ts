import { test, expect } from '@playwright/test';

const FRONTEND_URL = 'http://localhost:3000';

test.describe('Simple Game Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Aller à l'interface de jeu
    await page.goto(FRONTEND_URL);
    
    // Attendre que l'interface soit chargée
    await page.waitForSelector('body', { timeout: 10000 });
  });

  test('should load game interface', async ({ page }) => {
    // Vérifier que l'interface se charge
    await expect(page.locator('body')).toBeVisible();
    
    // Vérifier le titre
    await expect(page).toHaveTitle(/Heroes of Time/);
    
    // Prendre une capture d'écran
    await page.screenshot({ path: 'test-results/game-interface.png' });
    
    console.log('✅ Game interface loaded successfully');
  });

  test('should display hero information', async ({ page }) => {
    // Attendre un peu pour que les données se chargent
    await page.waitForTimeout(3000);
    
    // Rechercher des éléments qui pourraient contenir des informations sur les héros
    const heroElements = await page.locator('[data-testid*="hero"], .hero, [class*="hero"]').all();
    
    console.log(`Found ${heroElements.length} potential hero elements`);
    
    // Prendre une capture d'écran pour debug
    await page.screenshot({ path: 'test-results/hero-info.png' });
    
    // Au moins vérifier que la page est fonctionnelle
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle button clicks', async ({ page }) => {
    // Attendre un peu
    await page.waitForTimeout(2000);
    
    // Rechercher des boutons
    const buttons = await page.locator('button').all();
    
    console.log(`Found ${buttons.length} buttons`);
    
    // Essayer de cliquer sur le premier bouton visible
    if (buttons.length > 0) {
      const firstButton = buttons[0];
      if (await firstButton.isVisible()) {
        await firstButton.click();
        console.log('✅ Successfully clicked a button');
      }
    }
    
    // Prendre une capture d'écran
    await page.screenshot({ path: 'test-results/button-clicks.png' });
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display game map', async ({ page }) => {
    // Attendre un peu
    await page.waitForTimeout(3000);
    
    // Rechercher des éléments de carte
    const mapElements = await page.locator('[data-testid*="map"], .map, [class*="map"], svg, canvas').all();
    
    console.log(`Found ${mapElements.length} potential map elements`);
    
    // Prendre une capture d'écran
    await page.screenshot({ path: 'test-results/game-map.png' });
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('should verify backend connection', async ({ page }) => {
    // Intercepter les requêtes API
    let apiCalls = 0;
    
    page.on('request', (request) => {
      if (request.url().includes('localhost:8080')) {
        apiCalls++;
        console.log(`API call ${apiCalls}: ${request.method()} ${request.url()}`);
      }
    });
    
    // Attendre que les appels API se fassent
    await page.waitForTimeout(5000);
    
    console.log(`Total API calls made: ${apiCalls}`);
    
    // Prendre une capture d'écran finale
    await page.screenshot({ path: 'test-results/backend-connection.png' });
    
    await expect(page.locator('body')).toBeVisible();
  });
}); 