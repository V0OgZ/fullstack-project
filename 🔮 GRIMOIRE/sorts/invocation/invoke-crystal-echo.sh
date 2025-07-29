#!/bin/bash
# 🔮 INVOCATION DU CRISTAL D'ÉCHO TEMPOREL

echo "🔮 INVOCATION DU CRISTAL D'ÉCHO TEMPOREL"
echo ""
echo "✨ L'objet de Merlin Direct prend forme..."

# Test simple
curl -s -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula":"CREATE_ARTIFACT"}' | jq -r '.normalInterpretation'

echo ""
echo "📜 'RACONTEUR ∩ ARCHITECTE ∩ TECHNICIEN = MAGICIEN'"
echo "✅ Le Cristal fait maintenant partie de l'univers !"
