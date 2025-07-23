import { test, expect } from '@playwright/test';

test.describe('🎯 UI Screenshot Analysis', () => {
  test('📸 Capture complete UI state and components', async ({ page }) => {
    console.log('🎬 === DÉBUT ANALYSE UI AVEC CAPTURES ===');
    
    // 1. Aller à la page d'accueil
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3000);
    
    // 2. Capture d'écran de l'état initial
    await page.screenshot({ 
      path: 'test-results/ui-analysis-01-initial-state.png', 
      fullPage: true 
    });
    console.log('✅ Capture 1: État initial sauvegardée');
    
    // 3. Vérifier les éléments principaux
    const gameHeader = page.locator('.game-header');
    const sidebar = page.locator('.right-sidebar');
    const gameCanvas = page.locator('canvas');
    
    // 4. Capturer l'état des éléments principaux
    const headerExists = await gameHeader.isVisible().catch(() => false);
    const sidebarExists = await sidebar.isVisible().catch(() => false);
    const canvasExists = await gameCanvas.isVisible().catch(() => false);
    
    console.log(`🎮 Game Header: ${headerExists ? '✅ Visible' : '❌ Absent'}`);
    console.log(`🎯 Sidebar: ${sidebarExists ? '✅ Visible' : '❌ Absent'}`);
    console.log(`🖼️ Canvas: ${canvasExists ? '✅ Visible' : '❌ Absent'}`);
    
    // 5. Tester les boutons de sidebar
    const sidebarButtons = [
      { selector: 'button[title="Scenario"]', name: 'Scenario (🏔️)' },
      { selector: 'button[title="Hero"]', name: 'Hero (⚔️)' },
      { selector: 'button[title="Castle"]', name: 'Castle (🏰)' },
      { selector: 'button[title="Inventory"]', name: 'Inventory (🎒)' }
    ];
    
    for (const button of sidebarButtons) {
      const buttonElement = page.locator(button.selector);
      const isVisible = await buttonElement.isVisible().catch(() => false);
      console.log(`${button.name}: ${isVisible ? '✅ Visible' : '❌ Absent'}`);
      
      if (isVisible) {
        // Cliquer sur le bouton et capturer l'état
        await buttonElement.click();
        await page.waitForTimeout(1000);
        
        const panelName = button.name.split(' ')[0].toLowerCase();
        await page.screenshot({ 
          path: `test-results/ui-analysis-02-${panelName}-panel.png`, 
          fullPage: true 
        });
        console.log(`✅ Capture ${panelName}: Panel sauvegardé`);
      }
    }
    
    // 6. Tester le sélecteur de terrain
    const terrainSelector = page.locator('.terrain-mode-selector');
    if (await terrainSelector.isVisible().catch(() => false)) {
      await page.screenshot({ 
        path: 'test-results/ui-analysis-03-terrain-selector.png', 
        fullPage: false,
        clip: { x: 0, y: 0, width: 400, height: 600 }
      });
      console.log('✅ Capture 3: Sélecteur terrain sauvegardé');
      
      // Tester le switch PIXI.js
      const pixiButton = page.locator('button:has-text("PIXI.js")');
      if (await pixiButton.isVisible().catch(() => false)) {
        await pixiButton.click();
        await page.waitForTimeout(2000);
        await page.screenshot({ 
          path: 'test-results/ui-analysis-04-pixi-mode.png', 
          fullPage: true 
        });
        console.log('✅ Capture 4: Mode PIXI.js sauvegardé');
      }
    }
    
    // 7. Tester les éléments de jeu
    const gameElements = [
      { selector: '.turn-counter', name: 'Turn Counter' },
      { selector: '.resources', name: 'Resources' },
      { selector: '.scenario-info', name: 'Scenario Info' },
      { selector: '.game-info', name: 'Game Info' }
    ];
    
    for (const element of gameElements) {
      const elementExists = await page.locator(element.selector).isVisible().catch(() => false);
      console.log(`${element.name}: ${elementExists ? '✅ Visible' : '❌ Absent'}`);
    }
    
    // 8. Capture finale de l'état complet
    await page.screenshot({ 
      path: 'test-results/ui-analysis-99-final-state.png', 
      fullPage: true 
    });
    console.log('✅ Capture finale: État complet sauvegardé');
    
    // 9. Résumé des résultats
    console.log('\n🎯 === RÉSUMÉ ANALYSE UI ===');
    console.log(`📄 Page chargée: ✅`);
    console.log(`🎮 Game Header: ${headerExists ? '✅' : '❌'}`);
    console.log(`🎯 Sidebar: ${sidebarExists ? '✅' : '❌'}`);
    console.log(`🖼️ Canvas: ${canvasExists ? '✅' : '❌'}`);
    console.log('📸 Captures sauvegardées dans test-results/');
    console.log('🎬 === FIN ANALYSE UI ===');
  });
  
  test('🔍 Debug UI Elements and Structure', async ({ page }) => {
    console.log('🔍 === DÉBUT DEBUG STRUCTURE UI ===');
    
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3000);
    
    // Analyser la structure DOM
    const bodyContent = await page.locator('body').innerHTML();
    console.log('📋 Structure DOM présente:');
    
    // Rechercher les éléments clés
    const keyElements = [
      'game-header',
      'right-sidebar', 
      'sidebar-tab',
      'control-btn',
      'game-canvas',
      'terrain-mode-selector',
      'sidebar-content'
    ];
    
    for (const elementClass of keyElements) {
      const hasElement = bodyContent.includes(elementClass);
      console.log(`${elementClass}: ${hasElement ? '✅ Présent' : '❌ Absent'}`);
    }
    
    // Compter les éléments
    const buttonCount = await page.locator('button').count();
    const divCount = await page.locator('div').count();
    const canvasCount = await page.locator('canvas').count();
    
    console.log(`🔢 Comptage éléments:`);
    console.log(`  Boutons: ${buttonCount}`);
    console.log(`  Divs: ${divCount}`);
    console.log(`  Canvas: ${canvasCount}`);
    
    // Capture de debug avec les éléments surlignés
    await page.addStyleTag({
      content: `
        button { border: 2px solid red !important; }
        .sidebar-tab { background: yellow !important; }
        canvas { border: 3px solid blue !important; }
        .game-header { background: green !important; }
      `
    });
    
    await page.screenshot({ 
      path: 'test-results/ui-debug-highlighted-elements.png', 
      fullPage: true 
    });
    console.log('✅ Capture debug avec éléments surlignés sauvegardée');
    
    console.log('🔍 === FIN DEBUG STRUCTURE UI ===');
  });
}); 