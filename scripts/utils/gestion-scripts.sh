#!/bin/bash

# 🎮 Heroes of Time - Gestionnaire de Scripts Principal
# =====================================================
# Script principal pour gérer tous les scripts et tests du système

# Couleurs
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

print_menu() {
    echo -e "${YELLOW}📋 MENU PRINCIPAL${NC}"
    echo -e "${CYAN}================${NC}"
    echo ""
    echo -e "${GREEN}🚀 SCRIPTS DE DÉMONSTRATION:${NC}"
    echo "  1) Demo Ultra Simple      - Démonstration rapide et efficace"
    echo "  2) Test Simple           - Tests basiques des fonctionnalités"
    echo "  3) AutoPlay Demo         - Démonstration complète automatique"
    echo "  4) Test Rapide HOTS      - Test complet des scénarios HOTS"
    echo ""
    echo -e "${BLUE}🔧 SCRIPTS DE GESTION:${NC}"
    echo "  5) Démarrer Backend      - Lancer le backend seulement"
    echo "  6) Nettoyer Système      - Nettoyer tous les processus"
    echo "  7) Vérifier Santé        - Vérifier l'état du système"
    echo ""
    echo -e "${MAGENTA}📊 RAPPORTS ET DOCUMENTATION:${NC}"
    echo "  8) Afficher Rapports     - Liste tous les rapports"
    echo "  9) Statut Système        - Afficher l'état actuel"
    echo " 10) Aide Scripts          - Aide sur l'utilisation"
    echo ""
    echo -e "${RED}🛑 CONTRÔLE:${NC}"
    echo "  0) Quitter"
    echo ""
}

# Fonction pour nettoyer le système
nettoyer_systeme() {
    print_header "NETTOYAGE COMPLET DU SYSTÈME"
    
    echo "🧹 Nettoyage des processus..."
    
    # Tuer tous les processus Java Spring Boot
    pkill -f "spring-boot:run" 2>/dev/null || true
    pkill -f "java.*spring-boot" 2>/dev/null || true
    
    # Tuer tous les serveurs HTTP Python
    pkill -f "python3.*http.server" 2>/dev/null || true
    
    # Nettoyer les ports spécifiques
    for port in 8080 8000 5173 8001; do
        pids=$(lsof -ti:$port 2>/dev/null || true)
        if [ -n "$pids" ]; then
            echo "  🔧 Nettoyage du port $port..."
            echo $pids | xargs kill -9 2>/dev/null || true
        fi
    done
    
    sleep 2
    echo "✅ Système nettoyé!"
}

# Fonction pour démarrer le backend
demarrer_backend() {
    print_header "DÉMARRAGE DU BACKEND"
    
    echo "🔧 Démarrage du backend Heroes of Time..."
    
    cd backend
    
    # Vérifier si mvnw existe, sinon utiliser mvn
    if [ ! -f "./mvnw" ]; then
        echo "ℹ️  Utilisation de mvn"
        MVN_CMD="mvn"
    else
        MVN_CMD="./mvnw"
    fi
    
    echo "🚀 Lancement du backend..."
    $MVN_CMD spring-boot:run -Dspring-boot.run.arguments="--heroes.parser.use.antlr=false" > ../backend-gestion.log 2>&1 &
    
    cd ..
    
    echo "⏳ Attente du démarrage..."
    for i in {1..30}; do
        if curl -s "http://localhost:8080/api/temporal/health" > /dev/null 2>&1; then
            echo "✅ Backend prêt!"
            return 0
        fi
        echo -n "."
        sleep 2
    done
    
    echo "❌ Backend non démarré"
    return 1
}

# Fonction pour vérifier la santé du système
verifier_sante() {
    print_header "VÉRIFICATION DE LA SANTÉ DU SYSTÈME"
    
    echo "🔍 Vérification des composants..."
    
    # Vérifier le backend
    if curl -s "http://localhost:8080/api/temporal/health" > /dev/null 2>&1; then
        echo "✅ Backend API (8080) - Fonctionnel"
        
        # Tester une commande simple
        result=$(curl -s -X POST "http://localhost:8080/api/temporal/games" \
            -H "Content-Type: application/json" \
            -d '{"gameName": "Test Santé", "playerId": "health"}')
        
        if echo "$result" | grep -q "success"; then
            echo "✅ API temporelle - Fonctionnelle"
        else
            echo "⚠️  API temporelle - Problème détecté"
        fi
    else
        echo "❌ Backend API (8080) - Non accessible"
    fi
    
    # Vérifier les ports
    echo ""
    echo "🔌 Vérification des ports:"
    for port in 8080 8000 5173 8001; do
        if lsof -ti:$port > /dev/null 2>&1; then
            echo "  ✅ Port $port - Utilisé"
        else
            echo "  ⚪ Port $port - Libre"
        fi
    done
}

