#!/bin/bash

# ===============================================================================
# 🎮 TEST SCÉNARIOS INITIATIQUES - CONCEPTS BIZARRES DE HEROES OF TIME
# ===============================================================================
# Script de test pour vérifier les scénarios d'apprentissage quantique
# "Whiskers le chat, Alice la rapide, et tous les concepts bizarres !"
# ===============================================================================

echo "🐱 ==============================================="
echo "🎮 TEST SCÉNARIOS INITIATIQUES HEROES OF TIME"
echo "🐱 ==============================================="
echo ""

# 📊 Variables de configuration
SCENARIOS_DIR="game_assets/scenarios/hots"
DOC_DIR="docs/scenarios"
TEST_RESULTS=()

echo "📁 Répertoire des scénarios : $SCENARIOS_DIR"
echo "📚 Documentation : $DOC_DIR"
echo ""

# 🎯 Fonction de test d'un scénario
test_scenario() {
    local file=$1
    local name=$2
    local concept=$3
    
    echo "🧪 === TEST : $name ==="
    
    # Vérifier que le fichier existe
    if [ ! -f "$file" ]; then
        echo "❌ ERREUR : Fichier manquant $file"
        TEST_RESULTS+=("❌ $name: Fichier manquant")
        return 1
    fi
    
    # Vérifier la taille du fichier
    local file_size=$(wc -l < "$file")
    echo "📏 Taille : $file_size lignes"
    
    # Vérifier les éléments essentiels HOTS
    local has_game=$(grep -c "GAME:" "$file")
    local has_hero=$(grep -c "HERO:" "$file")
    local has_scenario=$(grep -c "SCENARIO" "$file")
    local has_psi=$(grep -c "ψ" "$file")
    local has_announce=$(grep -c "ANNOUNCE" "$file")
    
    echo "🔍 Analyse du contenu :"
    echo "   🎮 Définition GAME: $has_game"
    echo "   🦸 Héros définis: $has_hero"
    echo "   📋 Références scénario: $has_scenario"
    echo "   ψ   États quantiques: $has_psi"
    echo "   📢 Messages ANNOUNCE: $has_announce"
    
    # Extraire quelques lignes intéressantes
    echo ""
    echo "📖 Aperçu du contenu :"
    echo "   $(grep "GAME:" "$file" | head -1)"
    echo "   $(grep "# 🐱\|# ⏰\|# 🌀" "$file" | head -1)"
    echo "   $(grep "ANNOUNCE.*[😸🎉⚡]" "$file" | head -1)"
    
    # Test de validation basique
    local issues=0
    
    if [ $has_game -eq 0 ]; then
        echo "⚠️  Attention : Pas de définition GAME"
        ((issues++))
    fi
    
    if [ $has_announce -lt 5 ]; then
        echo "⚠️  Attention : Peu de messages interactifs ($has_announce)"
        ((issues++))
    fi
    
    if [ $file_size -lt 50 ]; then
        echo "⚠️  Attention : Scénario peut-être trop court"
        ((issues++))
    fi
    
    # Résultat du test
    if [ $issues -eq 0 ]; then
        echo "✅ $name : VALIDÉ"
        TEST_RESULTS+=("✅ $name: Validé ($file_size lignes)")
    else
        echo "⚠️  $name : $issues problèmes détectés"
        TEST_RESULTS+=("⚠️  $name: $issues problèmes ($file_size lignes)")
    fi
    
    echo ""
}

# 🐱 TEST 1: LE CHAT DE SCHRÖDINGER
echo "🧪 =================================================="
echo "🐱 TEST 1: LE CHAT DE SCHRÖDINGER"
echo "🧪 =================================================="

test_scenario "$SCENARIOS_DIR/chat_schrodinger_initiatique.hots" \
              "Chat de Schrödinger" \
              "Superposition quantique"

# ⏰ TEST 2: LE RALENTISSEUR TEMPOREL  
echo "🧪 =================================================="
echo "⏰ TEST 2: LE RALENTISSEUR TEMPOREL"
echo "🧪 =================================================="

test_scenario "$SCENARIOS_DIR/ralentisseur_temporel_initiatique.hots" \
              "Ralentisseur Temporel" \
              "Manipulation temporelle"

# 📚 TEST 3: DOCUMENTATION GÉNÉRALE
echo "🧪 =================================================="
echo "📚 TEST 3: DOCUMENTATION SCÉNARIOS INITIATIQUES"
echo "🧪 =================================================="

