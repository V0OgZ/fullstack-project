/**
 * 🔮 API Test Backend Services - Heroes of Time
 * Invocation d'un Cristal de Diagnostic Omniscient
 * Ce cristal teste TOUS les services du backend
 */

class BackendAPITester {
    constructor(baseUrl = 'http://localhost:8080') {
        this.baseUrl = baseUrl;
        this.results = {};
        this.services = this.defineAllServices();
    }

    /**
     * 📜 Définition de TOUS les services backend connus
     */
    defineAllServices() {
        return {
            // Services de base
            health: {
                endpoint: '/api/health',
                method: 'GET',
                description: '❤️ Santé du serveur'
            },
            
            // World State
            worldState: {
                endpoint: '/api/world-state/current',
                method: 'GET',
                description: '🌍 État actuel du monde'
            },
            
            // Heroes & Units
            heroes: {
                endpoint: '/api/heroes',
                method: 'GET',
                description: '⚔️ Liste des héros'
            },
            heroCreate: {
                endpoint: '/api/heroes',
                method: 'POST',
                description: '🆕 Créer un héros',
                body: {
                    name: 'TestHero',
                    type: 'warrior',
                    stats: { hp: 100, attack: 20 }
                }
            },
            units: {
                endpoint: '/api/units',
                method: 'GET',
                description: '👥 Liste des unités'
            },
            unitsHealth: {
                endpoint: '/api/units/health',
                method: 'GET',
                description: '💚 Santé des unités'
            },
            
            // Quantum Services
            quantumState: {
                endpoint: '/api/quantum/state',
                method: 'GET',
                description: '🌀 État quantique'
            },
            quantumSuperposition: {
                endpoint: '/api/quantum/superposition',
                method: 'POST',
                description: '🎭 Créer superposition',
                body: {
                    states: ['state1', 'state2', 'state3']
                }
            },
            quantumCollapse: {
                endpoint: '/api/quantum/collapse',
                method: 'POST',
                description: '💥 Collapse quantique',
                body: {
                    superpositionId: 'test-id'
                }
            },
            
            // ER=EPR Bridge
            erEprStatus: {
                endpoint: '/api/er-epr/status',
                method: 'GET',
                description: '🌉 Status pont ER=EPR'
            },
            erEprShoot: {
                endpoint: '/api/er-epr/shoot',
                method: 'POST',
                description: '🔫 Tir à travers le pont',
                body: {
                    origin: { x: 100, y: 100 },
                    target: { x: 200, y: 200 }
                }
            },
            
            // Timeline Services
            timelines: {
                endpoint: '/api/timelines',
                method: 'GET',
                description: '⏰ Timelines actives'
            },
            timelineCreate: {
                endpoint: '/api/timelines/create',
                method: 'POST',
                description: '🆕 Créer timeline',
                body: {
                    name: 'TestTimeline',
                    divergencePoint: Date.now()
                }
            },
            
            // Map & Resources
            mapData: {
                endpoint: '/api/map/current',
                method: 'GET',
                description: '🗺️ Données de la carte'
            },
            resources: {
                endpoint: '/api/resources',
                method: 'GET',
                description: '💎 Ressources disponibles'
            },
            
            // Buildings
            buildings: {
                endpoint: '/api/buildings',
                method: 'GET',
                description: '🏰 Bâtiments'
            },
            buildingCreate: {
                endpoint: '/api/buildings/create',
                method: 'POST',
                description: '🏗️ Construire bâtiment',
                body: {
                    type: 'castle',
                    position: { x: 50, y: 50 }
                }
            },
            
            // Combat
            combatStart: {
                endpoint: '/api/combat/start',
                method: 'POST',
                description: '⚔️ Démarrer combat',
                body: {
                    attacker: 'hero1',
                    defender: 'hero2'
                }
            },
            combatStatus: {
                endpoint: '/api/combat/status',
                method: 'GET',
                description: '🎯 Status du combat'
            },
            
            // AI Services
            aiDecision: {
                endpoint: '/api/ai/decision',
                method: 'POST',
                description: '🤖 Décision IA',
                body: {
                    playerId: 'ai-player-1',
                    gameState: {}
                }
            },
            quantumAI: {
                endpoint: '/api/quantum-ai/tactical',
                method: 'POST',
                description: '🧠 IA Quantique Tactique',
                body: {
                    situation: 'combat',
                    options: ['attack', 'defend', 'retreat']
                }
            },
            
            // Artifacts & Items
            artifacts: {
                endpoint: '/api/artifacts',
                method: 'GET',
                description: '🏺 Artefacts'
            },
            items: {
                endpoint: '/api/items',
                method: 'GET',
                description: '📦 Objets'
            },
            
            // Spells
            spells: {
                endpoint: '/api/spells',
                method: 'GET',
                description: '✨ Sorts disponibles'
            },
            castSpell: {
                endpoint: '/api/spells/cast',
                method: 'POST',
                description: '🪄 Lancer un sort',
                body: {
                    spellId: 'fireball',
                    target: { x: 100, y: 100 }
                }
            },
            
            // Scenarios
            scenarios: {
                endpoint: '/api/scenarios',
                method: 'GET',
                description: '📚 Scénarios disponibles'
            },
            scenarioStart: {
                endpoint: '/api/scenarios/start',
                method: 'POST',
                description: '🎬 Démarrer scénario',
                body: {
                    scenarioId: 'tutorial'
                }
            },
            
            // Multiplayer
            gamesList: {
                endpoint: '/api/games',
                method: 'GET',
                description: '🎮 Parties en cours'
            },
            gameCreate: {
                endpoint: '/api/games/create',
                method: 'POST',
                description: '🆕 Créer partie',
                body: {
                    name: 'Test Game',
                    maxPlayers: 4
                }
            },
            
            // Save/Load
            saves: {
                endpoint: '/api/saves',
                method: 'GET',
                description: '💾 Sauvegardes'
            },
            saveGame: {
                endpoint: '/api/saves/create',
                method: 'POST',
                description: '💾 Sauvegarder',
                body: {
                    saveName: 'TestSave',
                    gameState: {}
                }
            },
            
            // GRUT Special Services
            grutVision: {
                endpoint: '/api/grut/vision',
                method: 'GET',
                description: '👁️ Vision GRUT'
            },
            grutOntology: {
                endpoint: '/api/grut/ontology',
                method: 'GET',
                description: '🧬 Ontologie GRUT'
            },
            
            // Memory Services
            memoryShare: {
                endpoint: '/api/memory/share',
                method: 'POST',
                description: '🧠 Partage mémoire',
                body: {
                    memory: 'Test memory content',
                    type: 'temporal'
                }
            },
            
            // Evolution System
            evolution: {
                endpoint: '/api/evolution/status',
                method: 'GET',
                description: '📈 Status évolution'
            },
            evolve: {
                endpoint: '/api/evolution/trigger',
                method: 'POST',
                description: '🌟 Déclencher évolution',
                body: {
                    entityId: 'test-entity'
                }
            }
        };
    }

