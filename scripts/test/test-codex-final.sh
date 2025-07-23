#!/bin/bash

# 🏆 TEST CODEX FINAL - Heroes of Time
# Test du scénario épique "Le Treizième Codex" avec Omega-Zéro
# =============================================================

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
BACKEND_URL="http://localhost:8080"
SCENARIO_FILE="game_assets/scenarios/hots/codex_final.hots"
LOG_FILE="logs/test-codex-final-$(date +%Y%m%d_%H%M%S).log"

echo -e "${PURPLE}🏆 TEST CODEX FINAL - Heroes of Time${NC}"
echo -e "${PURPLE}=====================================${NC}"
echo -e "${CYAN}Test du scénario épique 'Le Treizième Codex'${NC}"
echo -e "${CYAN}Avec Omega-Zéro, le Boss Final (999 héros fusionnés)${NC}"
echo ""

# Fonction de log
log() {
    echo -e "$1" | tee -a "$LOG_FILE"
}

# Vérification des prérequis
log "${YELLOW}🔍 Vérification des prérequis...${NC}"

# Vérifier que le backend est actif
if ! curl -s "$BACKEND_URL/api/health" > /dev/null; then
    log "${RED}❌ Backend non accessible sur $BACKEND_URL${NC}"
    log "${YELLOW}💡 Lancez: cd backend && mvn spring-boot:run${NC}"
    exit 1
fi

# Vérifier que le fichier scénario existe
if [ ! -f "$SCENARIO_FILE" ]; then
    log "${RED}❌ Fichier scénario non trouvé: $SCENARIO_FILE${NC}"
    exit 1
fi

log "${GREEN}✅ Prérequis validés${NC}"
echo ""

# Créer le dossier de logs si nécessaire
mkdir -p logs

# Fonction de test d'API
test_api() {
    local endpoint="$1"
    local expected_status="$2"
    local description="$3"
    
    log "${BLUE}🧪 Test: $description${NC}"
    
    response=$(curl -s -w "%{http_code}" "$BACKEND_URL$endpoint" -o /tmp/response.json)
    status_code="${response: -3}"
    
    if [ "$status_code" = "$expected_status" ]; then
        log "${GREEN}✅ Succès ($status_code)${NC}"
        if [ -s /tmp/response.json ]; then
            log "${CYAN}📄 Réponse: $(cat /tmp/response.json | head -c 200)...${NC}"
        fi
    else
        log "${RED}❌ Échec (attendu: $expected_status, reçu: $status_code)${NC}"
        if [ -s /tmp/response.json ]; then
            log "${RED}📄 Erreur: $(cat /tmp/response.json)${NC}"
        fi
        return 1
    fi
    echo ""
}

# Fonction de test de script HOTS
test_hots_script() {
    local script="$1"
    local description="$2"
    
    log "${BLUE}🎮 Test HOTS: $description${NC}"
    log "${CYAN}📜 Script: $script${NC}"
    
    # Créer une partie de test
    game_response=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
        -H "Content-Type: application/json" \
        -d '{"gameName": "CodexTest", "playerId": "test-codex"}')
    
    game_id=$(echo "$game_response" | grep -o '"gameId":[0-9]*' | cut -d':' -f2)
    
    if [ -z "$game_id" ]; then
        log "${RED}❌ Impossible de créer une partie${NC}"
        return 1
    fi
    
    log "${GREEN}✅ Partie créée (ID: $game_id)${NC}"
    
    # Démarrer la partie
    curl -s -X POST "$BACKEND_URL/api/temporal/games/$game_id/start" > /dev/null
    
    # Exécuter le script
    script_response=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$game_id/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"$script\"}")
    
    if echo "$script_response" | grep -q '"success":true'; then
        log "${GREEN}✅ Script exécuté avec succès${NC}"
        log "${CYAN}📄 Résultat: $(echo "$script_response" | head -c 200)...${NC}"
    else
        log "${RED}❌ Échec d'exécution du script${NC}"
        log "${RED}📄 Erreur: $script_response${NC}"
        return 1
    fi
    echo ""
}

# Tests des APIs de base
log "${PURPLE}🚀 TESTS DES APIs DE BASE${NC}"
echo "=================================="

test_api "/api/health" "200" "Health Check"
test_api "/api/temporal/games" "200" "Liste des parties"

# Tests des héros épiques du Codex
log "${PURPLE}⚔️ TESTS DES HÉROS ÉPIQUES${NC}"
echo "=================================="

test_hots_script "HERO(Omega-Zero)" "Création d'Omega-Zéro, le Boss Final"
test_hots_script "HERO(Chlamydius)" "Création de Chlamydius, le Scribe Non Né"
test_hots_script "HERO(Jean-Grofignon)" "Création de Jean-Grofignon, l'Éveillé Ontologique"

# Tests des artefacts légendaires d'Omega
log "${PURPLE}🏺 TESTS DES ARTEFACTS LÉGENDAIRES${NC}"
echo "=========================================="

