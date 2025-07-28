#!/bin/bash

# 🔧 Fix Backend Tests - Heroes of Time
# Script pour corriger et tester les tests backend

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}🔧 Fix Backend Tests - Heroes of Time${NC}"
echo "====================================="

# 🧹 PHASE 1: NETTOYER
echo -e "${CYAN}🧹 Phase 1: Compilation...${NC}"

cd backend
if mvn clean compile -q > ../logs/backend-fix-compile.log 2>&1; then
    echo -e "${GREEN}✅ Compilation OK${NC}"
else
    echo -e "${RED}❌ Compilation échouée${NC}"
    exit 1
fi

# 🧪 PHASE 2: TESTER LES CORRECTIONS
echo -e "${CYAN}🧪 Phase 2: Test des corrections...${NC}"

# Test 1: QuantumInterferenceIntegrationTest (précision flottante)
echo -n "🔍 Test interférence quantique: "
if mvn test -Dtest=QuantumInterferenceIntegrationTest -q > ../logs/quantum-interference-fix.log 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ ÉCHEC${NC}"
    echo "Détails: logs/quantum-interference-fix.log"
fi

# Test 2: QuantumArtifactsIntegrationTest (équipement)
echo -n "🔍 Test artefacts quantiques: "
if mvn test -Dtest=QuantumArtifactsIntegrationTest -q > ../logs/quantum-artifacts-fix.log 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ ÉCHEC${NC}"
    echo "Détails: logs/quantum-artifacts-fix.log"
fi

# Test 3: BatailleTemporelleIntegrationTest (bataille)
echo -n "🔍 Test bataille temporelle: "
if mvn test -Dtest=BatailleTemporelleIntegrationTest -q > ../logs/bataille-temporelle-fix.log 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ ÉCHEC${NC}"
    echo "Détails: logs/bataille-temporelle-fix.log"
fi

# 📊 PHASE 3: TEST COMPLET
echo -e "${CYAN}📊 Phase 3: Test complet...${NC}"

echo -n "🧪 Tous les tests: "
if mvn test -q > ../logs/backend-all-tests-fix.log 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ ÉCHEC${NC}"
    echo "Détails: logs/backend-all-tests-fix.log"
fi

cd ..

# 🎯 PHASE 4: RAPPORT
echo -e "${CYAN}🎯 Phase 4: Rapport...${NC}"

# Compter les résultats
TOTAL_TESTS=$(grep -o "Tests run: [0-9]*" logs/backend-all-tests-fix.log | tail -1 | grep -o "[0-9]*" || echo "0")
FAILURES=$(grep -o "Failures: [0-9]*" logs/backend-all-tests-fix.log | tail -1 | grep -o "[0-9]*" || echo "0")

if [ "$TOTAL_TESTS" -gt 0 ]; then
    PASSED=$((TOTAL_TESTS - FAILURES))
    SUCCESS_RATE=$((PASSED * 100 / TOTAL_TESTS))
else
    PASSED=0
    SUCCESS_RATE=0
fi

echo ""
echo -e "${BLUE}📊 RÉSULTATS APRÈS CORRECTIONS:${NC}"
echo "================================"
echo -e "• Tests Total:   $TOTAL_TESTS"
echo -e "• Tests Réussis: $PASSED"
echo -e "• Tests Échoués: $FAILURES"
echo -e "• Taux Réussite: $SUCCESS_RATE%"
echo ""

if [ "$SUCCESS_RATE" -ge 90 ]; then
    echo -e "${GREEN}🎉 EXCELLENT ! Tests backend corrigés !${NC}"
elif [ "$SUCCESS_RATE" -ge 80 ]; then
    echo -e "${GREEN}✅ BON ! Amélioration significative !${NC}"
elif [ "$SUCCESS_RATE" -ge 70 ]; then
    echo -e "${YELLOW}⚠️ MOYEN ! Quelques améliorations !${NC}"
else
    echo -e "${RED}❌ PROBLÉMATIQUE ! Plus de corrections nécessaires !${NC}"
fi

echo ""
echo -e "${CYAN}🔍 Logs détaillés:${NC}"
echo "• logs/backend-fix-compile.log"
echo "• logs/quantum-interference-fix.log"
echo "• logs/quantum-artifacts-fix.log"
echo "• logs/bataille-temporelle-fix.log"
echo "• logs/backend-all-tests-fix.log"
echo ""
echo -e "${BLUE}🎯 Corrections terminées ! 🎯${NC}" 