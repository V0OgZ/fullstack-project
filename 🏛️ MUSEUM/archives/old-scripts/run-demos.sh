#!/bin/bash

# 🎬 HEROES OF TIME - Démos Visuelles
# Script pour lancer les démos avec interface graphique et son

echo "🎬 Heroes of Time - Démos Visuelles"
echo "====================================="

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Vérifier que les serveurs sont en cours d'exécution
echo -e "${BLUE}🔍 Vérification des serveurs...${NC}"

# Vérifier le backend
if curl -s http://localhost:8080/actuator/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend en cours d'exécution (port 8080)${NC}"
else
    echo -e "${RED}❌ Backend non trouvé sur le port 8080${NC}"
    echo -e "${YELLOW}💡 Lancez d'abord: ./start-app.sh${NC}"
    exit 1
fi

# Vérifier le frontend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend en cours d'exécution (port 3000)${NC}"
else
    echo -e "${RED}❌ Frontend non trouvé sur le port 3000${NC}"
    echo -e "${YELLOW}💡 Lancez d'abord: ./start-app.sh${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🎯 Sélectionnez la démo à lancer:${NC}"
echo ""
echo -e "${YELLOW}1) 🎮 Démo Single Player (Plein écran)${NC}"
echo -e "${YELLOW}2) 👥 Démo Multiplayer${NC}"
echo -e "${YELLOW}3) 🌍 Démo Terrain & Terrain Vision${NC}"
echo -e "${YELLOW}4) 🚀 Toutes les démos${NC}"
echo ""

read -p "Votre choix (1-4): " choice

case $choice in
    1)
        echo -e "${BLUE}🎮 Lancement de la démo Single Player...${NC}"
        echo -e "${YELLOW}ℹ️  Mode: Plein écran avec interface${NC}"
        echo -e "${YELLOW}ℹ️  Son: Activé${NC}"
        echo -e "${YELLOW}ℹ️  Vitesse: Lente pour visualisation${NC}"
        echo ""
        cd frontend
        npx playwright test --project=solo-fullscreen-demo
        ;;
    2)
        echo -e "${BLUE}👥 Lancement de la démo Multiplayer...${NC}"
        echo -e "${YELLOW}ℹ️  Mode: Fenêtre avec interface${NC}"
        echo -e "${YELLOW}ℹ️  Son: Activé${NC}"
        echo -e "${YELLOW}ℹ️  Vitesse: Modérée${NC}"
        echo ""
        cd frontend
        npx playwright test --project=multiplayer-demo
        ;;
    3)
        echo -e "${BLUE}🌍 Lancement de la démo Terrain...${NC}"
        echo -e "${YELLOW}ℹ️  Mode: Plein écran avec interface${NC}"
        echo -e "${YELLOW}ℹ️  Son: Activé${NC}"
        echo -e "${YELLOW}ℹ️  Vitesse: Modérée${NC}"
        echo ""
        cd frontend
        npx playwright test --project=terrain-demo
        ;;
    4)
        echo -e "${BLUE}🚀 Lancement de toutes les démos...${NC}"
        echo -e "${YELLOW}ℹ️  Mode: Interfaces multiples${NC}"
        echo -e "${YELLOW}ℹ️  Son: Activé${NC}"
        echo -e "${YELLOW}ℹ️  Vitesse: Variable${NC}"
        echo ""
        cd frontend
        npx playwright test --project=solo-fullscreen-demo --project=multiplayer-demo --project=terrain-demo
        ;;
    *)
        echo -e "${RED}❌ Choix invalide${NC}"
        exit 1
        ;;
esac

# Sauvegarder le code de sortie
demo_result=$?

cd ..

# Rapport final
echo ""
echo -e "${BLUE}📊 Résultats des Démos${NC}"
echo "======================="

if [ $demo_result -eq 0 ]; then
    echo -e "${GREEN}✅ Toutes les démos se sont terminées avec succès !${NC}"
else
    echo -e "${RED}❌ Certaines démos ont rencontré des problèmes${NC}"
fi

echo ""
echo -e "${BLUE}📁 Captures d'écran et vidéos sauvegardées dans:${NC} 🌐 frontend/test-results/"
echo -e "${BLUE}📄 Rapports détaillés dans:${NC} 🌐 frontend/test-results/"

echo ""
echo -e "${BLUE}💡 Pour lancer les tests automatisés:${NC}"
echo -e "${YELLOW}   ./run-tests.sh${NC}"

exit $demo_result 