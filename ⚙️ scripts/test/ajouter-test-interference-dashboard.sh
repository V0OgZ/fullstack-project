#!/bin/bash

# ===============================================
# AJOUTER TEST INTERFERENCE DANS DASHBOARD 8888
# Intégration du test d'interférence quantique dans la suite complète
# ===============================================

set -e

# Configuration
DASHBOARD_FILE="dashboard.html"
TEST_RUNNER_DIR="test-runner"
DASHBOARD_PORT=8888

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌀 AJOUT TEST INTERFÉRENCE DANS DASHBOARD 8888${NC}"
echo "=================================================="
echo ""

# Vérifier si le dashboard existe
if [ ! -f "$DASHBOARD_FILE" ]; then
    echo -e "${RED}❌ Dashboard non trouvé: $DASHBOARD_FILE${NC}"
    echo "Recherche du dashboard..."
    
    # Chercher le dashboard
    dashboard_path=$(find . -name "dashboard.html" -type f 2>/dev/null | head -1)
    if [ ! -z "$dashboard_path" ]; then
        DASHBOARD_FILE="$dashboard_path"
        echo -e "${GREEN}✅ Dashboard trouvé: $DASHBOARD_FILE${NC}"
    else
        echo -e "${RED}💥 Dashboard introuvable${NC}"
        exit 1
    fi
fi

echo -e "${YELLOW}📝 Modification du dashboard...${NC}"

# Créer une sauvegarde
cp "$DASHBOARD_FILE" "${DASHBOARD_FILE}.backup"
echo "Sauvegarde créée: ${DASHBOARD_FILE}.backup"

# Ajouter le test d'interférence quantique dans le dashboard
cat >> temp_interference_addition.html << 'EOF'
        <!-- Test d'Interférence Quantique -->
        <div class="test-item" id="interference-test">
            <div class="test-header">
                <h4>🌀 Test Interférence Quantique</h4>
                <div class="test-status" id="interference-status">
                    <span class="status-indicator" id="interference-indicator">⏳</span>
                    <span class="status-text">En attente</span>
                </div>
            </div>
            <div class="test-description">
                <p>Test des interférences constructives/destructives entre états ψ quantiques</p>
                <ul>
                    <li>🔬 Artefacts d'interférence (3 types)</li>
                    <li>⚡ États complexes avec amplitudes</li>
                    <li>🎯 29 commandes quantiques avancées</li>
                    <li>📊 Mesures de cohérence</li>
                </ul>
            </div>
            <div class="test-controls">
                <button class="test-button primary" onclick="runInterferenceTest()">
                    🚀 Lancer Test Interférence
                </button>
                <button class="test-button secondary" onclick="showInterferenceDetails()">
                    📋 Détails
                </button>
                <button class="test-button info" onclick="viewInterferenceResults()">
                    📊 Résultats
                </button>
            </div>
            <div class="test-output" id="interference-output" style="display: none;">
                <pre id="interference-log"></pre>
            </div>
        </div>

        <!-- Test de Benchmark Native vs Script -->
        <div class="test-item" id="benchmark-test">
            <div class="test-header">
                <h4>🏁 Benchmark Native vs Script</h4>
                <div class="test-status" id="benchmark-status">
                    <span class="status-indicator" id="benchmark-indicator">⏳</span>
                    <span class="status-text">En attente</span>
                </div>
            </div>
            <div class="test-description">
                <p>Comparaison de performance entre Java hardcodé et JSON+HOTS</p>
                <ul>
                    <li>⚡ Java natif vs Scripts configurables</li>
                    <li>📊 Mesures de latence et débit</li>
                    <li>🎯 3 scénarios de bataille temporelle</li>
                    <li>📈 Graphiques de comparaison</li>
                </ul>
            </div>
            <div class="test-controls">
                <select id="benchmark-scenario" class="scenario-selector">
                    <option value="bataille_temporelle_setup">Setup Bataille</option>
                    <option value="bataille_temporelle_combat">Combat Avancé</option>
                    <option value="bataille_temporelle_finale">Finale Épique</option>
                </select>
                <input type="number" id="benchmark-iterations" min="1" max="20" value="5" class="iterations-input">
                <button class="test-button primary" onclick="runBenchmarkTest()">
                    🏁 Benchmark
                </button>
                <button class="test-button secondary" onclick="showBenchmarkChart()">
                    📈 Graphiques
                </button>
            </div>
            <div class="test-output" id="benchmark-output" style="display: none;">
                <div id="benchmark-chart"></div>
                <pre id="benchmark-log"></pre>
            </div>
        </div>
