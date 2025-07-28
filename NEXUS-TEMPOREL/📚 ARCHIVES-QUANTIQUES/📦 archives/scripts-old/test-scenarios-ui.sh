#!/bin/bash

# 🎮 Heroes of Time - Test des Scénarios UI
# =========================================
# Script pour tester les scénarios UI et identifier les problèmes

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎮 Heroes of Time - Test des Scénarios UI${NC}"
echo "========================================"

# Fonction pour tester les endpoints de l'API
test_api_endpoints() {
    echo -e "${CYAN}🔍 Test des endpoints API...${NC}"
    
    BASE_URL="http://localhost:8080"
    
    # Test 1: Health check
    echo -n "  🏥 Health check: "
    if curl -s "$BASE_URL/api/temporal/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ OK${NC}"
    else
        echo -e "${RED}❌ ÉCHEC${NC}"
    fi
    
    # Test 2: Créer un jeu
    echo -n "  🎮 Création de jeu: "
    create_response=$(curl -s -X POST "$BASE_URL/api/temporal/games" \
        -H "Content-Type: application/json" \
        -d '{"gameName": "UI Test Game", "playerId": "ui-test"}')
    
    if echo "$create_response" | grep -q "success"; then
        echo -e "${GREEN}✅ OK${NC}"
        GAME_ID=$(echo "$create_response" | jq -r '.gameId // 1')
    else
        echo -e "${RED}❌ ÉCHEC${NC}"
        GAME_ID="1"
    fi
    
    # Test 3: Démarrer le jeu
    echo -n "  🚀 Démarrage du jeu: "
    start_response=$(curl -s -X POST "$BASE_URL/api/temporal/games/$GAME_ID/start")
    
    if echo "$start_response" | grep -q "success"; then
        echo -e "${GREEN}✅ OK${NC}"
    else
        echo -e "${RED}❌ ÉCHEC${NC}"
    fi
    
    # Test 4: Créer un héros
    echo -n "  ⚔️ Création héros: "
    hero_response=$(curl -s -X POST "$BASE_URL/api/temporal/games/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d '{"script": "HERO(TestHero)"}')
    
    if echo "$hero_response" | grep -q "success"; then
        echo -e "${GREEN}✅ OK${NC}"
    else
        echo -e "${RED}❌ ÉCHEC${NC}"
    fi
    
    echo -e "${GREEN}API testée avec Game ID: $GAME_ID${NC}"
}

# Fonction pour tester les frontends
test_frontends() {
    echo -e "${CYAN}🌐 Test des frontends...${NC}"
    
    # Test Frontend Classique
    echo -n "  🏛️ Frontend Classique (8000): "
    if curl -s http://localhost:8000 | grep -q "Heroes of Time"; then
        echo -e "${GREEN}✅ OK${NC}"
    else
        echo -e "${RED}❌ ÉCHEC${NC}"
    fi
    
    # Test Frontend Temporel
    echo -n "  ⚡ Frontend Temporel (5173): "
    if curl -s http://localhost:5173 | grep -q "Temporal"; then
        echo -e "${GREEN}✅ OK${NC}"
    else
        echo -e "${RED}❌ ÉCHEC${NC}"
    fi
    
    # Test Quantum Visualizer
    echo -n "  🌌 Quantum Visualizer (8001): "
    if curl -s http://localhost:8001 | grep -q "Quantum"; then
        echo -e "${GREEN}✅ OK${NC}"
    else
        echo -e "${RED}❌ ÉCHEC${NC}"
    fi
}

# Fonction pour tester les scénarios JavaScript
test_javascript_scenarios() {
    echo -e "${CYAN}🔧 Test des scénarios JavaScript...${NC}"
    
    # Vérifier les fichiers JS
    echo -n "  📁 Frontend game.js: "
    if [ -f "🌐 frontend/game.js" ]; then
        echo -e "${GREEN}✅ Présent${NC}"
    else
        echo -e "${RED}❌ Manquant${NC}"
    fi
    
    echo -n "  📁 Frontend-temporal JS: "
    if [ -f "frontend-temporal/js/enhanced-temporal-engine.js" ]; then
        echo -e "${GREEN}✅ Présent${NC}"
    else
        echo -e "${RED}❌ Manquant${NC}"
    fi
    
    echo -n "  📁 Quantum visualizer JS: "
    if [ -f "quantum-visualizer/quantum-visualizer.js" ]; then
        echo -e "${GREEN}✅ Présent${NC}"
    else
        echo -e "${RED}❌ Manquant${NC}"
    fi
}

# Fonction pour tester les scénarios spécifiques
test_specific_scenarios() {
    echo -e "${CYAN}🎯 Test des scénarios spécifiques...${NC}"
    
    # Quantum Visualizer scenarios
    echo -n "  🌌 Scenarios quantiques: "
    if [ -d "quantum-visualizer/scenarios" ]; then
        scenario_count=$(ls quantum-visualizer/scenarios/*.json 2>/dev/null | wc -l)
        if [ $scenario_count -gt 0 ]; then
            echo -e "${GREEN}✅ $scenario_count scénarios trouvés${NC}"
        else
            echo -e "${RED}❌ Aucun scénario JSON${NC}"
        fi
    else
        echo -e "${RED}❌ Dossier scenarios manquant${NC}"
    fi
    
    # Frontend scenarios
    echo -n "  🏛️ Scripts frontend: "
    if [ -f "🌐 frontend/script-console.js" ]; then
        echo -e "${GREEN}✅ Console script disponible${NC}"
    else
        echo -e "${RED}❌ Console script manquante${NC}"
    fi
}

# Fonction pour diagnostiquer les problèmes
diagnose_issues() {
    echo -e "${CYAN}🩺 Diagnostic des problèmes...${NC}"
    
    echo -e "${YELLOW}🔍 Vérification des logs...${NC}"
    
    # Vérifier les logs des frontends
    for log in logs/frontend-*-ui.log; do
        if [ -f "$log" ]; then
            echo -n "  📋 $(basename $log): "
            if [ -s "$log" ]; then
                echo -e "${GREEN}✅ Présent${NC}"
                # Vérifier les erreurs
                if grep -q "error\|Error\|ERROR" "$log"; then
                    echo -e "    ${RED}⚠️ Erreurs détectées${NC}"
                fi
            else
                echo -e "${YELLOW}⚠️ Vide${NC}"
            fi
        fi
    done
    
    # Vérifier les processus
    echo -e "${YELLOW}🔍 Processus actifs...${NC}"
    echo -n "  🔧 Backend Java: "
    if pgrep -f "spring-boot" > /dev/null; then
        echo -e "${GREEN}✅ Actif${NC}"
    else
        echo -e "${RED}❌ Inactif${NC}"
    fi
    
    echo -n "  🌐 Serveurs Python: "
    python_count=$(pgrep -f "python3.*http.server" | wc -l)
    if [ $python_count -gt 0 ]; then
        echo -e "${GREEN}✅ $python_count serveurs actifs${NC}"
    else
        echo -e "${RED}❌ Aucun serveur${NC}"
    fi
}

# Fonction pour afficher les solutions
show_solutions() {
    echo -e "${CYAN}💡 Solutions pour les problèmes UI...${NC}"
    
    echo -e "${YELLOW}🔧 Si les scénarios ne fonctionnent pas:${NC}"
    echo "1. Vérifiez que le backend est actif:"
    echo "   curl http://localhost:8080/api/temporal/health"
    echo ""
    echo "2. Vérifiez les logs des frontends:"
    echo "   tail -f logs/frontend-*-ui.log"
    echo ""
    echo "3. Redémarrez les frontends:"
    echo "   ./demarrer-frontends.sh"
    echo ""
    echo "4. Testez les URLs directement:"
    echo "   - Frontend Classique: http://localhost:8000"
    echo "   - Frontend Temporel: http://localhost:5173"
    echo "   - Quantum Visualizer: http://localhost:8001"
    echo ""
    echo "5. Vérifiez les fichiers JavaScript:"
    echo "   - Ouvrez la console développeur du navigateur (F12)"
    echo "   - Cherchez les erreurs JavaScript"
    echo ""
    echo "6. Testez l'API directement:"
    echo "   ./demo-ultra-simple.sh"
}

# Fonction pour créer un test de scénario JavaScript
create_js_test() {
    echo -e "${CYAN}🧪 Création d'un test JavaScript...${NC}"
    
    cat > test-scenario-ui.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Scénario UI</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .result { padding: 10px; margin: 10px 0; border-radius: 5px; }
        .success { background-color: #d4edda; color: #155724; }
        .error { background-color: #f8d7da; color: #721c24; }
        button { padding: 10px 20px; margin: 10px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>🎮 Test Scénario UI Heroes of Time</h1>
    <div id="results"></div>
    
    <button onclick="testAPI()">Test API</button>
    <button onclick="testCreateHero()">Test Créer Héros</button>
    <button onclick="testScenario()">Test Scénario Complet</button>
    
    <script>
        const API_BASE = 'http://localhost:8080';
        let gameId = 1;
        
        function addResult(message, isSuccess = true) {
            const div = document.createElement('div');
            div.className = 'result ' + (isSuccess ? 'success' : 'error');
            div.textContent = message;
            document.getElementById('results').appendChild(div);
        }
        
        async function testAPI() {
            try {
                const response = await fetch(`${API_BASE}/api/temporal/health`);
                const data = await response.json();
                addResult('✅ API accessible: ' + data.status);
            } catch (error) {
                addResult('❌ API inaccessible: ' + error.message, false);
            }
        }
        
        async function testCreateHero() {
            try {
                const response = await fetch(`${API_BASE}/api/temporal/games/${gameId}/script`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ script: 'HERO(TestUIHero)' })
                });
                const data = await response.json();
                addResult('✅ Héros créé: ' + data.message);
            } catch (error) {
                addResult('❌ Erreur création héros: ' + error.message, false);
            }
        }
        
        async function testScenario() {
            try {
                // Test complet
                await testAPI();
                await testCreateHero();
                
                // Test mouvement
                const moveResponse = await fetch(`${API_BASE}/api/temporal/games/${gameId}/script`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ script: 'MOV(TestUIHero, @10,10)' })
                });
                const moveData = await moveResponse.json();
                addResult('✅ Mouvement: ' + moveData.message);
                
                // Test ψ-state
                const psiResponse = await fetch(`${API_BASE}/api/temporal/games/${gameId}/script`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ script: 'ψ999: ⊙(Δt+1 @15,15 ⟶ MOV(TestUIHero, @15,15))' })
                });
                const psiData = await psiResponse.json();
                addResult('✅ ψ-state: ' + psiData.message);
                
                addResult('🎉 Scénario complet réussi!');
            } catch (error) {
                addResult('❌ Erreur scénario: ' + error.message, false);
            }
        }
    </script>
</body>
</html>
EOF

    echo -e "${GREEN}✅ Fichier test-scenario-ui.html créé${NC}"
    echo -e "${YELLOW}💡 Ouvrez http://localhost:8000/test-scenario-ui.html pour tester${NC}"
}

# Script principal
main() {
    # Vérifier que les frontends sont démarrés
    if ! curl -s http://localhost:8000 > /dev/null 2>&1; then
        echo -e "${RED}❌ Frontends non démarrés${NC}"
        echo -e "${YELLOW}💡 Lancez d'abord: ./demarrer-frontends.sh${NC}"
        exit 1
    fi
    
    # Exécuter les tests
    test_api_endpoints
    echo ""
    test_frontends
    echo ""
    test_javascript_scenarios
    echo ""
    test_specific_scenarios
    echo ""
    diagnose_issues
    echo ""
    show_solutions
    echo ""
    create_js_test
    
    echo -e "${GREEN}🎉 Tests terminés!${NC}"
    echo -e "${YELLOW}💡 Pour tester l'interface: ouvrez http://localhost:8000/test-scenario-ui.html${NC}"
}

# Exécuter le script
main "$@" 