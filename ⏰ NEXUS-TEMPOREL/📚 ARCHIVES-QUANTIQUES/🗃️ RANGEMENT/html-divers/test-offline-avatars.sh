#!/bin/bash

echo "🎮 Test des Avatars Dicebear 100% Offline"
echo "=========================================="

# Vérifier que les packages Dicebear sont installés
echo "📦 Vérification des packages Dicebear..."
if npm list @dicebear/core @dicebear/collection > /dev/null 2>&1; then
    echo "✅ Packages Dicebear installés"
else
    echo "❌ Packages Dicebear manquants - Installation..."
    cd frontend && npm install @dicebear/core @dicebear/collection
fi

# Démarrer l'application
echo "🚀 Démarrage de l'application..."
./start-app.sh &

# Attendre que l'application soit prête
echo "⏳ Attente du démarrage..."
sleep 10

# Ouvrir le navigateur sur la page de test
echo "🌐 Ouverture du navigateur..."
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:3000/offline-avatar-test
elif command -v open > /dev/null; then
    open http://localhost:3000/offline-avatar-test
else
    echo "🌐 Ouvrez manuellement: http://localhost:3000/offline-avatar-test"
fi

echo ""
echo "✅ Test prêt !"
echo "📋 Instructions:"
echo "   1. Vérifiez que les avatars se génèrent"
echo "   2. Testez le bouton 'Télécharger JSON'"
echo "   3. Vérifiez les statistiques"
echo "   4. Testez les héros sur la carte principale"
echo ""
echo "🎯 Pour tester les héros sur la carte:"
echo "   - Allez sur http://localhost:3000"
echo "   - Les héros devraient avoir des avatars Dicebear"
echo ""
echo "🛑 Pour arrêter: ./stop-app.sh"