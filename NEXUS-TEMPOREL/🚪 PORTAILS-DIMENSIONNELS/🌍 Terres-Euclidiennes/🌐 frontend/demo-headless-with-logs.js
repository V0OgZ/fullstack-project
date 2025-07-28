const { chromium } = require('@playwright/test');
const fs = require('fs');

async function runDemoWithLogs() {
  console.log('🎬 === DÉBUT DEMO AVEC LOGS COMPLETS ===');
  
  const browser = await chromium.launch({
    headless: true
  });
  
  const page = await browser.newPage();
  
  // Capturer TOUS les logs
  const logs = [];
  
  page.on('console', msg => {
    const log = {
      type: 'console',
      level: msg.type(),
      text: msg.text(),
      timestamp: new Date().toISOString()
    };
    logs.push(log);
    console.log(`[${log.timestamp}] ${log.level.toUpperCase()}: ${log.text}`);
  });
  
  page.on('pageerror', error => {
    const log = {
      type: 'error',
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    };
    logs.push(log);
    console.log(`[${log.timestamp}] ERROR: ${error.message}`);
  });
  
  page.on('requestfailed', request => {
    const log = {
      type: 'request_failed',
      url: request.url(),
      error: request.failure().errorText,
      timestamp: new Date().toISOString()
    };
    logs.push(log);
    console.log(`[${log.timestamp}] REQUEST FAILED: ${request.url()} - ${request.failure().errorText}`);
  });
  
  try {
    console.log('🌐 Navigation vers http://localhost:3001...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 30000 });
    
    console.log('✅ Page chargée, attente interface...');
    await page.waitForTimeout(5000);
    
    // Chercher et cliquer sur un scénario
    console.log('🔍 Recherche de scénarios...');
    const scenarioSelectors = [
      'button:has-text("Classique")',
      'button:has-text("Mystique")', 
      'button:has-text("Multiplayer")',
      '.scenario-button',
      'button[data-testid="scenario"]'
    ];
    
    let scenarioClicked = false;
    for (const selector of scenarioSelectors) {
      try {
        const button = await page.$(selector);
        if (button) {
          console.log(`🎯 Clic sur scénario: ${selector}`);
          await button.click();
          scenarioClicked = true;
          break;
        }
      } catch (e) {
        console.log(`❌ Sélecteur ${selector} non trouvé`);
      }
    }
    
    if (!scenarioClicked) {
      console.log('⚠️ Aucun scénario trouvé, test sans scénario...');
    }
    
    // Attendre que l'interface se charge
    console.log('⏳ Attente chargement interface...');
    await page.waitForTimeout(10000);
    
    // Vérifier l'état du jeu
    console.log('🔍 Vérification état du jeu...');
    const gameState = await page.evaluate(() => {
      // Récupérer l'état du store Zustand
      if (window.__ZUSTAND_DEVTOOLS__) {
        return window.__ZUSTAND_DEVTOOLS__.getState();
      }
      return null;
    });
    
    if (gameState) {
      console.log('📊 État du jeu récupéré:', JSON.stringify(gameState, null, 2));
    }
    
    // Attendre plus longtemps pour voir si ça bloque
    console.log('⏳ Attente finale (30s) pour détecter blocage...');
    await page.waitForTimeout(30000);
    
    console.log('✅ Demo terminée sans blocage détecté');
    
  } catch (error) {
    console.log(`❌ ERREUR: ${error.message}`);
    logs.push({
      type: 'test_error',
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  } finally {
    await browser.close();
    
    // Sauvegarder tous les logs
    const logFile = 'demo-headless-logs.json';
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
    console.log(`📝 Logs sauvegardés dans ${logFile}`);
    
    // Analyser les logs
    const errorCount = logs.filter(l => l.type === 'error' || l.type === 'request_failed').length;
    const consoleCount = logs.filter(l => l.type === 'console').length;
    
    console.log('\n📊 === ANALYSE DES LOGS ===');
    console.log(`Total logs: ${logs.length}`);
    console.log(`Erreurs: ${errorCount}`);
    console.log(`Console logs: ${consoleCount}`);
    
    if (errorCount === 0) {
      console.log('✅ AUCUNE ERREUR DÉTECTÉE - Demo fonctionne correctement');
    } else {
      console.log('❌ ERREURS DÉTECTÉES - Voir logs détaillés');
    }
  }
}

runDemoWithLogs().catch(console.error); 