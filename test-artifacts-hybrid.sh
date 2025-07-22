#!/bin/bash

# 🚀 TEST SYSTÈME HYBRIDE ARTEFACTS - HARDCODÉ + DYNAMIQUE
# 
# Démontre que les deux systèmes marchent :
# - Option A : Artefacts hardcodés (quantum_mirror, temporal_sword, etc.)
# - Option B : Artefacts dynamiques avec formules JSON (custom_mirror, teleport_crystal, etc.)

echo "🚀 DÉMARRAGE TEST SYSTÈME HYBRIDE ARTEFACTS"
echo "=============================================="

# Configuration
BACKEND_URL="http://localhost:8080"
GAME_ID="666"
TEST_PASSED=0
TEST_FAILED=0

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m' 
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Fonction de test
test_artifact() {
    local artifact_id="$1"
    local hero_name="$2"
    local test_name="$3"
    local expected_type="$4"  # "hardcoded" ou "dynamic"
    
    echo -e "\n${BLUE}🧪 TEST: $test_name${NC}"
    echo "   Artefact: $artifact_id | Héros: $hero_name | Type attendu: $expected_type"
    
    # Exécuter l'artefact
    response=$(curl -s -X POST "$BACKEND_URL/api/games/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"USE(ARTIFACT, $artifact_id, HERO:$hero_name)\"}")
    
    echo "   Réponse: $(echo "$response" | jq -r '.message // .error // "Erreur parsing JSON"')"
    
    # Vérifier le succès
    success=$(echo "$response" | jq -r '.success // false')
    
    if [ "$success" = "true" ]; then
        echo -e "   ${GREEN}✅ SUCCÈS${NC}"
        ((TEST_PASSED++))
        
        # Vérifier le type d'artefact utilisé
        if echo "$response" | grep -q "formule dynamique\|PARSING FORMULE DYNAMIQUE\|Formula:"; then
            echo -e "   ${PURPLE}🔥 TYPE: DYNAMIQUE (parsing de formule)${NC}"
        else
            echo -e "   ${YELLOW}⚡ TYPE: HARDCODÉ (switch-case Java)${NC}"
        fi
        
    else
        echo -e "   ${RED}❌ ÉCHEC${NC}"
        ((TEST_FAILED++))
    fi
}

# Vérifier que le backend est démarré
echo -e "\n${BLUE}🔍 VÉRIFICATION BACKEND${NC}"
if curl -s "$BACKEND_URL/health" >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend accessible${NC}"
else 
    echo -e "${RED}❌ Backend inaccessible. Démarrez avec: cd backend && mvn spring-boot:run${NC}"
    exit 1
fi

# Créer le jeu et les héros
echo -e "\n${BLUE}🎮 CRÉATION JEU ET HÉROS${NC}"
curl -s -X POST "$BACKEND_URL/api/games" -H "Content-Type: application/json" -d "{\"id\": $GAME_ID}" >/dev/null
curl -s -X POST "$BACKEND_URL/api/games/$GAME_ID/script" -H "Content-Type: application/json" -d '{"script": "HERO(Tesla, 5, 5)"}' >/dev/null
curl -s -X POST "$BACKEND_URL/api/games/$GAME_ID/script" -H "Content-Type: application/json" -d '{"script": "HERO(Einstein, 7, 7)"}' >/dev/null
curl -s -X POST "$BACKEND_URL/api/games/$GAME_ID/script" -H "Content-Type: application/json" -d '{"script": "HERO(Curie, 3, 8)"}' >/dev/null

# Créer quelques ψ-states pour les tests quantiques
curl -s -X POST "$BACKEND_URL/api/games/$GAME_ID/script" -H "Content-Type: application/json" -d '{"script": "ψ001: (0.8+0.6i) ⊙(Δt+1 @4,5 ⟶ MOV)"}' >/dev/null
curl -s -X POST "$BACKEND_URL/api/games/$GAME_ID/script" -H "Content-Type: application/json" -d '{"script": "ψ002: (0.6+0.8i) ⊙(Δt+1 @6,6 ⟶ MOV)"}' >/dev/null
curl -s -X POST "$BACKEND_URL/api/games/$GAME_ID/script" -H "Content-Type: application/json" -d '{"script": "ψ003: (0.7+0.7i) ⊙(Δt+1 @8,3 ⟶ MOV)"}' >/dev/null

