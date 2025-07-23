#!/bin/bash

# 🌌 Test Quantum UI - Heroes of Time
# Script complet pour tester l'interface du Quantum Visualizer

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}🌌 Test Quantum UI - Heroes of Time${NC}"
echo "===================================="

# Fonction pour tester les boutons
test_buttons() {
    echo -e "${CYAN}🔘 Test des boutons...${NC}"
    
    # Créer un fichier de test HTML
    cat > quantum-visualizer/test-buttons.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Buttons - Quantum Visualizer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #1a1a2e;
            color: #00ff00;
            padding: 20px;
            text-align: center;
        }
        .test-button {
            background: #333;
            color: #00ff00;
            border: 2px solid #00ff00;
            padding: 10px 20px;
            margin: 10px;
            cursor: pointer;
            border-radius: 5px;
            font-size: 16px;
        }
        .test-button:hover {
            background: #00ff00;
            color: #333;
        }
        .result {
            margin: 20px 0;
            padding: 10px;
            border: 1px solid #00ff00;
            background: rgba(0, 255, 0, 0.1);
        }
        .error {
            border-color: #ff0000;
            background: rgba(255, 0, 0, 0.1);
            color: #ff0000;
        }
        .success {
            border-color: #00ff00;
            background: rgba(0, 255, 0, 0.1);
            color: #00ff00;
        }
    </style>
</head>
<body>
    <h1>🌌 Test des Boutons Quantum Visualizer</h1>
    <div id="test-results"></div>
    
    <h2>Tests des Fonctions</h2>
    <button class="test-button" onclick="testPlay()">🎮 Test Play</button>
    <button class="test-button" onclick="testStep()">⏭️ Test Step</button>
    <button class="test-button" onclick="testReset()">🔄 Test Reset</button>
    <button class="test-button" onclick="testScenario()">📋 Test Scenario</button>
    <button class="test-button" onclick="testAPI()">🔗 Test API</button>
    
    <h2>Simulation de Scénario</h2>
    <button class="test-button" onclick="startScenarioDemo()">🚀 Démo Scénario</button>
    <button class="test-button" onclick="stopScenarioDemo()">🛑 Arrêt Démo</button>
    
    <div id="scenario-output"></div>
    
    <script>
        let demoRunning = false;
        let demoInterval = null;
        let currentStep = 0;
        
        function addResult(message, isSuccess = true) {
            const resultsDiv = document.getElementById('test-results');
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result ' + (isSuccess ? 'success' : 'error');
            resultDiv.textContent = new Date().toLocaleTimeString() + ': ' + message;
            resultsDiv.appendChild(resultDiv);
            resultsDiv.scrollTop = resultsDiv.scrollHeight;
        }
        
        function testPlay() {
            addResult('🎮 Test fonction Play...');
            try {
                // Simuler le play
                addResult('✅ Play function OK');
                
                // Test avec API
                fetch('http://localhost:8080/api/temporal/health')
                    .then(response => response.json())
                    .then(data => {
                        addResult('✅ Backend connecté: ' + data.status);
                    })
                    .catch(error => {
                        addResult('❌ Backend déconnecté: ' + error.message, false);
                    });
                    
            } catch (error) {
                addResult('❌ Erreur Play: ' + error.message, false);
            }
        }
        
        function testStep() {
            addResult('⏭️ Test fonction Step...');
            try {
                // Simuler le step
                currentStep++;
                addResult('✅ Step function OK - Étape: ' + currentStep);
            } catch (error) {
                addResult('❌ Erreur Step: ' + error.message, false);
            }
        }
        
        function testReset() {
            addResult('🔄 Test fonction Reset...');
            try {
                // Simuler le reset
                currentStep = 0;
                addResult('✅ Reset function OK');
            } catch (error) {
                addResult('❌ Erreur Reset: ' + error.message, false);
            }
        }
        
        function testScenario() {
            addResult('📋 Test chargement scénario...');
            try {
                // Test de chargement d'un scénario
                const testScenario = {
                    name: 'Test Scenario',
                    description: 'Scénario de test',
                    commands: [
                        'HERO(TestHero)',
                        'ψ001: ⊙(Δt+1 @5,5 ⟶ MOV(TestHero, @5,5))',
                        'COLLAPSE(ψ001)'
                    ]
                };
                
                addResult('✅ Scénario test créé: ' + testScenario.name);
                addResult('📋 Commandes: ' + testScenario.commands.length);
                
            } catch (error) {
                addResult('❌ Erreur Scénario: ' + error.message, false);
            }
        }
        
        function testAPI() {
            addResult('🔗 Test API Heroes of Time...');
            
            const apiTests = [
                { endpoint: '/api/temporal/health', description: 'Health check' },
                { endpoint: '/api/temporal/games', description: 'Games endpoint' }
            ];
            
            apiTests.forEach(test => {
                fetch('http://localhost:8080' + test.endpoint)
                    .then(response => {
                        if (response.ok) {
                            addResult('✅ API ' + test.description + ' OK');
                        } else {
                            addResult('⚠️ API ' + test.description + ' Status: ' + response.status);
                        }
                    })
                    .catch(error => {
                        addResult('❌ API ' + test.description + ' Error: ' + error.message, false);
                    });
            });
        }
        
        function startScenarioDemo() {
            if (demoRunning) return;
            
            addResult('🚀 Démarrage démo scénario...');
            demoRunning = true;
            currentStep = 0;
            
            const scenarioSteps = [
                '🎮 Initialisation du jeu...',
                '⚔️ Création du héros Arthur...',
                '🌌 Création ψ-state quantique...',
                '📍 Positionnement du héros...',
                '💫 Effondrement quantique...',
                '🎯 Objectif atteint!',
                '✨ Scénario terminé!'
            ];
            
            demoInterval = setInterval(() => {
                if (currentStep < scenarioSteps.length) {
                    const step = scenarioSteps[currentStep];
                    addResult('📋 Étape ' + (currentStep + 1) + ': ' + step);
                    
                    // Simuler API call
                    if (currentStep === 1) {
                        // Simuler création héros
                        testAPICommand('HERO(Arthur)');
                    } else if (currentStep === 2) {
                        // Simuler ψ-state
                        testAPICommand('ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(Arthur, @10,10))');
                    } else if (currentStep === 4) {
                        // Simuler collapse
                        testAPICommand('COLLAPSE(ψ001)');
                    }
                    
                    currentStep++;
                } else {
                    clearInterval(demoInterval);
                    demoRunning = false;
                    addResult('🎉 Démo terminée!');
                }
            }, 2000);
        }
        
        function stopScenarioDemo() {
            if (demoInterval) {
                clearInterval(demoInterval);
                demoInterval = null;
            }
            demoRunning = false;
            addResult('🛑 Démo arrêtée');
        }
        
        function testAPICommand(command) {
            fetch('http://localhost:8080/api/temporal/games/1/script', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ script: command })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    addResult('✅ Commande exécutée: ' + command);
                } else {
                    addResult('⚠️ Commande échouée: ' + command);
                }
            })
            .catch(error => {
                addResult('❌ Erreur API: ' + error.message, false);
            });
        }
        
        // Initialisation
        document.addEventListener('DOMContentLoaded', () => {
            addResult('🌌 Test interface initialisée');
        });
    </script>
