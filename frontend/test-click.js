const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Listen for console messages
  page.on('console', (msg) => {
    console.log('BROWSER:', msg.text());
  });
  
  // Listen for errors
  page.on('pageerror', (err) => {
    console.log('ERROR:', err.message);
  });
  
  try {
    console.log('🚀 Going to localhost:3000...');
    await page.goto('http://localhost:3000');
    
    console.log('⏳ Waiting for scenarios to load...');
    await page.waitForSelector('.scenario-card', { timeout: 10000 });
    
    console.log('🎮 Clicking conquest classic scenario...');
    await page.click('[data-testid="scenario-card-conquest-classic"]');
    await page.waitForTimeout(2000);
    
    console.log('▶️ Looking for play button...');
    const playButton = await page.$('[data-testid="play-button-conquest-classic"]');
    if (playButton) {
      console.log('✅ Play button found! Clicking...');
      await page.click('[data-testid="play-button-conquest-classic"]');
      await page.waitForTimeout(3000);
      
      console.log('🎮 Waiting for game interface...');
      try {
        await page.waitForSelector('.true-heroes-interface', { timeout: 15000 });
        console.log('✅ Game interface loaded successfully!');
      } catch (e) {
        console.log('❌ Game interface not found:', e.message);
        
        // Check what's on the page
        const url = page.url();
        console.log('📍 Current URL:', url);
        
        // Take a screenshot
        await page.screenshot({ path: 'after-click-screenshot.png' });
        console.log('📸 Screenshot saved');
      }
    } else {
      console.log('❌ Play button not found!');
    }
    
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})(); 