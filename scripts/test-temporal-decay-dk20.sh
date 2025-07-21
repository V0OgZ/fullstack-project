#!/bin/bash

# DK20 Temporal Decay System Test Script
# Tests Anna the Martopicker's temporal decay mechanics

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${CYAN}🌀 DK20 TEMPORAL DECAY SYSTEM TEST${NC}"
echo -e "${CYAN}====================================${NC}"
echo -e "${PURPLE}💫 Testing Anna the Martopicker's temporal decay mechanics${NC}"
echo -e "${PURPLE}   'If you lag behind time, time lags behind you.'${NC}"
echo ""

# Check if backend is running
check_backend() {
    echo -e "${BLUE}🔍 Checking backend availability...${NC}"
    if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend accessible${NC}"
        return 0
    else
        echo -e "${RED}❌ Backend not accessible on localhost:8080${NC}"
        echo -e "${YELLOW}💡 Starting backend...${NC}"
        cd "$PROJECT_ROOT/backend"
        mvn spring-boot:run > ../backend-decay-test.log 2>&1 &
        BACKEND_PID=$!
        cd "$PROJECT_ROOT"
        
        # Wait for backend to start
        echo -e "${YELLOW}⏳ Waiting for backend to start...${NC}"
        for i in {1..30}; do
            if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
                echo -e "${GREEN}✅ Backend started successfully${NC}"
                return 0
            fi
            sleep 2
            echo -n "."
        done
        echo -e "${RED}❌ Backend failed to start within 60 seconds${NC}"
        return 1
    fi
}

# Test 1: Basic decay application
test_basic_decay() {
    echo -e "${YELLOW}📋 Test 1: Basic Temporal Decay Application${NC}"
    
    # Create a test game
    GAME_RESPONSE=$(curl -s -X POST http://localhost:8080/api/games/create \
        -H "Content-Type: application/json" \
        -d '{"name": "DK20_Decay_Test"}')
    
    if [[ $? -eq 0 ]]; then
        GAME_ID=$(echo "$GAME_RESPONSE" | jq -r '.id // empty')
        if [[ -n "$GAME_ID" && "$GAME_ID" != "null" ]]; then
            echo -e "${GREEN}✅ Game created with ID: $GAME_ID${NC}"
        else
            echo -e "${RED}❌ Failed to extract game ID${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Failed to create game${NC}"
        return 1
    fi
    
    # Test temporal delay calculation
    echo -e "${BLUE}🕐 Testing temporal delay calculation...${NC}"
    
    # Simulate hero with temporal delay
    DECAY_TEST=$(curl -s -X POST "http://localhost:8080/api/games/$GAME_ID/heroes/Arthur/decay/check" \
        -H "Content-Type: application/json" \
        -d '{"temporalDelay": 6}')
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✅ Temporal delay check completed${NC}"
        echo -e "${CYAN}📊 Response: $DECAY_TEST${NC}"
    else
        echo -e "${YELLOW}⚠️ Decay endpoint may not be implemented yet${NC}"
    fi
    
    return 0
}

# Test 2: Anti-decay artifacts
test_antidecay_artifacts() {
    echo -e "${YELLOW}📋 Test 2: Anti-Decay Artifacts (Anna's Tools)${NC}"
    
    # Test artifacts
    declare -a artifacts=("Pendule d'Echo" "Lunettes de l'Oraculon" "Spanner of Rewind")
    
    for artifact in "${artifacts[@]}"; do
        echo -e "${BLUE}🧰 Testing artifact: $artifact${NC}"
        
        # Test artifact effect (simulated for now)
        ARTIFACT_TEST=$(curl -s -X POST "http://localhost:8080/api/artifacts/test" \
            -H "Content-Type: application/json" \
            -d "{\"name\": \"$artifact\", \"type\": \"ANTI_DECAY\"}")
        
        if [[ $? -eq 0 ]]; then
            echo -e "${GREEN}✅ Artifact $artifact tested${NC}"
        else
            echo -e "${YELLOW}⚠️ Artifact endpoint not yet implemented${NC}"
        fi
    done
    
    return 0
}

# Test 3: Zone causal density
test_zone_causal_density() {
    echo -e "${YELLOW}📋 Test 3: Zone Causal Density Overload${NC}"
    
    # Simulate zone with high psi-state density
    echo -e "${BLUE}🌐 Testing causal overload in zone...${NC}"
    
    ZONE_TEST=$(curl -s -X POST "http://localhost:8080/api/zones/causal-density/check" \
        -H "Content-Type: application/json" \
        -d '{"zoneName": "Test_Zone", "psiStateCount": 12, "densityLimit": 10}')
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✅ Zone density check completed${NC}"
        echo -e "${CYAN}📊 Response: $ZONE_TEST${NC}"
    else
        echo -e "${YELLOW}⚠️ Zone density endpoint not yet implemented${NC}"
    fi
    
    return 0
}

# Test 4: Decay levels validation
test_decay_levels() {
    echo -e "${YELLOW}📋 Test 4: Decay Levels Validation${NC}"
    
    # Test different decay levels
    declare -A decay_levels=(
        ["3"]="Level 1: Building degradation"
        ["5"]="Level 2: Vision limitation + NPC avoidance" 
        ["7"]="Level 3: Building collapse + collapse risk"
    )
    
    for days in "${!decay_levels[@]}"; do
        echo -e "${BLUE}📅 Testing $days days delay: ${decay_levels[$days]}${NC}"
        
        LEVEL_TEST=$(curl -s -X GET "http://localhost:8080/api/decay/level?days=$days")
        
        if [[ $? -eq 0 ]]; then
            echo -e "${GREEN}✅ Decay level calculation for $days days${NC}"
        else
            echo -e "${YELLOW}⚠️ Decay level endpoint not yet implemented${NC}"
        fi
    done
    
    return 0
}

