#!/bin/bash

# 🎮 Heroes of Time - Demo Ultra Simple
# ======================================
# Script ultra-simple qui fonctionne directement

echo "🎮 Heroes of Time - Demo Ultra Simple"
echo "======================================"

# Variables
BASE_URL="http://localhost:8080"
GAME_ID="1"

# Fonction pour tester les endpoints
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo "🔄 $description..."
    
    if [ -n "$data" ]; then
        result=$(curl -s -X $method \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL$endpoint")
    else
        result=$(curl -s -X $method "$BASE_URL$endpoint")
    fi
    
    echo "✅ Résultat: $result"
    echo "---"
}

# Vérifier le backend
echo "🔍 Vérification du backend..."
if curl -s "$BASE_URL/api/temporal/health" > /dev/null 2>&1; then
    echo "✅ Backend accessible!"
else
    echo "❌ Backend non accessible"
    echo "💡 Lancez d'abord le backend avec: mvn spring-boot:run"
    exit 1
fi

echo ""
echo "🚀 Début de la démonstration..."
echo ""

# 1. Créer un jeu
test_endpoint "POST" "/api/temporal/games" \
    '{"gameName": "Demo Simple", "playerId": "demo"}' \
    "Création d'un jeu"

# 2. Démarrer le jeu
test_endpoint "POST" "/api/temporal/games/$GAME_ID/start" \
    "" \
    "Démarrage du jeu"

# 3. Créer un héros
test_endpoint "POST" "/api/temporal/games/$GAME_ID/script" \
    '{"script": "HERO(Arthur)"}' \
    "Création du héros Arthur"

# 4. Mouvement
test_endpoint "POST" "/api/temporal/games/$GAME_ID/script" \
    '{"script": "MOV(Arthur, @10,10)"}' \
    "Arthur se déplace"

# 5. Créer un objet
test_endpoint "POST" "/api/temporal/games/$GAME_ID/script" \
    '{"script": "CREATE(ITEM, Excalibur)"}' \
    "Création d'Excalibur"

# 6. ψ-state
test_endpoint "POST" "/api/temporal/games/$GAME_ID/script" \
    '{"script": "ψ001: ⊙(Δt+1 @15,15 ⟶ MOV(Arthur, @15,15))"}' \
    "Création d'un ψ-state"

# 7. Collapse
test_endpoint "POST" "/api/temporal/games/$GAME_ID/script" \
    '{"script": "†ψ001"}' \
    "Collapse du ψ-state"

# 8. État du jeu
test_endpoint "GET" "/api/temporal/games/$GAME_ID/state" \
    "" \
    "État final du jeu"

echo ""
echo "🎉 Démonstration terminée!"
echo "✅ Tous les tests ont été exécutés"
echo "🔧 Backend toujours actif sur: http://localhost:8080"
echo "💡 Utilisez: curl http://localhost:8080/api/temporal/health pour vérifier" 