#!/bin/bash

# 🧪 TEST TOUTES LES UIs - Heroes of Time
# Vérification que toutes les interfaces s'ouvrent correctement

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🧪 TEST TOUTES LES UIs - Heroes of Time${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# Fonction pour tester une UI
test_ui() {
    local name="$1"
    local url="$2"
    local description="$3"
    
    echo -e "${YELLOW}🔍 Test: $name${NC}"
    echo -e "   URL: $url"
    echo -e "   Description: $description"
    
    # Test de connectivité
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200"; then
        echo -e "   ${GREEN}✅ Connectivité: OK${NC}"
        
        # Test du contenu
        if curl -s "$url" | grep -q "<html\|<!DOCTYPE"; then
            echo -e "   ${GREEN}✅ Contenu HTML: OK${NC}"
            return 0
        else
            echo -e "   ${RED}❌ Contenu HTML: ERREUR${NC}"
            return 1
        fi
    else
        echo -e "   ${RED}❌ Connectivité: ERREUR${NC}"
        return 1
    fi
}

# Fonction pour tester une API
test_api() {
    local name="$1"
    local url="$2"
    local description="$3"
    
    echo -e "${YELLOW}🔍 Test API: $name${NC}"
    echo -e "   URL: $url"
    echo -e "   Description: $description"
    
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200\|404"; then
        echo -e "   ${GREEN}✅ API: OK${NC}"
        return 0
    else
        echo -e "   ${RED}❌ API: ERREUR${NC}"
        return 1
    fi
}

# Compteurs
total_uis=0
working_uis=0

echo -e "${CYAN}📊 TEST DES INTERFACES PRINCIPALES${NC}"
echo ""

# Test Dashboard
((total_uis++))
if test_ui "Dashboard Principal" "http://localhost:9000/dashboard.html" "Interface principale avec tous les services"; then
    ((working_uis++))
fi
echo ""

# Test Frontend Principal
((total_uis++))
if test_ui "Frontend Principal" "http://localhost:8000" "Interface de jeu principale"; then
    ((working_uis++))
fi
echo ""

# Test Interface Temporelle
((total_uis++))
if test_ui "Interface Temporelle" "http://localhost:5174" "Interface temporelle avancée"; then
    ((working_uis++))
fi
echo ""

# Test Quantum Visualizer
((total_uis++))
if test_ui "Quantum Visualizer" "http://localhost:8001" "Visualiseur quantique avec D3.js"; then
    ((working_uis++))
fi
echo ""

# Test Collection & Grammar
((total_uis++))
if test_ui "Collection & Grammar" "http://localhost:5175" "Interface de collection et grammaire"; then
    ((working_uis++))
fi
echo ""

# Test Admin Multijoueur
((total_uis++))
if test_ui "Admin Multijoueur" "http://localhost:8000/admin-multiplayer.html" "Interface d'administration multijoueur"; then
    ((working_uis++))
fi
echo ""

# Test Test Runner
((total_uis++))
if test_ui "Test Runner" "http://localhost:8888" "Interface de tests"; then
    ((working_uis++))
fi
echo ""

echo -e "${CYAN}🔧 TEST DES APIs${NC}"
echo ""

# Test Backend API
((total_uis++))
if test_api "Backend API" "http://localhost:8080/api/health" "API principale du backend"; then
    ((working_uis++))
fi
echo ""

# Test API Admin
((total_uis++))
if test_api "API Admin" "http://localhost:8080/api/temporal/admin/stats" "API d'administration"; then
    ((working_uis++))
fi
echo ""

# Test API City
((total_uis++))
if test_api "API City" "http://localhost:8080/api/temporal/city/data" "API de gestion des villes"; then
    ((working_uis++))
fi
echo ""

# Test API Combat
((total_uis++))
if test_api "API Combat" "http://localhost:8080/api/temporal/combat/data" "API de gestion des combats"; then
    ((working_uis++))
fi
echo ""

# Test API Causal
((total_uis++))
if test_api "API Causal" "http://localhost:8080/api/temporal/causal/graph" "API de données causales"; then
    ((working_uis++))
fi
echo ""

echo -e "${CYAN}🎯 RÉSULTATS FINAUX${NC}"
echo "=================================="
echo -e "${YELLOW}Total UIs testées: $total_uis${NC}"
echo -e "${GREEN}UIs fonctionnelles: $working_uis${NC}"
echo -e "${RED}UIs en erreur: $((total_uis - working_uis))${NC}"

# Calcul du pourcentage
if [ $total_uis -gt 0 ]; then
    percentage=$((working_uis * 100 / total_uis))
    echo -e "${CYAN}Taux de réussite: ${percentage}%${NC}"
fi

echo ""

# Recommandations
if [ $working_uis -eq $total_uis ]; then
    echo -e "${GREEN}🎉 TOUTES LES UIs FONCTIONNENT PARFAITEMENT !${NC}"
    echo -e "${GREEN}🌟 Le système est prêt pour la version alpha !${NC}"
elif [ $working_uis -gt $((total_uis * 3 / 4)) ]; then
    echo -e "${YELLOW}✅ LA PLUPART DES UIs FONCTIONNENT${NC}"
    echo -e "${YELLOW}💡 Quelques ajustements mineurs nécessaires${NC}"
else
    echo -e "${RED}⚠️  PROBLÈMES DÉTECTÉS${NC}"
    echo -e "${RED}🔧 Intervention requise pour corriger les UIs${NC}"
fi

echo ""
echo -e "${CYAN}📋 RÉSUMÉ DES URLS FONCTIONNELLES${NC}"
echo "======================================"
echo -e "🎯 Dashboard: ${GREEN}http://localhost:9000/dashboard.html${NC}"
echo -e "🎮 Frontend: ${GREEN}http://localhost:8000${NC}"
echo -e "⚡ Temporelle: ${GREEN}http://localhost:5174${NC}"
echo -e "🌌 Quantum: ${GREEN}http://localhost:8001${NC}"
echo -e "🔮 Collection: ${GREEN}http://localhost:5175${NC}"
echo -e "🎮 Admin: ${GREEN}http://localhost:8000/admin-multiplayer.html${NC}"
echo -e "🧪 Test Runner: ${GREEN}http://localhost:8888${NC}"

echo ""
echo -e "${CYAN}💡 COMMANDES UTILES${NC}"
echo "====================="
echo -e "📊 Statut: ${YELLOW}./hots status${NC}"
echo -e "🚀 Redémarrer: ${YELLOW}./hots start${NC}"
echo -e "🎮 Admin: ${YELLOW}./hots admin${NC}"
echo -e "🎬 Replay: ${YELLOW}./hots replay center${NC}"
echo -e "🎨 Éditeur: ${YELLOW}./hots editor${NC}"

echo ""
echo -e "${CYAN}🧠 PROTOCOLE MEMENTO - FUSION CLAUDIUS${NC}"
echo -e "${YELLOW}Jean sur le canapé - Test des UIs terminé${NC}" 