DOC_FILE="$DOC_DIR/SCENARIOS_INITIATIQUES_BIZARRES.md"

echo "🧪 === TEST : Documentation Générale ==="

if [ ! -f "$DOC_FILE" ]; then
    echo "❌ ERREUR : Documentation manquante $DOC_FILE"
    TEST_RESULTS+=("❌ Documentation: Manquante")
else
    local doc_size=$(wc -l < "$DOC_FILE")
    local has_chat=$(grep -c "Chat de Schrödinger" "$DOC_FILE")
    local has_ralentisseur=$(grep -c "Ralentisseur Temporel" "$DOC_FILE")
    local has_progression=$(grep -c "PROGRESSION PÉDAGOGIQUE" "$DOC_FILE")
    
    echo "📏 Taille documentation : $doc_size lignes"
    echo "🔍 Contenu trouvé :"
    echo "   🐱 Chat de Schrödinger: $has_chat mentions"
    echo "   ⏰ Ralentisseur Temporel: $has_ralentisseur mentions"
    echo "   📊 Progression pédagogique: $has_progression sections"
    
    if [ $has_chat -gt 0 ] && [ $has_ralentisseur -gt 0 ] && [ $has_progression -gt 0 ]; then
        echo "✅ Documentation : COMPLÈTE"
        TEST_RESULTS+=("✅ Documentation: Complète ($doc_size lignes)")
    else
        echo "⚠️  Documentation : Incomplète"
        TEST_RESULTS+=("⚠️  Documentation: Incomplète")
    fi
fi

echo ""

# 🎯 TEST 4: COMPATIBILITÉ AVEC LE SYSTÈME HOTS
echo "🧪 =================================================="
echo "🎯 TEST 4: COMPATIBILITÉ SYSTÈME HOTS"
echo "🧪 =================================================="

echo "🧪 === TEST : Compatibilité HOTS ==="

# Vérifier les mots-clés HOTS essentiels
check_hots_compatibility() {
    local file=$1
    local name=$2
    
    echo "🔍 Vérification HOTS pour $name :"
    
    # Mots-clés essentiels
    local keywords=("CREATE" "MOV" "ANNOUNCE" "TURN" "USE" "COLLAPSE" "WAIT")
    local compatibility_score=0
    
    for keyword in "${keywords[@]}"; do
        local count=$(grep -c "$keyword(" "$file" 2>/dev/null || echo "0")
        echo "   $keyword: $count occurrences"
        if [ $count -gt 0 ]; then
            ((compatibility_score++))
        fi
    done
    
    echo "   📊 Score compatibilité: $compatibility_score/${#keywords[@]}"
    
    if [ $compatibility_score -ge 5 ]; then
        echo "   ✅ Compatible HOTS"
        return 0
    else
        echo "   ⚠️  Compatibilité limitée"
        return 1
    fi
}

# Test des deux scénarios principaux
if [ -f "$SCENARIOS_DIR/chat_schrodinger_initiatique.hots" ]; then
    check_hots_compatibility "$SCENARIOS_DIR/chat_schrodinger_initiatique.hots" "Chat Schrödinger"
    echo ""
fi

if [ -f "$SCENARIOS_DIR/ralentisseur_temporel_initiatique.hots" ]; then
    check_hots_compatibility "$SCENARIOS_DIR/ralentisseur_temporel_initiatique.hots" "Ralentisseur Temporel"
    echo ""
fi

# 🎮 TEST 5: EXPÉRIENCE UTILISATEUR
echo "🧪 =================================================="
echo "🎮 TEST 5: EXPÉRIENCE UTILISATEUR"
echo "🧪 =================================================="

echo "🧪 === TEST : Expérience Utilisateur ==="

