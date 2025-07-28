#!/bin/bash

# 🎮 Heroes of Time - Test Backend Actions Gameplay
# Script pour tester toutes les actions de gameplay backend

set -e

echo "🎮 Heroes of Time - Test Actions Gameplay Backend"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKEND_URL="http://localhost:8080"
TEST_RESULTS_DIR="./test-results"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
REPORT_FILE="$TEST_RESULTS_DIR/gameplay-tests-$TIMESTAMP.html"
LOG_FILE="$TEST_RESULTS_DIR/gameplay-tests-$TIMESTAMP.log"

# Créer le répertoire de résultats
mkdir -p "$TEST_RESULTS_DIR"

# Variables globales pour les tests
GAME_ID="conquest-classic"
PLAYER_ID="player1"
HERO_ID="hero-1"
BUILDING_ID=""
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Fonction pour tester un endpoint
test_endpoint() {
    local test_name="$1"
    local method="$2"
    local url="$3"
    local data="$4"
    local expected_status="$5"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -e "${BLUE}🧪 Test: $test_name${NC}"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$url")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$url")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "$expected_status" ]; then
        echo -e "  ${GREEN}✅ PASS${NC} - Status: $http_code"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        echo "  Response: $(echo "$body" | jq -c . 2>/dev/null || echo "$body")"
    else
        echo -e "  ${RED}❌ FAIL${NC} - Expected: $expected_status, Got: $http_code"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        echo "  Response: $(echo "$body" | jq -c . 2>/dev/null || echo "$body")"
    fi
    
    echo ""
    
    # Log détaillé
    echo "[$(date)] $test_name - Status: $http_code - Response: $body" >> "$LOG_FILE"
}

# Fonction pour extraire un ID d'un JSON
extract_id() {
    local json="$1"
    local path="$2"
    echo "$json" | jq -r "$path" 2>/dev/null || echo ""
}

echo -e "${BLUE}🔧 Vérification de l'état du backend...${NC}"
if ! curl -s "$BACKEND_URL/actuator/health" | grep -q "UP"; then
    echo -e "${RED}❌ ERREUR: Backend non accessible sur $BACKEND_URL${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Backend accessible${NC}"
echo ""

# Début des tests
echo -e "${YELLOW}🎯 Tests des Actions de Gameplay${NC}"
echo "=================================="

# 1. Test de récupération du jeu
test_endpoint "Récupération du jeu" "GET" "$BACKEND_URL/api/games/$GAME_ID" "" "200"

# 2. Test de récupération des bâtiments du joueur
test_endpoint "Récupération des bâtiments" "GET" "$BACKEND_URL/api/games/$GAME_ID/players/$PLAYER_ID/buildings" "" "200"

# 3. Test de récupération des bonus de château
test_endpoint "Récupération des bonus de château" "GET" "$BACKEND_URL/api/games/$GAME_ID/players/$PLAYER_ID/castle/bonuses" "" "200"

# 4. Test de récupération des unités disponibles
test_endpoint "Récupération des unités disponibles" "GET" "$BACKEND_URL/api/games/$GAME_ID/players/$PLAYER_ID/units/available" "" "200"

# 5. Test de récupération des sorts disponibles
test_endpoint "Récupération des sorts disponibles" "GET" "$BACKEND_URL/api/games/$GAME_ID/players/$PLAYER_ID/spells/available" "" "200"

# 6. Test de reset de la croissance hebdomadaire
test_endpoint "Reset croissance hebdomadaire" "POST" "$BACKEND_URL/api/buildings/game/$GAME_ID/reset-weekly-growth" "" "200"

# 7. Récupérer un ID de bâtiment pour les tests suivants
echo -e "${BLUE}🔍 Récupération d'un ID de bâtiment pour les tests...${NC}"
buildings_response=$(curl -s "$BACKEND_URL/api/games/$GAME_ID/players/$PLAYER_ID/buildings")
BUILDING_ID=$(echo "$buildings_response" | jq -r '.[0].buildingId' 2>/dev/null || echo "")

if [ -z "$BUILDING_ID" ]; then
    echo -e "${RED}❌ Impossible de récupérer un ID de bâtiment${NC}"
else
    echo -e "${GREEN}✅ ID de bâtiment récupéré: $BUILDING_ID${NC}"
fi

echo ""

# 8. Test de recrutement d'unités (après reset)
if [ -n "$BUILDING_ID" ]; then
    recruit_data='{"playerId": "'$PLAYER_ID'", "unitType": "castle_pikeman_basic", "quantity": 1}'
    test_endpoint "Recrutement d'unités" "POST" "$BACKEND_URL/api/games/$GAME_ID/buildings/$BUILDING_ID/recruit" "$recruit_data" "200"
else
    echo -e "${YELLOW}⚠️ Test de recrutement ignoré - Pas de bâtiment disponible${NC}"
fi

