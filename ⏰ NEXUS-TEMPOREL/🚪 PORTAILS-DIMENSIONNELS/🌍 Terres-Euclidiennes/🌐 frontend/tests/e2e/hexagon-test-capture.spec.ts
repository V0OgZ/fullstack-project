import { test, expect } from '@playwright/test';

test.describe('🔷 Hexagonal Test Page Screenshots', () => {
  test('should capture hexagonal terrain rendering', async ({ page }) => {
    console.log('🎮 Capturing hexagonal test page...');
    
    // Navigate to the hexagonal test page
    await page.goto('http://localhost:3000/hexagon-test');
    await page.waitForTimeout(3000);
    
    // Take screenshot of the hexagonal test page
    await page.screenshot({ 
      path: 'test-results/hexagon-test-page.png',
      fullPage: true
    });
    
    // Check if canvas is visible
    const canvas = page.locator('canvas').first();
    if (await canvas.isVisible()) {
      console.log('✅ Canvas found on hexagonal test page');
      
      // Take focused screenshot of just the canvas
      await canvas.screenshot({ 
        path: 'test-results/hexagon-canvas-only.png'
      });
      
      console.log('🔷 Hexagonal test screenshots captured!');
    } else {
      console.log('❌ Canvas not found on hexagonal test page');
    }
  });
}); 