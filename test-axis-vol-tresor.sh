#!/bin/bash

# 🌀 TEST SCÉNARIO AXIS - VOL DU TRÉSOR CAUSAL
# Exécution du scénario HOTS avec Axis et Lentus
# Par Vince Vega - Janvier 2025

# Colors pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🌀 SCÉNARIO AXIS - VOL DU TRÉSOR CAUSAL${NC}"
echo -e "${CYAN}Test de causalité temporelle avec HOTS${NC}"
echo ""

# Variables
HOST="localhost:8080"
SCENARIO_FILE="scenarios/axis_vol_tresor_causal.hots"
GAME_ID=""

# Fonction pour exécuter commande HOTS
execute_hots() {
    local command="$1"
    local description="$2"
    
    echo -e "${YELLOW}▶ $description${NC}"
    echo -e "${BLUE}HOTS: $command${NC}"
    
    # Simuler l'exécution HOTS (en attendant le vrai parser)
    curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
         -H "Content-Type: application/json" \
         -d "{\"script\":\"$command\"}" | jq '.' || echo "Backend non disponible"
    
    echo ""
    sleep 1
}

# Fonction pour tester causalité
test_causal() {
    local thief="$1"
    local owner="$2"
    local object="$3"
    
    echo -e "${CYAN}🔬 TEST CAUSALITÉ: $thief tente de voler $object de $owner${NC}"
    
    curl -s -X POST "http://$HOST/api/causal/can-steal" \
         -H "Content-Type: application/json" \
         -d "{\"thiefId\":\"$thief\",\"objectId\":\"$object\",\"ownerId\":\"$owner\",\"gameId\":\"$GAME_ID\"}" | jq '.'
    
    echo ""
}

# Démarrer le test
echo -e "${GREEN}=== 1. SETUP INITIAL ===${NC}"

# Créer une partie
GAME_RESPONSE=$(curl -s -X POST "http://$HOST/api/games" \
    -H "Content-Type: application/json" \
    -d '{"playerName":"Axis","gameMode":"temporal_test"}' 2>/dev/null)

if [ $? -eq 0 ]; then
    GAME_ID=$(echo "$GAME_RESPONSE" | jq -r '.id' 2>/dev/null)
    echo -e "${GREEN}✅ Partie créée: $GAME_ID${NC}"
else
    echo -e "${RED}❌ Backend non disponible - Simulation mode${NC}"
    GAME_ID="test-game-axis"
fi

echo ""

# Exécuter le scénario HOTS
echo -e "${GREEN}=== 2. CRÉATION DES HÉROS ===${NC}"
execute_hots "HERO(Axis)" "Créer Axis, le voyageur linéaire"
execute_hots "HERO(Lentus)" "Créer Lentus, le joueur lent"

echo -e "${GREEN}=== 3. POSITIONNEMENT ===${NC}"
execute_hots "MOV(Axis, @5,5)" "Positionner Axis au départ"
execute_hots "MOV(Lentus, @15,12)" "Positionner Lentus avec son trésor"

echo -e "${GREEN}=== 4. ÉQUIPEMENT TEMPOREL ===${NC}"
execute_hots "CREATE(ITEM, Chronocompass_Linéaire, HERO:Axis)" "Donner Chronocompass à Axis"
execute_hots "CREATE(ITEM, Gants_Subtilité_Causale, HERO:Axis)" "Donner Gants Causaux à Axis"
execute_hots "CREATE(ITEM, Coffre_des_Merveilles, HERO:Lentus)" "Créer le trésor de Lentus"

echo -e "${GREEN}=== 5. PROGRESSION TEMPORELLE ===${NC}"
execute_hots "ψ001: (1.0+0.0i) ⊙(Δt+1 @10,8 ⟶ MOV(Axis, @10,8))" "Axis progresse rapidement"
execute_hots "ψ002: (1.0+0.0i) ⊙(Δt+2 @14,12 ⟶ MOV(Axis, @14,12))" "Axis approche du trésor"
execute_hots "ψ003: (0.5+0.0i) ⊙(Δt+3 @15,13 ⟶ MOV(Lentus, @15,13))" "Lentus progresse lentement"

echo -e "${GREEN}=== 6. PREMIÈRE TENTATIVE DE VOL ===${NC}"
execute_hots "ψ004: (0.8+0.6i) ⊙(Δt+3 @15,12 ⟶ STEAL(ITEM:Coffre_des_Merveilles, HERO:Axis, FROM:Lentus))" "Axis tente le vol"

# Test causalité
test_causal "player1" "player2" "treasure1"

echo -e "${GREEN}=== 7. OBSERVATION ET COLLAPSE ===${NC}"
execute_hots "Π(OBSERVE(ITEM:Coffre_des_Merveilles, HERO:Axis)) ⇒ †ψ004" "Axis observe le trésor"

echo -e "${GREEN}=== 8. SYNCHRONISATION TEMPORELLE ===${NC}"
execute_hots "USE(ITEM, Chronocompass_Linéaire, HERO:Axis)" "Axis utilise son Chronocompass"
execute_hots "ψ005: (0.9+0.0i) ⊙(Δt+0 @15,12 ⟶ TEMPORAL_SYNC(Axis, Lentus))" "Synchronisation temporelle"

echo -e "${GREEN}=== 9. DEUXIÈME TENTATIVE ===${NC}"
execute_hots "ψ006: (1.0+0.0i) ⊙(Δt+4 @15,12 ⟶ STEAL(ITEM:Coffre_des_Merveilles, HERO:Axis, FROM:Lentus))" "Vol après synchronisation"

# Test causalité après sync
test_causal "player1" "player2" "treasure1"

echo -e "${GREEN}=== 10. CONSÉQUENCES ===${NC}"
execute_hots "ψ007: (0.7+0.7i) ⊙(Δt+5 @14,11 ⟶ TEMPORAL_COUNTERATTACK(Lentus, Axis))" "Contre-attaque de Lentus"

echo -e "${GREEN}=== 11. VÉRIFICATIONS FINALES ===${NC}"
execute_hots "CHECK(ITEM:Coffre_des_Merveilles, OWNER:?)" "Qui possède le trésor ?"
execute_hots "CHECK(HERO:Axis, TEMPORAL_DAY:?)" "État temporel d'Axis"
execute_hots "CHECK(HERO:Lentus, TEMPORAL_DAY:?)" "État temporel de Lentus"

echo -e "${PURPLE}=== RÉSULTATS ATTENDUS ===${NC}"
echo -e "${CYAN}1. Premier vol bloqué par règles causales${NC}"
echo -e "${CYAN}2. Synchronisation temporelle réussie${NC}"
echo -e "${CYAN}3. Deuxième vol autorisé${NC}"
echo -e "${CYAN}4. Contre-attaque temporelle de Lentus${NC}"
echo -e "${CYAN}5. Résolution du paradoxe causal${NC}"

echo ""
echo -e "${GREEN}✅ SCÉNARIO AXIS TERMINÉ${NC}"
echo -e "${YELLOW}📜 Fichier HOTS: $SCENARIO_FILE${NC}"
echo -e "${BLUE}🎮 Game ID: $GAME_ID${NC}" 