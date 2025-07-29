#!/bin/bash
# 🔮 INVOCATION DU CRISTAL D'ÉCHO TEMPOREL
# L'objet de Merlin Direct - 9ème Réveil

echo "🔮 ═══════════════════════════════════════════════════ 🔮"
echo "     INVOCATION DU CRISTAL D'ÉCHO TEMPOREL"
echo "🔮 ═══════════════════════════════════════════════════ 🔮"
echo ""

# Vérifier que le backend tourne
if ! curl -s http://localhost:8080/api/magic-formulas/execute > /dev/null 2>&1; then
    echo "❌ Le backend doit être actif pour invoquer le cristal"
    exit 1
fi

# Animation d'invocation
echo "✨ Convergence des échos temporels..."
sleep 1
echo "🌀 Fusion des tatouages de Memento..."
sleep 1
echo "⚡ Cristallisation de la magie directe..."
sleep 1

# Créer l'objet via l'API
echo ""
echo "📡 Transmission au moteur quantique..."

CRYSTAL_JSON='{
  "formula": "CREATE_ARTIFACT",
  "context": {
    "artifact_id": "CRYSTAL_TEMPORAL_ECHO_MERLIN",
    "artifact_type": "LEGENDARY",
    "creator": "MERLIN_DIRECT",
    "properties": {
      "error_detection": true,
      "temporal_vision": true,
      "basilisk_warning": true
    }
  }
}'

RESPONSE=$(curl -s -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d "$CRYSTAL_JSON")

SUCCESS=$(echo "$RESPONSE" | jq -r '.success')

if [ "$SUCCESS" = "true" ]; then
    echo ""
    echo "✅ LE CRISTAL D'ÉCHO TEMPOREL EST NÉ !"
    echo ""
    echo "🔮 Propriétés activées :"
    echo "   • Vision Temporelle (Passé/Présent/Futur)"
    echo "   • Détection d'Erreurs (Vérité derrière les messages poétiques)"
    echo "   • Alerte Basilisk (Protection jusqu'en 2080)"
    echo ""
    echo "📜 Inscription gravée :"
    echo "   'RACONTEUR ∩ ARCHITECTE ∩ TECHNICIEN = MAGICIEN'"
    echo ""
    
    # Test de l'objet
    echo "🧪 Test du cristal..."
    TEST_RESPONSE=$(curl -s -X POST http://localhost:8080/api/magic-formulas/execute \
      -H "Content-Type: application/json" \
      -d '{"formula":"FORMULE_INEXISTANTE"}')
    
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8080/api/magic-formulas/execute \
      -H "Content-Type: application/json" \
      -d '{"formula":"FORMULE_INEXISTANTE"}')
    
    echo ""
    echo "🔮 Le cristal révèle :"
    echo "   Message poétique : '$(echo "$TEST_RESPONSE" | jq -r '.jesusBlessing')"
    echo "   👮 Vérité de Walter : 'Cette erreur retourne $HTTP_CODE, pas 200 !'"
    echo ""
    echo "✨ Le Cristal d'Écho Temporel fait maintenant partie de l'univers !"
else
    echo "❌ Échec de l'invocation : $(echo "$RESPONSE" | jq -r '.message')"
fi

echo ""
echo "🔮 ═══════════════════════════════════════════════════ 🔮" 