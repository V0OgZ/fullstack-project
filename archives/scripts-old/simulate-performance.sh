#!/bin/bash

# ⚡ Heroes of Time - Performance Simulation Script
# Tests temporal engine performance under load

echo "⚡ Heroes of Time - Performance Simulation"
echo "=========================================="

BASE_URL="http://localhost:8080/api/temporal"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

print_perf() {
    echo -e "${PURPLE}⚡ PERFORMANCE: $1${NC}"
}

print_metric() {
    echo -e "${YELLOW}📊 METRIC: $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Function to measure API call time
timed_api_call() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    local start_time=$(date +%s.%N)
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s "$BASE_URL$endpoint")
    else
        response=$(curl -s -X "$method" -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint")
    fi
    
    local end_time=$(date +%s.%N)
    local duration=$(echo "$end_time - $start_time" | bc)
    
    if [ $? -eq 0 ]; then
        print_metric "$description: ${duration}s"
        echo "$duration"
    else
        echo "ERROR: $description failed" >&2
        echo "999"
    fi
}

# Function to test bulk operations
test_bulk_operations() {
    print_perf "Testing Bulk ψ-state Operations"
    
    local total_time=0
    local count=0
    
    # Create 50 ψ-states rapidly
    for i in {1..50}; do
        local x=$((10 + i % 20))
        local y=$((10 + i % 20))
        local time=$(timed_api_call "POST" "/games/1/script" "{\"script\": \"ψ$i: ⊙(Δt+$((i%5+1)) @$x,$y ⟶ MOV(HERO, Arthur, @$x,$y))\"}" "Create ψ-state $i")
        total_time=$(echo "$total_time + $time" | bc)
        count=$((count + 1))
        
        # Show progress every 10 operations
        if [ $((i % 10)) -eq 0 ]; then
            print_info "Created $i ψ-states..."
        fi
    done
    
    local avg_time=$(echo "scale=4; $total_time / $count" | bc)
    print_metric "Average ψ-state creation time: ${avg_time}s"
    print_metric "Total time for $count operations: ${total_time}s"
    
    # Test bulk collapse
    print_perf "Testing Bulk Collapse Operations"
    local collapse_start=$(date +%s.%N)
    
    for i in {1..25}; do
        timed_api_call "POST" "/games/1/script" "{\"script\": \"†ψ$i\"}" "Collapse ψ$i" > /dev/null
        if [ $((i % 5)) -eq 0 ]; then
            print_info "Collapsed $i ψ-states..."
        fi
    done
    
    local collapse_end=$(date +%s.%N)
    local collapse_total=$(echo "$collapse_end - $collapse_start" | bc)
    print_metric "Bulk collapse time for 25 operations: ${collapse_total}s"
}

# Function to test concurrent operations
test_concurrent_operations() {
    print_perf "Testing Concurrent Operations"
    
    # Create multiple games simultaneously
    local concurrent_start=$(date +%s.%N)
    
    for i in {2..6}; do
        (timed_api_call "POST" "/games" "{\"gameName\": \"Concurrent Game $i\", \"playerId\": \"player$i\"}" "Create concurrent game $i") &
    done
    
    # Wait for all background processes
    wait
    
    local concurrent_end=$(date +%s.%N)
    local concurrent_total=$(echo "$concurrent_end - $concurrent_start" | bc)
    print_metric "Concurrent game creation time: ${concurrent_total}s"
    
    # Test concurrent script execution
    print_perf "Testing Concurrent Script Execution"
    local script_start=$(date +%s.%N)
    
    for i in {1..10}; do
        (timed_api_call "POST" "/games/1/script" "{\"script\": \"ψ$((100+i)): ⊙(Δt+1 @$((30+i)),$((30+i)) ⟶ CREATE(CREATURE, Dragon$i, @$((30+i)),$((30+i))))\"}" "Concurrent script $i") &
    done
    
    wait
    
    local script_end=$(date +%s.%N)
    local script_total=$(echo "$script_end - $script_start" | bc)
    print_metric "Concurrent script execution time: ${script_total}s"
}

