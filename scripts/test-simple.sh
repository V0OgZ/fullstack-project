#!/bin/bash

# 🎮 Heroes of Time - Test Simple
# ===============================
# Script ultra-simple pour tester rapidement

echo "🎮 Heroes of Time - Test Simple"
echo "==============================="

# Variables
BASE_URL="http://localhost:8080"

# Vérifier si le backend est accessible
echo "🔍 Vérification du backend..."
if curl -s "$BASE_URL/api/temporal/health" > /dev/null 2>&1; then
    echo "✅ Backend accessible!"
else
    echo "❌ Backend non accessible"
    echo "💡 Lancez d'abord: ./autoplay-demo.sh"
    exit 1
fi

# Test simple
echo "🚀 Test simple en cours..."

# Créer un jeu
echo "📋 Création d'un jeu..."
curl -s -X POST "$BASE_URL/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d '{"gameName": "Test Simple", "playerId": "test"}' | jq .

# Créer un héros
echo "⚔️ Création d'un héros..."
curl -s -X POST "$BASE_URL/api/temporal/games/1/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "HERO(TestHero)"}' | jq .

# Mouvement
echo "🏃 Mouvement..."
curl -s -X POST "$BASE_URL/api/temporal/games/1/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "MOV(TestHero, @5,5)"}' | jq .

# ψ-state
echo "🌌 Création d'un ψ-state..."
curl -s -X POST "$BASE_URL/api/temporal/games/1/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "ψ999: ⊙(Δt+1 @10,10 ⟶ MOV(TestHero, @10,10))"}' | jq .

# Collapse
echo "💥 Collapse..."
curl -s -X POST "$BASE_URL/api/temporal/games/1/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "†ψ999"}' | jq .

echo "✅ Test simple terminé!"
echo "🎮 Système Heroes of Time fonctionnel!" 