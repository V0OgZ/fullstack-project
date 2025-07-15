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
      
      // Try to click refresh button
      const refreshButton = page2.locator('button:has-text("Refresh")');
      if (await refreshButton.count() > 0) {
        console.log('🔄 Clicking refresh button...');
        await refreshButton.click();
        await page2.waitForTimeout(3000);
    }
    
      // Debug: Check what's on the page
      const createSessionBtn2 = await page2.locator('[data-testid="create-session-btn"]').count();
      const sessionList = await page2.locator('.session-list').count();
      const sessionItems = await page2.locator('.session-item').count();
      const availableSessions = await page2.locator('text=/Available Sessions/i').count();
      
      console.log(`📊 Player 2 page state:`);
      console.log(`   - Create session button: ${createSessionBtn2 > 0 ? 'Yes' : 'No'}`);
      console.log(`   - Session list: ${sessionList > 0 ? 'Yes' : 'No'}`);
      console.log(`   - Session items: ${sessionItems}`);
      console.log(`   - Available sessions text: ${availableSessions > 0 ? 'Yes' : 'No'}`);
      
      if (sessionItems > 0) {
        console.log('📋 Found session(s) to join');
        // Try to join the first session
        const joinButton = page2.locator('.session-item button:has-text("Join")').first();
        await joinButton.click();
        await page2.waitForTimeout(3000);
      } else {
        console.log('⚠️ No sessions found');
        
        // Check if the page shows "No available sessions" or similar
        const noSessionsText = await page2.locator('text=/no.*sessions|session.*found/i').count();
        if (noSessionsText > 0) {
          console.log('   Page shows "No sessions" message');
        }
      }
      
      console.log('⚔️ Checking final state...');
      
      // Wait a bit more for potential game start
      await page1.waitForTimeout(3000);
    await page2.waitForTimeout(3000);
    
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