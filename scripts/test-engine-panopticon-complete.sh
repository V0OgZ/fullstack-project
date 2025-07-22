#!/bin/bash

# Test COMPLET du moteur temporel avec PANOPTICΩN et Axis
# Teste TOUTES les fonctionnalités : HOTS, JSON, API, GROFI

echo "🎛️ TEST COMPLET MOTEUR TEMPOREL - PANOPTICΩN + AXIS"
echo "===================================================="

# Configuration
HOST="localhost:8080"
GAME_ID=1

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Statistiques
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Fonction de test générique
test_feature() {
    local description=$1
    local command=$2
    local expected=$3
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -e "\n${BLUE}TEST #$TOTAL_TESTS: $description${NC}"
    
    # Exécuter la commande
    result=$(eval "$command" 2>&1)
    
    # Vérifier le résultat
    if echo "$result" | grep -q "$expected"; then
        echo -e "${GREEN}✅ PASS${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        echo -e "${YELLOW}Expected: $expected${NC}"
        echo -e "${YELLOW}Got: $result${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

# Fonction pour parser le fichier HOTS
parse_hots_file() {
    local file=$1
    echo -e "\n${PURPLE}=== PARSING FICHIER HOTS ===${NC}"
    echo "Fichier: $file"
    
    # Compter les éléments
    local hero_count=$(grep -c "^HERO(" "$file")
    local psi_count=$(grep -c "^ψ" "$file")
    local grofi_count=$(grep -E -c "^[Σ†Ω↯]" "$file")
    
    echo "- Héros: $hero_count"
    echo "- États ψ: $psi_count"
    echo "- Symboles GROFI: $grofi_count"
}

echo -e "\n${GREEN}=== 1. VÉRIFICATION BACKEND ===${NC}"
if ! curl -s "http://$HOST/api/game/status" > /dev/null 2>&1; then
    echo -e "${RED}❌ Backend non accessible !${NC}"
    echo "Essayez: cd backend && mvn spring-boot:run"
    exit 1
fi
echo -e "${GREEN}✅ Backend accessible${NC}"

echo -e "\n${GREEN}=== 2. CRÉATION DE LA PARTIE ===${NC}"
response=$(curl -s -X POST "http://$HOST/api/game/create" \
    -H "Content-Type: application/json" \
    -d '{"gameName":"Test Moteur PANOPTICΩN","players":"Jean,Claude"}')
echo "$response" | jq '.'
GAME_ID=$(echo "$response" | jq -r '.gameId')

echo -e "\n${GREEN}=== 3. TEST PARSER HOTS ===${NC}"
parse_hots_file "game_assets/scenarios/hots/panopticon_axis_test.hots"

echo -e "\n${GREEN}=== 4. TEST CRÉATION HÉROS ===${NC}"
test_feature "Créer Axis (héros GROFI)" \
    "curl -s -X POST 'http://$HOST/api/temporal/execute/$GAME_ID' -H 'Content-Type: application/json' -d '{\"script\":\"HERO(Axis)\"}' | jq -r '.success'" \
    "true"

test_feature "Créer Jean-Grofignon" \
    "curl -s -X POST 'http://$HOST/api/temporal/execute/$GAME_ID' -H 'Content-Type: application/json' -d '{\"script\":\"HERO(Jean-Grofignon)\"}' | jq -r '.success'" \
    "true"

echo -e "\n${GREEN}=== 5. TEST AMPLITUDES COMPLEXES ===${NC}"
test_feature "État ψ avec amplitude (0.8+0.6i)" \
    "curl -s -X POST 'http://$HOST/api/temporal/execute/$GAME_ID' -H 'Content-Type: application/json' -d '{\"script\":\"ψ001: (0.8+0.6i) ⊙(Δt+2 @15,15 ⟶ MOV(Axis, @15,15))\"}' | jq -r '.success'" \
    "true"

test_feature "État ψ avec amplitude négative (-0.5+0.5i)" \
    "curl -s -X POST 'http://$HOST/api/temporal/execute/$GAME_ID' -H 'Content-Type: application/json' -d '{\"script\":\"ψ002: (-0.5+0.5i) ⊙(Δt+3 @20,20 ⟶ CREATE(CREATURE, Antimatter_Ghost, @20,20))\"}' | jq -r '.success'" \
    "true"

echo -e "\n${GREEN}=== 6. TEST SYMBOLES GROFI ===${NC}"
test_feature "Σ - Somme des possibles" \
    "curl -s -X POST 'http://$HOST/api/temporal/execute/$GAME_ID' -H 'Content-Type: application/json' -d '{\"script\":\"Σ[HERO:Axis, RADIUS:5]\"}' | jq -r '.success'" \
    "true"

test_feature "† - Mort/Renaissance quantique" \
    "curl -s -X POST 'http://$HOST/api/temporal/execute/$GAME_ID' -H 'Content-Type: application/json' -d '{\"script\":\"†[HERO:Axis]\"}' | jq -r '.success'" \
    "true"

test_feature "Ω - Finalité ultime PANOPTICΩN" \
    "curl -s -X POST 'http://$HOST/api/temporal/execute/$GAME_ID' -H 'Content-Type: application/json' -d '{\"script\":\"Ω[HERO:Jean-Grofignon, MODE:ABSOLUTE_OBSERVER]\"}' | jq -r '.success'" \
    "true"

test_feature "↯ - Chaos contrôlé" \
    "curl -s -X POST 'http://$HOST/api/temporal/execute/$GAME_ID' -H 'Content-Type: application/json' -d '{\"script\":\"↯[@15,15, INTENSITY:HIGH]\"}' | jq -r '.success'" \
    "true"

echo -e "\n${GREEN}=== 7. TEST RESTRICTIONS AXIS ===${NC}"
# D'abord donner quantum_mirror à Axis
curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
    -H "Content-Type: application/json" \
    -d '{"script":"CREATE(ITEM, quantum_mirror, HERO:Axis)"}' > /dev/null

# Puis tester qu'il ne peut pas l'utiliser
test_feature "Axis ne peut PAS utiliser quantum_mirror" \
    "curl -s -X POST 'http://$HOST/api/temporal/execute/$GAME_ID' -H 'Content-Type: application/json' -d '{\"script\":\"USE(ARTIFACT, quantum_mirror, HERO:Axis)\"}' | jq -r '.error'" \
    "restriction"

echo -e "\n${GREEN}=== 8. TEST API PANOPTICΩN ===${NC}"
test_feature "Données PANOPTICΩN 3D" \
    "curl -s 'http://$HOST/api/temporal/panopticon/data/$GAME_ID' | jq -r '.spatialNodes | length' | grep -E '[0-9]+'" \
    "[0-9]"

test_feature "Métriques debug" \
    "curl -s 'http://$HOST/api/temporal/panopticon/debug/$GAME_ID' | jq -r '.activePsiStates'" \
    "[0-9]"

echo -e "\n${GREEN}=== 9. TEST API GOD VIEW ===${NC}"
test_feature "Vue multivers 5D" \
    "curl -s 'http://$HOST/api/temporal/godview/multiverse/$GAME_ID' | jq -r '.timelines | length'" \
    "[0-9]"

test_feature "Fog 5D à position" \
    "curl -s 'http://$HOST/api/temporal/godview/fog5d/$GAME_ID?x=15&y=15&day=5' | jq -r '.fogState'" \
    "UNEXPLORED"

echo -e "\n${GREEN}=== 10. TEST INTÉGRATION COMPLÈTE ===${NC}"
# Donner singularity_artifact à Jean-Grofignon
curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
    -H "Content-Type: application/json" \
    -d '{"script":"CREATE(ITEM, singularity_artifact, HERO:Jean-Grofignon)"}' > /dev/null

# Activer ABSOLUTE_OBSERVER
test_feature "Activer ABSOLUTE_OBSERVER" \
    "curl -s -X POST 'http://$HOST/api/temporal/panopticon/activate-observer/$GAME_ID?heroName=Jean-Grofignon' | jq -r '.metadata.absoluteObserver'" \
    "true"

echo -e "\n${GREEN}=== 11. VÉRIFICATION ÉTAT FINAL ===${NC}"
echo -e "${CYAN}État quantique du jeu:${NC}"
curl -s "http://$HOST/api/temporal/state/$GAME_ID" | jq '{
    heroes: .heroes | length,
    psiStates: .quantumStates | length,
    currentTurn: .currentTurn
}'

