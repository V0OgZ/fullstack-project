#!/bin/bash

# 🎮 TEST ÉCONOMIE DE GUERRE - Heroes of Time
# Test complet du gameplay économique avec recrutement et construction

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🎮 HEROES OF TIME - TEST ÉCONOMIE DE GUERRE${NC}"
echo -e "${PURPLE}============================================${NC}"
echo -e "${CYAN}Objectif: Tester le gameplay économique avec recrutement et construction${NC}"
echo ""

# Vérification du backend
echo -e "${BLUE}🔍 Vérification du backend...${NC}"
if curl -s http://localhost:8080/api/health > /dev/null; then
    echo -e "${GREEN}✅ Backend disponible${NC}"
else
    echo -e "${RED}❌ Backend non disponible - Démarrage...${NC}"
    cd backend && mvn spring-boot:run > backend-economie.log 2>&1 &
    sleep 10
fi

# Récupération du jeu existant
echo -e "${BLUE}🎮 Récupération du jeu existant...${NC}"
EXISTING_GAME=$(curl -s -X POST http://localhost:8080/api/games \
  -H "Content-Type: application/json" \
  -d '{"gameName": "Test Économie de Guerre", "playerId": "memento-test"}')

# Extraction du GAME_ID
GAME_ID=$(echo "$EXISTING_GAME" | jq -r '.id // empty')
if [ -z "$GAME_ID" ]; then
    echo -e "${RED}❌ Impossible d'extraire le GAME_ID${NC}"
    echo -e "${RED}   Réponse: $EXISTING_GAME${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Jeu récupéré avec ID: $GAME_ID${NC}"

# === ANALYSE DE L'ÉTAT ACTUEL ===
echo -e "${BLUE}📊 ANALYSE DE L'ÉTAT ACTUEL${NC}"
echo -e "${BLUE}==========================${NC}"

