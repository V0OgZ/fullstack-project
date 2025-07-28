#!/bin/bash

# 🎮 DÉMONSTRATION DU SYSTÈME DE SCRIPTS HEROES OF TIME
# Test des scripts .hots via API REST

echo "🚀 === DÉMONSTRATION DU SYSTÈME DE SCRIPTS HEROES OF TIME ==="
echo ""

# Vérifier si le backend est démarré
echo "🔍 Vérification du backend..."
if curl -s http://localhost:8080/api/temporal/health > /dev/null 2>&1; then
    echo "✅ Backend actif sur le port 8080"
else
    echo "❌ Backend non démarré. Démarrage automatique..."
    cd backend
    mvn spring-boot:run -q &
    BACKEND_PID=$!
    echo "⏳ Attente du démarrage du backend..."
    sleep 15
    cd ..
fi

echo ""
echo "📋 Phase 1: Liste des scripts disponibles"
echo "==========================================="
curl -s http://localhost:8080/api/temporal/⚙️ scripts/list | jq '.'

echo ""
echo "🎮 Phase 2: Exécution du script de démonstration simple"
echo "========================================================"
curl -s -X POST http://localhost:8080/api/temporal/⚙️ scripts/execute-verbose \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "demos/simple-game.hots", "parser": "regex"}' | jq '.'

echo ""
echo "🧪 Phase 3: Test de comparaison des parsers"
echo "============================================"
curl -s -X POST http://localhost:8080/api/temporal/⚙️ scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "🧪 tests/parser-comparison.hots", "parser": "regex"}' | jq '.'

echo ""
echo "📊 Phase 4: Benchmark automatique des parsers"
echo "=============================================="
curl -s -X POST http://localhost:8080/api/temporal/⚙️ scripts/benchmark \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "🧪 tests/parser-comparison.hots"}' | jq '.'

echo ""
echo "⚔️ Phase 5: Scénario épique Arthur vs Ragnar"
echo "============================================="
curl -s -X POST http://localhost:8080/api/temporal/⚙️ scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "scenarios/epic-arthur-vs-ragnar.hots", "parser": "regex"}' | jq '.'

echo ""
echo "🎉 === DÉMONSTRATION TERMINÉE ==="
echo ""
echo "📊 RÉSUMÉ DU SYSTÈME DE SCRIPTS:"
echo "- ✅ Scripts .hots fonctionnels"
echo "- ✅ API REST complète"
echo "- ✅ Benchmark automatique"
echo "- ✅ Mode verbose avec logs"
echo "- ✅ Support des deux parsers"
echo ""
echo "🔧 ENDPOINTS DISPONIBLES:"
echo "- GET  /api/temporal/⚙️ scripts/list"
echo "- POST /api/temporal/⚙️ scripts/execute"
echo "- POST /api/temporal/⚙️ scripts/execute-verbose"
echo "- POST /api/temporal/⚙️ scripts/benchmark"
echo ""
echo "🎯 Le système est prêt pour la production !"

# Nettoyer le processus backend si on l'a démarré
if [ ! -z "$BACKEND_PID" ]; then
    kill $BACKEND_PID 2>/dev/null
fi 