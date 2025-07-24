#!/bin/bash

# 🌟 TEST MOTEUR AUTOMATIQUE - Jean-Grofignon Edition
# Test complet du moteur Heroes of Time avec logging détaillé
# Usage: ./test-moteur-automatique-jean.sh [category]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_URL="http://localhost:8080"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_DIR="test-results"
LOG_FILE="$LOG_DIR/test-moteur-$TIMESTAMP.log"

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

echo -e "${PURPLE}🌟 TEST MOTEUR AUTOMATIQUE - Jean-Grofignon Edition${NC}" | tee -a "$LOG_FILE"
echo -e "${CYAN}================================================================${NC}" | tee -a "$LOG_FILE"

log_message "INFO" "🚀 Début des tests automatiques du moteur Heroes of Time"
log_message "INFO" "📁 Logs sauvegardés dans: $LOG_FILE"

# 🔧 VÉRIFICATION BACKEND
test_backend_health() {
    log_message "TEST" "🏥 Test de santé du backend..."
    
    if curl -s "$BACKEND_URL/api/causal/health" > /dev/null; then
        local health_response=$(curl -s "$BACKEND_URL/api/causal/health")
        log_keyword "BACKEND_HEALTH" "✅ UP" "$health_response"
        echo -e "${GREEN}✅ Backend opérationnel${NC}"
        return 0
    else
        log_keyword "BACKEND_HEALTH" "❌ DOWN" "Connexion impossible"
        echo -e "${RED}❌ Backend non disponible${NC}"
        return 1
    fi
}

# 🧪 TESTS PAR CATÉGORIE

# Catégorie 1: Tests Endpoints Causaux
test_causal_endpoints() {
    log_message "CATEGORY" "🔮 === TESTS ENDPOINTS CAUSAUX ==="
    
    # Test Cross-Interaction
    log_message "TEST" "🧪 Test Cross-Interaction..."
    local cross_response=$(curl -s -X POST "$BACKEND_URL/api/causal/cross-interaction" \
         -H "Content-Type: application/json" \
         -d '{"items":["AXISI","LENTUS"],"scenario":"test_auto"}' 2>/dev/null || echo '{"error":"failed"}')
    
    if echo "$cross_response" | grep -q "error"; then
        log_keyword "CROSS_INTERACTION" "❌ FAIL" "$cross_response"
        echo -e "${RED}❌ Cross-Interaction échoué${NC}"
    else
        log_keyword "CROSS_INTERACTION" "✅ SUCCESS" "Response received"
        echo -e "${GREEN}✅ Cross-Interaction OK${NC}"
        
        # Analyser les mots-clés dans la réponse
        if echo "$cross_response" | grep -q "paradoxRisk"; then
            log_keyword "PARADOX_RISK" "✅ DETECTED" "Formule paradoxRisk présente"
        fi
        if echo "$cross_response" | grep -q "temporalStability"; then
            log_keyword "TEMPORAL_STABILITY" "✅ DETECTED" "Formule temporalStability présente"
        fi
        if echo "$cross_response" | grep -q "affectedRadius"; then
            log_keyword "AFFECTED_RADIUS" "✅ DETECTED" "Formule affectedRadius présente"
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
        log_keyword "TEMPORAL_SIMULATION" "❌ FAIL" "$temporal_response"
        echo -e "${RED}❌ Temporal Simulation échoué${NC}"
    fi
}

# Catégorie 2: Tests Formules Mathématiques
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
        if (( $(echo "$paradox_value > 0 && $paradox_value < 1" | bc -l) )); then
            log_keyword "PARADOX_FORMULA" "✅ VALID" "Valeur: $paradox_value (dans [0,1])"
        else
            log_keyword "PARADOX_FORMULA" "⚠️ SUSPECT" "Valeur: $paradox_value (hors [0,1])"
        fi
    fi
    
    if echo "$formula_response" | grep -q "affectedRadius"; then
        local radius_value=$(echo "$formula_response" | grep -o '"affectedRadius":[0-9.]*' | cut -d':' -f2 || echo "0")
        if (( $(echo "$radius_value > 0" | bc -l) )); then
            log_keyword "RADIUS_FORMULA" "✅ VALID" "Valeur: $radius_value (positive)"
        else
            log_keyword "RADIUS_FORMULA" "❌ INVALID" "Valeur: $radius_value (non-positive)"
        fi
    fi
}

