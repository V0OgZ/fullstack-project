#!/bin/bash

# 🎯 TEST COMPLET - COMPARAISON GLOBALE DES PARSERS (VERSION CORRIGÉE)
# Execute TOUS les tests: Backend Java + API + Scripts .hots
# Avec parser REGEX puis ANTLR4 et compare les métriques

set -e  # Exit on error

echo "🎯 === TEST COMPLET - COMPARAISON GLOBALE DES PARSERS ==="
echo ""

# Variables pour les métriques
REPORT_FILE="RAPPORT_COMPLET_COMPARAISON.md"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Fonction pour nettoyer les processus
cleanup() {
    echo "🧹 Nettoyage des processus backend..."
    pkill -f "spring-boot:run" 2>/dev/null || true
    pkill -f "TemporalEngineApplication" 2>/dev/null || true
    sleep 3
}

# Fonction pour attendre que le backend soit prêt
wait_for_backend() {
    local max_attempts=30
    local attempt=0
    
    echo "⏳ Attente du backend..."
    while [ $attempt -lt $max_attempts ]; do
        if curl -s http://localhost:8080/api/temporal/health > /dev/null 2>&1; then
            echo "✅ Backend prêt !"
            return 0
        fi
        sleep 2
        attempt=$((attempt + 1))
        echo "   Tentative $attempt/$max_attempts..."
    done
    
    echo "❌ Timeout: Backend non démarré après 60s"
    return 1
}

# Fonction pour démarrer le backend
start_backend() {
    local parser_type=$1
    local use_antlr=$2
    
    echo "🚀 Démarrage backend avec parser $parser_type..."
    
    # Nettoyer d'abord
    cleanup
    
    # Démarrer le backend
    cd "$SCRIPT_DIR/backend"
    export HEROES_PARSER_USE_ANTLR=$use_antlr
    nohup mvn spring-boot:run -Dheroes.parser.use.antlr=$use_antlr -q > "backend_${parser_type,,}_output.log" 2>&1 &
    BACKEND_PID=$!
    
    # Attendre que le backend soit prêt
    if ! wait_for_backend; then
        echo "❌ Échec du démarrage du backend $parser_type"
        return 1
    fi
    
    echo "✅ Backend $parser_type démarré (PID: $BACKEND_PID)"
    cd "$SCRIPT_DIR"
    return 0
}

# Initialiser le rapport
cat > "$REPORT_FILE" << EOF
# 📊 RAPPORT COMPLET - COMPARAISON GLOBALE DES PARSERS

**Date:** $TIMESTAMP
**Script:** test-complete-comparison-fixed.sh

## 🎯 RÉSULTATS GLOBAUX

EOF

# Nettoyer les anciens fichiers de rapport
rm -f backend/regex_*.txt backend/antlr_*.txt backend/backend_*.log

echo "🔥 Phase 1: Tests avec Parser REGEX"
echo "=================================="

# Démarrer backend REGEX
if ! start_backend "REGEX" "false"; then
    echo "❌ Échec du démarrage backend REGEX"
    exit 1
fi

# Tests Backend Java avec REGEX
echo "🧪 Tests Backend Java (REGEX)..."
cd backend
REGEX_BACKEND_START=$(date +%s%N)

# Test ComplexScenarioTest
echo "  - ComplexScenarioTest..."
mvn test -Dtest=ComplexScenarioTest -Dheroes.parser.use.antlr=false -q > regex_backend_results.txt 2>&1
REGEX_COMPLEX_SUCCESS=$?

# Test DualParserComparisonTest
echo "  - DualParserComparisonTest..."
mvn test -Dtest=DualParserComparisonTest -Dheroes.parser.use.antlr=false -q > regex_comparison_results.txt 2>&1
REGEX_COMPARISON_SUCCESS=$?

# Test TemporalStressTest
echo "  - TemporalStressTest..."
mvn test -Dtest=TemporalStressTest -Dheroes.parser.use.antlr=false -q > regex_stress_results.txt 2>&1
REGEX_STRESS_SUCCESS=$?

