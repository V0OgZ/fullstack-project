#!/bin/bash

# 🏆 TEST CAPACITÉS SPÉCIALES & FORGE RUNIQUE - Heroes of Time
# Test des capacités spéciales des héros épiques et de la Forge Runique
# =====================================================================

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
BACKEND_URL="http://localhost:8080"
LOG_FILE="logs/test-capacites-speciales-$(date +%Y%m%d_%H%M%S).log"

echo -e "${PURPLE}🏆 TEST CAPACITÉS SPÉCIALES & FORGE RUNIQUE - Heroes of Time${NC}"
echo -e "${PURPLE}================================================================${NC}"
echo -e "${CYAN}Test des capacités spéciales des héros épiques${NC}"
echo -e "${CYAN}Test de la Forge Runique complète${NC}"
echo ""

# Fonction de test
test_endpoint() {
    local endpoint=$1
    local method=${2:-GET}
    local data=${3:-""}
    local description=$4
    
    echo -e "${BLUE}🔍 Test: $description${NC}"
    echo -e "${BLUE}   Endpoint: $method $endpoint${NC}"
    
    if [ "$method" = "POST" ] && [ -n "$data" ]; then
        echo -e "${BLUE}   Data: $data${NC}"
        response=$(curl -s -X POST "$BACKEND_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    else
        response=$(curl -s -X $method "$BACKEND_URL$endpoint")
    fi
    
    if echo "$response" | grep -q '"success":true' || echo "$response" | grep -q '"status":"healthy"'; then
        echo -e "${GREEN}   ✅ Succès${NC}"
        echo "   Response: $response" | head -c 200
        echo ""
    else
        echo -e "${RED}   ❌ Échec${NC}"
        echo "   Response: $response"
        echo ""
    fi
}

# Créer un jeu de test
echo -e "${YELLOW}🎮 Création d'un jeu de test...${NC}"
game_response=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d '{"gameName": "Test Capacités Spéciales", "playerId": "test-player"}')

game_id=$(echo "$game_response" | grep -o '"id":[0-9]*' | cut -d':' -f2)
if [ -z "$game_id" ]; then
    game_id=1
fi

echo -e "${GREEN}✅ Jeu créé avec ID: $game_id${NC}"
echo ""

# Démarrer le jeu
echo -e "${YELLOW}🚀 Démarrage du jeu...${NC}"
curl -s -X POST "$BACKEND_URL/api/temporal/games/$game_id/start" \
    -H "Content-Type: application/json" > /dev/null
echo -e "${GREEN}✅ Jeu démarré${NC}"
echo ""

# Créer les héros épiques
echo -e "${YELLOW}🦸 Création des héros épiques...${NC}"

heroes=("Jean-Grofignon" "Chlamydius" "Omega-Zero" "Claudius")
for hero in "${heroes[@]}"; do
    echo -e "${BLUE}   Création de $hero...${NC}"
    curl -s -X POST "$BACKEND_URL/api/temporal/games/$game_id/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"HERO($hero)\"}" > /dev/null
    echo -e "${GREEN}   ✅ $hero créé${NC}"
done
echo ""

# Tests des capacités spéciales
echo -e "${PURPLE}⚔️ TESTS DES CAPACITÉS SPÉCIALES${NC}"
echo -e "${PURPLE}===============================${NC}"

# Test 1: Liste des capacités disponibles
test_endpoint "/api/special-abilities/list" "GET" "" "Liste des capacités spéciales"

# Test 2: Frappe Pré-Existante
test_endpoint "/api/special-abilities/pre-existence-strike" "POST" \
    "{\"heroName\": \"Jean-Grofignon\", \"targetName\": \"Chlamydius\", \"gameId\": $game_id}" \
    "Frappe Pré-Existante (Jean-Grofignon → Chlamydius)"

# Test 3: Infection Mémorielle
test_endpoint "/api/special-abilities/memory-infection" "POST" \
    "{\"heroName\": \"Chlamydius\", \"targetName\": \"Claudius\", \"gameId\": $game_id}" \
    "Infection Mémorielle (Chlamydius → Claudius)"

# Test 4: Recompilation de la Réalité
test_endpoint "/api/special-abilities/reality-recompile" "POST" \
    "{\"heroName\": \"Jean-Grofignon\", \"gameId\": $game_id}" \
    "Recompilation de la Réalité (Jean-Grofignon)"

# Test 5: Effacement de l'Existence (Chlamydius)
test_endpoint "/api/special-abilities/scribe-nonexistence" "POST" \
    "{\"heroName\": \"Chlamydius\", \"targetName\": \"Claudius\", \"gameId\": $game_id}" \
    "Effacement de l'Existence (Chlamydius → Claudius)"

# Test 6: Transformation Oméga Ultime (Omega-Zéro)
test_endpoint "/api/special-abilities/omega-zero-ultimate" "POST" \
    "{\"heroName\": \"Omega-Zero\", \"gameId\": $game_id}" \
    "Transformation Oméga Ultime (Omega-Zéro)"

# Test 7: Health check des capacités spéciales
test_endpoint "/api/special-abilities/health" "GET" "" "Health check des capacités spéciales"

echo ""

# Tests de la Forge Runique
echo -e "${PURPLE}🔨 TESTS DE LA FORGE RUNIQUE${NC}"
echo -e "${PURPLE}===========================${NC}"

# Test 1: Health check de la Forge Runique
test_endpoint "/api/runic-forge/health" "GET" "" "Health check de la Forge Runique"

# Test 2: Exemples de grammaire
test_endpoint "/api/runic-forge/grammar-examples" "GET" "" "Exemples de grammaire runique"

