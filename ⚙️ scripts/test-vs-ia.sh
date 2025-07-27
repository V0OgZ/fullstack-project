#!/bin/bash

# 🎮 TEST JEU VS IA - Heroes of Time
# Script pour jouer contre l'IA tour par tour

echo "🎮 TEST JEU VS IA - Heroes of Time"
echo "==================================="

# Configuration
BACKEND_URL="http://localhost:8080"
GAME_ID=""
PLAYER_NAME="Jean"
AI_NAME="Claudius-Memento"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Vérifier le backend
check_backend() {
    echo -e "${BLUE}🔍 Vérification du backend...${NC}"
    if curl -s "$BACKEND_URL/api/health" > /dev/null; then
        echo -e "${GREEN}✅ Backend connecté${NC}"
        return 0
    else
        echo -e "${RED}❌ Backend non disponible${NC}"
        return 1
    fi
}

# Créer une partie avec IA
create_ai_game() {
    echo -e "\n${GREEN}=== CRÉATION PARTIE VS IA ===${NC}"
    
    local response=$(curl -s -X POST "$BACKEND_URL/api/temporal/admin/ai/create-game" \
        -H "Content-Type: application/json" \
        -d "{
            \"playerName\": \"$PLAYER_NAME\",
            \"scenario\": \"ai_vs_human\",
            \"difficulty\": \"normal\"
        }")
    
    GAME_ID=$(echo "$response" | jq -r '.gameId // .id // ""')
    
    if [ -n "$GAME_ID" ] && [ "$GAME_ID" != "null" ]; then
        echo -e "${GREEN}✅ Partie créée avec ID: $GAME_ID${NC}"
        echo -e "${BLUE}👤 Joueur humain: $PLAYER_NAME${NC}"
        echo -e "${PURPLE}🤖 IA: $AI_NAME${NC}"
        
        # Afficher les héros IA
        local ai_heroes=$(echo "$response" | jq -r '.aiHeroes[]? // empty' 2>/dev/null)
        if [ -n "$ai_heroes" ]; then
            echo -e "${PURPLE}🦸 Héros IA:${NC}"
            echo "$ai_heroes" | while read hero; do
                echo -e "  - $hero"
            done
        fi
        
        return 0
    else
        echo -e "${RED}❌ Erreur création partie${NC}"
        echo "$response" | jq '.'
        return 1
    fi
}

# Créer une partie normale si l'IA n'est pas disponible
create_normal_game() {
    echo -e "\n${YELLOW}⚠️  Mode IA non disponible, création partie normale${NC}"
    
    local response=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
        -H "Content-Type: application/json" \
        -d "{
            \"gameName\": \"Test vs IA\",
            \"players\": [\"$PLAYER_NAME\", \"IA-$AI_NAME\"],
            \"scenario\": \"conquest-classic\"
        }")
    
    GAME_ID=$(echo "$response" | jq -r '.gameId // .id // ""')
    
    if [ -n "$GAME_ID" ] && [ "$GAME_ID" != "null" ]; then
        echo -e "${GREEN}✅ Partie normale créée avec ID: $GAME_ID${NC}"
        return 0
    else
        echo -e "${RED}❌ Erreur création partie${NC}"
        return 1
    fi
}