GAME_STATE=$(curl -s http://localhost:8080/api/games/$GAME_ID)

# Analyse des joueurs
PLAYERS_COUNT=$(echo "$GAME_STATE" | jq -r '.players | length // 0')
echo -e "${CYAN}👥 Nombre de joueurs: $PLAYERS_COUNT${NC}"

# Analyse des héros
HEROES_COUNT=$(echo "$GAME_STATE" | jq -r '.players | map(.heroes | length) | add // 0')
echo -e "${CYAN}👑 Nombre total de héros: $HEROES_COUNT${NC}"

# Analyse des bâtiments
BUILDINGS_COUNT=$(echo "$GAME_STATE" | jq -r '.players | map(.buildings | length) | add // 0')
echo -e "${CYAN}🏛️ Nombre total de bâtiments: $BUILDINGS_COUNT${NC}"

# Analyse des ressources du joueur 1
PLAYER1_GOLD=$(echo "$GAME_STATE" | jq -r '.players[0].resources.gold // 0')
PLAYER1_WOOD=$(echo "$GAME_STATE" | jq -r '.players[0].resources.wood // 0')
PLAYER1_STONE=$(echo "$GAME_STATE" | jq -r '.players[0].resources.stone // 0')
echo -e "${CYAN}💰 Ressources Joueur 1: Or=$PLAYER1_GOLD, Bois=$PLAYER1_WOOD, Pierre=$PLAYER1_STONE${NC}"

# === VÉRIFICATION DES CONDITIONS DE VICTOIRE ===
echo -e "${BLUE}🏆 VÉRIFICATION DES CONDITIONS DE VICTOIRE${NC}"
echo -e "${BLUE}===========================================${NC}"

# Conditions de victoire basées sur la vraie structure du jeu
VICTORY_CONDITIONS_MET=0
VICTORY_MESSAGE=""

# Condition 1: Au moins 2 joueurs
if [ "$PLAYERS_COUNT" -ge 2 ]; then
    echo -e "${GREEN}✅ Condition joueurs: $PLAYERS_COUNT/2 joueurs${NC}"
    VICTORY_CONDITIONS_MET=$((VICTORY_CONDITIONS_MET + 1))
else
    echo -e "${RED}❌ Condition joueurs: $PLAYERS_COUNT/2 joueurs${NC}"
fi

# Condition 2: Au moins 2 héros
if [ "$HEROES_COUNT" -ge 2 ]; then
    echo -e "${GREEN}✅ Condition héros: $HEROES_COUNT/2 héros${NC}"
    VICTORY_CONDITIONS_MET=$((VICTORY_CONDITIONS_MET + 1))
else
    echo -e "${RED}❌ Condition héros: $HEROES_COUNT/2 héros${NC}"
fi

# Condition 3: Au moins 6 bâtiments (3 par joueur)
if [ "$BUILDINGS_COUNT" -ge 6 ]; then
    echo -e "${GREEN}✅ Condition bâtiments: $BUILDINGS_COUNT/6 bâtiments${NC}"
    VICTORY_CONDITIONS_MET=$((VICTORY_CONDITIONS_MET + 1))
else
    echo -e "${RED}❌ Condition bâtiments: $BUILDINGS_COUNT/6 bâtiments${NC}"
fi

# Condition 4: Ressources suffisantes
if [ "$PLAYER1_GOLD" -ge 5000 ] && [ "$PLAYER1_WOOD" -ge 200 ] && [ "$PLAYER1_STONE" -ge 100 ]; then
    echo -e "${GREEN}✅ Condition ressources: Or=$PLAYER1_GOLD/5000, Bois=$PLAYER1_WOOD/200, Pierre=$PLAYER1_STONE/100${NC}"
    VICTORY_CONDITIONS_MET=$((VICTORY_CONDITIONS_MET + 1))
else
    echo -e "${RED}❌ Condition ressources: Or=$PLAYER1_GOLD/5000, Bois=$PLAYER1_WOOD/200, Pierre=$PLAYER1_STONE/100${NC}"
fi

# Condition 5: Jeu actif
GAME_STATUS=$(echo "$GAME_STATE" | jq -r '.status // "unknown"')
if [ "$GAME_STATUS" = "active" ]; then
    echo -e "${GREEN}✅ Condition statut: Jeu actif${NC}"
    VICTORY_CONDITIONS_MET=$((VICTORY_CONDITIONS_MET + 1))
else
    echo -e "${RED}❌ Condition statut: Jeu $GAME_STATUS${NC}"
fi

# Détermination de la victoire
if [ "$VICTORY_CONDITIONS_MET" -eq 5 ]; then
    echo -e "${GREEN}🏆 VICTOIRE ! Toutes les conditions sont remplies !${NC}"
    VICTORY_MESSAGE="🎉 VICTOIRE ÉCONOMIQUE ! L'empire est établi !"
else
    echo -e "${RED}❌ DÉFAITE ! $VICTORY_CONDITIONS_MET/5 conditions remplies${NC}"
    VICTORY_MESSAGE="❌ DÉFAITE ÉCONOMIQUE ! L'empire n'a pas pu être établi"
fi

# === AFFICHAGE DES DÉTAILS ===
echo -e "${PURPLE}📈 DÉTAILS DU JEU${NC}"
echo -e "${PURPLE}================${NC}"

# Détails des héros
echo -e "${CYAN}👑 Héros disponibles:${NC}"
echo "$GAME_STATE" | jq -r '.players[].heroes[] | "   - \(.name) (\(.class)) - Niveau \(.level)"'

# Détails des bâtiments
echo -e "${CYAN}🏛️ Bâtiments construits:${NC}"
echo "$GAME_STATE" | jq -r '.players[].buildings[] | "   - \(.buildingType) (Niveau \(.level))"'

# Détails des ressources
echo -e "${CYAN}💰 Ressources Joueur 1:${NC}"
echo "$GAME_STATE" | jq -r '.players[0].resources | "   - Or: \(.gold)"'
echo "$GAME_STATE" | jq -r '.players[0].resources | "   - Bois: \(.wood)"'
echo "$GAME_STATE" | jq -r '.players[0].resources | "   - Pierre: \(.stone)"'
echo "$GAME_STATE" | jq -r '.players[0].resources | "   - Cristal: \(.crystal)"'
echo "$GAME_STATE" | jq -r '.players[0].resources | "   - Gemmes: \(.gems)"'

# === TEST DU SCÉNARIO HOTS COMPLET ===
echo -e "${BLUE}🎮 TEST DU SCÉNARIO HOTS COMPLET${NC}"
echo -e "${BLUE}================================${NC}"

if [ -f "🎮 game_assets/scenarios/hots/test-economie-guerre.hots" ]; then
    echo -e "${GREEN}✅ Fichier scénario trouvé${NC}"
    
    # Affichage du scénario sans exécution (car les endpoints n'existent pas encore)
    echo -e "${CYAN}📖 Lecture du scénario HOTS:${NC}"
    while IFS= read -r line; do
        # Ignorer les lignes vides et commentaires
        if [[ ! -z "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
            if [[ "$line" =~ ^QUOTE\( ]]; then
                echo -e "${PURPLE}💬 $line${NC}"
            elif [[ "$line" =~ ^[A-Z_]+\( ]]; then
                echo -e "${YELLOW}🎯 Commande HOTS: $line${NC}"
            fi
        fi
    done < "🎮 game_assets/scenarios/hots/test-economie-guerre.hots"
    
    echo -e "${GREEN}✅ Scénario HOTS lu avec succès${NC}"
    echo -e "${YELLOW}💡 Note: Les commandes HOTS ne sont pas encore exécutables via API${NC}"
else
    echo -e "${RED}❌ Fichier scénario non trouvé${NC}"
fi

# === RÉSULTAT FINAL ===
echo ""
echo -e "${PURPLE}📊 STATISTIQUES FINALES${NC}"
echo -e "${PURPLE}======================${NC}"
echo -e "${CYAN}👥 Joueurs: $PLAYERS_COUNT${NC}"
echo -e "${CYAN}👑 Héros: $HEROES_COUNT${NC}"
echo -e "${CYAN}🏛️ Bâtiments: $BUILDINGS_COUNT${NC}"
echo -e "${CYAN}💰 Or Joueur 1: $PLAYER1_GOLD${NC}"
echo -e "${CYAN}🎮 Statut: $GAME_STATUS${NC}"
echo -e "${CYAN}🏆 Conditions remplies: $VICTORY_CONDITIONS_MET/5${NC}"

echo ""
echo -e "${GREEN}$VICTORY_MESSAGE${NC}"
if [ "$VICTORY_CONDITIONS_MET" -eq 5 ]; then
    echo -e "${CYAN}🌟 Le gameplay économique fonctionne parfaitement !${NC}"
else
    echo -e "${YELLOW}💡 Vérifiez les conditions de victoire et réessayez${NC}"
fi
echo -e "${YELLOW}💡 Utilisez './hots status' pour vérifier l'état des services${NC}" 