#!/bin/bash

# 🎬 LANCEMENT AUTO FILM - PREND URL EN PARAMÈTRE
# Usage: ./launch-film-auto.sh [URL]

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🎬 LANCEMENT AUTO FILM VINCE${NC}"
echo "=================================="
echo ""

# URL par défaut si pas de paramètre
DEFAULT_URL="http://localhost:8001/vince-vega-map-demo-backend.html"
FILM_URL=${1:-$DEFAULT_URL}

echo -e "${CYAN}🎯 URL du film: ${FILM_URL}${NC}"
echo ""

# Vérification que le serveur tourne
echo -e "${BLUE}🔍 Vérification serveur...${NC}"
if curl -s -o /dev/null -w "%{http_code}" "$FILM_URL" | grep -q "200"; then
    echo -e "${GREEN}✅ Serveur actif${NC}"
else
    echo -e "${RED}❌ Serveur non actif - Démarrage...${NC}"
    # Démarrer le serveur si pas actif
    python3 -m http.server 8001 --directory frontend &
    sleep 3
fi

# Lancement du film
echo -e "${YELLOW}🚀 Lancement du film dans le navigateur...${NC}"
open "$FILM_URL"

echo ""
echo -e "${GREEN}✅ Film lancé !${NC}"
echo -e "${CYAN}🎮 Prêt pour les wormholes interactifs !${NC}"
echo ""
echo -e "${PURPLE}🔫 VINCE: \"Let's go, motherfucker !\"${NC}" 