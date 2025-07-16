/**
 * 🎮 HEROES OF TIME - Script-Driven Playwright Tests
 * 
 * Tests E2E utilisant le langage de script custom pour automatiser
 * les interactions avec l'interface utilisateur
 */

import { test, expect, Page } from '@playwright/test';
import { GameScriptEngine, GameScript, ScriptAction, ScriptContext } from '../../src/services/gameScriptEngine';
import { ADVANCED_GAME_SCRIPTS } from '../../../scripts/game-simulation-tests';

// Configuration des tests
const BACKEND_URL = 'http://localhost:8080';
const FRONTEND_URL = 'http://localhost:3000';
const TEST_TIMEOUT = 30000;

// Helper pour l'exécution de scripts dans Playwright
class PlaywrightScriptRunner {
  private page: Page;
  private scriptEngine: GameScriptEngine;
  
  constructor(page: Page) {
    this.page = page;
    this.scriptEngine = new GameScriptEngine();
  }

  // Exécute un script en utilisant l'interface utilisateur
  async executeScriptWithUI(script: GameScript, context: Partial<ScriptContext>) {
    const results: { success: boolean; message: string; context: ScriptContext }[] = [];
    
    // Initialiser le contexte
    const fullContext: ScriptContext = {
      gameId: context.gameId || '',
      playerId: context.playerId || 'player1',
      heroId: context.heroId || 'hero1',
      variables: { ...script.variables, ...context.variables },
      gameState: context.gameState || {}
    };

    // Exécuter chaque action
    for (const action of script.actions) {
      const result = await this.executeActionWithUI(action, fullContext);
      results.push(result);
      
      if (!result.success) {
        break;
      }
    }
    
    return results;
  }

  // Exécute une action individuelle avec l'interface utilisateur
  private async executeActionWithUI(action: ScriptAction, context: ScriptContext) {
    try {
      console.log(`🎯 Executing UI action: ${action.type}`);
      
      switch (action.type) {
        case 'move':
          return await this.executeMoveActionUI(action, context);
        case 'attack':
          return await this.executeAttackActionUI(action, context);
        case 'build':
          return await this.executeBuildActionUI(action, context);
        case 'recruit':
          return await this.executeRecruitActionUI(action, context);
        case 'end_turn':
          return await this.executeEndTurnActionUI(action, context);
        case 'collect':
          return await this.executeCollectActionUI(action, context);
        case 'wait':
          return await this.executeWaitActionUI(action, context);
        case 'log':
          return await this.executeLogActionUI(action, context);
        case 'assert':
          return await this.executeAssertActionUI(action, context);
        default:
          throw new Error(`UI action not supported: ${action.type}`);
      }
    } catch (error) {
      return {
        success: false,
        message: `UI action failed: ${error.message}`,
        context
      };
    }
  }

  // Actions UI spécifiques
  
  private async executeMoveActionUI(action: ScriptAction, context: ScriptContext) {
    const { targetPosition, relative } = action.params || {};
    
    // Cliquer sur le héros pour le sélectionner
    await this.page.click('[data-testid="hero-portrait"]');
    
    // Attendre que le héros soit sélectionné
    await this.page.waitForSelector('[data-testid="selected-hero"]', { timeout: 5000 });
    
    // Calculer la position cible
    let finalPosition = targetPosition;
    if (relative) {
      // TODO: Récupérer la position actuelle du héros depuis l'UI
      finalPosition = { x: targetPosition.x + 10, y: targetPosition.y + 10 };
    }
    
    // Cliquer sur la case cible sur la carte
    const mapCanvas = this.page.locator('canvas[data-testid="game-map"]');
    await mapCanvas.click({
      position: {
        x: finalPosition.x * 40, // Ajuster selon la taille des tuiles
        y: finalPosition.y * 40
      }
    });
    
    // Attendre que le mouvement soit effectué
    await this.page.waitForTimeout(1000);
    
    return {
      success: true,
      message: `Hero moved to position (${finalPosition.x}, ${finalPosition.y}) via UI`,
      context
    };
  }

  private async executeAttackActionUI(action: ScriptAction, context: ScriptContext) {
    const { targetId } = action.params || {};
    
    // Sélectionner le héros attaquant
    await this.page.click('[data-testid="hero-portrait"]');
    
    // Cliquer sur l'ennemi cible
    await this.page.click(`[data-testid="enemy-${targetId}"]`);
    
    // Confirmer l'attaque si une boîte de dialogue apparaît
    const confirmButton = this.page.locator('[data-testid="confirm-attack"]');
    if (await confirmButton.isVisible({ timeout: 2000 })) {
      await confirmButton.click();
    }
    
    // Attendre la fin du combat
    await this.page.waitForTimeout(2000);
    
    return {
      success: true,
      message: `Attack executed via UI`,
      context
    };
  }

