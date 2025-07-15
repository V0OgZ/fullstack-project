import { test, expect, chromium } from '@playwright/test';

test.describe('👥 Heroes of Time - Multiplayer Demo', () => {
  test('Dual window multiplayer session', async () => {
    test.setTimeout(90000); // 1.5 minutes for multiplayer setup
    
    const uniqueSessionName = `Demo Session ${Date.now()}`;
    console.log(`🚀 Starting multiplayer demo with unique session: ${uniqueSessionName}`);
    
    // Launch two separate browsers for proper window positioning
    const browser1 = await chromium.launch({
      headless: false,
      slowMo: 50,
      args: [
        '--no-default-browser-check',
        '--disable-web-security',
        '--window-position=0,0',        // Player 1 à gauche
        '--window-size=640,900',
        '--force-device-scale-factor=1'
      ]
    });
    
    const browser2 = await chromium.launch({
      headless: false,
      slowMo: 50,
      args: [
        '--no-default-browser-check',
        '--disable-web-security',
        '--window-position=640,0',      // Player 2 à droite
        '--window-size=640,900',
        '--force-device-scale-factor=1'
      ]
    });
    
    // Create contexts and pages
    const context1 = await browser1.newContext({
      viewport: { width: 640, height: 900 }
    });
    const context2 = await browser2.newContext({
      viewport: { width: 640, height: 900 }
    });
    
    // Force English language for both contexts
    await context1.addInitScript(() => {
      localStorage.setItem('heroes-reforged-i18n', JSON.stringify({
        state: { language: 'en' },
        version: 0
      }));
    });
    
    await context2.addInitScript(() => {
      localStorage.setItem('heroes-reforged-i18n', JSON.stringify({
        state: { language: 'en' },
        version: 0
      }));
    });
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Close webpack overlay if it appears
      await page1.evaluate(() => {
        const overlay = document.querySelector('#webpack-dev-server-client-overlay');
        if (overlay) {
          overlay.remove();
        }
      }).catch(() => {});
      
      // PLAYER 1 - Create Session
    console.log('🎮 Player 1: Creating multiplayer session...');
    
      // Go directly to multiplayer page
      await page1.goto('http://localhost:3000/multiplayer');
      await page1.waitForLoadState('networkidle');
    
      // Wait for multiplayer session manager
      await page1.waitForSelector('[data-testid="create-session-btn"]', { timeout: 10000 });
    
      // Click create session
      await page1.click('[data-testid="create-session-btn"]');
    await page1.waitForTimeout(2000);
    
      // Check if we're in session creation mode (form visible)
      const sessionForm = page1.locator('input[placeholder*="session name"]');
      if (await sessionForm.count() > 0) {
        console.log('📝 Filling session creation form...');
        await sessionForm.fill(uniqueSessionName);
    
        const heroNameInput = page1.locator('input[placeholder*="hero name"]');
        if (await heroNameInput.count() > 0) {
          await heroNameInput.fill('Player1Hero');
    }
    
        // Submit the form
        const createBtn = page1.locator('[data-testid="create-new-game-btn"]');
        if (await createBtn.count() > 0) {
          await createBtn.click();
    await page1.waitForTimeout(3000);
        }
      }
      
      console.log('⏳ Player 1: Session created/waiting...');
      
      // PLAYER 2 - Join Session
      console.log('👥 Player 2: Going to multiplayer page...');
      
      // Go directly to multiplayer page
      await page2.goto('http://localhost:3000/multiplayer');
      await page2.waitForLoadState('networkidle');

      // Poll for the session to appear, with a timeout
      await expect(async () => {
        const targetSession = page2.locator(`[data-testid="session-item"]:has-text("${uniqueSessionName}")`);
        if (await targetSession.count() > 0) {
          console.log(`✅ Found session: ${uniqueSessionName}`);
          return; // Session found, exit polling
        }
        console.log(`🔄 Session not found, refreshing...`);
        await page2.getByRole('button', { name: 'Refresh' }).click();
        throw new Error('Session not found yet');
      }).toPass({
        intervals: [1_000, 2_000, 5_000],
        timeout: 30_000
      });

      // Join the session now that it is visible
      const targetSession = page2.locator(`[data-testid="session-item"]:has-text("${uniqueSessionName}")`);
      await targetSession.locator('[data-testid="join-session-btn"]').click();
      console.log(`🎮 Joining session: ${uniqueSessionName}`);
      
      // PLAYER 1 - Start the battle after Player 2 joins
      console.log('👑 Player 1: Waiting for the battle to be ready to start...');
      const startBattleBtn = page1.locator('[data-testid="start-battle-btn"]');
      
      // Wait for the button to be enabled (this means Player 2 has joined and the session is ready)
      await expect(startBattleBtn).toBeEnabled({ timeout: 20000 });
      
      console.log('🚀 Player 1: Starting the battle!');
      await startBattleBtn.click();
      
      // Wait for both players to enter the actual game interface
      console.log('⏳ Waiting for game interface to load for both players...');
      await expect(page1.locator('.true-heroes-interface')).toBeVisible({ timeout: 20000 });
      await expect(page2.locator('.true-heroes-interface')).toBeVisible({ timeout: 20000 });
      console.log('✅ Game interface loaded for both players!');
      
      // Try to simulate some gameplay if in game
      console.log('🎮 Attempting gameplay simulation...');
      
      // Player 1 actions
      const p1Canvas = await page1.locator('canvas, .game-canvas, .map-grid').count();
      if (p1Canvas > 0) {
        console.log('🎯 Player 1 interacting with game...');
        await page1.locator('canvas, .game-canvas, .map-grid').first().click();
        await page1.waitForTimeout(2000);
        
        // Try to end turn
        const endTurnP1 = page1.locator('.end-turn-btn, button:has-text("End Turn")');
        if (await endTurnP1.count() > 0) {
          await endTurnP1.click();
          await page1.waitForTimeout(2000);
        }
      }
      
      // Player 2 actions
      const p2Canvas = await page2.locator('canvas, .game-canvas, .map-grid').count();
      if (p2Canvas > 0) {
        console.log('🎯 Player 2 interacting with game...');
        await page2.locator('canvas, .game-canvas, .map-grid').first().click();
        await page2.waitForTimeout(2000);
        
        // Try to end turn
        const endTurnP2 = page2.locator('.end-turn-btn, button:has-text("End Turn")');
        if (await endTurnP2.count() > 0) {
          await endTurnP2.click();
          await page2.waitForTimeout(2000);
        }
      }
      
      // Final wait for both players
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      console.log('⚔️ Checking final state...');
      
      // Check final state for both players
      const canvas1 = await page1.locator('canvas').count();
      const canvas2 = await page2.locator('canvas').count();
      const gameInterface1 = await page1.locator('.true-heroes-interface').count();
      const gameInterface2 = await page2.locator('.true-heroes-interface').count();
      const waitingRoom1 = await page1.locator('.waiting-room').count();
      const waitingRoom2 = await page2.locator('.waiting-room').count();
      
      console.log('📊 Final state:');
      console.log(`   Player 1: Canvas=${canvas1}, Game=${gameInterface1}, Waiting=${waitingRoom1}`);
      console.log(`   Player 2: Canvas=${canvas2}, Game=${gameInterface2}, Waiting=${waitingRoom2}`);
      
      // Take final screenshots
      await page1.screenshot({ path: 'test-results/multiplayer-final-player1.png', fullPage: true });
      await page2.screenshot({ path: 'test-results/multiplayer-final-player2.png', fullPage: true });
      
      if ((canvas1 > 0 || gameInterface1 > 0) && (canvas2 > 0 || gameInterface2 > 0)) {
        console.log('✅ Both players in game!');
      } else if (waitingRoom1 > 0 || waitingRoom2 > 0) {
        console.log('⏳ Players in waiting room');
      } else {
        console.log('⚠️ Players still in session manager');
      }
      
    console.log('🎉 Multiplayer demo completed!');
    
    } catch (error) {
      console.error('❌ Multiplayer demo failed:', error);
      // Take error screenshots
      await page1.screenshot({ path: 'test-results/multiplayer-error1.png' });
      await page2.screenshot({ path: 'test-results/multiplayer-error2.png' });
      throw error;
    } finally {
      // Cleanup
      await context1.close();
      await context2.close();
      await browser1.close();
      await browser2.close();
    }
  });
}); 