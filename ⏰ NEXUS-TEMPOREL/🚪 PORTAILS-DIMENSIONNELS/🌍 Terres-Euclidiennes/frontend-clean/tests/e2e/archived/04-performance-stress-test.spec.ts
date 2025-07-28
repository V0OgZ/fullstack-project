import { test, expect } from '@playwright/test';

test.describe('Heroes of Time - Performance & Stress Tests', () => {
  test('should handle multiple concurrent sessions', async ({ browser }) => {
    const contexts: any[] = [];
    const pages: any[] = [];
    
    try {
      // Create 4 concurrent sessions
      for (let i = 0; i < 4; i++) {
        const context = await browser.newContext();
        const page = await context.newPage();
        contexts.push(context);
        pages.push(page);
        
        await page.goto('/multiplayer');
        await page.locator('input[placeholder*="session name"]').fill(`Stress Session ${i + 1}`);
        await page.locator('button:has-text("Create Session")').click();
        
        // Wait for session creation
        await expect(page.locator('text=Session created')).toBeVisible({ timeout: 10000 });
      }
      
      // Verify all sessions are active
      for (const page of pages) {
        await expect(page.locator('.session-status')).toContainText('Active');
      }
      
    } finally {
      // Clean up all contexts
      for (const context of contexts) {
        await context.close();
      }
    }
  });

  test('should handle WebSocket message bursts', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Burst Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      await page1.locator('button:has-text("Start Game")').click();
      
      // Wait for game to load
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      // Send rapid message burst
      for (let i = 0; i < 50; i++) {
        await page1.locator('.hero').first().click();
        await page1.locator('.hex-tile').nth(5 + (i % 10)).click();
        await page1.waitForTimeout(100); // Small delay between actions
      }
      
      // Verify system handles burst without errors
      await expect(page2.locator('.shadow-action')).toHaveCount(50, { timeout: 30000 });
      
      // Check for performance indicators
      await expect(page1.locator('.performance-indicator')).not.toContainText('Slow');
      await expect(page2.locator('.performance-indicator')).not.toContainText('Slow');
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle large map performance', async ({ page }) => {
    // Navigate to game with large map
    await page.locator('a[href*="/game/conquest-classic"]').click();
    await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
    
    // Wait for game to load
    await page.waitForTimeout(3000);
    
    // Check map rendering performance
    const startTime = Date.now();
    
    // Interact with map to trigger rendering
    await page.locator('.hex-tile').first().click();
    await page.locator('.hex-tile').nth(10).click();
    await page.locator('.hex-tile').nth(20).click();
    
    const endTime = Date.now();
    const renderTime = endTime - startTime;
    
    // Verify rendering is fast enough (< 1 second for interactions)
    expect(renderTime).toBeLessThan(1000);
    
    // Check for performance indicators
    await expect(page.locator('.performance-indicator')).not.toContainText('Slow');
  });

  test('should handle memory usage efficiently', async ({ browser }) => {
    const contexts: any[] = [];
    const pages: any[] = [];
    
    try {
      // Create multiple sessions to test memory usage
      for (let i = 0; i < 3; i++) {
        const context = await browser.newContext();
        const page = await context.newPage();
        contexts.push(context);
        pages.push(page);
        
        await page.goto('/multiplayer');
        await page.locator('input[placeholder*="session name"]').fill(`Memory Test ${i + 1}`);
        await page.locator('button:has-text("Create Session")').click();
        
        // Start game
        await page.locator('button:has-text("Start Game")').click();
        await page.waitForTimeout(3000);
        
        // Perform some actions
        for (let j = 0; j < 10; j++) {
          await page.locator('.hero').first().click();
          await page.locator('.hex-tile').nth(5 + j).click();
          await page.waitForTimeout(200);
        }
      }
      
      // Check memory usage indicators
      for (const page of pages) {
        await expect(page.locator('.memory-usage')).not.toContainText('High');
      }
      
    } finally {
      for (const context of contexts) {
        await context.close();
      }
    }
  });

  test('should handle network latency gracefully', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Latency Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      await page1.locator('button:has-text("Start Game")').click();
      
      // Wait for game to load
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      // Simulate network latency by adding delays
      await page1.locator('.hero').first().click();
      await page1.waitForTimeout(2000); // Simulate 2 second latency
      await page1.locator('.hex-tile').nth(5).click();
      
      // Should handle latency gracefully
      await expect(page2.locator('.shadow-action')).toBeVisible({ timeout: 15000 });
      
      // Check for latency indicators
      await expect(page1.locator('.network-status')).not.toContainText('Disconnected');
      await expect(page2.locator('.network-status')).not.toContainText('Disconnected');
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle many shadow actions simultaneously', async ({ browser }) => {
    const contexts: any[] = [];
    const pages: any[] = [];
    
    try {
      // Create 4-player session
      for (let i = 0; i < 4; i++) {
        const context = await browser.newContext();
        const page = await context.newPage();
        contexts.push(context);
        pages.push(page);
        
        await page.goto('/multiplayer');
        
        if (i === 0) {
          // First player creates session
          await page.locator('input[placeholder*="session name"]').fill('4 Player Stress Test');
          await page.locator('button:has-text("Create Session")').click();
          const sessionId = await page.locator('.session-id').textContent();
          
          // Store session ID for other players
          for (let j = 1; j < 4; j++) {
            const otherPage = pages[j];
            await otherPage.locator('input[placeholder*="session ID"]').fill(sessionId!);
            await otherPage.locator('button:has-text("Join Session")').click();
          }
        }
      }
      
      // Start game
      await pages[0].locator('button:has-text("Start Game")').click();
      
      // Wait for all players to load
      for (const page of pages) {
        await page.waitForTimeout(3000);
      }
      
      // All players perform actions simultaneously
      const actions: (() => Promise<void>)[] = [];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
          actions.push(async () => {
            await pages[i].locator('.hero').first().click();
            await pages[i].locator('.hex-tile').nth(5 + j).click();
            await pages[i].waitForTimeout(100);
          });
        }
      }
      
      // Execute all actions
      await Promise.all(actions.map(action => action()));
      
      // Verify all shadow actions are displayed
      for (let i = 0; i < 4; i++) {
        await expect(pages[i].locator('.shadow-action')).toHaveCount(20, { timeout: 30000 });
      }
      
    } finally {
      for (const context of contexts) {
        await context.close();
      }
    }
  });

  test('should handle session cleanup efficiently', async ({ browser }) => {
    const contexts = [];
    const pages = [];
    
    try {
      // Create multiple sessions
      for (let i = 0; i < 5; i++) {
        const context = await browser.newContext();
        const page = await context.newPage();
        contexts.push(context);
        pages.push(page);
        
        await page.goto('/multiplayer');
        await page.locator('input[placeholder*="session name"]').fill(`Cleanup Test ${i + 1}`);
        await page.locator('button:has-text("Create Session")').click();
      }
      
      // Close all contexts (simulating cleanup)
      for (const context of contexts) {
        await context.close();
      }
      
      // Create new session to verify cleanup worked
      const newContext = await browser.newContext();
      const newPage = await newContext.newPage();
      
      await newPage.goto('/multiplayer');
      await newPage.locator('input[placeholder*="session name"]').fill('Post Cleanup Test');
      await newPage.locator('button:has-text("Create Session")').click();
      
      await expect(newPage.locator('text=Session created')).toBeVisible({ timeout: 10000 });
      
      await newContext.close();
      
    } finally {
      // Ensure all contexts are closed
      for (const context of contexts) {
        try {
          await context.close();
        } catch (e) {
          // Context already closed
        }
      }
    }
  });

  test('should handle 4-player multiplayer sessions', async ({ browser }) => {
    const contexts = [];
    const pages = [];
    
    try {
      // Create 4 players
      for (let i = 0; i < 4; i++) {
        const context = await browser.newContext();
        const page = await context.newPage();
        contexts.push(context);
        pages.push(page);
        
        await page.goto('/multiplayer');
        
        if (i === 0) {
          // First player creates session
          await page.locator('input[placeholder*="session name"]').fill('4 Player Game');
          await page.locator('button:has-text("Create Session")').click();
          const sessionId = await page.locator('.session-id').textContent();
          
          // Other players join
          for (let j = 1; j < 4; j++) {
            const otherPage = pages[j];
            await otherPage.locator('input[placeholder*="session ID"]').fill(sessionId!);
            await otherPage.locator('button:has-text("Join Session")').click();
          }
        }
      }
      
      // Verify all players joined
      for (let i = 0; i < 4; i++) {
        await expect(pages[i].locator(`text=Player ${i + 1}`)).toBeVisible({ timeout: 10000 });
      }
      
      // Start game
      await pages[0].locator('button:has-text("Start Game")').click();
      
      // Wait for all players to load
      for (const page of pages) {
        await page.waitForTimeout(3000);
      }
      
      // Play a few turns
      for (let turn = 0; turn < 2; turn++) {
        for (let player = 0; player < 4; player++) {
          await pages[player].locator('.hero').first().click();
          await pages[player].locator('.hex-tile').nth(5 + turn).click();
          await pages[player].locator('.end-turn-btn').click();
          await pages[player].waitForTimeout(500);
        }
      }
      
      // Verify game progressed
      const finalTurn = await pages[0].locator('.turn-number').textContent();
      expect(parseInt(finalTurn!)).toBeGreaterThan(1);
      
    } finally {
      for (const context of contexts) {
        await context.close();
      }
    }
  });

  test('should handle ZFC calculation stress testing', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session with temporal rift
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('ZFC Stress Test');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      await page1.locator('select[name="gameMode"]').selectOption('temporal-rift');
      await page1.locator('button:has-text("Start Game")').click();
      
      // Wait for game to load
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      // Perform complex ZFC calculations
      for (let i = 0; i < 20; i++) {
        await page1.locator('.hero').first().click();
        await page1.locator('.hex-tile').nth(5 + i).click();
        await page1.waitForTimeout(200);
        
        await page2.locator('.hero').first().click();
        await page2.locator('.hex-tile').nth(6 + i).click();
        await page2.waitForTimeout(200);
      }
      
      // Verify ZFC calculations completed
      await expect(page1.locator('.zfc-calculation-complete')).toBeVisible({ timeout: 30000 });
      await expect(page2.locator('.zfc-calculation-complete')).toBeVisible({ timeout: 30000 });
      
      // Check performance
      await expect(page1.locator('.performance-indicator')).not.toContainText('Slow');
      await expect(page2.locator('.performance-indicator')).not.toContainText('Slow');
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle browser refresh during multiplayer', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Refresh Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      await page1.locator('button:has-text("Start Game")').click();
      
      // Wait for game to load
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      // Perform some actions
      await page1.locator('.hero').first().click();
      await page1.locator('.hex-tile').nth(5).click();
      
      // Refresh the page
      await page1.reload();
      
      // Wait for reconnection
      await page1.waitForTimeout(2000);
      
      // Verify reconnection
      await expect(page1.locator('.session-restored')).toBeVisible({ timeout: 10000 });
      await expect(page2.locator('.player-reconnected')).toContainText('Player 1');
      
      // Verify actions still work after refresh
      await page1.locator('.hero').first().click();
      await page1.locator('.hex-tile').nth(6).click();
      await expect(page2.locator('.action-after-refresh')).toBeVisible({ timeout: 10000 });
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should maintain frame rate during intensive operations', async ({ page }) => {
    // Navigate to game
    await page.locator('a[href*="/game/conquest-classic"]').click();
    await expect(page).toHaveURL(/.*\/game\/conquest-classic/);
    
    // Wait for game to load
    await page.waitForTimeout(3000);
    
    // Start performance monitoring
    await page.evaluate(() => {
      window.performance.mark('test-start');
    });
    
    // Perform intensive operations
    for (let i = 0; i < 50; i++) {
      await page.locator('.hero').first().click();
      await page.locator('.hex-tile').nth(5 + (i % 10)).click();
      await page.waitForTimeout(50);
    }
    
    // End performance monitoring
    await page.evaluate(() => {
      window.performance.mark('test-end');
      window.performance.measure('test-duration', 'test-start', 'test-end');
    });
    
    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const measure = window.performance.getEntriesByName('test-duration')[0];
      return {
        duration: measure.duration,
        startTime: measure.startTime
      };
    });
    
    // Verify performance is acceptable (operations should complete in reasonable time)
    expect(performanceMetrics.duration).toBeLessThan(10000); // Less than 10 seconds
    
    // Check frame rate indicator
    await expect(page.locator('.frame-rate')).not.toContainText('Low');
  });
}); 