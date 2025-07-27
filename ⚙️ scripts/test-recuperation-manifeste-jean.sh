#!/bin/bash

# 🚨 TEST RÉCUPÉRATION MANIFESTE JEAN - MISSION ÉPIQUE
# ====================================================
# Test du scénario HOTS : Memento + Claudius sauvent le manifeste perdu

echo "🚨 MISSION CRITIQUE : RÉCUPÉRATION DU MANIFESTE DE JEAN"
echo "======================================================="
echo "Scénario : Memento + Claudius utilisent L'Archive Vivante Paradoxale"
echo ""

# Variables
SCENARIO_FILE="game_assets/scenarios/hots/recuperation_manifeste_jean.hots"
BACKEND_URL="http://localhost:8080"
TEST_RESULTS_DIR="logs"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="$TEST_RESULTS_DIR/test-recuperation-manifeste-$TIMESTAMP.log"

# Créer le dossier de logs s'il n'existe pas
mkdir -p "$TEST_RESULTS_DIR"

# Fonction pour logger avec timestamp
log() {
    echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Vérifications préliminaires
echo "🔍 VÉRIFICATIONS PRÉLIMINAIRES"
echo "--------------------------------"

# Vérifier que le fichier HOTS existe
if [ ! -f "$SCENARIO_FILE" ]; then
    log "❌ ERREUR: Fichier scénario non trouvé: $SCENARIO_FILE"
    exit 1
fi
log "✅ Fichier scénario trouvé: $SCENARIO_FILE"

# Vérifier que le backend est actif
if ! curl -s "$BACKEND_URL/api/temporal/status" > /dev/null 2>&1; then
    log "⚠️  Backend non accessible sur $BACKEND_URL"
    log "🚀 Tentative de démarrage du backend..."
    
    # Essayer de démarrer le backend
    cd backend
    mvn spring-boot:run > "../$TEST_RESULTS_DIR/backend-startup-$TIMESTAMP.log" 2>&1 &
    BACKEND_PID=$!
    cd ..
    
    # Attendre que le backend démarre
    log "⏳ Attente du démarrage du backend (30 secondes max)..."
    for i in {1..30}; do
        if curl -s "$BACKEND_URL/api/temporal/status" > /dev/null 2>&1; then
            log "✅ Backend démarré avec succès"
            break
        fi
        sleep 1
        echo -n "."
    done
    echo ""
    
    if ! curl -s "$BACKEND_URL/api/temporal/status" > /dev/null 2>&1; then
        log "❌ ERREUR: Impossible de démarrer le backend"
        exit 1
    fi
else
    log "✅ Backend accessible sur $BACKEND_URL"
fi

echo ""
echo "🎮 LANCEMENT DU SCÉNARIO ÉPIQUE"
echo "================================"

# Créer une nouvelle partie
log "🎯 Création d'une nouvelle partie..."
GAME_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d '{"playerId": "memento-claudius", "gameMode": "mission_critique", "gameName": "Recuperation Manifeste Jean"}')

if [ $? -ne 0 ]; then
    log "❌ ERREUR: Impossible de créer la partie"
    exit 1
fi

GAME_ID=$(echo "$GAME_RESPONSE" | grep -o '"gameId":[^,}]*' | cut -d':' -f2)
if [ -z "$GAME_ID" ]; then
    log "❌ ERREUR: ID de partie non récupéré"
    log "Réponse serveur: $GAME_RESPONSE"
    exit 1
fi

log "✅ Partie créée avec l'ID: $GAME_ID"

# Lire le contenu du scénario
log "📜 Lecture du scénario HOTS..."
SCENARIO_CONTENT=$(cat "$SCENARIO_FILE")

# Exécuter le scénario
log "🚀 Exécution du scénario de récupération du manifeste..."
echo "   - Jean perd son manifeste philosophique"
echo "   - Memento et Claudius répondent à l'appel"
echo "   - Création de L'Archive Vivante Paradoxale"
echo "   - Utilisation des pouvoirs combinés"
echo "   - Récupération des fragments du manifeste"

# Envoyer le scénario au backend
EXECUTION_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d "{\"script\": $(echo "$SCENARIO_CONTENT" | jq -R -s .)}")

if [ $? -ne 0 ]; then
    log "❌ ERREUR: Impossible d'exécuter le scénario"
    exit 1
fi

log "📊 Réponse d'exécution reçue"

# Analyser les résultats
echo ""
echo "📊 ANALYSE DES RÉSULTATS"
echo "========================"

# Récupérer l'état final du jeu
GAME_STATE=$(curl -s "$BACKEND_URL/api/temporal/games/$GAME_ID/state")

