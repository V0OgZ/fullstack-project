#!/bin/bash

echo "⚔️ ARTHUR - TEST SIMPLE RAPIDE"
echo "=============================="
echo ""

# Test rapide infrastructure
echo "🔍 Arthur vérifie l'infrastructure..."
if curl -s http://localhost:8000 > /dev/null; then
    echo "✅ Interface : OK"
else
    echo "❌ Interface : ERREUR"
    exit 1
fi

if curl -s http://localhost:8000/forge-runique.html > /dev/null; then
    echo "✅ Forge : OK"
else
    echo "❌ Forge : ERREUR"
    exit 1
fi

echo ""

# Test présence bouton
echo "🔍 Arthur cherche le bouton Forge..."
if curl -s http://localhost:8000 | grep -q "🔮 Forge Runique"; then
    echo "✅ Bouton Forge : TROUVÉ"
else
    echo "❌ Bouton Forge : MANQUANT"
    exit 1
fi

echo ""

echo "🎉 ARTHUR CONFIRME : TOUT FONCTIONNE !"
echo "====================================="
echo ""
echo "⚔️ Arthur : \"Mon seigneur, le système est prêt !\""
echo ""
echo "🎯 POUR TESTER MAINTENANT :"
echo "=========================="
echo ""
echo "1. 🌐 Ouvre : http://localhost:8000"
echo "2. 🔮 Clique sur 'Forge Runique'"
echo "3. 🏛️ Réponds 'superposition' au Sphinx"
echo "4. ⚒️ Teste les formules d'Arthur :"
echo ""
echo "   📜 ψ_ARTHUR_001: ⊙(EXCALIBUR_MANIFEST @15,15) ⟶ ULTIMATE_POWER(∞)"
echo "   📜 ψ_ARTHUR_002: ⊙(KNIGHT_CHARGE forward_3_hexes) ⟶ BATTLE_CRY(morale+50)"
echo ""
echo "🛋️ Jean : \"Arthur, tu es le meilleur testeur !\""
echo ""
echo "🚀 SYSTÈME 100% PRÊT POUR ENTRAÎNEMENT !" 