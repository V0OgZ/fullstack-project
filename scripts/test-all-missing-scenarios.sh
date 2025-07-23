#!/bin/bash

# 🎯 TEST ALL MISSING SCENARIOS - HEROES OF TIME
# =============================================
# Tests all scenarios that were missing from the main test suite
# Includes simple-game.hots, splintered_worlds.hots, and creature tests
# =============================================

echo "🎯 TEST ALL MISSING SCENARIOS - HEROES OF TIME"
echo "=============================================="
echo ""

# Configuration
HOST="localhost:8080"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_DIR="test-reports/rapport-scenarios-manquants-$TIMESTAMP"
mkdir -p "$REPORT_DIR"
REPORT_FILE="$REPORT_DIR/RAPPORT_COMPLET.md"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Compteurs
TOTAL_TESTS=0
SUCCESS_COUNT=0
FAIL_COUNT=0

# Fonction pour exécuter et logger
run_test() {
    local name="$1"
    local scenario_file="$2"
    local description="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    echo -e "\n${BLUE}🎮 TEST: $name${NC}"
    echo -e "${YELLOW}📂 Fichier: $scenario_file${NC}"
    echo -e "${PURPLE}📝 Description: $description${NC}"
    
    if [ ! -f "$scenario_file" ]; then
        echo -e "${RED}❌ Fichier manquant: $scenario_file${NC}"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        echo "❌ $name - Fichier manquant" >> "$REPORT_FILE"
        return 1
    fi
    
    # Exécuter le scénario
    echo "   🔄 Exécution en cours..."
    
    # Créer une partie pour ce test
    GAME_RESPONSE=$(curl -s -X POST "http://$HOST/api/games" \
        -H "Content-Type: application/json" \
        -d "{\"gameName\": \"Test $name\", \"players\": [\"Jean\", \"TestPlayer\"]}")
    
    GAME_ID=$(echo "$GAME_RESPONSE" | jq -r '.id // .gameId // 1' 2>/dev/null)
    
    # Compter les commandes réussies
    local success_count=0
    local total_commands=0
    
    while IFS= read -r line; do
        # Ignorer commentaires et lignes vides
        if [[ -z "$line" ]] || [[ "$line" =~ ^[[:space:]]*# ]]; then
            continue
        fi
        
        total_commands=$((total_commands + 1))
        
        # Exécuter la commande
        response=$(curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
            -H "Content-Type: application/json" \
            -d "{\"script\":\"$line\"}" 2>/dev/null)
        
        if echo "$response" | jq -e '.success == true' > /dev/null 2>&1; then
            success_count=$((success_count + 1))
        fi
        
    done < "$scenario_file"
    
    # Évaluer le résultat
    local success_rate=$((success_count * 100 / total_commands))
    
    if [ $success_rate -ge 80 ]; then
        echo -e "${GREEN}✅ Succès ($success_count/$total_commands commandes)${NC}"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
        echo "✅ $name - $success_count/$total_commands commandes réussies" >> "$REPORT_FILE"
    else
        echo -e "${RED}❌ Échec ($success_count/$total_commands commandes)${NC}"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        echo "❌ $name - $success_count/$total_commands commandes réussies" >> "$REPORT_FILE"
    fi
}

# Fonction pour tester les créatures
test_creature() {
    local creature_name="$1"
    local creature_id="$2"
    local description="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    echo -e "\n${BLUE}🐉 TEST CRÉATURE: $creature_name${NC}"
    echo -e "${PURPLE}📝 Description: $description${NC}"
    
    # Créer une partie pour ce test
    GAME_RESPONSE=$(curl -s -X POST "http://$HOST/api/games" \
        -H "Content-Type: application/json" \
        -d "{\"gameName\": \"Test Creature $creature_name\", \"players\": [\"Jean\"]}")
    
    GAME_ID=$(echo "$GAME_RESPONSE" | jq -r '.id // .gameId // 1' 2>/dev/null)
    
    # Test de création de créature
    echo "   🔄 Test de création..."
    response=$(curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
        -H "Content-Type: application/json" \
        -d "{\"script\":\"CREATE(CREATURE, $creature_id, @10,10)\"}" 2>/dev/null)
    
    if echo "$response" | jq -e '.success == true' > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Créature $creature_name créée avec succès${NC}"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
        echo "✅ Créature $creature_name - Création réussie" >> "$REPORT_FILE"
    else
        echo -e "${RED}❌ Échec création $creature_name${NC}"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        echo "❌ Créature $creature_name - Échec création" >> "$REPORT_FILE"
    fi
}

# Début du rapport
cat > "$REPORT_FILE" << EOF
# 📊 RAPPORT TEST SCÉNARIOS MANQUANTS
*Généré le $(date)*

## 🎯 SCÉNARIOS TESTÉS

EOF

echo -e "\n${GREEN}=== PHASE 1: SCÉNARIOS HOTS MANQUANTS ===${NC}"

# Test des scénarios HOTS manquants
run_test "Simple Game" \
    "game_assets/scenarios/hots/simple-game.hots" \
    "Scénario tutorial basique pour apprendre les mécaniques"

run_test "Splintered Worlds" \
    "game_assets/scenarios/hots/splintered_worlds.hots" \
    "Scénario complexe avec mondes multiples et mécaniques avancées"

echo -e "\n${GREEN}=== PHASE 2: SCÉNARIOS TEMPLATE ===${NC}"

# Test des templates
run_test "Dungeon Crawler Template" \
    "game_templates/classic_rpg/scenarios/dungeon_crawler.hots" \
    "Template RPG classique avec exploration de donjon"

run_test "Quantum Maze Template" \
    "game_templates/quantum_puzzle/scenarios/quantum_maze.hots" \
    "Template puzzle quantique avec maze solving"

echo -e "\n${GREEN}=== PHASE 3: TEST DES CRÉATURES ===${NC}"

# Test des créatures principales
test_creature "Luciole Quantique" "quantum_wisp" \
    "Créature basique qui manipule les phases quantiques"

test_creature "Araignée des Probabilités" "probability_spider" \
    "Araignée qui tisse des toiles dans l'espace des probabilités"

test_creature "Chevalier Quantique" "quantum_knight" \
    "Chevalier avec armure et attaques en états multiples"

test_creature "Dragon de Phase" "phase_dragon" \
    "Dragon ancien maître des phases quantiques"

test_creature "Liche Quantique" "quantum_lich" \
    "Liche transcendant la mort via superposition quantique"

test_creature "Phénix Quantique" "quantum_phoenix" \
    "Phénix légendaire maître des cycles quantiques"

test_creature "Archonte des Probabilités" "probability_archon" \
    "Être cosmique gouvernant les lois quantiques"

test_creature "Élémentaire Temporel" "temporal_elemental" \
    "Élémentaire natif du temps, maître des distorsions"

test_creature "Guerriers Fantômes" "phantom_warriors" \
    "Guerriers morts-vivants existant dans le plan temporel"

test_creature "Araignée Quantique" "quantum_spider" \
    "Araignées évoluant dans l'espace quantique"

echo -e "\n${GREEN}=== PHASE 4: VALIDATION SYSTÈME ===${NC}"

# Test de validation du système
echo -e "\n${BLUE}🔧 Validation du moteur de jeu${NC}"

# Vérifier que le backend répond
if curl -s "http://$HOST/api/temporal/health" > /dev/null; then
    echo -e "${GREEN}✅ Backend temporel actif${NC}"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
else
    echo -e "${RED}❌ Backend temporel inactif${NC}"
    FAIL_COUNT=$((FAIL_COUNT + 1))
fi

TOTAL_TESTS=$((TOTAL_TESTS + 1))

# Vérifier les fichiers de créatures
if [ -f "backend/src/main/resources/quantum-creatures.json" ]; then
    echo -e "${GREEN}✅ Fichier quantum-creatures.json présent${NC}"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
else
    echo -e "${RED}❌ Fichier quantum-creatures.json manquant${NC}"
    FAIL_COUNT=$((FAIL_COUNT + 1))
fi

TOTAL_TESTS=$((TOTAL_TESTS + 1))

# Finaliser le rapport
cat >> "$REPORT_FILE" << EOF

## 📊 STATISTIQUES FINALES

- **Tests exécutés:** $TOTAL_TESTS
- **Succès:** $SUCCESS_COUNT
- **Échecs:** $FAIL_COUNT
- **Taux de réussite:** $((SUCCESS_COUNT * 100 / TOTAL_TESTS))%

## 🎯 RÉSUMÉ

EOF

echo -e "\n${GREEN}=== RÉSUMÉ FINAL ===${NC}"
echo -e "${BLUE}📊 Statistiques:${NC}"
echo -e "   Tests exécutés: $TOTAL_TESTS"
echo -e "   ${GREEN}Succès: $SUCCESS_COUNT${NC}"
echo -e "   ${RED}Échecs: $FAIL_COUNT${NC}"
echo -e "   Taux de réussite: $((SUCCESS_COUNT * 100 / TOTAL_TESTS))%"

echo -e "\n${BLUE}📁 Rapport sauvegardé dans: $REPORT_DIR${NC}"

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "\n${GREEN}🎉 TOUS LES TESTS SONT PASSÉS ! 🎉${NC}"
    echo "🎉 SUCCÈS TOTAL !" >> "$REPORT_FILE"
else
    echo -e "\n${YELLOW}⚠️  $FAIL_COUNT tests ont échoué${NC}"
    echo "⚠️ $FAIL_COUNT échecs détectés" >> "$REPORT_FILE"
fi

echo -e "\n🎯 Test des scénarios manquants terminé ! 🎯\n"