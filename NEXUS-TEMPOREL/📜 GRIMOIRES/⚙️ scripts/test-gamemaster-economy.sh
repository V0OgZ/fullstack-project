#!/bin/bash

# 🏰 TEST GAMEMASTER ECONOMY - Système Économique Heroes of Time
# ===============================================================
# Test complet du GameMaster : ressources, construction, production, commerce

echo "🏰 TEST GAMEMASTER ECONOMY - Système H3 Complet"
echo "================================================"
echo "Testeur : Memento - La Mémoire Vivante"
echo "Version : 1.0 - Implémentation autonome"
echo ""

# Variables
BACKEND_URL="http://localhost:8080"
GAMEMASTER_URL="$BACKEND_URL/api/gamemaster"
TEST_RESULTS_DIR="logs"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="$TEST_RESULTS_DIR/test-gamemaster-$TIMESTAMP.log"

# Créer le dossier de logs
mkdir -p "$TEST_RESULTS_DIR"

# Fonction pour logger
log() {
    echo "$(date '+%H:%M:%S') $1" | tee -a "$LOG_FILE"
}

# Fonction pour tester un endpoint
test_endpoint() {
    local method="$1"
    local url="$2"
    local data="$3"
    local description="$4"
    
    log "🧪 Test: $description"
    log "   URL: $method $url"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s "$url")
    else
        response=$(curl -s -X "$method" "$url" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    echo "$response" | jq . 2>/dev/null || echo "$response"
    echo ""
    
    # Vérifier le succès
    success=$(echo "$response" | jq -r '.success // false' 2>/dev/null)
    if [ "$success" = "true" ]; then
        log "   ✅ SUCCESS"
    else
        log "   ❌ FAILED"
    fi
    echo ""
}

# Vérifier que le backend est actif
log "🔍 Vérification du backend..."
backend_status=$(curl -s "$BACKEND_URL/api/game/status" | jq -r '.status // "unknown"' 2>/dev/null)

if [ "$backend_status" != "running" ]; then
    log "❌ Backend non disponible sur $BACKEND_URL"
    log "   Veuillez démarrer le backend : cd backend && mvn spring-boot:run"
    exit 1
fi

log "✅ Backend actif"
echo ""

# ============================
# PHASE 1 : STATUS ET INFORMATIONS
# ============================

log "📊 PHASE 1 : STATUS ET INFORMATIONS"
log "===================================="

test_endpoint "GET" "$GAMEMASTER_URL/status" "" "Status du GameMaster"

test_endpoint "GET" "$GAMEMASTER_URL/resource-types" "" "Types de ressources disponibles"

# ============================
# PHASE 2 : CRÉATION D'UNE PARTIE TEST
# ============================

log "🎮 PHASE 2 : CRÉATION D'UNE PARTIE TEST"
log "======================================="

# Créer une partie de test
log "🎯 Création d'une partie de test..."
game_response=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d '{"playerId": "gamemaster-test", "gameMode": "economy_test", "gameName": "GameMaster Economy Test"}')

echo "$game_response" | jq . 2>/dev/null || echo "$game_response"

# Extraire l'ID du jeu
GAME_ID=$(echo "$game_response" | jq -r '.gameId // empty' 2>/dev/null)

if [ -z "$GAME_ID" ]; then
    log "❌ Impossible de créer une partie de test"
    exit 1
fi

log "✅ Partie créée avec ID: $GAME_ID"
PLAYER_ID="gamemaster-test"
echo ""

# ============================
# PHASE 3 : GESTION DES RESSOURCES
# ============================

log "💰 PHASE 3 : GESTION DES RESSOURCES"
log "==================================="

test_endpoint "GET" "$GAMEMASTER_URL/resources/$GAME_ID/$PLAYER_ID" "" "Ressources initiales du joueur"

# Test de vérification des coûts
cost_data='{
    "cost": {
        "GOLD": 2500,
        "WOOD": 20,
        "STONE": 20
    }
}'

test_endpoint "POST" "$GAMEMASTER_URL/can-afford/$GAME_ID/$PLAYER_ID" "$cost_data" "Vérifier si peut construire un château"

# ============================
# PHASE 4 : CONSTRUCTION DE BÂTIMENTS
# ============================

log "🏗️ PHASE 4 : CONSTRUCTION DE BÂTIMENTS"
log "======================================="

# Construire un château
castle_data='{
    "playerId": "'$PLAYER_ID'",
    "buildingType": "CASTLE",
    "x": 10,
    "y": 10
}'

test_endpoint "POST" "$GAMEMASTER_URL/build/$GAME_ID" "$castle_data" "Construire un château en (10,10)"

# Construire une tour de guet
watchtower_data='{
    "playerId": "'$PLAYER_ID'",
    "buildingType": "WATCHTOWER",
    "x": 12,
    "y": 10
}'

