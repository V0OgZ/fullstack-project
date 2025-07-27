#!/bin/bash

echo "🎮 TEST SCÉNARIOS DISPONIBLES - SIMPLE ET EFFICACE"
echo "================================================="

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RESULTS_DIR="test-results/scenarios-dispo-${TIMESTAMP}"
mkdir -p "$RESULTS_DIR"

# Scénarios à tester (noms simples sans extension)
SCENARIOS=(
    "bataille"
    "anthor"
    "simple-game" 
    "decouverte_brouillard"
    "premiers_artefacts"
    "epic-arthur-vs-ragnar"
    "quantum_maze"
    "memento_hero_test"
)

echo "📋 Test de ${#SCENARIOS[@]} scénarios"

SUCCESS_COUNT=0
TOTAL_COUNT=${#SCENARIOS[@]}

for scenario in "${SCENARIOS[@]}"; do
    echo ""
    echo "🔥 TEST: $scenario"
    echo "==================="
    
    MD_FILE="$RESULTS_DIR/${scenario}.md"
    
    # Générer le MD
    cat > "$MD_FILE" << EOF
# Test Scénario: $scenario

## Commande
\`\`\`bash
./hots scenario $scenario
\`\`\`

## Résultat
\`\`\`
EOF
    
    # Exécuter avec timeout de 60s
    echo "⚡ Exécution (60s max)..."
    timeout 60s ./hots scenario "$scenario" >> "$MD_FILE" 2>&1
    EXIT_CODE=$?
    
    # Fermer le bloc de code
    echo "\`\`\`" >> "$MD_FILE"
    
    if [[ $EXIT_CODE -eq 0 ]]; then
        echo "✅ SUCCÈS"
        echo -e "\n## Statut: ✅ SUCCÈS" >> "$MD_FILE"
        ((SUCCESS_COUNT++))
    elif [[ $EXIT_CODE -eq 124 ]]; then
        echo "⏰ TIMEOUT"
        echo -e "\n## Statut: ⏰ TIMEOUT (60s)" >> "$MD_FILE"
    else
        echo "❌ ERREUR (code: $EXIT_CODE)"
        echo -e "\n## Statut: ❌ ERREUR (exit code: $EXIT_CODE)" >> "$MD_FILE"
    fi
    
    echo "📄 MD: $MD_FILE"
done

# Rapport global
echo ""
echo "📊 GÉNÉRATION RAPPORT FINAL"
echo "=========================="

RAPPORT="$RESULTS_DIR/RAPPORT_FINAL.md"

cat > "$RAPPORT" << EOF
# Rapport Final - Tests Scénarios Disponibles

*Généré le $(date)*

## Résultats

| Scénario | Statut | Détails |
|----------|---------|---------|
EOF

for scenario in "${SCENARIOS[@]}"; do
    MD_FILE="${scenario}.md"
    if grep -q "✅ SUCCÈS" "$RESULTS_DIR/$MD_FILE" 2>/dev/null; then
        echo "| $scenario | ✅ SUCCÈS | [Voir détails](./$MD_FILE) |" >> "$RAPPORT"
    elif grep -q "⏰ TIMEOUT" "$RESULTS_DIR/$MD_FILE" 2>/dev/null; then
        echo "| $scenario | ⏰ TIMEOUT | [Voir détails](./$MD_FILE) |" >> "$RAPPORT"
    else
        echo "| $scenario | ❌ ERREUR | [Voir détails](./$MD_FILE) |" >> "$RAPPORT"
    fi
done

cat >> "$RAPPORT" << EOF

## Statistiques

- **Total testé**: $TOTAL_COUNT scénarios
- **Succès**: $SUCCESS_COUNT scénarios
- **Taux de réussite**: $(( SUCCESS_COUNT * 100 / TOTAL_COUNT ))%

## Conclusion

EOF

if [[ $SUCCESS_COUNT -eq $TOTAL_COUNT ]]; then
    echo "🎉 **PARFAIT!** Tous les scénarios fonctionnent." >> "$RAPPORT"
elif [[ $SUCCESS_COUNT -gt $(( TOTAL_COUNT / 2 )) ]]; then
    echo "👍 **BIEN** - La majorité des scénarios fonctionne." >> "$RAPPORT"
else
    echo "⚠️ **PROBLÈMES** - Plusieurs scénarios ne fonctionnent pas." >> "$RAPPORT"
fi

echo ""
echo "🎉 TERMINÉ!"
echo "📂 Résultats: $RESULTS_DIR"
echo "📊 Rapport: $RAPPORT"
echo "📈 Succès: $SUCCESS_COUNT/$TOTAL_COUNT ($(( SUCCESS_COUNT * 100 / TOTAL_COUNT ))%)" 