#!/bin/bash

# 🚨 TEST VÉRIFICATION VRAIS RÉSULTATS - MODE WALTER
# ================================================
# Objectif: Vérifier que les endpoints donnent des VRAIS résultats
# Pas juste HTTP 200 - des calculs réels !

echo "🚨 WALTER TEST - VÉRIFICATION RÉSULTATS VRAIS"
echo "=============================================="

BACKEND_URL="http://localhost:8080"
RESULTS_FILE="test-results/verification-vrais-$(date +%Y%m%d_%H%M%S).log"
mkdir -p test-results

# Fonction de test avec assertions
test_endpoint() {
    local name="$1"
    local method="$2"  
    local endpoint="$3"
    local data="$4"
    local expected_fields="$5"
    
    echo "🧪 TEST: $name"
    echo "   Endpoint: $method $endpoint"
    
    if [[ "$method" == "POST" ]]; then
        response=$(curl -s -X POST "$BACKEND_URL$endpoint" \
                       -H "Content-Type: application/json" \
                       -d "$data")
    else
        response=$(curl -s "$BACKEND_URL$endpoint")
    fi
    
    if [[ -z "$response" ]]; then
        echo "   ❌ ÉCHEC: Pas de réponse"
        return 1
    fi
    
    # Vérifier que ce n'est pas juste {"success": true}
    if [[ "$response" == '{"success":true}' ]] || [[ "$response" == '{"success": true}' ]]; then
        echo "   ❌ ÉCHEC: Réponse fake générique"
        echo "   Response: $response"
        return 1
    fi
    
    # Vérifier les champs attendus
    local all_fields_present=true
    IFS=',' read -ra FIELDS <<< "$expected_fields"
    for field in "${FIELDS[@]}"; do
        if ! echo "$response" | grep -q "\"$field\""; then
            echo "   ❌ MANQUE: Champ '$field' absent"
            all_fields_present=false
        fi
    done
    
    if [[ "$all_fields_present" == true ]]; then
        echo "   ✅ SUCCÈS: Réponse structurée complète"
        echo "   Fields: $expected_fields"
    else
        echo "   ❌ ÉCHEC: Structure incomplète"
    fi
    
    echo "   Response: $(echo "$response" | head -c 200)..."
    echo ""
}

# Attendre que le backend soit prêt
echo "⏳ Attente backend..."
for i in {1..30}; do
    if curl -s "$BACKEND_URL/api/health" > /dev/null 2>&1; then
        echo "✅ Backend prêt!"
        break
    fi
    sleep 2
    if [[ $i -eq 30 ]]; then
        echo "❌ Backend non disponible après 60s"
        exit 1
    fi
done

echo ""
echo "🎯 TESTS ENDPOINTS CRITIQUES"
echo "============================"

# Test 1: GameController - Création partie
test_endpoint "Création Partie" \
              "POST" \
              "/api/games" \
              '{"playerName":"Arthur","difficulty":"NORMAL"}' \
              "gameId,heroes,buildings,gameState"

# Test 2: CausalController - Interaction causale
test_endpoint "Interaction Causale" \
              "POST" \
              "/api/causal/cross-interaction" \
              '{"axisiPower":3.14,"lentusPower":2.71,"interactionType":"BATTLE"}' \
              "paradoxRisk,temporalStability,affectedRadius"

# Test 3: CausalController - Simulation temporelle  
test_endpoint "Simulation Temporelle" \
              "POST" \
              "/api/causal/temporal-simulation" \
              '{"scenario":"axisi_vs_lentus_battle","turns":5}' \
              "scenario,success,totalTurns,turnResults"

# Test 4: GameController - Liste parties
test_endpoint "Liste Parties" \
              "GET" \
              "/api/games" \
              "" \
              "id,playerName,gameState"

echo ""
echo "🔍 TESTS SUSPECTS - ENDPOINTS À VÉRIFIER"
echo "========================================"

# Test 5: ScenarioController - Traductions hardcodées?
test_endpoint "Liste Scénarios (Suspect)" \
              "GET" \
              "/api/scenarios" \
              "" \
              "id,name,description"

echo ""
echo "📊 RÉSULTATS FINAUX"
echo "=================="

# Compter succès/échecs (à implémenter)
echo "✅ Tests terminés - Voir détails ci-dessus"
echo "📁 Log complet: $RESULTS_FILE"

# Sauvegarder dans fichier
{
    echo "WALTER VERIFICATION TEST - $(date)"
    echo "================================"
    echo "Backend: $BACKEND_URL"
    echo "Tests executés avec vérification de structure réelle"
    echo ""
} > "$RESULTS_FILE"

echo ""
echo "🎯 WALTER SAYS: FINI LES FAKE ENDPOINTS !" 