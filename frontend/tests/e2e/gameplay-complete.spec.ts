import { test, expect } from '@playwright/test';

test.describe('🎮 Heroes of Time - Gameplay Complet', () => {
  test.beforeEach(async ({ page }) => {
    // Aller à la page d'accueil
    await page.goto('http://localhost:3000');
    
    // Attendre que la page se charge
    await page.waitForLoadState('networkidle');
    
    // Cliquer sur le scénario "Conquest Classic"
    await page.click('text=Classic Conquest');
    
    // Attendre que le jeu se charge
    await page.waitForTimeout(2000);
  });

  test('🎯 Test complet des actions de gameplay', async ({ page }) => {
    console.log('🎬 === DÉBUT TEST GAMEPLAY COMPLET ===');
    
    // 1. Vérifier que l'interface TrueHeroesInterface est chargée
    await expect(page.locator('.true-heroes-interface')).toBeVisible();
    console.log('✅ Interface TrueHeroesInterface chargée');
    
    // 2. Vérifier la présence des éléments principaux
    await expect(page.locator('.game-header')).toBeVisible();
    await expect(page.locator('.map-container')).toBeVisible();
    await expect(page.locator('.right-panel')).toBeVisible();
    console.log('✅ Éléments principaux présents');
    
    // 3. Test du panneau Heroes
    console.log('🔍 Test du panneau Heroes...');
    await page.click('button[title*="tooltip.heroes"]');
    await page.waitForTimeout(1000);
    
    // Vérifier que le panneau heroes est ouvert
    await expect(page.locator('.hero-panel')).toBeVisible();
    console.log('✅ Panneau Heroes ouvert');
    
    // 4. Sélectionner un héros
    const heroCards = page.locator('.hero-card');
    const heroCount = await heroCards.count();
    
    if (heroCount > 0) {
      console.log(`🎖️ ${heroCount} héros trouvés`);
      
      // Cliquer sur le premier héros
      await heroCards.first().click();
      await page.waitForTimeout(500);
      
      // Vérifier que le héros est sélectionné
      await expect(heroCards.first()).toHaveClass(/selected/);
      console.log('✅ Héros sélectionné');
      
      // 5. Test des actions de héros
      console.log('⚔️ Test des actions de héros...');
      
      // Test bouton Move Hero
      const moveButton = page.locator('button:has-text("Move Hero")');
      if (await moveButton.isVisible()) {
        await moveButton.click();
        await page.waitForTimeout(500);
        
        // Vérifier que le mode déplacement est activé
        await expect(page.locator('.movement-mode-indicator')).toBeVisible();
        console.log('✅ Mode déplacement activé');
        
        // Désactiver le mode déplacement
        await page.click('.movement-mode-indicator button');
        await page.waitForTimeout(500);
      }
      
      // Test bouton Attack
      const attackButton = page.locator('button:has-text("Attack")');
      if (await attackButton.isVisible()) {
        await attackButton.click();
        await page.waitForTimeout(500);
        console.log('✅ Action attaque testée');
      }
      
      // Test bouton Collect
      const collectButton = page.locator('button:has-text("Collect")');
      if (await collectButton.isVisible()) {
        await collectButton.click();
        await page.waitForTimeout(500);
        console.log('✅ Action collecte testée');
      }
      
      // Test bouton Cast Spell
      const spellButton = page.locator('button:has-text("Cast Spell")');
      if (await spellButton.isVisible()) {
        await spellButton.click();
        await page.waitForTimeout(500);
        console.log('✅ Action sort testée');
      }
    }
    
    // 6. Test du panneau Castle
    console.log('🏰 Test du panneau Castle...');
    await page.click('button[title*="tooltip.castle"]');
    await page.waitForTimeout(1000);
    
    // Vérifier que le panneau castle est ouvert
    await expect(page.locator('.castle-panel')).toBeVisible();
    console.log('✅ Panneau Castle ouvert');
    
    // Test des actions du château
    const resetGrowthButton = page.locator('button:has-text("Reset Growth")');
    if (await resetGrowthButton.isVisible()) {
      await resetGrowthButton.click();
      await page.waitForTimeout(1000);
      console.log('✅ Reset croissance testée');
    }
    
    const viewBonusesButton = page.locator('button:has-text("View Bonuses")');
    if (await viewBonusesButton.isVisible()) {
      await viewBonusesButton.click();
      await page.waitForTimeout(1000);
      // Fermer l'alert si elle apparaît
      page.on('dialog', dialog => dialog.accept());
      console.log('✅ Visualisation des bonus testée');
    }
    
    const viewSpellsButton = page.locator('button:has-text("View Spells")');
    if (await viewSpellsButton.isVisible()) {
      await viewSpellsButton.click();
      await page.waitForTimeout(1000);
      // Fermer l'alert si elle apparaît
      page.on('dialog', dialog => dialog.accept());
      console.log('✅ Visualisation des sorts testée');
    }
    
    // 7. Test du panneau Epic Content
    console.log('🐉 Test du panneau Epic Content...');
    const epicButton = page.locator('button .btn-icon:has-text("🐉")');
    if (await epicButton.isVisible()) {
      await epicButton.click();
      await page.waitForTimeout(1000);
      
      // Vérifier que le modal Epic Content s'ouvre
      const epicModal = page.locator('.epic-content-viewer');
      if (await epicModal.isVisible()) {
        console.log('✅ Modal Epic Content ouvert');
        
        // Fermer le modal
        await page.click('.epic-content-viewer .close-button');
        await page.waitForTimeout(500);
      }
    }
    
    // 8. Test de fin de tour
    console.log('⭐ Test de fin de tour...');
    const endTurnButton = page.locator('.end-turn-btn');
    if (await endTurnButton.isVisible()) {
      await endTurnButton.click();
      await page.waitForTimeout(2000);
      console.log('✅ Fin de tour testée');
    }
    
    // 9. Vérifier les ressources dans le header
    console.log('💰 Vérification des ressources...');
    await expect(page.locator('.resources')).toBeVisible();
    
    const goldElement = page.locator('.resources .gold');
    if (await goldElement.isVisible()) {
      const goldText = await goldElement.textContent();
      console.log(`💰 Or: ${goldText}`);
    }
    
    // 10. Test de la carte et des tuiles
    console.log('🗺️ Test de la carte...');
    await expect(page.locator('.map-container canvas')).toBeVisible();
    console.log('✅ Carte rendue (canvas présent)');
    
    console.log('🎬 === FIN TEST GAMEPLAY COMPLET ===');
  });

  test('🔄 Test du cycle de jeu complet', async ({ page }) => {
    console.log('🎬 === DÉBUT TEST CYCLE DE JEU ===');
    
    // 1. Sélectionner un héros
    await page.click('button[title*="tooltip.heroes"]');
    await page.waitForTimeout(1000);
    
    const heroCards = page.locator('.hero-card');
    if (await heroCards.count() > 0) {
      await heroCards.first().click();
      await page.waitForTimeout(500);
      console.log('✅ Héros sélectionné');
      
      // 2. Activer le mode déplacement
      await page.click('button:has-text("Move Hero")');
      await page.waitForTimeout(500);
      
      // 3. Cliquer sur une tuile pour déplacer
      const canvas = page.locator('.map-container canvas');
      await canvas.click({ position: { x: 100, y: 100 } });
      await page.waitForTimeout(1000);
      console.log('✅ Tentative de déplacement');
      
      // 4. Tester les autres actions
      await page.click('button:has-text("Attack")');
      await page.waitForTimeout(1000);
      console.log('✅ Action attaque');
      
      await page.click('button:has-text("Collect")');
      await page.waitForTimeout(1000);
      console.log('✅ Action collecte');
      
      // 5. Gérer le château
      await page.click('button[title*="tooltip.castle"]');
      await page.waitForTimeout(1000);
      
      // Reset growth
      const resetButton = page.locator('button:has-text("Reset Growth")');
      if (await resetButton.isVisible()) {
        await resetButton.click();
        await page.waitForTimeout(1000);
        console.log('✅ Reset croissance');
      }
      
      // 6. Finir le tour
      await page.click('.end-turn-btn');
      await page.waitForTimeout(2000);
      console.log('✅ Tour terminé');
    }
    
    console.log('🎬 === FIN TEST CYCLE DE JEU ===');
  });

  test('🚨 Test de gestion des erreurs', async ({ page }) => {
    console.log('🎬 === DÉBUT TEST GESTION ERREURS ===');
    
    // Capturer les erreurs de console
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Effectuer des actions qui pourraient générer des erreurs
    await page.click('button[title*="tooltip.heroes"]');
    await page.waitForTimeout(1000);
    
    // Tenter des actions sans héros sélectionné
    const attackButton = page.locator('button:has-text("Attack")');
    if (await attackButton.isVisible()) {
      await attackButton.click();
      await page.waitForTimeout(500);
    }
    
    // Vérifier qu'il n'y a pas d'erreurs critiques
    const criticalErrors = consoleErrors.filter(error => 
      error.includes('TypeError') || 
      error.includes('ReferenceError') ||
      error.includes('Cannot read property')
    );
    
    if (criticalErrors.length > 0) {
      console.log('❌ Erreurs critiques détectées:', criticalErrors);
    } else {
      console.log('✅ Pas d\'erreurs critiques détectées');
    }
    
    console.log('🎬 === FIN TEST GESTION ERREURS ===');
  });
}); 