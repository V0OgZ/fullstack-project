#!/bin/bash
# 🧪 Tests unitaires ER=EPR et Brouillard de Guerre
# Par : MERLIN
# Date : 2025-01-29

API_URL="http://localhost:8080/api/magic-formulas/execute"
TEST_RESULTS="📜 OPUS/TESTS_ER_EPR_FOG_WAR_RESULTS.md"

# Couleurs pour output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Compteurs
TESTS_PASSED=0
TESTS_FAILED=0

echo "🧪 TESTS UNITAIRES ER=EPR ET BROUILLARD DE GUERRE" > "$TEST_RESULTS"
echo "=================================================" >> "$TEST_RESULTS"
echo "Date : $(date)" >> "$TEST_RESULTS"
echo "" >> "$TEST_RESULTS"

# Fonction d'exécution de test
run_test() {
    local test_name="$1"
    local formula="$2"
    local expected_result="$3"
    local context="$4"
    
    echo -e "\n${BLUE}🔬 Test: $test_name${NC}"
    echo -e "\n## Test: $test_name" >> "$TEST_RESULTS"
    echo "Formula: $formula" >> "$TEST_RESULTS"
    
    # Préparer la requête JSON
    local json_data
    if [ -n "$context" ]; then
        json_data="{\"formula\": \"$formula\", \"context\": $context}"
    else
        json_data="{\"formula\": \"$formula\"}"
    fi
    
    # Exécuter la requête
    local response=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "$json_data")
    
    # Vérifier le résultat
    if echo "$response" | grep -q "$expected_result"; then
        echo -e "${GREEN}✓ PASSED${NC}"
        echo "✓ PASSED" >> "$TEST_RESULTS"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ FAILED${NC}"
        echo "✗ FAILED" >> "$TEST_RESULTS"
        echo "Response: $response" >> "$TEST_RESULTS"
        ((TESTS_FAILED++))
    fi
    
    echo "Response: $response" >> "$TEST_RESULTS"
    echo "" >> "$TEST_RESULTS"
}

# Vérifier que le backend est actif
echo -e "${YELLOW}🔧 Vérification du backend...${NC}"
if ! curl -s http://localhost:8080/actuator/health | grep -q "UP"; then
    echo -e "${RED}❌ Backend non accessible ! Démarrage...${NC}"
    cd "⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean"
    mvn spring-boot:run -DskipTests &
    BACKEND_PID=$!
    echo "Attente du démarrage..."
    sleep 10
fi

echo -e "\n${YELLOW}🎮 DÉMARRAGE DES TESTS${NC}\n"

# ========== TESTS BROUILLARD DE GUERRE ==========
echo -e "${YELLOW}=== TESTS BROUILLARD DE GUERRE ===${NC}"

# Test 1: Création d'un monde avec brouillard
run_test "Création monde avec brouillard" \
    "ψ300: ⊙(CREATE_WORLD(TestWorld) ⟶ FOG_OF_WAR(enabled=true))" \
    "activé" \
    "{\"gameId\": \"fog-test-1\"}"

# Test 2: Placement héros dans brouillard
run_test "Héros dans brouillard" \
    "ψ301: ⊙(PLACE_HERO(Vince, @5,5) ⟶ IN_FOG(true))" \
    "activé" \
    "{\"gameId\": \"fog-test-1\", \"worldId\": \"TestWorld\"}"

# Test 3: Vision limitée
run_test "Vision limitée du héros" \
    "ψ302: ⊙(GET_VISION(Vince) ⟶ RADIUS(3))" \
    "activé" \
    "{\"gameId\": \"fog-test-1\", \"heroId\": \"Vince\"}"

# Test 4: Ennemi invisible dans brouillard
run_test "Ennemi invisible" \
    "ψ303: ⊙(PLACE_ENEMY(Target, @10,10) ⟶ HIDDEN_IN_FOG)" \
    "activé" \
    "{\"gameId\": \"fog-test-1\", \"worldId\": \"TestWorld\"}"

# Test 5: Détection impossible à distance
run_test "Détection impossible" \
    "ψ304: ⊙(DETECT(Vince, Target) ⟶ FOG_BLOCKS)" \
    "activé" \
    "{\"gameId\": \"fog-test-1\", \"heroId\": \"Vince\", \"targetId\": \"Target\"}"

# ========== TESTS ER=EPR ==========
echo -e "\n${YELLOW}=== TESTS ER=EPR ===${NC}"

