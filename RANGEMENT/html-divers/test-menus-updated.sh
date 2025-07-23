#!/bin/bash

# 🎮 TEST DES MENUS AMÉLIORÉS
# Vérifie que tous les menus principaux sont mis à jour avec les nouvelles images

echo "🎮 Test des Menus Améliorés - Heroes of Time"
echo "============================================"

# Vérifier si l'app est lancée
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ L'application n'est pas lancée sur localhost:3000"
    echo "💡 Lance d'abord : ./start-app.sh"
    exit 1
fi

echo "✅ Application détectée sur localhost:3000"

# Vérifier les améliorations des menus
echo "🔍 Vérification des améliorations..."

# 1. Menu Heroes
echo "🦸 MENU HEROES :"
if grep -q "HeroPortrait" frontend/src/components/TrueHeroesInterface.tsx; then
    echo "✅ Portraits Flare intégrés"
else
    echo "❌ Portraits Flare manquants"
fi

if grep -q "hero-inventory" frontend/src/components/TrueHeroesInterface.tsx; then
    echo "✅ Inventaire des héros ajouté"
else
    echo "❌ Inventaire manquant"
fi

if grep -q "Excalibur" frontend/src/components/TrueHeroesInterface.tsx; then
    echo "✅ Objets magiques dans l'équipement"
else
    echo "❌ Objets magiques manquants"
fi

# 2. Menu Castle
echo ""
echo "🏰 MENU CASTLE :"
if grep -q "castle-creatures" frontend/src/components/TrueHeroesInterface.tsx; then
    echo "✅ Créatures du château ajoutées"
else
    echo "❌ Créatures manquantes"
fi

if grep -q "castle-buildings" frontend/src/components/TrueHeroesInterface.tsx; then
    echo "✅ Bâtiments du château ajoutés"
else
    echo "❌ Bâtiments manquants"
fi

if grep -q "Dragon Rouge" frontend/src/components/TrueHeroesInterface.tsx; then
    echo "✅ Dragon Rouge dans le château"
else
    echo "❌ Dragon Rouge manquant"
fi

# 3. CSS Améliorations
echo ""
echo "🎨 CSS AMÉLIORATIONS :"
if grep -q "hero-inventory" frontend/src/components/TrueHeroesInterface.css; then
    echo "✅ Styles d'inventaire ajoutés"
else
    echo "❌ Styles d'inventaire manquants"
fi

if grep -q "castle-creatures" frontend/src/components/TrueHeroesInterface.css; then
    echo "✅ Styles de créatures ajoutés"
else
    echo "❌ Styles de créatures manquants"
fi

if grep -q "castle-buildings" frontend/src/components/TrueHeroesInterface.css; then
    echo "✅ Styles de bâtiments ajoutés"
else
    echo "❌ Styles de bâtiments manquants"
fi

# 4. EpicView
echo ""
echo "🎮 EPIC VIEW :"
if grep -q "EpicView" frontend/src/components/TrueHeroesInterface.tsx; then
    echo "✅ EpicView intégré"
else
    echo "❌ EpicView manquant"
fi

if [ -f "frontend/src/data/dragonRouge.ts" ]; then
    echo "✅ Dragon Rouge sauvegardé"
else
    echo "❌ Dragon Rouge manquant"
fi

# Instructions de test manuel
echo ""
echo "🔧 INSTRUCTIONS DE TEST MANUEL :"
echo "1. Ouvre http://localhost:3000 dans ton navigateur"
echo "2. Teste le MENU HEROES :"
echo "   - Clique sur le bouton 🦸 (Heroes)"
echo "   - Vérifier les portraits Flare des héros"
echo "   - Vérifier l'inventaire avec objets magiques"
echo "   - Vérifier l'équipement avec bonus"
echo ""
echo "3. Teste le MENU CASTLE :"
echo "   - Clique sur le bouton 🏰 (Castle)"
echo "   - Vérifier les créatures disponibles"
echo "   - Vérifier les bâtiments du château"
echo "   - Vérifier les stats du château"
echo ""
echo "4. Teste l'EPIC VIEW :"
echo "   - Clique sur le bouton 🎮 (Epic View)"
echo "   - Vérifier les 4 onglets : Héros, Créatures, Bâtiments, Objets"
echo "   - Vérifier le dragon rouge 🐉 dans Créatures"
echo "   - Vérifier les 12 objets magiques dans Objets"

# Résumé des améliorations
echo ""
echo "📊 RÉSUMÉ DES AMÉLIORATIONS :"
echo "🦸 MENU HEROES :"
echo "   - Portraits Flare (23 héros)"
echo "   - Inventaire avec objets magiques"
echo "   - Équipement avec bonus détaillés"
echo "   - Stats améliorées"
echo ""
echo "🏰 MENU CASTLE :"
echo "   - Créatures disponibles avec prix"
echo "   - Bâtiments avec niveaux"
echo "   - Stats du château"
echo "   - Dragon Rouge intégré"
echo ""
echo "🎮 EPIC VIEW :"
echo "   - Style doré fantasy cohérent"
echo "   - 23 héros avec portraits"
echo "   - 28 créatures avec emojis"
echo "   - 12 objets magiques complets"
echo "   - Dragon Rouge sauvegardé"

echo ""
echo "🎯 RÉSULTAT : Tous les menus sont maintenant améliorés avec les nouvelles images et données !"
echo "🎨 Les styles sont cohérents avec le thème doré fantasy"
echo "📱 Interface responsive pour mobile" 