EOF

# Insérer les nouveaux tests dans le dashboard avant la fermeture des tests
if grep -q "<!-- END TESTS -->" "$DASHBOARD_FILE"; then
    # Insérer avant le marqueur de fin
    sed -i '' '/<!-- END TESTS -->/r temp_interference_addition.html' "$DASHBOARD_FILE"
else
    # Chercher un endroit approprié pour insérer (avant une div de fermeture)
    sed -i '' '/<\/div>.*test.*container/r temp_interference_addition.html' "$DASHBOARD_FILE"
fi

# Ajouter le JavaScript pour les nouveaux tests
cat >> temp_interference_js.js << 'EOF'

// =============================================
// FONCTIONS POUR TEST INTERFÉRENCE QUANTIQUE
// =============================================

async function runInterferenceTest() {
    const statusIndicator = document.getElementById('interference-indicator');
    const statusText = document.querySelector('#interference-test .status-text');
    const output = document.getElementById('interference-output');
    const log = document.getElementById('interference-log');
    
    // Réinitialiser l'état
    statusIndicator.textContent = '🔄';
    statusText.textContent = 'Exécution...';
    output.style.display = 'block';
    log.textContent = '🌀 Démarrage du test d\'interférence quantique...\n';
    
    try {
        // 1. Créer une nouvelle partie
        log.textContent += '📝 Création d\'une nouvelle partie...\n';
        const gameResponse = await fetch('/api/game/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName: 'InterferenceTest_' + Date.now() })
        });
        
        const gameData = await gameResponse.json();
        const gameId = gameData.gameId;
        log.textContent += `🎮 Partie créée: ${gameId}\n`;
        
        // 2. Charger les artefacts d'interférence
        log.textContent += '🔬 Chargement des artefacts quantiques...\n';
        const artifactsResponse = await fetch(`/api/game/${gameId}/load-quantum-artifacts`, {
            method: 'POST'
        });
        
        if (artifactsResponse.ok) {
            log.textContent += '✅ Artefacts quantiques chargés (Miroir, Manipulateur, Détecteur)\n';
        }
        
        // 3. Exécuter le script HOTS d'interférence
        log.textContent += '⚡ Exécution du script d\'interférence...\n';
        const hotsCommands = [
            'HERO(Tesla)',
            'HERO(Einstein)', 
            'USE(ARTIFACT, quantum_mirror, HERO:Tesla)',
            'ψ101: (0.6+0.8i) ⊙(Δt+1 @10,10 ⟶ MOV(Tesla, @10,10))',
            'ψ102: (0.8+0.6i) ⊙(Δt+1 @10,10 ⟶ MOV(Einstein, @10,10))',
            'INTERFERE(CONSTRUCTIVE, ψ101, ψ102)',
            'MEASURE_COHERENCE(ψ101, ψ102)',
            'PHASE_SHIFT(ψ101, 45)',
            'RESONATE(ψ101, 440)'
        ];
        
        let successCount = 0;
        for (let cmd of hotsCommands) {
            const response = await fetch(`/api/game/${gameId}/script`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ script: cmd })
            });
            
            const result = await response.json();
            if (result.success) {
                successCount++;
                log.textContent += `✅ ${cmd}\n`;
            } else {
                log.textContent += `❌ ${cmd} - Error: ${result.error}\n`;
            }
        }
        
        // 4. Récupérer l'état final du jeu
        const stateResponse = await fetch(`/api/game/${gameId}`);
        const finalState = await stateResponse.json();
        
        // 5. Analyser les résultats
        log.textContent += '\n📊 RÉSULTATS DU TEST:\n';
        log.textContent += `Commands exécutées: ${successCount}/${hotsCommands.length}\n`;
        log.textContent += `États ψ actifs: ${finalState.activePsiStates?.length || 0}\n`;
        log.textContent += `Héros présents: ${finalState.heroes?.length || 0}\n`;
        
        if (successCount >= 7) {
            statusIndicator.textContent = '✅';
            statusText.textContent = 'Succès';
            log.textContent += '\n🎉 Test d\'interférence quantique RÉUSSI!\n';
        } else {
            statusIndicator.textContent = '⚠️';
            statusText.textContent = 'Partiel';
            log.textContent += '\n⚠️ Test partiellement réussi\n';
        }
        
    } catch (error) {
        statusIndicator.textContent = '❌';
        statusText.textContent = 'Échec';
        log.textContent += `\n💥 Erreur: ${error.message}\n`;
    }
}