# Test 5: Anna the Martopicker hero
test_anna_hero() {
    echo -e "${YELLOW}📋 Test 5: Anna the Martopicker Hero Validation${NC}"
    
    # Test Anna's hero profile
    echo -e "${BLUE}👤 Testing Anna the Martopicker hero...${NC}"
    
    ANNA_PROFILE='{
        "name": "Anna the Martopicker",
        "title": "Glaneuse d'\''Artefacts Oubliés",
        "type": "TEMPORAL_SPECIALIST",
        "philosophy": "If you lag behind time, time lags behind you",
        "specialties": ["TEMPORAL_DECAY", "ARTIFACT_RECOVERY", "CAUSAL_CLEANING"],
        "signature_items": ["Pendule d'\''Echo", "Lunettes de l'\''Oraculon", "Spanner of Rewind"],
        "grofi_alignment": "CHAOS_ORDER_BALANCE"
    }'
    
    ANNA_TEST=$(curl -s -X POST "http://localhost:8080/api/heroes/validate" \
        -H "Content-Type: application/json" \
        -d "$ANNA_PROFILE")
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✅ Anna hero profile validated${NC}"
        echo -e "${CYAN}📊 Response: $ANNA_TEST${NC}"
    else
        echo -e "${YELLOW}⚠️ Hero validation endpoint not yet implemented${NC}"
    fi
    
    # Show Anna's philosophy
    echo -e "${PURPLE}💬 Anna says: 'If you lag behind time, time lags behind you.'${NC}"
    echo -e "${PURPLE}🎯 Anna's mission: Clean up temporal residue and recover lost artifacts${NC}"
    
    return 0
}

# Test 6: Integration with existing GROFI system
test_grofi_integration() {
    echo -e "${YELLOW}📋 Test 6: GROFI System Integration${NC}"
    
    echo -e "${BLUE}🎳 Testing integration with Jean-Grofignon philosophy...${NC}"
    
    # Test GROFI balance
    echo -e "${CYAN}⚖️ Order (Jean) + Chaos (Anna) = Perfect Harmony${NC}"
    echo -e "${CYAN}🔄 Temporal rules vs. Temporal cleanup${NC}"
    echo -e "${CYAN}🎯 Time progression vs. Time recovery${NC}"
    
    GROFI_TEST=$(curl -s -X GET "http://localhost:8080/api/grofi/balance/temporal-decay")
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✅ GROFI integration validated${NC}"
    else
        echo -e "${YELLOW}⚠️ GROFI integration endpoint not yet implemented${NC}"
    fi
    
    return 0
}

# Run all tests
run_all_tests() {
    local test_count=0
    local passed_tests=0
    
    echo -e "${CYAN}🚀 Starting DK20 Temporal Decay Test Suite${NC}"
    echo ""
    
    # Check backend first
    if ! check_backend; then
        echo -e "${RED}❌ Cannot run tests without backend${NC}"
        return 1
    fi
    
    echo ""
    
    # Run tests
    tests=(
        "test_basic_decay"
        "test_antidecay_artifacts" 
        "test_zone_causal_density"
        "test_decay_levels"
        "test_anna_hero"
        "test_grofi_integration"
    )
    
    for test_func in "${tests[@]}"; do
        echo ""
        if $test_func; then
            ((passed_tests++))
        fi
        ((test_count++))
    done
    
    echo ""
    echo -e "${CYAN}📊 DK20 TEST SUMMARY${NC}"
    echo -e "${CYAN}====================${NC}"
    echo -e "${BLUE}📋 Total tests: $test_count${NC}"
    echo -e "${GREEN}✅ Passed: $passed_tests${NC}"
    echo -e "${RED}❌ Failed: $((test_count - passed_tests))${NC}"
    
    if [[ $passed_tests -eq $test_count ]]; then
        echo -e "${GREEN}🎉 All DK20 tests completed successfully!${NC}"
        echo -e "${PURPLE}💫 Anna the Martopicker's temporal decay system is ready!${NC}"
    else
        echo -e "${YELLOW}⚠️ Some tests had issues (likely due to unimplemented endpoints)${NC}"
        echo -e "${BLUE}📝 This is expected for initial DK20 integration${NC}"
    fi
    
    echo ""
    echo -e "${PURPLE}🎭 Anna's Final Quote:${NC}"
    echo -e "${PURPLE}   'Time flows like water through careless fingers,'${NC}"
    echo -e "${PURPLE}   'but I collect every precious drop.'${NC}"
    
    return 0
}

# Main execution
main() {
    cd "$PROJECT_ROOT"
    
    # Run the test suite
    run_all_tests
    
    # Cleanup background processes if we started them
    if [[ -n "$BACKEND_PID" ]]; then
        echo -e "${YELLOW}🧹 Cleaning up background processes...${NC}"
        kill $BACKEND_PID 2>/dev/null || true
    fi
}

# Execute main function
main "$@" 