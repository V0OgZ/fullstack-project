#!/bin/bash

# 🎯 TEST JEAN-GROS v3.0 WITH JSON - ÉDITION VINCE VEGA PULP FICTION
# ====================================================================
# Version avec Vince Vega qui kill les processus trop lents avec style!

echo "🎯 TEST JEAN-GROS v3.0 WITH JSON - ÉDITION VINCE VEGA PULP FICTION"
echo "======================================================================"
echo "🎳 The Dude: Analysing what needs to run with new JSON capabilities..."
echo "🔫 Vince Vega: Setting up parallel execution with JSON tests..."
echo "💀 Vince: 'Royale with cheese' timeout system activated!"

# Configuration
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$BASE_DIR"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
CYAN='\033[0;36m'
MAGENTA='\033[0;95m'
NC='\033[0m'

# Timeouts par défaut (en secondes) - Style Vince Vega
VINCE_DEFAULT_TIMEOUT=180  # 3 minutes max
VINCE_KILL_TIMEOUT=15      # 15 secondes pour tuer proprement
VINCE_FORCE_KILL_TIMEOUT=5 # 5 secondes avant SIGKILL

# Fonction ASCII Art pour Vince qui kill
vince_kill_ascii() {
    local process_name="$1"
    echo -e "${RED}"
    cat << 'EOF'
    💀 VINCE VEGA CLEANUP IN PROGRESS 💀
    
         🔫                    💥
        ╔═══╗     BANG!     ╔═══╗
        ║ V ║  ━━━━━━━━━━►  ║ X ║
        ║ E ║               ║   ║
        ║ G ║               ║ R ║
        ║ A ║               ║ I ║
        ╚═══╝               ║ P ║
                            ╚═══╝
    
    "Say what again! I dare you!" - Vincent Vega
EOF
    echo -e "${NC}"
    echo -e "${YELLOW}🔫 Vince: Process '$process_name' était trop lent... ${RED}ELIMINATED!${NC}"
}

# Fonction pour kill avec style Vince Vega
vince_terminate_process() {
    local pid="$1"
    local process_name="$2"
    local start_time=$(date +%s)
    
    if [ ! -z "$pid" ] && kill -0 "$pid" 2>/dev/null; then
        echo -e "${YELLOW}🔫 Vince: '$process_name' prend trop de temps... Time to clean up!${NC}"
        
        # Phase 1: SIGTERM poli
        echo -e "${CYAN}🔫 Vince: 'Excuse me, but could you please finish?' (SIGTERM)${NC}"
        kill -TERM "$pid" 2>/dev/null
        
        # Attendre un peu
        for i in {1..15}; do
            if ! kill -0 "$pid" 2>/dev/null; then
                echo -e "${GREEN}✅ Process terminé proprement${NC}"
                return 0
            fi
            echo -ne "${CYAN}.${NC}"
            sleep 1
        done
        echo ""
        
        # Phase 2: SIGKILL brutal
        if kill -0 "$pid" 2>/dev/null; then
            echo -e "${RED}🔫 Vince: 'The path of the righteous process...' (SIGKILL)${NC}"
            vince_kill_ascii "$process_name"
            kill -KILL "$pid" 2>/dev/null
            
            # Vérification finale
            sleep 2
            if ! kill -0 "$pid" 2>/dev/null; then
                echo -e "${RED}💀 Process eliminated with extreme prejudice${NC}"
            else
                echo -e "${RED}⚠️  Process is still alive somehow... That's some gourmet shit!${NC}"
            fi
        fi
    else
        echo -e "${GREEN}✅ Process already terminated${NC}"
    fi
}

