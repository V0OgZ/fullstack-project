#!/bin/bash

# ========================================
# BENCHMARK COHÉRENT - Séparation claire des concepts
# AXE 1: Définitions d'artefacts (Java vs JSON vs Templates)
# AXE 2: Scripts d'exécution (Classique vs HOTS)
# ========================================

echo "🎯 === BENCHMARK COHÉRENT HEROES OF TIME ==="

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'  
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
ITERATIONS=50
BACKEND_URL="http://localhost:8080"
RESULT_FILE="coherent_benchmark_$(date +%Y%m%d_%H%M%S).json"

# Initialiser résultats
echo "[]" > "$RESULT_FILE"

# Vérifier backend
check_backend() {
    if ! curl -s "$BACKEND_URL/health" > /dev/null 2>&1; then
        echo -e "${RED}❌ Backend non accessible${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Backend accessible${NC}"
}

# Mesurer temps
measure_time() {
    local start_time=$(date +%s%N)
    "$@" > /dev/null 2>&1
    local end_time=$(date +%s%N)
    echo $((end_time - start_time))
}

# Créer jeu test
create_test_game() {
    curl -s -X POST "$BACKEND_URL/api/games/create" \
        -H "Content-Type: application/json" \
        -d "{\"gameName\": \"$1\"}" | jq -r '.id'
}

echo -e "\n${BLUE}🎯 === AXE 1: DÉFINITIONS D'ARTEFACTS === ${NC}"
echo "Compare comment les effets d'artefacts sont DÉFINIS et EXÉCUTÉS"

# Test 1A: Artefact Java Hardcodé
benchmark_java_artifact() {
    echo -e "\n${GREEN}🏭 TEST 1A: Artefact Java Hardcodé${NC}"
    echo "Artefact 'quantum_mirror' → executeQuantumMirror() en Java"
    
    local total_time=0
    local success_count=0
    
    for i in $(seq 1 $ITERATIONS); do
        local game_id=$(create_test_game "java_artifact_$i")
        
        if [ -n "$game_id" ]; then
            local time_ns=$(measure_time curl -s -X POST "$BACKEND_URL/api/temporal-engine/execute/$game_id" \
                -H "Content-Type: application/json" \
                -d '{"scriptLines": ["HERO(TestHero, 5, 5)", "USE(ARTIFACT, quantum_mirror, HERO:TestHero)"]}')
            
            total_time=$((total_time + time_ns))
            success_count=$((success_count + 1))
        fi
    done
    
    local avg_ms=$((total_time / success_count / 1000000))
    echo -e "${GREEN}✅ Java Hardcodé: ${avg_ms} ms moyenne${NC}"
    
    echo "{\"type\": \"java_artifact\", \"avg_time\": $avg_ms, \"description\": \"Artefact défini en code Java\"}" >> temp_results.json
}

# Test 1B: Artefact JSON Formula
benchmark_json_artifact() {
    echo -e "\n${PURPLE}🌟 TEST 1B: Artefact JSON Formula${NC}"
    echo "Artefact 'custom_mirror' → JSON + DynamicFormulaParser"
    
    local total_time=0
    local success_count=0
    
    for i in $(seq 1 $ITERATIONS); do
        local game_id=$(create_test_game "json_artifact_$i")
        
        if [ -n "$game_id" ]; then
            local time_ns=$(measure_time curl -s -X POST "$BACKEND_URL/api/temporal-engine/execute/$game_id" \
                -H "Content-Type: application/json" \
                -d '{"scriptLines": ["HERO(TestHero, 5, 5)", "USE(ARTIFACT, custom_mirror, HERO:TestHero)"]}')
            
            total_time=$((total_time + time_ns))
            success_count=$((success_count + 1))
        fi
    done
    
    local avg_ms=$((total_time / success_count / 1000000))
    echo -e "${PURPLE}✅ JSON Formula: ${avg_ms} ms moyenne${NC}"
    
    echo "{\"type\": \"json_artifact\", \"avg_time\": $avg_ms, \"description\": \"Artefact défini en JSON\"}" >> temp_results.json
}

