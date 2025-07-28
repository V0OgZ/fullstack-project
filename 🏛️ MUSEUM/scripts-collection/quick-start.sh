#!/bin/bash

# =============================================================================
# 🚀 HEROES OF TIME - DÉMARRAGE RAPIDE
# =============================================================================

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}"
echo "██╗  ██╗███████╗██████╗  ██████╗ ███████╗███████╗    ██████╗ ███████╗    ████████╗██╗███╗   ███╗███████╗"
echo "██║  ██║██╔════╝██╔══██╗██╔═══██╗██╔════╝██╔════╝   ██╔═══██╗██╔════╝    ╚══██╔══╝██║████╗ ████║██╔════╝"
echo "███████║█████╗  ██████╔╝██║   ██║█████╗  ███████╗   ██║   ██║█████╗         ██║   ██║██╔████╔██║█████╗  "
echo "██╔══██║██╔══╝  ██╔══██╗██║   ██║██╔══╝  ╚════██║   ██║   ██║██╔══╝         ██║   ██║██║╚██╔╝██║██╔══╝  "
echo "██║  ██║███████╗██║  ██║╚██████╔╝███████╗███████║   ╚██████╔╝██║            ██║   ██║██║ ╚═╝ ██║███████╗"
echo "╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝    ╚═════╝ ╚═╝            ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝"
echo -e "${NC}"
echo -e "${CYAN}🌟 Système Temporel Quantique Unifié - 10 ans de développement${NC}"
echo -e "${CYAN}================================================================${NC}"

echo -e "\n${YELLOW}🚀 Que voulez-vous faire ?${NC}\n"

echo -e "${GREEN}1)${NC} ${BLUE}🔥 TOUT LANCER - Script Complet Final${NC}"
echo -e "   → Backend + 3 UIs + Tests + API + Rapports (661 lignes)"
echo -e "   → Script: ./test-complet-final.sh"
echo ""
echo -e "${GREEN}2)${NC} ${BLUE}Backend seulement${NC}"
echo -e "   → cd backend && mvn spring-boot:run"
echo ""
echo -e "${GREEN}3)${NC} ${BLUE}UIs seulement${NC}"
echo -e "   → 3 Frontends (8000, 5173, 8001)"
echo ""
echo -e "${GREEN}4)${NC} ${BLUE}Arrêter tout${NC}"
echo -e "   → ./stop-all-services.sh"
echo ""
echo -e "${GREEN}5)${NC} ${BLUE}Status des services${NC}"
echo -e "   → Voir qui tourne sur quels ports"
echo ""

echo -e "\n${CYAN}Votre choix [1-5] :${NC} "
read choice

case $choice in
    1)
        echo -e "${YELLOW}🔥 Lancement COMPLET du système Heroes of Time...${NC}"
        echo -e "${CYAN}Ce script lance TOUT TOUT TOUT :${NC}"
        echo -e "• Backend Spring Boot compilation + démarrage"
        echo -e "• 3 UIs : Frontend (8000) + Temporal (5173) + Quantum (8001)"
        echo -e "• Tous les tests : unitaires + intégration + API"
        echo -e "• Scénarios HOTS complets"
        echo -e "• Rapport final détaillé"
        echo ""
        echo -e "${GREEN}🚀 Démarrage dans 3 secondes...${NC}"
        sleep 3
        ./test-complet-final.sh
        ;;
    2)
        echo -e "${YELLOW}📡 Démarrage du backend...${NC}"
        cd backend
        mvn spring-boot:run
        ;;
    3)
        echo -e "${YELLOW}🎮 Démarrage des 3 UIs...${NC}"
        
        # Frontend Principal
        echo -e "${BLUE}Frontend Principal (port 8000)...${NC}"
        cd frontend && python3 -m http.server 8000 > ../logs/frontend-manual.log 2>&1 &
        
        # Frontend Temporal  
        echo -e "${BLUE}Frontend Temporal (port 5173)...${NC}"
        cd ../frontend-temporal && python3 -m http.server 5173 > ../logs/frontend-temporal-manual.log 2>&1 &
        
        # Quantum Visualizer
        echo -e "${BLUE}Quantum Visualizer (port 8001)...${NC}"
        cd ../quantum-visualizer && python3 -m http.server 8001 > ../logs/quantum-manual.log 2>&1 &
        
        cd ..
        sleep 2
        echo -e "\n${GREEN}✅ 3 UIs démarrées :${NC}"
        echo -e "🌐 Frontend Principal:  http://localhost:8000"
        echo -e "⏰ Frontend Temporal:   http://localhost:5173"
        echo -e "🔮 Quantum Visualizer:  http://localhost:8001"
        ;;
    4)
        echo -e "${YELLOW}🛑 Arrêt de tous les services...${NC}"
        if [ -f "./stop-all-services.sh" ]; then
            ./stop-all-services.sh
        else
            echo -e "${RED}Script stop-all-services.sh introuvable${NC}"
            echo -e "${BLUE}Arrêt manuel :${NC}"
            pkill -f "spring-boot:run" || true
            pkill -f "python3 -m http.server" || true  
            pkill -f "java -jar" || true
            lsof -ti:8080,8000,5173,8001 | xargs kill -9 2>/dev/null || true
            echo -e "${GREEN}✅ Services arrêtés${NC}"
        fi
        ;;
    5)
        echo -e "${YELLOW}📊 Status des services...${NC}"
        echo -e "\n${CYAN}Ports occupés :${NC}"
        lsof -i:8080,8000,5173,8001 2>/dev/null | grep LISTEN || echo "Aucun service actif"
        
        echo -e "\n${CYAN}Processus Heroes of Time :${NC}"
        ps aux | grep -E "(spring-boot|python3.*http.server|java.*jar)" | grep -v grep || echo "Aucun processus"
        
        echo -e "\n${CYAN}Logs récents :${NC}"
        if [ -d "logs" ]; then
            ls -la logs/*.log 2>/dev/null | tail -5 || echo "Aucun log"
        else
            echo "Dossier logs/ inexistant"
        fi
        ;;
    *)
        echo -e "${RED}❌ Choix invalide${NC}"
        echo -e "${YELLOW}💡 Relancez : ./quick-start.sh${NC}"
        exit 1
        ;;
esac

echo -e "\n${CYAN}🎉 Merci d'utiliser Heroes of Time !${NC}" 