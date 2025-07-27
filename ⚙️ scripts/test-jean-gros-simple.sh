#!/bin/bash

# 🎯 TEST JEAN-GROS SIMPLE - FULL PATATE
# Version simplifiée et fixée pour Jean
# =====================================

echo "🎯 TEST JEAN-GROS SIMPLE - FULL PATATE"
echo "====================================="
echo ""

# Aller à la racine du projet
cd "$(dirname "$0")/.." || exit 1
ROOT_DIR="$(pwd)"

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
        echo "Log: \`$log_file\`" >> "$REPORT_FILE"
    else
        echo "   ❌ ÉCHEC"
        echo "❌ **ÉCHEC**" >> "$REPORT_FILE"
        echo "Log: \`$log_file\`" >> "$REPORT_FILE"
        echo "Erreur:" >> "$REPORT_FILE"
        echo "\`\`\`" >> "$REPORT_FILE"
        tail -10 "$log_file" >> "$REPORT_FILE" 2>/dev/null
        echo "\`\`\`" >> "$REPORT_FILE"
    fi
    
    echo "" >> "$REPORT_FILE"
}

# Vérifier le backend
echo "🔍 Vérification du backend..."
if curl -s http://localhost:8080/api/game/status > /dev/null 2>&1; then
    echo "✅ Backend actif"
else
    echo "❌ Backend non accessible - Lancement..."
    cd "$ROOT_DIR/backend" && mvn spring-boot:run > "../backend-jean.log" 2>&1 &
    echo "⏳ Attente du démarrage (30s)..."
    sleep 30
    cd "$ROOT_DIR"
fi

# Tests principaux
echo ""
echo "🚀 Lancement des tests..."
echo ""

# Backend
run_test "backend-compile" "cd '$ROOT_DIR/backend' && mvn compile -DskipTests"
run_test "backend-tests" "cd '$ROOT_DIR/backend' && mvn test"

# Scripts de test (avec vérification d'existence)
if [ -f "$ROOT_DIR/scripts/test-causality-wall.sh" ]; then
    run_test "causality-wall" "cd '$ROOT_DIR' && ./scripts/test-causality-wall.sh"
else
    echo "⚠️  Script causality-wall non trouvé"
fi

if [ -f "$ROOT_DIR/scripts/test-vision-temporelle.sh" ]; then
    run_test "vision-temporelle" "cd '$ROOT_DIR' && ./scripts/test-vision-temporelle.sh"
else
    echo "⚠️  Script vision-temporelle non trouvé"
fi

if [ -f "$ROOT_DIR/scripts/test-quantum-maze.sh" ]; then
    run_test "quantum-maze" "cd '$ROOT_DIR' && ./scripts/test-quantum-maze.sh"
else
    echo "⚠️  Script quantum-maze non trouvé"
fi

# UI
if [ -f "$ROOT_DIR/scripts/actifs/test-ui-quick.sh" ]; then
    run_test "ui-quick" "cd '$ROOT_DIR' && ./scripts/actifs/test-ui-quick.sh"
else
    echo "⚠️  Script UI quick non trouvé"
fi

# Test artifacts
if [ -f "$ROOT_DIR/test-artifacts-hybrid.sh" ]; then
    run_test "artifacts-hybrid" "cd '$ROOT_DIR' && ./test-artifacts-hybrid.sh"
else
    echo "⚠️  Script artifacts-hybrid non trouvé"
fi

# Analyse des formules
echo "" >> "$REPORT_FILE"
echo "## 📊 ANALYSE DES FORMULES" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "\`\`\`" >> "$REPORT_FILE"
if [ -d "$ROOT_DIR/backend/src/main/resources/" ]; then
    grep -r "formula" --include="*.json" "$ROOT_DIR/backend/src/main/resources/" | grep -E "CONSTRUCTIVE|DESTRUCTIVE|AMPLIFY" | head -10 >> "$REPORT_FILE" 2>/dev/null || echo "Aucune formule trouvée" >> "$REPORT_FILE"
else
    echo "Répertoire backend/resources non trouvé" >> "$REPORT_FILE"
fi
echo "\`\`\`" >> "$REPORT_FILE"

# Résumé
echo "" >> "$REPORT_FILE"
echo "## 📋 RÉSUMÉ" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "- Répertoire de travail: $ROOT_DIR" >> "$REPORT_FILE"
echo "- Date d'exécution: $(date)" >> "$REPORT_FILE"
echo "- Fichiers de log disponibles dans: $REPORT_DIR/" >> "$REPORT_FILE"

echo ""
echo "✅ TEST TERMINÉ !"
echo ""
echo "📁 Rapport : $REPORT_FILE"
echo ""
echo "💡 Pour voir le rapport :"
echo "   cat $REPORT_FILE"
echo ""

# Copier les fichiers importants (avec vérification)
if [ -f "$ROOT_DIR/MEMENTO/ARBORESCENCE_MAP_COMPLETE.md" ]; then
    cp "$ROOT_DIR/MEMENTO/ARBORESCENCE_MAP_COMPLETE.md" "$REPORT_DIR/"
    echo "✅ ARBORESCENCE_MAP_COMPLETE.md copié"
fi

if [ -f "$ROOT_DIR/MEMENTO/JEAN_MESSAGES_BEST_OF.md" ]; then
    cp "$ROOT_DIR/MEMENTO/JEAN_MESSAGES_BEST_OF.md" "$REPORT_DIR/"
    echo "✅ JEAN_MESSAGES_BEST_OF.md copié"
fi

echo "📋 Fichiers copiés dans le rapport"
echo "" 