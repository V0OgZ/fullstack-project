#!/bin/bash

# Test Backend Unifié - Vue Joueur
# Montre comment tout fonctionne ensemble

echo "🎮 TEST BACKEND UNIFIÉ - VUE JOUEUR"
echo "==================================="

# Configuration
HOST="localhost:8080"
GAME_ID=1

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

# Fonction helper
test_api() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo -e "\n${BLUE}📍 $description${NC}"
    echo "→ $method $endpoint"
    if [ -n "$data" ]; then
        echo "→ Data: $data"
    fi
    
    if [ "$method" = "GET" ]; then
        curl -s -X GET "http://$HOST$endpoint" | jq '.' || echo "❌ Erreur"
    else
        curl -s -X POST "http://$HOST$endpoint" \
             -H "Content-Type: application/json" \
             -d "$data" | jq '.' || echo "❌ Erreur"
    fi
}

echo -e "\n${YELLOW}🚀 Démarrage du test...${NC}"

# 1. Créer une partie
echo -e "\n${GREEN}=== 1. CRÉATION DE PARTIE ===${NC}"
test_api "POST" "/api/games" \
    '{"gameName":"Test Backend Unifié","players":["Jean","Claude"]}' \
    "Créer une nouvelle partie"

# 2. Créer des héros
echo -e "\n${GREEN}=== 2. CRÉATION DES HÉROS ===${NC}"
test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"HERO(Arthur)"}' \
    "Créer Arthur pour Jean"

test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"HERO(Lysandrel)"}' \
    "Créer Lysandrel pour Claude"

# 3. Vision initiale
echo -e "\n${GREEN}=== 3. VISION DU JOUEUR ===${NC}"
test_api "GET" "/api/temporal/state/$GAME_ID" "" \
    "État du jeu - Vision normale"

# 4. Mouvement et temps
echo -e "\n${GREEN}=== 4. MOUVEMENT ET TEMPS ===${NC}"
test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"MOV(Arthur, @15,15)"}' \
    "Arthur bouge de 5 cases → 1 jour passe"

# 5. Donner un artefact
echo -e "\n${GREEN}=== 5. ARTEFACTS ET FORMULES ===${NC}"
test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"CREATE(ITEM, temporal_sword, HERO:Arthur)"}' \
    "Donner l'épée temporelle à Arthur"

# 6. Utiliser l'artefact
test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"USE(ARTIFACT, temporal_sword, HERO:Arthur)"}' \
    "Utiliser l'épée → +10 mouvement"

# 7. État quantique
echo -e "\n${GREEN}=== 6. ÉTATS QUANTIQUES ===${NC}"
test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"ψ001: (0.8+0.6i) ⊙(Δt+2 @20,20 ⟶ MOV(Arthur, @20,20))"}' \
    "Créer état quantique - Arthur pourrait aller en (20,20)"

# 8. Vision avec fog
echo -e "\n${GREEN}=== 7. FOG ET VISION ===${NC}"
test_api "GET" "/api/temporal/causality/zones/$GAME_ID?playerId=Jean" "" \
    "Zones de causalité pour Jean"

# 9. God View (pour comparaison)
echo -e "\n${GREEN}=== 8. GOD VIEW (Jean Admin) ===${NC}"
test_api "GET" "/api/temporal/godview/fog5d/$GAME_ID?x=20&y=20&day=3" "" \
    "Fog à la position future (20,20) jour 3"

# 10. Collision temporelle
echo -e "\n${GREEN}=== 9. COLLISION TEMPORELLE ===${NC}"
test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"MOV(Lysandrel, @15,15)"}' \
    "Lysandrel va au même endroit → Collision!"

# 11. Symboles GROFI
echo -e "\n${GREEN}=== 10. SYMBOLES GROFI ===${NC}"
test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"CREATE(ITEM, grofi_sigma, HERO:Arthur)"}' \
    "Donner arme GROFI Σ"

test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"USE(ARTIFACT, grofi_sigma, HERO:Arthur)"}' \
    "Utiliser Σ → Réduction des amplitudes"

# 12. Performance
echo -e "\n${GREEN}=== 11. MÉTRIQUES PERFORMANCE ===${NC}"
test_api "GET" "/api/temporal/performance/metrics" "" \
    "Voir les métriques de performance"

echo -e "\n${GREEN}✅ TEST TERMINÉ !${NC}"
echo -e "\n${YELLOW}📊 RÉSUMÉ :${NC}"
echo "- Mouvement → Temps avance"
echo "- Artefacts → Formules parsées"
echo "- États ψ → Superposition quantique"
echo "- Fog → 7 états différents"
echo "- GROFI → Symboles spéciaux"
echo "- Performance → Optimisé avec cache"

echo -e "\n${BLUE}💡 Le backend unifie tout :${NC}"
echo "1. Scripts HOTS → TemporalScriptParser"
echo "2. Formules JSON → DynamicFormulaParser"
echo "3. Amplitudes → ComplexAmplitude unifié"
echo "4. Vision → CausalityZoneService"
echo "5. God View → GodViewService"

echo -e "\n🎳 The backend abides! 🎳\n" 