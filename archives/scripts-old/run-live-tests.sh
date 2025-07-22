#!/bin/bash

# 🚀 HEROES OF TIME - TESTS LIVE AVEC UIs
# =======================================
# Lance tous les tests en temps réel avec ouverture automatique des interfaces

echo "🚀 HEROES OF TIME - TESTS LIVE AVEC UIs"
echo "======================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Fonction pour ouvrir les URLs
open_url() {
    local url=$1
    local name=$2
    echo "🌐 Ouverture $name: $url"
    
    # Détection de l'OS pour ouvrir les URLs
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$url"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open "$url"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        # Windows
        start "$url"
    else
        echo "⚠️  Impossible d'ouvrir automatiquement. Allez sur: $url"
    fi
    
    sleep 1
}

# Fonction pour vérifier un service
check_service() {
    local port=$1
    local name=$2
    local max_attempts=30
    local attempt=0
    
    echo -n "🔍 Vérification $name (port $port)... "
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -s "http://localhost:$port" >/dev/null 2>&1; then
            echo -e "${GREEN}✅ ACTIF${NC}"
            return 0
        fi
        sleep 1
        ((attempt++))
        echo -n "."
    done
    
    echo -e "${RED}❌ TIMEOUT${NC}"
    return 1
}

echo "🧹 Nettoyage et préparation..."
# Nettoyer les anciens processus
lsof -ti:8080,8000,5173,8001,8888,9000 | xargs kill -9 2>/dev/null || true
sleep 2

echo ""
echo "🚀 Démarrage des services..."
echo ""

# 1. Backend
echo -e "${BLUE}[1/6] Backend Spring Boot (port 8080)...${NC}"
cd backend
nohup mvn spring-boot:run > ../backend-live.log 2>&1 &
BACKEND_PID=$!
echo "   PID: $BACKEND_PID"
cd ..

# 2. Frontend Principal
echo -e "${BLUE}[2/6] Frontend Principal (port 8000)...${NC}"
cd frontend
nohup python3 -m http.server 8000 > ../frontend-live.log 2>&1 &
FRONTEND_PID=$!
echo "   PID: $FRONTEND_PID"
cd ..

# 3. Frontend Temporal
echo -e "${BLUE}[3/6] Frontend Temporal (port 5173)...${NC}"
cd frontend-temporal
nohup npm run dev > ../temporal-live.log 2>&1 &
TEMPORAL_PID=$!
echo "   PID: $TEMPORAL_PID"
cd ..

# 4. Quantum Visualizer
echo -e "${BLUE}[4/6] Quantum Visualizer (port 8001)...${NC}"
cd quantum-visualizer
nohup python3 -m http.server 8001 > ../quantum-live.log 2>&1 &
QUANTUM_PID=$!
echo "   PID: $QUANTUM_PID"
cd ..

# 5. Test Runner
echo -e "${BLUE}[5/6] Test Runner (port 8888)...${NC}"
nohup python3 test-runner-server.py > test-runner-live.log 2>&1 &
TESTRUNNER_PID=$!
echo "   PID: $TESTRUNNER_PID"

# 6. Dashboard Sécurisé
echo -e "${BLUE}[6/6] Dashboard Sécurisé (port 9000)...${NC}"
nohup python3 dashboard-server.py > dashboard-live.log 2>&1 &
DASHBOARD_PID=$!
echo "   PID: $DASHBOARD_PID"

echo ""
echo "⏳ Attente du démarrage des services..."
sleep 10

echo ""
echo "🔍 Vérification des services..."

# Vérifier chaque service
BACKEND_OK=false
FRONTEND_OK=false
TEMPORAL_OK=false
QUANTUM_OK=false
TESTRUNNER_OK=false
DASHBOARD_OK=false

check_service 8080 "Backend" && BACKEND_OK=true
check_service 8000 "Frontend Principal" && FRONTEND_OK=true  
check_service 5173 "Frontend Temporal" && TEMPORAL_OK=true
check_service 8001 "Quantum Visualizer" && QUANTUM_OK=true
check_service 8888 "Test Runner" && TESTRUNNER_OK=true
check_service 9000 "Dashboard" && DASHBOARD_OK=true

echo ""
echo "🌐 OUVERTURE AUTOMATIQUE DES UIs..."
echo ""

# Ouvrir les UIs dans l'ordre optimal
if [ "$DASHBOARD_OK" = true ]; then
    open_url "http://localhost:9000" "Dashboard Central (HUD Principal)"
    sleep 2
fi

