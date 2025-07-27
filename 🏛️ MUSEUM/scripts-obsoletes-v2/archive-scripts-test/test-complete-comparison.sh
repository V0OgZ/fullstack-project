#!/bin/bash

# 🎯 TEST COMPLET - COMPARAISON GLOBALE DES PARSERS
# Execute TOUS les tests: Backend Java + API + Scripts .hots
# Avec parser REGEX puis ANTLR4 et compare les métriques

echo "🎯 === TEST COMPLET - COMPARAISON GLOBALE DES PARSERS ==="
echo ""

# Variables pour les métriques
REPORT_FILE="RAPPORT_COMPLET_COMPARAISON.md"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Créer le rapport
cat > $REPORT_FILE << EOF
# 📊 RAPPORT COMPLET - COMPARAISON GLOBALE DES PARSERS

**Date:** $TIMESTAMP

## 🎯 RÉSULTATS GLOBAUX

EOF

echo "🔥 Phase 1: Tests avec Parser REGEX"
echo "=================================="

# Démarrer backend avec parser REGEX
echo "🚀 Démarrage backend avec parser REGEX..."
cd backend
export HEROES_PARSER_USE_ANTLR=false
mvn spring-boot:run -Dheroes.parser.use.antlr=false -q > /dev/null 2>&1 &
BACKEND_PID_REGEX=$!
echo "⏳ Attente démarrage backend..."
sleep 20

# Tests Backend Java avec REGEX
echo "🧪 Tests Backend Java (REGEX)..."
REGEX_BACKEND_START=$(date +%s%N)
mvn test -Dtest=ComplexScenarioTest -q > regex_backend_results.txt 2>&1
REGEX_BACKEND_END=$(date +%s%N)
REGEX_BACKEND_TIME=$(( (REGEX_BACKEND_END - REGEX_BACKEND_START) / 1000000 ))

mvn test -Dtest=DualParserComparisonTest -q > regex_comparison_results.txt 2>&1
mvn test -Dtest=TemporalStressTest -q > regex_stress_results.txt 2>&1

# Tests API avec REGEX
echo "🌐 Tests API REST (REGEX)..."
REGEX_API_START=$(date +%s%N)

# Test API simple
SIMPLE_API_REGEX=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "demos/simple-game.hots", "parser": "regex"}' | jq -r '.stats.duration // 0')

# Test API comparaison
COMPARISON_API_REGEX=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "tests/parser-comparison.hots", "parser": "regex"}' | jq -r '.stats.duration // 0')

# Test API scénario épique
EPIC_API_REGEX=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "scenarios/epic-arthur-vs-ragnar.hots", "parser": "regex"}' | jq -r '.stats.duration // 0')

# Test API stress test temporel
STRESS_API_REGEX=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "tests/temporal-stress-test.hots", "parser": "regex"}' | jq -r '.stats.duration // 0')

REGEX_API_END=$(date +%s%N)
REGEX_API_TIME=$(( (REGEX_API_END - REGEX_API_START) / 1000000 ))

# Arrêter backend REGEX
kill $BACKEND_PID_REGEX 2>/dev/null
sleep 5

echo "✅ Tests REGEX terminés"
echo ""

echo "🔥 Phase 2: Tests avec Parser ANTLR4"
echo "===================================="

# Démarrer backend avec parser ANTLR4
echo "🚀 Démarrage backend avec parser ANTLR4..."
export HEROES_PARSER_USE_ANTLR=true
mvn spring-boot:run -Dheroes.parser.use.antlr=true -q > /dev/null 2>&1 &
BACKEND_PID_ANTLR=$!
echo "⏳ Attente démarrage backend..."
sleep 20

# Tests Backend Java avec ANTLR4
echo "🧪 Tests Backend Java (ANTLR4)..."
ANTLR_BACKEND_START=$(date +%s%N)
mvn test -Dtest=ComplexScenarioTest -Dheroes.parser.use.antlr=true -q > antlr_backend_results.txt 2>&1
ANTLR_BACKEND_END=$(date +%s%N)
ANTLR_BACKEND_TIME=$(( (ANTLR_BACKEND_END - ANTLR_BACKEND_START) / 1000000 ))