    /**
     * 🔮 Tester un service unique
     */
    async testService(serviceName, serviceConfig) {
        const startTime = Date.now();
        const result = {
            name: serviceName,
            description: serviceConfig.description,
            endpoint: serviceConfig.endpoint,
            method: serviceConfig.method,
            status: 'pending',
            statusCode: null,
            responseTime: 0,
            data: null,
            error: null
        };

        try {
            const options = {
                method: serviceConfig.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            if (serviceConfig.body && serviceConfig.method !== 'GET') {
                options.body = JSON.stringify(serviceConfig.body);
            }

            const response = await fetch(this.baseUrl + serviceConfig.endpoint, options);
            result.statusCode = response.status;
            result.responseTime = Date.now() - startTime;

            if (response.ok) {
                result.status = '✅ SUCCESS';
                try {
                    result.data = await response.json();
                } catch (e) {
                    result.data = await response.text();
                }
            } else {
                result.status = '❌ FAILED';
                result.error = `HTTP ${response.status}: ${response.statusText}`;
            }
        } catch (error) {
            result.status = '💀 ERROR';
            result.error = error.message;
            result.responseTime = Date.now() - startTime;
        }

        this.results[serviceName] = result;
        return result;
    }

    /**
     * 🌀 Tester TOUS les services
     */
    async testAllServices() {
        console.log('🔮 Début des tests de TOUS les services backend...\n');
        
        const results = [];
        for (const [serviceName, serviceConfig] of Object.entries(this.services)) {
            console.log(`Testing ${serviceConfig.description}...`);
            const result = await this.testService(serviceName, serviceConfig);
            results.push(result);
            
            // Petit délai pour ne pas surcharger le serveur
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return this.generateReport(results);
    }

    /**
     * 📊 Générer un rapport complet
     */
    generateReport(results) {
        const totalServices = results.length;
        const successCount = results.filter(r => r.status === '✅ SUCCESS').length;
        const failedCount = results.filter(r => r.status === '❌ FAILED').length;
        const errorCount = results.filter(r => r.status === '💀 ERROR').length;
        
        const report = {
            summary: {
                total: totalServices,
                success: successCount,
                failed: failedCount,
                error: errorCount,
                successRate: ((successCount / totalServices) * 100).toFixed(2) + '%',
                timestamp: new Date().toISOString()
            },
            services: results,
            workingEndpoints: results
                .filter(r => r.status === '✅ SUCCESS')
                .map(r => ({
                    endpoint: r.endpoint,
                    method: r.method,
                    description: r.description
                })),
            failedEndpoints: results
                .filter(r => r.status !== '✅ SUCCESS')
                .map(r => ({
                    endpoint: r.endpoint,
                    method: r.method,
                    description: r.description,
                    error: r.error
                }))
        };

        console.log('\n📊 RAPPORT FINAL:');
        console.log('================');
        console.log(`✅ Services fonctionnels: ${successCount}/${totalServices}`);
        console.log(`❌ Services en échec: ${failedCount}/${totalServices}`);
        console.log(`💀 Erreurs de connexion: ${errorCount}/${totalServices}`);
        console.log(`📈 Taux de succès: ${report.summary.successRate}`);

        return report;
    }

    /**
     * 🎯 Obtenir uniquement les endpoints qui marchent
     */
    getWorkingEndpoints() {
        return Object.entries(this.results)
            .filter(([_, result]) => result.status === '✅ SUCCESS')
            .map(([name, result]) => ({
                name,
                endpoint: result.endpoint,
                method: result.method,
                description: result.description
            }));
    }
}

// 🚀 Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackendAPITester;
} else {
    window.BackendAPITester = BackendAPITester;
}

// 🎮 Fonction utilitaire pour lancer les tests
async function runBackendTests() {
    const tester = new BackendAPITester();
    const report = await tester.testAllServices();
    return report;
} 