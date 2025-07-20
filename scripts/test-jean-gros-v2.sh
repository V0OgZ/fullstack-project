#!/bin/bash

# 🎯 TEST JEAN-GROS v2.0 - OPTIMISÉ PAR THE DUDE & VINCE VEGA
# Version 2.0 - 20 juillet 2025
# =============================================
# The Dude: "Take it easy, man. Let's not run the same test twice."
# Vince Vega: "We're gonna run this shit in parallel, I ain't got time to wait."

echo "🎯 TEST JEAN-GROS v2.0 - ÉDITION DUDE & VEGA"
echo "============================================"
echo "🎳 The Dude: Analysing what needs to run..."
echo "🔫 Vince Vega: Setting up parallel execution..."
echo ""

# Configuration
REPORT_DIR="rapport-jean-gros-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$REPORT_DIR"
REPORT_FILE="$REPORT_DIR/RAPPORT_COMPLET.md"
TIMEOUT_SECONDS=300  # Vince: "5 minutes max per test, or I shoot it"
MAX_PARALLEL=5      # Nombre de tests en parallèle

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

# Liste des tests à exécuter (sans doublons)
declare -A TESTS_TO_RUN=(
    ["backend-compile"]="cd backend && mvn compile -DskipTests"
    ["backend-tests"]="cd backend && mvn test"
    ["causality-wall"]="./scripts/test-causality-wall.sh"
    ["vision-temporelle"]="./scripts/test-vision-temporelle.sh"
    ["quantum-maze"]="./scripts/test-quantum-maze.sh"
    ["test-final-mega"]="./scripts/test/test-complet-final.sh"
    ["ui-quick"]="./scripts/actifs/test-ui-quick.sh"
    ["stress-test"]="timeout 60 ./scripts/stress-test-moteur.sh"  # Vince: "60 seconds max"
)

# Tests à NE PAS exécuter (car inclus dans test-complet-final)
declare -A SKIP_TESTS=(
    ["test-backend-conformity"]="Included in test-complet-final"
    ["test-scenarios-ui"]="Included in test-complet-final"
    ["run-all-hots-scenarios"]="Included in test-complet-final"
)

# 🔫 VINCE VEGA SECTION - Exécution parallèle brutale
# ===================================================

# Fonction pour logger
log() {
    echo "$1"
    echo "$1" >> "$REPORT_FILE"
}

# Fonction pour exécuter avec timeout (Vince style)
execute_with_timeout() {
    local name="$1"
    local cmd="$2"
    local output_file="$REPORT_DIR/${name}.log"
    local pid_file="$REPORT_DIR/${name}.pid"
    
    echo "🔫 Vince: Launching $name (max ${TIMEOUT_SECONDS}s)..."
    
    # Lancer en arrière-plan avec timeout
    (
        timeout $TIMEOUT_SECONDS bash -c "$cmd" > "$output_file" 2>&1
        echo $? > "$REPORT_DIR/${name}.exitcode"
    ) &
    
    # Sauvegarder le PID
    echo $! > "$pid_file"
}

# Début du rapport
cat > "$REPORT_FILE" << EOF
# 📊 RAPPORT JEAN-GROS v2.0 - DUDE & VEGA EDITION
*Généré le $(date)*

## 🎯 OPTIMISATIONS
- 🎳 The Dude: Tests dédupliqués, analyse des dépendances
- 🔫 Vince Vega: Exécution parallèle, timeout brutal

## 📋 TESTS LANCÉS EN PARALLÈLE

EOF

# Lancer tous les tests en parallèle
echo "🚀 Launching all tests in parallel..."
for test_name in "${!TESTS_TO_RUN[@]}"; do
    if [[ -z "${SKIP_TESTS[$test_name]}" ]]; then
        execute_with_timeout "$test_name" "${TESTS_TO_RUN[$test_name]}"
    else
        log "⏭️  SKIPPED: $test_name (${SKIP_TESTS[$test_name]})"
    fi
done

# Attendre que tous les tests se terminent (avec vérification périodique)
echo ""
echo "⏳ Waiting for tests to complete..."
WAIT_COUNT=0
while true; do
    RUNNING=0
    for test_name in "${!TESTS_TO_RUN[@]}"; do
        pid_file="$REPORT_DIR/${test_name}.pid"
        if [[ -f "$pid_file" ]]; then
            pid=$(cat "$pid_file")
            if kill -0 "$pid" 2>/dev/null; then
                RUNNING=$((RUNNING + 1))
            fi
        fi
    done
    
    if [[ $RUNNING -eq 0 ]]; then
        break
    fi
    
    # Afficher le statut toutes les 10 secondes
    if [[ $((WAIT_COUNT % 10)) -eq 0 ]]; then
        echo "   Still running: $RUNNING tests..."
    fi
    
    sleep 1
    WAIT_COUNT=$((WAIT_COUNT + 1))
    
    # Vince: "If it takes more than 10 minutes total, we're done"
    if [[ $WAIT_COUNT -gt 600 ]]; then
        echo "🔫 Vince: TIME'S UP! Killing remaining tests..."
        for test_name in "${!TESTS_TO_RUN[@]}"; do
            pid_file="$REPORT_DIR/${test_name}.pid"
            if [[ -f "$pid_file" ]]; then
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

for test_name in "${!TESTS_TO_RUN[@]}"; do
    if [[ -n "${SKIP_TESTS[$test_name]}" ]]; then
        continue
    fi
    
    exitcode_file="$REPORT_DIR/${test_name}.exitcode"
    output_file="$REPORT_DIR/${test_name}.log"
    
    log "### 🔧 $test_name"
    
    if [[ -f "$exitcode_file" ]]; then
        exitcode=$(cat "$exitcode_file")
        if [[ "$exitcode" -eq 0 ]]; then
            log "✅ **SUCCÈS**"
            SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
        elif [[ "$exitcode" -eq 124 ]]; then
            log "⏱️ **TIMEOUT** (Vince shot it after ${TIMEOUT_SECONDS}s)"
            TIMEOUT_COUNT=$((TIMEOUT_COUNT + 1))
        else
            log "❌ **ÉCHEC** (code: $exitcode)"
            FAIL_COUNT=$((FAIL_COUNT + 1))
        fi
    else
        log "💀 **KILLED** (Vince got impatient)"
        FAIL_COUNT=$((FAIL_COUNT + 1))
    fi
    
    # Ajouter les dernières lignes du log
    if [[ -f "$output_file" ]]; then
        log "```"
        tail -n 10 "$output_file" >> "$REPORT_FILE"
        log "```"
    fi
    log ""
done

# Analyse rapide des formules (The Dude style)
log "## 🎳 THE DUDE'S FORMULA ANALYSIS"
log ""
log "### Real formulas found:"
log "```"
grep -r "formula.*CONSTRUCTIVE\|DESTRUCTIVE\|AMPLIFY\|TELEPORT" --include="*.json" . | grep -v node_modules | head -20 >> "$REPORT_FILE"
log "```"

# Stats finales
TOTAL_TESTS=$((SUCCESS_COUNT + FAIL_COUNT + TIMEOUT_COUNT))
SUCCESS_RATE=0
if [[ $TOTAL_TESTS -gt 0 ]]; then
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
if [[ -f "JEAN_MESSAGES.md" ]]; then
    cp "JEAN_MESSAGES.md" "$REPORT_DIR/"
    log "### 💾 Messages de Jean sauvegardés dans: $REPORT_DIR/JEAN_MESSAGES.md"
fi

# Affichage final
echo ""
echo "✅ TEST JEAN-GROS v2.0 TERMINÉ !"
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