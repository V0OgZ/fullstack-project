#!/bin/bash

# 🌟 TEST MOTEUR FINAL - Jean-Grofignon Edition
# Test complet du moteur Heroes of Time avec logging détaillé
# Usage: ./test-moteur-final-jean.sh [category]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_URL="http://localhost:8080"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_DIR="test-results"
LOG_FILE="$LOG_DIR/test-moteur-final-$TIMESTAMP.log"

# 🎨 Couleurs Jean
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Créer le dossier de logs
mkdir -p "$LOG_DIR"

# 📝 Fonction de logging
log_message() {
    local level="$1"
    local message="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" | tee -a "$LOG_FILE"
}

log_keyword() {
    local keyword="$1"
    local status="$2"
    local details="$3"
    log_message "KEYWORD" "🔍 $keyword -> $status | $details"
}

echo -e "${PURPLE}🌟 TEST MOTEUR FINAL - Jean-Grofignon Edition${NC}" | tee -a "$LOG_FILE"
echo -e "${CYAN}================================================================${NC}" | tee -a "$LOG_FILE"

log_message "INFO" "🚀 Début des tests automatiques du moteur Heroes of Time"
log_message "INFO" "📁 Logs sauvegardés dans: $LOG_FILE"

# 🔧 VÉRIFICATION BACKEND
test_backend_health() {
    log_message "TEST" "🏥 Test de santé du backend..."
    
    if curl -s "$BACKEND_URL/api/causal/health" > /dev/null; then
        local health_response=$(curl -s "$BACKEND_URL/api/causal/health")
        log_keyword "BACKEND_HEALTH" "✅ UP" "Backend opérationnel"
        echo -e "${GREEN}✅ Backend opérationnel${NC}"
        return 0
    else
        log_keyword "BACKEND_HEALTH" "❌ DOWN" "Connexion impossible"
        echo -e "${RED}❌ Backend non disponible${NC}"
        return 1
    fi
}

# 🧪 TESTS ENDPOINTS CAUSAUX
test_causal_endpoints() {
    log_message "CATEGORY" "🔮 === TESTS ENDPOINTS CAUSAUX ==="
    
    # Test Cross-Interaction
    log_message "TEST" "🧪 Test Cross-Interaction..."
    local cross_response=$(curl -s -X POST "$BACKEND_URL/api/causal/cross-interaction" \
         -H "Content-Type: application/json" \
         -d '{"items":["AXISI","LENTUS"],"scenario":"test_auto"}' 2>/dev/null || echo '{"error":"failed"}')
    
    if echo "$cross_response" | grep -q "error"; then
        log_keyword "CROSS_INTERACTION" "❌ FAIL" "Erreur dans la réponse"
        echo -e "${RED}❌ Cross-Interaction échoué${NC}"
    else
        log_keyword "CROSS_INTERACTION" "✅ SUCCESS" "Response received"
        echo -e "${GREEN}✅ Cross-Interaction OK${NC}"
        
        # Analyser les mots-clés dans la réponse
        if echo "$cross_response" | grep -q "paradoxRisk"; then
            local paradox_val=$(echo "$cross_response" | grep -o '"paradoxRisk":[0-9.]*' | cut -d':' -f2 || echo "N/A")
            log_keyword "PARADOX_RISK" "✅ DETECTED" "Valeur: $paradox_val"
        fi
        if echo "$cross_response" | grep -q "temporalStability"; then
            local temporal_val=$(echo "$cross_response" | grep -o '"temporalStability":[0-9.]*' | cut -d':' -f2 || echo "N/A")
            log_keyword "TEMPORAL_STABILITY" "✅ DETECTED" "Valeur: $temporal_val"
        fi
        if echo "$cross_response" | grep -q "affectedRadius"; then
            local radius_val=$(echo "$cross_response" | grep -o '"affectedRadius":[0-9.]*' | cut -d':' -f2 || echo "N/A")
            log_keyword "AFFECTED_RADIUS" "✅ DETECTED" "Valeur: $radius_val"
        fi
    fi
    
    # Test Temporal Simulation
    log_message "TEST" "🧪 Test Temporal Simulation..."
    local temporal_response=$(curl -s -X POST "$BACKEND_URL/api/causal/temporal-simulation" \
         -H "Content-Type: application/json" \
         -d '{"scenario":"axisi_vs_lentus_battle","turns":3}' 2>/dev/null || echo '{"error":"failed"}')
    
    if echo "$temporal_response" | grep -q "success.*true"; then
        log_keyword "TEMPORAL_SIMULATION" "✅ SUCCESS" "Simulation réussie"
        echo -e "${GREEN}✅ Temporal Simulation OK${NC}"
        
        # Analyser les résultats de simulation
        if echo "$temporal_response" | grep -q "axisiPower"; then
            log_keyword "AXISI_POWER" "✅ CALCULATED" "Puissance Axisi calculée"
        fi
        if echo "$temporal_response" | grep -q "lentusPower"; then
            log_keyword "LENTUS_POWER" "✅ CALCULATED" "Puissance Lentus calculée"
        fi
        if echo "$temporal_response" | grep -q "causalBalance"; then
            log_keyword "CAUSAL_BALANCE" "✅ CALCULATED" "Balance causale calculée"
        fi
    else
        log_keyword "TEMPORAL_SIMULATION" "❌ FAIL" "Simulation échouée"
        echo -e "${RED}❌ Temporal Simulation échoué${NC}"
    fi
}