if [ "$TESTRUNNER_OK" = true ]; then
    open_url "http://localhost:8888" "Test Runner (Tests Live)"
    sleep 2
fi

if [ "$QUANTUM_OK" = true ]; then
    open_url "http://localhost:8001" "Quantum Visualizer (Scénarios)"
    sleep 2
fi

if [ "$FRONTEND_OK" = true ]; then
    open_url "http://localhost:8000" "Frontend Principal"
    sleep 2
fi

if [ "$TEMPORAL_OK" = true ]; then
    open_url "http://localhost:5173" "Frontend Temporal"
fi

echo ""
echo "🎯 LANCEMENT DES TESTS AUTOMATIQUES..."
echo ""

# Attendre un peu plus pour que tout soit stable
sleep 5

# Lancer les tests en arrière-plan
echo -e "${YELLOW}🧪 Démarrage des tests GROFI...${NC}"
nohup ./test-grofi-causal-integration.sh > tests-live-grofi.log 2>&1 &
GROFI_TEST_PID=$!

echo -e "${YELLOW}🧪 Démarrage des tests backend...${NC}"
nohup ./test-backend-complete.sh > tests-live-backend.log 2>&1 &
BACKEND_TEST_PID=$!

echo -e "${YELLOW}🧪 Démarrage des tests frontend...${NC}"
nohup ./test-frontend.js > tests-live-frontend.log 2>&1 &
FRONTEND_TEST_PID=$!

echo ""
echo -e "${GREEN}✨ SYSTÈME DE TESTS LIVE DÉMARRÉ !${NC}"
echo "========================================="
echo ""
echo -e "${CYAN}🎯 HUD PRINCIPAL:${NC}"
echo "   Dashboard: http://localhost:9000"
echo "   → Statut global en temps réel"
echo "   → Visualiseur de rapports MD"
echo "   → Accès centralisé aux UIs"
echo ""
echo -e "${CYAN}🧪 TESTS EN COURS:${NC}"
echo "   Test Runner: http://localhost:8888"
echo "   → Tests GROFI (PID: $GROFI_TEST_PID)"
echo "   → Tests Backend (PID: $BACKEND_TEST_PID)"  
echo "   → Tests Frontend (PID: $FRONTEND_TEST_PID)"
echo ""
echo -e "${CYAN}🔬 INTERFACES ACTIVES:${NC}"
echo "   Quantum Visualizer: http://localhost:8001"
echo "   Frontend Principal: http://localhost:8000"
echo "   Frontend Temporal: http://localhost:5173"
echo ""
echo -e "${CYAN}📊 LOGS EN TEMPS RÉEL:${NC}"
echo "   tail -f tests-live-*.log    # Tests"
echo "   tail -f *-live.log          # Services"
echo ""
echo -e "${PURPLE}💡 CONSEILS:${NC}"
echo "   • Le Dashboard (9000) est ton HUD principal"
echo "   • Les tests tournent en arrière-plan"
echo "   • Toutes les UIs sont ouvertes automatiquement"
echo "   • Utilise Ctrl+C pour arrêter"
echo ""
echo -e "${RED}🛑 POUR ARRÊTER:${NC}"
echo "   Ctrl+C puis ./stop-all-services.sh"

# Fonction de nettoyage à l'arrêt
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Arrêt en cours...${NC}"
    
    # Arrêter les tests
    [ ! -z "$GROFI_TEST_PID" ] && kill $GROFI_TEST_PID 2>/dev/null
    [ ! -z "$BACKEND_TEST_PID" ] && kill $BACKEND_TEST_PID 2>/dev/null  
    [ ! -z "$FRONTEND_TEST_PID" ] && kill $FRONTEND_TEST_PID 2>/dev/null
    
    # Arrêter tous les services
    ./scripts/actifs/stop-all-services.sh
    
    echo -e "${GREEN}✅ Arrêt terminé${NC}"
    exit 0
}

# Intercepter Ctrl+C
trap cleanup SIGINT

# Boucle de monitoring
echo -e "${CYAN}🔄 Monitoring actif... (Ctrl+C pour arrêter)${NC}"
echo ""

while true; do
    # Afficher un statut périodique
    echo -e "${BLUE}[$(date '+%H:%M:%S')] 🔍 Statut des services:${NC}"
    
    # Vérification rapide des services
    for port in 9000 8888 8080 8000 5173 8001; do
        if curl -s "http://localhost:$port" >/dev/null 2>&1; then
            echo -e "   Port $port: ${GREEN}✅${NC}"
        else
            echo -e "   Port $port: ${RED}❌${NC}"
        fi
    done
    
    echo ""
    sleep 30
done 