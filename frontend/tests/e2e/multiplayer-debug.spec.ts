import { test, expect } from '@playwright/test';

test.describe('Multiplayer Debug Test', () => {
  test('should debug multiplayer flow step by step', async ({ page }) => {
    console.log('🚀 Starting multiplayer debug...');

    // Go to multiplayer page
    await page.goto('http://localhost:3000/multiplayer');
    
    // Wait for the page to load
    await page.waitForSelector('h2:has-text("Multiplayer Sessions")', { timeout: 30000 });
    console.log('✅ Multiplayer page loaded');

    // Take screenshot
    await page.screenshot({ path: 'debug-multiplayer-1.png' });

    // Try to find create session button
    const createBtn = page.locator('[data-testid="create-session-btn"]');
    await expect(createBtn).toBeVisible({ timeout: 10000 });
    console.log('✅ Create session button found');

    // Click create session
    await createBtn.click();
    await page.waitForTimeout(2000);
    console.log('✅ Create session clicked');

    // Take screenshot
    await page.screenshot({ path: 'debug-multiplayer-2.png' });

    // Fill in session details
    await page.fill('[data-testid="session-name-input"]', 'Debug Session');
    await page.fill('[data-testid="hero-name-input"]', 'Debug Hero');
    
    // Click create new game
    await page.click('[data-testid="create-new-game-btn"]');
    await page.waitForTimeout(3000);
    console.log('✅ Session creation requested');

    // Take screenshot
    await page.screenshot({ path: 'debug-multiplayer-3.png' });

    // Check if we're in waiting room
    await page.waitForSelector('[data-testid="waiting-room"]', { timeout: 15000 });
    console.log('✅ Waiting room loaded');

    // Take screenshot
    await page.screenshot({ path: 'debug-multiplayer-4.png' });

    // Look for start battle button
    const startBtn = page.locator('[data-testid="start-battle-btn"]');
    const isStartBtnVisible = await startBtn.isVisible();
    console.log('🎯 Start battle button visible:', isStartBtnVisible);

    if (isStartBtnVisible) {
      const isStartBtnEnabled = await startBtn.isEnabled();
      console.log('🎯 Start battle button enabled:', isStartBtnEnabled);
      
      if (isStartBtnEnabled) {
        await startBtn.click();
        console.log('✅ Start battle clicked');
      } else {
        console.log('❌ Start battle button is disabled (need more players)');
      }
    } else {
      console.log('❌ Start battle button not visible');
    }

    console.log('🎉 Debug test completed');
  });
}); 