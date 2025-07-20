#!/bin/bash

# Test des nouvelles fonctionnalités Amplitude et GROFI
# Par Jean Grofignon - 20 juillet 2025

echo "🧪 TEST AMPLITUDES & GROFI"
echo "========================="

# Configuration
BACKEND_URL="http://localhost:8080"
GAME_ID=""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour tester une commande
test_command() {
    local description="$1"
    local endpoint="$2"
    local data="$3"
    
    echo -e "\n${BLUE}Test:${NC} $description"
    
    response=$(curl -s -X POST "$BACKEND_URL$endpoint" \
        -H "Content-Type: application/json" \
        -d "$data")
    
    if echo "$response" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ Succès${NC}"
        echo "$response" | jq '.'
    else
        echo -e "${RED}❌ Échec${NC}"
        echo "$response" | jq '.'
    fi
}

# Créer une partie
echo -e "\n${YELLOW}📋 Création de la partie de test...${NC}"
game_response=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d '{"gameName": "Test Amplitude GROFI", "playerId": "jean"}')

GAME_ID=$(echo "$game_response" | jq -r '.gameId')
echo "Game ID: $GAME_ID"

# Créer des héros
test_command "Créer Jean Grofignon" \
    "/api/temporal/games/$GAME_ID/execute" \
    '{"script": "HERO(JeanGrofignon)"}'

test_command "Créer Arthur" \
    "/api/temporal/games/$GAME_ID/execute" \
    '{"script": "HERO(Arthur)"}'

# Test des amplitudes
echo -e "\n${YELLOW}🌀 TEST DES AMPLITUDES${NC}"

test_command "Créer état ψ avec amplitude complexe" \
    "/api/temporal/games/$GAME_ID/execute" \
    '{"script": "ψ001: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ MOV(JeanGrofignon, @10,10))"}'

test_command "Créer état ψ avec amplitude polaire" \
    "/api/temporal/games/$GAME_ID/execute" \
    '{"script": "ψ002: 1.0∠0.5 ⊙(Δt+2 @12,12 ⟶ MOV(Arthur, @12,12))"}'

# Test des formules d'amplitude
echo -e "\n${YELLOW}🔧 TEST DES FORMULES D'AMPLITUDE${NC}"

# D'abord créer un artefact avec amplitude
test_command "Créer artefact quantum_amplifier" \
    "/api/temporal/games/$GAME_ID/execute" \
    '{"script": "CREATE(ARTIFACT, quantum_amplifier, HERO:JeanGrofignon)"}'

# Note: Pour tester les formules, il faudrait d'abord ajouter les artefacts dans custom-artifacts.json

# Test des symboles GROFI
echo -e "\n${YELLOW}🎯 TEST DES SYMBOLES GROFI${NC}"

test_command "Créer artefact grofi_sigma" \
    "/api/temporal/games/$GAME_ID/execute" \
    '{"script": "CREATE(ARTIFACT, grofi_sigma, HERO:JeanGrofignon)"}'

test_command "Créer artefact grofi_dagger" \
    "/api/temporal/games/$GAME_ID/execute" \
    '{"script": "CREATE(ARTIFACT, grofi_dagger, HERO:Arthur)"}'

# Vérifier l'état du jeu
echo -e "\n${YELLOW}📊 État final du jeu${NC}"
curl -s "$BACKEND_URL/api/temporal/games/$GAME_ID/state" | jq '.'

echo -e "\n${GREEN}✅ Tests terminés !${NC}"
echo -e "${BLUE}Note:${NC} Pour tester complètement les formules, ajouter les artefacts dans custom-artifacts.json"

# Exemple d'artefacts à ajouter dans custom-artifacts.json :
cat << EOF

${YELLOW}Artefacts à ajouter dans backend/src/main/resources/custom-artifacts.json :${NC}

{
  "artifacts": [
    {
      "id": "quantum_amplifier",
      "name": "Amplificateur Quantique",
      "formula": "CREATE_AMPLITUDE(0.8, 0.6) + AMPLIFY(result, 2.0)",
      "energy_cost": 20
    },
    {
      "id": "grofi_sigma",
      "name": "Sigma de Jean",
      "formula": "Σ[REDUCE:0.2] + MODIFY_ENERGY(hero, 10)",
      "energy_cost": 15
    },
    {
      "id": "grofi_dagger",
      "name": "Dague de Renaissance",
      "formula": "†[] + CREATE_TEMPORAL_ECHO(hero)",
      "energy_cost": 30
    },
    {
      "id": "grofi_omega",
      "name": "Omega Final",
      "formula": "Ω[] + FORCE_COLLAPSE_ALL(hero, 10)",
      "energy_cost": 50
    },
    {
      "id": "grofi_chaos",
      "name": "Chaos de Vince",
      "formula": "↯[] + ↯[] + TELEPORT_BY_PROBABILITY(hero, result)",
      "energy_cost": 25
    }
  ]
}
EOF 