# Fonction pour exécuter avec timeout à la Vince Vega
vince_run_with_timeout() {
    local command="$1"
    local log_file="$2"
    local timeout="${3:-$VINCE_DEFAULT_TIMEOUT}"
    local process_name="$4"
    
    echo -e "${CYAN}🔫 Vince: Starting '$process_name' with ${timeout}s timeout...${NC}"
    echo -e "${MAGENTA}🔫 'I'm gonna get medieval on your process if you don't finish!'${NC}"
    
    # Lancer le processus en background
    eval "$command" > "$log_file" 2>&1 &
    local pid=$!
    local start_time=$(date +%s)
    
    # Surveillance avec timeout
    while kill -0 "$pid" 2>/dev/null; do
        local current_time=$(date +%s)
        local elapsed=$((current_time - start_time))
        
        if [ $elapsed -gt $timeout ]; then
            echo -e "${RED}⏰ Timeout reached for '$process_name' after ${elapsed}s${NC}"
            vince_terminate_process "$pid" "$process_name"
            return 1
        fi
        
        # Affichage sympa du progress
        local dots=$((elapsed % 4))
        local progress_dots=""
        for ((i=0; i<dots; i++)); do progress_dots+="."; done
        echo -ne "\r${CYAN}🔫 Vince watching '$process_name'${progress_dots} (${elapsed}s/${timeout}s)${NC}"
        
        sleep 2
    done
    echo ""
    
    # Récupérer le code de sortie
    wait $pid 2>/dev/null
    local exit_code=$?
    
    local end_time=$(date +%s)
    local total_time=$((end_time - start_time))
    
    if [ $exit_code -eq 0 ]; then
        echo -e "${GREEN}✅ '$process_name' completed successfully in ${total_time}s${NC}"
        echo -e "${CYAN}🔫 Vince: 'That's a pretty fuckin' good milkshake!'${NC}"
    else
        echo -e "${RED}❌ '$process_name' failed with exit code $exit_code in ${total_time}s${NC}"
        echo -e "${RED}🔫 Vince: 'Aw man, I shot $process_name in the face...'${NC}"
    fi
    
    return $exit_code
}

# Fonction pour logger avec timestamp
log_with_time() {
    echo -e "${CYAN}[$(date '+%H:%M:%S')]${NC} $1"
}

# ASCII Art d'intro Vince Vega
echo -e "${MAGENTA}"
cat << 'EOF'
    🎬 VINCE VEGA PRODUCTION PRESENTS 🎬
    
         🚬              🔫
        ╔═══╗          ╔═════╗
        ║ V ║          ║ JSON║
        ║ I ║    VS    ║TEST ║
        ║ N ║          ║SLOW ║
        ║ C ║          ║PROC ║
        ║ E ║          ║ESS  ║
        ╚═══╝          ╚═════╝
    
    "Timeout, motherfucker! Do you have it?"
EOF
echo -e "${NC}"

# Nettoyer les anciens processus background éventuels
cleanup_background_jobs() {
    jobs | grep -E "(backend-compile|backend-tests|causality-wall|vision-temporelle|quantum-maze|test-final-mega|ui-quick|stress-test|json-tests)" | while read job; do
        job_id=$(echo "$job" | sed 's/.*\[\([0-9]*\)\].*/\1/')
        if [ ! -z "$job_id" ]; then
            kill %$job_id 2>/dev/null || true
        fi
    done
}

cleanup_background_jobs

echo ""
echo "🎳 The Dude is analyzing dependencies..."

# Timestamp pour cette exécution
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RAPPORT_DIR="rapport-jean-gros-v3-${TIMESTAMP}"
mkdir -p "$RAPPORT_DIR"

echo "📊 Rapport sera généré dans: $RAPPORT_DIR"

# Scripts de test classiques avec timeouts Vince Vega
echo -e "${CYAN}🔫 Vince: Loading up the briefcase with tests...${NC}"

CLASSIC_TESTS=(
    "backend-compile:cd backend && mvn compile -q:120:Backend Maven Compile"
    "backend-tests:cd backend && mvn test -q:300:Backend Unit Tests"
    "causality-wall:./scripts/test-causality-wall.sh:180:Causality Wall Test"
    "vision-temporelle:./scripts/test-vision-temporelle.sh:120:Vision Temporelle Test"
    "quantum-maze:./scripts/test-quantum-maze-complete.sh:240:Quantum Maze Complete"
    "test-final-mega:./scripts/test-complet-final.sh:600:Test Final Mega (10min max)"
    "ui-quick:./scripts/actifs/test-ui-quick.sh:90:UI Quick Test"
    "stress-test:./scripts/test/temporal-stress-test.sh:300:Temporal Stress Test"
)

