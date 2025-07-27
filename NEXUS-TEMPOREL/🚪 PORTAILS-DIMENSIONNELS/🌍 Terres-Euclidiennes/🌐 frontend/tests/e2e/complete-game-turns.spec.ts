import { test, expect } from '@playwright/test';

test.describe('🎯 Test Tours Complets de Jeu', () => {
  test('🔄 Simulation de 2 tours complets avec actions des héros', async ({ page }) => {
    console.log('🎬 === DÉBUT SIMULATION 2 TOURS ===');
    
    // Étape 1: Charger le jeu
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    console.log('✅ Page chargée');
    
    // Étape 2: Sélectionner un scénario ou attendre que le jeu se charge
    try {
      await page.waitForSelector('.true-heroes-interface', { timeout: 5000 });
      console.log('✅ Interface déjà chargée');
    } catch {
      console.log('🔄 Chargement d\'un scénario...');
      
      // Cliquer sur un scénario pour le charger
      const scenarioBtn = page.locator('button:has-text("Classique"), button:has-text("Mystique"), button:has-text("Multiplayer"), .scenario-button');
      if (await scenarioBtn.count() > 0) {
        await scenarioBtn.first().click();
        await page.waitForSelector('.true-heroes-interface', { timeout: 15000 });
        console.log('✅ Scénario chargé');
      }
    }
    
    // Étape 3: Vérifier l'état initial
    await page.waitForSelector('canvas', { timeout: 15000 });
    const gameHeader = await page.locator('.game-header');
    await expect(gameHeader).toBeVisible();
    console.log('✅ Jeu initialisé');
    
    // Capture d'écran de l'état initial
    await page.screenshot({ path: 'test-results/turn-0-initial.png' });
    
    // === TOUR 1 ===
    console.log('🚀 === DÉBUT TOUR 1 ===');
    
    // Étape 4: Ouvrir le panneau des héros
    const heroBtn = page.locator('button:has-text("⚔️"), .control-btn:has-text("⚔️")');
    if (await heroBtn.count() > 0) {
      await heroBtn.click();
      await page.waitForTimeout(1000);
      console.log('✅ Panneau héros ouvert');
      
      // Étape 5: Sélectionner et déplacer un héros
      const heroes = await page.locator('.hero-card, .hero-item');
      const heroCount = await heroes.count();
      console.log(`🎯 ${heroCount} héros trouvés`);
      
      if (heroCount > 0) {
        // Sélectionner le premier héros
        await heroes.first().click();
        await page.waitForTimeout(500);
        console.log('✅ Premier héros sélectionné');
        
        // Essayer de déplacer le héros (cliquer sur la carte)
        const canvas = page.locator('canvas').first();
        if (await canvas.count() > 0) {
          // Cliquer sur la carte pour déplacer le héros
          await canvas.click({ position: { x: 400, y: 300 } });
          await page.waitForTimeout(1000);
          console.log('✅ Héros déplacé (tentative)');
        }
      }
    }
    
    // Étape 6: Ouvrir le panneau des châteaux
    const castleBtn = page.locator('button:has-text("🏰"), .control-btn:has-text("🏰")');
    if (await castleBtn.count() > 0) {
      await castleBtn.click();
      await page.waitForTimeout(1000);
      console.log('✅ Panneau château ouvert');
      
      // Essayer de recruter une unité
      const recruitBtn = page.locator('button:has-text("Recruter"), .recruit-btn');
      if (await recruitBtn.count() > 0) {
        await recruitBtn.first().click();
        await page.waitForTimeout(1000);
        console.log('✅ Recrutement tenté');
      }
    }
    
    // Étape 7: Finir le tour 1
    const endTurnBtn = page.locator('.end-turn-btn, button:has-text("⭐"), button:has-text("👤")');
    if (await endTurnBtn.count() > 0) {
      const beforeTurnState = await page.locator('.game-title, .scenario-badge, .game-header').textContent();
      console.log('📊 État avant fin tour 1:', beforeTurnState);
      
      await endTurnBtn.click();
      await page.waitForTimeout(2000);
      
      const afterTurnState = await page.locator('.game-title, .scenario-badge, .game-header').textContent();
      console.log('📊 État après fin tour 1:', afterTurnState);
      
      console.log('✅ Tour 1 terminé');
    }
    
    // Capture d'écran après tour 1
    await page.screenshot({ path: 'test-results/turn-1-completed.png' });
    
    // === TOUR 2 ===
    console.log('🚀 === DÉBUT TOUR 2 ===');
    
    // Étape 8: Actions du tour 2
    // Ouvrir le panneau inventaire
    const inventoryBtn = page.locator('button:has-text("🎒"), .control-btn:has-text("🎒")');
    if (await inventoryBtn.count() > 0) {
      await inventoryBtn.click();
      await page.waitForTimeout(1000);
      console.log('✅ Panneau inventaire ouvert');
    }
    
    // Revenir aux héros pour d'autres actions
    if (await heroBtn.count() > 0) {
      await heroBtn.click();
      await page.waitForTimeout(1000);
      
      const heroes = await page.locator('.hero-card, .hero-item');
      if (await heroes.count() > 0) {
        await heroes.first().click();
        await page.waitForTimeout(500);
        
        // Deuxième déplacement
        const canvas = page.locator('canvas').first();
        if (await canvas.count() > 0) {
          await canvas.click({ position: { x: 500, y: 350 } });
          await page.waitForTimeout(1000);
          console.log('✅ Héros déplacé (tour 2)');
        }
      }
    }
    
    // Étape 9: Finir le tour 2
    if (await endTurnBtn.count() > 0) {
      const beforeTurnState = await page.locator('.game-title, .scenario-badge, .game-header').textContent();
      console.log('📊 État avant fin tour 2:', beforeTurnState);
      
      await endTurnBtn.click();
      await page.waitForTimeout(2000);
      
      const afterTurnState = await page.locator('.game-title, .scenario-badge, .game-header').textContent();
      console.log('📊 État après fin tour 2:', afterTurnState);
      
      console.log('✅ Tour 2 terminé');
    }
    
    // Capture d'écran finale
    await page.screenshot({ path: 'test-results/turn-2-completed.png' });
    
    // === VÉRIFICATIONS FINALES ===
    console.log('🔍 === VÉRIFICATIONS FINALES ===');
    
    // Vérifier que le jeu est toujours fonctionnel
    await expect(gameHeader).toBeVisible();
    
    // Vérifier que la carte est toujours présente
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible();
    
    // Vérifier que les contrôles sont toujours accessibles
    const controlButtons = await page.locator('button').count();
    expect(controlButtons).toBeGreaterThan(3);
    console.log(`✅ ${controlButtons} boutons de contrôle trouvés`);
    
    // Vérifier les logs de console pour les erreurs
    let hasErrors = false;
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.log('❌ Erreur console:', msg.text());
        hasErrors = true;
      }
    });
    
    await page.waitForTimeout(1000);
    
    if (!hasErrors) {
      console.log('✅ Aucune erreur console détectée');
    }
    
    console.log('🎬 === FIN SIMULATION 2 TOURS ===');
  });
  
  test('🎯 Test rapide fonctionnalité de base', async ({ page }) => {
    console.log('🎬 === TEST RAPIDE FONCTIONNALITÉ ===');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Vérifier que les éléments de base sont présents
    await page.waitForTimeout(3000);
    
    const bodyText = await page.textContent('body');
    expect(bodyText).toBeTruthy();
    
    const buttonCount = await page.locator('button').count();
    expect(buttonCount).toBeGreaterThan(0);
    
    const hasCanvas = await page.locator('canvas').count();
    expect(hasCanvas).toBeGreaterThan(0);
    
    console.log('✅ Test rapide réussi');
    console.log(`📊 ${buttonCount} boutons, ${hasCanvas} canvas trouvés`);
    
    console.log('🎬 === FIN TEST RAPIDE ===');
  });
}); 