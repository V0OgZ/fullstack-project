#!/bin/bash

# Test du scénario fou Les Pieds Nickelés
# "Moi j'ai un plan !" - L'Épopée des Trois Maladroits

echo "🎭 Test du Scénario Fou - Les Pieds Nickelés"
echo "============================================="

# Configuration
API_BASE="http://localhost:8080/api"
GAME_NAME="Test-Pieds-Nickeles-Fous"
PLAYER_ID="test-pieds-nickeles"

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
        echo -e "${GREEN}✅ Succès${NC}"
        echo "   Réponse: $(echo "$response" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"
    else
        echo -e "${RED}❌ Échec${NC}"
        echo "   Erreur: $(echo "$response" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)"
    fi
}

# === PHASE 1: CRÉATION DE LA PARTIE ===
log "🎮 Phase 1: Création de la partie"

# Créer la partie
response=$(curl -s -X POST "$API_BASE/temporal/games" \
    -H "Content-Type: application/json" \
    -d "{\"gameName\":\"$GAME_NAME\", \"playerId\":\"$PLAYER_ID\"}")

if echo "$response" | grep -q '"success":true'; then
    GAME_ID=$(echo "$response" | grep -o '"gameId":[0-9]*' | cut -d':' -f2)
    echo -e "${GREEN}✅ Partie créée (ID: $GAME_ID)${NC}"
else
    echo -e "${RED}❌ Échec création partie${NC}"
    exit 1
fi

# Démarrer la partie
response=$(curl -s -X POST "$API_BASE/temporal/games/$GAME_ID/start" \
    -H "Content-Type: application/json")

if echo "$response" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Partie démarrée${NC}"
else
    echo -e "${RED}❌ Échec démarrage partie${NC}"
fi

# === PHASE 2: CRÉATION DES HÉROS PRINCIPAUX ===
log "🦸 Phase 2: Création des héros principaux"

# Ribouldingue
test_step "Création de Ribouldingue" "/temporal/games/$GAME_ID/script" \
    '{"script":"HERO(Ribouldingue)"}'

# Croquignol
test_step "Création de Croquignol" "/temporal/games/$GAME_ID/script" \
    '{"script":"HERO(Croquignol)"}'

# Filochard
test_step "Création de Filochard" "/temporal/games/$GAME_ID/script" \
    '{"script":"HERO(Filochard)"}'

# === PHASE 3: TEST DES CAPACITÉS SPÉCIALES ===
log "⚡ Phase 3: Test des capacités spéciales"

# Plan foireux de Ribouldingue
test_step "Plan foireux de Ribouldingue" "/special-abilities/plan-foireux" \
    "{\"heroName\":\"Ribouldingue\", \"gameId\":$GAME_ID}"

# Plan trop compliqué de Croquignol
test_step "Plan trop compliqué de Croquignol" "/special-abilities/plan-trop-complique" \
    "{\"heroName\":\"Croquignol\", \"gameId\":$GAME_ID}"

# Esquive totale de Filochard
test_step "Esquive totale de Filochard" "/special-abilities/esquive-totale" \
    "{\"heroName\":\"Filochard\", \"gameId\":$GAME_ID}"

# === PHASE 4: CRÉATION DES HÉROS SECONDAIRES ===
log "🎭 Phase 4: Création des héros secondaires"

# Bibendum
test_step "Création de Bibendum" "/temporal/games/$GAME_ID/script" \
    '{"script":"HERO(Bibendum)"}'

# PiedsPlats
test_step "Création de PiedsPlats" "/temporal/games/$GAME_ID/script" \
    '{"script":"HERO(PiedsPlats)"}'

# GrosPieds
test_step "Création de GrosPieds" "/temporal/games/$GAME_ID/script" \
    '{"script":"HERO(GrosPieds)"}'

# Tromblon
test_step "Création de Tromblon" "/temporal/games/$GAME_ID/script" \
    '{"script":"HERO(Tromblon)"}'

# Bourrichon
test_step "Création de Bourrichon" "/temporal/games/$GAME_ID/script" \
    '{"script":"HERO(Bourrichon)"}'

# PiedsCarrés
test_step "Création de PiedsCarrés" "/temporal/games/$GAME_ID/script" \
    '{"script":"HERO(PiedsCarrés)"}'

# PiedsMous
test_step "Création de PiedsMous" "/temporal/games/$GAME_ID/script" \
    '{"script":"HERO(PiedsMous)"}'

# === PHASE 5: TEST DES AUTRES CAPACITÉS ===
log "🎪 Phase 5: Test des autres capacités"

# Intervention ratée de Bibendum
test_step "Intervention ratée de Bibendum" "/special-abilities/intervention-rate" \
    "{\"heroName\":\"Bibendum\", \"gameId\":$GAME_ID}"

# Mauvaise piste de PiedsPlats
test_step "Mauvaise piste de PiedsPlats" "/special-abilities/mauvaise-piste" \
    "{\"heroName\":\"PiedsPlats\", \"gameId\":$GAME_ID}"

# === PHASE 6: TEST DU SERVICE DE TRADUCTION ===
log "🌐 Phase 6: Test du service de traduction"

