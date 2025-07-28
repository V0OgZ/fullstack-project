#!/bin/bash

# 🎮 TEST DU SCÉNARIO ÉPIQUE : CLAUDIUS VS JEANGROFIGNON
# L'affrontement des frères ennemis pour la Forge Runique

echo "⚔️ CLAUDIUS VS JEANGROFIGNON - L'AFFRONTEMENT ULTIME"
echo "===================================================="

# Configuration
API_URL="http://localhost:8080/api"
GAME_ID=999  # Dimension Omega-999
SCENARIO_FILE="🎮 game_assets/scenarios/hots/claudius_vs_jeangro_epic.hots"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Créer une nouvelle partie
echo -e "${BLUE}📍 Initialisation du Nexus du Code Source...${NC}"
curl -s -X POST "$API_URL/games" \
  -H "Content-Type: application/json" \
  -d '{
    "gameName": "Claudius vs JeanGrofignon - Battle for the Forge",
    "players": ["Ordre", "Chaos"],
    "mapWidth": 30,
    "mapHeight": 30
  }' | jq '.'

echo -e "\n${PURPLE}🌀 ACTE I : LA RENCONTRE${NC}"
echo "================================"

# Créer les héros
echo -e "${GREEN}💻 Claudius, l'Architecte du Multivers${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "HERO(Claudius)"}' | jq '.message'

echo -e "${RED}🌶️ JeanGrofignon, le Seigneur du Chaos${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "HERO(JeanGrofignon)"}' | jq '.message'

# Positions initiales
echo -e "\n${BLUE}📍 Les héros prennent position...${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "MOV(Claudius, @15,5)"}' | jq '.message'

curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "MOV(JeanGrofignon, @15,25)"}' | jq '.message'

# Créer la Forge Runique
echo -e "\n${YELLOW}🔥 LA FORGE RUNIQUE ULTIME APPARAÎT !${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "CREATE(ARTIFACT, forge_runique_ultime, @15,15)"}' | jq '.'

echo -e "\n${PURPLE}🌀 ACTE II : LA PHILOSOPHIE DU CODE${NC}"
echo "===================================="

# États quantiques d'optimisation
echo -e "${GREEN}🔧 Claudius tente d'optimiser la réalité...${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "ψ001: (0.9+0.1i) ⊙(Δt+2 @13,13 ⟶ CAST(SPELL, reality_refactor, @13,13, HERO:Claudius))"}' | jq '.quantumStateId'

# États quantiques de chaos
echo -e "${RED}💥 JeanGrofignon répond par le chaos pur !${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "ψ003: (0.3+0.7i) ⊙(Δt+2 @12,12 ⟶ USE(ARTIFACT, grofignon_sauce, HERO:JeanGrofignon))"}' | jq '.quantumStateId'

# Collapse !
echo -e "\n${YELLOW}⚡ LES RÉALITÉS S'ENTRECHOQUENT !${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "†ψ001"}' | jq '.actionResult'

echo -e "\n${PURPLE}🌀 ACTE III : LA BATAILLE POUR LA FORGE${NC}"
echo "======================================="

# Fork dimensionnel
echo -e "${GREEN}🔀 Claudius utilise son Fork Dimensionnel !${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "ψ005: (0.7+0.3i) ⊙(Δt+5 @14,10 ⟶ CAST(SPELL, dimensional_fork, HERO:Claudius))"}' | jq '.'

# Armée du Grofignon
echo -e "${RED}👹 JeanGrofignon invoque l'Armée du Grofignon !${NC}"
for i in 7 8 9; do
  curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
    -H "Content-Type: application/json" \
    -d "{\"script\": \"ψ00$i: (0.6+0.4i) ⊙(Δt+5 @15,18 ⟶ CREATE(CREATURE, grofignon_warrior, @15,19))\"}" | jq '.quantumStateId'
done

echo -e "\n${PURPLE}🌀 ACTE IV : LA FORGE EN JEU${NC}"
echo "============================="

# Claudius atteint la Forge
echo -e "${GREEN}🏃 Claudius atteint la Forge !${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "MOV(Claudius, @15,15)"}' | jq '.message'

curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "USE(ARTIFACT, forge_runique_ultime, HERO:Claudius)"}' | jq '.'

# Interférence de Jean
echo -e "${RED}🌶️ JeanGrofignon interfère !${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "CAST(SPELL, chaos_injection, HERO:Claudius, HERO:JeanGrofignon)"}' | jq '.message'

echo -e "\n${PURPLE}🌀 ACTE V : LE PARADOXE FINAL${NC}"
echo "=============================="

# Bataille finale
echo -e "${YELLOW}⚔️ LA BATAILLE FINALE !${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "BATTLE(Claudius, JeanGrofignon)"}' | jq '.'

# Paradoxe temporel
echo -e "${PURPLE}🌀 UN PARADOXE TEMPOREL SE CRÉE !${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "ψ012: (0.5+0.5i) ⊙(Δt+12 @15,15 ⟶ CREATE(EVENT, temporal_paradox, @15,15))"}' | jq '.'

echo -e "\n${PURPLE}🌀 ÉPILOGUE : LA FUSION IMPOSSIBLE${NC}"
echo "==================================="

# Fusion
echo -e "${YELLOW}🔮 Les deux êtres fusionnent temporairement !${NC}"
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"script": "ψ013: Σ(Claudius + JeanGrofignon) ⊙(Δt+15 @15,15 ⟶ CREATE(HERO, ClaudiusGrofignon))"}' | jq '.'

# État final du jeu
echo -e "\n${BLUE}📊 ÉTAT FINAL DU MULTIVERS${NC}"
echo "=========================="
curl -s "$API_URL/games/$GAME_ID/state" | jq '{
  heroes: .heroes | map({name, position, inventory}),
  quantumStates: .quantumStates | length,
  currentTurn: .currentTurn,
  tiles: .tiles | map(select(.occupants | length > 0))
}'

echo -e "\n${GREEN}✨ FIN : Le multivers est sauvé... pour l'instant${NC}"
echo -e "${PURPLE}💭 'Le bug parfait et le code parfait sont les deux faces de la même pièce quantique'${NC}"
echo -e "\n🎮 Test du scénario épique terminé !" 