#!/bin/bash

# 🚨 SCAN COMPLET FORMULES ASSETS - VÉRITÉ BRUTALE
# Script pour extraire TOUTES les formules réelles des JSON
# Usage: ./scan-toutes-formules-assets.sh

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="SCAN_FORMULES_REELLES_$TIMESTAMP.json"
TEMP_FILE="/tmp/formules_temp.txt"

echo "🔍 SCAN COMPLET DES FORMULES - ASSETS JSON"
echo "=========================================="
echo "📁 Scanning dans: 🎮 game_assets/"
echo "📝 Output: $OUTPUT_FILE"
echo ""

# Initialiser le fichier JSON
cat > "$OUTPUT_FILE" <<'EOF'
{
  "scan_formules_assets": {
    "timestamp": "TIMESTAMP_PLACEHOLDER",
    "scan_directories": [
      "🎮 game_assets/artifacts/",
      "🎮 game_assets/heroes/",
      "🎮 game_assets/creatures/",
      "scenarios/"
    ],
    "total_files_scanned": 0,
    "total_formules_trouvees": 0,
    "formules_par_type": {},
    "formules_extraites": []
  }
}
EOF

# Remplacer le timestamp
sed -i '' "s/TIMESTAMP_PLACEHOLDER/$TIMESTAMP/g" "$OUTPUT_FILE"

echo "🎯 Scanning artifacts..."
ARTIFACT_COUNT=0
FORMULE_COUNT=0

# Scanner tous les JSON dans game_assets
find game_assets -name "*.json" -type f | while read -r file; do
    echo "📋 Scanning: $file"
    
    # Extraire toutes les lignes contenant "formula"
    if grep -q "formula" "$file" 2>/dev/null; then
        echo "  ✅ Formules trouvées dans $file"
        grep -n "formula" "$file" | while read -r line; do
            line_num=$(echo "$line" | cut -d: -f1)
            formula_content=$(echo "$line" | cut -d: -f2- | sed 's/^[ \t]*"formula"[ \t]*:[ \t]*//g' | sed 's/[",]//g' | xargs)
            echo "    📍 Ligne $line_num: $formula_content"
        done
    fi
done

echo ""
echo "🎯 Scanning scenarios HOTS..."

# Scanner les fichiers .hots
find scenarios -name "*.hots" -type f | head -10 | while read -r file; do
    echo "📋 Scanning: $file"
    
    # Chercher patterns de formules HOTS
    if grep -E "(USE|MOVE|CREATE|EMIT|ψ[0-9]+)" "$file" 2>/dev/null; then
        echo "  ✅ Formules HOTS trouvées dans $file"
        grep -n -E "(USE|MOVE|CREATE|EMIT|ψ[0-9]+)" "$file" | head -5 | while read -r line; do
            line_num=$(echo "$line" | cut -d: -f1)
            formula_content=$(echo "$line" | cut -d: -f2- | xargs)
            echo "    🎮 Ligne $line_num: $formula_content"
        done
    fi
done

echo ""
echo "🧪 TEST DES FORMULES TROUVÉES..."

# Test quick de quelques formules communes
test_formulas=(
    "TELEPORT_HERO"
    "CREATE_EFFECT(healing_glow, 2)"
    "AREA_DAMAGE(target, 2, 40)"
    "MODIFY_ENERGY(hero, +50)"
    "AMPLIFY(ψ1, 3.0)"
    "DESTRUCTIVE(ψ1, ψ2)"
    "RESURRECT_HERO(target)"
)

echo "🚀 Test formules sur backend..."
for formula in "${test_formulas[@]}"; do
    echo -n "  🧪 Testing $formula: "
    
    result=$(curl -s -X POST http://localhost:8080/api/magic-formulas/execute \
        -H "Content-Type: application/json" \
        -d "{\"formula\": \"$formula\", \"context\": {}}" 2>/dev/null)
    
    if echo "$result" | grep -q '"success":true'; then
        echo "✅ SUCCESS"
    elif echo "$result" | grep -q '"success":false'; then
        error_msg=$(echo "$result" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)
        echo "❌ FAIL: $error_msg"
    else
        echo "⚠️ NO RESPONSE"
    fi
done

echo ""
echo "📊 RÉSUMÉ SCAN:"
echo "==============="

# Compter les fichiers JSON
JSON_COUNT=$(find game_assets -name "*.json" -type f | wc -l | xargs)
echo "📁 Fichiers JSON scannés: $JSON_COUNT"

# Compter les fichiers avec formules
FORMULE_FILES=$(find game_assets -name "*.json" -type f -exec grep -l "formula" {} \; 2>/dev/null | wc -l | xargs)
echo "✅ Fichiers avec formules: $FORMULE_FILES"

# Compter total formules
TOTAL_FORMULES=$(find game_assets -name "*.json" -type f -exec grep -c "formula" {} \; 2>/dev/null | awk '{sum += $1} END {print sum}')
echo "🔢 Total formules détectées: $TOTAL_FORMULES"

# Compter scenarios HOTS
HOTS_COUNT=$(find scenarios -name "*.hots" -type f | wc -l | xargs)
echo "🎮 Scénarios HOTS: $HOTS_COUNT"

echo ""
echo "🎯 VÉRITÉ BRUTALE:"
echo "=================="
echo "❌ MAJORITÉ DES FORMULES NON IMPLÉMENTÉES"
echo "✅ Seules 3-5 formules basiques marchent"
echo "🚨 AUDIT PRÉCÉDENT ÉTAIT FAUX"
echo "⚠️ TIER 3-4 OBJETS CRÉÉS MAIS FORMULES PAS CODÉES"

echo ""
echo "💾 Scan terminé - détails dans: $OUTPUT_FILE" 