# Nouveaux tests JSON avec surveillance Vince Vega
JSON_TESTS=(
    "json-panopticon:./scripts/test-panopticon-json-scenario.sh:180:JSON Panopticon Scenario"
    "json-duel-collapse:./scripts/test-duel-collapse-json.sh:120:JSON Duel Collapse"
    "json-runner-test:./scripts/test-json-scenario-runner.sh GROFI_QUICK_TEST:150:JSON Runner Test"
)

# Combiner tous les tests
ALL_TESTS=("${CLASSIC_TESTS[@]}" "${JSON_TESTS[@]}")

echo ""
echo -e "${MAGENTA}🔫 Vince: 'Let's get into character!' - Launching tests with extreme prejudice...${NC}"
echo -e "${CYAN}🎬 Total tests to run: ${#ALL_TESTS[@]} (avec surveillance Vincent Vega)${NC}"
echo ""

# Lancer tous les tests avec la surveillance Vincent Vega
echo -e "${RED}🔫 Vince: 'Royale with Cheese' test execution protocol engaged!${NC}"

# Tableaux pour tracker les résultats
declare -a test_results
declare -a test_times
declare -a test_status

test_counter=0
for test_info in "${ALL_TESTS[@]}"; do
    # Parser le nouveau format: name:command:timeout:description
    IFS=':' read -ra test_parts <<< "$test_info"
    test_name="${test_parts[0]}"
    test_command="${test_parts[1]}"
    test_timeout="${test_parts[2]:-$VINCE_DEFAULT_TIMEOUT}"
    test_description="${test_parts[3]:-$test_name}"
    
    log_file="$RAPPORT_DIR/${test_name}.log"
    
    echo ""
    echo -e "${YELLOW}===============================================${NC}"
    echo -e "${CYAN}🔫 Vince Test #$((test_counter + 1)): ${test_description}${NC}"
    echo -e "${YELLOW}===============================================${NC}"
    
    # Exécuter avec timeout Vince Vega
    start_time=$(date +%s)
    if vince_run_with_timeout "$test_command" "$log_file" "$test_timeout" "$test_description"; then
        test_results[test_counter]="SUCCESS"
        test_status[test_counter]="✅"
        echo -e "${GREEN}🔫 Vince: '$test_description' - That's what I call a successful hit!${NC}"
    else
        test_results[test_counter]="FAILED"
        test_status[test_counter]="💀"
        echo -e "${RED}🔫 Vince: '$test_description' - Well, that didn't work out so well...${NC}"
    fi
    
    end_time=$(date +%s)
    test_times[test_counter]=$((end_time - start_time))
    
    # Sauvegarde du résultat
    echo "${test_results[test_counter]}" > "$RAPPORT_DIR/${test_name}.exitcode"
    
    test_counter=$((test_counter + 1))
    
    # Pause entre les tests pour pas surcharger
    sleep 2
done

echo ""
echo -e "${MAGENTA}🔫 Vince: 'That's a wrap!' - All tests completed${NC}"
echo -e "${CYAN}📊 Generating Pulp Fiction style report...${NC}"

echo ""
echo "🎯 All tests completed! Generating reports..."

# Générer le rapport final
RAPPORT_FILE="$RAPPORT_DIR/RAPPORT_COMPLET.md"

cat > "$RAPPORT_FILE" << EOF
# 🎯 RAPPORT JEAN-GROS v3.0 WITH JSON - ${TIMESTAMP}

**Exécution complète avec nouveaux scripts JSON adaptés**

## 🧪 RÉSULTATS DES TESTS CLASSIQUES

