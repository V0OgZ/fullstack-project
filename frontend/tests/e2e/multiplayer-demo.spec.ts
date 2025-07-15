import { test, expect } from '@playwright/test';

test.describe('👥 Heroes of Time - Multiplayer Demo', () => {
  test('Dual window multiplayer session', async ({ browser }) => {
    test.setTimeout(90000); // 1.5 minutes for multiplayer setup
    
    console.log('🚀 Starting multiplayer demo...');
    
    // Create two browser contexts for two players
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
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
      
      await page1.goto('http://localhost:3000');
      await page1.waitForLoadState('networkidle');
      
      // Select Multiplayer Arena scenario
      await page1.click('[data-testid="scenario-card-multiplayer-arena"]');
      await page1.waitForTimeout(500);
      
      // Click Play button - this should show multiplayer session manager
      await page1.click('[data-testid="play-button-multiplayer-arena"]');
      await page1.waitForTimeout(2000);
      
      // Should now see multiplayer session manager
      await page1.waitForSelector('[data-testid="create-session-btn"]', { timeout: 10000 });
      
      // Fill session details
      const sessionName = `Test Session ${Date.now()}`;
      await page1.fill('input[placeholder*="session name"]', sessionName);
      await page1.fill('input[placeholder*="hero name"]', 'Player1Hero');
      
      // Create session
      await page1.click('[data-testid="create-new-game-btn"]');
      await page1.waitForTimeout(3000);
      
      // Should now be in waiting room
      console.log('⏳ Player 1: Waiting for other players...');
      
      // PLAYER 2 - Join Session
      console.log('👥 Player 2: Joining session...');
      
      await page2.goto('http://localhost:3000');
      await page2.waitForLoadState('networkidle');
      
      // Select same scenario
      await page2.click('[data-testid="scenario-card-multiplayer-arena"]');
      await page2.waitForTimeout(500);
      
      // Click Play
      await page2.click('[data-testid="play-button-multiplayer-arena"]');
      await page2.waitForTimeout(2000);
      
      // Should see session list
      await page2.waitForSelector('.session-list', { timeout: 10000 });
      
      // Join the first available session
      const joinButton = page2.locator('.session-item button').first();
      if (await joinButton.count() > 0) {
        await joinButton.click();
        await page2.waitForTimeout(3000);
      } else {
        console.log('⚠️ No sessions found to join');
      }
      
      console.log('⚔️ Both players connected...');
      
      // Wait for game to start (this might happen automatically or need a start button)
      await page1.waitForTimeout(5000);
      await page2.waitForTimeout(5000);
      
      // Check if game started by looking for canvas
      const canvas1 = await page1.locator('canvas').count();
      const canvas2 = await page2.locator('canvas').count();
      
      if (canvas1 > 0 && canvas2 > 0) {
        console.log('✅ Game started successfully!');
        
        // Take screenshots
        await page1.screenshot({ path: 'test-results/multiplayer-player1.png' });
        await page2.screenshot({ path: 'test-results/multiplayer-player2.png' });
      } else {
        console.log('⚠️ Game did not start, still in session manager');
        // Take screenshots of session state
        await page1.screenshot({ path: 'test-results/multiplayer-session1.png' });
        await page2.screenshot({ path: 'test-results/multiplayer-session2.png' });
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
    }
  });
}); 