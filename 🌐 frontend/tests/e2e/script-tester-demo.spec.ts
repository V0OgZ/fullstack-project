import { test, expect } from '@playwright/test';

test.describe('🧪 GameScript Tester Demo', () => {
  test('Test complet du GameScriptTester', async ({ page }) => {
    console.log('🚀 Starting GameScript Tester Demo...');
    
    // 1. Navigation vers l'application
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    console.log('✅ Page loaded');
    
    // 2. Attendre que les scénarios se chargent
    await page.waitForSelector('[data-testid="scenario-card-conquest-classic"]', { timeout: 10000 });
    console.log('✅ Scenarios loaded');
    
    // 3. Cliquer sur le scénario Conquest Classic
    await page.click('[data-testid="scenario-card-conquest-classic"]');
    console.log('✅ Scenario selected');
    
    // 4. Attendre que le jeu se charge
    await page.waitForSelector('.true-heroes-interface', { timeout: 15000 });
    console.log('✅ Game interface loaded');
    
    // 5. Attendre un peu pour que l'interface soit complètement chargée
    await page.waitForTimeout(3000);
    
    // 6. Cliquer sur le bouton Script Tester (🧪)
    const scriptButton = page.locator('button:has-text("🧪")');
    await scriptButton.waitFor({ state: 'visible', timeout: 10000 });
    await scriptButton.click();
    console.log('✅ Script Tester button clicked');
    
    // 7. Vérifier que le GameScriptTester est visible
    await page.waitForSelector('.game-script-tester', { timeout: 10000 });
    console.log('✅ GameScriptTester interface visible');
    
    // 8. Vérifier les panneaux
    await expect(page.locator('.examples-panel')).toBeVisible();
    await expect(page.locator('.script-editor-panel')).toBeVisible();
    await expect(page.locator('.results-panel')).toBeVisible();
    console.log('✅ All panels visible');
    
    // 9. Sélectionner le premier exemple
    const firstExample = page.locator('.example-item').first();
    await firstExample.click();
    console.log('✅ First example selected');
    
    // 10. Vérifier que le script s'est chargé dans l'éditeur
    const scriptTextarea = page.locator('.script-textarea');
    await expect(scriptTextarea).not.toBeEmpty();
    console.log('✅ Script loaded in editor');
    
    // 11. Cliquer sur le bouton d'exécution
    const executeButton = page.locator('.execute-button');
    await executeButton.click();
    console.log('✅ Execute button clicked');
    
    // 12. Attendre l'exécution du script
    await page.waitForTimeout(5000);
    
    // 13. Vérifier qu'il y a des résultats
    const resultItems = page.locator('.result-item');
    await expect(resultItems.first()).toBeVisible();
    console.log('✅ Script execution results visible');
    
    // 14. Vérifier les logs
    const logEntries = page.locator('.log-entry');
    if (await logEntries.count() > 0) {
      console.log('✅ Logs generated');
    }
    
    // 15. Tester l'écriture d'un script personnalisé
    await scriptTextarea.fill('LOG "Test personnalisé"\nWAIT 1000\nLOG "Script terminé"');
    console.log('✅ Custom script written');
    
    // 16. Exécuter le script personnalisé
    await executeButton.click();
    console.log('✅ Custom script executed');
    
    // 17. Attendre l'exécution
    await page.waitForTimeout(3000);
    
    // 18. Vérifier qu'il y a maintenant plus de résultats
    await expect(resultItems.nth(1)).toBeVisible();
    console.log('✅ Multiple script executions recorded');
    
    // 19. Prendre une capture d'écran finale
    await page.screenshot({ path: 'test-results/script-tester-demo-final.png', fullPage: true });
    console.log('✅ Final screenshot taken');
    
    // 20. Tester le bouton de nettoyage
    const clearButton = page.locator('.clear-results-button');
    await clearButton.click();
    console.log('✅ Clear results button clicked');
    
    // 21. Attendre le nettoyage
    await page.waitForTimeout(1000);
    
    // 22. Vérifier que les résultats sont effacés
    await expect(page.locator('.no-results')).toBeVisible();
    console.log('✅ Results cleared successfully');
    
    console.log('🎉 GameScript Tester Demo completed successfully!');
  });
  
  test('Test rapide de navigation', async ({ page }) => {
    console.log('🚀 Quick navigation test...');
    
    // Navigation simple
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ Page loads correctly');
    
    // Vérifier les éléments de base
    const scenarioCards = page.locator('[data-testid*="scenario-card"]');
    await expect(scenarioCards.first()).toBeVisible();
    console.log('✅ Scenario cards visible');
    
    // Cliquer sur un scénario
    await scenarioCards.first().click();
    
    // Vérifier que le jeu se charge
    await page.waitForSelector('.true-heroes-interface', { timeout: 10000 });
    console.log('✅ Game interface loads');
    
    // Vérifier les boutons de contrôle
    const controlButtons = page.locator('.control-btn');
    await expect(controlButtons.first()).toBeVisible();
    console.log('✅ Control buttons visible');
    
    // Vérifier que le bouton script existe
    const scriptButton = page.locator('button:has-text("🧪")');
    await expect(scriptButton).toBeVisible();
    console.log('✅ Script button visible');
    
    console.log('🎉 Quick navigation test completed!');
  });
  
  test('Test des exemples de scripts', async ({ page }) => {
    console.log('🚀 Testing script examples...');
    
    // Navigation et setup
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="scenario-card-conquest-classic"]', { timeout: 10000 });
    await page.click('[data-testid="scenario-card-conquest-classic"]');
    await page.waitForSelector('.true-heroes-interface', { timeout: 15000 });
    await page.waitForTimeout(3000);
    
    // Ouvrir le script tester
    const scriptButton = page.locator('button:has-text("🧪")');
    await scriptButton.click();
    await page.waitForSelector('.game-script-tester', { timeout: 10000 });
    
    // Tester chaque exemple
    const examples = page.locator('.example-item');
    const exampleCount = await examples.count();
    console.log(`✅ Found ${exampleCount} examples`);
    
    for (let i = 0; i < Math.min(exampleCount, 3); i++) {
      console.log(`🧪 Testing example ${i + 1}...`);
      
      // Sélectionner l'exemple
      await examples.nth(i).click();
      await page.waitForTimeout(500);
      
      // Exécuter
      await page.locator('.execute-button').click();
      await page.waitForTimeout(2000);
      
      // Vérifier qu'il y a des résultats
      const resultItems = page.locator('.result-item');
      await expect(resultItems.first()).toBeVisible();
      
      console.log(`✅ Example ${i + 1} executed successfully`);
    }
    
    console.log('🎉 Script examples test completed!');
  });
}); 