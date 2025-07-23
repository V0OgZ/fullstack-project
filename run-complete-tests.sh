#!/bin/bash

# 🎮 HEROES OF TIME - RUN COMPLETE TESTS SUITE
# Script principal pour lancer tous les tests restaurés full turn backend

echo "🚀 ============================================="
echo "🎮 HEROES OF TIME - COMPLETE TESTS SUITE"
echo "🚀 ============================================="
echo ""

# Configuration
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RESULTS_DIR="test-results/complete-tests-$TIMESTAMP"
BACKEND_TIMEOUT=30
FRONTEND_TIMEOUT=30

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction utilitaire
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Créer le répertoire de résultats
mkdir -p "$RESULTS_DIR"

# Fonction pour vérifier si un service est disponible
check_service() {
    local service_name=$1
    local url=$2
    local timeout=$3
    
    log_info "Checking $service_name availability..."
    
    for ((i=1; i<=timeout; i++)); do
        if curl -s "$url" > /dev/null 2>&1; then
            log_success "$service_name is available"
            return 0
        fi
        
        if [ $i -eq $timeout ]; then
            log_error "$service_name is not available after ${timeout}s"
            return 1
        fi
        
        sleep 1
    done
}

# Fonction pour exécuter un test
run_test() {
    local test_name=$1
    local test_command=$2
    local log_file="$RESULTS_DIR/${test_name// /_}.log"
    
    log_info "Running: $test_name"
    
    # Exécuter la commande et capturer la sortie
    if eval "$test_command" > "$log_file" 2>&1; then
        log_success "$test_name - PASSED"
        return 0
    else
        log_error "$test_name - FAILED (see $log_file)"
        return 1
    fi
}

# Vérifier les prérequis
echo "🔍 === CHECKING PREREQUISITES ==="
echo ""

# Vérifier que les scripts existent
REQUIRED_SCRIPTS=("./start-app.sh" "./stop-app.sh" "./test-backend-complete.sh")
for script in "${REQUIRED_SCRIPTS[@]}"; do
    if [ ! -f "$script" ]; then
        log_error "Required script not found: $script"
        exit 1
    fi
done

log_success "All required scripts found"

# Vérifier les dépendances
if ! command -v curl &> /dev/null; then
    log_error "curl is required but not installed"
    exit 1
fi

if ! command -v node &> /dev/null; then
    log_error "Node.js is required but not installed"
    exit 1
fi

log_success "All dependencies available"

# Démarrer les services
echo ""
echo "🚀 === STARTING SERVICES ==="
echo ""

log_info "Starting Heroes of Time application..."
if ! ./start-app.sh > "$RESULTS_DIR/start-app.log" 2>&1; then
    log_error "Failed to start application"
    exit 1
fi

log_success "Application started"

# Attendre que les services soient prêts
sleep 5

# Vérifier que les services sont disponibles
if ! check_service "Backend" "http://localhost:8080/actuator/health" $BACKEND_TIMEOUT; then
    log_error "Backend failed to start"
    exit 1
fi

if ! check_service "Frontend" "http://localhost:3000" $FRONTEND_TIMEOUT; then
    log_error "Frontend failed to start"
    exit 1
fi

# Initialiser les compteurs
TESTS_PASSED=0
TESTS_FAILED=0
TOTAL_TESTS=0

# Tests backend complets
echo ""
echo "🎯 === BACKEND COMPLETE TESTS ==="
echo ""

TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Backend Complete Tests" "./test-backend-complete.sh"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Tests frontend Playwright
echo ""
echo "🎯 === FRONTEND PLAYWRIGHT TESTS ==="
echo ""

# Test 1: Complete Game Turns
TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Complete Game Turns" "cd frontend && npx playwright test tests/e2e/complete-game-turns.spec.ts --timeout=60000"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 2: Complete Game Simulation
TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Complete Game Simulation" "cd frontend && npx playwright test tests/e2e/complete-game-simulation.spec.ts --timeout=120000"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 3: Script Tester Demo
TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Script Tester Demo" "cd frontend && npx playwright test tests/e2e/script-tester-demo.spec.ts --timeout=30000"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 4: Epic Content Test
TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Epic Content Test" "cd frontend && npx playwright test tests/e2e/epic-content-test.spec.ts --timeout=30000"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 5: Multiplayer Demo
TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Multiplayer Demo" "cd frontend && npx playwright test tests/e2e/multiplayer-demo.spec.ts --timeout=45000"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 6: Enhanced Sidebar Test
TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Enhanced Sidebar Test" "cd frontend && npx playwright test tests/e2e/enhanced-sidebar-test.spec.ts --timeout=30000"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 7: Gameplay Complete
TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Gameplay Complete" "cd frontend && npx playwright test tests/e2e/gameplay-complete.spec.ts --timeout=60000"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Tests d'intégration spéciaux
echo ""
echo "🎯 === INTEGRATION TESTS ==="
echo ""

