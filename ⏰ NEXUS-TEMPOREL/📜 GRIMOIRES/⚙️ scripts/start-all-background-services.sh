#!/bin/bash

# 🌀 HEISENBERG FUSION - SERVICE MANAGER ULTIME
# =============================================
# Gère TOUS les services en background : 3000, 8000, 8003, 8080, 9000

echo "🌀 HEISENBERG BACKGROUND SERVICE MANAGER"
echo "========================================"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Fonction pour tuer les anciens processus
kill_existing_services() {
    echo -e "${YELLOW}🔄 Nettoyage des anciens services...${NC}"
    
    # Tuer les processus par port
    for port in 3000 8000 8003 8080 9000; do
        if lsof -ti:$port >/dev/null 2>&1; then
            echo -e "${RED}🔫 Arrêt service port $port${NC}"
            lsof -ti:$port | xargs kill -9 2>/dev/null || true
        fi
    done
    
    # Tuer les processus Maven et npm
    pkill -f "spring-boot:run" 2>/dev/null || true
    pkill -f "npm run dev" 2>/dev/null || true
    pkill -f "http.server" 2>/dev/null || true
    
    sleep 2
    echo -e "${GREEN}✅ Nettoyage terminé${NC}"
}

# Fonction pour démarrer un service en background
start_service() {
    local service_name="$1"
    local port="$2"
    local command="$3"
    local directory="$4"
    
    echo -e "${CYAN}🚀 Démarrage $service_name (port $port)...${NC}"
    
    if [ -n "$directory" ]; then
        cd "$directory"
    fi
    
    # Exécuter la commande en arrière-plan
    eval "$command" > "../logs/${service_name,,}-service.log" 2>&1 &
    local pid=$!
    
    # Attendre un peu pour vérifier que le service démarre
    sleep 3
    
    if kill -0 $pid 2>/dev/null && lsof -i:$port >/dev/null 2>&1; then
        echo -e "${GREEN}✅ $service_name démarré (PID: $pid)${NC}"
        echo "$pid" > "../logs/${service_name,,}-service.pid"
        return 0
    else
        echo -e "${RED}❌ Échec démarrage $service_name${NC}"
        return 1
    fi
}

# Créer dossier logs si nécessaire
mkdir -p logs

# Nettoyage initial
kill_existing_services

echo ""
echo -e "${PURPLE}🌀 DÉMARRAGE FUSION HEISENBERG${NC}"
echo ""

# 1. Backend Spring Boot (Port 8080)
echo -e "${BLUE}🔧 SERVICE 1/5: Backend Spring Boot${NC}"
if [ -d "backend" ] && [ -f "🖥️ backend/pom.xml" ]; then
    start_service "Backend" "8080" "mvn spring-boot:run" "backend"
    backend_status=$?
else
    echo -e "${RED}❌ Backend non trouvé${NC}"
    backend_status=1
fi

# 2. Frontend Temporal (Port 8000)
echo -e "${BLUE}🕰️ SERVICE 2/5: Frontend Temporal${NC}"
if [ -d "frontend" ]; then
    start_service "Frontend-Temporal" "8000" "python3 -m http.server 8000" "frontend"
    frontend8000_status=$?
else
    echo -e "${RED}❌ Frontend directory non trouvé${NC}"
    frontend8000_status=1
fi

# 3. React Frontend (Port 3000)
echo -e "${BLUE}⚛️ SERVICE 3/5: React Frontend${NC}"
if [ -d "frontend" ] && [ -f "🌐 frontend/package.json" ]; then
    cd frontend
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📦 Installation dépendances React...${NC}"
        npm install > ../logs/npm-install.log 2>&1
    fi
    start_service "React-Frontend" "3000" "npm start" "frontend"
    react_status=$?
    cd ..
else
    echo -e "${RED}❌ React Frontend non configuré${NC}"
    react_status=1
fi

