import { test, expect } from '@playwright/test';

test.describe('🌍 Terrain & Vision Demo', () => {
  test('Complete terrain vision demo with screenshots', async ({ page }) => {
    test.setTimeout(60000);
    
    console.log('🎮 Starting terrain & vision demo...');
    
    // 1. Navigate to game
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // 2. Select Conquest Classic
    console.log('📍 Selecting Conquest Classic scenario...');
    await page.getByText('Conquest Classic').click();
    await page.waitForTimeout(500);
    
    // 3. Start Game
    console.log('🚀 Starting game...');
    const startButton = page.getByRole('button', { name: 'Start Game' }).or(
      page.getByRole('button', { name: 'Start Solo Game' })
    );
    await startButton.click();
    
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
    
    // 6. Click on hero to show movement highlights
    console.log('🦸 Selecting hero for movement highlights...');
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