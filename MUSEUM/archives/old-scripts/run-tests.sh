#!/bin/bash

# 🧪 HEROES OF TIME - Tests Automatisés
# Script pour lancer les tests en mode headless (sans interface)

echo "🧪 Heroes of Time - Tests Automatisés"
echo "======================================"

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
echo -e "${BLUE}🚀 Lancement des tests automatisés...${NC}"
echo -e "${YELLOW}ℹ️  Mode: Headless (sans interface)${NC}"
echo -e "${YELLOW}ℹ️  Rapidité: Optimisée${NC}"
echo -e "${YELLOW}ℹ️  Son: Désactivé${NC}"
echo ""

# Créer le répertoire de résultats
mkdir -p test-results

# Lancer les tests Playwright en mode headless
cd frontend
npx playwright test --project=automated-tests

# Sauvegarder le code de sortie
test_result=$?

cd ..

# Rapport final
echo ""
echo -e "${BLUE}📊 Résultats des Tests${NC}"
echo "======================="

if [ $test_result -eq 0 ]; then
    echo -e "${GREEN}✅ Tous les tests sont passés !${NC}"
else
    echo -e "${RED}❌ Certains tests ont échoué${NC}"
fi

echo ""
echo -e "${BLUE}📁 Captures d'écran sauvegardées dans:${NC} test-results/"
echo -e "${BLUE}📄 Rapports détaillés dans:${NC} frontend/test-results/"

echo ""
echo -e "${BLUE}💡 Pour lancer les démos visuelles:${NC}"
echo -e "${YELLOW}   ./run-demos.sh${NC}"

exit $test_result 