# 🧮 TESTS FORMULES MATHÉMATIQUES
test_mathematical_formulas() {
    log_message "CATEGORY" "🧮 === TESTS FORMULES MATHÉMATIQUES ==="
    
    # Test des formules via Cross-Interaction avec données spécifiques
    local test_data='{"items":["AXISI","LENTUS"],"scenario":"formula_test","parameters":{"complexity":5}}'
    local formula_response=$(curl -s -X POST "$BACKEND_URL/api/causal/cross-interaction" \
         -H "Content-Type: application/json" \
         -d "$test_data" 2>/dev/null || echo '{"error":"failed"}')
    
    log_message "TEST" "🧮 Analyse des formules..."
    
    # Extraire et valider les valeurs numériques
    if echo "$formula_response" | grep -q "paradoxRisk"; then
        local paradox_value=$(echo "$formula_response" | grep -o '"paradoxRisk":[0-9.]*' | cut -d':' -f2 || echo "0")
        if [ "$paradox_value" != "0" ]; then
            log_keyword "PARADOX_FORMULA" "✅ VALID" "Valeur: $paradox_value"
        else
            log_keyword "PARADOX_FORMULA" "⚠️ SUSPECT" "Valeur: $paradox_value"
        fi
    fi
    
    if echo "$formula_response" | grep -q "affectedRadius"; then
        local radius_value=$(echo "$formula_response" | grep -o '"affectedRadius":[0-9.]*' | cut -d':' -f2 || echo "0")
        if [ "$radius_value" != "0" ]; then
            log_keyword "RADIUS_FORMULA" "✅ VALID" "Valeur: $radius_value"
        else
            log_keyword "RADIUS_FORMULA" "❌ INVALID" "Valeur: $radius_value"
        fi
    fi
}

