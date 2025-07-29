#!/bin/bash
# 🏥 SORT DE DIAGNOSTIC : SANTÉ DU SYSTÈME
# Par MERLIN - 2025-01-29 (Nuit)
# Vérifie l'état de santé du moteur Heroes of Time

echo "╔════════════════════════════════════════════╗"
echo "║     🏥 DIAGNOSTIC SYSTÈME COMPLET 🏥      ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "🕐 $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# Variables
BACKEND_DIR="backend"
SERVICES_OK=0
SERVICES_TOTAL=0

# Fonction de check
check_service() {
    local name=$1
    local file=$2
    SERVICES_TOTAL=$((SERVICES_TOTAL + 1))
    
    if [ -f "$file" ]; then
        echo "✅ $name"
        SERVICES_OK=$((SERVICES_OK + 1))
    else
        echo "❌ $name - NOT FOUND!"
    fi
}

echo "🔧 SERVICES CORE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_service "TemporalEngineService" "$BACKEND_DIR/src/main/java/com/example/demo/service/TemporalEngineService.java"
check_service "MagicFormulaEngine" "$BACKEND_DIR/src/main/java/com/example/demo/service/MagicFormulaEngine.java"
check_service "QuantumService" "$BACKEND_DIR/src/main/java/com/example/demo/service/QuantumService.java"
check_service "CausalityZoneService" "$BACKEND_DIR/src/main/java/com/example/demo/service/CausalityZoneService.java"
echo ""

echo "🎮 CONTROLLERS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_service "FormulaController" "$BACKEND_DIR/src/main/java/com/example/demo/controller/FormulaController.java"
check_service "BodyMagicController" "$BACKEND_DIR/src/main/java/com/example/demo/controller/BodyMagicController.java"
check_service "TemporalWebSocketController" "$BACKEND_DIR/src/main/java/com/example/demo/controller/TemporalWebSocketController.java"
echo ""

echo "📊 RÉSUMÉ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Services OK: $SERVICES_OK/$SERVICES_TOTAL"
PERCENTAGE=$((SERVICES_OK * 100 / SERVICES_TOTAL))
echo "Santé: $PERCENTAGE%"
echo ""

# Check des processus
echo "🔄 PROCESSUS ACTIFS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if pgrep -f "java.*8080" > /dev/null; then
    echo "✅ Backend Spring Boot (port 8080)"
else
    echo "❌ Backend Spring Boot - NOT RUNNING"
fi

if pgrep -f "node.*8000" > /dev/null; then
    echo "✅ Frontend React (port 8000)"
else
    echo "❌ Frontend React - NOT RUNNING"
fi

if pgrep -f "node.*5174" > /dev/null; then
    echo "✅ Frontend Vue (port 5174)"
else
    echo "❌ Frontend Vue - NOT RUNNING"
fi
echo ""

# Branches Git
echo "🌳 ÉTAT GIT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd fullstack-project 2>/dev/null && {
    BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    MODIFIED=$(git status --porcelain | wc -l | tr -d ' ')
    LAST_COMMIT=$(git log -1 --format="%h - %s" 2>/dev/null || echo "no commits")
    
    echo "📍 Branche: $BRANCH"
    echo "📝 Fichiers modifiés: $MODIFIED"
    echo "💾 Dernier commit: $LAST_COMMIT"
    cd - > /dev/null
}
echo ""

# Diagnostic final
echo "╔════════════════════════════════════════════╗"
echo "║           💊 DIAGNOSTIC FINAL 💊           ║"
echo "╠════════════════════════════════════════════╣"

if [ $PERCENTAGE -ge 80 ]; then
    echo "║ État: EXCELLENT ✨                         ║"
elif [ $PERCENTAGE -ge 60 ]; then
    echo "║ État: BON 👍                               ║"
elif [ $PERCENTAGE -ge 40 ]; then
    echo "║ État: ATTENTION REQUISE ⚠️                 ║"
else
    echo "║ État: CRITIQUE 🚨                          ║"
fi

echo "╚════════════════════════════════════════════╝"
echo ""

# Recommendations
echo "💡 RECOMMENDATIONS:"
if [ $PERCENTAGE -lt 100 ]; then
    echo "• Vérifier les services manquants"
fi
echo "• Lancer les tests: mvn test"
echo "• Vérifier les logs: tail -f logs/*.log"
echo ""

echo "🌙 Diagnostic effectué par MERLIN en mode autonome"

exit 0 