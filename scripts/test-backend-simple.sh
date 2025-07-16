#!/bin/bash

# 🎮 HEROES OF TIME - Simple Backend API Testing
# Script simple utilisant curl pour tester l'API backend

echo "🎮 Heroes of Time - Simple Backend API Testing"
echo "============================================="

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

API_BASE="http://localhost:8080"
PASSED=0
FAILED=0
TOTAL=0

test_endpoint() {
    local test_name="$1"
    local endpoint="$2"
    local method="${3:-GET}"
    local data="$4"
    
    echo -e "${BLUE}🔍 Testing: $test_name${NC}"
    TOTAL=$((TOTAL + 1))
    
    if [ "$method" = "POST" ]; then
        response=$(curl -s -w "%{http_code}" -H "Content-Type: application/json" -X POST -d "$data" "$API_BASE$endpoint")
    else
        response=$(curl -s -w "%{http_code}" "$API_BASE$endpoint")
    fi
    
    http_code="${response: -3}"
    body="${response%???}"
    
    if [ "$http_code" -eq 200 ]; then
        echo -e "${GREEN}✅ $test_name - SUCCESS (HTTP $http_code)${NC}"
        PASSED=$((PASSED + 1))
        
        # Afficher un extrait de la réponse
        if [ ${#body} -gt 100 ]; then
            echo -e "${YELLOW}   Response: ${body:0:100}...${NC}"
        else
            echo -e "${YELLOW}   Response: $body${NC}"
        fi
    else
        echo -e "${RED}❌ $test_name - FAILED (HTTP $http_code)${NC}"
        FAILED=$((FAILED + 1))
        echo -e "${RED}   Error: $body${NC}"
    fi
    
    echo ""
}

echo -e "${BLUE}📋 Running Backend API Tests...${NC}"
echo ""

# Test 1: Health Check
test_endpoint "Health Check" "/actuator/health"

# Test 2: Get Available Games
test_endpoint "Get Available Games" "/api/games/available"

# Test 3: Create New Game
test_endpoint "Create New Game" "/api/games" "POST" '{"scenario":"conquest-classic","playerCount":2,"gameMode":"async"}'

# Test 4: Get Game by ID (nous récupérons l'ID du jeu créé)
# Pour simplifier, on teste avec un ID connu
test_endpoint "Get Game by ID" "/api/games/game-1"

# Test 5: Get Current Player
test_endpoint "Get Current Player" "/api/games/game-1/current-player"

# Test 6: Move Hero (avec des données de test)
test_endpoint "Move Hero" "/api/games/game-1/move-hero" "POST" '{"heroId":"hero-1","targetPosition":{"x":3,"y":3}}'

# Test 7: End Turn
test_endpoint "End Turn" "/api/games/game-1/end-turn" "POST" '{"playerId":"player1"}'

# Test 8: Get Magic Items
test_endpoint "Get Magic Items" "/api/magic-items"

# Test 9: Get Epic Content
test_endpoint "Get Epic Heroes" "/api/epic-content/heroes"

# Test 10: Get Epic Creatures
test_endpoint "Get Epic Creatures" "/api/epic-content/creatures"

# Rapport final
echo -e "${BLUE}📊 TEST RESULTS${NC}"
echo "=================================="
echo -e "Total Tests: $TOTAL"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"

pass_rate=$((PASSED * 100 / TOTAL))
echo -e "Pass Rate: $pass_rate%"

if [ $pass_rate -ge 80 ]; then
    echo -e "${GREEN}🎉 Backend API is working well!${NC}"
else
    echo -e "${YELLOW}⚠️  Backend API needs attention${NC}"
fi

# Créer un rapport JSON simple
cat > test-results/backend-simple-report.json << EOF
{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "totalTests": $TOTAL,
  "passedTests": $PASSED,
  "failedTests": $FAILED,
  "passRate": $pass_rate,
  "status": "$([ $pass_rate -ge 80 ] && echo "GOOD" || echo "NEEDS_ATTENTION")"
}
EOF

echo ""
echo -e "${BLUE}📄 Report saved to: test-results/backend-simple-report.json${NC}"

exit $FAILED 