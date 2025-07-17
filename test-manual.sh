#!/bin/bash

# Manual Test Script for Heroes of Time Backend
echo "🔧 Manual Heroes of Time Backend Test"
echo "====================================="

BASE_URL="http://localhost:8080/api/temporal"

echo "1. Testing basic connectivity..."
echo "curl -s $BASE_URL/health"
curl -s $BASE_URL/health
echo ""

echo "2. Testing game creation..."
echo "curl -s -X POST -H 'Content-Type: application/json' -d '{\"gameName\": \"Test Game\", \"playerId\": \"player1\"}' $BASE_URL/games"
curl -s -X POST -H 'Content-Type: application/json' -d '{"gameName": "Test Game", "playerId": "player1"}' $BASE_URL/games
echo ""

echo "3. Testing hero creation..."
echo "curl -s -X POST -H 'Content-Type: application/json' -d '{\"script\": \"HERO(Arthur)\"}' $BASE_URL/games/1/script"
curl -s -X POST -H 'Content-Type: application/json' -d '{"script": "HERO(Arthur)"}' $BASE_URL/games/1/script
echo ""

echo "4. Testing hero movement..."
echo "curl -s -X POST -H 'Content-Type: application/json' -d '{\"script\": \"MOV(Arthur, @10,10)\"}' $BASE_URL/games/1/script"
curl -s -X POST -H 'Content-Type: application/json' -d '{"script": "MOV(Arthur, @10,10)"}' $BASE_URL/games/1/script
echo ""

echo "5. Testing temporal ψ state creation..."
echo "curl -s -X POST -H 'Content-Type: application/json' -d '{\"script\": \"ψ001: ⊙(Δt+2 @12,12 ⟶ MOV(HERO, Arthur, @12,12))\"}' $BASE_URL/games/1/script"
curl -s -X POST -H 'Content-Type: application/json' -d '{"script": "ψ001: ⊙(Δt+2 @12,12 ⟶ MOV(HERO, Arthur, @12,12))"}' $BASE_URL/games/1/script
echo ""

echo "6. Testing game state..."
echo "curl -s $BASE_URL/games/1/state"
curl -s $BASE_URL/games/1/state
echo ""

echo "7. Testing collapse..."
echo "curl -s -X POST -H 'Content-Type: application/json' -d '{\"script\": \"†ψ001\"}' $BASE_URL/games/1/script"
curl -s -X POST -H 'Content-Type: application/json' -d '{"script": "†ψ001"}' $BASE_URL/games/1/script
echo ""

echo "8. Testing demo endpoint..."
echo "curl -s -X POST $BASE_URL/demo/create-sample-game"
curl -s -X POST $BASE_URL/demo/create-sample-game
echo ""

echo "✅ Manual test completed!"