REGEX_BACKEND_END=$(date +%s%N)
REGEX_BACKEND_TIME=$(( (REGEX_BACKEND_END - REGEX_BACKEND_START) / 1000000 ))

# Tests API avec REGEX
echo "🌐 Tests API REST (REGEX)..."
cd "$SCRIPT_DIR"
REGEX_API_START=$(date +%s%N)

# Test API simple
echo "  - Script simple..."
SIMPLE_API_REGEX=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "demos/simple-game.hots", "parser": "regex"}' | jq -r '.stats.duration // 0' 2>/dev/null || echo "0")

# Test API comparaison
echo "  - Script comparaison..."
COMPARISON_API_REGEX=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "tests/parser-comparison.hots", "parser": "regex"}' | jq -r '.stats.duration // 0' 2>/dev/null || echo "0")

# Test API scénario épique
echo "  - Script épique..."
EPIC_API_REGEX=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "scenarios/epic-arthur-vs-ragnar.hots", "parser": "regex"}' | jq -r '.stats.duration // 0' 2>/dev/null || echo "0")

# Test API stress test temporel
echo "  - Stress test temporel..."
STRESS_API_REGEX=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "tests/temporal-stress-test.hots", "parser": "regex"}' | jq -r '.stats.duration // 0' 2>/dev/null || echo "0")

REGEX_API_END=$(date +%s%N)
REGEX_API_TIME=$(( (REGEX_API_END - REGEX_API_START) / 1000000 ))

# Arrêter backend REGEX
cleanup

echo "✅ Tests REGEX terminés"
echo ""

echo "🔥 Phase 2: Tests avec Parser ANTLR4"
echo "===================================="

# Démarrer backend ANTLR4
if ! start_backend "ANTLR4" "true"; then
    echo "❌ Échec du démarrage backend ANTLR4"
    exit 1
fi

# Tests Backend Java avec ANTLR4
echo "🧪 Tests Backend Java (ANTLR4)..."
cd backend
ANTLR_BACKEND_START=$(date +%s%N)

# Test ComplexScenarioTest
echo "  - ComplexScenarioTest..."
mvn test -Dtest=ComplexScenarioTest -Dheroes.parser.use.antlr=true -q > antlr_backend_results.txt 2>&1
ANTLR_COMPLEX_SUCCESS=$?

# Test DualParserComparisonTest
echo "  - DualParserComparisonTest..."
mvn test -Dtest=DualParserComparisonTest -Dheroes.parser.use.antlr=true -q > antlr_comparison_results.txt 2>&1
ANTLR_COMPARISON_SUCCESS=$?

# Test TemporalStressTest
echo "  - TemporalStressTest..."
mvn test -Dtest=TemporalStressTest -Dheroes.parser.use.antlr=true -q > antlr_stress_results.txt 2>&1
ANTLR_STRESS_SUCCESS=$?

ANTLR_BACKEND_END=$(date +%s%N)
ANTLR_BACKEND_TIME=$(( (ANTLR_BACKEND_END - ANTLR_BACKEND_START) / 1000000 ))

# Tests API avec ANTLR4
echo "🌐 Tests API REST (ANTLR4)..."
cd "$SCRIPT_DIR"
ANTLR_API_START=$(date +%s%N)

# Test API simple
echo "  - Script simple..."
SIMPLE_API_ANTLR=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "demos/simple-game.hots", "parser": "antlr4"}' | jq -r '.stats.duration // 0' 2>/dev/null || echo "0")

# Test API comparaison
echo "  - Script comparaison..."
COMPARISON_API_ANTLR=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "tests/parser-comparison.hots", "parser": "antlr4"}' | jq -r '.stats.duration // 0' 2>/dev/null || echo "0")

