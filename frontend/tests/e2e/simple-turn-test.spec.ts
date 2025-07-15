import { test, expect } from '@playwright/test';

test.describe('🎯 Test Simple Tour et ZFC', () => {
  test('🔄 Vérification basique du système de tour', async ({ page }) => {
    console.log('🎬 === DÉBUT TEST SIMPLE TOUR ===');
    
    // Aller sur la page principale
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Page chargée');
    
    // Attendre que quelque chose se charge
    await page.waitForTimeout(3000);
    
    // Vérifier que la page contient du contenu
    const bodyText = await page.textContent('body');
    console.log('📄 Contenu de la page:', bodyText?.substring(0, 200));
    
    // Chercher des éléments d'interface
    const hasGameInterface = await page.locator('.true-heroes-interface, .game-header, .App').count() > 0;
    console.log('🎮 Interface de jeu trouvée:', hasGameInterface);
    
    // Chercher des boutons de contrôle
    const hasControlButtons = await page.locator('button').count();
    console.log('🔘 Nombre de boutons trouvés:', hasControlButtons);
    
    // Chercher le canvas
    const hasCanvas = await page.locator('canvas').count();
    console.log('🎨 Canvas trouvé:', hasCanvas);
    
    // Prendre une capture d'écran
    await page.screenshot({ path: 'test-results/simple-turn-test.png' });
    console.log('📸 Capture d\'écran sauvegardée');
    
    // Vérifier les logs de console
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      consoleLogs.push(msg.text());
      console.log('🔍 Log:', msg.text());
    });
    
    // Attendre un peu pour capturer les logs
    await page.waitForTimeout(2000);
    
    console.log('📋 Nombre de logs capturés:', consoleLogs.length);
    
    // Vérifier qu'il y a au moins du contenu
    expect(bodyText).toBeTruthy();
    expect(bodyText?.length).toBeGreaterThan(100);
    
    console.log('🎬 === FIN TEST SIMPLE TOUR ===');
  });
}); 