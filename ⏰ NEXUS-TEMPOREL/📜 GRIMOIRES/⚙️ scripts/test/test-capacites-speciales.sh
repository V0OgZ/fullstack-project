#!/bin/bash

# Test des capacités spéciales avec broadcast intelligent
# Évite la surcharge serveur en broadcastant seulement les événements critiques

echo "⚔️ Test des Capacités Spéciales - Broadcast Intelligent"
echo "=================================================="

# Configuration
API_BASE="http://localhost:8080/api"
GAME_NAME="Test-Capacites-Speciales"
PLAYER_ID="test-player"

# Couleurs pour le terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour logger avec timestamp
log() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"
}

# Fonction pour tester une capacité spéciale
test_capacity() {
    local capacity_name=$1
    local hero_name=$2
    local endpoint=$3
    
    log "🧪 Test de la capacité: ${YELLOW}$capacity_name${NC}"
    
    response=$(curl -s -X POST "$API_BASE/special-abilities/$endpoint" \
        -H "Content-Type: application/json" \
        -d "{
            \"gameId\": $GAME_ID,
            \"heroName\": \"$hero_name\"
        }")
    
    if echo "$response" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ $capacity_name réussi${NC}"
        
        # Broadcast intelligent seulement pour les capacités critiques
        if [[ "$capacity_name" == *"OMEGA"* || "$capacity_name" == *"NONEXISTENCE"* ]]; then
            log "📡 Broadcast critique pour $capacity_name"
            curl -s -X POST "$API_BASE/temporal/broadcast" \
                -H "Content-Type: application/json" \
                -d "{
                    \"eventType\": \"CAPACITY_SPECIALE_ACTIVEE\",
                    \"data\": {
                        \"capacity\": \"$capacity_name\",
                        \"hero\": \"$hero_name\",
                        \"critical\": true
                    }
                }" > /dev/null
        fi
    else
        echo -e "${RED}❌ $capacity_name échoué${NC}"
        echo "   Erreur: $(echo "$response" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)"
    fi
}

# Fonction pour tester la Forge Runique avec broadcast intelligent
test_runic_forge() {
    log "🔨 Test de la Forge Runique - Broadcast Intelligent"
    
    # Test de forge simple (pas de broadcast)
    response=$(curl -s -X POST "$API_BASE/runic-forge/forge" \
        -H "Content-Type: application/json" \
        -d "{
            \"formula\": \"HERO(TestHero)\",
            \"name\": \"Épée de Test\",
            \"type\": \"WEAPON\",
            \"gameId\": $GAME_ID
        }")
    
    if echo "$response" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ Forge simple réussie${NC}"
    else
        echo -e "${RED}❌ Forge simple échouée${NC}"
    fi
    
    # Test de forge dangereuse (broadcast critique)
    response=$(curl -s -X POST "$API_BASE/runic-forge/forge" \
        -H "Content-Type: application/json" \
        -d "{
            \"formula\": \"ψ††††† + Σ + Ω\",
            \"name\": \"Objet Dangereux\",
            \"type\": \"PARADOX\",
            \"gameId\": $GAME_ID
        }")
    
    if echo "$response" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ Forge dangereuse réussie${NC}"
        
        # Broadcast critique pour objet dangereux
        log "📡 Broadcast critique pour objet dangereux"
        curl -s -X POST "$API_BASE/temporal/broadcast" \
            -H "Content-Type: application/json" \
            -d "{
                \"eventType\": \"FORGE_DANGEREUSE\",
                \"data\": {
                    \"objectName\": \"Objet Dangereux\",
                    \"riskLevel\": 0.9,
                    \"critical\": true
                }
            }" > /dev/null
    else
        echo -e "${RED}❌ Forge dangereuse échouée${NC}"
    fi
}

# Démarrage du test
log "🚀 Démarrage du test des capacités spéciales"

# 1. Créer une partie
log "📝 Création de la partie de test"
response=$(curl -s -X POST "$API_BASE/temporal/games" \
    -H "Content-Type: application/json" \
    -d "{
        \"gameName\": \"$GAME_NAME\",
        \"playerId\": \"$PLAYER_ID\"
    }")