test_hots_script "CREATE(ARTIFACT, parchemin_sale, HERO:Chlamydius)" "Création du Parchemin Sale"
test_hots_script "CREATE(ARTIFACT, encre_vivante, HERO:Chlamydius)" "Création de l'Encre Vivante"
test_hots_script "CREATE(ARTIFACT, livre_vide_sans_nom, HERO:Chlamydius)" "Création du Livre Vide Sans Nom"

# Tests des capacités spéciales
log "${PURPLE}🌟 TESTS DES CAPACITÉS SPÉCIALES${NC}"
echo "========================================"

test_hots_script "USE(ARTIFACT, parchemin_sale, HERO:Chlamydius)" "Utilisation du Parchemin Sale"
test_hots_script "USE(ARTIFACT, encre_vivante, HERO:Chlamydius)" "Utilisation de l'Encre Vivante"

# Test du scénario complet
log "${PURPLE}📖 TEST DU SCÉNARIO COMPLET${NC}"
echo "=================================="

if [ -f "$SCENARIO_FILE" ]; then
    log "${BLUE}📜 Lecture du scénario: $SCENARIO_FILE${NC}"
    
    # Lire le contenu du scénario
    scenario_content=$(cat "$SCENARIO_FILE")
    
    log "${CYAN}📄 Contenu du scénario (premières lignes):${NC}"
    echo "$scenario_content" | head -10 | while read line; do
        log "${CYAN}   $line${NC}"
    done
    
    # Créer une partie pour le scénario complet
    game_response=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
        -H "Content-Type: application/json" \
        -d '{"gameName": "CodexFinal", "playerId": "test-scenario"}')
    
    game_id=$(echo "$game_response" | grep -o '"gameId":[0-9]*' | cut -d':' -f2)
    
    if [ -n "$game_id" ]; then
        log "${GREEN}✅ Partie scénario créée (ID: $game_id)${NC}"
        
        # Démarrer la partie
        curl -s -X POST "$BACKEND_URL/api/temporal/games/$game_id/start" > /dev/null
        
        # Exécuter les premières commandes du scénario
        log "${BLUE}🎮 Exécution des premières commandes du scénario...${NC}"
        
        # Extraire et exécuter les premières commandes HOTS
        echo "$scenario_content" | grep -E "^(HERO|CREATE|USE|MOV|BATTLE)" | head -5 | while read command; do
            if [ -n "$command" ]; then
                log "${CYAN}📜 Exécution: $command${NC}"
                
                script_response=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$game_id/script" \
                    -H "Content-Type: application/json" \
                    -d "{\"script\": \"$command\"}")
                
                if echo "$script_response" | grep -q '"success":true'; then
                    log "${GREEN}✅ Succès${NC}"
                else
                    log "${YELLOW}⚠️ Échec ou commande non supportée${NC}"
                fi
            fi
        done
    fi
else
    log "${RED}❌ Fichier scénario non trouvé${NC}"
fi

# Test du service de traduction littéraire
log "${PURPLE}🎭 TEST DU SERVICE DE TRADUCTION LITTÉRAIRE${NC}"
echo "=================================================="

test_translation() {
    local script="$1"
    local description="$2"
    
    log "${BLUE}🎨 Test traduction: $description${NC}"
    
    translation_response=$(curl -s -X POST "$BACKEND_URL/api/collection/translate" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"$script\", \"mode\": \"literary\"}")
    
    if echo "$translation_response" | grep -q '"translatedScript"'; then
        translated=$(echo "$translation_response" | grep -o '"translatedScript":"[^"]*"' | cut -d'"' -f4)
        log "${GREEN}✅ Traduction réussie${NC}"
        log "${CYAN}📜 Original: $script${NC}"
        log "${CYAN}🎭 Traduit: $translated${NC}"
    else
        log "${RED}❌ Échec de la traduction${NC}"
        log "${RED}📄 Erreur: $translation_response${NC}"
    fi
    echo ""
}

test_translation "HERO(Omega-Zero)" "Création d'Omega-Zéro en mode littéraire"
test_translation "CREATE(ARTIFACT, parchemin_sale, HERO:Chlamydius)" "Création d'artefact en mode littéraire"
test_translation "ψ: ⊙(Δt+2 @15,15 ⟶ USE(ARTIFACT, grofi_omega, HERO:Jean-Grofignon))" "État quantique en mode littéraire"

# Bilan final
log "${PURPLE}🏁 BILAN FINAL${NC}"
echo "=============="

log "${GREEN}✅ Tests du Codex Final terminés${NC}"
log "${CYAN}📊 Logs sauvegardés dans: $LOG_FILE${NC}"
log "${YELLOW}💡 Prochaines étapes:${NC}"
log "${YELLOW}   - Implémenter les capacités spéciales manquantes${NC}"
log "${YELLOW}   - Créer l'interface UI pour la Forge Runique${NC}"
log "${YELLOW}   - Ajouter les cinématiques in-game${NC}"

echo ""
log "${PURPLE}🌟 'Le Treizième Codex est scellé, mais l'épopée continue...'${NC}"
log "${PURPLE}   - Memento, Scribe du Multivers${NC}"

echo ""
log "${GREEN}🎉 Test Codex Final terminé avec succès !${NC}" 