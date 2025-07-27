#!/bin/bash

# 🏁 BENCHMARK JAVA vs HOTS avec MÉTRIQUES DE PERFORMANCE
# Compare l'exécution native Java vs scripts HOTS
# Utilise PerformanceMetricsService du backend

echo "🏁 HEROES OF TIME - BENCHMARK JAVA vs HOTS avec MÉTRIQUES"
echo "========================================================="

# Configuration
API_URL="http://localhost:8080/api"
ITERATIONS=10

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Vérifier que le backend est lancé
echo -e "${BLUE}Vérification du backend...${NC}"
if ! curl -s "$API_URL/game/status" > /dev/null 2>&1; then
    echo -e "${RED}❌ Backend non accessible !${NC}"
    echo "Lancez d'abord : cd backend && mvn spring-boot:run"
    exit 1
fi
echo -e "${GREEN}✅ Backend accessible${NC}"

# Créer une partie pour les tests
echo -e "\n${BLUE}Création de la partie de test...${NC}"
GAME_RESPONSE=$(curl -s -X POST "$API_URL/game/create" \
    -H "Content-Type: application/json" \
    -d '{
        "gameName": "Benchmark Java vs HOTS",
        "players": ["TestPlayer1", "TestPlayer2"],
        "mapWidth": 50,
        "mapHeight": 50
    }')

GAME_ID=$(echo $GAME_RESPONSE | grep -o '"gameId":[0-9]*' | cut -d: -f2)
echo "Game ID: $GAME_ID"

# Fonction pour récupérer les métriques
get_metrics() {
    curl -s "$API_URL/metrics/$GAME_ID" 2>/dev/null || echo "{}"
}

# Fonction pour extraire une métrique
extract_metric() {
    local metrics=$1
    local key=$2
    echo $metrics | grep -o "\"$key\":[0-9.]*" | cut -d: -f2 || echo "0"
}

# =================================
# TEST 1: CRÉATION DE HÉROS
# =================================
echo -e "\n${PURPLE}=== TEST 1: Création de héros ===${NC}"

# Reset métriques
curl -s -X POST "$API_URL/metrics/reset" > /dev/null

# Java natif (via API directe)
echo -e "${CYAN}Java natif:${NC}"
START_TIME=$(date +%s%N)
for i in $(seq 1 $ITERATIONS); do
    curl -s -X POST "$API_URL/game/$GAME_ID/hero/create" \
        -H "Content-Type: application/json" \
        -d "{\"heroName\": \"JavaHero$i\"}" > /dev/null
done
JAVA_TIME=$(($(date +%s%N) - START_TIME))
JAVA_MS=$((JAVA_TIME / 1000000))

# Récupérer les métriques Java
JAVA_METRICS=$(get_metrics)

# HOTS script
echo -e "${CYAN}HOTS script:${NC}"
START_TIME=$(date +%s%N)
for i in $(seq 1 $ITERATIONS); do
    curl -s -X POST "$API_URL/game/$GAME_ID/execute" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"HERO(HotsHero$i)\"}" > /dev/null
done
HOTS_TIME=$(($(date +%s%N) - START_TIME))
HOTS_MS=$((HOTS_TIME / 1000000))

# Récupérer les métriques HOTS
HOTS_METRICS=$(get_metrics)

echo -e "${GREEN}Résultats création héros:${NC}"
echo "- Java: ${JAVA_MS}ms"
echo "- HOTS: ${HOTS_MS}ms"
echo "- Ratio: $(awk "BEGIN {printf \"%.2f\", $HOTS_MS/$JAVA_MS}")x"

# =================================
# TEST 2: ÉTATS QUANTIQUES
# =================================
echo -e "\n${PURPLE}=== TEST 2: États quantiques (ψ) ===${NC}"

# Reset métriques
curl -s -X POST "$API_URL/metrics/reset" > /dev/null