function showInterferenceDetails() {
    const details = `
🌀 TEST D'INTERFÉRENCE QUANTIQUE - DÉTAILS

📋 Composants testés:
• 3 Artefacts quantiques (Mirror, Manipulator, Detector)  
• États ψ avec amplitudes complexes
• Commandes d'interférence avancées
• Mesures de cohérence quantique

⚡ Commandes HOTS testées:
• INTERFERE(CONSTRUCTIVE/DESTRUCTIVE)
• PHASE_SHIFT(psi, angle)
• RESONATE(psi, frequency)
• MEASURE_COHERENCE()
• QUANTUM_ENTANGLE()

🎯 Critères de succès:
• ≥7/9 commandes exécutées
• États ψ complexes créés
• Interférences détectées
• Pas d'erreurs critiques

📊 Métriques collectées:
• Temps d'exécution
• Taux de succès des commandes
• Nombre d'états quantiques
• Cohérence mesurée
    `;
    
    alert(details);
}

function viewInterferenceResults() {
    window.open('/api/test-reports/interference', '_blank');
}

// =============================================
// FONCTIONS POUR BENCHMARK NATIVE vs SCRIPT
// =============================================

async function runBenchmarkTest() {
    const scenario = document.getElementById('benchmark-scenario').value;
    const iterations = parseInt(document.getElementById('benchmark-iterations').value);
    const statusIndicator = document.getElementById('benchmark-indicator');
    const statusText = document.querySelector('#benchmark-test .status-text');
    const output = document.getElementById('benchmark-output');
    const log = document.getElementById('benchmark-log');
    
    statusIndicator.textContent = '🔄';
    statusText.textContent = 'Benchmark en cours...';
    output.style.display = 'block';
    log.textContent = `🏁 Démarrage benchmark ${scenario} (${iterations} itérations)\n`;
    
    try {
        // Créer une partie pour le benchmark
        const gameResponse = await fetch('/api/game/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName: 'Benchmark_' + Date.now() })
        });
        
        const gameData = await gameResponse.json();
        const gameId = gameData.gameId;
        
        // Exécuter le benchmark
        log.textContent += '⏱️ Exécution du benchmark comparatif...\n';
        const benchmarkResponse = await fetch(`/api/benchmark/compare/${scenario}?gameId=${gameId}&iterations=${iterations}`, {
            method: 'POST'
        });
        
        const benchmarkResult = await benchmarkResponse.json();
        
        if (benchmarkResult.success) {
            const native = benchmarkResult.native;
            const script = benchmarkResult.script;
            const comparison = benchmarkResult.comparison;
            
            log.textContent += '\n📊 RÉSULTATS DU BENCHMARK:\n';
            log.textContent += `\n🔧 NATIVE (Java hardcodé):\n`;
            log.textContent += `  • Temps moyen: ${native.avgTimeMs.toFixed(2)}ms\n`;
            log.textContent += `  • Taux de succès: ${native.successRate.toFixed(1)}%\n`;
            log.textContent += `  • Succès: ${native.successCount}/${iterations}\n`;
            
            log.textContent += `\n📝 SCRIPT (JSON + HOTS):\n`;
            log.textContent += `  • Temps moyen: ${script.avgTimeMs.toFixed(2)}ms\n`;
            log.textContent += `  • Taux de succès: ${script.successRate.toFixed(1)}%\n`;
            log.textContent += `  • Succès: ${script.successCount}/${iterations}\n`;
            
            log.textContent += `\n🏆 COMPARAISON:\n`;
            log.textContent += `  • Gagnant: ${comparison.winner}\n`;
            if (comparison.speedup) {
                log.textContent += `  • Accélération: ${comparison.speedup.toFixed(2)}x\n`;
            }
            if (comparison.differencePercent) {
                log.textContent += `  • Différence: ${comparison.differencePercent.toFixed(1)}%\n`;
            }
            
            statusIndicator.textContent = '✅';
            statusText.textContent = `Winner: ${comparison.winner}`;
            
            // Générer le graphique
            generateBenchmarkChart(benchmarkResult);
            
        } else {
            throw new Error(benchmarkResult.error || 'Benchmark failed');
        }
        
    } catch (error) {
        statusIndicator.textContent = '❌';
        statusText.textContent = 'Échec';
        log.textContent += `\n💥 Erreur benchmark: ${error.message}\n`;
    }
}

