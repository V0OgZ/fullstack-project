import { test, expect } from '@playwright/test';

test.describe('Quick Multiplayer Test', () => {
  test('should load multiplayer page without session name errors', async ({ page }) => {
    // Capture console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Capture page errors
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    // Navigate to multiplayer page
    await page.goto('/multiplayer');
    
    // Wait for the page to load
    await page.waitForTimeout(2000);
    
    // Check that the page loaded without errors
    expect(pageErrors.filter(err => err.includes('includes'))).toHaveLength(0);
    expect(consoleErrors.filter(err => err.includes('includes'))).toHaveLength(0);
    
    // Check that basic elements are visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Try to create a session to test session name generation
    if (await page.locator('button:has-text("Create Session")').isVisible()) {
      await page.click('button:has-text("Create Session")');
      await page.waitForTimeout(1000);
      
      // Check that session name input has a value (auto-generated)
      const sessionNameInput = page.locator('input[placeholder*="Session Name"], input[placeholder*="session name"]');
      if (await sessionNameInput.isVisible()) {
        const sessionName = await sessionNameInput.inputValue();
        expect(sessionName).toBeTruthy();
        console.log('✅ Session name generated:', sessionName);
      }
    }
    
    // Final check - no includes errors should have occurred
    expect(pageErrors.filter(err => err.includes('includes'))).toHaveLength(0);
    expect(consoleErrors.filter(err => err.includes('includes'))).toHaveLength(0);
    
    console.log('✅ Multiplayer page loaded successfully without session name errors');
  });
}); 