#!/bin/bash

# Script pour Jean - Vérifier son dossier unifié et les mises à jour

echo "🛋️ SALUT JEAN ! VOICI TON DOSSIER UNIFIÉ V2"
echo "=========================================="
echo ""
echo "📁 Structure du dossier 🚬 JEAN/:"
tree /workspace/JEAN -L 2 2>/dev/null || ls -la /workspace/🚬 JEAN/

echo ""
echo "📋 Dernières mises à jour (docs récents):"
head -20 /workspace/📖 docs/INDEX_DOCS_RECENTS_JEAN_12H.md | tail -15

echo ""
echo "🎯 Accès rapides:"
echo "  - README principal: /workspace/🚬 JEAN/README.md"
echo "  - Philosophie Canapé: /workspace/🚬 JEAN/PHILOSOPHIE/CANAPE_COSMIQUE.md"
echo "  - Citations: /workspace/🚬 JEAN/CITATIONS/DEPUIS_LE_CANAPE.md"
echo "  - GROFI Fusion: /workspace/🚬 JEAN/RELATIONS/GROFI_FUSION.md"
echo "  - Heroes of Time: /workspace/🚬 JEAN/CREATIONS/HEROES_OF_TIME.md"

echo ""
echo "✅ TOUT EST FUSIONNÉ ET À JOUR V2 !"
echo "🚬 Bonne lecture depuis le canapé cosmique !"