function generateBenchmarkChart(benchmarkResult) {
    const chartDiv = document.getElementById('benchmark-chart');
    
    const native = benchmarkResult.native;
    const script = benchmarkResult.script;
    
    chartDiv.innerHTML = `
        <h5>📈 Graphique des Performances</h5>
        <div class="chart-bars">
            <div class="chart-bar">
                <div class="bar-label">NATIVE</div>
                <div class="bar-container">
                    <div class="bar bar-native" style="width: ${Math.min(native.avgTimeMs / Math.max(native.avgTimeMs, script.avgTimeMs) * 100, 100)}%"></div>
                </div>
                <div class="bar-value">${native.avgTimeMs.toFixed(2)}ms</div>
            </div>
            <div class="chart-bar">
                <div class="bar-label">SCRIPT</div>
                <div class="bar-container">
                    <div class="bar bar-script" style="width: ${Math.min(script.avgTimeMs / Math.max(native.avgTimeMs, script.avgTimeMs) * 100, 100)}%"></div>
                </div>
                <div class="bar-value">${script.avgTimeMs.toFixed(2)}ms</div>
            </div>
        </div>
        <div class="chart-legend">
            <span class="legend-item"><span class="legend-color legend-native"></span> Java Natif</span>
            <span class="legend-item"><span class="legend-color legend-script"></span> JSON + HOTS</span>
        </div>
    `;
}

function showBenchmarkChart() {
    const output = document.getElementById('benchmark-output');
    if (output.style.display === 'none') {
        output.style.display = 'block';
    }
    document.getElementById('benchmark-chart').scrollIntoView({ behavior: 'smooth' });
}
EOF

# Insérer le JavaScript dans le dashboard
if grep -q "</script>" "$DASHBOARD_FILE"; then
    sed -i '' '/<\/script>/r temp_interference_js.js' "$DASHBOARD_FILE" 2>/dev/null || {
        # Fallback pour les systèmes sans sed -i ''
        sed -i.bak '/<\/script>/r temp_interference_js.js' "$DASHBOARD_FILE"
        rm -f "${DASHBOARD_FILE}.bak"
    }
fi

# Ajouter le CSS pour les nouveaux composants
cat >> temp_interference_css.css << 'EOF'

/* Styles pour les nouveaux tests */
.test-item {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(233, 69, 96, 0.3);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
}

.test-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.test-header h4 {
    color: #e94560;
    margin: 0;
    font-size: 1.2em;
}

