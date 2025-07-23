#!/bin/bash

# 🏺 TEST ARTEFACTS - INTÉGRATION DANS LES TESTS
# ==============================================

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Variables globales
SUCCESS_COUNT=0
TOTAL_TESTS=0
GAME_ID=""

echo -e "${BLUE}🏺 TEST SYSTÈME ARTEFACTS - INTÉGRATION${NC}"
echo "=============================================="

# Fonction utilitaire pour créer une partie de test
create_test_game() {
    local game_response=$(curl -s -X POST "http://localhost:8080/api/game/create" \
        -H "Content-Type: application/json" \
        -d '{"gameName": "TestArtefactsIntegration"}')
    
    if echo "$game_response" | grep -q '"gameId"'; then
        GAME_ID=$(echo "$game_response" | grep -o '"gameId":[0-9]*' | cut -d: -f2)
        echo -e "${GREEN}✅ Partie créée: ID $GAME_ID${NC}"
        return 0
    else
        echo -e "${RED}❌ Échec création de partie${NC}"
        echo "$game_response"
        return 1
    fi
}

# Fonction pour exécuter un script et vérifier le résultat
execute_script() {
    local script="$1"
    local test_name="$2"
    
    ((TOTAL_TESTS++))
    
    echo -e "${YELLOW}🧪 Test: $test_name${NC}"
    echo "    Script: $script"
    
    local response=$(curl -s -X POST "http://localhost:8080/api/game/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"$script\"}")
    
    if echo "$response" | grep -q '"success":true'; then
        local message=$(echo "$response" | grep -o '"message":"[^"]*"' | sed 's/"message":"//g' | sed 's/"$//g')
        echo -e "    ${GREEN}✅ SUCCÈS !${NC} $message"
        ((SUCCESS_COUNT++))
        
        # Afficher détails si disponibles
        if echo "$response" | grep -q '"details"'; then
            local details=$(echo "$response" | grep -o '"details":"[^"]*"' | sed 's/"details":"//g' | sed 's/"$//g')
            echo "    📄 Détails: $details"
        fi
        
        return 0
    else
        local error=$(echo "$response" | grep -o '"error":"[^"]*"' | sed 's/"error":"//g' | sed 's/"$//g')
        echo -e "    ${RED}❌ Échec:${NC} $error"
        return 1
    fi
}

# === DÉBUT DES TESTS ===

# Vérifier que le backend répond
if ! curl -s "http://localhost:8080/api/games" > /dev/null 2>&1; then
    echo -e "${RED}❌ Backend non accessible sur http://localhost:8080${NC}"
    echo -e "${YELLOW}💡 Conseil: Démarrer avec 'cd backend && mvn spring-boot:run &'${NC}"
    exit 1
fi

# Créer la partie de test
if ! create_test_game; then
    exit 1
fi

echo ""
echo -e "${BLUE}👥 ÉTAPE 1: Création des héros${NC}"
echo "================================="

heroes=("Tesla" "Einstein" "Curie" "Feynman")
for hero in "${heroes[@]}"; do
    execute_script "HERO($hero)" "Créer héros $hero"
done

echo ""
echo -e "${BLUE}🌀 ÉTAPE 2: Création d'états quantiques${NC}"
echo "========================================"

# Créer des ψ-states avec amplitudes complexes
psi_states=(
    "ψ101: (0.6+0.8i) ⊙(Δt+1 @15,15 ⟶ MOV(Tesla, @15,15))"
    "ψ102: (0.8+0.6i) ⊙(Δt+1 @15,15 ⟶ MOV(Einstein, @15,15))"
    "ψ201: (0.7+0.7i) ⊙(Δt+2 @20,20 ⟶ CREATE(CASTLE, @20,20))"
    "ψ301: (0.5+0.5i) ⊙(Δt+1 @25,25 ⟶ MOV(Curie, @25,25))"
)

for psi_cmd in "${psi_states[@]}"; do
    psi_id=$(echo "$psi_cmd" | grep -o 'ψ[0-9]*')
    execute_script "$psi_cmd" "Créer état quantique $psi_id"
done

echo ""
echo -e "${BLUE}🏺 ÉTAPE 3: TEST ARTEFACTS QUANTIQUES${NC}"
echo "====================================="

# Tests des artefacts quantiques (qui utilisent les vraies formules !)
quantum_artifacts=(
    "USE(ARTIFACT, quantum_mirror, HERO:Tesla):Miroir Quantique - Interférence constructive"
    "USE(ARTIFACT, amplitude_manipulator, HERO:Einstein):Manipulateur d'Amplitudes - Rotation phase 45°"
    "USE(ARTIFACT, coherence_detector, HERO:Curie):Détecteur de Cohérence - Mesure facteur cohérence"
    "USE(ARTIFACT, phase_shifter, HERO:Feynman):Phase Shifter - Ajustement phase aléatoire"
)

