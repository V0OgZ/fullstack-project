#!/bin/bash

echo "🎮 Lancement du Mode Histoire - Heroes of Time"
echo "=============================================="

# Vérifier que le backend est actif
echo "🔍 Vérification du backend..."
if ! curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
    echo "❌ Backend inactif ! Démarrage..."
    ./⚙️ scripts/start-backend.sh
    echo "⏳ Attente du backend..."
    sleep 5
fi

# Ouvrir le mode Histoire dans le navigateur
echo "🌐 Ouverture du Mode Histoire..."
if command -v xdg-open > /dev/null; then
    xdg-open "file:///workspace/🌐 frontend/story-mode.html"
elif command -v open > /dev/null; then
    open "file:///workspace/🌐 frontend/story-mode.html"
else
    echo "📍 Ouvrez manuellement : file:///workspace/🌐 frontend/story-mode.html"
fi

echo ""
echo "✨ Mode Histoire lancé !"
echo ""
echo "📖 Commandes utiles :"
echo "   - F12 pour ouvrir la console développeur"
echo "   - Cliquez sur Memento (🧠) pour des conseils"
echo "   - Les transitions entre mondes sont spectaculaires !"
echo ""
echo "🎯 Objectif : S'évader de la Cave → Atteindre l'Interstice → Découvrir la Source"
echo ""