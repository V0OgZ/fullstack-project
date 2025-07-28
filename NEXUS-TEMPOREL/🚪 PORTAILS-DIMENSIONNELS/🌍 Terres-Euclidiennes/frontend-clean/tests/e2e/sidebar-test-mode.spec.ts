import { test, expect, Page } from '@playwright/test';

test.describe('Sidebar Test Mode', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('should enable test mode and disable map', async () => {
    // Click on Test Mode button (🧪)
    await page.click('[title="Test Mode - Disable Map"]');
    
    // Verify map is disabled
    await expect(page.locator('.test-mode-placeholder')).toBeVisible();
    await expect(page.locator('.test-mode-placeholder')).toContainText('MAP DISABLED FOR TESTING');
    
    // Verify sidebar is fully visible
    await expect(page.locator('.right-sidebar')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/sidebar-test-mode.png', fullPage: true });
  });

  test('should test all sidebar panels in test mode', async () => {
    // Enable test mode
    await page.click('[title="Test Mode - Disable Map"]');
    
    // Test Hero Panel
    await page.click('[title="Heroes"]');
    await expect(page.locator('.enhanced-hero-panel')).toBeVisible();
    await page.screenshot({ path: 'test-results/hero-panel-test-mode.png', fullPage: true });
    
    // Test Castle Panel
    await page.click('[title="Castle"]');
    await expect(page.locator('.enhanced-castle-panel')).toBeVisible();
    await page.screenshot({ path: 'test-results/castle-panel-test-mode.png', fullPage: true });
    
    // Test Inventory Panel
    await page.click('[title="Inventory"]');
    await expect(page.locator('.enhanced-inventory-panel')).toBeVisible();
    await page.screenshot({ path: 'test-results/inventory-panel-test-mode.png', fullPage: true });
    
    // Test Script Panel
    await page.click('[title="Script Tester"]');
    await expect(page.locator('.script-panel')).toBeVisible();
    await page.screenshot({ path: 'test-results/script-panel-test-mode.png', fullPage: true });
  });

  test('should disable test mode and re-enable map', async () => {
    // Enable test mode
    await page.click('[title="Test Mode - Disable Map"]');
    
    // Verify test mode is active
    await expect(page.locator('.test-mode-placeholder')).toBeVisible();
    
    // Disable test mode
    await page.click('text=🗺️ Enable Map');
    
    // Verify map is re-enabled
    await expect(page.locator('.test-mode-placeholder')).not.toBeVisible();
    await expect(page.locator('canvas')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/map-re-enabled.png', fullPage: true });
  });

  test('should demonstrate enhanced sidebar features', async () => {
    // Enable test mode for better sidebar visibility
    await page.click('[title="Test Mode - Disable Map"]');
    
    // Test Hero Panel interactions
    await page.click('[title="Heroes"]');
    
    // Click on a hero
    await page.click('.hero-card:first-child');
    
    // Test hero actions
    await page.click('text=Move');
    await page.click('text=Attack');
    await page.click('text=Cast');
    
    // Test Castle Panel
    await page.click('[title="Castle"]');
    
    // Test tab switching
    await page.click('text=Overview');
    await page.click('text=Creatures');
    await page.click('text=Buildings');
    
    // Test Inventory Panel
    await page.click('[title="Inventory"]');
    
    // Test equipment slots
    await page.click('.equipment-slot:first-child');
    
    // Take final screenshot
    await page.screenshot({ path: 'test-results/enhanced-sidebar-demo.png', fullPage: true });
  });

  test('should verify resource display in sidebar header', async () => {
    // Enable test mode
    await page.click('[title="Test Mode - Disable Map"]');
    
    // Verify resources are displayed
    await expect(page.locator('.resource')).toHaveCount(3);
    await expect(page.locator('text=💰')).toBeVisible();
    await expect(page.locator('text=🪵')).toBeVisible();
    await expect(page.locator('text=🪨')).toBeVisible();
    
    // Verify turn information
    await expect(page.locator('.turn-info')).toBeVisible();
    await expect(page.locator('.turn-info')).toContainText('Turn:');
  });

  test('should test responsive behavior in test mode', async () => {
    // Enable test mode
    await page.click('[title="Test Mode - Disable Map"]');
    
    // Test different viewport sizes
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.screenshot({ path: 'test-results/sidebar-desktop.png', fullPage: true });
    
    await page.setViewportSize({ width: 768, height: 600 });
    await page.screenshot({ path: 'test-results/sidebar-tablet.png', fullPage: true });
    
    await page.setViewportSize({ width: 480, height: 800 });
    await page.screenshot({ path: 'test-results/sidebar-mobile.png', fullPage: true });
  });
}); 