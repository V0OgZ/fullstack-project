import { test, expect } from '@playwright/test';

test.describe('Session Name Generator', () => {
  test('should generate epic session names automatically', async ({ page }) => {
    console.log('🧪 Testing session name generator...');
    
    // Navigate to multiplayer page
    await page.goto('http://localhost:3000/multiplayer');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Should see multiplayer lobby
    await expect(page.locator('[data-testid="multiplayer-lobby"]')).toBeVisible();
    
    // Click create session button
    await page.locator('[data-testid="create-session-btn"]').click();
    
    // Should see create session form
    const sessionNameInput = page.locator('[data-testid="session-name-input"]');
    await expect(sessionNameInput).toBeVisible();
    
    // Should have an automatically generated name
    const initialName = await sessionNameInput.inputValue();
    expect(initialName.length).toBeGreaterThan(0);
    console.log('Initial generated name:', initialName);
    
    // Click the "Epic Name" button to generate a new name
    const epicNameBtn = page.locator('button:has-text("🎲 Epic Name")');
    await expect(epicNameBtn).toBeVisible();
    await epicNameBtn.click();
    
    // Should have a different name now
    const newName = await sessionNameInput.inputValue();
    expect(newName).not.toBe(initialName);
    expect(newName.length).toBeGreaterThan(0);
    console.log('New generated name:', newName);
    
    // Generate a few more names to see variety
    for (let i = 0; i < 3; i++) {
      await epicNameBtn.click();
      await page.waitForTimeout(100);
      const generatedName = await sessionNameInput.inputValue();
      console.log(`Generated name ${i + 1}:`, generatedName);
      expect(generatedName.length).toBeGreaterThan(0);
    }
    
    console.log('✅ Session name generator test passed!');
  });
  
  test('should create sessions with generated names', async ({ page }) => {
    console.log('🧪 Testing session creation with generated names...');
    
    // Navigate to multiplayer page
    await page.goto('http://localhost:3000/multiplayer');
    await page.waitForLoadState('networkidle');
    
    // Click create session
    await page.locator('[data-testid="create-session-btn"]').click();
    
    // Generate an epic name
    await page.locator('button:has-text("🎲 Epic Name")').click();
    
    // Get the generated name
    const sessionNameInput = page.locator('[data-testid="session-name-input"]');
    const generatedName = await sessionNameInput.inputValue();
    console.log('Creating session with name:', generatedName);
    
    // Fill hero name
    const heroNameInput = page.locator('[data-testid="hero-name-input"]');
    await heroNameInput.fill('TestHero');
    
    // Create the session
    await page.locator('[data-testid="create-new-game-btn"]').click();
    
    // Should transition to waiting room
    await expect(page.locator('[data-testid="waiting-room"]')).toBeVisible();
    
    // Should show the session info
    const sessionInfo = page.locator('text=Session ID:');
    await expect(sessionInfo).toBeVisible();
    
    console.log('✅ Session creation with generated name test passed!');
  });
  
  test('should display epic name indicator for generated sessions', async ({ page }) => {
    console.log('🧪 Testing epic name indicator display...');
    
    // Navigate to multiplayer page
    await page.goto('http://localhost:3000/multiplayer');
    await page.waitForLoadState('networkidle');
    
    // Create a session with generated name first
    await page.locator('[data-testid="create-session-btn"]').click();
    await page.locator('button:has-text("🎲 Epic Name")').click();
    
    const sessionNameInput = page.locator('[data-testid="session-name-input"]');
    const generatedName = await sessionNameInput.inputValue();
    
    // Fill hero name and create session
    await page.locator('[data-testid="hero-name-input"]').fill('TestHero');
    await page.locator('[data-testid="create-new-game-btn"]').click();
    
    // Go back to lobby to see session in list
    await page.locator('button:has-text("Back to Lobby")').click();
    
    // Look for the session in the list
    const sessionItems = page.locator('[data-testid="session-item"]');
    
    // Should have at least one session
    await expect(sessionItems.first()).toBeVisible();
    
    // If the name contains underscores, should show epic indicator
    if (generatedName.includes('_')) {
      const epicIndicator = page.locator('text=⚡ Epic Generated Name');
      await expect(epicIndicator).toBeVisible();
    }
    
    console.log('✅ Epic name indicator test passed!');
  });
}); 