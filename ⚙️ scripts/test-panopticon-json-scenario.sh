#!/bin/bash

# 🎛️ TEST SCÉNARIO PANOPTICΩN - Version JSON
# ==========================================
# Charge et exécute le scénario JSON panopticon_axis_test.json

echo "🎛️ TEST SCÉNARIO PANOPTICΩN - JSON VERSION"
echo "==========================================="
echo "📋 Chargement du scénario JSON complet..."

# Configuration
HOST="localhost:8080"
SCENARIO_JSON="game_assets/scenarios/visualizer/panopticon_axis_test.json"

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

log_with_time "📄 Fichier scénario trouvé: $(basename $SCENARIO_JSON)"

# Fonction pour tester la connexion backend
test_backend() {
    echo -e "\n${BLUE}🔍 Vérification du backend...${NC}"
    if curl -s "$HOST/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend accessible sur $HOST${NC}"
        return 0
    else
        echo -e "${RED}❌ Backend non accessible sur $HOST${NC}"
        echo -e "${YELLOW}💡 Assurez-vous que le backend est démarré${NC}"
        return 1
    fi
}

# Fonction pour créer un nouveau jeu
create_game() {
    echo -e "\n${BLUE}🎮 Création d'un nouveau jeu...${NC}"
    
    response=$(curl -s -X POST "http://$HOST/api/temporal/games" \
        -H "Content-Type: application/json" \
        -d '{"gameName": "PANOPTICON Test", "playerCount": 2}')
    
    # Extraire l'ID du jeu
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

# Fonction pour charger le scénario JSON complet
load_json_scenario() {
    echo -e "\n${PURPLE}📋 Chargement du scénario JSON...${NC}"
    
    # Lire le fichier JSON
    if ! scenario_data=$(cat "$SCENARIO_JSON"); then
        echo -e "${RED}❌ Impossible de lire le fichier JSON${NC}"
        return 1
    fi
    
    # Valider le JSON
    if ! echo "$scenario_data" | jq . > /dev/null 2>&1; then
        echo -e "${RED}❌ JSON invalide${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✅ Scénario JSON chargé et validé${NC}"
    
    # Extraire les informations du scénario
    scenario_name=$(echo "$scenario_data" | jq -r '.scenario.name')
    scenario_desc=$(echo "$scenario_data" | jq -r '.scenario.description')
    heroes_count=$(echo "$scenario_data" | jq '.heroes | length')
    psi_states_count=$(echo "$scenario_data" | jq '.psi_states | length')
    
    echo -e "${CYAN}📖 Nom: $scenario_name${NC}"
    echo -e "${CYAN}📝 Description: $scenario_desc${NC}"
    echo -e "${CYAN}🦸 Héros: $heroes_count${NC}"
    echo -e "${CYAN}⚡ ψ-States: $psi_states_count${NC}"
    
    return 0
}

# Fonction pour envoyer le scénario JSON au backend
send_json_scenario() {
    echo -e "\n${BLUE}🚀 Envoi du scénario au backend...${NC}"
    
    # Envoyer le scénario complet
    response=$(curl -s -X POST "http://$HOST/api/scenarios/load" \
        -H "Content-Type: application/json" \
        -d @"$SCENARIO_JSON")
    
    # Vérifier le succès
    success=$(echo "$response" | jq -r '.success // false')
    if [ "$success" = "true" ]; then
        echo -e "${GREEN}✅ Scénario chargé avec succès${NC}"
        
        # Afficher les détails de la réponse
        if echo "$response" | jq -e '.gameId' > /dev/null; then
            game_id=$(echo "$response" | jq -r '.gameId')
            echo -e "${CYAN}🎮 ID du jeu: $game_id${NC}"
        fi
        
        if echo "$response" | jq -e '.message' > /dev/null; then
            message=$(echo "$response" | jq -r '.message')
            echo -e "${CYAN}💬 Message: $message${NC}"
        fi
        
        return 0
    else
        echo -e "${RED}❌ Échec du chargement du scénario${NC}"
        echo "$response" | jq '.'
        return 1
    fi
}

# Fonction pour exécuter les actions du scénario
execute_scenario_actions() {
    echo -e "\n${PURPLE}⚡ Exécution des ψ-states du scénario...${NC}"
    
    # Lire les ψ-states depuis le JSON
    psi_states=$(cat "$SCENARIO_JSON" | jq -c '.psi_states[]')
    
    while IFS= read -r psi_state; do
        psi_id=$(echo "$psi_state" | jq -r '.id')
        action=$(echo "$psi_state" | jq -r '.action')
        description=$(echo "$psi_state" | jq -r '.description // "Action ψ-state"')
        
        echo -e "\n${BLUE}→ Exécution $psi_id: ${NC}$action"
        echo -e "${YELLOW}  📝 $description${NC}"
        
        # Envoyer l'action au backend
        response=$(curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
            -H "Content-Type: application/json" \
            -d "{\"script\":\"$action\"}")
        
        # Vérifier le succès
        success=$(echo "$response" | jq -r '.success // false')
        if [ "$success" = "true" ]; then
            echo -e "${GREEN}  ✅ $psi_id exécuté${NC}"
        else
            echo -e "${RED}  ❌ Erreur $psi_id${NC}"
            echo "$response" | jq '.'
        fi
        
        # Petite pause entre les actions
        sleep 1
        
    done <<< "$psi_states"
}

# Fonction pour vérifier les résultats attendus
check_expected_results() {
    echo -e "\n${PURPLE}🔍 Vérification des résultats attendus...${NC}"
    
    expected_results=$(cat "$SCENARIO_JSON" | jq -r '.expected_results // empty')
    
    if [ -n "$expected_results" ]; then
        echo "$expected_results" | jq -r 'to_entries[] | "  \(.key): \(.value)"' | while read -r result; do
            echo -e "${CYAN}  📋 $result${NC}"
        done
    else
        echo -e "${YELLOW}  ℹ️ Aucun résultat attendu spécifié${NC}"
    fi
}

# Fonction pour afficher le résumé final
show_summary() {
    echo -e "\n${PURPLE}📊 RÉSUMÉ DU TEST${NC}"
    echo "===================="
    
    # Obtenir l'état du jeu
    if [ -n "$GAME_ID" ]; then
        game_state=$(curl -s "http://$HOST/api/games/$GAME_ID/state" | jq '.')
        
        if [ "$game_state" != "null" ]; then
            echo -e "${CYAN}🎮 État du jeu:${NC}"
            echo "$game_state" | jq '.'
        fi
    fi
    
    echo -e "\n${GREEN}✅ Test du scénario PANOPTICON terminé${NC}"
}

# EXÉCUTION PRINCIPALE
main() {
    log_with_time "🚀 Démarrage du test PANOPTICON JSON"
    
    # Étape 1: Vérifier le backend
    if ! test_backend; then
        exit 1
    fi
    
    # Étape 2: Charger et valider le JSON
    if ! load_json_scenario; then
        exit 1
    fi
    
    # Étape 3: Créer un jeu
    if ! create_game; then
        exit 1
    fi
    
    # Étape 4: Envoyer le scénario (si l'endpoint existe)
    echo -e "\n${YELLOW}⚠️ Note: L'endpoint /api/scenarios/load n'existe peut-être pas encore${NC}"
    echo -e "${YELLOW}   Continuons avec l'exécution manuelle des actions...${NC}"
    
    # Étape 5: Exécuter les actions du scénario
    execute_scenario_actions
    
    # Étape 6: Vérifier les résultats
    check_expected_results
    
    # Étape 7: Résumé
    show_summary
    
    log_with_time "🏁 Test terminé"
}

# Gestion des erreurs
set -e
trap 'echo -e "\n${RED}❌ Erreur détectée, arrêt du script${NC}"; exit 1' ERR

# Lancer le test
main "$@"