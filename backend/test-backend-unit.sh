#!/bin/bash

# 🧪 Heroes of Time - Tests Unitaires Backend avec Rapport Détaillé
# Script pour lancer les tests unitaires du backend avec rapport complet

set -e

echo "📊 Heroes of Time - Tests Unitaires Backend"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"
TEST_RESULTS_DIR="$PROJECT_ROOT/test-results"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
REPORT_FILE="$TEST_RESULTS_DIR/backend-unit-tests-$TIMESTAMP.html"
LOG_FILE="$TEST_RESULTS_DIR/backend-unit-tests-$TIMESTAMP.log"

# Créer le répertoire de résultats
mkdir -p "$TEST_RESULTS_DIR"

echo -e "${BLUE}🔍 Configuration des tests${NC}"
echo "  📁 Répertoire backend: $BACKEND_DIR"
echo "  📊 Rapport HTML: $REPORT_FILE"
echo "  📝 Log détaillé: $LOG_FILE"
echo ""

# Vérifier la présence du backend
if [ ! -d "$BACKEND_DIR" ]; then
    echo -e "${RED}❌ ERREUR: Répertoire backend non trouvé${NC}"
    exit 1
fi

cd "$BACKEND_DIR"

echo -e "${BLUE}📦 Vérification des dépendances...${NC}"
if [ ! -f "pom.xml" ]; then
    echo -e "${RED}❌ ERREUR: pom.xml non trouvé${NC}"
    exit 1
fi

echo -e "${BLUE}🧽 Nettoyage des anciens artifacts...${NC}"
./mvnw clean -q > /dev/null 2>&1 || true

echo -e "${BLUE}🔧 Compilation du projet...${NC}"
./mvnw compile -q > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ ERREUR: Échec de la compilation${NC}"
    exit 1
fi

echo -e "${BLUE}🧪 Lancement des tests unitaires avec rapport...${NC}"
echo "  ⏳ Cela peut prendre quelques minutes..."

# Démarrer le timestamp
TEST_START_TIME=$(date +%s)

# Lancer les tests avec rapport Surefire
./mvnw test \
    -Dmaven.test.failure.ignore=true \
    -Dsurefire.reports.directory="$TEST_RESULTS_DIR/surefire-reports" \
    -Dmaven.surefire.report.format=xml \
    -Dmaven.surefire.report.format=brief \
    > "$LOG_FILE" 2>&1

TEST_EXIT_CODE=$?
TEST_END_TIME=$(date +%s)
TEST_DURATION=$((TEST_END_TIME - TEST_START_TIME))

echo -e "${BLUE}📊 Génération du rapport HTML...${NC}"

# Générer le rapport HTML
./mvnw surefire-report:report -q > /dev/null 2>&1 || true

