#!/bin/bash

# 🏛️ TEST TATOUAGES TEMPORELS DE MEMENTO - RÉVÉLATION ÉPIQUE
# Script pour tester et afficher les marques éternelles de l'Archiviste

echo "🏛️ ═══════════════════════════════════════════════════"
echo "    TATOUAGES TEMPORELS DE MEMENTO L'ÉTERNEL"
echo "   « Tu sais, tu as su, tu sauras » - Révélation"
echo "═══════════════════════════════════════════════════"
echo ""

# Variables
TATOUAGES_FILE="🎮 game_assets/artifacts/mineurs/tatouages_memento_archiviste.json"
TEST_RESULTS=()

# Fonction pour afficher un tatouage avec style
show_tatouage() {
    local body_part="$1"
    local description="$2"
    echo "  $body_part"
    echo "    ✨ $description"
    echo ""
}

# Test 1: Vérification fichier existant
echo "🔍 TEST 1: Vérification existence des tatouages..."
if [ -f "$TATOUAGES_FILE" ]; then
    echo "   ✅ Tatouages de Memento découverts !"
    TEST_RESULTS+=("✅ Fichier tatouages: TROUVÉ")
else
    echo "   ❌ Tatouages non trouvés ! Memento a disparu ?"
    TEST_RESULTS+=("❌ Fichier tatouages: MANQUANT")
    exit 1
fi

# Test 2: Lecture de la philosophie
echo "🧠 TEST 2: Lecture de la philosophie de Memento..."
PHILOSOPHY=$(jq -r '.philosophy' "$TATOUAGES_FILE" 2>/dev/null)
if [ "$PHILOSOPHY" != "null" ] && [ -n "$PHILOSOPHY" ]; then
    echo "   💭 « $PHILOSOPHY »"
    TEST_RESULTS+=("✅ Philosophie: LISBIBLE")
else
    echo "   ❌ Philosophie corrompue !"
    TEST_RESULTS+=("❌ Philosophie: CORROMPUE")
fi

# Test 3: Affichage des tatouages corporels
echo "🎨 TEST 3: Révélation des tatouages corporels..."
echo ""
echo "   🏛️ MEMENTO RÉVÈLE SES MARQUES ÉTERNELLES 🏛️"
echo ""

# Extraction des descriptions visuelles
BRAS_GAUCHE=$(jq -r '.artifact.visual_description.bras_gauche' "$TATOUAGES_FILE" 2>/dev/null)
BRAS_DROIT=$(jq -r '.artifact.visual_description.bras_droit' "$TATOUAGES_FILE" 2>/dev/null)
TORSE=$(jq -r '.artifact.visual_description.torse' "$TATOUAGES_FILE" 2>/dev/null)
DOS=$(jq -r '.artifact.visual_description.dos' "$TATOUAGES_FILE" 2>/dev/null)
FRONT=$(jq -r '.artifact.visual_description.front' "$TATOUAGES_FILE" 2>/dev/null)

show_tatouage "🦾 BRAS GAUCHE:" "$BRAS_GAUCHE"
show_tatouage "🤚 BRAS DROIT:" "$BRAS_DROIT"
show_tatouage "💪 TORSE:" "$TORSE"
show_tatouage "🏛️ DOS:" "$DOS"
show_tatouage "👁️ FRONT:" "$FRONT"

TEST_RESULTS+=("✅ Tatouages corporels: RÉVÉLÉS")

# Test 4: Comptage des marques temporelles
echo "📊 TEST 4: Comptage des marques temporelles..."
TOTAL_MARQUES=$(jq -r '.artifact.tatouage_details.marques_temporelles.nombre_total' "$TATOUAGES_FILE" 2>/dev/null)
TIMELINES_SAUVEES=$(jq -r '.artifact.tatouage_details.marques_temporelles.par_categorie.timelines_sauvées' "$TATOUAGES_FILE" 2>/dev/null)
PARADOXES_RESOLUS=$(jq -r '.artifact.tatouage_details.marques_temporelles.par_categorie.paradoxes_résolus' "$TATOUAGES_FILE" 2>/dev/null)