# 9. Test d'upgrade de bâtiment
if [ -n "$BUILDING_ID" ]; then
    upgrade_data='{"playerId": "'$PLAYER_ID'"}'
    test_endpoint "Upgrade de bâtiment" "POST" "$BACKEND_URL/api/games/$GAME_ID/buildings/$BUILDING_ID/upgrade" "$upgrade_data" "200"
else
    echo -e "${YELLOW}⚠️ Test d'upgrade ignoré - Pas de bâtiment disponible${NC}"
fi

# 10. Test de construction de nouveau bâtiment
construct_data='{"playerId": "'$PLAYER_ID'", "buildingType": "stable", "positionX": 4, "positionY": 2}'
test_endpoint "Construction de bâtiment" "POST" "$BACKEND_URL/api/games/$GAME_ID/buildings/construct" "$construct_data" "200"

# 11. Test de déplacement de héros
move_data='{"gameId": "'$GAME_ID'", "heroId": "'$HERO_ID'", "targetPosition": {"x": 1, "y": 1}}'
test_endpoint "Déplacement de héros" "POST" "$BACKEND_URL/api/games/move-hero" "$move_data" "200"

# 12. Test d'attaque
attack_data='{"targetId": "enemy-1"}'
test_endpoint "Attaque avec héros" "POST" "$BACKEND_URL/api/heroes/$HERO_ID/attack" "$attack_data" "200"

# 13. Test de collecte de ressources
collect_data='{"objectId": "resource-1"}'
test_endpoint "Collecte de ressources" "POST" "$BACKEND_URL/api/heroes/$HERO_ID/collect" "$collect_data" "200"

# 14. Test de fin de tour
endturn_data='{"playerId": "'$PLAYER_ID'"}'
test_endpoint "Fin de tour" "POST" "$BACKEND_URL/api/games/$GAME_ID/end-turn" "$endturn_data" "200"

# 15. Test de récupération des actions en attente
test_endpoint "Actions en attente" "GET" "$BACKEND_URL/api/games/$GAME_ID/actions/pending" "" "200"

# Génération du rapport HTML
echo -e "${BLUE}📊 Génération du rapport HTML...${NC}"

cat > "$REPORT_FILE" << EOF
<!DOCTYPE html>
<html>
<head>
    <title>Heroes of Time - Test Actions Gameplay Backend</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; border-radius: 5px; }
        .summary { background: #ecf0f1; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .success { color: #27ae60; font-weight: bold; }
        .failure { color: #e74c3c; font-weight: bold; }
        .warning { color: #f39c12; }
        .info { color: #3498db; }
        .test-result { margin: 10px 0; padding: 10px; border-left: 4px solid #3498db; background: #f8f9fa; }
        .test-pass { border-left-color: #27ae60; background: #f0f9f0; }
        .test-fail { border-left-color: #e74c3c; background: #fdf2f2; }
        .timestamp { font-size: 0.9em; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎮 Heroes of Time - Test Actions Gameplay Backend</h1>
        <p class="timestamp">Généré le $(date)</p>
    </div>

    <div class="summary">
        <h2>📊 Résumé des Tests</h2>
        <p><strong>Total des tests:</strong> $TOTAL_TESTS</p>
        <p><strong>Réussis:</strong> <span class="success">$PASSED_TESTS</span></p>
        <p><strong>Échoués:</strong> <span class="failure">$FAILED_TESTS</span></p>
        <p><strong>Taux de réussite:</strong> $(( PASSED_TESTS * 100 / TOTAL_TESTS ))%</p>
    </div>

    <div class="test-result">
        <h2>📝 Log Détaillé</h2>
        <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto;">
$(cat "$LOG_FILE" 2>/dev/null || echo "Aucun log disponible")
        </pre>
    </div>

    <div class="summary">
        <h2>🔗 Liens Utiles</h2>
        <p><strong>Log complet:</strong> <a href="file://$LOG_FILE">$LOG_FILE</a></p>
        <p><strong>Backend Health:</strong> <a href="$BACKEND_URL/actuator/health">$BACKEND_URL/actuator/health</a></p>
    </div>
</body>
</html>
EOF

echo ""
echo -e "${GREEN}✅ Tests terminés!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 Résultats:${NC}"
echo -e "  📊 Total: $TOTAL_TESTS tests"
echo -e "  ${GREEN}✅ Réussis: $PASSED_TESTS${NC}"
echo -e "  ${RED}❌ Échoués: $FAILED_TESTS${NC}"
echo -e "  📈 Taux de réussite: $(( PASSED_TESTS * 100 / TOTAL_TESTS ))%"
echo -e "  📊 Rapport HTML: ${REPORT_FILE}"
echo -e "  📝 Log détaillé: ${LOG_FILE}"
echo ""
echo -e "${YELLOW}💡 Pour voir le rapport: open \"$REPORT_FILE\"${NC}"

# Ouvrir automatiquement le rapport si sur macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${BLUE}🌐 Ouverture du rapport dans le navigateur...${NC}"
    open "$REPORT_FILE"
fi

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 Tous les tests ont réussi!${NC}"
    exit 0
else
    echo -e "${RED}⚠️ Certains tests ont échoué${NC}"
    exit 1
fi 