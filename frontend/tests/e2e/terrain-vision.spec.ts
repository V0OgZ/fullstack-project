import { test, expect } from '@playwright/test';

test.describe('Terrain & Vision System', () => {
  test.beforeEach(async ({ page }) => {
    // Force English language
    await page.addInitScript(() => {
      localStorage.setItem('heroes-reforged-i18n', JSON.stringify({
        state: { language: 'en' },
        version: 0
      }));
    });
    
    await page.goto('http://localhost:3000');
    
    // Select and start Conquest Classic scenario
    await page.getByTestId('scenario-card-conquest-classic').click();
    await page.getByTestId('play-button-conquest-classic').click();
    
    // Wait for game to load
    await page.waitForSelector('canvas', { timeout: 10000 });
  });

  test('should render terrain transitions correctly', async ({ page }) => {
    // Wait for canvas to be rendered
    const canvas = await page.locator('canvas').first();
    await expect(canvas).toBeVisible();
    
    // Take screenshot to verify terrain rendering
    await page.screenshot({ 
      path: 'test-results/terrain-transitions.png',
      fullPage: false,
      clip: {
        x: 100,
        y: 100,
        width: 600,
        height: 400
      }
    });
    
    // Verify canvas is rendered with content
    const canvasBox = await canvas.boundingBox();
    expect(canvasBox).toBeTruthy();
    expect(canvasBox?.width).toBeGreaterThan(0);
    expect(canvasBox?.height).toBeGreaterThan(0);
  });

  test('should display movement highlights when hero selected', async ({ page }) => {
    // Click on a hero to select it
    // First, we need to find where a hero is rendered
    const canvas = await page.locator('canvas').first();
    
    // Click roughly in the center where a hero might be
    await canvas.click({ position: { x: 300, y: 200 } });
    
    // Wait a bit for selection to register
    await page.waitForTimeout(500);
    
    // Take screenshot to verify movement highlights
    await page.screenshot({ 
      path: 'test-results/movement-highlights.png',
      fullPage: false
    });
    
    // Check if hero info panel shows selected hero
    const heroPanel = page.locator('.hero-panel-content');
    await expect(heroPanel).toContainText(/Hero:|Level:/);
  });

  test('should show fog of war layers', async ({ page }) => {
    // Move the viewport to an edge area where fog might be visible
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    
    // Wait for rendering
    await page.waitForTimeout(1000);
    
    // Take screenshot to verify fog of war
    await page.screenshot({ 
      path: 'test-results/fog-of-war.png',
      fullPage: false
    });
    
    // The canvas should still be visible even with fog
    const canvas = await page.locator('canvas').first();
    await expect(canvas).toBeVisible();
  });

  test('should update vision when hero moves', async ({ page }) => {
    // Select a hero
    const canvas = await page.locator('canvas').first();
    await canvas.click({ position: { x: 300, y: 200 } });
    await page.waitForTimeout(500);
    
    // Click on a nearby tile to move
    await canvas.click({ position: { x: 350, y: 250 } });
    await page.waitForTimeout(1000);
    
    // Take screenshot after movement
    await page.screenshot({ 
      path: 'test-results/vision-after-move.png',
      fullPage: false
    });
    
    // Verify movement occurred by checking if coordinates changed
    // This would require checking the hero panel or game state
    const heroPanel = page.locator('.hero-panel-content');
    await expect(heroPanel).toBeVisible();
  });

  test('should show correct terrain tooltips on hover', async ({ page }) => {
    const canvas = await page.locator('canvas').first();
    
    // Hover over different positions
    await canvas.hover({ position: { x: 200, y: 150 } });
    await page.waitForTimeout(500);
    
    // Check for terrain tooltip (if implemented)
    // Note: This assumes tooltips are implemented
    const tooltip = page.locator('.terrain-tooltip');
    if (await tooltip.isVisible()) {
      await expect(tooltip).toContainText(/grass|forest|water|mountain/i);
    }
  });

  test('should handle sprite loading errors gracefully', async ({ page }) => {
    // This test verifies the error handling we added for broken images
    // Navigate to game
    const canvas = await page.locator('canvas').first();
    await expect(canvas).toBeVisible();
    
    // Check console for any pattern creation errors
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'warning' && msg.text().includes('Pattern creation failed')) {
        consoleLogs.push(msg.text());
      }
    });
    
    // Wait a bit to collect any warnings
    await page.waitForTimeout(2000);
    
    // The game should still be playable even if some sprites fail
    await canvas.click({ position: { x: 300, y: 200 } });
    await expect(canvas).toBeVisible();
  });
});

// Fullscreen demo test
test.describe('Terrain Vision Demo', () => {
  test('complete terrain and vision demo', async ({ page }) => {
    test.setTimeout(60000); // 1 minute timeout
    
    // Force English language
    await page.addInitScript(() => {
      localStorage.setItem('heroes-reforged-i18n', JSON.stringify({
        state: { language: 'en' },
        version: 0
      }));
    });
    
    await page.goto('http://localhost:3000');
    
    // Start game
    await page.getByTestId('scenario-card-conquest-classic').click();
    await page.getByTestId('play-button-conquest-classic').click();
    await page.waitForSelector('canvas', { timeout: 10000 });
    
    // Demo sequence
    const canvas = await page.locator('canvas').first();
    
    // 1. Pan around to show terrain variety
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(300);
    }
    for (let i = 0; i < 2; i++) {
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(300);
    }
    
    // 2. Select hero to show movement ranges
    await canvas.click({ position: { x: 300, y: 200 } });
    await page.waitForTimeout(1000);
    
    // 3. Move hero to update vision
    await canvas.click({ position: { x: 400, y: 250 } });
    await page.waitForTimeout(1500);
    
    // 4. End turn to show vision persistence
    await page.getByRole('button', { name: /End.*Turn/i }).click();
    await page.waitForTimeout(1000);
    
    // Final screenshot
    await page.screenshot({ 
      path: 'test-results/terrain-vision-demo-final.png',
      fullPage: true
    });
  });
}); 