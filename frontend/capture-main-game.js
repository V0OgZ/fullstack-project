const { chromium } = require('playwright');

async function captureMainGameScreenshots() {
  console.log('🎮 Starting main game screenshot capture...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the main game
    console.log('📍 Navigating to main game...');
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3000);
    
    // Take screenshot of the main page
    console.log('📸 Taking main page screenshot...');
    await page.screenshot({ 
      path: 'test-results/main-game-page.png',
      fullPage: true
    });
    
    // Try to click on a scenario card
    const scenarioCards = await page.locator('.scenario-card').all();
    console.log(`Found ${scenarioCards.length} scenario cards`);
    
    if (scenarioCards.length > 0) {
      console.log('🎯 Clicking on first scenario...');
      await scenarioCards[0].click();
      await page.waitForTimeout(5000);
      
      // Take screenshot after scenario selection
      console.log('📸 Taking game screenshot...');
      await page.screenshot({ 
        path: 'test-results/main-game-after-scenario.png',
        fullPage: true
      });
      
      // Check if canvas is visible
      const canvas = page.locator('canvas').first();
      if (await canvas.isVisible()) {
        console.log('✅ Canvas found - taking canvas screenshot...');
        
        // Take focused screenshot of just the canvas
        await canvas.screenshot({ 
          path: 'test-results/main-game-canvas.png'
        });
        
        console.log('🔷 Main game screenshots captured successfully!');
      } else {
        console.log('❌ Canvas not found in main game');
      }
    } else {
      console.log('❌ No scenario cards found');
    }
    
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.error('❌ Error capturing main game screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureMainGameScreenshots(); 