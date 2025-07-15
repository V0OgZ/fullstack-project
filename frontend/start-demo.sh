#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║          🎮 HEROES OF TIME - DEMO MODE 🎮                     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Configuration des logs
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="../test-results/demo-fullscreen-$TIMESTAMP.log"
mkdir -p "../test-results"

echo "📝 Logs seront sauvegardés dans: $LOG_FILE"
echo "🎬 Lancement automatique en mode plein écran..."
echo ""

# Vérifier que les serveurs sont lancés
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Frontend not running! Please run ./start-app.sh first" | tee -a "$LOG_FILE"
    exit 1
fi

if ! curl -s http://localhost:8080/api/health > /dev/null; then
    echo "❌ Backend not running! Please run ./start-app.sh first" | tee -a "$LOG_FILE"
    exit 1
fi

echo "✅ Servers detected..." | tee -a "$LOG_FILE"
echo ""

cd frontend

echo "🚀 Lancement en mode plein écran avec logs..." | tee -a "$LOG_FILE"
echo "📌 Appuyez sur ESC pour quitter le plein écran" | tee -a "$LOG_FILE"
echo "⏱️  Démarrage à $(date)" | tee -a "$LOG_FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" | tee -a "$LOG_FILE"
echo ""

# Lancer le mode plein écran avec logs détaillés
# Utiliser le test qui existe dans la configuration Playwright
npx playwright test tests/e2e/01-single-demo.spec.ts \
    --reporter=list \
    --timeout=120000 \
    --project=solo-fullscreen \
    --headed \
    2>&1 | tee -a "$LOG_FILE"

DEMO_EXIT_CODE=${PIPESTATUS[0]}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" | tee -a "$LOG_FILE"
echo "⏱️  Fin à $(date)" | tee -a "$LOG_FILE"

if [ $DEMO_EXIT_CODE -eq 0 ]; then
    echo "✅ Demo completed successfully!" | tee -a "$LOG_FILE"
else
    echo "❌ Demo failed with exit code $DEMO_EXIT_CODE" | tee -a "$LOG_FILE"
fi

echo ""
echo "📊 Résultats:"
echo "  📝 Log complet: $LOG_FILE"
echo "  🎬 Mode: Plein écran (kiosque)"
echo "  ⏱️  Durée: Voir le log pour les détails"
echo ""
echo "💡 Pour voir les logs: tail -f \"$LOG_FILE\""

exit $DEMO_EXIT_CODE 