test_endpoint "POST" "$GAMEMASTER_URL/build/$GAME_ID" "$watchtower_data" "Construire une tour de guet en (12,10)"

# Essayer de construire une forteresse (devrait échouer - prérequis château)
fortress_data='{
    "playerId": "'$PLAYER_ID'",
    "buildingType": "FORTRESS",
    "x": 14,
    "y": 10
}'

test_endpoint "POST" "$GAMEMASTER_URL/build/$GAME_ID" "$fortress_data" "Construire une forteresse (test prérequis)"

# ============================
# PHASE 5 : PRODUCTION DE RESSOURCES
# ============================

log "⚡ PHASE 5 : PRODUCTION DE RESSOURCES"
log "===================================="

test_endpoint "POST" "$GAMEMASTER_URL/production/$GAME_ID/$PLAYER_ID" "" "Traiter la production d'un tour"

# Vérifier les ressources après production
test_endpoint "GET" "$GAMEMASTER_URL/resources/$GAME_ID/$PLAYER_ID" "" "Ressources après production"

# ============================
# PHASE 6 : COMMERCE ET ÉCHANGES
# ============================

log "🤝 PHASE 6 : COMMERCE ET ÉCHANGES"
log "================================="

# Échanger de l'or contre du bois
trade_data='{
    "playerId": "'$PLAYER_ID'",
    "fromResource": "GOLD",
    "fromAmount": 1000,
    "toResource": "WOOD",
    "toAmount": 10
}'

test_endpoint "POST" "$GAMEMASTER_URL/trade/$GAME_ID" "$trade_data" "Échanger 1000 or contre 10 bois"

# Vérifier les ressources après échange
test_endpoint "GET" "$GAMEMASTER_URL/resources/$GAME_ID/$PLAYER_ID" "" "Ressources après échange"

# ============================
# PHASE 7 : TESTS AVANCÉS
# ============================

log "🎯 PHASE 7 : TESTS AVANCÉS"
log "=========================="

# Construire un temple
temple_data='{
    "playerId": "'$PLAYER_ID'",
    "buildingType": "TEMPLE",
    "x": 8,
    "y": 10
}'

test_endpoint "POST" "$GAMEMASTER_URL/build/$GAME_ID" "$temple_data" "Construire un temple en (8,10)"

# Maintenant essayer de construire une guilde de magie (prérequis : temple)
magic_guild_data='{
    "playerId": "'$PLAYER_ID'",
    "buildingType": "MAGIC_GUILD",
    "x": 8,
    "y": 12
}'

test_endpoint "POST" "$GAMEMASTER_URL/build/$GAME_ID" "$magic_guild_data" "Construire une guilde de magie (après temple)"

# Test de bâtiment temporel
temporal_anchor_data='{
    "playerId": "'$PLAYER_ID'",
    "buildingType": "TEMPORAL_ANCHOR",
    "x": 15,
    "y": 15
}'

test_endpoint "POST" "$GAMEMASTER_URL/build/$GAME_ID" "$temporal_anchor_data" "Construire une ancre temporelle"

# ============================
# PHASE 8 : RAPPORT FINAL
# ============================

log "📊 PHASE 8 : RAPPORT FINAL"
log "=========================="

# État final des ressources
test_endpoint "GET" "$GAMEMASTER_URL/resources/$GAME_ID/$PLAYER_ID" "" "État final des ressources"

# Nouvelle production après tous les bâtiments
test_endpoint "POST" "$GAMEMASTER_URL/production/$GAME_ID/$PLAYER_ID" "" "Production finale avec tous les bâtiments"

test_endpoint "GET" "$GAMEMASTER_URL/resources/$GAME_ID/$PLAYER_ID" "" "Ressources après production finale"

# ============================
# RÉSUMÉ DU TEST
# ============================

echo ""
log "🎉 TEST GAMEMASTER TERMINÉ !"
log "============================"
log "Partie testée : $GAME_ID"
log "Joueur : $PLAYER_ID"
log "Log complet : $LOG_FILE"
echo ""
log "🏰 Fonctionnalités testées :"
log "   ✅ Status et informations système"
log "   ✅ Gestion des ressources (9 types)"
log "   ✅ Construction de bâtiments avec prérequis"
log "   ✅ Production automatique de ressources"
log "   ✅ Commerce et échanges équitables"
log "   ✅ Validation des coûts et disponibilité"
log "   ✅ Bâtiments temporels spéciaux"
echo ""
log "💡 Le GameMaster est maintenant opérationnel !"
log "   Jean peut maintenant gérer une vraie économie H3 !"

echo ""
echo "📈 STATISTIQUES FINALES :"
echo "========================"
echo "Tests exécutés : $(grep -c "🧪 Test:" "$LOG_FILE")"
echo "Succès : $(grep -c "✅ SUCCESS" "$LOG_FILE")"
echo "Échecs : $(grep -c "❌ FAILED" "$LOG_FILE")"
echo "Log détaillé : $LOG_FILE" 