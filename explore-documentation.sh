#!/bin/bash

# Script d'exploration de la documentation Heroes of Time
# Navigation facile dans la structure organisée

echo "📚 EXPLORATEUR DOCUMENTATION HEROES OF TIME"
echo "============================================"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Fonction pour afficher un menu
show_menu() {
    echo -e "${BLUE}🎯 Que voulez-vous explorer ?${NC}"
    echo ""
    echo "1. 📋 Index complet de la documentation"
    echo "2. 🌀 Système unifié (6 fichiers)"
    echo "3. 🌀 Collapse causale (explication complète)"
    echo "4. 🕰️ Système temporel (8 fichiers)"
    echo "5. 🛠️ Scripts système unifié (5 scripts)"
    echo "6. 📊 Statistiques documentation"
    echo "7. 🔍 Recherche dans la documentation"
    echo "8. 🎮 Guide rapide joueur"
    echo "9. 🛠️ Guide rapide développeur"
    echo "0. 🚪 Sortir"
    echo ""
    echo -e "${YELLOW}Votre choix (0-9) : ${NC}"
}

# Fonction pour afficher l'index
show_index() {
    echo -e "${GREEN}📋 INDEX COMPLET DE LA DOCUMENTATION${NC}"
    echo "======================================"
    if [ -f "docs/INDEX_DOCUMENTATION_COMPLETE.md" ]; then
        head -50 docs/INDEX_DOCUMENTATION_COMPLETE.md
        echo ""
        echo -e "${YELLOW}Voir le fichier complet : docs/INDEX_DOCUMENTATION_COMPLETE.md${NC}"
    else
        echo "Index non trouvé !"
    fi
}

# Fonction pour afficher le système unifié
show_system_unifie() {
    echo -e "${GREEN}🌀 SYSTÈME UNIFIÉ${NC}"
    echo "=================="
    echo "📁 docs/system-unifie/"
    if [ -d "docs/system-unifie" ]; then
        ls -la docs/system-unifie/
        echo ""
        echo -e "${YELLOW}Fichiers disponibles :${NC}"
        echo "• SYSTEME_UNIFIE_COMPLETE.md - Récapitulatif complet"
        echo "• WORKFLOW_SYSTEME_UNIFIE.md - Workflow détaillé"
        echo "• NOMENCLATURE_IMPROVEMENTS.md - Améliorations nomenclature"
        echo "• RAPPORT_NOMENCLATURE_CLAIRE.md - Rapport performance"
        echo "• PLAN_INTEGRATION_CORRECTION.md - Plan d'intégration"
        echo "• RECOMMANDATIONS_VISUALISATION_GRAPHE.md - Visualisations"
    else
        echo "Dossier système unifié non trouvé !"
    fi
}

# Fonction pour afficher le collapse causale
show_collapse_causale() {
    echo -e "${GREEN}🌀 COLLAPSE CAUSALE${NC}"
    echo "==================="
    echo "📁 docs/collapse-causale/"
    if [ -d "docs/collapse-causale" ]; then
        ls -la docs/collapse-causale/
        echo ""
        echo -e "${YELLOW}Contenu principal :${NC}"
        echo "• COLLAPSE_CAUSALE_EXPLICATION.md - Explication complète"
        echo "  - 3 types : INTERACTION, OBSERVATION, ANCHORING"
        echo "  - Algorithmes et workflow"
        echo "  - Exemples pratiques"
        echo "  - Intégration système unifié"
    else
        echo "Dossier collapse causale non trouvé !"
    fi
}

# Fonction pour afficher le système temporel
show_temporal() {
    echo -e "${GREEN}🕰️ SYSTÈME TEMPOREL${NC}"
    echo "==================="
    echo "📁 docs/temporal/"
    if [ -d "docs/temporal" ]; then
        ls -la docs/temporal/
        echo ""
        echo -e "${YELLOW}$(ls docs/temporal/ | wc -l) fichiers temporels disponibles${NC}"
    else
        echo "Dossier temporal non trouvé !"
    fi
}

# Fonction pour afficher les scripts
show_scripts() {
    echo -e "${GREEN}🛠️ SCRIPTS SYSTÈME UNIFIÉ${NC}"
    echo "=========================="
    echo "📁 scripts/system-unifie/"
    if [ -d "scripts/system-unifie" ]; then
        ls -la scripts/system-unifie/
        echo ""
        echo -e "${YELLOW}Scripts disponibles :${NC}"
        echo "• migrate-to-unified-system.sh - Migration automatique"
        echo "• validate-system-coherence.sh - Validation cohérence"
        echo "• benchmark-unified-system.sh - Tests performance"
        echo "• test-nomenclature-improvements.sh - Tests nomenclature"
        echo "• demo-collapse-causale.sh - Démo collapse causale"
    else
        echo "Dossier scripts non trouvé !"
    fi
}

