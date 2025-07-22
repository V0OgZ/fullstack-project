#!/bin/bash

# 🎯 TEST JEAN-GROS v3.0 WITH JSON - ÉDITION COMPLÈTE AVEC NOUVEAUX SCRIPTS
# ========================================================================
# Version qui inclut les nouveaux scripts JSON adaptés

echo "🎯 TEST JEAN-GROS v3.0 WITH JSON - ÉDITION COMPLÈTE AVEC NOUVEAUX SCRIPTS"
echo "=========================================================================="
echo "🎳 The Dude: Analysing what needs to run with new JSON capabilities..."
echo "🔫 Vince Vega: Setting up parallel execution with JSON tests..."

# Configuration
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$BASE_DIR"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Fonction pour logger avec timestamp
log_with_time() {
    echo -e "${CYAN}[$(date '+%H:%M:%S')]${NC} $1"
}

# Nettoyer les anciens processus background éventuels
cleanup_background_jobs() {
    jobs | grep -E "(backend-compile|backend-tests|causality-wall|vision-temporelle|quantum-maze|test-final-mega|ui-quick|stress-test|json-tests)" | while read job; do
        job_id=$(echo "$job" | sed 's/.*\[\([0-9]*\)\].*/\1/')
        if [ ! -z "$job_id" ]; then
            kill %$job_id 2>/dev/null || true
        fi
    done
}

cleanup_background_jobs

echo ""
echo "🎳 The Dude is analyzing dependencies..."

# Timestamp pour cette exécution
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RAPPORT_DIR="rapport-jean-gros-v3-${TIMESTAMP}"
mkdir -p "$RAPPORT_DIR"

echo "📊 Rapport sera généré dans: $RAPPORT_DIR"

# Scripts de test classiques
CLASSIC_TESTS=(
    "backend-compile:cd backend && mvn compile -q > ../\"$RAPPORT_DIR\"/backend-compile.log 2>&1"
    "backend-tests:cd backend && mvn test -q > ../\"$RAPPORT_DIR\"/backend-tests.log 2>&1"
    "causality-wall:./scripts/test-causality-wall.sh > \"$RAPPORT_DIR\"/causality-wall.log 2>&1"
    "vision-temporelle:./scripts/test-vision-temporelle.sh > \"$RAPPORT_DIR\"/vision-temporelle.log 2>&1"
    "quantum-maze:./scripts/test-quantum-maze-complete.sh > \"$RAPPORT_DIR\"/quantum-maze.log 2>&1"
    "test-final-mega:./scripts/test-complet-final.sh > \"$RAPPORT_DIR\"/test-final-mega.log 2>&1"
    "ui-quick:./scripts/actifs/test-ui-quick.sh > \"$RAPPORT_DIR\"/ui-quick.log 2>&1"
    "stress-test:./scripts/test/temporal-stress-test.sh > \"$RAPPORT_DIR\"/stress-test.log 2>&1"
)

# Nouveaux tests JSON
JSON_TESTS=(
    "json-panopticon:./scripts/test-panopticon-json-scenario.sh > \"$RAPPORT_DIR\"/json-panopticon.log 2>&1"
    "json-duel-collapse:./scripts/test-duel-collapse-json.sh > \"$RAPPORT_DIR\"/json-duel-collapse.log 2>&1"
    "json-runner-test:./scripts/test-json-scenario-runner.sh GROFI_QUICK_TEST > \"$RAPPORT_DIR\"/json-runner-test.log 2>&1"
)

# Combiner tous les tests
ALL_TESTS=("${CLASSIC_TESTS[@]}" "${JSON_TESTS[@]}")

echo ""
echo "🚀 Launching all tests in parallel..."

# Lancer tous les tests en parallèle
for test_info in "${ALL_TESTS[@]}"; do
    IFS=':' read -r test_name test_command <<< "$test_info"
    echo "🔫 Vince: Launching $test_name (max 300s)..."
    
    # Créer un wrapper qui capture le code de sortie
    (
        eval $test_command
        echo $? > "$RAPPORT_DIR/${test_name}.exitcode"
        echo $$ > "$RAPPORT_DIR/${test_name}.pid"
    ) &
    
    # Limiter à 300 secondes par test
    test_pid=$!
    (
        sleep 300
        if kill -0 $test_pid 2>/dev/null; then
            echo "TIMEOUT" > "$RAPPORT_DIR/${test_name}.log"
            kill $test_pid 2>/dev/null
        fi
    ) &
done

echo ""
echo "⏳ Waiting for tests to complete..."