# Java natif - créer des états quantiques directement
echo -e "${CYAN}Java natif:${NC}"
START_TIME=$(date +%s%N)
for i in $(seq 1 $ITERATIONS); do
    curl -s -X POST "$API_URL/game/$GAME_ID/quantum/state/create" \
        -H "Content-Type: application/json" \
        -d "{
            \"psiId\": \"ψJ$i\",
            \"realPart\": 0.8,
            \"imaginaryPart\": 0.2,
            \"targetX\": 25,
            \"targetY\": 25,
            \"deltaT\": 3
        }" > /dev/null 2>&1
done
JAVA_TIME=$(($(date +%s%N) - START_TIME))
JAVA_QUANTUM_MS=$((JAVA_TIME / 1000000))

# HOTS script
echo -e "${CYAN}HOTS script:${NC}"
START_TIME=$(date +%s%N)
for i in $(seq 1 $ITERATIONS); do
    curl -s -X POST "$API_URL/game/$GAME_ID/execute" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"ψH$i: (0.8+0.2i) ⊙(Δt+3 @25,25 ⟶ MOV(Arthur, @25,25))\"}" > /dev/null
done
HOTS_TIME=$(($(date +%s%N) - START_TIME))
HOTS_QUANTUM_MS=$((HOTS_TIME / 1000000))

echo -e "${GREEN}Résultats états quantiques:${NC}"
echo "- Java: ${JAVA_QUANTUM_MS}ms"
echo "- HOTS: ${HOTS_QUANTUM_MS}ms"
echo "- Ratio: $(awk "BEGIN {printf \"%.2f\", $HOTS_QUANTUM_MS/$JAVA_QUANTUM_MS}")x"

# =================================
# TEST 3: SCÉNARIO COMPLET
# =================================
echo -e "\n${PURPLE}=== TEST 3: Scénario complet ===${NC}"

# Créer une nouvelle partie pour le scénario
NEW_GAME=$(curl -s -X POST "$API_URL/game/create" \
    -H "Content-Type: application/json" \
    -d '{
        "gameName": "Benchmark Scenario",
        "players": ["P1", "P2"]
    }')
SCENARIO_GAME_ID=$(echo $NEW_GAME | grep -o '"gameId":[0-9]*' | cut -d: -f2)

# Java natif - scénario hardcodé
echo -e "${CYAN}Java natif (scénario hardcodé):${NC}"
START_TIME=$(date +%s%N)
curl -s -X POST "$API_URL/benchmark/native/$SCENARIO_GAME_ID/bataille-temporelle" > /dev/null
JAVA_SCENARIO_TIME=$(($(date +%s%N) - START_TIME))
JAVA_SCENARIO_MS=$((JAVA_SCENARIO_TIME / 1000000))

