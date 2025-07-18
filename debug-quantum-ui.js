// 🔧 Debug Quantum UI - Heroes of Time
// Script pour tester les boutons et fonctions du Quantum Visualizer

console.log('🔧 Debug Quantum UI - Starting...');

// Variables globales pour le debug
let debugMode = true;
let testScenario = null;

// Fonction pour logger avec timestamp
function debugLog(message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] 🔧 ${message}`);
}

// Test des fonctions de base
function testBasicFunctions() {
    debugLog('Testing basic functions...');
    
    // Test 1: Vérifier les boutons
    const buttons = {
        'play-btn': document.getElementById('play-btn'),
        'pause-btn': document.getElementById('pause-btn'),
        'next-btn': document.getElementById('next-btn'),
        'reset-btn': document.getElementById('reset-btn')
    };
    
    for (const [id, button] of Object.entries(buttons)) {
        if (button) {
            debugLog(`✅ Button ${id} found`);
            button.style.border = '2px solid #00ff00';
        } else {
            debugLog(`❌ Button ${id} NOT found`);
        }
    }
    
    // Test 2: Vérifier les fonctions
    const functions = ['toggleAutoPlay', 'pauseVisualization', 'nextTurn', 'resetVisualization'];
    
    for (const funcName of functions) {
        if (typeof window[funcName] === 'function') {
            debugLog(`✅ Function ${funcName} exists`);
        } else {
            debugLog(`❌ Function ${funcName} NOT found`);
        }
    }
}

// Test des scénarios
function testScenarios() {
    debugLog('Testing scenarios...');
    
    // Test des fichiers de scénarios
    const scenarioFiles = [
        'scenarios/temporal-duel.json',
        'scenarios/quantum-fortress.json',
        'scenarios/multiverse-conflict.json'
    ];
    
    for (const file of scenarioFiles) {
        fetch(file)
            .then(response => {
                if (response.ok) {
                    debugLog(`✅ Scenario ${file} accessible`);
                } else {
                    debugLog(`❌ Scenario ${file} inaccessible (${response.status})`);
                }
            })
            .catch(error => {
                debugLog(`❌ Error loading ${file}: ${error.message}`);
            });
    }
}

// Test de l'API backend
function testBackendAPI() {
    debugLog('Testing backend API...');
    
    const apiUrl = 'http://localhost:8080/api/temporal/health';
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            debugLog(`✅ Backend API OK: ${data.status}`);
        })
        .catch(error => {
            debugLog(`❌ Backend API Error: ${error.message}`);
        });
}

// Créer des boutons fonctionnels pour les tests
function createTestButtons() {
    debugLog('Creating test buttons...');
    
    const testPanel = document.createElement('div');
    testPanel.id = 'debug-panel';
    testPanel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #00ff00;
        padding: 15px;
        border-radius: 10px;
        z-index: 1000;
        font-family: monospace;
        font-size: 12px;
        color: #00ff00;
    `;
    
    testPanel.innerHTML = `
        <h3>🔧 Debug Panel</h3>
        <button onclick="debugTestPlay()" style="background: #333; color: #00ff00; border: 1px solid #00ff00; padding: 5px 10px; margin: 2px;">Test Play</button><br>
        <button onclick="debugTestStep()" style="background: #333; color: #00ff00; border: 1px solid #00ff00; padding: 5px 10px; margin: 2px;">Test Step</button><br>
        <button onclick="debugTestReset()" style="background: #333; color: #00ff00; border: 1px solid #00ff00; padding: 5px 10px; margin: 2px;">Test Reset</button><br>
        <button onclick="debugLoadScenario()" style="background: #333; color: #00ff00; border: 1px solid #00ff00; padding: 5px 10px; margin: 2px;">Load Scenario</button><br>
        <button onclick="debugHidePanel()" style="background: #333; color: #00ff00; border: 1px solid #00ff00; padding: 5px 10px; margin: 2px;">Hide Panel</button><br>
        <div id="debug-status">Status: Ready</div>
    `;
    
    document.body.appendChild(testPanel);
}

// Fonctions de test debug
function debugTestPlay() {
    debugLog('Debug Test Play clicked');
    document.getElementById('debug-status').textContent = 'Status: Playing...';
    
    // Simuler le play
    if (typeof toggleAutoPlay === 'function') {
        toggleAutoPlay();
    } else {
        debugLog('Creating fallback play function');
        // Fonction de fallback
        simulatePlay();
    }
}

function debugTestStep() {
    debugLog('Debug Test Step clicked');
    document.getElementById('debug-status').textContent = 'Status: Stepping...';
    
    if (typeof nextTurn === 'function') {
        nextTurn();
    } else {
        simulateStep();
    }
}

function debugTestReset() {
    debugLog('Debug Test Reset clicked');
    document.getElementById('debug-status').textContent = 'Status: Resetting...';
    
    if (typeof resetVisualization === 'function') {
        resetVisualization();
    } else {
        simulateReset();
    }
}

function debugLoadScenario() {
    debugLog('Debug Load Scenario clicked');
    document.getElementById('debug-status').textContent = 'Status: Loading scenario...';
    
    // Créer un scénario test simple
    testScenario = {
        name: 'Debug Test Scenario',
        description: 'Simple test scenario for debugging',
        commands: [
            'HERO(DebugHero)',
            'ψ001: ⊙(Δt+1 @5,5 ⟶ MOV(DebugHero, @5,5))',
            'COLLAPSE(ψ001)'
        ]
    };
    
    debugLog('Test scenario created');
    document.getElementById('debug-status').textContent = 'Status: Scenario loaded';
}

function debugHidePanel() {
    document.getElementById('debug-panel').style.display = 'none';
}

// Fonctions de simulation
function simulatePlay() {
    debugLog('Simulating play...');
    // Animation simple
    let counter = 0;
    const interval = setInterval(() => {
        counter++;
        document.getElementById('debug-status').textContent = `Status: Playing... ${counter}`;
        if (counter >= 5) {
            clearInterval(interval);
            document.getElementById('debug-status').textContent = 'Status: Play complete';
        }
    }, 1000);
}

function simulateStep() {
    debugLog('Simulating step...');
    document.getElementById('debug-status').textContent = 'Status: Step complete';
}

function simulateReset() {
    debugLog('Simulating reset...');
    document.getElementById('debug-status').textContent = 'Status: Reset complete';
}

// Initialisation du debug
function initDebug() {
    debugLog('Initializing debug mode...');
    
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                testBasicFunctions();
                testScenarios();
                testBackendAPI();
                createTestButtons();
            }, 1000);
        });
    } else {
        setTimeout(() => {
            testBasicFunctions();
            testScenarios();
            testBackendAPI();
            createTestButtons();
        }, 1000);
    }
}

// Lancer le debug
initDebug();

debugLog('Debug script loaded successfully'); 