# 📜 TESTS SCÉNARIOS HOTS
test_hots_scenarios() {
    log_message "CATEGORY" "📜 === TESTS SCÉNARIOS HOTS ==="
    
    # Tester les scénarios disponibles
    local scenario_count=0
    for scenario_file in scenarios/*.hots; do
        if [ -f "$scenario_file" ]; then
            scenario_count=$((scenario_count + 1))
            local scenario_name=$(basename "$scenario_file" .hots)
            log_message "TEST" "📜 Test scénario: $scenario_name"
            
            # Vérifier la structure du scénario
            if grep -q "HOTS_SCENARIO:" "$scenario_file"; then
                log_keyword "HOTS_STRUCTURE" "✅ VALID" "$scenario_name"
                
                # Vérifier les éléments essentiels
                if grep -q "AUTHOR:" "$scenario_file"; then
                    log_keyword "HOTS_AUTHOR" "✅ PRESENT" "$scenario_name"
                fi
                if grep -q "⊙\|†\|ψ" "$scenario_file"; then
                    log_keyword "HOTS_SYMBOLS" "✅ PRESENT" "$scenario_name"
                fi
                if grep -q "WALTER\|JESUS\|GROFI" "$scenario_file"; then
                    log_keyword "JEAN_CHARACTERS" "✅ PRESENT" "$scenario_name"
                fi
            else
                log_keyword "HOTS_STRUCTURE" "❌ INVALID" "$scenario_name"
            fi
        fi
    done
    
    log_message "INFO" "📊 Total scénarios analysés: $scenario_count"
}

# 🔄 TESTS CONVERSION DE FORMATS
test_format_conversion() {
    log_message "CATEGORY" "🔄 === TESTS CONVERSION FORMATS ==="
    
    # Tester le converter sur un scénario
    if [ -f "scenarios/zone_inverted_001_adapte_jean.hots" ]; then
        log_message "TEST" "🔄 Test conversion HOTS..."
        
        if [ -x "scripts/hots-converter-fixed.sh" ]; then
            # Vérifier les fichiers convertis existants
            if [ -f "scenarios/zone_inverted_001_adapte_jean.json" ]; then
                log_keyword "HOTS_TO_JSON" "✅ SUCCESS" "Fichier JSON trouvé"
                
                # Valider le JSON généré
                if command -v jq >/dev/null 2>&1; then
                    if jq empty scenarios/zone_inverted_001_adapte_jean.json 2>/dev/null; then
                        log_keyword "JSON_VALIDATION" "✅ VALID" "Structure JSON correcte"
                    else
                        log_keyword "JSON_VALIDATION" "❌ INVALID" "JSON malformé"
                    fi
                else
                    log_keyword "JSON_VALIDATION" "⚠️ SKIP" "jq non disponible"
                fi
            else
                log_keyword "HOTS_TO_JSON" "❌ MISSING" "Fichier JSON non trouvé"
            fi
            
            # Tester le HEP
            if [ -f "scenarios/zone_inverted_001_adapte_jean.hep" ] && [ -x "scenarios/zone_inverted_001_adapte_jean.hep" ]; then
                log_keyword "HOTS_TO_HEP" "✅ SUCCESS" "HEP exécutable trouvé"
                
                # Test d'exécution du HEP
                if ./scenarios/zone_inverted_001_adapte_jean.hep > /dev/null 2>&1; then
                    log_keyword "HEP_EXECUTION" "✅ SUCCESS" "HEP s'exécute correctement"
                else
                    log_keyword "HEP_EXECUTION" "❌ FAIL" "Erreur d'exécution HEP"
                fi
            else
                log_keyword "HOTS_TO_HEP" "❌ MISSING" "HEP non trouvé ou non exécutable"
            fi
        else
            log_keyword "CONVERTER_SCRIPT" "❌ MISSING" "Script converter non trouvé"
        fi
    else
        log_keyword "TEST_SCENARIO" "❌ MISSING" "Scénario de test non trouvé"
    fi
}

# 📊 GÉNÉRATION DU RAPPORT
generate_report() {
    log_message "REPORT" "📊 === GÉNÉRATION DU RAPPORT ==="
    
    local total_tests=$(grep -c "KEYWORD" "$LOG_FILE" 2>/dev/null || echo "0")
    local success_tests=$(grep -c "✅" "$LOG_FILE" 2>/dev/null || echo "0")
    local failed_tests=$(grep -c "❌" "$LOG_FILE" 2>/dev/null || echo "0")
    local warning_tests=$(grep -c "⚠️" "$LOG_FILE" 2>/dev/null || echo "0")
    
    echo -e "\n${PURPLE}📊 RAPPORT FINAL${NC}" | tee -a "$LOG_FILE"
    echo -e "${CYAN}==================${NC}" | tee -a "$LOG_FILE"
    log_message "SUMMARY" "Total tests: $total_tests"
    log_message "SUMMARY" "Succès: $success_tests ✅"
    log_message "SUMMARY" "Échecs: $failed_tests ❌"
    log_message "SUMMARY" "Warnings: $warning_tests ⚠️"
    
    if [ "$total_tests" -gt 0 ]; then
        if [ "$success_tests" -ge $((total_tests * 80 / 100)) ]; then
            echo -e "${GREEN}🎉 MOTEUR EN EXCELLENT ÉTAT !${NC}" | tee -a "$LOG_FILE"
        elif [ "$success_tests" -ge $((total_tests * 60 / 100)) ]; then
            echo -e "${YELLOW}⚠️ MOTEUR EN ÉTAT ACCEPTABLE${NC}" | tee -a "$LOG_FILE"
        else
            echo -e "${RED}❌ MOTEUR NÉCESSITE ATTENTION${NC}" | tee -a "$LOG_FILE"
        fi
    else
        echo -e "${YELLOW}⚠️ AUCUN TEST EXÉCUTÉ${NC}" | tee -a "$LOG_FILE"
    fi
}

# 🎯 EXÉCUTION PRINCIPALE
main() {
    local category="${1:-all}"
    
    log_message "INFO" "🎯 Catégorie de test: $category"
    
    # Test de base requis
    if ! test_backend_health; then
        log_message "ERROR" "❌ Backend non disponible - arrêt des tests"
        exit 1
    fi
    
    # Exécuter les tests selon la catégorie
    case "$category" in
        "causal")
            test_causal_endpoints
            ;;
        "formulas")
            test_mathematical_formulas
            ;;
        "scenarios")
            test_hots_scenarios
            ;;
        "conversion")
            test_format_conversion
            ;;
        "all")
            test_causal_endpoints
            test_mathematical_formulas
            test_hots_scenarios
            test_format_conversion
            ;;
        *)
            log_message "ERROR" "❌ Catégorie inconnue: $category"
            echo "Catégories disponibles: causal, formulas, scenarios, conversion, all"
            exit 1
            ;;
    esac
    
    generate_report
    
    echo -e "\n${BLUE}📁 Log complet disponible: $LOG_FILE${NC}"
    echo -e "${PURPLE}🌟 Jean-Grofignon Engine Test Complete !${NC}"
}

# Lancer les tests
main "$@" 