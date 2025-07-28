// 🎮 Test Enhanced Sidebar with Real Assets
// ==========================================

import { test, expect } from '@playwright/test';

test.describe('Enhanced Sidebar with Real Assets', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.true-heroes-interface', { timeout: 10000 });
  });

  test('should display enhanced sidebar with resource info', async ({ page }) => {
    // Check if sidebar is present
    const sidebar = await page.locator('.right-sidebar');
    await expect(sidebar).toBeVisible();
    
    // Check sidebar header with game info
    const gameInfo = await page.locator('.game-info');
    await expect(gameInfo).toBeVisible();
    
    // Check turn info
    const turnInfo = await page.locator('.turn-info');
    await expect(turnInfo).toBeVisible();
    const turnText = await turnInfo.textContent();
    expect(turnText).toMatch(/🎯 Turn: \d+\/\d+/);
    
    // Check player resources
    const resources = await page.locator('.player-resources');
    await expect(resources).toBeVisible();
    
    const goldResource = await page.locator('.resource:has-text("💰")');
    await expect(goldResource).toBeVisible();
    
    const woodResource = await page.locator('.resource:has-text("🪵")');
    await expect(woodResource).toBeVisible();
    
    const stoneResource = await page.locator('.resource:has-text("🪨")');
    await expect(stoneResource).toBeVisible();
    
    console.log('✅ Enhanced sidebar header working');
  });

  test('should display enhanced hero panel with real images', async ({ page }) => {
    // Click hero button
    await page.click('button .btn-icon:has-text("⚔️")');
    
    // Wait for hero panel to load
    await page.waitForSelector('.enhanced-hero-panel', { timeout: 3000 });
    
    const heroPanel = await page.locator('.enhanced-hero-panel');
    await expect(heroPanel).toBeVisible();
    
    // Check panel header
    const panelHeader = await page.locator('.enhanced-hero-panel .panel-header h3');
    await expect(panelHeader).toContainText('Heroes Management');
    
    // Check hero count
    const heroCount = await page.locator('.hero-count');
    await expect(heroCount).toBeVisible();
    
    // Check for heroes grid
    const heroesGrid = await page.locator('.heroes-grid');
    await expect(heroesGrid).toBeVisible();
    
    // Check if there are hero cards
    const heroCards = await page.locator('.hero-card');
    const heroCardCount = await heroCards.count();
    
    if (heroCardCount > 0) {
      // Check first hero card structure
      const firstHero = heroCards.first();
      await expect(firstHero).toBeVisible();
      
      // Check hero portrait
      const heroPortrait = await firstHero.locator('.hero-portrait');
      await expect(heroPortrait).toBeVisible();
      
      // Check hero info
      const heroInfo = await firstHero.locator('.hero-info');
      await expect(heroInfo).toBeVisible();
      
      const heroName = await heroInfo.locator('.hero-name');
      await expect(heroName).toBeVisible();
      
      const heroLevel = await heroInfo.locator('.hero-level');
      await expect(heroLevel).toBeVisible();
      
      const heroClass = await heroInfo.locator('.hero-class');
      await expect(heroClass).toBeVisible();
      
      // Click on hero to select
      await firstHero.click();
      
      // Check if hero actions appear
      const heroActions = await page.locator('.hero-actions');
      await expect(heroActions).toBeVisible();
      
      // Check action buttons
      const moveBtn = await heroActions.locator('.action-btn:has-text("🚶")');
      await expect(moveBtn).toBeVisible();
      
      const attackBtn = await heroActions.locator('.action-btn:has-text("⚔️")');
      await expect(attackBtn).toBeVisible();
      
      const castBtn = await heroActions.locator('.action-btn:has-text("🔮")');
      await expect(castBtn).toBeVisible();
      
      const collectBtn = await heroActions.locator('.action-btn:has-text("💎")');
      await expect(collectBtn).toBeVisible();
      
      console.log('✅ Enhanced hero panel working');
    }
    
    // Screenshot
    await page.screenshot({ path: 'screenshots/enhanced-hero-panel.png', fullPage: true });
  });

  test('should display enhanced castle panel with real assets', async ({ page }) => {
    // Click castle button
    await page.click('button .btn-icon:has-text("🏰")');
    
    // Wait for castle panel to load
    await page.waitForSelector('.enhanced-castle-panel', { timeout: 3000 });
    
    const castlePanel = await page.locator('.enhanced-castle-panel');
    await expect(castlePanel).toBeVisible();
    
    // Check panel header
    const panelHeader = await page.locator('.enhanced-castle-panel .panel-header h3');
    await expect(panelHeader).toContainText('Castle Management');
    
    // Check castle level
    const castleLevel = await page.locator('.castle-level');
    await expect(castleLevel).toBeVisible();
    
    // Check castle tabs
    const castleTabs = await page.locator('.castle-tabs');
    await expect(castleTabs).toBeVisible();
    
    const overviewTab = await castleTabs.locator('.tab:has-text("📊 Overview")');
    await expect(overviewTab).toBeVisible();
    
    const creaturesTab = await castleTabs.locator('.tab:has-text("🐉 Creatures")');
    await expect(creaturesTab).toBeVisible();
    
    const buildingsTab = await castleTabs.locator('.tab:has-text("🏗️ Buildings")');
    await expect(buildingsTab).toBeVisible();
    
    // Test creatures tab
    await creaturesTab.click();
    await page.waitForTimeout(1000);
    
    const creaturesSection = await page.locator('.creatures-section');
    await expect(creaturesSection).toBeVisible();
    
    const creaturesGrid = await page.locator('.creatures-grid');
    await expect(creaturesGrid).toBeVisible();
    
    // Check for creature cards
    const creatureCards = await page.locator('.creature-card');
    const creatureCount = await creatureCards.count();
    
    if (creatureCount > 0) {
      const firstCreature = creatureCards.first();
      await expect(firstCreature).toBeVisible();
      
      const creatureImage = await firstCreature.locator('.creature-image');
      await expect(creatureImage).toBeVisible();
      
      const creatureName = await firstCreature.locator('.creature-name');
      await expect(creatureName).toBeVisible();
      
      const recruitBtn = await firstCreature.locator('.recruit-btn');
      await expect(recruitBtn).toBeVisible();
    }
    
    // Test buildings tab
    await buildingsTab.click();
    await page.waitForTimeout(1000);
    
    const buildingsSection = await page.locator('.buildings-section');
    await expect(buildingsSection).toBeVisible();
    
    const buildingsGrid = await page.locator('.buildings-grid');
    await expect(buildingsGrid).toBeVisible();
    
    // Check for building cards
    const buildingCards = await page.locator('.building-card');
    const buildingCount = await buildingCards.count();
    
    if (buildingCount > 0) {
      const firstBuilding = buildingCards.first();
      await expect(firstBuilding).toBeVisible();
      
      const buildingImage = await firstBuilding.locator('.building-image');
      await expect(buildingImage).toBeVisible();
      
      const buildingName = await firstBuilding.locator('.building-name');
      await expect(buildingName).toBeVisible();
      
      const buildBtn = await firstBuilding.locator('.build-btn');
      await expect(buildBtn).toBeVisible();
    }
    
    console.log('✅ Enhanced castle panel working');
    
    // Screenshot
    await page.screenshot({ path: 'screenshots/enhanced-castle-panel.png', fullPage: true });
  });

  test('should display enhanced inventory panel', async ({ page }) => {
    // Click inventory button
    await page.click('button .btn-icon:has-text("🎒")');
    
    // Wait for inventory panel to load
    await page.waitForSelector('.enhanced-inventory-panel', { timeout: 3000 });
    
    const inventoryPanel = await page.locator('.enhanced-inventory-panel');
    await expect(inventoryPanel).toBeVisible();
    
    // Check panel header
    const panelHeader = await page.locator('.enhanced-inventory-panel .panel-header h3');
    await expect(panelHeader).toContainText('Inventory');
    
    // Check inventory count
    const inventoryCount = await page.locator('.inventory-count');
    await expect(inventoryCount).toBeVisible();
    
    // Check if no hero selected message or content
    const noHeroSelected = await page.locator('.no-hero-selected');
    const inventoryContent = await page.locator('.inventory-content');
    
    // Either no hero message or inventory content should be visible
    const hasNoHero = await noHeroSelected.isVisible();
    const hasContent = await inventoryContent.isVisible();
    
    expect(hasNoHero || hasContent).toBeTruthy();
    
    if (hasContent) {
      // Check equipment slots
      const equipmentSlots = await page.locator('.equipment-slots');
      await expect(equipmentSlots).toBeVisible();
      
      // Check items grid
      const itemsGrid = await page.locator('.items-grid');
      await expect(itemsGrid).toBeVisible();
      
      // Check for item cards
      const itemCards = await page.locator('.item-card');
      const itemCount = await itemCards.count();
      
      if (itemCount > 0) {
        const firstItem = itemCards.first();
        await expect(firstItem).toBeVisible();
        
        const itemImage = await firstItem.locator('.item-image');
        await expect(itemImage).toBeVisible();
        
        const itemName = await firstItem.locator('.item-name');
        await expect(itemName).toBeVisible();
        
        const itemRarity = await firstItem.locator('.item-rarity');
        await expect(itemRarity).toBeVisible();
      }
    }
    
    console.log('✅ Enhanced inventory panel working');
    
    // Screenshot
    await page.screenshot({ path: 'screenshots/enhanced-inventory-panel.png', fullPage: true });
  });

  test('should switch between different panels smoothly', async ({ page }) => {
    // Test panel switching
    const panelButtons = [
      { icon: '⚔️', panel: '.enhanced-hero-panel' },
      { icon: '🏰', panel: '.enhanced-castle-panel' },
      { icon: '🎒', panel: '.enhanced-inventory-panel' }
    ];
    
    for (const button of panelButtons) {
      await page.click(`button .btn-icon:has-text("${button.icon}")`);
      await page.waitForTimeout(500);
      
      const panel = await page.locator(button.panel);
      await expect(panel).toBeVisible();
      
      // Check that button is active
      const activeBtn = await page.locator(`button:has(.btn-icon:has-text("${button.icon}")).active`);
      await expect(activeBtn).toBeVisible();
    }
    
    console.log('✅ Panel switching working');
  });

  test('should display and work with Epic Content Viewer', async ({ page }) => {
    // Click Epic Content button
    await page.click('button .btn-icon:has-text("🐉")');
    
    // Wait for Epic Content Viewer modal
    await page.waitForSelector('div:has-text("🎮 CONTENU ÉPIQUE")', { timeout: 5000 });
    
    const epicModal = await page.locator('[style*="position: fixed"]');
    await expect(epicModal).toBeVisible();
    
    // Check server status
    const serverStatus = await page.locator('div:has-text("Backend")');
    await expect(serverStatus).toBeVisible();
    
    // Check tabs
    const creaturesTab = await page.locator('button:has-text("🐉 Créatures")');
    await expect(creaturesTab).toBeVisible();
    
    const heroesTab = await page.locator('button:has-text("🦸 Héros")');
    await expect(heroesTab).toBeVisible();
    
    const buildingsTab = await page.locator('button:has-text("🏰 Bâtiments")');
    await expect(buildingsTab).toBeVisible();
    
    // Click buildings tab to test our new buildings
    await buildingsTab.click();
    await page.waitForTimeout(1000);
    
    const buildingHeader = await page.locator('h3:has-text("🏰 BÂTIMENTS ÉPIQUES")');
    await expect(buildingHeader).toBeVisible();
    
    // Close modal
    await page.click('button:has-text("✕ Fermer")');
    await expect(epicModal).not.toBeVisible();
    
    console.log('✅ Epic Content Viewer working');
  });

  test('should display game info and resources correctly', async ({ page }) => {
    // Check game info section
    const gameInfo = await page.locator('.game-info');
    await expect(gameInfo).toBeVisible();
    
    // Check turn info format
    const turnInfo = await page.locator('.turn-info');
    const turnText = await turnInfo.textContent();
    expect(turnText).toMatch(/🎯 Turn: \d+\/\d+/);
    
    // Check all resources are displayed
    const goldResource = await page.locator('.resource:has-text("💰")');
    const woodResource = await page.locator('.resource:has-text("🪵")');
    const stoneResource = await page.locator('.resource:has-text("🪨")');
    
    await expect(goldResource).toBeVisible();
    await expect(woodResource).toBeVisible();
    await expect(stoneResource).toBeVisible();
    
    // Check resource values are numbers
    const goldText = await goldResource.textContent();
    const woodText = await woodResource.textContent();
    const stoneText = await stoneResource.textContent();
    
    expect(goldText).toMatch(/💰 \d+/);
    expect(woodText).toMatch(/🪵 \d+/);
    expect(stoneText).toMatch(/🪨 \d+/);
    
    console.log('✅ Game info and resources working');
  });
}); 