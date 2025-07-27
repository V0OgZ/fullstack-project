#!/bin/bash

# 🚀 Heroes of Time - Quick Temporal Engine Test
# ==============================================

echo "🚀 Heroes of Time - Quick Temporal Engine Test"
echo "=============================================="

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

# Test basic functionality
echo ""
echo "🧪 Testing Basic Functionality"
echo "==============================="

# Test 1: Server status
echo "📊 Test 1: Server Status"
curl -s http://localhost:8080/api/game/status | jq .
echo ""

# Test 2: Create game
echo "🎮 Test 2: Create Game"
GAME_RESPONSE=$(curl -s -X POST http://localhost:8080/api/game/create \
    -H "Content-Type: application/json" \
    -d '{"gameName": "Quick Test", "playerId": "test-player"}')
echo $GAME_RESPONSE | jq .
GAME_ID=$(echo $GAME_RESPONSE | jq -r '.gameId')
echo ""

# Test 3: Create hero
echo "🦸 Test 3: Create Hero"
curl -s -X POST http://localhost:8080/api/game/$GAME_ID/script \
    -H "Content-Type: application/json" \
    -d '{"script": "HERO(Arthur)"}' | jq .
echo ""

# Test 4: Move hero
echo "🚶 Test 4: Move Hero"
curl -s -X POST http://localhost:8080/api/game/$GAME_ID/script \
    -H "Content-Type: application/json" \
    -d '{"script": "MOV(Arthur, @10,10)"}' | jq .
echo ""

# Test 5: Simple ψ-state (without collapse)
echo "🌀 Test 5: Create ψ-state"
curl -s -X POST http://localhost:8080/api/game/$GAME_ID/script \
    -H "Content-Type: application/json" \
    -d '{"script": "ψ001: ⊙(Δt+1 @11,11 ⟶ MOV(Arthur, @11,11))"}' | jq .
echo ""

# Test 6: Game state
echo "📋 Test 6: Game State"
curl -s http://localhost:8080/api/game/$GAME_ID | jq .
echo ""

# Test 7: Temporal health
echo "💊 Test 7: Temporal Health"
curl -s http://localhost:8080/api/temporal/health | jq .
echo ""

echo "✅ Quick tests completed!"
echo "🛑 Stopping server..."
kill $SERVER_PID 2>/dev/null
echo "🎯 Test finished successfully!"