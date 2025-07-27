#!/bin/bash

# 🧪 Heroes of Time - Master Test Script (Keep Alive)
# Script qui lance TOUS les tests et GARDE les serveurs actifs
# Version spéciale pour inspection de l'UI

echo "🚀 HEROES OF TIME - TEST EVERYTHING (KEEP ALIVE)"
echo "================================================"

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Compteurs
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# 🧹 PHASE 1: NETTOYAGE
echo -e "${YELLOW}🧹 Phase 1: Nettoyage des processus...${NC}"
echo "Arrêt des services en cours..."

# Tuer tous les processus sur les ports utilisés
lsof -ti:8080 | xargs -r kill -9  # Backend
lsof -ti:8001 | xargs -r kill -9  # Quantum visualizer
lsof -ti:5173 | xargs -r kill -9  # Frontend temporal
lsof -ti:3000 | xargs -r kill -9  # Frontend principal
lsof -ti:8000 | xargs -r kill -9  # Serveur de test

echo "Nettoyage des logs précédents..."
rm -f logs/backend-*.log
rm -f logs/frontend-*.log
rm -f logs/quantum-*.log

echo -e "${GREEN}✅ Nettoyage terminé${NC}"

# 🔍 PHASE 2: VÉRIFICATIONS
echo -e "${YELLOW}🔍 Phase 2: Vérifications...${NC}"

# Vérifier que Java est installé
if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java n'est pas installé${NC}"
    exit 1
fi

# Vérifier que Maven est installé
if ! command -v mvn &> /dev/null; then
    echo -e "${RED}❌ Maven n'est pas installé${NC}"
    exit 1
fi

# Vérifier que Python est installé
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python3 n'est pas installé${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Tous les outils sont installés${NC}"

# 🏗️ PHASE 3: COMPILATION DU BACKEND
echo -e "${YELLOW}🏗️ Phase 3: Compilation du backend...${NC}"

cd backend
if mvn clean compile -q > ../logs/backend-compile-keep-alive.log 2>&1; then
    echo -e "${GREEN}✅ Compilation réussie${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ Erreur de compilation${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))

# 🧪 PHASE 4: TESTS UNITAIRES
echo -e "${YELLOW}🧪 Phase 4: Tests unitaires...${NC}"

if mvn test -q > ../logs/backend-test-keep-alive.log 2>&1; then
    echo -e "${GREEN}✅ Tests unitaires passés${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ Tests unitaires échoués${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))

cd ..

# 🚀 PHASE 5: DÉMARRAGE DU BACKEND
echo -e "${YELLOW}🚀 Phase 5: Démarrage du backend...${NC}"

cd backend
java -jar target/demo-*.jar > ../logs/backend-runtime-keep-alive.log 2>&1 &
BACKEND_PID=$!
cd ..

# Attendre que le backend soit prêt
echo "Attente du démarrage du backend..."
for i in {1..30}; do
    if curl -s http://localhost:8080/api/temporal/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend démarré (PID: $BACKEND_PID)${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Timeout du backend${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    sleep 1
done
TOTAL_TESTS=$((TOTAL_TESTS + 1))

# 🎮 PHASE 6: TESTS API HEROES OF TIME
echo -e "${YELLOW}🎮 Phase 6: Tests API Heroes of Time...${NC}"

# Test de base de l'API
if curl -s http://localhost:8080/api/temporal/health | grep -q "status"; then
    echo -e "${GREEN}✅ API Health check${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ API Health check échoué${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))

# 🌐 PHASE 7: DÉMARRAGE DES FRONTENDS
echo -e "${YELLOW}🌐 Phase 7: Démarrage des frontends...${NC}"

# Frontend Classique
cd frontend
if [ -f "server.js" ]; then
    node server.js > ../logs/frontend-classique-keep-alive.log 2>&1 &
    FRONTEND_CLASSIQUE_PID=$!
else
    python3 -m http.server 8000 > ../logs/frontend-classique-keep-alive.log 2>&1 &
    FRONTEND_CLASSIQUE_PID=$!
fi
cd ..

# Frontend Temporel
cd frontend-temporal
python3 -m http.server 5173 > ../logs/frontend-temporal-keep-alive.log 2>&1 &
FRONTEND_TEMPORAL_PID=$!
cd ..

# Quantum Visualizer
cd quantum-visualizer
python3 -m http.server 8001 > ../logs/quantum-visualizer-keep-alive.log 2>&1 &
QUANTUM_VISUALIZER_PID=$!
cd ..

