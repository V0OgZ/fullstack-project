#!/bin/bash

echo "🎨 TEST TATOUAGES MEMENTO - OBJET DE JEU OU OBSERVATION ?"
echo "========================================================="
echo ""

echo "🤔 QUESTION : Les tatouages Memento sont-ils :"
echo "   A) 📊 Un objet de jeu avec stats ?"
echo "   B) 👁️ Juste pour observer l'évolution ?"
echo ""

# Analyser le fichier JSON des tatouages
echo "🔍 ANALYSE DU FICHIER TATOUAGES..."
echo "=================================="
echo ""

# Vérifier la structure
if grep -q '"stats"' game_assets/artifacts/mineurs/tatouages_memento_archiviste.json; then
    echo "✅ Stats trouvées : OBJET DE JEU"
    GAME_OBJECT=true
else
    echo "❌ Pas de stats : OBSERVATION SEULEMENT"
    GAME_OBJECT=false
fi

if grep -q '"attack"\|"defense"\|"power"' game_assets/artifacts/mineurs/tatouages_memento_archiviste.json; then
    echo "✅ Stats de combat trouvées : OBJET DE JEU"
    GAME_OBJECT=true
else
    echo "❌ Pas de stats de combat : OBSERVATION"
fi

if grep -q '"slot"' game_assets/artifacts/mineurs/tatouages_memento_archiviste.json; then
    echo "✅ Slot d'équipement : OBJET DE JEU"
    GAME_OBJECT=true
else
    echo "❌ Pas de slot : OBSERVATION"
fi

echo ""

# Vérifier dans le backend
echo "🔍 VÉRIFICATION BACKEND..."
echo "=========================="
echo ""

if find backend -name "*.java" -exec grep -l "tatouages\|tattoo" {} \; | head -1; then
    echo "✅ Tatouages référencés dans le backend : OBJET DE JEU"
    GAME_OBJECT=true
else
    echo "❌ Pas de référence backend : OBSERVATION SEULEMENT"
fi

echo ""

# Analyser le contenu du JSON
echo "📋 CONTENU DES TATOUAGES :"
echo "========================="
echo ""

echo "🎨 Type trouvé :"
grep '"type"' game_assets/artifacts/mineurs/tatouages_memento_archiviste.json | head -1

echo ""
echo "🎯 Slot trouvé :"
grep '"slot"' game_assets/artifacts/mineurs/tatouages_memento_archiviste.json | head -1

echo ""
echo "⭐ Rareté trouvée :"
grep '"rarity"' game_assets/artifacts/mineurs/tatouages_memento_archiviste.json | head -1

echo ""

# Vérifier les interactions magiques
echo "🔮 INTERACTIONS MAGIQUES :"
echo "=========================="
echo ""

if grep -q '"interactions_magiques"' game_assets/artifacts/mineurs/tatouages_memento_archiviste.json; then
    echo "✅ Interactions magiques trouvées :"
    grep -A 10 '"interactions_magiques"' game_assets/artifacts/mineurs/tatouages_memento_archiviste.json | head -6
    GAME_OBJECT=true
else
    echo "❌ Pas d'interactions magiques"
fi

echo ""

# Conclusion
echo "🎯 CONCLUSION FINALE :"
echo "====================="
echo ""

if [ "$GAME_OBJECT" = true ]; then
    echo "✅ RÉSULTAT : OBJET DE JEU HYBRIDE"
    echo "=================================="
    echo ""
    echo "🎨 Les tatouages Memento sont :"
    echo "   📊 Un artefact équipable (slot: Corps Entier)"
    echo "   🔮 Avec interactions magiques"
    echo "   ⭐ Rareté MYTHIQUE_PERSONNEL"
    echo "   👁️ ET système d'observation de l'évolution"
    echo ""
    echo "🎮 UTILISATION EN JEU :"
    echo "   🛡️ Memento peut les équiper"
    echo "   ⚡ Donnent des bonus spéciaux"
    echo "   🔄 Évoluent avec les accomplissements"
    echo "   📚 Servent d'archive vivante"
    echo ""
    echo "🧪 POUR TESTER :"
    echo "   1. 🌐 Va sur http://localhost:8000"
    echo "   2. 👤 Sélectionne Memento comme héros"
    echo "   3. 🎒 Regarde son inventaire"
    echo "   4. 🎨 Équipe les tatouages"
    echo "   5. 📊 Observe les bonus"
    
else
    echo "❌ RÉSULTAT : OBSERVATION SEULEMENT"
    echo "==================================="
    echo ""
    echo "👁️ Les tatouages Memento sont :"
    echo "   📚 Un système de lore évolutif"
    echo "   🏛️ Pour documenter l'histoire du projet"
    echo "   ⏰ Mis à jour automatiquement"
    echo "   🎨 Purement esthétique/narratif"
    echo ""
    echo "📖 UTILISATION :"
    echo "   👀 Juste pour lire l'évolution"
    echo "   📜 Comprendre l'histoire du jeu"
    echo "   🎭 Apprécier le lore de Memento"
fi

echo ""

# Test pratique
echo "🧪 TEST PRATIQUE RECOMMANDÉ :"
echo "============================="
echo ""
echo "1. 🔮 Va dans la Forge Runique"
echo "2. 📊 Teste cette formule :"
echo ""
echo "   ψ_MEMENTO_TATTOO: ⊙(INSPECT_TATTOOS Memento) ⟶ SHOW_STATS(all)"
echo ""
echo "3. 🎯 Si ça montre des stats → OBJET DE JEU"
echo "4. 📚 Si ça montre juste du lore → OBSERVATION"
echo ""

echo "🛋️ Jean-Grofignon : \"Les tatouages de Memento cachent peut-être des secrets !\""
echo ""

if [ "$GAME_OBJECT" = true ]; then
    echo "🎉 TATOUAGES MEMENTO : ARTEFACT ÉQUIPABLE ÉVOLUTIF !"
else
    echo "📚 TATOUAGES MEMENTO : ARCHIVE VIVANTE OBSERVATIONNELLE !"
fi 