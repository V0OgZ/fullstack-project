import { test, expect } from '@playwright/test';

test.describe('🎯 Test Système Tour et ZFC', () => {
  test('🔄 Vérification tour du héros et calcul ZFC', async ({ page }) => {
    console.log('🎬 === DÉBUT TEST TOUR ET ZFC ===');
    
    // Aller sur la page principale
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Page chargée');
    
    // Attendre que l'interface soit prête ou charger un scénario
    try {
      await page.waitForSelector('.true-heroes-interface', { timeout: 5000 });
      console.log('✅ Interface déjà chargée');
    } catch {
      console.log('🔄 Interface non chargée, chargement d\'un scénario...');
      
      // Cliquer sur un scénario pour le charger
      const scenarioBtn = page.locator('button:has-text("Classique"), button:has-text("Mystique"), button:has-text("Multiplayer"), .scenario-button');
      if (await scenarioBtn.count() > 0) {
        await scenarioBtn.first().click();
        console.log('✅ Scénario sélectionné');
        
        // Attendre que l'interface se charge
        await page.waitForSelector('.true-heroes-interface', { timeout: 15000 });
        console.log('✅ Interface chargée après sélection du scénario');
      } else {
        console.log('⚠️ Aucun bouton de scénario trouvé');
      }
    }
    
    // Vérifier que le jeu est chargé
    const gameHeader = await page.locator('.game-header');
    await expect(gameHeader).toBeVisible();
    
    console.log('✅ Interface de jeu détectée');
    
    // Attendre que la carte soit chargée
    await page.waitForSelector('canvas', { timeout: 15000 });
    
    console.log('✅ Carte chargée');
    
    // Vérifier le tour actuel
    const turnInfo = await page.locator('.game-title, .scenario-badge').textContent();
    console.log('📊 Info tour/scénario:', turnInfo);
    
    // Cliquer sur le bouton héros pour ouvrir le panneau
    const heroBtn = page.locator('button:has-text("⚔️"), .control-btn:has-text("⚔️")');
    if (await heroBtn.count() > 0) {
      await heroBtn.click();
      console.log('✅ Panneau héros ouvert');
      
      // Attendre que le panneau héros soit visible
      await page.waitForTimeout(1000);
      
      // Vérifier qu'il y a des héros
      const heroes = await page.locator('.hero-card, .hero-item').count();
      console.log('🎯 Nombre de héros trouvés:', heroes);
      
      if (heroes > 0) {
        // Sélectionner le premier héros
        const firstHero = page.locator('.hero-card, .hero-item').first();
        await firstHero.click();
        console.log('✅ Premier héros sélectionné');
        
        // Attendre que les informations du héros soient chargées
        await page.waitForTimeout(1000);
        
        // Vérifier les points de mouvement du héros
        const movementPoints = await page.locator('.hero-stats, .movement-points').textContent();
        console.log('🏃 Points de mouvement:', movementPoints);
        
        // Vérifier la position du héros
        const heroPosition = await page.locator('.hero-position, .position-info').textContent();
        console.log('📍 Position du héros:', heroPosition);
      }
    }
    
    // Vérifier le bouton fin de tour
    const endTurnBtn = page.locator('.end-turn-btn, button:has-text("⭐"), button:has-text("👤")');
    if (await endTurnBtn.count() > 0) {
      console.log('✅ Bouton fin de tour trouvé');
      
      // Capturer l'état avant fin de tour
      const beforeTurnState = await page.locator('.game-title, .scenario-badge').textContent();
      console.log('📊 État avant fin de tour:', beforeTurnState);
      
      // Cliquer sur fin de tour
      await endTurnBtn.click();
      console.log('✅ Fin de tour cliquée');
      
      // Attendre que l'état se mette à jour
      await page.waitForTimeout(2000);
      
      // Vérifier que l'état a changé
      const afterTurnState = await page.locator('.game-title, .scenario-badge').textContent();
      console.log('📊 État après fin de tour:', afterTurnState);
      
      // Vérifier que quelque chose a changé (tour ou joueur)
      expect(afterTurnState).not.toBe(beforeTurnState);
    }
    
    // Vérifier les logs de console pour les calculs ZFC
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.text().includes('ZFC') || msg.text().includes('calculateZFC')) {
        consoleLogs.push(msg.text());
        console.log('🔍 Log ZFC:', msg.text());
      }
    });
    
    // Attendre un peu pour capturer les logs
    await page.waitForTimeout(3000);
    
    console.log('📋 Logs ZFC capturés:', consoleLogs.length);
    
    // Vérifier que le brouillard de guerre fonctionne
    const canvas = page.locator('canvas').first();
    if (await canvas.count() > 0) {
      console.log('✅ Canvas trouvé pour vérification brouillard de guerre');
      
      // Prendre une capture d'écran
      await page.screenshot({ path: 'test-results/turn-zfc-test.png' });
      console.log('📸 Capture d\'écran sauvegardée');
    }
    
    console.log('🎬 === FIN TEST TOUR ET ZFC ===');
  });
}); 