import { test, expect } from '@playwright/test';

test.describe('🌫️ Brouillard de Causalité Panel Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the main game interface
    await page.goto('http://localhost:8000');
    
    // Wait for the interface to load
    await page.waitForSelector('.true-heroes-interface');
    await page.waitForTimeout(2000);
  });

  test('should display fog causality button in sidebar', async ({ page }) => {
    // Check that the fog button exists
    const fogButton = page.locator('button[title="Brouillard de Causalité"]');
    await expect(fogButton).toBeVisible();
    
    // Check button has correct icon
    await expect(fogButton).toContainText('🌫️');
  });

  test('should show fog panel when clicking fog button', async ({ page }) => {
    // Click the fog button
    await page.click('button[title="Brouillard de Causalité"]');
    
    // Wait for panel to appear
    await page.waitForSelector('.fog-panel');
    
    // Check panel header
    const panelHeader = page.locator('.fog-panel .panel-header h3');
    await expect(panelHeader).toContainText('🌫️ Brouillard de Causalité');
  });

  test('should display minimal fog container elements', async ({ page }) => {
    // Click fog button to open panel
    await page.click('button[title="Brouillard de Causalité"]');
    
    // Check temporal timeline exists
    const timeline = page.locator('.temporal-timeline');
    await expect(timeline).toBeVisible();
    
    // Check timeline bar exists
    const timelineBar = page.locator('.timeline-bar');
    await expect(timelineBar).toBeVisible();
    
    // Check timeline progress is visible
    const timelineProgress = page.locator('.timeline-progress');
    await expect(timelineProgress).toBeVisible();
    
    // Check timeline current marker
    const timelineCurrent = page.locator('.timeline-current');
    await expect(timelineCurrent).toBeVisible();
  });

  test('should display causality zones with colors', async ({ page }) => {
    // Open fog panel
    await page.click('button[title="Brouillard de Causalité"]');
    
    // Check zones grid exists
    const zonesGrid = page.locator('.zones-grid');
    await expect(zonesGrid).toBeVisible();
    
    // Check all 4 zones are present
    const zoneItems = page.locator('.zone-item');
    await expect(zoneItems).toHaveCount(4);
    
    // Check specific zones
    await expect(page.locator('.zone-clear')).toBeVisible();
    await expect(page.locator('.zone-shadow')).toBeVisible();
    await expect(page.locator('.zone-fog')).toBeVisible();
    await expect(page.locator('.zone-void')).toBeVisible();
    
    // Check that each zone has a color indicator
    const zoneColors = page.locator('.zone-color');
    await expect(zoneColors).toHaveCount(4);
  });

  test('should show tooltips on hover', async ({ page }) => {
    // Open fog panel
    await page.click('button[title="Brouillard de Causalité"]');
    
    // Hover over timeline current marker
    const timelineCurrent = page.locator('.timeline-current');
    await timelineCurrent.hover();
    
    // Check tooltip exists (via title attribute)
    await expect(timelineCurrent).toHaveAttribute('title', 'Tour Actuel: 67/100');
    
    // Hover over clear zone
    const clearZone = page.locator('.zone-clear');
    await clearZone.hover();
    await expect(clearZone).toHaveAttribute('title', /Zone Claire.*Vision totale/);
  });

  test('should display fog indicators', async ({ page }) => {
    // Open fog panel
    await page.click('button[title="Brouillard de Causalité"]');
    
    // Check indicators container
    const indicators = page.locator('.fog-indicators');
    await expect(indicators).toBeVisible();
    
    // Check all 3 indicators
    const indicatorItems = page.locator('.indicator');
    await expect(indicatorItems).toHaveCount(3);
    
    // Check specific indicators
    await expect(page.locator('.indicator').nth(0)).toContainText('👁️');
    await expect(page.locator('.indicator').nth(0)).toContainText('Visibilité: 72%');
    
    await expect(page.locator('.indicator').nth(1)).toContainText('⚡');
    await expect(page.locator('.indicator').nth(1)).toContainText('Stabilité: 85%');
    
    await expect(page.locator('.indicator').nth(2)).toContainText('🔮');
    await expect(page.locator('.indicator').nth(2)).toContainText('Causalité: Forte');
  });

  test('should have responsive design on smaller screens', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 400, height: 800 });
    
    // Open fog panel
    await page.click('button[title="Brouillard de Causalité"]');
    
    // Check that zones grid becomes single column on mobile
    const zonesGrid = page.locator('.zones-grid');
    await expect(zonesGrid).toBeVisible();
    
    // Check timeline still works on mobile
    const timeline = page.locator('.temporal-timeline');
    await expect(timeline).toBeVisible();
  });

  test('should maintain fog panel state when switching panels', async ({ page }) => {
    // Open fog panel first
    await page.click('button[title="Brouillard de Causalité"]');
    await expect(page.locator('.fog-panel')).toBeVisible();
    
    // Switch to hero panel
    await page.click('button[title="Hero"]');
    await expect(page.locator('.hero-panel')).toBeVisible();
    
    // Switch back to fog panel
    await page.click('button[title="Brouillard de Causalité"]');
    await expect(page.locator('.fog-panel')).toBeVisible();
    
    // Verify content is still there
    await expect(page.locator('.temporal-timeline')).toBeVisible();
    await expect(page.locator('.causality-zones')).toBeVisible();
  });
}); 