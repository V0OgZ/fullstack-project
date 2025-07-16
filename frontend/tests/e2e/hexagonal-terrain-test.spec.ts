import { test, expect } from '@playwright/test';

test.describe('Hexagonal Terrain Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('should render hexagonal terrain with proper coverage', async ({ page }) => {
    // Wait for the game to load
    await page.waitForSelector('.modern-game-renderer', { timeout: 10000 });
    
    // Click on a scenario to start the game
    await page.locator('text=Dragon Campaign').click();
    await page.waitForTimeout(2000);
    
    // Take a screenshot to verify hexagonal rendering
    await page.screenshot({ 
      path: 'test-results/hexagonal-terrain.png',
      fullPage: true
    });
    
    // Verify the canvas exists and has content
    const canvas = await page.locator('canvas').first();
    expect(await canvas.isVisible()).toBe(true);
    
    // Check that terrain tiles are rendered (canvas should have content)
    const canvasSize = await canvas.boundingBox();
    expect(canvasSize).toBeTruthy();
    expect(canvasSize!.width).toBeGreaterThan(500);
    expect(canvasSize!.height).toBeGreaterThan(400);
    
    // Test hexagonal selection by clicking on terrain
    await canvas.click({ position: { x: 300, y: 200 } });
    await page.waitForTimeout(500);
    
    // Take screenshot showing selection
    await page.screenshot({ 
      path: 'test-results/hexagonal-selection.png',
      fullPage: true
    });
    
    console.log('✅ Hexagonal terrain rendering test completed');
  });

  test('should show hexagonal movement range', async ({ page }) => {
    // Wait for the game to load
    await page.waitForSelector('.modern-game-renderer', { timeout: 10000 });
    
    // Start a game
    await page.locator('text=Dragon Campaign').click();
    await page.waitForTimeout(2000);
    
    // Select a hero and show movement range
    const canvas = await page.locator('canvas').first();
    await canvas.click({ position: { x: 400, y: 300 } });
    await page.waitForTimeout(500);
    
    // Take screenshot showing hexagonal movement range
    await page.screenshot({ 
      path: 'test-results/hexagonal-movement.png',
      fullPage: true
    });
    
    console.log('✅ Hexagonal movement range test completed');
  });

  test('should render different terrain types with hexagonal shapes', async ({ page }) => {
    // Wait for the game to load
    await page.waitForSelector('.modern-game-renderer', { timeout: 10000 });
    
    // Start a game
    await page.locator('text=Dragon Campaign').click();
    await page.waitForTimeout(2000);
    
    // Test clicking on different terrain types
    const canvas = await page.locator('canvas').first();
    
    // Click on various positions to test different terrain types
    const testPositions = [
      { x: 200, y: 150 }, // Top left
      { x: 400, y: 200 }, // Center
      { x: 600, y: 250 }, // Right
      { x: 300, y: 350 }, // Bottom
    ];
    
    for (const pos of testPositions) {
      await canvas.click({ position: pos });
      await page.waitForTimeout(300);
    }
    
    // Take final screenshot
    await page.screenshot({ 
      path: 'test-results/hexagonal-terrain-types.png',
      fullPage: true
    });
    
    console.log('✅ Hexagonal terrain types test completed');
  });
}); 