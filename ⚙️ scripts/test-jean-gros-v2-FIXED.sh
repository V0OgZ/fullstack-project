#!/bin/bash

# 🎯 TEST JEAN-GROS v2.0 FIXED - OPTIMISÉ PAR THE DUDE & VINCE VEGA
# Version 2.0 FIXED - 20 juillet 2025 - Compatible macOS
# =============================================
# The Dude: "Take it easy, man. Let's not run the same test twice."
# Vince Vega: "We're gonna run this shit in parallel, I ain't got time to wait."

echo "🎯 TEST JEAN-GROS v2.0 FIXED - ÉDITION DUDE & VEGA (macOS)"
echo "=========================================================="
echo "🎳 The Dude: Analysing what needs to run..."
echo "🔫 Vince Vega: Setting up parallel execution..."
echo ""

# Configuration
REPORT_DIR="rapport-jean-gros-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$REPORT_DIR"
REPORT_FILE="$REPORT_DIR/RAPPORT_COMPLET.md"
TIMEOUT_SECONDS=300  # Vince: "5 minutes max per test, or I shoot it"

# 🎳 THE DUDE SECTION - Analyse intelligente
# ==========================================

echo "🎳 The Dude is analyzing dependencies..."

# Créer un fichier de dépendances
cat > "$REPORT_DIR/test-dependencies.txt" << 'EOF'
# The Dude's Test Analysis
# ========================
# test-complet-final.sh INCLUDES:
#   - test-backend-conformity.sh
#   - test-scenarios-ui.sh
#   - benchmark tests
#   - all HOTS scenarios
#
# SKIP THESE IF RUNNING test-complet-final.sh:
#   - Individual backend tests (maven test covers them)
#   - Individual scenario tests
#
# RUN IN PARALLEL:
#   - Backend compilation
#   - Frontend tests
#   - Different scenario categories
EOF

# 🔫 VINCE VEGA SECTION - Exécution parallèle brutale (macOS compatible)
# ======================================================================

# Fonction pour logger
log() {
    echo "$1"
    echo "$1" >> "$REPORT_FILE"
}

# Fonction pour exécuter avec timeout (macOS compatible)
execute_with_timeout() {
    local name="$1"
    local cmd="$2"
    local output_file="$REPORT_DIR/${name}.log"
    local pid_file="$REPORT_DIR/${name}.pid"
    
    echo "🔫 Vince: Launching $name (max ${TIMEOUT_SECONDS}s)..."
    
    # Lancer en arrière-plan avec timeout macOS compatible
    (
        # Utiliser gtimeout si disponible, sinon utiliser une alternative
        if command -v gtimeout >/dev/null 2>&1; then
            gtimeout $TIMEOUT_SECONDS bash -c "$cmd" > "$output_file" 2>&1
        else
            # Alternative sans timeout - on laisse le processus tourner
            bash -c "$cmd" > "$output_file" 2>&1
        fi
        echo $? > "$REPORT_DIR/${name}.exitcode"
    ) &
    
    # Sauvegarder le PID
    echo $! > "$pid_file"
}

# Début du rapport
cat > "$REPORT_FILE" << EOF
# 📊 RAPPORT JEAN-GROS v2.0 FIXED - DUDE & VEGA EDITION (macOS)
*Généré le $(date)*

## 🎯 OPTIMISATIONS
- 🎳 The Dude: Tests dédupliqués, analyse des dépendances
- 🔫 Vince Vega: Exécution parallèle, timeout brutal
- 🍎 macOS: Compatible avec les systèmes Apple

## 📋 TESTS LANCÉS EN PARALLÈLE

EOF

# Lancer tous les tests en parallèle
echo "🚀 Launching all tests in parallel..."

# Backend tests
execute_with_timeout "backend-compile" "cd backend && mvn compile -DskipTests"
execute_with_timeout "backend-tests" "cd backend && mvn test"

# Scripts de test
execute_with_timeout "causality-wall" "./scripts/test-causality-wall.sh"
execute_with_timeout "vision-temporelle" "./scripts/test-vision-temporelle.sh"
execute_with_timeout "quantum-maze" "./scripts/test-quantum-maze.sh"

# Test final (inclut beaucoup de choses)
execute_with_timeout "test-final-mega" "./scripts/test/test-complet-final.sh"

# Tests rapides
execute_with_timeout "ui-quick" "./scripts/actifs/test-ui-quick.sh"
execute_with_timeout "stress-test" "./scripts/stress-test-moteur.sh"

# Note sur les tests skippés
log "⏭️  SKIPPED: test-backend-conformity (included in test-complet-final)"
log "⏭️  SKIPPED: run-all-hots-scenarios (included in test-complet-final)"

# Attendre que tous les tests se terminent
echo ""
echo "⏳ Waiting for tests to complete..."
WAIT_COUNT=0
RUNNING=1

