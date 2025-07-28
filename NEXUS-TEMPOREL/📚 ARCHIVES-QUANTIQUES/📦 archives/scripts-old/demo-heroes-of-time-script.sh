#!/bin/bash

# 🕰️ Heroes of Time - Démonstration du Langage de Script Temporel
# =================================================================
# Auteur: AI Assistant
# Date: 18 juillet 2025
# Description: Démonstration complète du langage de script Heroes of Time

echo "🕰️ HEROES OF TIME - DÉMONSTRATION DU LANGAGE DE SCRIPT TEMPOREL"
echo "================================================================"
echo

# Configuration
BACKEND_URL="http://localhost:8080/api/temporal"
GAME_ID=""

# Fonctions utilitaires
execute_script() {
    local script="$1"
    local description="$2"
    
    echo "🎮 $description"
    echo "   Script: $script"
    
    local result=$(curl -s -X POST -H "Content-Type: application/json" \
        -d "{\"script\":\"$script\"}" \
        "$BACKEND_URL/games/$GAME_ID/script")
    
    echo "   Résultat: $(echo "$result" | jq -r '.result // .message')"
    echo
}

register_trigger() {
    local trigger="$1"
    local description="$2"
    
    echo "🎯 $description"
    echo "   Trigger: $trigger"
    
    local result=$(curl -s -X POST -H "Content-Type: application/json" \
        -d "{\"trigger\":\"$trigger\"}" \
        "$BACKEND_URL/games/$GAME_ID/observation-trigger")
    
    echo "   Trigger ID: $(echo "$result" | jq -r '.triggerId')"
    echo
}

# Vérification du backend
echo "📡 Vérification du backend..."
if ! curl -s "$BACKEND_URL/health" > /dev/null; then
    echo "❌ Backend non disponible sur $BACKEND_URL"
    echo "💡 Assurez-vous que le backend Heroes of Time est démarré"
    exit 1
fi
echo "✅ Backend opérationnel"
echo

# Création du jeu
echo "🎲 Création d'un nouveau jeu Heroes of Time..."
GAME_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" \
    -d '{"gameName":"Heroes of Time Script Demo","playerId":"ScriptMaster"}' \
    "$BACKEND_URL/games")

GAME_ID=$(echo "$GAME_RESPONSE" | jq -r '.gameId')
echo "✅ Jeu créé avec l'ID: $GAME_ID"
echo

# Démarrage du jeu
echo "🚀 Démarrage du jeu..."
curl -s -X POST "$BACKEND_URL/games/$GAME_ID/start" > /dev/null
echo "✅ Jeu démarré"
echo

# ========================================================================
# 🦸 PARTIE I: CRÉATION DES HÉROS
# ========================================================================

echo "🦸 PARTIE I: CRÉATION DES HÉROS LÉGENDAIRES"
echo "==========================================="

execute_script "HERO(Arthur)" "Création d'Arthur, le roi légendaire"
execute_script "HERO(Ragnar)" "Création de Ragnar, le guerrier viking"
execute_script "HERO(Morgana)" "Création de Morgana, la sorcière"
execute_script "HERO(Merlin)" "Création de Merlin, l'archimage"

# ========================================================================
# 🏃 PARTIE II: MOUVEMENTS ET POSITIONNEMENT
# ========================================================================

echo "🏃 PARTIE II: MOUVEMENTS ET POSITIONNEMENT TACTIQUE"
echo "=================================================="

execute_script "MOV(Arthur, @10,10)" "Arthur se positionne en (10,10)"
execute_script "MOV(Ragnar, @15,15)" "Ragnar se place en (15,15)"
execute_script "MOV(Morgana, @8,12)" "Morgana se déplace vers (8,12)"
execute_script "MOV(Merlin, @20,8)" "Merlin se téléporte en (20,8)"

# ========================================================================
# 🏺 PARTIE III: CRÉATIONS ET ARTEFACTS
# ========================================================================

echo "🏺 PARTIE III: CRÉATIONS ET ARTEFACTS TEMPORELS"
echo "=============================================="

execute_script "CREATE(ITEM, AvantWorldBlade, @10,10)" "Création de l'Épée d'Avant-Monde"
execute_script "CREATE(ITEM, ReverseClock, @15,15)" "Création de l'Horloge Inversée"
execute_script "CREATE(ITEM, IgnoreBeacon, @8,12)" "Création du Phare d'Ignorance"
execute_script "CREATE(CREATURE, Dragon, @25,25)" "Invocation d'un dragon"
execute_script "CREATE(STRUCTURE, Tower, @30,30)" "Construction d'une tour"

# ========================================================================
# ⚔️ PARTIE IV: ÉQUIPEMENT ET UTILISATION
# ========================================================================

echo "⚔️ PARTIE IV: ÉQUIPEMENT ET UTILISATION D'ARTEFACTS"
echo "================================================="

execute_script "USE(ITEM, AvantWorldBlade, HERO:Arthur)" "Arthur équipe l'Épée d'Avant-Monde"
execute_script "USE(ITEM, ReverseClock, HERO:Ragnar)" "Ragnar utilise l'Horloge Inversée"
execute_script "USE(ITEM, IgnoreBeacon, HERO:Morgana)" "Morgana active le Phare d'Ignorance"

# ========================================================================
# 🌀 PARTIE V: ψ-STATES (SUPERPOSITIONS TEMPORELLES)
# ========================================================================

echo "🌀 PARTIE V: ψ-STATES (SUPERPOSITIONS TEMPORELLES)"
echo "=================================================="

