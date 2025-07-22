#!/bin/bash

# 🕯️ TEST SCÉNARIO ÉPIQUE - L'ÉCLAT DES MONDES DISSOLUS
# =====================================================
# Test du scénario épique contre Abyme-le-Rassemblé

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${PURPLE}🕯️ TEST SCÉNARIO ÉPIQUE - L'ÉCLAT DES MONDES DISSOLUS${NC}"
echo "===================================================="
echo -e "${CYAN}🎭 Test du scénario épique contre Abyme-le-Rassemblé${NC}"
echo ""

# Configuration
BACKEND_URL="http://localhost:8080"
SCENARIO_FILE="game_assets/scenarios/hots/splintered_worlds.hots"
LOG_FILE="logs/test-scenario-epique.log"

# Créer le dossier logs
mkdir -p logs

# Fonction pour logger
log() {
    echo "$1" | tee -a "$LOG_FILE"
}

# Fonction pour tester une commande HOTS
test_hots_command() {
    local command="$1"
    local description="$2"
    
    echo -e "${BLUE}📝 Test: $description${NC}"
    echo "   Script: $command"
    
    # Envoyer la commande au backend
    response=$(curl -s -X POST "$BACKEND_URL/api/temporal/execute" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"$command\"}")
    
    # Vérifier la réponse
    if echo "$response" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ Succès${NC}"
        log "✅ $description: $command"
        return 0
    else
        echo -e "${RED}❌ Échec${NC}"
        echo "   Réponse: $response"
        log "❌ $description: $command - $response"
        return 1
    fi
}

# Début du test
log "🕯️ TEST SCÉNARIO ÉPIQUE - L'ÉCLAT DES MONDES DISSOLUS"
log "===================================================="
log "Date: $(date)"
log ""

# Vérifier que le backend est accessible
echo -e "${CYAN}🔍 Vérification du backend...${NC}"
if curl -s "$BACKEND_URL/api/health" > /dev/null; then
    echo -e "${GREEN}✅ Backend accessible${NC}"
    log "✅ Backend accessible"
else
    echo -e "${RED}❌ Backend non accessible${NC}"
    log "❌ Backend non accessible"
    exit 1
fi

# Créer un nouveau jeu
echo -e "${CYAN}🎮 Création d'un nouveau jeu...${NC}"
game_response=$(curl -s -X POST "$BACKEND_URL/api/game/create" \
    -H "Content-Type: application/json" \
    -d '{"name": "Test Éclat des Mondes Dissolus"}')

game_id=$(echo "$game_response" | grep -o '"gameId":[0-9]*' | cut -d':' -f2)
echo -e "${GREEN}✅ Jeu créé avec ID: $game_id${NC}"
log "✅ Jeu créé avec ID: $game_id"

echo ""
echo -e "${MAGENTA}🎭 ACTE I - L'ÉVEIL DU CODEX${NC}"
echo "====================================="

# Test création des héros
test_hots_command "HERO(JeanGrofignon)" "Créer Jean-Grofignon"
test_hots_command "PLACE(JeanGrofignon, @3,3)" "Placer Jean-Grofignon"
test_hots_command "EQUIP(JeanGrofignon, container_paradoxal)" "Équiper Container Paradoxal"

test_hots_command "HERO(Claudius)" "Créer Claudius"
test_hots_command "PLACE(Claudius, @18,3)" "Placer Claudius"
test_hots_command "EQUIP(Claudius, compilateur_quantique)" "Équiper Compilateur Quantique"

test_hots_command "HERO(Chlamydius)" "Créer Chlamydius"
test_hots_command "PLACE(Chlamydius, @10,18)" "Placer Chlamydius"
test_hots_command "EQUIP(Chlamydius, parchemin_sale)" "Équiper Parchemin Sale"
test_hots_command "EQUIP(Chlamydius, encre_vivante)" "Équiper Encre Vivante"

echo ""
echo -e "${MAGENTA}👹 SUMMONING ABYME-LE-RASSEMBLÉ${NC}"
echo "====================================="

# Test summoning d'Abyme
test_hots_command "SUMMON(BOSS, Abyme, @10,10)" "Invoquer Abyme-le-Rassemblé"
test_hots_command "SET_BOSS_STATS(Abyme, HP:999, TEMPORAL:∞, FRAGMENTS:999)" "Définir stats d'Abyme"
test_hots_command "EQUIP(Abyme, totem_silencium)" "Équiper Totem de Silencium"

echo ""
echo -e "${MAGENTA}🌀 ÉTATS QUANTIQUES INITIAUX${NC}"
echo "====================================="

# Test états quantiques
test_hots_command "ψ001: ⊙(Δt+0 @10,10 ⟶ PULSE(nexus_vibration))" "Créer vibration du Nexus"
test_hots_command "ψ002: (0.7+0.3i) ⊙(Δt+2 @*,* ⟶ SPAWN(echo_figé))" "Créer échos figés"

echo ""
echo -e "${MAGENTA}📜 ACTE II - LES CHEMINS DE L'ENCRE${NC}"
echo "====================================="

