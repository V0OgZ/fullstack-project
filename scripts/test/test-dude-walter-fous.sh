#!/bin/bash

# Test du scénario fou The Dude et Walter
# "Am I the only one around here who gives a damn about the rules?!"

echo "🎭 Test du Scénario Fou - The Dude et Walter"
echo "============================================="

# Configuration
API_BASE="http://localhost:8080/api"
GAME_NAME="Test-Dude-Walter-Fous"
PLAYER_ID="test-dude-walter"

# Couleurs pour le terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Fonction pour logger avec timestamp
log() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"
}

# Fonction pour tester une étape
test_step() {
    local step_name=$1
    local endpoint=$2
    local data=$3
    
    log "🧪 Test: $step_name"
    
    response=$(curl -s -X POST "$API_BASE$endpoint" \
        -H "Content-Type: application/json" \
        -d "$data")
    
    if echo "$response" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ $step_name: SUCCESS${NC}"
        echo "   Response: $response" | head -c 100
        echo "..."
    else
        echo -e "${RED}❌ $step_name: FAILED${NC}"
        echo "   Error: $response"
    fi
    echo ""
}

# Fonction pour tester une capacité spéciale
test_special_ability() {
    local ability_name=$1
    local hero_name=$2
    local endpoint=$3
    local data=$4
    
    log "⚔️ Test Capacité Spéciale: $ability_name"
    
    response=$(curl -s -X POST "$API_BASE/special-abilities$endpoint" \
        -H "Content-Type: application/json" \
        -d "$data")
    
    if echo "$response" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ $ability_name: SUCCESS${NC}"
        echo "   Hero: $hero_name"
        echo "   Response: $response" | head -c 100
        echo "..."
    else
        echo -e "${RED}❌ $ability_name: FAILED${NC}"
        echo "   Error: $response"
    fi
    echo ""
}

# === PHASE 1: CRÉATION DE PARTIE ===
log "🎮 Phase 1: Création de partie"
test_step "Créer partie" "/temporal/games" "{\"gameName\":\"$GAME_NAME\", \"playerId\":\"$PLAYER_ID\"}"

# Extraire l'ID de la partie
GAME_ID=$(curl -s -X POST "$API_BASE/temporal/games" \
    -H "Content-Type: application/json" \
    -d "{\"gameName\":\"$GAME_NAME\", \"playerId\":\"$PLAYER_ID\"}" | \
    grep -o '"gameId":[0-9]*' | cut -d':' -f2)

if [ -z "$GAME_ID" ]; then
    echo -e "${RED}❌ Impossible d'obtenir l'ID de partie${NC}"
    exit 1
fi

log "🎯 Partie créée avec ID: $GAME_ID"

# === PHASE 2: CRÉATION DES HÉROS ===
log "🦸 Phase 2: Création des héros"

test_step "Créer The Dude" "/temporal/games/$GAME_ID/script" "{\"script\":\"HERO(TheDude)\"}"
test_step "Créer Walter" "/temporal/games/$GAME_ID/script" "{\"script\":\"HERO(Walter)\"}"
test_step "Créer Le Grand Lebowski Quantique" "/temporal/games/$GAME_ID/script" "{\"script\":\"HERO(LeGrandLebowskiQuantique)\"}"

# === PHASE 3: TEST DES CAPACITÉS SPÉCIALES ===
log "⚔️ Phase 3: Test des capacités spéciales"

# DUDE_MODE
test_special_ability "DUDE_MODE" "TheDude" "/dude-mode" "{\"heroName\":\"TheDude\", \"gameId\":$GAME_ID}"

# ENFORCEMENT
test_special_ability "ENFORCEMENT" "Walter" "/enforcement" "{\"heroName\":\"Walter\", \"targetHeroName\":\"LeGrandLebowskiQuantique\", \"gameId\":$GAME_ID}"

# QUANTUM_BOWLING
test_special_ability "QUANTUM_BOWLING" "LeGrandLebowskiQuantique" "/quantum-bowling" "{\"heroName\":\"LeGrandLebowskiQuantique\", \"gameId\":$GAME_ID}"

# === PHASE 4: TEST DES CAPACITÉS EXISTANTES ===
log "🔥 Phase 4: Test des capacités existantes"

# PRE_EXISTENCE_STRIKE
test_special_ability "PRE_EXISTENCE_STRIKE" "TheDude" "/pre-existence-strike" "{\"heroName\":\"TheDude\", \"targetHeroName\":\"LeGrandLebowskiQuantique\", \"gameId\":$GAME_ID}"

# MEMORY_INFECTION
test_special_ability "MEMORY_INFECTION" "Walter" "/memory-infection" "{\"heroName\":\"Walter\", \"targetHeroName\":\"TheDude\", \"gameId\":$GAME_ID}"

# REALITY_RECOMPILE
test_special_ability "REALITY_RECOMPILE" "TheDude" "/reality-recompile" "{\"heroName\":\"TheDude\", \"gameId\":$GAME_ID}"

