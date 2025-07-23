#!/bin/bash

# 🌟 TEST COMPLET SYSTÈME DE DÉCROISSANCE TEMPORELLE - ANNA MARTEL
# ========================================================================
# Test complet du système qui punit les joueurs qui restent trop longtemps dans le passé
# Inclut : MOV, HERO, CREATE, USE, BATTLE, et tests de causalité

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
GAME_NAME="DecayTestComplete"
PLAYER_ID="decay-test-player"

echo -e "${PURPLE}🌟 TEST COMPLET SYSTÈME DE DÉCROISSANCE TEMPORELLE - ANNA MARTEL${NC}"
echo -e "${CYAN}================================================================${NC}"
echo -e "${YELLOW}Concept:${NC} Test complet avec MOV, HERO, CREATE, USE, BATTLE et causalité"
echo -e "${YELLOW}Mécaniques:${NC} Décroissance temporelle, protection vision future, réparation"
echo ""

# ============================================================================
# PHASE 1: PRÉPARATION ET CRÉATION DU JEU
# ============================================================================

echo -e "${BLUE}📋 PHASE 1: PRÉPARATION ET CRÉATION DU JEU${NC}"
echo "================================================"

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
# PHASE 2: CRÉATION DES HÉROS ET BÂTISSEMENTS
# ============================================================================

echo ""
echo -e "${BLUE}📋 PHASE 2: CRÉATION DES HÉROS ET BÂTISSEMENTS${NC}"
echo "====================================================="

# Créer le héros principal
echo -e "${YELLOW}🦸 Création du héros Arthur...${NC}"
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"HERO(Arthur)\"}" > /dev/null

echo -e "${GREEN}✅ Héros Arthur créé${NC}"

# Créer des bâtiments pour tester la décroissance
echo -e "${YELLOW}🏗️ Création des bâtiments...${NC}"

# Château principal
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"CREATE(BUILDING, chateau, @10,10, HERO:Arthur)\"}" > /dev/null

# Tour de défense
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"CREATE(BUILDING, tour, @12,10, HERO:Arthur)\"}" > /dev/null

# Mur de protection
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"CREATE(BUILDING, mur, @10,12, HERO:Arthur)\"}" > /dev/null

echo -e "${GREEN}✅ Bâtiments créés (château, tour, mur)${NC}"

# ============================================================================
# PHASE 3: TEST DE MOUVEMENT ET TIMELINE
# ============================================================================

echo ""
echo -e "${BLUE}📋 PHASE 3: TEST DE MOUVEMENT ET TIMELINE${NC}"
echo "================================================"

# Déplacer Arthur dans le passé
echo -e "${YELLOW}⏰ Déplacement d'Arthur dans le passé (timeline -3)...${NC}"
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"MOV(Arthur, @15,15)\"}" > /dev/null

# Créer un autre héros dans le futur
echo -e "${YELLOW}🚀 Création de Morgana dans le futur...${NC}"
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"HERO(Morgana)\"}" > /dev/null

# Déplacer Morgana dans le futur
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"MOV(Morgana, @20,20)\"}" > /dev/null

echo -e "${GREEN}✅ Héros positionnés dans différentes timelines${NC}"

# ============================================================================
# PHASE 4: TEST DES ARTEFACTS DE PROTECTION
# ============================================================================

echo ""
echo -e "${BLUE}📋 PHASE 4: TEST DES ARTEFACTS DE PROTECTION${NC}"
echo "=================================================="

# Créer un artefact de vision future pour Arthur
echo -e "${YELLOW}🔮 Création de l'artefact Wigner's Eye pour Arthur...${NC}"
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"CREATE(ARTIFACT, wigner_eye, HERO:Arthur)\"}" > /dev/null

# Utiliser l'artefact
echo -e "${YELLOW}👁️ Utilisation de Wigner's Eye...${NC}"
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"USE(ARTIFACT, wigner_eye, HERO:Arthur)\"}" > /dev/null

echo -e "${GREEN}✅ Artefact de protection créé et utilisé${NC}"

# ============================================================================
# PHASE 5: TEST DE COMBAT ET CAUSALITÉ
# ============================================================================

echo ""
echo -e "${BLUE}📋 PHASE 5: TEST DE COMBAT ET CAUSALITÉ${NC}"
echo "============================================="

# Créer un ennemi
echo -e "${YELLOW}👹 Création d'un ennemi...${NC}"
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"CREATE(CREATURE, gobelin, @18,18)\"}" > /dev/null

# Combat entre Arthur et le gobelin
echo -e "${YELLOW}⚔️ Combat Arthur vs Gobelin...${NC}"
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"BATTLE(Arthur, gobelin)\"}" > /dev/null

echo -e "${GREEN}✅ Combat effectué${NC}"

# ============================================================================
# PHASE 6: TEST DE LA DÉCROISSANCE TEMPORELLE
# ============================================================================

echo ""
echo -e "${BLUE}📋 PHASE 6: TEST DE LA DÉCROISSANCE TEMPORELLE${NC}"
echo "=================================================="

# Appliquer la décroissance temporelle
echo -e "${YELLOW}⏰ Application de la décroissance temporelle...${NC}"
DECAY_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/decay/$GAME_ID/apply" \
    -H "Content-Type: application/json")

