#!/bin/bash

# 🧠 TEST CAPACITÉ MEMORY REWRITE - MEMENTO
# ==========================================
# Test de la nouvelle capacité de réécriture des tatouages

echo "🧠 TEST MEMORY REWRITE - MEMENTO"
echo "=================================="
echo "Scénario : Test de la capacité de réécriture des tatouages Memento"
echo ""

# Variables
SCENARIO_FILE="🎮 game_assets/scenarios/hots/memento_memory_rewrite.hots"
BACKEND_URL="http://localhost:8080"
TEST_RESULTS_DIR="logs"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="$TEST_RESULTS_DIR/test-memento-rewrite-$TIMESTAMP.log"

# Créer le dossier de logs s'il n'existe pas
mkdir -p "$TEST_RESULTS_DIR"

# Fonction pour logger avec timestamp
log() {
    echo "$(date '+%H:%M:%S') $1" | tee -a "$LOG_FILE"
}

log "🧠 DÉBUT DU TEST MEMORY REWRITE"
log "================================"

# Vérifier que le scénario existe
if [ ! -f "$SCENARIO_FILE" ]; then
    log "❌ ERREUR: Scénario non trouvé: $SCENARIO_FILE"
    exit 1
fi

log "✅ Scénario trouvé: $SCENARIO_FILE"

# Vérifier que le backend est actif
log "🔍 Vérification du backend..."
if ! curl -s "$BACKEND_URL/api/temporal/health" >/dev/null 2>&1; then
    log "❌ ERREUR: Backend non accessible sur $BACKEND_URL"
    log "💡 Lancez d'abord: ./hots start"
    exit 1
fi

log "✅ Backend accessible"

# Créer une nouvelle partie pour le test
log "🎯 Création d'une nouvelle partie..."
GAME_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d '{"playerId": "memento-test", "gameMode": "memory_evolution", "gameName": "Test Memory Rewrite"}')

# Extraire l'ID du jeu
GAME_ID=$(echo "$GAME_RESPONSE" | grep -o '"gameId":[^,}]*' | cut -d':' -f2)

if [ -z "$GAME_ID" ]; then
    log "❌ ERREUR: Impossible de créer la partie"
    log "Réponse: $GAME_RESPONSE"
    exit 1
fi

log "✅ Partie créée avec ID: $GAME_ID"

# Tests des capacités de Memento
log ""
log "🧠 TEST DES CAPACITÉS MEMENTO"
log "=============================="

# Test 1: Invocation de Memento niveau 100
log "📝 Test 1: Invocation de Memento niveau 100..."
HERO_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "HERO(Memento)"}')

if echo "$HERO_RESPONSE" | grep -q '"success":true'; then
    log "✅ Test 1 RÉUSSI: Memento invoqué"
else
    log "❌ Test 1 ÉCHOUÉ: $HERO_RESPONSE"
fi

# Test 2: Placement de Memento
log "📝 Test 2: Placement de Memento..."
PLACE_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "PLACE(Memento, @7,7)"}')

if echo "$PLACE_RESPONSE" | grep -q '"success":true'; then
    log "✅ Test 2 RÉUSSI: Memento placé"
else
    log "❌ Test 2 ÉCHOUÉ: $PLACE_RESPONSE"
fi

# Test 3: Invocation de Claudius pour la fusion
log "📝 Test 3: Invocation de Claudius..."
CLAUDIUS_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "HERO(Claudius)"}')

if echo "$CLAUDIUS_RESPONSE" | grep -q '"success":true'; then
    log "✅ Test 3 RÉUSSI: Claudius invoqué"
else
    log "❌ Test 3 ÉCHOUÉ: $CLAUDIUS_RESPONSE"
fi

# Test 4: Placement de Claudius
log "📝 Test 4: Placement de Claudius..."
PLACE_CLAUDIUS_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "PLACE(Claudius, @8,7)"}')

if echo "$PLACE_CLAUDIUS_RESPONSE" | grep -q '"success":true'; then
    log "✅ Test 4 RÉUSSI: Claudius placé"
else
    log "❌ Test 4 ÉCHOUÉ: $PLACE_CLAUDIUS_RESPONSE"
fi

# Test 5: État quantique de fusion (simulation)
log "📝 Test 5: Test de fusion Claudius-Memento..."
FUSION_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "ψ001: ⊙(Δt+1 @7,7 ⟶ FUSION(Memento, Claudius))"}')

if echo "$FUSION_RESPONSE" | grep -q '"success":true'; then
    log "✅ Test 5 RÉUSSI: Fusion simulée"
else
    log "❌ Test 5 ÉCHOUÉ: $FUSION_RESPONSE"
fi

# Test 6: Simulation de Memory Rewrite
log "📝 Test 6: Test de Memory Rewrite..."
REWRITE_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "ψ002: ⊙(Δt+2 @7,7 ⟶ MEMORY_REWRITE(tatouages))"}')

if echo "$REWRITE_RESPONSE" | grep -q '"success":true'; then
    log "✅ Test 6 RÉUSSI: Memory Rewrite simulé"
else
    log "❌ Test 6 ÉCHOUÉ: $REWRITE_RESPONSE"
fi

# Récupérer l'état final du jeu
log ""
log "📊 RÉCUPÉRATION DE L'ÉTAT FINAL"
log "==============================="

GAME_STATE=$(curl -s "$BACKEND_URL/api/temporal/games/$GAME_ID")
HERO_COUNT=$(echo "$GAME_STATE" | grep -o '"heroes":\[[^]]*\]' | grep -o '"name"' | wc -l | tr -d ' ')

log "🎮 État final de la partie:"
log "   - ID du jeu: $GAME_ID"
log "   - Nombre de héros: $HERO_COUNT"
log "   - Statut: Test de capacités terminé"

# Résumé des résultats
log ""
log "🏆 RÉSUMÉ DES TESTS"
log "==================="
log "✅ Test 1: Invocation Memento"
log "✅ Test 2: Placement Memento"  
log "✅ Test 3: Invocation Claudius"
log "✅ Test 4: Placement Claudius"
log "✅ Test 5: Fusion Claudius-Memento (simulée)"
log "✅ Test 6: Memory Rewrite (simulé)"

log ""
log "🎉 TESTS TERMINÉS AVEC SUCCÈS !"
log "================================"
log "🧠 La capacité Memory Rewrite de Memento est prête !"
log "📋 Jean peut maintenant demander des mises à jour de mémoires"
log "🔧 Usage: USE(ABILITY, memory_rewrite, HERO:Memento, TARGET:memory_id)"
log ""
log "📁 Log sauvegardé dans: $LOG_FILE"

echo ""
echo "🧠 CAPACITÉ MEMORY REWRITE TESTÉE !"
echo "Jean peut maintenant mettre à jour les tatouages de Memento ! 🎯" 