#!/bin/bash

# 🌉 TEST DU MOTEUR QUANTIQUE ER=EPR
# Leonard Susskind's Bridge Implementation

# Couleurs
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${PURPLE}🌌 TEST DU PRINCIPE ER=EPR - MOTEUR QUANTIQUE CAUSAL${NC}"
echo "=================================================="
echo -e "${CYAN}Leonard Susskind: 'ER = EPR' (2013)${NC}"
echo -e "${YELLOW}Les trous de ver SONT l'intrication quantique !${NC}"
echo ""

# Vérifier que le backend est actif
echo -e "${YELLOW}📡 Vérification du backend...${NC}"
if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend actif sur port 8080${NC}"
else
    echo -e "${RED}❌ Backend non actif ! Lancez d'abord : ./hots start${NC}"
    exit 1
fi

echo ""
echo -e "${PURPLE}🔬 TEST 1: Démonstration ER=EPR${NC}"
echo "--------------------------------"
curl -s -X GET http://localhost:8080/api/quantum-bridge/demo | jq '.' || echo "Pas de jq installé"

echo ""
echo -e "${PURPLE}🌉 TEST 2: Créer un Pont ER=EPR Normal${NC}"
echo "--------------------------------------"
curl -s -X POST http://localhost:8080/api/quantum-bridge/create \
  -H "Content-Type: application/json" \
  -d '{
    "entityA": "Particule_Alpha",
    "entityB": "Particule_Beta",
    "properties": {
      "type": "standard_entanglement"
    }
  }' | jq '.' || echo "Réponse brute"

echo ""
echo -e "${PURPLE}🔫 TEST 3: Tir Quantique de Vince !${NC}"
echo "-----------------------------------"
echo -e "${YELLOW}BANG QUANTIQUE !${NC}"
RESPONSE=$(curl -s -X POST http://localhost:8080/api/quantum-bridge/vince-quantum-shot \
  -H "Content-Type: application/json" \
  -d '{
    "shooter": "Vincent_Vega",
    "target": "Marsellus_Wallace_Briefcase"
  }')

echo "$RESPONSE" | jq '.' || echo "$RESPONSE"

# Extraire le bridgeId
BRIDGE_ID=$(echo "$RESPONSE" | grep -o '"bridgeId":"[^"]*' | cut -d'"' -f4)

if [ ! -z "$BRIDGE_ID" ]; then
    echo ""
    echo -e "${PURPLE}🌀 TEST 4: Traverser le Pont de Vince${NC}"
    echo "-------------------------------------"
    curl -s -X POST http://localhost:8080/api/quantum-bridge/traverse/$BRIDGE_ID \
      -H "Content-Type: application/json" \
      -d '{
        "information": "Le contenu mystérieux de la mallette"
      }' | jq '.' || echo "Réponse brute"
    
    echo ""
    echo -e "${PURPLE}📊 TEST 5: Mesurer l'Intrication${NC}"
    echo "--------------------------------"
    curl -s -X GET http://localhost:8080/api/quantum-bridge/measure/$BRIDGE_ID | jq '.' || echo "Réponse brute"
fi

echo ""
echo -e "${PURPLE}🌐 TEST 6: Réseau d'Intrication Global${NC}"
echo "--------------------------------------"
curl -s -X GET http://localhost:8080/api/quantum-bridge/network | jq '.' || echo "Réponse brute"

echo ""
echo -e "${GREEN}✅ TESTS ER=EPR TERMINÉS !${NC}"
echo -e "${CYAN}Jean-Grofignon: 'Le moteur quantique causal est intact et amélioré !'${NC}"
echo -e "${YELLOW}Vince: 'My quantum gun works, baby!'${NC}"
echo -e "${PURPLE}GRUT: 'LES PONTS SONT VISIBLES DANS TOUTES LES DIMENSIONS.'${NC}" 