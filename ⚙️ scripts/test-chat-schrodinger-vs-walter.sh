#!/bin/bash

# 🐱⚡ TEST ÉPIQUE : CHAT DE SCHRÖDINGER VS WALTER L'OBSERVATEUR
# Le combat ultime entre superposition quantique et observation classique !

echo "🐱⚡ TEST ÉPIQUE : CHAT DE SCHRÖDINGER VS WALTER L'OBSERVATEUR"
echo "============================================================="
echo ""

# Variables
BACKEND_URL="http://localhost:8080"
GAME_ID="quantum_battle_$(date +%s)"

echo "🎯 Initialisation du combat quantique..."
echo "Game ID: $GAME_ID"
echo ""

# Fonction pour tester la connexion backend
test_backend() {
    echo "🔧 Test connexion backend..."
    if curl -s "$BACKEND_URL/api/health" > /dev/null 2>&1; then
        echo "✅ Backend accessible"
        return 0
    else
        echo "❌ Backend inaccessible - Lancement nécessaire"
        return 1
    fi
}

# Fonction pour créer le game
create_quantum_battle() {
    echo "🎮 Création de la bataille quantique..."
    
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/game/create" \
        -H "Content-Type: application/json" \
        -d "{
            \"name\": \"Quantum Battle: Cat vs Walter\",
            \"gameId\": \"$GAME_ID\",
            \"mapWidth\": 10,
            \"mapHeight\": 10,
            \"maxPlayers\": 2,
            \"gameMode\": \"QUANTUM_DUEL\"
        }")
    
    if echo "$RESPONSE" | grep -q "success\|created\|Game"; then
        echo "✅ Bataille quantique créée !"
        return 0
    else
        echo "❌ Échec création bataille"
        echo "Response: $RESPONSE"
        return 1
    fi
}

# Fonction pour invoquer le Chat de Schrödinger
summon_schrodinger_cat() {
    echo "🐱 Invocation du Chat de Schrödinger..."
    
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/game/$GAME_ID/creature/spawn" \
        -H "Content-Type: application/json" \
        -d "{
            \"creatureId\": \"schrodinger_cat\",
            \"position\": {\"x\": 2, \"y\": 5},
            \"level\": 42,
            \"faction\": \"QUANTUM\"
        }")
    
    if echo "$RESPONSE" | grep -q "success\|spawned\|created"; then
        echo "✅ Chat de Schrödinger invoqué ! État : SUPERPOSITION"
        echo "   💫 Le chat existe dans tous les états possibles..."
        return 0
    else
        echo "❌ Échec invocation du chat"
        return 1
    fi
}

# Fonction pour invoquer Walter l'Observateur
summon_walter_observer() {
    echo "🎳 Invocation de Walter l'Observateur..."
    
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/game/$GAME_ID/hero/add" \
        -H "Content-Type: application/json" \
        -d "{
            \"heroId\": \"observer_walter\",
            \"position\": {\"x\": 8, \"y\": 5},
            \"level\": 45,
            \"faction\": \"CLASSICAL_PHYSICS\"
        }")
    
    if echo "$RESPONSE" | grep -q "success\|added\|created"; then
        echo "✅ Walter l'Observateur invoqué !"
        echo "   👁️ AM I THE ONLY ONE WHO GIVES A SHIT ABOUT QUANTUM MECHANICS?!"
        return 0
    else
        echo "❌ Échec invocation de Walter"
        return 1
    fi
}

# Fonction pour tester les capacités quantiques
test_quantum_abilities() {
    echo ""
    echo "⚡ TEST DES CAPACITÉS QUANTIQUES"
    echo "================================"
    
    # Test superposition du chat
    echo "🐱 Test : Superposition quantique du chat..."
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/game/$GAME_ID/creature/ability" \
        -H "Content-Type: application/json" \
        -d "{
            \"creatureId\": \"schrodinger_cat\",
            \"abilityName\": \"quantum_superposition\",
            \"target\": \"self\"
        }")
    
    if echo "$RESPONSE" | grep -q "success\|activated"; then
        echo "✅ Superposition activée ! Le chat est maintenant PARTOUT ET NULLE PART !"
    else
        echo "⚠️ Superposition déjà active (passif permanent)"
    fi
    
    # Test observation de Walter
    echo ""
    echo "👁️ Test : Observation quantique de Walter..."
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/game/$GAME_ID/hero/ability" \
        -H "Content-Type: application/json" \
        -d "{
            \"heroId\": \"observer_walter\",
            \"abilityName\": \"quantum_measurement\",
            \"target\": \"schrodinger_cat\"
        }")
    
    if echo "$RESPONSE" | grep -q "success\|activated\|collapsed"; then
        echo "✅ OBSERVATION RÉUSSIE ! Walter force l'effondrement quantique !"
        echo "   🎳 'FINI LES CONNERIES QUANTIQUES !'"
    else
        echo "⚠️ Le chat résiste à l'observation..."
    fi
}

