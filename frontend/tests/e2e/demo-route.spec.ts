import { test, expect } from '@playwright/test';

test.describe('🎮 Heroes of Time - Demo Route', () => {
  test('Demo route loads game directly', async ({ page }) => {
    test.setTimeout(60000); // 1 minute
    
    console.log('🚀 Testing /demo route...');
    
    // Navigate to demo route
    await page.goto('/demo');
    
    // Wait for game to load
    console.log('⏳ Waiting for game to load...');
    await page.waitForSelector('.true-heroes-interface', { timeout: 30000 });
    
    // Verify we're in the game
    await expect(page).toHaveURL('/demo');
    
    // Check that the title shows conquest classic
    await page.waitForTimeout(2000);
    const title = await page.title();
    console.log(`📋 Page title: ${title}`);
    expect(title).toContain('Heroes of Time');
    
    // Verify game interface is loaded
    const gameInterface = page.locator('.true-heroes-interface');
    await expect(gameInterface).toBeVisible();
    
    // Check for basic game elements
    const heroesButton = page.locator('button[title*="hero"], .control-btn:has(.btn-icon:text("⚔️"))');
    const castleButton = page.locator('button[title*="castle"], .control-btn:has(.btn-icon:text("🏰"))');
    const inventoryButton = page.locator('button[title*="inventory"], .control-btn:has(.btn-icon:text("🎒"))');
    
    if (await heroesButton.isVisible()) {
      console.log('✅ Heroes button found');
    }
    if (await castleButton.isVisible()) {
      console.log('✅ Castle button found');
    }
    if (await inventoryButton.isVisible()) {
      console.log('✅ Inventory button found');
    }
    
    console.log('🎉 Demo route test completed successfully!');
  });
}); 