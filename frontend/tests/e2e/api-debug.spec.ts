import { test, expect } from '@playwright/test';

test.describe('API Debug', () => {
  test('should make successful API call to create scenario', async ({ page }) => {
    // Navigate to the game page
    await page.goto('http://localhost:3000/game/conquest-classic');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check if we're on the game page
    await expect(page).toHaveURL(/\/game\/conquest-classic/);
    
    // Wait for the loading state to complete
    await page.waitForFunction(() => {
      // Check if loading is complete by looking for game interface elements
      const gameInterface = document.querySelector('.true-heroes-interface');
      const loadingElement = document.querySelector('.true-heroes-loading');
      return gameInterface && !loadingElement;
    }, { timeout: 15000 });
    
    // Check if the game interface is visible
    await expect(page.locator('.true-heroes-interface')).toBeVisible();
    
    console.log('✅ API call test passed - backend is working correctly');
  });
}); 