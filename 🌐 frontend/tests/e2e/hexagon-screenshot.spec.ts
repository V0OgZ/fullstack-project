import { test, expect } from '@playwright/test';

test.describe('🔷 Hexagon Screenshot Test', () => {
  test('should take screenshot of hexagonal terrain', async ({ page }) => {
    console.log('🎮 Taking hexagonal terrain screenshot...');
    
    // Navigate to the game
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3000);
    
    // Take initial screenshot
    await page.screenshot({ 
      path: 'test-results/hexagon-initial.png',
      fullPage: true
    });
    
    // Try to click on first scenario card
    const scenarioCards = await page.locator('.scenario-card').all();
    console.log(`Found ${scenarioCards.length} scenario cards`);
    
    if (scenarioCards.length > 0) {
      await scenarioCards[0].click();
      await page.waitForTimeout(3000);
      
      // Take screenshot after scenario selection
      await page.screenshot({ 
        path: 'test-results/hexagon-after-scenario.png',
        fullPage: true
      });
      
      // Look for canvas
      const canvas = page.locator('canvas').first();
      if (await canvas.isVisible()) {
        console.log('✅ Canvas found - taking hexagonal rendering screenshot');
        
        // Take focused screenshot of canvas area
        await canvas.screenshot({ 
          path: 'test-results/hexagon-canvas.png'
        });
        
        // Click on canvas to test interaction
        await canvas.click({ position: { x: 300, y: 200 } });
        await page.waitForTimeout(1000);
        
        // Final screenshot with interaction
        await page.screenshot({ 
          path: 'test-results/hexagon-final.png',
          fullPage: true
        });
        
        console.log('🔷 Screenshots taken successfully!');
      } else {
        console.log('❌ Canvas not found');
      }
    } else {
      console.log('❌ No scenario cards found');
    }
  });
}); 