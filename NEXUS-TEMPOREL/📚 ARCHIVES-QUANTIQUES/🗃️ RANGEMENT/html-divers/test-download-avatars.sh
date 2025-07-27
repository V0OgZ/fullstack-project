#!/bin/bash

echo "🎮 Test Téléchargement Avatars Dicebear"
echo "======================================="

# Vérifier que l'application est démarrée
echo "🔍 Vérification de l'application..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Application démarrée sur port 3000"
else
    echo "❌ Application non démarrée - Démarrage..."
    ./start-app.sh &
    sleep 10
fi

# Ouvrir la page de test
echo "🌐 Ouverture de la page de test..."
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:3000/offline-avatar-test
elif command -v open > /dev/null; then
    open http://localhost:3000/offline-avatar-test
else
    echo "🌐 Ouvrez manuellement: http://localhost:3000/offline-avatar-test"
fi

echo ""
echo "✅ Test de téléchargement prêt !"
echo ""
echo "📋 Instructions de test :"
echo "   1. Attendez que les avatars se génèrent"
echo "   2. Testez 'Télécharger Tous (SVG)' - 9 fichiers SVG"
echo "   3. Testez 'Télécharger Tous (PNG)' - 9 fichiers PNG"
echo "   4. Testez les boutons individuels sous chaque avatar"
echo "   5. Vérifiez vos téléchargements dans le dossier Downloads"
echo ""
echo "📁 Fichiers attendus :"
echo "   - arthur-adventurer.svg/png"
echo "   - morgana-lorelei.svg/png"
echo "   - tristan-micah.svg/png"
echo "   - elara-personas.svg/png"
echo "   - gareth-big-ears.svg/png"
echo "   - lyanna-micah.svg/png"
echo "   - cedric-adventurer.svg/png"
echo "   - seraphina-lorelei.svg/png"
echo "   - valen-personas.svg/png"
echo ""
echo "🎯 Format des fichiers :"
echo "   - SVG : Vectoriel, redimensionnable, léger"
echo "   - PNG : Raster, haute qualité, 256x256px"
echo ""
echo "🛑 Pour arrêter: ./stop-app.sh"