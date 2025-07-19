#!/bin/bash

# 🌐 Heroes of Time - Démarrage des Frontends UI
# ==============================================
# Script pour démarrer tous les frontends et tester les scénarios UI

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌐 Heroes of Time - Démarrage des Frontends UI${NC}"
echo "============================================="

# Fonction pour nettoyer les ports
cleanup_ports() {
    echo -e "${CYAN}🧹 Nettoyage des ports...${NC}"
    
    # Ports des frontends
    for port in 8000 5173 8001 3000; do
        pids=$(lsof -ti:$port 2>/dev/null || true)
        if [ -n "$pids" ]; then
            echo "  🔧 Nettoyage du port $port..."
            echo $pids | xargs kill -9 2>/dev/null || true
        fi
    done
    
    sleep 2
    echo -e "${GREEN}✅ Ports nettoyés!${NC}"
}

# Fonction pour démarrer les frontends
start_frontends() {
    echo -e "${CYAN}🚀 Démarrage des frontends...${NC}"
    
    # Frontend Classique (port 8000)
    echo "  🏛️ Frontend Classique (port 8000)..."
    cd frontend
    if [ -f "server.js" ]; then
        node server.js > ../logs/frontend-classique-ui.log 2>&1 &
    else
        python3 -m http.server 8000 > ../logs/frontend-classique-ui.log 2>&1 &
    fi
    cd ..
    
    # Frontend Temporel (port 5173)
    echo "  ⚡ Frontend Temporel (port 5173)..."
    cd frontend-temporal
    python3 -m http.server 5173 > ../logs/frontend-temporal-ui.log 2>&1 &
    cd ..
    
    # Quantum Visualizer (port 8001)
    echo "  🌌 Quantum Visualizer (port 8001)..."
    cd quantum-visualizer
    python3 -m http.server 8001 > ../logs/quantum-visualizer-ui.log 2>&1 &
    cd ..
    
    echo -e "${GREEN}✅ Frontends démarrés!${NC}"
}

# Fonction pour vérifier les frontends
check_frontends() {
    echo -e "${CYAN}🔍 Vérification des frontends...${NC}"
    
    sleep 3
    
    # Vérifier chaque frontend
    frontends=(
        "8000:🏛️ Frontend Classique"
        "5173:⚡ Frontend Temporel"
        "8001:🌌 Quantum Visualizer"
    )
    
    for frontend in "${frontends[@]}"; do
        port=$(echo $frontend | cut -d: -f1)
        name=$(echo $frontend | cut -d: -f2)
        
        if curl -s "http://localhost:$port" > /dev/null 2>&1; then
            echo -e "  ✅ $name (port $port) - ${GREEN}Fonctionnel${NC}"
        else
            echo -e "  ❌ $name (port $port) - ${RED}Non accessible${NC}"
        fi
    done
}

# Fonction pour tester les scénarios UI
test_ui_scenarios() {
    echo -e "${CYAN}🎮 Tests des scénarios UI...${NC}"
    
    echo ""
    echo -e "${YELLOW}🎯 SCÉNARIOS UI DISPONIBLES:${NC}"
    echo ""
    
    echo -e "${GREEN}1. Frontend Classique (port 8000):${NC}"
    echo "   • Interface de jeu principale"
    echo "   • Console de scripts HOTS"
    echo "   • Gestion des héros et unités"
    echo "   • URL: http://localhost:8000"
    echo ""
    
    echo -e "${GREEN}2. Frontend Temporel (port 5173):${NC}"
    echo "   • Interface temporelle avancée"
    echo "   • Gestion des ψ-states"
    echo "   • Visualisation des timelines"
    echo "   • URL: http://localhost:5173"
    echo ""
    
    echo -e "${GREEN}3. Quantum Visualizer (port 8001):${NC}"
    echo "   • Visualisation quantique"
    echo "   • Scénarios prédéfinis"
    echo "   • Analyse des interférences"
    echo "   • URL: http://localhost:8001"
    echo ""
    
    echo -e "${YELLOW}🧪 TESTS RECOMMANDÉS:${NC}"
    echo "1. Ouvrir http://localhost:8000 - Tester la console HOTS"
    echo "2. Ouvrir http://localhost:5173 - Tester l'interface temporelle"
    echo "3. Ouvrir http://localhost:8001 - Tester les scénarios quantiques"
}

# Fonction pour afficher les URLs
show_urls() {
    echo -e "${CYAN}🌐 URLs des frontends:${NC}"
    echo ""
    echo -e "${GREEN}┌─────────────────────────────────────────────────────────────┐${NC}"
    echo -e "${GREEN}│ 🏛️ Frontend Classique : http://localhost:8000              │${NC}"
    echo -e "${GREEN}│ ⚡ Frontend Temporel  : http://localhost:5173              │${NC}"
    echo -e "${GREEN}│ 🌌 Quantum Visualizer : http://localhost:8001              │${NC}"
    echo -e "${GREEN}│ 🔧 Backend API       : http://localhost:8080              │${NC}"
    echo -e "${GREEN}└─────────────────────────────────────────────────────────────┘${NC}"
    echo ""
    echo -e "${YELLOW}💡 Commandes utiles:${NC}"
    echo "• Tester backend: curl http://localhost:8080/api/temporal/health"
    echo "• Voir logs: tail -f logs/frontend-*-ui.log"
    echo "• Arrêter: pkill -f 'python3.*http.server' && pkill -f 'node server.js'"
}

# Script principal
main() {
    # Vérifier le backend
    if ! curl -s "http://localhost:8080/api/temporal/health" > /dev/null 2>&1; then
        echo -e "${RED}❌ Backend non accessible sur le port 8080${NC}"
        echo -e "${YELLOW}💡 Démarrez d'abord le backend avec: ./gestion-scripts.sh${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Backend accessible!${NC}"
    
    # Nettoyer les ports
    cleanup_ports
    
    # Démarrer les frontends
    start_frontends
    
    # Vérifier les frontends
    check_frontends
    
    # Tester les scénarios UI
    test_ui_scenarios
    
    # Afficher les URLs
    show_urls
    
    echo -e "${GREEN}🎉 Tous les frontends sont démarrés!${NC}"
    echo -e "${YELLOW}🎮 Vous pouvez maintenant tester les scénarios UI!${NC}"
}

# Exécuter le script
main "$@" 