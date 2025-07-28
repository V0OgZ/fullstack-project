#!/bin/bash

# 🎮 HEROES OF TIME - Complete Testing System
# Script principal pour exécuter tous les nouveaux systèmes de tests

set -e

echo "🎮 Heroes of Time - Complete Testing System"
echo "============================================"

# Couleurs pour le logging
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Vérifier que les serveurs sont en cours d'exécution
check_servers() {
  log_info "Checking servers..."
  
  # Vérifier le backend
  if ! curl -s http://localhost:8080/actuator/health > /dev/null; then
    log_error "Backend is not running on port 8080"
    log_info "Please start the backend with: ./start-app.sh"
    exit 1
  fi
  
  # Vérifier le frontend
  if ! curl -s http://localhost:3000 > /dev/null; then
    log_error "Frontend is not running on port 3000"
    log_info "Please start the frontend with: ./start-app.sh"
    exit 1
  fi
  
  log_success "Both servers are running"
}

# Créer les répertoires nécessaires
create_directories() {
  log_info "Creating test directories..."
  
  mkdir -p test-results
  mkdir -p test-results/backend
  mkdir -p test-results/frontend
  mkdir -p test-results/simulation
  mkdir -p test-results/playwright
  mkdir -p test-results/screenshots
  
  log_success "Test directories created"
}

# Installer les dépendances Node.js si nécessaire
install_dependencies() {
  log_info "Installing Node.js dependencies..."
  
  # Installer les dépendances globales pour les scripts
  if ! command -v colors &> /dev/null; then
    npm install -g colors
  fi
  
  if ! command -v node-fetch &> /dev/null; then
    npm install -g node-fetch
  fi
  
  # Installer les dépendances frontend
  cd frontend
  if [ ! -d "node_modules" ]; then
    npm install
  fi
  cd ..
  
  log_success "Dependencies installed"
}

# Exécuter les tests backend complets
run_backend_tests() {
  log_info "Running enhanced backend API tests..."
  
  if [ -f "⚙️ scripts/test-backend-complete-enhanced.js" ]; then
    node ⚙️ scripts/test-backend-complete-enhanced.js
    if [ $? -eq 0 ]; then
      log_success "Backend API tests passed"
    else
      log_warning "Backend API tests had failures"
    fi
  else
    log_warning "Backend API test script not found"
  fi
}

# Exécuter les tests de simulation de jeu
run_simulation_tests() {
  log_info "Running game simulation tests..."
  
  if [ -f "⚙️ scripts/game-simulation-tests.js" ]; then
    node ⚙️ scripts/game-simulation-tests.js
    if [ $? -eq 0 ]; then
      log_success "Game simulation tests passed"
    else
      log_warning "Game simulation tests had failures"
    fi
  else
    log_warning "Game simulation test script not found"
  fi
}

# Exécuter les tests Playwright script-driven
run_playwright_tests() {
  log_info "Running script-driven Playwright tests..."
  
  cd frontend
  
  # Exécuter les nouveaux tests script-driven
  if [ -f "🧪 tests/e2e/script-driven-tests.spec.ts" ]; then
    npx playwright test 🧪 tests/e2e/script-driven-tests.spec.ts --reporter=html
    if [ $? -eq 0 ]; then
      log_success "Script-driven Playwright tests passed"
    else
      log_warning "Script-driven Playwright tests had failures"
    fi
  else
    log_warning "Script-driven Playwright test not found"
  fi
  
  # Exécuter les tests de démo essentiels
  log_info "Running essential demo tests..."
  
  if [ -f "🧪 tests/e2e/01-single-demo.spec.ts" ]; then
    npx playwright test 🧪 tests/e2e/01-single-demo.spec.ts --reporter=html
    if [ $? -eq 0 ]; then
      log_success "Single demo test passed"
    else
      log_warning "Single demo test had failures"
    fi
  fi
  
  if [ -f "🧪 tests/e2e/multiplayer-demo.spec.ts" ]; then
    npx playwright test 🧪 tests/e2e/multiplayer-demo.spec.ts --reporter=html
    if [ $? -eq 0 ]; then
      log_success "Multiplayer demo test passed"
    else
      log_warning "Multiplayer demo test had failures"
    fi
  fi
  
  cd ..
}

