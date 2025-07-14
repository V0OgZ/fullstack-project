import { test, expect } from '@playwright/test';

test.describe('Demo Route Tests', () => {
  test('should load demo interface on /demo route', async ({ page }) => {
    console.log('🧪 Testing demo route...');
    
    await page.goto('http://localhost:3000/demo');
    
    // Check that we're on the demo route
    expect(page.url()).toContain('/demo');
    
    // Check for demo interface elements
    await expect(page.locator('.demo-interface')).toBeVisible();
    await expect(page.locator('h2:has-text("Heroes of Time - Demo Mode")')).toBeVisible();
    
    // Check for demo control buttons
    await expect(page.locator('button:has-text("🎮 Game")')).toBeVisible();
    await expect(page.locator('button:has-text("🧪 Tests")')).toBeVisible();
    await expect(page.locator('button:has-text("🎬 Interactive")')).toBeVisible();
    
    // Game should be active by default
    await expect(page.locator('button:has-text("🎮 Game").active')).toBeVisible();
    
    console.log('✅ Demo route loaded successfully');
  });

  test('should switch between demo modes', async ({ page }) => {
    console.log('🧪 Testing demo mode switching...');
    
    await page.goto('http://localhost:3000/demo');
    
    // Switch to Tests mode
    await page.click('button:has-text("🧪 Tests")');
    await expect(page.locator('h2:has-text("🧪 Playwright Tests")')).toBeVisible();
    await expect(page.locator('.test-card').first()).toBeVisible();
    
    // Switch to Interactive mode
    await page.click('button:has-text("🎬 Interactive")');
    await expect(page.locator('h2:has-text("🎬 Interactive Demos")')).toBeVisible();
    await expect(page.locator('.interactive-card').first()).toBeVisible();
    
    // Switch back to Game mode
    await page.click('button:has-text("🎮 Game")');
    await expect(page.locator('h2:has-text("Heroes of Time - Demo Mode")')).toBeVisible();
    await expect(page.locator('.true-heroes-interface')).toBeVisible();
    
    console.log('✅ Demo mode switching works correctly');
  });

  test('should show interactive demo tooltip', async ({ page }) => {
    console.log('🧪 Testing interactive demo tooltip...');
    
    await page.goto('http://localhost:3000/demo');
    
    // Switch to Interactive mode
    await page.click('button:has-text("🎬 Interactive")');
    
    // Click on tooltip demo
    await page.locator('button:has-text("🎬 Try Demo")').first().click();
    
    // Check for tooltip appearance
    await expect(page.locator('div:has-text("Demo Tooltip System")').first()).toBeVisible();
    
    console.log('✅ Interactive demo tooltip works');
  });
}); 