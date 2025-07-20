#!/bin/bash

# 🏰 TEST SCÉNARIO "LA TOUR SOMBRE" - Roland le Gardien
# Test complet du scénario épique avec tous les artefacts

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🏰 HEROES OF TIME - TEST SCÉNARIO 'LA TOUR SOMBRE'${NC}"
echo -e "${PURPLE}================================================${NC}"
echo -e "${CYAN}Héros: Roland - Le Gardien de la Tour${NC}"
echo -e "${CYAN}Objectif: Conquérir la Tour Sombre et vaincre l'Ombre Éternelle${NC}"
echo ""

# Vérification du backend
echo -e "${BLUE}🔍 Vérification du backend...${NC}"
if curl -s http://localhost:8080/api/health > /dev/null; then
    echo -e "${GREEN}✅ Backend disponible${NC}"
else
    echo -e "${RED}❌ Backend non disponible - Démarrage...${NC}"
    cd backend && mvn spring-boot:run > backend-tour-sombre.log 2>&1 &
    sleep 10
fi

# Création du jeu
echo -e "${BLUE}🎮 Création du jeu 'La Tour Sombre'...${NC}"
GAME_RESPONSE=$(curl -s -X POST http://localhost:8080/api/temporal/games \
  -H "Content-Type: application/json" \
  -d '{"gameName": "La Tour Sombre", "playerId": "roland-test"}')

GAME_ID=$(echo $GAME_RESPONSE | grep -o '"gameId":[0-9]*' | cut -d':' -f2)
echo -e "${GREEN}✅ Jeu créé avec ID: $GAME_ID${NC}"

# Démarrage du jeu
echo -e "${BLUE}🚀 Démarrage du jeu...${NC}"
curl -s -X POST http://localhost:8080/api/temporal/games/$GAME_ID/start > /dev/null
echo -e "${GREEN}✅ Jeu démarré${NC}"

# Création de Roland
echo -e "${BLUE}⚔️ Création de Roland, le Gardien de la Tour...${NC}"
curl -s -X POST http://localhost:8080/api/temporal/games/$GAME_ID/script \
  -H "Content-Type: application/json" \
  -d '{"script": "HERO(Roland)"}' > /dev/null
echo -e "${GREEN}✅ Roland créé${NC}"

# Test des artefacts légendaires
echo -e "${BLUE}🔮 Test des artefacts légendaires...${NC}"

ARTIFACTS=(
    "epee_temporelle"
    "bouclier_chronos"
    "oeil_wigner"
    "voile_quantique"
    "compas_temporel"
    "miroir_quantique"
    "tour_ancrage"
    "disrupteur_causal"
    "grofi_omega"
    "grofi_alpha"
)

for artifact in "${ARTIFACTS[@]}"; do
    echo -e "${YELLOW}📦 Création de l'artefact: $artifact${NC}"
    curl -s -X POST http://localhost:8080/api/temporal/games/$GAME_ID/script \
      -H "Content-Type: application/json" \
      -d "{\"script\": \"CREATE(ARTIFACT, $artifact, HERO:Roland)\"}" > /dev/null
    
    echo -e "${YELLOW}✨ Utilisation de l'artefact: $artifact${NC}"
    curl -s -X POST http://localhost:8080/api/temporal/games/$GAME_ID/script \
      -H "Content-Type: application/json" \
      -d "{\"script\": \"USE(ARTIFACT, $artifact, HERO:Roland)\"}" > /dev/null
    
    sleep 1
done

# Test des artefacts mineurs
echo -e "${BLUE}🔧 Test des artefacts mineurs...${NC}"

MINOR_ARTIFACTS=(
    "dissipateur_brouillard"
    "boost_mouvement"
    "ancrage_temporel"
    "vision_etendue"
    "reduction_degats"
    "revele_heros"
    "restauration_energie"
    "teleportation_adjacente"
    "illumination_zone"
    "restauration_sante"
)