execute_script "ψ001: ⊙(Δt+2 @12,12 ⟶ MOV(HERO, Arthur, @12,12))" "Arthur en superposition temporelle"
execute_script "ψ002: ⊙(Δt+3 @18,18 ⟶ CREATE(CREATURE, Dragon, @18,18))" "Dragon en superposition"
execute_script "ψ003: ⊙(Δt+1 @22,22 ⟶ BATTLE(HERO Arthur, CREATURE Dragon))" "Combat en superposition"
execute_script "ψ004: ⊙(Δt+4 @14,14 ⟶ USE(ITEM, ReverseClock, HERO:Ragnar))" "Utilisation temporelle"

# ========================================================================
# 🎯 PARTIE VI: TRIGGERS D'OBSERVATION QUANTIQUE
# ========================================================================

echo "🎯 PARTIE VI: TRIGGERS D'OBSERVATION QUANTIQUE"
echo "=============================================="

register_trigger "Π(Arthur enters @12,12 at Δt+2) ⇒ †ψ001" "Observation d'Arthur déclenche collapse"
register_trigger "Π(Ragnar hp < 50) ⇒ †ψ002" "Ragnar blessé déclenche collapse"
register_trigger "Π(Dragon appears @18,18) ⇒ †ψ003" "Apparition du dragon déclenche combat"
register_trigger "Π(Player enters @20,20) ⇒ †ψ004" "Entrée de joueur déclenche effet temporel"

# ========================================================================
# 💥 PARTIE VII: COLLAPSES TEMPORELS
# ========================================================================

echo "💥 PARTIE VII: COLLAPSES TEMPORELS"
echo "=================================="

execute_script "†ψ001" "Collapse de la superposition d'Arthur"
execute_script "†ψ002" "Collapse de la superposition du dragon"
execute_script "†ψ003" "Collapse du combat temporel"

# ========================================================================
# ⚡ PARTIE VIII: ACTIONS AVANCÉES
# ========================================================================

echo "⚡ PARTIE VIII: ACTIONS AVANCÉES"
echo "==============================="

execute_script "BATTLE(Arthur, Dragon)" "Combat entre Arthur et le dragon"
execute_script "TELEPORT(Merlin, @5,5)" "Téléportation de Merlin"
execute_script "HEAL(Arthur, 50)" "Guérison d'Arthur"
execute_script "BUFF(Ragnar, STRENGTH, 10)" "Buff de force pour Ragnar"

# ========================================================================
# 🔮 PARTIE IX: VÉRIFICATIONS ET STATISTIQUES
# ========================================================================

echo "🔮 PARTIE IX: VÉRIFICATIONS ET STATISTIQUES"
echo "=========================================="

echo "📊 État du jeu:"
curl -s "$BACKEND_URL/games/$GAME_ID/state" | jq '.heroes | length' | xargs echo "   Héros actifs:"

echo "📈 Statistiques du cache:"
curl -s "$BACKEND_URL/cache/stats" | jq '.cacheHitRate' | xargs echo "   Taux de hit cache:"

echo "🎯 Triggers d'observation:"
curl -s "$BACKEND_URL/games/$GAME_ID/observation-triggers" | jq '.statistics.totalTriggers' | xargs echo "   Triggers actifs:"

echo "⚡ État quantique avancé:"
curl -s "$BACKEND_URL/games/$GAME_ID/enhanced-state" | jq '.gameState.quantumCoherence' | xargs echo "   Cohérence quantique:"

# ========================================================================
# 🚀 PARTIE X: OPTIMISATION FINALE
# ========================================================================

echo "🚀 PARTIE X: OPTIMISATION FINALE"
echo "==============================="

echo "🔧 Optimisation du moteur temporel..."
OPTIMIZATION_RESULT=$(curl -s -X POST "$BACKEND_URL/optimize")
echo "✅ Optimisation terminée:"
echo "$OPTIMIZATION_RESULT" | jq '.optimizationLevel' | xargs echo "   Niveau:"
echo "$OPTIMIZATION_RESULT" | jq '.quantumStatistics.statesCollapsed' | xargs echo "   États collapsés:"

# ========================================================================
# 🎉 CONCLUSION
# ========================================================================

echo
echo "🎉 DÉMONSTRATION TERMINÉE AVEC SUCCÈS !"
echo "======================================"
echo
echo "🏆 RÉSUMÉ DES FONCTIONNALITÉS DÉMONTRÉES:"
echo "├─ 🦸 Création de héros: HERO(name)"
echo "├─ 🏃 Déplacement: MOV(hero, @x,y)"
echo "├─ 🏺 Création d'objets: CREATE(type, name, @x,y)"
echo "├─ ⚔️ Utilisation d'artefacts: USE(ITEM, name, HERO:hero)"
echo "├─ 🌀 ψ-states: ψ001: ⊙(Δt+time @x,y ⟶ action)"
echo "├─ 🎯 Triggers: Π(condition) ⇒ †ψ001"
echo "├─ 💥 Collapses: †ψ001"
echo "├─ ⚡ Actions avancées: BATTLE, TELEPORT, HEAL, BUFF"
echo "├─ 🔮 Vérifications d'état"
echo "└─ 🚀 Optimisation quantique"
echo
echo "🌐 ACCÈS AUX INTERFACES:"
echo "├─ 🔥 Backend API: http://localhost:8080/api/temporal/health"
echo "├─ 🌐 Frontend Classique: http://localhost:8000/"
echo "└─ ⚡ Frontend Temporel: http://localhost:5173/"
echo
echo "🎮 Game ID utilisé: $GAME_ID"
echo "📝 Tu peux maintenant utiliser ce Game ID dans les frontends !"
echo
echo "🚀 HEROES OF TIME - SCRIPT LANGUAGE READY TO USE!" 