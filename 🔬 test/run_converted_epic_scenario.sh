#!/bin/bash

# =============================================================================
# 🚀 TEST CONVERTI - SCÉNARIO ÉPIQUE TEMPOREL
# =============================================================================
#
# Ce script exécute le scénario .hots converti depuis le test Java
# ComplexScenarioTest.java et valide l'état final du jeu via des
# appels à l'API REST.
#
# =============================================================================

# Configuration
BACKEND_URL="http://localhost:8080"
SCENARIO_FILE="game_assets/tests/hots/converted_epic_scenario.hots"
GAME_ID=""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Rediriger toute la sortie vers un fichier de log
exec &> test/run_converted_epic_scenario.log

# Démarrer le backend (si nécessaire) et attendre qu'il soit prêt
if ! curl -s "$BACKEND_URL/api/temporal/health" > /dev/null; then
    echo -e "${YELLOW}🚀 Démarrage du backend...${NC}"
    cd backend
    mvn spring-boot:run > ../backend-test.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    
    echo "⏳ Attente de la disponibilité du backend..."
    for i in {1..60}; do
        if curl -s "$BACKEND_URL/api/temporal/health" > /dev/null; then
            echo -e "${GREEN}✅ Backend prêt !${NC}"
            break
        fi
        sleep 1
    done
fi

# 1. Créer une nouvelle partie
echo "🎮 Création d'une nouvelle partie..."
response=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" -H "Content-Type: application/json" -d '{"gameName": "Converted Epic Scenario Test"}')
GAME_ID=$(echo $response | jq -r '.id')

if [ -z "$GAME_ID" ] || [ "$GAME_ID" == "null" ]; then
    echo -e "${RED}❌ Échec de la création de la partie.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Partie créée avec l'ID: $GAME_ID${NC}"

# 2. Exécuter le scénario .hots
echo "📜 Exécution du scénario depuis $SCENARIO_FILE..."
while IFS= read -r line || [[ -n "$line" ]]; do
    # Ignorer les lignes vides et les commentaires
    if [[ -z "$line" ]] || [[ "$line" == \#* ]]; then
        continue
    fi
    
    echo "  - Exécution: $line"
    curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
         -H "Content-Type: application/json" \
         -d "{\"script\": \"$line\"}" > /dev/null
done < "$SCENARIO_FILE"
echo -e "${GREEN}✅ Scénario exécuté.${NC}"

# 3. Valider l'état final du jeu
echo "📊 Validation de l'état final du jeu..."
GAME_STATE=$(curl -s "$BACKEND_URL/api/temporal/games/$GAME_ID/state")

# Vérifier le nombre de héros
HERO_COUNT=$(echo $GAME_STATE | jq '.heroes | length')
if [ "$HERO_COUNT" -eq 2 ]; then
    echo -e "${GREEN}  - ✅ Nombre de héros correct (attendu: 2, trouvé: $HERO_COUNT)${NC}"
else
    echo -e "${RED}  - ❌ Nombre de héros incorrect (attendu: 2, trouvé: $HERO_COUNT)${NC}"
    exit 1
fi

# Vérifier qu'au moins un château a été construit
STRUCTURE_COUNT=$(echo $GAME_STATE | jq '.tiles[] | select(.building == "Castle") | length')
if [ "$STRUCTURE_COUNT" -gt 0 ]; then
    echo -e "${GREEN}  - ✅ Au moins une structure 'Castle' a été construite${NC}"
else
    echo -e "${RED}  - ❌ Aucune structure 'Castle' n'a été construite${NC}"
    exit 1
fi

# Vérifier qu'au moins un état ψ a été effondré
COLLAPSED_PSI_COUNT=$(echo $GAME_STATE | jq '.quantumStates[] | select(.status == "COLLAPSED") | length')
if [ "$COLLAPSED_PSI_COUNT" -gt 0 ]; then
    echo -e "${GREEN}  - ✅ Au moins un état ψ a été effondré${NC}"
else
    echo -e "${RED}  - ❌ Aucun état ψ n'a été effondré${NC}"
    exit 1
fi

echo -e "\n${GREEN}🎉 TEST DU SCÉNARIO CONVERTI RÉUSSI !${NC}"

# Arrêter le backend
if [ ! -z "$BACKEND_PID" ]; then
    kill $BACKEND_PID
fi

exit 0 