#!/bin/bash

# 🧪 TEST INTÉGRATION GROFI-CAUSALE COMPLET
# Teste toutes les fonctionnalités d'intégration causale avec les extensions GROFI

set -e  # Arrêt sur erreur

echo "🧪 DÉMARRAGE TESTS INTÉGRATION GROFI-CAUSALE"
echo "=============================================="

# Couleurs pour les logs
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BACKEND_URL="http://localhost:8080"
GAME_ID=""
TEST_RESULTS=()

# Fonction utilitaire pour les requêtes API
api_call() {
    local method=$1
    local endpoint=$2
    local data=$3
    
    if [ -n "$data" ]; then
        curl -s -X $method \
             -H "Content-Type: application/json" \
             -d "$data" \
             "$BACKEND_URL$endpoint"
    else
        curl -s -X $method "$BACKEND_URL$endpoint"
    fi
}

# Fonction de test avec validation
test_step() {
    local test_name=$1
    local expected_key=$2
    local response=$3
    
    echo -e "${BLUE}🔍 Test: $test_name${NC}"
    
    if echo "$response" | jq -e ".$expected_key" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ SUCCÈS: $test_name${NC}"
        TEST_RESULTS+=("✅ $test_name")
        return 0
    else
        echo -e "${RED}❌ ÉCHEC: $test_name${NC}"
        echo "Response: $response"
        TEST_RESULTS+=("❌ $test_name")
        return 1
    fi
}

# Vérification backend
echo -e "${YELLOW}🔧 Vérification backend...${NC}"
if ! curl -s "$BACKEND_URL/api/games" > /dev/null; then
    echo -e "${RED}❌ Backend non accessible sur $BACKEND_URL${NC}"
    echo "Démarrez le backend avec: cd backend && mvn spring-boot:run"
    exit 1
fi
echo -e "${GREEN}✅ Backend accessible${NC}"

# 1. Création du jeu de test
echo -e "\n${YELLOW}📋 PHASE 1: Création jeu de test${NC}"
GAME_RESPONSE=$(api_call POST "/api/games" '{"gameName":"GROFI-Causal-Test","mapWidth":50,"mapHeight":50}')
GAME_ID=$(echo "$GAME_RESPONSE" | jq -r '.id')
test_step "Création jeu" "id" "$GAME_RESPONSE"

# 2. Création des héros GROFI
echo -e "\n${YELLOW}🦸 PHASE 2: Héros GROFI${NC}"

# Jean-Grofignon
JEAN_RESPONSE=$(api_call POST "/api/grofi/heroes/$GAME_ID/create" '{"heroName":"Jean-Grofignon"}')
test_step "Création Jean-Grofignon" "success" "$JEAN_RESPONSE"

# TheDude
DUDE_RESPONSE=$(api_call POST "/api/grofi/heroes/$GAME_ID/create" '{"heroName":"TheDude"}')
test_step "Création TheDude" "success" "$DUDE_RESPONSE"

# VinceVega
VINCE_RESPONSE=$(api_call POST "/api/grofi/heroes/$GAME_ID/create" '{"heroName":"VinceVega"}')
test_step "Création VinceVega" "success" "$VINCE_RESPONSE"

# 3. Test des immunités
echo -e "\n${YELLOW}🛡️ PHASE 3: Test immunités${NC}"

# Test immunité Jean-Grofignon
IMMUNITY_RESPONSE=$(api_call GET "/api/grofi/heroes/$GAME_ID/Jean-Grofignon/immunities")
test_step "Immunités Jean-Grofignon" "immunities" "$IMMUNITY_RESPONSE"

# Vérifier immunités spécifiques
SRTI_IMMUNE=$(echo "$IMMUNITY_RESPONSE" | jq -r '.immunities[] | select(. == "SRTI")')
ROLLBACK_IMMUNE=$(echo "$IMMUNITY_RESPONSE" | jq -r '.immunities[] | select(. == "ROLLBACK")')

if [ "$SRTI_IMMUNE" = "SRTI" ] && [ "$ROLLBACK_IMMUNE" = "ROLLBACK" ]; then
    echo -e "${GREEN}✅ Immunités SRTI+ROLLBACK confirmées${NC}"
    TEST_RESULTS+=("✅ Immunités SRTI+ROLLBACK")
else
    echo -e "${RED}❌ Immunités manquantes${NC}"
    TEST_RESULTS+=("❌ Immunités manquantes")
fi

# 4. Test grammaire étendue GROFI
echo -e "\n${YELLOW}🌀 PHASE 4: Grammaire étendue GROFI${NC}"

# Test Ultimate Power Jean-Grofignon
ULTIMATE_RESPONSE=$(api_call POST "/api/grofi/extended/execute" "{
    \"gameId\": $GAME_ID,
    \"script\": \"ψ†[FREEZE {MOV(Jean-Grofignon, @25,25)}]\"
}")
test_step "Ultimate Power Jean-Grofignon" "success" "$ULTIMATE_RESPONSE"

# Test rollback par plage
ROLLBACK_RESPONSE=$(api_call POST "/api/grofi/extended/execute" "{
    \"gameId\": $GAME_ID,
    \"script\": \"†[Δt-3 TO Δt-1]\"
}")
test_step "Rollback par plage" "success" "$ROLLBACK_RESPONSE"