# Fonction pour afficher les statistiques
show_stats() {
    echo -e "${GREEN}📊 STATISTIQUES DOCUMENTATION${NC}"
    echo "=============================="
    
    # Compter les fichiers
    docs_count=$(find docs/ -name "*.md" 2>/dev/null | wc -l)
    scripts_count=$(find scripts/ -name "*.sh" 2>/dev/null | wc -l)
    
    echo "📁 Dossiers principaux :"
    echo "   • docs/system-unifie/ ($(ls docs/system-unifie/ 2>/dev/null | wc -l) fichiers)"
    echo "   • docs/collapse-causale/ ($(ls docs/collapse-causale/ 2>/dev/null | wc -l) fichiers)"
    echo "   • docs/temporal/ ($(ls docs/temporal/ 2>/dev/null | wc -l) fichiers)"
    echo "   • scripts/system-unifie/ ($(ls scripts/system-unifie/ 2>/dev/null | wc -l) scripts)"
    echo ""
    echo "📊 Totaux :"
    echo "   • Documentation : $docs_count fichiers .md"
    echo "   • Scripts : $scripts_count scripts .sh"
    echo ""
    echo "🎯 Couverture : 100% organisé !"
}

# Fonction de recherche
search_docs() {
    echo -e "${GREEN}🔍 RECHERCHE DANS LA DOCUMENTATION${NC}"
    echo "=================================="
    echo -e "${YELLOW}Terme à rechercher : ${NC}"
    read search_term
    
    if [ -n "$search_term" ]; then
        echo ""
        echo -e "${BLUE}Résultats pour '$search_term' :${NC}"
        echo "=============================="
        
        # Recherche dans docs/
        echo -e "${YELLOW}📄 Dans la documentation :${NC}"
        grep -r -i "$search_term" docs/ --include="*.md" | head -10
        
        echo ""
        echo -e "${YELLOW}🛠️ Dans les scripts :${NC}"
        grep -r -i "$search_term" scripts/ --include="*.sh" | head -5
        
        echo ""
        echo -e "${YELLOW}📋 Dans les fichiers racine :${NC}"
        grep -r -i "$search_term" . --include="*.md" --max-depth=1 | head -5
    fi
}

# Fonction guide joueur
show_player_guide() {
    echo -e "${GREEN}🎮 GUIDE RAPIDE JOUEUR${NC}"
    echo "======================"
    echo ""
    echo "🎯 Démarrage rapide :"
    echo "1. ./start-app.sh - Démarrer l'application"
    echo "2. docs/GAMEPLAY.md - Apprendre à jouer"
    echo "3. scripts/system-unifie/demo-collapse-causale.sh - Démo interactive"
    echo ""
    echo "📚 Documentation recommandée :"
    echo "• docs/README.md - Introduction"
    echo "• docs/GAMEPLAY.md - Guide de jeu"
    echo "• docs/collapse-causale/COLLAPSE_CAUSALE_EXPLICATION.md - Collapse causale"
    echo "• docs/TEMPORAL_CODEX.md - Maîtriser le temps"
}

# Fonction guide développeur
show_dev_guide() {
    echo -e "${GREEN}🛠️ GUIDE RAPIDE DÉVELOPPEUR${NC}"
    echo "==========================="
    echo ""
    echo "🎯 Démarrage développement :"
    echo "1. docs/INSTALLATION.md - Installation"
    echo "2. docs/system-unifie/SYSTEME_UNIFIE_COMPLETE.md - Architecture"
    echo "3. scripts/system-unifie/migrate-to-unified-system.sh - Migration"
    echo "4. scripts/system-unifie/validate-system-coherence.sh - Validation"
    echo ""
    echo "📚 Documentation technique :"
    echo "• docs/API.md - Documentation API"
    echo "• docs/TECHNICAL.md - Technique générale"
    echo "• docs/system-unifie/WORKFLOW_SYSTEME_UNIFIE.md - Workflow"
    echo "• docs/system-unifie/NOMENCLATURE_IMPROVEMENTS.md - Nomenclature"
}

# Boucle principale
while true; do
    echo ""
    show_menu
    read choice
    
    case $choice in
        1)
            echo ""
            show_index
            ;;
        2)
            echo ""
            show_system_unifie
            ;;
        3)
            echo ""
            show_collapse_causale
            ;;
        4)
            echo ""
            show_temporal
            ;;
        5)
            echo ""
            show_scripts
            ;;
        6)
            echo ""
            show_stats
            ;;
        7)
            echo ""
            search_docs
            ;;
        8)
            echo ""
            show_player_guide
            ;;
        9)
            echo ""
            show_dev_guide
            ;;
        0)
            echo ""
            echo -e "${GREEN}🎉 Merci d'avoir exploré la documentation Heroes of Time !${NC}"
            echo ""
            echo "📚 Documentation parfaitement organisée :"
            echo "   • docs/system-unifie/ - Système unifié"
            echo "   • docs/collapse-causale/ - Collapse causale"
            echo "   • docs/temporal/ - Système temporel"
            echo "   • scripts/system-unifie/ - Scripts"
            echo ""
            echo -e "${YELLOW}🕰️ Heroes of Time - Maîtrisez la documentation !${NC}"
            exit 0
            ;;
        *)
            echo ""
            echo -e "${RED}❌ Choix invalide. Veuillez choisir entre 0 et 9.${NC}"
            ;;
    esac
    
    echo ""
    echo -e "${PURPLE}Appuyez sur Entrée pour continuer...${NC}"
    read
done 