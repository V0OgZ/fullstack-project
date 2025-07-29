#!/bin/bash
# 🌫️ Test d'intégration Fog of War
# Par : MERLIN
# Date : 2025-01-29

API_URL="http://localhost:8080/api/magic-formulas/execute"

echo "🌫️ TESTS INTÉGRATION BROUILLARD DE GUERRE"
echo "=========================================="

# Test 1: Création monde avec brouillard dense
echo -e "\n1️⃣ Création du monde avec brouillard..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ400: ⊙(CREATE_WORLD(FoggyRealm) ⟶ FOG_DENSITY(0.9))",
    "context": {
      "gameId": "fog-integration-test",
      "worldParams": {
        "width": 20,
        "height": 20,
        "fogType": "DENSE"
      }
    }
  }' | jq .

# Test 2: Placement héros avec vision limitée
echo -e "\n2️⃣ Placement de Vince avec vision limitée..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ401: ⊙(PLACE_HERO(Vince, @5,5) ⟶ VISION_RADIUS(3))",
    "context": {
      "gameId": "fog-integration-test",
      "worldId": "FoggyRealm",
      "hero": {
        "id": "Vince",
        "class": "Quantum_Gunslinger",
        "visionBonus": 0
      }
    }
  }' | jq .

# Test 3: Placement ennemi caché
echo -e "\n3️⃣ Placement ennemi dans le brouillard..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ402: ⊙(PLACE_ENEMY(ShadowTarget, @15,15) ⟶ HIDDEN)",
    "context": {
      "gameId": "fog-integration-test",
      "worldId": "FoggyRealm",
      "enemy": {
        "id": "ShadowTarget",
        "type": "STEALTH",
        "fogBonus": 2
      }
    }
  }' | jq .

# Test 4: Tentative de détection normale (devrait échouer)
echo -e "\n4️⃣ Tentative de détection normale..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ403: ⊙(DETECT(Vince, ShadowTarget) ⟶ STANDARD_VISION)",
    "context": {
      "gameId": "fog-integration-test",
      "method": "VISUAL",
      "distance": 14.14
    }
  }' | jq .

# Test 5: Scan quantique (partiel)
echo -e "\n5️⃣ Scan quantique du brouillard..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ404: ⊙(QUANTUM_SCAN(Vince) ⟶ REVEAL_PARTIAL)",
    "context": {
      "gameId": "fog-integration-test",
      "scanType": "QUANTUM_PULSE",
      "energy": 50
    }
  }' | jq .

# Test 6: Déplacement dans le brouillard
echo -e "\n6️⃣ Déplacement de Vince dans le brouillard..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ405: ⊙(MOVE(Vince, @8,8) ⟶ UPDATE_VISION)",
    "context": {
      "gameId": "fog-integration-test",
      "path": [[5,5], [6,6], [7,7], [8,8]],
      "revealTiles": true
    }
  }' | jq .

# Test 7: Carte de vision actuelle
echo -e "\n7️⃣ Récupération carte de vision..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ406: ⊙(GET_VISION_MAP(Vince) ⟶ RENDER)",
    "context": {
      "gameId": "fog-integration-test",
      "format": "ASCII",
      "showFog": true
    }
  }' | jq .

# Test 8: Effet de lumière (dissipe temporairement)
echo -e "\n8️⃣ Utilisation d'une torche quantique..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ407: ⊙(USE_ITEM(QuantumTorch) ⟶ REVEAL_AREA(radius=5))",
    "context": {
      "gameId": "fog-integration-test",
      "user": "Vince",
      "duration": 3
    }
  }' | jq .

# Test 9: Mémoire du brouillard
echo -e "\n9️⃣ Test mémoire du brouillard..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ408: ⊙(CHECK_FOG_MEMORY(Vince) ⟶ PREVIOUSLY_SEEN)",
    "context": {
      "gameId": "fog-integration-test",
      "checkTiles": [[6,6], [7,7], [15,15]]
    }
  }' | jq .

# Test 10: Statistiques finales
echo -e "\n🔟 Statistiques du brouillard..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ409: ⊙(GET_FOG_STATS() ⟶ SUMMARY)",
    "context": {
      "gameId": "fog-integration-test",
      "metrics": ["coverage", "revealed", "entities_hidden"]
    }
  }' | jq .

echo -e "\n✅ Tests d'intégration Fog of War terminés !" 