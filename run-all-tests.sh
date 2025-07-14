#!/bin/bash
set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
BACKEND_PID=""
FRONTEND_PID=""
BACKEND_LOG="backend.log"
FRONTEND_LOG="frontend.log"

# Fonction pour nettoyer les processus
cleanup() {
    echo -e "${YELLOW}🧹 Nettoyage des processus...${NC}"
    
    if [ ! -z "$BACKEND_PID" ]; then
        echo "Arrêt du backend (PID: $BACKEND_PID)"
        kill $BACKEND_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        echo "Arrêt du frontend (PID: $FRONTEND_PID)"
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    
    # Tuer tous les processus Java et Node qui pourraient trainer
    pkill -f "spring-boot:run" 2>/dev/null || true
    pkill -f "npm start" 2>/dev/null || true
    pkill -f "node.*react-scripts" 2>/dev/null || true
    
    # Nettoyer les logs
    rm -f $BACKEND_LOG $FRONTEND_LOG
    
    echo -e "${GREEN}✅ Nettoyage terminé${NC}"
}

# Piège pour nettoyer lors de l'arrêt du script
trap cleanup EXIT

# Fonction pour attendre qu'un service soit prêt
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=60
    local attempt=0
    
    echo -e "${BLUE}⏳ Attente du démarrage de $service_name...${NC}"
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -s $url > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $service_name est prêt!${NC}"
            return 0
        fi
        
        sleep 2
        attempt=$((attempt + 1))
        echo -n "."
    done
    
    echo -e "${RED}❌ $service_name n'a pas démarré dans les temps${NC}"
    return 1
}

# Fonction pour démarrer le backend
start_backend() {
    echo -e "${BLUE}🚀 Démarrage du backend...${NC}"
    
    cd backend
    
    # Vérifier si le port 8080 est libre
    if lsof -i:8080 > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️ Port 8080 occupé, tentative d'arrêt du processus...${NC}"
        lsof -ti:8080 | xargs kill -9 2>/dev/null || true
        sleep 2
    fi
    
    # Démarrer le backend en arrière-plan
    nohup mvn spring-boot:run > ../$BACKEND_LOG 2>&1 &
    BACKEND_PID=$!
    
    cd ..
    
    # Attendre que le backend soit prêt
    wait_for_service "http://localhost:8080/actuator/health" "Backend"
}

# Fonction pour démarrer le frontend
start_frontend() {
    echo -e "${BLUE}🚀 Démarrage du frontend...${NC}"
    
    cd frontend
    
    # Vérifier si le port 3000 est libre
    if lsof -i:3000 > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️ Port 3000 occupé, tentative d'arrêt du processus...${NC}"
        lsof -ti:3000 | xargs kill -9 2>/dev/null || true
        sleep 2
    fi
    
    # Démarrer le frontend en arrière-plan
    nohup npm start > ../$FRONTEND_LOG 2>&1 &
    FRONTEND_PID=$!
    
    cd ..
    
    # Attendre que le frontend soit prêt
    wait_for_service "http://localhost:3000" "Frontend"
}

# Fonction pour lancer les tests backend
run_backend_tests() {
    echo -e "${BLUE}🧪 Lancement des tests backend...${NC}"
    
    cd backend
    
    # Tests unitaires
    echo -e "${YELLOW}📋 Tests unitaires backend...${NC}"
    mvn test
    
    # Tests d'intégration
    echo -e "${YELLOW}📋 Tests d'intégration backend...${NC}"
    mvn verify
    
    cd ..
    
    echo -e "${GREEN}✅ Tests backend terminés${NC}"
}

# Fonction pour lancer les tests frontend
run_frontend_tests() {
    echo -e "${BLUE}🧪 Lancement des tests frontend...${NC}"
    
    cd frontend
    
    # Tests unitaires Jest
    echo -e "${YELLOW}📋 Tests unitaires frontend (Jest)...${NC}"
    npm test -- --watchAll=false --coverage
    
    cd ..
    
    echo -e "${GREEN}✅ Tests frontend terminés${NC}"
}

