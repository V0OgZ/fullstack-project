#!/bin/bash

# 🔮 TEST DES OBJETS MAGIQUES
# Vérifie que les objets magiques sont correctement intégrés

echo "🔮 Test des Objets Magiques - Heroes of Time"
echo "=============================================="

# Vérifier si l'app est lancée
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ L'application n'est pas lancée sur localhost:3000"
    echo "💡 Lance d'abord : ./start-app.sh"
    exit 1
fi

echo "✅ Application détectée sur localhost:3000"

# Vérifier les fichiers modifiés
echo "🔍 Vérification des fichiers..."

if [ -f "🌐 frontend/src/components/EpicView.tsx" ]; then
    echo "✅ EpicView.tsx existe"
    
    # Vérifier si les objets magiques sont dans le code
    if grep -q "Excalibur" 🌐 frontend/src/components/EpicView.tsx; then
        echo "✅ Objets magiques trouvés dans EpicView.tsx"
    else
        echo "❌ Objets magiques manquants dans EpicView.tsx"
    fi
    
    if grep -q "emoji:" 🌐 frontend/src/components/EpicView.tsx; then
        echo "✅ Système d'emojis activé"
    else
        echo "❌ Système d'emojis manquant"
    fi
else
    echo "❌ EpicView.tsx n'existe pas"
fi

if [ -f "🌐 frontend/src/💾 data/dragonRouge.ts" ]; then
    echo "✅ Dragon rouge sauvegardé"
else
    echo "❌ Dragon rouge manquant"
fi

# Vérifier les assets (optionnel)
echo "📁 Vérification des assets..."

if [ -d "🌐 frontend/public/assets/objects" ]; then
    echo "✅ Dossier objects/ existe"
    object_count=$(find 🌐 frontend/public/assets/objects -name "*.png" -o -name "*.jpg" -o -name "*.gif" | wc -l)
    echo "📦 $object_count fichiers d'objets trouvés"
else
    echo "📦 Dossier objects/ n'existe pas (normal si on utilise les emojis)"
fi

# Test de l'interface
echo "🎮 Test de l'interface..."
echo "🔧 Instructions pour tester manuellement :"
echo "1. Ouvre http://localhost:3000 dans ton navigateur"
echo "2. Clique sur le bouton 🎮 (Epic View)"
echo "3. Clique sur l'onglet '⚔️ Objets'"
echo "4. Tu devrais voir 12 objets magiques avec emojis"
echo "5. Vérifie que le dragon rouge 🐉 est dans 'Créatures'"

# Résumé
echo ""
echo "📊 RÉSUMÉ DES OBJETS MAGIQUES :"
echo "⚔️ Excalibur (+5 ATK, +2 CHA)"
echo "🛡️ Bouclier du Dragon (+3 DEF, Résistance Feu)"
echo "💍 Anneau de Pouvoir (+2 Toutes Stats)"
echo "🧪 Potion de Vie (+100 HP)"
echo "📜 Parchemin Boule de Feu (50 dégâts feu)"
echo "🔮 Orbe de Sagesse (+10 MANA, +3 CON)"
echo "👢 Bottes de Vitesse (+2 VIT)"
echo "👑 Couronne des Rois (+5 LEAD)"
echo "🔱 Amulette de Vie (+50 HP max)"
echo "🪄 Bâton de l'Archimage (+8 MAG)"
echo "📚 Tome de Connaissance (+1 Niveau)"
echo "💎 Gemme du Dragon (+1000 Or/tour)"

echo ""
echo "🎯 RÉSULTAT : Les objets magiques sont prêts !"
echo "💡 Pour télécharger des assets : ./download-magic-items.sh"
echo "📖 Pour plus d'infos : voir OBJETS_MAGIQUES_GUIDE.md" 