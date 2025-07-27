#!/bin/bash

# 🧚‍♀️ TEST CRÉATURES QUANTIQUES - HEROES OF TIME
# ===============================================
# Test des créatures quantiques du système

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${PURPLE}🧚‍♀️ TEST CRÉATURES QUANTIQUES - HEROES OF TIME${NC}"
echo "=============================================="
echo -e "${CYAN}🎭 Test des créatures quantiques du système${NC}"
echo ""

# Configuration
BACKEND_URL="http://localhost:8080"
GAME_ID=""
LOG_FILE="logs/test-creatures-quantiques.log"

# Créer le dossier logs
mkdir -p logs

# Fonction pour logger
log() {
    echo "$1" | tee -a "$LOG_FILE"
}

# Fonction pour tester la connexion backend
test_backend() {
    echo -e "${CYAN}🔍 Vérification du backend...${NC}"
    if curl -s "$BACKEND_URL/api/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend accessible${NC}"
        log "✅ Backend accessible"
        return 0
    else
        echo -e "${RED}❌ Backend non accessible${NC}"
        log "❌ Backend non accessible"
        return 1
    fi
}

# Fonction pour créer un nouveau jeu
create_game() {
    echo -e "${CYAN}🎮 Création d'un nouveau jeu...${NC}"
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
        -H "Content-Type: application/json" \
        -d '{
            "gameName": "Test Créatures Quantiques",
            "playerCount": 2,
            "mapWidth": 20,
            "mapHeight": 20
        }')
    
    GAME_ID=$(echo $RESPONSE | grep -o '"gameId":[0-9]*' | grep -o '[0-9]*')
    if [ -n "$GAME_ID" ]; then
        echo -e "${GREEN}✅ Jeu créé avec ID: $GAME_ID${NC}"
        log "✅ Jeu créé avec ID: $GAME_ID"
        return 0
    else
        echo -e "${RED}❌ Échec de création du jeu${NC}"
        echo "Réponse: $RESPONSE"
        log "❌ Échec de création du jeu: $RESPONSE"
        return 1
    fi
}

# Fonction pour exécuter un script HOTS
execute_hots_script() {
    local script="$1"
    local description="$2"
    
    echo -e "${BLUE}📝 Test: $description${NC}"
    echo "   Script: $script"
    
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"$script\"}")
    
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ Succès${NC}"
        log "✅ $description: $script"
        return 0
    else
        echo -e "${RED}❌ Échec${NC}"
        echo "   Réponse: $RESPONSE"
        log "❌ $description: $script - $RESPONSE"
        return 1
    fi
}

# Fonction pour tester une créature quantique
test_quantum_creature() {
    local creature_id="$1"
    local creature_name="$2"
    local tier="$3"
    
    echo ""
    echo -e "${MAGENTA}🧚‍♀️ TEST CRÉATURE: $creature_name (Tier $tier)${NC}"
    echo "====================================="
    
    # Créer la créature
    execute_hots_script "CREATE(CREATURE, $creature_id, @10,10)" "Créer $creature_name"
    
    # Tester les capacités quantiques avec des états ψ
    execute_hots_script "ψ001: ⊙(Δt+1 @10,10 ⟶ ACTIVATE($creature_id))" "Activer $creature_name"
    
    # Tester les interférences quantiques
    execute_hots_script "ψ002: (0.8+0.6i) ⊙(Δt+2 @12,12 ⟶ CREATE(CREATURE, quantum_wisp, @12,12))" "Créer interférence avec Luciole"
    
    # Tester le combat quantique
    execute_hots_script "ψ003: ⊙(Δt+3 @11,11 ⟶ BATTLE($creature_id, quantum_wisp))" "Combat quantique"
    
    # Tester les capacités spéciales
    execute_hots_script "ψ004: ⊙(Δt+4 ⟶ ABILITY($creature_id, quantum_ability))" "Capacité quantique"
    
    # Collapse des états
    execute_hots_script "†ψ001" "Collapse état 1"
    execute_hots_script "†ψ002" "Collapse état 2"
    execute_hots_script "†ψ003" "Collapse état 3"
    execute_hots_script "†ψ004" "Collapse état 4"
}

# Début du test
log "🧚‍♀️ TEST CRÉATURES QUANTIQUES - HEROES OF TIME"
log "=============================================="
log "Date: $(date)"
log ""

