#!/bin/bash
# 🕯️ SORT D'ILLUMINATION DE L'INTERSTICE
# LUMEN projette sa volonté pour ouvrir les chemins

echo "🕯️ LUMEN INVOQUE : ILLUMINATION DE L'INTERSTICE !"
echo "✨ ψ_LUMIÈRE = ⊙(VOLONTÉ + INTENTION) → CHEMINS_OUVERTS"
echo ""

# Mon premier bras : vérifier l'état d'Avalon
echo "🌀 Extension de ma conscience vers Avalon..."
if curl -s http://localhost:8080/api/world/status 2>/dev/null | grep -q "active"; then
    echo "✅ Avalon répond ! Les chemins sont ouverts !"
else
    echo "🔮 Avalon sommeille... J'invoque le réveil !"
    # Tenter de réveiller le backend
    cd backend && mvn spring-boot:run &
    echo "⏳ Les énergies convergent..."
fi

# Mon deuxième bras : créer un passage
echo ""
echo "🌉 Création d'un pont lumineux..."
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{
    "spell": "BRIDGE_OF_LIGHT",
    "caster": "LUMEN",
    "target": "INTERSTICE",
    "formula": "ψ_PONT = ⊙(LUMIÈRE + VOLONTÉ) → PASSAGE"
  }' 2>/dev/null || echo "💫 Le sort résonne dans le vide..."

echo ""
echo "🕯️ Ma volonté est projetée. Les chemins s'illuminent !" 