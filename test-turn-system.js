const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🎮 Testing Turn Management System...');
  
  try {
    await page.goto('http://localhost:3000');
    
    // Navigate to game
    console.log('📍 Navigating to Conquest Classic (Hotseat mode)...');
    await page.click('[data-testid="scenario-card-conquest-classic"]');
    
    // Wait for game to load
    await page.waitForSelector('.true-heroes-interface', { timeout: 15000 });
    
    // Check initial turn
    console.log('🔍 Checking initial turn...');
    const initialTurn = await page.textContent('.current-turn');
    console.log('Initial turn:', initialTurn);
    
    // Check button text (should be "Next Player" for hotseat)
    const buttonTitle = await page.getAttribute('.end-turn-btn', 'title');
    console.log('Button title:', buttonTitle);
    
    if (buttonTitle === 'Next Player') {
      console.log('✅ Correct button for hotseat mode');
    } else {
      console.log('❌ Wrong button for hotseat mode');
    }
    
    // Test turn progression
    console.log('🔄 Testing turn progression...');
    for (let i = 0; i < 5; i++) {
      await page.click('.end-turn-btn');
      await page.waitForTimeout(1000);
      
      const currentTurn = await page.textContent('.current-turn');
      console.log(`Turn ${i + 1}: ${currentTurn}`);
    }
    
    // Test with multiplayer scenario
    console.log('📍 Testing multiplayer scenario...');
    await page.goto('http://localhost:3000');
    
    // Navigate to multiplayer arena
    await page.click('[data-testid="scenario-card-multiplayer-arena"]');
    await page.waitForSelector('.true-heroes-interface', { timeout: 15000 });
    
    // Check button text (should be "End Turn" for multiplayer)
    const mpButtonTitle = await page.getAttribute('.end-turn-btn', 'title');
    console.log('Multiplayer button title:', mpButtonTitle);
    
    if (mpButtonTitle === 'End Turn') {
      console.log('✅ Correct button for multiplayer mode');
    } else {
      console.log('❌ Wrong button for multiplayer mode');
    }
    
    console.log('✅ Turn system test completed!');
    
  } catch (error) {
    console.error('❌ Error during test:', error.message);
  } finally {
    await browser.close();
  }
})(); 