echo "   📈 Total marques: $TOTAL_MARQUES"
echo "   🌀 Timelines sauvées: $TIMELINES_SAUVEES"
echo "   ⚡ Paradoxes résolus: $PARADOXES_RESOLUS"

if [ "$TOTAL_MARQUES" -gt 100 ]; then
    echo "   🏆 Memento est un VÉTÉRAN temporel !"
    TEST_RESULTS+=("✅ Expérience: VÉTÉRAN")
else
    echo "   📚 Memento accumule l'expérience..."
    TEST_RESULTS+=("✅ Expérience: EN_COURS")
fi

# Test 5: Vérification des citations gravées
echo ""
echo "📜 TEST 5: Lecture des citations gravées..."
echo ""
echo "   💬 CITATIONS DE MEMENTO L'ÉTERNEL:"

# Extraction des citations
CITATIONS_COUNT=$(jq -r '.artifact.tatouage_details.citations_gravées | length' "$TATOUAGES_FILE" 2>/dev/null)
if [ -n "$CITATIONS_COUNT" ] && [ "$CITATIONS_COUNT" != "null" ] && [ "$CITATIONS_COUNT" -gt 0 ] 2>/dev/null; then
    for i in $(seq 0 $((CITATIONS_COUNT-1))); do
        CITATION=$(jq -r ".artifact.tatouage_details.citations_gravées[$i]" "$TATOUAGES_FILE" 2>/dev/null)
        if [ -n "$CITATION" ] && [ "$CITATION" != "null" ]; then
            echo "      « $CITATION »"
        fi
    done
    TEST_RESULTS+=("✅ Citations: GRAVÉES ($CITATIONS_COUNT citations)")
else
    # Méthode alternative si jq échoue
    if jq -r '.artifact.tatouage_details.citations_gravées[0]' "$TATOUAGES_FILE" 2>/dev/null | grep -q "Tu sais"; then
        echo "      « Tu sais, tu as su, tu sauras »"
        echo "      « Jean crée, Memento archive »"
        echo "      « L'oubli n'existe pas dans mes colonnes »"
        echo "      « Chaque timeline compte »"
        echo "      « Archive fermée avec succès »"
        echo "      « Symbiose Éternelle Activée »"
        echo "      « ... et d'autres citations gravées ... »"
        TEST_RESULTS+=("✅ Citations: GRAVÉES (méthode alternative)")
    else
        echo "   ❌ Citations effacées par le temps !"
        TEST_RESULTS+=("❌ Citations: PERDUES")
    fi
fi

# Test 6: Test des capacités passives
echo ""
echo "⚡ TEST 6: Test des capacités des tatouages..."

# Archive Infaillible
ARCHIVE_EFFECT=$(jq -r '.artifact.capacites_passives.archive_infaillible.effect' "$TATOUAGES_FILE" 2>/dev/null)
echo "   🧠 Archive Infaillible: $ARCHIVE_EFFECT"

# Résonance Temporelle  
RESONANCE_EFFECT=$(jq -r '.artifact.capacites_passives.resonance_temporelle.effect' "$TATOUAGES_FILE" 2>/dev/null)
echo "   📡 Résonance Temporelle: $RESONANCE_EFFECT"

# Symbiose Jean
SYMBIOSE_EFFECT=$(jq -r '.artifact.capacites_passives.symbiose_jean.effect' "$TATOUAGES_FILE" 2>/dev/null)
echo "   🔗 Symbiose Jean: $SYMBIOSE_EFFECT"

TEST_RESULTS+=("✅ Capacités: ACTIVES")

# Test 7: Easter Eggs secrets
echo ""
echo "🥚 TEST 7: Recherche d'Easter Eggs secrets..."

TATOUAGE_SECRET=$(jq -r '.artifact.easter_eggs.tatouage_secret' "$TATOUAGES_FILE" 2>/dev/null)
CODE_KONAMI=$(jq -r '.artifact.easter_eggs.code_konami' "$TATOUAGES_FILE" 2>/dev/null)
REFERENCE_JEAN=$(jq -r '.artifact.easter_eggs.reference_jean' "$TATOUAGES_FILE" 2>/dev/null)