# Catégorie 3: Tests Scénarios HOTS
test_hots_scenarios() {
    log_message "CATEGORY" "📜 === TESTS SCÉNARIOS HOTS ==="
    
    # Tester les scénarios disponibles
    for scenario_file in scenarios/*.hots; do
        if [ -f "$scenario_file" ]; then
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
}

# Catégorie 4: Tests Conversion de Formats
test_format_conversion() {
    log_message "CATEGORY" "🔄 === TESTS CONVERSION FORMATS ==="
    
    # Tester le converter sur un scénario
    if [ -f "scenarios/zone_inverted_001_adapte_jean.hots" ]; then
        log_message "TEST" "🔄 Test conversion HOTS..."
        
        if [ -x "scripts/hots-converter-fixed.sh" ]; then
            # Faire la conversion
            ./scripts/hots-converter-fixed.sh scenarios/zone_inverted_001_adapte_jean.hots json >/dev/null 2>&1
            
            if [ -f "scenarios/zone_inverted_001_adapte_jean.json" ]; then
                log_keyword "HOTS_TO_JSON" "✅ SUCCESS" "Conversion réussie"
                
                # Valider le JSON généré
                if command -v jq >/dev/null 2>&1; then
                    if jq empty scenarios/zone_inverted_001_adapte_jean.json 2>/dev/null; then
                        log_keyword "JSON_VALIDATION" "✅ VALID" "Structure JSON correcte"
                    else
                        log_keyword "JSON_VALIDATION" "❌ INVALID" "JSON malformé"
                    fi
                fi
            else
                log_keyword "HOTS_TO_JSON" "❌ FAIL" "Fichier JSON non généré"
            fi
            
            # Tester le HEP
            if [ -f "scenarios/zone_inverted_001_adapte_jean.hep" ] && [ -x "scenarios/zone_inverted_001_adapte_jean.hep" ]; then
                log_keyword "HOTS_TO_HEP" "✅ SUCCESS" "HEP exécutable généré"
            else
                log_keyword "HOTS_TO_HEP" "❌ FAIL" "HEP non généré ou non exécutable"
            fi
        else
            log_keyword "CONVERTER_SCRIPT" "❌ MISSING" "Script converter non trouvé"
        fi
    fi
}

# Catégorie 5: Tests Performance et Stabilité
test_performance() {
    log_message "CATEGORY" "⚡ === TESTS PERFORMANCE ==="
    
    # Test de charge sur temporal-simulation
    log_message "TEST" "⚡ Test de charge (5 requêtes simultanées)..."
    
    local start_time=$(date +%s.%N)
    
    for i in {1..5}; do
        curl -s -X POST "$BACKEND_URL/api/causal/temporal-simulation" \
             -H "Content-Type: application/json" \
             -d '{"scenario":"performance_test","turns":2}' > /dev/null &
    done
    
    wait # Attendre toutes les requêtes
    
    local end_time=$(date +%s.%N)
    local duration=$(echo "$end_time - $start_time" | bc)
    
    log_keyword "PERFORMANCE_TEST" "✅ COMPLETED" "Durée: ${duration}s pour 5 requêtes"
    
    if (( $(echo "$duration < 10" | bc -l) )); then
        log_keyword "PERFORMANCE_RESULT" "✅ GOOD" "< 10s pour 5 requêtes"
    else
        log_keyword "PERFORMANCE_RESULT" "⚠️ SLOW" "> 10s pour 5 requêtes"
    fi
}

# 📊 GÉNÉRATION DU RAPPORT
generate_report() {
    log_message "REPORT" "📊 === GÉNÉRATION DU RAPPORT ==="
    
    local total_tests=$(grep -c "KEYWORD" "$LOG_FILE" || echo "0")
    local success_tests=$(grep -c "✅" "$LOG_FILE" || echo "0")
    local failed_tests=$(grep -c "❌" "$LOG_FILE" || echo "0")
    local warning_tests=$(grep -c "⚠️" "$LOG_FILE" || echo "0")
    
    echo -e "\n${PURPLE}📊 RAPPORT FINAL${NC}" | tee -a "$LOG_FILE"
    echo -e "${CYAN}==================${NC}" | tee -a "$LOG_FILE"
    log_message "SUMMARY" "Total tests: $total_tests"
    log_message "SUMMARY" "Succès: $success_tests ✅"
    log_message "SUMMARY" "Échecs: $failed_tests ❌"
    log_message "SUMMARY" "Warnings: $warning_tests ⚠️"
    
    local success_rate=0
    if [ "$total_tests" -gt 0 ]; then
        success_rate=$(echo "scale=2; $success_tests * 100 / $total_tests" | bc)
    fi
    
    log_message "SUMMARY" "Taux de réussite: ${success_rate}%"
    
    if (( $(echo "$success_rate >= 80" | bc -l) )); then
        echo -e "${GREEN}🎉 MOTEUR EN EXCELLENT ÉTAT !${NC}" | tee -a "$LOG_FILE"
    elif (( $(echo "$success_rate >= 60" | bc -l) )); then
        echo -e "${YELLOW}⚠️ MOTEUR EN ÉTAT ACCEPTABLE${NC}" | tee -a "$LOG_FILE"
    else
        echo -e "${RED}❌ MOTEUR NÉCESSITE ATTENTION${NC}" | tee -a "$LOG_FILE"
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
        "causal"|"all")
            test_causal_endpoints
            ;;& # Continue to next case
        "formulas"|"all")
            test_mathematical_formulas
            ;;& # Continue to next case
        "scenarios"|"all")
            test_hots_scenarios
            ;;& # Continue to next case
        "conversion"|"all")
            test_format_conversion
            ;;& # Continue to next case
        "performance"|"all")
            test_performance
            ;;& # Continue to next case
        "all")
            ;;
        *)
            log_message "ERROR" "❌ Catégorie inconnue: $category"
            echo "Catégories disponibles: causal, formulas, scenarios, conversion, performance, all"
            exit 1
            ;;
    esac
    
    generate_report
    
    echo -e "\n${BLUE}📁 Log complet disponible: $LOG_FILE${NC}"
    echo -e "${PURPLE}🌟 Jean-Grofignon Engine Test Complete !${NC}"
}

# Vérifier les dépendances
if ! command -v bc >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️ 'bc' non installé - calculs limités${NC}"
fi

# Lancer les tests
main "$@" 