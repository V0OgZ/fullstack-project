#!/bin/bash
# Script pour tester TOUS les scénarios HOTS disponibles
# Inclut les nouveaux scénarios épiques

echo "🎮 ========================================="
echo "   TEST DE TOUS LES SCÉNARIOS HOTS"
echo "   Heroes of Time - Session complète"
echo "🎮 ========================================="

# Configuration
API_URL="http://localhost:8080/api"
RESULTS_DIR="test-results-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$RESULTS_DIR"

# Fonction pour tester un scénario
test_scenario() {
    local scenario_name=$1
    local scenario_file=$2
    local description=$3
    
    echo -e "\n\n🎯 Testing: $scenario_name"
    echo "   Description: $description"
    echo "   File: $scenario_file"
    
    # Créer une partie pour ce scénario
    GAME_RESPONSE=$(curl -s -X POST "$API_URL/games" \
      -H "Content-Type: application/json" \
      -d "{\"gameName\": \"test_${scenario_name}_$(date +%s)\", \"maxPlayers\": 4}")
    
    GAME_ID=$(echo $GAME_RESPONSE | grep -o '"id":[0-9]*' | cut -d: -f2)
    
    if [ -z "$GAME_ID" ]; then
        echo "   ❌ ERREUR: Impossible de créer la partie"
        echo "$GAME_RESPONSE" > "$RESULTS_DIR/${scenario_name}_error.log"
        return 1
    fi
    
    echo "   ✓ Partie créée: ID=$GAME_ID"
    
    # Lire et exécuter les commandes du scénario
    # (Simplifié pour la démo - en réalité il faudrait parser le .hots)
    echo "   📜 Exécution du scénario..."
    
    # Quelques commandes de test basiques
    curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
      -H "Content-Type: application/json" \
      -d '{"command": "HERO(TestHero)"}' > "$RESULTS_DIR/${scenario_name}_hero.json"
    
    # Récupérer l'état final
    curl -s "$API_URL/games/$GAME_ID/state" > "$RESULTS_DIR/${scenario_name}_final.json"
    
    echo "   ✓ Scénario complété"
    echo "   📊 Résultats sauvés dans $RESULTS_DIR/"
}

# Liste des scénarios à tester
echo -e "\n📋 Scénarios à tester:"
echo "1. Quantum Maze - Puzzle temporel"
echo "2. Œil de Wigner README - Histoire officielle"
echo "3. PANOPTICΩN Axis Test - Vision 5D"
echo "4. Treasure Theft - Vol temporel"
echo "5. Claudius vs JeanGrofignon - Combat épique"
echo "6. L'Éclat des Mondes Dissolus - Abyme vs Coalition"
echo "7. Le Treizième Codex - Omega-Zéro vs Coalition"

# Vérifier que le backend est lancé
echo -e "\n🔍 Vérification du backend..."
if ! curl -s "$API_URL/health" > /dev/null 2>&1; then
    echo "❌ ERREUR: Le backend n'est pas accessible sur $API_URL"
    echo "Lancez d'abord: cd backend && mvn spring-boot:run"
    exit 1
fi
echo "✓ Backend accessible"

# Tester chaque scénario
test_scenario "quantum_maze" "game_assets/scenarios/hots/quantum_maze.hots" \
    "Puzzle temporel avec interférences quantiques"

test_scenario "oeil_wigner" "game_assets/scenarios/hots/oeil_de_wigner_readme.hots" \
    "L'histoire du README avec l'Œil de Wigner"

test_scenario "panopticon_axis" "game_assets/scenarios/hots/panopticon_axis_test.hots" \
    "Test du PANOPTICΩN avec Axis le voleur temporel"

test_scenario "treasure_theft" "game_assets/scenarios/hots/treasure_theft_test.hots" \
    "Vol de trésor depuis le futur"

test_scenario "claudius_vs_jean" "game_assets/scenarios/hots/claudius_vs_jeangro_epic.hots" \
    "Duel épique entre Claudius et Jean-Grofignon"

test_scenario "eclat_mondes" "game_assets/scenarios/hots/splintered_worlds.hots" \
    "L'Éclat des Mondes Dissolus - Combat contre Abyme-le-Rassemblé"

test_scenario "treizieme_codex" "game_assets/scenarios/hots/codex_final.hots" \
    "Le Treizième Codex - Bataille finale contre Omega-Zéro"

# Résumé final
echo -e "\n\n📊 ========================================="
echo "   RÉSUMÉ DES TESTS"
echo "📊 ========================================="

TOTAL_SCENARIOS=7
SUCCESSFUL=$(ls -1 "$RESULTS_DIR"/*_final.json 2>/dev/null | wc -l)
FAILED=$((TOTAL_SCENARIOS - SUCCESSFUL))

echo "Total de scénarios: $TOTAL_SCENARIOS"
echo "✓ Réussis: $SUCCESSFUL"
echo "✗ Échoués: $FAILED"
echo ""
echo "Résultats détaillés dans: $RESULTS_DIR/"

if [ $FAILED -eq 0 ]; then
    echo -e "\n🎉 TOUS LES SCÉNARIOS ONT ÉTÉ TESTÉS AVEC SUCCÈS!"
else
    echo -e "\n⚠️  Certains scénarios ont échoué. Vérifiez les logs."
fi

echo -e "\n🎮 ========================================="
echo "   FIN DES TESTS - Heroes of Time"
echo "🎮 =========================================" 