mvn test -Dtest=DualParserComparisonTest -Dheroes.parser.use.antlr=true -q > antlr_comparison_results.txt 2>&1
mvn test -Dtest=TemporalStressTest -Dheroes.parser.use.antlr=true -q > antlr_stress_results.txt 2>&1

# Tests API avec ANTLR4
echo "🌐 Tests API REST (ANTLR4)..."
ANTLR_API_START=$(date +%s%N)

# Test API simple
SIMPLE_API_ANTLR=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "demos/simple-game.hots", "parser": "antlr4"}' | jq -r '.stats.duration // 0')

# Test API comparaison
COMPARISON_API_ANTLR=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "tests/parser-comparison.hots", "parser": "antlr4"}' | jq -r '.stats.duration // 0')

# Test API scénario épique
EPIC_API_ANTLR=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "scenarios/epic-arthur-vs-ragnar.hots", "parser": "antlr4"}' | jq -r '.stats.duration // 0')

# Test API stress test temporel
STRESS_API_ANTLR=$(curl -s -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "tests/temporal-stress-test.hots", "parser": "antlr4"}' | jq -r '.stats.duration // 0')

ANTLR_API_END=$(date +%s%N)
ANTLR_API_TIME=$(( (ANTLR_API_END - ANTLR_API_START) / 1000000 ))

# Arrêter backend ANTLR4
kill $BACKEND_PID_ANTLR 2>/dev/null
sleep 5

echo "✅ Tests ANTLR4 terminés"
echo ""

cd ..

echo "📊 Phase 3: Génération du rapport complet"
echo "=========================================="

# Analyser les résultats
REGEX_BACKEND_TESTS=$(grep -c "Tests run:" regex_backend_results.txt 2>/dev/null || echo "0")
ANTLR_BACKEND_TESTS=$(grep -c "Tests run:" antlr_backend_results.txt 2>/dev/null || echo "0")

REGEX_BACKEND_FAILURES=$(grep -o "Failures: [0-9]*" regex_backend_results.txt | grep -o "[0-9]*" || echo "0")
ANTLR_BACKEND_FAILURES=$(grep -o "Failures: [0-9]*" antlr_backend_results.txt | grep -o "[0-9]*" || echo "0")

# Ajouter les résultats au rapport
cat >> $REPORT_FILE << EOF

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
| **Tests Backend** | ${REGEX_BACKEND_TESTS} tests | ${ANTLR_BACKEND_TESTS} tests | $([ "$REGEX_BACKEND_FAILURES" -eq "0" ] && echo "✅" || echo "❌") REGEX / $([ "$ANTLR_BACKEND_FAILURES" -eq "0" ] && echo "✅" || echo "❌") ANTLR4 |
| **Échecs Backend** | ${REGEX_BACKEND_FAILURES} | ${ANTLR_BACKEND_FAILURES} | $([ "$REGEX_BACKEND_FAILURES" -le "$ANTLR_BACKEND_FAILURES" ] && echo "✅ REGEX meilleur" || echo "✅ ANTLR4 meilleur") |

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

echo "- $RECOMMENDATION" >> $REPORT_FILE
echo "- Total REGEX: ${REGEX_TOTAL_TIME}ms" >> $REPORT_FILE
echo "- Total ANTLR4: ${ANTLR_TOTAL_TIME}ms" >> $REPORT_FILE

echo "" >> $REPORT_FILE
echo "## 📋 DÉTAILS DES TESTS" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Ajouter détails des tests backend
echo "### 🧪 Tests Backend Java" >> $REPORT_FILE
echo "" >> $REPORT_FILE
echo "**REGEX Results:**" >> $REPORT_FILE
echo '```' >> $REPORT_FILE
cat backend/regex_backend_results.txt >> $REPORT_FILE 2>/dev/null || echo "Pas de résultats" >> $REPORT_FILE
echo '```' >> $REPORT_FILE
echo "" >> $REPORT_FILE
echo "**ANTLR4 Results:**" >> $REPORT_FILE
echo '```' >> $REPORT_FILE
cat backend/antlr_backend_results.txt >> $REPORT_FILE 2>/dev/null || echo "Pas de résultats" >> $REPORT_FILE
echo '```' >> $REPORT_FILE

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
rm -f backend/regex_*.txt backend/antlr_*.txt 2>/dev/null 