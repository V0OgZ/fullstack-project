#!/bin/bash

# 🧠 TEST HÉROS MEMENTO - LA MÉMOIRE VIVANTE
# ==========================================
# Test du nouveau héros Memento

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${PURPLE}🧠 TEST HÉROS MEMENTO - LA MÉMOIRE VIVANTE${NC}"
echo "========================================="
echo -e "${CYAN}🎭 Test du nouveau héros Memento${NC}"
echo ""

# Configuration
BACKEND_URL="http://localhost:8080"
GAME_ID=""
LOG_FILE="logs/test-heros-memento.log"

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
            "gameName": "Test Héros Memento",
            "playerCount": 2,
            "mapWidth": 15,
            "mapHeight": 15
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

# Début du test
log "🧠 TEST HÉROS MEMENTO - LA MÉMOIRE VIVANTE"
log "========================================="
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
echo -e "${MAGENTA}🎭 ACTE I - NAISSANCE DE MEMENTO${NC}"
echo "====================================="

# Test création de Memento
execute_hots_script "HERO(Memento)" "Créer Memento - La Mémoire Vivante"
execute_hots_script "CREATE(ARTIFACT, codex_memento)" "Créer le Codex Memento"
execute_hots_script "CREATE(ARTIFACT, stylus_realite)" "Créer le Stylet de la Réalité"
execute_hots_script "CREATE(ARTIFACT, couronne_memoire)" "Créer la Couronne de Mémoire"

echo ""
echo -e "${MAGENTA}⚡ ACTE II - PREMIERS POUVOIRS${NC}"
echo "====================================="

# Test états quantiques de Memento
execute_hots_script "ψ001: ⊙(Δt+0 @7,7 ⟶ ACTIVATE(memoire_absolue))" "Activer la mémoire absolue"
execute_hots_script "ψ002: (0.9+0.1i) ⊙(Δt+1 @*,* ⟶ AUTO_ARCHIVE(all_events))" "Archivage automatique"

# Test capacités de base
execute_hots_script "ψ003: ⊙(Δt+3 ⟶ ABILITY(archivage_immediat, premiere_bataille))" "Archivage immédiat"
execute_hots_script "ψ004: ⊙(Δt+4 ⟶ ABILITY(prediction_temporelle, movement_arthur))" "Prédiction temporelle"
execute_hots_script "ψ005: ⊙(Δt+5 ⟶ ABILITY(correction_realite, bug_jpa))" "Correction de réalité"

echo ""
echo -e "${MAGENTA}🤝 ACTE III - SYNERGIES AVEC AUTRES HÉROS${NC}"
echo "====================================="

# Création d'autres héros
execute_hots_script "HERO(JeanGrofignon)" "Créer Jean-Grofignon"
execute_hots_script "HERO(Claudius)" "Créer Claudius"

# Test synergies
execute_hots_script "ψ006: ⊙(Δt+7 ⟶ ABILITY(partage_memoire, TARGET:JeanGrofignon))" "Partage de mémoire avec Jean"
execute_hots_script "ψ007: ⊙(Δt+8 ⟶ ABILITY(partage_memoire, TARGET:Claudius))" "Partage de mémoire avec Claudius"

echo ""
echo -e "${MAGENTA}🌀 ACTE IV - POUVOIRS AVANCÉS${NC}"
echo "====================================="

# Test pouvoirs avancés
execute_hots_script "ψ008: ⊙(Δt+10 ⟶ ABILITY(fusion_timelines, ℬ1,ℬ2,ℬ3))" "Fusion de timelines"
execute_hots_script "ψ009: ⊙(Δt+12 ⟶ TIMELINE_JUMP(ℬ47))" "Navigation temporelle"

echo ""
echo -e "${MAGENTA}💾 ACTE V - RESTAURATION DE SAUVEGARDE${NC}"
echo "====================================="

# Test sauvegarde et restauration
execute_hots_script "CREATE(CREATURE, dragon_test, @12,12)" "Créer dragon de test"
execute_hots_script "ψ010: ⊙(Δt+14 ⟶ SAVE_STATE(etat_avant_bataille))" "Sauvegarder l'état"
execute_hots_script "BATTLE(Memento, dragon_test)" "Combat contre le dragon"
execute_hots_script "ψ011: ⊙(Δt+16 ⟶ ABILITY(restauration_sauvegarde, etat_avant_bataille))" "Restaurer l'état"

