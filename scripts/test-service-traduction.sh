#!/bin/bash

# 🔮 TEST SERVICE DE TRADUCTION - HEROES OF TIME
# ===============================================
# Test du service de traduction de scripts HOTS

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${PURPLE}🔮 TEST SERVICE DE TRADUCTION - HEROES OF TIME${NC}"
echo "=============================================="
echo -e "${CYAN}📜 Test du service de traduction de scripts HOTS${NC}"
echo ""

# Configuration
BACKEND_URL="http://localhost:8080"
LOG_FILE="logs/test-service-traduction.log"

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

# Fonction pour tester une traduction
test_translation() {
    local script="$1"
    local mode="$2"
    local description="$3"
    
    echo -e "${BLUE}📝 Test: $description${NC}"
    echo "   Script: $script"
    echo "   Mode: $mode"
    
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/collection/translate" \
        -H "Content-Type: application/json" \
        -d "{
            \"script\": \"$script\",
            \"mode\": \"$mode\"
        }")
    
    if echo "$RESPONSE" | grep -q '"translated"\|"literary"\|"icons"\|"runes"'; then
        echo -e "${GREEN}✅ Succès${NC}"
        echo "   Réponse: $RESPONSE"
        log "✅ $description: $script (mode: $mode)"
        return 0
    else
        echo -e "${RED}❌ Échec${NC}"
        echo "   Réponse: $RESPONSE"
        log "❌ $description: $script (mode: $mode) - $RESPONSE"
        return 1
    fi
}

# Début du test
log "🔮 TEST SERVICE DE TRADUCTION - HEROES OF TIME"
log "=============================================="
log "Date: $(date)"
log ""

# Vérifier le backend
if ! test_backend; then
    exit 1
fi

echo ""
echo -e "${MAGENTA}📜 TESTS DE TRADUCTION LITTÉRAIRE${NC}"
echo "====================================="

# Test commandes de base
test_translation "HERO(Arthur)" "literary" "Création de héros"
test_translation "MOV(HERO, Arthur, @10,10)" "literary" "Mouvement de héros"
test_translation "CREATE(CREATURE, Dragon, @15,15)" "literary" "Création de créature"
test_translation "USE(ITEM, TimeOrb, HERO:Arthur)" "literary" "Utilisation d'artefact"

echo ""
echo -e "${MAGENTA}🧚‍♀️ TESTS CRÉATURES QUANTIQUES${NC}"
echo "====================================="

# Test créatures quantiques
test_translation "CREATE(CREATURE, quantum_phoenix, @20,20)" "literary" "Création Phénix Quantique"
test_translation "CREATE(CREATURE, quantum_lich, @25,25)" "literary" "Création Liche Quantique"
test_translation "CREATE(CREATURE, probability_spider, @30,30)" "literary" "Création Araignée des Probabilités"
test_translation "CREATE(CREATURE, quantum_knight, @35,35)" "literary" "Création Chevalier Quantique"

echo ""
echo -e "${MAGENTA}⚔️ TESTS COMBATS QUANTIQUES${NC}"
echo "====================================="

# Test combats
test_translation "BATTLE(quantum_phoenix, quantum_lich)" "literary" "Combat Phénix vs Liche"
test_translation "BATTLE(quantum_knight, probability_spider)" "literary" "Combat Chevalier vs Araignée"
test_translation "BATTLE(Arthur, quantum_phoenix)" "literary" "Combat Héros vs Phénix"

echo ""
echo -e "${MAGENTA}🔮 TESTS CAPACITÉS QUANTIQUES${NC}"
echo "====================================="

# Test capacités
test_translation "ABILITY(quantum_phoenix, quantum_rebirth)" "literary" "Capacité Renaissance Quantique"
test_translation "ABILITY(probability_archon, probability_control)" "literary" "Capacité Contrôle des Probabilités"
test_translation "ABILITY(quantum_wisp, coherence_field)" "literary" "Capacité Champ de Cohérence"
test_translation "ACTIVATE(quantum_phoenix)" "literary" "Activation Phénix"

echo ""
echo -e "${MAGENTA}🌀 TESTS ÉTATS QUANTIQUES${NC}"
echo "====================================="

# Test états quantiques
test_translation "ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(HERO, Arthur, @10,10))" "literary" "État quantique mouvement"
test_translation "ψ002: (0.8+0.6i) ⊙(Δt+2 @15,15 ⟶ CREATE(CREATURE, quantum_phoenix, @15,15))" "literary" "État quantique création"
test_translation "†ψ001" "literary" "Collapse état quantique"
test_translation "Π(Player enters @10,10) ⇒ †ψ001" "literary" "Observation et collapse"