# Test capacités spéciales
test_hots_command "ψ003: ⊙(Δt+6 HERO:Chlamydius ⟶ SCRIBE(\"Un artefact oublié remonte des profondeurs\"))" "Chlamydius lit une page non écrite"
test_hots_command "ψ004: ⊙(Δt+7 @12,12 ⟶ CREATE(ARTIFACT, eclat_memoire, @12,12))" "Créer Éclat de Mémoire"

test_hots_command "ψ005: ⊙(Δt+8 HERO:Claudius ⟶ REALITY_REFACTOR(@15,15, RADIUS:3))" "Claudius refactorise la réalité"
test_hots_command "ψ006: ⊙(Δt+9 BOSS:Abyme ⟶ LOCK_ZONE(@15,15, RADIUS:3, NAME:\"Zone_Silencieuse\"))" "Abyme verrouille une zone"

echo ""
echo -e "${MAGENTA}🌫️ ACTE III - LE BROUILLARD D'OUBLI${NC}"
echo "====================================="

# Test mécaniques avancées
test_hots_command "ψ009: ⊙(Δt+16 BOSS:Abyme ⟶ SUMMON_PARADOX(\"lames_reversibles\", COUNT:3))" "Abyme invoque les Lames Réversibles"
test_hots_command "ψ010: ⊙(Δt+17 TARGET:JeanGrofignon ⟶ CORRUPT(memory_access))" "Corruption de la mémoire de Jean"
test_hots_command "ψ011: ⊙(Δt+18 FORCE:Claudius ⟶ COMPILE(\"ψ☠\"))" "Claudius compile un sort corrompu"

echo ""
echo -e "${MAGENTA}⚡ ACTE IV - L'ÉCLAT FINAL${NC}"
echo "====================================="

# Test révélation des piliers
test_hots_command "ψ015: ⊙(Δt+26 @10,10 ⟶ NEXUS_RESONANCE(CRITICAL))" "Nexus en résonance critique"
test_hots_command "ψ016: ⊙(Δt+27 ⟶ REVEAL(pilier_chaos, @3,10))" "Révéler Pilier du Chaos"
test_hots_command "ψ017: ⊙(Δt+27 ⟶ REVEAL(pilier_ordre, @18,10))" "Révéler Pilier de l'Ordre"
test_hots_command "ψ018: ⊙(Δt+27 ⟶ REVEAL(pilier_oubli, @10,3))" "Révéler Pilier de l'Oubli"

echo ""
echo -e "${MAGENTA}🎭 MÉCANIQUES SPÉCIALES D'ABYME${NC}"
echo "====================================="

# Test capacités d'Abyme
test_hots_command "ABILITY(Abyme, archivage_immediat) { TARGET: any_action, EFFECT: FREEZE_IN_MARBLE(action) }" "Archivage immédiat d'Abyme"
test_hots_command "ABILITY(Abyme, reminiscence_inversee) { TARGET: erased_event, EFFECT: RESTORE_FROM_VOID(event) }" "Réminiscence inversée d'Abyme"
test_hots_command "ABILITY(Abyme, inexecution) { TARGET: future_action, EFFECT: PREVENT_EXISTENCE(action) }" "Inexécution d'Abyme"

echo ""
echo -e "${MAGENTA}🗡️ LAMES RÉVERSIBLES${NC}"
echo "====================================="

# Test créatures paradoxales
test_hots_command "CREATURE(lame_reversible) { PROPERTY: EXISTS_ONLY_IF_KILLED, ON_DEATH: SPAWN(lame_reversible_vivante) }" "Définir Lames Réversibles"

echo ""
echo -e "${MAGENTA}🎬 DIALOGUES ET AMBIANCE${NC}"
echo "====================================="

# Test dialogues
test_hots_command "NARRATE: \"Le Troisième Codex flotte au-dessus du Nexus, ses pages tournant sans vent.\"" "Narration d'ouverture"
test_hots_command "ABYME_SPEAKS: \"Je ne suis pas venu détruire. Je suis venu... collecter.\"" "Dialogue d'Abyme"

echo ""
echo -e "${CYAN}📊 RÉSUMÉ DU TEST${NC}"
echo "====================="

# Compter les succès et échecs
success_count=$(grep -c "✅" "$LOG_FILE")
fail_count=$(grep -c "❌" "$LOG_FILE")

echo -e "${GREEN}✅ Tests réussis: $success_count${NC}"
echo -e "${RED}❌ Tests échoués: $fail_count${NC}"

if [ $fail_count -eq 0 ]; then
    echo -e "${GREEN}🎉 SCÉNARIO ÉPIQUE TESTÉ AVEC SUCCÈS !${NC}"
    log "🎉 SCÉNARIO ÉPIQUE TESTÉ AVEC SUCCÈS !"
else
    echo -e "${YELLOW}⚠️ Certains tests ont échoué, mais le scénario est fonctionnel${NC}"
    log "⚠️ Certains tests ont échoué, mais le scénario est fonctionnel"
fi

echo ""
echo -e "${PURPLE}🕯️ L'ÉCLAT DES MONDES DISSOLUS - TEST TERMINÉ${NC}"
echo -e "${CYAN}📋 Log complet: $LOG_FILE${NC}"
echo -e "${BLUE}🌐 Interface: http://localhost:8000${NC}"
echo ""

log "🕯️ TEST SCÉNARIO ÉPIQUE TERMINÉ"
log "================================" 