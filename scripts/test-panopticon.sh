#!/bin/bash

# Test PANOPTICΩN - Visualisation 3D du multivers
# Montre l'intégration avec GodViewService

echo "🎛️ TEST PANOPTICΩN - VISUALISATION 3D ULTIME"
echo "============================================"

# Configuration
HOST="localhost:8080"
GAME_ID=1

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Fonction helper
test_api() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo -e "\n${BLUE}🎯 $description${NC}"
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

echo -e "\n${YELLOW}🚀 Démarrage du test PANOPTICΩN...${NC}"

# 1. Créer une partie
echo -e "\n${GREEN}=== 1. SETUP INITIAL ===${NC}"
test_api "POST" "/api/games" \
    '{"gameName":"Test PANOPTICΩN","players":["Jean-Grofignon","Claude"]}' \
    "Créer une partie pour le test"

# 2. Créer des héros
test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"HERO(Jean-Grofignon)"}' \
    "Créer Jean-Grofignon (observateur absolu)"

test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"HERO(Arthur)"}' \
    "Créer Arthur"

# 3. Créer des états quantiques
echo -e "\n${GREEN}=== 2. ÉTATS QUANTIQUES ===${NC}"
test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"ψ001: (0.8+0.6i) ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))"}' \
    "État ψ001 - Arthur pourrait aller en (15,15)"

test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"ψ002: (0.6+0.8i) ⊙(Δt+3 @20,20 ⟶ CREATE(ITEM, quantum_key, @20,20))"}' \
    "État ψ002 - Clé quantique pourrait apparaître"

test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"ψ003: (0.707+0.707i) ⊙(Δt+5 @25,25 ⟶ BATTLE(Arthur, Dragon))"}' \
    "État ψ003 - Bataille future possible"

# 4. Obtenir les données PANOPTICΩN
echo -e "\n${GREEN}=== 3. DONNÉES PANOPTICΩN ===${NC}"
test_api "GET" "/api/temporal/panopticon/data/$GAME_ID" "" \
    "Obtenir les données de visualisation 3D"

# 5. Métriques de debug
echo -e "\n${GREEN}=== 4. MÉTRIQUES DEBUG ===${NC}"
test_api "GET" "/api/temporal/panopticon/debug/$GAME_ID" "" \
    "Métriques pour développeurs"

# 6. Donner l'artefact singularité
echo -e "\n${GREEN}=== 5. POUVOIR ABSOLUTE_OBSERVER ===${NC}"
test_api "POST" "/api/temporal/execute/$GAME_ID" \
    '{"script":"CREATE(ITEM, singularity_artifact, HERO:Jean-Grofignon)"}' \
    "Donner l'artefact singularité à Jean-Grofignon"

# 7. Activer ABSOLUTE_OBSERVER
test_api "POST" "/api/temporal/panopticon/activate-observer/$GAME_ID?heroName=Jean-Grofignon" "" \
    "Activer le pouvoir ultime ABSOLUTE_OBSERVER"

# 8. Injecter une action future
echo -e "\n${GREEN}=== 6. INJECTION TEMPORELLE ===${NC}"
test_api "POST" "/api/temporal/panopticon/inject-action/$GAME_ID?timelineId=ℬ1&x=30&y=30&day=10&action=MOV(Jean-Grofignon,@30,30)" "" \
    "Injecter une action dans le futur (jour 10)"

# 9. Simuler le vol du trésor
echo -e "\n${GREEN}=== 7. VOL DU TRÉSOR DU FUTUR ===${NC}"
test_api "POST" "/api/temporal/panopticon/simulate/treasure-theft/$GAME_ID?thiefHero=Jean-Grofignon&treasureX=40&treasureY=40&targetDay=15" "" \
    "Voler un trésor qui n'existe pas encore !"

# 10. Vue cinématique
echo -e "\n${GREEN}=== 8. VUE CINÉMATIQUE ===${NC}"
test_api "GET" "/api/temporal/panopticon/cinematic/$GAME_ID" "" \
    "Obtenir la vue cinématique pour l'animation"

# 11. Mode développeur
echo -e "\n${GREEN}=== 9. MODE DÉVELOPPEUR ===${NC}"
test_api "GET" "/api/temporal/panopticon/dev-mode/$GAME_ID" "" \
    "Informations complètes pour développeurs"

# 12. Comparaison avec God View
echo -e "\n${GREEN}=== 10. COMPARAISON GOD VIEW ===${NC}"
echo -e "${PURPLE}God View (données brutes 5D) :${NC}"
test_api "GET" "/api/temporal/godview/fog5d/$GAME_ID?x=15&y=15&day=5" "" \
    "Fog à la position (15,15) jour 5"

echo -e "\n${PURPLE}PANOPTICΩN (données 3D pour visualisation) :${NC}"
echo "→ Les données PANOPTICΩN convertissent Position5D en Position3D"
echo "→ Z = jour * 10 pour la hauteur dans Three.js"
echo "→ Timelines = couleurs différentes"

echo -e "\n${GREEN}✅ TEST TERMINÉ !${NC}"
echo -e "\n${YELLOW}📊 RÉSUMÉ PANOPTICΩN :${NC}"
echo "- Visualisation 3D du multivers temporel"
echo "- Conversion des données 5D → 3D pour Three.js"
echo "- ABSOLUTE_OBSERVER : pouvoir ultime"
echo "- Injection d'actions dans le futur"
echo "- Vol du trésor avant qu'il existe"

echo -e "\n${BLUE}🎛️ Architecture :${NC}"
echo "GodViewService (5D) → PanopticonService (3D) → Three.js"
echo ""
echo "Port 8001 : Frontend visualizer (à implémenter)"
echo "Port 8080 : Backend API (prêt !)"

echo -e "\n🌟 Le PANOPTICΩN voit tout, contrôle tout ! 🌟\n" 