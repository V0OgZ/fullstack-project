import { test, expect } from '@playwright/test';

test.describe('Heroes of Time - Multiplayer Dual Session', () => {
  test('should create and join multiplayer session', async ({ browser }) => {
    // Create two browser contexts to simulate two players
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Player 1: Create session
      await page1.goto('/multiplayer');
      await expect(page1.locator('text=Multiplayer Arena')).toBeVisible();
      
      // Create session
      await page1.locator('input[placeholder*="session name"]').fill('Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      // Wait for session creation
      await expect(page1.locator('text=Session created')).toBeVisible({ timeout: 10000 });
      
      // Get session ID
      const sessionId = await page1.locator('.session-id').textContent();
      expect(sessionId).toBeTruthy();
      
      // Player 2: Join session
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      // Verify both players are in session
      await expect(page1.locator('text=Player 1')).toBeVisible();
      await expect(page2.locator('text=Player 2')).toBeVisible();
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle real-time WebSocket communication', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Create session
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('WS Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      // Join session
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      // Wait for WebSocket connection
      await page1.waitForTimeout(2000);
      await page2.waitForTimeout(2000);
      
      // Verify WebSocket status
      await expect(page1.locator('.ws-status')).toContainText('Connected');
      await expect(page2.locator('.ws-status')).toContainText('Connected');
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle shadow actions from other players', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Shadow Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      // Start game
      await page1.locator('button:has-text("Start Game")').click();
      
      // Wait for game to load
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      // Player 1 performs action
      await page1.locator('.hero').first().click();
      await page1.locator('.hex-tile').nth(5).click();
      
      // Player 2 should see shadow action
      await expect(page2.locator('.shadow-action')).toBeVisible({ timeout: 10000 });
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle player disconnection and reconnection', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup session
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Reconnect Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      // Disconnect player 2
      await context2.close();
      
      // Player 1 should see disconnection
      await expect(page1.locator('text=Player 2 disconnected')).toBeVisible({ timeout: 10000 });
      
      // Reconnect player 2
      const context2New = await browser.newContext();
      const page2New = await context2New.newPage();
      
      await page2New.goto('/multiplayer');
      await page2New.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2New.locator('button:has-text("Join Session")').click();
      
      // Verify reconnection
      await expect(page1.locator('text=Player 2 reconnected')).toBeVisible({ timeout: 10000 });
      
      await context2New.close();
      
    } finally {
      await context1.close();
    }
  });

  test('should handle game state synchronization', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup session and start game
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Sync Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      await page1.locator('button:has-text("Start Game")').click();
      
      // Wait for game to load
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      // Verify both players see same game state
      const turn1 = await page1.locator('.turn-number').textContent();
      const turn2 = await page2.locator('.turn-number').textContent();
      expect(turn1).toBe(turn2);
      
      // Verify both players see same map
      const mapTiles1 = await page1.locator('.hex-tile').count();
      const mapTiles2 = await page2.locator('.hex-tile').count();
      expect(mapTiles1).toBe(mapTiles2);
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle conflict resolution between players', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup session and start game
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Conflict Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      await page1.locator('button:has-text("Start Game")').click();
      
      // Wait for game to load
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      // Both players try to move to same tile simultaneously
      const targetTile = page1.locator('.hex-tile').nth(10);
      
      await page1.locator('.hero').first().click();
      await page2.locator('.hero').first().click();
      
      await targetTile.click({ force: true });
      
      // Should show conflict resolution
      await expect(page1.locator('.conflict-resolution')).toBeVisible({ timeout: 10000 });
      await expect(page2.locator('.conflict-resolution')).toBeVisible({ timeout: 10000 });
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle multiplayer chat functionality', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup session
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Chat Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      // Send message from player 1
      await page1.locator('.chat-input').fill('Hello from Player 1!');
      await page1.locator('.send-message-btn').click();
      
      // Player 2 should see message
      await expect(page2.locator('text=Hello from Player 1!')).toBeVisible({ timeout: 10000 });
      
      // Send message from player 2
      await page2.locator('.chat-input').fill('Hello from Player 2!');
      await page2.locator('.send-message-btn').click();
      
      // Player 1 should see message
      await expect(page1.locator('text=Hello from Player 2!')).toBeVisible({ timeout: 10000 });
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle complete multiplayer game session', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup session and start game
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Complete Game Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      await page1.locator('button:has-text("Start Game")').click();
      
      // Wait for game to load
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      // Play a few turns
      for (let i = 0; i < 3; i++) {
        // Player 1 turn
        await page1.locator('.hero').first().click();
        await page1.locator('.hex-tile').nth(5 + i).click();
        await page1.locator('.end-turn-btn').click();
        
        // Player 2 turn
        await page2.locator('.hero').first().click();
        await page2.locator('.hex-tile').nth(6 + i).click();
        await page2.locator('.end-turn-btn').click();
      }
      
      // Verify game progressed
      const finalTurn = await page1.locator('.turn-number').textContent();
      expect(parseInt(finalTurn!)).toBeGreaterThan(1);
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });
}); 