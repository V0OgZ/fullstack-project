#!/bin/bash

# 🎮 Heroes of Time - Complete Game Simulation Script
# Simulates a full temporal strategy game with multiple players

echo "🎮 Heroes of Time - Complete Game Simulation"
echo "============================================="

BASE_URL="http://localhost:8080/api/temporal"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}🔄 STEP: $1${NC}"
}

print_player() {
    echo -e "${PURPLE}👤 PLAYER $1: $2${NC}"
}

print_temporal() {
    echo -e "${CYAN}🕰️  TEMPORAL: $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ SUCCESS: $1${NC}"
}

print_error() {
    echo -e "${RED}❌ ERROR: $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  INFO: $1${NC}"
}

# Function to wait for server
wait_for_server() {
    print_info "Waiting for server to be ready..."
    for i in {1..30}; do
        if curl -s "$BASE_URL/health" > /dev/null 2>&1; then
            print_success "Server is ready!"
            return 0
        fi
        echo -n "."
        sleep 1
    done
    print_error "Server not ready after 30 seconds"
    return 1
}

# Function to make API call and check response
api_call() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    print_info "API Call: $method $endpoint"
    if [ "$method" = "GET" ]; then
        response=$(curl -s "$BASE_URL$endpoint")
    else
        response=$(curl -s -X "$method" -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint")
    fi
    
    if [ $? -eq 0 ]; then
        print_success "$description"
        echo "$response" | head -3
    else
        print_error "$description failed"
        return 1
    fi
    echo ""
}

# Function to display game state
show_game_state() {
    print_step "Current Game State"
    api_call "GET" "/games/$GAME_ID/state" "" "Get Game State"
}

# Function to simulate player turn
simulate_player_turn() {
    local player_num=$1
    local turn_num=$2
    
    print_step "Turn $turn_num - Player $player_num Actions"
    
    case $player_num in
        1)
            print_player "1" "Arthur's Strategic Moves"
            # Arthur creates temporal superpositions
            api_call "POST" "/games/$GAME_ID/script" '{"script": "ψ'$turn_num'01: ⊙(Δt+2 @'$((15+turn_num))','$((10+turn_num))' ⟶ MOV(HERO, Arthur, @'$((15+turn_num))','$((10+turn_num))'))"}'  "Arthur creates temporal movement"
            
            # Arthur uses temporal artifacts
            if [ $turn_num -eq 2 ]; then
                api_call "POST" "/games/$GAME_ID/script" '{"script": "USE(ITEM, AvantWorldBlade, HERO:Arthur)"}' "Arthur uses Avant-World Blade"
            fi
            ;;
        2)
            print_player "2" "Ragnar's Counter-Strategy"
            # Ragnar responds with his own temporal moves
            api_call "POST" "/games/$GAME_ID/script" '{"script": "ψ'$turn_num'02: ⊙(Δt+1 @'$((20-turn_num))','$((15-turn_num))' ⟶ CREATE(CREATURE, Dragon, @'$((20-turn_num))','$((15-turn_num))'))"}'  "Ragnar creates temporal creature"
            
            # Ragnar tries to collapse Arthur's plans
            if [ $turn_num -gt 1 ]; then
                api_call "POST" "/games/$GAME_ID/script" '{"script": "†ψ'$((turn_num-1))'01"}' "Ragnar collapses Arthur's previous ψ-state"
            fi
            ;;
        3)
            print_player "3" "Merlin's Mystical Actions"
            # Merlin focuses on temporal artifacts and observation triggers
            api_call "POST" "/games/$GAME_ID/script" '{"script": "CREATE(ITEM, VarnakGrimoire, HERO:Merlin)"}' "Merlin creates mystical artifact"
            api_call "POST" "/games/$GAME_ID/script" '{"script": "Π(Player enters @'$((12+turn_num))','$((12+turn_num))') ⇒ †ψ'$turn_num'01"}' "Merlin sets observation trigger"
            ;;
    esac
}

# Function to simulate temporal conflicts
simulate_temporal_conflicts() {
    print_step "Temporal Conflicts and Resolutions"
    
    print_temporal "Creating conflicting ψ-states"
    api_call "POST" "/games/$GAME_ID/script" '{"script": "ψ999: ⊙(Δt+1 @15,15 ⟶ MOV(HERO, Arthur, @15,15))"}' "Arthur plans to move to @15,15"
    api_call "POST" "/games/$GAME_ID/script" '{"script": "ψ998: ⊙(Δt+1 @15,15 ⟶ MOV(HERO, Ragnar, @15,15))"}' "Ragnar plans to move to same location"
    
    print_temporal "Triggering causal collapse"
    api_call "POST" "/games/$GAME_ID/script" '{"script": "MOV(Arthur, @15,15)"}' "Arthur moves first - triggers conflict resolution"
    
    print_temporal "Using temporal artifacts for resolution"
    api_call "POST" "/games/$GAME_ID/script" '{"script": "USE(ITEM, ReverseClock, HERO:Ragnar)"}' "Ragnar uses Reverse Clock to resolve conflict"
}