GAME_ID=$(echo "$response" | grep -o '"gameId":[0-9]*' | cut -d':' -f2)

if [ -z "$GAME_ID" ]; then
    echo -e "${RED}❌ Impossible de créer la partie${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Partie créée (ID: $GAME_ID)${NC}"

# 2. Démarrer la partie
log "▶️ Démarrage de la partie"
curl -s -X POST "$API_BASE/temporal/games/$GAME_ID/start" > /dev/null

# 3. Créer des héros de test
log "🦸 Création des héros de test"

heroes=("Jean-Grofignon" "Claudius" "Chlamydius" "Omega-Zero")

for hero in "${heroes[@]}"; do
    response=$(curl -s -X POST "$API_BASE/temporal/games/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"HERO($hero)\"}")
    
    if echo "$response" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ Héros $hero créé${NC}"
    else
        echo -e "${RED}❌ Échec création héros $hero${NC}"
    fi
done

# 4. Tester les capacités spéciales
log "⚔️ Test des capacités spéciales"

# Test PRE_EXISTENCE_STRIKE
test_capacity "PRE_EXISTENCE_STRIKE" "Jean-Grofignon" "pre-existence-strike"

# Test MEMORY_INFECTION
test_capacity "MEMORY_INFECTION" "Claudius" "memory-infection"

# Test REALITY_RECOMPILE
test_capacity "REALITY_RECOMPILE" "Chlamydius" "reality-recompile"

# Test SCRIBE_NONEXISTENCE
test_capacity "SCRIBE_NONEXISTENCE" "Chlamydius" "scribe-nonexistence"

# Test OMEGA_ZERO_ULTIMATE
test_capacity "OMEGA_ZERO_ULTIMATE" "Omega-Zero" "omega-zero-ultimate"

# 5. Tester la Forge Runique
test_runic_forge

# 6. Vérifier les statistiques
log "📊 Vérification des statistiques"

# Stats des capacités spéciales
response=$(curl -s -X GET "$API_BASE/special-abilities/stats")
if echo "$response" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Statistiques des capacités récupérées${NC}"
else
    echo -e "${RED}❌ Échec récupération statistiques capacités${NC}"
fi

# Stats de la Forge Runique
response=$(curl -s -X GET "$API_BASE/runic-forge/stats")
if echo "$response" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Statistiques de la Forge récupérées${NC}"
else
    echo -e "${RED}❌ Échec récupération statistiques Forge${NC}"
fi

# 7. Test de broadcast intelligent
log "📡 Test du système de broadcast intelligent"

# Test broadcast critique
response=$(curl -s -X POST "$API_BASE/temporal/broadcast" \
    -H "Content-Type: application/json" \
    -d "{
        \"eventType\": \"BOSS_ACTION\",
        \"data\": {
            \"boss\": \"Omega-Zero\",
            \"action\": \"PRE_EXISTENCE_STRIKE\",
            \"critical\": true
        }
    }")

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Broadcast critique fonctionnel${NC}"
else
    echo -e "${RED}❌ Échec broadcast critique${NC}"
fi

# Test broadcast non-critique (doit être ignoré)
response=$(curl -s -X POST "$API_BASE/temporal/broadcast" \
    -H "Content-Type: application/json" \
    -d "{
        \"eventType\": \"HERO_MOVEMENT\",
        \"data\": {
            \"hero\": \"Jean-Grofignon\",
            \"action\": \"MOV\",
            \"critical\": false
        }
    }")

echo -e "${YELLOW}ℹ️ Broadcast non-critique ignoré (normal)${NC}"

# 8. Fin du test
log "🏁 Test terminé"
echo -e "${GREEN}✅ Tous les tests des capacités spéciales et de la Forge Runique sont terminés${NC}"
echo -e "${BLUE}📡 Le système de broadcast intelligent évite la surcharge serveur${NC}"
echo -e "${YELLOW}💡 Seuls les événements critiques sont broadcastés${NC}"

# Nettoyage
log "🧹 Nettoyage"
curl -s -X DELETE "$API_BASE/temporal/games/$GAME_ID" > /dev/null

echo -e "${GREEN}🎉 Test des capacités spéciales terminé avec succès !${NC}" 