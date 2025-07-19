#!/bin/bash

# ⚔️ Heroes of Time - Bataille Temporelle Integration Test
# =========================================================
# Script d'exécution du test d'intégration complet
# Utilise le scénario "Bataille Temporelle" avec scripts .hots et objets JSON

echo "⚔️ Heroes of Time - Bataille Temporelle Integration Test"
echo "========================================================"
echo ""

# Configuration des couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher des messages colorés
log() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Fonction pour vérifier si un processus est en cours
check_process() {
    local port=$1
    local name=$2
    if lsof -ti:$port > /dev/null 2>&1; then
        log $GREEN "✅ $name est en cours d'exécution sur le port $port"
        return 0
    else
        log $RED "❌ $name n'est pas en cours d'exécution sur le port $port"
        return 1
    fi
}

# Fonction pour nettoyer les processus
cleanup() {
    log $BLUE "🧹 Nettoyage des processus..."
    
    # Nettoyer les processus Spring Boot
    pkill -f "spring-boot" 2>/dev/null
    pkill -f "mvn" 2>/dev/null
    
    # Nettoyer les ports spécifiques
    lsof -ti:8080 | xargs kill -9 2>/dev/null
    lsof -ti:5174 | xargs kill -9 2>/dev/null
    
    sleep 2
    log $GREEN "✅ Nettoyage terminé"
}

# Fonction pour démarrer le backend
start_backend() {
    log $BLUE "🚀 Démarrage du backend..."
    
    cd backend
    
    # Vérifier si Maven est disponible
    if ! command -v mvn &> /dev/null; then
        log $RED "❌ Maven n'est pas installé"
        exit 1
    fi
    
    # Démarrer le backend en arrière-plan
    nohup mvn spring-boot:run -Dspring-boot.run.arguments="--heroes.parser.use.antlr=false" > ../test-backend.log 2>&1 &
    BACKEND_PID=$!
    
    cd ..
    
    # Attendre que le backend soit prêt
    log $YELLOW "⏳ Attente du démarrage du backend..."
    for i in {1..60}; do
        if curl -s http://localhost:8080/actuator/health > /dev/null 2>&1 || curl -s http://localhost:8080/api/game/status > /dev/null 2>&1; then
            log $GREEN "✅ Backend prêt!"
            return 0
        fi
        echo -n "."
        sleep 1
    done
    
    log $RED "❌ Timeout: Backend non prêt après 60 secondes"
    return 1
}

# Vérifier les prérequis
log $BLUE "🔍 Vérification des prérequis..."

# Vérifier Java
if ! command -v java &> /dev/null; then
    log $RED "❌ Java n'est pas installé"
    exit 1
fi

# Vérifier Maven
if ! command -v mvn &> /dev/null; then
    log $RED "❌ Maven n'est pas installé"
    exit 1
fi

log $GREEN "✅ Prérequis vérifiés"

# Vérifier la structure des fichiers de test
echo "📁 Vérification des fichiers de test..."
MISSING_FILES=()
# Mise à jour des chemins vers les fichiers de test
if [ ! -f "game_assets/scenarios/visualizer/bataille_temporelle.json" ]; then
    MISSING_FILES+=("game_assets/scenarios/visualizer/bataille_temporelle.json")
fi
if [ ! -f "game_assets/tests/hots/bataille_temporelle_setup.hots" ]; then
    MISSING_FILES+=("game_assets/tests/hots/bataille_temporelle_setup.hots")
fi
if [ ! -f "game_assets/tests/hots/bataille_temporelle_combat.hots" ]; then
    MISSING_FILES+=("game_assets/tests/hots/bataille_temporelle_combat.hots")
fi
if [ ! -f "game_assets/tests/hots/bataille_temporelle_finale.hots" ]; then
    MISSING_FILES+=("game_assets/tests/hots/bataille_temporelle_finale.hots")
fi

if [ ${#MISSING_FILES[@]} -gt 0 ]; then
    log $RED "❌ Fichiers manquants:"
    for file in "${MISSING_FILES[@]}"; do
        log $RED "   - $file"
    done
    exit 1
else
    log $GREEN "✅ Tous les fichiers de test sont présents"
fi

# Afficher les statistiques des fichiers
log $BLUE "📊 Statistiques des fichiers de test:"
echo "   - Scénario JSON: $(wc -l < game_assets/scenarios/visualizer/bataille_temporelle.json) lignes"
echo "   - Setup .hots: $(grep -v '^#' game_assets/tests/hots/bataille_temporelle_setup.hots | grep -v '^$' | wc -l) commandes"
echo "   - Combat .hots: $(grep -v '^#' game_assets/tests/hots/bataille_temporelle_combat.hots | grep -v '^$' | wc -l) commandes"
echo "   - Finale .hots: $(grep -v '^#' game_assets/tests/hots/bataille_temporelle_finale.hots | grep -v '^$' | wc -l) commandes"
echo "   - Test Java: $(wc -l < backend/src/test/java/com/heroesoftimepoc/temporalengine/integration/BatailleTemporelleIntegrationTest.java) lignes"
echo ""

# Nettoyage initial
cleanup

# Démarrer le backend
if ! start_backend; then
    log $RED "❌ Impossible de démarrer le backend"
    exit 1
fi

# Exécuter le test d'intégration
log $BLUE "🧪 Exécution du test d'intégration..."
echo ""

cd backend

# Lancer les tests avec Maven
if mvn test -Dtest=BatailleTemporelleIntegrationTest -DfailIfNoTests=false; then
    log $GREEN "🎉 Test d'intégration terminé avec succès!"
    exit_code=0
else
    log $RED "❌ Le test d'intégration a échoué"
    exit_code=1
fi

cd ..

# Afficher les logs si nécessaire
if [ $exit_code -ne 0 ]; then
    log $YELLOW "📋 Logs du backend (dernières 50 lignes):"
    tail -50 test-backend.log
fi

# Nettoyage final
cleanup

# Afficher le résumé
log $BLUE "📊 RÉSUMÉ DU TEST D'INTÉGRATION:"
echo "=================================="
if [ $exit_code -eq 0 ]; then
    log $GREEN "✅ Statut: SUCCÈS"
    log $GREEN "✅ Scénario \"Bataille Temporelle\" validé"
    log $GREEN "✅ Scripts .hots fonctionnels"
    log $GREEN "✅ Artefacts temporels opérationnels"
    log $GREEN "✅ Système quantique stable"
else
    log $RED "❌ Statut: ÉCHEC"
    log $RED "❌ Voir les logs pour plus de détails"
fi
echo ""
log $BLUE "📁 Fichiers de logs disponibles:"
echo "   - Backend: test-backend.log"
echo "   - Tests: backend/target/surefire-reports/"
echo ""

exit $exit_code 