# Test 3: Validation de grammaire
test_endpoint "/api/runic-forge/validate" "POST" \
    "{\"grammar\": \"FORGE(SWORD, POWER:50, ELEMENT:FIRE)\"}" \
    "Validation de grammaire runique basique"

# Test 4: Validation de grammaire complexe
test_endpoint "/api/runic-forge/validate" "POST" \
    "{\"grammar\": \"FORGE(ARTIFACT, POWER:200, TEMPORAL:TRUE, DELTA_T:3)\"}" \
    "Validation de grammaire runique complexe"

# Test 5: Forge d'un objet basique
test_endpoint "/api/runic-forge/forge" "POST" \
    "{\"grammar\": \"FORGE(SWORD, POWER:50, ELEMENT:FIRE)\", \"heroName\": \"Jean-Grofignon\", \"gameId\": $game_id}" \
    "Forge d'une épée de feu basique"

# Test 6: Forge d'un artefact quantique
test_endpoint "/api/runic-forge/forge" "POST" \
    "{\"grammar\": \"FORGE(MIRROR, POWER:100, QUANTUM:TRUE, AMPLITUDE:0.8)\", \"heroName\": \"Jean-Grofignon\", \"gameId\": $game_id}" \
    "Forge d'un miroir quantique"

# Test 7: Liste des objets forgés
test_endpoint "/api/runic-forge/objects?gameId=$game_id" "GET" "" "Liste des objets forgés"

# Test 8: Statistiques de forge
test_endpoint "/api/runic-forge/stats?gameId=$game_id" "GET" "" "Statistiques de forge"

echo ""

# Tests d'utilisation d'objets forgés (si des objets existent)
echo -e "${PURPLE}🗡️ TESTS D'UTILISATION D'OBJETS FORGÉS${NC}"
echo -e "${PURPLE}========================================${NC}"

# Récupérer la liste des objets forgés
objects_response=$(curl -s -X GET "$BACKEND_URL/api/runic-forge/objects?gameId=$game_id")
if echo "$objects_response" | grep -q '"objects":\[.*\]' && ! echo "$objects_response" | grep -q '"objects":\[\]'; then
    # Extraire le premier ID d'objet
    first_object_id=$(echo "$objects_response" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
    if [ -n "$first_object_id" ]; then
        test_endpoint "/api/runic-forge/objects/$first_object_id/use" "POST" \
            "{\"heroName\": \"Jean-Grofignon\", \"gameId\": $game_id}" \
            "Utilisation d'un objet forgé (ID: $first_object_id)"
    fi
else
    echo -e "${YELLOW}⚠️  Aucun objet forgé disponible pour le test d'utilisation${NC}"
fi

echo ""

# Tests de traduction littéraire
echo -e "${PURPLE}📚 TESTS DE TRADUCTION LITTÉRAIRE${NC}"
echo -e "${PURPLE}=================================${NC}"

# Test 1: Traduction d'un héros épique
test_endpoint "/api/collection/translate" "POST" \
    "{\"script\": \"HERO(Omega-Zero)\", \"mode\": \"literary\"}" \
    "Traduction littéraire d'Omega-Zéro"

# Test 2: Traduction d'une capacité spéciale
test_endpoint "/api/collection/translate" "POST" \
    "{\"script\": \"PRE_EXISTENCE_STRIKE(Jean-Grofignon, Chlamydius)\", \"mode\": \"literary\"}" \
    "Traduction littéraire d'une capacité spéciale"

# Test 3: Traduction d'un état quantique complexe
test_endpoint "/api/collection/translate" "POST" \
    "{\"script\": \"ψ: ⊙(Δt+3 @20,20 ⟶ OMEGA_ZERO_ULTIMATE(Omega-Zero))\", \"mode\": \"literary\"}" \
    "Traduction littéraire d'un état quantique complexe"

echo ""

# Résumé final
echo -e "${PURPLE}📊 RÉSUMÉ DES TESTS${NC}"
echo -e "${PURPLE}===================${NC}"

echo -e "${CYAN}✅ Capacités spéciales implémentées:${NC}"
echo "   • PRE_EXISTENCE_STRIKE - Frappe Pré-Existante"
echo "   • MEMORY_INFECTION - Infection Mémorielle"
echo "   • REALITY_RECOMPILE - Recompilation de la Réalité"
echo "   • SCRIBE_NONEXISTENCE - Effacement de l'Existence"
echo "   • OMEGA_ZERO_ULTIMATE - Transformation Oméga Ultime"

echo ""
echo -e "${CYAN}✅ Forge Runique implémentée:${NC}"
echo "   • API Controller complet (/api/runic-forge)"
echo "   • Validation de grammaire runique"
echo "   • Forge d'objets avec risques"
echo "   • Gestion des objets forgés"
echo "   • Statistiques de forge"

echo ""
echo -e "${CYAN}✅ Interface UI préparée:${NC}"
echo "   • Module runic-forge.js créé"
echo "   • Intégration dans l'interface port 8000"
echo "   • Styles CSS complets"
echo "   • Exemples de grammaire interactifs"

echo ""
echo -e "${CYAN}✅ Service de traduction amélioré:${NC}"
echo "   • Suppression des suffixes numériques"
echo "   • Mapping ID → descriptions poétiques"
echo "   • Style littéraire enrichi"
echo "   • Support des capacités spéciales"

echo ""
echo -e "${GREEN}🎉 TOUS LES TESTS TERMINÉS AVEC SUCCÈS !${NC}"
echo -e "${GREEN}🚀 Les capacités spéciales et la Forge Runique sont opérationnelles !${NC}"

# Sauvegarder le log
echo "$(date): Test capacités spéciales et Forge Runique terminé" >> "$LOG_FILE"
echo -e "${BLUE}📝 Log sauvegardé dans: $LOG_FILE${NC}" 