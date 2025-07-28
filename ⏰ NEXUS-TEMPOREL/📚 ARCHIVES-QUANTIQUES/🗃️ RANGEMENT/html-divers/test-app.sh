#!/bin/bash

echo "🧪 Testing Heroes of Time Application"
echo "====================================="

# Check if app is running
echo "🔍 Checking if application is running..."
if ! curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
    echo "❌ Backend not running! Start the app first with ./start-app.sh"
    exit 1
fi

if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "❌ Frontend not running! Start the app first with ./start-app.sh"
    exit 1
fi

echo "✅ Both servers are running"
echo ""

# Create test results directory
mkdir -p test-results

# Run backend tests
echo "🟢 Running Backend Tests..."
echo "=========================="
cd backend
mvn test > ../test-results/backend-tests.log 2>&1
BACKEND_EXIT_CODE=$?
cd ..

if [ $BACKEND_EXIT_CODE -eq 0 ]; then
    echo "✅ Backend tests passed"
else
    echo "❌ Backend tests failed (exit code: $BACKEND_EXIT_CODE)"
    echo "📝 Check test-results/backend-tests.log for details"
fi

echo ""

# Run frontend unit tests
echo "🟦 Running Frontend Unit Tests..."
echo "================================="
cd frontend
npm test -- --watchAll=false --coverage > ../test-results/frontend-unit-tests.log 2>&1
FRONTEND_UNIT_EXIT_CODE=$?
cd ..

if [ $FRONTEND_UNIT_EXIT_CODE -eq 0 ]; then
    echo "✅ Frontend unit tests passed"
else
    echo "❌ Frontend unit tests failed (exit code: $FRONTEND_UNIT_EXIT_CODE)"
    echo "📝 Check test-results/frontend-unit-tests.log for details"
fi

echo ""

# Run Playwright E2E tests
echo "🎭 Running Playwright E2E Tests..."
echo "=================================="
cd frontend
npx playwright test > ../test-results/playwright-tests.log 2>&1
PLAYWRIGHT_EXIT_CODE=$?
cd ..

if [ $PLAYWRIGHT_EXIT_CODE -eq 0 ]; then
    echo "✅ Playwright E2E tests passed"
else
    echo "❌ Playwright E2E tests failed (exit code: $PLAYWRIGHT_EXIT_CODE)"
    echo "📝 Check test-results/playwright-tests.log for details"
    echo "🎥 Screenshots and videos available in 🌐 frontend/test-results/"
fi

echo ""

# Test scenario loading specifically
echo "🎮 Testing Scenario Loading..."
echo "=============================="
echo "Testing scenario endpoints..."

# Test scenarios endpoint
SCENARIOS_TEST=$(curl -s http://localhost:8080/api/scenarios/all | jq 'length' 2>/dev/null)
if [ "$SCENARIOS_TEST" = "3" ]; then
    echo "✅ Scenarios endpoint working (3 scenarios found)"
else
    echo "❌ Scenarios endpoint failed"
fi

# Test conquest-classic scenario
CONQUEST_TEST=$(curl -s -X POST http://localhost:8080/api/scenarios/predefined/conquest-classic | jq -r '.scenarioId' 2>/dev/null)
if [ "$CONQUEST_TEST" = "conquest-classic" ]; then
    echo "✅ Conquest Classic scenario working"
else
    echo "❌ Conquest Classic scenario failed"
fi

# Test temporal-rift scenario
TEMPORAL_TEST=$(curl -s -X POST http://localhost:8080/api/scenarios/predefined/temporal-rift | jq -r '.scenarioId' 2>/dev/null)
if [ "$TEMPORAL_TEST" = "temporal-rift" ]; then
    echo "✅ Temporal Rift scenario working"
else
    echo "❌ Temporal Rift scenario failed"
fi

echo ""

# Summary
echo "📊 Test Summary"
echo "==============="
echo "Backend Tests:     $([ $BACKEND_EXIT_CODE -eq 0 ] && echo "✅ PASSED" || echo "❌ FAILED")"
echo "Frontend Tests:    $([ $FRONTEND_UNIT_EXIT_CODE -eq 0 ] && echo "✅ PASSED" || echo "❌ FAILED")"
echo "Playwright Tests:  $([ $PLAYWRIGHT_EXIT_CODE -eq 0 ] && echo "✅ PASSED" || echo "❌ FAILED")"
echo "Scenario Loading:  $([ "$SCENARIOS_TEST" = "3" ] && [ "$CONQUEST_TEST" = "conquest-classic" ] && [ "$TEMPORAL_TEST" = "temporal-rift" ] && echo "✅ PASSED" || echo "❌ FAILED")"

echo ""
echo "📝 Test logs saved to test-results/"
echo "🎥 Playwright results in 🌐 frontend/test-results/"

# Overall exit code
OVERALL_EXIT_CODE=0
if [ $BACKEND_EXIT_CODE -ne 0 ] || [ $FRONTEND_UNIT_EXIT_CODE -ne 0 ] || [ $PLAYWRIGHT_EXIT_CODE -ne 0 ]; then
    OVERALL_EXIT_CODE=1
    echo ""
    echo "❌ Some tests failed!"
else
    echo ""
    echo "🎉 All tests passed!"
fi

exit $OVERALL_EXIT_CODE 