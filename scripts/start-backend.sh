#!/bin/bash
# Script de démarrage du backend Heroes of Time

echo "🚀 Démarrage du backend Heroes of Time..."
echo "========================================"

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Vérifier si on est dans le bon répertoire
if [ ! -d "backend" ]; then
    echo -e "${RED}❌ Erreur: répertoire backend non trouvé${NC}"
    echo "   Assurez-vous d'être à la racine du projet"
    exit 1
fi

cd backend

# Nettoyer les processus zombies
echo "🧹 Nettoyage des processus zombies..."
pkill -9 -f "java.*defunct" 2>/dev/null || true

# Vérifier Java
echo "☕ Vérification de Java..."
if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java n'est pas installé${NC}"
    exit 1
fi
java -version

# Vérifier Maven
echo "🔧 Vérification de Maven..."
if [ -f "../mvnw" ]; then
    MAVEN_CMD="../mvnw"
    echo -e "${GREEN}✓ Utilisation de Maven Wrapper${NC}"
elif command -v mvn &> /dev/null; then
    MAVEN_CMD="mvn"
    echo -e "${GREEN}✓ Utilisation de Maven système${NC}"
else
    echo -e "${RED}❌ Maven non trouvé${NC}"
    echo "   Installation de Maven nécessaire"
    exit 1
fi

# Créer le dossier de logs
mkdir -p logs

# Compiler si nécessaire
if [ ! -d "target" ] || [ "$1" == "--rebuild" ]; then
    echo "🔨 Compilation du projet..."
    $MAVEN_CMD clean compile
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erreur de compilation${NC}"
        exit 1
    fi
fi

# Démarrer le backend
echo "🎮 Lancement du backend..."
echo "   Port: 8080"
echo "   Logs: backend/logs/spring.log"

# Lancer en arrière-plan avec redirection des logs
nohup $MAVEN_CMD spring-boot:run > logs/spring.log 2>&1 &
BACKEND_PID=$!

echo "   PID: $BACKEND_PID"
echo $BACKEND_PID > .backend.pid

# Attendre que le backend démarre
echo "⏳ Attente du démarrage..."
for i in {1..30}; do
    if curl -s http://localhost:8080/api/health &>/dev/null; then
        echo -e "\n${GREEN}✅ Backend démarré avec succès !${NC}"
        echo "   URL: http://localhost:8080"
        echo "   API: http://localhost:8080/api"
        exit 0
    fi
    echo -n "."
    sleep 1
done

echo -e "\n${YELLOW}⚠️  Le backend met du temps à démarrer${NC}"
echo "   Vérifiez les logs: tail -f backend/logs/spring.log"
exit 1