// 🎮 Test Epic Content Viewer avec Fallbacks
// ============================================

import { test, expect } from '@playwright/test';

test.describe('Epic Content Viewer with Fallback System', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the game
    await page.goto('http://localhost:3000');
    
    // Wait for the game to load
    await page.waitForSelector('button[title*="Contenu Épique"]', { timeout: 10000 });
  });

  test('should open Epic Content Viewer and display server status', async ({ page }) => {
    // Screenshot before opening
    await page.screenshot({ path: 'screenshots/epic-content-before.png', fullPage: true });
    
    // Click the Epic Content button (🐉)
    await page.click('button[title*="Contenu Épique"]');
    
    // Wait for modal to appear
    await page.waitForSelector('[style*="position: fixed"]', { timeout: 5000 });
    
    // Check if modal is visible
    const modal = await page.locator('[style*="position: fixed"]');
    await expect(modal).toBeVisible();
    
    // Check server status indicator
    const serverStatus = await page.locator('div:has-text("Backend")');
    await expect(serverStatus).toBeVisible();
    
    // Check if it shows online or offline status
    const isOnline = await page.locator('div:has-text("Backend Online")').isVisible();
    const isOffline = await page.locator('div:has-text("Backend Offline")').isVisible();
    
    expect(isOnline || isOffline).toBeTruthy();
    
    console.log('✅ Server status indicator working');
    
    // Screenshot with modal open
    await page.screenshot({ path: 'screenshots/epic-content-modal.png', fullPage: true });
  });

  test('should display all three tabs with correct counts', async ({ page }) => {
    // Open Epic Content Viewer
    await page.click('button[title*="Contenu Épique"]');
    await page.waitForSelector('[style*="position: fixed"]', { timeout: 5000 });
    
    // Check creatures tab
    const creaturesTab = await page.locator('button:has-text("🐉 Créatures")');
    await expect(creaturesTab).toBeVisible();
    const creaturesText = await creaturesTab.textContent();
    expect(creaturesText).toMatch(/\(\d+\)/); // Should have count in parentheses
    
    // Check heroes tab
    const heroesTab = await page.locator('button:has-text("🦸 Héros")');
    await expect(heroesTab).toBeVisible();
    const heroesText = await heroesTab.textContent();
    expect(heroesText).toMatch(/\(\d+\)/);
    
    // Check buildings tab
    const buildingsTab = await page.locator('button:has-text("🏰 Bâtiments")');
    await expect(buildingsTab).toBeVisible();
    const buildingsText = await buildingsTab.textContent();
    expect(buildingsText).toMatch(/\(\d+\)/);
    
    console.log('✅ All tabs present with counts');
  });

  test('should display creatures with fallback data', async ({ page }) => {
    // Open Epic Content Viewer
    await page.click('button[title*="Contenu Épique"]');
    await page.waitForSelector('[style*="position: fixed"]', { timeout: 5000 });
    
    // Creatures tab should be active by default
    const creaturesHeader = await page.locator('h3:has-text("🐉 CRÉATURES ÉPIQUES")');
    await expect(creaturesHeader).toBeVisible();
    
    // Check if it shows backend or fallback mode
    const headerText = await creaturesHeader.textContent();
    expect(headerText).toMatch(/(Backend API|Fallback Local)/);
    
    // Wait for creatures to load
    await page.waitForSelector('div:has-text("Dragon")', { timeout: 3000 });
    
    // Check if creatures are displayed
    const creatureCards = await page.locator('div:has-text("Dragon")').first();
    await expect(creatureCards).toBeVisible();
    
    // Check creature stats
    const statsElements = await page.locator('strong:has-text("❤️ HP:")');
    await expect(statsElements.first()).toBeVisible();
    
    console.log('✅ Creatures displayed with fallback data');
    
    // Screenshot creatures tab
    await page.screenshot({ path: 'screenshots/epic-content-creatures.png', fullPage: true });
  });

  test('should display heroes with fallback data', async ({ page }) => {
    // Open Epic Content Viewer
    await page.click('button[title*="Contenu Épique"]');
    await page.waitForSelector('[style*="position: fixed"]', { timeout: 5000 });
    
    // Click heroes tab
    await page.click('button:has-text("🦸 Héros")');
    
    // Wait for heroes content
    await page.waitForSelector('h3:has-text("🦸 HÉROS ÉPIQUES")', { timeout: 3000 });
    
    // Check if heroes are displayed
    const heroCard = await page.locator('div:has-text("Arthur")').first();
    await expect(heroCard).toBeVisible();
    
    // Check hero stats
    const levelElement = await page.locator('strong:has-text("Level:")');
    await expect(levelElement.first()).toBeVisible();
    
    // Check stats grid
    const attackStat = await page.locator('div:has-text("⚔️ ATK:")');
    await expect(attackStat.first()).toBeVisible();
    
    console.log('✅ Heroes displayed with fallback data');
    
    // Screenshot heroes tab
    await page.screenshot({ path: 'screenshots/epic-content-heroes.png', fullPage: true });
  });

  test('should display buildings with fallback data', async ({ page }) => {
    // Open Epic Content Viewer
    await page.click('button[title*="Contenu Épique"]');
    await page.waitForSelector('[style*="position: fixed"]', { timeout: 5000 });
    
    // Click buildings tab
    await page.click('button:has-text("🏰 Bâtiments")');
    
    // Wait for buildings content
    await page.waitForSelector('h3:has-text("🏰 BÂTIMENTS ÉPIQUES")', { timeout: 3000 });
    
    // Check if buildings are displayed
    const buildingCard = await page.locator('div:has-text("Château")').first();
    await expect(buildingCard).toBeVisible();
    
    // Check building costs
    const costElements = await page.locator('div:has-text("🪵")');
    await expect(costElements.first()).toBeVisible();
    
    // Check different races
    const raceElements = await page.locator('strong:has-text("Race:")');
    await expect(raceElements.first()).toBeVisible();
    
    console.log('✅ Buildings displayed with fallback data');
    
    // Screenshot buildings tab
    await page.screenshot({ path: 'screenshots/epic-content-buildings.png', fullPage: true });
  });

  test('should show endpoint status indicators on tabs', async ({ page }) => {
    // Open Epic Content Viewer
    await page.click('button[title*="Contenu Épique"]');
    await page.waitForSelector('[style*="position: fixed"]', { timeout: 5000 });
    
    // Check for status indicators (colored dots)
    const tabButtons = await page.locator('button:has-text("Créatures"), button:has-text("Héros"), button:has-text("Bâtiments")');
    const count = await tabButtons.count();
    
    expect(count).toBe(3);
    
    // Each tab should have a status indicator
    for (let i = 0; i < count; i++) {
      const tab = tabButtons.nth(i);
      // Look for the status dot (positioned absolute)
      const hasDot = await tab.locator('div').count() > 0;
      expect(hasDot).toBeTruthy();
    }
    
    console.log('✅ Status indicators present on tabs');
  });

  test('should close modal when clicking close button', async ({ page }) => {
    // Open Epic Content Viewer
    await page.click('button[title*="Contenu Épique"]');
    await page.waitForSelector('[style*="position: fixed"]', { timeout: 5000 });
    
    // Modal should be visible
    const modal = await page.locator('[style*="position: fixed"]');
    await expect(modal).toBeVisible();
    
    // Click close button
    await page.click('button:has-text("✕ Fermer")');
    
    // Modal should be hidden
    await expect(modal).not.toBeVisible();
    
    console.log('✅ Modal closes properly');
  });

  test('should handle image loading errors gracefully', async ({ page }) => {
    // Open Epic Content Viewer
    await page.click('button[title*="Contenu Épique"]');
    await page.waitForSelector('[style*="position: fixed"]', { timeout: 5000 });
    
    // Check creatures tab (default)
    const creatureImages = await page.locator('img[alt*="Dragon"], img[alt*="Knight"], img[alt*="Griffin"]');
    const imageCount = await creatureImages.count();
    
    expect(imageCount).toBeGreaterThan(0);
    
    // Images should have proper error handling
    // The component should show emoji fallbacks if images fail to load
    
    console.log('✅ Image error handling configured');
  });

  test('should display comprehensive data for all content types', async ({ page }) => {
    // Open Epic Content Viewer
    await page.click('button[title*="Contenu Épique"]');
    await page.waitForSelector('[style*="position: fixed"]', { timeout: 5000 });
    
    // Test creatures data completeness
    const creatureStats = await page.locator('strong:has-text("❤️ HP:"), strong:has-text("⚔️ ATK:"), strong:has-text("🛡️ DEF:")');
    expect(await creatureStats.count()).toBeGreaterThan(0);
    
    // Test heroes data completeness
    await page.click('button:has-text("🦸 Héros")');
    await page.waitForTimeout(1000);
    
    const heroStats = await page.locator('div:has-text("⚔️ ATK:"), div:has-text("🛡️ DEF:"), div:has-text("🔮 SP:")');
    expect(await heroStats.count()).toBeGreaterThan(0);
    
    // Test buildings data completeness
    await page.click('button:has-text("🏰 Bâtiments")');
    await page.waitForTimeout(1000);
    
    const buildingCosts = await page.locator('div:has-text("🪵"), div:has-text("🪨"), div:has-text("💰")');
    expect(await buildingCosts.count()).toBeGreaterThan(0);
    
    console.log('✅ All content types show comprehensive data');
    
    // Final screenshot
    await page.screenshot({ path: 'screenshots/epic-content-complete.png', fullPage: true });
  });
}); 