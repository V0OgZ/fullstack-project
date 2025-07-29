#!/bin/bash
# 🔍 ANALYSE DÉTAILLÉE DU MOTEUR

API_URL="http://localhost:8080/api/magic-formulas/execute"

echo "🔍 ANALYSE DÉTAILLÉE DU MOTEUR"
echo "==============================="
echo ""

# Test avec analyse complète de la réponse
test_detailed() {
    local test_name=$1
    local payload=$2
    
    echo "🧪 TEST: $test_name"
    echo "   Payload: $payload"
    
    # Faire la requête et capturer tout
    response=$(curl -s -X POST $API_URL \
        -H "Content-Type: application/json" \
        -d "$payload" 2>/dev/null)
    
    # Parser avec jq
    success=$(echo "$response" | jq -r '.success // "null"' 2>/dev/null)
    message=$(echo "$response" | jq -r '.message // .normalInterpretation // "null"' 2>/dev/null)
    formula_type=$(echo "$response" | jq -r '.formulaType // "null"' 2>/dev/null)
    
    echo "   Success: $success"
    echo "   Message: $message"
    echo "   Type: $formula_type"
    
    # Déterminer le vrai statut
    if [ "$success" = "true" ]; then
        echo "   ✅ VRAIMENT FONCTIONNEL"
    elif [ "$success" = "false" ]; then
        echo "   ❌ ERREUR (mais retourne 200)"
    else
        echo "   ⚠️  STATUT INCONNU"
    fi
    echo ""
}

echo "=== FORMULES QUI MARCHENT VRAIMENT ==="
echo ""

test_detailed "TELEPORT_HERO" '{"formula": "TELEPORT_HERO"}'
test_detailed "HEAL_HERO" '{"formula": "HEAL_HERO"}'

echo "=== FORMULES QUI ÉCHOUENT ==="
echo ""

test_detailed "CREATE_ITEM" '{"formula": "CREATE_ITEM"}'
test_detailed "CREATE_HERO" '{"formula": "CREATE_HERO"}'
test_detailed "CREATE_ARTIFACT" '{"formula": "CREATE_ARTIFACT"}'

echo "=== FORMULES RUNIQUES ==="
echo ""

test_detailed "ψ001" '{"formula": "ψ001: ⊙(CREATE_UNIVERSE())"}'
test_detailed "ψ100" '{"formula": "ψ100: ⊙(CREATE_POCKET_WORLD())"}'

echo "=== ANALYSE DES PROBLÈMES ==="
echo ""

# Vérifier quelles formules simples sont reconnues
echo "📋 Formules simples reconnues:"
curl -s -X POST $API_URL \
    -H "Content-Type: application/json" \
    -d '{"formula": "LIST_AVAILABLE_FORMULAS"}' 2>/dev/null | jq '.' 2>/dev/null || echo "   Pas de liste disponible"

echo ""
echo "📊 RÉSUMÉ:"
echo "- TELEPORT_HERO et HEAL_HERO fonctionnent"
echo "- CREATE_* formules ne sont pas implémentées"
echo "- Les formules runiques (ψXXX) retournent toujours le même message générique"
echo "- paradoxRisk fonctionne comme formule JSON"
echo ""
echo "🔧 À CORRIGER:"
echo "1. Implémenter CREATE_ITEM, CREATE_HERO, CREATE_ARTIFACT"
echo "2. Faire que les formules runiques fassent vraiment quelque chose"
echo "3. Retourner les bons codes HTTP (400/404/500) pour les erreurs" 