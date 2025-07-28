#!/bin/bash

# 🔮 TEST VISION TEMPORELLE & JEU ASYNCHRONE
# ==========================================

echo "🔮 TEST VISION TEMPORELLE - HEROES OF TIME"
echo "=========================================="

# Configuration
BACKEND_URL="http://localhost:8080"

# Vérifier que le backend est actif
echo "🔍 Vérification du backend..."
if ! curl -s "$BACKEND_URL/api/game/status" > /dev/null 2>&1; then
    echo "❌ Backend non accessible. Démarrage..."
    cd backend && mvn spring-boot:run > /dev/null 2>&1 &
    sleep 10
fi

# Créer un nouveau jeu
echo "🎮 Création du jeu de test asynchrone..."
GAME_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d '{
        "gameName": "Test Vision Temporelle",
        "playerCount": 2,
        "mapWidth": 30,
        "mapHeight": 30,
        "maxTurns": 100
    }')

GAME_ID=$(echo $GAME_RESPONSE | jq -r '.id')
echo "✅ Jeu créé avec ID: $GAME_ID"

# Fonction pour exécuter un script et afficher le résultat
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
echo "🎯 SCÉNARIO: Deux joueurs à des moments différents"
echo "=================================================="

# Créer les héros
execute_script "HERO(Alice)"
execute_script "HERO(Bob)"

# Alice se déplace normalement (jour 1)
execute_script "MOV(Alice, @5,5)"

# Bob se déplace loin (avance dans le temps)
execute_script "MOV(Bob, @20,20)"

# Alice utilise la longue-vue magique
execute_script "CREATE(ITEM, magic_spyglass, HERO:Alice)"
execute_script "USE(ITEM, magic_spyglass, HERO:Alice)"

echo ""
echo "⏰ TEST: Temps différent pour chaque héros"
echo "========================================="

# Alice se déplace encore (devrait être jour 2-3)
execute_script "MOV(Alice, @10,10)"

# Bob continue son voyage temporel
execute_script "MOV(Bob, @25,25)"

# Créer un état quantique dans le futur
execute_script "ψ001: ⊙(Δt+2 @15,15 ⟶ CREATE(ITEM, temporal_treasure, @15,15))"

# Alice regarde à nouveau dans le futur
execute_script "USE(ITEM, magic_spyglass, HERO:Alice)"

echo ""
echo "🌀 TEST: Collision temporelle"
echo "============================"

# Les deux héros tentent d'aller au même endroit
execute_script "MOV(Alice, @15,15)"
execute_script "MOV(Bob, @15,15)"

echo ""
echo "📊 État final du jeu"
echo "==================="
curl -s "$BACKEND_URL/api/temporal/games/$GAME_ID/state" | jq '.heroes'

echo ""
echo "✅ Test terminé!" 