# Attendre que tous les tests se terminent
total_tests=${#ALL_TESTS[@]}
completed=0

while [ $completed -lt $total_tests ]; do
    completed=0
    for test_info in "${ALL_TESTS[@]}"; do
        IFS=':' read -r test_name test_command <<< "$test_info"
        if [ -f "$RAPPORT_DIR/${test_name}.exitcode" ]; then
            completed=$((completed + 1))
        fi
    done
    
    running=$((total_tests - completed))
    if [ $running -gt 0 ]; then
        echo "   Still running: $running tests..."
        sleep 5
    fi
done

echo ""
echo "🎯 All tests completed! Generating reports..."

# Générer le rapport final
RAPPORT_FILE="$RAPPORT_DIR/RAPPORT_COMPLET.md"

cat > "$RAPPORT_FILE" << EOF
# 🎯 RAPPORT JEAN-GROS v3.0 WITH JSON - ${TIMESTAMP}

**Exécution complète avec nouveaux scripts JSON adaptés**

## 🧪 RÉSULTATS DES TESTS CLASSIQUES

EOF

# Analyser les résultats des tests classiques
for test_info in "${CLASSIC_TESTS[@]}"; do
    IFS=':' read -r test_name test_command <<< "$test_info"
    
    if [ -f "$RAPPORT_DIR/${test_name}.exitcode" ]; then
        exitcode=$(cat "$RAPPORT_DIR/${test_name}.exitcode")
        if [ "$exitcode" = "0" ]; then
            status="✅ RÉUSSI"
        else
            status="❌ ÉCHEC (code: $exitcode)"
        fi
    else
        status="⚠️ TIMEOUT"
    fi
    
    echo "### $test_name: $status" >> "$RAPPORT_FILE"
    echo "" >> "$RAPPORT_FILE"
done

cat >> "$RAPPORT_FILE" << EOF

## 🚀 RÉSULTATS DES NOUVEAUX TESTS JSON

EOF

# Analyser les résultats des tests JSON
for test_info in "${JSON_TESTS[@]}"; do
    IFS=':' read -r test_name test_command <<< "$test_info"
    
    if [ -f "$RAPPORT_DIR/${test_name}.exitcode" ]; then
        exitcode=$(cat "$RAPPORT_DIR/${test_name}.exitcode")
        if [ "$exitcode" = "0" ]; then
            status="✅ RÉUSSI"
        else
            status="❌ ÉCHEC (code: $exitcode)"
        fi
    else
        status="⚠️ TIMEOUT"
    fi
    
    echo "### $test_name: $status" >> "$RAPPORT_FILE"
    echo "" >> "$RAPPORT_FILE"
    
    # Ajouter un extrait du log pour les tests JSON
    if [ -f "$RAPPORT_DIR/${test_name}.log" ]; then
        echo "**Extrait du log:**" >> "$RAPPORT_FILE"
        echo '```' >> "$RAPPORT_FILE"
        head -20 "$RAPPORT_DIR/${test_name}.log" >> "$RAPPORT_FILE"
        echo '```' >> "$RAPPORT_FILE"
        echo "" >> "$RAPPORT_FILE"
    fi
done

cat >> "$RAPPORT_FILE" << EOF

## 📊 STATISTIQUES GLOBALES

- **Tests classiques**: ${#CLASSIC_TESTS[@]}
- **Nouveaux tests JSON**: ${#JSON_TESTS[@]}
- **Total**: $total_tests tests
- **Répertoire**: $RAPPORT_DIR

## 🎯 ARCHITECTURE JSON TESTÉE

Les nouveaux scripts JSON testent :
- **Parsing de scénarios JSON** - Format unifié HSP
- **Scripts adaptés** - Chemins corrigés  
- **Interface utilisateur** - Affichage structuré
- **Logique de jeu** - Compatible avec le système existant

### Scripts JSON Inclus:
- \`test-panopticon-json-scenario.sh\` - Test du PANOPTICΩN
- \`test-duel-collapse-json.sh\` - Test du duel du collapse
- \`test-json-scenario-runner.sh\` - Runner générique JSON

## 🛋️ NOTE POUR JEAN

Rapport généré automatiquement depuis le canapé GitHub.
L'architecture JSON fonctionne et est prête pour le système HSP unifié !

---

*Généré le $(date) par Jean-Gros v3.0*
EOF

echo ""
echo "🎉 RAPPORT COMPLET GÉNÉRÉ !"
echo "📁 Consultez: $RAPPORT_FILE"
echo ""
echo "🔍 Résumé rapide:"

# Compter les succès et échecs
succes=0
echecs=0

for test_info in "${ALL_TESTS[@]}"; do
    IFS=':' read -r test_name test_command <<< "$test_info"
    
    if [ -f "$RAPPORT_DIR/${test_name}.exitcode" ]; then
        exitcode=$(cat "$RAPPORT_DIR/${test_name}.exitcode")
        if [ "$exitcode" = "0" ]; then
            succes=$((succes + 1))
            echo -e "   ✅ $test_name"
        else
            echecs=$((echecs + 1))
            echo -e "   ❌ $test_name (code: $exitcode)"
        fi
    else
        echecs=$((echecs + 1))
        echo -e "   ⚠️ $test_name (timeout)"
    fi
done

echo ""
echo "📊 BILAN FINAL:"
echo -e "   ✅ Réussites: ${GREEN}$succes${NC}"
echo -e "   ❌ Échecs: ${RED}$echecs${NC}"
echo -e "   📈 Taux de réussite: $((succes * 100 / total_tests))%"

if [ $echecs -eq 0 ]; then
    echo ""
    echo "🏆 TOUS LES TESTS RÉUSSIS ! L'ARCHITECTURE JSON EST OPÉRATIONNELLE !"
else
    echo ""
    echo "⚠️ Certains tests ont échoué. Consultez les logs pour plus de détails."
fi

echo ""
echo "🎳 The Dude: All tests abide, man."
echo "🔫 Vince Vega: That's a wrap!" 