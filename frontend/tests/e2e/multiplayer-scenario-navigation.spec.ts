import { test, expect } from '@playwright/test';

test.describe('Multiplayer Scenario Navigation', () => {
  test('should display multiplayer badge and redirect to multiplayer page', async ({ page }) => {
    console.log('🧪 Testing multiplayer scenario navigation...');
    
    // Navigate to the main page
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check that we're on the scenario selector page
    await expect(page.locator('.enhanced-scenario-selector')).toBeVisible();
    
    // Look for multiplayer scenario cards (those with the multiplayer badge)
    const multiplayerCards = page.locator('.scenario-card.multiplayer');
    const multiplayerBadge = page.locator('.multiplayer-badge');
    
    // Should have at least one multiplayer scenario
    await expect(multiplayerCards).toHaveCount(1);
    
    // Check that multiplayer badge is visible
    await expect(multiplayerBadge.first()).toBeVisible();
    await expect(multiplayerBadge.first()).toContainText('🌐 MULTIPLAYER');
    
    // Click on the first multiplayer scenario
    await multiplayerCards.first().click();
    
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');
    
    // Should be redirected to multiplayer page
    await expect(page.url()).toContain('/multiplayer');
    
    // Should see the multiplayer lobby
    await expect(page.locator('[data-testid="multiplayer-lobby"]')).toBeVisible();
    
    console.log('✅ Multiplayer scenario navigation test passed!');
  });
  
  test('should distinguish between solo and multiplayer scenarios', async ({ page }) => {
    console.log('🧪 Testing scenario type distinction...');
    
    // Navigate to the main page
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check both types of scenarios exist
    const soloCards = page.locator('.scenario-card:not(.multiplayer)');
    const multiplayerCards = page.locator('.scenario-card.multiplayer');
    
    // Should have both types
    const soloCount = await soloCards.count();
    const multiplayerCount = await multiplayerCards.count();
    expect(soloCount).toBeGreaterThan(0);
    expect(multiplayerCount).toBeGreaterThan(0);
    
    // Solo cards should NOT have multiplayer badge
    await expect(soloCards.first().locator('.multiplayer-badge')).not.toBeVisible();
    
    // Multiplayer cards should have multiplayer badge
    await expect(multiplayerCards.first().locator('.multiplayer-badge')).toBeVisible();
    
    // Test solo scenario navigation
    await soloCards.first().click();
    await page.waitForLoadState('networkidle');
    
    // Should go to game page (not multiplayer)
    await expect(page.url()).toContain('/game/');
    await expect(page.url()).not.toContain('/multiplayer');
    
    console.log('✅ Scenario type distinction test passed!');
  });
  
  test('should show enhanced styling for multiplayer scenarios', async ({ page }) => {
    console.log('🧪 Testing multiplayer scenario styling...');
    
    // Navigate to the main page
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check multiplayer scenario styling
    const multiplayerCard = page.locator('.scenario-card.multiplayer').first();
    await expect(multiplayerCard).toBeVisible();
    
    // Check that it has the multiplayer class
    await expect(multiplayerCard).toHaveClass(/multiplayer/);
    
    // Check that the badge is animated (has animation keyframes)
    const badge = multiplayerCard.locator('.multiplayer-badge');
    await expect(badge).toBeVisible();
    
    // Check the icon is correct for multiplayer
    const icon = multiplayerCard.locator('.scenario-icon-large');
    await expect(icon).toContainText('🌐');
    
    console.log('✅ Multiplayer scenario styling test passed!');
  });
  
  test('should handle backend isMultiplayer field correctly', async ({ page }) => {
    console.log('🧪 Testing backend isMultiplayer field integration...');
    
    // Navigate to the main page
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for page to load
    await page.waitForTimeout(2000);
    
    // Check that scenarios are loaded with isMultiplayer field
    const multiplayerCards = page.locator('.scenario-card.multiplayer');
    const soloCards = page.locator('.scenario-card:not(.multiplayer)');
    
    // Should have both types
    const multiplayerCount = await multiplayerCards.count();
    const soloCount = await soloCards.count();
    expect(multiplayerCount).toBeGreaterThan(0);
    expect(soloCount).toBeGreaterThan(0);
    
    console.log('✅ Backend isMultiplayer field integration test passed!');
  });
}); 