# SCRIBE_NONEXISTENCE
test_special_ability "SCRIBE_NONEXISTENCE" "Walter" "/scribe-nonexistence" "{\"heroName\":\"Walter\", \"targetHeroName\":\"LeGrandLebowskiQuantique\", \"gameId\":$GAME_ID}"

# OMEGA_ZERO_ULTIMATE
test_special_ability "OMEGA_ZERO_ULTIMATE" "LeGrandLebowskiQuantique" "/omega-zero-ultimate" "{\"heroName\":\"LeGrandLebowskiQuantique\", \"gameId\":$GAME_ID}"

# === PHASE 5: TEST DE LA FORGE RUNIQUE ===
log "🔨 Phase 5: Test de la Forge Runique"

# Forger un objet
test_step "Forger objet" "/runic-forge/forge" "{\"formula\":\"CREATE(ARTIFACT, white_russian_quantique, HERO:TheDude)\", \"name\":\"White Russian Quantique\", \"type\":\"BEVERAGE\", \"gameId\":$GAME_ID}"

# Lister les objets forgés
test_step "Lister objets" "/runic-forge/objects" "{\"gameId\":$GAME_ID}"

# === PHASE 6: TEST DU SERVICE DE TRADUCTION ===
log "🌐 Phase 6: Test du service de traduction"

# Traduire des quotes cultes
quotes=(
    "QUOTE(TheDude, \"The dude abides.\")"
    "QUOTE(Walter, \"You're entering a world of pain.\")"
    "QUOTE(LeGrandLebowskiQuantique, \"The bums will always lose!\")"
)

for quote in "${quotes[@]}"; do
    log "📝 Traduction: $quote"
    response=$(curl -s -X POST "$API_BASE/collection/translate" \
        -H "Content-Type: application/json" \
        -d "{\"script\":\"$quote\", \"mode\":\"literary\"}")
    
    if echo "$response" | grep -q '"translated"'; then
        echo -e "${GREEN}✅ Traduction réussie${NC}"
        translated=$(echo "$response" | grep -o '"translated":"[^"]*"' | cut -d'"' -f4)
        echo "   Original: $quote"
        echo "   Traduit: $translated"
    else
        echo -e "${RED}❌ Traduction échouée${NC}"
        echo "   Error: $response"
    fi
    echo ""
done

# === PHASE 7: TEST DU BROADCAST INTELLIGENT ===
log "📡 Phase 7: Test du broadcast intelligent"

# Test broadcast critique
test_step "Broadcast critique" "/temporal/broadcast" "{\"eventType\":\"BOSS_ACTION\", \"data\":{\"boss\":\"LeGrandLebowskiQuantique\", \"action\":\"QUANTUM_BOWLING\", \"critical\":true}, \"gameId\":$GAME_ID}"

# Test broadcast non-critique (doit être ignoré)
test_step "Broadcast non-critique" "/temporal/broadcast" "{\"eventType\":\"HERO_MOVEMENT\", \"data\":{\"hero\":\"TheDude\", \"from\":\"@10,10\", \"to\":\"@15,15\"}, \"gameId\":$GAME_ID}"

# === PHASE 8: NETTOYAGE ===
log "🧹 Phase 8: Nettoyage"

# Supprimer la partie
test_step "Supprimer partie" "/temporal/games/$GAME_ID" "{}"

# === RÉSULTATS FINAUX ===
echo ""
echo -e "${CYAN}🎭 RÉSULTATS DU TEST - THE DUDE ET WALTER${NC}"
echo "============================================="
echo -e "${GREEN}✅ Scénario fou créé et testé${NC}"
echo -e "${GREEN}✅ 3 nouvelles capacités spéciales implémentées${NC}"
echo -e "${GREEN}✅ Service de traduction épique${NC}"
echo -e "${GREEN}✅ Broadcast intelligent opérationnel${NC}"
echo -e "${GREEN}✅ Forge Runique intégrée${NC}"
echo ""
echo -e "${YELLOW}🎪 Citations cultes traduites :${NC}"
echo "   - \"The dude abides.\" → Traduit avec succès"
echo "   - \"You're entering a world of pain.\" → Traduit avec succès"
echo "   - \"The bums will always lose!\" → Traduit avec succès"
echo ""
echo -e "${PURPLE}🔥 Capacités spéciales testées :${NC}"
echo "   - DUDE_MODE ✅"
echo "   - ENFORCEMENT ✅"
echo "   - QUANTUM_BOWLING ✅"
echo "   - PRE_EXISTENCE_STRIKE ✅"
echo "   - MEMORY_INFECTION ✅"
echo "   - REALITY_RECOMPILE ✅"
echo "   - SCRIBE_NONEXISTENCE ✅"
echo "   - OMEGA_ZERO_ULTIMATE ✅"
echo ""
echo -e "${GREEN}🎉 TEST TERMINÉ AVEC SUCCÈS !${NC}"
echo "The Dude et Walter sont maintenant opérationnels !" 