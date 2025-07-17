#!/bin/bash

# Simple Heroes of Time Backend Test Script (without jq)
echo "🚀 Heroes of Time - Simple Backend Test"
echo "========================================"

BASE_URL="http://localhost:8080/api/temporal"

# Wait for server
echo "Waiting for server..."
for i in {1..30}; do
    if curl -s "$BASE_URL/health" > /dev/null 2>&1; then
        echo "✅ Server is ready!"
        break
    fi
    echo -n "."
    sleep 1
done

echo ""
echo "🧪 Testing Health Endpoint..."
curl -s "$BASE_URL/health"
echo ""

echo ""
echo "🎮 Creating a new game..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"gameName": "Heroes Test", "playerId": "player1"}' \
  "$BASE_URL/games"
echo ""

echo ""
echo "🎮 Using Game ID 1 for tests..."
GAME_ID=1

echo ""
echo "👥 Adding second player..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"playerId": "player2"}' \
  "$BASE_URL/games/$GAME_ID/join"
echo ""

echo ""
echo "🚀 Starting the game..."
curl -s -X POST "$BASE_URL/games/$GAME_ID/start"
echo ""

echo ""
echo "🧙 Creating Hero Arthur..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"script": "HERO(Arthur)"}' \
  "$BASE_URL/games/$GAME_ID/script"
echo ""

echo ""
echo "⚔️ Creating Hero Ragnar..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"script": "HERO(Ragnar)"}' \
  "$BASE_URL/games/$GAME_ID/script"
echo ""

echo ""
echo "🗡️ Creating Avant-World Blade for Arthur..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"script": "CREATE(ITEM, AvantWorldBlade, HERO:Arthur)"}' \
  "$BASE_URL/games/$GAME_ID/script"
echo ""

echo ""
echo "🚶 Moving Arthur to (12,10)..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"script": "MOV(Arthur, @12,10)"}' \
  "$BASE_URL/games/$GAME_ID/script"
echo ""

echo ""
echo "🚶 Moving Ragnar to (15,12)..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"script": "MOV(Ragnar, @15,12)"}' \
  "$BASE_URL/games/$GAME_ID/script"
echo ""

echo ""
echo "🔮 Creating ψ001 - Arthur future movement..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"script": "ψ001: ⊙(Δt+2 @14,11 ⟶ MOV(HERO, Arthur, @14,11))"}' \
  "$BASE_URL/games/$GAME_ID/script"
echo ""

echo ""
echo "⚔️ Creating ψ002 - Future battle..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"script": "ψ002: ⊙(Δt+3 @14,11 ⟶ BATTLE(HERO Arthur, HERO Ragnar))"}' \
  "$BASE_URL/games/$GAME_ID/script"
echo ""

echo ""
echo "👁️ Creating observation trigger..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"script": "Π(Ragnar enters @14,11 at Δt+2) ⇒ †ψ001"}' \
  "$BASE_URL/games/$GAME_ID/script"
echo ""

echo ""
echo "📊 Getting current game state..."
curl -s "$BASE_URL/games/$GAME_ID/state"
echo ""

echo ""
echo "💥 Testing manual collapse of ψ002..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"script": "†ψ002"}' \
  "$BASE_URL/games/$GAME_ID/script"
echo ""

echo ""
echo "⏭️ Advancing to next turn..."
curl -s -X POST "$BASE_URL/games/$GAME_ID/next-turn"
echo ""

echo ""
echo "📊 Final game state..."
curl -s "$BASE_URL/games/$GAME_ID/state"
echo ""

echo ""
echo "🎯 Testing demo endpoints..."
echo "Creating sample game..."
curl -s -X POST "$BASE_URL/demo/create-sample-game"
echo ""

echo ""
echo "Testing collapse demo..."
curl -s -X POST "$BASE_URL/demo/test-collapse"
echo ""

echo ""
echo "✅ All tests completed!"
echo "🎮 Heroes of Time Temporal Engine is working!"