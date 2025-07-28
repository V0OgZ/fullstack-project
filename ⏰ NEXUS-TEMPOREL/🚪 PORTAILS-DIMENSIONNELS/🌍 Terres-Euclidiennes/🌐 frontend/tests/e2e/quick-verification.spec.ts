import { test, expect } from '@playwright/test';

test.describe('🚀 Vérification Rapide - Brouillard de Guerre + 2 Niveaux', () => {
  test('✅ Test complet du système', async ({ page }) => {
    console.log('🎬 === VÉRIFICATION RAPIDE ===');
    
    // Aller à la page
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3000);
    
    console.log('✅ Page chargée');
    
    // NOUVEAU: Capture d'écran initiale
    await page.screenshot({ 
      path: 'screenshots/01-interface-initial.png', 
      fullPage: true 
    });
    console.log('📸 Capture 1: Interface initiale sauvegardée');
    
    // Récupérer le contenu de la page
    const pageContent = await page.textContent('body');
    console.log('📄 Contenu de la page: ');
    console.log('    ' + pageContent?.substring(0, 500).replace(/\s+/g, ' '));
    
    // Vérifier les éléments UI
    const sidebar = page.locator('.right-sidebar');
    const sidebarExists = await sidebar.isVisible().catch(() => false);
    console.log(`🎯 Sidebar visible: ${sidebarExists}`);
    
    if (sidebarExists) {
      // Capture de la sidebar
      await sidebar.screenshot({ 
        path: 'screenshots/02-sidebar-detail.png' 
      });
      console.log('📸 Capture 2: Sidebar détaillée sauvegardée');
      
      // CORRECTION: D'abord capturer le panel Scenario avec le sélecteur terrain
      const scenarioButton = page.locator('button:has-text("🏔️")');
      if (await scenarioButton.isVisible().catch(() => false)) {
        await scenarioButton.click();
        await page.waitForTimeout(1500);
        
        // Vérifier le sélecteur de terrain dans le panel Scenario
        const terrainSelector = page.locator('.terrain-mode-selector');
        const terrainExists = await terrainSelector.isVisible().catch(() => false);
        console.log(`🗺️ Sélecteur terrain: ${terrainExists ? '✅ Visible' : '❌ Absent'}`);
        
        if (terrainExists) {
          // Capture spécifique du sélecteur de terrain
          await terrainSelector.screenshot({ 
            path: 'screenshots/02-terrain-selector-detail.png' 
          });
          console.log('📸 Capture 2b: Sélecteur terrain détaillé sauvegardé');
          
          // Test des boutons de terrain
          const pixiButton = page.locator('button:has-text("PIXI.js")');
          const canvasButton = page.locator('button:has-text("Canvas 2D")');
          
          if (await pixiButton.isVisible().catch(() => false)) {
            await pixiButton.click();
            await page.waitForTimeout(3000);
            await page.screenshot({ 
              path: 'screenshots/04-terrain-pixi.png', 
              fullPage: true 
            });
            console.log('📸 Capture 4: Mode PIXI.js sauvegardé');
            
            // Retour Canvas 2D
            if (await canvasButton.isVisible().catch(() => false)) {
              await canvasButton.click();
              await page.waitForTimeout(2000);
              await page.screenshot({ 
                path: 'screenshots/05-terrain-canvas.png', 
                fullPage: true 
              });
              console.log('📸 Capture 5: Mode Canvas 2D sauvegardé');
            }
          }
        }
        
        await page.screenshot({ 
          path: 'screenshots/03-panel-1-scenario.png', 
          fullPage: true 
        });
        console.log('📸 Capture 3.1: Panel Scenario (avec terrain) sauvegardé');
      }
      
      // Tester les autres boutons de panel
      const panels = [
        { emoji: '⚔️', name: 'Hero' },
        { emoji: '🏰', name: 'Castle' },
        { emoji: '🎒', name: 'Inventory' }
      ];
      
      for (let i = 0; i < panels.length; i++) {
        const button = page.locator(`button:has-text("${panels[i].emoji}")`);
        const buttonExists = await button.isVisible().catch(() => false);
        console.log(`${panels[i].name} (${panels[i].emoji}): ${buttonExists ? '✅ Visible' : '❌ Absent'}`);
        
        if (buttonExists) {
          await button.click();
          await page.waitForTimeout(1500);
          
          // DIAGNOSTIC: Vérifier le contenu HTML après click
          const sidebarContent = page.locator('.sidebar-content');
          const sidebarHTML = await sidebarContent.innerHTML().catch(() => 'Error getting HTML');
          console.log(`🔍 ${panels[i].name} Panel HTML content (first 300 chars):`);
          console.log(sidebarHTML.substring(0, 300));
          
          // Rechercher spécifiquement les Enhanced panels
          const hasEnhancedClass = sidebarHTML.includes('enhanced-');
          const hasEnhancedText = sidebarHTML.includes('Enhanced');
          console.log(`  Enhanced class detected: ${hasEnhancedClass}`);
          console.log(`  Enhanced text detected: ${hasEnhancedText}`);
          
          await page.screenshot({ 
            path: `screenshots/03-panel-${i+2}-${panels[i].name.toLowerCase()}.png`, 
            fullPage: true 
          });
          console.log(`📸 Capture 3.${i+2}: Panel ${panels[i].name} sauvegardé`);
        }
      }
    }
    
    // Analyse des éléments de jeu
    const gameElements = [
      { selector: '.turn-counter', name: 'Turn Counter' },
      { selector: '.resources', name: 'Resources' },
      { selector: '.game-info', name: 'Game Info' },
      { selector: 'canvas', name: 'Game Canvas' }
    ];
    
    console.log('\n📊 === ANALYSE ÉLÉMENTS UI ===');
    for (const element of gameElements) {
      const exists = await page.locator(element.selector).isVisible().catch(() => false);
      console.log(`${element.name}: ${exists ? '✅ Présent' : '❌ Absent'}`);
    }
    
    // Comptage des éléments
    const buttonCount = await page.locator('button').count();
    const canvasCount = await page.locator('canvas').count();
    console.log(`🔢 Boutons détectés: ${buttonCount}`);
    console.log(`🖼️ Canvas détectés: ${canvasCount}`);
    
    // Capture finale avec highlighting pour debug
    await page.addStyleTag({
      content: `
        .sidebar-tab { border: 3px solid red !important; }
        button { background: rgba(255,255,0,0.3) !important; }
        canvas { border: 3px solid green !important; }
        .right-sidebar { border: 3px solid blue !important; }
        .terrain-mode-selector { border: 3px solid magenta !important; }
      `
    });
    
    await page.screenshot({ 
      path: 'screenshots/99-debug-highlighted.png', 
      fullPage: true 
    });
    console.log('📸 Capture finale: Debug avec éléments surlignés');
    
    // Vérifier les boutons de scénario (ancienne logique conservée)
    const scenarioButtons = page.locator('[data-testid*="scenario-card"]');
    const scenarioCount = await scenarioButtons.count();
    console.log(`🎮 Boutons de scénario trouvés: ${scenarioCount}`);
    
    if (scenarioCount === 0) {
      console.log('⚠️ Aucun bouton de scénario trouvé');
    }
    
    console.log('\n🎯 === RÉSUMÉ CAPTURES ===');
    console.log('📸 Toutes les captures sauvegardées dans frontend/screenshots/');
    console.log('🎮 Interface complète analysée et documentée');
    console.log('🎬 === FIN VÉRIFICATION RAPIDE ===');
  });
}); 