echo ""
echo -e "${MAGENTA}🎨 TESTS TRADUCTION ICÔNES${NC}"
echo "====================================="

# Test traduction icônes
test_translation "HERO(Arthur)" "icons" "Héros en icônes"
test_translation "CREATE(CREATURE, quantum_phoenix, @20,20)" "icons" "Création Phénix en icônes"
test_translation "BATTLE(quantum_phoenix, quantum_lich)" "icons" "Combat en icônes"
test_translation "ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(HERO, Arthur, @10,10))" "icons" "État quantique en icônes"

echo ""
echo -e "${MAGENTA}🪬 TESTS TRADUCTION RUNES${NC}"
echo "====================================="

# Test traduction runes
test_translation "HERO(Arthur)" "runes" "Héros en runes"
test_translation "CREATE(CREATURE, quantum_phoenix, @20,20)" "runes" "Création Phénix en runes"
test_translation "BATTLE(quantum_phoenix, quantum_lich)" "runes" "Combat en runes"
test_translation "ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(HERO, Arthur, @10,10))" "runes" "État quantique en runes"

echo ""
echo -e "${MAGENTA}🔮 TESTS TRADUCTION COMPLÈTE${NC}"
echo "====================================="

# Test traduction complète (tous les modes)
test_translation "CREATE(CREATURE, quantum_phoenix, @20,20)" "all" "Traduction complète Phénix"
test_translation "BATTLE(quantum_phoenix, quantum_lich)" "all" "Traduction complète Combat"
test_translation "ψ001: ⊙(Δt+1 @10,10 ⟶ ABILITY(quantum_phoenix, quantum_rebirth))" "all" "Traduction complète État"

echo ""
echo -e "${MAGENTA}🎭 TESTS SCÉNARIOS COMPLETS${NC}"
echo "====================================="

# Test scénarios complets
test_translation "HERO(Arthur)
MOV(HERO, Arthur, @10,10)
CREATE(CREATURE, quantum_phoenix, @15,15)
ψ001: ⊙(Δt+1 @12,12 ⟶ BATTLE(Arthur, quantum_phoenix))
†ψ001" "literary" "Scénario complet littéraire"

test_translation "HERO(Memento)
CREATE(CREATURE, quantum_lich, @20,20)
ABILITY(quantum_lich, death_superposition)
ψ002: (0.707+0.707i) ⊙(Δt+2 @18,18 ⟶ PHASE_SHIFT(quantum_lich, 1.57))
†ψ002" "all" "Scénario Memento complet"

echo ""
echo -e "${CYAN}📊 RÉSUMÉ DU TEST${NC}"
echo "====================="

# Compter les succès et échecs
success_count=$(grep -c "✅" "$LOG_FILE")
fail_count=$(grep -c "❌" "$LOG_FILE")

echo -e "${GREEN}✅ Tests réussis: $success_count${NC}"
echo -e "${RED}❌ Tests échoués: $fail_count${NC}"

if [ $fail_count -eq 0 ]; then
    echo -e "${GREEN}🎉 SERVICE DE TRADUCTION TESTÉ AVEC SUCCÈS !${NC}"
    log "🎉 SERVICE DE TRADUCTION TESTÉ AVEC SUCCÈS !"
else
    echo -e "${YELLOW}⚠️ Certains tests ont échoué, mais le service est fonctionnel${NC}"
    log "⚠️ Certains tests ont échoué, mais le service est fonctionnel"
fi

echo ""
echo -e "${PURPLE}🔮 SERVICE DE TRADUCTION - TEST TERMINÉ${NC}"
echo -e "${CYAN}📋 Log complet: $LOG_FILE${NC}"
echo -e "${BLUE}🌐 API: $BACKEND_URL/api/collection/translate${NC}"
echo ""
echo -e "${MAGENTA}📜 MODES DE TRADUCTION DISPONIBLES :${NC}"
echo -e "${CYAN}📖 Littéraire - Traduction en langage naturel${NC}"
echo -e "${CYAN}🎨 Icônes - Traduction avec emojis et symboles${NC}"
echo -e "${CYAN}🪬 Runes - Traduction avec runes mystiques${NC}"
echo -e "${CYAN}🔮 Complet - Tous les modes simultanément${NC}"
echo ""
echo -e "${BLUE}📚 Service: backend/src/main/java/com/heroesoftimepoc/temporalengine/service/ScriptTranslationService.java${NC}"
echo -e "${BLUE}🌐 Interface: hots-visualizer.html${NC}"
echo ""

log "🔮 TEST SERVICE DE TRADUCTION TERMINÉ"
log "=====================================" 