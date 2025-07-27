#!/bin/bash
# Script de vérification de l'état du backend Heroes of Time

echo "🔍 Vérification du backend Heroes of Time..."
echo "==========================================="

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier si le port 8080 est utilisé
check_port() {
    if lsof -i :8080 &>/dev/null || netstat -tlnp 2>/dev/null | grep -q :8080; then
        echo -e "${GREEN}✓ Port 8080 actif${NC}"
        return 0
    else
        echo -e "${RED}✗ Port 8080 inactif${NC}"
        return 1
    fi
}

# Vérifier les processus Java
check_java_process() {
    JAVA_PROCS=$(ps aux | grep -E "java.*spring|java.*backend" | grep -v grep | wc -l)
    if [ $JAVA_PROCS -gt 0 ]; then
        echo -e "${GREEN}✓ Processus Java trouvé(s): $JAVA_PROCS${NC}"
        ps aux | grep -E "java.*spring|java.*backend" | grep -v grep | head -3
        return 0
    else
        echo -e "${RED}✗ Aucun processus backend Java actif${NC}"
        return 1
    fi
}

# Vérifier la santé du backend via API
check_api_health() {
    echo "🏥 Test de l'API..."
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/health 2>/dev/null | grep -q "200"; then
        echo -e "${GREEN}✓ API répond correctement${NC}"
        return 0
    else
        echo -e "${RED}✗ API ne répond pas${NC}"
        return 1
    fi
}

# Vérifier les logs récents
check_logs() {
    LOG_FILE="backend/logs/spring.log"
    if [ -f "$LOG_FILE" ]; then
        echo -e "${YELLOW}📋 Dernières lignes du log:${NC}"
        tail -5 "$LOG_FILE"
    else
        echo -e "${YELLOW}⚠ Pas de fichier de log trouvé${NC}"
    fi
}

# Vérifier la configuration Maven
check_maven() {
    echo "🔧 Vérification Maven..."
    if [ -f "./mvnw" ]; then
        echo -e "${GREEN}✓ Maven Wrapper trouvé${NC}"
        if [ -d ".mvn/wrapper" ]; then
            echo -e "${GREEN}✓ Configuration Maven présente${NC}"
        else
            echo -e "${RED}✗ Configuration Maven manquante${NC}"
        fi
    else
        echo -e "${RED}✗ Maven Wrapper non trouvé${NC}"
    fi
}

# Résumé de l'état
echo ""
echo "📊 ÉTAT DU BACKEND:"
echo "==================="

PORT_OK=false
PROCESS_OK=false
API_OK=false

check_port && PORT_OK=true
check_java_process && PROCESS_OK=true
check_api_health && API_OK=true
check_maven
check_logs

echo ""
echo "📝 RÉSUMÉ:"
echo "----------"

if $PORT_OK && $PROCESS_OK && $API_OK; then
    echo -e "${GREEN}✅ Backend opérationnel !${NC}"
    exit 0
elif $PORT_OK || $PROCESS_OK; then
    echo -e "${YELLOW}⚠️  Backend partiellement actif${NC}"
    echo "   Essayez: ./scripts/restart-backend.sh"
    exit 1
else
    echo -e "${RED}❌ Backend inactif${NC}"
    echo "   Pour démarrer: ./scripts/start-backend.sh"
    exit 2
fi