#!/bin/bash

# ========================================
# DASHBOARD TESTS HEROES OF TIME
# Vue d'ensemble des tests et benchmarks
# ========================================

echo "🎯 === DASHBOARD TESTS HEROES OF TIME ==="

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'  
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Vérifier le backend
check_backend() {
    if curl -s "http://localhost:8080/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend actif${NC}"
        return 0
    else
        echo -e "${RED}❌ Backend inactif${NC}"
        return 1
    fi
}

# Vérifier les scripts disponibles
check_scripts() {
    echo -e "\n${BLUE}📋 === SCRIPTS DE TEST DISPONIBLES === ${NC}"
    
    # Scripts de test principaux
    echo -e "${CYAN}🔧 Scripts Système:${NC}"
    [ -f "⚙️ scripts/test-hybrid-artifacts-system.sh" ] && echo -e "   ✅ test-hybrid-artifacts-system.sh" || echo -e "   ❌ test-hybrid-artifacts-system.sh"
    [ -f "⚙️ scripts/benchmark-performance-comparison.sh" ] && echo -e "   ✅ benchmark-performance-comparison.sh" || echo -e "   ❌ benchmark-performance-comparison.sh"
    [ -f "⚙️ scripts/benchmark-coherent-comparison.sh" ] && echo -e "   ✅ benchmark-coherent-comparison.sh (🎯 nouveau)" || echo -e "   ❌ benchmark-coherent-comparison.sh"
    [ -f "⚙️ scripts/stress-test-moteur.sh" ] && echo -e "   ✅ stress-test-moteur.sh" || echo -e "   ❌ stress-test-moteur.sh"
    
    echo -e "\n${PURPLE}🚀 Scripts Maîtres:${NC}"
    [ -f "⚙️ scripts/run-all-performance-tests.sh" ] && echo -e "   ✅ run-all-performance-tests.sh (📊 script global)" || echo -e "   ❌ run-all-performance-tests.sh"
    
    echo -e "\n${YELLOW}🎮 Scripts Demo:${NC}"
    [ -f "⚙️ scripts/demo/demo-heroes-of-time-script.sh" ] && echo -e "   ✅ demo-heroes-of-time-script.sh" || echo -e "   ❌ demo-heroes-of-time-script.sh"
    [ -f "⚙️ scripts/demo/demo-quantum-final.sh" ] && echo -e "   ✅ demo-quantum-final.sh" || echo -e "   ❌ demo-quantum-final.sh"
}

