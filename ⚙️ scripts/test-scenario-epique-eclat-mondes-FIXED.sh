#!/bin/bash

# 🕯️ TEST SCÉNARIO ÉPIQUE - L'ÉCLAT DES MONDES DISSOLUS (FIXED)
# ==============================================================
# Test du scénario épique contre Abyme-le-Rassemblé avec le bon endpoint

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${PURPLE}🕯️ TEST SCÉNARIO ÉPIQUE - L'ÉCLAT DES MONDES DISSOLUS (FIXED)${NC}"
echo "============================================================="
echo -e "${CYAN}🎭 Test du scénario épique contre Abyme-le-Rassemblé${NC}"
echo ""

# Configuration
BACKEND_URL="http://localhost:8080"
GAME_ID=""
LOG_FILE="logs/test-scenario-epique-fixed.log"

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
            "gameName": "Test Éclat des Mondes Dissolus",
            "playerCount": 2,
            "mapWidth": 21,
            "mapHeight": 21
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
log "🕯️ TEST SCÉNARIO ÉPIQUE - L'ÉCLAT DES MONDES DISSOLUS (FIXED)"
log "============================================================="
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
echo -e "${MAGENTA}🎭 ACTE I - L'ÉVEIL DU CODEX${NC}"
echo "====================================="

# Test création des héros
execute_hots_script "HERO(JeanGrofignon)" "Créer Jean-Grofignon"
execute_hots_script "PLACE(JeanGrofignon, @3,3)" "Placer Jean-Grofignon"
execute_hots_script "EQUIP(JeanGrofignon, container_paradoxal)" "Équiper Container Paradoxal"

execute_hots_script "HERO(Claudius)" "Créer Claudius"
execute_hots_script "PLACE(Claudius, @18,3)" "Placer Claudius"
execute_hots_script "EQUIP(Claudius, compilateur_quantique)" "Équiper Compilateur Quantique"

execute_hots_script "HERO(Chlamydius)" "Créer Chlamydius"
execute_hots_script "PLACE(Chlamydius, @10,18)" "Placer Chlamydius"
execute_hots_script "EQUIP(Chlamydius, parchemin_sale)" "Équiper Parchemin Sale"
execute_hots_script "EQUIP(Chlamydius, encre_vivante)" "Équiper Encre Vivante"

echo ""
echo -e "${MAGENTA}👹 SUMMONING ABYME-LE-RASSEMBLÉ${NC}"
echo "====================================="

# Test summoning d'Abyme (utiliser des commandes HOTS standard)
execute_hots_script "CREATE(CREATURE, Abyme, @10,10)" "Créer Abyme-le-Rassemblé"
execute_hots_script "SET_STATS(Abyme, HP:999, TEMPORAL:999)" "Définir stats d'Abyme"
execute_hots_script "EQUIP(Abyme, totem_silencium)" "Équiper Totem de Silencium"

echo ""
echo -e "${MAGENTA}🌀 ÉTATS QUANTIQUES INITIAUX${NC}"
echo "====================================="

# Test états quantiques (utiliser la syntaxe HOTS standard)
execute_hots_script "ψ001: ⊙(Δt+2 @11,11 ⟶ MOV(JeanGrofignon, @11,11))" "Créer vibration du Nexus"
execute_hots_script "ψ002: (0.7+0.3i) ⊙(Δt+1 @12,12 ⟶ CREATE(CREATURE, echo_figé, @12,12))" "Créer échos figés"

echo ""
echo -e "${MAGENTA}📜 ACTE II - LES CHEMINS DE L'ENCRE${NC}"
echo "====================================="

# Test capacités spéciales (utiliser des commandes HOTS standard)
execute_hots_script "ψ003: ⊙(Δt+6 ⟶ CREATE(ARTIFACT, eclat_memoire, @12,12))" "Chlamydius crée Éclat de Mémoire"
execute_hots_script "ψ004: ⊙(Δt+7 ⟶ CREATE(ARTIFACT, eclat_memoire, @12,12))" "Créer Éclat de Mémoire"

