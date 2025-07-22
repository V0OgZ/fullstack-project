#!/bin/bash

# 📋 Liste des Scripts - Heroes of Time
# Affiche tous les scripts disponibles avec leurs descriptions

echo "🧪 SCRIPTS DE TEST HEROES OF TIME"
echo "=================================="

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${YELLOW}🎯 SCRIPT PRINCIPAL${NC}"
echo "======================"
echo -e "${GREEN}./test-everything.sh${NC}          - ${CYAN}Script master qui lance TOUS les tests${NC}"
echo "                                  - Compile le backend"
echo "                                  - Lance tests unitaires/intégration"
echo "                                  - Démarre tous les services"
echo "                                  - Teste API et 7 scénarios"
echo "                                  - Génère rapport complet"

echo ""
echo -e "${YELLOW}🔧 SCRIPTS BACKEND${NC}"
echo "=================="
echo -e "${GREEN}./test-heroes-of-time-complet.sh${NC}  - ${CYAN}Tests complets backend${NC}"
echo -e "${GREEN}./test-game-scripts.sh${NC}            - ${CYAN}Tests des scripts de jeu${NC}"
echo -e "${GREEN}./test-services.sh${NC}               - ${CYAN}Tests des services${NC}"

echo ""
echo -e "${YELLOW}⚡ SCRIPTS TEMPORELS & QUANTIQUES${NC}"
echo "================================="
echo -e "${GREEN}./test-temporal-engine.sh${NC}         - ${CYAN}Tests du moteur temporel${NC}"
echo -e "${GREEN}./test-temporal-collapse.sh${NC}       - ${CYAN}Tests de collapse quantique${NC}"
echo -e "${GREEN}./test-complete-bataille-temporelle.sh${NC} - ${CYAN}Tests bataille temporelle${NC}"
echo -e "${GREEN}./test-quick-temporal.sh${NC}          - ${CYAN}Tests rapides temporels${NC}"

echo ""
echo -e "${YELLOW}📋 SCRIPTS SCÉNARIOS${NC}"
echo "===================="
echo -e "${GREEN}./test-scenarios.sh${NC}              - ${CYAN}Tests des 7 scénarios complets${NC}"
echo -e "${GREEN}./test-complete-comparison.sh${NC}     - ${CYAN}Tests de comparaison${NC}"
echo -e "${GREEN}./test-complete-comparison-fixed.sh${NC} - ${CYAN}Tests de comparaison (fixé)${NC}"

echo ""
echo -e "${YELLOW}🎨 SCRIPTS INTERFACE${NC}"
echo "===================="
echo -e "${GREEN}./test-ui-fix.sh${NC}                 - ${CYAN}Tests UI${NC}"
echo -e "${GREEN}./test-manual.sh${NC}                 - ${CYAN}Tests manuels${NC}"
echo -e "${GREEN}./test-simple.sh${NC}                 - ${CYAN}Tests simples${NC}"

echo ""
echo -e "${YELLOW}📊 SCRIPTS UTILITAIRES${NC}"
echo "======================="
echo -e "${GREEN}./list-scripts.sh${NC}                - ${CYAN}Affiche cette liste${NC}"

echo ""
echo -e "${BLUE}🚀 UTILISATION${NC}"
echo "=============="
echo "Depuis la racine du projet :"
echo "  ./run-tests.sh                    # Lance le script principal"
echo ""
echo "Depuis le dossier scripts/ :"
echo "  cd scripts/"
echo "  ./test-everything.sh              # Script principal"
echo "  ./test-scenarios.sh               # Tests des scénarios"
echo "  ./test-temporal-engine.sh         # Tests temporels"
echo ""
echo -e "${BLUE}📋 LOGS GÉNÉRÉS${NC}"
echo "==============="
echo "  backend-compile.log               # Compilation backend"
echo "  backend-tests.log                 # Tests unitaires"
echo "  backend-integration.log           # Tests d'intégration"
echo "  backend-runtime.log               # Runtime backend"
echo "  visualizer-runtime.log            # Runtime visualizer"
echo "  scenarios-test.log                # Tests de scénarios"
echo "  frontend-test.log                 # Tests frontend"
echo "  playwright-test.log               # Tests Playwright"

echo ""
echo -e "${GREEN}🎯 Système Heroes of Time - $(ls -1 *.sh | wc -l) scripts disponibles${NC}" 