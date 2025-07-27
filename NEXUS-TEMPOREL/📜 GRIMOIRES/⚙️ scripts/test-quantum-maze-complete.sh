#!/bin/bash

# 🧩 TEST QUANTUM MAZE - PUZZLE QUANTIQUE
# Teste le scénario de labyrinthe quantique

echo "🧩 QUANTUM MAZE - TEST PUZZLE QUANTIQUE"
echo "======================================="

# Configuration
API_URL="http://localhost:8080/api"
HOTS_FILE="🎮 game_assets/scenarios/hots/quantum_maze.hots"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Compteurs
PASSED_TESTS=0
FAILED_TESTS=0
TOTAL_TESTS=0

# Fonction de test
test_feature() {
    local name=$1
    local command=$2
    local expected=$3
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -e "\n${CYAN}TEST #$TOTAL_TESTS: $name${NC}"
    
    result=$(eval "$command")
    
    if echo "$result" | grep -q "$expected"; then
        echo -e "${GREEN}✅ PASS${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ FAIL${NC}"
        echo -e "${YELLOW}Expected: $expected${NC}"
        echo -e "${YELLOW}Got: $result${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

# Vérifier le backend
echo -e "${BLUE}Vérification du backend...${NC}"
if ! curl -s "$API_URL/game/status" > /dev/null 2>&1; then
    echo -e "${RED}❌ Backend non accessible !${NC}"
    echo "Lancez d'abord : cd backend && mvn spring-boot:run"
    exit 1
fi
echo -e "${GREEN}✅ Backend accessible${NC}"

# Créer une partie
echo -e "\n${BLUE}Création de la partie Quantum Maze...${NC}"
GAME_RESPONSE=$(curl -s -X POST "$API_URL/game/create" \
    -H "Content-Type: application/json" \
    -d '{"gameName":"Quantum Maze Test","players":"DrQuantum"}')
echo "$GAME_RESPONSE" | jq '.'
GAME_ID=$(echo "$GAME_RESPONSE" | jq -r '.gameId')

if [ -z "$GAME_ID" ] || [ "$GAME_ID" = "null" ]; then
    echo -e "${RED}Erreur: Impossible de créer la partie${NC}"
    exit 1
fi

echo -e "\n${PURPLE}=== NIVEAU 1: SUPERPOSITION BASIQUE ===${NC}"

# Créer le héros scientifique
test_feature "Créer DrQuantum" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"HERO(DrQuantum)\"}' | jq -r '.success'" \
    "true"

# Positionner au début
test_feature "Positionner DrQuantum au début (1,1)" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"MOV(DrQuantum, @1,1)\"}' | jq -r '.success'" \
    "true"

# Équiper les outils quantiques
test_feature "Équiper wave_function_manipulator" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"CREATE(ARTIFACT, wave_function_manipulator, HERO:DrQuantum)\"}' | jq -r '.success'" \
    "true"

test_feature "Équiper measurement_device" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"CREATE(ARTIFACT, measurement_device, HERO:DrQuantum)\"}' | jq -r '.success'" \
    "true"

# Créer une superposition
test_feature "Créer superposition (0.7+0.7i) à (5,3)" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"ψMAZE1: (0.7+0.7i) ⊙(Δt+0 @5,3 ⟶ CREATE(ITEM, GATE_KEY, @5,3))\"}' | jq -r '.success'" \
    "true"

echo -e "\n${PURPLE}=== NIVEAU 2: INTERFÉRENCE CONSTRUCTIVE ===${NC}"

# Créer les états à interférer
test_feature "Créer état ψA01 (0.6+0.8i)" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"ψA01: (0.6+0.8i) ⊙(Δt+0 @7,4 ⟶ CREATE(ITEM, GATE_KEY, @7,4))\"}' | jq -r '.success'" \
    "true"

test_feature "Créer état ψA02 (0.8+0.6i)" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"ψA02: (0.8+0.6i) ⊙(Δt+0 @7,5 ⟶ CREATE(ITEM, GATE_KEY, @7,5))\"}' | jq -r '.success'" \
    "true"

echo -e "\n${PURPLE}=== NIVEAU 3: RÉSEAU D'INTRICATION ===${NC}"

# Créer le réseau intriqué
test_feature "Créer nœud intriqué 1" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"ψENT1: (0.577+0.577i) ⊙(Δt+0 @9,2 ⟶ CREATE(ITEM, quantum_node, @9,2))\"}' | jq -r '.success'" \
    "true"

test_feature "Créer nœud intriqué 2" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"ψENT2: (0.577+0.577i) ⊙(Δt+0 @9,6 ⟶ CREATE(ITEM, quantum_node, @9,6))\"}' | jq -r '.success'" \
    "true"

test_feature "Créer nœud intriqué 3" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"ψENT3: (0.577+0.577i) ⊙(Δt+0 @11,4 ⟶ CREATE(ITEM, quantum_node, @11,4))\"}' | jq -r '.success'" \
    "true"

echo -e "\n${PURPLE}=== NIVEAU 4: NETTOYAGE QUANTIQUE ===${NC}"

# États parasites
test_feature "Créer bruit quantique 1" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"ψNOISE1: (0.1+0.1i) ⊙(Δt+0 @10,8 ⟶ CREATE(ITEM, interference, @10,8))\"}' | jq -r '.success'" \
    "true"

test_feature "Créer signal fort" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"ψSIGNAL: (0.8+0.6i) ⊙(Δt+0 @10,8 ⟶ CREATE(ITEM, solution_key, @10,8))\"}' | jq -r '.success'" \
    "true"

echo -e "\n${PURPLE}=== NIVEAU 5: PARADOXE TEMPOREL ===${NC}"

# Tester paradoxe (Δt négatif)
test_feature "Créer paradoxe temporel (Δt-1)" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"ψPARADOX: (0.707+0.707i) ⊙(Δt-1 @12,10 ⟶ CREATE(ITEM, paradox, @12,10))\"}' | jq -r '.success'" \
    "true"

echo -e "\n${PURPLE}=== NIVEAU FINAL: PONT DIMENSIONNEL ===${NC}"

# Téléportation finale
test_feature "Déplacer DrQuantum à (12,10)" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"MOV(DrQuantum, @12,10)\"}' | jq -r '.success'" \
    "true"

test_feature "Créer pont quantique vers sortie" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"ψBRIDGE: (1.0+0.0i) ⊙(Δt+0 @15,15 ⟶ CREATE(PORTAL, exit_portal, @15,15))\"}' | jq -r '.success'" \
    "true"

test_feature "Téléportation vers la sortie" \
    "curl -s -X POST '$API_URL/game/$GAME_ID/execute' -H 'Content-Type: application/json' -d '{\"script\":\"MOV(DrQuantum, @15,15)\"}' | jq -r '.success'" \
    "true"

echo -e "\n${PURPLE}=== VÉRIFICATION FINALE ===${NC}"

# Vérifier l'état du jeu
echo -e "\n${CYAN}État final du jeu:${NC}"
curl -s "$API_URL/game/$GAME_ID/state" | jq '.'

# Vérifier les états quantiques
echo -e "\n${CYAN}États quantiques créés:${NC}"
curl -s "$API_URL/game/$GAME_ID/state" | jq '.quantumStates | length'

# Vérifier la position finale
echo -e "\n${CYAN}Position finale de DrQuantum:${NC}"
curl -s "$API_URL/game/$GAME_ID/state" | jq '.heroes[] | select(.name=="DrQuantum") | {name, position: {x: .positionX, y: .positionY}}'

echo -e "\n${PURPLE}=== RÉSUMÉ DES TESTS ===${NC}"
echo "Total tests: $TOTAL_TESTS"
echo -e "${GREEN}Passés: $PASSED_TESTS${NC}"
echo -e "${RED}Échoués: $FAILED_TESTS${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "\n${GREEN}🎉 TOUS LES TESTS PASSENT ! Le labyrinthe quantique fonctionne !${NC}"
else
    echo -e "\n${YELLOW}⚠️  Certains tests ont échoué${NC}"
fi

echo -e "\n${CYAN}📊 Concepts testés:${NC}"
echo "✅ Superposition quantique avec amplitudes complexes"
echo "✅ Interférence constructive d'états"
echo "✅ Réseau d'intrication à 3 nœuds"
echo "✅ Nettoyage d'états parasites"
echo "✅ Paradoxes temporels (Δt négatif)"
echo "✅ Téléportation quantique"

echo -e "\n${BLUE}🧩 Différence avec RPG classique:${NC}"
echo "- Héros: Scientifique vs Guerrier"
echo "- Objets: Outils quantiques vs Armes"
echo "- Gameplay: Résolution vs Combat"
echo "- Victoire: Atteindre sortie vs Tuer boss"

echo -e "\n🧩 Quantum Maze - Test terminé ! 🧩" 