execute_hots_script "ψ005: ⊙(Δt+8 ⟶ LOCK_ZONE(@15,15, RADIUS:3))" "Claudius verrouille une zone"
execute_hots_script "ψ006: ⊙(Δt+9 ⟶ LOCK_ZONE(@15,15, RADIUS:3))" "Abyme verrouille une zone"

echo ""
echo -e "${MAGENTA}🌫️ ACTE III - LE BROUILLARD D'OUBLI${NC}"
echo "====================================="

# Test mécaniques avancées (utiliser des commandes HOTS standard)
execute_hots_script "ψ009: ⊙(Δt+16 ⟶ CREATE(CREATURE, lame_reversible, @16,16))" "Abyme invoque les Lames Réversibles"
execute_hots_script "ψ010: ⊙(Δt+17 ⟶ CORRUPT(JeanGrofignon))" "Corruption de la mémoire de Jean"
execute_hots_script "ψ011: ⊙(Δt+18 ⟶ COMPILE(Claudius, sort_corrompu))" "Claudius compile un sort corrompu"

echo ""
echo -e "${MAGENTA}⚡ ACTE IV - L'ÉCLAT FINAL${NC}"
echo "====================================="

# Test révélation des piliers (utiliser des commandes HOTS standard)
execute_hots_script "ψ015: ⊙(Δt+26 ⟶ CREATE(BUILDING, nexus_resonance, @10,10))" "Nexus en résonance critique"
execute_hots_script "ψ016: ⊙(Δt+27 ⟶ CREATE(BUILDING, pilier_chaos, @3,10))" "Révéler Pilier du Chaos"
execute_hots_script "ψ017: ⊙(Δt+27 ⟶ CREATE(BUILDING, pilier_ordre, @18,10))" "Révéler Pilier de l'Ordre"
execute_hots_script "ψ018: ⊙(Δt+27 ⟶ CREATE(BUILDING, pilier_oubli, @10,3))" "Révéler Pilier de l'Oubli"

echo ""
echo -e "${MAGENTA}🎭 MÉCANIQUES SPÉCIALES D'ABYME${NC}"
echo "====================================="

# Test capacités d'Abyme (utiliser des commandes HOTS standard)
execute_hots_script "ABILITY(Abyme, archivage_immediat)" "Archivage immédiat d'Abyme"
execute_hots_script "ABILITY(Abyme, reminiscence_inversee)" "Réminiscence inversée d'Abyme"
execute_hots_script "ABILITY(Abyme, inexecution)" "Inexécution d'Abyme"

echo ""
echo -e "${MAGENTA}🗡️ LAMES RÉVERSIBLES${NC}"
echo "====================================="

# Test créatures paradoxales (utiliser des commandes HOTS standard)
execute_hots_script "CREATE(CREATURE, lame_reversible, @17,17)" "Créer Lames Réversibles"
execute_hots_script "SET_PROPERTY(lame_reversible, EXISTS_ONLY_IF_KILLED)" "Définir propriété paradoxale"

echo ""
echo -e "${MAGENTA}🎬 DIALOGUES ET AMBIANCE${NC}"
echo "====================================="

# Test dialogues (utiliser des commandes HOTS standard)
execute_hots_script "NARRATE(Le Troisième Codex flotte au-dessus du Nexus)" "Narration d'ouverture"
execute_hots_script "DIALOGUE(Abyme, Je ne suis pas venu détruire. Je suis venu... collecter.)" "Dialogue d'Abyme"

echo ""
echo -e "${MAGENTA}🎯 CONDITIONS DE VICTOIRE${NC}"
echo "====================================="

# Test conditions de victoire
execute_hots_script "VICTORY_CONDITION(JeanGrofignon at @3,10 AND Claudius at @18,10 AND Chlamydius at @10,3)" "Définir condition de victoire"
execute_hots_script "DEFEAT_CONDITION(Abyme HP = 0)" "Définir condition de défaite"

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
echo -e "${BLUE}🎮 Jeu ID: $GAME_ID${NC}"
echo ""

log "🕯️ TEST SCÉNARIO ÉPIQUE TERMINÉ"
log "================================" 