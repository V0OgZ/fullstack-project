import { test, expect } from '@playwright/test';

test.describe('Multiplayer Workflow', () => {
  test('should redirect multiplayer scenarios to multiplayer page and complete workflow', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Heroes of Time/);
    
    // Test that multiplayer scenarios are properly tagged
    await page.click('text=Choisir un scénario');
    await page.waitForSelector('.scenario-card');
    
    // Find the Multiplayer Arena scenario
    const multiplayerCard = page.locator('.scenario-card:has-text("Multiplayer Arena")');
    await expect(multiplayerCard).toBeVisible();
    
    // Verify it has the multiplayer badge
    await expect(multiplayerCard.locator('.multiplayer-badge')).toBeVisible();
    await expect(multiplayerCard.locator('.multiplayer-badge')).toHaveText('🌐 MULTIPLAYER');
    
    // Click on the multiplayer scenario
    await multiplayerCard.click();
    
    // Should redirect to multiplayer page
    await page.waitForURL('/multiplayer');
    await expect(page.locator('h1')).toHaveText('Multiplayer Sessions');
    
    // Test session creation
    await page.click('button:has-text("Create Session")');
    await expect(page.locator('.session-creation-form')).toBeVisible();
    
    // Fill out session form
    await page.fill('input[placeholder="Session Name"]', 'Test Arena Session');
    await page.selectOption('select[name="scenario"]', 'multiplayer-arena');
    await page.fill('input[placeholder="Your Hero Name"]', 'TestHero1');
    
    // Create session
    await page.click('button:has-text("Create & Wait")');
    await expect(page.locator('.waiting-room')).toBeVisible();
    
    // Should show session details
    await expect(page.locator('.session-name')).toHaveText('Test Arena Session');
    await expect(page.locator('.player-count')).toHaveText('1/4 Players');
    
    // Test session listing
    await page.click('button:has-text("Back to Lobby")');
    await expect(page.locator('.session-item')).toBeVisible();
    await expect(page.locator('.session-item')).toContainText('Test Arena Session');
    
    console.log('✅ Multiplayer workflow test completed successfully');
  });
  
  test('should handle scenario navigation for single player scenarios', async ({ page }) => {
    await page.goto('/');
    
    // Click on scenario selector
    await page.click('text=Choisir un scénario');
    await page.waitForSelector('.scenario-card');
    
    // Find a single player scenario (if any exist)
    const singlePlayerCard = page.locator('.scenario-card').first();
    await expect(singlePlayerCard).toBeVisible();
    
    // Click on the single player scenario
    await singlePlayerCard.click();
    
    // Should redirect to game page (not multiplayer)
    await page.waitForURL(/\/game\/.+/);
    await expect(page.locator('.game-interface')).toBeVisible();
    
    console.log('✅ Single player scenario navigation test completed');
  });
  
  test('should generate epic session names', async ({ page }) => {
    await page.goto('/multiplayer');
    
    // Test session creation with epic name generation
    await page.click('button:has-text("Create Session")');
    await expect(page.locator('.session-creation-form')).toBeVisible();
    
    // Check if session name is auto-generated
    const sessionNameInput = page.locator('input[placeholder="Session Name"]');
    const initialName = await sessionNameInput.inputValue();
    expect(initialName).toBeTruthy();
    
    // Test manual epic name generation
    await page.click('button:has-text("🎲 Epic Name")');
    await page.waitForTimeout(500);
    
    const newName = await sessionNameInput.inputValue();
    expect(newName).toBeTruthy();
    expect(newName).not.toBe(initialName);
    
    console.log('✅ Epic session name generation test completed');
  });
}); 