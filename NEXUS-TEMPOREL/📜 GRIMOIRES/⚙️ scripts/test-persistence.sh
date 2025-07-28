#!/bin/bash

# 🎮 TEST SYSTÈME DE PERSISTENCE - Heroes of Time
# Script pour tester sauvegarde/chargement de parties

echo "🎮 TEST SYSTÈME DE PERSISTENCE"
echo "==============================="

# Configuration
BACKEND_URL="http://localhost:8080"
GAME_ID="test-persistence-$(date +%s)"
PLAYER_ID="player1"
SAVE_NAME="Test-Save-$(date +%Y%m%d-%H%M%S)"

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

# Créer une partie de test
create_test_game() {
    echo -e "\n${GREEN}=== CRÉATION PARTIE DE TEST ===${NC}"
    
    local response=$(curl -s -X POST "$BACKEND_URL/api/games" \
        -H "Content-Type: application/json" \
        -d "{
            \"gameName\": \"Test Persistence\",
            \"players\": [\"$PLAYER_ID\", \"AI-Test\"]
        }")
    
    GAME_ID=$(echo "$response" | jq -r '.id // .gameId // ""')
    
    if [ -n "$GAME_ID" ] && [ "$GAME_ID" != "null" ]; then
        echo -e "${GREEN}✅ Partie créée avec ID: $GAME_ID${NC}"
        return 0
    else
        echo -e "${RED}❌ Erreur création partie${NC}"
        echo "$response" | jq '.'
        return 1
    fi
}

# Jouer quelques actions
play_some_actions() {
    echo -e "\n${GREEN}=== ACTIONS DE JEU ===${NC}"
    
    # Créer un héros
    echo -e "${BLUE}Création d'un héros...${NC}"
    curl -s -X POST "$BACKEND_URL/api/temporal/execute/$GAME_ID" \
        -H "Content-Type: application/json" \
        -d '{"script": "HERO(TestHero)"}' > /dev/null
    
    # Déplacer le héros
    echo -e "${BLUE}Déplacement du héros...${NC}"
    curl -s -X POST "$BACKEND_URL/api/temporal/execute/$GAME_ID" \
        -H "Content-Type: application/json" \
        -d '{"script": "MOV(TestHero, @5,5)"}' > /dev/null
    
    # Créer un bâtiment
    echo -e "${BLUE}Construction d'un bâtiment...${NC}"
    curl -s -X POST "$BACKEND_URL/api/temporal/execute/$GAME_ID" \
        -H "Content-Type: application/json" \
        -d '{"script": "CREATE(BUILDING, Tour_Test, @7,7)"}' > /dev/null
    
    echo -e "${GREEN}✅ Actions exécutées${NC}"
}

# Afficher l'état actuel
show_game_state() {
    echo -e "\n${BLUE}=== ÉTAT DU JEU ===${NC}"
    
    local state=$(curl -s "$BACKEND_URL/api/temporal/state/$GAME_ID")
    
    echo -e "${YELLOW}Tour:${NC} $(echo "$state" | jq -r '.currentTurn // .turn // 1')"
    echo -e "${YELLOW}Héros:${NC}"
    echo "$state" | jq -r '.heroes[]? | "  - \(.name) en (\(.position.x),\(.position.y))"' 2>/dev/null || echo "  Aucun"
    echo -e "${YELLOW}Bâtiments:${NC}"
    echo "$state" | jq -r '.buildings[]? | "  - \(.name) en (\(.position.x),\(.position.y))"' 2>/dev/null || echo "  Aucun"
}

# Tester la sauvegarde
test_save() {
    echo -e "\n${PURPLE}=== TEST SAUVEGARDE ===${NC}"
    
    local response=$(curl -s -X POST "$BACKEND_URL/api/persistence/games/$GAME_ID/save" \
        -H "Content-Type: application/json" \
        -d "{
            \"playerId\": \"$PLAYER_ID\",
            \"saveName\": \"$SAVE_NAME\",
            \"description\": \"Test de sauvegarde avec héros et bâtiments\"
        }")
    
    if echo "$response" | jq -e '.success == true' > /dev/null 2>&1; then
        SAVE_ID=$(echo "$response" | jq -r '.saveId')
        echo -e "${GREEN}✅ Sauvegarde réussie - ID: $SAVE_ID${NC}"
        echo -e "${GREEN}   Nom: $SAVE_NAME${NC}"
        return 0
    else
        echo -e "${RED}❌ Erreur sauvegarde${NC}"
        echo "$response" | jq '.'
        return 1
    fi
}

# Modifier l'état après sauvegarde
modify_after_save() {
    echo -e "\n${YELLOW}=== MODIFICATION APRÈS SAUVEGARDE ===${NC}"
    
    # Ajouter un nouveau héros
    echo -e "${BLUE}Ajout d'un nouveau héros...${NC}"
    curl -s -X POST "$BACKEND_URL/api/temporal/execute/$GAME_ID" \
        -H "Content-Type: application/json" \
        -d '{"script": "HERO(NewHero)"}' > /dev/null
    
    # Créer une créature
    echo -e "${BLUE}Création d'une créature...${NC}"
    curl -s -X POST "$BACKEND_URL/api/temporal/execute/$GAME_ID" \
        -H "Content-Type: application/json" \
        -d '{"script": "CREATE(CREATURE, Dragon, @10,10)"}' > /dev/null
    
    echo -e "${GREEN}✅ État modifié${NC}"
}

