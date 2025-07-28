#!/bin/bash

# 🌀 TEST DU MUR DE CAUSALITÉ - HEROES OF TIME
# ============================================

echo "🌀 TEST DU MUR DE CAUSALITÉ - EXEMPLE DE JEAN"
echo "============================================"

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
echo "🎮 Création du jeu de test..."
GAME_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d '{
        "gameName": "Test Mur Causalité",
        "playerCount": 2,
        "mapWidth": 30,
        "mapHeight": 30
    }')

GAME_ID=$(echo $GAME_RESPONSE | grep -o '"gameId":[0-9]*' | grep -o '[0-9]*')
echo "✅ Jeu créé avec ID: $GAME_ID"

# Fonction pour exécuter un script
execute_script() {
    local script="$1"
    echo "📝 Exécution: $script"
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"$script\"}")
    echo "   Réponse: $RESPONSE"
    echo ""
}

echo -e "\n🎯 SCÉNARIO: Héros avec épée temporelle traverse le mur de causalité"
echo "================================================================"

# Créer deux héros
execute_script "HERO(Arthur)"
execute_script "HERO(Morgana)"

# Donner l'épée temporelle à Arthur
execute_script "CREATE(ITEM, temporal_sword, HERO:Arthur)"

# Donner la longue-vue magique à Morgana  
execute_script "CREATE(ITEM, magic_spyglass, HERO:Morgana)"

# Positionner les héros
execute_script "MOV(Arthur, @5,5)"
execute_script "MOV(Morgana, @25,25)"

echo -e "\n⚔️ TEST 1: Mouvement normal (sans épée)"
echo "======================================="
# Arthur essaye de bouger trop loin SANS utiliser l'épée
execute_script "MOV(Arthur, @15,15)"
# Devrait échouer : "Destination hors de la zone de mouvement causale!"

echo -e "\n⚔️ TEST 2: Mouvement avec épée temporelle"
echo "========================================="
# Arthur utilise l'épée temporelle
execute_script "USE(ITEM, temporal_sword, HERO:Arthur)"
# Maintenant il peut bouger plus loin
execute_script "MOV(Arthur, @15,15)"
# Devrait réussir avec "timeAdvanced: X jours"

echo -e "\n🔮 TEST 3: Vision du futur avec longue-vue"
echo "=========================================="
# Morgana utilise la longue-vue pour voir dans le futur
execute_script "USE(ITEM, magic_spyglass, HERO:Morgana)"

echo -e "\n💥 TEST 4: Collision causale"
echo "============================"
# Morgana se déplace vers la même position
execute_script "MOV(Morgana, @15,15)"
# Si elle arrive au même moment temporel qu'Arthur → collision causale!

echo -e "\n📊 État final du jeu"
echo "==================="
curl -s "$BACKEND_URL/api/temporal/games/$GAME_ID/state" | jq '.heroes'

echo -e "\n✅ Test terminé!" 