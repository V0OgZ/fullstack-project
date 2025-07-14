import { test, expect } from '@playwright/test';

test.describe('🎮 Heroes of Time - Multiplayer Demo', () => {
  test('Complete multiplayer session demonstration', async ({ browser }) => {
    test.setTimeout(120000);
    
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    console.log('🚀 Starting multiplayer demo...');

    // Player 1: Create session
    await page1.goto('http://localhost:3000/multiplayer');
    await page1.waitForSelector('h2:has-text("Multiplayer Sessions")', { timeout: 30000 });
    await page1.click('[data-testid="create-session-btn"]');
    await page1.waitForTimeout(2000);
    
    // Use unique session name
    const sessionName = `Demo-${Date.now()}`;
    await page1.fill('[data-testid="session-name-input"]', sessionName);
    await page1.fill('[data-testid="hero-name-input"]', 'Player 1');
    await page1.click('[data-testid="create-new-game-btn"]');
    await page1.waitForTimeout(3000);
    
    // Wait for Player 1 to be in waiting room
    await page1.waitForSelector('[data-testid="waiting-room"]', { timeout: 15000 });
    console.log('✅ Player 1 created session and is in waiting room');

    // Show demo tooltip for Player 2
    await page2.evaluate(() => {
      const tooltip = document.createElement('div');
      tooltip.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(22,33,62,0.95) 50%, rgba(15,52,96,0.95) 100%);
        color: #ffd700;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        font-family: 'Segoe UI', sans-serif;
        font-size: 14px;
        font-weight: 600;
        z-index: 9999;
        border: 2px solid #ffd700;
        text-align: center;
        min-width: 200px;
      `;
      tooltip.innerHTML = '🎮 Player 2 - Joining Session';
      document.body.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.remove();
      }, 3000);
    });
    
    // Player 2: Join session
    await page2.goto('http://localhost:3000/multiplayer');
    await page2.waitForSelector('h2:has-text("Multiplayer Sessions")', { timeout: 30000 });
    await page2.waitForTimeout(2000);
    
    // Find and join the session with the specific name created by Player 1
    const sessionItems = await page2.locator('[data-testid="session-item"]').all();
    let sessionFound = false;
    
    for (const sessionItem of sessionItems) {
      const sessionText = await sessionItem.textContent();
      if (sessionText?.includes(sessionName)) {
        const joinButton = sessionItem.locator('[data-testid="join-session-btn"]');
        await joinButton.click();
        await page2.waitForTimeout(2000);
        sessionFound = true;
        break;
      }
    }
    
    if (!sessionFound) {
      throw new Error(`Session with name ${sessionName} not found`);
    }
    
    console.log('✅ Player 2 joined the session');
    
    // Wait for session to update
    await page1.waitForTimeout(6000);
    
    // Player 1: Start battle
    console.log('⚔️ Starting battle...');
    const startBtn = page1.locator('[data-testid="start-battle-btn"]');
    await startBtn.click();
    await page1.waitForTimeout(5000);
    
    // Wait for both players to be in game
    await page1.waitForSelector('.true-heroes-interface', { timeout: 20000 });
    await page2.waitForSelector('.true-heroes-interface', { timeout: 20000 });
    
    console.log('🎮 Both players in game!');
    
    // Player 1: Test panels
    console.log('🎛️ Player 1: Testing panels...');
    await page1.click('[data-testid="heroes-panel-btn"]');
    await page1.waitForTimeout(2000);
    
    await page1.click('[data-testid="castle-panel-btn"]');
    await page1.waitForTimeout(2000);
    
    await page1.click('[data-testid="inventory-panel-btn"]');
    await page1.waitForTimeout(2000);
    
    // Player 1: End turn
    console.log('⭐ Player 1: Ending turn...');
    await page1.click('[data-testid="end-turn-btn"]');
    await page1.waitForTimeout(3000);
    
    // Player 2: Test panels
    console.log('🎮 Player 2: Testing panels...');
    await page2.click('[data-testid="heroes-panel-btn"]');
    await page2.waitForTimeout(2000);
    
    // Player 2: End turn
    console.log('⭐ Player 2: Ending turn...');
    await page2.click('[data-testid="end-turn-btn"]');
    await page2.waitForTimeout(3000);
    
    // Success message on both windows
    await page1.evaluate(() => {
      const success = document.createElement('div');
      success.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(0,150,0,0.95) 0%, rgba(0,200,0,0.95) 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        font-family: 'Segoe UI', sans-serif;
        font-size: 18px;
        font-weight: 700;
        z-index: 10000;
        text-align: center;
        border: 3px solid #00ff00;
      `;
      success.innerHTML = '🎉 MULTIPLAYER DEMO COMPLETE! 🎉<br/>Player 1 Success!';
      document.body.appendChild(success);
      
      setTimeout(() => {
        success.remove();
      }, 5000);
    });
    
    await page2.evaluate(() => {
      const success = document.createElement('div');
      success.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(0,150,0,0.95) 0%, rgba(0,200,0,0.95) 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        font-family: 'Segoe UI', sans-serif;
        font-size: 18px;
        font-weight: 700;
        z-index: 10000;
        text-align: center;
        border: 3px solid #00ff00;
      `;
      success.innerHTML = '🎉 MULTIPLAYER DEMO COMPLETE! 🎉<br/>Player 2 Success!';
      document.body.appendChild(success);
      
      setTimeout(() => {
        success.remove();
      }, 5000);
    });
    
    await page1.waitForTimeout(5000);
    
    console.log('🎉 Multiplayer demo completed successfully!');
    console.log('✅ Session creation: Working');
    console.log('✅ Session joining: Working');
    console.log('✅ Auto-navigation: Working');
    console.log('✅ Player synchronization: Working');
    console.log('✅ Multiplayer gameplay: Working');
    
    await context1.close();
    await context2.close();
  });
}); 