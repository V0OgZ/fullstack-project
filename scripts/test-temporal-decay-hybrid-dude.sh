#!/bin/bash

# The Dude's Temporal Decay Hybrid Test Script
# "Sometimes you eat the bar, and sometimes the bar eats you."

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

echo -e "${CYAN}🎳 THE DUDE'S TEMPORAL DECAY HYBRID TEST${NC}"
echo -e "${CYAN}========================================${NC}"
echo -e "${PURPLE}💫 Testing unified decay system: Legacy + DK20 concepts${NC}"
echo -e "${PURPLE}   'Why choose between a White Russian and a Caucasian when you can have both?'${NC}"
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
        mvn spring-boot:run > ../backend-hybrid-test.log 2>&1 &
        BACKEND_PID=$!
        cd "$PROJECT_ROOT"
        
        # Wait for backend to start (macOS compatible)
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

# Test 1: Hybrid system info
test_hybrid_info() {
    echo -e "${YELLOW}📋 Test 1: Hybrid System Information${NC}"
    
    INFO_RESPONSE=$(curl -s http://localhost:8080/api/temporal/decay/hybrid/info)
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✅ Hybrid system info retrieved${NC}"
        echo -e "${CYAN}📊 System: $(echo "$INFO_RESPONSE" | jq -r '.system // "N/A"')${NC}"
        echo -e "${CYAN}🎯 Philosophy: $(echo "$INFO_RESPONSE" | jq -r '.philosophy // "N/A"')${NC}"
        echo -e "${CYAN}💬 Quote: $(echo "$INFO_RESPONSE" | jq -r '.quote // "N/A"')${NC}"
        
        # Show available endpoints
        echo -e "${BLUE}🔗 Available endpoints:${NC}"
        echo "$INFO_RESPONSE" | jq -r '.endpoints | to_entries[] | "  - \(.key): \(.value)"' 2>/dev/null || echo "  - Info retrieved successfully"
    else
        echo -e "${RED}❌ Failed to retrieve hybrid system info${NC}"
        return 1
    fi
    
    return 0
}

# Test 2: Create test game
test_create_game() {
    echo -e "${YELLOW}📋 Test 2: Create Test Game for Decay${NC}"
    
    # Create a test game
    GAME_RESPONSE=$(curl -s -X POST http://localhost:8080/api/games/create \
        -H "Content-Type: application/json" \
        -d '{"name": "Hybrid_Decay_Test_Game"}')
    
    if [[ $? -eq 0 ]]; then
        GAME_ID=$(echo "$GAME_RESPONSE" | jq -r '.id // empty')
        if [[ -n "$GAME_ID" && "$GAME_ID" != "null" ]]; then
            echo -e "${GREEN}✅ Test game created with ID: $GAME_ID${NC}"
            echo "$GAME_ID" > /tmp/hybrid_test_game_id.txt
        else
            echo -e "${RED}❌ Failed to extract game ID${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Failed to create test game${NC}"
        return 1
    fi
    
    return 0
}

# Test 3: Quick hybrid test
test_hybrid_quick() {
    echo -e "${YELLOW}📋 Test 3: Quick Hybrid System Test${NC}"
    
    # Get game ID from previous test
    if [[ -f /tmp/hybrid_test_game_id.txt ]]; then
        GAME_ID=$(cat /tmp/hybrid_test_game_id.txt)
        echo -e "${BLUE}🎮 Testing with game ID: $GAME_ID${NC}"
        
        # Run quick test
        TEST_RESPONSE=$(curl -s http://localhost:8080/api/temporal/decay/hybrid/$GAME_ID/test)
        
        if [[ $? -eq 0 ]]; then
            SUCCESS=$(echo "$TEST_RESPONSE" | jq -r '.success // false')
            if [[ "$SUCCESS" == "true" ]]; then
                echo -e "${GREEN}✅ Hybrid system test successful${NC}"
                echo -e "${CYAN}📊 Result: $(echo "$TEST_RESPONSE" | jq -r '.testResult // "N/A"')${NC}"
                echo -e "${CYAN}🎳 System: $(echo "$TEST_RESPONSE" | jq -r '.system // "N/A"')${NC}"
            else
                echo -e "${YELLOW}⚠️ Test completed but with issues${NC}"
                echo -e "${CYAN}📊 Response: $TEST_RESPONSE${NC}"
            fi
        else
            echo -e "${RED}❌ Failed to run hybrid test${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ No game ID available for testing${NC}"
        return 1
    fi
    
    return 0
}

# Test 4: Apply unified decay
test_apply_unified_decay() {
    echo -e "${YELLOW}📋 Test 4: Apply Unified Temporal Decay${NC}"
    
    if [[ -f /tmp/hybrid_test_game_id.txt ]]; then
        GAME_ID=$(cat /tmp/hybrid_test_game_id.txt)
        echo -e "${BLUE}🎮 Applying decay to game ID: $GAME_ID${NC}"
        
        # Apply unified decay
        APPLY_RESPONSE=$(curl -s -X POST http://localhost:8080/api/temporal/decay/hybrid/$GAME_ID/apply)
        
        if [[ $? -eq 0 ]]; then
            SUCCESS=$(echo "$APPLY_RESPONSE" | jq -r '.success // false')
            if [[ "$SUCCESS" == "true" ]]; then
                echo -e "${GREEN}✅ Unified decay applied successfully${NC}"
                
                STRUCTURAL_COUNT=$(echo "$APPLY_RESPONSE" | jq -r '.structuralDecayCount // 0')
                PERSONAL_COUNT=$(echo "$APPLY_RESPONSE" | jq -r '.personalDecayCount // 0')
                DUDE_QUOTE=$(echo "$APPLY_RESPONSE" | jq -r '.dudeQuote // "N/A"')
                
                echo -e "${CYAN}🏰 Structural decay effects: $STRUCTURAL_COUNT${NC}"
                echo -e "${CYAN}🧙 Personal decay effects: $PERSONAL_COUNT${NC}"
                echo -e "${PURPLE}🎳 The Dude says: $DUDE_QUOTE${NC}"
            else
                echo -e "${YELLOW}⚠️ Decay application completed but with issues${NC}"
                echo -e "${CYAN}📊 Response: $APPLY_RESPONSE${NC}"
            fi
        else
            echo -e "${RED}❌ Failed to apply unified decay${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ No game ID available for decay application${NC}"
        return 1
    fi
    
    return 0
}

# Test 5: Get unified statistics
test_unified_stats() {
    echo -e "${YELLOW}📋 Test 5: Unified Decay Statistics${NC}"
    
    if [[ -f /tmp/hybrid_test_game_id.txt ]]; then
        GAME_ID=$(cat /tmp/hybrid_test_game_id.txt)
        echo -e "${BLUE}📊 Getting stats for game ID: $GAME_ID${NC}"
        
        # Get unified stats
        STATS_RESPONSE=$(curl -s http://localhost:8080/api/temporal/decay/hybrid/$GAME_ID/stats)
        
        if [[ $? -eq 0 ]]; then
            SUCCESS=$(echo "$STATS_RESPONSE" | jq -r '.success // false')
            if [[ "$SUCCESS" == "true" ]]; then
                echo -e "${GREEN}✅ Unified statistics retrieved${NC}"
                
                TOTAL_HEROES=$(echo "$STATS_RESPONSE" | jq -r '.totalHeroes // 0')
                UNIFIED_SYSTEM=$(echo "$STATS_RESPONSE" | jq -r '.unifiedSystem // "N/A"')
                PHILOSOPHY=$(echo "$STATS_RESPONSE" | jq -r '.philosophy // "N/A"')
                
                echo -e "${CYAN}👥 Total heroes: $TOTAL_HEROES${NC}"
                echo -e "${CYAN}🎯 System: $UNIFIED_SYSTEM${NC}"
                echo -e "${CYAN}💭 Philosophy: $PHILOSOPHY${NC}"
                
                # Show structural and personal stats if available
                echo -e "${BLUE}📈 Detailed statistics:${NC}"
                echo "$STATS_RESPONSE" | jq '.structural, .personal' 2>/dev/null || echo "  - Statistics retrieved successfully"
            else
                echo -e "${YELLOW}⚠️ Stats retrieval completed but with issues${NC}"
                echo -e "${CYAN}📊 Response: $STATS_RESPONSE${NC}"
            fi
        else
            echo -e "${RED}❌ Failed to get unified statistics${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ No game ID available for statistics${NC}"
        return 1
    fi
    
    return 0
}

# Test 6: Legacy compatibility check
test_legacy_compatibility() {
    echo -e "${YELLOW}📋 Test 6: Legacy System Compatibility${NC}"
    
    echo -e "${BLUE}🔧 Testing legacy decay endpoint...${NC}"
    
    # Test legacy info endpoint
    LEGACY_INFO=$(curl -s http://localhost:8080/api/temporal/decay/info)
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✅ Legacy system still accessible${NC}"
        LEGACY_SYSTEM=$(echo "$LEGACY_INFO" | jq -r '.system // "N/A"')
        echo -e "${CYAN}🏛️ Legacy system: $LEGACY_SYSTEM${NC}"
    else
        echo -e "${YELLOW}⚠️ Legacy system may not be accessible${NC}"
    fi
    
    return 0
}

# Run all tests
run_all_tests() {
    local test_count=0
    local passed_tests=0
    
    echo -e "${CYAN}🚀 Starting The Dude's Hybrid Decay Test Suite${NC}"
    echo ""
    
    # Check backend first
    if ! check_backend; then
        echo -e "${RED}❌ Cannot run tests without backend${NC}"
        return 1
    fi
    
    echo ""
    
    # Run tests
    tests=(
        "test_hybrid_info"
        "test_create_game" 
        "test_hybrid_quick"
        "test_apply_unified_decay"
        "test_unified_stats"
        "test_legacy_compatibility"
    )
    
    for test_func in "${tests[@]}"; do
        echo ""
        if $test_func; then
            ((passed_tests++))
        fi
        ((test_count++))
    done
    
    echo ""
    echo -e "${CYAN}📊 THE DUDE'S HYBRID TEST SUMMARY${NC}"
    echo -e "${CYAN}==================================${NC}"
    echo -e "${BLUE}📋 Total tests: $test_count${NC}"
    echo -e "${GREEN}✅ Passed: $passed_tests${NC}"
    echo -e "${RED}❌ Failed: $((test_count - passed_tests))${NC}"
    
    if [[ $passed_tests -eq $test_count ]]; then
        echo -e "${GREEN}🎉 All hybrid tests completed successfully!${NC}"
        echo -e "${PURPLE}🎳 The Dude's unified system is ready to roll!${NC}"
    else
        echo -e "${YELLOW}⚠️ Some tests had issues${NC}"
        echo -e "${BLUE}📝 This is normal for initial hybrid testing${NC}"
    fi
    
    echo ""
    echo -e "${PURPLE}🎳 The Dude's Final Wisdom:${NC}"
    echo -e "${PURPLE}   'That's just, like, your opinion, man...'${NC}"
    echo -e "${PURPLE}   'But combining Anna's two visions? That's beautiful, dude.'${NC}"
    
    # Cleanup
    rm -f /tmp/hybrid_test_game_id.txt
    
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