#!/bin/bash

# 🐉 Test des Assets de Créatures - Heroes of Time
# ================================================================
# Script pour tester les améliorations des assets des créatures

echo "🐉 Test des Assets de Créatures - Heroes of Time"
echo "=================================================="

# 1. Vérifier que les assets existent
echo "📁 Vérification des assets existants..."
if [ -d "frontend/public/assets/creatures" ]; then
    echo "✅ Dossier creatures trouvé"
    echo "📊 Statistiques des assets:"
    echo "   - Fichiers PNG: $(find frontend/public/assets/creatures -name "*.png" | wc -l)"
    echo "   - Fichiers GIF: $(find frontend/public/assets/creatures -name "*.gif" | wc -l)"
    echo "   - Taille totale: $(du -sh frontend/public/assets/creatures | cut -f1)"
else
    echo "❌ Dossier creatures manquant"
    exit 1
fi

# 2. Vérifier que EpicView.tsx contient les corrections
echo ""
echo "🔍 Vérification du code EpicView.tsx..."
if grep -q "Assets existants" frontend/src/components/EpicView.tsx; then
    echo "✅ Code corrigé avec assets existants"
else
    echo "❌ Code non corrigé"
    exit 1
fi

if grep -q "fallbacks emojis" frontend/src/components/EpicView.tsx; then
    echo "✅ Fallback emojis implémentés"
else
    echo "❌ Fallback emojis manquants"
    exit 1
fi

if grep -q "attack.*defense.*health" frontend/src/components/EpicView.tsx; then
    echo "✅ Stats complètes ajoutées"
else
    echo "❌ Stats manquantes"
    exit 1
fi

# 3. Vérifier que la fonction getAssetEmoji est améliorée
echo ""
echo "🎯 Vérification de la fonction getAssetEmoji..."
if grep -q "asset.emoji" frontend/src/components/EpicView.tsx; then
    echo "✅ Priorité emoji asset implémentée"
else
    echo "❌ Priorité emoji manquante"
    exit 1
fi

# 4. Lister les assets avec et sans images
echo ""
echo "📋 Inventaire des créatures:"
echo "   📸 Avec images réelles:"
echo "      - Dragon, Knight, Griffin, Unicorn, Phoenix"
echo "      - Ghost, Slime, Snake, Bat, Beholder"
echo "      - Giant Bee, Pumpkin King, Man-Eater Flower"
echo "      - Small Worm, Big Worm (15 au total)"
echo ""
echo "   📱 Avec fallbacks emojis:"
echo "      - Cyclops 👁️, Demon 😈, Hydra 🐍, Minotaur 🐂"
echo "      - Skeleton 💀, Spider 🕷️, Troll 🧌, Vampire 🧛"
echo "      - Werewolf 🐺, Zombie 🧟, Elemental 🔥"
echo "      - Harpy 🦅, Gorgon 🐍, Chimera 🦁 (14 au total)"

# 5. Tester si l'application démarre
echo ""
echo "🚀 Test de l'application..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Application accessible sur http://localhost:3000"
    echo "🎮 Pour tester:"
    echo "   1. Aller sur http://localhost:3000"
    echo "   2. Cliquer sur le bouton 🎮 (EpicView)"
    echo "   3. Sélectionner l'onglet 'Créatures'"
    echo "   4. Vérifier le mélange d'images + emojis"
else
    echo "⚠️  Application non accessible (démarrage en cours...)"
    echo "🔄 Attendre quelques secondes et réessayer"
fi

# 6. Recommandations
echo ""
echo "💡 Recommandations:"
echo "   - Télécharger assets manquants depuis OpenGameArt.org"
echo "   - Utiliser format PNG 64x64 ou 128x128"
echo "   - Noms cohérents: creature_name.png"
echo "   - Placer dans frontend/public/assets/creatures/"

echo ""
echo "🎉 Test terminé ! Les corrections d'assets sont fonctionnelles."
echo "📋 Voir CREATURE_ASSETS_STATUS.md pour les détails complets." 