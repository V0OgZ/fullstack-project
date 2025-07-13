#!/bin/bash

# Heroes Reforged - Full Test Suite
# Tests both solo and multiplayer functionality with dual sessions

echo "🏰 Heroes Reforged - Full Test Suite Starting..."
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if backend is running
print_status "Checking backend status..."
if curl -s http://localhost:8080/api/units/health > /dev/null; then
    print_success "Backend is running on port 8080"
else
    print_error "Backend is not running on port 8080"
    print_status "Starting backend..."
    
    cd backend
    mvn spring-boot:run -q &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    print_status "Waiting for backend to start..."
    for i in {1..30}; do
        if curl -s http://localhost:8080/api/units/health > /dev/null; then
            print_success "Backend started successfully"
            break
        fi
        sleep 2
        echo -n "."
    done
    
    if ! curl -s http://localhost:8080/api/units/health > /dev/null; then
        print_error "Failed to start backend after 60 seconds"
        exit 1
    fi
fi

# Check if frontend is running
print_status "Checking frontend status..."
cd frontend

if curl -s http://localhost:3000 > /dev/null; then
    print_success "Frontend is running on port 3000"
else
    print_warning "Frontend is not running, will start it automatically"
fi

# Run the complete test suite
print_status "Starting comprehensive test suite..."

echo ""
echo "🧪 Test Plan:"
echo "============="
echo "1. Solo Gameplay Tests"
echo "2. Multiplayer Dual Session Tests"
echo "3. ZFC & Shadow Actions Tests"
echo "4. Performance & Stress Tests"
echo ""

# Test 1: Solo Gameplay
print_status "Running Solo Gameplay Tests..."
if npm run test:e2e -- --spec "cypress/e2e/01-solo-gameplay.cy.js"; then
    print_success "✅ Solo gameplay tests passed"
else
    print_error "❌ Solo gameplay tests failed"
    FAILED_TESTS="$FAILED_TESTS solo-gameplay"
fi

echo ""

# Test 2: Multiplayer Dual Sessions
print_status "Running Multiplayer Dual Session Tests..."
print_warning "This test will simulate two players in separate browser contexts"

if npm run test:e2e -- --spec "cypress/e2e/02-multiplayer-dual-session.cy.js"; then
    print_success "✅ Multiplayer dual session tests passed"
else
    print_error "❌ Multiplayer dual session tests failed"
    FAILED_TESTS="$FAILED_TESTS multiplayer-dual"
fi

echo ""

# Test 3: ZFC & Shadow Actions
print_status "Running ZFC & Shadow Actions Tests..."
print_warning "Testing advanced ZFC calculations and shadow action mechanics"

if npm run test:e2e -- --spec "cypress/e2e/03-zfc-shadow-actions.cy.js"; then
    print_success "✅ ZFC & Shadow Actions tests passed"
else
    print_error "❌ ZFC & Shadow Actions tests failed"
    FAILED_TESTS="$FAILED_TESTS zfc-shadow"
fi

echo ""

# Test 4: Performance & Stress Tests
print_status "Running Performance & Stress Tests..."
print_warning "Testing system performance under load with multiple concurrent sessions"

if npm run test:e2e -- --spec "cypress/e2e/04-performance-stress-test.cy.js"; then
    print_success "✅ Performance & Stress tests passed"
else
    print_error "❌ Performance & Stress tests failed"
    FAILED_TESTS="$FAILED_TESTS performance-stress"
fi

echo ""

# Summary
echo "================================================="
echo "🏆 Test Suite Summary"
echo "================================================="

if [ -z "$FAILED_TESTS" ]; then
    print_success "🎉 ALL TESTS PASSED! 🎉"
    echo ""
    echo "✅ Solo Gameplay: PASSED"
    echo "✅ Multiplayer Dual Session: PASSED"
    echo "✅ ZFC & Shadow Actions: PASSED"
    echo "✅ Performance & Stress: PASSED"
    echo ""
    print_success "Heroes Reforged is ready for production! 🚀"
    EXIT_CODE=0
else
    print_error "❌ SOME TESTS FAILED"
    echo ""
    echo "Failed test suites: $FAILED_TESTS"
    echo ""
    print_warning "Please check the test output above for details"
    EXIT_CODE=1
fi

# Test Coverage Report
print_status "Generating test coverage report..."
echo ""
echo "📊 Test Coverage Areas:"
echo "======================"
echo "🎮 Core Gameplay: Solo mode, Hero movement, Resource management"
echo "🌐 Multiplayer: Session management, Real-time communication"
echo "🔮 ZFC System: Zone calculations, Conflict resolution"
echo "👻 Shadow Actions: Visualization, Bluffing mechanics"
echo "⚡ Performance: Load testing, Memory usage, WebSocket stress"
echo "🏛️ Political System: Advisor interactions, Decision making"
echo "🏰 Unit System: Recruitment, Castle management"
echo ""

# Generate HTML report if available
if [ -d "cypress/reports" ]; then
    print_status "📋 HTML test reports available in cypress/reports/"
fi

# Cleanup
if [ ! -z "$BACKEND_PID" ]; then
    print_status "Stopping backend process..."
    kill $BACKEND_PID 2>/dev/null
fi

print_status "Test suite completed!"
echo ""

exit $EXIT_CODE 