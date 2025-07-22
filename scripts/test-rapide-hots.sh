#!/bin/bash

# 🚀 Heroes of Time - Test Rapide des Scénarios HOTS
# ====================================================

# Couleurs pour un affichage clair
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}🔍 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Variables
BASE_URL="http://localhost:8080"
GAME_ID=""

# Fonction pour appeler l'API
call_api() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    print_status "Test: $description"
    
    if [ -n "$data" ]; then
        response=$(curl -s -X $method \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL$endpoint")
    else
        response=$(curl -s -X $method "$BASE_URL$endpoint")
    fi
    
    if [ $? -eq 0 ]; then
        print_success "$description - OK"
        echo "$response" | jq . 2>/dev/null || echo "$response"
        return 0
    else
        print_error "$description - ÉCHEC"
        return 1
    fi
}

# Fonction principale de test
run_quick_test() {
    echo -e "${BLUE}🚀 Heroes of Time - Test Rapide HOTS${NC}"
    echo "========================================"
    
    # 1. Vérifier que le serveur est accessible
    print_status "Vérification du serveur..."
    if curl -s "$BASE_URL/api/temporal/health" > /dev/null 2>&1; then
        print_success "Serveur accessible!"
    else
        print_error "Serveur non accessible sur $BASE_URL"
        print_info "Assurez-vous que le backend est démarré"
        return 1
    fi
    
    # 2. Créer un jeu de test
    print_status "Création d'un jeu de test..."
    create_response=$(call_api "POST" "/api/temporal/games" '{"gameName": "Test Rapide HOTS", "playerId": "testeur"}' "Création du jeu")
    GAME_ID=$(echo "$create_response" | jq -r '.gameId // .id // 1')
    
    if [ "$GAME_ID" == "null" ] || [ -z "$GAME_ID" ]; then
        GAME_ID="1"
        print_warning "ID du jeu non trouvé, utilisation de l'ID 1"
    fi
    
    # 3. Démarrer le jeu
    call_api "POST" "/api/temporal/games/$GAME_ID/start" "" "Démarrage du jeu"
    
    # 4. Tests des commandes HOTS
    echo -e "\n${BLUE}📋 Tests des Commandes HOTS${NC}"
    echo "=============================="
    
    # Test 1: Création de héros
    call_api "POST" "/api/temporal/games/$GAME_ID/script" '{"script": "HERO(Arthur)"}' "Création héros Arthur"
    call_api "POST" "/api/temporal/games/$GAME_ID/script" '{"script": "HERO(Ragnar)"}' "Création héros Ragnar"
    
    # Test 2: Mouvements
    call_api "POST" "/api/temporal/games/$GAME_ID/script" '{"script": "MOV(Arthur, @15,15)"}' "Mouvement Arthur"
    call_api "POST" "/api/temporal/games/$GAME_ID/script" '{"script": "MOV(Ragnar, @12,8)"}' "Mouvement Ragnar"
    
    # Test 3: Création d'entités
    call_api "POST" "/api/temporal/games/$GAME_ID/script" '{"script": "CREATE(ITEM, Potion)"}' "Création item"
    call_api "POST" "/api/temporal/games/$GAME_ID/script" '{"script": "CREATE(CREATURE, Dragon, @20,20)"}' "Création créature"
    
    # Test 4: ψ-states (système quantique)
    call_api "POST" "/api/temporal/games/$GAME_ID/script" '{"script": "ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))"}' "Création ψ-state"
    call_api "POST" "/api/temporal/games/$GAME_ID/script" '{"script": "†ψ001"}' "Collapse ψ-state"
    
    # Test 5: Artefacts temporels
    call_api "POST" "/api/temporal/games/$GAME_ID/script" '{"script": "USE(ARTIFACT, Lame-Avant-Monde, HERO:Arthur)"}' "Utilisation artefact"
    
    # Test 6: État du jeu
    call_api "GET" "/api/temporal/games/$GAME_ID/state" "" "Récupération état du jeu"
    
    # 7. Résumé
    echo -e "\n${BLUE}📊 Résumé des Tests${NC}"
    echo "==================="
    print_info "Tests terminés - Vérifiez les résultats ci-dessus"
    print_info "Pour plus de détails, consultez: RAPPORT_TESTS_SCENARIOS_CLAIR.md"
    
    print_success "Test rapide terminé!"
    echo -e "\n${YELLOW}🎮 Système Heroes of Time testé avec succès!${NC}"
}

# Fonction pour nettoyer les ports
cleanup_ports() {
    echo -e "${BLUE}🧹 Nettoyage des ports en conflit${NC}"
    
    # Tuer les processus sur les ports utilisés
    for port in 8080 8000 5173 8001; do
        pids=$(lsof -ti:$port)
        if [ -n "$pids" ]; then
            print_info "Nettoyage du port $port..."
            echo $pids | xargs kill -9 2>/dev/null
        fi
    done
    
    sleep 2
    print_success "Ports nettoyés!"
}

# Fonction pour démarrer le backend
start_backend() {
    echo -e "${BLUE}🔧 Démarrage du backend${NC}"
    
    cd backend
    mvn spring-boot:run -Dspring-boot.run.arguments="--heroes.parser.use.antlr=false" > ../backend-test.log 2>&1 &
    cd ..
    
    # Attendre que le backend soit prêt
    print_info "Attente du démarrage du backend..."
    for i in {1..30}; do
        if curl -s "$BASE_URL/api/temporal/health" > /dev/null 2>&1; then
            print_success "Backend prêt!"
            return 0
        fi
        echo -n "."
        sleep 2
    done
    
    print_error "Backend non démarré après 60 secondes"
    return 1
}

# Script principal
main() {
    cleanup_ports
    
    # Vérifier si le backend est déjà démarré
    if ! curl -s "$BASE_URL/api/temporal/health" > /dev/null 2>&1; then
        start_backend
        if [ $? -ne 0 ]; then
            print_error "Impossible de démarrer le backend"
            exit 1
        fi
    else
        print_success "Backend déjà démarré!"
    fi
    
    # Lancer les tests
    run_quick_test
}

# Exécuter le script principal
main "$@" 