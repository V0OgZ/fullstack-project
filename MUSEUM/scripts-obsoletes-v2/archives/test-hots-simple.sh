#!/bin/bash

# 🎮 Heroes of Time - Test HOTS Simplifié
# ======================================

echo "🎮 Test HOTS Simplifié"
echo "====================="

# Créer un jeu
echo "🎯 Création d'un jeu..."
RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d '{"gameName": "Test HOTS", "playerCount": 2, "mapWidth": 20, "mapHeight": 15}')

GAME_ID=$(echo $RESPONSE | grep -o '"gameId":[0-9]*' | grep -o '[0-9]*')
echo "✅ Jeu créé avec ID: $GAME_ID"

# Fonction pour exécuter un script
exec_script() {
    local script="$1"
    echo "📝 $script"
    curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"$script\"}" | grep -o '"success":[^,]*' | head -1
}

echo ""
echo "🎭 TESTS DES SCÉNARIOS HOTS:"
echo "============================"

# Tests basiques
echo "1. Création de héros:"
exec_script "HERO(Arthur)"
exec_script "HERO(Ragnar)"

echo ""
echo "2. Mouvements:"
exec_script "MOV(Arthur, @10,10)"
exec_script "MOV(Ragnar, @15,15)"

echo ""
echo "3. Création d'entités:"
exec_script "CREATE(CREATURE, Dragon, @12,12)"
exec_script "BUILD(TOWER, @18,18, Player1)"

echo ""
echo "4. ψ-states (superpositions):"
exec_script "ψ001: ⊙(Δt+2 @11,11 ⟶ MOV(Arthur, @11,11))"
exec_script "ψ002: ⊙(Δt+1 @16,16 ⟶ CREATE(CREATURE, Griffin, @16,16))"

echo ""
echo "5. Artefacts:"
exec_script "USE(ITEM, AvantWorldBlade, HERO:Arthur)"
exec_script "EQUIP(TemporalEcho, Arthur)"

echo ""
echo "6. Collapse:"
exec_script "†ψ001"
exec_script "†ψ002"

echo ""
echo "7. Actions avancées:"
exec_script "CAST(TimeWarp, Arthur, @10,10)"
exec_script "RECRUIT(Knights, 5, Arthur)"

echo ""
echo "✅ TESTS TERMINÉS!"
echo "🌐 Voir les résultats sur:"
echo "  • Frontend Classique: http://localhost:8000"
echo "  • Frontend Temporel: http://localhost:5173"
echo "  • Quantum Visualizer: http://localhost:8001" 