#!/bin/bash

echo "🎮 TEST SCÉNARIOS ULTRA SIMPLE"
echo "=============================="

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RESULTS_DIR="test-results/ultra-simple-${TIMESTAMP}"
mkdir -p "$RESULTS_DIR"

# Test de 3 scénarios simples
SCENARIOS=("bataille" "simple-game" "premiers_artefacts")

echo "📋 Test de ${#SCENARIOS[@]} scénarios"

SUCCESS_COUNT=0
TOTAL_COUNT=${#SCENARIOS[@]}

for scenario in "${SCENARIOS[@]}"; do
    echo ""
    echo "🔥 TEST: $scenario"
    echo "=================="
    
    MD_FILE="$RESULTS_DIR/${scenario}.md"
    
    echo "⚡ Exécution..."
    
    # Test direct sans timeout
    if ./hots scenario "$scenario" > "$MD_FILE" 2>&1; then
        echo "✅ SUCCÈS"
        echo -e "\n✅ SUCCÈS" >> "$MD_FILE"
        ((SUCCESS_COUNT++))
    else
        echo "❌ ERREUR"
        echo -e "\n❌ ERREUR" >> "$MD_FILE"
    fi
    
    echo "📄 Résultat dans: $MD_FILE"
done

echo ""
echo "🎉 TERMINÉ!"
echo "📈 Succès: $SUCCESS_COUNT/$TOTAL_COUNT"

# Afficher un résumé rapide
echo ""
echo "📊 RÉSUMÉ RAPIDE:"
for scenario in "${SCENARIOS[@]}"; do
    MD_FILE="$RESULTS_DIR/${scenario}.md"
    if grep -q "✅ SUCCÈS" "$MD_FILE" 2>/dev/null; then
        echo "  ✅ $scenario"
    else
        echo "  ❌ $scenario"
    fi
done

echo ""
echo "📂 Tous les résultats dans: $RESULTS_DIR" 