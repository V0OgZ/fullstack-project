#!/bin/bash
# 🌀🌫️ Test complet ER=EPR + Fog of War
# Par : MERLIN  
# Date : 2025-01-29
# Mission : Tester le scénario complet de Vince Vega

API_URL="http://localhost:8080/api/magic-formulas/execute"
GAME_ID="vince-complete-test-$(date +%s)"

echo "🌀🌫️ TEST COMPLET : VINCE VEGA ER=EPR + FOG OF WAR"
echo "=================================================="
echo "Game ID: $GAME_ID"
echo ""

# Fonction helper pour formater les résultats
show_result() {
    local step="$1"
    local response="$2"
    echo -e "\n${step}"
    echo "$response" | jq -r '.normalInterpretation // .error // .'
    echo "---"
}

# PHASE 1: SETUP DES MONDES
echo "📍 PHASE 1: CRÉATION DES POCKET WORLDS"

# Créer Alpha World
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ500: ⊙(CREATE_POCKET_WORLD(Alpha) ⟶ FOG_ENABLED)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"worldSettings\": {
        \"size\": \"20x20\",
        \"fogDensity\": 0.8,
        \"quantumResonance\": true
      }
    }
  }")
show_result "1️⃣ Création Alpha World" "$response"

# Créer Beta World
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ501: ⊙(CREATE_POCKET_WORLD(Beta) ⟶ FOG_ENABLED)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"worldSettings\": {
        \"size\": \"20x20\",
        \"fogDensity\": 0.9,
        \"quantumResonance\": true
      }
    }
  }")
show_result "2️⃣ Création Beta World" "$response"

# PHASE 2: PLACEMENT DES ACTEURS
echo -e "\n📍 PHASE 2: PLACEMENT DES ACTEURS"

# Placer Vince dans Alpha
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ502: ⊙(PLACE_HERO(Vince, @5,5, Alpha) ⟶ QUANTUM_READY)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"hero\": {
        \"id\": \"Vince\",
        \"weapon\": \"Dimensional_Gun_ER\",
        \"visionRadius\": 3
      }
    }
  }")
show_result "3️⃣ Placement de Vince dans Alpha" "$response"

# Placer Target dans Beta (caché)
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ503: ⊙(PLACE_TARGET(MrOrange, @15,15, Beta) ⟶ HIDDEN_IN_FOG)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"target\": {
        \"id\": \"MrOrange\",
        \"type\": \"ENEMY\",
        \"stealthLevel\": 5
      }
    }
  }")
show_result "4️⃣ Placement de la cible dans Beta" "$response"

# PHASE 3: ÉTABLIR L'INTRICATION QUANTIQUE
echo -e "\n📍 PHASE 3: INTRICATION QUANTIQUE EPR"

response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ504: ⊙(ENTANGLE(Vince, MrOrange) ⟶ EPR_LINK)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"entanglementType\": \"CROSS_DIMENSIONAL\",
      \"strength\": 0.95
    }
  }")
show_result "5️⃣ Création intrication EPR" "$response"

# PHASE 4: TENTATIVE DE DÉTECTION NORMALE
echo -e "\n📍 PHASE 4: TESTS DE DÉTECTION"

# Détection normale (doit échouer)
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ505: ⊙(DETECT_NORMAL(Vince, MrOrange) ⟶ CHECK)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"method\": \"STANDARD_VISION\"
    }
  }")
show_result "6️⃣ Détection normale (devrait échouer)" "$response"

# Détection quantique via EPR
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ506: ⊙(DETECT_QUANTUM(Vince, MrOrange) ⟶ EPR_LOCATE)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"method\": \"ENTANGLEMENT_SCAN\"
    }
  }")
show_result "7️⃣ Détection quantique EPR" "$response"

# PHASE 5: OUVERTURE DU WORMHOLE
echo -e "\n📍 PHASE 5: CRÉATION DU PONT ER"

response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ507: ⊙(OPEN_WORMHOLE(Alpha@5,5 ⟷ Beta@15,15) ⟶ ER_BRIDGE)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"stabilityRequired\": 0.7,
      \"energyCost\": 100
    }
  }")
show_result "8️⃣ Ouverture wormhole ER" "$response"

# PHASE 6: TIR QUANTIQUE
echo -e "\n📍 PHASE 6: TIR TRANS-DIMENSIONNEL"

response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ508: ⊙(QUANTUM_SHOT(Vince → MrOrange) ⟶ THROUGH_DIMENSIONS)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"weapon\": \"Dimensional_Gun_ER\",
      \"bypassFog\": true,
      \"useEntanglement\": true
    }
  }")
show_result "9️⃣ Tir quantique de Vince" "$response"

# PHASE 7: EFFONDREMENT ET CONFIRMATION
echo -e "\n📍 PHASE 7: EFFONDREMENT DE LA FONCTION D'ONDE"

response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ509: ⊙(COLLAPSE_WAVE(MrOrange) ⟶ REALITY_LOCK)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"collapseType\": \"DAMAGE_CONFIRMATION\"
    }
  }")
show_result "🔟 Effondrement de la cible" "$response"

# PHASE 8: TRAVERSÉE DU WORMHOLE
echo -e "\n📍 PHASE 8: TRAVERSÉE DIMENSIONNELLE"

response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ510: ⊙(TRAVERSE_WORMHOLE(Vince, Alpha → Beta) ⟶ DIMENSION_JUMP)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"preserveEntanglement\": true
    }
  }")
show_result "1️⃣1️⃣ Traversée du wormhole" "$response"

# PHASE 9: VÉRIFICATION FINALE
echo -e "\n📍 PHASE 9: VÉRIFICATIONS FINALES"

# Vérifier position de Vince
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ511: ⊙(GET_POSITION(Vince) ⟶ CONFIRM)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\"
    }
  }")
show_result "1️⃣2️⃣ Position actuelle de Vince" "$response"

# Vérifier ER=EPR
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ999: ⊙(VERIFY(ER_EQUALS_EPR) ⟶ QUANTUM_PROOF)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"checkAll\": true
    }
  }")
show_result "1️⃣3️⃣ Vérification ER=EPR" "$response"

# PHASE 10: RAPPORT FINAL
echo -e "\n📍 PHASE 10: RAPPORT DE MISSION"

response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"formula\": \"ψ512: ⊙(MISSION_REPORT() ⟶ SUMMARY)\",
    \"context\": {
      \"gameId\": \"$GAME_ID\",
      \"metrics\": [
        \"shots_fired\",
        \"dimensions_crossed\",
        \"fog_penetration\",
        \"entanglement_stability\",
        \"paradox_level\"
      ]
    }
  }")
show_result "1️⃣4️⃣ Rapport de mission" "$response"

echo -e "\n✅ TEST COMPLET TERMINÉ !"
echo "📊 Résultats sauvegardés dans les logs du serveur" 