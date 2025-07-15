#!/bin/bash

# 🧪 Heroes of Time - Tests Complets avec Rapport Détaillé
# Script pour lancer tous les tests (frontend + backend) avec rapport consolidé

set -e

echo "🎯 Heroes of Time - Tests Complets avec Rapport"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEST_RESULTS_DIR="$PROJECT_ROOT/test-results"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
COMBINED_REPORT="$TEST_RESULTS_DIR/combined-test-report-$TIMESTAMP.html"
LOG_FILE="$TEST_RESULTS_DIR/combined-tests-$TIMESTAMP.log"

# Créer le répertoire de résultats
mkdir -p "$TEST_RESULTS_DIR"

echo -e "${BLUE}🔍 Configuration des tests complets${NC}"
echo "  📁 Répertoire projet: $PROJECT_ROOT"
echo "  📊 Rapport combiné: $COMBINED_REPORT"
echo "  📝 Log détaillé: $LOG_FILE"
echo ""

# Fonction pour afficher l'heure
timestamp() {
    date "+%H:%M:%S"
}

# Initialiser le rapport HTML
cat > "$COMBINED_REPORT" << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Heroes of Time - Rapport Tests Complets</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; }
        .summary { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 10px; border-left: 5px solid #007bff; }
        .test-section { margin: 20px 0; padding: 20px; border: 2px solid #ddd; border-radius: 10px; }
        .backend-section { border-color: #28a745; }
        .frontend-section { border-color: #007bff; }
        .success { color: #28a745; font-weight: bold; }
        .failure { color: #dc3545; font-weight: bold; }
        .warning { color: #ffc107; font-weight: bold; }
        .info { color: #17a2b8; font-weight: bold; }
        .timestamp { font-size: 0.9em; color: #666; font-style: italic; }
        .duration { font-weight: bold; color: #007bff; }
        .log-section { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .log-content { background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 5px; font-family: monospace; font-size: 0.9em; overflow-x: auto; }
        .test-stats { display: flex; justify-content: space-around; margin: 20px 0; }
        .stat-box { text-align: center; padding: 15px; background: #f8f9fa; border-radius: 10px; min-width: 120px; }
        .progress-bar { width: 100%; height: 20px; background: #e9ecef; border-radius: 10px; margin: 10px 0; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #28a745, #20c997); border-radius: 10px; transition: width 0.3s ease; }
    </style>
</head>
<body>
    <div class="header">
        <h1>⚔️ Heroes of Time - Tests Complets</h1>
        <p class="timestamp">Rapport généré le TIMESTAMP_PLACEHOLDER</p>
    </div>

    <div class="summary">
        <h2>📊 Résumé Général</h2>
        <div class="test-stats">
            <div class="stat-box">
                <h3>⏱️ Durée Totale</h3>
                <p class="duration">DURATION_PLACEHOLDER</p>
            </div>
            <div class="stat-box">
                <h3>🎯 Statut Global</h3>
                <p class="STATUS_CLASS_PLACEHOLDER">STATUS_PLACEHOLDER</p>
            </div>
            <div class="stat-box">
                <h3>📋 Tests Lancés</h3>
                <p class="info">TOTAL_TESTS_PLACEHOLDER</p>
            </div>
        </div>
    </div>

    <div class="test-section backend-section">
        <h2>🔧 Tests Backend (Java/Spring Boot)</h2>
        <p><strong>Tests unitaires:</strong> BACKEND_TESTS_PLACEHOLDER</p>
        <p><strong>Statut:</strong> <span class="BACKEND_STATUS_CLASS_PLACEHOLDER">BACKEND_STATUS_PLACEHOLDER</span></p>
        <p><strong>Durée:</strong> BACKEND_DURATION_PLACEHOLDER</p>
        
        <div class="log-section">
            <h3>📝 Log Backend</h3>
            <div class="log-content">
BACKEND_LOG_PLACEHOLDER
            </div>
        </div>
    </div>

    <div class="test-section frontend-section">
        <h2>🎨 Tests Frontend (React/TypeScript)</h2>
        <p><strong>Tests E2E:</strong> FRONTEND_TESTS_PLACEHOLDER</p>
        <p><strong>Statut:</strong> <span class="FRONTEND_STATUS_CLASS_PLACEHOLDER">FRONTEND_STATUS_PLACEHOLDER</span></p>
        <p><strong>Durée:</strong> FRONTEND_DURATION_PLACEHOLDER</p>
        
        <div class="log-section">
            <h3>📝 Log Frontend</h3>
            <div class="log-content">
FRONTEND_LOG_PLACEHOLDER
            </div>
        </div>
    </div>

    <div class="summary">
        <h2>🔗 Liens Utiles</h2>
        <p><strong>📁 Répertoire des résultats:</strong> <a href="file://TEST_RESULTS_DIR_PLACEHOLDER">TEST_RESULTS_DIR_PLACEHOLDER</a></p>
        <p><strong>📝 Log complet:</strong> <a href="file://LOG_FILE_PLACEHOLDER">LOG_FILE_PLACEHOLDER</a></p>
        <p><strong>🎮 Lancer démo:</strong> <code>./frontend/start-demo.sh</code></p>
        <p><strong>🚀 Lancer app:</strong> <code>./start-app.sh</code></p>
    </div>
</body>
</html>
EOF

# Démarrer les tests
GLOBAL_START_TIME=$(date +%s)
echo -e "${PURPLE}🎯 Démarrage des tests complets à $(timestamp)${NC}" | tee -a "$LOG_FILE"

# Variables pour les résultats
BACKEND_SUCCESS=false
FRONTEND_SUCCESS=false
BACKEND_DURATION=0
FRONTEND_DURATION=0

echo -e "${BLUE}🔧 Phase 1: Tests Backend${NC}" | tee -a "$LOG_FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Lancer les tests backend
BACKEND_START_TIME=$(date +%s)
if [ -f "backend/test-backend-unit.sh" ]; then
    echo -e "${BLUE}⚙️  Lancement des tests unitaires backend...${NC}" | tee -a "$LOG_FILE"
    
    # Créer un log temporaire pour le backend
    BACKEND_LOG_TEMP="$TEST_RESULTS_DIR/backend-temp-$TIMESTAMP.log"
    
    if ./backend/test-backend-unit.sh > "$BACKEND_LOG_TEMP" 2>&1; then
        BACKEND_SUCCESS=true
        echo -e "${GREEN}✅ Tests backend RÉUSSIS${NC}" | tee -a "$LOG_FILE"
    else
        BACKEND_SUCCESS=false
        echo -e "${RED}❌ Tests backend ÉCHOUÉS${NC}" | tee -a "$LOG_FILE"
    fi
    
    # Ajouter le log backend au log principal
    echo "=== LOG BACKEND ===" >> "$LOG_FILE"
    cat "$BACKEND_LOG_TEMP" >> "$LOG_FILE"
    echo "=== FIN LOG BACKEND ===" >> "$LOG_FILE"
else
    echo -e "${YELLOW}⚠️  Script de tests backend non trouvé${NC}" | tee -a "$LOG_FILE"
fi

BACKEND_END_TIME=$(date +%s)
BACKEND_DURATION=$((BACKEND_END_TIME - BACKEND_START_TIME))

echo ""
echo -e "${BLUE}🎨 Phase 2: Tests Frontend${NC}" | tee -a "$LOG_FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Lancer les tests frontend
FRONTEND_START_TIME=$(date +%s)
if [ -f "frontend/package.json" ]; then
    echo -e "${BLUE}⚙️  Lancement des tests E2E frontend...${NC}" | tee -a "$LOG_FILE"
    
    # Créer un log temporaire pour le frontend
    FRONTEND_LOG_TEMP="$TEST_RESULTS_DIR/frontend-temp-$TIMESTAMP.log"
    
    # Vérifier si les serveurs sont lancés
    if ! curl -s http://localhost:3000 > /dev/null 2>&1 || ! curl -s http://localhost:8080 > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Serveurs non lancés - démarrage automatique${NC}" | tee -a "$LOG_FILE"
        ./start-app.sh > /dev/null 2>&1 &
        sleep 10
    fi
    
    # Lancer les tests Playwright
    cd frontend
    if npx playwright test --reporter=html > "$FRONTEND_LOG_TEMP" 2>&1; then
        FRONTEND_SUCCESS=true
        echo -e "${GREEN}✅ Tests frontend RÉUSSIS${NC}" | tee -a "$LOG_FILE"
    else
        FRONTEND_SUCCESS=false
        echo -e "${RED}❌ Tests frontend ÉCHOUÉS${NC}" | tee -a "$LOG_FILE"
    fi
    cd ..
    
    # Ajouter le log frontend au log principal
    echo "=== LOG FRONTEND ===" >> "$LOG_FILE"
    cat "$FRONTEND_LOG_TEMP" >> "$LOG_FILE"
    echo "=== FIN LOG FRONTEND ===" >> "$LOG_FILE"
else
    echo -e "${YELLOW}⚠️  Répertoire frontend non trouvé${NC}" | tee -a "$LOG_FILE"
fi

FRONTEND_END_TIME=$(date +%s)
FRONTEND_DURATION=$((FRONTEND_END_TIME - FRONTEND_START_TIME))

# Calculer la durée totale
GLOBAL_END_TIME=$(date +%s)
GLOBAL_DURATION=$((GLOBAL_END_TIME - GLOBAL_START_TIME))

echo ""
echo -e "${PURPLE}🎯 Génération du rapport final${NC}" | tee -a "$LOG_FILE"

# Déterminer le statut global
if [ "$BACKEND_SUCCESS" = true ] && [ "$FRONTEND_SUCCESS" = true ]; then
    GLOBAL_STATUS="✅ TOUS LES TESTS RÉUSSIS"
    GLOBAL_STATUS_CLASS="success"
elif [ "$BACKEND_SUCCESS" = true ] || [ "$FRONTEND_SUCCESS" = true ]; then
    GLOBAL_STATUS="⚠️ TESTS PARTIELLEMENT RÉUSSIS"
    GLOBAL_STATUS_CLASS="warning"
else
    GLOBAL_STATUS="❌ ÉCHECS DÉTECTÉS"
    GLOBAL_STATUS_CLASS="failure"
fi

# Remplir le rapport HTML
sed -i.bak "s/TIMESTAMP_PLACEHOLDER/$(date)/g" "$COMBINED_REPORT"
sed -i.bak "s/DURATION_PLACEHOLDER/${GLOBAL_DURATION}s/g" "$COMBINED_REPORT"
sed -i.bak "s/STATUS_PLACEHOLDER/$GLOBAL_STATUS/g" "$COMBINED_REPORT"
sed -i.bak "s/STATUS_CLASS_PLACEHOLDER/$GLOBAL_STATUS_CLASS/g" "$COMBINED_REPORT"
sed -i.bak "s/TOTAL_TESTS_PLACEHOLDER/Backend + Frontend/g" "$COMBINED_REPORT"

# Statut backend
if [ "$BACKEND_SUCCESS" = true ]; then
    sed -i.bak "s/BACKEND_STATUS_PLACEHOLDER/✅ RÉUSSI/g" "$COMBINED_REPORT"
    sed -i.bak "s/BACKEND_STATUS_CLASS_PLACEHOLDER/success/g" "$COMBINED_REPORT"
else
    sed -i.bak "s/BACKEND_STATUS_PLACEHOLDER/❌ ÉCHOUÉ/g" "$COMBINED_REPORT"
    sed -i.bak "s/BACKEND_STATUS_CLASS_PLACEHOLDER/failure/g" "$COMBINED_REPORT"
fi

# Statut frontend
if [ "$FRONTEND_SUCCESS" = true ]; then
    sed -i.bak "s/FRONTEND_STATUS_PLACEHOLDER/✅ RÉUSSI/g" "$COMBINED_REPORT"
    sed -i.bak "s/FRONTEND_STATUS_CLASS_PLACEHOLDER/success/g" "$COMBINED_REPORT"
else
    sed -i.bak "s/FRONTEND_STATUS_PLACEHOLDER/❌ ÉCHOUÉ/g" "$COMBINED_REPORT"
    sed -i.bak "s/FRONTEND_STATUS_CLASS_PLACEHOLDER/failure/g" "$COMBINED_REPORT"
fi

sed -i.bak "s/BACKEND_DURATION_PLACEHOLDER/${BACKEND_DURATION}s/g" "$COMBINED_REPORT"
sed -i.bak "s/FRONTEND_DURATION_PLACEHOLDER/${FRONTEND_DURATION}s/g" "$COMBINED_REPORT"
sed -i.bak "s/BACKEND_TESTS_PLACEHOLDER/Tests JUnit/g" "$COMBINED_REPORT"
sed -i.bak "s/FRONTEND_TESTS_PLACEHOLDER/Tests Playwright/g" "$COMBINED_REPORT"

# Ajouter les logs (échappés pour HTML)
if [ -f "$BACKEND_LOG_TEMP" ]; then
    BACKEND_LOG_ESCAPED=$(cat "$BACKEND_LOG_TEMP" | tail -30 | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')
    sed -i.bak "s/BACKEND_LOG_PLACEHOLDER/$BACKEND_LOG_ESCAPED/g" "$COMBINED_REPORT"
fi

if [ -f "$FRONTEND_LOG_TEMP" ]; then
    FRONTEND_LOG_ESCAPED=$(cat "$FRONTEND_LOG_TEMP" | tail -30 | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')
    sed -i.bak "s/FRONTEND_LOG_PLACEHOLDER/$FRONTEND_LOG_ESCAPED/g" "$COMBINED_REPORT"
fi

# Remplacer les placeholders finaux
sed -i.bak "s|TEST_RESULTS_DIR_PLACEHOLDER|$TEST_RESULTS_DIR|g" "$COMBINED_REPORT"
sed -i.bak "s|LOG_FILE_PLACEHOLDER|$LOG_FILE|g" "$COMBINED_REPORT"

# Nettoyer les fichiers temporaires
rm -f "$COMBINED_REPORT.bak"
rm -f "$BACKEND_LOG_TEMP" "$FRONTEND_LOG_TEMP"

echo ""
echo -e "${GREEN}✅ Tests terminés!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 Résultats Globaux:${NC}"
echo -e "  🎯 Statut: $GLOBAL_STATUS"
echo -e "  ⏱️  Durée totale: ${GLOBAL_DURATION}s"
echo -e "  🔧 Backend: $([ "$BACKEND_SUCCESS" = true ] && echo "${GREEN}✅ RÉUSSI${NC}" || echo "${RED}❌ ÉCHOUÉ${NC}") (${BACKEND_DURATION}s)"
echo -e "  🎨 Frontend: $([ "$FRONTEND_SUCCESS" = true ] && echo "${GREEN}✅ RÉUSSI${NC}" || echo "${RED}❌ ÉCHOUÉ${NC}") (${FRONTEND_DURATION}s)"
echo ""
echo -e "${YELLOW}📊 Rapport HTML: $COMBINED_REPORT${NC}"
echo -e "${YELLOW}📝 Log complet: $LOG_FILE${NC}"
echo ""
echo -e "${PURPLE}💡 Commandes utiles:${NC}"
echo -e "  ${BLUE}🌐 Voir rapport: open \"$COMBINED_REPORT\"${NC}"
echo -e "  ${BLUE}📝 Voir logs: tail -f \"$LOG_FILE\"${NC}"
echo -e "  ${BLUE}🎮 Lancer démo: ./frontend/start-demo.sh${NC}"

# Ouvrir automatiquement le rapport si sur macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${BLUE}🌐 Ouverture du rapport dans le navigateur...${NC}"
    open "$COMBINED_REPORT"
fi

# Code de sortie basé sur le succès global
if [ "$BACKEND_SUCCESS" = true ] && [ "$FRONTEND_SUCCESS" = true ]; then
    exit 0
else
    exit 1
fi 