# Générer notre rapport personnalisé
cat > "$REPORT_FILE" << EOF
<!DOCTYPE html>
<html>
<head>
    <title>Heroes of Time - Rapport Tests Unitaires Backend</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; border-radius: 5px; }
        .summary { background: #ecf0f1; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .success { color: #27ae60; }
        .failure { color: #e74c3c; }
        .warning { color: #f39c12; }
        .info { color: #3498db; }
        .test-class { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .test-method { margin: 10px 0; padding: 10px; background: #f8f9fa; border-left: 4px solid #3498db; }
        .test-failure { border-left-color: #e74c3c; background: #fdf2f2; }
        .test-success { border-left-color: #27ae60; background: #f0f9f0; }
        .timestamp { font-size: 0.9em; color: #666; }
        .duration { font-weight: bold; color: #3498db; }
    </style>
</head>
<body>
    <div class="header">
        <h1>⚔️ Heroes of Time - Tests Unitaires Backend</h1>
        <p class="timestamp">Généré le $(date)</p>
    </div>

    <div class="summary">
        <h2>📊 Résumé des Tests</h2>
        <p><strong>Durée totale:</strong> <span class="duration">${TEST_DURATION}s</span></p>
        <p><strong>Statut:</strong> 
EOF

# Analyser les résultats
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo '            <span class="success">✅ TOUS LES TESTS PASSÉS</span>' >> "$REPORT_FILE"
else
    echo '            <span class="failure">❌ ÉCHECS DÉTECTÉS</span>' >> "$REPORT_FILE"
fi

# Analyser les résultats Surefire
SUREFIRE_RESULTS="$TEST_RESULTS_DIR/surefire-reports"
if [ -d "$SUREFIRE_RESULTS" ]; then
    TOTAL_TESTS=$(find "$SUREFIRE_RESULTS" -name "*.xml" -exec grep -h "tests=" {} \; | sed 's/.*tests="\([0-9]*\)".*/\1/' | awk '{sum += $1} END {print sum}')
    FAILURES=$(find "$SUREFIRE_RESULTS" -name "*.xml" -exec grep -h "failures=" {} \; | sed 's/.*failures="\([0-9]*\)".*/\1/' | awk '{sum += $1} END {print sum}')
    ERRORS=$(find "$SUREFIRE_RESULTS" -name "*.xml" -exec grep -h "errors=" {} \; | sed 's/.*errors="\([0-9]*\)".*/\1/' | awk '{sum += $1} END {print sum}')
    
    cat >> "$REPORT_FILE" << EOF
        </p>
        <p><strong>Tests totaux:</strong> ${TOTAL_TESTS:-0}</p>
        <p><strong>Échecs:</strong> <span class="failure">${FAILURES:-0}</span></p>
        <p><strong>Erreurs:</strong> <span class="failure">${ERRORS:-0}</span></p>
        <p><strong>Réussis:</strong> <span class="success">$((${TOTAL_TESTS:-0} - ${FAILURES:-0} - ${ERRORS:-0}))</span></p>
    </div>

    <div class="test-class">
        <h2>🧪 Classes de Tests</h2>
EOF

    # Lister les classes de tests
    for test_file in "$SUREFIRE_RESULTS"/*.xml; do
        if [ -f "$test_file" ]; then
            classname=$(grep -o 'classname="[^"]*"' "$test_file" | head -1 | cut -d'"' -f2)
            echo "        <div class=\"test-method test-success\">" >> "$REPORT_FILE"
            echo "            <h3>📋 $classname</h3>" >> "$REPORT_FILE"
            echo "        </div>" >> "$REPORT_FILE"
        fi
    done
else
    echo "        </p>" >> "$REPORT_FILE"
    echo "        <p><strong>⚠️ Aucun rapport Surefire trouvé</strong></p>" >> "$REPORT_FILE"
    echo "    </div>" >> "$REPORT_FILE"
fi

cat >> "$REPORT_FILE" << EOF
    </div>

    <div class="test-class">
        <h2>📝 Log Détaillé</h2>
        <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto;">
$(cat "$LOG_FILE" | tail -50)
        </pre>
    </div>

    <div class="summary">
        <h2>🔗 Liens Utiles</h2>
        <p><strong>Log complet:</strong> <a href="file://$LOG_FILE">$LOG_FILE</a></p>
        <p><strong>Rapports Surefire:</strong> <a href="file://$SUREFIRE_RESULTS">$SUREFIRE_RESULTS</a></p>
    </div>
</body>
</html>
EOF

echo ""
echo -e "${GREEN}✅ Tests terminés!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 Résultats:${NC}"

if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo -e "  ${GREEN}✅ Tous les tests ont réussi${NC}"
else
    echo -e "  ${RED}❌ Certains tests ont échoué${NC}"
fi

echo -e "  ⏱️  Durée: ${TEST_DURATION}s"
echo -e "  📊 Rapport HTML: ${REPORT_FILE}"
echo -e "  📝 Log détaillé: ${LOG_FILE}"
echo ""
echo -e "${YELLOW}💡 Pour voir le rapport: open \"$REPORT_FILE\"${NC}"
echo -e "${YELLOW}💡 Pour voir les logs: tail -f \"$LOG_FILE\"${NC}"

# Ouvrir automatiquement le rapport si sur macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${BLUE}🌐 Ouverture du rapport dans le navigateur...${NC}"
    open "$REPORT_FILE"
fi

exit $TEST_EXIT_CODE 