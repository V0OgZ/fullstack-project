#!/bin/bash
# 🧪 TESTS FONCTIONNELS DU MOTEUR
# Tester ce qui marche vraiment et identifier les bugs

API_URL="http://localhost:8080/api/magic-formulas/execute"

echo "🧪 TESTS FONCTIONNELS DU MOTEUR QUANTIQUE"
echo "========================================="
echo ""

# Variables globales pour tracking
TESTS_TOTAL=0
TESTS_PASS=0
TESTS_FAIL=0

# Fonction de test améliorée
test_formula() {
    local test_name=$1
    local payload=$2
    local expected_contains=$3
    
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    echo -n "[$TESTS_TOTAL] $test_name: "
    
    # Faire la requête
    response=$(curl -s -X POST $API_URL \
        -H "Content-Type: application/json" \
        -d "$payload" 2>/dev/null)
    
    # Vérifier si la réponse contient ce qu'on attend
    if echo "$response" | grep -q "$expected_contains"; then
        echo "✅ PASS"
        echo "   → Réponse: $(echo "$response" | jq -r '.normalInterpretation // .message' 2>/dev/null | head -c 80)"
        TESTS_PASS=$((TESTS_PASS + 1))
    else
        echo "❌ FAIL"
        echo "   → Expected: '$expected_contains'"
        echo "   → Got: $(echo "$response" | head -c 150)"
        TESTS_FAIL=$((TESTS_FAIL + 1))
    fi
    echo ""
}

echo "🔧 1. TESTS BASIQUES"
echo "==================="

test_formula \
    "Teleport simple" \
    '{"formula": "TELEPORT_HERO"}' \
    "téléporté avec succès"

test_formula \
    "Heal hero" \
    '{"formula": "HEAL_HERO"}' \
    "success"

test_formula \
    "Create item" \
    '{"formula": "CREATE_ITEM"}' \
    "success"

echo "🌀 2. TESTS QUANTIQUES"
echo "====================="

test_formula \
    "Créer univers (ψ001)" \
    '{"formula": "ψ001: ⊙(CREATE_UNIVERSE())"}' \
    "ψ001"

test_formula \
    "Créer monde de poche (ψ100)" \
    '{"formula": "ψ100: ⊙(CREATE_POCKET_WORLD(worldName:\"TEST\"))"}' \
    "ψ100"

test_formula \
    "Intrication quantique (ψ200)" \
    '{"formula": "ψ200: ⊙(ENTANGLE(hero1:\"Alice\", hero2:\"Bob\"))"}' \
    "ψ200"

echo "📊 3. TESTS PARADOXES"
echo "===================="

test_formula \
    "Paradoxe faible (0.1)" \
    '{"formula": "paradoxRisk: 0.1"}' \
    "paradox"

test_formula \
    "Paradoxe moyen (0.5)" \
    '{"formula": "paradoxRisk: 0.5"}' \
    "paradox"

test_formula \
    "Paradoxe critique (0.85)" \
    '{"formula": "paradoxRisk: 0.85"}' \
    "paradox"

echo "🎮 4. TESTS AVEC CONTEXTE"
echo "========================"

test_formula \
    "Teleport avec position" \
    '{"formula": "TELEPORT_HERO", "context": {"x": 10, "y": 20}}' \
    "success"

test_formula \
    "Créer héros avec nom" \
    '{"formula": "CREATE_HERO", "context": {"name": "TestHero", "class": "Mage"}}' \
    "success"

test_formula \
    "Artifact avec effet" \
    '{"formula": "CREATE_ARTIFACT", "context": {"name": "Quantum Sword", "effect": "DAMAGE_BOOST"}}' \
    "success"

echo "🚫 5. TESTS D'ERREURS"
echo "===================="

test_formula \
    "Formule vide devrait échouer" \
    '{"formula": ""}' \
    "Erreur"

test_formula \
    "Formule inconnue" \
    '{"formula": "NEXISTE_PAS_DU_TOUT"}' \
    "inconnue"

test_formula \
    "JSON malformé" \
    '{"formula": "ψ: ⊙((((("}' \
    "Erreur"

echo "🔮 6. TESTS AVANCÉS"
echo "==================="

test_formula \
    "Formule complexe imbriquée" \
    '{"formula": "ψ300: ⊙(COLLAPSE(SUPERPOSE(A, B, C)))"}' \
    "ψ300"

test_formula \
    "ER=EPR Wormhole" \
    '{"formula": "ψ201: ⊙(OPEN_WORMHOLE(from:\"A\", to:\"B\"))"}' \
    "ψ201"

test_formula \
    "Temporal loop" \
    '{"formula": "ψ400: ⊙(CREATE_TEMPORAL_LOOP(duration:5))"}' \
    "ψ400"

echo ""
echo "📈 RÉSUMÉ DES TESTS"
echo "==================="
echo "Total: $TESTS_TOTAL"
echo "✅ Pass: $TESTS_PASS"
echo "❌ Fail: $TESTS_FAIL"
echo "Taux de réussite: $(( TESTS_PASS * 100 / TESTS_TOTAL ))%"
echo ""

if [ $TESTS_FAIL -gt 0 ]; then
    echo "⚠️  IL Y A DES BUGS À CORRIGER !"
    echo "Relancer avec curl -v pour plus de détails"
else
    echo "🎉 TOUS LES TESTS PASSENT !"
fi 