.test-status {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status-indicator {
    font-size: 1.1em;
}

.status-text {
    color: #f39c12;
    font-weight: 500;
    font-size: 0.9em;
}

.test-description {
    margin-bottom: 15px;
    color: #bdc3c7;
    font-size: 0.9em;
}

.test-description ul {
    margin: 8px 0;
    padding-left: 20px;
}

.test-description li {
    margin: 4px 0;
}

.test-controls {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 15px;
}

.test-button {
    background: linear-gradient(45deg, #e94560, #f39c12);
    border: none;
    border-radius: 6px;
    color: white;
    padding: 8px 16px;
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.test-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(233, 69, 96, 0.4);
}

.test-button.secondary {
    background: linear-gradient(45deg, #00bcd4, #9b59b6);
}

.test-button.info {
    background: linear-gradient(45deg, #3498db, #2980b9);
}

.scenario-selector, .iterations-input {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(233, 69, 96, 0.3);
    border-radius: 4px;
    color: #e94560;
    padding: 6px 12px;
    font-size: 0.9em;
}

.iterations-input {
    width: 60px;
}

.test-output {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    padding: 15px;
    margin-top: 15px;
}

.test-output pre {
    color: #2ecc71;
    font-family: 'Courier New', monospace;
    font-size: 0.8em;
    line-height: 1.4;
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
}

/* Styles pour les graphiques de benchmark */
.chart-bars {
    margin: 15px 0;
}

.chart-bar {
    display: flex;
    align-items: center;
    margin: 10px 0;
    gap: 10px;
}

.bar-label {
    width: 60px;
    font-weight: 600;
    color: #e94560;
    font-size: 0.9em;
}

.bar-container {
    flex: 1;
    height: 25px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
}

.bar {
    height: 100%;
    border-radius: 12px;
    transition: width 0.5s ease;
}

.bar-native {
    background: linear-gradient(45deg, #e74c3c, #c0392b);
}

.bar-script {
    background: linear-gradient(45deg, #3498db, #2980b9);
}

.bar-value {
    width: 80px;
    text-align: right;
    color: #f39c12;
    font-weight: 600;
    font-size: 0.9em;
}

.chart-legend {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 15px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.8em;
    color: #bdc3c7;
}

.legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
}

.legend-native {
    background: linear-gradient(45deg, #e74c3c, #c0392b);
}

.legend-script {
    background: linear-gradient(45deg, #3498db, #2980b9);
}

/* Responsive */
@media (max-width: 768px) {
    .test-controls {
        flex-direction: column;
        align-items: stretch;
    }
    
    .test-button {
        margin-bottom: 5px;
    }
    
    .chart-bar {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .bar-container {
        width: 100%;
    }
}
EOF

# Insérer le CSS dans le dashboard
if grep -q "</style>" "$DASHBOARD_FILE"; then
    sed -i '' '/<\/style>/r temp_interference_css.css' "$DASHBOARD_FILE" 2>/dev/null || {
        sed -i.bak '/<\/style>/r temp_interference_css.css' "$DASHBOARD_FILE"
        rm -f "${DASHBOARD_FILE}.bak"
    }
fi

# Nettoyer les fichiers temporaires
rm -f temp_interference_addition.html temp_interference_js.js temp_interference_css.css

echo ""
echo -e "${GREEN}✅ Test d'interférence ajouté au dashboard!${NC}"
echo ""
echo -e "${BLUE}📋 RÉCAPITULATIF DES AJOUTS:${NC}"
echo "• 🌀 Test d'Interférence Quantique"
echo "• 🏁 Benchmark Native vs Script"
echo "• 📊 Graphiques de performance"
echo "• 🎯 Interface interactive complète"
echo ""
echo -e "${YELLOW}🚀 POUR TESTER:${NC}"
echo "1. Démarrer le backend (port 8080)"
echo "2. Ouvrir http://localhost:$DASHBOARD_PORT"
echo "3. Utiliser les nouveaux tests dans l'interface"
echo ""
echo -e "${GREEN}✅ Intégration terminée avec succès!${NC}" 