#!/bin/bash

# 🎳 WALTER: VÉRIFICATION BACKEND - UNE FOIS SEULEMENT
# Pas de boucle infinie, juste un check propre

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎳 WALTER: VÉRIFICATION BACKEND PROPRE${NC}"
echo "========================================="
echo ""

# Test backend Spring Boot
echo -e "${CYAN}🔍 Test Backend Spring Boot (port 8080)...${NC}"
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8080/api/status" 2>/dev/null)

if [ "$BACKEND_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Backend Spring Boot: ACTIF${NC}"
    echo "   Status: $BACKEND_STATUS"
else
    echo -e "${RED}❌ Backend Spring Boot: INACTIF${NC}"
    echo "   Status: $BACKEND_STATUS"
    echo -e "${YELLOW}💡 Pour démarrer: cd backend && mvn spring-boot:run${NC}"
fi

echo ""

# Test serveur frontend
echo -e "${CYAN}🔍 Test Serveur Frontend (port 8001)...${NC}"
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8001" 2>/dev/null)

if [ "$FRONTEND_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Serveur Frontend: ACTIF${NC}"
    echo "   Status: $FRONTEND_STATUS"
else
    echo -e "${RED}❌ Serveur Frontend: INACTIF${NC}"
    echo "   Status: $FRONTEND_STATUS"
    echo -e "${YELLOW}💡 Pour démarrer: python3 -m http.server 8001 --directory frontend${NC}"
fi

echo ""

# Résumé Walter
echo -e "${BLUE}🎳 WALTER RÉSUMÉ:${NC}"
if [ "$BACKEND_STATUS" = "200" ] && [ "$FRONTEND_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ TOUT EST OPÉRATIONNEL !${NC}"
    echo -e "${PURPLE}🔫 VINCE: \"Ready to rock, Walter !\"${NC}"
else
    echo -e "${YELLOW}⚠️  QUELQUES SERVICES À DÉMARRER${NC}"
    echo -e "${BLUE}🎳 WALTER: \"On va réparer ça, pas de panique !\"${NC}"
fi

echo "" 