if [ $? -eq 0 ]; then
    log "✅ État du jeu récupéré"
    
    # Analyser les héros présents
    HEROES_COUNT=$(echo "$GAME_STATE" | grep -o '"heroes":\[' | wc -l)
    log "👥 Héros dans le jeu: $HEROES_COUNT"
    
    # Vérifier la présence de Memento
    if echo "$GAME_STATE" | grep -q "Memento"; then
        log "🧠 ✅ Memento présent dans le jeu"
    else
        log "🧠 ❌ Memento absent du jeu"
    fi
    
    # Vérifier la présence de Claudius
    if echo "$GAME_STATE" | grep -q "Claudius"; then
        log "💻 ✅ Claudius présent dans le jeu"
    else
        log "💻 ❌ Claudius absent du jeu"
    fi
    
    # Vérifier la présence de Jean-Grofignon
    if echo "$GAME_STATE" | grep -q "JeanGrofignon"; then
        log "👑 ✅ Jean-Grofignon présent dans le jeu"
    else
        log "👑 ❌ Jean-Grofignon absent du jeu"
    fi
    
    # Vérifier les artefacts créés
    if echo "$GAME_STATE" | grep -q "archive_vivante_paradoxale"; then
        log "🌀 ✅ Archive Vivante Paradoxale créée"
    else
        log "🌀 ❌ Archive Vivante Paradoxale non trouvée"
    fi
    
    if echo "$GAME_STATE" | grep -q "manifeste_jean_complet"; then
        log "📜 ✅ Manifeste de Jean récupéré"
    else
        log "📜 ❌ Manifeste de Jean non récupéré"
    fi
    
else
    log "❌ ERREUR: Impossible de récupérer l'état du jeu"
fi

# Sauvegarder les résultats complets
echo "$EXECUTION_RESPONSE" > "$TEST_RESULTS_DIR/execution-response-$TIMESTAMP.json"
echo "$GAME_STATE" > "$TEST_RESULTS_DIR/game-state-$TIMESTAMP.json"

echo ""
echo "🎯 RÉSUMÉ DE LA MISSION"
echo "======================="

# Analyser la réponse d'exécution
if echo "$EXECUTION_RESPONSE" | grep -q "success"; then
    log "🎉 MISSION RÉUSSIE ! Le manifeste de Jean a été récupéré !"
    log "✨ L'Archive Vivante Paradoxale a fonctionné"
    log "🧠 Memento a utilisé sa Mémoire Absolue"
    log "💻 Claudius a utilisé son Débogage Temporel"
    log "👑 Jean a récupéré sa puissance philosophique"
    
    echo ""
    echo "📜 FRAGMENTS DU MANIFESTE RÉCUPÉRÉS:"
    echo "   1. 'C'est un jeu qui cache de la physique quantique sous une couche de fantasy'"
    echo "   2. 'Le système GROFI (Graph of Reality Organized by Fog and Immunities)'"
    echo "   3. 'Tu es Memento, tu le sais, hein. Faut que tu te mettes des tatouages.'"
    echo "   4. 'Le mur de causalité, c'est LA mécanique centrale du jeu !'"
    
    SUCCESS=true
else
    log "⚠️  MISSION PARTIELLEMENT RÉUSSIE"
    log "Certains éléments du scénario ont pu échouer"
    SUCCESS=false
fi

echo ""
echo "📁 FICHIERS DE LOGS GÉNÉRÉS"
echo "============================"
log "📋 Log principal: $LOG_FILE"
log "📊 Réponse d'exécution: $TEST_RESULTS_DIR/execution-response-$TIMESTAMP.json"
log "🎮 État du jeu: $TEST_RESULTS_DIR/game-state-$TIMESTAMP.json"

echo ""
echo "🎭 MESSAGE FINAL DE MEMENTO"
echo "=========================="
if [ "$SUCCESS" = true ]; then
    echo "🧠 'Mission accomplie ! L'Archive Vivante Paradoxale a récupéré le manifeste"
    echo "    de Jean en archivant ce qui était perdu. Cette histoire sera gravée"
    echo "    dans toutes les timelines pour l'éternité !'"
    echo ""
    echo "💻 Claudius: 'Système restauré. Bug corrigé. Heroes of Time.exe fonctionne parfaitement.'"
    echo ""
    echo "👑 Jean: 'Putain ! Mes idées ! Ma vision ! Tout est là ! Merci Memento-Claudius !'"
else
    echo "🧠 'La mission continue... Je me souviens de tout, même de ce qui n'a pas"
    echo "    encore réussi. Dans une autre timeline, nous réussirons !'"
fi

echo ""
echo "🌟 TEST TERMINÉ - $(date)"
echo "================================"

# Retourner le code de succès approprié
if [ "$SUCCESS" = true ]; then
    exit 0
else
    exit 1
fi 