# HOTS script - exécuter le fichier
echo -e "${CYAN}HOTS script (fichier .hots):${NC}"
START_TIME=$(date +%s%N)
# Simuler l'exécution du fichier HOTS ligne par ligne
while IFS= read -r line; do
    # Ignorer les commentaires et lignes vides
    if [[ ! "$line" =~ ^#.*$ ]] && [[ ! -z "$line" ]]; then
        curl -s -X POST "$API_URL/game/$SCENARIO_GAME_ID/execute" \
            -H "Content-Type: application/json" \
            -d "{\"script\": \"$line\"}" > /dev/null 2>&1
    fi
done < "🎮 🎮 game_assets/scenarios/hots/bataille_temporelle_complete.hots" 2>/dev/null || echo "Fichier non trouvé"
HOTS_SCENARIO_TIME=$(($(date +%s%N) - START_TIME))
HOTS_SCENARIO_MS=$((HOTS_SCENARIO_TIME / 1000000))

echo -e "${GREEN}Résultats scénario complet:${NC}"
echo "- Java: ${JAVA_SCENARIO_MS}ms"
echo "- HOTS: ${HOTS_SCENARIO_MS}ms"
echo "- Ratio: $(awk "BEGIN {printf \"%.2f\", $HOTS_SCENARIO_MS/$JAVA_SCENARIO_MS}")x"

# =================================
# MÉTRIQUES DÉTAILLÉES
# =================================
echo -e "\n${PURPLE}=== MÉTRIQUES DÉTAILLÉES DU BACKEND ===${NC}"

# Récupérer toutes les métriques
ALL_METRICS=$(curl -s "$API_URL/metrics/all" 2>/dev/null || echo "{}")

echo -e "${CYAN}Opérations les plus coûteuses:${NC}"
echo "$ALL_METRICS" | grep -o '"[^"]*":[0-9.]*' | sort -t: -k2 -nr | head -10

echo -e "\n${CYAN}Compteurs d'opérations:${NC}"
SCRIPT_COUNT=$(extract_metric "$ALL_METRICS" "script_executions")
QUANTUM_COUNT=$(extract_metric "$ALL_METRICS" "quantum_states_created")
COLLAPSE_COUNT=$(extract_metric "$ALL_METRICS" "collapses_processed")

echo "- Scripts exécutés: $SCRIPT_COUNT"
echo "- États quantiques créés: $QUANTUM_COUNT"
echo "- Collapses traités: $COLLAPSE_COUNT"

# =================================
# RÉSUMÉ FINAL
# =================================
echo -e "\n${PURPLE}=== RÉSUMÉ FINAL ===${NC}"
echo -e "${GREEN}Performance globale:${NC}"

# Calculer la moyenne des ratios
AVG_RATIO=$(awk "BEGIN {
    r1 = $HOTS_MS/$JAVA_MS
    r2 = $HOTS_QUANTUM_MS/$JAVA_QUANTUM_MS
    r3 = $HOTS_SCENARIO_MS/$JAVA_SCENARIO_MS
    avg = (r1 + r2 + r3) / 3
    printf \"%.2f\", avg
}")

echo "- Ratio moyen HOTS/Java: ${AVG_RATIO}x"

if (( $(awk "BEGIN {print ($AVG_RATIO < 2)}") )); then
    echo -e "${GREEN}✅ Performance EXCELLENTE ! HOTS est presque aussi rapide que Java natif${NC}"
elif (( $(awk "BEGIN {print ($AVG_RATIO < 5)}") )); then
    echo -e "${YELLOW}⚠️  Performance ACCEPTABLE. HOTS est 2-5x plus lent${NC}"
else
    echo -e "${RED}❌ Performance FAIBLE. HOTS est >5x plus lent${NC}"
fi

echo -e "\n${CYAN}Avantages de chaque approche:${NC}"
echo "📝 HOTS:"
echo "  - Lisibilité maximale"
echo "  - Modification facile"
echo "  - Symboles GROFI natifs"
echo "  - Scripts réutilisables"

echo -e "\n⚡ Java:"
echo "  - Performance optimale"
echo "  - Type safety"
echo "  - Debugging avancé"
echo "  - Intégration IDE"

echo -e "\n🎮 Heroes of Time - Benchmark terminé ! 🎮"

# Sauvegarder les résultats
RESULTS_FILE="benchmark_results_$(date +%Y%m%d_%H%M%S).json"
echo "{
    \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",
    \"hero_creation\": {
        \"java_ms\": $JAVA_MS,
        \"hots_ms\": $HOTS_MS,
        \"ratio\": $(awk "BEGIN {printf \"%.2f\", $HOTS_MS/$JAVA_MS}")
    },
    \"quantum_states\": {
        \"java_ms\": $JAVA_QUANTUM_MS,
        \"hots_ms\": $HOTS_QUANTUM_MS,
        \"ratio\": $(awk "BEGIN {printf \"%.2f\", $HOTS_QUANTUM_MS/$JAVA_QUANTUM_MS}")
    },
    \"full_scenario\": {
        \"java_ms\": $JAVA_SCENARIO_MS,
        \"hots_ms\": $HOTS_SCENARIO_MS,
        \"ratio\": $(awk "BEGIN {printf \"%.2f\", $HOTS_SCENARIO_MS/$JAVA_SCENARIO_MS}")
    },
    \"average_ratio\": $AVG_RATIO
}" > "📚 📚 MEMENTO/$RESULTS_FILE"

echo -e "\n📊 Résultats sauvegardés dans: 📚 📚 MEMENTO/$RESULTS_FILE" 