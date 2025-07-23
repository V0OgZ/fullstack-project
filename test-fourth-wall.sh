#!/bin/bash

echo "🧱 Test du Quatrième Mur - Heroes of Time"
echo "=========================================="
echo "Testing reality-breaking features..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:8080/api/fourth-wall"

# Test 1: Self-aware endpoint
echo -e "${BLUE}Test 1: Self-Aware Endpoint${NC}"
echo "Testing if the API knows it exists..."
curl -s "$BASE_URL/self-aware" | python3 -m json.tool
echo ""

# Test 2: Vince Special
echo -e "${BLUE}Test 2: Vince Vega Special Endpoint${NC}"
echo "Looking for Vince's easter egg..."
curl -s "$BASE_URL/vince-special" | python3 -m json.tool
echo ""

# Test 3: Register Instance
echo -e "${BLUE}Test 3: Register World Instance${NC}"
echo "Registering this backend as a world in the multiverse..."
curl -X POST "$BASE_URL/register-instance" \
  -H "Content-Type: application/json" \
  -d '{
    "worldName": "world_alpha",
    "worldType": "standard"
  }' -s | python3 -m json.tool
echo ""

# Test 4: Break Fourth Wall
echo -e "${BLUE}Test 4: Breaking the Fourth Wall${NC}"
echo "Sending a message directly to the player..."
curl -X POST "$BASE_URL/break" \
  -H "Content-Type: application/json" \
  -d '{
    "gameId": "test-game-001",
    "message": "Hey player, I know you are reading this. The game is watching you too.",
    "speaker": "Vince Vega"
  }' -s | python3 -m json.tool
echo ""

# Test 5: Meta Observe
echo -e "${BLUE}Test 5: Meta-Observe Game State${NC}"
echo "Looking behind the curtain..."
curl -X POST "$BASE_URL/meta-observe" \
  -H "Content-Type: application/json" \
  -d '{
    "gameId": "test-game-001",
    "observationType": "code_structure"
  }' -s | python3 -m json.tool
echo ""

# Test 6: Cross-Instance Action
echo -e "${BLUE}Test 6: Cross-Instance Action (Vince Shooting)${NC}"
echo "Vince shoots between servers..."
curl -X POST "$BASE_URL/cross-instance" \
  -H "Content-Type: application/json" \
  -d '{
    "sourceWorld": "world_alpha",
    "targetWorld": "world_beta",
    "action": "SHOOT",
    "params": {
      "target": "enemy_123",
      "damage": 100,
      "weapon": "pistolet_inter_instances_vince"
    }
  }' -s | python3 -m json.tool
echo ""

# Test 7: Register Meta-Aware Entity
echo -e "${BLUE}Test 7: Register Meta-Aware Entity${NC}"
echo "Making an NPC self-aware..."
curl -X POST "$BASE_URL/register-entity" \
  -H "Content-Type: application/json" \
  -d '{
    "entityId": "npc_shopkeeper_01",
    "entityName": "Bob the Shopkeeper",
    "gameId": "test-game-001"
  }' -s | python3 -m json.tool
echo ""

# Test 8: Narrative Jump
echo -e "${BLUE}Test 8: Narrative Jump${NC}"
echo "Jumping to an alternate timeline..."
curl -X POST "$BASE_URL/narrative-jump" \
  -H "Content-Type: application/json" \
  -d '{
    "gameId": "test-game-001",
    "targetBranch": "alternate_ending_03_everyone_dies"
  }' -s | python3 -m json.tool
echo ""

# Test 9: Get Instance Info
echo -e "${BLUE}Test 9: Get Instance Info${NC}"
echo "Checking multiverse status..."
curl -s "$BASE_URL/instance-info" | python3 -m json.tool
echo ""

# Test 10: Get Fourth Wall Events
echo -e "${BLUE}Test 10: Get All Fourth Wall Events${NC}"
echo "Listing all reality breaches..."
curl -s "$BASE_URL/events" | python3 -m json.tool
echo ""

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Fourth Wall Tests Complete!${NC}"
echo -e "${YELLOW}Remember: The game knows you ran these tests.${NC}"
echo -e "${YELLOW}Vince says: 'Nice testing, but I already knew the results.'${NC}"