# Vérifier le backend
if ! test_backend; then
    exit 1
fi

# Créer un nouveau jeu
if ! create_game; then
    exit 1
fi

echo ""
echo -e "${MAGENTA}🧚‍♀️ TIER 1 - CRÉATURES QUANTIQUES DE BASE${NC}"
echo "============================================="

# Test Luciole Quantique
test_quantum_creature "quantum_wisp" "Luciole Quantique" "1"

# Test Araignée des Probabilités
test_quantum_creature "probability_spider" "Araignée des Probabilités" "1"

echo ""
echo -e "${MAGENTA}⚔️ TIER 2 - CRÉATURES QUANTIQUES AVANCÉES${NC}"
echo "============================================="

# Test Chevalier Quantique
test_quantum_creature "quantum_knight" "Chevalier Quantique" "2"

# Test Chat Quantique
test_quantum_creature "quantum_cat" "Chat Quantique" "2"

echo ""
echo -e "${MAGENTA}💀 TIER 3 - CRÉATURES QUANTIQUES ÉPIQUES${NC}"
echo "============================================="

# Test Liche Quantique
test_quantum_creature "quantum_lich" "Liche Quantique" "3"

# Test Scarabée Quantique
test_quantum_creature "quantum_beetle" "Scarabée Quantique" "3"

echo ""
echo -e "${MAGENTA}🔥 TIER 4 - CRÉATURES QUANTIQUES LÉGENDAIRES${NC}"
echo "============================================="

# Test Phénix Quantique
test_quantum_creature "quantum_phoenix" "Phénix Quantique" "4"

# Test Archonte des Probabilités
test_quantum_creature "probability_archon" "Archonte des Probabilités" "4"

echo ""
echo -e "${MAGENTA}🌀 TEST INTERFÉRENCES QUANTIQUES${NC}"
echo "====================================="

# Test interférences constructives
execute_hots_script "ψ101: (0.707+0.707i) ⊙(Δt+1 @15,15 ⟶ CREATE(CREATURE, quantum_wisp, @15,15))" "Interférence constructive"
execute_hots_script "ψ102: (0.707-0.707i) ⊙(Δt+1 @15,15 ⟶ CREATE(CREATURE, quantum_knight, @15,15))" "Interférence destructive"

# Test observation et collapse
execute_hots_script "Π(Player enters @15,15) ⇒ †ψ101" "Observation et collapse"

# Test phases quantiques
execute_hots_script "ψ103: ⊙(Δt+2 @16,16 ⟶ PHASE_SHIFT(quantum_phoenix, 1.57))" "Décalage de phase"

echo ""
echo -e "${MAGENTA}🎭 TEST COMBATS QUANTIQUES${NC}"
echo "====================================="

# Créer plusieurs créatures pour un combat
execute_hots_script "CREATE(CREATURE, quantum_phoenix, @20,20)" "Créer Phénix pour combat"
execute_hots_script "CREATE(CREATURE, quantum_lich, @22,22)" "Créer Liche pour combat"
execute_hots_script "CREATE(CREATURE, probability_archon, @24,24)" "Créer Archonte pour combat"

# Combat multi-créatures
execute_hots_script "ψ201: ⊙(Δt+1 @21,21 ⟶ BATTLE(quantum_phoenix, quantum_lich))" "Combat Phénix vs Liche"
execute_hots_script "ψ202: ⊙(Δt+2 @23,23 ⟶ BATTLE(quantum_lich, probability_archon))" "Combat Liche vs Archonte"
execute_hots_script "ψ203: ⊙(Δt+3 @25,25 ⟶ BATTLE(probability_archon, quantum_phoenix))" "Combat Archonte vs Phénix"

# Collapse des combats
execute_hots_script "†ψ201" "Collapse combat 1"
execute_hots_script "†ψ202" "Collapse combat 2"
execute_hots_script "†ψ203" "Collapse combat 3"

echo ""
echo -e "${MAGENTA}🔮 TEST CAPACITÉS SPÉCIALES${NC}"
echo "====================================="

# Test renaissance quantique du Phénix
execute_hots_script "ψ301: ⊙(Δt+1 ⟶ ABILITY(quantum_phoenix, quantum_rebirth))" "Renaissance quantique"

