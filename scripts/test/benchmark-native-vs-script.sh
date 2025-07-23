#!/bin/bash

# ===============================================
# BENCHMARK NATIVE vs SCRIPT - Heroes of Time
# Comparaison de performance entre Java hardcodé et JSON+HOTS
# ===============================================

set -e

# Configuration
BACKEND_URL="http://localhost:8080"
SCENARIOS=("bataille_temporelle_setup" "bataille_temporelle_combat" "bataille_temporelle_finale")
ITERATIONS=5
RESULTS_DIR="./benchmark-results"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🏁 BENCHMARK NATIVE vs SCRIPT${NC}"
echo "=================================="
echo "Scénarios à tester: ${SCENARIOS[@]}"
echo "Itérations par test: $ITERATIONS"
echo ""

# Créer le dossier de résultats
mkdir -p "$RESULTS_DIR"
RESULTS_FILE="$RESULTS_DIR/benchmark_${TIMESTAMP}.json"

# Initialiser le fichier JSON
cat > "$RESULTS_FILE" << EOF
{
  "benchmarkSession": {
    "timestamp": "$TIMESTAMP",
    "iterations": $ITERATIONS,
    "scenarios": [
EOF

first_scenario=true

# Fonction pour tester un scénario
test_scenario() {
    local scenario_name=$1
    local execution_type=$2  # "NATIVE" ou "SCRIPT"
    
    echo -e "${YELLOW}📊 Test: $scenario_name ($execution_type)${NC}"
    
    # Créer une nouvelle game
    game_response=$(curl -s -X POST "$BACKEND_URL/api/game/create" \
        -H "Content-Type: application/json" \
        -d '{"gameName": "benchmark_'$execution_type'_'$scenario_name'"}')
    
    game_id=$(echo "$game_response" | grep -o '"gameId":[0-9]*' | cut -d: -f2)
    
    if [ -z "$game_id" ]; then
        echo -e "${RED}❌ Échec création de partie pour $scenario_name ($execution_type)${NC}"
        return 1
    fi
    
    local total_time=0
    local success_count=0
    
    for i in $(seq 1 $ITERATIONS); do
        echo -n "  Itération $i/$ITERATIONS... "
        
        start_time=$(date +%s%N)
        
        if [ "$execution_type" = "NATIVE" ]; then
            # Exécuter le scénario natif Java
            response=$(curl -s -X POST "$BACKEND_URL/api/game/$game_id/scenario/native/$scenario_name" \
                -H "Content-Type: application/json")
        else
            # Exécuter le scénario via SCRIPT (JSON + HOTS)
            response=$(curl -s -X POST "$BACKEND_URL/api/game/$game_id/scenario/script/$scenario_name" \
                -H "Content-Type: application/json")
        fi
        
        end_time=$(date +%s%N)
        iteration_time=$(echo "scale=3; ($end_time - $start_time) / 1000000" | bc)
        
        # Vérifier si succès
        if echo "$response" | grep -q '"success":true'; then
            echo -e "${GREEN}✅ ${iteration_time}ms${NC}"
            total_time=$(echo "$total_time + $iteration_time" | bc)
            success_count=$((success_count + 1))
        else
            echo -e "${RED}❌ Échec${NC}"
        fi
    done
    
    if [ $success_count -gt 0 ]; then
        avg_time=$(echo "scale=3; $total_time / $success_count" | bc)
        echo "  📈 Temps moyen: ${avg_time}ms (${success_count}/${ITERATIONS} succès)"
        
        # Enregistrer les résultats
        echo "    \"$scenario_name\": {" >> "$RESULTS_FILE"
        echo "      \"${execution_type,,}\": {" >> "$RESULTS_FILE"
        echo "        \"avgTimeMs\": $avg_time," >> "$RESULTS_FILE"
        echo "        \"totalIterations\": $ITERATIONS," >> "$RESULTS_FILE"
        echo "        \"successCount\": $success_count," >> "$RESULTS_FILE"
        echo "        \"successRate\": $(echo "scale=3; $success_count * 100 / $ITERATIONS" | bc)" >> "$RESULTS_FILE"
        echo "      }" >> "$RESULTS_FILE"
        echo "    }" >> "$RESULTS_FILE"
        
        return 0
    else
        echo -e "${RED}  💥 Tous les tests ont échoué${NC}"
        return 1
    fi
}

# Fonction pour comparer les résultats
compare_results() {
    local scenario=$1
    local native_time=$2
    local script_time=$3
    
    if [ ! -z "$native_time" ] && [ ! -z "$script_time" ]; then
        # Calculer la différence de performance
        if (( $(echo "$native_time < $script_time" | bc -l) )); then
            speedup=$(echo "scale=2; $script_time / $native_time" | bc)
            echo -e "${GREEN}🚀 NATIVE est ${speedup}x plus rapide${NC}"
        else
            slowdown=$(echo "scale=2; $native_time / $script_time" | bc)
            echo -e "${BLUE}📊 SCRIPT est ${slowdown}x plus rapide${NC}"
        fi
        
        diff_percent=$(echo "scale=1; ($script_time - $native_time) * 100 / $native_time" | bc)
        echo "   Différence: ${diff_percent}%"
    fi
}

# Tester chaque scénario
for scenario in "${SCENARIOS[@]}"; do
    if [ "$first_scenario" = false ]; then
        echo "," >> "$RESULTS_FILE"
    fi
    first_scenario=false
    
    echo ""
    echo -e "${BLUE}🎯 Scénario: $scenario${NC}"
    echo "----------------------------------------"
    
    # Tester version NATIVE
    native_success=false
    if test_scenario "$scenario" "NATIVE"; then
        native_time=$(tail -10 "$RESULTS_FILE" | grep "avgTimeMs" | tail -1 | cut -d: -f2 | tr -d ' ,')
        native_success=true
    fi
    
    echo ""
    
    # Tester version SCRIPT  
    script_success=false
    if test_scenario "$scenario" "SCRIPT"; then
        script_time=$(tail -10 "$RESULTS_FILE" | grep "avgTimeMs" | tail -1 | cut -d: -f2 | tr -d ' ,')
        script_success=true
    fi
    
    echo ""
    echo -e "${YELLOW}📊 Comparaison $scenario:${NC}"
    
    if [ "$native_success" = true ] && [ "$script_success" = true ]; then
        compare_results "$scenario" "$native_time" "$script_time"
    elif [ "$native_success" = true ]; then
        echo -e "${GREEN}✅ NATIVE: ${native_time}ms${NC}"
        echo -e "${RED}❌ SCRIPT: Échec${NC}"
    elif [ "$script_success" = true ]; then
        echo -e "${RED}❌ NATIVE: Échec${NC}"
        echo -e "${GREEN}✅ SCRIPT: ${script_time}ms${NC}"
    else
        echo -e "${RED}💥 Les deux approches ont échoué${NC}"
    fi
done

# Finaliser le fichier JSON
cat >> "$RESULTS_FILE" << EOF
    ]
  },
  "summary": {
    "totalScenarios": ${#SCENARIOS[@]},
    "iterationsPerTest": $ITERATIONS,
    "generatedAt": "$(date -u +%Y-%m-%dT%H:%M:%S)Z"
  }
}
EOF

echo ""
echo -e "${GREEN}🏆 BENCHMARK TERMINÉ${NC}"
echo "=================================="
echo "Résultats sauvés: $RESULTS_FILE"
echo ""

# Afficher le résumé
echo -e "${BLUE}📈 RÉSUMÉ DES PERFORMANCES:${NC}"
echo ""

for scenario in "${SCENARIOS[@]}"; do
    echo "🎯 $scenario:"
    native_avg=$(grep -A 10 "\"$scenario\"" "$RESULTS_FILE" | grep "\"native\"" -A 4 | grep "avgTimeMs" | cut -d: -f2 | tr -d ' ,')
    script_avg=$(grep -A 10 "\"$scenario\"" "$RESULTS_FILE" | grep "\"script\"" -A 4 | grep "avgTimeMs" | cut -d: -f2 | tr -d ' ,')
    
    if [ ! -z "$native_avg" ] && [ ! -z "$script_avg" ]; then
        echo "  NATIVE: ${native_avg}ms"
        echo "  SCRIPT: ${script_avg}ms"
        
        if (( $(echo "$native_avg < $script_avg" | bc -l) )); then
            speedup=$(echo "scale=1; $script_avg / $native_avg" | bc)
            echo -e "  ${GREEN}Winner: NATIVE (${speedup}x faster)${NC}"
        else
            speedup=$(echo "scale=1; $native_avg / $script_avg" | bc)
            echo -e "  ${BLUE}Winner: SCRIPT (${speedup}x faster)${NC}"
        fi
    else
        echo "  Données incomplètes"
    fi
    echo ""
done

echo "📊 Rapport complet disponible: $RESULTS_FILE"
echo ""
echo -e "${YELLOW}💡 UTILISATION:${NC}"
echo "1. Analyser les résultats JSON"  
echo "2. Identifier les goulots d'étranglement"
echo "3. Optimiser l'approche la plus lente"
echo "4. Choisir la meilleure stratégie par scénario"
echo ""
echo -e "${GREEN}✅ Benchmark complété avec succès!${NC}" 