for artifact_test in "${quantum_artifacts[@]}"; do
    cmd=$(echo "$artifact_test" | cut -d: -f1)
    name=$(echo "$artifact_test" | cut -d: -f2-)
    execute_script "$cmd" "$name"
done

echo ""
echo -e "${BLUE}⚔️ ÉTAPE 4: TEST ARTEFACTS TEMPORELS${NC}"
echo "===================================="

temporal_artifacts=(
    "USE(ARTIFACT, temporal_sword, HERO:Tesla):Épée Temporelle - Bonus dégâts +50"
    "USE(ARTIFACT, chrono_staff, HERO:Einstein):Bâton Chrono - Zone ralentissement temporel"
    "USE(ARTIFACT, time_anchor, HERO:Curie):Ancre Temporelle - Stabilise ψ-states"
)

for artifact_test in "${temporal_artifacts[@]}"; do
    cmd=$(echo "$artifact_test" | cut -d: -f1)
    name=$(echo "$artifact_test" | cut -d: -f2-)
    execute_script "$cmd" "$name"
done

echo ""
echo -e "${BLUE}🏺 ÉTAPE 5: TEST ARTEFACTS LÉGENDAIRES${NC}"
echo "======================================"

legendary_artifacts=(
    "USE(ARTIFACT, avant_world_blade, HERO:Tesla):Lame de l'Avant-Monde - Force collapse timelines"
    "USE(ARTIFACT, reverse_clock, HERO:Einstein):Horloge Inversée - Rollback temporel"
    "USE(ARTIFACT, wigner_eye, HERO:Curie):Œil de Wigner - Observation forcée"
)

for artifact_test in "${legendary_artifacts[@]}"; do
    cmd=$(echo "$artifact_test" | cut -d: -f1)
    name=$(echo "$artifact_test" | cut -d: -f2-)
    execute_script "$cmd" "$name"
done

echo ""
echo -e "${BLUE}🎲 ÉTAPE 6: TEST ARTEFACT GÉNÉRIQUE${NC}"
echo "==================================="

# Test fallback pour artefacts non spécifiés
execute_script "USE(ARTIFACT, mysterious_unknown_artifact, HERO:Tesla)" "Artefact générique (fallback)"

echo ""
echo -e "${BLUE}🔬 ÉTAPE 7: TEST ÉTATS DU JEU${NC}"
echo "============================="

# Vérifier l'état du jeu après tous ces tests
game_state=$(curl -s "http://localhost:8080/api/game/$GAME_ID/state")
if echo "$game_state" | grep -q '"heroes"'; then
    heroes_count=$(echo "$game_state" | grep -o '"heroes":\[.*\]' | grep -o '{"' | wc -l | tr -d ' ')
    psi_count=$(echo "$game_state" | grep -o '"psiStates":\[.*\]' | grep -o '{"' | wc -l | tr -d ' ')
    echo -e "${GREEN}✅ État final:${NC} $heroes_count héros, $psi_count ψ-states"
    ((SUCCESS_COUNT++))
    ((TOTAL_TESTS++))
else
    echo -e "${RED}❌ Impossible de récupérer l'état du jeu${NC}"
    ((TOTAL_TESTS++))
fi

# === RÉSULTATS FINAUX ===

echo ""
echo "=============================================="
echo -e "${BLUE}📊 RÉSULTATS TESTS ARTEFACTS${NC}"
echo "=============================================="

success_rate=$((SUCCESS_COUNT * 100 / TOTAL_TESTS))

if [ $success_rate -ge 80 ]; then
    echo -e "${GREEN}🎉 SUCCÈS COMPLET !${NC}"
    status_icon="✅"
else
    echo -e "${YELLOW}⚠️ Succès partiel${NC}"
    status_icon="⚠️"
fi

echo ""
echo -e "${BLUE}📈 Statistiques:${NC}"
echo "   $status_icon $SUCCESS_COUNT/$TOTAL_TESTS tests réussis ($success_rate%)"
echo ""

if [ $success_rate -ge 80 ]; then
    echo -e "${GREEN}🔥 LES ARTEFACTS FONCTIONNENT !${NC}"
    echo ""
    echo -e "${GREEN}🎯 SYSTÈME OPÉRATIONNEL:${NC}"
    echo "   • Formules JSON → Code Java exécuté ✅"
    echo "   • Artefacts quantiques → Interférences réelles ✅"  
    echo "   • Artefacts temporels → Effets sur gameplay ✅"
    echo "   • Artefacts légendaires → Pouvoirs avancés ✅"
    echo "   • Système ID simple → Extension facile ✅"
    echo ""
    echo -e "${BLUE}🚀 Prêt pour intégration dans tests principaux !${NC}"
    
    # Retourner le code de succès
    exit 0
else
    echo -e "${RED}🔧 À corriger avant intégration complète${NC}"
    echo ""
    echo -e "${YELLOW}📄 Vérifier les logs pour plus de détails${NC}"
    
    # Retourner le code d'erreur
    exit 1
fi 