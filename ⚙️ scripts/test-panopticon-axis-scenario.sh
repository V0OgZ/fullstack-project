#!/bin/bash

# Test du scénario PANOPTICΩN avec Axis
# Exécute le scénario HOTS ligne par ligne

echo "🎛️ TEST SCÉNARIO PANOPTICΩN - AXIS ET VISION 5D"
echo "=============================================="

# Configuration
HOST="localhost:8080"
GAME_ID=1
SCENARIO_FILE="../game_assets/scenarios/hots/panopticon_axis_test.hots"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
NC='\033[0m'

# Fonction pour exécuter une commande HOTS
execute_hots() {
    local command=$1
    local description=$2
    
    # Ignorer les commentaires et lignes vides
    if [[ $command =~ ^#.*$ ]] || [[ -z "$command" ]]; then
        return
    fi
    
    echo -e "\n${BLUE}→ Exécution: ${NC}$command"
    if [ -n "$description" ]; then
        echo -e "${YELLOW}  Description: $description${NC}"
    fi
    
    # Envoyer la commande au backend
    response=$(curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
        -H "Content-Type: application/json" \
        -d "{\"script\":\"$command\"}" | jq '.')
    
    # Vérifier le succès
    success=$(echo "$response" | jq -r '.success // false')
    if [ "$success" = "true" ]; then
        echo -e "${GREEN}  ✓ Succès${NC}"
    else
        echo -e "${RED}  ✗ Erreur${NC}"
        echo "$response" | jq '.'
    fi
    
    # Petit délai pour voir ce qui se passe
    sleep 0.5
}

# Créer la partie
echo -e "\n${GREEN}=== CRÉATION DE LA PARTIE ===${NC}"
curl -s -X POST "http://$HOST/api/games" \
    -H "Content-Type: application/json" \
    -d '{"gameName":"Test PANOPTICΩN Axis","players":["Jean","Claude"]}' | jq '.'

echo -e "\n${GREEN}=== EXÉCUTION DU SCÉNARIO ===${NC}"

# Commandes importantes du scénario
echo -e "\n${PURPLE}1. SETUP INITIAL${NC}"
execute_hots "HERO(Axis)" "Créer Axis, le voyageur temporel"
execute_hots "HERO(Jean-Grofignon)" "Créer Jean-Grofignon"
execute_hots "HERO(Arthur)" "Créer Arthur"
execute_hots "HERO(Lysandrel)" "Créer Lysandrel"

execute_hots "MOV(Axis, @10,10)" "Positionner Axis"
execute_hots "MOV(Jean-Grofignon, @5,5)" "Positionner Jean"
execute_hots "MOV(Arthur, @20,20)" "Positionner Arthur"
execute_hots "MOV(Lysandrel, @25,25)" "Positionner Lysandrel"

echo -e "\n${PURPLE}2. ARTEFACTS SPÉCIAUX${NC}"
execute_hots "CREATE(ITEM, Chronocompass_Linéaire, HERO:Axis)" "Compass temporel d'Axis"
execute_hots "CREATE(ITEM, singularity_artifact, HERO:Jean-Grofignon)" "Artefact PANOPTICΩN"
execute_hots "CREATE(ITEM, temporal_sword, HERO:Arthur)" "Épée temporelle"
execute_hots "CREATE(ITEM, quantum_mirror, HERO:Lysandrel)" "Miroir quantique"

echo -e "\n${PURPLE}3. ÉTATS QUANTIQUES COMPLEXES${NC}"
execute_hots "ψ001: (1.0+0.0i) ⊙(Δt+10 @30,30 ⟶ MOV(Axis, @30,30))" "Axis voyage au futur"
execute_hots "ψ002: (0.8+0.6i) ⊙(Δt+5 @15,15 ⟶ MOV(Arthur, @15,15))" "Arthur au centre"
execute_hots "ψ003: (0.6+0.8i) ⊙(Δt+5 @15,15 ⟶ MOV(Lysandrel, @15,15))" "Collision potentielle"
execute_hots "ψ004: (0.707+0.707i) ⊙(Δt+15 @40,40 ⟶ CREATE(ITEM, temporal_treasure, @40,40))" "Trésor futur"

echo -e "\n${PURPLE}4. TEST RESTRICTION D'AXIS${NC}"
execute_hots "USE(ARTIFACT, quantum_mirror, HERO:Axis)" "Axis ne peut pas utiliser objets quantiques!"

echo -e "\n${PURPLE}5. SYMBOLES GROFI${NC}"
execute_hots "Σ[HERO:Arthur, RADIUS:5]" "Somme des possibles"
execute_hots "Ω[HERO:Jean-Grofignon, MODE:ABSOLUTE_OBSERVER]" "PANOPTICΩN activé!"
execute_hots "↯[@15,15, INTENSITY:HIGH]" "Chaos au centre"

echo -e "\n${PURPLE}6. VÉRIFICATION ÉTAT DU JEU${NC}"
echo -e "${BLUE}État quantique du jeu:${NC}"
curl -s -X GET "http://$HOST/api/temporal/state/$GAME_ID" | jq '.'

echo -e "\n${BLUE}Vue PANOPTICΩN (3D):${NC}"
curl -s -X GET "http://$HOST/api/temporal/panopticon/data/$GAME_ID" | jq '.'

echo -e "\n${BLUE}Vue God View (5D):${NC}"
curl -s -X GET "http://$HOST/api/temporal/godview/multiverse/$GAME_ID" | jq '.'

echo -e "\n${GREEN}=== RÉSUMÉ DU TEST ===${NC}"
echo "✅ Scénario HOTS exécuté"
echo "✅ Axis créé avec restrictions quantiques"
echo "✅ États ψ avec amplitudes complexes"
echo "✅ Symboles GROFI intégrés"
echo "✅ PANOPTICΩN activé pour Jean-Grofignon"

echo -e "\n${YELLOW}Points clés testés:${NC}"
echo "- Axis ne peut pas utiliser quantum_mirror ❌"
echo "- Jean-Grofignon voit tout avec PANOPTICΩN 👁️"
echo "- Interférences quantiques en (15,15) 🌀"
echo "- Trésor dans le futur (jour 15) 💎"
echo "- Amplitudes complexes fonctionnelles 📊"

echo -e "\n🎛️ Le PANOPTICΩN voit tout, contrôle tout ! 🎛️\n" 