const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Listen for console messages
  page.on('console', (msg) => {
    console.log('BROWSER CONSOLE:', msg.text());
  });
  
  // Listen for errors
  page.on('pageerror', (err) => {
    console.log('PAGE ERROR:', err.message);
  });
  
  try {
    console.log('🚀 Going to localhost:3000...');
    await page.goto('http://localhost:3000');
    
    console.log('⏳ Waiting for page to load...');
    await page.waitForTimeout(5000);
    
    // Check if we can find scenario cards
    const title = await page.title();
    console.log('📄 Page title:', title);
    
    const scenarioCards = await page.$$('.scenario-card');
    console.log(`📋 Found ${scenarioCards.length} scenario cards`);
    
    // Check for specific elements
    const conquestCard = await page.$('[data-testid="scenario-card-conquest-classic"]');
    console.log(`🎮 Conquest Classic card: ${conquestCard ? 'FOUND' : 'NOT FOUND'}`);
    
    // Take a screenshot
    await page.screenshot({ path: 'debug-screenshot.png' });
    console.log('📸 Screenshot saved as debug-screenshot.png');
    
    // Wait a bit more to see the page
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
})(); 