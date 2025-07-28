#!/bin/bash
set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎯 === TESTS RAPIDES HEROES OF TIME ===${NC}"

# Test 1: Backend (tests unitaires seulement)
echo -e "${BLUE}🧪 Tests backend...${NC}"
cd backend
mvn test -q
cd ..
echo -e "${GREEN}✅ Tests backend OK${NC}"

# Test 2: Frontend (tests Jest)
echo -e "${BLUE}🧪 Tests frontend...${NC}"
cd frontend
npm test -- --watchAll=false --silent
cd ..
echo -e "${GREEN}✅ Tests frontend OK${NC}"

# Test 3: Un seul test Cypress pour vérifier que ça marche
echo -e "${BLUE}🧪 Test Cypress (basique)...${NC}"
cd frontend
npx cypress run --spec "cypress/e2e/01-scenario-basic-test.cy.js" --headless
cd ..
echo -e "${GREEN}✅ Test Cypress OK${NC}"

echo -e "${GREEN}🎉 === TESTS RAPIDES TERMINÉS ===${NC}"
echo -e "${YELLOW}💡 Pour les tests complets, utilisez: ./run-all-tests.sh${NC}" 