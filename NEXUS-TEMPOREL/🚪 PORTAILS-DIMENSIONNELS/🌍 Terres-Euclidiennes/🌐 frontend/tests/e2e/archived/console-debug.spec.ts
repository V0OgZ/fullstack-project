import { test, expect } from '@playwright/test';

test.describe('Console Debug', () => {
  test('should capture console logs during scenario loading', async ({ page }) => {
    // Listen to console messages
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      consoleMessages.push(msg.text());
      console.log(`[Browser Console] ${msg.text()}`);
    });

    // Navigate to the game page
    await page.goto('http://localhost:3000/game/conquest-classic');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Wait a bit more for any async operations
    await page.waitForTimeout(5000);
    
    // Check if we're on the game page
    await expect(page).toHaveURL(/\/game\/conquest-classic/);
    
    // Check what's currently visible on the page
    const pageContent = await page.content();
    console.log('Page content length:', pageContent.length);
    
    // Check if loading element is present
    const loadingElement = await page.locator('.true-heroes-loading').count();
    console.log('Loading elements found:', loadingElement);
    
    // Check if game interface is present
    const gameInterface = await page.locator('.true-heroes-interface').count();
    console.log('Game interface elements found:', gameInterface);
    
    // Check if error element is present
    const errorElement = await page.locator('.true-heroes-error').count();
    console.log('Error elements found:', errorElement);
    
    // Take a screenshot
    await page.screenshot({ path: 'console-debug.png', fullPage: true });
    
    // Log all console messages
    console.log('=== All Console Messages ===');
    consoleMessages.forEach((msg, index) => {
      console.log(`${index + 1}: ${msg}`);
    });
    
    // Check if there are any error messages
    const errorMessages = consoleMessages.filter(msg => 
      msg.includes('Error') || msg.includes('error') || msg.includes('Failed')
    );
    
    if (errorMessages.length > 0) {
      console.log('=== Error Messages ===');
      errorMessages.forEach(msg => console.log(msg));
    }
    
    console.log('✅ Console debug test completed');
  });
}); 