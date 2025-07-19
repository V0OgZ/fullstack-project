#!/bin/bash

# ========================================
# BENCHMARK PERFORMANCE - Java vs JSON vs HOTS
# Compare les performances des différentes approches
# ========================================

echo "⚡ === BENCHMARK PERFORMANCE HEROES OF TIME ==="

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'  
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
ITERATIONS=100
BACKEND_URL="http://localhost:8080"
RESULT_FILE="performance_benchmark_$(date +%Y%m%d_%H%M%S).json"

# Vérifier dépendances
check_dependencies() {
    echo "🔧 Vérification des dépendances..."
    
    if ! command -v curl &> /dev/null; then
        echo -e "${RED}❌ curl requis${NC}"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        echo -e "${RED}❌ jq requis pour parser JSON${NC}"
        exit 1
    fi
    
    if ! command -v bc &> /dev/null; then
        echo -e "${RED}❌ bc requis pour calculs${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Dépendances OK${NC}"
}

# Démarrer le backend si nécessaire
start_backend_if_needed() {
    echo "📡 Vérification backend..."
    
    if ! curl -s "$BACKEND_URL/health" > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️ Backend non accessible, démarrage...${NC}"
        cd backend && mvn spring-boot:run > ../backend-benchmark.log 2>&1 &
        BACKEND_PID=$!
        echo "⏳ Attente démarrage backend (45s)..."
        sleep 45
        
        if ! curl -s "$BACKEND_URL/health" > /dev/null 2>&1; then
            echo -e "${RED}❌ Impossible de démarrer le backend${NC}"
            exit 1
        fi
    fi
    
    echo -e "${GREEN}✅ Backend prêt${NC}"
}

# Créer un jeu de test
create_test_game() {
    local game_name="$1"
    
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/games/create" \
        -H "Content-Type: application/json" \
        -d "{\"gameName\": \"$game_name\"}")
    
    echo "$RESPONSE" | jq -r '.id // empty'
}

# Mesurer le temps d'une opération
measure_time() {
    local start_time=$(date +%s%N)
    "$@"
    local end_time=$(date +%s%N)
    local duration=$((end_time - start_time))
    echo $((duration / 1000000))  # Convertir en millisecondes
}

# Test Java hardcodé
benchmark_java_hardcoded() {
    local iterations=$1
    echo -e "\n${BLUE}🏭 BENCHMARK JAVA HARDCODÉ${NC}"
    
    local total_time=0
    local success_count=0
    
    for ((i=1; i<=iterations; i++)); do
        local game_id=$(create_test_game "java_test_$i")
        
        if [ -n "$game_id" ]; then
            local time_taken=$(measure_time curl -s -X POST "$BACKEND_URL/api/temporal-engine/execute/$game_id" \
                -H "Content-Type: application/json" \
                -d '{"scriptLines": ["HERO(TestHero, 5, 5)", "USE(ARTIFACT, quantum_mirror, HERO:TestHero)"]}' \
                > /dev/null)
            
            total_time=$((total_time + time_taken))
            success_count=$((success_count + 1))
        fi
        
        # Afficher progression
        if [ $((i % 10)) -eq 0 ]; then
            echo "  📊 Progression Java: $i/$iterations"
        fi
    done
    
    local avg_time=$(echo "scale=2; $total_time / $success_count" | bc -l)
    echo -e "${GREEN}✅ Java Hardcodé: $avg_time ms moyenne ($success_count/$iterations succès)${NC}"
    
    # Sauvegarder résultat
    echo "{\"type\": \"java_hardcoded\", \"avg_time\": $avg_time, \"success_rate\": $(echo "scale=2; $success_count * 100 / $iterations" | bc -l)}" >> "$RESULT_FILE"
}

