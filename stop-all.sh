#!/bin/bash

# 🛑 Heroes of Time - Stop All Services
# Script pour arrêter tous les services du projet

echo "🛑 ARRÊT DE TOUS LES SERVICES HEROES OF TIME"
echo "============================================="

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🧹 Arrêt des services en cours...${NC}"

# Fonction pour tuer un processus sur un port
kill_port() {
    local port=$1
    local service=$2
    
    local pids=$(lsof -ti:$port 2>/dev/null)
    if [ -n "$pids" ]; then
        echo -e "${YELLOW}Arrêt de $service (port $port)...${NC}"
        echo "$pids" | xargs kill -9 2>/dev/null
        echo -e "${GREEN}✅ $service arrêté${NC}"
    else
        echo -e "${GREEN}✅ $service déjà arrêté${NC}"
    fi
}

# Arrêter tous les services
kill_port 8080 "Backend Spring Boot"
kill_port 8001 "Quantum Visualizer"
kill_port 5173 "Frontend Temporal"
kill_port 3000 "Frontend Principal"
kill_port 8000 "Serveur de Test"

# Arrêter les processus Maven qui pourraient traîner
echo -e "${YELLOW}Arrêt des processus Maven...${NC}"
pkill -f "mvn spring-boot:run" 2>/dev/null || true

# Arrêter les serveurs Python
echo -e "${YELLOW}Arrêt des serveurs Python...${NC}"
pkill -f "python3 -m http.server" 2>/dev/null || true

# Nettoyer les fichiers temporaires
echo -e "${YELLOW}Nettoyage des fichiers temporaires...${NC}"
rm -f *.log
rm -f backend/*.log
rm -f frontend/*.log
rm -f quantum-visualizer/*.log

echo ""
echo -e "${GREEN}🎉 TOUS LES SERVICES ARRÊTÉS${NC}"
echo "================================="
echo ""
echo "Vérification des ports:"
echo "  - Port 8080: $(lsof -ti:8080 | wc -l | xargs echo) processus"
echo "  - Port 8001: $(lsof -ti:8001 | wc -l | xargs echo) processus"
echo "  - Port 5173: $(lsof -ti:5173 | wc -l | xargs echo) processus"
echo "  - Port 3000: $(lsof -ti:3000 | wc -l | xargs echo) processus"
echo ""
echo -e "${GREEN}✅ Prêt pour un nouveau démarrage!${NC}" 