#!/bin/bash

# 🛡️ SURVEILLANCE PASSIVE JEAN-GROGNON
# Empêche Jean de devenir grognon en surveillant le backend
# Relance automatiquement si crash détecté

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🛡️ SURVEILLANCE PASSIVE JEAN-GROGNON ACTIVÉE${NC}"
echo "================================================"
echo ""

# Configuration
BACKEND_URL="http://localhost:8080"
CHECK_INTERVAL=30  # Vérification toutes les 30 secondes
MAX_FAILURES=3     # 3 échecs avant relance
FAILURE_COUNT=0
JEAN_STATUS="😊 CONTENT"

# Fonction de vérification backend
check_backend() {
    local response=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/status" 2>/dev/null)
    if [ "$response" = "200" ]; then
        return 0  # OK
    else
        return 1  # KO
    fi
}

# Fonction relance backend
restart_backend() {
    echo -e "${RED}🚨 RELANCE BACKEND - JEAN DEVIENT GROGNON !${NC}"
    echo "   Arrêt des processus Java..."
    pkill -f "spring-boot" 2>/dev/null
    pkill -f "demo" 2>/dev/null
    sleep 2
    
    echo "   Relance backend..."
    cd backend
    nohup mvn spring-boot:run > ../logs/backend-surveillance.log 2>&1 &
    cd ..
    
    echo -e "${GREEN}✅ Backend relancé - Jean redevient content${NC}"
    FAILURE_COUNT=0
    JEAN_STATUS="😊 CONTENT (après relance)"
}

# Fonction notification Jean
notify_jean() {
    local status=$1
    local message=$2
    echo -e "${CYAN}👤 JEAN STATUS: ${status}${NC}"
    echo "   📝 $message"
    
    # Log dans fichier pour Jean
    echo "$(date): $status - $message" >> logs/jean-grognon-surveillance.log
}

# Boucle principale de surveillance
echo -e "${BLUE}🔍 Démarrage surveillance (vérification toutes les ${CHECK_INTERVAL}s)${NC}"
echo ""

while true; do
    if check_backend; then
        # Backend OK
        if [ $FAILURE_COUNT -gt 0 ]; then
            notify_jean "😊 CONTENT" "Backend revenu en ligne, Jean soulagé"
            FAILURE_COUNT=0
            JEAN_STATUS="😊 CONTENT"
        fi
        echo -e "${GREEN}✅ Backend OK - Jean: $JEAN_STATUS${NC}"
    else
        # Backend KO
        FAILURE_COUNT=$((FAILURE_COUNT + 1))
        echo -e "${YELLOW}⚠️  Backend KO (tentative $FAILURE_COUNT/$MAX_FAILURES)${NC}"
        
        if [ $FAILURE_COUNT -eq 1 ]; then
            JEAN_STATUS="🤔 INQUIET"
            notify_jean "$JEAN_STATUS" "Premier échec backend détecté"
        elif [ $FAILURE_COUNT -eq 2 ]; then
            JEAN_STATUS="😤 AGACÉ"
            notify_jean "$JEAN_STATUS" "Deuxième échec, Jean commence à s'agacer"
        elif [ $FAILURE_COUNT -ge $MAX_FAILURES ]; then
            JEAN_STATUS="😡 GROGNON"
            notify_jean "$JEAN_STATUS" "TROP C'EST TROP ! Relance automatique..."
            restart_backend
        fi
        
        echo -e "${RED}   Jean: $JEAN_STATUS${NC}"
    fi
    
    sleep $CHECK_INTERVAL
done 