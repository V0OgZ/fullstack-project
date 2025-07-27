#!/bin/bash

# =============================================================================
# 🌀 HEROES OF TIME - SCENARIOS COMPLETS
# =============================================================================
#
# Ce script exécute tous les scénarios disponibles :
# 1. Scénarios .hots (game_assets/tests/hots/)
# 2. Tests d'intégration Java Maven 
# 3. Scénarios du dossier /test (différents des .hots)
#
# =============================================================================

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

BACKEND_URL="http://localhost:8080"
LOG_DIR="logs"

mkdir -p $LOG_DIR

echo -e "${CYAN}🌀 HEROES OF TIME - TOUS LES SCÉNARIOS${NC}"
echo -e "${CYAN}======================================${NC}"

# Vérifier que le backend fonctionne
if ! curl -s "$BACKEND_URL/actuator/health" > /dev/null 2>&1; then
    echo -e "${RED}❌ Backend non disponible sur $BACKEND_URL${NC}"
    echo -e "${YELLOW}💡 Lancez d'abord: cd backend && mvn spring-boot:run${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Backend disponible${NC}"

# =============================================================================
# 1. TESTS JAVA MAVEN (Classes de test d'intégration)
# =============================================================================

echo -e "${YELLOW}🧪 1. Tests Java Maven d'intégration...${NC}"

cd backend

# Tests spécifiques trouvés
JAVA_TESTS=(
    "ComplexScenarioTest"
    "EclatMondesDissolusTest"
    "BatailleTemporelleIntegrationTest"
    "QuantumInterferenceIntegrationTest" 
    "QuantumArtifactsIntegrationTest"
    "TemporalEngineIntegrationTest"
    "TemporalStressTest"
    "PsiStateTest"
)

for test in "${JAVA_TESTS[@]}"; do
    echo -e "${BLUE}  Test: $test...${NC}"
    mvn test -Dtest=$test -q > ../logs/test-$test.log 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}    ✅ $test: PASSÉ${NC}"
    else
        echo -e "${RED}    ❌ $test: ÉCHOUÉ${NC}"
        echo -e "${YELLOW}    📋 Log: logs/test-$test.log${NC}"
    fi
done

cd ..

# =============================================================================
# 2. SCÉNARIOS .HOTS
# =============================================================================

echo -e "${YELLOW}🌀 2. Scénarios .hots...${NC}"

