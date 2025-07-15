import { test, expect, chromium } from '@playwright/test';

test.describe('👥 Heroes of Time - Multiplayer Demo', () => {
  test('Dual window multiplayer session', async () => {
    test.setTimeout(90000); // 1.5 minutes for multiplayer setup
    
    console.log('🚀 Starting multiplayer demo...');
    
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
        await sessionForm.fill('Demo Session');
    
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
      await page2.waitForTimeout(3000); // Extra wait for sessions to load
      
      // Try to click refresh button multiple times
      const refreshButton = page2.locator('button:has-text("Refresh")');
      if (await refreshButton.count() > 0) {
        console.log('🔄 Clicking refresh button...');
        await refreshButton.click();
        await page2.waitForTimeout(2000);
        
        // Try refresh again
        await refreshButton.click();
        await page2.waitForTimeout(3000);
      }
      
      // Wait longer for session to appear
      await page2.waitForTimeout(5000);
      
      // Try to find and join any available session
      const sessionItems = await page2.locator('.session-item, [data-testid*="session"], .session-card').count();
      
      if (sessionItems > 0) {
        console.log(`✅ Found ${sessionItems} session(s), attempting to join...`);
        
        // Click on the first session item
        await page2.locator('.session-item, [data-testid*="session"], .session-card').first().click();
        await page2.waitForTimeout(2000);
        
        // Look for join button
        const joinBtn = page2.locator('button:has-text("Join"), [data-testid="join-session"], .join-btn');
        if (await joinBtn.count() > 0) {
          console.log('🎮 Joining session...');
          await joinBtn.click();
          await page2.waitForTimeout(3000);
        }
      } else {
        console.log('⚠️ No sessions found, trying to create a new one...');
        
        // If no session found, create a new one from Player 2
        const createBtn2 = page2.locator('[data-testid="create-session-btn"], button:has-text("Create")');
        if (await createBtn2.count() > 0) {
          await createBtn2.click();
          await page2.waitForTimeout(2000);
          
          // Fill session form
          const sessionNameInput2 = page2.locator('input[placeholder*="session"], input[data-testid="session-name"]');
          if (await sessionNameInput2.count() > 0) {
            await sessionNameInput2.fill('Player2Session');
          }
          
          const createGameBtn2 = page2.locator('[data-testid="create-new-game-btn"], button:has-text("Create Game")');
          if (await createGameBtn2.count() > 0) {
            await createGameBtn2.click();
            await page2.waitForTimeout(3000);
          }
        }
      }
      
      // Wait for both players to potentially enter game
      await page1.waitForTimeout(5000);
      await page2.waitForTimeout(5000);
      
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