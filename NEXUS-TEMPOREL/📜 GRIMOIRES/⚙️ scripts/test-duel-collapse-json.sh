#!/bin/bash

# ⚔️ TEST DUEL DU COLLAPSE - Version JSON
# =======================================
# Charge et exécute le scénario JSON DUEL_COLLAPSE.json

echo "⚔️ TEST DUEL DU COLLAPSE - JSON VERSION"
echo "======================================="
echo "🥊 Chargement du scénario de duel PVP..."

# Configuration
HOST="localhost:8080"
SCENARIO_JSON="🎮 game_assets/scenarios/visualizer/DUEL_COLLAPSE.json"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Fonction pour logger avec timestamp
log_with_time() {
    echo -e "${CYAN}[$(date '+%H:%M:%S')]${NC} $1"
}

# Vérifier que le fichier JSON existe
if [ ! -f "$SCENARIO_JSON" ]; then
    echo -e "${RED}❌ Fichier scénario non trouvé: $SCENARIO_JSON${NC}"
    exit 1
fi

log_with_time "📄 Scénario trouvé: $(basename $SCENARIO_JSON)"

# Fonction pour analyser le scénario JSON
analyze_scenario() {
    echo -e "\n${PURPLE}📋 Analyse du scénario...${NC}"
    
    # Lire et valider le JSON
    if ! scenario_data=$(cat "$SCENARIO_JSON" | jq .); then
        echo -e "${RED}❌ JSON invalide${NC}"
        return 1
    fi
    
    # Extraire les informations
    scenario_name=$(echo "$scenario_data" | jq -r '.scenario_info.name')
    scenario_type=$(echo "$scenario_data" | jq -r '.scenario_info.type')
    max_turns=$(echo "$scenario_data" | jq -r '.scenario_info.max_turns')
    difficulty=$(echo "$scenario_data" | jq -r '.scenario_info.difficulty')
    duration=$(echo "$scenario_data" | jq -r '.scenario_info.duration_estimate')
    
    echo -e "${CYAN}📖 Nom: $scenario_name${NC}"
    echo -e "${CYAN}🎯 Type: $scenario_type${NC}"
    echo -e "${CYAN}🔄 Tours max: $max_turns${NC}"
    echo -e "${CYAN}⭐ Difficulté: $difficulty${NC}"
    echo -e "${CYAN}⏱️ Durée estimée: $duration${NC}"
    
    # Analyser la carte
    map_width=$(echo "$scenario_data" | jq -r '.game_settings.map.width')
    map_height=$(echo "$scenario_data" | jq -r '.game_settings.map.height')
    map_terrain=$(echo "$scenario_data" | jq -r '.game_settings.map.terrain')
    
    echo -e "${CYAN}🗺️ Carte: ${map_width}x${map_height} ($map_terrain)${NC}"
    
    # Analyser les héros
    heroes_count=$(echo "$scenario_data" | jq '.heroes | length')
    echo -e "${CYAN}🦸 Héros: $heroes_count${NC}"
    
    # Lister les héros
    echo "$scenario_data" | jq -r '.heroes[] | "  - \(.name) (Niveau \(.level), \(.stats.health) HP)"' | while read -r hero; do
        echo -e "${CYAN}$hero${NC}"
    done
    
    # Analyser les conditions de victoire
    echo -e "${CYAN}🏆 Conditions de victoire:${NC}"
    echo "$scenario_data" | jq -r '.game_settings.victory_conditions[]' | while read -r condition; do
        echo -e "${CYAN}  - $condition${NC}"
    done
    
    return 0
}