# Test JSON Formula
benchmark_json_formula() {
    local iterations=$1
    echo -e "\n${PURPLE}🌟 BENCHMARK JSON FORMULA${NC}"
    
    local total_time=0
    local success_count=0
    
    for ((i=1; i<=iterations; i++)); do
        local game_id=$(create_test_game "json_test_$i")
        
        if [ -n "$game_id" ]; then
            local time_taken=$(measure_time curl -s -X POST "$BACKEND_URL/api/temporal-engine/execute/$game_id" \
                -H "Content-Type: application/json" \
                -d '{"scriptLines": ["HERO(TestHero, 5, 5)", "USE(ARTIFACT, custom_mirror, HERO:TestHero)"]}' \
                > /dev/null)
            
            total_time=$((total_time + time_taken))
            success_count=$((success_count + 1))
        fi
        
        if [ $((i % 10)) -eq 0 ]; then
            echo "  📊 Progression JSON: $i/$iterations"
        fi
    done
    
    local avg_time=$(echo "scale=2; $total_time / $success_count" | bc -l)
    echo -e "${PURPLE}✅ JSON Formula: $avg_time ms moyenne ($success_count/$iterations succès)${NC}"
    
    echo "{\"type\": \"json_formula\", \"avg_time\": $avg_time, \"success_rate\": $(echo "scale=2; $success_count * 100 / $iterations" | bc -l)}" >> "$RESULT_FILE"
}

# Test HOTS Script Complex
benchmark_hots_script() {
    local iterations=$1
    echo -e "\n${CYAN}📜 BENCHMARK HOTS SCRIPT${NC}"
    
    local total_time=0
    local success_count=0
    
    for ((i=1; i<=iterations; i++)); do
        local game_id=$(create_test_game "hots_test_$i")
        
        if [ -n "$game_id" ]; then
            local time_taken=$(measure_time curl -s -X POST "$BACKEND_URL/api/temporal-engine/execute/$game_id" \
                -H "Content-Type: application/json" \
                -d '{"scriptLines": ["HERO(TestHero, 5, 5)", "ψ001: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ CREATE(ARTIFACT, quantum_mirror))"]}' \
                > /dev/null)
            
            total_time=$((total_time + time_taken))
            success_count=$((success_count + 1))
        fi
        
        if [ $((i % 10)) -eq 0 ]; then
            echo "  📊 Progression HOTS: $i/$iterations"
        fi
    done
    
    local avg_time=$(echo "scale=2; $total_time / $success_count" | bc -l)
    echo -e "${CYAN}✅ HOTS Script: $avg_time ms moyenne ($success_count/$iterations succès)${NC}"
    
    echo "{\"type\": \"hots_script\", \"avg_time\": $avg_time, \"success_rate\": $(echo "scale=2; $success_count * 100 / $iterations" | bc -l)}" >> "$RESULT_FILE"
}

# Test Template Artifacts
benchmark_template_artifacts() {
    local iterations=$1
    echo -e "\n${YELLOW}🎮 BENCHMARK TEMPLATE ARTIFACTS${NC}"
    
    local total_time=0
    local success_count=0
    
    for ((i=1; i<=iterations; i++)); do
        local game_id=$(create_test_game "template_test_$i")
        
        if [ -n "$game_id" ]; then
            local time_taken=$(measure_time curl -s -X POST "$BACKEND_URL/api/temporal-engine/execute/$game_id" \
                -H "Content-Type: application/json" \
                -d '{"scriptLines": ["HERO(TestHero, 5, 5)", "USE(ARTIFACT, iron_sword, HERO:TestHero)"]}' \
                > /dev/null)
            
            total_time=$((total_time + time_taken))
            success_count=$((success_count + 1))
        fi
        
        if [ $((i % 10)) -eq 0 ]; then
            echo "  📊 Progression Template: $i/$iterations"
        fi
    done
    
    local avg_time=$(echo "scale=2; $total_time / $success_count" | bc -l)
    echo -e "${YELLOW}✅ Template Artifacts: $avg_time ms moyenne ($success_count/$iterations succès)${NC}"
    
    echo "{\"type\": \"template_artifacts\", \"avg_time\": $avg_time, \"success_rate\": $(echo "scale=2; $success_count * 100 / $iterations" | bc -l)}" >> "$RESULT_FILE"
}

