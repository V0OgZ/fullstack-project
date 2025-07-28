const { chromium } = require('playwright');

async function captureHexagonScreenshots() {
  console.log('🎮 Starting hexagonal screenshot capture...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the hexagonal test page
    console.log('📍 Navigating to hexagonal test page...');
    await page.goto('http://localhost:3000/hexagon-test');
    await page.waitForTimeout(3000);
    
    // Take screenshot of the full page
    console.log('📸 Taking full page screenshot...');
    await page.screenshot({ 
      path: 'test-results/hexagon-test-page.png',
      fullPage: true
    });
    
    // Check if canvas is visible
    const canvas = page.locator('canvas').first();
    if (await canvas.isVisible()) {
      console.log('✅ Canvas found - taking canvas screenshot...');
      
      // Take focused screenshot of just the canvas
      await canvas.screenshot({ 
        path: 'test-results/hexagon-canvas-only.png'
      });
      
      console.log('🔷 Hexagonal screenshots captured successfully!');
    } else {
      console.log('❌ Canvas not found');
    }
    
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.error('❌ Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureHexagonScreenshots(); 