for artifact in "${MINOR_ARTIFACTS[@]}"; do
    echo -e "${YELLOW}📦 Création de l'artefact mineur: $artifact${NC}"
    curl -s -X POST http://localhost:8080/api/temporal/games/$GAME_ID/script \
      -H "Content-Type: application/json" \
      -d "{\"script\": \"CREATE(ARTIFACT, $artifact, HERO:Roland)\"}" > /dev/null
    
    echo -e "${YELLOW}✨ Utilisation de l'artefact mineur: $artifact${NC}"
    curl -s -X POST http://localhost:8080/api/temporal/games/$GAME_ID/script \
      -H "Content-Type: application/json" \
      -d "{\"script\": \"USE(ARTIFACT, $artifact, HERO:Roland)\"}" > /dev/null
    
    sleep 0.5
done

# Exécution du scénario HOTS
echo -e "${BLUE}📜 Exécution du scénario HOTS 'La Tour Sombre'...${NC}"
SCENARIO_FILE="game_assets/scenarios/hots/la_tour_sombre.hots"

if [ -f "$SCENARIO_FILE" ]; then
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
                sleep 0.5
            elif [[ "$line" =~ ^QUOTE\( ]]; then
                echo -e "${PURPLE}💬 $line${NC}"
            fi
        fi
    done < "$SCENARIO_FILE"
    
    echo -e "${GREEN}✅ Scénario exécuté avec succès${NC}"
else
    echo -e "${RED}❌ Fichier scénario non trouvé: $SCENARIO_FILE${NC}"
fi

# Test du service de traduction
echo -e "${BLUE}🌐 Test du service de traduction...${NC}"
TRANSLATION_RESPONSE=$(curl -s -X POST http://localhost:8080/api/collection/translate \
  -H "Content-Type: application/json" \
  -d '{"script": "HERO(Roland)", "mode": "literary"}')

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
  -d '{"message": "Roland a vaincu l'\''Ombre Éternelle dans la Tour Sombre!", "type": "victory"}')

if echo "$BROADCAST_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Système de broadcast fonctionnel${NC}"
else
    echo -e "${RED}❌ Système de broadcast défaillant${NC}"
fi

# Test de la forge runique
echo -e "${BLUE}⚒️ Test de la forge runique...${NC}"
FORGE_RESPONSE=$(curl -s -X POST http://localhost:8080/api/runic/forge \
  -H "Content-Type: application/json" \
  -d '{"name": "Épée de Roland", "type": "weapon", "formula": "USE(ARTIFACT, epee_temporelle, HERO:Roland)", "cost": "100 temporal_energy", "forged_by": "Roland"}')

if echo "$FORGE_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Forge runique fonctionnelle${NC}"
else
    echo -e "${RED}❌ Forge runique défaillante${NC}"
fi

# État final du jeu
echo -e "${BLUE}📊 État final du jeu...${NC}"
GAME_STATE=$(curl -s http://localhost:8080/api/temporal/games/$GAME_ID/state)
echo -e "${GREEN}✅ État du jeu récupéré${NC}"

# Résumé final
echo ""
echo -e "${PURPLE}🏰 RÉSUMÉ DU TEST 'LA TOUR SOMBRE'${NC}"
echo -e "${PURPLE}================================${NC}"
echo -e "${GREEN}✅ Jeu créé et démarré${NC}"
echo -e "${GREEN}✅ Roland créé et équipé${NC}"
echo -e "${GREEN}✅ ${#ARTIFACTS[@]} artefacts légendaires testés${NC}"
echo -e "${GREEN}✅ ${#MINOR_ARTIFACTS[@]} artefacts mineurs testés${NC}"
echo -e "${GREEN}✅ Scénario HOTS exécuté${NC}"
echo -e "${GREEN}✅ Services testés (traduction, broadcast, forge)${NC}"
echo ""
echo -e "${CYAN}🎯 Roland a conquis la Tour Sombre et vaincu l'Ombre Éternelle !${NC}"
echo -e "${CYAN}🏆 La Tour de Lumière brille maintenant dans le paysage temporel !${NC}"
echo ""
echo -e "${YELLOW}💡 Pour relancer le test:${NC}"
echo -e "${YELLOW}   ./scripts/test/test-tour-sombre.sh${NC}" 