# Test 1C: Template Artifact  
benchmark_template_artifact() {
    echo -e "\n${YELLOW}🎮 TEST 1C: Template Artifact${NC}"
    echo "Artefact 'iron_sword' → game_templates/classic_rpg/artifacts.json"
    
    local total_time=0
    local success_count=0
    
    for i in $(seq 1 $ITERATIONS); do
        local game_id=$(create_test_game "template_artifact_$i")
        
        if [ -n "$game_id" ]; then
            local time_ns=$(measure_time curl -s -X POST "$BACKEND_URL/api/temporal-engine/execute/$game_id" \
                -H "Content-Type: application/json" \
                -d '{"scriptLines": ["HERO(TestHero, 5, 5)", "USE(ARTIFACT, iron_sword, HERO:TestHero)"]}')
            
            total_time=$((total_time + time_ns))
            success_count=$((success_count + 1))
        fi
    done
    
    local avg_ms=$((total_time / success_count / 1000000))
    echo -e "${YELLOW}✅ Template Artifact: ${avg_ms} ms moyenne${NC}"
    
    echo "{\"type\": \"template_artifact\", \"avg_time\": $avg_ms, \"description\": \"Artefact défini en template JSON\"}" >> temp_results.json
}

echo -e "\n${BLUE}📜 === AXE 2: SCRIPTS D'EXÉCUTION === ${NC}"
echo "Compare comment les SCÉNARIOS sont écrits et exécutés"

# Test 2A: Script Classique
benchmark_classic_script() {
    echo -e "\n${CYAN}📋 TEST 2A: Script Classique${NC}"
    echo "HERO + USE + MOV → TemporalEngineService.executeClassicGameScript()"
    
    local total_time=0
    local success_count=0
    
    for i in $(seq 1 $ITERATIONS); do
        local game_id=$(create_test_game "classic_script_$i")
        
        if [ -n "$game_id" ]; then
            local time_ns=$(measure_time curl -s -X POST "$BACKEND_URL/api/temporal-engine/execute/$game_id" \
                -H "Content-Type: application/json" \
                -d '{"scriptLines": ["HERO(ScriptHero, 2, 2)", "USE(ARTIFACT, quantum_mirror, HERO:ScriptHero)", "MOV(ScriptHero, 5, 5)"]}')
            
            total_time=$((total_time + time_ns))
            success_count=$((success_count + 1))
        fi
    done
    
    local avg_ms=$((total_time / success_count / 1000000))
    echo -e "${CYAN}✅ Script Classique: ${avg_ms} ms moyenne${NC}"
    
    echo "{\"type\": \"classic_script\", \"avg_time\": $avg_ms, \"description\": \"Script avec syntaxe classique HERO/USE/MOV\"}" >> temp_results.json
}

# Test 2B: Script HOTS
benchmark_hots_script() {
    echo -e "\n${BLUE}🌀 TEST 2B: Script HOTS${NC}"
    echo "ψ-states + amplitudes complexes → TemporalEngineService.executeQuantumTemporalScript()"
    
    local total_time=0
    local success_count=0
    
    for i in $(seq 1 $ITERATIONS); do
        local game_id=$(create_test_game "hots_script_$i")
        
        if [ -n "$game_id" ]; then
            local time_ns=$(measure_time curl -s -X POST "$BACKEND_URL/api/temporal-engine/execute/$game_id" \
                -H "Content-Type: application/json" \
                -d '{"scriptLines": ["HERO(QuantumHero, 3, 3)", "ψ001: (0.8+0.6i) ⊙(Δt+1 @7,7 ⟶ MOV(HERO, QuantumHero, @7,7))"]}')
            
            total_time=$((total_time + time_ns))
            success_count=$((success_count + 1))
        fi
    done
    
    local avg_ms=$((total_time / success_count / 1000000))
    echo -e "${BLUE}✅ Script HOTS: ${avg_ms} ms moyenne${NC}"
    
    echo "{\"type\": \"hots_script\", \"avg_time\": $avg_ms, \"description\": \"Script avec syntaxe HOTS ψ-states\"}" >> temp_results.json
}

