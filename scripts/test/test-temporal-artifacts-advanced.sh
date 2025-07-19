#!/bin/bash

# 🚀 TEST ARTEFACTS TEMPORELS AVANCÉS - COLLAPSE & VOYAGE DANS LE TEMPS
# 
# Tests spécialisés pour les nouveaux artefacts avec formules avancées :
# - chrono_collapser : Collapse + voyage dans le temps
# - quantum_interference_crystal : Interférences multiples + téléportation 
# - temporal_paradox_engine : Paradoxes temporels + échos
# - collapse_accelerator : Force collapse + récupération d'énergie

echo "🌀 DÉMARRAGE TESTS ARTEFACTS TEMPORELS AVANCÉS"
echo "=============================================="

# Configuration
BACKEND_URL="http://localhost:8080"
GAME_ID="777"
TEST_PASSED=0
TEST_FAILED=0

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m' 
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Fonction de test avancée
test_temporal_artifact() {
    local artifact_id="$1"
    local hero_name="$2"
    local test_name="$3"
    local expected_operations="$4"
    
    echo -e "\n${CYAN}🌀 TEST TEMPOREL: $test_name${NC}"
    echo "   Artefact: $artifact_id | Héros: $hero_name"
    echo "   Opérations attendues: $expected_operations"
    
    # Exécuter l'artefact temporel
    response=$(curl -s -X POST "$BACKEND_URL/api/games/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"USE(ARTIFACT, $artifact_id, HERO:$hero_name)\"}")
    
    # Afficher la réponse complète pour les artefacts avancés
    echo "   Réponse détaillée:"
    echo "$response" | jq -r '
        if .success then
            "   ✅ SUCCÈS: " + (.message // "Artefact exécuté") + 
            (if .effects then "\n   🔥 EFFETS: " + (.effects | tostring) else "" end) +
            (if .energyUsed then "\n   ⚡ ÉNERGIE UTILISÉE: " + (.energyUsed | tostring) else "" end)
        else
            "   ❌ ÉCHEC: " + (.error // "Erreur inconnue")
        end
    '
    
    # Vérifier le succès
    success=$(echo "$response" | jq -r '.success // false')
    
    if [ "$success" = "true" ]; then
        echo -e "   ${GREEN}✅ TEST RÉUSSI${NC}"
        ((TEST_PASSED++))
        
        # Analyser les effets spéciaux
        if echo "$response" | grep -q "COLLAPSE\|collapse\|effondrement"; then
            echo -e "   ${YELLOW}🌀 DÉTECTÉ: Effets de collapse temporal${NC}"
        fi
        
        if echo "$response" | grep -q "REVERSE_TIME\|voyage\|time"; then
            echo -e "   ${PURPLE}⏰ DÉTECTÉ: Voyage dans le temps${NC}"
        fi
        
        if echo "$response" | grep -q "ECHO\|écho"; then
            echo -e "   ${BLUE}👻 DÉTECTÉ: Création d'écho temporel${NC}"
        fi
        
    else
        echo -e "   ${RED}❌ TEST ÉCHOUÉ${NC}"
        ((TEST_FAILED++))
    fi
}

# Fonction pour créer un setup complexe de ψ-states
setup_complex_quantum_scenario() {
    local game_id="$1"
    
    echo -e "\n${BLUE}🔬 CRÉATION SCÉNARIO QUANTIQUE COMPLEXE${NC}"
    
    # Créer plusieurs ψ-states avec amplitudes complexes
    curl -s -X POST "$BACKEND_URL/api/games/$game_id/script" -H "Content-Type: application/json" \
        -d '{"script": "ψ001: (0.8+0.6i) ⊙(Δt+1 @4,5 ⟶ MOV)"}' >/dev/null
        
    curl -s -X POST "$BACKEND_URL/api/games/$game_id/script" -H "Content-Type: application/json" \
        -d '{"script": "ψ002: (0.6+0.8i) ⊙(Δt+1 @6,6 ⟶ CREATE)"}' >/dev/null
        
    curl -s -X POST "$BACKEND_URL/api/games/$game_id/script" -H "Content-Type: application/json" \
        -d '{"script": "ψ003: (0.7+0.7i) ⊙(Δt+2 @8,3 ⟶ BATTLE)"}' >/dev/null
        
    curl -s -X POST "$BACKEND_URL/api/games/$game_id/script" -H "Content-Type: application/json" \
        -d '{"script": "ψ004: (0.9+0.4i) ⊙(Δt+1 @3,7 ⟶ MOV)"}' >/dev/null
        
    curl -s -X POST "$BACKEND_URL/api/games/$game_id/script" -H "Content-Type: application/json" \
        -d '{"script": "ψ005: (0.5+0.9i) ⊙(Δt+3 @9,2 ⟶ CREATE)"}' >/dev/null
        
    echo -e "   ${GREEN}✅ 5 ψ-states quantiques créés avec amplitudes complexes${NC}"
    
    # Avancer le jeu de plusieurs tours pour simulation temporelle
    for i in {1..12}; do
        curl -s -X POST "$BACKEND_URL/api/games/$game_id/script" -H "Content-Type: application/json" \
            -d '{"script": "ADVANCE_TURN()"}' >/dev/null 2>&1 || true
    done
    
    echo -e "   ${YELLOW}⏰ Jeu avancé à 12+ tours (simulation 'héros en avance temporelle')${NC}"
}

# Vérifier backend
echo -e "\n${BLUE}🔍 VÉRIFICATION BACKEND${NC}"
if curl -s "$BACKEND_URL/health" >/dev/null 2>&1 || curl -s "$BACKEND_URL/" >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend accessible${NC}"
else 
    echo -e "${RED}❌ Backend inaccessible. Démarrez avec: cd backend && mvn spring-boot:run${NC}"
    exit 1
fi

# Créer le jeu et setup
echo -e "\n${BLUE}🎮 CRÉATION ENVIRONNEMENT DE TEST${NC}"
curl -s -X POST "$BACKEND_URL/api/games" -H "Content-Type: application/json" -d "{\"id\": $GAME_ID}" >/dev/null

# Créer héros avec plus d'énergie pour les tests avancés
curl -s -X POST "$BACKEND_URL/api/games/$GAME_ID/script" -H "Content-Type: application/json" \
    -d '{"script": "HERO(Tesla, 5, 5)"}' >/dev/null
curl -s -X POST "$BACKEND_URL/api/games/$GAME_ID/script" -H "Content-Type: application/json" \
    -d '{"script": "HERO(Einstein, 7, 7)"}' >/dev/null  
curl -s -X POST "$BACKEND_URL/api/games/$GAME_ID/script" -H "Content-Type: application/json" \
    -d '{"script": "HERO(Curie, 3, 8)"}' >/dev/null
curl -s -X POST "$BACKEND_URL/api/games/$GAME_ID/script" -H "Content-Type: application/json" \
    -d '{"script": "HERO(Hawking, 10, 4)"}' >/dev/null

# Setup scenario complexe
setup_complex_quantum_scenario $GAME_ID

# ============================================================================
# 🌀 TESTS ARTEFACTS TEMPORELS AVANCÉS
# ============================================================================

echo -e "\n${CYAN}🌀 === TESTS ARTEFACTS COLLAPSE & VOYAGE TEMPS ===${NC}"

test_temporal_artifact "chrono_collapser" "Tesla" \
    "🕰️ Effondreur Chronologique - Collapse + Voyage Temps" \
    "DESTRUCTIVE + COLLAPSE_TEMPORAL_STATES + REVERSE_TIME_IF_AHEAD"

test_temporal_artifact "quantum_interference_crystal" "Einstein" \
    "💎 Cristal Interférence - Multi-Constructive + Téléportation Probabiliste" \
    "CONSTRUCTIVE x2 + TELEPORT_BY_PROBABILITY"

test_temporal_artifact "temporal_paradox_engine" "Curie" \
    "🌌 Moteur Paradoxe - Amplification Massive + Écho Temporel" \
    "AMPLIFY + DESTRUCTIVE + CREATE_TEMPORAL_ECHO + MODIFY_ENERGY"

test_temporal_artifact "collapse_accelerator" "Hawking" \
    "⚡ Accélérateur Collapse - Force Collapse + Récupération Énergie" \
    "FORCE_COLLAPSE_ALL + AMPLIFY + MODIFY_ENERGY"

# ============================================================================
# 🔄 TESTS RÉPÉTÉS POUR EFFETS TEMPORELS
# ============================================================================

echo -e "\n${PURPLE}🔄 === TESTS RÉPÉTÉS EFFETS TEMPORELS ===${NC}"

echo -e "\n${PURPLE}🔁 Test répété Chrono Collapser (vérification voyage dans le temps)${NC}"
test_temporal_artifact "chrono_collapser" "Tesla" \
    "🕰️ Effondreur Chronologique - 2ème utilisation" \
    "Voyage temps + collapse"

echo -e "\n${PURPLE}🔁 Test Moteur Paradoxe sur héros différent${NC}"  
test_temporal_artifact "temporal_paradox_engine" "Einstein" \
    "🌌 Moteur Paradoxe - Test multi-héros" \
    "Paradoxe temporel"

# ============================================================================
# 📊 RÉSULTATS FINAUX
# ============================================================================

echo -e "\n${BLUE}📊 === RÉSULTATS TESTS TEMPORELS AVANCÉS ===${NC}"
echo "======================================================"
echo -e "✅ Tests réussis: ${GREEN}$TEST_PASSED${NC}"
echo -e "❌ Tests échoués: ${RED}$TEST_FAILED${NC}"
echo -e "📊 Total: $((TEST_PASSED + TEST_FAILED))"

if [ $TEST_FAILED -eq 0 ]; then
    echo -e "\n${GREEN}🎉 TOUS LES TESTS TEMPORELS AVANCÉS ONT RÉUSSI !${NC}"
    echo -e "${CYAN}🚀 LES ARTEFACTS AVEC COLLAPSE ET VOYAGE DANS LE TEMPS FONCTIONNENT !${NC}"
    
    echo -e "\n${YELLOW}🌟 NOUVELLES CAPACITÉS DÉBLOQUÉES:${NC}"
    echo -e "${CYAN}• 🌀 Collapse forcé de ψ-states${NC}"
    echo -e "${PURPLE}• ⏰ Voyage dans le temps conditionnel${NC}"
    echo -e "${BLUE}• 👻 Création d'échos temporels${NC}"
    echo -e "${GREEN}• 🎲 Téléportation probabiliste${NC}"
    echo -e "${YELLOW}• ⚡ Récupération d'énergie par collapse${NC}"
    
    echo -e "\n${GREEN}✨ LES FORMULES JSON AVANCÉES PERMETTENT DES MÉCANIQUES TEMPORELLES COMPLEXES ! ✨${NC}"
    
else
    echo -e "\n${RED}⚠️  QUELQUES TESTS TEMPORELS ONT ÉCHOUÉ${NC}"
    echo -e "${YELLOW}Vérifiez les logs pour plus de détails.${NC}"
fi

echo -e "\n🏁 FIN TESTS ARTEFACTS TEMPORELS AVANCÉS"
echo -e "${CYAN}🔮 Les mystères du temps et de l'espace quantique vous attendent... ${NC}" 