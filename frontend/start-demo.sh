#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║          🎮 HEROES OF TIME - DEMO MODE 🎮                     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "🚀 Launching visual demo with interface..."
echo ""

# Vérifier que les serveurs sont lancés
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Frontend not running! Please run ./start-app.sh first"
    exit 1
fi

if ! curl -s http://localhost:8080/api/health > /dev/null; then
    echo "❌ Backend not running! Please run ./start-app.sh first"
    exit 1
fi

echo "✅ Servers detected, launching demo..."
echo ""

# Lancer le test démo avec interface visible
cd frontend
npx playwright test tests/e2e/01-single-demo.spec.ts --headed --reporter=list

echo ""
echo "✨ Demo completed!" 