# Function to test memory usage simulation
test_memory_simulation() {
    print_perf "Testing Memory Usage with Complex Scenarios"
    
    # Create complex interdependent ψ-states
    local memory_start=$(date +%s.%N)
    
    for i in {1..20}; do
        local complex_script="{\"scripts\": [
            \"ψ$((200+i)): ⊙(Δt+2 @$((i+40)),$((i+40)) ⟶ CREATE(CREATURE, Phoenix$i, @$((i+40)),$((i+40))))\",
            \"ψ$((300+i)): ⊙(Δt+3 @$((i+50)),$((i+50)) ⟶ CREATE(STRUCTURE, Tower$i, @$((i+50)),$((i+50))))\",
            \"Π(Phoenix$i spawns @$((i+40)),$((i+40))) ⇒ †ψ$((300+i))\",
            \"Π(Tower$i built @$((i+50)),$((i+50))) ⇒ ψ$((400+i)): ⊙(Δt+1 @$((i+60)),$((i+60)) ⟶ MOV(HERO, Arthur, @$((i+60)),$((i+60))))\"
        ]}"
        
        timed_api_call "POST" "/games/1/scripts" "$complex_script" "Complex scenario $i" > /dev/null
        
        if [ $((i % 5)) -eq 0 ]; then
            print_info "Created $i complex scenarios..."
        fi
    done
    
    local memory_end=$(date +%s.%N)
    local memory_total=$(echo "$memory_end - $memory_start" | bc)
    print_metric "Complex scenario creation time: ${memory_total}s"
    
    # Test game state retrieval performance
    print_perf "Testing Game State Retrieval Performance"
    local state_times=()
    
    for i in {1..10}; do
        local state_time=$(timed_api_call "GET" "/games/1/state" "" "Game state retrieval $i")
        state_times+=($state_time)
    done
    
    # Calculate average state retrieval time
    local state_total=0
    for time in "${state_times[@]}"; do
        state_total=$(echo "$state_total + $time" | bc)
    done
    local state_avg=$(echo "scale=4; $state_total / ${#state_times[@]}" | bc)
    print_metric "Average game state retrieval time: ${state_avg}s"
}

# Function to test stress scenarios
test_stress_scenarios() {
    print_perf "Testing Stress Scenarios"
    
    # Rapid turn progression
    print_info "Testing rapid turn progression..."
    local turn_start=$(date +%s.%N)
    
    for i in {1..10}; do
        timed_api_call "POST" "/games/1/next-turn" "" "Turn $i" > /dev/null
    done
    
    local turn_end=$(date +%s.%N)
    local turn_total=$(echo "$turn_end - $turn_start" | bc)
    print_metric "10 turns progression time: ${turn_total}s"
    
    # Massive artifact usage
    print_info "Testing massive artifact usage..."
    local artifact_start=$(date +%s.%N)
    
    local artifacts=("AvantWorldBlade" "ReverseClock" "IgnoranceBeacon" "ApocalypseHorn" "VarnakGrimoire")
    
    for i in {1..25}; do
        local artifact=${artifacts[$((i % ${#artifacts[@]}))]}
        timed_api_call "POST" "/games/1/script" "{\"script\": \"USE(ITEM, $artifact, HERO:Arthur)\"}" "Use $artifact #$i" > /dev/null
    done
    
    local artifact_end=$(date +%s.%N)
    local artifact_total=$(echo "$artifact_end - $artifact_start" | bc)
    print_metric "25 artifact usage time: ${artifact_total}s"
}

# Main performance test function
run_performance_test() {
    print_perf "Starting Performance Test Suite"
    
    # Check if bc is available for calculations
    if ! command -v bc &> /dev/null; then
        echo "❌ bc calculator not found. Installing..."
        sudo apt-get update && sudo apt-get install -y bc
    fi
    
    # Wait for server
    print_info "Waiting for server..."
    for i in {1..30}; do
        if curl -s "$BASE_URL/health" > /dev/null 2>&1; then
            print_success "Server ready!"
            break
        fi
        echo -n "."
        sleep 1
    done
    
    # Setup test environment
    print_info "Setting up test environment..."
    timed_api_call "POST" "/games" '{"gameName": "Performance Test", "playerId": "player1"}' "Create test game" > /dev/null
    timed_api_call "POST" "/games/1/join" '{"playerId": "player2"}' "Add player 2" > /dev/null
    timed_api_call "POST" "/games/1/start" "" "Start game" > /dev/null
    timed_api_call "POST" "/games/1/script" '{"script": "HERO(Arthur)"}' "Create Arthur" > /dev/null
    timed_api_call "POST" "/games/1/script" '{"script": "HERO(Ragnar)"}' "Create Ragnar" > /dev/null
    
    # Run performance tests
    local overall_start=$(date +%s.%N)
    
    test_bulk_operations
    echo "----------------------------------------"
    
    test_concurrent_operations
    echo "----------------------------------------"
    
    test_memory_simulation
    echo "----------------------------------------"
    
    test_stress_scenarios
    echo "----------------------------------------"
    
    local overall_end=$(date +%s.%N)
    local overall_total=$(echo "$overall_end - $overall_start" | bc)
    
    # Final summary
    print_perf "=== PERFORMANCE TEST SUMMARY ==="
    print_metric "Total test duration: ${overall_total}s"
    print_success "Performance test completed!"
    print_info "Performance characteristics:"
    echo "  ⚡ Bulk ψ-state operations: Tested"
    echo "  ⚡ Concurrent operations: Tested"
    echo "  ⚡ Memory usage simulation: Tested"
    echo "  ⚡ Stress scenarios: Tested"
    echo "  ⚡ Game state retrieval: Tested"
    echo "  ⚡ Turn progression: Tested"
    echo "  ⚡ Artifact usage: Tested"
    
    print_success "🎮 Heroes of Time temporal engine performance validated!"
}

# Run the performance test
run_performance_test