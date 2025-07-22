#!/bin/bash

# 📊 Heroes of Time - Benchmark Système Unifié avec Métriques Détaillées
# ====================================================================
# Benchmark complet avec identification des goulots d'étranglement

echo "📊 BENCHMARK SYSTÈME UNIFIÉ - HEROES OF TIME"
echo "============================================="
echo "🎯 Objectif : Identifier les goulots d'étranglement de performance"
echo ""

# 🚀 PHASE 1: BENCHMARK PARSER REGEX
echo "🔍 Phase 1: Benchmark Parser Regex"
echo "=================================="

# Test simple
SIMPLE_SCRIPTS=(
    "HERO(Arthur)"
    "MOV(Arthur, @10,10)"
    "CREATE(ITEM, Sword)"
    "BATTLE(Arthur, Dragon)"
    "BUILD(Castle, @5,5, Player1)"
)

echo "📋 Test scripts simples..."
START_TIME=$(date +%s%N)
for i in {1..10000}; do
    for script in "${SIMPLE_SCRIPTS[@]}"; do
        # Simulation parsing regex (sans backend)
        echo "$script" | grep -q "^[A-Z]" > /dev/null 2>&1
    done
done
END_TIME=$(date +%s%N)
DURATION=$(( ($END_TIME - $START_TIME) / 1000000 ))
OPS_COUNT=$(( 10000 * ${#SIMPLE_SCRIPTS[@]} ))
SIMPLE_OPS_PER_SEC=$(( $OPS_COUNT * 1000 / $DURATION ))

echo "✅ Scripts simples: $SIMPLE_OPS_PER_SEC operations regex/seconde"

# Test scripts complexes (quantiques)
COMPLEX_SCRIPTS=(
    'ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(Arthur, @10,10))'
    'ψ002: ⊙(Δt+2 @20,20 ⟶ CREATE(CREATURE, Dragon, @20,20))'
    'ψ003: ⊙(Δt+3 @30,30 ⟶ BATTLE(Arthur, Dragon))'
    'COLLAPSE(ψ001)'
    'OBSERVE(ψ002, condition: hero_nearby)'
)

echo "📋 Test scripts quantiques..."
START_TIME=$(date +%s%N)
for i in {1..5000}; do
    for script in "${COMPLEX_SCRIPTS[@]}"; do
        # Simulation parsing quantique (regex plus complexe)
        echo "$script" | grep -q "ψ[0-9]\|⊙\|Δt\|⟶\|COLLAPSE\|OBSERVE" > /dev/null 2>&1
    done
done
END_TIME=$(date +%s%N)
DURATION=$(( ($END_TIME - $START_TIME) / 1000000 ))
OPS_COUNT=$(( 5000 * ${#COMPLEX_SCRIPTS[@]} ))
COMPLEX_OPS_PER_SEC=$(( $OPS_COUNT * 1000 / $DURATION ))

echo "✅ Scripts quantiques: $COMPLEX_OPS_PER_SEC operations regex/seconde"

# 🧮 PHASE 2: BENCHMARK CALCULS QUANTIQUES
echo ""
echo "🧮 Phase 2: Benchmark Calculs Quantiques"
echo "========================================"

# Test calculs simples
echo "📋 Test calculs de probabilités..."
START_TIME=$(date +%s%N)
for i in {1..100000}; do
    # Simulation calculs quantiques
    PROB1=$(echo "scale=4; 0.8 * 0.6" | bc 2>/dev/null || echo "0.48")
    PROB2=$(echo "scale=4; sqrt(0.8 * 0.8 + 0.6 * 0.6)" | bc 2>/dev/null || echo "1.0")
done
END_TIME=$(date +%s%N)
DURATION=$(( ($END_TIME - $START_TIME) / 1000000 ))
CALC_OPS_PER_SEC=$(( 100000 * 1000 / $DURATION ))

echo "✅ Calculs probabilités: $CALC_OPS_PER_SEC calculs quantiques/seconde"

# Test interférences complexes
echo "📋 Test interférences quantiques..."
START_TIME=$(date +%s%N)
for i in {1..50000}; do
    # Simulation interférences quantiques
    REAL1=$(echo "scale=4; 0.8 * 0.707" | bc 2>/dev/null || echo "0.5656")
    IMAG1=$(echo "scale=4; 0.8 * 0.707" | bc 2>/dev/null || echo "0.5656")
    MAGNITUDE=$(echo "scale=4; sqrt($REAL1 * $REAL1 + $IMAG1 * $IMAG1)" | bc 2>/dev/null || echo "0.8")
done
END_TIME=$(date +%s%N)
DURATION=$(( ($END_TIME - $START_TIME) / 1000000 ))
INTERFERENCE_OPS_PER_SEC=$(( 50000 * 1000 / $DURATION ))

echo "✅ Interférences quantiques: $INTERFERENCE_OPS_PER_SEC calculs complexes/seconde"

# 🌐 PHASE 3: BENCHMARK API (SI BACKEND ACTIF)
echo ""
echo "🌐 Phase 3: Benchmark API"
echo "========================"

if curl -s http://localhost:8080/api/temporal/health > /dev/null 2>&1; then
    echo "📋 Test latence API..."
    TOTAL_LATENCY=0
    SUCCESS_COUNT=0
    ERROR_COUNT=0
    
    for i in {1..100}; do
        START_TIME=$(date +%s%N)
        if curl -s -X GET "http://localhost:8080/api/temporal/games/1" > /dev/null 2>&1; then
            END_TIME=$(date +%s%N)
            LATENCY=$(( ($END_TIME - $START_TIME) / 1000000 ))
            TOTAL_LATENCY=$(( $TOTAL_LATENCY + $LATENCY ))
            SUCCESS_COUNT=$(( $SUCCESS_COUNT + 1 ))
        else
            ERROR_COUNT=$(( $ERROR_COUNT + 1 ))
        fi
    done
    
    if [ $SUCCESS_COUNT -gt 0 ]; then
        AVG_LATENCY=$(( $TOTAL_LATENCY / $SUCCESS_COUNT ))
        echo "✅ Latence API moyenne: $AVG_LATENCY ms"
        echo "✅ Taux de succès: $SUCCESS_COUNT/100"
    else
        echo "❌ Aucune requête API réussie"
    fi
    
    # Test throughput API
    echo "📋 Test throughput API..."
    START_TIME=$(date +%s%N)
    PARALLEL_REQUESTS=10
    for i in {1..50}; do
        for j in $(seq 1 $PARALLEL_REQUESTS); do
            curl -s -X POST "http://localhost:8080/api/temporal/games/1/script" \
                -H "Content-Type: application/json" \
                -d '{"script": "HERO(TestHero'$j')"}' > /dev/null 2>&1 &
        done
        wait
    done
    END_TIME=$(date +%s%N)
    DURATION=$(( ($END_TIME - $START_TIME) / 1000000 ))
    THROUGHPUT=$(( 50 * $PARALLEL_REQUESTS * 1000 / $DURATION ))
    
    echo "✅ Throughput API: $THROUGHPUT requêtes/seconde"
else
    echo "❌ Backend non accessible - tests API ignorés"
fi

# 💾 PHASE 4: BENCHMARK MÉMOIRE
echo ""
echo "💾 Phase 4: Benchmark Mémoire"
echo "============================"

# Test consommation mémoire
echo "📋 Test consommation mémoire..."
MEMORY_BEFORE=$(ps -o rss= -p $$ | tr -d ' ' 2>/dev/null || echo "0")

# Créer des structures temporaires
declare -a LARGE_ARRAY
for i in {1..100000}; do
    LARGE_ARRAY[i]="ψ$(printf '%06d' $i): ⊙(Δt+1 @$((i%100)),$((i%100)) ⟶ MOV(Hero$i, @$((i%100)),$((i%100))))"
done

MEMORY_AFTER=$(ps -o rss= -p $$ | tr -d ' ' 2>/dev/null || echo "0")
MEMORY_USED=$(( $MEMORY_AFTER - $MEMORY_BEFORE ))

echo "✅ Mémoire utilisée: $MEMORY_USED KB pour 100k ψ-states"

# Nettoyer
unset LARGE_ARRAY

# 🔍 PHASE 5: ANALYSE DES GOULOTS D'ÉTRANGLEMENT
echo ""
echo "🔍 Phase 5: Analyse des Goulots d'Étranglement"
echo "=============================================="

echo "📊 RÉSULTATS DÉTAILLÉS:"
echo "========================"

# Performance Parser
if [ $SIMPLE_OPS_PER_SEC -lt 10000 ]; then
    echo "⚠️ GOULOT DÉTECTÉ: Parser simple ($SIMPLE_OPS_PER_SEC ops/sec < 10k)"
else
    echo "✅ Parser simple: Performance acceptable ($SIMPLE_OPS_PER_SEC ops/sec)"
fi

if [ $COMPLEX_OPS_PER_SEC -lt 5000 ]; then
    echo "⚠️ GOULOT DÉTECTÉ: Parser quantique ($COMPLEX_OPS_PER_SEC ops/sec < 5k)"
else
    echo "✅ Parser quantique: Performance acceptable ($COMPLEX_OPS_PER_SEC ops/sec)"
fi

# Performance Calculs
if [ $CALC_OPS_PER_SEC -lt 50000 ]; then
    echo "⚠️ GOULOT DÉTECTÉ: Calculs quantiques ($CALC_OPS_PER_SEC calc/sec < 50k)"
else
    echo "✅ Calculs quantiques: Performance acceptable ($CALC_OPS_PER_SEC calc/sec)"
fi

if [ $INTERFERENCE_OPS_PER_SEC -lt 25000 ]; then
    echo "⚠️ GOULOT DÉTECTÉ: Interférences ($INTERFERENCE_OPS_PER_SEC calc/sec < 25k)"
else
    echo "✅ Interférences: Performance acceptable ($INTERFERENCE_OPS_PER_SEC calc/sec)"
fi

# Recommandations
echo ""
echo "🎯 RECOMMANDATIONS:"
echo "==================="

if [ $SIMPLE_OPS_PER_SEC -lt 10000 ]; then
    echo "🔧 Optimiser le parser regex simple (pré-compilation, cache)"
fi

if [ $COMPLEX_OPS_PER_SEC -lt 5000 ]; then
    echo "🔧 Optimiser le parser quantique (regex plus efficace, AST cache)"
fi

if [ $CALC_OPS_PER_SEC -lt 50000 ]; then
    echo "🔧 Optimiser les calculs quantiques (lookup tables, vectorisation)"
fi

if [ $INTERFERENCE_OPS_PER_SEC -lt 25000 ]; then
    echo "🔧 Optimiser les interférences (calculs parallèles, cache FFT)"
fi

# 📈 RÉSUMÉ FINAL
echo ""
echo "📈 RÉSUMÉ FINAL DES PERFORMANCES"
echo "==============================="
echo "🔍 Parser Simple: $SIMPLE_OPS_PER_SEC ops/sec"
echo "🌀 Parser Quantique: $COMPLEX_OPS_PER_SEC ops/sec"
echo "🧮 Calculs Quantiques: $CALC_OPS_PER_SEC calc/sec"
echo "🔬 Interférences: $INTERFERENCE_OPS_PER_SEC calc/sec"
echo "💾 Mémoire: $MEMORY_USED KB/100k états"

if curl -s http://localhost:8080/api/temporal/health > /dev/null 2>&1; then
    echo "🌐 Latence API: $AVG_LATENCY ms"
    echo "📡 Throughput API: $THROUGHPUT req/sec"
fi

echo ""
echo "🎉 BENCHMARK TERMINÉ"
echo "====================" 