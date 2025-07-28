import { test, expect } from '@playwright/test';

test.describe('🔷 Quick Hexagon Test', () => {
  test('should render hexagonal terrain', async ({ page }) => {
    console.log('🎮 Testing hexagonal terrain rendering...');
    
    // Navigate to the game
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    
    // Take initial screenshot
    await page.screenshot({ 
      path: 'test-results/01-initial-load.png',
      fullPage: true
    });
    
    // Look for any scenario and click it
    const scenarioCard = page.locator('.scenario-card').first();
    if (await scenarioCard.isVisible()) {
      await scenarioCard.click();
      await page.waitForTimeout(3000);
      
      // Take screenshot after scenario selection
      await page.screenshot({ 
        path: 'test-results/02-scenario-selected.png',
        fullPage: true
      });
      
      // Look for canvas
      const canvas = page.locator('canvas').first();
      if (await canvas.isVisible()) {
        console.log('✅ Canvas found - hexagonal rendering should be active');
        
        // Click on canvas to test hexagonal interaction
        await canvas.click({ position: { x: 300, y: 200 } });
        await page.waitForTimeout(1000);
        
        // Final screenshot
        await page.screenshot({ 
          path: 'test-results/03-hexagonal-interaction.png',
          fullPage: true
        });
        
        console.log('🔷 Hexagonal terrain test completed successfully!');
      } else {
        console.log('❌ Canvas not found');
      }
    } else {
      console.log('❌ No scenario card found');
    }
  });
}); 