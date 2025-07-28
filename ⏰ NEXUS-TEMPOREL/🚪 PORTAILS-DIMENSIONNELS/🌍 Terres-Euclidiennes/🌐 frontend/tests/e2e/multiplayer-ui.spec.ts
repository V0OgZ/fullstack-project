import { test, expect } from '@playwright/test';

test.describe('🎮 Multiplayer UI Tests', () => {
  test('Multiplayer interface loads correctly', async ({ page }) => {
    test.setTimeout(30000); // 30 seconds timeout
    
    // Force English language
    await page.addInitScript(() => {
      localStorage.setItem('heroes-reforged-i18n', JSON.stringify({
        state: { language: 'en' },
        version: 0
      }));
    });
    
    console.log('🎮 Testing multiplayer UI...');
    
    // Go directly to multiplayer page
    await page.goto('http://localhost:3000/multiplayer');
    await page.waitForLoadState('networkidle');
    
    // Check that multiplayer session manager loads
    console.log('📍 Checking multiplayer session manager...');
    
    // Should see the title
    await expect(page.locator('h2:has-text("Multiplayer Sessions")')).toBeVisible({ timeout: 10000 });
    
    // Should see create session button
    const createBtn = page.getByTestId('create-session-btn');
    await expect(createBtn).toBeVisible();
    
    // Should see refresh button
    const refreshBtn = page.locator('button:has-text("Refresh")');
    await expect(refreshBtn).toBeVisible();
    
    // Check that some key text is present
    const pollingText = await page.locator('text=/Polling Mode Active/i').count();
    const availableSessionsText = await page.locator('text=/Available Sessions/i').count();
    expect(pollingText + availableSessionsText).toBeGreaterThan(0);
    
    console.log('✅ Multiplayer UI elements present');
    
    // Test create session flow
    console.log('🔧 Testing create session UI...');
    await createBtn.click();
    await page.waitForTimeout(1000);
    
    // Check if form appears
    const sessionNameInput = page.locator('input[placeholder*="session name"]');
    const heroNameInput = page.locator('input[placeholder*="hero name"]');
    
    if (await sessionNameInput.count() > 0) {
      console.log('📝 Session creation form found');
      
      // Fill the form
      await sessionNameInput.fill('Test Session UI');
      await heroNameInput.fill('TestHero');
      
      // Check for player count selector
      const playerCountSelect = page.locator('select[data-testid="player-count-select"]');
      if (await playerCountSelect.count() > 0) {
        console.log('   - Player count selector: ✅');
      }
      
      // Check for game mode selector
      const gameModeSelect = page.locator('select[data-testid="game-mode-select"]');
      if (await gameModeSelect.count() > 0) {
        console.log('   - Game mode selector: ✅');
      }
      
      // Take screenshot of the form
      await page.screenshot({ 
        path: 'test-results/multiplayer-ui-form.png',
        fullPage: true
      });
      
      // Check for create button
      const createNewGameBtn = page.getByTestId('create-new-game-btn');
      await expect(createNewGameBtn).toBeVisible();
      console.log('   - Create game button: ✅');
      
      // Cancel to go back
      const cancelBtn = page.locator('button:has-text("Cancel")');
      if (await cancelBtn.count() > 0) {
        await cancelBtn.click();
        await page.waitForTimeout(1000);
      }
    }
    
    // Test refresh functionality
    console.log('🔄 Testing refresh button...');
    await refreshBtn.click();
    await page.waitForTimeout(2000);
    
    // Should still see the UI elements
    await expect(createBtn).toBeVisible();
    
    // Take final screenshot
    await page.screenshot({ 
      path: 'test-results/multiplayer-ui-main.png',
      fullPage: true
    });
    
    console.log('✅ Multiplayer UI test completed successfully!');
  });
}); 