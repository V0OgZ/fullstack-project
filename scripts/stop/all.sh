#!/bin/bash

# ==============================================================================
# 🚀 HEROES OF TIME - SCRIPT D'ARRÊT UNIFIÉ
# ==============================================================================
#
# Ce script est le SEUL moyen d'arrêter tous les services de l'application.
# Il lit les PIDs des services en cours d'exécution et les arrête proprement.
#
# USAGE: ./scripts/stop/all.sh
#
# ==============================================================================

echo "🚀 HEROES OF TIME - ARRÊT DE TOUS LES SERVICES"
echo "=================================================="
echo ""

# --- Arrêt des services ---
echo "🛑 Arrêt des services..."
PIDS_FILES=(".backend.pid" ".frontend.pid" ".quantum.pid" ".testrunner.pid" ".dashboard.pid" ".temporal.pid")
for PID_FILE in "${PIDS_FILES[@]}"; do
    if [ -f "$PID_FILE" ]; then
        PID=$(cat $PID_FILE)
        if ps -p $PID > /dev/null; then
            echo "   ⏹️  Arrêt du service avec PID $PID..."
            kill -9 $PID
            rm $PID_FILE
            echo "      ✅ Service arrêté."
        else
            echo "   ⚠️  Service avec PID $PID non trouvé. Nettoyage..."
            rm $PID_FILE
        fi
    fi
done

echo ""
echo "✨ TOUS LES SERVICES SONT ARRÊTÉS !"
echo "======================================="
echo ""
echo "Pour redémarrer, utilisez : ./scripts/start/all.sh"
echo "" 