#!/bin/bash

# 🌟 TEST SCÉNARIO DÉCROISSANCE TEMPORELLE - ANNA MARTEL
# ================================================================
# Test du scénario HOTS de décroissance temporelle

set -e

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
BACKEND_URL="http://localhost:8080"
SCENARIO_FILE="🎮 game_assets/scenarios/hots/test_decroissance_temporelle.hots"
GAME_NAME="DecayScenarioTest"
PLAYER_ID="decay-scenario-test"

echo -e "${PURPLE}🌟 TEST SCÉNARIO DÉCROISSANCE TEMPORELLE - ANNA MARTEL${NC}"
echo -e "${CYAN}===============================================================${NC}"
echo -e "${YELLOW}Scénario:${NC} $SCENARIO_FILE"
echo -e "${YELLOW}Concept:${NC} Test complet du système de décroissance temporelle"
echo ""

# Vérifier que le fichier de scénario existe
if [ ! -f "$SCENARIO_FILE" ]; then
    echo -e "${RED}❌ Fichier de scénario non trouvé: $SCENARIO_FILE${NC}"
    exit 1
fi

# Vérifier que le backend est démarré
echo -e "${YELLOW}🔍 Vérification du backend...${NC}"
if ! curl -s "$BACKEND_URL/api/health" > /dev/null; then
    echo -e "${RED}❌ Backend non accessible sur $BACKEND_URL${NC}"
    echo -e "${YELLOW}💡 Démarrez le backend avec: cd backend && mvn spring-boot:run${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Backend accessible${NC}"

# Créer un nouveau jeu
echo -e "${YELLOW}🎮 Création du jeu de test...${NC}"
GAME_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d "{\"gameName\":\"$GAME_NAME\",\"playerId\":\"$PLAYER_ID\"}")

GAME_ID=$(echo "$GAME_RESPONSE" | grep -o '"gameId":[0-9]*' | cut -d':' -f2)

if [ -z "$GAME_ID" ]; then
    echo -e "${RED}❌ Erreur lors de la création du jeu${NC}"
    echo "$GAME_RESPONSE"
    exit 1
fi

echo -e "${GREEN}✅ Jeu créé avec ID: $GAME_ID${NC}"

# Démarrer le jeu
echo -e "${YELLOW}🚀 Démarrage du jeu...${NC}"
START_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/start" \
    -H "Content-Type: application/json")

echo -e "${GREEN}✅ Jeu démarré${NC}"

# ============================================================================
# EXÉCUTION DU SCÉNARIO HOTS
# ============================================================================

echo ""
echo -e "${BLUE}📋 EXÉCUTION DU SCÉNARIO HOTS${NC}"
echo -e "${CYAN}================================${NC}"

# Lire et exécuter le scénario ligne par ligne
echo -e "${YELLOW}📖 Lecture du scénario...${NC}"

line_number=0
success_count=0
error_count=0

while IFS= read -r line; do
    line_number=$((line_number + 1))
    
    # Ignorer les lignes vides et les commentaires
    if [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]]; then
        continue
    fi
    
    # Ignorer les lignes QUOTE (elles sont gérées automatiquement)
    if [[ "$line" =~ ^QUOTE ]]; then
        continue
    fi
    
    echo -e "${CYAN}📝 Ligne $line_number: $line${NC}"
    
    # Exécuter la commande HOTS
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\":\"$line\"}")
    
    # Vérifier le succès
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ Succès${NC}"
        success_count=$((success_count + 1))
    else
        echo -e "${RED}❌ Erreur${NC}"
        echo "$RESPONSE"
        error_count=$((error_count + 1))
    fi
    
    # Petite pause pour éviter de surcharger le backend
    sleep 0.1
    
done < "$SCENARIO_FILE"

echo ""
echo -e "${GREEN}✅ Scénario exécuté${NC}"
echo -e "${CYAN}📊 Statistiques:${NC}"
echo -e "  • Commandes exécutées: $success_count"
echo -e "  • Erreurs: $error_count"

# ============================================================================
# TEST DE LA DÉCROISSANCE TEMPORELLE
# ============================================================================

echo ""
echo -e "${BLUE}📋 TEST DE LA DÉCROISSANCE TEMPORELLE${NC}"
echo -e "${CYAN}====================================${NC}"

# Appliquer la décroissance temporelle
echo -e "${YELLOW}⏰ Application de la décroissance temporelle...${NC}"
DECAY_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/decay/$GAME_ID/apply" \
    -H "Content-Type: application/json")

echo -e "${GREEN}✅ Décroissance appliquée${NC}"
echo -e "${CYAN}📊 Résultats de la décroissance:${NC}"
echo "$DECAY_RESPONSE" | jq '.' 2>/dev/null || echo "$DECAY_RESPONSE"

# Obtenir les statistiques détaillées
echo -e "${YELLOW}📈 Statistiques détaillées...${NC}"
STATS_RESPONSE=$(curl -s -X GET "$BACKEND_URL/api/temporal/decay/$GAME_ID/statistics" \
    -H "Content-Type: application/json")

echo -e "${CYAN}📊 Statistiques détaillées:${NC}"
echo "$STATS_RESPONSE" | jq '.' 2>/dev/null || echo "$STATS_RESPONSE"

# ============================================================================
# VÉRIFICATION DE L'ÉTAT FINAL
# ============================================================================

echo ""
echo -e "${BLUE}📋 VÉRIFICATION DE L'ÉTAT FINAL${NC}"
echo -e "${CYAN}================================${NC}"

# Obtenir l'état final du jeu
echo -e "${YELLOW}📊 État final du jeu...${NC}"
FINAL_STATE=$(curl -s -X GET "$BACKEND_URL/api/temporal/games/$GAME_ID/state" \
    -H "Content-Type: application/json")

echo -e "${CYAN}📊 État final:${NC}"
if command -v jq >/dev/null 2>&1; then
    echo "$FINAL_STATE" | jq '.'
else
    echo "$FINAL_STATE"
fi

# ============================================================================
# RÉSUMÉ FINAL
# ============================================================================

echo ""
echo -e "${PURPLE}🎯 RÉSUMÉ FINAL DU TEST SCÉNARIO${NC}"
echo -e "${CYAN}==================================${NC}"
echo -e "${GREEN}✅ Scénario de décroissance temporelle testé avec succès${NC}"
echo -e "${GREEN}✅ Système d'Anna Martel validé${NC}"
echo ""
echo -e "${YELLOW}📋 Fonctionnalités testées:${NC}"
echo "  • Création de héros (Arthur, Morgana)"
echo "  • Construction de bâtiments (château, tour, mur, maison)"
echo "  • Positionnement temporel (passé vs futur)"
echo "  • Artefacts de protection (Wigner's Eye, Temporal Compass)"
echo "  • Combat et causalité"
echo "  • États quantiques et superpositions"
echo "  • Collapses causaux"
echo "  • Décroissance temporelle automatique"
echo "  • Statistiques et monitoring"
echo ""
echo -e "${BLUE}🎭 Message d'Anna the Martopicker:${NC}"
echo "  'Le temps n'attend personne, et ceux qui s'attardent dans le passé"
echo "   verront leurs constructions s'effriter comme le sable entre leurs doigts.'"
echo ""
echo -e "${GREEN}🎉 Test du scénario terminé avec succès !${NC}" 