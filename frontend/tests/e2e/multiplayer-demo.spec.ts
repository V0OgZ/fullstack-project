import { test, expect } from '@playwright/test';

test.describe('👥 Heroes of Time - Multiplayer Demo', () => {
  test('Dual window multiplayer session', async ({ browser }) => {
    test.setTimeout(90000); // 1.5 minutes
    
    console.log('🚀 Starting multiplayer demo...');
    
    // Create two browser contexts for two players
    const context1 = await browser.newContext({
      viewport: { width: 640, height: 800 }
    });
    const context2 = await browser.newContext({
      viewport: { width: 640, height: 800 }
    });
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    // Position windows side by side
    await page1.setViewportSize({ width: 640, height: 800 });
    await page2.setViewportSize({ width: 640, height: 800 });
    
    console.log('🎮 Player 1: Creating multiplayer session...');
    
    // Show demo tooltip for Player 1
    await page1.evaluate(() => {
      const tooltip = document.createElement('div');
      tooltip.id = 'demo-tooltip';
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
      tooltip.innerHTML = '🎮 Player 1 - Creating Session';
      document.body.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.remove();
      }, 3000);
    });
    
    // Player 1: Create session
    await page1.goto('http://localhost:3000/multiplayer');
    await page1.waitForSelector('h2:has-text("Multiplayer Sessions")', { timeout: 30000 });
    await page1.click('[data-testid="create-session-btn"]');
    await page1.waitForTimeout(2000);
    
    // Use unique session name for identification
    const sessionName = `MultiplayerDemo-${Date.now()}`;
    await page1.fill('[data-testid="session-name-input"]', sessionName);
    await page1.fill('[data-testid="hero-name-input"]', 'Player 1');
    await page1.click('[data-testid="create-new-game-btn"]');
    await page1.waitForTimeout(3000);
    
    // Player 1 should be in waiting room
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
    
    // Player 2: Go to multiplayer page
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
    
    console.log('⚔️ Starting battle...');
    
    // Wait for Player 1 to see the enabled Start Battle button (they created the session)
    await page1.waitForSelector('[data-testid="start-battle-btn"]:not([disabled])', { timeout: 15000 });
    
    // Player 2 should also see their waiting room
    await page2.waitForSelector('[data-testid="waiting-room"]', { timeout: 15000 });
    
    // Player 1 starts the battle
    await page1.click('[data-testid="start-battle-btn"]');
    await page1.waitForTimeout(3000);
    
    // Wait for both players to be in game
    await page1.waitForSelector('.true-heroes-interface', { timeout: 20000 });
    await page2.waitForSelector('.true-heroes-interface', { timeout: 20000 });
    
    console.log('🎮 Both players in game!');
    
    // Show demo tooltips for both players
    await page1.evaluate(() => {
      const tooltip = document.createElement('div');
      tooltip.id = 'demo-tooltip';
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
      tooltip.innerHTML = '🎮 Player 1 - Your Turn';
      document.body.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.remove();
      }, 3000);
    });
    
    await page2.evaluate(() => {
      const tooltip = document.createElement('div');
      tooltip.id = 'demo-tooltip';
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
      tooltip.innerHTML = '⏳ Player 2 - Waiting';
      document.body.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.remove();
      }, 3000);
    });
    
    await page1.waitForTimeout(4000);
    
    // Player 1 navigates through panels
    console.log('🎛️ Player 1: Exploring panels...');
    
    const heroesButton1 = page1.locator('button[title*="hero"], .control-btn:has(.btn-icon:text("⚔️"))').first();
    if (await heroesButton1.isVisible()) {
      await heroesButton1.click();
      await page1.waitForTimeout(2000);
    }
    
    const castleButton1 = page1.locator('button[title*="castle"], .control-btn:has(.btn-icon:text("🏰"))').first();
    if (await castleButton1.isVisible()) {
      await castleButton1.click();
      await page1.waitForTimeout(2000);
    }
    
    // Player 1 ends turn
    console.log('⭐ Player 1: Ending turn...');
    
    await page1.evaluate(() => {
      const tooltip = document.createElement('div');
      tooltip.id = 'demo-tooltip';
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
      tooltip.innerHTML = '⭐ Player 1 - Ending Turn';
      document.body.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.remove();
      }, 2000);
    });
    
    const endTurnButton1 = page1.locator('button:has-text("⭐"), button[title*="turn"]').first();
    if (await endTurnButton1.isVisible()) {
      await endTurnButton1.click();
      await page1.waitForTimeout(2000);
    }
    
    // Player 2's turn
    console.log('🎮 Player 2: Your turn now!');
    
    await page2.evaluate(() => {
      const tooltip = document.createElement('div');
      tooltip.id = 'demo-tooltip';
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
      tooltip.innerHTML = '🎮 Player 2 - Your Turn!';
      document.body.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.remove();
      }, 2000);
    });
    
    await page2.waitForTimeout(3000);
    
    // Player 2 navigates through panels
    const heroesButton2 = page2.locator('button[title*="hero"], .control-btn:has(.btn-icon:text("⚔️"))').first();
    if (await heroesButton2.isVisible()) {
      await heroesButton2.click();
      await page2.waitForTimeout(2000);
    }
    
    const inventoryButton2 = page2.locator('button[title*="inventory"], .control-btn:has(.btn-icon:text("🎒"))').first();
    if (await inventoryButton2.isVisible()) {
      await inventoryButton2.click();
      await page2.waitForTimeout(2000);
    }
    
    // Player 2 ends turn
    console.log('⭐ Player 2: Ending turn...');
    
    const endTurnButton2 = page2.locator('button:has-text("⭐"), button[title*="turn"]').first();
    if (await endTurnButton2.isVisible()) {
      await endTurnButton2.click();
      await page2.waitForTimeout(2000);
    }
    
    // Demo completion
    console.log('🎉 Multiplayer demo completed!');
    
    // Show completion tooltips
    await page1.evaluate(() => {
      const tooltip = document.createElement('div');
      tooltip.id = 'demo-tooltip';
      tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(22,33,62,0.95) 50%, rgba(15,52,96,0.95) 100%);
        color: #ffd700;
        padding: 30px 40px;
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        font-family: 'Segoe UI', sans-serif;
        font-size: 18px;
        font-weight: 600;
        z-index: 9999;
        border: 3px solid #ffd700;
        text-align: center;
        min-width: 300px;
      `;
      tooltip.innerHTML = '🎉 Multiplayer Demo Complete!<br/><div style="font-size: 14px; margin-top: 10px; opacity: 0.8;">Player 1 - Great job!</div>';
      document.body.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.remove();
      }, 3000);
    });
    
    await page2.evaluate(() => {
      const tooltip = document.createElement('div');
      tooltip.id = 'demo-tooltip';
      tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(22,33,62,0.95) 50%, rgba(15,52,96,0.95) 100%);
        color: #ffd700;
        padding: 30px 40px;
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        font-family: 'Segoe UI', sans-serif;
        font-size: 18px;
        font-weight: 600;
        z-index: 9999;
        border: 3px solid #ffd700;
        text-align: center;
        min-width: 300px;
      `;
      tooltip.innerHTML = '🎉 Multiplayer Demo Complete!<br/><div style="font-size: 14px; margin-top: 10px; opacity: 0.8;">Player 2 - Great job!</div>';
      document.body.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.remove();
      }, 3000);
    });
    
    await page1.waitForTimeout(4000);
    
    // Verify both players are still in game
    await expect(page1.locator('.true-heroes-interface')).toBeVisible();
    await expect(page2.locator('.true-heroes-interface')).toBeVisible();
    
    console.log('✅ Multiplayer demo finished successfully!');
    
    // Clean up
    await context1.close();
    await context2.close();
  });
}); 