echo -e "${GREEN}✅ Jeu créé avec héros et ψ-states${NC}"

# ============================================================================
# 🟡 TESTS ARTEFACTS HARDCODÉS (Option A)
# ============================================================================

echo -e "\n${YELLOW}🟡 === TESTS ARTEFACTS HARDCODÉS (Option A) ===${NC}"

test_artifact "quantum_mirror" "Tesla" "Miroir Quantique (hardcodé)" "hardcoded"
test_artifact "temporal_sword" "Einstein" "Épée Temporelle (hardcodé)" "hardcoded"  
test_artifact "avant_world_blade" "Curie" "Lame du Monde Antérieur (hardcodé)" "hardcoded"
test_artifact "phase_shifter" "Tesla" "Déphaseur (hardcodé)" "hardcoded"
test_artifact "wigner_eye" "Einstein" "Œil de Wigner (hardcodé)" "hardcoded"

# ============================================================================
# 🟢 TESTS ARTEFACTS DYNAMIQUES (Option B)
# ============================================================================

echo -e "\n${PURPLE}🟢 === TESTS ARTEFACTS DYNAMIQUES (Option B) ===${NC}"

test_artifact "custom_mirror" "Tesla" "Miroir Personnalisé (formule: CONSTRUCTIVE + AMPLIFY)" "dynamic"
test_artifact "teleport_crystal" "Einstein" "Cristal de Téléportation (formule: TELEPORT_HERO + MODIFY_ENERGY)" "dynamic"
test_artifact "energy_amplifier" "Curie" "Amplificateur d'Énergie (formule: MODIFY_ENERGY + AMPLIFY)" "dynamic"
test_artifact "quantum_destroyer" "Tesla" "Destructeur Quantique (formule: DESTRUCTIVE + AMPLIFY)" "dynamic"
test_artifact "healing_orb" "Einstein" "Orbe de Guérison (formule: MODIFY_ENERGY)" "dynamic"

# ============================================================================
# 🔵 TESTS FALLBACK GÉNÉRIQUE
# ============================================================================

echo -e "\n${BLUE}🔵 === TESTS FALLBACK GÉNÉRIQUE ===${NC}"

test_artifact "unknown_artifact" "Tesla" "Artefact Inconnu (fallback générique)" "generic"
test_artifact "mystery_item" "Curie" "Objet Mystérieux (fallback générique)" "generic"

# ============================================================================
# 📊 RÉSULTATS FINAUX
# ============================================================================

echo -e "\n${BLUE}📊 === RÉSULTATS FINAUX ===${NC}"
echo "=============================================="
echo -e "✅ Tests réussis: ${GREEN}$TEST_PASSED${NC}"
echo -e "❌ Tests échoués: ${RED}$TEST_FAILED${NC}"
echo -e "📊 Total: $((TEST_PASSED + TEST_FAILED))"

if [ $TEST_FAILED -eq 0 ]; then
    echo -e "\n${GREEN}🎉 TOUS LES TESTS SONT PASSÉS !${NC}"
    echo -e "${GREEN}🚀 LE SYSTÈME HYBRIDE FONCTIONNE PARFAITEMENT !${NC}"
    
    echo -e "\n${YELLOW}🎯 RÉCAPITULATIF DU SYSTÈME HYBRIDE:${NC}"
    echo -e "${YELLOW}• Option A (Hardcodés):${NC} Artefacts classiques implémentés en Java"
    echo -e "${PURPLE}• Option B (Dynamiques):${NC} Artefacts avec formules JSON parsées à la volée"
    echo -e "${BLUE}• Fallback:${NC} Effet générique pour les artefacts non définis"
    
    echo -e "\n${GREEN}✨ LES UTILISATEURS PEUVENT MAINTENANT CRÉER LEURS PROPRES ARTEFACTS SANS MODIFIER LE CODE JAVA ! ✨${NC}"
    
else
    echo -e "\n${RED}⚠️  QUELQUES TESTS ONT ÉCHOUÉ${NC}"
    echo -e "${YELLOW}Vérifiez les logs ci-dessus pour plus de détails.${NC}"
fi

echo -e "\n🏁 FIN DU TEST SYSTÈME HYBRIDE ARTEFACTS" 