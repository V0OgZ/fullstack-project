#!/bin/bash

echo "🎮 TEST SCÉNARIOS SIMPLES - GÉNÉRATION MD + EXÉCUTION"  
echo "===================================================="

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RESULTS_DIR="test-results/scenarios-${TIMESTAMP}"
mkdir -p "$RESULTS_DIR"

# Liste des scénarios à tester (sans le dossier scenarios/)
SCENARIOS=(
    "claudius_opus_demo.hots"
    "jean-memento-synergie-test.hots" 
    "fusion_temporelle_jean_claudius_memento.hots"
    "axis_vol_tresor_causal.hots"
    "test_quatrieme_mur.hots"
)

echo "📋 Scénarios à traiter: ${#SCENARIOS[@]}"

for scenario in "${SCENARIOS[@]}"; do
    if [[ ! -f "scenarios/$scenario" ]]; then
        echo "❌ Scénario manquant: $scenario"
        continue
    fi
    
    echo ""
    echo "🔥 TRAITEMENT: $scenario"
    echo "================================"
    
    # 1. Générer le MD
    echo "📝 Génération MD..."
    MD_FILE="$RESULTS_DIR/${scenario%.hots}.md"
    
    cat > "$MD_FILE" << EOF
# Scénario: ${scenario%.hots}

## Fichier Source
\`scenarios/$scenario\`

## Contenu HOTS
\`\`\`hots
$(cat "scenarios/$scenario")
\`\`\`

## Résultats d'Exécution

### Commande
\`\`\`bash
./hots scenario $scenario
\`\`\`

### Sortie
\`\`\`
EOF
    
    # 2. Exécuter le scénario  
    echo "⚡ Exécution..."
    if [[ -f "./hots" ]]; then
        timeout 30s ./hots scenario "$scenario" >> "$MD_FILE" 2>&1
        EXIT_CODE=$?
        
        if [[ $EXIT_CODE -eq 0 ]]; then
            echo "✅ Succès"
            echo "SUCCESS" >> "$MD_FILE"
        elif [[ $EXIT_CODE -eq 124 ]]; then
            echo "⏰ Timeout (30s)"
            echo "TIMEOUT (30s)" >> "$MD_FILE"
        else
            echo "❌ Erreur (code: $EXIT_CODE)"
            echo "ERROR (exit code: $EXIT_CODE)" >> "$MD_FILE"
        fi
    else
        echo "❌ Script ./hots introuvable"
        echo "ERROR: ./hots script not found" >> "$MD_FILE"
    fi
    
    # Fermer le bloc de code dans le MD
    cat >> "$MD_FILE" << EOF
\`\`\`

## Analyse

### Résultats Attendus
- Scénario doit se lancer sans erreur
- Affichage des états ψ (psi)
- Interactions temporelles fonctionnelles
- Pas de crash ou timeout

### Résultats Obtenus
$(if [[ $EXIT_CODE -eq 0 ]]; then echo "✅ SUCCÈS - Scénario exécuté correctement"; elif [[ $EXIT_CODE -eq 124 ]]; then echo "⏰ TIMEOUT - Scénario trop long ou bloqué"; else echo "❌ ERREUR - Problème d'exécution"; fi)

### Statut
$(if [[ $EXIT_CODE -eq 0 ]]; then echo "VALIDÉ ✅"; else echo "À CORRIGER ❌"; fi)

---
*Généré le $(date)*
EOF

    echo "📄 MD généré: $MD_FILE"
done

# Générer un rapport global
echo ""
echo "📊 GÉNÉRATION RAPPORT GLOBAL"
echo "============================"

GLOBAL_REPORT="$RESULTS_DIR/RAPPORT_GLOBAL.md"

cat > "$GLOBAL_REPORT" << EOF
# Rapport Global - Tests Scénarios HOTS

*Généré le $(date)*

## Résumé

| Scénario | Statut | Fichier MD |
|----------|---------|------------|
EOF

SUCCESS_COUNT=0
TOTAL_COUNT=${#SCENARIOS[@]}

for scenario in "${SCENARIOS[@]}"; do
    MD_FILE="${scenario%.hots}.md"
    if [[ -f "$RESULTS_DIR/$MD_FILE" ]]; then
        if grep -q "SUCCESS" "$RESULTS_DIR/$MD_FILE"; then
            echo "| $scenario | ✅ SUCCÈS | [$MD_FILE](./$MD_FILE) |" >> "$GLOBAL_REPORT"
            ((SUCCESS_COUNT++))
        elif grep -q "TIMEOUT" "$RESULTS_DIR/$MD_FILE"; then
            echo "| $scenario | ⏰ TIMEOUT | [$MD_FILE](./$MD_FILE) |" >> "$GLOBAL_REPORT"
        else
            echo "| $scenario | ❌ ERREUR | [$MD_FILE](./$MD_FILE) |" >> "$GLOBAL_REPORT"
        fi
    else
        echo "| $scenario | ❓ NON TESTÉ | - |" >> "$GLOBAL_REPORT"
    fi
done

cat >> "$GLOBAL_REPORT" << EOF

## Statistiques

- **Total**: $TOTAL_COUNT scénarios
- **Succès**: $SUCCESS_COUNT scénarios  
- **Taux de réussite**: $(( SUCCESS_COUNT * 100 / TOTAL_COUNT ))%

## Actions Recommandées

EOF

if [[ $SUCCESS_COUNT -eq $TOTAL_COUNT ]]; then
    echo "🎉 **TOUS LES SCÉNARIOS FONCTIONNENT!** Système stable." >> "$GLOBAL_REPORT"
elif [[ $SUCCESS_COUNT -gt $(( TOTAL_COUNT / 2 )) ]]; then
    echo "⚠️ **MAJORITÉ FONCTIONNELLE** - Corriger les scénarios en erreur." >> "$GLOBAL_REPORT"
else
    echo "🚨 **PROBLÈMES MAJEURS** - Révision complète nécessaire." >> "$GLOBAL_REPORT"
fi

echo ""
echo "✅ Tests terminés!"
echo "📂 Résultats dans: $RESULTS_DIR"
echo "📊 Rapport global: $GLOBAL_REPORT"
echo ""
echo "🔍 Pour voir un scénario:"
echo "   cat $RESULTS_DIR/[nom_scenario].md" 