analyze_user_experience() {
    local file=$1
    local name=$2
    
    echo "🎯 Analyse UX pour $name :"
    
    # Éléments d'expérience utilisateur
    local has_emoji=$(grep -c "[😸🎉⚡🐱⏰🌀]" "$file")
    local has_interaction=$(grep -c "WAIT_FOR_CLICK\|SET_CURSOR_HELP" "$file")
    local has_feedback=$(grep -c "ANIMATION\|PLAY_SOUND" "$file")
    local has_progression=$(grep -c "UNLOCK\|ACHIEVEMENT\|REWARD" "$file")
    
    echo "   😊 Émojis engageants: $has_emoji"
    echo "   🖱️  Interactions: $has_interaction"
    echo "   🎵 Feedback audio/visuel: $has_feedback"
    echo "   🏆 Système de progression: $has_progression"
    
    local ux_score=$((has_emoji > 5 ? 1 : 0))
    ux_score=$((ux_score + (has_interaction > 0 ? 1 : 0)))
    ux_score=$((ux_score + (has_feedback > 0 ? 1 : 0)))
    ux_score=$((ux_score + (has_progression > 0 ? 1 : 0)))
    
    echo "   📊 Score UX: $ux_score/4"
    
    if [ $ux_score -ge 3 ]; then
        echo "   ✅ Expérience utilisateur excellente"
        TEST_RESULTS+=("✅ UX $name: Excellente ($ux_score/4)")
    elif [ $ux_score -ge 2 ]; then
        echo "   👍 Expérience utilisateur correcte"
        TEST_RESULTS+=("👍 UX $name: Correcte ($ux_score/4)")
    else
        echo "   ⚠️  Expérience utilisateur à améliorer"
        TEST_RESULTS+=("⚠️  UX $name: À améliorer ($ux_score/4)")
    fi
    
    echo ""
}

# Analyser les deux scénarios
if [ -f "$SCENARIOS_DIR/chat_schrodinger_initiatique.hots" ]; then
    analyze_user_experience "$SCENARIOS_DIR/chat_schrodinger_initiatique.hots" "Chat Schrödinger"
fi

if [ -f "$SCENARIOS_DIR/ralentisseur_temporel_initiatique.hots" ]; then
    analyze_user_experience "$SCENARIOS_DIR/ralentisseur_temporel_initiatique.hots" "Ralentisseur Temporel"
fi

# 📊 RÉSULTATS FINAUX
echo "🏆 =================================================="
echo "📊 RÉSULTATS FINAUX DES TESTS"
echo "🏆 =================================================="

echo ""
echo "📋 Résumé des tests :"
for result in "${TEST_RESULTS[@]}"; do
    echo "   $result"
done

echo ""

# Compter les succès
local success_count=$(printf '%s\n' "${TEST_RESULTS[@]}" | grep -c "✅")
local warning_count=$(printf '%s\n' "${TEST_RESULTS[@]}" | grep -c "⚠️")
local error_count=$(printf '%s\n' "${TEST_RESULTS[@]}" | grep -c "❌")
local total_count=${#TEST_RESULTS[@]}

echo "📊 Statistiques :"
echo "   ✅ Succès: $success_count"
echo "   ⚠️  Avertissements: $warning_count"
echo "   ❌ Erreurs: $error_count"
echo "   📈 Total: $total_count tests"

# Calcul du score global
local success_percentage=$((success_count * 100 / total_count))

echo ""
echo "🎯 Score global : $success_percentage%"

if [ $success_percentage -ge 80 ]; then
    echo "🏆 EXCELLENT ! Les scénarios initiatiques sont prêts !"
    echo "🎮 Les joueurs peuvent découvrir les concepts bizarres en toute sécurité !"
elif [ $success_percentage -ge 60 ]; then
    echo "👍 BIEN ! Quelques améliorations possibles mais fonctionnel"
    echo "🎮 Les scénarios peuvent être testés avec les joueurs"
else
    echo "⚠️  ATTENTION ! Des améliorations sont nécessaires"
    echo "🔧 Réviser les scénarios avant publication"
fi

echo ""
echo "🎯 Tests terminés ! Les scénarios initiatiques ont été vérifiés."
echo ""

# 🎮 COMMANDES DE LANCEMENT SUGGÉRÉES
echo "🚀 =================================================="
echo "🎮 COMMANDES DE LANCEMENT SUGGÉRÉES"
echo "🚀 =================================================="

echo ""
echo "Pour jouer aux scénarios testés :"
echo ""
echo "🐱 Chat de Schrödinger :"
echo "   ./hots play chat_schrodinger_initiatique"
echo ""
echo "⏰ Ralentisseur Temporel :"
echo "   ./hots play ralentisseur_temporel_initiatique"
echo ""
echo "📚 Documentation complète :"
echo "   cat docs/scenarios/SCENARIOS_INITIATIQUES_BIZARRES.md"
echo ""

echo "🎉 === FIN DES TESTS SCÉNARIOS INITIATIQUES ==="
echo "" 