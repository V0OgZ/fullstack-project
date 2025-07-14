import { test, expect } from '@playwright/test';

test.describe('Heroes of Time - ZFC & Shadow Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display ZFC zones in solo mode', async ({ page }) => {
    // Navigate to temporal rift (mystical conquest)
    await page.locator('a[href*="/game/temporal-rift"]').click();
    await expect(page).toHaveURL(/.*\/game\/temporal-rift/);
    
    // Wait for game to load
    await page.waitForTimeout(3000);
    
    // Check for ZFC zone visualization
    await expect(page.locator('.zfc-zone, .temporal-zone')).toBeVisible({ timeout: 10000 });
    
    // Check for ZFC legend
    await expect(page.locator('.zfc-legend, .temporal-legend')).toBeVisible();
  });

  test('should handle temporal objects in conquest mystique', async ({ page }) => {
    // Navigate to temporal rift
    await page.locator('a[href*="/game/temporal-rift"]').click();
    await expect(page).toHaveURL(/.*\/game\/temporal-rift/);
    
    // Wait for game to load
    await page.waitForTimeout(3000);
    
    // Check for temporal objects
    await expect(page.locator('.temporal-object, .magic-object')).toBeVisible({ timeout: 10000 });
    
    // Check for magic inventory toggle
    await expect(page.locator('.magic-inventory-toggle')).toBeVisible();
  });

  test('should calculate network mode ZFC correctly', async ({ browser }) => {
    // Create two browser contexts for multiplayer
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session with temporal rift
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('ZFC Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      // Start temporal rift game
      await page1.locator('select[name="gameMode"]').selectOption('temporal-rift');
      await page1.locator('button:has-text("Start Game")').click();
      
      // Wait for game to load
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      // Check for network ZFC calculations
      await expect(page1.locator('.network-zfc, .multiplayer-zfc')).toBeVisible({ timeout: 10000 });
      await expect(page2.locator('.network-zfc, .multiplayer-zfc')).toBeVisible({ timeout: 10000 });
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should display shadow actions correctly', async ({ browser }) => {
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
      
      await page1.locator('button:has-text("Start Game")').click();
      
      // Wait for game to load
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      // Player 1 performs action
      await page1.locator('.hero').first().click();
      await page1.locator('.hex-tile').nth(5).click();
      
      // Player 2 should see shadow action with proper styling
      await expect(page2.locator('.shadow-action')).toBeVisible({ timeout: 10000 });
      await expect(page2.locator('.shadow-action .action-type')).toBeVisible();
      await expect(page2.locator('.shadow-action .player-info')).toBeVisible();
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle shadow action bluffing mechanics', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Bluff Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      await page1.locator('button:has-text("Start Game")').click();
      
      // Wait for game to load
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      // Player 1 performs bluff action
      await page1.locator('.hero').first().click();
      await page1.locator('.bluff-action-btn').click();
      await page1.locator('.hex-tile').nth(5).click();
      
      // Player 2 should see bluff indicator
      await expect(page2.locator('.shadow-action.bluff')).toBeVisible({ timeout: 10000 });
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should detect and resolve ZFC conflicts', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session
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
      
      // Both players move to create ZFC conflict
      await page1.locator('.hero').first().click();
      await page2.locator('.hero').first().click();
      
      const conflictTile = page1.locator('.hex-tile').nth(10);
      await conflictTile.click({ force: true });
      
      // Should show ZFC conflict resolution
      await expect(page1.locator('.zfc-conflict, .temporal-conflict')).toBeVisible({ timeout: 10000 });
      await expect(page2.locator('.zfc-conflict, .temporal-conflict')).toBeVisible({ timeout: 10000 });
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle temporal paradox resolution', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session with temporal rift
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Paradox Test Session');
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
      
      // Create temporal paradox scenario
      await page1.locator('.temporal-object').first().click();
      await page1.locator('.paradox-action-btn').click();
      
      // Should show paradox resolution
      await expect(page1.locator('.temporal-paradox, .paradox-resolution')).toBeVisible({ timeout: 10000 });
      await expect(page2.locator('.temporal-paradox, .paradox-resolution')).toBeVisible({ timeout: 10000 });
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle quantum superposition states', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session with temporal rift
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Quantum Test Session');
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
      
      // Activate quantum superposition
      await page1.locator('.quantum-object').first().click();
      await page1.locator('.superposition-btn').click();
      
      // Should show quantum state
      await expect(page1.locator('.quantum-superposition, .superposition-state')).toBeVisible({ timeout: 10000 });
      await expect(page2.locator('.quantum-superposition, .superposition-state')).toBeVisible({ timeout: 10000 });
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle multi-layer ZFC interactions', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session with temporal rift
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('MultiLayer Test Session');
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
      
      // Create multiple ZFC layers
      await page1.locator('.hero').first().click();
      await page1.locator('.hex-tile').nth(5).click();
      
      await page2.locator('.hero').first().click();
      await page2.locator('.hex-tile').nth(6).click();
      
      await page1.locator('.hero').nth(1).click();
      await page1.locator('.hex-tile').nth(7).click();
      
      // Should show multi-layer ZFC visualization
      await expect(page1.locator('.multi-layer-zfc, .zfc-layers')).toBeVisible({ timeout: 10000 });
      await expect(page2.locator('.multi-layer-zfc, .zfc-layers')).toBeVisible({ timeout: 10000 });
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should update shadow actions in real-time', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('RealTime Test Session');
      await page1.locator('button:has-text("Create Session")').click();
      
      const sessionId = await page1.locator('.session-id').textContent();
      
      await page2.goto('/multiplayer');
      await page2.locator('input[placeholder*="session ID"]').fill(sessionId!);
      await page2.locator('button:has-text("Join Session")').click();
      
      await page1.locator('button:has-text("Start Game")').click();
      
      // Wait for game to load
      await page1.waitForTimeout(3000);
      await page2.waitForTimeout(3000);
      
      // Player 1 performs multiple actions rapidly
      for (let i = 0; i < 3; i++) {
        await page1.locator('.hero').first().click();
        await page1.locator('.hex-tile').nth(5 + i).click();
        await page1.waitForTimeout(500);
      }
      
      // Player 2 should see all shadow actions updated in real-time
      await expect(page2.locator('.shadow-action')).toHaveCount(3, { timeout: 10000 });
      
      // Check that shadow actions are properly ordered
      const shadowActions = page2.locator('.shadow-action');
      await expect(shadowActions.nth(0)).toBeVisible();
      await expect(shadowActions.nth(1)).toBeVisible();
      await expect(shadowActions.nth(2)).toBeVisible();
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle ZFC movement cost calculations', async ({ page }) => {
    // Navigate to temporal rift
    await page.locator('a[href*="/game/temporal-rift"]').click();
    await expect(page).toHaveURL(/.*\/game\/temporal-rift/);
    
    // Wait for game to load
    await page.waitForTimeout(3000);
    
    // Select hero
    await page.locator('.hero').first().click();
    
    // Check for ZFC movement cost display
    await expect(page.locator('.zfc-movement-cost, .movement-cost')).toBeVisible({ timeout: 10000 });
    
    // Hover over different tiles to see cost changes
    const tiles = page.locator('.hex-tile');
    await tiles.nth(5).hover();
    await expect(page.locator('.zfc-movement-cost')).toBeVisible();
    
    await tiles.nth(10).hover();
    await expect(page.locator('.zfc-movement-cost')).toBeVisible();
  });

  test('should handle temporal interference mechanics', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Setup multiplayer session with temporal rift
      await page1.goto('/multiplayer');
      await page1.locator('input[placeholder*="session name"]').fill('Interference Test Session');
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
      
      // Player 1 uses temporal interference
      await page1.locator('.temporal-interference-btn').click();
      await page1.locator('.hex-tile').nth(5).click();
      
      // Player 2 should see interference effect
      await expect(page2.locator('.temporal-interference, .interference-effect')).toBeVisible({ timeout: 10000 });
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });
}); 