# 4. Panopticon GRUT (Port 8003)
echo -e "${BLUE}🏛️ SERVICE 4/5: Panopticon GRUT${NC}"
if [ -d "panopticon-grut-dashboard" ] && [ -f "panopticon-grut-dashboard/package.json" ]; then
    cd panopticon-grut-dashboard
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📦 Installation dépendances Panopticon...${NC}"
        npm install > ../logs/panopticon-install.log 2>&1
    fi
    start_service "Panopticon-GRUT" "8003" "npm run dev -- --port 8003 --host" "panopticon-grut-dashboard"
    panopticon_status=$?
    cd ..
else
    echo -e "${RED}❌ Panopticon GRUT non trouvé${NC}"
    panopticon_status=1
fi

# 5. Dashboard Port 9000
echo -e "${BLUE}📊 SERVICE 5/5: Dashboard Port 9000${NC}"
start_service "Dashboard-9000" "9000" "python3 -m http.server 9000" "frontend"
dashboard_status=$?

echo ""
echo -e "${PURPLE}🎯 RÉSUMÉ FUSION HEISENBERG${NC}"
echo "=========================="

services_count=0
total_services=5

# Vérification finale des services
services=(
    "Backend|8080|$backend_status"
    "Frontend-Temporal|8000|$frontend8000_status"
    "React-Frontend|3000|$react_status"
    "Panopticon-GRUT|8003|$panopticon_status"
    "Dashboard-9000|9000|$dashboard_status"
)

for service in "${services[@]}"; do
    name=$(echo "$service" | cut -d'|' -f1)
    port=$(echo "$service" | cut -d'|' -f2)
    status=$(echo "$service" | cut -d'|' -f3)
    
    if [ "$status" -eq 0 ]; then
        echo -e "  ✅ $name (port $port): ${GREEN}ACTIF${NC}"
        ((services_count++))
    else
        echo -e "  ❌ $name (port $port): ${RED}ÉCHEC${NC}"
    fi
done

echo ""
echo -e "${CYAN}📊 Services actifs: $services_count/$total_services${NC}"
echo -e "${CYAN}📈 Taux de réussite: $((services_count * 100 / total_services))%${NC}"

if [ $services_count -ge 3 ]; then
    echo -e "${GREEN}🎉 FUSION HEISENBERG RÉUSSIE !${NC}"
    echo -e "${PURPLE}🌀 Interfaces déphasées fusionnées !${NC}"
    
    echo ""
    echo -e "${YELLOW}🌐 ACCÈS AUX INTERFACES:${NC}"
    echo -e "  🌀 Portail Ultime: ${CYAN}http://localhost:8000/portail-100-html-interfaces.html${NC}"
    echo -e "  ⬡ Hexagon Battlefield: ${CYAN}http://localhost:8000/vince-vega-hexagon-battlefield.html${NC}"
    echo -e "  📊 Dashboard 9000: ${CYAN}http://localhost:9000/dashboard.html${NC}"
    echo -e "  🏛️ Panopticon GRUT: ${CYAN}http://localhost:8003${NC}"
    echo -e "  ⚛️ React Frontend: ${CYAN}http://localhost:3000${NC}"
    
    # Ouvrir le portail automatiquement
    if command -v open >/dev/null 2>&1; then
        echo -e "${CYAN}🚀 Ouverture automatique du Portail Ultime...${NC}"
        sleep 2
        open "http://localhost:8000/portail-100-html-interfaces.html" 2>/dev/null &
    fi
else
    echo -e "${RED}⚠️ Fusion partielle - Certains services ont échoué${NC}"
    echo -e "${YELLOW}💡 Vérifiez les logs dans le dossier logs/${NC}"
fi

echo ""
echo -e "${PURPLE}🎮 COMMANDES UTILES:${NC}"
echo -e "  🧪 Test Playwright: ${GREEN}./hots playwright${NC}"
echo -e "  📊 Status services: ${GREEN}./hots status${NC}"
echo -e "  🛑 Arrêter tout: ${GREEN}./hots stop${NC}"

echo ""
echo -e "${GREEN}✅ SCRIPT TERMINÉ - Services en arrière-plan !${NC}" 