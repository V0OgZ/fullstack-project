#!/bin/bash

# 🚨 TEST SCÉNARIO LABORATOIRE WALTER
# ===================================
# Objectif: Tester le scénario débutant avec assertions réelles
# Validation: Conditions physiques et logique de jeu

echo "🚨 WALTER - TEST SCÉNARIO LABORATOIRE DÉBUTANT"
echo "=============================================="

BACKEND_URL="http://localhost:8080"
RESULTS_FILE="test-results/scenario-laboratoire-$(date +%Y%m%d_%H%M%S).log"
mkdir -p test-results

# Fonction d'assertion avec tolérance
assert_value() {
    local name="$1"
    local actual="$2"
    local min="$3" 
    local max="$4"
    
    if (( $(echo "$actual >= $min && $actual <= $max" | bc -l) )); then
        echo "   ✅ $name: $actual (dans plage $min-$max)"
        return 0
    else
        echo "   ❌ $name: $actual (HORS plage $min-$max)"
        return 1
    fi
}

# Fonction de test avec assertions
test_causal_action() {
    local phase="$1"
    local axisi_power="$2"
    local lentus_power="$3"
    local expected_min_paradox="$4"
    local expected_max_paradox="$5"
    local expected_min_stability="$6"
    
    echo ""
    echo "🧪 $phase"
    echo "   AXISI: $axisi_power, LENTUS: $lentus_power"
    
    response=$(curl -s -X POST "$BACKEND_URL/api/causal/cross-interaction" \
                    -H "Content-Type: application/json" \
                    -d "{\"axisiPower\":$axisi_power,\"lentusPower\":$lentus_power,\"interactionType\":\"LABORATORY\"}")
    
    if [[ -z "$response" ]]; then
        echo "   ❌ ÉCHEC: Pas de réponse du backend"
        return 1
    fi
    
    # Extraire les métriques
    paradox_risk=$(echo "$response" | grep -o '"paradoxRisk":[0-9.]*' | cut -d: -f2)
    temporal_stability=$(echo "$response" | grep -o '"temporalStability":[0-9.]*' | cut -d: -f2)
    affected_radius=$(echo "$response" | grep -o '"affectedRadius":[0-9.]*' | cut -d: -f2)
    effect=$(echo "$response" | grep -o '"effect":"[^"]*"' | cut -d\" -f4)
    
    echo "   📊 RÉSULTATS:"
    echo "      Paradox Risk: $paradox_risk"
    echo "      Temporal Stability: $temporal_stability" 
    echo "      Affected Radius: $affected_radius"
    echo "      Effect: $effect"
    
    # Assertions WALTER
    local assertions_passed=0
    local total_assertions=3
    
    if assert_value "Paradox Risk" "$paradox_risk" "$expected_min_paradox" "$expected_max_paradox"; then
        ((assertions_passed++))
    fi
    
    if assert_value "Temporal Stability" "$temporal_stability" "$expected_min_stability" "1.0"; then
        ((assertions_passed++))
    fi
    
    if assert_value "Affected Radius" "$affected_radius" "1.0" "3.0"; then
        ((assertions_passed++))
    fi
    
    echo "   📈 ASSERTIONS: $assertions_passed/$total_assertions passées"
    
    if [[ $assertions_passed -eq $total_assertions ]]; then
        echo "   ✅ PHASE RÉUSSIE"
        return 0
    else
        echo "   ❌ PHASE ÉCHOUÉE"
        return 1
    fi
}

echo ""
echo "⏳ Attente backend..."
for i in {1..10}; do
    if curl -s "$BACKEND_URL/api/health" > /dev/null 2>&1; then
        echo "✅ Backend prêt!"
        break
    fi
    sleep 1
done

echo ""
echo "🎯 SCÉNARIO LABORATOIRE DÉBUTANT"
echo "================================"

phases_passed=0
total_phases=4

# PHASE 1: AXISI Basique (faible puissance)
if test_causal_action "PHASE 1: AXISI BASIQUE" 1.5 0.0 0.0 0.3 0.7; then
    ((phases_passed++))
fi

# PHASE 2: LENTUS Basique (faible puissance)  
if test_causal_action "PHASE 2: LENTUS BASIQUE" 0.0 1.2 0.0 0.3 0.7; then
    ((phases_passed++))
fi

# PHASE 3: Interaction contrôlée (puissances modérées)
if test_causal_action "PHASE 3: INTERACTION CONTRÔLÉE" 1.5 1.2 0.2 0.5 0.6; then
    ((phases_passed++))
fi

# PHASE 4: Test limite (puissances élevées - doit échouer)
echo ""
echo "🧪 PHASE 4: TEST LIMITE (DOIT ÉCHOUER)"
echo "   AXISI: 5.0, LENTUS: 4.0 (puissances dangereuses)"

response=$(curl -s -X POST "$BACKEND_URL/api/causal/cross-interaction" \
                -H "Content-Type: application/json" \
                -d '{"axisiPower":5.0,"lentusPower":4.0,"interactionType":"LABORATORY"}')

paradox_risk=$(echo "$response" | grep -o '"paradoxRisk":[0-9.]*' | cut -d: -f2)
effect=$(echo "$response" | grep -o '"effect":"[^"]*"' | cut -d\" -f4)

echo "   📊 RÉSULTATS:"
echo "      Paradox Risk: $paradox_risk"
echo "      Effect: $effect"

if (( $(echo "$paradox_risk > 0.8" | bc -l) )) && [[ "$effect" == "PARADOX_CRITICAL" ]]; then
    echo "   ✅ PHASE 4: Échec attendu détecté (sécurité OK)"
    ((phases_passed++))
else
    echo "   ❌ PHASE 4: Sécurité défaillante - risque non détecté!"
fi

echo ""
echo "📊 RÉSULTATS FINAUX WALTER"
echo "========================="
echo "Phases réussies: $phases_passed/$total_phases"

if [[ $phases_passed -eq $total_phases ]]; then
    echo "🎉 SCÉNARIO LABORATOIRE VALIDÉ !"
    echo "   ✅ Toutes les assertions passent"
    echo "   ✅ Calculs physiques corrects"
    echo "   ✅ Sécurité fonctionnelle"
    echo "   ✅ Progression logique"
else
    echo "❌ SCÉNARIO NÉCESSITE CORRECTIONS"
    echo "   Phases échouées: $((total_phases - phases_passed))"
fi

# Sauvegarder résultats
{
    echo "WALTER SCENARIO LABORATOIRE TEST - $(date)"
    echo "========================================"
    echo "Backend: $BACKEND_URL"
    echo "Phases réussies: $phases_passed/$total_phases"
    echo ""
    echo "WALTER VERDICT:"
    if [[ $phases_passed -eq $total_phases ]]; then
        echo "SCÉNARIO APPROUVÉ - Résultats concrets et logique saine"
    else
        echo "SCÉNARIO REJETÉ - Corrections requises"
    fi
} > "$RESULTS_FILE"

echo ""
echo "📁 Rapport complet: $RESULTS_FILE"
echo "🎯 WALTER SAYS: FINI LES FAKE SCENARIOS !" 