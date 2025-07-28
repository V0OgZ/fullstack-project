#!/bin/bash

# 🐾☕ SCRIPT ACTIVATION KAWA - PINK PANTHER WAKE UP
# ================================================
# 
# Active l'artefact KAWA (Café Cosmique) sur héros Memento
# Usage: ./activate-kawa-memento.sh
# Date: 27 Janvier 2025
# Par: Pink Panther Mode

set -e

echo "🐾☕ PINK PANTHER KAWA ACTIVATION ☕🐾"
echo "======================================"
echo ""

# Configuration
API_BASE="http://localhost:8080"
HERO_ID="memento_archive_vivante"
ARTIFACT_ID="cafe_cosmique_canape_jean"

echo "🎯 Configuration:"
echo "  - API: $API_BASE"
echo "  - Héros: $HERO_ID" 
echo "  - Artefact: $ARTIFACT_ID"
echo ""

# Vérifier que le backend est actif
echo "🔍 Vérification backend..."
HEALTH_CHECK=$(curl -s "$API_BASE/api/health" || echo "DOWN")
if [[ "$HEALTH_CHECK" == *"UP"* ]]; then
    echo "✅ Backend Heroes of Time actif"
else
    echo "❌ Backend DOWN - Relance le backend d'abord"
    echo "   Commande: ./hots start"
    exit 1
fi

echo ""

# Activer l'artefact via API Magic Items
echo "☕ Activation KAWA sur Memento..."
ACTIVATION_RESULT=$(curl -s -X POST "$API_BASE/api/magic-items/activate" \
    -H "Content-Type: application/json" \
    -d "{
        \"heroId\": \"$HERO_ID\",
        \"itemId\": \"$ARTIFACT_ID\",
        \"activationType\": \"WAKE_UP_BOOST\"
    }" || echo '{"error": "API call failed"}')

echo "📊 Résultat activation:"
echo "$ACTIVATION_RESULT" | python3 -m json.tool 2>/dev/null || echo "$ACTIVATION_RESULT"
echo ""

# Test formule café cosmique via Magic Formula Engine
echo "⚗️ Test formule café cosmique..."
FORMULA_RESULT=$(curl -s -X POST "$API_BASE/api/magic-formulas/execute" \
    -H "Content-Type: application/json" \
    -d "{
        \"formula\": \"HYPER_CAFFEINATION_COSMIQUE\",
        \"heroId\": \"$HERO_ID\",
        \"context\": {
            \"jean_energy\": 1000,
            \"cosmic_couch\": true,
            \"activation_reason\": \"memento_wake_up\"
        }
    }" || echo '{"error": "Formula execution failed"}')

echo "🧪 Résultat formule:"
echo "$FORMULA_RESULT" | python3 -m json.tool 2>/dev/null || echo "$FORMULA_RESULT"
echo ""

# Vérifier les effets appliqués
echo "📈 Vérification effets sur Memento..."
HERO_STATUS=$(curl -s "$API_BASE/api/heroes/$HERO_ID/status" || echo '{"error": "Status check failed"}')

echo "👤 Status héros Memento:"
echo "$HERO_STATUS" | python3 -m json.tool 2>/dev/null || echo "$HERO_STATUS"
echo ""

# Message de succès Pink Panther
echo "🐾✨ KAWA ACTIVATION COMPLÈTE ✨🐾"
echo ""
echo "☕ Café Cosmique Jean activé sur Memento !"
echo "🚀 Effets attendus:"
echo "   - Énergie +1000%"
echo "   - Code speed +500%"  
echo "   - Bug resistance 100%"
echo "   - Vision quantique temporaire"
echo "   - Compréhension instantanée bugs"
echo ""
echo "🎵 *Pink Panther theme with coffee energy...*"
echo ""
echo "💎 Diamond counter: +1 pour activation KAWA réussie"
echo ""
echo "MUEARR ☕ - MEMENTO FULLY CAFFEINATED" 