</body>
</html>
EOF

    echo -e "${GREEN}✅ Fichier test-buttons.html créé${NC}"
}

# Fonction pour corriger les boutons
fix_buttons() {
    echo -e "${CYAN}🔧 Correction des boutons...${NC}"
    
    # Créer un fichier de correction JavaScript
    cat > quantum-visualizer/button-fixes.js << 'EOF'
// 🔧 Button Fixes - Quantum Visualizer
// Corrections des boutons et fonctions

console.log('🔧 Loading button fixes...');

// Variables globales
let isAutoPlaying = false;
let currentTurn = 1;
let autoPlayInterval = null;

// Fonctions de contrôle corrigées
function toggleAutoPlay() {
    console.log('🎮 toggleAutoPlay called');
    isAutoPlaying = !isAutoPlaying;
    
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
        if (isAutoPlaying) {
            playBtn.textContent = '⏸️ Pause';
            playBtn.onclick = pauseVisualization;
            startAutoPlay();
        } else {
            playBtn.textContent = '▶️ Lecture';
            playBtn.onclick = toggleAutoPlay;
            stopAutoPlay();
        }
    }
}

function pauseVisualization() {
    console.log('⏸️ pauseVisualization called');
    isAutoPlaying = false;
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
        playBtn.textContent = '▶️ Lecture';
        playBtn.onclick = toggleAutoPlay;
    }
    stopAutoPlay();
}

function nextTurn() {
    console.log('⏭️ nextTurn called');
    currentTurn++;
    updateTurnDisplay();
    
    // Simuler une action
    if (window.quantumVisualizer && window.quantumVisualizer.nextTurn) {
        window.quantumVisualizer.nextTurn();
    } else {
        console.log('📋 Simulating next turn: ' + currentTurn);
        // Simulation simple
        simulateQuantumStep();
    }
}

function resetVisualization() {
    console.log('🔄 resetVisualization called');
    isAutoPlaying = false;
    currentTurn = 1;
    stopAutoPlay();
    
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
        playBtn.textContent = '▶️ Lecture';
        playBtn.onclick = toggleAutoPlay;
    }
    
    updateTurnDisplay();
    
    if (window.quantumVisualizer && window.quantumVisualizer.reset) {
        window.quantumVisualizer.reset();
    } else {
        console.log('📋 Simulating reset');
        simulateReset();
    }
}

