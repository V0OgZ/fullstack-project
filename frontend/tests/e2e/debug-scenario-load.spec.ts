import { test, expect } from '@playwright/test';

test.describe('Debug Scenario Loading', () => {
  test('should load scenario and render game interface', async ({ page }) => {
    // Navigate to the game page
    await page.goto('http://localhost:3000/game/conquest-classic');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check if we're on the game page
    await expect(page).toHaveURL(/\/game\/conquest-classic/);
    
    // Wait for the game interface to load
    await page.waitForSelector('.true-heroes-interface', { timeout: 10000 });
    
    // Check if the game title is visible
    await expect(page.locator('.game-title')).toBeVisible();
    
    // Check if the turn info is visible
    await expect(page.locator('.turn-info')).toBeVisible();
    
    // Check if the game renderer container is visible
    await expect(page.locator('.game-renderer-container')).toBeVisible();
    
    // Check if the side panel is visible
    await expect(page.locator('.game-side-panel')).toBeVisible();
    
    // Check if player info is visible
    await expect(page.locator('.player-info-section')).toBeVisible();
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'debug-scenario-load.png', fullPage: true });
    
    console.log('✅ Scenario loading test passed - game interface is rendering correctly');
  });
  
  test('should handle scenario loading errors gracefully', async ({ page }) => {
    // Navigate to a non-existent scenario
    await page.goto('http://localhost:3000/game/non-existent-scenario');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Should show an error message
    await expect(page.locator('text=Error')).toBeVisible({ timeout: 5000 });
    
    console.log('✅ Error handling test passed');
  });
}); 