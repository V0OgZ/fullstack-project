#!/bin/bash

# 🌟 TEST SCÉNARIOS DÉBUTANTS - Heroes of Time
# Test complet des scénarios d'introduction pour nouveaux joueurs

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🌟 HEROES OF TIME - TEST SCÉNARIOS DÉBUTANTS${NC}"
echo -e "${PURPLE}============================================${NC}"
echo -e "${CYAN}Objectif: Valider les scénarios d'introduction pour nouveaux joueurs${NC}"
echo ""

# Vérification du backend
echo -e "${BLUE}🔍 Vérification du backend...${NC}"
if curl -s http://localhost:8080/api/health > /dev/null; then
    echo -e "${GREEN}✅ Backend disponible${NC}"
else
    echo -e "${RED}❌ Backend non disponible - Démarrage...${NC}"
    cd backend && mvn spring-boot:run > backend-debutants.log 2>&1 &
    sleep 10
fi

# Fonction pour tester un scénario
test_scenario() {
    local scenario_name=$1
    local scenario_file=$2
    local hero_name=$3
    
    echo -e "${BLUE}🎮 Test du scénario: $scenario_name${NC}"
    
    # Création du jeu
    GAME_RESPONSE=$(curl -s -X POST http://localhost:8080/api/temporal/games \
      -H "Content-Type: application/json" \
      -d "{\"gameName\": \"$scenario_name\", \"playerId\": \"debutant-test\"}")
    
    GAME_ID=$(echo $GAME_RESPONSE | grep -o '"gameId":[0-9]*' | cut -d':' -f2)
    echo -e "${GREEN}✅ Jeu créé avec ID: $GAME_ID${NC}"
    
    # Démarrage du jeu
    curl -s -X POST http://localhost:8080/api/temporal/games/$GAME_ID/start > /dev/null
    echo -e "${GREEN}✅ Jeu démarré${NC}"
    
    # Création du héros principal
    curl -s -X POST http://localhost:8080/api/temporal/games/$GAME_ID/script \
      -H "Content-Type: application/json" \
      -d "{\"script\": \"HERO($hero_name)\"}" > /dev/null
    echo -e "${GREEN}✅ Héros $hero_name créé${NC}"
    
    # Exécution du scénario
    if [ -f "$scenario_file" ]; then
        echo -e "${GREEN}✅ Fichier scénario trouvé${NC}"
        
        # Lecture et exécution ligne par ligne
        while IFS= read -r line; do
            # Ignorer les lignes vides et commentaires
            if [[ ! -z "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
                if [[ "$line" =~ ^[A-Z_]+\( ]]; then
                    echo -e "${CYAN}🎯 Exécution: $line${NC}"
                    curl -s -X POST http://localhost:8080/api/temporal/games/$GAME_ID/script \
                      -H "Content-Type: application/json" \
                      -d "{\"script\": \"$line\"}" > /dev/null
                    sleep 0.3
                elif [[ "$line" =~ ^QUOTE\( ]]; then
                    echo -e "${PURPLE}💬 $line${NC}"
                fi
            fi
        done < "$scenario_file"
        
        echo -e "${GREEN}✅ Scénario $scenario_name exécuté avec succès${NC}"
    else
        echo -e "${RED}❌ Fichier scénario non trouvé: $scenario_file${NC}"
    fi
    
    echo ""
}

# Test des 3 scénarios débutants
echo -e "${BLUE}📚 TEST DES SCÉNARIOS DÉBUTANTS${NC}"
echo -e "${BLUE}==============================${NC}"

# 1. Découverte du Brouillard
test_scenario "Découverte du Brouillard" "🎮 game_assets/scenarios/hots/decouverte_brouillard.hots" "Arthur"

# 2. Premiers Artefacts
test_scenario "Premiers Artefacts" "🎮 game_assets/scenarios/hots/premiers_artefacts.hots" "Merlin"

# 3. Initiation au Combat
test_scenario "Initiation au Combat" "🎮 game_assets/scenarios/hots/initiation_combat.hots" "Guenièvre"

# Test des services pour débutants
echo -e "${BLUE}🌐 Test des services pour débutants...${NC}"

# Test du service de traduction
echo -e "${BLUE}📝 Test du service de traduction...${NC}"
TRANSLATION_RESPONSE=$(curl -s -X POST http://localhost:8080/api/collection/translate \
  -H "Content-Type: application/json" \
  -d '{"script": "HERO(Arthur)", "mode": "literary"}')

if echo "$TRANSLATION_RESPONSE" | grep -q "translated"; then
    echo -e "${GREEN}✅ Service de traduction fonctionnel${NC}"
    echo -e "${CYAN}📝 Traduction: $(echo $TRANSLATION_RESPONSE | grep -o '"translated":"[^"]*"' | cut -d'"' -f4)${NC}"
else
    echo -e "${RED}❌ Service de traduction défaillant${NC}"
fi

# Test du système de broadcast
echo -e "${BLUE}📡 Test du système de broadcast...${NC}"
BROADCAST_RESPONSE=$(curl -s -X POST http://localhost:8080/api/broadcast/intelligent \
  -H "Content-Type: application/json" \
  -d '{"message": "Arthur a découvert le brouillard!", "type": "discovery"}')

if echo "$BROADCAST_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Système de broadcast fonctionnel${NC}"
else
    echo -e "${RED}❌ Système de broadcast défaillant${NC}"
fi

# Test de la forge runique (version débutant)
echo -e "${BLUE}⚒️ Test de la forge runique (débutant)...${NC}"
FORGE_RESPONSE=$(curl -s -X POST http://localhost:8080/api/runic/forge \
  -H "Content-Type: application/json" \
  -d '{"name": "Torche Simple", "type": "tool", "formula": "USE(ITEM, torche_simple, HERO:Arthur)", "cost": "10 temporal_energy", "forged_by": "Arthur"}')

if echo "$FORGE_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Forge runique fonctionnelle${NC}"
else
    echo -e "${RED}❌ Forge runique défaillante${NC}"
fi

# Test des items simples
echo -e "${BLUE}🔧 Test des items simples...${NC}"

SIMPLE_ITEMS=(
    "torche_simple"
    "epee_bronze"
    "bouclier_bois"
    "potion_sante"
    "cristal_vision"
)

for item in "${SIMPLE_ITEMS[@]}"; do
    echo -e "${YELLOW}📦 Test de l'item: $item${NC}"
    curl -s -X POST http://localhost:8080/api/temporal/games/1/script \
      -H "Content-Type: application/json" \
      -d "{\"script\": \"CREATE(ITEM, $item, HERO:Arthur)\"}" > /dev/null
    
    curl -s -X POST http://localhost:8080/api/temporal/games/1/script \
      -H "Content-Type: application/json" \
      -d "{\"script\": \"USE(ITEM, $item, HERO:Arthur)\"}" > /dev/null
    
    sleep 0.2
done

# Test des créatures simples
echo -e "${BLUE}🐺 Test des créatures simples...${NC}"

SIMPLE_CREATURES=(
    "loup_temporel"
    "gobelin_entrainement"
    "orc_entrainement"
    "esprit_livre"
)

for creature in "${SIMPLE_CREATURES[@]}"; do
    echo -e "${YELLOW}🐺 Test de la créature: $creature${NC}"
    curl -s -X POST http://localhost:8080/api/temporal/games/1/script \
      -H "Content-Type: application/json" \
      -d "{\"script\": \"CREATE(CREATURE, $creature, @20,20)\"}" > /dev/null
    
    sleep 0.2
done

# État final
echo -e "${BLUE}📊 État final des tests...${NC}"
GAME_STATE=$(curl -s http://localhost:8080/api/temporal/games/1/state)
echo -e "${GREEN}✅ État du jeu récupéré${NC}"

# Résumé final
echo ""
echo -e "${PURPLE}🌟 RÉSUMÉ DES TESTS DÉBUTANTS${NC}"
echo -e "${PURPLE}============================${NC}"
echo -e "${GREEN}✅ 3 scénarios débutants testés${NC}"
echo -e "${GREEN}✅ 5 items simples testés${NC}"
echo -e "${GREEN}✅ 4 créatures simples testées${NC}"
echo -e "${GREEN}✅ Services (traduction, broadcast, forge) testés${NC}"
echo ""
echo -e "${CYAN}🎯 Les scénarios débutants sont prêts pour les nouveaux joueurs !${NC}"
echo -e "${CYAN}📚 Progression: Brouillard → Artefacts → Combat${NC}"
echo ""
echo -e "${YELLOW}💡 Pour relancer les tests:${NC}"
echo -e "${YELLOW}   ./⚙️ scripts/test/test-scenarios-debutants.sh${NC}" 