HOTS_SCENARIOS=(
    "game_assets/tests/hots/bataille_temporelle_setup.hots"
    "game_assets/tests/hots/bataille_temporelle_combat.hots"
    "game_assets/tests/hots/bataille_temporelle_finale.hots"
    "game_assets/tests/hots/temporal-stress-test.hots"
    "game_assets/tests/hots/parser-comparison.hots"
    "game_assets/tests/hots/quantum_artifacts_test.hots"
    "game_assets/tests/hots/converted_epic_scenario.hots"
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
            success_count=0
            total_count=0
            
            while IFS= read -r line; do
                # Nettoyer la ligne
                line=$(echo "$line" | xargs)
                
                # Ignorer les commentaires, lignes vides et métadonnées
                if [[ -z "$line" ]] || [[ "$line" =~ ^#.* ]] || [[ "$line" =~ ^GAME:.* ]]; then
                    continue
                fi
                
                total_count=$((total_count + 1))
                
                # Exécuter la commande
                result=$(curl -s -X POST "$BACKEND_URL/api/quantum/execute-script/$GAME_ID" \
                    -H "Content-Type: application/json" \
                    -d "{\"script\": \"$line\"}" | \
                    jq -r '.success' 2>/dev/null)
                
                if [ "$result" = "true" ]; then
                    success_count=$((success_count + 1))
                fi
                
                # Petit délai pour éviter la surcharge
                sleep 0.1
                
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
            
            # Obtenir l'état final du jeu
            final_state=$(curl -s "$BACKEND_URL/api/games/$GAME_ID/quantum-state" | \
                jq -r '.quantumAnalysis.totalStates' 2>/dev/null)
            if [ "$final_state" != "null" ] && [ -n "$final_state" ]; then
                echo -e "${CYAN}    📊 États quantiques finaux: $final_state${NC}"
            fi
            
        else
            echo -e "${RED}    ❌ $scenario_name: Impossible de créer le jeu${NC}"
        fi
    else
        echo -e "${YELLOW}    ⚠️  Scénario manquant: $scenario${NC}"
    fi
done

# =============================================================================
# 3. SCRIPTS DU DOSSIER /TEST
# =============================================================================

echo -e "${YELLOW}🧪 3. Scripts spécialisés du dossier /test...${NC}"

# Ces scripts sont différents des .hots car ils testent l'intégration complète
TEST_SCRIPTS=(
    "test/run-bataille-temporelle.sh"
    "test/run_converted_epic_scenario.sh"
)

for script in "${TEST_SCRIPTS[@]}"; do
    if [ -f "$script" ]; then
        script_name=$(basename "$script" .sh)
        echo -e "${BLUE}  Script: $script_name...${NC}"
        
        # Rendre exécutable
        chmod +x "$script"
        
        # Exécuter
        if ./"$script" > "logs/$script_name.log" 2>&1; then
            echo -e "${GREEN}    ✅ $script_name: PASSÉ${NC}"
        else
            echo -e "${RED}    ❌ $script_name: ÉCHOUÉ${NC}"
            echo -e "${YELLOW}    📋 Log: logs/$script_name.log${NC}"
        fi
    else
        echo -e "${YELLOW}    ⚠️  Script manquant: $script${NC}"
    fi
done

# =============================================================================
# 4. TESTS DE PERFORMANCE ET STRESS
# =============================================================================

echo -e "${YELLOW}⚡ 4. Tests de performance...${NC}"

# Test de stress quantique
echo -e "${BLUE}  Test de stress quantique...${NC}"
STRESS_GAME_ID=$(curl -s -X POST "$BACKEND_URL/api/games" \
    -H "Content-Type: application/json" \
    -d '{"gameName": "Stress Test", "maxPlayers": 2}' | \
    jq -r '.gameId' 2>/dev/null)

if [ "$STRESS_GAME_ID" != "null" ] && [ -n "$STRESS_GAME_ID" ]; then
    start_time=$(date +%s%N)
    
    # Créer 20 états quantiques rapidement
    for i in {1..20}; do
        x=$((i * 2))
        y=$((i * 3))
        curl -s -X POST "$BACKEND_URL/api/quantum/execute-script/$STRESS_GAME_ID" \
            -H "Content-Type: application/json" \
            -d "{\"script\": \"ψ$(printf "%03d" $i): (0.8+0.6i) ⊙(Δt+1 @$x,$y ⟶ MOV(Hero$i, @$x,$y))\"}" > /dev/null 2>&1
    done
    
    end_time=$(date +%s%N)
    duration=$(( (end_time - start_time) / 1000000 )) # en ms
    
    # Vérifier l'état final
    final_states=$(curl -s "$BACKEND_URL/api/games/$STRESS_GAME_ID/quantum-state" | \
        jq -r '.quantumAnalysis.totalStates' 2>/dev/null)
    
    if [ "$final_states" != "null" ] && [ "$final_states" -ge 15 ]; then
        ops_per_sec=$(( 20 * 1000 / duration ))
        echo -e "${GREEN}    ✅ Stress quantique: $final_states états, ${duration}ms, ${ops_per_sec} ops/s${NC}"
    else
        echo -e "${RED}    ❌ Stress quantique: Seulement $final_states états créés${NC}"
    fi
else
    echo -e "${RED}    ❌ Impossible de créer le jeu de stress${NC}"
fi

# =============================================================================
# 5. RAPPORT FINAL
# =============================================================================

echo -e "${CYAN}📊 RAPPORT FINAL${NC}"
echo -e "${CYAN}================${NC}"

# Compter les logs de succès/échec
success_logs=$(find logs/ -name "*.log" -exec grep -l "✅\|PASSÉ\|SUCCESS" {} \; 2>/dev/null | wc -l)
error_logs=$(find logs/ -name "*.log" -exec grep -l "❌\|ÉCHOUÉ\|ERROR\|FAILED" {} \; 2>/dev/null | wc -l)

echo -e "${GREEN}✅ Tests réussis: $success_logs${NC}"
echo -e "${RED}❌ Tests échoués: $error_logs${NC}"

# Afficher l'état du système
echo -e "\n${CYAN}🔍 État du système :${NC}"
games_count=$(curl -s "$BACKEND_URL/api/games" | jq '. | length' 2>/dev/null)
echo -e "  🎮 Jeux créés: $games_count"

# Suggestions
echo -e "\n${YELLOW}💡 Suggestions :${NC}"
echo -e "  📋 Consultez les logs détaillés dans logs/"
echo -e "  🌐 Accédez aux UIs : ./run-everything.sh"
echo -e "  🔍 Debug backend : logs/backend-full.log"

echo -e "\n${CYAN}🎉 Analyse des scénarios terminée !${NC}" 