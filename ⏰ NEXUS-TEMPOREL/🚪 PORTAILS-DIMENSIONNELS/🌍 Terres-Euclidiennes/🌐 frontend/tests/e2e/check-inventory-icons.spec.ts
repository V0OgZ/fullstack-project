import { test, expect } from '@playwright/test';

test.describe('🎒 Check Inventory Icons - UI Analysis', () => {
  test('should verify inventory icons are visible in hero panel', async ({ page }) => {
    console.log('🎒 Starting inventory icons check...');
    
    // Aller directement à la page de jeu
    await page.goto('http://localhost:3000/game/conquest-classic');
    await page.waitForLoadState('networkidle');
    
    // Prendre un screenshot initial
    await page.screenshot({ path: 'test-results/inventory-check-initial.png', fullPage: true });
    
    // Vérifier que le header est présent
    const header = page.locator('.interface-header');
    await expect(header).toBeVisible();
    
    // Vérifier les boutons de contrôle
    const controlButtons = page.locator('.control-buttons');
    await expect(controlButtons).toBeVisible();
    
    // Vérifier que le bouton inventory est présent
    const inventoryButton = page.locator('button[title="Inventory"]');
    await expect(inventoryButton).toBeVisible();
    
    console.log('✅ Inventory button found');
    
    // Vérifier le bouton Epic Content
    const epicButton = page.locator('button[title="Epic Content - Heroes & Creatures"]');
    await expect(epicButton).toBeVisible();
    
    console.log('✅ Epic Content button found');
    
    // Cliquer sur le bouton Hero pour voir le panel héros
    const heroButton = page.locator('button[title="Hero Management"]');
    await heroButton.click();
    
    await page.waitForTimeout(1000);
    
    // Prendre un screenshot du panel héros
    await page.screenshot({ path: 'test-results/hero-panel-view.png', fullPage: true });
    
    // Vérifier que le panel héros est actif
    const heroPanel = page.locator('.right-panel');
    await expect(heroPanel).toBeVisible();
    
    // Vérifier le contenu du panel héros
    const heroPanelContent = page.locator('.panel-content');
    await expect(heroPanelContent).toBeVisible();
    
    console.log('✅ Hero panel is visible');
    
    // Cliquer sur le bouton Inventory
    await inventoryButton.click();
    await page.waitForTimeout(1000);
    
    // Prendre un screenshot du panel inventaire
    await page.screenshot({ path: 'test-results/inventory-panel-view.png', fullPage: true });
    
    // Vérifier que le panel inventaire est actif
    const inventoryPanel = page.locator('.right-panel');
    await expect(inventoryPanel).toBeVisible();
    
    console.log('✅ Inventory panel is visible');
    
    // Tester le bouton Epic Content
    await epicButton.click();
    await page.waitForTimeout(1000);
    
    // Prendre un screenshot de l'epic content
    await page.screenshot({ path: 'test-results/epic-content-view.png', fullPage: true });
    
    // Vérifier que l'epic content viewer est ouvert
    const epicViewer = page.locator('.epic-content-viewer');
    if (await epicViewer.isVisible()) {
      console.log('✅ Epic Content Viewer is visible');
    } else {
      console.log('⚠️ Epic Content Viewer might not be visible');
    }
    
    // Analyser les boutons de contrôle
    const analysisData = await page.evaluate(() => {
      const buttons = document.querySelectorAll('.control-btn');
      const buttonData = [];
      
      buttons.forEach((btn, index) => {
        const title = btn.getAttribute('title');
        const text = btn.textContent?.trim();
        const isActive = btn.classList.contains('active');
        
        buttonData.push({
          index,
          title,
          text,
          isActive,
          visible: btn.offsetParent !== null
        });
      });
      
      return {
        totalButtons: buttons.length,
        buttons: buttonData,
        headerVisible: document.querySelector('.interface-header') !== null,
        rightPanelVisible: document.querySelector('.right-panel') !== null,
        leftPanelVisible: document.querySelector('.left-panel') !== null
      };
    });
    
    console.log('🔍 UI Analysis:', JSON.stringify(analysisData, null, 2));
    
    // Vérifier que tous les boutons attendus sont présents
    expect(analysisData.buttons.length).toBeGreaterThanOrEqual(4);
    
    // Vérifier que les icônes sont présentes
    const expectedButtons = ['Scenario Info', 'Hero Management', 'Inventory', 'Castle Management'];
    for (const expectedTitle of expectedButtons) {
      const button = analysisData.buttons.find(b => b.title === expectedTitle);
      expect(button).toBeDefined();
      expect(button?.visible).toBe(true);
    }
    
    console.log('✅ All control buttons are present and visible');
    
    // Test final - vérifier que les icônes sont bien dans la barre du haut
    const headerButtonsCount = await page.locator('.interface-header .control-btn').count();
    console.log(`📊 Header buttons count: ${headerButtonsCount}`);
    
    expect(headerButtonsCount).toBeGreaterThanOrEqual(4);
    
    console.log('✅ Inventory icons check completed successfully');
  });
}); 