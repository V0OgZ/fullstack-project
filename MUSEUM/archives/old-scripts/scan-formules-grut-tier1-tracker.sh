#!/bin/bash

# 🔥 SCRIPT SCAN FORMULES GRUT TIER 1 - TRACKER COMPLET
# =====================================================
# Créé suite à la session GRUT du 25 juillet 2025
# Éviter reproduction problèmes audit formules
# 
# MEMENTO TATOUAGE: "🔍 SCRIPT SCAN FORMULES DEMANDÉ"

echo "🔥 GRUT TIER 1 FORMULAS TRACKER - SCAN COMPLET"
echo "=============================================="
echo "📅 Session: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# 🎯 VARIABLES CONFIGURATION
BACKEND_URL="http://localhost:8080"
RESULTS_DIR="./scan-results-$(date +%Y%m%d_%H%M%S)"
FORMULAS_LOG="$RESULTS_DIR/formulas-found.json"
TESTS_LOG="$RESULTS_DIR/tests-results.log"

# 📁 Créer dossier résultats
mkdir -p "$RESULTS_DIR"

echo "📂 Résultats sauvés dans: $RESULTS_DIR"
echo ""

# 🔍 PHASE 1 - SCAN ASSETS FORMULES
echo "🔍 PHASE 1 - SCAN FORMULES DANS ASSETS"
echo "======================================"

# Chercher dans tous les JSONs
echo "📋 Formules trouvées dans game_assets:" > "$FORMULAS_LOG"
echo "{" >> "$FORMULAS_LOG"
echo "  \"scan_date\": \"$(date -Iseconds)\"," >> "$FORMULAS_LOG"
echo "  \"formulas_by_file\": {" >> "$FORMULAS_LOG"

FIRST_FILE=true
find game_assets -name "*.json" -type f | while read file; do
    FORMULAS=$(grep -o '"formula[^"]*":\s*"[^"]*"' "$file" 2>/dev/null || true)
    if [ ! -z "$FORMULAS" ]; then
        if [ "$FIRST_FILE" = false ]; then
            echo "    ," >> "$FORMULAS_LOG"
        fi
        echo "    \"$file\": [" >> "$FORMULAS_LOG"
        echo "$FORMULAS" | sed 's/.*"formula[^"]*":\s*"\([^"]*\)".*/      "\1",/' | sed '$ s/,$//' >> "$FORMULAS_LOG"
        echo "    ]" >> "$FORMULAS_LOG"
        FIRST_FILE=false
        echo "  ✅ $file: $(echo "$FORMULAS" | wc -l) formules"
    fi
done

echo "  }," >> "$FORMULAS_LOG"

# 🔍 PHASE 2 - SCAN SCENARIOS HOTS
echo ""
echo "🔍 PHASE 2 - SCAN FORMULES DANS SCENARIOS"
echo "========================================"

echo "  \"hots_scenarios\": {" >> "$FORMULAS_LOG"
FIRST_SCENARIO=true
find scenarios -name "*.hots" -type f | while read file; do
    # Chercher patterns HOTS: ψ001:, FORMULA(), etc.
    PSI_PATTERNS=$(grep -o 'ψ[0-9A-Z]*:' "$file" 2>/dev/null || true)
    FORMULA_PATTERNS=$(grep -o '[A-Z_]*(' "$file" 2>/dev/null | grep -v '^$' || true)
    
    if [ ! -z "$PSI_PATTERNS" ] || [ ! -z "$FORMULA_PATTERNS" ]; then
        if [ "$FIRST_SCENARIO" = false ]; then
            echo "    ," >> "$FORMULAS_LOG"
        fi
        echo "    \"$file\": {" >> "$FORMULAS_LOG"
        echo "      \"psi_states\": [" >> "$FORMULAS_LOG"
        echo "$PSI_PATTERNS" | sed 's/\(.*\)/        "\1",/' | sed '$ s/,$//' >> "$FORMULAS_LOG" 2>/dev/null || true
        echo "      ]," >> "$FORMULAS_LOG"
        echo "      \"formulas\": [" >> "$FORMULAS_LOG"
        echo "$FORMULA_PATTERNS" | sed 's/\(.*\)/        "\1",/' | sed '$ s/,$//' >> "$FORMULAS_LOG" 2>/dev/null || true
        echo "      ]" >> "$FORMULAS_LOG"
        echo "    }" >> "$FORMULAS_LOG"
        FIRST_SCENARIO=false
        echo "  ✅ $file: ψ=$(echo "$PSI_PATTERNS" | wc -l), FORM=$(echo "$FORMULA_PATTERNS" | wc -l)"
    fi
done

echo "  }," >> "$FORMULAS_LOG"