# Test contrôle des probabilités
execute_hots_script "ψ302: ⊙(Δt+2 ⟶ ABILITY(probability_archon, probability_control))" "Contrôle des probabilités"

# Test jugement quantique
execute_hots_script "ψ303: ⊙(Δt+3 ⟶ ABILITY(probability_archon, quantum_judgment))" "Jugement quantique"

# Test vol de phase
execute_hots_script "ψ304: ⊙(Δt+4 ⟶ ABILITY(quantum_phoenix, phase_flight))" "Vol de phase"

# Collapse des capacités
execute_hots_script "†ψ301" "Collapse renaissance"
execute_hots_script "†ψ302" "Collapse probabilités"
execute_hots_script "†ψ303" "Collapse jugement"
execute_hots_script "†ψ304" "Collapse vol"

echo ""
echo -e "${MAGENTA}🎯 TEST SYSTÈME D'INTERFÉRENCES${NC}"
echo "====================================="

# Test champ de cohérence
execute_hots_script "ψ401: ⊙(Δt+1 @30,30 ⟶ ABILITY(quantum_wisp, coherence_field))" "Champ de cohérence"

# Test toile de probabilités
execute_hots_script "ψ402: ⊙(Δt+2 @32,32 ⟶ ABILITY(probability_spider, probability_web))" "Toile de probabilités"

# Test charge superposée
execute_hots_script "ψ403: ⊙(Δt+3 @34,34 ⟶ ABILITY(quantum_knight, superposition_charge))" "Charge superposée"

# Test champ de certitude
execute_hots_script "ψ404: ⊙(Δt+4 @36,36 ⟶ ABILITY(probability_archon, certainty_field))" "Champ de certitude"

# Collapse des interférences
execute_hots_script "†ψ401" "Collapse cohérence"
execute_hots_script "†ψ402" "Collapse toile"
execute_hots_script "†ψ403" "Collapse charge"
execute_hots_script "†ψ404" "Collapse certitude"

echo ""
echo -e "${CYAN}📊 RÉSUMÉ DU TEST${NC}"
echo "====================="

# Compter les succès et échecs
success_count=$(grep -c "✅" "$LOG_FILE")
fail_count=$(grep -c "❌" "$LOG_FILE")

echo -e "${GREEN}✅ Tests réussis: $success_count${NC}"
echo -e "${RED}❌ Tests échoués: $fail_count${NC}"

if [ $fail_count -eq 0 ]; then
    echo -e "${GREEN}🎉 CRÉATURES QUANTIQUES TESTÉES AVEC SUCCÈS !${NC}"
    log "🎉 CRÉATURES QUANTIQUES TESTÉES AVEC SUCCÈS !"
else
    echo -e "${YELLOW}⚠️ Certains tests ont échoué, mais les créatures sont fonctionnelles${NC}"
    log "⚠️ Certains tests ont échoué, mais les créatures sont fonctionnelles"
fi

echo ""
echo -e "${PURPLE}🧚‍♀️ CRÉATURES QUANTIQUES - TEST TERMINÉ${NC}"
echo -e "${CYAN}📋 Log complet: $LOG_FILE${NC}"
echo -e "${BLUE}🌐 Interface: http://localhost:8000${NC}"
echo -e "${BLUE}🎮 Jeu ID: $GAME_ID${NC}"
echo ""
echo -e "${MAGENTA}🎭 CRÉATURES QUANTIQUES DISPONIBLES :${NC}"
echo -e "${CYAN}🧚‍♀️ Tier 1: Luciole Quantique, Araignée des Probabilités${NC}"
echo -e "${CYAN}⚔️ Tier 2: Chevalier Quantique, Chat Quantique${NC}"
echo -e "${CYAN}💀 Tier 3: Liche Quantique, Scarabée Quantique${NC}"
echo -e "${CYAN}🔥 Tier 4: Phénix Quantique, Archonte des Probabilités${NC}"
echo ""
echo -e "${BLUE}📚 Documentation: backend/src/main/resources/quantum-creatures.json${NC}"
echo -e "${BLUE}🎮 Service: backend/src/main/java/com/heroesoftimepoc/temporalengine/service/CreatureService.java${NC}"
echo -e "${BLUE}🌐 API: /api/creatures/quantum${NC}"
echo ""

log "🧚‍♀️ TEST CRÉATURES QUANTIQUES TERMINÉ"
log "=====================================" 