# Vérifier les résultats récents
check_recent_results() {
    echo -e "\n${BLUE}📊 === RÉSULTATS RÉCENTS === ${NC}"
    
    # Chercher les dossiers de résultats récents
    if ls performance_results_* 2>/dev/null | head -5; then
        echo -e "\n${GREEN}📁 Dossiers de résultats trouvés${NC}"
        
        # Le plus récent
        LATEST_DIR=$(ls -t performance_results_* 2>/dev/null | head -1)
        if [ -n "$LATEST_DIR" ]; then
            echo -e "\n${CYAN}📋 Dernier test: $LATEST_DIR${NC}"
            
            if [ -d "$LATEST_DIR" ]; then
                echo "   📄 Fichiers de résultats:"
                ls "$LATEST_DIR"/*.log 2>/dev/null | sed 's/^/     /'
                ls "$LATEST_DIR"/*.json 2>/dev/null | sed 's/^/     /'
            fi
        fi
    else
        echo -e "${YELLOW}⚠️ Aucun résultat récent trouvé${NC}"
        echo "   Lancez d'abord: ./⚙️ scripts/run-all-performance-tests.sh"
    fi
    
    # Vérifier les fichiers JSON de benchmark individuels
    if ls *_benchmark_*.json 2>/dev/null | head -3; then
        echo -e "\n${PURPLE}📊 Fichiers JSON de benchmark individuels${NC}"
    fi
}

# Menu interactif
show_menu() {
    echo -e "\n${BLUE}🎯 === MENU ACTIONS === ${NC}"
    echo "1. 🚀 Lancer la suite complète de tests performance"
    echo "2. 🎯 Lancer uniquement le benchmark cohérent JSON vs HOTS"
    echo "3. 🔧 Lancer test système hybride" 
    echo "4. 💥 Lancer stress test"
    echo "5. 🎮 Lancer demo quantum"
    echo "6. 📊 Voir résultats du dernier test"
    echo "7. 🧹 Nettoyer anciens résultats"
    echo "8. ❌ Quitter"
    
    echo -e "\n${YELLOW}Choisissez une option (1-8):${NC}"
    read -r choice
    
    case $choice in
        1)  
            echo -e "\n${GREEN}🚀 Lancement suite complète...${NC}"
            ./⚙️ scripts/run-all-performance-tests.sh
            ;;
        2)  
            echo -e "\n${PURPLE}🎯 Lancement benchmark cohérent...${NC}"
            if check_backend; then
                ./⚙️ scripts/benchmark-coherent-comparison.sh
            else
                echo -e "${RED}❌ Backend requis pour ce test${NC}"
            fi
            ;;
        3)  
            echo -e "\n${CYAN}🔧 Lancement test hybride...${NC}"
            if check_backend; then
                ./⚙️ scripts/test-hybrid-artifacts-system.sh
            else
                echo -e "${RED}❌ Backend requis pour ce test${NC}"
            fi
            ;;
        4)  
            echo -e "\n${RED}💥 Lancement stress test...${NC}"
            if check_backend; then
                ./⚙️ scripts/stress-test-moteur.sh
            else
                echo -e "${RED}❌ Backend requis pour ce test${NC}"
            fi
            ;;
        5)  
            echo -e "\n${YELLOW}🎮 Lancement demo quantum...${NC}"
            if check_backend; then
                ./⚙️ scripts/demo/demo-quantum-final.sh
            else
                echo -e "${RED}❌ Backend requis pour cette démo${NC}"
            fi
            ;;
        6)
            echo -e "\n${CYAN}📊 Résultats du dernier test:${NC}"
            LATEST_DIR=$(ls -t performance_results_* 2>/dev/null | head -1)
            if [ -n "$LATEST_DIR" ] && [ -d "$LATEST_DIR" ]; then
                echo -e "📁 $LATEST_DIR"
                if [ -f "$LATEST_DIR/consolidated_report.md" ]; then
                    echo -e "\n📋 Extrait du rapport consolidé:"
                    tail -20 "$LATEST_DIR/consolidated_report.md"
                else
                    echo -e "\n📄 Fichiers disponibles:"
                    ls -la "$LATEST_DIR"
                fi
            else
                echo -e "${YELLOW}⚠️ Aucun résultat trouvé${NC}"
            fi
            ;;
        7)
            echo -e "\n${YELLOW}🧹 Nettoyage des anciens résultats...${NC}"
            echo "Supprimer les dossiers performance_results_* de plus de 7 jours ? (y/N)"
            read -r confirm
            if [[ $confirm =~ ^[Yy]$ ]]; then
                find . -name "performance_results_*" -type d -mtime +7 -exec rm -rf {} +
                find . -name "*_benchmark_*.json" -mtime +7 -delete
                echo -e "${GREEN}✅ Nettoyage effectué${NC}"
            else
                echo "Annulé"
            fi
            ;;
        8)
            echo -e "${GREEN}👋 Au revoir !${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Option invalide${NC}"
            ;;
    esac
    
    echo -e "\n${BLUE}Appuyez sur Entrée pour revenir au menu...${NC}"
    read -r
    show_menu
}

# Fonction principale
main() {
    clear
    
    echo -e "${GREEN}🎯 DASHBOARD TESTS HEROES OF TIME${NC}"
    echo -e "${BLUE}====================================${NC}"
    echo ""
    
    # Status du système
    echo -e "${CYAN}🔍 === STATUS SYSTÈME === ${NC}"
    check_backend
    
    # Scripts disponibles
    check_scripts
    
    # Résultats récents
    check_recent_results
    
    # Menu
    show_menu
}

# Lancer le dashboard
main "$@" 