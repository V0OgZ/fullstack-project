const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║          🔍 HEROES OF TIME - DEBUG MODE LAUNCHER 🔍          ║
╠═══════════════════════════════════════════════════════════════╣
║  This tool launches automated tests to investigate bugs       ║
║  and captures all console errors for analysis                ║
╚═══════════════════════════════════════════════════════════════╝
`);

const DEBUG_CONFIG = {
  headless: true, // Mode headless pour investiguer en mémoire
  slowMo: 0, // Pas de ralentissement pour debug rapide
  timeout: 30000,
  logFile: 'debug-logs.json'
};

const errorLog = {
  timestamp: new Date().toISOString(),
  errors: [],
  warnings: [],
  info: [],
  networkErrors: [],
  renderErrors: [],
  stateSnapshots: []
};

async function captureDebugInfo(page) {
  // Capturer l'état du store Zustand
  try {
    const gameState = await page.evaluate(() => {
      if (window.useGameStore) {
        return window.useGameStore.getState();
      }
      return null;
    });
    
    if (gameState) {
      errorLog.stateSnapshots.push({
        timestamp: new Date().toISOString(),
        state: {
          currentGame: gameState.currentGame?.id,
          currentPlayer: gameState.currentPlayer?.name,
          selectedHero: gameState.selectedHero?.name,
          mapSize: gameState.map ? `${gameState.map.length}x${gameState.map[0]?.length}` : 'no map'
        }
      });
    }
  } catch (e) {
    console.log('Could not capture game state');
  }
}

async function runDebugSession() {
  const browser = await chromium.launch({ 
    headless: DEBUG_CONFIG.headless,
    devtools: !DEBUG_CONFIG.headless 
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Capturer tous les messages de console
  page.on('console', async msg => {
    const type = msg.type();
    const text = msg.text();
    const location = msg.location();
    
    const logEntry = {
      type,
      text,
      timestamp: new Date().toISOString(),
      location: {
        url: location.url,
        lineNumber: location.lineNumber,
        columnNumber: location.columnNumber
      }
    };
    
    // Analyser spécifiquement les erreurs "Maximum update depth exceeded"
    if (text.includes('Maximum update depth exceeded')) {
      console.error(`\n❌ BOUCLE INFINIE DÉTECTÉE!`);
      console.error(`   Fichier: ${location.url}`);
      console.error(`   Ligne: ${location.lineNumber}:${location.columnNumber}`);
      
      // Capturer plus de contexte
      await captureDebugInfo(page);
      
      errorLog.renderErrors.push({
        ...logEntry,
        severity: 'CRITICAL',
        analysis: 'Infinite re-render loop detected - likely caused by useEffect with bad dependencies'
      });
    }
    
    if (type === 'error') {
      errorLog.errors.push(logEntry);
      console.error(`❌ ERROR: ${text}`);
    } else if (type === 'warning') {
      errorLog.warnings.push(logEntry);
      if (!text.includes('deprecated')) { // Filtrer les warnings deprecated
        console.warn(`⚠️  WARNING: ${text}`);
      }
    } else if (type === 'log' && (text.includes('🎯') || text.includes('🔄'))) {
      errorLog.info.push(logEntry);
      console.log(`ℹ️  ${text}`);
    }
  });
  
  // Capturer les erreurs de page
  page.on('pageerror', error => {
    console.error(`\n💥 PAGE ERROR:`, error.message);
    errorLog.errors.push({
      type: 'pageerror',
      text: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  });
  
  // Capturer les requêtes échouées
  page.on('requestfailed', request => {
    const failure = request.failure();
    if (failure) {
      errorLog.networkErrors.push({
        url: request.url(),
        method: request.method(),
        errorText: failure.errorText,
        timestamp: new Date().toISOString()
      });
    }
  });
  
  console.log('\n🚀 Démarrage des tests de debug...\n');
  
  try {
    // Test 1: Page d'accueil
    console.log('📍 Test 1: Chargement de la page d\'accueil');
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    await captureDebugInfo(page);
    
    // Test 2: Sélection de scénario
    console.log('📍 Test 2: Sélection du scénario classique');
    const classicButton = await page.locator('text=Conquête Classique').first();
    if (await classicButton.isVisible()) {
      await classicButton.click();
      await page.waitForTimeout(3000);
      await captureDebugInfo(page);
    }
    
    // Test 3: Interface de jeu
    console.log('📍 Test 3: Vérification de l\'interface de jeu');
    const heroesButton = await page.locator('button:has-text("Heroes")').first();
    if (await heroesButton.isVisible()) {
      await heroesButton.click();
      await page.waitForTimeout(2000);
      await captureDebugInfo(page);
    }
    
    // Test 4: Interaction avec la carte
    console.log('📍 Test 4: Clic sur la carte');
    const mapCanvas = await page.locator('canvas').first();
    if (await mapCanvas.isVisible()) {
      await mapCanvas.click({ position: { x: 200, y: 200 } });
      await page.waitForTimeout(1000);
      await captureDebugInfo(page);
    }
    
    // Test 5: Changement de langue (peut déclencher des re-renders)
    console.log('📍 Test 5: Changement de langue');
    const langButton = await page.locator('.language-selector button').first();
    if (await langButton.isVisible()) {
      await langButton.click();
      const frButton = await page.locator('text=FR').first();
      if (await frButton.isVisible()) {
        await frButton.click();
        await page.waitForTimeout(1000);
      }
    }
    
  } catch (error) {
    console.error('\n❌ Erreur pendant les tests:', error.message);
    errorLog.errors.push({
      type: 'test-error',
      text: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
  
  console.log('\n📊 Analyse des résultats...\n');
  
  // Analyser les patterns d'erreurs
  const maxDepthErrors = errorLog.renderErrors.filter(e => 
    e.text.includes('Maximum update depth exceeded')
  );
  
  if (maxDepthErrors.length > 0) {
    console.log(`⚠️  PROBLÈME CRITIQUE: ${maxDepthErrors.length} erreurs de boucle infinie détectées!`);
    console.log('\n📍 Fichiers affectés:');
    const affectedFiles = [...new Set(maxDepthErrors.map(e => e.location.url))];
    affectedFiles.forEach(file => {
      const errors = maxDepthErrors.filter(e => e.location.url === file);
      console.log(`   - ${file} (${errors.length} erreurs)`);
    });
  }
  
  // Sauvegarder les logs
  await fs.writeFile(
    DEBUG_CONFIG.logFile, 
    JSON.stringify(errorLog, null, 2)
  );
  
  console.log(`\n💾 Logs sauvegardés dans: ${DEBUG_CONFIG.logFile}`);
  
  // Résumé
  console.log('\n📈 RÉSUMÉ:');
  console.log(`   - Erreurs critiques: ${errorLog.renderErrors.length}`);
  console.log(`   - Erreurs console: ${errorLog.errors.length}`);
  console.log(`   - Warnings: ${errorLog.warnings.length}`);
  console.log(`   - Erreurs réseau: ${errorLog.networkErrors.length}`);
  console.log(`   - États capturés: ${errorLog.stateSnapshots.length}`);
  
  await browser.close();
  
  // Retourner le code de sortie approprié
  if (errorLog.renderErrors.length > 0 || errorLog.errors.length > 0) {
    console.log('\n❌ Des erreurs ont été détectées. Consultez debug-logs.json pour plus de détails.');
    process.exit(1);
  } else {
    console.log('\n✅ Aucune erreur critique détectée!');
    process.exit(0);
  }
}

// Lancer le debug
runDebugSession().catch(error => {
  console.error('Erreur fatale:', error);
  process.exit(1);
}); 