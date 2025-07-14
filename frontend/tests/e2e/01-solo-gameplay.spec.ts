import { test, expect } from '@playwright/test';

test.describe('Heroes of Time - Solo Gameplay', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the main page and display game selector', async ({ page }) => {
    // Verify main page elements
    await expect(page.locator('text=🎮 Heroes of Time 🎮')).toBeVisible();
    await expect(page.locator('.language-selector')).toBeVisible();
    await expect(page.locator('a[href*="/game/conquest-classic"]')).toBeVisible();
    await expect(page.locator('a[href*="/game/temporal-rift"]')).toBeVisible();
  });

  test('should navigate to classic conquest game', async ({ page }) => {
    // Click on classic conquest
    await page.locator('a[href*="/game/conquest-classic"]').click();
    
    // Wait for game to load
    await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
    
    // Check that we're in a game (basic check)
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to temporal rift game', async ({ page }) => {
    // Click on temporal rift
    await page.locator('a[href*="/game/temporal-rift"]').click();
    
    // Wait for game to load
    await expect(page).toHaveURL(/.*\/game\/temporal-rift/);
    
    // Check that we're in a game (basic check)
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display game features and tips', async ({ page }) => {
    // Check that game features are present
    await expect(page.locator('.game-features')).toBeVisible();
    await expect(page.locator('.rotating-tips')).toBeVisible();
  });

  test('should display multiplayer arena option', async ({ page }) => {
    // Check multiplayer option
    await expect(page.locator('a[href*="/multiplayer"]')).toBeVisible();
  });

  test('should handle language switching', async ({ page }) => {
    // Test language selector
    await expect(page.locator('.language-selector')).toBeVisible();
    
    // Test French
    await expect(page.locator('text=🇫🇷 FR')).toBeVisible();
    await page.locator('text=🇫🇷 FR').click();
    await expect(page.locator('text=Choisir un scénario')).toBeVisible();
    
    // Test English  
    await page.locator('text=🇬🇧 EN').click();
    await expect(page.locator('text=Choose a scenario')).toBeVisible();
    
    // Test Russian
    await page.locator('text=🇷🇺 RU').click();
    await expect(page.locator('text=Выберите сценарий')).toBeVisible();
  });

  test('should handle responsive design', async ({ page }) => {
    // Test different viewports
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      // Verify main elements are still visible
      await expect(page.locator('text=🎮 Heroes of Time 🎮')).toBeVisible();
      await expect(page.locator('.language-selector')).toBeVisible();
      await expect(page.locator('a[href*="/game/conquest-classic"]')).toBeVisible();
    }
  });

  test('should handle game loading and interface', async ({ page }) => {
    // Navigate to classic conquest
    await page.locator('a[href*="/game/conquest-classic"]').click();
    await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
    
    // Wait for game interface to load
    await page.waitForTimeout(2000);
    
    // Check for game interface elements
    await expect(page.locator('.game-page, .true-heroes-interface')).toBeVisible();
  });

  test('should handle hero selection and management', async ({ page }) => {
    // Navigate to game
    await page.locator('a[href*="/game/conquest-classic"]').click();
    await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
    
    // Wait for game to load
    await page.waitForTimeout(2000);
    
    // Check for hero-related elements
    await expect(page.locator('.hero-selection, .hero-management')).toBeVisible({ timeout: 10000 });
  });

  test('should handle resource display and management', async ({ page }) => {
    // Navigate to game
    await page.locator('a[href*="/game/conquest-classic"]').click();
    await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
    
    // Wait for game to load
    await page.waitForTimeout(2000);
    
    // Check for resource elements
    await expect(page.locator('.resources, .resource-display')).toBeVisible({ timeout: 10000 });
  });

  test('should handle political advisor system', async ({ page }) => {
    // Navigate to game
    await page.locator('a[href*="/game/conquest-classic"]').click();
    await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
    
    // Wait for game to load
    await page.waitForTimeout(2000);
    
    // Check for political advisor elements
    await expect(page.locator('.political-advisor, .advisor-system')).toBeVisible({ timeout: 10000 });
  });

  test('should handle turn progression mechanics', async ({ page }) => {
    // Navigate to game
    await page.locator('a[href*="/game/conquest-classic"]').click();
    await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
    
    // Wait for game to load
    await page.waitForTimeout(2000);
    
    // Check for turn-related elements
    await expect(page.locator('.turn-display, .turn-controls')).toBeVisible({ timeout: 10000 });
  });
}); 