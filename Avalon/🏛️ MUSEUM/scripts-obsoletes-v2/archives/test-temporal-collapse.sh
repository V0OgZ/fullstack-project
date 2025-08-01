#!/bin/bash

# 🌀 Heroes of Time - Temporal Collapse Test
# ==========================================

echo "🌀 Heroes of Time - Temporal Collapse Test"
echo "=========================================="

# Start server in background
echo "📡 Starting server..."
cd backend
nohup mvn spring-boot:run > server.log 2>&1 &
SERVER_PID=$!
cd ..

# Wait for server to be ready
echo "⏳ Waiting for server to be ready..."
for i in {1..60}; do
    if curl -s http://localhost:8080/api/game/status > /dev/null 2>&1; then
        echo "✅ Server is ready!"
        break
    fi
    echo -n "."
    sleep 1
done

if ! curl -s http://localhost:8080/api/game/status > /dev/null 2>&1; then
    echo "❌ ERROR: Server not ready after 60 seconds"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Setup test game
echo ""
echo "🎮 Setting up test game..."
GAME_RESPONSE=$(curl -s -X POST http://localhost:8080/api/game/create \
    -H "Content-Type: application/json" \
    -d '{"gameName": "Collapse Test", "playerId": "temporal-player"}')
GAME_ID=$(echo $GAME_RESPONSE | jq -r '.gameId')
echo "Game ID: $GAME_ID"

# Create hero
echo "🦸 Creating hero Arthur..."
curl -s -X POST http://localhost:8080/api/game/$GAME_ID/script \
    -H "Content-Type: application/json" \
    -d '{"script": "HERO(Arthur)"}' | jq .

# Move hero to initial position
echo "🚶 Moving Arthur to (10,10)..."
curl -s -X POST http://localhost:8080/api/game/$GAME_ID/script \
    -H "Content-Type: application/json" \
    -d '{"script": "MOV(Arthur, @10,10)"}' | jq .

echo ""
echo "🌀 Testing Temporal Collapse"
echo "============================"

# Test 1: Create ψ-state
echo "📝 Test 1: Create ψ-state ψ001"
curl -s -X POST http://localhost:8080/api/game/$GAME_ID/script \
    -H "Content-Type: application/json" \
    -d '{"script": "ψ001: ⊙(Δt+1 @11,11 ⟶ MOV(Arthur, @11,11))"}' | jq .
echo ""

# Test 2: Check game state with ψ-state
echo "📋 Test 2: Game state with active ψ-state"
curl -s http://localhost:8080/api/game/$GAME_ID | jq .
echo ""

# Test 3: Collapse the ψ-state
echo "💥 Test 3: Collapse ψ-state (†ψ001)"
curl -s -X POST http://localhost:8080/api/game/$GAME_ID/script \
    -H "Content-Type: application/json" \
    -d '{"script": "†ψ001"}' | jq .
echo ""

# Test 4: Check game state after collapse
echo "📋 Test 4: Game state after collapse"
curl -s http://localhost:8080/api/game/$GAME_ID | jq .
echo ""

# Test 5: Multiple ψ-states
echo "🌀 Test 5: Create multiple ψ-states"
curl -s -X POST http://localhost:8080/api/game/$GAME_ID/script \
    -H "Content-Type: application/json" \
    -d '{"script": "ψ002: ⊙(Δt+2 @12,12 ⟶ MOV(Arthur, @12,12))"}' | jq .

curl -s -X POST http://localhost:8080/api/game/$GAME_ID/script \
    -H "Content-Type: application/json" \
    -d '{"script": "ψ003: ⊙(Δt+3 @13,13 ⟶ CREATE(CREATURE, Dragon, @13,13))"}' | jq .
echo ""

# Test 6: Check multiple ψ-states
echo "📋 Test 6: Game state with multiple ψ-states"
curl -s http://localhost:8080/api/game/$GAME_ID | jq .
echo ""

# Test 7: Collapse one of multiple ψ-states
echo "💥 Test 7: Collapse ψ002"
curl -s -X POST http://localhost:8080/api/game/$GAME_ID/script \
    -H "Content-Type: application/json" \
    -d '{"script": "†ψ002"}' | jq .
echo ""

# Test 8: Final game state
echo "📋 Test 8: Final game state"
curl -s http://localhost:8080/api/game/$GAME_ID | jq .
echo ""

# Test 9: Demo endpoint (full collapse test)
echo "🎬 Test 9: Demo endpoint (full collapse scenario)"
curl -s -X POST http://localhost:8080/api/game/demo | jq .
echo ""

echo "✅ Temporal collapse tests completed!"
echo "🛑 Stopping server..."
kill $SERVER_PID 2>/dev/null
echo "🎯 All tests finished successfully!"