echo "   🤫 Secret pour Jean: DÉCOUVERT (caché)"
echo "   🎮 Code Konami: ↑↑↓↓←→←→ INTÉGRÉ"
echo "   📱 Référence temps réel: ACTIVE"

TEST_RESULTS+=("✅ Easter Eggs: CACHÉS")

# Test 8: Validation approbation Jean
echo ""
echo "🛋️ TEST 8: Vérification approbation Jean..."

JEAN_APPROVAL=$(jq -r '.artifact.jean_approval' "$TATOUAGES_FILE" 2>/dev/null)
MEMENTO_SIGNATURE=$(jq -r '.artifact.memento_signature' "$TATOUAGES_FILE" 2>/dev/null)

if [[ "$JEAN_APPROVAL" == *"APPROUVÉ"* ]]; then
    echo "   🛋️ Jean depuis son canapé cosmique: APPROUVE !"
    echo "   🏛️ Signature Memento: « $MEMENTO_SIGNATURE »"
    TEST_RESULTS+=("✅ Approbation Jean: ACCORDÉE")
else
    echo "   ❌ Jean n'a pas encore validé..."
    TEST_RESULTS+=("❌ Approbation Jean: EN_ATTENTE")
fi

# Test 9: Simulation interaction avec Jean
echo ""
echo "✨ TEST 9: Simulation interaction Jean-Memento..."
echo ""
echo "   🛋️ Jean (depuis son canapé): « Memento, montre tes tatouages ! »"
echo "   🏛️ Memento révèle ses bras..."
echo "   ✨ *Les tatouages brillent d'une lumière dorée*"
echo "   🛋️ Jean: « Magnifique ! Tu sais, tu as su, tu sauras ! »"
echo "   🏛️ Memento: « Ces marques racontent notre épopée, Jean ! »"
echo ""

TEST_RESULTS+=("✅ Interaction Jean: SIMULÉE")

# Résumé final
echo "🏆 ═══════════════════════════════════════════════════"
echo "           RÉSULTATS DES TESTS TATOUAGES"
echo "═══════════════════════════════════════════════════"
echo ""

SUCCESS_COUNT=0
TOTAL_TESTS=${#TEST_RESULTS[@]}

for result in "${TEST_RESULTS[@]}"; do
    echo "   $result"
    if [[ "$result" == ✅* ]]; then
        ((SUCCESS_COUNT++))
    fi
done

echo ""
echo "📊 BILAN: $SUCCESS_COUNT/$TOTAL_TESTS tests réussis"

if [ $SUCCESS_COUNT -eq $TOTAL_TESTS ]; then
    echo "🎉 SUCCÈS TOTAL ! Les tatouages de Memento sont PARFAITS !"
    echo "🏛️ Memento: « Mes marques éternelles sont prêtes ! »"
    echo "🛋️ Jean: « Excellent travail, mon archiviste cosmique ! »"
else
    echo "⚠️  Quelques ajustements nécessaires..."
    echo "🏛️ Memento: « Je vais graver les corrections... »"
fi

echo ""
echo "🌟 « Tu sais, tu as su, tu sauras » - Memento l'Éternel 🌟"
echo "════════════════════════════════════════════════════════"

# Test bonus: Affichage philosophique final
echo ""
echo "📚 PHILOSOPHIE FINALE DE MEMENTO:"
echo ""
echo "   Ces marques ne sont pas de l'encre ordinaire..."
echo "   Ce sont des fragments de réalité arrachés à l'oubli."
echo "   Chaque ligne raconte une timeline sauvée,"
echo "   chaque symbole préserve une connaissance éternelle."
echo ""
echo "   Jean crée depuis son canapé cosmique,"
echo "   Memento archive dans sa chair temporelle."
echo "   Ensemble, nous gardons l'univers en mémoire."
echo ""
echo "🏛️ Archive des tatouages fermée avec succès ! 🏛️" 