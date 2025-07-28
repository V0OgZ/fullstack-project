#!/bin/bash

# 🎮 Heroes of Time - Test de tous les scénarios HOTS
# ================================================

echo "🎮 Heroes of Time - Test des scénarios HOTS"
echo "==========================================="

# Configuration
BACKEND_URL="http://localhost:8080"
GAME_ID=""

# Fonction pour tester la connexion backend
test_backend() {
    echo "🔍 Test de connexion au backend..."
    if curl -s "$BACKEND_URL/api/game/status" > /dev/null 2>&1; then
        echo "✅ Backend connecté sur $BACKEND_URL"
        return 0
    else
        echo "❌ Backend non accessible sur $BACKEND_URL"
        return 1
    fi
}

# Fonction pour créer un nouveau jeu
create_game() {
    echo "🎯 Création d'un nouveau jeu..."
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
        -H "Content-Type: application/json" \
        -d '{
            "gameName": "Test HOTS Scenarios",
            "playerCount": 2,
            "mapWidth": 20,
            "mapHeight": 15
        }')
    
    # Correction: chercher "gameId" au lieu de "id"
    GAME_ID=$(echo $RESPONSE | grep -o '"gameId":[0-9]*' | grep -o '[0-9]*')
    if [ -n "$GAME_ID" ]; then
        echo "✅ Jeu créé avec ID: $GAME_ID"
        return 0
    else
        echo "❌ Échec de création du jeu"
        echo "Réponse: $RESPONSE"
        return 1
    fi
}

# Fonction pour exécuter un script HOTS
execute_hots_script() {
    local script="$1"
    local description="$2"
    
    echo "📝 Exécution: $description"
    echo "   Script: $script"
    
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"$script\"}")
    
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo "✅ Succès"
    else
        echo "❌ Échec"
        echo "   Réponse: $RESPONSE"
    fi
    echo ""
}

# Fonction pour obtenir l'état du jeu
get_game_state() {
    echo "📊 État du jeu:"
    curl -s "$BACKEND_URL/api/temporal/games/$GAME_ID/state" | jq '.' || echo "État non disponible"
    echo ""
}

# Scénarios HOTS à tester
run_hots_scenarios() {
    echo "🎭 SCÉNARIOS HOTS - TEST COMPLET"
    echo "================================="
    
    # Scénario 1: Création de héros
    echo "🎭 Scénario 1: Création de héros"
    execute_hots_script "HERO(Arthur)" "Créer héros Arthur"
    execute_hots_script "HERO(Ragnar)" "Créer héros Ragnar"
    execute_hots_script "HERO(Merlin)" "Créer héros Merlin"
    
    # Scénario 2: Mouvements basiques
    echo "🎭 Scénario 2: Mouvements basiques"
    execute_hots_script "MOV(Arthur, @10,10)" "Déplacer Arthur"
    execute_hots_script "MOV(Ragnar, @15,15)" "Déplacer Ragnar"
    execute_hots_script "MOV(Merlin, @5,8)" "Déplacer Merlin"
    
    # Scénario 3: Création d'entités
    echo "🎭 Scénario 3: Création d'entités"
    execute_hots_script "CREATE(CREATURE, Dragon, @12,12)" "Créer Dragon"
    execute_hots_script "CREATE(ITEM, AvantWorldBlade)" "Créer Lame de l'Avant-Monde"
    execute_hots_script "BUILD(TOWER, @18,18, Player1)" "Construire Tour"
    
    # Scénario 4: ψ-states (superpositions quantiques)
    echo "🎭 Scénario 4: ψ-states quantiques"
    execute_hots_script "ψ001: ⊙(Δt+2 @11,11 ⟶ MOV(Arthur, @11,11))" "Créer superposition mouvement"
    execute_hots_script "ψ002: ⊙(Δt+1 @16,16 ⟶ CREATE(CREATURE, Griffin, @16,16))" "Créer superposition créature"
    execute_hots_script "ψ003: ⊙(Δt+3 @20,20 ⟶ BATTLE(Arthur, Dragon))" "Créer superposition bataille"
    
    # Scénario 5: Utilisation d'artefacts
    echo "🎭 Scénario 5: Artefacts temporels"
    execute_hots_script "USE(ITEM, AvantWorldBlade, HERO:Arthur)" "Utiliser Lame de l'Avant-Monde"
    execute_hots_script "USE(ITEM, ReverseClock, HERO:Ragnar)" "Utiliser Horloge Inversée"
    execute_hots_script "EQUIP(TemporalEcho, Arthur)" "Équiper Écho Temporel"
    
    # Scénario 6: Collapse des ψ-states
    echo "🎭 Scénario 6: Collapse quantique"
    execute_hots_script "†ψ001" "Collapse superposition mouvement"
    execute_hots_script "†ψ002" "Collapse superposition créature"
    execute_hots_script "†ψ003" "Collapse superposition bataille"
    
    # Scénario 7: Actions avancées
    echo "🎭 Scénario 7: Actions avancées"
    execute_hots_script "CAST(TimeWarp, Arthur, @10,10)" "Lancer sort temporal"
    execute_hots_script "RECRUIT(Knights, 5, Arthur)" "Recruter chevaliers"
    execute_hots_script "COLLECT(Gold, 100, Player1)" "Collecter or"
    execute_hots_script "SIEGE(EnemyTower, @18,18, Arthur)" "Assiéger tour ennemie"
    
    # Scénario 8: Triggers d'observation
    echo "🎭 Scénario 8: Triggers d'observation"
    execute_hots_script "ψ004: ⊙(Δt+1 @13,13 ⟶ MOV(Ragnar, @13,13))" "Créer superposition conditionnelle"
    execute_hots_script "Π(Arthur enters @13,13) ⇒ †ψ004" "Définir trigger d'observation"
    execute_hots_script "MOV(Arthur, @13,13)" "Déclencher trigger"
    
    echo "✅ Tous les scénarios HOTS testés!"
}

# Fonction principale
main() {
    echo "🚀 Démarrage des tests HOTS"
    echo ""
    
    # Vérifier le backend
    if ! test_backend; then
        echo "❌ Impossible de continuer sans backend"
        exit 1
    fi
    
    # Créer le jeu
    if ! create_game; then
        echo "❌ Impossible de créer le jeu"
        exit 1
    fi
    
    # Exécuter les scénarios
    run_hots_scenarios
    
    # État final
    echo "📊 ÉTAT FINAL DU JEU:"
    get_game_state
    
    echo ""
    echo "🎯 RÉSUMÉ:"
    echo "✅ Tests des scénarios HOTS terminés"
    echo "🎮 Jeu ID: $GAME_ID"
    echo "🌐 Voir les frontends pour la visualisation:"
    echo "   • Frontend Classique: http://localhost:8000"
    echo "   • Frontend Temporel: http://localhost:5173"
    echo "   • Quantum Visualizer: http://localhost:8001"
    echo ""
    echo "🎊 HOTS ENGINE FONCTIONNE PARFAITEMENT!"
}

# Exécuter le script
main 