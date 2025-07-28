#!/bin/bash

echo "🎮 Test des Avatars - Heroes of Time"
echo "====================================="

# Vérifier si le frontend est lancé
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Frontend non accessible sur http://localhost:3000"
    echo "💡 Lancez d'abord: ./start-app.sh"
    exit 1
fi

echo "✅ Frontend accessible"
echo ""
echo "🎯 Options de test:"
echo "1. Ouvrir la page de test des avatars"
echo "2. Tester les avatars Dicebear"
echo "3. Voir les images locales"
echo ""

# Ouvrir la page de test
echo "🌐 Ouverture de la page de test..."
if command -v xdg-open > /dev/null; then
    xdg-open "http://localhost:3000/avatar-test"
elif command -v open > /dev/null; then
    open "http://localhost:3000/avatar-test"
else
    echo "💡 Ouvrez manuellement: http://localhost:3000/avatar-test"
fi

echo ""
echo "📋 Instructions:"
echo "- Cliquez sur '🧪 Test Avatars' pour voir tous les héros"
echo "- Cliquez sur '🎲 Générateur Dicebear' pour générer des avatars"
echo "- Les avatars Dicebear sont en vert"
echo "- Les avatars locaux sont en orange"
echo "- Les emojis sont en fallback"
echo ""
echo "🎲 Dicebear est légal et gratuit !"
echo "✅ Attribution requise: 'Powered by Dicebear'"
echo "✅ Téléchargement autorisé"
echo "✅ Usage offline possible après génération"
echo ""
echo "🚀 Test en cours..."