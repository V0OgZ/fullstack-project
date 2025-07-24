#!/bin/bash

echo "🔥 TEST COMPARAISON CAUSALE AXISI vs LENTUS"
echo "=============================================="

# Configuration
BACKEND_URL="http://localhost:8080"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RESULTS_FILE="test-results/causal-comparison-${TIMESTAMP}.log"

mkdir -p test-results

echo "📊 Création session de test..." | tee -a $RESULTS_FILE

# Créer une session de jeu
SESSION_RESPONSE=$(curl -s -X POST "${BACKEND_URL}/api/game/create" \
  -H "Content-Type: application/json" \
  -d '{"mapSize": 20, "playerCount": 2}')

SESSION_ID=$(echo $SESSION_RESPONSE | grep -o '"sessionId":"[^"]*' | cut -d'"' -f4)
echo "Session créée: $SESSION_ID" | tee -a $RESULTS_FILE

# Test 1: AXISI (Accélération Temporelle)
echo "" | tee -a $RESULTS_FILE
echo "🚀 TEST 1: AXISI - Accélération Temporelle" | tee -a $RESULTS_FILE
echo "===========================================" | tee -a $RESULTS_FILE

AXISI_TEST=$(curl -s -X POST "${BACKEND_URL}/api/causal/interaction" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "'$SESSION_ID'",
    "itemId": "axisi_acceleration_temporelle",
    "targetCoords": {"x": 10, "y": 10},
    "interactionType": "TEMPORAL_BOOST",
    "causalParameters": {
      "temporalFactor": 2.5,
      "durationTurns": 3,
      "affectedRadius": 2
    }
  }')

echo "Résultat AXISI:" | tee -a $RESULTS_FILE
echo "$AXISI_TEST" | jq '.' | tee -a $RESULTS_FILE

# Extraire les métriques AXISI
AXISI_CAUSAL_WEIGHT=$(echo $AXISI_TEST | jq -r '.causalWeight // "N/A"')
AXISI_PARADOX_RISK=$(echo $AXISI_TEST | jq -r '.paradoxRisk // "N/A"')
AXISI_TEMPORAL_STABILITY=$(echo $AXISI_TEST | jq -r '.temporalStability // "N/A"')

# Test 2: LENTUS (Ralentissement Temporel)
echo "" | tee -a $RESULTS_FILE
echo "🐌 TEST 2: LENTUS - Ralentissement Temporel" | tee -a $RESULTS_FILE
echo "============================================" | tee -a $RESULTS_FILE

LENTUS_TEST=$(curl -s -X POST "${BACKEND_URL}/api/causal/interaction" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "'$SESSION_ID'",
    "itemId": "lentus_ralentissement_temporel",
    "targetCoords": {"x": 15, "y": 15},
    "interactionType": "TEMPORAL_SLOW",
    "causalParameters": {
      "temporalFactor": 0.4,
      "durationTurns": 5,
      "affectedRadius": 3
    }
  }')

echo "Résultat LENTUS:" | tee -a $RESULTS_FILE
echo "$LENTUS_TEST" | jq '.' | tee -a $RESULTS_FILE

# Extraire les métriques LENTUS
LENTUS_CAUSAL_WEIGHT=$(echo $LENTUS_TEST | jq -r '.causalWeight // "N/A"')
LENTUS_PARADOX_RISK=$(echo $LENTUS_TEST | jq -r '.paradoxRisk // "N/A"')
LENTUS_TEMPORAL_STABILITY=$(echo $LENTUS_TEST | jq -r '.temporalStability // "N/A"')

# Test 3: Interaction Croisée (AXISI + LENTUS)
echo "" | tee -a $RESULTS_FILE
echo "⚡ TEST 3: INTERACTION CROISÉE AXISI+LENTUS" | tee -a $RESULTS_FILE
echo "==========================================" | tee -a $RESULTS_FILE

CROSS_TEST=$(curl -s -X POST "${BACKEND_URL}/api/causal/cross-interaction" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "'$SESSION_ID'",
    "interactions": [
      {
        "itemId": "axisi_acceleration_temporelle",
        "coords": {"x": 12, "y": 12},
        "type": "TEMPORAL_BOOST"
      },
      {
        "itemId": "lentus_ralentissement_temporel",
        "coords": {"x": 13, "y": 13},
        "type": "TEMPORAL_SLOW"
      }
    ]
  }')

echo "Résultat Interaction Croisée:" | tee -a $RESULTS_FILE
echo "$CROSS_TEST" | jq '.' | tee -a $RESULTS_FILE

# Analyse comparative
echo "" | tee -a $RESULTS_FILE
echo "📈 ANALYSE COMPARATIVE" | tee -a $RESULTS_FILE
echo "=====================" | tee -a $RESULTS_FILE
echo "AXISI - Poids Causal: $AXISI_CAUSAL_WEIGHT" | tee -a $RESULTS_FILE
echo "AXISI - Risque Paradoxe: $AXISI_PARADOX_RISK" | tee -a $RESULTS_FILE
echo "AXISI - Stabilité Temporelle: $AXISI_TEMPORAL_STABILITY" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE
echo "LENTUS - Poids Causal: $LENTUS_CAUSAL_WEIGHT" | tee -a $RESULTS_FILE
echo "LENTUS - Risque Paradoxe: $LENTUS_PARADOX_RISK" | tee -a $RESULTS_FILE
echo "LENTUS - Stabilité Temporelle: $LENTUS_TEMPORAL_STABILITY" | tee -a $RESULTS_FILE

# Test de performance temporelle
echo "" | tee -a $RESULTS_FILE
echo "⏱️  TEST PERFORMANCE TEMPORELLE" | tee -a $RESULTS_FILE
echo "===============================" | tee -a $RESULTS_FILE

for i in {1..5}; do
  START_TIME=$(date +%s%N)
  
  PERF_TEST=$(curl -s -X POST "${BACKEND_URL}/api/causal/temporal-simulation" \
    -H "Content-Type: application/json" \
    -d '{
      "sessionId": "'$SESSION_ID'",
      "scenario": "axisi_vs_lentus_battle",
      "turns": 10
    }')
  
  END_TIME=$(date +%s%N)
  DURATION=$(( ($END_TIME - $START_TIME) / 1000000 ))
  
  echo "Test $i: ${DURATION}ms" | tee -a $RESULTS_FILE
done

echo "" | tee -a $RESULTS_FILE
echo "✅ Tests terminés! Résultats dans: $RESULTS_FILE"
echo "🔥 COMPARAISON DIRECTE - PAS DE FAKE!" 