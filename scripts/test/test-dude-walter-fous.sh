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
        echo -e "${GREEN}✅ $step_name réussi${NC}"
        return 0
    else
        echo -e "${RED}❌ $step_name échoué${NC}"
        echo "   Erreur: $response"
        return 1
    fi
}

# Fonction pour tester une quote
test_quote() {
    local hero=$1
    local quote=$2
    
    log "💬 Test quote: $hero - \"$quote\""
    
    response=$(curl -s -X POST "$API_BASE/collection/translate" \
        -H "Content-Type: application/json" \
        -d "{\"script\":\"QUOTE($hero, \\\"$quote\\\")\", \"mode\":\"literary\"}")
    
    if echo "$response" | grep -q '"translated"'; then
        echo -e "${GREEN}✅ Quote traduite${NC}"
        echo "   Traduction: $(echo "$response" | jq -r '.translated')"
        return 0
    else
        echo -e "${RED}❌ Quote échouée${NC}"
        return 1
    fi
}

# === DÉBUT DU TEST ===
log "🚀 Démarrage du test fou The Dude et Walter"

# 1. Créer la partie
log "📝 Création de la partie de test"
response=$(curl -s -X POST "$API_BASE/temporal/games" \
    -H "Content-Type: application/json" \
    -d "{\"gameName\":\"$GAME_NAME\", \"playerId\":\"$PLAYER_ID\"}")

if echo "$response" | grep -q '"success":true'; then
    GAME_ID=$(echo "$response" | jq -r '.gameId')
    echo -e "${GREEN}✅ Partie créée (ID: $GAME_ID)${NC}"
else
    echo -e "${RED}❌ Échec création partie${NC}"
    exit 1
fi

# 2. Démarrer la partie
test_step "Démarrage partie" "/temporal/games/$GAME_ID/start" "{}"

# 3. Créer les héros
log "🦸 Création des héros fous"
test_step "Création TheDude" "/temporal/games/$GAME_ID/script" '{"script":"HERO(TheDude)"}'
test_step "Création Walter" "/temporal/games/$GAME_ID/script" '{"script":"HERO(Walter)"}'
test_step "Création LeGrandLebowskiQuantique" "/temporal/games/$GAME_ID/script" '{"script":"HERO(LeGrandLebowskiQuantique)"}'

# 4. Tester les mouvements
log "🎳 Test des mouvements bowling"
test_step "TheDude se déplace" "/temporal/games/$GAME_ID/script" '{"script":"MOV(TheDude, @10,10)"}'
test_step "Walter se déplace" "/temporal/games/$GAME_ID/script" '{"script":"MOV(Walter, @20,20)"}'
test_step "LeGrandLebowski se déplace" "/temporal/games/$GAME_ID/script" '{"script":"MOV(LeGrandLebowskiQuantique, @30,30)"}'

# 5. Tester les capacités spéciales
log "🌟 Test des capacités spéciales folles"
test_step "Dude Mode" "/temporal/games/$GAME_ID/script" '{"script":"CAST(DUDE_MODE, @15,15, TheDude)"}'
test_step "Enforcement" "/temporal/games/$GAME_ID/script" '{"script":"CAST(ENFORCEMENT, @25,25, Walter)"}'
test_step "Quantum Bowling" "/temporal/games/$GAME_ID/script" '{"script":"CAST(QUANTUM_BOWLING, @35,35, LeGrandLebowskiQuantique)"}'

# 6. Tester les artefacts
log "🎪 Test des artefacts bowling"
test_step "White Russian Quantique" "/temporal/games/$GAME_ID/script" '{"script":"USE(ARTIFACT, white_russian_quantique, HERO:TheDude)"}'
test_step "Tapis Bowling Volé" "/temporal/games/$GAME_ID/script" '{"script":"CREATE(ARTIFACT, tapis_bowling_volé, HERO:LeGrandLebowskiQuantique)"}'

# 7. Tester les quotes épiques
log "💬 Test des quotes épiques"
test_quote "TheDude" "Yeah, well, that's just, like, your opinion, man."
test_quote "Walter" "Am I the only one around here who gives a damn about the rules?!"
test_quote "LeGrandLebowskiQuantique" "I am the walrus."

# 8. Tester les batailles
log "⚔️ Test des batailles cosmiques"
test_step "Bataille TheDude vs LeGrandLebowski" "/temporal/games/$GAME_ID/script" '{"script":"BATTLE(TheDude, LeGrandLebowskiQuantique)"}'
test_step "Bataille Walter vs LeGrandLebowski" "/temporal/games/$GAME_ID/script" '{"script":"BATTLE(Walter, LeGrandLebowskiQuantique)"}'

# 9. Tester les capacités ultimes
log "🌟 Test des capacités ultimes"
test_step "Dude Mode Ultimate" "/temporal/games/$GAME_ID/script" '{"script":"CAST(DUDE_MODE_ULTIMATE, @50,50, TheDude)"}'
test_step "Enforcement Ultimate" "/temporal/games/$GAME_ID/script" '{"script":"CAST(ENFORCEMENT_ULTIMATE, @55,55, Walter)"}'

# 10. Test de la résolution
log "🎭 Test de la résolution absurde"
test_step "Drop du tapis" "/temporal/games/$GAME_ID/script" '{"script":"DROP(ARTIFACT, tapis_bowling_volé, @65,65)"}'
test_step "Victoire finale" "/temporal/games/$GAME_ID/script" '{"script":"WIN(TheDude, Walter)"}'

# 11. Test du service de traduction
log "🌐 Test du service de traduction"
test_quote "TheDude" "The dude abides."
test_quote "Walter" "You're entering a world of pain."
test_quote "LeGrandLebowskiQuantique" "The bums will always lose!"

# === FIN DU TEST ===
log "🏁 Test terminé"
echo -e "${PURPLE}🎭 Le scénario fou The Dude et Walter a été testé !${NC}"
echo -e "${CYAN}🥃 The Dude abides.${NC}"
echo -e "${YELLOW}🔫 Walter enforces the rules.${NC}"

# Nettoyage
log "🧹 Nettoyage"
curl -s -X DELETE "$API_BASE/temporal/games/$GAME_ID" > /dev/null

echo -e "${GREEN}🎉 Test du scénario fou terminé avec succès !${NC}" 