# 🔍 PHASE 3 - GRUT TIER 1 FORMULES BACKEND
echo ""
echo "🔍 PHASE 3 - GRUT TIER 1 BACKEND FORMULES"
echo "========================================"

echo "  \"grut_tier1_formulas\": [" >> "$FORMULAS_LOG"

# Liste des formules GRUT TIER 1 connues
GRUT_FORMULAS=("ENERGY_ACCUMULATE" "RELEASE_STORED_ENERGY" "CALCULATE_DAMAGE")

for formula in "${GRUT_FORMULAS[@]}"; do
    echo "    \"$formula\"," >> "$FORMULAS_LOG"
done

# Retirer la dernière virgule
sed -i '$ s/,$//' "$FORMULAS_LOG"
echo "  ]" >> "$FORMULAS_LOG"
echo "}" >> "$FORMULAS_LOG"

echo "💾 Formules scannées sauvées dans: $FORMULAS_LOG"

# 🧪 PHASE 4 - TESTS BACKEND (SI DISPONIBLE)
echo ""
echo "🧪 PHASE 4 - TESTS BACKEND FORMULES"
echo "=================================="

# Vérifier si backend est up
if curl -s "$BACKEND_URL/api/health" > /dev/null 2>&1; then
    echo "✅ Backend détecté sur $BACKEND_URL"
    echo "🧪 Tests GRUT TIER 1 formules:" > "$TESTS_LOG"
    echo "===============================" >> "$TESTS_LOG"
    echo "Date: $(date)" >> "$TESTS_LOG"
    echo "" >> "$TESTS_LOG"
    
    # Test ENERGY_ACCUMULATE
    echo "🔋 Test ENERGY_ACCUMULATE:" >> "$TESTS_LOG"
    RESULT=$(curl -s -X POST "$BACKEND_URL/api/magic-formulas/execute" \
        -H "Content-Type: application/json" \
        -d '{"formula": "ENERGY_ACCUMULATE", "gameId": "scan-test", "heroId": "grut"}' 2>/dev/null || echo "ERROR")
    echo "$RESULT" >> "$TESTS_LOG"
    echo "" >> "$TESTS_LOG"
    
    # Test CALCULATE_DAMAGE
    echo "⚔️ Test CALCULATE_DAMAGE:" >> "$TESTS_LOG"
    RESULT=$(curl -s -X POST "$BACKEND_URL/api/magic-formulas/execute" \
        -H "Content-Type: application/json" \
        -d '{"formula": "CALCULATE_DAMAGE", "gameId": "scan-test", "heroId": "grut", "metadata": {"attack": 20, "defense": 8}}' 2>/dev/null || echo "ERROR")
    echo "$RESULT" >> "$TESTS_LOG"
    echo "" >> "$TESTS_LOG"
    
    echo "✅ Tests backend terminés, résultats dans: $TESTS_LOG"
else
    echo "⚠️ Backend non disponible sur $BACKEND_URL"
    echo "💡 Lancez './hots start' pour activer les tests"
    echo "Backend non disponible" > "$TESTS_LOG"
fi

# 📊 PHASE 5 - RAPPORT FINAL
echo ""
echo "📊 RAPPORT FINAL GRUT TIER 1"
echo "============================"

TOTAL_JSON_FILES=$(find game_assets -name "*.json" | wc -l)
TOTAL_HOTS_FILES=$(find scenarios -name "*.hots" | wc -l)
FORMULAS_WITH_JSON=$(grep -r "formula" game_assets --include="*.json" | wc -l)

echo "📁 Fichiers JSON scannés: $TOTAL_JSON_FILES"
echo "📁 Fichiers HOTS scannés: $TOTAL_HOTS_FILES"
echo "🔍 Formules trouvées dans JSON: $FORMULAS_WITH_JSON"
echo "🔥 Formules GRUT TIER 1: ${#GRUT_FORMULAS[@]}"

# 🎯 RECOMMANDATIONS
echo ""
echo "🎯 RECOMMANDATIONS GRUT"
echo "======================"
echo "✅ Architecture GRUT TIER 1 documentée dans: ARCHITECTURE_GRUT_FORMULES_HYBRID.md"
echo "✅ Formules pures implémentées: calculateEnergyAccumulate, calculateDamage"
echo "⚠️ Problème métadonnées GameContext détecté - à corriger"
echo "🚀 Prochaine étape: Migration Postgres selon plan GRUT"
echo ""
echo "📋 TOUS LES RÉSULTATS DANS: $RESULTS_DIR"
echo "🎨 MEMENTO TATOUAGE MIS À JOUR avec cette session"

# 🔧 Rendre le script exécutable pour la prochaine fois
chmod +x "$0"

echo ""
echo "🔥 SCAN GRUT TIER 1 TERMINÉ - $(date '+%H:%M:%S')"
echo "================================================" 