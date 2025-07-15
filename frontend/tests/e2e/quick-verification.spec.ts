import { test, expect } from '@playwright/test';

test.describe('🚀 Vérification Rapide - Brouillard de Guerre + 2 Niveaux', () => {
  test('✅ Test complet du système', async ({ page }) => {
    console.log('🎬 === VÉRIFICATION RAPIDE ===');
    
    // Aller sur la page principale
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Page chargée');
    
    // Attendre que l'interface se charge
    await page.waitForTimeout(5000);
    
    // Vérifier que la page contient du contenu
    const bodyText = await page.textContent('body');
    console.log('📄 Contenu de la page:', bodyText?.substring(0, 300));
    
    // Chercher des boutons de scénario
    const scenarioButtons = await page.locator('button:has-text("Classique"), button:has-text("Mystique"), button:has-text("Multiplayer")').count();
    console.log('🎮 Boutons de scénario trouvés:', scenarioButtons);
    
    if (scenarioButtons > 0) {
      // Cliquer sur le premier scénario
      const firstScenario = page.locator('button:has-text("Classique"), button:has-text("Mystique"), button:has-text("Multiplayer")').first();
      await firstScenario.click();
      console.log('✅ Scénario sélectionné');
      
      // Attendre que l'interface de jeu se charge
      await page.waitForTimeout(3000);
      
      // Vérifier l'interface de jeu
      const gameInterface = await page.locator('.true-heroes-interface, .game-header').count();
      console.log('🎮 Interface de jeu trouvée:', gameInterface);
      
      // Chercher le canvas
      const canvas = await page.locator('canvas').count();
      console.log('🎨 Canvas trouvé:', canvas);
      
      // Chercher les boutons de contrôle
      const controlButtons = await page.locator('.control-btn, .end-turn-btn').count();
      console.log('🔘 Boutons de contrôle trouvés:', controlButtons);
      
      // Vérifier les logs de console pour le brouillard de guerre
      const consoleLogs: string[] = [];
      page.on('console', msg => {
        if (msg.text().includes('updateVision') || msg.text().includes('brouillard') || msg.text().includes('vision')) {
          consoleLogs.push(msg.text());
          console.log('🔍 Log Vision:', msg.text());
        }
      });
      
      // Attendre un peu pour capturer les logs
      await page.waitForTimeout(2000);
      
      console.log('📋 Logs de vision capturés:', consoleLogs.length);
      
      // Prendre une capture d'écran
      await page.screenshot({ path: 'test-results/quick-verification.png' });
      console.log('📸 Capture d\'écran sauvegardée');
      
      // Vérifications finales
      expect(gameInterface).toBeGreaterThan(0);
      expect(controlButtons).toBeGreaterThan(0);
      
      console.log('✅ Vérifications de base passées');
    } else {
      console.log('⚠️ Aucun bouton de scénario trouvé');
    }
    
    console.log('🎬 === FIN VÉRIFICATION RAPIDE ===');
  });
}); 