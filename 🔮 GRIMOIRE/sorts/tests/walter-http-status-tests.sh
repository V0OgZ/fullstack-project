#!/bin/bash
# 👮 TESTS WALTER - VÉRIFICATION DES CODES HTTP
# "This is not 'Nam. There are rules!"

API_URL="http://localhost:8080/api/magic-formulas/execute"

echo "👮 WALTER HTTP STATUS TESTS"
echo "=========================="
echo "Les erreurs doivent retourner 400/404/500, pas 200 !"
echo ""

# Fonction de test avec vérification du status HTTP
test_http_status() {
    local test_name=$1
    local payload=$2
    local expected_status=$3
    
    echo -n "🧪 $test_name: "
    
    # Faire la requête et capturer le status HTTP
    response=$(curl -s -w "\n%{http_code}" -X POST $API_URL \
        -H "Content-Type: application/json" \
        -d "$payload")
    
    # Extraire le status code (dernière ligne)
    http_status=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    # Vérifier le status
    if [ "$http_status" = "$expected_status" ]; then
        echo "✅ PASS (Status: $http_status)"
    else
        echo "❌ FAIL - Expected: $expected_status, Got: $http_status"
        echo "   Response: $body" | head -n1
    fi
}

echo "=== 1. TESTS DES ERREURS 400 (Bad Request) ==="

test_http_status \
    "Formule vide" \
    '{"formula": ""}' \
    "400"

test_http_status \
    "Formule null" \
    '{"formula": null}' \
    "400"

test_http_status \
    "JSON invalide" \
    '{formula: bad json}' \
    "400"

test_http_status \
    "Formule mal formée" \
    '{"formula": "ψ(((("}' \
    "400"

echo ""
echo "=== 2. TESTS DES ERREURS 404 (Not Found) ==="

test_http_status \
    "Formule inexistante" \
    '{"formula": "ψ999999: NEXISTE_PAS"}' \
    "404"

test_http_status \
    "Héros inexistant" \
    '{"formula": "TELEPORT_HERO", "context": {"heroId": "FAKE_HERO_999"}}' \
    "404"

echo ""
echo "=== 3. TESTS DES ERREURS 500 (Server Error) ==="

test_http_status \
    "Division par zéro" \
    '{"formula": "ψDIV: ⊙(DIVIDE(1, 0))"}' \
    "500"

test_http_status \
    "Paradoxe extrême" \
    '{"formula": "paradoxRisk: 99.99"}' \
    "500"

echo ""
echo "=== 4. TESTS DES SUCCESS 200 (OK) ==="

test_http_status \
    "Formule valide simple" \
    '{"formula": "TELEPORT_HERO"}' \
    "200"

test_http_status \
    "Formule runique valide" \
    '{"formula": "ψ001: ⊙(CREATE_UNIVERSE())"}' \
    "200"

echo ""
echo "=== 📊 RÉSUMÉ WALTER ==="
echo "Si tout n'est pas ✅, le backend est CASSÉ !"
echo "'Mark it zero!' - Walter" 