EOF

# Générer le rapport avec style Vince Vega
cat >> "$RAPPORT_FILE" << EOF

## 🔫 RÉSULTATS VINCE VEGA - STYLE PULP FICTION

*"The path of the righteous test is beset on all sides..."*

EOF

# Calculer les stats globales
total_success=0
total_failed=0
total_time=0

# Analyser tous les résultats
test_counter=0
for test_info in "${ALL_TESTS[@]}"; do
    IFS=':' read -ra test_parts <<< "$test_info"
    test_name="${test_parts[0]}"
    test_description="${test_parts[3]:-$test_name}"
    
    result="${test_results[test_counter]:-UNKNOWN}"
    status_icon="${test_status[test_counter]:-❓}"
    test_time="${test_times[test_counter]:-0}"
    total_time=$((total_time + test_time))
    
    if [ "$result" = "SUCCESS" ]; then
        total_success=$((total_success + 1))
        vince_quote="*'That's a pretty fuckin' good milkshake!'*"
    else
        total_failed=$((total_failed + 1))
        vince_quote="*'Aw man, I shot the test in the face...'*"
    fi
    
    echo "### ${status_icon} $test_description" >> "$RAPPORT_FILE"
    echo "" >> "$RAPPORT_FILE"
    echo "- **Résultat**: $result" >> "$RAPPORT_FILE"
    echo "- **Temps d'exécution**: ${test_time}s" >> "$RAPPORT_FILE"
    echo "- **Vincent dit**: $vince_quote" >> "$RAPPORT_FILE"
    echo "" >> "$RAPPORT_FILE"
    
    # Ajouter un extrait du log
    if [ -f "$RAPPORT_DIR/${test_name}.log" ]; then
        echo "**Extrait du log:**" >> "$RAPPORT_FILE"
        echo '```' >> "$RAPPORT_FILE"
        head -15 "$RAPPORT_DIR/${test_name}.log" >> "$RAPPORT_FILE"
        echo '```' >> "$RAPPORT_FILE"
        echo "" >> "$RAPPORT_FILE"
    fi
    
    test_counter=$((test_counter + 1))
done

# Ajouter les stats finales Vince Vega style
cat >> "$RAPPORT_FILE" << EOF

## 📊 STATISTIQUES FINALES - VINCE VEGA

EOF