# Fonction pour lancer les tests Cypress
run_cypress_tests() {
    echo -e "${BLUE}🧪 Lancement des tests Cypress...${NC}"
    
    cd frontend
    
    # Tests E2E Cypress
    echo -e "${YELLOW}📋 Tests E2E Cypress...${NC}"
    
    # Lancer les tests Cypress spécifiques
    npx cypress run --spec "cypress/e2e/01-scenario-basic-test.cy.js"
    npx cypress run --spec "cypress/e2e/01-solo-gameplay.cy.js"
    npx cypress run --spec "cypress/e2e/02-multiplayer-dual-session.cy.js"
    
    cd ..
    
    echo -e "${GREEN}✅ Tests Cypress terminés${NC}"
}

# Fonction pour tester les APIs
test_apis() {
    echo -e "${BLUE}🧪 Test des APIs...${NC}"
    
    # Test des endpoints de scénarios
    echo -e "${YELLOW}📋 Test des endpoints de scénarios...${NC}"
    
    # Test conquest-classic
    if curl -s "http://localhost:8080/api/scenarios/predefined/conquest-classic" > /dev/null; then
        echo -e "${GREEN}✅ API conquest-classic: OK${NC}"
    else
        echo -e "${RED}❌ API conquest-classic: FAILED${NC}"
    fi
    
    # Test temporal-rift
    if curl -s "http://localhost:8080/api/scenarios/predefined/temporal-rift" > /dev/null; then
        echo -e "${GREEN}✅ API temporal-rift: OK${NC}"
    else
        echo -e "${RED}❌ API temporal-rift: FAILED${NC}"
    fi
    
    echo -e "${GREEN}✅ Tests APIs terminés${NC}"
}

# Fonction principale
main() {
    echo -e "${BLUE}🎯 === SCRIPT DE TESTS COMPLET HEROES OF TIME ===${NC}"
    echo -e "${BLUE}🎯 Lancement de tous les tests...${NC}"
    
    # Vérifier les prérequis
    if ! command -v mvn &> /dev/null; then
        echo -e "${RED}❌ Maven n'est pas installé${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm n'est pas installé${NC}"
        exit 1
    fi
    
    # Installer les dépendances si nécessaire
    echo -e "${YELLOW}📦 Vérification des dépendances...${NC}"
    
    if [ -d "frontend" ] && [ ! -d "frontend/node_modules" ]; then
        echo -e "${YELLOW}📦 Installation des dépendances frontend...${NC}"
        cd frontend && npm install && cd ..
    fi
    
    # Démarrer les services
    start_backend
    start_frontend
    
    # Attendre un peu pour la stabilisation
    sleep 5
    
    # Lancer les tests
    echo -e "${BLUE}🎯 === DÉBUT DES TESTS ===${NC}"
    
    # 1. Tests des APIs
    test_apis
    
    # 2. Tests backend
    run_backend_tests
    
    # 3. Tests frontend
    run_frontend_tests
    
    # 4. Tests Cypress
    run_cypress_tests
    
    # Résumé
    echo -e "${GREEN}🎉 === TOUS LES TESTS TERMINÉS ===${NC}"
    echo -e "${GREEN}✅ Backend: Tests unitaires et d'intégration${NC}"
    echo -e "${GREEN}✅ Frontend: Tests Jest${NC}"
    echo -e "${GREEN}✅ E2E: Tests Cypress${NC}"
    echo -e "${GREEN}✅ APIs: Tests des endpoints${NC}"
    
    # Afficher les logs en cas d'erreur
    if [ -f "$BACKEND_LOG" ]; then
        echo -e "${YELLOW}📋 Logs backend disponibles dans: $BACKEND_LOG${NC}"
    fi
    
    if [ -f "$FRONTEND_LOG" ]; then
        echo -e "${YELLOW}📋 Logs frontend disponibles dans: $FRONTEND_LOG${NC}"
    fi
}

# Exécuter le script principal
main 