# Fonction pour setup le jeu selon le scénario
setup_game_from_scenario() {
    echo -e "\n${BLUE}🎮 Configuration du jeu selon le scénario...${NC}"
    
    # Créer le jeu
    response=$(curl -s -X POST "http://$HOST/api/temporal/games" \
        -H "Content-Type: application/json" \
        -d '{"gameName": "Duel du Collapse", "playerCount": 2}')
    
    GAME_ID=$(echo "$response" | jq -r '.gameId // empty')
    
    if [ -n "$GAME_ID" ]; then
        echo -e "${GREEN}✅ Jeu créé avec ID: $GAME_ID${NC}"
    else
        echo -e "${RED}❌ Échec de création du jeu${NC}"
        return 1
    fi
    
    # Configurer la carte
    scenario_data=$(cat "$SCENARIO_JSON")
    map_data=$(echo "$scenario_data" | jq '.game_settings.map')
    
    echo -e "${BLUE}🗺️ Configuration de la carte...${NC}"
    map_response=$(curl -s -X POST "http://$HOST/api/games/$GAME_ID/map" \
        -H "Content-Type: application/json" \
        -d "$map_data")
    
    if echo "$map_response" | jq -e '.success' > /dev/null; then
        echo -e "${GREEN}✅ Carte configurée${NC}"
    else
        echo -e "${YELLOW}⚠️ Configuration carte: endpoint peut ne pas exister${NC}"
    fi
    
    return 0
}

# Fonction pour créer les héros du scénario
create_scenario_heroes() {
    echo -e "\n${PURPLE}👥 Création des héros du scénario...${NC}"
    
    scenario_data=$(cat "$SCENARIO_JSON")
    
    # Créer chaque héros
    echo "$scenario_data" | jq -c '.heroes[]' | while read -r hero_data; do
        hero_name=$(echo "$hero_data" | jq -r '.name')
        hero_level=$(echo "$hero_data" | jq -r '.level')
        hero_x=$(echo "$hero_data" | jq -r '.start_position.x')
        hero_y=$(echo "$hero_data" | jq -r '.start_position.y')
        
        echo -e "\n${BLUE}→ Création de $hero_name (Niveau $hero_level)${NC}"
        
        # Créer le héros
        hero_response=$(curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
            -H "Content-Type: application/json" \
            -d "{\"script\":\"HERO($hero_name)\"}")
        
        if echo "$hero_response" | jq -e '.success' > /dev/null; then
            echo -e "${GREEN}  ✅ $hero_name créé${NC}"
        else
            echo -e "${RED}  ❌ Erreur création $hero_name${NC}"
        fi
        
        # Placer le héros
        place_response=$(curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
            -H "Content-Type: application/json" \
            -d "{\"script\":\"PLACE($hero_name, @$hero_x,$hero_y)\"}")
        
        if echo "$place_response" | jq -e '.success' > /dev/null; then
            echo -e "${GREEN}  ✅ $hero_name placé en ($hero_x,$hero_y)${NC}"
        else
            echo -e "${YELLOW}  ⚠️ Placement $hero_name: commande peut ne pas exister${NC}"
        fi
        
        # Équiper le héros
        if echo "$hero_data" | jq -e '.equipment' > /dev/null; then
            echo "$hero_data" | jq -r '.equipment[]' | while read -r equipment; do
                equip_response=$(curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
                    -H "Content-Type: application/json" \
                    -d "{\"script\":\"EQUIP($hero_name, $equipment)\"}")
                
                if echo "$equip_response" | jq -e '.success' > /dev/null; then
                    echo -e "${GREEN}    ✅ Équipé: $equipment${NC}"
                else
                    echo -e "${YELLOW}    ⚠️ Équipement $equipment: commande peut ne pas exister${NC}"
                fi
            done
        fi
        
        sleep 1
    done
}

