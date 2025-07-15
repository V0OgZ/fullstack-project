#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║          🎮 HEROES OF TIME - DEMO MODE 🎮                     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Menu de sélection
echo "Choisissez le mode de démo:"
echo "  1) Mode normal (avec barres du navigateur)"
echo "  2) Mode plein écran (kiosque)"
echo ""
read -p "Votre choix (1 ou 2): " -n 1 -r choice
echo ""
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

echo "✅ Servers detected..."
echo ""

cd frontend

# Lancer le mode approprié
if [[ $choice == "2" ]]; then
    echo "🚀 Lancement en mode plein écran..."
    echo "📌 Appuyez sur ESC pour quitter le plein écran"
    echo ""
    npx playwright test tests/e2e/fullscreen-demo.spec.ts --reporter=list --timeout=120000
else
    echo "🚀 Lancement en mode normal..."
    echo ""
    npx playwright test tests/e2e/01-single-demo.spec.ts --headed --reporter=list
fi

echo ""
echo "✨ Demo completed!" 