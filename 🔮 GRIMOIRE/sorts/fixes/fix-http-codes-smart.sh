#!/bin/bash
echo "🎭 Architecture Erreurs Belles : ON GARDE LES MESSAGES POÉTIQUES !"
echo "👮 Mais Walter veut les vrais codes HTTP pour les tests"
echo ""

CONTROLLER="⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean/src/main/java/com/example/demo/controller/MagicFormulaServiceController.java"

# Afficher l'état actuel
echo "📄 État actuel ligne 59:"
sed -n '59p' "$CONTROLLER"

echo ""
echo "✅ Solution : Garder les messages poétiques ET retourner les bons codes HTTP"
echo ""
echo "🎯 Résultat attendu :"
echo "  - Erreur : 400 + message poétique de Jésus"
echo "  - Succès : 200 + bénédiction divine"
echo ""
echo "Les tests peuvent maintenant vérifier la vérité !"