# Fonction pour simuler le duel
simulate_duel() {
    echo -e "\n${PURPLE}⚔️ Simulation du duel...${NC}"
    
    scenario_data=$(cat "$SCENARIO_JSON")
    
    # Obtenir les noms des héros
    hero1=$(echo "$scenario_data" | jq -r '.heroes[0].name')
    hero2=$(echo "$scenario_data" | jq -r '.heroes[1].name')
    
    echo -e "${CYAN}🥊 $hero1 VS $hero2${NC}"
    
    # Démarrer le combat
    battle_response=$(curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
        -H "Content-Type: application/json" \
        -d "{\"script\":\"BATTLE($hero1, $hero2)\"}")
    
    if echo "$battle_response" | jq -e '.success' > /dev/null; then
        echo -e "${GREEN}✅ Combat initié${NC}"
        
        # Afficher les détails du combat si disponibles
        if echo "$battle_response" | jq -e '.result' > /dev/null; then
            battle_result=$(echo "$battle_response" | jq -r '.result')
            echo -e "${CYAN}🎯 Résultat: $battle_result${NC}"
        fi
    else
        echo -e "${RED}❌ Erreur lors du combat${NC}"
        echo "$battle_response" | jq '.'
    fi
}

# Fonction pour vérifier les conditions de victoire
check_victory_conditions() {
    echo -e "\n${PURPLE}🏆 Vérification des conditions de victoire...${NC}"
    
    scenario_data=$(cat "$SCENARIO_JSON")
    
    # Lister les conditions
    echo "$scenario_data" | jq -r '.game_settings.victory_conditions[]' | while read -r condition; do
        echo -e "${CYAN}  📋 $condition${NC}"
    done
    
    # Obtenir l'état du jeu pour vérifier
    if [ -n "$GAME_ID" ]; then
        game_state=$(curl -s "http://$HOST/api/games/$GAME_ID/state")
        
        if [ "$game_state" != "null" ] && [ "$game_state" != "" ]; then
            echo -e "\n${CYAN}🎮 État actuel du jeu:${NC}"
            echo "$game_state" | jq '.'
        fi
    fi
}

# Fonction pour afficher le résumé du duel
show_duel_summary() {
    echo -e "\n${PURPLE}📊 RÉSUMÉ DU DUEL${NC}"
    echo "===================="
    
    scenario_data=$(cat "$SCENARIO_JSON")
    
    # Informations du scénario
    echo -e "${CYAN}📖 Scénario: $(echo "$scenario_data" | jq -r '.scenario_info.name')${NC}"
    echo -e "${CYAN}⭐ Difficulté: $(echo "$scenario_data" | jq -r '.scenario_info.difficulty')${NC}"
    echo -e "${CYAN}⏱️ Durée: $(echo "$scenario_data" | jq -r '.scenario_info.duration_estimate')${NC}"
    
    # Héros participants
    echo -e "\n${CYAN}👥 Participants:${NC}"
    echo "$scenario_data" | jq -r '.heroes[] | "  - \(.name) (\(.class), Niveau \(.level))"' | while read -r hero; do
        echo -e "${CYAN}$hero${NC}"
    done
    
    echo -e "\n${GREEN}✅ Test du duel terminé${NC}"
}

# EXÉCUTION PRINCIPALE
main() {
    log_with_time "🚀 Démarrage du test DUEL COLLAPSE JSON"
    
    # Étape 1: Analyser le scénario
    if ! analyze_scenario; then
        exit 1
    fi
    
    # Étape 2: Vérifier le backend
    echo -e "\n${BLUE}🔍 Vérification du backend...${NC}"
    if ! curl -s "$HOST/health" > /dev/null 2>&1; then
        echo -e "${RED}❌ Backend non accessible${NC}"
        echo -e "${YELLOW}💡 Démarrez le backend avec: mvn spring-boot:run${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Backend accessible${NC}"
    
    # Étape 3: Setup du jeu
    if ! setup_game_from_scenario; then
        exit 1
    fi
    
    # Étape 4: Créer les héros
    create_scenario_heroes
    
    # Étape 5: Simuler le duel
    simulate_duel
    
    # Étape 6: Vérifier les conditions
    check_victory_conditions
    
    # Étape 7: Résumé
    show_duel_summary
    
    log_with_time "🏁 Test terminé"
}

# Gestion des erreurs
set -e
trap 'echo -e "\n${RED}❌ Erreur détectée, arrêt du script${NC}"; exit 1' ERR

# Lancer le test
main "$@"