const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting console error capture...\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Capturer tous les messages de console
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    
    if (type === 'error') {
      console.error(`\n❌ CONSOLE ERROR: ${text}`);
    } else if (type === 'warning') {
      console.warn(`\n⚠️  CONSOLE WARNING: ${text}`);
    }
  });

  // Capturer les erreurs de page
  page.on('pageerror', error => {
    console.error(`\n💥 PAGE ERROR:`, error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  });

  // Capturer les requêtes échouées
  page.on('requestfailed', request => {
    console.error(`\n🔴 REQUEST FAILED: ${request.method()} ${request.url()}`);
  });

  console.log('📍 Navigating to http://localhost:3000...\n');
  await page.goto('http://localhost:3000');
  
  console.log('⏳ Waiting for page to load...\n');
  await page.waitForTimeout(3000);
  
  // Essayer de démarrer le jeu
  console.log('🎮 Trying to start a game...\n');
  
  try {
    await page.waitForSelector('.scenario-card', { timeout: 5000 });
    await page.click('.scenario-card:first-child');
    console.log('✅ Clicked on first scenario\n');
  } catch (e) {
    console.error('❌ Could not find scenario card\n');
  }
  
  await page.waitForTimeout(2000);
  
  try {
    await page.click('button:has-text("Start Game")');
    console.log('✅ Clicked Start Game\n');
  } catch (e) {
    console.error('❌ Could not click Start Game\n');
  }
  
  console.log('⏳ Waiting to capture game errors...\n');
  await page.waitForTimeout(5000);
  
  console.log('📸 Taking screenshot...\n');
  await page.screenshot({ path: 'console-debug-screenshot.png', fullPage: true });
  
  console.log('\n🏁 Debug session complete. Press Ctrl+C to exit.\n');
  
  // Garder le navigateur ouvert
  await page.waitForTimeout(60000);
  
  await browser.close();
})(); 