# Générer rapport cohérent
generate_coherent_report() {
    echo -e "\n${BLUE}📊 === RAPPORT COHÉRENT === ${NC}"
    
    # Combiner tous les résultats
    cat temp_results.json | jq -s '.' > "$RESULT_FILE"
    rm -f temp_results.json
    
    echo "📋 Résultats détaillés dans: $RESULT_FILE"
    echo ""
    
    # Extraire résultats
    local java_time=$(cat "$RESULT_FILE" | jq -r '.[] | select(.type=="java_artifact") | .avg_time')
    local json_time=$(cat "$RESULT_FILE" | jq -r '.[] | select(.type=="json_artifact") | .avg_time')
    local template_time=$(cat "$RESULT_FILE" | jq -r '.[] | select(.type=="template_artifact") | .avg_time')
    local classic_time=$(cat "$RESULT_FILE" | jq -r '.[] | select(.type=="classic_script") | .avg_time')
    local hots_time=$(cat "$RESULT_FILE" | jq -r '.[] | select(.type=="hots_script") | .avg_time')
    
    echo -e "${GREEN}🎯 AXE 1 - DÉFINITIONS D'ARTEFACTS:${NC}"
    echo -e "  🏭 Java Hardcodé:    ${java_time} ms (référence)"
    echo -e "  🌟 JSON Formula:     ${json_time} ms"
    echo -e "  🎮 Template:         ${template_time} ms"
    
    echo -e "\n${BLUE}📜 AXE 2 - SCRIPTS D'EXÉCUTION:${NC}"
    echo -e "  📋 Script Classique: ${classic_time} ms"
    echo -e "  🌀 Script HOTS:      ${hots_time} ms"
    
    # Calculs ratios AXE 1
    if [ "$java_time" != "null" ] && [ "$json_time" != "null" ]; then
        local json_ratio=$(echo "scale=2; $json_time / $java_time" | bc -l)
        echo -e "\n${PURPLE}⚖️ RATIOS DÉFINITIONS (vs Java Hardcodé):${NC}"
        echo -e "  JSON Formula: ${json_ratio}x"
    fi
    
    if [ "$java_time" != "null" ] && [ "$template_time" != "null" ]; then
        local template_ratio=$(echo "scale=2; $template_time / $java_time" | bc -l)
        echo -e "  Template: ${template_ratio}x"
    fi
    
    # Calculs ratios AXE 2
    if [ "$classic_time" != "null" ] && [ "$hots_time" != "null" ]; then
        local hots_ratio=$(echo "scale=2; $hots_time / $classic_time" | bc -l)
        echo -e "\n${CYAN}⚖️ RATIOS SCRIPTS (vs Classique):${NC}"
        echo -e "  HOTS vs Classique: ${hots_ratio}x"
    fi
    
    echo -e "\n${YELLOW}💡 CLARIFICATION CONCEPTUELLE:${NC}"
    echo -e "  📋 ${BLUE}JSON${NC} = Comment les objets sont ${BLUE}DÉFINIS${NC}"
    echo -e "  📜 ${CYAN}HOTS${NC} = Comment les scénarios ${CYAN}AVANCENT${NC}"
    echo -e "  🔄 Ce sont ${YELLOW}DEUX AXES ORTHOGONAUX${NC} !"
    
    echo -e "\n${GREEN}🎯 RECOMMANDATIONS COHÉRENTES:${NC}"
    echo -e "  🏭 Java hardcodé: Artefacts critiques haute performance"
    echo -e "  🌟 JSON formulas: Artefacts customisables facilement"
    echo -e "  📋 Scripts classiques: Actions directes simples"
    echo -e "  🌀 Scripts HOTS: Scénarios avec logique temporelle complexe"
}

# Fonction principale
main() {
    echo "🎯 Benchmark cohérent avec séparation claire des concepts"
    echo "📊 Itérations par test: $ITERATIONS"
    
    check_backend
    
    # Nettoyer fichier temporaire
    rm -f temp_results.json
    
    echo -e "\n${YELLOW}🔍 EXPLICATION:${NC}"
    echo "AXE 1: Comment les ARTEFACTS sont définis (Java vs JSON vs Templates)"
    echo "AXE 2: Comment les SCÉNARIOS sont écrits (Classique vs HOTS)"
    echo ""
    
    # Tests AXE 1 - Définitions
    benchmark_java_artifact
    benchmark_json_artifact
    benchmark_template_artifact
    
    # Tests AXE 2 - Scripts
    benchmark_classic_script
    benchmark_hots_script
    
    # Rapport
    generate_coherent_report
    
    echo -e "\n${GREEN}✨ BENCHMARK COHÉRENT TERMINÉ ! ✨${NC}"
    echo "📁 Résultats: $RESULT_FILE"
}

main "$@" 