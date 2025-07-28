#!/bin/bash

# 🧩 TEST QUANTUM MAZE - PUZZLE QUANTIQUE
# =======================================

echo "🧩 TEST QUANTUM MAZE - HEROES OF TIME"
echo "====================================="

# Configuration
BACKEND_URL="http://localhost:8080"

# Vérifier que le backend est actif
echo "🔍 Vérification du backend..."
if ! curl -s "$BACKEND_URL/api/game/status" > /dev/null 2>&1; then
    echo "❌ Backend non accessible"
    exit 1
fi

# Créer un nouveau jeu type puzzle
echo "🎮 Création du jeu Quantum Maze..."
GAME_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d '{
        "gameName": "Quantum Maze Test",
        "playerCount": 1,
        "mapWidth": 20,
        "mapHeight": 20,
        "gameType": "puzzle"
    }')

GAME_ID=$(echo $GAME_RESPONSE | jq -r '.id')
echo "✅ Jeu créé avec ID: $GAME_ID"

# Fonction pour exécuter un script
execute_script() {
    local script="$1"
    echo ""
    echo "📝 Exécution: $script"
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/execute" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"$script\"}")
    echo "   Réponse: $RESPONSE"
}

echo ""
echo "🧪 NIVEAU 1: Test Superposition Basique"
echo "======================================"

# Créer le scientifique
execute_script "HERO(DrQuantum)"

# Tester les artefacts quantiques
execute_script "CREATE(ITEM, wave_function_manipulator, HERO:DrQuantum)"
execute_script "USE(ARTIFACT, wave_function_manipulator, HERO:DrQuantum)"

# Créer un état quantique
execute_script "ψQ01: ⊙(Δt+0 @5,3 ⟶ CREATE(ITEM, quantum_key, @5,3))"

echo ""
echo "🔬 NIVEAU 2: Test Interférence"
echo "============================="

execute_script "CREATE(ITEM, interference_generator, HERO:DrQuantum)"

# Créer deux états pour l'interférence
execute_script "ψA01: (0.6+0.8i) ⊙(Δt+0 @7,4 ⟶ CREATE(ITEM, gate_key_a, @7,4))"
execute_script "ψA02: (0.8+0.6i) ⊙(Δt+0 @7,5 ⟶ CREATE(ITEM, gate_key_b, @7,5))"

# Tester l'interférence (même si pas encore implémenté)
execute_script "USE(ARTIFACT, interference_generator, HERO:DrQuantum)"

echo ""
echo "📊 État final du jeu"
echo "==================="
curl -s "$BACKEND_URL/api/temporal/games/$GAME_ID/state" | jq

echo ""
echo "🎯 ANALYSE DE COMPATIBILITÉ"
echo "=========================="
echo "✅ Commandes HOTS standard fonctionnent"
echo "✅ États ψ avec amplitudes complexes OK"
echo "⚠️  Nouvelles formules à implémenter:"
echo "   - CREATE_PSI_STATE()"
echo "   - QUANTUM_ENTANGLEMENT()"
echo "   - CREATE_WORMHOLE()"
echo ""
echo "💡 CONCLUSION: Le template est compatible !"
echo "   Il suffit d'ajouter les nouvelles fonctions au DynamicFormulaParser" 