#!/bin/bash

# 🧪 Heroes of Time - Master Test Script
# Script qui lance TOUS les tests et services du projet

echo "🚀 HEROES OF TIME - MASTER TEST SCRIPT"
echo "======================================"

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 🧹 PHASE 1: NETTOYAGE
echo -e "${YELLOW}🧹 Phase 1: Nettoyage des processus...${NC}"
echo "Arrêt des services en cours..."

# Tuer tous les processus sur les ports utilisés
lsof -ti:8080 | xargs -r kill -9  # Backend
lsof -ti:8001 | xargs -r kill -9  # Quantum visualizer
lsof -ti:5173 | xargs -r kill -9  # Frontend temporal
lsof -ti:3000 | xargs -r kill -9  # Frontend principal
lsof -ti:8000 | xargs -r kill -9  # Serveur de test

echo "Nettoyage des logs précédents..."
rm -f *.log
rm -f backend/*.log
rm -f frontend/*.log
rm -f quantum-visualizer/*.log

echo -e "${GREEN}✅ Nettoyage terminé${NC}"

# 🔧 PHASE 2: VÉRIFICATION DE L'ENVIRONNEMENT
echo -e "${YELLOW}🔧 Phase 2: Vérification de l'environnement...${NC}"

# Vérifier Java
if command -v java &> /dev/null; then
    echo -e "${GREEN}✅ Java trouvé: $(java -version 2>&1 | head -n1)${NC}"
else
    echo -e "${RED}❌ Java non trouvé!${NC}"
    exit 1
fi

# Vérifier Maven
if command -v mvn &> /dev/null; then
    echo -e "${GREEN}✅ Maven trouvé: $(mvn -version | head -n1)${NC}"
else
    echo -e "${RED}❌ Maven non trouvé!${NC}"
    exit 1
fi

# Vérifier Python
if command -v python3 &> /dev/null; then
    echo -e "${GREEN}✅ Python trouvé: $(python3 --version)${NC}"
else
    echo -e "${RED}❌ Python non trouvé!${NC}"
    exit 1
fi

# Vérifier Node.js
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js trouvé: $(node --version)${NC}"
else
    echo -e "${YELLOW}⚠️ Node.js non trouvé (optionnel)${NC}"
fi

# 🧪 PHASE 3: TESTS BACKEND
echo -e "${YELLOW}🧪 Phase 3: Tests backend...${NC}"

cd backend || exit 1

echo "Compilation du backend..."
if mvn clean compile > ../backend-compile.log 2>&1; then
    echo -e "${GREEN}✅ Compilation réussie${NC}"
else
    echo -e "${RED}❌ Erreur de compilation, voir backend-compile.log${NC}"
    exit 1
fi

echo "Lancement des tests unitaires..."
if mvn test -Dtest=*Test -Dheroes.parser.use.antlr=false > ../backend-tests.log 2>&1; then
    echo -e "${GREEN}✅ Tests unitaires réussis${NC}"
else
    echo -e "${RED}❌ Erreur tests unitaires, voir backend-tests.log${NC}"
    # Continuer même si les tests échouent
fi

echo "Lancement des tests d'intégration..."
if mvn test -Dtest=*IntegrationTest -Dheroes.parser.use.antlr=false > ../backend-integration.log 2>&1; then
    echo -e "${GREEN}✅ Tests d'intégration réussis${NC}"
else
    echo -e "${RED}❌ Erreur tests d'intégration, voir backend-integration.log${NC}"
fi

cd ..

# 🚀 PHASE 4: DÉMARRAGE DES SERVICES
echo -e "${YELLOW}🚀 Phase 4: Démarrage des services...${NC}"

# Démarrer le backend avec REGEX parser (pas ANTLR)
echo "Démarrage du backend (REGEX parser)..."
cd backend
mvn spring-boot:run -Dspring-boot.run.arguments="--heroes.parser.use.antlr=false" > ../backend-runtime.log 2>&1 &
BACKEND_PID=$!
cd ..

# Attendre que le backend soit prêt
echo "Attente du backend..."
for i in {1..30}; do
    if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend prêt (PID: $BACKEND_PID)${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Backend non accessible après 30s${NC}"
        exit 1
    fi
    sleep 1
done

# Démarrer le quantum visualizer
echo "Démarrage du quantum visualizer..."
cd quantum-visualizer
python3 -m http.server 8001 > ../visualizer-runtime.log 2>&1 &
VISUALIZER_PID=$!
cd ..

# Attendre que le visualizer soit prêt
echo "Attente du visualizer..."
for i in {1..10}; do
    if curl -s http://localhost:8001 > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Visualizer prêt (PID: $VISUALIZER_PID)${NC}"
        break
    fi
    if [ $i -eq 10 ]; then
        echo -e "${RED}❌ Visualizer non accessible après 10s${NC}"
        exit 1
    fi
    sleep 1
done

# Démarrer le frontend temporal (optionnel)
if [ -d "frontend-temporal" ]; then
    echo "Démarrage du frontend temporal..."
    cd frontend-temporal
    python3 -m http.server 5173 > ../frontend-temporal.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    echo -e "${GREEN}✅ Frontend temporal prêt (PID: $FRONTEND_PID)${NC}"
fi

# 🧪 PHASE 5: TESTS FONCTIONNELS
echo -e "${YELLOW}🧪 Phase 5: Tests fonctionnels...${NC}"

# Test API de base
echo "Test de l'API de base..."
if curl -s http://localhost:8080/api/health | grep -q "UP"; then
    echo -e "${GREEN}✅ API health check réussi${NC}"
else
    echo -e "${RED}❌ API health check échoué${NC}"
fi

# Test création de jeu
echo "Test création de jeu..."
GAME_RESPONSE=$(curl -s -X POST http://localhost:8080/api/games \
    -H "Content-Type: application/json" \
    -d '{"gameName": "Test Game", "playerId": "test-player"}')
    
if echo "$GAME_RESPONSE" | grep -q "gameId"; then
    echo -e "${GREEN}✅ Création de jeu réussie${NC}"
    GAME_ID=$(echo "$GAME_RESPONSE" | grep -o '"gameId":[0-9]*' | cut -d: -f2)
    echo "Game ID: $GAME_ID"
else
    echo -e "${RED}❌ Création de jeu échouée${NC}"
    echo "Response: $GAME_RESPONSE"
fi

# Test exécution de script
if [ -n "$GAME_ID" ]; then
    echo "Test exécution de script..."
    SCRIPT_RESPONSE=$(curl -s -X POST http://localhost:8080/api/games/$GAME_ID/scripts \
        -H "Content-Type: application/json" \
        -d '{"script": "HERO(TestHero)"}')
        
    if echo "$SCRIPT_RESPONSE" | grep -q "success"; then
        echo -e "${GREEN}✅ Exécution de script réussie${NC}"
    else
        echo -e "${RED}❌ Exécution de script échouée${NC}"
        echo "Response: $SCRIPT_RESPONSE"
    fi
fi

# 🧪 PHASE 6: TESTS SPÉCIFIQUES
echo -e "${YELLOW}🧪 Phase 6: Tests spécifiques...${NC}"

# Test des scénarios récents
if [ -f "test-scenarios.sh" ]; then
    echo "Test des scénarios récents..."
    chmod +x test-scenarios.sh
    ./test-scenarios.sh > scenarios-test.log 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Tests de scénarios réussis${NC}"
    else
        echo -e "${RED}❌ Erreur tests de scénarios, voir scenarios-test.log${NC}"
    fi
fi

# Test des 7 scénarios complets
if [ -d "scenarios" ]; then
    echo "Test des 7 scénarios complets..."
    SCENARIO_COUNT=$(ls -1 scenarios/*.json | wc -l)
    echo "Nombre de scénarios trouvés: $SCENARIO_COUNT"
    
    for scenario_file in scenarios/*.json; do
        scenario_name=$(basename "$scenario_file" .json)
        echo "Validation du scénario: $scenario_name"
        
        # Test de syntaxe JSON
        if python3 -m json.tool "$scenario_file" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ JSON valide: $scenario_name${NC}"
        else
            echo -e "${RED}❌ JSON invalide: $scenario_name${NC}"
        fi
    done
    
    # Test de l'index des scénarios
    if [ -f "scenarios/SCENARIOS_INDEX.json" ]; then
        echo "Test de l'index des scénarios..."
        if python3 -m json.tool scenarios/SCENARIOS_INDEX.json > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Index des scénarios valide${NC}"
        else
            echo -e "${RED}❌ Index des scénarios invalide${NC}"
        fi
    fi
fi

# Test du quantum visualizer avec scénarios
if [ -d "quantum-visualizer" ]; then
    echo "Test du quantum visualizer avec scénarios..."
    cd quantum-visualizer
    
    # Vérifier la présence des fichiers de scénarios
    if [ -f "scenarios/SCENARIOS_INDEX.json" ]; then
        echo -e "${GREEN}✅ Scénarios disponibles pour le visualizer${NC}"
    else
        echo -e "${YELLOW}⚠️ Pas de scénarios dans le visualizer${NC}"
        # Copier les scénarios si ils existent
        if [ -d "../scenarios" ]; then
            cp -r ../scenarios .
            echo -e "${GREEN}✅ Scénarios copiés vers le visualizer${NC}"
        fi
    fi
    
    cd ..
fi

# Test du frontend
if [ -f "frontend/test-frontend.js" ]; then
    echo "Test du frontend..."
    cd frontend
    node test-frontend.js > ../frontend-test.log 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Tests frontend réussis${NC}"
    else
        echo -e "${RED}❌ Erreur tests frontend, voir frontend-test.log${NC}"
    fi
    cd ..
fi

# Test Playwright (si disponible)
if [ -f "frontend/playwright.config.ts" ]; then
    echo "Test Playwright..."
    cd frontend
    if command -v npx &> /dev/null; then
        npx playwright test --headed=false > ../playwright-test.log 2>&1
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Tests Playwright réussis${NC}"
        else
            echo -e "${RED}❌ Erreur tests Playwright, voir playwright-test.log${NC}"
        fi
    fi
    cd ..
fi

# 📊 PHASE 7: RAPPORT FINAL
echo -e "${YELLOW}📊 Phase 7: Rapport final...${NC}"

echo ""
echo "🎉 RÉSUMÉ DES TESTS"
echo "=================="
echo -e "${GREEN}✅ Services démarrés:${NC}"
echo "  - Backend: http://localhost:8080 (PID: $BACKEND_PID)"
echo "  - Quantum Visualizer: http://localhost:8001 (PID: $VISUALIZER_PID)"
if [ -n "$FRONTEND_PID" ]; then
    echo "  - Frontend Temporal: http://localhost:5173 (PID: $FRONTEND_PID)"
fi

echo ""
echo -e "${BLUE}📋 Logs disponibles:${NC}"
echo "  - backend-compile.log - Compilation backend"
echo "  - backend-tests.log - Tests unitaires"
echo "  - backend-integration.log - Tests d'intégration"
echo "  - backend-runtime.log - Runtime backend"
echo "  - visualizer-runtime.log - Runtime visualizer"
echo "  - scenarios-test.log - Tests de scénarios"
echo "  - frontend-test.log - Tests frontend"
echo "  - playwright-test.log - Tests Playwright"

echo ""
echo -e "${YELLOW}🎮 Commandes pour tester:${NC}"
echo "  curl http://localhost:8080/api/health"
echo "  curl -X POST http://localhost:8080/api/games -H 'Content-Type: application/json' -d '{\"gameName\": \"Test\", \"playerId\": \"player1\"}'"
echo "  Ouvrir http://localhost:8001 dans un navigateur"

echo ""
echo -e "${GREEN}🎯 Système Heroes of Time prêt pour les tests!${NC}"
echo ""
echo "Pour arrêter tous les services:"
echo "  lsof -ti:8080,8001,5173,3000,8000 | xargs -r kill -9"
echo ""
echo "ou utiliser:"
echo "  ./stop-all.sh" 