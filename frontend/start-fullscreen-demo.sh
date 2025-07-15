#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║      🎮 HEROES OF TIME - MODE DÉMO PLEIN ÉCRAN 🎮            ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "🚀 Lancement de la démo en mode kiosque plein écran..."
echo ""
echo "📌 Instructions:"
echo "   - La démo va s'ouvrir en plein écran automatiquement"
echo "   - Appuyez sur ESC pour quitter le mode plein écran"
echo "   - La souris disparaîtra après 3 secondes d'inactivité"
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

echo "✅ Serveurs détectés, lancement du mode plein écran..."
echo ""

# Désactiver temporairement les protections du navigateur pour le mode kiosque
export PLAYWRIGHT_CHROMIUM_USE_CHROMIUM_STABLE=1

# Lancer le test fullscreen
cd frontend
npx playwright test tests/e2e/fullscreen-demo.spec.ts --reporter=list --timeout=120000

echo ""
echo "✨ Démo plein écran terminée!"
echo ""

# Proposer de relancer
read -p "🔄 Voulez-vous relancer la démo? (o/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Oo]$ ]]; then
    exec "$0"
fi 