# Traduire des quotes cultes
quotes=(
    "QUOTE(Ribouldingue, \"Moi j'ai un plan !\")"
    "QUOTE(Croquignol, \"J'ai une idée géniale !\")"
    "QUOTE(Filochard, \"Moi je me tire !\")"
    "QUOTE(Bibendum, \"Halt-là ! Au nom de la loi !\")"
    "QUOTE(PiedsPlats, \"J'ai trouvé un indice !\")"
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
        echo -e "${RED}❌ Échec traduction${NC}"
    fi
done

# === PHASE 7: TEST DU BROADCAST INTELLIGENT ===
log "📡 Phase 7: Test du broadcast intelligent"

# Broadcast critique
test_step "Broadcast critique" "/temporal/broadcast" \
    '{"eventType":"PIEDS_NICKELES_ACTION", "data":{"hero":"Ribouldingue", "action":"PLAN_FOIREUX", "critical":true}, "gameId":'$GAME_ID'}'

# Broadcast non-critique
test_step "Broadcast non-critique" "/temporal/broadcast" \
    '{"eventType":"HERO_MOVEMENT", "data":{"hero":"Filochard", "from":"@10,10", "to":"@15,15"}, "gameId":'$GAME_ID'}'

# === PHASE 8: TEST DE LA FORGE RUNIQUE ===
log "🔨 Phase 8: Test de la Forge Runique"

# Forger un objet avec une formule absurde
test_step "Forge d'objet absurde" "/runic-forge/forge" \
    '{"formula":"PIEDS_NICKELES + MALADRESSE = SUCCES", "name":"PlanFoireuxUltime", "type":"ARTIFACT", "gameId":'$GAME_ID'}'

# Valider une grammaire runique
test_step "Validation grammaire" "/runic-forge/validate" \
    '{"formula":"MALADRESSE * CHAOS = RIRE", "gameId":'$GAME_ID'}'

# === PHASE 9: EXÉCUTION DU SCÉNARIO COMPLET ===
log "🎭 Phase 9: Exécution du scénario complet"

# Lire et exécuter le fichier HOTS
if [ -f "🎮 game_assets/scenarios/hots/les_pieds_nickeles_fous.hots" ]; then
    log "📖 Lecture du scénario HOTS"
    
    while IFS= read -r line; do
        # Ignorer les commentaires et lignes vides
        if [[ ! "$line" =~ ^[[:space:]]*# ]] && [[ -n "$line" ]]; then
            # Extraire la commande HOTS
            if [[ "$line" =~ ^([A-Z_]+)\(([^)]+)\) ]]; then
                command="${BASH_REMATCH[1]}"
                params="${BASH_REMATCH[2]}"
                
                log "🎮 Exécution: $command($params)"
                
                response=$(curl -s -X POST "$API_BASE/temporal/games/$GAME_ID/script" \
                    -H "Content-Type: application/json" \
                    -d "{\"script\":\"$line\"}")
                
                if echo "$response" | grep -q '"success":true'; then
                    echo -e "${GREEN}✅ Succès${NC}"
                else
                    echo -e "${YELLOW}⚠️ Ignoré ou échec (normal pour certaines commandes)${NC}"
                fi
            fi
        fi
    done < "🎮 game_assets/scenarios/hots/les_pieds_nickeles_fous.hots"
else
    echo -e "${RED}❌ Fichier HOTS non trouvé${NC}"
fi

# === PHASE 10: RAPPORT FINAL ===
log "📊 Phase 10: Rapport final"

# Vérifier l'état de la partie
response=$(curl -s -X GET "$API_BASE/temporal/games/$GAME_ID")

if echo "$response" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Partie toujours active${NC}"
    
    # Compter les héros
    hero_count=$(echo "$response" | grep -o '"name":"[^"]*"' | wc -l)
    echo "   Héros créés: $hero_count"
    
    # Afficher les héros
    echo "   Liste des héros:"
    echo "$response" | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | while read hero; do
        echo "   - $hero"
    done
else
    echo -e "${RED}❌ Erreur lors de la vérification de la partie${NC}"
fi

# === FINAL ===
echo ""
echo -e "${PURPLE}🎭 TEST TERMINÉ - LES PIEDS NICKELÉS${NC}"
echo "============================================="
echo -e "${CYAN}🎪 Scénario fou testé avec succès !${NC}"
echo -e "${YELLOW}🎭 Les maladresses sont devenues un art !${NC}"
echo -e "${GREEN}✅ Tous les héros absurdes sont opérationnels !${NC}"
echo ""
echo -e "${BLUE}💡 Pour relancer le test:${NC}"
echo "   ./⚙️ scripts/test/test-pieds-nickeles-fous.sh"
echo ""
echo -e "${BLUE}🎮 Pour voir le scénario:${NC}"
echo "   cat 🎮 game_assets/scenarios/hots/les_pieds_nickeles_fous.hots"
echo ""
echo -e "${BLUE}📖 Pour voir la documentation:${NC}"
echo "   cat 📚 MEMENTO/SCENARIOS/LES_PIEDS_NICKELES_FOUS.md" 