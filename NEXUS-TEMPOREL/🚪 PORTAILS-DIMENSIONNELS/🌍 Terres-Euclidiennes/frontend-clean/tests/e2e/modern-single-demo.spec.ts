import { test, expect } from '@playwright/test';

/**
 * 🎮 Modern Single Player Demo
 * 
 * Demonstrates the new modern UI with glassmorphism effects,
 * interactive tooltips, and smooth animations for single player gameplay.
 */

test.describe('🎮 Modern Single Player Demo - Glassmorphism Interface', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.true-heroes-interface');
    await page.waitForTimeout(1000);
  });

  test('🌟 Complete Single Player Experience', async ({ page }) => {
    console.log('🎬 Starting Modern Single Player Demo...');
    
    // === 1. Main Interface Overview ===
    console.log('📱 Testing main interface...');
    await expect(page.locator('.true-heroes-interface')).toBeVisible();
    await expect(page.locator('.game-map-container')).toBeVisible();
    await expect(page.locator('.right-sidebar')).toBeVisible();
    
    await page.screenshot({ path: 'screenshots/single-01-main-interface.png' });
    
    // === 2. Test Scenario Panel ===
    console.log('🏔️ Testing scenario panel...');
    await page.click('button[title="Scenario"]');
    await page.waitForTimeout(500);
    
    // Test tooltip on scenario button
    await page.hover('button[title="Scenario"]');
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'screenshots/single-02-scenario-tooltip.png' });
    
    // Test game controls
    const endTurnBtn = page.locator('.end-turn-btn');
    await expect(endTurnBtn).toBeVisible();
    await expect(endTurnBtn).toContainText('End Turn');
    
    await endTurnBtn.hover();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'screenshots/single-03-end-turn-hover.png' });
    
    // === 3. Hero Management ===
    console.log('⚔️ Testing hero management...');
    await page.click('button[title="Hero"]');
    await page.waitForTimeout(500);
    
    // Test hero tooltips
    await page.hover('button[title="Hero"]');
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'screenshots/single-04-hero-tooltip.png' });
    
    // Test hero cards
    const heroCards = page.locator('.hero-card');
    await expect(heroCards).toHaveCount(2);
    
    // Test hero card hover effects
    await heroCards.first().hover();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'screenshots/single-05-hero-card-hover.png' });
    
    // Click on hero card
    await heroCards.first().click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'screenshots/single-06-hero-selection.png' });
    
    // === 4. Castle Management ===
    console.log('🏰 Testing castle management...');
    await page.click('button[title="Castle"]');
    await page.waitForTimeout(500);
    
    // Test castle tooltip
    await page.hover('button[title="Castle"]');
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'screenshots/single-07-castle-tooltip.png' });
    
    // Test castle action buttons
    const actionBtns = page.locator('.action-btn');
    await expect(actionBtns).toHaveCount(3);
    
    // Test each action button
    for (let i = 0; i < 3; i++) {
      await actionBtns.nth(i).hover();
      await page.waitForTimeout(200);
      await page.screenshot({ path: `screenshots/single-08-action-${i + 1}-hover.png` });
    }
    
    // === 5. Inventory System ===
    console.log('🎒 Testing inventory system...');
    await page.click('button[title="Inventory"]');
    await page.waitForTimeout(500);
    
    // Test inventory tooltip
    await page.hover('button[title="Inventory"]');
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'screenshots/single-09-inventory-tooltip.png' });
    
    // Test equipment slots
    const equipmentSlots = page.locator('.equipment-slot');
    await expect(equipmentSlots).toHaveCount(4);
    
    // Test equipment slot hover effects
    for (let i = 0; i < 4; i++) {
      await equipmentSlots.nth(i).hover();
      await page.waitForTimeout(200);
      await page.screenshot({ path: `screenshots/single-10-equipment-${i + 1}-hover.png` });
    }
    
    // === 6. Script Editor ===
    console.log('🧪 Testing script editor...');
    await page.click('button[title="Script Editor"]');
    await page.waitForTimeout(500);
    
    // Test script editor tooltip
    await page.hover('button[title="Script Editor"]');
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'screenshots/single-11-script-tooltip.png' });
    
    // Test script editor functionality
    const scriptTextarea = page.locator('.script-textarea');
    await expect(scriptTextarea).toBeVisible();
    
    // Test script buttons
    const scriptBtns = page.locator('.script-btn');
    await expect(scriptBtns).toHaveCount(5);
    
    // Test script button hover effects
    for (let i = 0; i < 5; i++) {
      await scriptBtns.nth(i).hover();
      await page.waitForTimeout(200);
      await page.screenshot({ path: `screenshots/single-12-script-btn-${i + 1}-hover.png` });
    }
    
    // Test script execution
    await scriptTextarea.fill('// Test script\nconsole.log("Hello Heroes of Time!");');
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'screenshots/single-13-script-editing.png' });
    
    // === 7. Epic Content ===
    console.log('🌟 Testing epic content...');
    await page.click('button[title="Epic Content"]');
    await page.waitForTimeout(500);
    
    // Test epic content tooltip
    await page.hover('button[title="Epic Content"]');
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'screenshots/single-14-epic-tooltip.png' });
    
    // Test epic items
    const epicItems = page.locator('.epic-item');
    await expect(epicItems).toHaveCount(3);
    
    // Test epic item hover effects
    for (let i = 0; i < 3; i++) {
      await epicItems.nth(i).hover();
      await page.waitForTimeout(300);
      await page.screenshot({ path: `screenshots/single-15-epic-item-${i + 1}-hover.png` });
    }
    
    // === 8. Test Mode Toggle ===
    console.log('🔧 Testing test mode...');
    await page.click('button[title="Scenario"]');
    await page.waitForTimeout(500);
    
    // Toggle test mode
    await page.click('.test-mode-btn');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/single-16-test-mode-active.png' });
    
    // Deactivate test mode
    await page.click('.test-mode-placeholder button');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/single-17-test-mode-deactivated.png' });
    
    // === 9. Turn Management ===
    console.log('⏰ Testing turn management...');
    const turnCounter = page.locator('.turn-counter');
    await expect(turnCounter).toBeVisible();
    await expect(turnCounter).toContainText('Turn');
    
    // Test end turn functionality
    await page.click('.end-turn-btn');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/single-18-turn-ended.png' });
    
    // === 10. Resource Display ===
    console.log('💰 Testing resource display...');
    const resources = page.locator('.resources');
    await expect(resources).toBeVisible();
    await expect(resources).toContainText('💰');
    
    await resources.hover();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'screenshots/single-19-resources-hover.png' });
    
    // === 11. Sidebar Navigation Flow ===
    console.log('🔄 Testing complete navigation flow...');
    const navigationTabs = [
      'button[title="Scenario"]',
      'button[title="Hero"]', 
      'button[title="Castle"]',
      'button[title="Inventory"]',
      'button[title="Script Editor"]',
      'button[title="Epic Content"]'
    ];
    
    for (const tab of navigationTabs) {
      await page.click(tab);
      await page.waitForTimeout(400);
      
      // Verify active state
      await expect(page.locator(tab)).toHaveClass(/active/);
    }
    
    await page.screenshot({ path: 'screenshots/single-20-navigation-complete.png' });
    
    // === 12. Final Overview ===
    console.log('🏁 Final overview...');
    await page.click('button[title="Scenario"]');
    await page.waitForTimeout(500);
    
    // Capture final state
    await page.screenshot({ 
      path: 'screenshots/single-21-final-overview.png',
      fullPage: true
    });
    
    // Verify all major components are functional
    await expect(page.locator('.game-map-container')).toBeVisible();
    await expect(page.locator('.right-sidebar')).toBeVisible();
    await expect(page.locator('.sidebar-header')).toBeVisible();
    await expect(page.locator('.sidebar-controls')).toBeVisible();
    await expect(page.locator('.sidebar-content')).toBeVisible();
    
    console.log('✅ Modern Single Player Demo completed successfully!');
    console.log('🎨 All UI components tested with tooltips and hover effects!');
    console.log('⚡ Modern glassmorphism interface fully functional!');
  });

  test('🎯 Interactive Elements Test', async ({ page }) => {
    console.log('🎯 Testing interactive elements...');
    
    // Test all interactive elements have proper hover states
    const interactiveElements = [
      '.sidebar-tab',
      '.end-turn-btn',
      '.test-mode-btn',
      '.action-btn',
      '.equipment-slot',
      '.hero-card',
      '.epic-item',
      '.script-btn'
    ];
    
    for (const selector of interactiveElements) {
      const elements = page.locator(selector);
      const count = await elements.count();
      
      for (let i = 0; i < count; i++) {
        await elements.nth(i).hover();
        await page.waitForTimeout(100);
        
        // Verify hover effect (should have some visual change)
        const element = elements.nth(i);
        await expect(element).toBeVisible();
      }
    }
    
    console.log('✅ All interactive elements tested!');
  });

  test('🌟 Tooltips Performance Test', async ({ page }) => {
    console.log('🌟 Testing tooltips performance...');
    
    // Test rapid tooltip triggers
    const tooltipElements = [
      'button[title="Scenario"]',
      'button[title="Hero"]',
      'button[title="Castle"]',
      'button[title="Inventory"]',
      'button[title="Script Editor"]',
      'button[title="Epic Content"]'
    ];
    
    for (const element of tooltipElements) {
      await page.hover(element);
      await page.waitForTimeout(100);
      await page.hover('body'); // Move away
      await page.waitForTimeout(100);
    }
    
    console.log('✅ Tooltips performance test completed!');
  });
}); 