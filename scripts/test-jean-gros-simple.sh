#!/bin/bash

# 🎯 TEST JEAN-GROS SIMPLE - FULL PATATE
# Version simplifiée pour macOS
# =====================================

echo "🎯 TEST JEAN-GROS SIMPLE - FULL PATATE"
echo "====================================="
echo ""

# Configuration
REPORT_DIR="rapport-jean-gros-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$REPORT_DIR"
REPORT_FILE="$REPORT_DIR/RAPPORT_COMPLET.md"

# Début du rapport
cat > "$REPORT_FILE" << EOF
# 📊 RAPPORT JEAN-GROS - TEST SIMPLE
*Généré le $(date)*

## 📋 TESTS EXÉCUTÉS

EOF

# Fonction pour exécuter et logger
run_test() {
    local name="$1"
    local cmd="$2"
    local log_file="$REPORT_DIR/${name}.log"
    
    echo "🔧 Test: $name"
    echo "### $name" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    if eval "$cmd" > "$log_file" 2>&1; then
        echo "   ✅ SUCCÈS"
        echo "✅ **SUCCÈS**" >> "$REPORT_FILE"
    else
        echo "   ❌ ÉCHEC"
        echo "❌ **ÉCHEC**" >> "$REPORT_FILE"
    fi
    
    echo "" >> "$REPORT_FILE"
    echo "Log: \`$log_file\`" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
}

# Vérifier le backend
echo "🔍 Vérification du backend..."
if curl -s http://localhost:8080/api/game/status > /dev/null 2>&1; then
    echo "✅ Backend actif"
else
    echo "❌ Backend non accessible - Lancement..."
    cd backend && mvn spring-boot:run > ../backend-jean.log 2>&1 &
    echo "⏳ Attente du démarrage (30s)..."
    sleep 30
fi

# Tests principaux
echo ""
echo "🚀 Lancement des tests..."
echo ""

# Backend
run_test "backend-compile" "cd backend && mvn compile -DskipTests"
run_test "backend-tests" "cd backend && mvn test"

# Scripts de test
run_test "causality-wall" "./scripts/test-causality-wall.sh"
run_test "vision-temporelle" "./scripts/test-vision-temporelle.sh"
run_test "quantum-maze" "./scripts/test-quantum-maze.sh"

# UI
run_test "ui-quick" "./scripts/actifs/test-ui-quick.sh"

# Test artifacts
run_test "artifacts-hybrid" "./test-artifacts-hybrid.sh"

# Analyse des formules
echo "" >> "$REPORT_FILE"
echo "## 📊 ANALYSE DES FORMULES" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "\`\`\`" >> "$REPORT_FILE"
grep -r "formula" --include="*.json" backend/src/main/resources/ | grep -E "CONSTRUCTIVE|DESTRUCTIVE|AMPLIFY" | head -10 >> "$REPORT_FILE" 2>/dev/null
echo "\`\`\`" >> "$REPORT_FILE"

# Résumé
echo ""
echo "✅ TEST TERMINÉ !"
echo ""
echo "📁 Rapport : $REPORT_FILE"
echo ""
echo "💡 Pour voir le rapport :"
echo "   cat $REPORT_FILE"
echo ""

# Copier les fichiers importants
cp ARBORESCENCE_MAP_COMPLETE.md "$REPORT_DIR/"
cp JEAN_MESSAGES_BEST_OF.md "$REPORT_DIR/"

echo "📋 Fichiers copiés dans le rapport"
echo "" 