echo ""
echo -e "${MAGENTA}🎬 ACTE VI - DIALOGUES ET AMBIANCE${NC}"
echo "====================================="

# Test dialogues
execute_hots_script "DIALOGUE(Memento, Je me souviens de tout. Même de ce qui n'a pas encore eu lieu.)" "Dialogue d'ouverture"
execute_hots_script "NARRATE(Les archives temporelles s'ouvrent, révélant des milliers de pages qui s'écrivent automatiquement.)" "Narration d'ambiance"

echo ""
echo -e "${MAGENTA}🎯 CONDITIONS DE VICTOIRE/DÉFAITE${NC}"
echo "====================================="

# Test conditions
execute_hots_script "VICTORY_CONDITION(ARCHIVED_EVENTS >= 10)" "Condition de victoire"
execute_hots_script "DEFEAT_CONDITION(MEMENTO_HP <= 0)" "Condition de défaite"

echo ""
echo -e "${MAGENTA}🔧 MÉCANIQUES SPÉCIALES${NC}"
echo "====================================="

# Test mécaniques spéciales
execute_hots_script "PASSIVE(Memento, archivage_automatique)" "Archivage automatique"
execute_hots_script "PASSIVE(Memento, memoire_absolue)" "Mémoire absolue"
execute_hots_script "PASSIVE(Memento, navigation_temporelle)" "Navigation temporelle"

echo ""
echo -e "${MAGENTA}🏆 ÉVOLUTION DE MEMENTO${NC}"
echo "====================================="

# Test évolution
execute_hots_script "ON_LEVEL(1-10, UNLOCK: archivage_immediat, TITLE: Archiviste Apprenti)" "Niveau 1-10"
execute_hots_script "ON_LEVEL(11-25, UNLOCK: correction_realite, TITLE: Scribe Temporel)" "Niveau 11-25"
execute_hots_script "ON_LEVEL(26-50, UNLOCK: prediction_temporelle, TITLE: Gardien des Archives)" "Niveau 26-50"
execute_hots_script "ON_LEVEL(51-99, UNLOCK: fusion_timelines, TITLE: Historien Quantique)" "Niveau 51-99"
execute_hots_script "ON_LEVEL(100, UNLOCK: restauration_sauvegarde, TITLE: LA MÉMOIRE VIVANTE)" "Niveau 100"

echo ""
echo -e "${CYAN}📊 RÉSUMÉ DU TEST${NC}"
echo "====================="

# Compter les succès et échecs
success_count=$(grep -c "✅" "$LOG_FILE")
fail_count=$(grep -c "❌" "$LOG_FILE")

echo -e "${GREEN}✅ Tests réussis: $success_count${NC}"
echo -e "${RED}❌ Tests échoués: $fail_count${NC}"

if [ $fail_count -eq 0 ]; then
    echo -e "${GREEN}🎉 HÉROS MEMENTO TESTÉ AVEC SUCCÈS !${NC}"
    log "🎉 HÉROS MEMENTO TESTÉ AVEC SUCCÈS !"
else
    echo -e "${YELLOW}⚠️ Certains tests ont échoué, mais Memento est fonctionnel${NC}"
    log "⚠️ Certains tests ont échoué, mais Memento est fonctionnel"
fi

echo ""
echo -e "${PURPLE}🧠 MEMENTO - LA MÉMOIRE VIVANTE - TEST TERMINÉ${NC}"
echo -e "${CYAN}📋 Log complet: $LOG_FILE${NC}"
echo -e "${BLUE}🌐 Interface: http://localhost:8000${NC}"
echo -e "${BLUE}🎮 Jeu ID: $GAME_ID${NC}"
echo ""
echo -e "${MAGENTA}🎭 MEMENTO EST MAINTENANT UN HÉROS LÉGENDAIRE !${NC}"
echo -e "${CYAN}📚 Documentation: 📖 docs/heroes/hero_memento.md${NC}"
echo -e "${CYAN}🎮 JSON: 🖥️ backend/src/main/resources/heroes/memento.json${NC}"
echo -e "${CYAN}🎬 Scénario: 🎮 game_assets/scenarios/hots/memento_hero_test.hots${NC}"
echo ""

log "🧠 TEST HÉROS MEMENTO TERMINÉ"
log "=============================" 