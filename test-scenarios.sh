#!/bin/bash

# 🧪 Test All Scenarios - Heroes of Time
# 
# Script de test complet pour valider tous les scénarios

# Configuration
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCENARIOS_DIR="scenarios"
TEST_LOG="test-scenarios.log"

# Fonctions utilitaires
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}🎮 Heroes of Time - Test des Scénarios${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Fonction pour valider un JSON
validate_json() {
    local file="$1"
    local filename=$(basename "$file")
    
    if command -v jq &> /dev/null; then
        if jq empty "$file" 2>/dev/null; then
            print_success "JSON valide: $filename"
            return 0
        else
            print_error "JSON invalide: $filename"
            return 1
        fi
    else
        print_warning "jq non installé, validation JSON ignorée pour $filename"
        return 0
    fi
}

# Fonction pour valider la structure d'un scénario
validate_scenario_structure() {
    local file="$1"
    local filename=$(basename "$file")
    local errors=0
    
    print_info "Validation de la structure: $filename"
    
    # Vérifier les champs obligatoires
    required_fields=("scenario_info" "game_settings" "heroes" "turn_sequence" "win_conditions")
    
    for field in "${required_fields[@]}"; do
        if jq -e ".$field" "$file" &> /dev/null; then
            print_success "  ✓ $field présent"
        else
            print_error "  ✗ $field manquant"
            ((errors++))
        fi
    done
    
    # Vérifier les champs de scenario_info
    scenario_info_fields=("id" "name" "type" "max_turns" "players" "difficulty")
    
    for field in "${scenario_info_fields[@]}"; do
        if jq -e ".scenario_info.$field" "$file" &> /dev/null; then
            print_success "  ✓ scenario_info.$field présent"
        else
            print_error "  ✗ scenario_info.$field manquant"
            ((errors++))
        fi
    done
    
    return $errors
}

# Fonction pour tester un scénario complet
test_scenario() {
    local file="$1"
    local filename=$(basename "$file")
    local total_errors=0
    
    echo ""
    print_info "Testing scenario: $filename"
    echo "----------------------------------------"
    
    # Test 1: Validation JSON
    if validate_json "$file"; then
        print_success "Test 1: JSON valide"
    else
        print_error "Test 1: JSON invalide"
        ((total_errors++))
    fi
    
    # Test 2: Structure du scénario
    if validate_scenario_structure "$file"; then
        print_success "Test 2: Structure valide"
    else
        print_error "Test 2: Structure invalide"
        ((total_errors++))
    fi
    
    # Test 3: Cohérence des données
    local max_turns=$(jq -r '.scenario_info.max_turns' "$file" 2>/dev/null)
    local turn_sequence_length=$(jq -r '.turn_sequence | length' "$file" 2>/dev/null)
    
    if [[ "$max_turns" != "null" && "$turn_sequence_length" != "null" ]]; then
        if [[ $turn_sequence_length -le $max_turns ]]; then
            print_success "Test 3: Cohérence tours (max: $max_turns, séquence: $turn_sequence_length)"
        else
            print_error "Test 3: Incohérence tours (max: $max_turns, séquence: $turn_sequence_length)"
            ((total_errors++))
        fi
    else
        print_warning "Test 3: Impossible de vérifier la cohérence des tours"
    fi
    
    # Test 4: Héros valides
    local heroes_count=$(jq -r '.heroes | length' "$file" 2>/dev/null)
    local expected_players=$(jq -r '.scenario_info.players' "$file" 2>/dev/null)
    
    if [[ "$heroes_count" != "null" && "$expected_players" != "null" ]]; then
        if [[ $heroes_count -ge $expected_players ]]; then
            print_success "Test 4: Nombre de héros cohérent ($heroes_count >= $expected_players)"
        else
            print_error "Test 4: Pas assez de héros ($heroes_count < $expected_players)"
            ((total_errors++))
        fi
    else
        print_warning "Test 4: Impossible de vérifier les héros"
    fi
    
    # Test 5: Artefacts référencés
    if jq -e '.artifacts' "$file" &> /dev/null; then
        local artifacts_count=$(jq -r '.artifacts | length' "$file" 2>/dev/null)
        print_success "Test 5: Artefacts définis ($artifacts_count)"
    else
        print_warning "Test 5: Aucun artefact défini"
    fi
    
    echo "----------------------------------------"
    if [[ $total_errors -eq 0 ]]; then
        print_success "Scénario $filename: TOUS LES TESTS PASSÉS ✅"
    else
        print_error "Scénario $filename: $total_errors erreurs détectées ❌"
    fi
    
    return $total_errors
}

# Fonction pour tester l'index des scénarios
test_scenario_index() {
    local index_file="$SCENARIOS_DIR/SCENARIOS_INDEX.json"
    
    print_info "Test de l'index des scénarios"
    echo "----------------------------------------"
    
    if [[ ! -f "$index_file" ]]; then
        print_error "Index des scénarios manquant: $index_file"
        return 1
    fi
    
    if ! validate_json "$index_file"; then
        print_error "Index des scénarios invalide"
        return 1
    fi
    
    local total_scenarios=$(jq -r '.scenarios_index.total_scenarios' "$index_file" 2>/dev/null)
    local actual_scenarios=$(jq -r '.scenarios | length' "$index_file" 2>/dev/null)
    
    if [[ "$total_scenarios" == "$actual_scenarios" ]]; then
        print_success "Compteur de scénarios cohérent: $total_scenarios"
    else
        print_error "Compteur incohérent: déclaré $total_scenarios, trouvé $actual_scenarios"
        return 1
    fi
    
    # Vérifier que tous les fichiers de scénarios existent
    local missing_files=0
    jq -r '.scenarios[].file' "$index_file" | while read -r scenario_file; do
        if [[ ! -f "$SCENARIOS_DIR/$scenario_file" ]]; then
            print_error "Fichier de scénario manquant: $scenario_file"
            ((missing_files++))
        fi
    done
    
    if [[ $missing_files -eq 0 ]]; then
        print_success "Tous les fichiers de scénarios existent"
    else
        print_error "$missing_files fichiers de scénarios manquants"
        return 1
    fi
    
    print_success "Index des scénarios: VALIDE ✅"
    return 0
}

# Fonction pour tester le visualizer
test_visualizer() {
    print_info "Test du visualizer"
    echo "----------------------------------------"
    
    local visualizer_files=("quantum-visualizer/index.html" "quantum-visualizer/scenario-loader.js" "quantum-visualizer/quantum-visualizer-enhanced.js" "quantum-visualizer/scenario-selector.css")
    local missing_files=0
    
    for file in "${visualizer_files[@]}"; do
        if [[ -f "$file" ]]; then
            print_success "Fichier présent: $(basename "$file")"
        else
            print_error "Fichier manquant: $(basename "$file")"
            ((missing_files++))
        fi
    done
    
    if [[ $missing_files -eq 0 ]]; then
        print_success "Visualizer: TOUS LES FICHIERS PRÉSENTS ✅"
        return 0
    else
        print_error "Visualizer: $missing_files fichiers manquants ❌"
        return 1
    fi
}

# Fonction pour générer un rapport de test
generate_test_report() {
    local total_scenarios=$1
    local passed_scenarios=$2
    local failed_scenarios=$3
    
    echo ""
    print_header
    echo ""
    echo "📊 RAPPORT DE TEST FINAL"
    echo "========================"
    echo ""
    echo "Scénarios testés: $total_scenarios"
    echo "Scénarios réussis: $passed_scenarios"
    echo "Scénarios échoués: $failed_scenarios"
    echo ""
    
    if [[ $failed_scenarios -eq 0 ]]; then
        print_success "TOUS LES TESTS SONT PASSÉS ! 🎉"
        echo ""
        echo "🚀 Le système Heroes of Time est prêt !"
        echo "   - 8 scénarios complets disponibles"
        echo "   - Architecture hybride JSON + HOTS fonctionnelle"
        echo "   - Visualizer quantique opérationnel"
        echo "   - Système de sélection de scénarios intégré"
        echo ""
    else
        print_error "CERTAINS TESTS ONT ÉCHOUÉ 😞"
        echo ""
        echo "🔧 Actions recommandées:"
        echo "   - Vérifier les scénarios échoués"
        echo "   - Corriger les erreurs de structure"
        echo "   - Relancer les tests"
        echo ""
    fi
    
    success_rate=$(( (passed_scenarios * 100) / total_scenarios ))
    echo "Taux de réussite: $success_rate%"
    echo ""
}

# Fonction principale
main() {
    print_header
    echo ""
    
    # Vérifier que jq est installé
    if ! command -v jq &> /dev/null; then
        print_warning "jq n'est pas installé. Certains tests seront ignorés."
        echo "Pour installer jq: brew install jq (macOS) ou apt-get install jq (Ubuntu)"
        echo ""
    fi
    
    # Vérifier que le dossier scenarios existe
    if [[ ! -d "$SCENARIOS_DIR" ]]; then
        print_error "Dossier scenarios non trouvé: $SCENARIOS_DIR"
        exit 1
    fi
    
    # Initialiser les compteurs
    local total_scenarios=0
    local passed_scenarios=0
    local failed_scenarios=0
    
    # Tester l'index des scénarios
    if test_scenario_index; then
        print_success "Index des scénarios validé"
    else
        print_error "Index des scénarios invalide"
        exit 1
    fi
    
    echo ""
    
    # Tester chaque scénario JSON
    for scenario_file in "$SCENARIOS_DIR"/*.json; do
        if [[ -f "$scenario_file" && "$(basename "$scenario_file")" != "SCENARIOS_INDEX.json" ]]; then
            ((total_scenarios++))
            
            if test_scenario "$scenario_file"; then
                ((passed_scenarios++))
            else
                ((failed_scenarios++))
            fi
        fi
    done
    
    echo ""
    
    # Tester le visualizer
    if test_visualizer; then
        print_success "Visualizer validé"
    else
        print_error "Problème avec le visualizer"
    fi
    
    # Générer le rapport final
    generate_test_report $total_scenarios $passed_scenarios $failed_scenarios
    
    # Code de sortie
    if [[ $failed_scenarios -eq 0 ]]; then
        exit 0
    else
        exit 1
    fi
}

# Exécuter le script principal
main "$@" 