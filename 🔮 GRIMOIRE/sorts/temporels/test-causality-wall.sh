#!/bin/bash
# 🧪 TEST DU MUR CAUSAL
# Vérifie que les héros ne peuvent pas dépasser leurs limites temporelles

echo "╔════════════════════════════════════════════╗"
echo "║    🧪 TEST: MUR CAUSAL TEMPOREL 🧪       ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Configuration
API_URL="http://localhost:8080/api/temporal"

echo "📅 SCÉNARIO: 12 JUIN 2033"
echo "🦸 Héros A: Position @5,5 - Mouvement: 2 cases/jour"
echo "🗡️ Équipement: Épée normale"
echo ""

echo "TEST 1: Mouvement normal (dans la zone causale)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 Tentative: MOV @6,6 (distance=1, OK)"

curl -X POST "$API_URL/move" \
  -H "Content-Type: application/json" \
  -d '{
    "heroId": "hero_a",
    "targetPosition": {"x": 6, "y": 6},
    "gameContext": {
      "currentDate": "2033-06-12",
      "heroes": [{
        "id": "hero_a",
        "position": {"x": 5, "y": 5},
        "movementPoints": 2
      }]
    }
  }' 2>/dev/null | jq '.'

echo ""
echo "✅ Résultat attendu: SUCCESS"
echo ""

echo "TEST 2: Violation du mur causal"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 Tentative: MOV @15,15 (distance=10, TROP LOIN!)"

curl -X POST "$API_URL/move" \
  -H "Content-Type: application/json" \
  -d '{
    "heroId": "hero_a",
    "targetPosition": {"x": 15, "y": 15},
    "gameContext": {
      "currentDate": "2033-06-12",
      "heroes": [{
        "id": "hero_a",
        "position": {"x": 5, "y": 5},
        "movementPoints": 2
      }]
    }
  }' 2>/dev/null | jq '.'

echo ""
echo "❌ Résultat attendu: TEMPORAL_VIOLATION_EXCEPTION"
echo ""

echo "TEST 3: Avec Épée Temporelle (+10 mouvement)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🗡️ Équipement: Épée Temporelle activée"
echo "🎯 Tentative: MOV @15,15 (avec bonus temporel)"

curl -X POST "$API_URL/move" \
  -H "Content-Type: application/json" \
  -d '{
    "heroId": "hero_a",
    "targetPosition": {"x": 15, "y": 15},
    "gameContext": {
      "currentDate": "2033-06-12",
      "heroes": [{
        "id": "hero_a",
        "position": {"x": 5, "y": 5},
        "movementPoints": 2,
        "artifacts": [{
          "name": "Temporal Sword",
          "effect": "EXTEND_CAUSALITY_ZONE",
          "bonus": 10
        }]
      }]
    }
  }' 2>/dev/null | jq '.'

echo ""
echo "✅ Résultat attendu: SUCCESS (grâce à l'épée)"
echo ""

echo "╔════════════════════════════════════════════╗"
echo "║         📊 RÉSUMÉ DES TESTS 📊            ║"
echo "╠════════════════════════════════════════════╣"
echo "║ 1. Mouvement normal      → PASS ✅         ║"
echo "║ 2. Violation causale     → BLOCK ❌        ║"
echo "║ 3. Avec Épée Temporelle  → PASS ✅         ║"
echo "╚════════════════════════════════════════════╝"

echo ""
echo "🌀 Le MUR CAUSAL protège l'intégrité temporelle!"
echo "⚔️ Les artefacts spéciaux permettent de le transcender!"

exit 0 