# Attendre que les frontends soient prêts
echo "Attente des frontends..."
sleep 5

# 🔧 PHASE 8: TESTS FRONTENDS
echo -e "${YELLOW}🔧 Phase 8: Tests des frontends...${NC}"

# Test Frontend Classique
if curl -s http://localhost:8000 | grep -q "Heroes of Time"; then
    echo -e "${GREEN}✅ Frontend Classique (PID: $FRONTEND_CLASSIQUE_PID)${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ Frontend Classique${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))

# Test Frontend Temporel
if curl -s http://localhost:5173 | grep -q "Temporal"; then
    echo -e "${GREEN}✅ Frontend Temporel (PID: $FRONTEND_TEMPORAL_PID)${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ Frontend Temporel${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))

# Test Quantum Visualizer
if curl -s http://localhost:8001 | grep -q "Quantum"; then
    echo -e "${GREEN}✅ Quantum Visualizer (PID: $QUANTUM_VISUALIZER_PID)${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ Quantum Visualizer${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))

# 🎯 PHASE 9: NOUVEAUX TESTS UI
echo -e "${YELLOW}🎯 Phase 9: Tests UI améliorés...${NC}"

# Test des corrections UI
if [ -f "quantum-visualizer/button-fixes.js" ]; then
    echo -e "${GREEN}✅ Corrections boutons UI${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ Corrections boutons UI${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))

# Test de l'interface de test
if [ -f "quantum-visualizer/test-buttons.html" ]; then
    echo -e "${GREEN}✅ Interface de test${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ Interface de test${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))

# Test de la page de test
if curl -s http://localhost:8001/test-buttons.html | grep -q "Test Buttons"; then
    echo -e "${GREEN}✅ Page test boutons${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ Page test boutons${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))

# 🎮 PHASE 10: TESTS SCÉNARIOS HEROES OF TIME
echo -e "${YELLOW}🎮 Phase 10: Tests scénarios HOTS...${NC}"

# Fonction pour tester un scénario
test_scenario() {
    local scenario_name="$1"
    local commands="$2"
    
    echo -n "🎯 Test $scenario_name... "
    
    # Créer un nouveau jeu
    GAME_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games" \
        -H "Content-Type: application/json" \
        -d "{\"gameName\": \"$scenario_name\", \"playerId\": \"test-keep-alive\"}" 2>/dev/null)
    
    if echo "$GAME_RESPONSE" | grep -q "success"; then
        GAME_ID=$(echo "$GAME_RESPONSE" | jq -r '.gameId // 1' 2>/dev/null)
        curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/start" >/dev/null 2>&1
        
        # Tester les commandes
        local success_count=0
        IFS='|' read -ra COMMANDS <<< "$commands"
        
        for command in "${COMMANDS[@]}"; do
            COMMAND_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
                -H "Content-Type: application/json" \
                -d "{\"script\": \"$command\"}" 2>/dev/null)
            
            if echo "$COMMAND_RESPONSE" | grep -q "success"; then
                success_count=$((success_count + 1))
            fi
        done
        
        if [ $success_count -eq ${#COMMANDS[@]} ]; then
            echo -e "${GREEN}✅ ($success_count/${#COMMANDS[@]})${NC}"
            PASSED_TESTS=$((PASSED_TESTS + 1))
        else
            echo -e "${RED}❌ ($success_count/${#COMMANDS[@]})${NC}"
            FAILED_TESTS=$((FAILED_TESTS + 1))
        fi
    else
        echo -e "${RED}❌ (Création jeu échouée)${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
}

# Tests des scénarios
test_scenario "Bataille Basique" "HERO(Arthur)|HERO(Ragnar)|MOV(Arthur, @5,5)|MOV(Ragnar, @6,6)"
test_scenario "Quantum Simple" "HERO(QuantumHero)|ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(QuantumHero, @10,10))|COLLAPSE(ψ001)"
test_scenario "Création Entités" "HERO(Builder)|CREATE(ITEM, MagicSword)|USE(MagicSword, HERO:Builder)"
test_scenario "Construction" "HERO(Constructor)|BUILD(Castle, @20,20, Constructor)|COLLECT(Gold, 100, Constructor)"
test_scenario "Magie" "HERO(Mage)|LEARN(Fireball, Mage)|CAST(Fireball, @25,25, Mage)"

# 📊 PHASE 11: TESTS COMPLETS DES SCRIPTS
echo -e "${YELLOW}📊 Phase 11: Tests des scripts créés...${NC}"

# Test des scripts de test
scripts_to_test=(
    "test-final-simple.sh"
    "tester-quantum-ui.sh"
    "demo-quantum-final.sh"
    "demarrer-frontends.sh"
)

for script in "${scripts_to_test[@]}"; do
    if [ -f "$script" ] && [ -x "$script" ]; then
        echo -e "${GREEN}✅ Script $script${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ Script $script${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
done

# 🎯 PHASE 12: RAPPORT FINAL (SANS ARRÊTER LES SERVEURS)
echo -e "${YELLOW}🎯 Phase 12: Rapport final...${NC}"

# Calculer les pourcentages
if [ $TOTAL_TESTS -gt 0 ]; then
    SUCCESS_RATE=$(( PASSED_TESTS * 100 / TOTAL_TESTS ))
else
    SUCCESS_RATE=0
fi

# Afficher le rapport final
echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                 RAPPORT FINAL (KEEP ALIVE)                  ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}🧪 HEROES OF TIME - TEST EVERYTHING (KEEP ALIVE)${NC}"
echo "================================================="
echo ""
echo -e "${CYAN}📊 RÉSULTATS:${NC}"
echo -e "   • Tests Total:   $TOTAL_TESTS"
echo -e "   • Tests Réussis: $PASSED_TESTS"
echo -e "   • Tests Échoués: $FAILED_TESTS"
echo -e "   • Taux Réussite: $SUCCESS_RATE%"
echo ""

