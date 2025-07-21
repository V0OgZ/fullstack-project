#!/bin/bash

# 🎮 Heroes of Time - AutoPlay Demo Automatique
# ==============================================
# Lance automatiquement un scénario simple avec logs détaillés

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}🎮 $1${NC}"
    echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
}

print_step() {
    echo -e "${YELLOW}🔄 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

print_log() {
    echo -e "${MAGENTA}📋 $1${NC}"
}

# Variables
BASE_URL="http://localhost:8080"
GAME_ID=""
LOG_FILE="autoplay-demo.log"

# Créer le fichier de log
echo "🎮 Heroes of Time - AutoPlay Demo - $(date)" > $LOG_FILE

# Fonction pour logger
log_message() {
    echo "[$(date '+%H:%M:%S')] $1" >> $LOG_FILE
    print_log "$1"
}

# Fonction pour nettoyer tout
cleanup_everything() {
    print_header "NETTOYAGE COMPLET DU SYSTÈME"
    
    log_message "Nettoyage des processus en cours..."
    
    # Tuer tous les processus Java Spring Boot
    pkill -f "spring-boot:run" 2>/dev/null || true
    pkill -f "java.*spring-boot" 2>/dev/null || true
    
    # Tuer tous les serveurs HTTP Python
    pkill -f "python3.*http.server" 2>/dev/null || true
    
    # Nettoyer les ports spécifiques
    for port in 8080 8000 5173 8001; do
        pids=$(lsof -ti:$port 2>/dev/null || true)
        if [ -n "$pids" ]; then
            print_step "Nettoyage du port $port..."
            echo $pids | xargs kill -9 2>/dev/null || true
            log_message "Port $port nettoyé"
        fi
    done
    
    sleep 3
    print_success "Nettoyage terminé!"
    log_message "Nettoyage complet terminé"
}

# Fonction pour démarrer le backend
start_backend() {
    print_header "DÉMARRAGE DU BACKEND"
    
    log_message "Démarrage du backend Heroes of Time..."
    
    cd backend
    
    # Vérifier si mvnw existe, sinon utiliser mvn
    if [ ! -f "./mvnw" ]; then
        print_info "mvnw non trouvé, utilisation de mvn"
        log_message "Utilisation de mvn au lieu de mvnw"
        MVN_CMD="mvn"
    else
        MVN_CMD="./mvnw"
    fi
    
    # Démarrer le backend en arrière-plan
    print_step "Lancement du backend avec $MVN_CMD..."
    $MVN_CMD spring-boot:run -Dspring-boot.run.arguments="--heroes.parser.use.antlr=false" > ../backend-autoplay.log 2>&1 &
    BACKEND_PID=$!
    
    cd ..
    
    # Attendre que le backend soit prêt
    print_step "Attente du démarrage du backend..."
    for i in {1..40}; do
        if curl -s "$BASE_URL/api/temporal/health" > /dev/null 2>&1; then
            print_success "Backend prêt sur le port 8080!"
            log_message "Backend démarré avec succès (PID: $BACKEND_PID)"
            return 0
        fi
        echo -n "."
        sleep 2
    done
    
    print_error "Backend non démarré après 80 secondes"
    log_message "ERREUR: Backend non démarré après 80 secondes"
    return 1
}

# Fonction pour appeler l'API avec logs
call_api() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    print_step "API: $description"
    log_message "Appel API: $method $endpoint"
    
    if [ -n "$data" ]; then
        response=$(curl -s -X $method \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL$endpoint" 2>>$LOG_FILE)
    else
        response=$(curl -s -X $method "$BASE_URL$endpoint" 2>>$LOG_FILE)
    fi
    
    if [ $? -eq 0 ]; then
        print_success "$description - OK"
        log_message "API SUCCESS: $description"
        echo "$response" | jq . 2>/dev/null || echo "$response"
        echo "$response" >> $LOG_FILE
        return 0
    else
        print_error "$description - ÉCHEC"
        log_message "API ERROR: $description"
        return 1
    fi
}

# Fonction pour jouer un scénario automatiquement
play_scenario() {
    print_header "SCÉNARIO AUTOMATIQUE: BATAILLE TEMPORELLE"
    
    log_message "Début du scénario automatique"
    
    # 1. Créer un jeu
    print_step "Création du jeu..."
    create_response=$(call_api "POST" "/api/temporal/games" \
        '{"gameName": "AutoPlay Demo", "playerId": "autoplay"}' \
        "Création du jeu")
    
    GAME_ID=$(echo "$create_response" | jq -r '.gameId // .id // 1')
    log_message "Game ID: $GAME_ID"
    
    # 2. Démarrer le jeu
    call_api "POST" "/api/temporal/games/$GAME_ID/start" "" "Démarrage du jeu"
    
    # 3. Créer les héros
    print_step "⚔️ Création des héros..."
    call_api "POST" "/api/temporal/games/$GAME_ID/script" \
        '{"script": "HERO(Arthur)"}' "Création du héros Arthur"
    
    call_api "POST" "/api/temporal/games/$GAME_ID/script" \
        '{"script": "HERO(Merlin)"}' "Création du héros Merlin"
    
    sleep 2
    
    # 4. Positionner les héros
    print_step "📍 Positionnement des héros..."
    call_api "POST" "/api/temporal/games/$GAME_ID/script" \
        '{"script": "MOV(Arthur, @10,10)"}' "Arthur se positionne"
    
    call_api "POST" "/api/temporal/games/$GAME_ID/script" \
        '{"script": "MOV(Merlin, @15,15)"}' "Merlin se positionne"
    
    sleep 2
    
    # 5. Créer des objets magiques
    print_step "✨ Création d'objets magiques..."
    call_api "POST" "/api/temporal/games/$GAME_ID/script" \
        '{"script": "CREATE(ITEM, Excalibur)"}' "Création d'Excalibur"
    
    call_api "POST" "/api/temporal/games/$GAME_ID/script" \
        '{"script": "CREATE(CREATURE, Dragon, @20,20)"}' "Invocation d'un Dragon"
    
    sleep 2
    
    # 6. Utiliser des artefacts temporels
    print_step "⏰ Utilisation d'artefacts temporels..."
    call_api "POST" "/api/temporal/games/$GAME_ID/script" \
        '{"script": "USE(ARTIFACT, Lame-Avant-Monde, HERO:Arthur)"}' "Arthur utilise la Lame d'Avant-Monde"
    
    sleep 2
    
    # 7. Créer des ψ-states (superpositions quantiques)
    print_step "🌌 Création de superpositions quantiques..."
    call_api "POST" "/api/temporal/games/$GAME_ID/script" \
        '{"script": "ψ001: ⊙(Δt+2 @12,12 ⟶ MOV(Arthur, @12,12))"}' "Arthur crée une superposition temporelle"
    
    call_api "POST" "/api/temporal/games/$GAME_ID/script" \
        '{"script": "ψ002: ⊙(Δt+3 @18,18 ⟶ MOV(Merlin, @18,18))"}' "Merlin crée une superposition temporelle"
    
    sleep 3
    
    # 8. Collapse des ψ-states
    print_step "💥 Collapse des superpositions quantiques..."
    call_api "POST" "/api/temporal/games/$GAME_ID/script" \
        '{"script": "†ψ001"}' "Collapse de la superposition d'Arthur"
    
    sleep 2
    
    call_api "POST" "/api/temporal/games/$GAME_ID/script" \
        '{"script": "†ψ002"}' "Collapse de la superposition de Merlin"
    
    sleep 2
    
    # 9. État final du jeu
    print_step "📊 Récupération de l'état final..."
    call_api "GET" "/api/temporal/games/$GAME_ID/state" "" "État final du jeu"
    
    log_message "Scénario automatique terminé"
}

# Fonction pour afficher le résumé
show_summary() {
    print_header "RÉSUMÉ DE LA DÉMONSTRATION"
    
    print_info "🎮 Scénario joué automatiquement:"
    echo "   • Création de 2 héros (Arthur et Merlin)"
    echo "   • Positionnement stratégique"
    echo "   • Création d'objets magiques (Excalibur, Dragon)"
    echo "   • Utilisation d'artefacts temporels"
    echo "   • Superpositions quantiques (ψ-states)"
    echo "   • Collapse des superpositions"
    echo "   • État final du jeu"
    
    print_info "📋 Logs détaillés disponibles dans: $LOG_FILE"
    print_info "🌐 Backend accessible sur: http://localhost:8080"
    print_info "🔧 Health check: curl http://localhost:8080/api/temporal/health"
    
    print_success "Démonstration terminée avec succès!"
    log_message "Démonstration AutoPlay terminée"
}

# Fonction principale
main() {
    print_header "HEROES OF TIME - AUTOPLAY DEMO"
    
    print_info "🎯 Ce script va automatiquement:"
    echo "   1. Nettoyer tous les processus"
    echo "   2. Démarrer le backend"
    echo "   3. Jouer un scénario complet"
    echo "   4. Afficher les résultats"
    echo ""
    
    # Nettoyer tout
    cleanup_everything
    
    # Démarrer le backend
    if ! start_backend; then
        print_error "Impossible de démarrer le backend"
        log_message "ERREUR: Impossible de démarrer le backend"
        exit 1
    fi
    
    # Jouer le scénario
    play_scenario
    
    # Afficher le résumé
    show_summary
    
    print_info "🎮 Le backend reste actif pour d'autres tests!"
    print_info "   Pour arrêter: pkill -f 'spring-boot:run'"
}

# Vérifier si on est dans le bon répertoire
if [ ! -d "backend" ]; then
    print_error "Erreur: Répertoire 'backend' non trouvé"
    print_info "Assurez-vous d'être dans le répertoire Heroes-of-Time"
    exit 1
fi

# Lancer le script principal
main "$@" 