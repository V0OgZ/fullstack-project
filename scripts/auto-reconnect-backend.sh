#!/bin/bash

# 🛋️ AUTO-RECONNEXION BACKEND POUR JEAN-CANAPÉ
# Relance automatiquement le backend quand il crash
# Jean peut rester sur son canapé sans stress

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🛋️ AUTO-RECONNEXION BACKEND JEAN-CANAPÉ${NC}"
echo "============================================="
echo ""

BACKEND_URL="http://localhost:8080"
CHECK_INTERVAL=10  # Vérification toutes les 10 secondes
RESTART_DELAY=5    # Attendre 5s avant relance

# Fonction de vérification backend
check_backend_status() {
    local response=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/status" 2>/dev/null)
    if [ "$response" = "200" ]; then
        return 0  # OK
    else
        return 1  # KO
    fi
}

# Fonction relance backend
restart_backend_smart() {
    echo -e "${RED}🚨 BACKEND DOWN - RELANCE AUTO !${NC}"
    echo -e "${CYAN}🛋️ Jean reste sur son canapé, on gère...${NC}"
    
    # Tuer les processus Java existants
    echo "   🔪 Kill processus Java..."
    pkill -f "spring-boot" 2>/dev/null
    pkill -f "demo" 2>/dev/null
    sleep $RESTART_DELAY
    
    # Relancer le backend
    echo "   🚀 Relance backend..."
    cd backend
    nohup mvn spring-boot:run > ../logs/backend-auto-restart.log 2>&1 &
    cd ..
    
    # Attendre que le backend soit prêt
    echo "   ⏳ Attente backend ready..."
    local attempts=0
    while [ $attempts -lt 30 ]; do
        if check_backend_status; then
            echo -e "${GREEN}✅ Backend opérationnel !${NC}"
            echo -e "${PURPLE}🛋️ Jean peut continuer à chiller !${NC}"
            return 0
        fi
        sleep 2
        attempts=$((attempts + 1))
        echo -n "."
    done
    
    echo -e "${RED}❌ Échec relance backend${NC}"
    return 1
}

# Boucle principale de surveillance
echo -e "${BLUE}🔍 Surveillance active (check toutes les ${CHECK_INTERVAL}s)${NC}"
echo -e "${CYAN}🛋️ Jean peut dormir tranquille sur son canapé !${NC}"
echo ""

consecutive_failures=0

while true; do
    if check_backend_status; then
        if [ $consecutive_failures -gt 0 ]; then
            echo -e "${GREEN}✅ Backend revenu - Jean content sur son canapé${NC}"
            consecutive_failures=0
        fi
        echo -e "${GREEN}✅ Backend OK${NC} $(date '+%H:%M:%S')"
    else
        consecutive_failures=$((consecutive_failures + 1))
        echo -e "${YELLOW}⚠️  Backend KO (tentative $consecutive_failures)${NC}"
        
        if [ $consecutive_failures -ge 2 ]; then
            restart_backend_smart
            consecutive_failures=0
        fi
    fi
    
    sleep $CHECK_INTERVAL
done 