# Tester le chargement
test_load() {
    echo -e "\n${PURPLE}=== TEST CHARGEMENT ===${NC}"
    
    echo -e "${BLUE}État avant chargement:${NC}"
    show_game_state
    
    local response=$(curl -s -X POST "$BACKEND_URL/api/persistence/saves/$SAVE_ID/load" \
        -H "Content-Type: application/json" \
        -d "{\"playerId\": \"$PLAYER_ID\"}")
    
    if echo "$response" | jq -e '.success == true' > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Chargement réussi${NC}"
        echo -e "${BLUE}État après chargement (devrait être identique à la sauvegarde):${NC}"
        show_game_state
        return 0
    else
        echo -e "${RED}❌ Erreur chargement${NC}"
        echo "$response" | jq '.'
        return 1
    fi
}

# Tester l'auto-save
test_autosave() {
    echo -e "\n${PURPLE}=== TEST AUTO-SAVE ===${NC}"
    
    # Activer l'auto-save
    echo -e "${BLUE}Activation de l'auto-save...${NC}"
    local response=$(curl -s -X POST "$BACKEND_URL/api/persistence/games/$GAME_ID/autosave/toggle" \
        -H "Content-Type: application/json" \
        -d '{"enable": true}')
    
    if echo "$response" | jq -e '.success == true' > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Auto-save activé${NC}"
    else
        echo -e "${RED}❌ Erreur activation auto-save${NC}"
    fi
    
    # Forcer un auto-save immédiat
    echo -e "${BLUE}Déclenchement auto-save...${NC}"
    response=$(curl -s -X POST "$BACKEND_URL/api/persistence/games/$GAME_ID/autosave")
    
    if echo "$response" | jq -e '.success == true' > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Auto-save créé${NC}"
        echo "$response" | jq -r '.saveName'
    else
        echo -e "${YELLOW}⚠️  Auto-save non créé${NC}"
    fi
}

# Lister les sauvegardes
list_saves() {
    echo -e "\n${PURPLE}=== LISTE DES SAUVEGARDES ===${NC}"
    
    local response=$(curl -s "$BACKEND_URL/api/persistence/saves?playerId=$PLAYER_ID")
    
    if echo "$response" | jq -e '.success == true' > /dev/null 2>&1; then
        local count=$(echo "$response" | jq -r '.count')
        echo -e "${GREEN}✅ $count sauvegarde(s) trouvée(s)${NC}"
        
        echo "$response" | jq -r '.saves[] | 
            "\n📁 ID: \(.id) - \(.saveName)" +
            "\n  Tour: \(.turnNumber) | Type: " + 
            (if .isAutoSave then "🔄 Auto-save" else "💾 Manuelle" end) +
            "\n  " + (.description // "Pas de description")'
    else
        echo -e "${RED}❌ Erreur liste sauvegardes${NC}"
    fi
}

# Tests d'export/import
test_export_import() {
    echo -e "\n${PURPLE}=== TEST EXPORT/IMPORT ===${NC}"
    
    # Export
    echo -e "${BLUE}Export de la sauvegarde...${NC}"
    local export_data=$(curl -s "$BACKEND_URL/api/persistence/saves/$SAVE_ID/export?playerId=$PLAYER_ID")
    
    if echo "$export_data" | jq -e '.saveName' > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Export réussi${NC}"
        
        # Sauvegarder dans un fichier
        echo "$export_data" > "test-export-$SAVE_ID.json"
        echo -e "${GREEN}   Fichier: test-export-$SAVE_ID.json${NC}"
        
        # Import
        echo -e "${BLUE}Import de la sauvegarde...${NC}"
        local import_response=$(curl -s -X POST "$BACKEND_URL/api/persistence/saves/import" \
            -H "Content-Type: application/json" \
            -d "{
                \"playerId\": \"$PLAYER_ID\",
                \"exportData\": $(echo "$export_data" | jq -Rs .)
            }")
        
        if echo "$import_response" | jq -e '.success == true' > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Import réussi${NC}"
            echo -e "${GREEN}   Nouvelle ID: $(echo "$import_response" | jq -r '.saveId')${NC}"
            echo -e "${GREEN}   Nom: $(echo "$import_response" | jq -r '.saveName')${NC}"
        else
            echo -e "${RED}❌ Erreur import${NC}"
            echo "$import_response" | jq '.'
        fi
        
        # Nettoyer le fichier
        rm -f "test-export-$SAVE_ID.json"
    else
        echo -e "${RED}❌ Erreur export${NC}"
    fi
}

# Programme principal
main() {
    echo -e "${PURPLE}╔══════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║  🎮 TEST PERSISTENCE SYSTEM 🎮      ║${NC}"
    echo -e "${PURPLE}║     Heroes of Time - Save/Load       ║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════╝${NC}"
    
    # Vérifier le backend
    if ! check_backend; then
        echo -e "${RED}❌ Test annulé - Backend non disponible${NC}"
        exit 1
    fi
    
    # Suite de tests
    if create_test_game; then
        play_some_actions
        show_game_state
        
        if test_save; then
            modify_after_save
            test_load
            test_autosave
            list_saves
            test_export_import
        fi
    fi
    
    echo -e "\n${GREEN}✅ TESTS TERMINÉS !${NC}"
    echo -e "${YELLOW}💡 Utilisez les commandes suivantes:${NC}"
    echo -e "  ${CYAN}./hots save <nom>${NC}       - Sauvegarder une partie"
    echo -e "  ${CYAN}./hots load <id>${NC}        - Charger une sauvegarde"
    echo -e "  ${CYAN}./hots list-saves${NC}       - Voir toutes les sauvegardes"
}

# Lancer les tests
main 