# Test 6: Création de l'intrication quantique
run_test "Intrication quantique EPR" \
    "ψ305: ⊙(ENTANGLE(Vince, Target) ⟶ EPR_PAIR)" \
    "activé" \
    "{\"gameId\": \"er-epr-test-2\", \"particle1\": \"Vince\", \"particle2\": \"Target\"}"

# Test 7: Ouverture du wormhole ER
run_test "Ouverture wormhole ER" \
    "ψ306: ⊙(OPEN_WORMHOLE(@5,5, @10,10) ⟶ ER_BRIDGE)" \
    "activé" \
    "{\"gameId\": \"er-epr-test-2\", \"from\": \"5,5\", \"to\": \"10,10\"}"

# Test 8: Tir quantique à travers le brouillard
run_test "Tir quantique trans-dimensionnel" \
    "ψ307: ⊙(QUANTUM_SHOT(Vince, Target) ⟶ THROUGH_FOG)" \
    "activé" \
    "{\"gameId\": \"er-epr-test-2\", \"shooter\": \"Vince\", \"target\": \"Target\"}"

# Test 9: Effondrement de la fonction d'onde
run_test "Effondrement fonction d'onde" \
    "ψ308: ⊙(COLLAPSE_WAVE(Target) ⟶ REALITY_LOCK)" \
    "activé" \
    "{\"gameId\": \"er-epr-test-2\", \"target\": \"Target\"}"

# Test 10: Traversée du wormhole
run_test "Traversée wormhole" \
    "ψ309: ⊙(TRAVERSE_WORMHOLE(Vince, @10,10) ⟶ POSITION_SWAP)" \
    "activé" \
    "{\"gameId\": \"er-epr-test-2\", \"hero\": \"Vince\", \"destination\": \"10,10\"}"

# ========== TESTS COMBINÉS ==========
echo -e "\n${YELLOW}=== TESTS COMBINÉS FOG + ER=EPR ===${NC}"

# Test 11: Création de deux univers pocket
run_test "Deux univers pocket" \
    "ψ310: ⊙(CREATE_POCKET_WORLDS(Alpha, Beta) ⟶ PARALLEL_FOG)" \
    "activé" \
    "{\"gameId\": \"combined-test-3\"}"

# Test 12: Tir inter-dimensionnel avec brouillard
run_test "Tir inter-dimensionnel brouillard" \
    "ψ311: ⊙(INTERDIM_SHOT(Vince@Alpha, Target@Beta) ⟶ FOG_PIERCING)" \
    "activé" \
    "{\"gameId\": \"combined-test-3\", \"fromWorld\": \"Alpha\", \"toWorld\": \"Beta\"}"

# Test 13: Vérification ER=EPR
run_test "Vérification ER=EPR complète" \
    "ψ999: ⊙(VERIFY(ER_EQUALS_EPR) ⟶ QUANTUM_PROOF)" \
    "activé" \
    "{\"gameId\": \"combined-test-3\", \"principle\": \"ER=EPR\"}"

# ========== TESTS DE PARADOXES ==========
echo -e "\n${YELLOW}=== TESTS PARADOXES ===${NC}"

# Test 14: Paradoxe temporal
run_test "Paradoxe temporal" \
    "paradoxRisk: 0.95" \
    "Formule JSON" \
    ""

# Test 15: Résolution paradoxe
run_test "Résolution paradoxe CRNS" \
    "ψ312: ⊙(RESOLVE_PARADOX() ⟶ CRNS_VALIDATION)" \
    "activé" \
    "{\"gameId\": \"paradox-test\", \"paradoxLevel\": 0.95}"

# ========== RÉSUMÉ ==========
echo -e "\n${YELLOW}========== RÉSUMÉ DES TESTS ==========${NC}"
echo -e "${GREEN}Tests réussis : $TESTS_PASSED${NC}"
echo -e "${RED}Tests échoués : $TESTS_FAILED${NC}"

echo -e "\n## RÉSUMÉ FINAL" >> "$TEST_RESULTS"
echo "Tests réussis : $TESTS_PASSED" >> "$TEST_RESULTS"
echo "Tests échoués : $TESTS_FAILED" >> "$TEST_RESULTS"
echo "Taux de réussite : $((TESTS_PASSED * 100 / (TESTS_PASSED + TESTS_FAILED)))%" >> "$TEST_RESULTS"

# Nettoyer si on a démarré le backend
if [ ! -z "$BACKEND_PID" ]; then
    echo -e "\n${YELLOW}Arrêt du backend...${NC}"
    kill $BACKEND_PID 2>/dev/null
fi

echo -e "\n${BLUE}📊 Résultats détaillés dans : $TEST_RESULTS${NC}" 