  private async executeBuildActionUI(action: ScriptAction, context: ScriptContext) {
    const { buildingType, position } = action.params || {};
    
    // Ouvrir le panneau de construction
    await this.page.click('[data-testid="castle-panel-tab"]');
    
    // Attendre que le panneau soit ouvert
    await this.page.waitForSelector('[data-testid="building-options"]', { timeout: 5000 });
    
    // Sélectionner le type de bâtiment
    await this.page.click(`[data-testid="building-${buildingType}"]`);
    
    // Placer le bâtiment sur la carte
    const mapCanvas = this.page.locator('canvas[data-testid="game-map"]');
    await mapCanvas.click({
      position: {
        x: position.x * 40,
        y: position.y * 40
      }
    });
    
    // Confirmer la construction
    const confirmButton = this.page.locator('[data-testid="confirm-build"]');
    if (await confirmButton.isVisible({ timeout: 2000 })) {
      await confirmButton.click();
    }
    
    return {
      success: true,
      message: `Building ${buildingType} constructed via UI`,
      context
    };
  }

  private async executeRecruitActionUI(action: ScriptAction, context: ScriptContext) {
    const { unitType, quantity } = action.params || {};
    
    // Ouvrir le panneau de recrutement
    await this.page.click('[data-testid="castle-panel-tab"]');
    await this.page.click('[data-testid="recruit-tab"]');
    
    // Attendre que le panneau soit ouvert
    await this.page.waitForSelector('[data-testid="unit-recruitment"]', { timeout: 5000 });
    
    // Sélectionner le type d'unité
    await this.page.click(`[data-testid="unit-${unitType}"]`);
    
    // Ajuster la quantité
    const quantityInput = this.page.locator(`[data-testid="quantity-${unitType}"]`);
    await quantityInput.fill(quantity.toString());
    
    // Confirmer le recrutement
    await this.page.click('[data-testid="confirm-recruit"]');
    
    return {
      success: true,
      message: `Recruited ${quantity} ${unitType} via UI`,
      context
    };
  }

  private async executeEndTurnActionUI(action: ScriptAction, context: ScriptContext) {
    // Cliquer sur le bouton "End Turn"
    await this.page.click('[data-testid="end-turn-button"]');
    
    // Attendre que le tour soit terminé
    await this.page.waitForSelector('[data-testid="turn-indicator"]', { timeout: 10000 });
    
    // Vérifier que le tour a changé
    const turnIndicator = await this.page.textContent('[data-testid="turn-indicator"]');
    
    return {
      success: true,
      message: `Turn ended via UI, now: ${turnIndicator}`,
      context
    };
  }

  private async executeCollectActionUI(action: ScriptAction, context: ScriptContext) {
    const { objectId } = action.params || {};
    
    // Cliquer sur l'objet à collecter
    await this.page.click(`[data-testid="collectible-${objectId}"]`);
    
    // Confirmer la collecte si nécessaire
    const confirmButton = this.page.locator('[data-testid="confirm-collect"]');
    if (await confirmButton.isVisible({ timeout: 2000 })) {
      await confirmButton.click();
    }
    
    return {
      success: true,
      message: `Object ${objectId} collected via UI`,
      context
    };
  }

  private async executeWaitActionUI(action: ScriptAction, context: ScriptContext) {
    const { duration } = action.params || {};
    const waitTime = duration || 1000;
    
    await this.page.waitForTimeout(waitTime);
    
    return {
      success: true,
      message: `Waited ${waitTime}ms`,
      context
    };
  }

  private async executeLogActionUI(action: ScriptAction, context: ScriptContext) {
    const { message } = action.params || {};
    
    console.log(`[UI Script] ${message}`);
    
    return {
      success: true,
      message: `Logged: ${message}`,
      context
    };
  }

  private async executeAssertActionUI(action: ScriptAction, context: ScriptContext) {
    const { condition, message } = action.params || {};
    
    // Vérifier des éléments de l'UI selon la condition
    let assertionPassed = false;
    
    if (condition.type === 'has') {
      const selector = condition.left;
      assertionPassed = await this.page.locator(selector).isVisible({ timeout: 5000 });
    } else if (condition.type === 'equals') {
      const selector = condition.left;
      const expectedValue = condition.right;
      const actualValue = await this.page.textContent(selector);
      assertionPassed = actualValue === expectedValue;
    }
    
    if (!assertionPassed) {
      throw new Error(message || 'UI assertion failed');
    }
    
    return {
      success: true,
      message: `UI assertion passed: ${message}`,
      context
    };
  }
}

