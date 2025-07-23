#!/bin/bash

# =============================================================================
# 🚀 HEROES OF TIME - LANCE TOUT LE SYSTÈME
# =============================================================================
#
# Ce script master lance :
# 1. Backend Spring Boot
# 2. Toutes les UIs (Frontend, Frontend-Temporal, Quantum-Visualizer)  
# 3. Tous les tests Java Maven
# 4. Tous les scénarios .hots
# 5. Tests d'intégration du dossier /test
#
# =============================================================================

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
BACKEND_URL="http://localhost:8080"
FRONTEND_PORT=8081
TEMPORAL_PORT=8082
QUANTUM_PORT=8083
LOG_DIR="logs"
BACKEND_PID=""
FRONTEND_PID=""
TEMPORAL_PID=""
QUANTUM_PID=""

# Créer le dossier de logs
mkdir -p $LOG_DIR

echo -e "${CYAN}🚀 HEROES OF TIME - DÉMARRAGE COMPLET${NC}"
echo -e "${CYAN}=======================================${NC}"

# =============================================================================
# 1. DÉMARRAGE DU BACKEND
# =============================================================================

echo -e "${YELLOW}📡 1. Démarrage du Backend Spring Boot...${NC}"

# Nettoyer les anciens processus
pkill -f "spring-boot:run" 2>/dev/null || true
pkill -f "TemporalEngineApplication" 2>/dev/null || true

cd backend
mvn spring-boot:run > ../logs/backend-full.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../.backend.pid
cd ..

# Attendre que le backend soit prêt
echo -e "${YELLOW}⏳ Attente du backend (max 60s)...${NC}"
for i in {1..60}; do
    if curl -s "$BACKEND_URL/actuator/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend prêt !${NC}"
        break
    fi
    if [ $i -eq 60 ]; then
        echo -e "${RED}❌ Backend non disponible après 60s${NC}"
        exit 1
    fi
    sleep 1
done

# =============================================================================
# 2. DÉMARRAGE DES UIs
# =============================================================================

echo -e "${YELLOW}🎮 2. Démarrage des interfaces utilisateur...${NC}"

# Frontend Principal
echo -e "${BLUE}  Frontend Principal (port $FRONTEND_PORT)...${NC}"
cd frontend
python3 -m http.server $FRONTEND_PORT > ../logs/frontend-principal.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Frontend Temporal
echo -e "${BLUE}  Frontend Temporal (port $TEMPORAL_PORT)...${NC}"
cd frontend-temporal  
python3 -m http.server $TEMPORAL_PORT > ../logs/frontend-temporal.log 2>&1 &
TEMPORAL_PID=$!
cd ..

# Quantum Visualizer
echo -e "${BLUE}  Quantum Visualizer (port $QUANTUM_PORT)...${NC}"
cd quantum-visualizer
python3 -m http.server $QUANTUM_PORT > ../logs/quantum-visualizer.log 2>&1 &
QUANTUM_PID=$!
cd ..

# Dashboard Server (avec test runner intégré)
echo -e "${BLUE}  Dashboard Secure...${NC}"
python3 dashboard-server.py > logs/dashboard-secure.log 2>&1 &

sleep 3

echo -e "${GREEN}✅ Toutes les UIs démarrées :${NC}"
echo -e "   🌐 Frontend Principal: http://localhost:$FRONTEND_PORT"
echo -e "   ⏰ Frontend Temporal:  http://localhost:$TEMPORAL_PORT" 
echo -e "   🔮 Quantum Visualizer: http://localhost:$QUANTUM_PORT"
echo -e "   📊 Dashboard Secure:   http://localhost:8090"

# =============================================================================
# 3. TESTS JAVA MAVEN
# =============================================================================

echo -e "${YELLOW}🧪 3. Exécution des tests Java Maven...${NC}"

cd backend

# Tests de base
echo -e "${BLUE}  ComplexScenarioTest...${NC}"
mvn test -Dtest=ComplexScenarioTest -q > ../logs/test-complex-scenario.log 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}  ✅ ComplexScenarioTest: PASSÉ${NC}"
else
    echo -e "${RED}  ❌ ComplexScenarioTest: ÉCHOUÉ${NC}"
fi

# Tests d'intégration
echo -e "${BLUE}  Tests d'intégration...${NC}"
mvn test -Dtest="*IntegrationTest" -q > ../logs/test-integration.log 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}  ✅ Tests d'intégration: PASSÉS${NC}"
else
    echo -e "${RED}  ❌ Tests d'intégration: ÉCHOUÉS${NC}"
fi

# Test de stress
echo -e "${BLUE}  TemporalStressTest...${NC}"
mvn test -Dtest=TemporalStressTest -q > ../logs/test-stress.log 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}  ✅ TemporalStressTest: PASSÉ${NC}"
else
    echo -e "${RED}  ❌ TemporalStressTest: ÉCHOUÉ${NC}"
fi

# Tous les tests
echo -e "${BLUE}  Tous les tests...${NC}"
mvn test -q > ../logs/test-all.log 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}  ✅ Tous les tests Maven: PASSÉS${NC}"
else
    echo -e "${RED}  ❌ Certains tests Maven: ÉCHOUÉS${NC}"
fi

cd ..

# =============================================================================
# 4. SCÉNARIOS .HOTS
# =============================================================================

echo -e "${YELLOW}🌀 4. Exécution des scénarios .hots...${NC}"