# Générer rapport de comparaison
generate_performance_report() {
    echo -e "\n${BLUE}📊 === RAPPORT DE PERFORMANCE ===${NC}"
    
    if [ ! -f "$RESULT_FILE" ]; then
        echo -e "${RED}❌ Fichier de résultats non trouvé${NC}"
        return
    fi
    
    echo "📋 Résultats détaillés sauvés dans: $RESULT_FILE"
    echo ""
    
    # Extraire les résultats
    local java_time=$(cat "$RESULT_FILE" | jq -r 'select(.type=="java_hardcoded") | .avg_time')
    local json_time=$(cat "$RESULT_FILE" | jq -r 'select(.type=="json_formula") | .avg_time')
    local hots_time=$(cat "$RESULT_FILE" | jq -r 'select(.type=="hots_script") | .avg_time')
    local template_time=$(cat "$RESULT_FILE" | jq -r 'select(.type=="template_artifacts") | .avg_time')
    
    echo -e "${GREEN}🏭 Java Hardcodé:     ${java_time} ms${NC}"
    echo -e "${PURPLE}🌟 JSON Formula:      ${json_time} ms${NC}"
    echo -e "${CYAN}📜 HOTS Script:       ${hots_time} ms${NC}"
    echo -e "${YELLOW}🎮 Template Artifacts: ${template_time} ms${NC}"
    
    # Calculer les ratios de performance
    echo -e "\n${BLUE}⚡ RATIOS DE PERFORMANCE (vs Java Hardcodé):${NC}"
    
    if [ "$java_time" != "null" ] && [ "$json_time" != "null" ]; then
        local json_ratio=$(echo "scale=2; $json_time / $java_time" | bc -l)
        echo -e "  JSON Formula vs Java: ${json_ratio}x $([ $(echo "$json_ratio > 1.0" | bc -l) -eq 1 ] && echo -e "${RED}(plus lent)" || echo -e "${GREEN}(plus rapide)")${NC}"
    fi
    
    if [ "$java_time" != "null" ] && [ "$hots_time" != "null" ]; then
        local hots_ratio=$(echo "scale=2; $hots_time / $java_time" | bc -l)
        echo -e "  HOTS Script vs Java: ${hots_ratio}x $([ $(echo "$hots_ratio > 1.0" | bc -l) -eq 1 ] && echo -e "${RED}(plus lent)" || echo -e "${GREEN}(plus rapide)")${NC}"
    fi
    
    if [ "$java_time" != "null" ] && [ "$template_time" != "null" ]; then
        local template_ratio=$(echo "scale=2; $template_time / $java_time" | bc -l)
        echo -e "  Template vs Java: ${template_ratio}x $([ $(echo "$template_ratio > 1.0" | bc -l) -eq 1 ] && echo -e "${RED}(plus lent)" || echo -e "${GREEN}(plus rapide)")${NC}"
    fi
    
    # Recommandations
    echo -e "\n${BLUE}💡 RECOMMANDATIONS D'ARCHITECTURE:${NC}"
    echo "  🏭 Java Hardcodé: Optimal pour artifacts critiques haute fréquence"
    echo "  🌟 JSON Formula: Parfait pour prototypage et customisation rapide"  
    echo "  📜 HOTS Script: Idéal pour scénarios complexes et logique de jeu"
    echo "  🎮 Templates: Excellent pour différents genres de jeux"
    
    # Analyse du système hybride
    echo -e "\n${GREEN}🔄 EFFICACITÉ SYSTÈME HYBRIDE:${NC}"
    echo "  ✅ Flexibility: JSON formulas permettent création rapide sans recompilation"
    echo "  ⚡ Performance: Java hardcodé garde l'optimisation pour le code critique"
    echo "  🎯 Adaptabilité: Templates supportent différents styles de gameplay"
    echo "  🛡️ Robustesse: Fallbacks garantissent qu'aucun artifact ne peut échouer"
}

# Fonction principale
main() {
    echo "🚀 Démarrage du benchmark de performance..."
    echo "📊 Iterations par test: $ITERATIONS"
    echo "🎯 Backend: $BACKEND_URL"
    echo ""
    
    check_dependencies
    start_backend_if_needed
    
    # Initialiser fichier de résultats
    echo "[]" > "$RESULT_FILE"
    
    echo -e "\n${BLUE}🔥 DÉMARRAGE DES BENCHMARKS${NC}"
    
    # Exécuter les benchmarks
    benchmark_java_hardcoded $ITERATIONS
    benchmark_json_formula $ITERATIONS  
    benchmark_hots_script $ITERATIONS
    benchmark_template_artifacts $ITERATIONS
    
    # Générer le rapport
    generate_performance_report
    
    echo -e "\n${GREEN}✨ BENCHMARK TERMINÉ ! ✨${NC}"
    echo "📁 Résultats dans: $RESULT_FILE"
}

# Exécution
main "$@" 