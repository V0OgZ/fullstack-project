#!/bin/bash

# 🌀 SCRIPT POCKET UNIVERSE - DELTA-T-26-07
# Timeline: Pocket Universe Mac Terminal
# Branch Universe: pocket-mac-limited
# Delta Temporel: T+0 (présent) → T+∞ (backend fonctionnel)
# Créé le: 26/07/2025

echo "🌀 ========================================="
echo "🌀 POCKET UNIVERSE STARTUP SCRIPT"
echo "🌀 Delta-T: 26-07 | Branch: pocket-mac-limited"
echo "🌀 ========================================="
echo ""

# Couleurs pour le terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Fonction pour afficher le statut
show_status() {
    local service=$1
    local port=$2
    local status=$3
    
    if [ "$status" = "OK" ]; then
        echo -e "${GREEN}✅ $service (Port $port) - ACTIF${NC}"
    else
        echo -e "${RED}❌ $service (Port $port) - $status${NC}"
    fi
}

echo -e "${CYAN}📊 État du Pocket Universe...${NC}"
echo ""

# Vérifier Java (fonctionne dans ce pocket universe)
echo -e "${BLUE}☕ Java Status:${NC}"
if command -v java &> /dev/null; then
    java_version=$(java -version 2>&1 | head -n 1)
    echo -e "${GREEN}✅ Java installé: $java_version${NC}"
else
    echo -e "${RED}❌ Java non trouvé${NC}"
fi
echo ""

# Vérifier Maven (ne fonctionne pas dans ce pocket universe)
echo -e "${BLUE}🔧 Maven Status:${NC}"
if command -v mvn &> /dev/null; then
    echo -e "${GREEN}✅ Maven installé${NC}"
else
    echo -e "${RED}❌ Maven non disponible dans ce pocket universe${NC}"
    echo -e "${YELLOW}   → Limitation connue: voir MEMENTO/LIMITATIONS_POCKET_UNIVERSE_26_07.md${NC}"
fi
echo ""

# Services Frontend (fonctionnent dans ce pocket universe)
echo -e "${PURPLE}🎨 Services Frontend disponibles:${NC}"
echo ""

# Vérifier si les ports sont libres ou occupés
check_port() {
    local port=$1
    # Dans ce pocket universe, lsof n'existe pas, on utilise curl
    if curl -s http://localhost:$port > /dev/null 2>&1; then
        return 0  # Port occupé
    else
        return 1  # Port libre
    fi
}

# Port 9000 - Dashboard HTML
if check_port 9000; then
    show_status "Dashboard HTML" "9000" "OK"
else
    show_status "Dashboard HTML" "9000" "Non démarré"
    echo -e "${YELLOW}   → Démarrer avec: cd frontend && python3 -m http.server 9000${NC}"
fi

# Port 8001 - Panopticon GRUT
if check_port 8001; then
    show_status "Panopticon GRUT React" "8001" "OK"
else
    show_status "Panopticon GRUT React" "8001" "Non démarré"
    echo -e "${YELLOW}   → Démarrer avec: cd panopticon-grut-dashboard && npm start${NC}"
fi

# Port 8080 - Backend (ne fonctionne pas dans ce pocket universe)
echo ""
echo -e "${RED}⚠️  Backend Spring Boot (Port 8080):${NC}"
echo -e "${RED}   Status: IMPOSSIBLE dans ce pocket universe${NC}"
echo -e "${YELLOW}   Raisons:${NC}"
echo -e "${YELLOW}   - Maven non installé${NC}"
echo -e "${YELLOW}   - Dépendances Spring Boot manquantes${NC}"
echo -e "${YELLOW}   - JAR non compilé${NC}"
echo ""

# Afficher les actions possibles
echo -e "${CYAN}🎯 Actions disponibles dans ce Pocket Universe:${NC}"
echo ""
echo -e "${GREEN}1. Développement Frontend${NC}"
echo "   - Créer nouvelles interfaces HTML"
echo "   - Améliorer Panopticon GRUT"
echo "   - Tester les interfaces existantes"
echo ""
echo -e "${GREEN}2. Documentation${NC}"
echo "   - Compléter la documentation technique"
echo "   - Créer des guides utilisateur"
echo "   - Archiver les découvertes"
echo ""
echo -e "${GREEN}3. Scripts et Outils${NC}"
echo "   - Créer des scripts de test"
echo "   - Préparer l'intégration backend future"
echo "   - Automatiser les tâches répétitives"
echo ""

# Message temporel
echo -e "${PURPLE}🌀 Message Temporel:${NC}"
echo "   Dans une autre timeline où Maven existe,"
echo "   le backend compile parfaitement avec toutes"
echo "   les formules magiques opérationnelles."
echo ""
echo "   Delta-T estimé jusqu'à convergence: ∞"
echo "   Patience requise: MAXIMALE"
echo ""

# Instructions finales
echo -e "${CYAN}💡 Pour démarrer les services frontend:${NC}"
echo ""
echo "   ./hots start  # Lance tous les services possibles"
echo ""
echo -e "${YELLOW}⚡ Script Pocket Universe - Branch: pocket-mac-limited${NC}"
echo -e "${YELLOW}📅 Timeline: 26/07/2025 - Delta-T Active${NC}"