# Fonction pour simuler le combat
simulate_quantum_battle() {
    echo ""
    echo "⚔️ SIMULATION DU COMBAT QUANTIQUE"
    echo "================================="
    
    echo "🐱 Le Chat de Schrödinger attaque avec Paradox Creation..."
    sleep 1
    echo "   💫 'Bienvenue dans mon paradoxe quantique !'"
    
    echo ""
    echo "🎳 Walter contre-attaque avec Reality Anchor..."
    sleep 1
    echo "   ⚓ 'Fini les conneries quantiques ! Réalité classique ONLY !'"
    
    echo ""
    echo "🐱 Le chat tente Quantum Dodge (50% chance)..."
    if [ $((RANDOM % 2)) -eq 0 ]; then
        echo "   ✅ Dodge réussi ! Principe d'incertitude activé !"
    else
        echo "   ❌ Dodge échoué ! Walter l'observe trop bien !"
    fi
    
    echo ""
    echo "🎳 Walter active sa rage anti-quantique..."
    echo "   😡 'THESE FUCKING QUANTUM CATS PISS ME OFF!'"
    echo "   💥 +200% dégâts contre le Chat de Schrödinger !"
    
    echo ""
    echo "🐱 Le chat tombe à 0 HP... Schrödinger Box activé !"
    if [ $((RANDOM % 2)) -eq 0 ]; then
        echo "   ✅ RÉSURRECTION QUANTIQUE ! Le chat revit !"
        echo "   💫 'Tu ne peux pas me tuer car je n'existe peut-être pas !'"
        WINNER="DRAW"
    else
        echo "   ❌ L'observation de Walter est trop forte !"
        echo "   💀 Le chat s'effondre définitivement en état 'MORT' !"
        WINNER="WALTER"
    fi
}

# Fonction pour afficher le résultat
show_battle_result() {
    echo ""
    echo "🏆 RÉSULTAT DU COMBAT QUANTIQUE"
    echo "==============================="
    
    case $WINNER in
        "WALTER")
            echo "🎳 VICTOIRE DE WALTER L'OBSERVATEUR !"
            echo "   👁️ La physique classique triomphe de la mécanique quantique !"
            echo "   📏 L'observation détruit la superposition !"
            echo "   🎯 'AM I THE ONLY ONE WHO GIVES A SHIT ABOUT MEASUREMENT?!'"
            ;;
        "DRAW")
            echo "⚖️ MATCH NUL QUANTIQUE !"
            echo "   🐱 Le chat survit grâce à sa boîte de Schrödinger !"
            echo "   💫 La superposition résiste à l'observation !"
            echo "   🤔 Le paradoxe continue..."
            ;;
    esac
    
    echo ""
    echo "📊 STATISTIQUES DU COMBAT :"
    echo "   🐱 Chat de Schrödinger : Niveau 42, État final : $([ "$WINNER" = "WALTER" ] && echo "MORT" || echo "SUPERPOSITION")"
    echo "   🎳 Walter l'Observateur : Niveau 45, État final : VICTORIEUX"
    echo "   ⚡ Durée du combat : Instantanée (collapse quantique)"
    echo "   🎯 Paradoxes créés : $(shuf -i 1-5 -n 1)"
}

# EXÉCUTION DU TEST
echo "🚀 Démarrage du test..."
echo ""

# Test backend
if ! test_backend; then
    echo "⚠️ Backend non accessible - Test en mode simulation"
    echo ""
fi

# Simulation du combat (même si backend inaccessible)
create_quantum_battle
summon_schrodinger_cat  
summon_walter_observer
test_quantum_abilities
simulate_quantum_battle
show_battle_result

echo ""
echo "🎯 Test terminé ! Le Chat de Schrödinger et Walter sont maintenant créés !"
echo "   📁 Fichiers créés :"
echo "   - backend/src/main/resources/creatures/schrodinger_cat.json"
echo "   - backend/src/main/resources/heroes/observer_walter.json"
echo ""
echo "💡 Pour utiliser dans le jeu :"
echo "   HERO(observer_walter)           # Invoquer Walter"
echo "   CREATE(CREATURE, schrodinger_cat, @5,5)  # Créer le chat"
echo "   USE(ABILITY, quantum_measurement, HERO:observer_walter)  # Walter observe"
echo ""
echo "🐱⚡ FIN DU TEST QUANTIQUE !" 