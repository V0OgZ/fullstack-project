#!/bin/bash
# Script d'arrêt du backend Heroes of Time

echo "🛑 Arrêt du backend Heroes of Time..."
echo "====================================="

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Méthode 1: Via le fichier PID
if [ -f "backend/.backend.pid" ]; then
    PID=$(cat backend/.backend.pid)
    if kill -0 $PID 2>/dev/null; then
        echo "📍 Arrêt du processus PID: $PID"
        kill $PID
        sleep 2
        if kill -0 $PID 2>/dev/null; then
            echo -e "${YELLOW}⚠️  Force l'arrêt...${NC}"
            kill -9 $PID
        fi
        rm backend/.backend.pid
        echo -e "${GREEN}✓ Backend arrêté via PID${NC}"
    else
        echo -e "${YELLOW}⚠️  PID invalide, recherche alternative...${NC}"
        rm backend/.backend.pid
    fi
fi

# Méthode 2: Recherche par port
PIDS=$(lsof -ti :8080 2>/dev/null)
if [ ! -z "$PIDS" ]; then
    echo "🔍 Processus trouvés sur port 8080: $PIDS"
    for pid in $PIDS; do
        kill $pid 2>/dev/null && echo -e "${GREEN}✓ Arrêt du processus $pid${NC}"
    done
    sleep 2
fi

# Méthode 3: Recherche par nom
SPRING_PIDS=$(ps aux | grep -E "spring-boot|mvn.*spring-boot:run" | grep -v grep | awk '{print $2}')
if [ ! -z "$SPRING_PIDS" ]; then
    echo "🔍 Processus Spring Boot trouvés: $SPRING_PIDS"
    for pid in $SPRING_PIDS; do
        kill $pid 2>/dev/null && echo -e "${GREEN}✓ Arrêt du processus $pid${NC}"
    done
fi

# Nettoyer les zombies
echo "🧹 Nettoyage des processus zombies..."
pkill -9 -f "java.*defunct" 2>/dev/null || true

# Vérification finale
sleep 1
if lsof -i :8080 &>/dev/null; then
    echo -e "${RED}❌ Des processus utilisent encore le port 8080${NC}"
    echo "   Utilisez: sudo lsof -i :8080"
    exit 1
else
    echo -e "${GREEN}✅ Backend complètement arrêté !${NC}"
    exit 0
fi