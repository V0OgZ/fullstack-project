#!/bin/bash

# Script pour synchroniser les scénarios HOTS entre game_assets et frontend
# Créé par OPUS pour Jean

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🔄 SYNCHRONISATION DES SCÉNARIOS HOTS${NC}"
echo "========================================"
echo ""

# Répertoires à comparer
GAME_ASSETS_DIR="game_assets/scenarios/hots"
FRONTEND_DIR="frontend/public/game_assets/scenarios/hots"

# Créer des listes temporaires
TMP_GA="/tmp/game_assets_hots.txt"
TMP_FE="/tmp/frontend_hots.txt"

# Lister les fichiers (noms seulement)
ls -1 "$GAME_ASSETS_DIR"/*.hots 2>/dev/null | xargs -n1 basename | sort > "$TMP_GA"
ls -1 "$FRONTEND_DIR"/*.hots 2>/dev/null | xargs -n1 basename | sort > "$TMP_FE"

echo -e "${BLUE}📊 Statistiques:${NC}"
echo -e "  Game Assets: $(wc -l < "$TMP_GA") fichiers"
echo -e "  Frontend: $(wc -l < "$TMP_FE") fichiers"
echo ""

# Trouver les différences
echo -e "${YELLOW}🔍 Analyse des divergences...${NC}"
echo ""

# Fichiers uniquement dans game_assets
echo -e "${RED}❌ Uniquement dans game_assets (manquants dans frontend):${NC}"
comm -23 "$TMP_GA" "$TMP_FE" | while read file; do
    echo "  - $file"
done
echo ""

# Fichiers uniquement dans frontend
echo -e "${GREEN}✅ Uniquement dans frontend (manquants dans game_assets):${NC}"
comm -13 "$TMP_GA" "$TMP_FE" | while read file; do
    echo "  - $file"
done
echo ""

# Demander confirmation pour copier
echo -e "${CYAN}💡 Voulez-vous synchroniser les fichiers ? (y/n)${NC}"
read -r response

if [[ "$response" == "y" || "$response" == "Y" ]]; then
    echo ""
    echo -e "${YELLOW}📋 Copie des fichiers manquants...${NC}"
    
    # Copier de game_assets vers frontend
    echo -e "${BLUE}➡️  game_assets → frontend:${NC}"
    comm -23 "$TMP_GA" "$TMP_FE" | while read file; do
        if cp "$GAME_ASSETS_DIR/$file" "$FRONTEND_DIR/$file"; then
            echo -e "  ${GREEN}✅${NC} $file"
        else
            echo -e "  ${RED}❌${NC} $file (erreur)"
        fi
    done
    
    echo ""
    
    # Copier de frontend vers game_assets
    echo -e "${BLUE}⬅️  frontend → game_assets:${NC}"
    comm -13 "$TMP_GA" "$TMP_FE" | while read file; do
        if cp "$FRONTEND_DIR/$file" "$GAME_ASSETS_DIR/$file"; then
            echo -e "  ${GREEN}✅${NC} $file"
        else
            echo -e "  ${RED}❌${NC} $file (erreur)"
        fi
    done
    
    echo ""
    echo -e "${GREEN}✨ Synchronisation terminée !${NC}"
    
    # Afficher le nouveau statut
    echo ""
    echo -e "${CYAN}📊 Nouveau statut:${NC}"
    ls -1 "$GAME_ASSETS_DIR"/*.hots 2>/dev/null | wc -l | xargs -I {} echo -e "  Game Assets: {} fichiers"
    ls -1 "$FRONTEND_DIR"/*.hots 2>/dev/null | wc -l | xargs -I {} echo -e "  Frontend: {} fichiers"
else
    echo -e "${YELLOW}⚠️  Synchronisation annulée${NC}"
fi

# Nettoyer
rm -f "$TMP_GA" "$TMP_FE"

echo ""
echo -e "${CYAN}💡 Conseil: Utilisez './hots translate' pour traduire ces scénarios !${NC}"