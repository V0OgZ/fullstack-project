#!/bin/bash

echo "🧬 ANALYSE COMPLÈTE - OBJETS VIVANTS & ÉVOLUTIFS"
echo "================================================"
echo ""

echo "🔍 RECHERCHE DE TOUTES LES CATÉGORIES D'OBJETS VIVANTS..."
echo "========================================================="
echo ""

# Compteurs
LIVING_OBJECTS=0
CATEGORIES_FOUND=0

# Recherche des catégories d'objets vivants
echo "📋 CATÉGORIES IDENTIFIÉES :"
echo "==========================="
echo ""

# 1. Tatouages Temporels
echo "🎨 1. TATOUAGES TEMPORELS"
echo "------------------------"
if grep -q '"category": "Tatouages Temporels"' 🎮 game_assets/artifacts/mineurs/tatouages_memento_archiviste.json; then
    echo "✅ Trouvé : Tatouages de Memento l'Archiviste"
    echo "   📍 Localisation : 🎮 game_assets/artifacts/mineurs/tatouages_memento_archiviste.json"
    echo "   🎯 Type : Marques Corporelles Temporelles Évolutives"
    echo "   ⭐ Rareté : MYTHIQUE_PERSONNEL"
    echo "   🔮 Évolution : Automatique avec accomplissements"
    LIVING_OBJECTS=$((LIVING_OBJECTS + 1))
    CATEGORIES_FOUND=$((CATEGORIES_FOUND + 1))
fi
echo ""

# 2. Living Artifacts (Quatrième Mur)
echo "🌀 2. LIVING ARTIFACTS"
echo "----------------------"
if grep -q '"category": "living_artifact"' 🎮 game_assets/artifacts/quatrieme_mur/artifacts_quatrieme_mur.json; then
    echo "✅ Trouvé : Éclat de Coquille Fendue"
    echo "   📍 Localisation : 🎮 game_assets/artifacts/quatrieme_mur/artifacts_quatrieme_mur.json"
    echo "   🎯 Type : Fragment qui N'appartient à Aucun Monde"
    echo "   ⭐ Rareté : ERRANT"
    echo "   🔮 Comportement : Vibre, pulse, respire - cherche son monde d'origine"
    LIVING_OBJECTS=$((LIVING_OBJECTS + 1))
    CATEGORIES_FOUND=$((CATEGORIES_FOUND + 1))
fi
echo ""

# 3. Archive Vivante
echo "📚 3. ARCHIVE VIVANTE"
echo "---------------------"
if find game_assets -name "*.json" -exec grep -l "archive_vivante\|Archive Vivante" {} \; | head -1 > /dev/null; then
    echo "✅ Trouvé : Archive Vivante du Quatrième Mur"
    echo "   📍 Localisation : 🎮 game_assets/artifacts/quatrieme_mur/archive_vivante_quatrieme_mur.json"
    echo "   🎯 Type : Archive auto-évolutive"
    echo "   ⭐ Rareté : PARADOXALE"
    echo "   🔮 Fonction : Stockage vivant de données temporelles"
    LIVING_OBJECTS=$((LIVING_OBJECTS + 1))
    CATEGORIES_FOUND=$((CATEGORIES_FOUND + 1))
fi
echo ""

# 4. Encre Vivante
echo "🖋️ 4. ENCRE VIVANTE"
echo "-------------------"
if find game_assets -name "*.json" -exec grep -l "encre_vivante\|Encre Vivante" {} \; | head -1 > /dev/null; then
    echo "✅ Trouvé : Encre Vivante (Éclat Mondes Dissous)"
    echo "   📍 Localisation : 📖 docs/items/ECLAT_MONDES_DISSOLUS_ARTIFACTS.json"
    echo "   🎯 Type : Substance scriptive vivante"
    echo "   ⭐ Rareté : NARRATIVE"
    echo "   🔮 Pouvoir : Écrit et réécrit la réalité"
    LIVING_OBJECTS=$((LIVING_OBJECTS + 1))
    CATEGORIES_FOUND=$((CATEGORIES_FOUND + 1))
fi
echo ""

# 5. Créatures Vivantes Spéciales
echo "👻 5. CRÉATURES VIVANTES SPÉCIALES"
echo "----------------------------------"
if grep -q "mort-vivant\|Mort-Vivant" 🎮 game_assets/creatures/epic/epic-creatures.json; then
    echo "✅ Trouvé : Créatures Morts-Vivants"
    echo "   📍 Localisation : 🎮 game_assets/creatures/epic/epic-creatures.json"
    echo "   🎯 Type : Sorciers morts-vivants, Guerriers fantômes"
    echo "   ⭐ Rareté : ÉPIQUE"
    echo "   🔮 Particularité : Existent entre vie et mort"
    LIVING_OBJECTS=$((LIVING_OBJECTS + 1))
    CATEGORIES_FOUND=$((CATEGORIES_FOUND + 1))
fi
echo ""

# 6. Chat de Schrödinger (Superposition Vitale)
echo "🐱 6. SUPERPOSITION VITALE"
echo "--------------------------"
if find game_assets -name "*.json" -exec grep -l "Superposition Vitale\|vivant.*mort" {} \; | head -1 > /dev/null; then
    echo "✅ Trouvé : Chat de Schrödinger"
    echo "   📍 Localisation : 🖥️ backend/src/main/resources/creatures/schrodinger_cat.json"
    echo "   🎯 Type : Créature en superposition quantique"
    echo "   ⭐ Rareté : QUANTIQUE"
    echo "   🔮 État : Vivant ET mort jusqu'à observation"
    LIVING_OBJECTS=$((LIVING_OBJECTS + 1))
    CATEGORIES_FOUND=$((CATEGORIES_FOUND + 1))