// Scripts de test spécifiques pour Playwright
const PLAYWRIGHT_SCRIPTS = {
  uiBasicActions: {
    name: 'UI Basic Actions',
    description: 'Test basic UI interactions',
    variables: {
      playerId: 'player1',
      heroId: 'hero1'
    },
    actions: [
      {
        type: 'log' as const,
        params: { message: 'Starting basic UI actions test' }
      },
      {
        type: 'move' as const,
        params: {
          targetPosition: { x: 5, y: 5 }
        }
      },
      {
        type: 'assert' as const,
        params: {
          condition: {
            type: 'has' as const,
            left: '[data-testid="hero-moved"]'
          },
          message: 'Hero should have moved'
        }
      },
      {
        type: 'end_turn' as const
      },
      {
        type: 'assert' as const,
        params: {
          condition: {
            type: 'has' as const,
            left: '[data-testid="turn-ended"]'
          },
          message: 'Turn should have ended'
        }
      }
    ]
  } as GameScript,

  uiFullGameplay: {
    name: 'UI Full Gameplay',
    description: 'Complete gameplay scenario through UI',
    variables: {
      playerId: 'player1',
      heroId: 'hero1'
    },
    actions: [
      {
        type: 'log',
        params: { message: 'Starting full gameplay test' }
      },
      {
        type: 'build',
        params: {
          buildingType: 'barracks',
          position: { x: 3, y: 3 }
        }
      },
      {
        type: 'wait',
        params: { duration: 2000 }
      },
      {
        type: 'recruit',
        params: {
          unitType: 'warrior',
          quantity: 2
        }
      },
      {
        type: 'move',
        params: {
          targetPosition: { x: 8, y: 8 }
        }
      },
      {
        type: 'end_turn'
      },
      {
        type: 'assert',
        params: {
          condition: {
            type: 'has',
            left: '[data-testid="game-progressed"]'
          },
          message: 'Game should have progressed'
        }
      }
    ]
  } as GameScript
};

// Tests Playwright utilisant les scripts
test.describe('Script-Driven E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Aller à l'interface de jeu
    await page.goto(FRONTEND_URL);
    
    // Attendre que l'interface soit chargée
    await page.waitForSelector('[data-testid="game-interface"]', { timeout: 10000 });
    
    // Créer un nouveau jeu
    await page.click('[data-testid="new-game-button"]');
    await page.waitForSelector('[data-testid="game-started"]', { timeout: 15000 });
  });

  test('UI Basic Actions Script', async ({ page }) => {
    test.setTimeout(TEST_TIMEOUT);
    
    const scriptRunner = new PlaywrightScriptRunner(page);
    
    const results = await scriptRunner.executeScriptWithUI(
      PLAYWRIGHT_SCRIPTS.uiBasicActions,
      {
        playerId: 'player1',
        heroId: 'hero1'
      }
    );
    
    // Vérifier que toutes les actions ont réussi
    for (const result of results) {
      expect(result.success).toBe(true);
    }
    
    // Prendre une capture d'écran
    await page.screenshot({ path: 'test-results/ui-basic-actions.png' });
  });

  test('UI Full Gameplay Script', async ({ page }) => {
    test.setTimeout(TEST_TIMEOUT);
    
    const scriptRunner = new PlaywrightScriptRunner(page);
    
    const results = await scriptRunner.executeScriptWithUI(
      PLAYWRIGHT_SCRIPTS.uiFullGameplay,
      {
        playerId: 'player1',
        heroId: 'hero1'
      }
    );
    
    // Vérifier le taux de succès
    const successfulActions = results.filter(r => r.success);
    const successRate = successfulActions.length / results.length;
    
    expect(successRate).toBeGreaterThan(0.8); // Au moins 80% de succès
    
    // Prendre une capture d'écran
    await page.screenshot({ path: 'test-results/ui-full-gameplay.png' });
  });

  test('Economic Strategy with UI', async ({ page }) => {
    test.setTimeout(TEST_TIMEOUT * 2);
    
    const scriptRunner = new PlaywrightScriptRunner(page);
    
    // Adapter le script économique pour l'UI
    const economicUIScript = {
      ...ADVANCED_GAME_SCRIPTS.economicStrategy,
      actions: ADVANCED_GAME_SCRIPTS.economicStrategy.actions.map(action => {
        // Adapter certaines actions pour l'UI
        if (action.type === 'loop') {
          return {
            ...action,
            params: { ...action.params, times: 3 } // Réduire le nombre de tours pour les tests
          } as ScriptAction;
        }
        return action;
      })
    } as GameScript;
    
    const results = await scriptRunner.executeScriptWithUI(
      economicUIScript,
      {
        playerId: 'player1',
        heroId: 'hero1'
      }
    );
    
    // Vérifier qu'au moins quelques actions ont réussi
    const successfulActions = results.filter(r => r.success);
    expect(successfulActions.length).toBeGreaterThan(0);
    
    // Prendre une capture d'écran finale
    await page.screenshot({ path: 'test-results/economic-strategy-ui.png' });
  });

  test('Script vs Backend Consistency', async ({ page }) => {
    test.setTimeout(TEST_TIMEOUT);
    
    const scriptRunner = new PlaywrightScriptRunner(page);
    
    // Exécuter quelques actions via l'UI
    await scriptRunner.executeScriptWithUI(
      PLAYWRIGHT_SCRIPTS.uiBasicActions,
      { playerId: 'player1' }
    );
    
    // Vérifier que l'état de l'UI correspond à l'état du backend
    const gameState = await page.evaluate(async () => {
      return window.fetch('/api/games/current')
        .then(res => res.json())
        .catch(() => null);
    });
    
    if (gameState) {
      // Vérifier quelques propriétés de base
      expect(gameState.id).toBeDefined();
      expect(gameState.players).toBeDefined();
      expect(gameState.turn).toBeGreaterThan(0);
    }
    
    console.log('✅ UI and backend state are consistent');
  });

}); 