# Scénarios de test
HOTS_SCENARIOS=(
    "game_assets/tests/hots/bataille_temporelle_combat.hots"
    "game_assets/tests/hots/bataille_temporelle_finale.hots" 
    "game_assets/tests/hots/temporal-stress-test.hots"
    "game_assets/tests/hots/parser-comparison.hots"
)

for scenario in "${HOTS_SCENARIOS[@]}"; do
    if [ -f "$scenario" ]; then
        scenario_name=$(basename "$scenario" .hots)
        echo -e "${BLUE}  Scénario: $scenario_name...${NC}"
        
        # Créer un nouveau jeu
        GAME_ID=$(curl -s -X POST "$BACKEND_URL/api/games" \
            -H "Content-Type: application/json" \
            -d '{"gameName": "'$scenario_name'", "maxPlayers": 2}' | \
            jq -r '.gameId' 2>/dev/null)
        
        if [ "$GAME_ID" != "null" ] && [ -n "$GAME_ID" ]; then
            # Exécuter le scénario ligne par ligne
            success_count=0
            total_count=0
            
            while IFS= read -r line; do
                # Ignorer les commentaires et lignes vides
                if [[ "$line" =~ ^#.* ]] || [[ -z "$line" ]]; then
                    continue
                fi
                
                total_count=$((total_count + 1))
                
                result=$(curl -s -X POST "$BACKEND_URL/api/quantum/execute-script/$GAME_ID" \
                    -H "Content-Type: application/json" \
                    -d "{\"script\": \"$line\"}" | \
                    jq -r '.success' 2>/dev/null)
                
                if [ "$result" = "true" ]; then
                    success_count=$((success_count + 1))
                fi
                
            done < "$scenario"
            
            if [ $total_count -gt 0 ]; then
                success_rate=$((success_count * 100 / total_count))
                if [ $success_rate -ge 70 ]; then
                    echo -e "${GREEN}    ✅ $scenario_name: $success_count/$total_count ($success_rate%)${NC}"
                else
                    echo -e "${RED}    ❌ $scenario_name: $success_count/$total_count ($success_rate%)${NC}"
                fi
            else
                echo -e "${YELLOW}    ⚠️  $scenario_name: Aucune commande exécutable${NC}"
            fi
        else
            echo -e "${RED}    ❌ $scenario_name: Impossible de créer le jeu${NC}"
        fi
    else
        echo -e "${YELLOW}    ⚠️  Scénario manquant: $scenario${NC}"
    fi
done

# =============================================================================
# 5. TESTS DU DOSSIER /TEST
# =============================================================================

echo -e "${YELLOW}🧪 5. Exécution des tests du dossier /test...${NC}"

# Test de bataille temporelle
if [ -f "test/run-bataille-temporelle.sh" ]; then
    echo -e "${BLUE}  Bataille Temporelle...${NC}"
    chmod +x test/run-bataille-temporelle.sh
    ./test/run-bataille-temporelle.sh > logs/test-bataille-temporelle.log 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}  ✅ Bataille Temporelle: PASSÉ${NC}"
    else
        echo -e "${RED}  ❌ Bataille Temporelle: ÉCHOUÉ${NC}"
    fi
fi

# Test Epic Scenario Converti
if [ -f "test/run_converted_epic_scenario.sh" ]; then
    echo -e "${BLUE}  Epic Scenario Converti...${NC}"
    chmod +x test/run_converted_epic_scenario.sh
    ./test/run_converted_epic_scenario.sh > logs/test-epic-scenario.log 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}  ✅ Epic Scenario: PASSÉ${NC}"
    else
        echo -e "${RED}  ❌ Epic Scenario: ÉCHOUÉ${NC}"
    fi
fi

# =============================================================================
# 6. ÉTAT FINAL
# =============================================================================

echo -e "${CYAN}🎉 SYSTÈME COMPLET DÉMARRÉ !${NC}"
echo -e "${CYAN}=============================${NC}"
echo -e "${GREEN}Services actifs :${NC}"
echo -e "  📡 Backend:             http://localhost:8080"
echo -e "  🌐 Frontend Principal:  http://localhost:$FRONTEND_PORT"
echo -e "  ⏰ Frontend Temporal:   http://localhost:$TEMPORAL_PORT"
echo -e "  🔮 Quantum Visualizer:  http://localhost:$QUANTUM_PORT"
echo -e "  📊 Dashboard:           http://localhost:8090"

echo -e "\n${GREEN}Logs disponibles :${NC}"
echo -e "  📋 Backend:       logs/backend-full.log"
echo -e "  🧪 Tests Java:    logs/test-*.log"
echo -e "  🌀 Scénarios:     logs/test-bataille-temporelle.log"
echo -e "  📊 Dashboard:     logs/dashboard-secure.log"

echo -e "\n${YELLOW}PIDs des processus :${NC}"
echo -e "  Backend: $BACKEND_PID"
echo -e "  Frontend: $FRONTEND_PID"
echo -e "  Temporal: $TEMPORAL_PID"
echo -e "  Quantum: $QUANTUM_PID"

echo -e "\n${CYAN}Pour arrêter tous les services : ./stop-all-services.sh${NC}"

# Attendre l'input utilisateur pour terminer
echo -e "\n${YELLOW}Appuyez sur Entrée pour voir les logs en temps réel, ou Ctrl+C pour terminer...${NC}"
read

# Afficher les logs en temps réel
echo -e "${CYAN}📋 Logs en temps réel (Ctrl+C pour arrêter) :${NC}"
tail -f logs/backend-full.log logs/dashboard-secure.log logs/frontend-*.log logs/quantum-*.log 2>/dev/null 