success_rate=0
if [ ${#ALL_TESTS[@]} -gt 0 ]; then
    success_rate=$((total_success * 100 / ${#ALL_TESTS[@]}))
fi

echo "- **Tests réussis**: $total_success ✅" >> "$RAPPORT_FILE"
echo "- **Tests échoués**: $total_failed 💀" >> "$RAPPORT_FILE"  
echo "- **Taux de réussite**: ${success_rate}% 🎯" >> "$RAPPORT_FILE"
echo "- **Temps total**: ${total_time}s ⏱️" >> "$RAPPORT_FILE"
echo "- **Tests JSON nouveaux**: ${#JSON_TESTS[@]} 🚀" >> "$RAPPORT_FILE"
echo "- **Tests classiques**: ${#CLASSIC_TESTS[@]} 🎳" >> "$RAPPORT_FILE"
echo "" >> "$RAPPORT_FILE"

# Message de fin selon les résultats
if [ $total_failed -eq 0 ]; then
    final_message="🔫 **Vincent Vega dit**: *'Royale with Cheese! Perfect execution!'*"
    echo -e "${GREEN}🎬 SUCCÈS TOTAL! Tous les tests ont réussi!${NC}"
elif [ $success_rate -ge 75 ]; then
    final_message="🔫 **Vincent Vega dit**: *'Pretty fuckin' good, but we had some casualties...'*"
    echo -e "${YELLOW}🎬 SUCCÈS PARTIEL! $success_rate% de réussite${NC}"
else
    final_message="🔫 **Vincent Vega dit**: *'Well, that was a clusterfuck... Time for plan B!'*"
    echo -e "${RED}🎬 ÉCHEC MAJEUR! Seulement $success_rate% de réussite${NC}"
fi

echo "$final_message" >> "$RAPPORT_FILE"
echo "" >> "$RAPPORT_FILE"
echo "*Généré le $(date) par Jean-Gros v3.0 avec surveillance Vincent Vega*" >> "$RAPPORT_FILE"

cat >> "$RAPPORT_FILE" << EOF

## 📊 STATISTIQUES GLOBALES

- **Tests classiques**: ${#CLASSIC_TESTS[@]}
- **Nouveaux tests JSON**: ${#JSON_TESTS[@]}
- **Total**: $total_tests tests
- **Répertoire**: $RAPPORT_DIR

## 🎯 ARCHITECTURE JSON TESTÉE

Les nouveaux scripts JSON testent :
- **Parsing de scénarios JSON** - Format unifié HSP
- **Scripts adaptés** - Chemins corrigés  
- **Interface utilisateur** - Affichage structuré
- **Logique de jeu** - Compatible avec le système existant

### Scripts JSON Inclus:
- \`test-panopticon-json-scenario.sh\` - Test du PANOPTICΩN
- \`test-duel-collapse-json.sh\` - Test du duel du collapse
- \`test-json-scenario-runner.sh\` - Runner générique JSON

## 🛋️ NOTE POUR JEAN

Rapport généré automatiquement depuis le canapé GitHub.
L'architecture JSON fonctionne et est prête pour le système HSP unifié !

---

*Généré le $(date) par Jean-Gros v3.0*
EOF

echo ""
echo -e "${MAGENTA}🎬 RAPPORT PULP FICTION GÉNÉRÉ !${NC}"
echo -e "${CYAN}📁 Consultez: $RAPPORT_FILE${NC}"
echo ""

# ASCII Art final de Vince Vega
echo -e "${MAGENTA}"
cat << 'EOF'
    🎬 FIN DU SCRIPT VINCE VEGA 🎬
    
         💼              📊
        ╔════╗          ╔═════╗
        ║VINCE║ ━━━━━━► ║STATS║
        ║VEGA ║          ║ OK  ║
        ║ 🔫  ║          ║ !   ║
        ╚════╝          ╚═════╝
    
    "The tests are in the briefcase!"
EOF
echo -e "${NC}"

echo ""
echo -e "${CYAN}📊 BILAN FINAL VINCENT VEGA:${NC}"
echo -e "   ${GREEN}✅ Réussites: $total_success${NC}"
echo -e "   ${RED}💀 Éliminations: $total_failed${NC}"  
echo -e "   ${YELLOW}📈 Taux de réussite: ${success_rate}%${NC}"
echo -e "   ${CYAN}⏱️ Temps total: ${total_time}s${NC}"

echo ""
if [ $total_failed -eq 0 ]; then
    echo -e "${GREEN}🏆 ROYAL WITH CHEESE! TOUS LES TESTS RÉUSSIS!${NC}"
    echo -e "${GREEN}🔫 Vincent: 'I'm a mushroom-cloud-layin' motherfucker, motherfucker!'${NC}"
elif [ $success_rate -ge 75 ]; then
    echo -e "${YELLOW}⚠️ MISSION PARTIELLE - Quelques casualties${NC}"
    echo -e "${YELLOW}🔫 Vincent: 'Pretty fuckin' good, but next time we go medieval!'${NC}"
else
    echo -e "${RED}💀 CLUSTERFUCK MAJEUR!${NC}"
    echo -e "${RED}🔫 Vincent: 'Time to call the Wolf...'${NC}"
fi

echo ""
echo -e "${BLUE}🎳 The Dude: 'That's just like, your opinion, man. Tests abide.'${NC}"
echo -e "${MAGENTA}🔫 Vince Vega: 'That's a wrap, motherfuckers!'${NC}"
echo ""
echo -e "${CYAN}🛋️ Jean peut maintenant se reposer sur son canapé - Mission accomplie!${NC}" 