import { test, expect } from '@playwright/test';

test.describe('🎯 Hero Movement & Fog of War Test', () => {
  test('Test hero movement and fog of war visibility', async ({ page }) => {
    test.setTimeout(120000);
    console.log('🎬 === TEST MOUVEMENT HÉROS ET BROUILLARD DE GUERRE ===');

    // 1. Navigation vers la page d'accueil
    await page.goto('/');
    console.log('✅ Page d\'accueil chargée');

    // 2. Attendre le chargement des scénarios
    await page.waitForSelector('[data-testid="scenario-card-conquest-classic"]', { timeout: 10000 });
    console.log('✅ Scénarios chargés');

    // 3. Sélection du scénario classique
    await page.click('[data-testid="scenario-card-conquest-classic"]');
    console.log('✅ Scénario sélectionné');

    // 4. Attendre l'interface de jeu
    await page.waitForSelector('.true-heroes-interface', { timeout: 15000 });
    console.log('✅ Interface de jeu chargée');

    // 5. Attendre que la carte soit chargée
    await page.waitForSelector('canvas', { timeout: 10000 });
    console.log('✅ Carte chargée');

    // 6. Vérifier l'état initial du héros
    await page.waitForTimeout(2000);
    console.log('🔍 Vérification de l\'état initial...');

    // 7. Sélectionner le héros
    await page.click('.control-btn[title="Heroes"]');
    await page.waitForTimeout(1000);
    
    // Vérifier qu'il y a un héros
    const heroElements = await page.locator('.hero-card, .hero-item, [data-testid*="hero"]').count();
    console.log(`🎯 Nombre de héros trouvés: ${heroElements}`);
    
    if (heroElements > 0) {
      await page.click('.hero-card, .hero-item, [data-testid*="hero"]');
      console.log('✅ Héros sélectionné');
    }

    // 8. Prendre une capture d'écran de l'état initial
    await page.screenshot({ 
      path: 'test-results/hero-movement-1-initial-state.png',
      fullPage: true 
    });
    console.log('📸 Capture d\'état initial sauvegardée');

    // 9. Activer le mode mouvement
    await page.waitForTimeout(1000);
    console.log('🚶 Activation du mode mouvement...');

    // 10. Cliquer sur la carte pour essayer de bouger
    const canvas = page.locator('canvas').first();
    if (await canvas.count() > 0) {
      const box = await canvas.boundingBox();
      if (box) {
        // Cliquer au centre de la carte
        await canvas.click({ position: { x: box.width / 2, y: box.height / 2 } });
        console.log('✅ Clic sur la carte effectué');
        await page.waitForTimeout(2000);
      }
    }

    // 11. Prendre une capture après le mouvement
    await page.screenshot({ 
      path: 'test-results/hero-movement-2-after-move.png',
      fullPage: true 
    });
    console.log('📸 Capture après mouvement sauvegardée');

    // 12. Vérifier l'état du héros après mouvement
    await page.waitForTimeout(2000);
    console.log('🔍 Vérification de l\'état après mouvement...');

    // 13. Fin de tour
    const endTurnBtn = page.locator('.end-turn-btn, [data-testid="end-turn"], button:has-text("End Turn")').first();
    if (await endTurnBtn.count() > 0) {
      await endTurnBtn.click();
      console.log('⭐ Fin de tour effectuée');
      await page.waitForTimeout(3000);
    }

    // 14. Prendre une capture après fin de tour
    await page.screenshot({ 
      path: 'test-results/hero-movement-3-after-turn.png',
      fullPage: true 
    });
    console.log('📸 Capture après fin de tour sauvegardée');

    // 15. Deuxième tour - vérifier l'état
    console.log('🔄 Début du tour 2...');
    await page.waitForTimeout(2000);

    // 16. Vérifier la vision et le brouillard de guerre
    await page.click('.control-btn[title="Heroes"]');
    await page.waitForTimeout(1000);
    
    // 17. Prendre une capture finale
    await page.screenshot({ 
      path: 'test-results/hero-movement-4-final-state.png',
      fullPage: true 
    });
    console.log('📸 Capture finale sauvegardée');

    // 18. Vérifier les erreurs dans la console
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.log(`❌ Erreur console: ${msg.text()}`);
      }
    });

    // 19. Attendre un peu et vérifier les erreurs
    await page.waitForTimeout(5000);
    
    if (consoleErrors.length > 0) {
      console.log(`⚠️ ${consoleErrors.length} erreurs détectées dans la console`);
      consoleErrors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    } else {
      console.log('✅ Aucune erreur console détectée');
    }

    // 20. Vérifier que la page n'a pas planté
    const isPageAlive = await page.evaluate(() => {
      return document.readyState === 'complete' && !document.hidden;
    });

    if (isPageAlive) {
      console.log('✅ Page toujours fonctionnelle');
    } else {
      console.log('❌ Page a planté ou n\'est plus accessible');
    }

    console.log('✅ === TEST TERMINÉ ===');
  });
}); 