# Function to simulate advanced temporal mechanics
simulate_advanced_mechanics() {
    print_step "Advanced Temporal Mechanics"
    
    print_temporal "Timeline branching"
    api_call "POST" "/games/$GAME_ID/script" '{"script": "ψ777: ⊙(Δt+3 @25,25 ⟶ CREATE(STRUCTURE, AnchorTower, @25,25)) ℬ2"}' "Create structure in alternative timeline"
    
    print_temporal "Multi-dimensional effects"
    api_call "POST" "/games/$GAME_ID/script" '{"script": "USE(ITEM, IgnoranceBeacon, HERO:Merlin)"}' "Merlin uses Ignorance Beacon"
    
    print_temporal "Complex observation triggers"
    api_call "POST" "/games/$GAME_ID/scripts" '{
        "scripts": [
            "ψ555: ⊙(Δt+2 @30,30 ⟶ CREATE(CREATURE, Phoenix, @30,30))",
            "Π(Phoenix spawns @30,30) ⇒ †ψ777",
            "Π(AnchorTower destroyed) ⇒ ψ555"
        ]
    }' "Complex trigger chain"
}

# Function to simulate endgame scenario
simulate_endgame() {
    print_step "Endgame Scenario"
    
    print_temporal "Final temporal artifact usage"
    api_call "POST" "/games/$GAME_ID/script" '{"script": "USE(ITEM, ApocalypseHorn, HERO:Arthur)"}' "Arthur uses Apocalypse Horn"
    
    print_temporal "Mass collapse of all ψ-states"
    api_call "POST" "/games/$GAME_ID/scripts" '{
        "scripts": [
            "†ψ555",
            "†ψ777",
            "†ψ999",
            "†ψ998"
        ]
    }' "Collapse all remaining ψ-states"
    
    print_temporal "Final positioning"
    api_call "POST" "/games/$GAME_ID/scripts" '{
        "scripts": [
            "MOV(Arthur, @50,50)",
            "MOV(Ragnar, @45,45)",
            "MOV(Merlin, @40,40)"
        ]
    }' "Final hero positioning"
}

# Main simulation function
run_complete_simulation() {
    print_step "Starting Complete Game Simulation"
    
    # Wait for server
    wait_for_server || exit 1
    
    # Test health
    print_step "Testing Server Health"
    api_call "GET" "/health" "" "Health Check"
    
    # Create game
    print_step "Creating New Game"
    api_call "POST" "/games" '{"gameName": "Heroes Simulation", "playerId": "player1"}' "Create Game"
    GAME_ID=1
    
    # Add players
    print_step "Adding Players"
    api_call "POST" "/games/$GAME_ID/join" '{"playerId": "player2"}' "Player 2 joins"
    api_call "POST" "/games/$GAME_ID/join" '{"playerId": "player3"}' "Player 3 joins"
    
    # Start game
    print_step "Starting Game"
    api_call "POST" "/games/$GAME_ID/start" "" "Start Game"
    
    # Create heroes
    print_step "Creating Heroes"
    api_call "POST" "/games/$GAME_ID/script" '{"script": "HERO(Arthur)"}' "Create Arthur"
    api_call "POST" "/games/$GAME_ID/script" '{"script": "HERO(Ragnar)"}' "Create Ragnar"
    api_call "POST" "/games/$GAME_ID/script" '{"script": "HERO(Merlin)"}' "Create Merlin"
    
    # Initial positioning
    print_step "Initial Hero Positioning"
    api_call "POST" "/games/$GAME_ID/scripts" '{
        "scripts": [
            "MOV(Arthur, @10,10)",
            "MOV(Ragnar, @20,20)",
            "MOV(Merlin, @15,15)"
        ]
    }' "Position all heroes"
    
    show_game_state
    
    # Simulate 5 turns
    for turn in {1..5}; do
        print_step "=== TURN $turn ==="
        
        # Each player takes actions
        simulate_player_turn 1 $turn
        sleep 1
        simulate_player_turn 2 $turn
        sleep 1
        simulate_player_turn 3 $turn
        sleep 1
        
        # Advance turn
        api_call "POST" "/games/$GAME_ID/next-turn" "" "Advance to next turn"
        
        show_game_state
        
        # Add some temporal conflicts in turn 3
        if [ $turn -eq 3 ]; then
            simulate_temporal_conflicts
        fi
        
        # Add advanced mechanics in turn 4
        if [ $turn -eq 4 ]; then
            simulate_advanced_mechanics
        fi
        
        echo "----------------------------------------"
    done
    
    # Endgame
    simulate_endgame
    
    # Final state
    print_step "Final Game State"
    show_game_state
    
    # Summary
    print_step "=== SIMULATION SUMMARY ==="
    print_success "Complete game simulation finished!"
    print_info "Simulated features:"
    echo "  ✅ Multi-player game (3 players)"
    echo "  ✅ Hero creation and movement"
    echo "  ✅ Temporal ψ-state creation and management"
    echo "  ✅ Temporal artifact usage"
    echo "  ✅ Observation triggers (Π)"
    echo "  ✅ Manual and automatic collapse"
    echo "  ✅ Causal conflict resolution"
    echo "  ✅ Timeline branching"
    echo "  ✅ Turn-based progression"
    echo "  ✅ Complex temporal interactions"
    echo "  ✅ Endgame scenarios"
    
    print_success "🎮 Heroes of Time simulation demonstrates full temporal gameplay!"
}

# Run the simulation
run_complete_simulation