while [ $RUNNING -gt 0 ]; do
    RUNNING=0
    for pid_file in "$REPORT_DIR"/*.pid; do
        if [ -f "$pid_file" ]; then
            pid=$(cat "$pid_file")
            if kill -0 "$pid" 2>/dev/null; then
                RUNNING=$((RUNNING + 1))
            fi
        fi
    done
    
    # Afficher le statut toutes les 10 secondes
    if [ $((WAIT_COUNT % 10)) -eq 0 ] && [ $RUNNING -gt 0 ]; then
        echo "   Still running: $RUNNING tests..."
    fi
    
    sleep 1
    WAIT_COUNT=$((WAIT_COUNT + 1))
    
    # Vince: "If it takes more than 10 minutes total, we're done"
    if [ $WAIT_COUNT -gt 600 ]; then
        echo "🔫 Vince: TIME'S UP! Killing remaining tests..."
        for pid_file in "$REPORT_DIR"/*.pid; do
            if [ -f "$pid_file" ]; then
                pid=$(cat "$pid_file")
                kill -9 "$pid" 2>/dev/null || true
            fi
        done
        break
    fi
done

# Collecter les résultats
echo ""
echo "📊 Collecting results..."

SUCCESS_COUNT=0
FAIL_COUNT=0
TIMEOUT_COUNT=0

log ""
log "## 📊 RÉSULTATS DES TESTS"
log ""

# Analyser chaque test
for exitcode_file in "$REPORT_DIR"/*.exitcode; do
    if [ -f "$exitcode_file" ]; then
        test_name=$(basename "$exitcode_file" .exitcode)
        output_file="$REPORT_DIR/${test_name}.log"
        
        log "### 🔧 $test_name"
        
        exitcode=$(cat "$exitcode_file")
        if [ "$exitcode" -eq 0 ]; then
            log "✅ **SUCCÈS**"
            SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
        elif [ "$exitcode" -eq 124 ]; then
            log "⏱️ **TIMEOUT** (Vince shot it after ${TIMEOUT_SECONDS}s)"
            TIMEOUT_COUNT=$((TIMEOUT_COUNT + 1))
        else
            log "❌ **ÉCHEC** (code: $exitcode)"
            FAIL_COUNT=$((FAIL_COUNT + 1))
        fi
        
        # Ajouter les dernières lignes du log
        if [ -f "$output_file" ]; then
            log "\`\`\`"
            tail -n 10 "$output_file" >> "$REPORT_FILE"
            log "\`\`\`"
        fi
        log ""
    fi
done

# Analyse rapide des formules (The Dude style)
log "## 🎳 THE DUDE'S FORMULA ANALYSIS"
log ""
log "### Real formulas found:"
log "\`\`\`"
grep -r "formula.*CONSTRUCTIVE\|DESTRUCTIVE\|AMPLIFY\|TELEPORT" --include="*.json" . 2>/dev/null | grep -v node_modules | head -20 >> "$REPORT_FILE" || echo "No formulas found" >> "$REPORT_FILE"
log "\`\`\`"

# Stats finales
TOTAL_TESTS=$((SUCCESS_COUNT + FAIL_COUNT + TIMEOUT_COUNT))
SUCCESS_RATE=0
if [ $TOTAL_TESTS -gt 0 ]; then
    SUCCESS_RATE=$(( SUCCESS_COUNT * 100 / TOTAL_TESTS ))
fi

log ""
log "## 📊 STATISTIQUES FINALES"
log ""
log "- ✅ Tests réussis : $SUCCESS_COUNT"
log "- ❌ Tests échoués : $FAIL_COUNT"  
log "- ⏱️ Tests timeout : $TIMEOUT_COUNT"
log "- 📊 Taux de réussite : ${SUCCESS_RATE}%"
log "- ⏰ Temps total : ${WAIT_COUNT}s"
log ""

# Recommandations finales
log "## 💡 RECOMMANDATIONS"
log ""
log "### 🎳 The Dude says:"
log "- \"Man, check out those timeout tests, they might be infinite loops\""
log "- \"Those JSON formulas need some love, lots of fake ones\""
log ""
log "### 🔫 Vince Vega says:"
log "- \"Next time, we run even MORE in parallel\""
log "- \"Those slow tests? They're dead to me\""
log ""

# Sauvegarder les messages de Jean
if [ -f "MEMENTO/JEAN_MESSAGES_BEST_OF.md" ]; then
    cp "MEMENTO/JEAN_MESSAGES_BEST_OF.md" "$REPORT_DIR/"
    log "### 💾 Messages de Jean sauvegardés dans: $REPORT_DIR/JEAN_MESSAGES_BEST_OF.md"
fi

# Affichage final
echo ""
echo "✅ TEST JEAN-GROS v2.0 FIXED TERMINÉ !"
echo ""
echo "📊 Résultats :"
echo "  - Tests réussis : $SUCCESS_COUNT"
echo "  - Tests échoués : $FAIL_COUNT"
echo "  - Tests timeout : $TIMEOUT_COUNT"
echo "  - Temps total : ${WAIT_COUNT}s"
echo ""
echo "📁 Rapport : $REPORT_FILE"
echo ""
echo "🎳 The Dude: \"That's just, like, your test results, man.\""
echo "🔫 Vince: \"Check out the big brain on Brad! We're done here.\"" 