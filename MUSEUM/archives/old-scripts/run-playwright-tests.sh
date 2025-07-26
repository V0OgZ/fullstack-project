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
BACKEND_LOG="logs/backend.log"
FRONTEND_LOG="logs/frontend.log"
TEST_MODE="headless"

# Fonction pour nettoyer les processus
cleanup() {
    echo -e "${YELLOW}🧹 Nettoyage des processus...${NC}"
    
    if [ ! -z "$BACKEND_PID" ]; then
        echo "Arrêt du backend (PID: $BACKEND_PID)"
        kill -TERM $BACKEND_PID 2>/dev/null || kill -9 $BACKEND_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        echo "Arrêt du frontend (PID: $FRONTEND_PID)"
        kill -TERM $FRONTEND_PID 2>/dev/null || kill -9 $FRONTEND_PID 2>/dev/null || true
    fi
    
    # Nettoyer les processus restants
    pkill -f "spring-boot:run" 2>/dev/null || true
    pkill -f "npm start" 2>/dev/null || true
    pkill -f "node.*react-scripts" 2>/dev/null || true
    pkill -f "playwright" 2>/dev/null || true
    
    echo -e "${GREEN}✅ Nettoyage terminé${NC}"
}

# Piège pour nettoyer lors de l'arrêt du script
trap cleanup EXIT

# Fonction pour attendre qu'un service soit prêt
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=45
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
    
    # Vérifier si le port 8080 est libre
    if lsof -i:8080 > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️ Port 8080 occupé, arrêt du processus...${NC}"
        lsof -ti:8080 | xargs kill -TERM 2>/dev/null || lsof -ti:8080 | xargs kill -9 2>/dev/null || true
        sleep 3
    fi
    
    cd backend
    
    # Démarrer le backend en arrière-plan
    mvn spring-boot:run > ../$BACKEND_LOG 2>&1 &
    BACKEND_PID=$!
    
    cd ..
    
    # Attendre que le backend soit prêt
    wait_for_service "http://localhost:8080/actuator/health" "Backend"
}

# Fonction pour démarrer le frontend
start_frontend() {
    echo -e "${BLUE}🚀 Démarrage du frontend...${NC}"
    
    # Vérifier si le port 3000 est libre
    if lsof -i:3000 > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️ Port 3000 occupé, arrêt du processus...${NC}"
        lsof -ti:3000 | xargs kill -TERM 2>/dev/null || lsof -ti:3000 | xargs kill -9 2>/dev/null || true
        sleep 3
    fi
    
    cd frontend
    
    # Démarrer le frontend en arrière-plan
    npm start > ../$FRONTEND_LOG 2>&1 &
    FRONTEND_PID=$!
    
    cd ..
    
    # Attendre que le frontend soit prêt
    wait_for_service "http://localhost:3000" "Frontend"
}

# Fonction pour lancer les tests Playwright
run_playwright_tests() {
    echo -e "${BLUE}🎭 Lancement des tests Playwright...${NC}"
    
    cd frontend
    
    # Installer Playwright si nécessaire
    if [ ! -d "node_modules/@playwright" ]; then
        echo -e "${YELLOW}📦 Installation de Playwright...${NC}"
        npm install @playwright/test
        npx playwright install
    fi
    
    case $TEST_MODE in
        "headless")
            echo -e "${YELLOW}🎯 Tests en mode headless (pas de navigateur visible)...${NC}"
            npx playwright test --reporter=list
            ;;
        "headed")
            echo -e "${YELLOW}🎯 Tests avec navigateur visible (1 seul)...${NC}"
            npx playwright test --headed --workers=1 --reporter=list
            ;;
        "ui")
            echo -e "${YELLOW}🎯 Tests en mode UI automatique...${NC}"
            npx playwright test --ui --workers=1
            ;;
        "auto")
            echo -e "${YELLOW}🎯 Tests automatiques dans navigateur visible...${NC}"
            npx playwright test --headed --workers=1 --reporter=line
            ;;
        "single")
            echo -e "${YELLOW}🎯 Tests dans UN SEUL navigateur...${NC}"
            npx playwright test --headed --workers=1 --max-failures=1 --reporter=line
            ;;
        "demo")
            echo -e "${YELLOW}🎬 DÉMO GAMEPLAY AUTOMATIQUE...${NC}"
            echo -e "${BLUE}   🎮 Choisit un scénario${NC}"
            echo -e "${BLUE}   ▶️ Lance le jeu${NC}"
            echo -e "${BLUE}   🦸 Sélectionne un héros${NC}"
            echo -e "${BLUE}   🗺️ Fait un mouvement${NC}"
            echo -e "${BLUE}   ⏭️ Termine le tour${NC}"
            npx playwright test tests/e2e/gameplay-demo.spec.ts --headed --workers=1 --reporter=line
            ;;
        "multiplayer")
            echo -e "${YELLOW}👥 DÉMO MULTIJOUEUR - 2 ÉCRANS...${NC}"
            echo -e "${BLUE}   🌐 Créer une session${NC}"
            echo -e "${BLUE}   🤝 Joueur 2 rejoint${NC}"
            echo -e "${BLUE}   🎮 Partie synchronisée${NC}"
            echo -e "${BLUE}   ⚔️ Combat en temps réel${NC}"
            npx playwright test tests/e2e/multiplayer-demo.spec.ts --headed --workers=1 --reporter=line
            ;;
        "report")
            echo -e "${YELLOW}🎯 Tests avec rapport HTML...${NC}"
            npx playwright test --reporter=html
            echo -e "${GREEN}📊 Rapport HTML généré! Ouvre: frontend/playwright-report/index.html${NC}"
            ;;
        "verbose")
            echo -e "${YELLOW}🎯 Tests en mode verbose...${NC}"
            npx playwright test --reporter=line
            ;;
    esac
    
    cd ..
    
    echo -e "${GREEN}✅ Tests Playwright terminés${NC}"
}