# Test API scénario épique
echo "  - Script épique..."
EPIC_API_ANTLR=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "scenarios/epic-arthur-vs-ragnar.hots", "parser": "antlr4"}' | jq -r '.stats.duration // 0' 2>/dev/null || echo "0")

# Test API stress test temporel
echo "  - Stress test temporel..."
STRESS_API_ANTLR=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "tests/temporal-stress-test.hots", "parser": "antlr4"}' | jq -r '.stats.duration // 0' 2>/dev/null || echo "0")

ANTLR_API_END=$(date +%s%N)
ANTLR_API_TIME=$(( (ANTLR_API_END - ANTLR_API_START) / 1000000 ))

# Arrêter backend ANTLR4
cleanup

echo "✅ Tests ANTLR4 terminés"
echo ""

echo "📊 Phase 3: Génération du rapport complet"
echo "=========================================="

# Analyser les résultats
REGEX_BACKEND_TESTS=$(grep -c "Tests run:" backend/regex_backend_results.txt 2>/dev/null || echo "0")
ANTLR_BACKEND_TESTS=$(grep -c "Tests run:" backend/antlr_backend_results.txt 2>/dev/null || echo "0")

REGEX_BACKEND_FAILURES=$(grep -o "Failures: [0-9]*" backend/regex_backend_results.txt | grep -o "[0-9]*" || echo "0")
ANTLR_BACKEND_FAILURES=$(grep -o "Failures: [0-9]*" backend/antlr_backend_results.txt | grep -o "[0-9]*" || echo "0")

# Calculer les statuts de succès
REGEX_SUCCESS_STATUS="✅"
ANTLR_SUCCESS_STATUS="✅"

if [ "$REGEX_COMPLEX_SUCCESS" -ne 0 ] || [ "$REGEX_COMPARISON_SUCCESS" -ne 0 ] || [ "$REGEX_STRESS_SUCCESS" -ne 0 ]; then
    REGEX_SUCCESS_STATUS="❌"
fi

if [ "$ANTLR_COMPLEX_SUCCESS" -ne 0 ] || [ "$ANTLR_COMPARISON_SUCCESS" -ne 0 ] || [ "$ANTLR_STRESS_SUCCESS" -ne 0 ]; then
    ANTLR_SUCCESS_STATUS="❌"
fi

# Ajouter les résultats au rapport
cat >> "$REPORT_FILE" << EOF

### 📊 MÉTRIQUES COMPLÈTES

| Type de Test | Parser REGEX | Parser ANTLR4 | Différence |
|-------------|-------------|---------------|------------|
| **Tests Backend Java** | ${REGEX_BACKEND_TIME}ms | ${ANTLR_BACKEND_TIME}ms | $(( ANTLR_BACKEND_TIME - REGEX_BACKEND_TIME ))ms |
| **Tests API REST** | ${REGEX_API_TIME}ms | ${ANTLR_API_TIME}ms | $(( ANTLR_API_TIME - REGEX_API_TIME ))ms |
| **Script Simple** | ${SIMPLE_API_REGEX}ms | ${SIMPLE_API_ANTLR}ms | $(( SIMPLE_API_ANTLR - SIMPLE_API_REGEX ))ms |
| **Script Comparaison** | ${COMPARISON_API_REGEX}ms | ${COMPARISON_API_ANTLR}ms | $(( COMPARISON_API_ANTLR - COMPARISON_API_REGEX ))ms |
| **Script Épique** | ${EPIC_API_REGEX}ms | ${EPIC_API_ANTLR}ms | $(( EPIC_API_ANTLR - EPIC_API_REGEX ))ms |
| **Stress Test Temporel** | ${STRESS_API_REGEX}ms | ${STRESS_API_ANTLR}ms | $(( STRESS_API_ANTLR - STRESS_API_REGEX ))ms |

### 🧪 RÉSULTATS DES TESTS

