#!/usr/bin/env node

/**
 * 🎮 HEROES OF TIME - Game Simulation Tests
 * 
 * Tests de simulation de jeu complet utilisant le langage de script custom
 * Permet de tester des scénarios complexes et des stratégies complètes
 */

const { GameScriptEngine, EXAMPLE_SCRIPTS } = require('../🌐 frontend/src/services/gameScriptEngine');
const { ApiService } = require('../🌐 frontend/src/services/api');
const colors = require('colors');

// Configuration
const API_BASE = 'http://localhost:8080';
const VERBOSE = true;

// Utilitaires de logging
const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`.cyan),
  success: (msg) => console.log(`✅ ${msg}`.green),
  error: (msg) => console.log(`❌ ${msg}`.red),
  warn: (msg) => console.log(`⚠️  ${msg}`.yellow),
  debug: (msg) => VERBOSE && console.log(`🔍 ${msg}`.gray),
  script: (msg) => console.log(`📜 ${msg}`.blue),
  simulation: (msg) => console.log(`🎲 ${msg}`.magenta)
};

// Scripts de test avancés
const ADVANCED_GAME_SCRIPTS = {
  // Stratégie économique aggressive
  economicStrategy: {
    name: 'Economic Strategy',
    description: 'Focus on rapid economic expansion',
    variables: {
      playerId: 'player1',
      heroId: 'hero1',
      goldThreshold: 1000,
      turnLimit: 10
    },
    actions: [
      {
        type: 'log',
        params: { message: '🏛️ Starting economic expansion strategy' }
      },
      {
        type: 'loop',
        params: { times: '$turnLimit' },
        actions: [
          {
            type: 'log',
            params: { message: '💰 Turn $@turn - Gold: $@players.0.resources.gold' }
          },
          // Construire des bâtiments économiques
          {
            type: 'if',
            condition: {
              type: 'greater',
              left: '@players.0.resources.gold',
              right: 500
            },
            actions: [
              {
                type: 'build',
                params: {
                  buildingType: 'mine',
                  position: { x: 3, y: 3 }
                }
              }
            ]
          },
          {
            type: 'if',
            condition: {
              type: 'greater',
              left: '@players.0.resources.gold',
              right: 300
            },
            actions: [
              {
                type: 'build',
                params: {
                  buildingType: 'sawmill',
                  position: { x: 4, y: 4 }
                }
              }
            ]
          },
          // Explorer avec le héros
          {
            type: 'move',
            params: {
              heroId: '$heroId',
              targetPosition: { x: 5, y: 5 },
              relative: true
            }
          },
          // Collecter des ressources si disponibles
          {
            type: 'if',
            condition: {
              type: 'has',
              left: '@map.objects.0'
            },
            actions: [
              {
                type: 'collect',
                params: {
                  heroId: '$heroId',
                  objectId: '@map.objects.0.id'
                }
              }
            ]
          },
          {
            type: 'end_turn'
          },
          // Attendre la réponse du serveur
          {
            type: 'wait',
            params: { duration: 500 }
          }
        ]
      },
      {
        type: 'assert',
        params: {
          condition: {
            type: 'greater',
            left: '@players.0.resources.gold',
            right: '$goldThreshold'
          },
          message: 'Economic strategy should generate sufficient gold'
        }
      }
    ]
  },

  // Stratégie militaire agressive
  militaryStrategy: {
    name: 'Military Strategy',
    description: 'Focus on rapid military expansion and conquest',
    variables: {
      playerId: 'player1',
      heroId: 'hero1',
      enemyHeroId: 'hero2',
      battleTurns: 5
    },
    actions: [
      {
        type: 'log',
        params: { message: '⚔️ Starting military conquest strategy' }
      },
      // Phase de préparation
      {
        type: 'build',
        params: {
          buildingType: 'barracks',
          position: { x: 2, y: 2 }
        }
      },
      {
        type: 'wait',
        params: { duration: 1000 }
      },
      // Recruter des unités
      {
        type: 'recruit',
        params: {
          buildingId: '@players.0.buildings.0.id',
          unitType: 'warrior',
          quantity: 5
        }
      },
      {
        type: 'recruit',
        params: {
          buildingId: '@players.0.buildings.0.id',
          unitType: 'archer',
          quantity: 3
        }
      },
      // Phase de combat
      {
        type: 'loop',
        params: { times: '$battleTurns' },
        actions: [
          {
            type: 'log',
            params: { message: '🎯 Battle turn - Moving to engage enemy' }
          },
          // Se rapprocher de l'ennemi
          {
            type: 'move',
            params: {
              heroId: '$heroId',
              targetPosition: { x: 1, y: 0 },
              relative: true
            }
          },
          // Attaquer si à portée
          {
            type: 'if',
            condition: {
              type: 'less',
              left: '@players.0.heroes.0.position.x',
              right: 10
            },
            actions: [
              {
                type: 'attack',
                params: {
                  heroId: '$heroId',
                  targetId: '$enemyHeroId'
                }
              }
            ]
          },
          {
            type: 'end_turn'
          },
          {
            type: 'wait',
            params: { duration: 500 }
          }
        ]
      },
      // Vérifier les résultats de combat
      {
        type: 'assert',
        params: {
          condition: {
            type: 'greater',
            left: '@players.0.heroes.0.experience',
            right: 100
          },
          message: 'Hero should have gained experience from combat'
        }
      }
    ]
  },

  // Stratégie mixte équilibrée
  balancedStrategy: {
    name: 'Balanced Strategy',
    description: 'Balanced approach with economy, military, and exploration',
    variables: {
      playerId: 'player1',
      heroId: 'hero1',
      totalTurns: 8
    },
    actions: [
      {
        type: 'log',
        params: { message: '⚖️ Starting balanced strategy' }
      },
      {
        type: 'loop',
        params: { times: '$totalTurns' },
        actions: [
          {
            type: 'log',
            params: { message: 'Turn $@turn - Balanced approach' }
          },
          // Économie (tours pairs)
          {
            type: 'if',
            condition: {
              type: 'equals',
              left: { type: 'mod', left: '@turn', right: 2 },
              right: 0
            },
            actions: [
              {
                type: 'log',
                params: { message: '💰 Economic focus this turn' }
              },
              {
                type: 'build',
                params: {
                  buildingType: 'market',
                  position: { x: 6, y: 6 }
                }
              }
            ],
            else: [
              {
                type: 'log',
                params: { message: '⚔️ Military focus this turn' }
              },
              {
                type: 'build',
                params: {
                  buildingType: 'training_ground',
                  position: { x: 7, y: 7 }
                }
              }
            ]
          },
          // Exploration constante
          {
            type: 'move',
            params: {
              heroId: '$heroId',
              targetPosition: { x: 1, y: 1 },
              relative: true
            }
          },
          // Collecter des ressources
          {
            type: 'loop',
            params: { times: 3 },
            actions: [
              {
                type: 'if',
                condition: {
                  type: 'has',
                  left: '@map.objects.0'
                },
                actions: [
                  {
                    type: 'collect',
                    params: {
                      heroId: '$heroId',
                      objectId: '@map.objects.0.id'
                    }
                  }
                ]
              }
            ]
          },
          {
            type: 'end_turn'
          },
          {
            type: 'wait',
            params: { duration: 300 }
          }
        ]
      },
      // Vérifications finales
      {
        type: 'assert',
        params: {
          condition: {
            type: 'greater',
            left: '@players.0.buildings.length',
            right: 3
          },
          message: 'Should have built multiple buildings'
        }
      },
      {
        type: 'assert',
        params: {
          condition: {
            type: 'greater',
            left: '@players.0.heroes.0.level',
            right: 1
          },
          message: 'Hero should have leveled up'
        }
      }
    ]
  }
};

// Classe pour les tests de simulation
class GameSimulationTester {
  constructor() {
    this.scriptEngine = new GameScriptEngine();
    this.testResults = [];
    this.currentGameId = null;
  }

  // Exécute tous les tests de simulation
  async runAllSimulations() {
    log.info('🎮 Starting Game Simulation Tests');
    log.info('='.repeat(50));

    // Créer un nouveau jeu pour les tests
    await this.createTestGame();

    // Exécuter les scripts d'exemple
    await this.runExampleScripts();

    // Exécuter les scripts avancés
    await this.runAdvancedScripts();

    // Générer le rapport
    this.generateReport();
  }

  // Créer un jeu de test
  async createTestGame() {
    try {
      log.info('🎲 Creating test game...');
      
      const gameData = {
        scenario: 'conquest-classic',
        playerCount: 2,
        gameMode: 'async'
      };

      const game = await ApiService.createGame(gameData);
      this.currentGameId = game.id;
      
      log.success(`Game created with ID: ${game.id}`);
      
      return game;
    } catch (error) {
      log.error(`Failed to create test game: ${error.message}`);
      throw error;
    }
  }

  // Exécuter les scripts d'exemple
  async runExampleScripts() {
    log.info('📜 Running example scripts...');
    
    for (const [scriptName, script] of Object.entries(EXAMPLE_SCRIPTS)) {
      await this.runScript(scriptName, script);
    }
  }

  // Exécuter les scripts avancés
  async runAdvancedScripts() {
    log.info('🚀 Running advanced game scripts...');
    
    for (const [scriptName, script] of Object.entries(ADVANCED_GAME_SCRIPTS)) {
      await this.runScript(scriptName, script);
    }
  }

  // Exécuter un script individuel
  async runScript(scriptName, script) {
    log.script(`Running script: ${script.name}`);
    
    try {
      const context = {
        gameId: this.currentGameId,
        playerId: 'player1',
        heroId: 'hero1',
        variables: {},
        gameState: await ApiService.getGame(this.currentGameId)
      };

      const results = await this.scriptEngine.executeScript(script, context);
      
      const passed = results.every(r => r.success);
      const failedActions = results.filter(r => !r.success);
      
      if (passed) {
        log.success(`✅ ${script.name} - All actions executed successfully`);
      } else {
        log.error(`❌ ${script.name} - ${failedActions.length} actions failed`);
        failedActions.forEach(action => {
          log.error(`  - ${action.message}`);
        });
      }
      
      this.testResults.push({
        scriptName,
        scriptDescription: script.description,
        passed,
        results,
        failedActions: failedActions.length
      });
      
    } catch (error) {
      log.error(`❌ ${script.name} - Script execution failed: ${error.message}`);
      
      this.testResults.push({
        scriptName,
        scriptDescription: script.description,
        passed: false,
        error: error.message,
        failedActions: 1
      });
    }
  }

  // Générer le rapport de test
  generateReport() {
    const passedScripts = this.testResults.filter(r => r.passed);
    const failedScripts = this.testResults.filter(r => !r.passed);
    const passRate = (passedScripts.length / this.testResults.length * 100).toFixed(1);
    
    log.info('\n📊 GAME SIMULATION REPORT');
    log.info('='.repeat(60));
    log.info(`Total scripts: ${this.testResults.length}`);
    log.success(`Passed scripts: ${passedScripts.length}`);
    log.error(`Failed scripts: ${failedScripts.length}`);
    log.info(`Pass rate: ${passRate}%`);
    
    if (failedScripts.length > 0) {
      log.warn('\n🚨 Failed Scripts:');
      failedScripts.forEach(script => {
        log.error(`- ${script.scriptName}: ${script.error || `${script.failedActions} actions failed`}`);
      });
    }
    
    log.info('\n🎯 Script Execution Details:');
    this.testResults.forEach(script => {
      const status = script.passed ? '✅' : '❌';
      log.info(`${status} ${script.scriptName} - ${script.scriptDescription}`);
    });
    
    // Sauvegarder le rapport
    const report = {
      timestamp: new Date().toISOString(),
      gameId: this.currentGameId,
      totalScripts: this.testResults.length,
      passedScripts: passedScripts.length,
      failedScripts: failedScripts.length,
      passRate: parseFloat(passRate),
      results: this.testResults
    };
    
    require('fs').writeFileSync(
      'test-results/game-simulation-report.json',
      JSON.stringify(report, null, 2)
    );
    
    log.success('📄 Report saved to test-results/game-simulation-report.json');
  }
}

// Exécution principale
async function main() {
  try {
    // Vérifier la connexion au backend
    const response = await fetch(`${API_BASE}/actuator/health`);
    if (!response.ok) {
      throw new Error('Backend not available');
    }
    
    log.success('Backend connection OK');
    
    // Créer le répertoire de résultats
    const fs = require('fs');
    if (!fs.existsSync('test-results')) {
      fs.mkdirSync('test-results');
    }
    
    // Exécuter les tests de simulation
    const tester = new GameSimulationTester();
    await tester.runAllSimulations();
    
    log.success('🎉 All simulation tests completed!');
    
  } catch (error) {
    log.error(`Simulation tests failed: ${error.message}`);
    process.exit(1);
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  main();
}

module.exports = { GameSimulationTester, ADVANCED_GAME_SCRIPTS }; 