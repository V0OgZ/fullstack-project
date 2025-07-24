#!/bin/bash

echo "🔮 TEST FORGE RUNIQUE - SYSTÈME CLÉ SPHINX"
echo "=================================================="
echo ""

# Vérifier que le serveur port 8000 fonctionne
echo "🌐 Vérification du serveur port 8000..."
if curl -s http://localhost:8000 > /dev/null; then
    echo "✅ Serveur port 8000 : ACTIF"
else
    echo "❌ Serveur port 8000 : INACTIF"
    echo "🚀 Lancement du serveur..."
    cd frontend
    python3 -m http.server 8000 &
    SERVER_PID=$!
    echo "📝 PID du serveur : $SERVER_PID"
    sleep 2
    cd ..
fi

echo ""

# Vérifier l'accès à la Forge Runique
echo "🔮 Vérification de la Forge Runique..."
if curl -s http://localhost:8000/forge-runique.html | grep -q "Forge Runique"; then
    echo "✅ Forge Runique : ACCESSIBLE"
else
    echo "❌ Forge Runique : ERREUR"
    exit 1
fi

echo ""

# Vérifier l'interface principale
echo "🎮 Vérification de l'interface principale..."
if curl -s http://localhost:8000 | grep -q "🔮 Forge Runique"; then
    echo "✅ Bouton Forge Runique : PRÉSENT dans l'interface"
else
    echo "❌ Bouton Forge Runique : MANQUANT"
    exit 1
fi

echo ""
echo "🏛️ SYSTÈME DE CLÉ SPHINX"
echo "========================"
echo ""
echo "📋 INSTRUCTIONS POUR TESTER :"
echo ""
echo "1. 🌐 Ouvre ton navigateur sur : http://localhost:8000"
echo "2. 🔮 Clique sur le bouton 'Forge Runique'"
echo "3. 🏛️ Un défi du Sphinx apparaît avec l'énigme :"
echo "   \"Je suis l'état qui existe avant l'observation,\""
echo "   \"ni vrai ni faux mais les deux à la fois. Que suis-je ?\""
echo ""
echo "4. 🧠 RÉPONSES ACCEPTÉES :"
echo "   - superposition"
echo "   - état de superposition"
echo "   - superposition quantique"
echo "   - psi"
echo "   - ψ"
echo ""
echo "5. ✅ Si la réponse est correcte :"
echo "   - La clé Sphinx est déverrouillée"
echo "   - La Forge Runique s'ouvre automatiquement"
echo "   - L'accès est sauvé pour les prochaines fois"
echo ""
echo "6. ❌ Si la réponse est incorrecte :"
echo "   - Le Sphinx refuse l'accès"
echo "   - Un indice est donné"
echo "   - Tu peux réessayer"
echo ""

# Test JSON avec les données prévues
echo "🔧 FONCTIONNALITÉS DE LA FORGE :"
echo "================================"
echo ""
echo "📜 Dans la Forge Runique tu peux :"
echo "   🔮 Créer des formules runiques avec symboles ψ⊙†"
echo "   ⚡ Tester les formules en temps réel"
echo "   🎨 Voir les traductions littéraires"
echo "   🧪 Expérimenter avec les états quantiques"
echo "   📊 Analyser les propriétés des artefacts"
echo ""

# Vérifier les artefacts prévus dans le JSON
echo "🎯 ARTEFACTS DISPONIBLES DANS LE JSON :"
echo "======================================="
echo ""

# Rechercher les artefacts dans les fichiers JSON
if find game_assets -name "*.json" -exec grep -l "forge\|runique\|sphinx" {} \; | head -3; then
    echo "✅ Artefacts liés à la Forge trouvés dans les assets"
else
    echo "⚠️ Aucun artefact spécifique à la Forge trouvé"
fi

echo ""
echo "🚀 POUR COMMENCER LE TEST :"
echo "==========================="
echo ""
echo "🌐 Ouvre : http://localhost:8000"
echo "🔮 Clique sur 'Forge Runique'"
echo "🏛️ Résous l'énigme du Sphinx"
echo "⚒️ Explore la Forge Runique !"
echo ""
echo "🛋️ Jean-Grofignon : \"La Forge Runique cache des secrets quantiques !\""
echo ""

# Test de connectivité finale
echo "🔍 TEST FINAL DE CONNECTIVITÉ :"
echo "==============================="
echo ""

# Test interface principale
if curl -s -w "%{http_code}" http://localhost:8000 | tail -1 | grep -q "200"; then
    echo "✅ Interface principale : OK (200)"
else
    echo "❌ Interface principale : ERREUR"
fi

# Test Forge Runique
if curl -s -w "%{http_code}" http://localhost:8000/forge-runique.html | tail -1 | grep -q "200"; then
    echo "✅ Forge Runique : OK (200)"
else
    echo "❌ Forge Runique : ERREUR"
fi

echo ""
echo "🎉 TEST TERMINÉ - SYSTÈME PRÊT !"
echo "================================"
echo ""
echo "🔗 LIENS DIRECTS :"
echo "  📱 Interface : http://localhost:8000"
echo "  🔮 Forge : http://localhost:8000/forge-runique.html"
echo ""
echo "🏛️ Que le Sphinx te guide vers la sagesse quantique !" 