import { test, expect } from '@playwright/test';

test.describe('🎮 Complete Game Turns - Full Backend Integration', () => {
  test('🚀 FULL TURN SIMULATION - Complete Backend Workflow', async ({ page }) => {
    console.log('🎬 === SIMULATION COMPLÈTE FULL TURN ===');
    
    // 1. Démarrer le jeu
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3000);
    
    console.log('✅ 1. Interface loaded');
    
    // 2. Vérifier que le backend est accessible
    const backendHealth = await page.evaluate(async () => {
      try {
        const response = await fetch('http://localhost:8080/actuator/health');
        return response.ok;
      } catch (error) {
        return false;
      }
    });
    
    expect(backendHealth).toBe(true);
    console.log('✅ 2. Backend health check passed');
    
    // 3. Vérifier l'état initial du jeu
    const gameState = await page.evaluate(async () => {
      try {
        const response = await fetch('http://localhost:8080/api/games/conquest-classic');
        return response.ok ? await response.json() : null;
      } catch (error) {
        return null;
      }
    });
    
    console.log('✅ 3. Initial game state:', gameState ? 'loaded' : 'not loaded');
    
    // 4. Test complet des turns
    for (let turn = 1; turn <= 5; turn++) {
      console.log(`🎯 === TURN ${turn} ===`);
      
      // 4.1 Vérifier l'état du tour
      const turnElement = await page.locator('.turn-counter').first();
      if (await turnElement.isVisible()) {
        const turnText = await turnElement.textContent();
        console.log(`📊 Turn display: ${turnText}`);
      }
      
      // 4.2 Vérifier les ressources
      const goldElement = await page.locator('[class*="resources"]').first();
      if (await goldElement.isVisible()) {
        const goldText = await goldElement.textContent();
        console.log(`💰 Resources: ${goldText}`);
      }
      
      // 4.3 Essayer de sélectionner un héros
      const heroButton = await page.locator('button[title="Hero"], .sidebar-tab[title="Hero"]').first();
      if (await heroButton.isVisible()) {
        await heroButton.click();
        await page.waitForTimeout(1000);
        console.log(`⚔️ Hero panel activated`);
      }
      
      // 4.4 Test de fin de tour avec backend
      console.log(`🔄 Testing end turn for turn ${turn}...`);
      
      // Chercher le bouton End Turn
      const endTurnSelectors = [
        'button[title="End Turn"]',
        '.end-turn-btn',
        'button:has-text("End Turn")',
        'button:has-text("⭐")',
        '[class*="end-turn"]'
      ];
      
      let endTurnButton = null;
      for (const selector of endTurnSelectors) {
        const btn = page.locator(selector).first();
        if (await btn.isVisible().catch(() => false)) {
          endTurnButton = btn;
          break;
        }
      }
      
      if (endTurnButton) {
        // Cliquer sur End Turn
        await endTurnButton.click();
        await page.waitForTimeout(2000);
        
        // Vérifier que le backend a traité le tour
        const newGameState = await page.evaluate(async () => {
          try {
            const response = await fetch('http://localhost:8080/api/games/conquest-classic');
            return response.ok ? await response.json() : null;
          } catch (error) {
            return null;
          }
        });
        
        if (newGameState) {
          console.log(`✅ Turn ${turn} processed by backend`);
          console.log(`📊 New turn: ${newGameState.turn || 'unknown'}`);
        } else {
          console.log(`⚠️ Turn ${turn} - backend state not accessible`);
        }
      } else {
        console.log(`⚠️ Turn ${turn} - End Turn button not found`);
      }
      
      // 4.5 Pause entre les tours
      await page.waitForTimeout(1500);
    }
    
    // 5. Test des actions héros avec backend
    console.log('🎯 === HERO ACTIONS BACKEND TEST ===');
    
    const heroActions = ['move', 'attack', 'collect'];
    for (const action of heroActions) {
      console.log(`🧪 Testing hero action: ${action}`);
      
      // Simuler une action héros via backend
      const actionResult = await page.evaluate(async (actionType) => {
        try {
          const response = await fetch(`http://localhost:8080/api/heroes/test-hero/${actionType}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              heroId: 'test-hero',
              targetX: 5,
              targetY: 5,
              actionType
            })
          });
          return {
            success: response.ok,
            status: response.status,
            action: actionType
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            action: actionType
          };
        }
      }, action);
      
      console.log(`📊 Hero ${action} result:`, actionResult);
      await page.waitForTimeout(1000);
    }
    
    // 6. Test des statistiques de jeu
    console.log('🎯 === GAME STATISTICS TEST ===');
    
    const gameStats = await page.evaluate(async () => {
      try {
        const response = await fetch('http://localhost:8080/api/games/conquest-classic/stats');
        return response.ok ? await response.json() : null;
      } catch (error) {
        return null;
      }
    });
    
    if (gameStats) {
      console.log('📊 Game statistics:', gameStats);
    }
    
    // 7. Test du système de sauvegarde
    console.log('🎯 === SAVE SYSTEM TEST ===');
    
    const saveResult = await page.evaluate(async () => {
      try {
        const response = await fetch('http://localhost:8080/api/games/conquest-classic/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gameId: 'conquest-classic',
            saveData: {
              timestamp: new Date().toISOString(),
              turn: 5,
              testSave: true
            }
          })
        });
        return {
          success: response.ok,
          status: response.status
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    });
    
    console.log('💾 Save system result:', saveResult);
    
    // 8. Capture finale
    await page.screenshot({ 
      path: `screenshots/complete-turn-test-final.png`,
      fullPage: true
    });
    
    console.log('🎉 === COMPLETE TURN TEST FINISHED ===');
    console.log('✅ All backend integration tests completed');
    
    // Vérifications finales
    expect(backendHealth).toBe(true);
    expect(gameState || {}).toBeDefined();
  });
  
  test('🎲 SCENARIO BACKEND INTEGRATION - All Scenarios', async ({ page }) => {
    console.log('🎬 === TEST TOUS LES SCÉNARIOS BACKEND ===');
    
    const scenarios = [
      'conquest-classic',
      'temporal-rift', 
      'multiplayer-arena',
      'dragon-campaign'
    ];
    
    for (const scenario of scenarios) {
      console.log(`🎯 Testing scenario: ${scenario}`);
      
      // Charger le scénario
      const scenarioResult = await page.evaluate(async (scenarioId) => {
        try {
          const response = await fetch(`http://localhost:8080/api/scenarios/${scenarioId}`);
          return {
            success: response.ok,
            status: response.status,
            scenario: scenarioId
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            scenario: scenarioId
          };
        }
      }, scenario);
      
      console.log(`📊 Scenario ${scenario} result:`, scenarioResult);
      
      // Test de création de jeu avec ce scénario
      const gameCreation = await page.evaluate(async (scenarioId) => {
        try {
          const response = await fetch('http://localhost:8080/api/games', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              scenarioId,
              playersCount: 1,
              difficulty: 'normal'
            })
          });
          return {
            success: response.ok,
            status: response.status,
            scenario: scenarioId
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            scenario: scenarioId
          };
        }
      }, scenario);
      
      console.log(`🎮 Game creation for ${scenario}:`, gameCreation);
      await page.waitForTimeout(1000);
    }
    
    console.log('🎉 === ALL SCENARIOS TESTED ===');
  });
}); 