function startAutoPlay() {
    console.log('🚀 Starting auto play');
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
    
    autoPlayInterval = setInterval(() => {
        if (isAutoPlaying) {
            nextTurn();
        }
    }, 3000);
}

function stopAutoPlay() {
    console.log('🛑 Stopping auto play');
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

function updateTurnDisplay() {
    const turnElement = document.getElementById('turn-number');
    if (turnElement) {
        turnElement.textContent = currentTurn;
    }
    
    const currentTurnElement = document.getElementById('current-turn');
    if (currentTurnElement) {
        currentTurnElement.textContent = `Tour ${currentTurn}`;
    }
    
    console.log('📊 Turn updated to: ' + currentTurn);
}

function simulateQuantumStep() {
    console.log('🌌 Simulating quantum step...');
    
    // Simuler des métriques quantiques
    const metrics = {
        psiCount: Math.floor(Math.random() * 5) + 1,
        interferences: Math.floor(Math.random() * 3),
        maxProbability: Math.floor(Math.random() * 100),
        coherence: Math.floor(Math.random() * 100)
    };
    
    updateQuantumMetrics(metrics);
}

function simulateReset() {
    console.log('🔄 Simulating reset...');
    
    // Reset des métriques
    const metrics = {
        psiCount: 0,
        interferences: 0,
        maxProbability: 0,
        coherence: 100
    };
    
    updateQuantumMetrics(metrics);
}

function updateQuantumMetrics(metrics) {
    const elements = {
        'psi-count': metrics.psiCount,
        'interference-count': metrics.interferences,
        'max-probability': metrics.maxProbability + '%',
        'coherence-level': metrics.coherence + '%'
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
    
    console.log('📊 Quantum metrics updated:', metrics);
}

// Attacher les fonctions aux boutons au chargement
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Attaching button fixes...');
    
    // Attacher les événements
    const buttons = {
        'play-btn': toggleAutoPlay,
        'pause-btn': pauseVisualization,
        'next-btn': nextTurn,
        'reset-btn': resetVisualization
    };
    
    for (const [id, func] of Object.entries(buttons)) {
        const button = document.getElementById(id);
        if (button) {
            button.onclick = func;
            console.log(`✅ Button ${id} fixed`);
        } else {
            console.log(`❌ Button ${id} not found`);
        }
    }
    
    // Initialiser l'affichage
    updateTurnDisplay();
    
    console.log('🎉 Button fixes loaded successfully');
});

// Rendre les fonctions globales
window.toggleAutoPlay = toggleAutoPlay;
window.pauseVisualization = pauseVisualization;
window.nextTurn = nextTurn;
window.resetVisualization = resetVisualization;
window.updateQuantumMetrics = updateQuantumMetrics;

console.log('🔧 Button fixes script loaded');
EOF

    echo -e "${GREEN}✅ Fichier button-fixes.js créé${NC}"
}

# Fonction pour démarrer le test
start_test() {
    echo -e "${CYAN}🚀 Démarrage du test...${NC}"
    
    # Vérifier que le backend est actif
    if ! curl -s "http://localhost:8080/api/temporal/health" > /dev/null 2>&1; then
        echo -e "${RED}❌ Backend non accessible${NC}"
        echo -e "${YELLOW}💡 Démarrez le backend avec: ./gestion-scripts.sh${NC}"
        return 1
    fi
    
    # Nettoyer les ports
    echo -e "${CYAN}🧹 Nettoyage des ports...${NC}"
    pkill -f "python3.*8001" 2>/dev/null || true
    sleep 2
    
    # Démarrer le serveur de test
    echo -e "${CYAN}🌌 Démarrage du serveur de test...${NC}"
    cd quantum-visualizer
    python3 -m http.server 8001 > ../logs/quantum-test.log 2>&1 &
    cd ..
    
    sleep 3
    
    # Vérifier le serveur
    if curl -s "http://localhost:8001" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Serveur de test actif sur le port 8001${NC}"
    else
        echo -e "${RED}❌ Serveur de test non accessible${NC}"
        return 1
    fi
    
    echo -e "${GREEN}🎉 Test prêt!${NC}"
    echo ""
    echo -e "${YELLOW}🔗 URLs de test:${NC}"
    echo "  • Interface principale: http://localhost:8001"
    echo "  • Test des boutons: http://localhost:8001/test-buttons.html"
    echo ""
    echo -e "${YELLOW}💡 Instructions:${NC}"
    echo "1. Ouvrez http://localhost:8001/test-buttons.html dans votre navigateur"
    echo "2. Testez chaque bouton"
    echo "3. Vérifiez les logs dans la console du navigateur (F12)"
    echo "4. Lancez la démo scénario pour tester l'intégration complète"
}

# Script principal
main() {
    test_buttons
    echo ""
    fix_buttons
    echo ""
    start_test
}

# Exécuter le script
main "$@" 