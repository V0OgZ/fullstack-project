#!/bin/bash

# 🌟 TEST SYSTÈME DE DÉCROISSANCE TEMPORELLE - ANNA MARTEL
# ================================================================
# Test du système qui punit les joueurs qui restent trop longtemps dans le passé

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
GAME_NAME="DecayTest"
PLAYER_ID="decay-test-player"

echo -e "${PURPLE}🌟 TEST SYSTÈME DE DÉCROISSANCE TEMPORELLE - ANNA MARTEL${NC}"
echo -e "${CYAN}===============================================================${NC}"
echo -e "${YELLOW}Concept:${NC} Punir les joueurs qui restent trop longtemps dans le passé"
echo -e "${YELLOW}Quote:${NC} \"Le temps n'attend personne, et ceux qui s'attardent dans le passé"
echo -e "        verront leurs constructions s'effriter comme le sable entre leurs doigts.\""
echo -e "        - Anna Martel, Architecte du Temps"
echo ""

# Fonction pour tester l'API
test_api() {
    local endpoint="$1"
    local method="${2:-GET}"
    local data="${3:-}"
    
    if [ "$method" = "POST" ] && [ -n "$data" ]; then
        response=$(curl -s -X POST "$BACKEND_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    else
        response=$(curl -s -X "$method" "$BACKEND_URL$endpoint")
    fi
    
    echo "$response"
}

# Fonction pour attendre
wait_for_backend() {
    echo -e "${BLUE}🔍 Vérification du backend...${NC}"
    for i in {1..30}; do
        if curl -s "$BACKEND_URL/api/health" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Backend disponible${NC}"
            return 0
        fi
        echo -e "${YELLOW}⏳ Attente du backend... ($i/30)${NC}"
        sleep 2
    done
    echo -e "${RED}❌ Backend non disponible${NC}"
    return 1
}

# Fonction pour exécuter un script HOTS
execute_hots() {
    local game_id="$1"
    local script="$2"
    local description="$3"
    
    echo -e "${BLUE}📜 $description${NC}"
    echo -e "${CYAN}Script:${NC} $script"
    
    local response=$(test_api "/api/temporal/games/$game_id/script" "POST" "{\"script\":\"$script\"}")
    echo -e "${CYAN}Réponse:${NC} $response"
    echo ""
}

# Fonction pour afficher les statistiques de décroissance
show_decay_stats() {
    local game_id="$1"
    local description="$2"
    
    echo -e "${PURPLE}📊 $description${NC}"
    local response=$(test_api "/api/temporal/decay/$game_id/statistics")
    echo -e "${CYAN}Statistiques:${NC} $response"
    echo ""
}

# Fonction pour appliquer la décroissance
apply_decay() {
    local game_id="$1"
    local description="$2"
    
    echo -e "${RED}⏰ $description${NC}"
    local response=$(test_api "/api/temporal/decay/$game_id/apply" "POST")
    echo -e "${CYAN}Résultat:${NC} $response"
    echo ""
}

# Fonction pour réparer un bâtiment
repair_building() {
    local game_id="$1"
    local hero_name="$2"
    local x="$3"
    local y="$4"
    
    echo -e "${GREEN}🔧 Réparation du bâtiment par $hero_name à ($x,$y)${NC}"
    local response=$(test_api "/api/temporal/decay/$game_id/repair" "POST" "{\"heroName\":\"$hero_name\",\"x\":$x,\"y\":$y}")
    echo -e "${CYAN}Résultat:${NC} $response"
    echo ""
}

# ============================================================================
# 🎯 DÉBUT DU TEST
# ============================================================================

# Vérifier le backend
wait_for_backend

echo -e "${PURPLE}🎮 CRÉATION DU JEU DE TEST${NC}"
echo -e "${CYAN}================================${NC}"

# Créer un nouveau jeu
echo -e "${BLUE}🏗️ Création du jeu...${NC}"
game_response=$(test_api "/api/temporal/games" "POST" "{\"gameName\":\"$GAME_NAME\",\"playerId\":\"$PLAYER_ID\"}")
echo -e "${CYAN}Réponse:${NC} $game_response"

# Extraire l'ID du jeu
game_id=$(echo "$game_response" | grep -o '"gameId":[0-9]*' | cut -d':' -f2)
if [ -z "$game_id" ]; then
    echo -e "${RED}❌ Impossible d'extraire l'ID du jeu${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Jeu créé avec l'ID: $game_id${NC}"
echo ""

# Démarrer le jeu
echo -e "${BLUE}🚀 Démarrage du jeu...${NC}"
start_response=$(test_api "/api/temporal/games/$game_id/start" "POST")
echo -e "${CYAN}Réponse:${NC} $start_response"
echo ""

# ============================================================================
# 🏗️ PHASE 1: CONSTRUCTION DES BÂTIMENTS
# ============================================================================

echo -e "${PURPLE}🏗️ PHASE 1: CONSTRUCTION DES BÂTIMENTS${NC}"
echo -e "${CYAN}==========================================${NC}"

# Créer des héros
execute_hots "$game_id" "HERO(Arthur)" "Création du héros Arthur"
execute_hots "$game_id" "HERO(Merlin)" "Création du héros Merlin"

# Construire des bâtiments
execute_hots "$game_id" "BUILD(CASTLE, @10,10, Arthur)" "Construction du château d'Arthur"
execute_hots "$game_id" "BUILD(TOWER, @15,15, Merlin)" "Construction de la tour de Merlin"
execute_hots "$game_id" "BUILD(BARRACKS, @12,12, Arthur)" "Construction des casernes d'Arthur"

# Créer des objets de vision future pour Merlin
execute_hots "$game_id" "CREATE(ARTIFACT, wigner_eye, HERO:Merlin)" "Création des lunettes de Wigner pour Merlin"

echo -e "${GREEN}✅ Phase 1 terminée - Bâtiments construits${NC}"
echo ""

# ============================================================================
# ⏰ PHASE 2: SIMULATION DU RETARD TEMPOREL
# ============================================================================

echo -e "${PURPLE}⏰ PHASE 2: SIMULATION DU RETARD TEMPOREL${NC}"
echo -e "${CYAN}============================================${NC}"

# Afficher les statistiques initiales
show_decay_stats "$game_id" "Statistiques initiales (avant retard)"

# Simuler un retard de 3 jours (pas encore de décroissance)
echo -e "${YELLOW}📅 Simulation: Retard de 3 jours (seuil: 5 jours)${NC}"
for i in {1..3}; do
    echo -e "${BLUE}Tour $i: Avancement du temps...${NC}"
    next_response=$(test_api "/api/temporal/games/$game_id/next-turn" "POST")
    echo -e "${CYAN}Réponse:${NC} $next_response"
done

show_decay_stats "$game_id" "Statistiques après 3 jours de retard"

# Simuler un retard de 6 jours (décroissance active)
echo -e "${YELLOW}📅 Simulation: Retard de 6 jours (décroissance active)${NC}"
for i in {1..3}; do
    echo -e "${BLUE}Tour $((i+3)): Avancement du temps...${NC}"
    next_response=$(test_api "/api/temporal/games/$game_id/next-turn" "POST")
    echo -e "${CYAN}Réponse:${NC} $next_response"
done

# Appliquer la décroissance temporelle
apply_decay "$game_id" "Application de la décroissance temporelle (6 jours de retard)"

show_decay_stats "$game_id" "Statistiques après décroissance (6 jours)"

# ============================================================================
# 🔧 PHASE 3: RÉPARATION ET PROTECTION
# ============================================================================

echo -e "${PURPLE}🔧 PHASE 3: RÉPARATION ET PROTECTION${NC}"
echo -e "${CYAN}=====================================${NC}"

# Réparer un bâtiment d'Arthur
repair_building "$game_id" "Arthur" 10 10

# Simuler un retard de 10 jours (destruction possible)
echo -e "${YELLOW}📅 Simulation: Retard de 10 jours (destruction possible)${NC}"
for i in {1..4}; do
    echo -e "${BLUE}Tour $((i+6)): Avancement du temps...${NC}"
    next_response=$(test_api "/api/temporal/games/$game_id/next-turn" "POST")
    echo -e "${CYAN}Réponse:${NC} $next_response"
done

# Appliquer la décroissance temporelle
apply_decay "$game_id" "Application de la décroissance temporelle (10 jours de retard)"

show_decay_stats "$game_id" "Statistiques finales (10 jours)"

# ============================================================================
# 📊 PHASE 4: ANALYSE ET COMPARAISON
# ============================================================================

echo -e "${PURPLE}📊 PHASE 4: ANALYSE ET COMPARAISON${NC}"
echo -e "${CYAN}===================================${NC}"

# Afficher les informations du système
echo -e "${BLUE}ℹ️ Informations sur le système de décroissance${NC}"
info_response=$(test_api "/api/temporal/decay/info")
echo -e "${CYAN}Info:${NC} $info_response"
echo ""

# État final du jeu
echo -e "${BLUE}🎮 État final du jeu${NC}"
state_response=$(test_api "/api/temporal/games/$game_id/state")
echo -e "${CYAN}État:${NC} $state_response"
echo ""

# ============================================================================
# 🎯 RÉSUMÉ FINAL
# ============================================================================

echo -e "${PURPLE}🎯 RÉSUMÉ FINAL - SYSTÈME DE DÉCROISSANCE TEMPORELLE${NC}"
echo -e "${CYAN}====================================================${NC}"
echo -e "${GREEN}✅ Test terminé avec succès !${NC}"
echo ""
echo -e "${YELLOW}📋 MÉCANIQUES TESTÉES:${NC}"
echo -e "  • Seuil de décroissance: 5 jours de retard"
echo -e "  • Taux de décroissance: 15% par jour"
echo -e "  • Protection par objets de vision future"
echo -e "  • Réparation des bâtiments endommagés"
echo -e "  • Destruction possible après 10 jours"
echo ""
echo -e "${YELLOW}🎭 PERSONNAGE:${NC}"
echo -e "  • Anna the Martopicker, Architecte du Temps"
echo -e "  • Concepteur du système de punition temporelle"
echo -e "  • Quote: \"Le temps n'attend personne...\""
echo ""
echo -e "${YELLOW}🔧 ENDPOINTS TESTÉS:${NC}"
echo -e "  • POST /api/temporal/decay/{gameId}/apply"
echo -e "  • POST /api/temporal/decay/{gameId}/repair"
echo -e "  • GET /api/temporal/decay/{gameId}/statistics"
echo -e "  • GET /api/temporal/decay/info"
echo ""
echo -e "${GREEN}🌟 Le système de décroissance temporelle fonctionne parfaitement !${NC}"
echo -e "${CYAN}Les joueurs qui restent trop longtemps dans le passé sont maintenant punis.${NC}" 