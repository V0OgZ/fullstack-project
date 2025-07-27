import { test, expect } from '@playwright/test';

test.describe('🌍 Terrain & Vision Demo', () => {
  test('Complete terrain vision demo with screenshots', async ({ page }) => {
    test.setTimeout(60000);
    
    console.log('🎮 Starting terrain & vision demo...');
    
    // Force English language
    await page.addInitScript(() => {
      localStorage.setItem('heroes-reforged-i18n', JSON.stringify({
        state: { language: 'en' },
        version: 0
      }));
    });
    
    // 1. Navigate to game
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // 2. Select Conquest Classic
    console.log('📍 Selecting Conquest Classic scenario...');
    await page.getByTestId('scenario-card-conquest-classic').click();
    await page.waitForTimeout(500);
    
    // Wait for scenario selector to load completely
    await page.waitForSelector('[data-testid="scenario-card-conquest-classic"]', { state: 'visible' });
    
    // Start the game by clicking the scenario card
    const scenarioCard = page.getByTestId('scenario-card-conquest-classic');
    await scenarioCard.click();
    
    console.log('✅ Clicked on Conquest Classic scenario card');
    
    // 4. Wait for canvas
    console.log('⏳ Waiting for game to load...');
    await page.waitForSelector('canvas', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // 5. Take initial screenshot
    console.log('📸 Taking initial terrain screenshot...');
    await page.screenshot({ 
      path: 'test-results/terrain-1-initial.png',
      fullPage: false
    });
    
    // 6. Click on a hero to select
    console.log('🦸 Selecting a hero...');
    
    // Check whose turn it is first
    const currentTurnElement = await page.locator('.current-turn').textContent();
    console.log('Current turn:', currentTurnElement);
    
    // If it's not Player 1's turn, end turn
    if (!currentTurnElement?.includes('Player 1')) {
      console.log('⏭️ Not Player 1 turn, ending turn first...');
      await page.getByRole('button', { name: /End.*Turn/i }).click();
      await page.waitForTimeout(1000);
    }
    
    const canvas = page.locator('canvas').first();
    await canvas.click({ position: { x: 300, y: 200 } });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/terrain-2-hero-selected.png',
      fullPage: false
    });
    
    // 7. Move hero to new position
    console.log('🚶 Moving hero to update vision...');
    await canvas.click({ position: { x: 400, y: 250 } });
    await page.waitForTimeout(1500);
    
    await page.screenshot({ 
      path: 'test-results/terrain-3-after-movement.png',
      fullPage: false
    });
    
    // 8. Pan map to show fog of war
    console.log('🌫️ Panning to show fog of war...');
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(200);
    }
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(200);
    }
    
    await page.screenshot({ 
      path: 'test-results/terrain-4-fog-of-war.png',
      fullPage: false
    });
    
    // 9. End turn
    console.log('⏭️ Ending turn...');
    await page.getByRole('button', { name: /End.*Turn/i }).click();
    await page.waitForTimeout(1000);
    
    // 10. Final screenshot
    console.log('📸 Taking final screenshot...');
    await page.screenshot({ 
      path: 'test-results/terrain-5-final.png',
      fullPage: true
    });
    
    console.log('✅ Terrain & Vision demo completed successfully!');
    console.log('📁 Screenshots saved in test-results/');
  });
}); 