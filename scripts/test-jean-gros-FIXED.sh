#!/bin/bash

# 🎯 TEST JEAN-GROS FIXED - POUR JEAN QUI FUME
# Version qui marche vraiment cette fois
# ===============================================

echo "🎯 TEST JEAN-GROS FIXED - POUR JEAN QUI FUME"
echo "============================================="
echo ""

# Aller à la racine du projet
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$ROOT_DIR" || exit 1

echo "📂 Répertoire de travail: $ROOT_DIR"

# Configuration
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_DIR="$ROOT_DIR/rapport-jean-gros-$TIMESTAMP"
mkdir -p "$REPORT_DIR" || { echo "❌ Impossible de créer $REPORT_DIR"; exit 1; }
REPORT_FILE="$REPORT_DIR/RAPPORT_COMPLET.md"

echo "📁 Rapport dans: $REPORT_DIR"

# Début du rapport
cat > "$REPORT_FILE" << EOF
# 📊 RAPPORT JEAN-GROS FIXED
*Généré le $(date)*
*Répertoire: $ROOT_DIR*

## 📋 TESTS EXÉCUTÉS

EOF

# Fonction pour exécuter et logger
run_test() {
    local name="$1"
    local cmd="$2"
    local log_file="$REPORT_DIR/${name}.log"
    
    echo "🔧 Test: $name"
    {
        echo "### $name"
        echo ""
    } >> "$REPORT_FILE"
    
    if eval "$cmd" > "$log_file" 2>&1; then
        echo "   ✅ SUCCÈS"
        {
            echo "✅ **SUCCÈS**"
            echo ""
            echo "Log: \`$log_file\`"
            echo ""
        } >> "$REPORT_FILE"
    else
        echo "   ❌ ÉCHEC"
        {
            echo "❌ **ÉCHEC**"
            echo ""
            echo "Log: \`$log_file\`"
            echo ""
            echo "Erreur:"
            echo "\`\`\`"
            tail -10 "$log_file" 2>/dev/null || echo "Pas de log disponible"
            echo "\`\`\`"
            echo ""
        } >> "$REPORT_FILE"
    fi
}

# Vérifier le backend
echo "🔍 Vérification du backend..."
if curl -s http://localhost:8080/api/game/status > /dev/null 2>&1; then
    echo "✅ Backend actif"
else
    echo "❌ Backend non accessible"
    echo "💡 Conseil: Démarrer avec 'cd backend && mvn spring-boot:run'"
fi

echo ""
echo "🚀 Lancement des tests..."
echo ""

# Backend tests
if [ -d "$ROOT_DIR/backend" ]; then
    run_test "backend-compile" "cd '$ROOT_DIR/backend' && mvn compile -DskipTests -q"
    run_test "backend-test" "cd '$ROOT_DIR/backend' && mvn test -q"
else
    echo "⚠️  Répertoire backend non trouvé"
fi

# Test basic API
run_test "api-status" "curl -s http://localhost:8080/api/game/status"

# Scripts de test existants
for script in "test-causality-wall.sh" "test-vision-temporelle.sh" "test-quantum-maze.sh"; do
    if [ -f "$ROOT_DIR/scripts/$script" ]; then
        run_test "$(basename "$script" .sh)" "cd '$ROOT_DIR' && timeout 60s ./scripts/$script"
    else
        echo "⚠️  Script $script non trouvé"
    fi
done

# UI tests
if [ -f "$ROOT_DIR/scripts/actifs/test-ui-quick.sh" ]; then
    run_test "ui-quick" "cd '$ROOT_DIR' && timeout 30s ./scripts/actifs/test-ui-quick.sh"
else
    echo "⚠️  Script UI quick non trouvé"
fi

# Analyse des ressources
{
    echo ""
    echo "## 📊 ANALYSE DES RESSOURCES"
    echo ""
    echo "### Structure du projet"
    echo "\`\`\`"
    find "$ROOT_DIR" -maxdepth 2 -type d | sort
    echo "\`\`\`"
    echo ""
    echo "### Formules trouvées"
    echo "\`\`\`"
    if [ -d "$ROOT_DIR/backend/src/main/resources/" ]; then
        find "$ROOT_DIR/backend/src/main/resources/" -name "*.json" -exec grep -l "formula" {} \; | head -5
    else
        echo "Répertoire backend/resources non trouvé"
    fi
    echo "\`\`\`"
    echo ""
} >> "$REPORT_FILE"

# Résumé final
{
    echo "## 📋 RÉSUMÉ FINAL"
    echo ""
    echo "- ⏰ Date d'exécution: $(date)"
    echo "- 📂 Répertoire de travail: $ROOT_DIR"  
    echo "- 📁 Rapport complet: $REPORT_FILE"
    echo "- 📄 Logs individuels: $REPORT_DIR/*.log"
    echo ""
    echo "### État des services"
    if curl -s http://localhost:8080/api/game/status > /dev/null 2>&1; then
        echo "- 🟢 Backend: ACTIF (port 8080)"
    else
        echo "- 🔴 Backend: INACTIF (port 8080)"
    fi
    echo ""
} >> "$REPORT_FILE"

echo ""
echo "✅ TEST TERMINÉ !"
echo ""
echo "📁 Rapport complet: $REPORT_FILE"
echo ""

# Copier les fichiers MEMENTO
if [ -f "$ROOT_DIR/MEMENTO/ARBORESCENCE_MAP_COMPLETE.md" ]; then
    cp "$ROOT_DIR/MEMENTO/ARBORESCENCE_MAP_COMPLETE.md" "$REPORT_DIR/" && echo "✅ ARBORESCENCE copiée"
fi

if [ -f "$ROOT_DIR/MEMENTO/JEAN_MESSAGES_BEST_OF.md" ]; then
    cp "$ROOT_DIR/MEMENTO/JEAN_MESSAGES_BEST_OF.md" "$REPORT_DIR/" && echo "✅ JEAN_MESSAGES copiés"
fi

echo ""
echo "🎯 Pour Jean:"
echo "   cat $REPORT_FILE"
echo "   ls -la $REPORT_DIR/"
echo ""
echo "🚀 Backend status:"
curl -s http://localhost:8080/api/game/status 2>/dev/null && echo " ✅" || echo " ❌ (à démarrer)"
echo ""