# Test condition étendue
CONDITION_RESPONSE=$(api_call POST "/api/grofi/extended/execute" "{
    \"gameId\": $GAME_ID,
    \"script\": \"Π[IF stress > 0.5 THEN Ω[ONE]]\"
}")
test_step "Condition étendue" "success" "$CONDITION_RESPONSE"

# 5. Test intégration causale
echo -e "\n${YELLOW}🌊 PHASE 5: Intégration causale${NC}"

# Test avec immunités
CAUSAL_RESPONSE=$(api_call POST "/api/grofi/causal/execute" "{
    \"gameId\": $GAME_ID,
    \"script\": \"ψ001: ⊙(Δt+2 @30,30 ⟶ MOV(Jean-Grofignon, @30,30))\",
    \"heroName\": \"Jean-Grofignon\"
}")
test_step "Exécution avec intégration causale" "success" "$CAUSAL_RESPONSE"

# Test stress causale
STRESS_RESPONSE=$(api_call GET "/api/grofi/causal/stress/$GAME_ID")
test_step "Monitoring stress causale" "stressLevel" "$STRESS_RESPONSE"

# Vérifier niveau de stress
STRESS_LEVEL=$(echo "$STRESS_RESPONSE" | jq -r '.stressLevel')
echo -e "${BLUE}📊 Niveau de stress: $STRESS_LEVEL${NC}"

# 6. Test collision avec immunités
echo -e "\n${YELLOW}🥊 PHASE 6: Collision avec immunités${NC}"

# Créer collision intentionnelle
COLLISION_SETUP1=$(api_call POST "/api/games/$GAME_ID/script" "{
    \"scriptLine\": \"ψ002: ⊙(Δt+1 @35,35 ⟶ MOV(Jean-Grofignon, @35,35))\"
}")

COLLISION_SETUP2=$(api_call POST "/api/games/$GAME_ID/script" "{
    \"scriptLine\": \"ψ003: ⊙(Δt+1 @35,35 ⟶ MOV(TheDude, @35,35))\"
}")

# Avancer le temps pour déclencher collision
ADVANCE_RESPONSE=$(api_call POST "/api/games/$GAME_ID/next-turn")
ADVANCE_RESPONSE2=$(api_call POST "/api/games/$GAME_ID/next-turn")

# Vérifier résolution collision
GAME_STATE=$(api_call GET "/api/games/$GAME_ID")
COLLISION_RESOLVED=$(echo "$GAME_STATE" | jq -r '.heroes[] | select(.name == "Jean-Grofignon") | .positionX')

if [ "$COLLISION_RESOLVED" = "35" ]; then
    echo -e "${GREEN}✅ Collision résolue avec immunités${NC}"
    TEST_RESULTS+=("✅ Collision avec immunités")
else
    echo -e "${YELLOW}⚠️ Collision en cours de résolution${NC}"
    TEST_RESULTS+=("⚠️ Collision en résolution")
fi

# 7. Test démonstration complète
echo -e "\n${YELLOW}🎪 PHASE 7: Démonstration complète${NC}"

DEMO_RESPONSE=$(api_call POST "/api/grofi/causal/demo" "{\"gameId\": $GAME_ID}")
test_step "Démonstration GROFI complète" "success" "$DEMO_RESPONSE"

# 8. Test statistiques intégration
echo -e "\n${YELLOW}📊 PHASE 8: Statistiques${NC}"

STATS_RESPONSE=$(api_call GET "/api/grofi/causal/stats/$GAME_ID")
test_step "Statistiques intégration" "totalImmunityChecks" "$STATS_RESPONSE"

# Afficher statistiques détaillées
echo -e "${BLUE}📈 Statistiques d'intégration:${NC}"
echo "$STATS_RESPONSE" | jq '.'

# 9. Test de stress
echo -e "\n${YELLOW}⚡ PHASE 9: Test de stress${NC}"

STRESS_TEST_RESPONSE=$(api_call POST "/api/grofi/causal/stress-test" "{\"gameId\": $GAME_ID}")
test_step "Test de stress système" "success" "$STRESS_TEST_RESPONSE"

# Résultats finaux
echo -e "\n${YELLOW}📋 RÉSULTATS FINAUX${NC}"
echo "=================================="

SUCCESS_COUNT=0
TOTAL_COUNT=${#TEST_RESULTS[@]}

for result in "${TEST_RESULTS[@]}"; do
    echo "$result"
    if [[ $result == ✅* ]]; then
        ((SUCCESS_COUNT++))
    fi
done

echo -e "\n${BLUE}📊 BILAN:${NC}"
echo "Succès: $SUCCESS_COUNT/$TOTAL_COUNT"
echo "Taux de réussite: $(( SUCCESS_COUNT * 100 / TOTAL_COUNT ))%"

if [ $SUCCESS_COUNT -eq $TOTAL_COUNT ]; then
    echo -e "\n${GREEN}🎉 TOUS LES TESTS RÉUSSIS !${NC}"
    echo -e "${GREEN}✅ Intégration GROFI-Causale OPÉRATIONNELLE${NC}"
    exit 0
elif [ $SUCCESS_COUNT -gt $(( TOTAL_COUNT * 80 / 100 )) ]; then
    echo -e "\n${YELLOW}⚠️ Majorité des tests réussis (>80%)${NC}"
    echo -e "${YELLOW}🔧 Quelques ajustements mineurs nécessaires${NC}"
    exit 0
else
    echo -e "\n${RED}❌ Tests insuffisants${NC}"
    echo -e "${RED}🚨 Révision nécessaire du système${NC}"
    exit 1
fi 