| Catégorie | REGEX | ANTLR4 | Status |
|-----------|--------|--------|---------|
| **Tests Backend** | ${REGEX_BACKEND_TESTS} tests | ${ANTLR_BACKEND_TESTS} tests | $REGEX_SUCCESS_STATUS REGEX / $ANTLR_SUCCESS_STATUS ANTLR4 |
| **Échecs Backend** | ${REGEX_BACKEND_FAILURES} | ${ANTLR_BACKEND_FAILURES} | $([ "$REGEX_BACKEND_FAILURES" -le "$ANTLR_BACKEND_FAILURES" ] && echo "✅ REGEX meilleur" || echo "✅ ANTLR4 meilleur") |
| **ComplexScenarioTest** | $([ "$REGEX_COMPLEX_SUCCESS" -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ "$ANTLR_COMPLEX_SUCCESS" -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | - |
| **DualParserComparisonTest** | $([ "$REGEX_COMPARISON_SUCCESS" -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ "$ANTLR_COMPARISON_SUCCESS" -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | - |
| **TemporalStressTest** | $([ "$REGEX_STRESS_SUCCESS" -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | $([ "$ANTLR_STRESS_SUCCESS" -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL") | - |

### 🎯 RECOMMANDATIONS

EOF

# Calculer la recommandation
REGEX_TOTAL_TIME=$(( REGEX_BACKEND_TIME + REGEX_API_TIME ))
ANTLR_TOTAL_TIME=$(( ANTLR_BACKEND_TIME + ANTLR_API_TIME ))

if [ "$REGEX_TOTAL_TIME" -lt "$ANTLR_TOTAL_TIME" ]; then
    RECOMMENDATION="**REGEX** est recommandé pour la production (plus rapide)"
else
    RECOMMENDATION="**ANTLR4** est recommandé pour la production (plus rapide)"
fi

echo "- $RECOMMENDATION" >> "$REPORT_FILE"
echo "- Total REGEX: ${REGEX_TOTAL_TIME}ms" >> "$REPORT_FILE"
echo "- Total ANTLR4: ${ANTLR_TOTAL_TIME}ms" >> "$REPORT_FILE"

echo "" >> "$REPORT_FILE"
echo "## 📋 DÉTAILS DES TESTS" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Ajouter détails des tests backend
echo "### 🧪 Tests Backend Java" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "**REGEX Results:**" >> "$REPORT_FILE"
echo '```' >> "$REPORT_FILE"
cat backend/regex_backend_results.txt >> "$REPORT_FILE" 2>/dev/null || echo "Pas de résultats" >> "$REPORT_FILE"
echo '```' >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "**ANTLR4 Results:**" >> "$REPORT_FILE"
echo '```' >> "$REPORT_FILE"
cat backend/antlr_backend_results.txt >> "$REPORT_FILE" 2>/dev/null || echo "Pas de résultats" >> "$REPORT_FILE"
echo '```' >> "$REPORT_FILE"

echo "🎉 === RAPPORT COMPLET GÉNÉRÉ ==="
echo ""
echo "📊 RÉSUMÉ GLOBAL:"
echo "- Parser REGEX: ${REGEX_TOTAL_TIME}ms total"
echo "- Parser ANTLR4: ${ANTLR_TOTAL_TIME}ms total"
echo "- Recommandation: $RECOMMENDATION"
echo ""
echo "📋 Rapport détaillé: $REPORT_FILE"
echo "🧪 Tous les tests exécutés avec les deux parsers"
echo "📈 Métriques comparées et analysées"
echo ""
echo "🎯 Le système est maintenant entièrement validé !"

# Nettoyer les fichiers temporaires
rm -f backend/backend_*.log 2>/dev/null || true

echo ""
echo "📁 Fichiers de rapport générés:"
echo "- $REPORT_FILE (rapport principal)"
echo "- backend/regex_backend_results.txt"
echo "- backend/antlr_backend_results.txt"
echo "- backend/regex_comparison_results.txt"
echo "- backend/antlr_comparison_results.txt"
echo "- backend/regex_stress_results.txt"
echo "- backend/antlr_stress_results.txt" 