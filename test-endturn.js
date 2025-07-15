const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Listen for console messages
  page.on('console', (msg) => {
    if (msg.text().includes('HTTP error') || msg.text().includes('400')) {
      console.log('❌ API ERROR:', msg.text());
    }
  });
  
  // Listen for network requests
  page.on('response', (response) => {
    if (response.url().includes('end-turn')) {
      console.log(`🔄 END-TURN API: ${response.status()} ${response.url()}`);
    }
  });
  
  try {
    console.log('🚀 Testing endTurn API fix...');
    await page.goto('http://localhost:3000/demo');
    
    console.log('⏳ Waiting for game to load...');
    await page.waitForSelector('.true-heroes-interface', { timeout: 10000 });
    
    console.log('⭐ Looking for end turn button...');
    const endTurnBtn = page.locator('button[title*="turn"], button[title*="Turn"], button:has-text("⭐"), [data-testid="end-turn-btn"]').first();
    
    if (await endTurnBtn.isVisible()) {
      console.log('🎯 Found end turn button, clicking...');
      await endTurnBtn.click();
      await page.waitForTimeout(3000);
      console.log('✅ End turn button clicked successfully!');
    } else {
      console.log('⚠️ End turn button not found');
    }
    
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})(); 