# Fonction pour afficher les rapports
afficher_rapports() {
    print_header "RAPPORTS ET DOCUMENTATION DISPONIBLES"
    
    echo "📊 RAPPORTS DE TESTS:"
    echo "  • RAPPORT_TESTS_SCENARIOS_CLAIR.md - Rapport détaillé des tests"
    echo "  • RAPPORT_FINAL_HOTS_CORRECT.md - Rapport final du système"
    echo ""
    echo "📋 LOGS DISPONIBLES:"
    echo "  • autoplay-demo.log - Logs de l'autoplay"
    echo "  • backend-gestion.log - Logs du backend"
    echo "  • backend-test.log - Logs des tests"
    echo ""
    echo "🔧 SCRIPTS DISPONIBLES:"
    echo "  • demo-ultra-simple.sh - Démonstration rapide"
    echo "  • test-simple.sh - Tests basiques"
    echo "  • autoplay-demo.sh - Démonstration complète"
    echo "  • test-rapide-hots.sh - Tests HOTS complets"
    echo ""
    echo "💡 Pour lire un rapport: cat RAPPORT_TESTS_SCENARIOS_CLAIR.md"
}

# Fonction pour afficher l'aide
afficher_aide() {
    print_header "AIDE - UTILISATION DES SCRIPTS"
    
    echo "🎯 OBJECTIFS DES SCRIPTS:"
    echo ""
    echo "🚀 demo-ultra-simple.sh:"
    echo "  • Démonstration rapide et efficace"
    echo "  • Parfait pour débuter"
    echo "  • Temps: ~30 secondes"
    echo ""
    echo "🧪 test-simple.sh:"
    echo "  • Tests basiques des fonctionnalités"
    echo "  • Vérification rapide"
    echo "  • Temps: ~10 secondes"
    echo ""
    echo "🎮 autoplay-demo.sh:"
    echo "  • Démonstration complète automatique"
    echo "  • Nettoie et démarre tout"
    echo "  • Logs détaillés"
    echo "  • Temps: ~2 minutes"
    echo ""
    echo "⚡ test-rapide-hots.sh:"
    echo "  • Tests complets des scénarios HOTS"
    echo "  • Toutes les fonctionnalités"
    echo "  • Temps: ~1 minute"
    echo ""
    echo "💡 UTILISATION RECOMMANDÉE:"
    echo "  1. Commencez par: demo-ultra-simple.sh"
    echo "  2. Puis testez: test-simple.sh"
    echo "  3. Pour une démo complète: autoplay-demo.sh"
}

# Fonction pour afficher le statut
afficher_statut() {
    print_header "STATUT ACTUEL DU SYSTÈME"
    
    echo "🔧 PROCESSUS ACTIFS:"
    ps aux | grep -E "(spring-boot|http.server)" | grep -v grep | head -10
    
    echo ""
    echo "🔌 PORTS UTILISÉS:"
    netstat -an | grep -E ":8080|:8000|:5173|:8001" | head -5
    
    echo ""
    echo "📊 ESPACE DISQUE:"
    df -h . | tail -1
    
    echo ""
    echo "🕒 UPTIME:"
    uptime
}

# Fonction principale
main() {
    while true; do
        clear
        print_header "HEROES OF TIME - GESTIONNAIRE DE SCRIPTS"
        print_menu
        
        echo -n "🎯 Choisissez une option: "
        read choice
        
        case $choice in
            1)
                echo "🚀 Lancement du demo ultra simple..."
                ./demo-ultra-simple.sh
                ;;
            2)
                echo "🧪 Lancement du test simple..."
                ./test-simple.sh
                ;;
            3)
                echo "🎮 Lancement de l'autoplay demo..."
                ./autoplay-demo.sh
                ;;
            4)
                echo "⚡ Lancement du test rapide HOTS..."
                ./test-rapide-hots.sh
                ;;
            5)
                demarrer_backend
                ;;
            6)
                nettoyer_systeme
                ;;
            7)
                verifier_sante
                ;;
            8)
                afficher_rapports
                ;;
            9)
                afficher_statut
                ;;
            10)
                afficher_aide
                ;;
            0)
                echo "👋 Au revoir!"
                exit 0
                ;;
            *)
                echo "❌ Option invalide. Veuillez choisir un nombre entre 0 et 10."
                ;;
        esac
        
        echo ""
        echo -n "Appuyez sur Entrée pour continuer..."
        read
    done
}

# Vérifier si on est dans le bon répertoire
if [ ! -d "backend" ]; then
    echo "❌ Erreur: Répertoire 'backend' non trouvé"
    echo "💡 Assurez-vous d'être dans le répertoire Heroes-of-Time"
    exit 1
fi

# Lancer le gestionnaire
main "$@" 