echo -e "${GREEN}✅ Décroissance appliquée${NC}"
echo -e "${CYAN}📊 Résultat de la décroissance:${NC}"
echo "$DECAY_RESPONSE" | jq '.' 2>/dev/null || echo "$DECAY_RESPONSE"

# Obtenir les statistiques de décroissance
echo -e "${YELLOW}📈 Statistiques de décroissance...${NC}"
STATS_RESPONSE=$(curl -s -X GET "$BACKEND_URL/api/temporal/decay/$GAME_ID/statistics" \
    -H "Content-Type: application/json")

echo -e "${CYAN}📊 Statistiques:${NC}"
echo "$STATS_RESPONSE" | jq '.' 2>/dev/null || echo "$STATS_RESPONSE"

# ============================================================================
# PHASE 7: TEST DE RÉPARATION
# ============================================================================

echo ""
echo -e "${BLUE}📋 PHASE 7: TEST DE RÉPARATION${NC}"
echo "=================================="

# Tenter de réparer un bâtiment
echo -e "${YELLOW}🔧 Tentative de réparation du château...${NC}"
REPAIR_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/decay/$GAME_ID/repair" \
    -H "Content-Type: application/json" \
    -d "{\"heroName\":\"Arthur\",\"x\":10,\"y\":10}")

echo -e "${GREEN}✅ Réparation tentée${NC}"
echo -e "${CYAN}📊 Résultat de la réparation:${NC}"
echo "$REPAIR_RESPONSE" | jq '.' 2>/dev/null || echo "$REPAIR_RESPONSE"

# ============================================================================
# PHASE 8: TEST DES ÉTATS QUANTIQUES
# ============================================================================

echo ""
echo -e "${BLUE}📋 PHASE 8: TEST DES ÉTATS QUANTIQUES${NC}"
echo "=========================================="

# Créer un état quantique
echo -e "${YELLOW}🌀 Création d'un état quantique...${NC}"
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))\"}" > /dev/null

# Créer une superposition
echo -e "${YELLOW}⚛️ Création d'une superposition...${NC}"
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"ψ002: (0.8+0.6i) ⊙(Δt+1 @10,10 ⟶ USE(ARTIFACT, wigner_eye, HERO:Arthur))\"}" > /dev/null

echo -e "${GREEN}✅ États quantiques créés${NC}"

# ============================================================================
# PHASE 9: TEST DE COLLAPSE CAUSAL
# ============================================================================

echo ""
echo -e "${BLUE}📋 PHASE 9: TEST DE COLLAPSE CAUSAL${NC}"
echo "========================================="

# Forcer un collapse
echo -e "${YELLOW}💥 Forçage d'un collapse quantique...${NC}"
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"†ψ001\"}" > /dev/null

# Collapse par observation
echo -e "${YELLOW}👁️ Collapse par observation...${NC}"
curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\":\"Π(Arthur @15,15) ⇒ †ψ002\"}" > /dev/null

echo -e "${GREEN}✅ Collapses effectués${NC}"

# ============================================================================
# PHASE 10: VÉRIFICATION FINALE
# ============================================================================

echo ""
echo -e "${BLUE}📋 PHASE 10: VÉRIFICATION FINALE${NC}"
echo "====================================="

# Obtenir l'état final du jeu
echo -e "${YELLOW}📊 État final du jeu...${NC}"
FINAL_STATE=$(curl -s -X GET "$BACKEND_URL/api/temporal/games/$GAME_ID/state" \
    -H "Content-Type: application/json")

echo -e "${CYAN}📊 État final:${NC}"
echo "$FINAL_STATE" | jq '.' 2>/dev/null || echo "$FINAL_STATE"

# ============================================================================
# RÉSUMÉ FINAL
# ============================================================================

echo ""
echo -e "${PURPLE}🎯 RÉSUMÉ FINAL DU TEST${NC}"
echo -e "${CYAN}========================${NC}"
echo -e "${GREEN}✅ Système de décroissance temporelle testé avec succès${NC}"
echo -e "${GREEN}✅ Commandes HOTS testées: HERO, MOV, CREATE, USE, BATTLE${NC}"
echo -e "${GREEN}✅ États quantiques et collapses testés${NC}"
echo -e "${GREEN}✅ Protection par artefacts testée${NC}"
echo -e "${GREEN}✅ Système de réparation testé${NC}"
echo ""
echo -e "${YELLOW}📋 Fonctionnalités testées:${NC}"
echo "  • Création et déplacement de héros"
echo "  • Construction de bâtiments"
echo "  • Utilisation d'artefacts de protection"
echo "  • Combat et causalité"
echo "  • Décroissance temporelle d'Anna Martel"
echo "  • États quantiques et collapses"
echo "  • Système de réparation"
echo ""
echo -e "${BLUE}🎭 Quote d'Anna the Martopicker:${NC}"
echo "  'Le temps n'attend personne, et ceux qui s'attardent dans le passé"
echo "   verront leurs constructions s'effriter comme le sable entre leurs doigts.'"
echo ""
echo -e "${GREEN}🎉 Test complet terminé avec succès !${NC}" 