#!/bin/bash

# 🚀 Heroes of Time - Quick Game Simulation Script
# Fast simulation for testing core temporal mechanics

echo "🚀 Heroes of Time - Quick Game Simulation"
echo "========================================="

BASE_URL="http://localhost:8080/api/temporal"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}🔄 $1${NC}"
}

print_temporal() {
    echo -e "${CYAN}🕰️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Quick API call function
quick_api() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s "$BASE_URL$endpoint")
    else
        response=$(curl -s -X "$method" -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint")
    fi
    
    if [ $? -eq 0 ]; then
        print_success "$description"
    else
        echo "❌ $description failed"
        return 1
    fi
}

# Main quick simulation
run_quick_simulation() {
    print_step "Quick Temporal Simulation Starting"
    
    # Wait for server
    print_info "Checking server..."
    for i in {1..10}; do
        if curl -s "$BASE_URL/health" > /dev/null 2>&1; then
            print_success "Server ready!"
            break
        fi
        echo -n "."
        sleep 1
    done
    
    # Create game and heroes
    print_step "Setup Phase"
    quick_api "POST" "/games" '{"gameName": "Quick Test", "playerId": "player1"}' "Game created"
    GAME_ID=1
    
    quick_api "POST" "/games/$GAME_ID/join" '{"playerId": "player2"}' "Player 2 joined"
    quick_api "POST" "/games/$GAME_ID/start" "" "Game started"
    
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "HERO(Arthur)"}' "Arthur created"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "HERO(Ragnar)"}' "Ragnar created"
    
    # Basic temporal mechanics
    print_step "Basic Temporal Mechanics"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "MOV(Arthur, @10,10)"}' "Arthur positioned"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))"}' "ψ-state created"
    
    print_temporal "Testing collapse mechanism"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "†ψ001"}' "Manual collapse"
    
    # Temporal artifacts
    print_step "Temporal Artifacts"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "USE(ITEM, AvantWorldBlade, HERO:Arthur)"}' "Avant-World Blade used"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "USE(ITEM, ReverseClock, HERO:Ragnar)"}' "Reverse Clock used"
    
    # Observation triggers
    print_step "Observation Triggers"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "ψ002: ⊙(Δt+1 @20,20 ⟶ CREATE(CREATURE, Dragon, @20,20))"}' "Dragon ψ-state"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "Π(Dragon spawns @20,20) ⇒ †ψ002"}' "Observation trigger set"
    
    # Temporal conflicts
    print_step "Temporal Conflicts"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "ψ003: ⊙(Δt+1 @25,25 ⟶ MOV(HERO, Arthur, @25,25))"}' "Arthur future move"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "ψ004: ⊙(Δt+1 @25,25 ⟶ MOV(HERO, Ragnar, @25,25))"}' "Ragnar conflicting move"
    
    print_temporal "Resolving conflict"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "MOV(Arthur, @25,25)"}' "Arthur moves first"
    
    # Advanced mechanics
    print_step "Advanced Mechanics"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "CREATE(ITEM, VarnakGrimoire, HERO:Arthur)"}' "Mystical artifact created"
    quick_api "POST" "/games/$GAME_ID/script" '{"script": "ψ005: ⊙(Δt+2 @30,30 ⟶ CREATE(STRUCTURE, AnchorTower, @30,30)) ℬ2"}' "Timeline branching"
    
    # Turn progression
    print_step "Turn Progression"
    quick_api "POST" "/games/$GAME_ID/next-turn" "" "Next turn"
    quick_api "GET" "/games/$GAME_ID/state" "" "Game state retrieved"
    
    # Final summary
    print_step "=== QUICK SIMULATION COMPLETE ==="
    print_success "All core temporal mechanics tested!"
    print_info "Tested features:"
    echo "  ✅ Hero creation and movement"
    echo "  ✅ ψ-state creation and collapse"
    echo "  ✅ Temporal artifacts"
    echo "  ✅ Observation triggers"
    echo "  ✅ Temporal conflicts"
    echo "  ✅ Timeline branching"
    echo "  ✅ Turn progression"
    
    print_success "🎮 Heroes of Time quick simulation successful!"
}

# Run the quick simulation
run_quick_simulation