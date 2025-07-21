#!/bin/bash

# 🎮 GENERIC JSON SCENARIO RUNNER
# ===============================
# Script générique pour charger et exécuter n'importe quel scénario JSON

# Usage: ./test-json-scenario-runner.sh <scenario_name>
# Exemple: ./test-json-scenario-runner.sh DUEL_COLLAPSE

if [ $# -eq 0 ]; then
    echo "Usage: $0 <scenario_name>"
    echo "Exemples:"
    echo "  $0 DUEL_COLLAPSE"
    echo "  $0 panopticon_axis_test"
    echo "  $0 ECLAT_MONDES_DISSOLUS"
    exit 1
fi

SCENARIO_NAME="$1"
echo "🎮 HEROES OF TIME - JSON SCENARIO RUNNER"
echo "========================================"
echo "📋 Chargement du scénario: $SCENARIO_NAME"

# Configuration
HOST="localhost:8080"
SCENARIOS_DIR="../game_assets/scenarios/visualizer"
SCENARIO_JSON="$SCENARIOS_DIR/${SCENARIO_NAME}.json"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Variables globales
GAME_ID=""
SCENARIO_DATA=""

# Fonction pour logger avec timestamp
log_with_time() {
    echo -e "${CYAN}[$(date '+%H:%M:%S')]${NC} $1"
}

# Vérifier que le fichier JSON existe
check_scenario_file() {
    if [ ! -f "$SCENARIO_JSON" ]; then
        echo -e "${RED}❌ Fichier scénario non trouvé: $SCENARIO_JSON${NC}"
        echo -e "${YELLOW}💡 Scénarios disponibles:${NC}"
        ls "$SCENARIOS_DIR"/*.json 2>/dev/null | xargs -n1 basename | sed 's/.json$//' | while read -r file; do
            echo -e "${CYAN}  - $file${NC}"
        done
        exit 1
    fi
    
    log_with_time "📄 Scénario trouvé: $(basename $SCENARIO_JSON)"
}

# Fonction pour charger et analyser le scénario
load_and_analyze_scenario() {
    echo -e "\n${PURPLE}📋 Chargement et analyse du scénario...${NC}"
    
    # Charger le JSON
    if ! SCENARIO_DATA=$(cat "$SCENARIO_JSON" | jq .); then
        echo -e "${RED}❌ JSON invalide${NC}"
        return 1
    fi
    
    # Extraire les informations de base
    local scenario_name scenario_type difficulty duration players
    
    # Essayer différentes structures JSON (les scénarios n'ont pas tous la même structure)
    scenario_name=$(echo "$SCENARIO_DATA" | jq -r '.scenario.name // .scenario_info.name // "Scénario Inconnu"')
    scenario_type=$(echo "$SCENARIO_DATA" | jq -r '.scenario.type // .scenario_info.type // "Type Inconnu"')
    difficulty=$(echo "$SCENARIO_DATA" | jq -r '.scenario_info.difficulty // .difficulty // "Non spécifié"')
    duration=$(echo "$SCENARIO_DATA" | jq -r '.scenario_info.duration_estimate // .duration // "Non spécifié"')
    players=$(echo "$SCENARIO_DATA" | jq -r '.setup.players // .game_settings.players // .players // [] | length')
    
    echo -e "${CYAN}📖 Nom: $scenario_name${NC}"
    echo -e "${CYAN}🎯 Type: $scenario_type${NC}"
    echo -e "${CYAN}⭐ Difficulté: $difficulty${NC}"
    echo -e "${CYAN}⏱️ Durée: $duration${NC}"
    echo -e "${CYAN}👥 Joueurs: $players${NC}"
    
    # Analyser la structure du scénario
    local has_heroes has_map has_psi_states has_victory_conditions
    has_heroes=$(echo "$SCENARIO_DATA" | jq 'has("heroes")')
    has_map=$(echo "$SCENARIO_DATA" | jq 'has("setup") and .setup | has("map") or has("game_settings") and .game_settings | has("map")')
    has_psi_states=$(echo "$SCENARIO_DATA" | jq 'has("psi_states")')
    has_victory_conditions=$(echo "$SCENARIO_DATA" | jq 'has("victory_conditions") or has("game_settings") and .game_settings | has("victory_conditions")')
    
    echo -e "\n${CYAN}📊 Structure du scénario:${NC}"
    [ "$has_heroes" = "true" ] && echo -e "${GREEN}  ✅ Héros définis${NC}" || echo -e "${YELLOW}  ⚠️ Pas de héros${NC}"
    [ "$has_map" = "true" ] && echo -e "${GREEN}  ✅ Carte définie${NC}" || echo -e "${YELLOW}  ⚠️ Pas de carte${NC}"
    [ "$has_psi_states" = "true" ] && echo -e "${GREEN}  ✅ ψ-States définis${NC}" || echo -e "${YELLOW}  ⚠️ Pas de ψ-States${NC}"
    [ "$has_victory_conditions" = "true" ] && echo -e "${GREEN}  ✅ Conditions de victoire${NC}" || echo -e "${YELLOW}  ⚠️ Pas de conditions${NC}"
    
    # Compter les éléments
    local heroes_count psi_count
    heroes_count=$(echo "$SCENARIO_DATA" | jq '.heroes // [] | length')
    psi_count=$(echo "$SCENARIO_DATA" | jq '.psi_states // [] | length')
    
    echo -e "${CYAN}🦸 Héros: $heroes_count${NC}"
    echo -e "${CYAN}⚡ ψ-States: $psi_count${NC}"
    
    return 0
}

# Fonction pour vérifier le backend
check_backend() {
    echo -e "\n${BLUE}🔍 Vérification du backend...${NC}"
    if curl -s "$HOST/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend accessible sur $HOST${NC}"
        return 0
    else
        echo -e "${RED}❌ Backend non accessible sur $HOST${NC}"
        echo -e "${YELLOW}💡 Démarrez le backend avec: mvn spring-boot:run${NC}"
        return 1
    fi
}

# Fonction pour créer le jeu
create_game() {
    echo -e "\n${BLUE}🎮 Création du jeu...${NC}"
    
    local game_name players_count
    game_name=$(echo "$SCENARIO_DATA" | jq -r '.scenario.name // .scenario_info.name // "Test Scenario"')
    players_count=$(echo "$SCENARIO_DATA" | jq -r '.setup.players // .game_settings.players // .players // [] | length')
    
    # Si pas de joueurs définis, utiliser 2 par défaut
    [ "$players_count" = "0" ] && players_count=2
    
    response=$(curl -s -X POST "http://$HOST/api/temporal/games" \
        -H "Content-Type: application/json" \
        -d "{\"gameName\": \"$game_name\", \"playerCount\": $players_count}")
    
    GAME_ID=$(echo "$response" | jq -r '.gameId // empty')
    
    if [ -n "$GAME_ID" ]; then
        echo -e "${GREEN}✅ Jeu créé avec ID: $GAME_ID${NC}"
        return 0
    else
        echo -e "${RED}❌ Échec de création du jeu${NC}"
        echo "$response"
        return 1
    fi
}

# Fonction pour créer les héros
create_heroes() {
    local heroes_count
    heroes_count=$(echo "$SCENARIO_DATA" | jq '.heroes // [] | length')
    
    if [ "$heroes_count" -eq 0 ]; then
        echo -e "${YELLOW}⚠️ Aucun héros défini dans le scénario${NC}"
        return 0
    fi
    
    echo -e "\n${PURPLE}👥 Création des héros ($heroes_count)...${NC}"
    
    echo "$SCENARIO_DATA" | jq -c '.heroes[]' | while read -r hero_data; do
        local hero_name hero_level
        hero_name=$(echo "$hero_data" | jq -r '.name')
        hero_level=$(echo "$hero_data" | jq -r '.level // 1')
        
        echo -e "\n${BLUE}→ Création de $hero_name${NC}"
        
        # Créer le héros
        response=$(curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
            -H "Content-Type: application/json" \
            -d "{\"script\":\"HERO($hero_name)\"}")
        
        if echo "$response" | jq -e '.success' > /dev/null; then
            echo -e "${GREEN}  ✅ $hero_name créé${NC}"
        else
            echo -e "${RED}  ❌ Erreur création $hero_name${NC}"
        fi
        
        # Placement si position définie
        if echo "$hero_data" | jq -e '.position // .start_position' > /dev/null; then
            local pos_x pos_y
            pos_x=$(echo "$hero_data" | jq -r '.position.x // .start_position.x')
            pos_y=$(echo "$hero_data" | jq -r '.position.y // .start_position.y')
            
            if [ "$pos_x" != "null" ] && [ "$pos_y" != "null" ]; then
                place_response=$(curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
                    -H "Content-Type: application/json" \
                    -d "{\"script\":\"MOV($hero_name, @$pos_x,$pos_y)\"}")
                
                if echo "$place_response" | jq -e '.success' > /dev/null; then
                    echo -e "${GREEN}  ✅ Placé en ($pos_x,$pos_y)${NC}"
                else
                    echo -e "${YELLOW}  ⚠️ Placement échoué${NC}"
                fi
            fi
        fi
        
        sleep 0.5
    done
}

# Fonction pour exécuter les ψ-states
execute_psi_states() {
    local psi_count
    psi_count=$(echo "$SCENARIO_DATA" | jq '.psi_states // [] | length')
    
    if [ "$psi_count" -eq 0 ]; then
        echo -e "${YELLOW}⚠️ Aucun ψ-state défini dans le scénario${NC}"
        return 0
    fi
    
    echo -e "\n${PURPLE}⚡ Exécution des ψ-states ($psi_count)...${NC}"
    
    echo "$SCENARIO_DATA" | jq -c '.psi_states[]' | while read -r psi_state; do
        local psi_id action description
        psi_id=$(echo "$psi_state" | jq -r '.id')
        action=$(echo "$psi_state" | jq -r '.action')
        description=$(echo "$psi_state" | jq -r '.description // "Action ψ-state"')
        
        echo -e "\n${BLUE}→ $psi_id: ${NC}$action"
        echo -e "${YELLOW}  📝 $description${NC}"
        
        # Exécuter l'action
        response=$(curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
            -H "Content-Type: application/json" \
            -d "{\"script\":\"$action\"}")
        
        if echo "$response" | jq -e '.success' > /dev/null; then
            echo -e "${GREEN}  ✅ $psi_id exécuté${NC}"
        else
            echo -e "${RED}  ❌ Erreur $psi_id${NC}"
        fi
        
        sleep 1
    done
}

# Fonction pour vérifier les conditions de victoire
check_victory_conditions() {
    echo -e "\n${PURPLE}🏆 Conditions de victoire...${NC}"
    
    # Essayer différentes structures pour les conditions
    local conditions
    conditions=$(echo "$SCENARIO_DATA" | jq -r '.victory_conditions // .game_settings.victory_conditions // [] | if type == "array" then .[] else . end // empty')
    
    if [ -n "$conditions" ]; then
        echo "$conditions" | while read -r condition; do
            [ -n "$condition" ] && echo -e "${CYAN}  📋 $condition${NC}"
        done
    else
        echo -e "${YELLOW}  ℹ️ Aucune condition de victoire spécifiée${NC}"
    fi
}

# Fonction pour afficher le résumé
show_summary() {
    echo -e "\n${PURPLE}📊 RÉSUMÉ DU SCÉNARIO${NC}"
    echo "========================="
    
    local scenario_name
    scenario_name=$(echo "$SCENARIO_DATA" | jq -r '.scenario.name // .scenario_info.name // "Scénario"')
    
    echo -e "${CYAN}📖 Scénario: $scenario_name${NC}"
    echo -e "${CYAN}🎮 ID du jeu: $GAME_ID${NC}"
    
    # État du jeu si disponible
    if [ -n "$GAME_ID" ]; then
        game_state=$(curl -s "http://$HOST/api/games/$GAME_ID/state" 2>/dev/null || echo "null")
        
        if [ "$game_state" != "null" ] && [ "$game_state" != "" ]; then
            echo -e "\n${CYAN}🎯 État du jeu:${NC}"
            echo "$game_state" | jq '.' 2>/dev/null || echo "$game_state"
        fi
    fi
    
    echo -e "\n${GREEN}✅ Exécution du scénario terminée${NC}"
}

# EXÉCUTION PRINCIPALE
main() {
    log_with_time "🚀 Démarrage du runner de scénario JSON"
    
    # Étape 1: Vérifier le fichier
    check_scenario_file
    
    # Étape 2: Charger et analyser
    if ! load_and_analyze_scenario; then
        exit 1
    fi
    
    # Étape 3: Vérifier le backend
    if ! check_backend; then
        exit 1
    fi
    
    # Étape 4: Créer le jeu
    if ! create_game; then
        exit 1
    fi
    
    # Étape 5: Créer les héros
    create_heroes
    
    # Étape 6: Exécuter les ψ-states
    execute_psi_states
    
    # Étape 7: Vérifier les conditions
    check_victory_conditions
    
    # Étape 8: Résumé
    show_summary
    
    log_with_time "🏁 Runner terminé"
}

# Gestion des erreurs
set -e
trap 'echo -e "\n${RED}❌ Erreur détectée, arrêt du script${NC}"; exit 1' ERR

# Lancer le runner
main "$@"