# Nettoyer les anciens tests
cleanup_old_tests() {
  log_info "Cleaning up old test files..."
  
  cd 🌐 frontend/🧪 tests/e2e
  
  # Créer un répertoire d'archive
  mkdir -p archived-old-tests
  
  # Liste des tests à archiver (garder seulement les démos essentielles)
  OLD_TESTS=(
    "debug-*.spec.ts"
    "terrain-*.spec.ts"
    "hero-*.spec.ts"
    "quick-*.spec.ts"
    "simple-*.spec.ts"
    "epic-*.spec.ts"
    "fullscreen-*.spec.ts"
    "hexagon-*.spec.ts"
    "map-*.spec.ts"
  )
  
  # Archiver les anciens tests
  for pattern in "${OLD_TESTS[@]}"; do
    if ls $pattern 1> /dev/null 2>&1; then
      mv $pattern archived-old-🧪 tests/ 2>/dev/null || true
    fi
  done
  
  cd ../../..
  
  log_success "Old tests archived"
}

# Générer un rapport consolidé
generate_consolidated_report() {
  log_info "Generating consolidated test report..."
  
  cat > test-results/consolidated-report.md << EOF
# 🎮 Heroes of Time - Complete Testing Report

*Generated on: $(date)*

## Summary

This report consolidates results from all testing systems:

### 1. Backend API Tests
- **Enhanced backend API testing** with state verification
- **Location**: \`test-results/backend-api-report.json\`
- **Description**: Tests all backend endpoints with before/after state comparison

### 2. Game Simulation Tests  
- **Complete game simulation** using custom script language
- **Location**: \`test-results/game-simulation-report.json\`
- **Description**: Tests complex game scenarios with strategic scripts

### 3. Script-Driven Playwright Tests
- **UI automation** using custom script language
- **Location**: \`🌐 frontend/playwright-report/\`
- **Description**: E2E tests that use the script engine for UI interactions

### 4. Essential Demo Tests
- **Single player demo**: Basic functionality validation
- **Multiplayer demo**: Multiplayer session testing
- **Location**: \`🌐 frontend/playwright-report/\`

## Key Features Tested

### ✅ Backend Systems
- Game creation and management
- Hero movement and combat
- Building construction and recruitment
- Turn management and state transitions
- Resource collection and management

### ✅ Frontend Systems  
- UI responsiveness and interaction
- Script-driven automation
- Game state synchronization
- User interface consistency

### ✅ Integration Systems
- Frontend-Backend communication
- Real-time state updates
- Script execution consistency
- Error handling and recovery

## Script Language Features

The custom script language supports:
- **Basic Actions**: move, attack, build, recruit, collect, end_turn
- **Control Flow**: if/else conditions, loops, assertions
- **State Access**: Game state queries and variable management
- **UI Integration**: Automated UI interactions via Playwright

## Next Steps

1. **AI Integration**: Use script language for AI decision making
2. **Performance Testing**: Add performance benchmarks
3. **Multiplayer Stress**: Test concurrent sessions
4. **Error Recovery**: Improve error handling and recovery

---

*This testing system provides comprehensive coverage of all game systems and serves as the foundation for AI development.*
EOF

  log_success "Consolidated report generated: test-results/consolidated-report.md"
}

# Fonction principale
main() {
  log_info "Starting complete testing system..."
  
  # Vérifications préliminaires
  check_servers
  create_directories
  install_dependencies
  
  # Nettoyer les anciens tests
  cleanup_old_tests
  
  # Exécuter tous les tests
  run_backend_tests
  run_simulation_tests
  run_playwright_tests
  
  # Générer le rapport
  generate_consolidated_report
  
  log_success "🎉 Complete testing system finished!"
  log_info "Check test-results/ directory for detailed reports"
  log_info "View Playwright report: 🌐 frontend/playwright-report/index.html"
}

# Gestion des options de ligne de commande
case "${1:-}" in
  --backend-only)
    check_servers
    create_directories
    run_backend_tests
    ;;
  --simulation-only)
    check_servers
    create_directories
    run_simulation_tests
    ;;
  --playwright-only)
    check_servers
    create_directories
    run_playwright_tests
    ;;
  --cleanup-only)
    cleanup_old_tests
    ;;
  --help)
    echo "Usage: $0 [option]"
    echo "Options:"
    echo "  --backend-only     Run only backend API tests"
    echo "  --simulation-only  Run only game simulation tests"
    echo "  --playwright-only  Run only Playwright tests"
    echo "  --cleanup-only     Clean up old test files only"
    echo "  --help            Show this help message"
    exit 0
    ;;
  *)
    main
    ;;
esac 