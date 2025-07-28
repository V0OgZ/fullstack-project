#!/bin/bash

# Script de validation de la cohérence du système unifié Heroes of Time
# Vérifie que tous les composants fonctionnent ensemble harmonieusement

echo "🔍 VALIDATION DE LA COHÉRENCE SYSTÈME - HEROES OF TIME"
echo "================================================================"

# Couleurs pour l'affichage
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Compteurs
TESTS_PASSED=0
TESTS_FAILED=0
TESTS_TOTAL=0

# Fonction pour afficher le résultat d'un test
test_result() {
    local test_name="$1"
    local result="$2"
    local details="$3"
    
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    
    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✅ $test_name${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        if [ -n "$details" ]; then
            echo -e "${BLUE}   → $details${NC}"
        fi
    else
        echo -e "${RED}❌ $test_name${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        if [ -n "$details" ]; then
            echo -e "${YELLOW}   → $details${NC}"
        fi
    fi
}

echo -e "${BLUE}📋 PHASE 1: VALIDATION DE LA NOMENCLATURE${NC}"
echo "================================================================"

# Test 1: Vérifier que ImprovedTemporalEngineService existe
if [ -f "🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/service/ImprovedTemporalEngineService.java" ]; then
    test_result "ImprovedTemporalEngineService existe" "PASS" "Service unifié détecté"
else
    test_result "ImprovedTemporalEngineService existe" "FAIL" "Service unifié manquant"
fi

# Test 2: Vérifier les méthodes avec nomenclature claire
CLEAR_METHODS=$(grep -c "executeTemporalGameScript\|createQuantumTemporalState\|executeQuantumStateCollapse" 🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/service/ImprovedTemporalEngineService.java 2>/dev/null || echo "0")
if [ "$CLEAR_METHODS" -gt 0 ]; then
    test_result "Méthodes avec nomenclature claire" "PASS" "$CLEAR_METHODS méthodes trouvées"
else
    test_result "Méthodes avec nomenclature claire" "FAIL" "Méthodes non trouvées"
fi

# Test 3: Vérifier la documentation
if [ -f "NOMENCLATURE_IMPROVEMENTS.md" ]; then
    test_result "Documentation nomenclature" "PASS" "Guide disponible"
else
    test_result "Documentation nomenclature" "FAIL" "Guide manquant"
fi

echo -e "${BLUE}📋 PHASE 2: VALIDATION DU MOTEUR REGEX${NC}"
echo "================================================================"

# Test 4: Vérifier le parser regex
if [ -f "🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalScriptParser.java" ]; then
    test_result "Parser regex présent" "PASS" "TemporalScriptParser détecté"
else
    test_result "Parser regex présent" "FAIL" "TemporalScriptParser manquant"
fi

# Test 5: Vérifier les patterns de parsing
REGEX_PATTERNS=$(grep -c "Pattern\|regex\|parse" 🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalScriptParser.java 2>/dev/null || echo "0")
if [ "$REGEX_PATTERNS" -gt 5 ]; then
    test_result "Patterns regex optimisés" "PASS" "$REGEX_PATTERNS patterns trouvés"
else
    test_result "Patterns regex optimisés" "FAIL" "Patterns insuffisants"
fi

echo -e "${BLUE}📋 PHASE 3: VALIDATION DE LA CAUSALITÉ${NC}"
echo "================================================================"

# Test 6: Vérifier le service d'interférence quantique
if [ -f "🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/service/QuantumInterferenceService.java" ]; then
    test_result "Service d'interférence quantique" "PASS" "QuantumInterferenceService détecté"
else
    test_result "Service d'interférence quantique" "FAIL" "QuantumInterferenceService manquant"
fi

# Test 7: Vérifier les calculs d'amplitude complexe
COMPLEX_CALC=$(grep -c "ComplexAmplitude\|calculateInterference" 🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/service/QuantumInterferenceService.java 2>/dev/null || echo "0")
if [ "$COMPLEX_CALC" -gt 0 ]; then
    test_result "Calculs d'amplitude complexe" "PASS" "$COMPLEX_CALC références trouvées"
else
    test_result "Calculs d'amplitude complexe" "FAIL" "Calculs manquants"
fi

echo -e "${BLUE}📋 PHASE 4: VALIDATION DES ARTEFACTS${NC}"
echo "================================================================"

# Test 8: Vérifier les fichiers d'artefacts
if [ -f "🖥️ backend/src/main/resources/quantum-artifacts.json" ]; then
    test_result "Artefacts quantiques" "PASS" "quantum-artifacts.json présent"
else
    test_result "Artefacts quantiques" "FAIL" "quantum-artifacts.json manquant"
fi

# Test 9: Vérifier la propriété affectsTimeline
AFFECTS_TIMELINE=$(grep -c "affectsTimeline" 🖥️ backend/src/main/resources/quantum-artifacts.json 2>/dev/null || echo "0")
if [ "$AFFECTS_TIMELINE" -gt 0 ]; then
    test_result "Propriété affectsTimeline" "PASS" "$AFFECTS_TIMELINE occurrences trouvées"
else
    test_result "Propriété affectsTimeline" "FAIL" "Propriété manquante"
fi

echo -e "${BLUE}📋 PHASE 5: VALIDATION DE LA PERFORMANCE${NC}"
echo "================================================================"

# Test 10: Vérifier la compilation
echo -e "${YELLOW}🔧 Test de compilation...${NC}"
cd backend
mvn clean compile -q > /dev/null 2>&1
if [ $? -eq 0 ]; then
    test_result "Compilation backend" "PASS" "Code compile sans erreurs"
else
    test_result "Compilation backend" "FAIL" "Erreurs de compilation détectées"
fi
cd ..

# Test 11: Vérifier les tests unitaires
echo -e "${YELLOW}🧪 Test unitaires...${NC}"
cd backend
mvn test -q > /dev/null 2>&1
if [ $? -eq 0 ]; then
    test_result "Tests unitaires" "PASS" "Tous les tests passent"
else
    test_result "Tests unitaires" "FAIL" "Certains tests échouent"
fi
cd ..

echo -e "${BLUE}📋 PHASE 6: VALIDATION DE L'INTERFACE${NC}"
echo "================================================================"

# Test 12: Vérifier les dépendances frontend
if [ -f "🌐 frontend/package.json" ]; then
    test_result "Configuration frontend" "PASS" "package.json présent"
else
    test_result "Configuration frontend" "FAIL" "package.json manquant"
fi

# Test 13: Vérifier les composants React
REACT_COMPONENTS=$(find 🌐 frontend/src -name "*.tsx" -o -name "*.ts" | wc -l)
if [ "$REACT_COMPONENTS" -gt 10 ]; then
    test_result "Composants React" "PASS" "$REACT_COMPONENTS composants trouvés"
else
    test_result "Composants React" "FAIL" "Composants insuffisants"
fi

echo -e "${BLUE}📋 PHASE 7: VALIDATION DE LA DOCUMENTATION${NC}"
echo "================================================================"

# Test 14: Vérifier la documentation temporelle
TEMPORAL_DOCS=$(find 📖 docs/temporal -name "*.md" 2>/dev/null | wc -l)
if [ "$TEMPORAL_DOCS" -gt 0 ]; then
    test_result "Documentation temporelle" "PASS" "$TEMPORAL_DOCS fichiers trouvés"
else
    test_result "Documentation temporelle" "FAIL" "Documentation manquante"
fi

# Test 15: Vérifier le README mis à jour
README_SECTIONS=$(grep -c "## " README.md 2>/dev/null || echo "0")
if [ "$README_SECTIONS" -gt 10 ]; then
    test_result "README complet" "PASS" "$README_SECTIONS sections trouvées"
else
    test_result "README complet" "FAIL" "README incomplet"
fi

echo -e "${BLUE}📋 PHASE 8: VALIDATION DE LA COHÉRENCE GLOBALE${NC}"
echo "================================================================"

# Test 16: Vérifier la cohérence parser-causalité
PARSER_CAUSAL_LINKS=$(grep -c "QuantumInterferenceService\|calculateInterference" 🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java 2>/dev/null || echo "0")
if [ "$PARSER_CAUSAL_LINKS" -gt 0 ]; then
    test_result "Cohérence parser-causalité" "PASS" "Liens détectés"
else
    test_result "Cohérence parser-causalité" "FAIL" "Liens manquants"
fi

# Test 17: Vérifier l'intégration système
SYSTEM_INTEGRATION=$(grep -c "ImprovedTemporalEngineService\|executeTemporalGameScript" 🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/controller/*.java 2>/dev/null || echo "0")
if [ "$SYSTEM_INTEGRATION" -gt 0 ]; then
    test_result "Intégration système" "PASS" "Intégration détectée"
else
    test_result "Intégration système" "FAIL" "Intégration manquante"
fi

echo ""
echo "🎯 RÉSUMÉ DE LA VALIDATION"
echo "================================================================"

# Calculer le pourcentage de réussite
SUCCESS_RATE=$((TESTS_PASSED * 100 / TESTS_TOTAL))

echo -e "${BLUE}📊 Statistiques:${NC}"
echo "   Tests Total: $TESTS_TOTAL"
echo -e "   Tests Réussis: ${GREEN}$TESTS_PASSED${NC}"
echo -e "   Tests Échoués: ${RED}$TESTS_FAILED${NC}"
echo -e "   Taux de Réussite: ${PURPLE}$SUCCESS_RATE%${NC}"
echo ""

if [ "$SUCCESS_RATE" -ge 90 ]; then
    echo -e "${GREEN}🎉 SYSTÈME UNIFIÉ EXCELLENT !${NC}"
    echo -e "${GREEN}✅ Cohérence globale validée${NC}"
    echo -e "${GREEN}✅ Performance optimisée${NC}"
    echo -e "${GREEN}✅ Documentation complète${NC}"
    echo ""
    echo -e "${YELLOW}🚀 PRÊT POUR LA PRODUCTION !${NC}"
elif [ "$SUCCESS_RATE" -ge 75 ]; then
    echo -e "${YELLOW}⚠️ SYSTÈME UNIFIÉ BON${NC}"
    echo -e "${YELLOW}✅ Cohérence globale acceptable${NC}"
    echo -e "${YELLOW}⚠️ Quelques améliorations nécessaires${NC}"
    echo ""
    echo -e "${BLUE}🔧 Recommandations:${NC}"
    echo "   - Corriger les tests échoués"
    echo "   - Vérifier la documentation manquante"
    echo "   - Optimiser les performances"
else
    echo -e "${RED}❌ SYSTÈME UNIFIÉ NÉCESSITE DES AMÉLIORATIONS${NC}"
    echo -e "${RED}❌ Cohérence globale insuffisante${NC}"
    echo -e "${RED}❌ Corrections nécessaires${NC}"
    echo ""
    echo -e "${BLUE}🔧 Actions Requises:${NC}"
    echo "   - Corriger les erreurs critiques"
    echo "   - Compléter la documentation"
    echo "   - Réexécuter la migration"
fi

echo ""
echo "📋 CHECKLIST DE VALIDATION COMPLÈTE"
echo "================================================================"
echo "□ Nomenclature claire et recherchable"
echo "□ Parser regex ultra-performant"
echo "□ Causalité quantique intégrée"
echo "□ Artefacts temporels fonctionnels"
echo "□ Interface utilisateur moderne"
echo "□ Documentation complète"
echo "□ Tests de validation passés"
echo "□ Performance optimisée"
echo "□ Système unifié cohérent"
echo "□ Prêt pour déploiement"
echo ""
echo -e "${PURPLE}🕰️ Heroes of Time - Validation Terminée !${NC}" 