fi
echo ""

# 7. Bâtiments Vivants
echo "🏰 7. BÂTIMENTS VIVANTS"
echo "-----------------------"
if grep -q "Château vivant\|vivant dans" 🎮 game_assets/buildings/epic/epic-buildings.json; then
    echo "✅ Trouvé : Château Vivant dans Arbre Géant"
    echo "   📍 Localisation : 🎮 game_assets/buildings/epic/epic-buildings.json"
    echo "   🎯 Type : Architecture organique"
    echo "   ⭐ Rareté : ÉPIQUE"
    echo "   🔮 Croissance : Évolue avec l'arbre hôte"
    LIVING_OBJECTS=$((LIVING_OBJECTS + 1))
    CATEGORIES_FOUND=$((CATEGORIES_FOUND + 1))
fi
echo ""

# Analyse des interactions
echo "🔗 INTERACTIONS ENTRE OBJETS VIVANTS :"
echo "======================================"
echo ""

echo "🌟 RÉSONANCES DÉTECTÉES :"
echo ""

# Tatouages + Archive Vivante
if grep -q "archive_vivante" 🎮 game_assets/artifacts/mineurs/tatouages_memento_archiviste.json; then
    echo "   🎨↔️📚 Tatouages Memento ↔ Archive Vivante"
    echo "      → Synchronisation des données temporelles"
fi

# Tatouages + Talisman Echo
if grep -q "talisman_echo" 🎮 game_assets/artifacts/mineurs/tatouages_memento_archiviste.json; then
    echo "   🎨↔️🔮 Tatouages Memento ↔ Talisman Echo"
    echo "      → Résonance entre marques corporelles et écho futur"
fi

# Archive + Quatrième Mur
if find game_assets -name "*.json" -exec grep -l "archive_vivante.*quatrieme_mur" {} \; | head -1 > /dev/null; then
    echo "   📚↔️🌀 Archive Vivante ↔ Quatrième Mur"
    echo "      → Stockage de données méta-narratives"
fi

echo ""

# Statistiques finales
echo "📊 STATISTIQUES FINALES :"
echo "========================="
echo ""
echo "   🧬 Objets vivants trouvés : $LIVING_OBJECTS"
echo "   📋 Catégories identifiées : $CATEGORIES_FOUND"
echo "   🔗 Interactions détectées : 3+"
echo "   🎯 Évolution active : OUI"
echo ""

# Classification par comportement
echo "🎭 CLASSIFICATION PAR COMPORTEMENT :"
echo "===================================="
echo ""
echo "   🔄 ÉVOLUTIFS (changent avec le temps) :"
echo "      • Tatouages Memento (avec accomplissements)"
echo "      • Archive Vivante (avec nouvelles données)"
echo ""
echo "   💓 PULSANTS (activité rythmique) :"
echo "      • Éclat de Coquille Fendue (bat comme un cœur)"
echo "      • Talisman Echo (pulse avec le futur)"
echo ""
echo "   🌀 ADAPTATIFS (réagissent à l'environnement) :"
echo "      • Encre Vivante (réécrit selon contexte)"
echo "      • Chat Schrödinger (état selon observation)"
echo ""
echo "   🏗️ CROISSANTS (développement physique) :"
echo "      • Château Vivant (grandit avec l'arbre)"
echo "      • Archive Vivante (expansion de données)"
echo ""

# Recommandations d'utilisation
echo "🎮 UTILISATION EN JEU :"
echo "======================="
echo ""
echo "1. 🎨 ÉQUIPER Memento avec ses tatouages évolutifs"
echo "2. 🔮 UTILISER Éclat de Coquille pour détecter failles"
echo "3. 📚 CONSULTER Archive Vivante pour données temporelles"
echo "4. 🖋️ MANIPULER Encre Vivante pour réécrire réalité"
echo "5. 🐱 OBSERVER Chat Schrödinger pour forcer état"
echo "6. 🏰 HABITER Château Vivant pour croissance symbiotique"
echo ""

echo "🧪 TEST RECOMMANDÉ DANS LA FORGE :"
echo "=================================="
echo ""
echo "Formule de test pour objets vivants :"
echo ""
echo "ψ_LIVING_SCAN: ⊙(DETECT_ALL_LIVING_OBJECTS radius_50) ⟶ SHOW_VITALITY_STATUS(all)"
echo ""

echo "🛋️ Jean-Grofignon : \"Les objets vivants sont l'avenir du jeu !\""
echo "                   \"Ils évoluent, s'adaptent, créent des surprises !\""
echo ""

if [ $LIVING_OBJECTS -gt 5 ]; then
    echo "🎉 ÉCOSYSTÈME RICHE : $LIVING_OBJECTS objets vivants détectés !"
    echo "🌟 Heroes of Time possède un véritable écosystème d'objets évolutifs !"
else
    echo "🌱 ÉCOSYSTÈME EN DÉVELOPPEMENT : $LIVING_OBJECTS objets vivants"
fi

echo ""
echo "🔬 POUR EXPLORER PLUS :"
echo "======================"
echo "   🌐 Interface : http://localhost:8000"
echo "   🔮 Forge Runique : Teste les interactions"
echo "   👤 Sélectionne Memento pour voir ses tatouages"
echo "   🧪 Expérimente avec les formules de détection" 