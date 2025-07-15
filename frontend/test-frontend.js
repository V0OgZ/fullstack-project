const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Enable console logging
  page.on('console', (msg) => {
    console.log('CONSOLE:', msg.text());
  });
  
  // Enable error logging
  page.on('pageerror', (err) => {
    console.log('PAGE ERROR:', err.message);
  });
  
  try {
    console.log('🚀 Navigating to frontend...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    console.log('✅ Page loaded successfully');
    
    // Check if scenario cards are present
    const scenarioCards = await page.$$('.scenario-card');
    console.log(`📋 Found ${scenarioCards.length} scenario cards`);
    
    // Check if conquest-classic exists
    const conquestCard = await page.$('[data-testid="scenario-card-conquest-classic"]');
    console.log(`🎮 Conquest Classic card found: ${conquestCard ? 'YES' : 'NO'}`);
    
    if (conquestCard) {
      console.log('🖱️ Clicking conquest classic card...');
      await conquestCard.click();
      await page.waitForTimeout(1000);
      
      const playButton = await page.$('[data-testid="play-button-conquest-classic"]');
      console.log(`▶️ Play button found: ${playButton ? 'YES' : 'NO'}`);
    }
    
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})(); 