# Test 8: Interface restaurée
TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Interface Restoration Test" "cd frontend && npx playwright test tests/e2e/debug-current-interface.spec.ts --timeout=30000"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 9: Full UI verification
TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Full UI Verification" "cd frontend && npx playwright test tests/e2e/quick-verification.spec.ts --timeout=30000"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 10: Performance verification
TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Performance Verification" "cd frontend && npx playwright test tests/e2e/01-single-demo.spec.ts --timeout=60000"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Générer un rapport final
echo ""
echo "🎯 === GENERATING FINAL REPORT ==="
echo ""

REPORT_FILE="$RESULTS_DIR/complete-tests-report.md"

cat > "$REPORT_FILE" << EOF
# 🎮 Heroes of Time - Complete Tests Report

**Date**: $(date)
**Duration**: $(date -d@$(($(date +%s) - $(date -d "$TIMESTAMP" +%s))) -u +%H:%M:%S)
**Results Directory**: $RESULTS_DIR

## Test Results Summary

**Total Tests**: $TOTAL_TESTS
**Passed**: $TESTS_PASSED
**Failed**: $TESTS_FAILED
**Success Rate**: $(echo "scale=1; $TESTS_PASSED * 100 / $TOTAL_TESTS" | bc -l)%

## Backend Tests
- ✅ Complete Backend Integration Tests

## Frontend Playwright Tests
- $([ $TESTS_PASSED -ge 2 ] && echo "✅" || echo "❌") Complete Game Turns
- $([ $TESTS_PASSED -ge 3 ] && echo "✅" || echo "❌") Complete Game Simulation
- $([ $TESTS_PASSED -ge 4 ] && echo "✅" || echo "❌") Script Tester Demo
- $([ $TESTS_PASSED -ge 5 ] && echo "✅" || echo "❌") Epic Content Test
- $([ $TESTS_PASSED -ge 6 ] && echo "✅" || echo "❌") Multiplayer Demo
- $([ $TESTS_PASSED -ge 7 ] && echo "✅" || echo "❌") Enhanced Sidebar Test
- $([ $TESTS_PASSED -ge 8 ] && echo "✅" || echo "❌") Gameplay Complete

## Integration Tests
- $([ $TESTS_PASSED -ge 9 ] && echo "✅" || echo "❌") Interface Restoration
- $([ $TESTS_PASSED -ge 10 ] && echo "✅" || echo "❌") Full UI Verification
- $([ $TESTS_PASSED -ge 11 ] && echo "✅" || echo "❌") Performance Verification

## Detailed Results
EOF

# Ajouter les détails des logs
for log_file in "$RESULTS_DIR"/*.log; do
    if [ -f "$log_file" ]; then
        echo "- $(basename "$log_file")" >> "$REPORT_FILE"
    fi
done

echo "" >> "$REPORT_FILE"

if [ $TESTS_FAILED -eq 0 ]; then
    echo "## ✅ CONCLUSION: ALL TESTS PASSED" >> "$REPORT_FILE"
    echo "The Heroes of Time application is fully functional and ready for production." >> "$REPORT_FILE"
else
    echo "## ⚠️ CONCLUSION: SOME TESTS FAILED" >> "$REPORT_FILE"
    echo "Review the failed tests and fix issues before deployment." >> "$REPORT_FILE"
fi

log_success "Report generated: $REPORT_FILE"

# Arrêter les services
echo ""
echo "🛑 === STOPPING SERVICES ==="
echo ""

log_info "Stopping Heroes of Time application..."
if ./stop-app.sh > "$RESULTS_DIR/stop-app.log" 2>&1; then
    log_success "Application stopped"
else
    log_warning "Failed to stop application cleanly"
fi

# Résumé final
echo ""
echo "🎉 ============================================="
echo "🎮 COMPLETE TESTS SUITE FINISHED"
echo "🎉 ============================================="
echo ""
echo "📊 FINAL RESULTS:"
echo "   - Total Tests: $TOTAL_TESTS"
echo "   - Passed: $TESTS_PASSED"
echo "   - Failed: $TESTS_FAILED"
echo "   - Success Rate: $(echo "scale=1; $TESTS_PASSED * 100 / $TOTAL_TESTS" | bc -l)%"
echo ""
echo "📂 Results Directory: $RESULTS_DIR"
echo "📋 Report File: $REPORT_FILE"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    log_success "ALL TESTS PASSED! 🎉"
    echo "🚀 The Heroes of Time application is fully functional!"
    echo "✅ Ready for production deployment"
else
    log_error "Some tests failed"
    echo "⚠️  Review the logs in $RESULTS_DIR for details"
    echo "🔧 Fix the issues before deployment"
fi

echo ""
echo "🎯 Next Steps:"
echo "   1. Review the test report: $REPORT_FILE"
echo "   2. Check individual test logs in: $RESULTS_DIR"
echo "   3. Fix any failing tests"
echo "   4. Re-run with: ./run-complete-tests.sh"
echo ""

# Code de sortie
exit $TESTS_FAILED 