# Charger un scénario HOTS
load_hots_scenario() {
    local scenario_file="${1:-game_assets/scenarios/hots/decouverte_brouillard.hots}"
    
    if [ ! -f "$scenario_file" ]; then
        echo -e "${YELLOW}⚠️  Fichier non trouvé: $scenario_file${NC}"
        return 1
    fi
    
    echo -e "\n${GREEN}=== CHARGEMENT SCÉNARIO HOTS ===${NC}"
    echo -e "${BLUE}📜 Fichier: $scenario_file${NC}"
    
    # Exécuter le script HOTS ligne par ligne
    local line_num=0
    local success_count=0
    
    while IFS= read -r line; do
        line_num=$((line_num + 1))
        
        # Ignorer lignes vides et commentaires
        if [[ -z "$line" ]] || [[ "$line" =~ ^[[:space:]]*# ]]; then
            continue
        fi
        
        echo -e "${YELLOW}[L$line_num]${NC} $line"
        
        # Envoyer la commande
        local cmd_response=$(curl -s -X POST "$BACKEND_URL/api/temporal/execute/$GAME_ID" \
            -H "Content-Type: application/json" \
            -d "{\"script\": \"$line\"}" 2>&1)
        
        if echo "$cmd_response" | jq -e '.success == true' > /dev/null 2>&1; then
            echo -e "${GREEN}✅ OK${NC}"
            success_count=$((success_count + 1))
        else
            echo -e "${RED}❌ Échec${NC}"
            echo "$cmd_response" | jq -r '.error // .message // "Erreur"' 2>/dev/null
        fi
        
        sleep 0.1
    done < "$scenario_file"
    
    echo -e "${GREEN}✅ Scénario chargé: $success_count commandes exécutées${NC}"
}

# Afficher l'état du jeu
show_game_state() {
    echo -e "\n${BLUE}=== ÉTAT DU JEU ===${NC}"
    
    local state=$(curl -s "$BACKEND_URL/api/temporal/state/$GAME_ID")
    
    # Afficher le tour actuel
    local turn=$(echo "$state" | jq -r '.currentTurn // 1')
    echo -e "${YELLOW}Tour: $turn${NC}"
    
    # Afficher les héros
    echo -e "\n${BLUE}🦸 Héros:${NC}"
    echo "$state" | jq -r '.heroes[]? | "- \(.name) [\(.owner)] en (\(.position.x),\(.position.y)) HP:\(.hp)"' 2>/dev/null || echo "Aucun héros"
    
    # Afficher les créatures
    echo -e "\n${BLUE}🐉 Créatures:${NC}"
    echo "$state" | jq -r '.creatures[]? | "- \(.name) en (\(.position.x),\(.position.y))"' 2>/dev/null || echo "Aucune créature"
    
    # Afficher les bâtiments
    echo -e "\n${BLUE}🏰 Bâtiments:${NC}"
    echo "$state" | jq -r '.buildings[]? | "- \(.name) en (\(.position.x),\(.position.y))"' 2>/dev/null || echo "Aucun bâtiment"
}

# Jouer un tour joueur
play_player_turn() {
    echo -e "\n${GREEN}=== TOUR DU JOUEUR ===${NC}"
    echo "Commandes disponibles:"
    echo "  MOV(hero, @x,y) - Déplacer un héros"
    echo "  BATTLE(hero, target) - Attaquer"
    echo "  USE(ITEM, item, HERO:hero) - Utiliser objet"
    echo "  skip - Passer le tour"
    echo "  quit - Quitter"
    
    while true; do
        echo -n -e "${BLUE}> ${NC}"
        read -r command
        
        if [ "$command" = "quit" ]; then
            return 1
        elif [ "$command" = "skip" ]; then
            echo -e "${YELLOW}Tour passé${NC}"
            break
        else
            # Exécuter la commande
            local response=$(curl -s -X POST "$BACKEND_URL/api/temporal/execute/$GAME_ID" \
                -H "Content-Type: application/json" \
                -d "{\"script\": \"$command\", \"player\": \"$PLAYER_NAME\"}")
            
            if echo "$response" | jq -e '.success == true' > /dev/null 2>&1; then
                echo -e "${GREEN}✅ Commande exécutée${NC}"
                break
            else
                echo -e "${RED}❌ Erreur: $(echo "$response" | jq -r '.error // "Commande invalide"')${NC}"
            fi
        fi
    done
}

# Jouer un tour IA
play_ai_turn() {
    echo -e "\n${PURPLE}=== TOUR DE L'IA ===${NC}"
    echo -e "${PURPLE}🤖 $AI_NAME réfléchit...${NC}"
    
    sleep 1
    
    # Essayer l'endpoint IA d'abord
    local response=$(curl -s -X POST "$BACKEND_URL/api/temporal/admin/ai/play-turn/$GAME_ID" \
        -H "Content-Type: application/json")
    
    if echo "$response" | jq -e '.success == true' > /dev/null 2>&1; then
        echo -e "${GREEN}✅ IA a joué${NC}"
        
        # Afficher les actions
        echo "$response" | jq -r '.actions[]? | "🤖 \(.hero): \(.description)"' 2>/dev/null
    else
        # Fallback: actions simulées
        echo -e "${YELLOW}⚠️  Mode IA simplifié${NC}"
        simulate_ai_turn
    fi
}

# Simuler un tour IA simple
simulate_ai_turn() {
    # Actions IA basiques
    local ai_actions=(
        "MOV(Claudius, @$((RANDOM % 20 + 1)),$((RANDOM % 20 + 1)))"
        "CREATE(CREATURE, Skeleton, @$((RANDOM % 20 + 1)),$((RANDOM % 20 + 1)))"
        "HERO(Memento)"
    )
    
    # Choisir une action aléatoire
    local action="${ai_actions[$((RANDOM % ${#ai_actions[@]}))]}"
    
    echo -e "${PURPLE}🤖 IA joue: $action${NC}"
    
    curl -s -X POST "$BACKEND_URL/api/temporal/execute/$GAME_ID" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"$action\", \"player\": \"IA-$AI_NAME\"}" > /dev/null
}

# Boucle de jeu principale
game_loop() {
    local turn=1
    
    echo -e "\n${GREEN}=== DÉBUT DE LA PARTIE ===${NC}"
    
    while true; do
        echo -e "\n${YELLOW}════════════════════════════${NC}"
        echo -e "${YELLOW}TOUR $turn${NC}"
        echo -e "${YELLOW}════════════════════════════${NC}"
        
        # Afficher l'état
        show_game_state
        
        # Tour du joueur
        if ! play_player_turn; then
            echo -e "${RED}Partie abandonnée${NC}"
            break
        fi
        
        # Tour de l'IA
        play_ai_turn
        
        # Incrémenter le tour
        turn=$((turn + 1))
        
        # Vérifier conditions de victoire
        check_victory_conditions
        
        echo -e "\n${YELLOW}Appuyez sur Entrée pour continuer...${NC}"
        read -r
    done
}

# Vérifier les conditions de victoire
check_victory_conditions() {
    local state=$(curl -s "$BACKEND_URL/api/temporal/state/$GAME_ID")
    
    # Compter les héros par joueur
    local player_heroes=$(echo "$state" | jq "[.heroes[]? | select(.owner == \"$PLAYER_NAME\")] | length" 2>/dev/null || echo "0")
    local ai_heroes=$(echo "$state" | jq "[.heroes[]? | select(.owner | contains(\"IA\"))] | length" 2>/dev/null || echo "0")
    
    if [ "$player_heroes" -eq 0 ] && [ "$ai_heroes" -gt 0 ]; then
        echo -e "\n${RED}🏴 DÉFAITE ! L'IA a gagné !${NC}"
        exit 0
    elif [ "$ai_heroes" -eq 0 ] && [ "$player_heroes" -gt 0 ]; then
        echo -e "\n${GREEN}🏆 VICTOIRE ! Vous avez battu l'IA !${NC}"
        exit 0
    fi
}

# Menu principal
main_menu() {
    echo -e "\n${GREEN}=== MENU PRINCIPAL ===${NC}"
    echo "1. Partie rapide vs IA"
    echo "2. Charger scénario HOTS"
    echo "3. Partie personnalisée"
    echo "4. Quitter"
    
    echo -n -e "${BLUE}Choix: ${NC}"
    read -r choice
    
    case $choice in
        1)
            if create_ai_game || create_normal_game; then
                game_loop
            fi
            ;;
        2)
            echo -n "Fichier HOTS (défaut: decouverte_brouillard.hots): "
            read -r scenario
            if create_normal_game; then
                load_hots_scenario "$scenario"
                game_loop
            fi
            ;;
        3)
            echo "🚧 En construction"
            ;;
        4)
            echo "👋 Au revoir !"
            exit 0
            ;;
        *)
            echo -e "${RED}Choix invalide${NC}"
            ;;
    esac
}

# Programme principal
main() {
    echo -e "${PURPLE}╔══════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║   🎮 HEROES OF TIME - VS IA 🤖      ║${NC}"
    echo -e "${PURPLE}║   Système Quantique Temporel         ║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════╝${NC}"
    
    # Vérifier le backend
    if ! check_backend; then
        echo -e "${RED}❌ Impossible de se connecter au backend${NC}"
        echo "Assurez-vous que le backend est lancé sur le port 8080"
        exit 1
    fi
    
    # Boucle menu
    while true; do
        main_menu
    done
}

# Lancer le programme
main 