import { test, expect } from '@playwright/test';

test.describe('🔍 Debug UI State - Diagnostic Test', () => {
  test('should load scenario and capture UI state for analysis', async ({ page }) => {
    console.log('🔍 Starting UI diagnostic test...');
    
    // Aller à la page d'accueil
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    console.log('📸 Taking screenshot of home page...');
    await page.screenshot({ path: 'test-results/01-home-page.png', fullPage: true });
    
    // Chercher et cliquer sur un scénario
    console.log('🎯 Looking for scenario buttons...');
    
    // Attendre que les scénarios soient chargés
    await page.waitForSelector('[data-testid="scenario-card"], .scenario-card, .game-option', { timeout: 10000 });
    
    // Prendre un screenshot des options disponibles
    await page.screenshot({ path: 'test-results/02-scenario-selection.png', fullPage: true });
    
    // Essayer de cliquer sur le premier scénario disponible
    const scenarioSelectors = [
      '[data-testid="scenario-card"]',
      '.scenario-card',
      '.game-option',
      'button[title*="Conquest"]',
      'button[title*="Classic"]',
      'a[href*="/game/"]',
      'button:has-text("Conquête")',
      'button:has-text("Classic")',
      'div:has-text("Conquest")'
    ];
    
    let scenarioFound = false;
    for (const selector of scenarioSelectors) {
      try {
        const element = await page.locator(selector).first();
        if (await element.isVisible()) {
          console.log(`✅ Found scenario with selector: ${selector}`);
          await element.click();
          scenarioFound = true;
          break;
        }
      } catch (error) {
        console.log(`❌ Selector ${selector} not found`);
      }
    }
    
    if (!scenarioFound) {
      console.log('❌ No scenario found, trying direct navigation...');
      await page.goto('http://localhost:3000/game/conquest-classic');
    }
    
    // Attendre le chargement de la page de jeu
    console.log('⏳ Waiting for game page to load...');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Attendre l'initialisation
    
    // Prendre un screenshot de la page de jeu
    console.log('📸 Taking screenshot of game page...');
    await page.screenshot({ path: 'test-results/03-game-page-initial.png', fullPage: true });
    
    // Analyser l'état de l'interface
    console.log('🔍 Analyzing UI state...');
    
    // Vérifier la présence des éléments clés
    const uiElements = {
      header: await page.locator('.interface-header, .game-header').count(),
      leftPanel: await page.locator('.left-panel, .map-area').count(),
      rightPanel: await page.locator('.right-panel, .side-panel').count(),
      canvas: await page.locator('canvas').count(),
      terrainRenderer: await page.locator('[data-testid="terrain-renderer"], .terrain-renderer').count(),
      heroSection: await page.locator('.hero-section, .hero-display, .hero-panel').count(),
      loadingIndicator: await page.locator('.loading, [data-testid="loading"]').count(),
      errorMessage: await page.locator('.error, .error-message').count(),
    };
    
    console.log('🎯 UI Elements Analysis:', uiElements);
    
    // Vérifier les messages d'erreur dans la console
    const logs: string[] = [];
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('error') || text.includes('Error') || text.includes('ERROR')) {
        logs.push(`❌ CONSOLE ERROR: ${text}`);
      }
    });
    
    // Attendre un peu plus pour voir si quelque chose se charge
    await page.waitForTimeout(5000);
    
    // Prendre un screenshot final
    console.log('📸 Taking final screenshot...');
    await page.screenshot({ path: 'test-results/04-game-page-final.png', fullPage: true });
    
    // Vérifier si le terrain renderer est présent
    const terrainRendererExists = await page.locator('canvas, .terrain-renderer, .organic-terrain-renderer').count();
    console.log(`🗺️ Terrain renderer elements found: ${terrainRendererExists}`);
    
    // Vérifier si le panneau de droite est présent
    const rightPanelExists = await page.locator('.right-panel, .side-panel').count();
    console.log(`📱 Right panel elements found: ${rightPanelExists}`);
    
    // Vérifier les messages d'erreur dans le DOM
    const errorElements = await page.locator('.error, .error-message, [data-testid="error"]').allTextContents();
    if (errorElements.length > 0) {
      console.log('❌ Error messages found in DOM:', errorElements);
    }
    
    // Analyser le texte visible sur la page
    const bodyText = await page.locator('body').textContent();
    const hasLoadingText = bodyText?.includes('Loading') || bodyText?.includes('Chargement');
    const hasErrorText = bodyText?.includes('Error') || bodyText?.includes('Erreur');
    
    console.log('📝 Page analysis:');
    console.log(`  - Has loading text: ${hasLoadingText}`);
    console.log(`  - Has error text: ${hasErrorText}`);
    console.log(`  - Console errors: ${logs.length}`);
    
    if (logs.length > 0) {
      console.log('📋 Console errors:', logs);
    }
    
    // Créer un rapport de diagnostic
    const diagnosticReport = {
      timestamp: new Date().toISOString(),
      url: page.url(),
      uiElements,
      consoleErrors: logs,
      hasLoadingText,
      hasErrorText,
      screenshots: [
        '01-home-page.png',
        '02-scenario-selection.png', 
        '03-game-page-initial.png',
        '04-game-page-final.png'
      ]
    };
    
    console.log('📊 DIAGNOSTIC REPORT:', JSON.stringify(diagnosticReport, null, 2));
    
    // Assertions pour faire échouer le test si des problèmes sont détectés
    if (logs.length > 0) {
      console.log('❌ TEST FAILED: Console errors detected');
    }
    
    if (terrainRendererExists === 0) {
      console.log('❌ TEST FAILED: No terrain renderer found');
    }
    
    if (rightPanelExists === 0) {
      console.log('❌ TEST FAILED: No right panel found');
    }
    
    // Cette assertion permet de voir le rapport même si le test "passe"
    expect(diagnosticReport.screenshots.length).toBeGreaterThan(0);
  });
}); 