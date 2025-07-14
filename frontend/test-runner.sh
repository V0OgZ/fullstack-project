#!/bin/bash

# Heroes of Time - Comprehensive Test Runner
# This script runs all Playwright tests in the correct order

set -e

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

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to check if servers are running
check_servers() {
    print_status "Checking if servers are running..."
    
    # Check backend
    if curl -s http://localhost:8080/api/units/health > /dev/null 2>&1; then
        print_success "Backend is running on port 8080"
    else
        print_error "Backend is not running on port 8080"
        print_status "Please start the backend server first:"
        print_status "cd backend && mvn spring-boot:run"
        exit 1
    fi
    
    # Check frontend
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        print_success "Frontend is running on port 3000"
    else
        print_error "Frontend is not running on port 3000"
        print_status "Please start the frontend server first:"
        print_status "cd frontend && npm start"
        exit 1
    fi
}

# Function to run a test suite
run_test_suite() {
    local test_file=$1
    local test_name=$2
    
    print_status "Running $test_name..."
    
    if npx playwright test "tests/e2e/$test_file" --reporter=list; then
        print_success "$test_name passed"
        return 0
    else
        print_error "$test_name failed"
        return 1
    fi
}

# Main execution
echo "================================================="
echo "🏰 Heroes of Time - Comprehensive Test Suite 🧪"
echo "================================================="
echo ""

# Check if we're in the frontend directory
if [ ! -f "package.json" ] || [ ! -d "tests/e2e" ]; then
    print_error "Please run this script from the frontend directory"
    exit 1
fi

# Check if Playwright is installed
if ! command -v npx &> /dev/null; then
    print_error "npx is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check if Playwright is available
if ! npx playwright --version &> /dev/null; then
    print_error "Playwright is not installed. Installing now..."
    npm install --save-dev @playwright/test
    npx playwright install
fi

# Check servers
check_servers

echo ""
print_status "Starting comprehensive test suite..."
echo ""

# Initialize variables
FAILED_TESTS=""
EXIT_CODE=0

# Test 1: Scenario Loading (Basic functionality)
print_status "1. Scenario Loading Tests"
echo ""

if run_test_suite "scenario-load.spec.ts" "Scenario Loading Tests"; then
    print_success "✅ Scenario loading tests passed"
else
    print_error "❌ Scenario loading tests failed"
    FAILED_TESTS="$FAILED_TESTS scenario-loading"
    EXIT_CODE=1
fi

echo ""

# Test 2: Solo Gameplay
print_status "2. Solo Gameplay Tests"
echo ""

if run_test_suite "01-solo-gameplay.spec.ts" "Solo Gameplay Tests"; then
    print_success "✅ Solo gameplay tests passed"
else
    print_error "❌ Solo gameplay tests failed"
    FAILED_TESTS="$FAILED_TESTS solo-gameplay"
    EXIT_CODE=1
fi

echo ""

# Test 3: Multiplayer Dual Sessions
print_status "3. Multiplayer Dual Session Tests"
print_warning "This test will simulate two players in separate browser contexts"

if run_test_suite "02-multiplayer-dual-session.spec.ts" "Multiplayer Dual Session Tests"; then
    print_success "✅ Multiplayer dual session tests passed"
else
    print_error "❌ Multiplayer dual session tests failed"
    FAILED_TESTS="$FAILED_TESTS multiplayer-dual"
    EXIT_CODE=1
fi

echo ""

# Test 4: ZFC & Shadow Actions
print_status "4. ZFC & Shadow Actions Tests"
print_warning "Testing advanced ZFC calculations and shadow action mechanics"

if run_test_suite "03-zfc-shadow-actions.spec.ts" "ZFC & Shadow Actions Tests"; then
    print_success "✅ ZFC & Shadow Actions tests passed"
else
    print_error "❌ ZFC & Shadow Actions tests failed"
    FAILED_TESTS="$FAILED_TESTS zfc-shadow"
    EXIT_CODE=1
fi

echo ""

# Test 5: Performance & Stress Tests
print_status "5. Performance & Stress Tests"
print_warning "Testing system performance under load with multiple concurrent sessions"

if run_test_suite "04-performance-stress-test.spec.ts" "Performance & Stress Tests"; then
    print_success "✅ Performance & Stress tests passed"
else
    print_error "❌ Performance & Stress tests failed"
    FAILED_TESTS="$FAILED_TESTS performance-stress"
    EXIT_CODE=1
fi

echo ""

# Test 6: Comprehensive Screen Tests
print_status "6. Comprehensive Screen Tests"
print_warning "Testing all screens, responsive design, and accessibility"

if run_test_suite "05-comprehensive-screen-tests.spec.ts" "Comprehensive Screen Tests"; then
    print_success "✅ Comprehensive screen tests passed"
else
    print_error "❌ Comprehensive screen tests failed"
    FAILED_TESTS="$FAILED_TESTS comprehensive-screens"
    EXIT_CODE=1
fi

echo ""

# Summary
echo "================================================="
echo "🏆 Test Suite Summary"
echo "================================================="

if [ -z "$FAILED_TESTS" ]; then
    print_success "🎉 ALL TESTS PASSED! 🎉"
    echo ""
    echo "✅ Scenario Loading: PASSED"
    echo "✅ Solo Gameplay: PASSED"
    echo "✅ Multiplayer Dual Session: PASSED"
    echo "✅ ZFC & Shadow Actions: PASSED"
    echo "✅ Performance & Stress: PASSED"
    echo "✅ Comprehensive Screen Tests: PASSED"
    echo ""
    print_success "Heroes of Time is ready for production! 🚀"
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
echo "📱 UI/UX: Responsive design, Accessibility, Cross-browser"
echo ""

# Generate HTML report if available
if [ -d "test-results" ]; then
    print_status "📋 HTML test reports available in test-results/"
    print_status "Run 'npx playwright show-report' to view detailed reports"
fi

print_status "Test suite completed!"
echo ""

exit $EXIT_CODE 