# Fonction principale
main() {
    echo -e "${BLUE}🎭 === TESTS PLAYWRIGHT - HEROES OF TIME ===${NC}"
    echo -e "${BLUE}🎯 Mode: $TEST_MODE${NC}"
    
    # Créer le répertoire de logs
    mkdir -p logs
    
    # Vérifier les prérequis
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm n'est pas installé${NC}"
        exit 1
    fi
    
    if ! command -v mvn &> /dev/null; then
        echo -e "${RED}❌ Maven n'est pas installé${NC}"
        exit 1
    fi
    
    # Installer les dépendances si nécessaire
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
    run_playwright_tests
    
    # Résumé
    echo -e "${GREEN}🎉 === TESTS PLAYWRIGHT TERMINÉS ===${NC}"
    echo -e "${GREEN}✅ Mode utilisé: $TEST_MODE${NC}"
    
    # Afficher les logs en cas d'erreur
    if [ -f "$BACKEND_LOG" ]; then
        echo -e "${YELLOW}📋 Logs backend: $BACKEND_LOG${NC}"
    fi
    
    if [ -f "$FRONTEND_LOG" ]; then
        echo -e "${YELLOW}📋 Logs frontend: $FRONTEND_LOG${NC}"
    fi
}

# Afficher l'aide
show_help() {
    echo -e "${BLUE}🎭 Script de tests Playwright - Options d'affichage${NC}"
    echo ""
    echo "Usage:"
    echo "  ./run-playwright-tests.sh [MODE]"
    echo ""
    echo "Modes disponibles:"
    echo "  headless   - Tests sans navigateur visible (par défaut)"
    echo "  headed     - Tests avec 1 navigateur visible"
    echo "  auto       - Tests automatiques dans 1 navigateur visible"
    echo "  single     - Tests dans UN SEUL navigateur"
    echo "  demo       - Démo gameplay: choisit scénario + joue 1 tour"
    echo "  multiplayer - Démo multijoueur: 2 écrans côte à côte"
    echo "  ui         - Interface graphique Playwright"
    echo "  report     - Génère un rapport HTML"
    echo "  verbose    - Affichage détaillé dans le terminal"
    echo "  --help     - Afficher cette aide"
    echo ""
    echo "Exemples:"
    echo "  ./run-playwright-tests.sh headless  # Pas de navigateur"
    echo "  ./run-playwright-tests.sh headed    # 1 navigateur visible"
    echo "  ./run-playwright-tests.sh auto      # Tests automatiques visibles"
    echo "  ./run-playwright-tests.sh demo      # Démo gameplay automatique"
    echo "  ./run-playwright-tests.sh multiplayer # Démo 2 joueurs"
    echo "  ./run-playwright-tests.sh ui        # Interface graphique"
    echo "  ./run-playwright-tests.sh report    # Rapport HTML"
    echo "  ./run-playwright-tests.sh verbose   # Détails dans terminal"
}

# Traiter les arguments
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    show_help
    exit 0
fi

# Définir le mode de test
case "$1" in
    "headless"|"headed"|"auto"|"single"|"demo"|"multiplayer"|"ui"|"report"|"verbose")
        TEST_MODE="$1"
        ;;
    "")
        TEST_MODE="headless"
        ;;
    *)
        echo -e "${RED}❌ Mode inconnu: $1${NC}"
        show_help
        exit 1
        ;;
esac

# Exécuter le script principal
main 