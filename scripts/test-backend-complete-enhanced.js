#!/usr/bin/env node

/**
 * 🎮 HEROES OF TIME - Complete Backend API Testing Suite
 * 
 * Ce script teste toutes les actions backend et vérifie les changements d'état
 * Il simule des jeux complets pour identifier ce qui fonctionne et ce qui reste à implémenter
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const colors = require('colors');

// Configuration
const API_BASE = 'http://localhost:8080';
const TEST_TIMEOUT = 15000;
const VERBOSE = true;

// Utilitaires de logging
const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`.cyan),
  success: (msg) => console.log(`✅ ${msg}`.green),
  error: (msg) => console.log(`❌ ${msg}`.red),
  warn: (msg) => console.log(`⚠️  ${msg}`.yellow),
  debug: (msg) => VERBOSE && console.log(`🔍 ${msg}`.gray),
  action: (msg) => console.log(`🎯 ${msg}`.magenta),
  state: (msg) => console.log(`🏛️  ${msg}`.blue)
};

// Classe pour les tests API
class BackendAPITester {
  constructor() {
    this.baseUrl = API_BASE;
    this.currentGameId = null;
    this.gameState = null;
    this.testResults = {
      passed: 0,
      failed: 0,
      total: 0,
      details: []
    };
  }

  // Méthode utilitaire pour les requêtes HTTP
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    log.debug(`Making request: ${options.method || 'GET'} ${url}`);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      timeout: TEST_TIMEOUT,
      ...options
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(data)}`);
    }
    
    return data;
  }

  // Test une action et vérifie les changements d'état
  async testAction(actionName, actionFn, stateVerifier) {
    log.action(`Testing ${actionName}...`);
    this.testResults.total++;

    try {
      // Capturer l'état avant l'action
      const stateBefore = await this.getGameState();
      log.debug(`State before: ${JSON.stringify(stateBefore, null, 2)}`);

      // Exécuter l'action
      const actionResult = await actionFn();
      log.debug(`Action result: ${JSON.stringify(actionResult, null, 2)}`);

      // Capturer l'état après l'action
      const stateAfter = await this.getGameState();
      log.debug(`State after: ${JSON.stringify(stateAfter, null, 2)}`);

      // Vérifier les changements d'état
      const verificationResult = stateVerifier ? 
        await stateVerifier(stateBefore, stateAfter, actionResult) : 
        { success: true, message: 'No state verification' };

      if (verificationResult.success) {
        log.success(`${actionName} - ${verificationResult.message}`);
        this.testResults.passed++;
        this.testResults.details.push({
          action: actionName,
          status: 'PASSED',
          message: verificationResult.message,
          stateBefore: stateBefore,
          stateAfter: stateAfter,
          result: actionResult
        });
      } else {
        throw new Error(verificationResult.message);
      }

    } catch (error) {
      log.error(`${actionName} - ${error.message}`);
      this.testResults.failed++;
      this.testResults.details.push({
        action: actionName,
        status: 'FAILED',
        message: error.message,
        error: error.stack
      });
    }
  }

  // Récupère l'état actuel du jeu
  async getGameState() {
    if (!this.currentGameId) {
      throw new Error('No current game ID');
    }
    
    const game = await this.makeRequest(`/api/games/${this.currentGameId}`);
    this.gameState = game;
    return game;
  }

  // 🎯 Tests des actions de base
  
  async testCreateGame() {
    return this.testAction('CREATE_GAME', async () => {
      const gameData = {
        scenario: 'conquest-classic',
        playerCount: 2,
        gameMode: 'async'
      };
      
      const game = await this.makeRequest('/api/games', {
        method: 'POST',
        body: JSON.stringify(gameData)
      });
      
      this.currentGameId = game.id;
      return game;
    }, (stateBefore, stateAfter, result) => {
      if (!result.id) {
        return { success: false, message: 'Game ID not created' };
      }
      if (!result.players || result.players.length !== 2) {
        return { success: false, message: 'Incorrect player count' };
      }
      if (!result.map || !result.map.length) {
        return { success: false, message: 'Map not generated' };
      }
      return { success: true, message: `Game created with ID: ${result.id}` };
    });
  }

  async testMoveHero() {
    return this.testAction('MOVE_HERO', async () => {
      const game = await this.getGameState();
      const hero = game.players[0].heroes[0];
      
      const moveData = {
        gameId: this.currentGameId,
        heroId: hero.id,
        targetPosition: { x: hero.position.x + 1, y: hero.position.y }
      };
      
      return await this.makeRequest(`/api/games/${this.currentGameId}/move-hero`, {
        method: 'POST',
        body: JSON.stringify(moveData)
      });
    }, (stateBefore, stateAfter, result) => {
      const heroBefore = stateBefore.players[0].heroes[0];
      const heroAfter = stateAfter.players[0].heroes[0];
      
      if (heroBefore.position.x === heroAfter.position.x) {
        return { success: false, message: 'Hero did not move' };
      }
      
      if (heroBefore.movementPoints <= heroAfter.movementPoints) {
        return { success: false, message: 'Movement points not decreased' };
      }
      
      return { success: true, message: `Hero moved from (${heroBefore.position.x},${heroBefore.position.y}) to (${heroAfter.position.x},${heroAfter.position.y})` };
    });
  }

  async testEndTurn() {
    return this.testAction('END_TURN', async () => {
      return await this.makeRequest(`/api/games/${this.currentGameId}/end-turn`, {
        method: 'POST',
        body: JSON.stringify({ playerId: 'player1' })
      });
    }, (stateBefore, stateAfter, result) => {
      if (stateBefore.turn >= stateAfter.turn) {
        return { success: false, message: 'Turn number did not increase' };
      }
      
      if (stateBefore.currentPlayerId === stateAfter.currentPlayerId) {
        return { success: false, message: 'Current player did not change' };
      }
      
      return { success: true, message: `Turn ${stateBefore.turn} -> ${stateAfter.turn}, Player ${stateBefore.currentPlayerId} -> ${stateAfter.currentPlayerId}` };
    });
  }

  async testBuildStructure() {
    return this.testAction('BUILD_STRUCTURE', async () => {
      const game = await this.getGameState();
      const player = game.players[0];
      
      const buildData = {
        gameId: this.currentGameId,
        playerId: player.id,
        buildingType: 'barracks',
        position: { x: 5, y: 5 }
      };
      
      return await this.makeRequest(`/api/games/${this.currentGameId}/buildings/construct`, {
        method: 'POST',
        body: JSON.stringify(buildData)
      });
    }, (stateBefore, stateAfter, result) => {
      const playerBefore = stateBefore.players[0];
      const playerAfter = stateAfter.players[0];
      
      if (playerBefore.buildings.length >= playerAfter.buildings.length) {
        return { success: false, message: 'Building count did not increase' };
      }
      
      if (playerBefore.resources.gold <= playerAfter.resources.gold) {
        return { success: false, message: 'Gold cost not deducted' };
      }
      
      return { success: true, message: `Building constructed, gold: ${playerBefore.resources.gold} -> ${playerAfter.resources.gold}` };
    });
  }

  async testRecruitUnits() {
    return this.testAction('RECRUIT_UNITS', async () => {
      const game = await this.getGameState();
      const player = game.players[0];
      const building = player.buildings.find(b => b.type === 'barracks');
      
      if (!building) {
        throw new Error('No barracks available for recruitment');
      }
      
      const recruitData = {
        gameId: this.currentGameId,
        buildingId: building.id,
        unitType: 'warrior',
        quantity: 2
      };
      
      return await this.makeRequest(`/api/games/${this.currentGameId}/buildings/${building.id}/recruit`, {
        method: 'POST',
        body: JSON.stringify(recruitData)
      });
    }, (stateBefore, stateAfter, result) => {
      const playerBefore = stateBefore.players[0];
      const playerAfter = stateAfter.players[0];
      
      // Vérifier que des unités ont été ajoutées
      const unitsBefore = playerBefore.units || [];
      const unitsAfter = playerAfter.units || [];
      
      if (unitsBefore.length >= unitsAfter.length) {
        return { success: false, message: 'Units were not recruited' };
      }
      
      return { success: true, message: `Recruited ${unitsAfter.length - unitsBefore.length} units` };
    });
  }

  async testCombatAction() {
    return this.testAction('COMBAT_ACTION', async () => {
      const game = await this.getGameState();
      const attacker = game.players[0].heroes[0];
      const target = game.players[1].heroes[0];
      
      const combatData = {
        attackerId: attacker.id,
        targetId: target.id
      };
      
      return await this.makeRequest(`/api/heroes/${attacker.id}/attack`, {
        method: 'POST',
        body: JSON.stringify(combatData)
      });
    }, (stateBefore, stateAfter, result) => {
      const attackerBefore = stateBefore.players[0].heroes[0];
      const attackerAfter = stateAfter.players[0].heroes[0];
      const targetBefore = stateBefore.players[1].heroes[0];
      const targetAfter = stateAfter.players[1].heroes[0];
      
      if (targetBefore.health <= targetAfter.health) {
        return { success: false, message: 'Target health did not decrease' };
      }
      
      if (attackerBefore.experience >= attackerAfter.experience) {
        return { success: false, message: 'Attacker did not gain experience' };
      }
      
      return { success: true, message: `Combat: ${targetBefore.health} -> ${targetAfter.health} HP, +${attackerAfter.experience - attackerBefore.experience} XP` };
    });
  }

  // 🏛️ Tests de simulation de jeu complet
  
  async simulateCompleteGame() {
    log.info('🎮 Starting complete game simulation...');
    
    // 1. Créer le jeu
    await this.testCreateGame();
    
    // 2. Simuler plusieurs tours
    for (let turn = 1; turn <= 3; turn++) {
      log.info(`🔄 Turn ${turn}...`);
      
      // Actions du joueur 1
      await this.testMoveHero();
      
      if (turn === 2) {
        await this.testBuildStructure();
      }
      
      if (turn === 3) {
        await this.testRecruitUnits();
      }
      
      // Fin du tour
      await this.testEndTurn();
      
      // Actions du joueur 2
      await this.testMoveHero();
      
      if (turn >= 2) {
        await this.testCombatAction();
      }
      
      // Fin du tour
      await this.testEndTurn();
    }
    
    log.info('🎯 Complete game simulation finished!');
  }

  // 📊 Rapport de test
  generateReport() {
    const passRate = (this.testResults.passed / this.testResults.total * 100).toFixed(1);
    
    log.info('\n📊 TEST REPORT');
    log.info('='.repeat(50));
    log.info(`Total tests: ${this.testResults.total}`);
    log.success(`Passed: ${this.testResults.passed}`);
    log.error(`Failed: ${this.testResults.failed}`);
    log.info(`Pass rate: ${passRate}%`);
    
    if (this.testResults.failed > 0) {
      log.warn('\n🚨 Failed tests:');
      this.testResults.details
        .filter(d => d.status === 'FAILED')
        .forEach(test => {
          log.error(`- ${test.action}: ${test.message}`);
        });
    }
    
    log.info('\n🎯 Implementation Status:');
    this.testResults.details.forEach(test => {
      const status = test.status === 'PASSED' ? '✅' : '❌';
      log.info(`${status} ${test.action}`);
    });
    
    return this.testResults;
  }
}

// 🚀 Exécution principale
async function main() {
  try {
    log.info('🎮 Heroes of Time - Backend API Testing Suite');
    log.info('=' .repeat(60));
    
    // Vérifier la connexion au backend
    const response = await fetch(`${API_BASE}/actuator/health`);
    if (!response.ok) {
      throw new Error('Backend not available');
    }
    
    log.success('Backend connection OK');
    
    // Créer le testeur
    const tester = new BackendAPITester();
    
    // Simuler un jeu complet
    await tester.simulateCompleteGame();
    
    // Générer le rapport
    const report = tester.generateReport();
    
    // Sauvegarder le rapport
    require('fs').writeFileSync(
      'test-results/backend-api-report.json',
      JSON.stringify(report, null, 2)
    );
    
    log.success('Report saved to test-results/backend-api-report.json');
    
    // Code de sortie
    process.exit(report.failed > 0 ? 1 : 0);
    
  } catch (error) {
    log.error(`Test suite failed: ${error.message}`);
    process.exit(1);
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  main();
}

module.exports = { BackendAPITester }; 