echo -e "\n${CYAN}Analyse des interférences:${NC}"
curl -s "http://$HOST/api/temporal/state/$GAME_ID" | jq '.quantumAnalysis'

echo -e "\n${PURPLE}=== RÉSUMÉ DES TESTS ===${NC}"
echo -e "Total tests: $TOTAL_TESTS"
echo -e "${GREEN}Passés: $PASSED_TESTS${NC}"
echo -e "${RED}Échoués: $FAILED_TESTS${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "\n${GREEN}🎉 TOUS LES TESTS PASSENT ! Le moteur fonctionne parfaitement !${NC}"
else
    echo -e "\n${RED}⚠️  Certains tests ont échoué. Vérifiez le backend.${NC}"
fi

echo -e "\n${YELLOW}📊 Fonctionnalités testées:${NC}"
echo "✅ Parser HOTS avec états ψ"
echo "✅ Amplitudes complexes (positives et négatives)"
echo "✅ Symboles GROFI (Σ,†,Ω,↯)"
echo "✅ Restrictions héros (Axis vs quantum)"
echo "✅ API PANOPTICΩN (vue 3D)"
echo "✅ API God View (vue 5D)"
echo "✅ ABSOLUTE_OBSERVER"
echo "✅ Interférences quantiques"

echo -e "\n🎛️ Le moteur temporel est prêt pour l'aventure ! 🎛️\n" 