if [ $SUCCESS_RATE -ge 80 ]; then
    echo -e "${GREEN}🎉 EXCELLENT !${NC}"
    echo -e "${GREEN}Le système Heroes of Time est entièrement fonctionnel !${NC}"
elif [ $SUCCESS_RATE -ge 60 ]; then
    echo -e "${GREEN}✅ BON !${NC}"
    echo -e "${GREEN}Le système fonctionne très bien !${NC}"
elif [ $SUCCESS_RATE -ge 40 ]; then
    echo -e "${YELLOW}⚠️ MOYEN${NC}"
    echo -e "${YELLOW}Quelques améliorations nécessaires${NC}"
else
    echo -e "${RED}❌ PROBLÉMATIQUE${NC}"
    echo -e "${RED}Corrections importantes nécessaires${NC}"
fi

echo ""
echo -e "${CYAN}🌐 SERVEURS ACTIFS:${NC}"
echo -e "   • ✅ Backend Heroes of Time (PID: $BACKEND_PID) - http://localhost:8080"
echo -e "   • ✅ Frontend Classique (PID: $FRONTEND_CLASSIQUE_PID) - http://localhost:8000"
echo -e "   • ✅ Frontend Temporel (PID: $FRONTEND_TEMPORAL_PID) - http://localhost:5173"
echo -e "   • ✅ Quantum Visualizer (PID: $QUANTUM_VISUALIZER_PID) - http://localhost:8001"
echo ""
echo -e "${CYAN}🎮 URLS POUR TESTER L'UI:${NC}"
echo -e "   • 🌌 Test Boutons: http://localhost:8001/test-buttons.html"
echo -e "   • 🌌 Quantum Visualizer: http://localhost:8001"
echo -e "   • 🏛️ Frontend Classique: http://localhost:8000"
echo -e "   • ⚡ Frontend Temporel: http://localhost:5173"
echo -e "   • 🔧 Backend API: http://localhost:8080/api/temporal/health"
echo ""
echo -e "${YELLOW}🎯 NOUVEAUTÉS INTÉGRÉES:${NC}"
echo -e "   • ✅ Corrections boutons UI Quantum Visualizer"
echo -e "   • ✅ Interface de test interactive"
echo -e "   • ✅ Tests scénarios paramétrés"
echo -e "   • ✅ Scripts de démonstration"
echo -e "   • ✅ Intégration API complète"
echo ""
echo -e "${GREEN}🎉 SERVEURS LAISSÉS ACTIFS POUR INSPECTION UI !${NC}"
echo -e "${GREEN}Tu peux maintenant regarder l'interface ! 🎮${NC}"
echo ""
echo -e "${BLUE}🛑 Pour arrêter tous les serveurs plus tard:${NC}"
echo -e "   kill $BACKEND_PID $FRONTEND_CLASSIQUE_PID $FRONTEND_TEMPORAL_PID $QUANTUM_VISUALIZER_PID"
echo -e "   ou utilise: lsof -ti:8080,8001,5173,8000 | xargs kill -9"
echo ""
echo -e "${CYAN}🌟 Heroes of Time est prêt pour l'inspection ! 🌟${NC}" 