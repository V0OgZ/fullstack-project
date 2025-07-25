#!/bin/bash

# =============================================================================
# 🔄 CONVERTISSEUR SCÉNARIO HOTS ↔ JSON
# =============================================================================
# Permet de convertir les scénarios entre formats HOTS et JSON
# =============================================================================

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Variables
HOTS_DIR="game_assets/scenarios/hots"
JSON_DIR="game_assets/scenarios/visualizer"

usage() {
    echo -e "${BLUE}"
    echo "🔄 CONVERTISSEUR SCÉNARIO HOTS ↔ JSON"
    echo "====================================="
    echo -e "${NC}"
    echo "Usage:"
    echo "  $0 hots-to-json <scenario.hots>     # Convertir HOTS vers JSON"
    echo "  $0 json-to-hots <scenario.json>     # Convertir JSON vers HOTS"
    echo "  $0 analyze-compatibility            # Analyser tous les scénarios"
    echo "  $0 test-conversion                  # Tester la conversion bidirectionnelle"
    echo ""
    echo "Exemples:"
    echo "  $0 hots-to-json epic-arthur-vs-ragnar.hots"
    echo "  $0 json-to-hots bataille_temporelle.json"
}

# Fonction pour extraire les informations d'un fichier HOTS
analyze_hots_file() {
    local file="$1"
    local temp_json=$(mktemp)
    
    echo -e "${GREEN}📊 Analyse du fichier HOTS: $(basename "$file")${NC}"
    
    # Extraire les éléments du fichier HOTS
    local heroes=$(grep -c "^HERO:" "$file" 2>/dev/null || echo "0")
    local movements=$(grep -c "^MOV(" "$file" 2>/dev/null || echo "0")
    local psi_states=$(grep -c "^ψ[0-9]" "$file" 2>/dev/null || echo "0")
    local battles=$(grep -c "^BATTLE(" "$file" 2>/dev/null || echo "0")
    local artifacts=$(grep -c "CREATE.*ARTIFACT" "$file" 2>/dev/null || echo "0")
    local buildings=$(grep -c "CREATE.*BUILDING" "$file" 2>/dev/null || echo "0")
    
    echo "   - Héros: $heroes"
    echo "   - Mouvements: $movements"
    echo "   - États ψ: $psi_states"
    echo "   - Batailles: $battles"
    echo "   - Artefacts: $artifacts"
    echo "   - Bâtiments: $buildings"
    
    # Créer un JSON basique basé sur l'analyse
    cat > "$temp_json" << EOF
{
  "scenarioName": "$(basename "$file" .hots | tr '_-' ' ' | sed 's/.*/\L&/; s/[a-z]*/\u&/g')",
  "description": "Scénario converti automatiquement depuis $(basename "$file")",
  "version": "1.0.0",
  "source": "HOTS_CONVERSION",
  "gameSettings": {
    "mapSize": { "width": 25, "height": 25 },
    "maxPlayers": $(($heroes > 4 ? 4 : ($heroes > 0 ? $heroes : 2))),
    "turnTimeLimit": 300,
    "temporalEnergyStart": 100
  },
  "analysis": {
    "totalHeroes": $heroes,
    "totalMovements": $movements,
    "totalPsiStates": $psi_states,
    "totalBattles": $battles,
    "totalArtifacts": $artifacts,
    "totalBuildings": $buildings,
    "complexity": "$([ $psi_states -gt 10 ] && echo "HIGH" || [ $psi_states -gt 5 ] && echo "MEDIUM" || echo "LOW")"
  },
  "extractedCommands": [
EOF

    # Extraire les commandes importantes
    local first=true
    while IFS= read -r line; do
        if [[ $line =~ ^(HERO:|MOV\(|ψ[0-9]|BATTLE\(|CREATE\(|USE\() ]]; then
            [ "$first" = false ] && echo "," >> "$temp_json"
            echo "    \"$line\"" >> "$temp_json"
            first=false
        fi
    done < "$file"
    
    cat >> "$temp_json" << EOF
  ]
}
EOF

    echo "$temp_json"
}

# Fonction pour convertir HOTS vers JSON
hots_to_json() {
    local hots_file="$1"
    local hots_path="$HOTS_DIR/$hots_file"
    
    if [ ! -f "$hots_path" ]; then
        echo -e "${RED}❌ Fichier HOTS non trouvé: $hots_path${NC}"
        return 1
    fi
    
    echo -e "${BLUE}🔄 Conversion HOTS → JSON${NC}"
    echo "   Source: $hots_file"
    
    # Analyser le fichier HOTS
    local temp_json=$(analyze_hots_file "$hots_path")
    local json_name=$(basename "$hots_file" .hots | tr '_-' ' ' | sed 's/.*/\U&/' | tr ' ' '_').json
    local json_path="$JSON_DIR/$json_name"
    
    # Copier le JSON généré
    cp "$temp_json" "$json_path"
    rm -f "$temp_json"
    
    echo "   Destination: $json_name"
    echo -e "${GREEN}✅ Conversion réussie !${NC}"
    
    # Afficher un aperçu
    echo -e "\n📋 Aperçu du JSON généré:"
    jq -r '.scenarioName, .description, .analysis' "$json_path" 2>/dev/null || head -10 "$json_path"
}

# Fonction pour convertir JSON vers HOTS
json_to_hots() {
    local json_file="$1"
    local json_path="$JSON_DIR/$json_file"
    
    if [ ! -f "$json_path" ]; then
        echo -e "${RED}❌ Fichier JSON non trouvé: $json_path${NC}"
        return 1
    fi
    
    echo -e "${BLUE}🔄 Conversion JSON → HOTS${NC}"
    echo "   Source: $json_file"
    
    local hots_name=$(basename "$json_file" .json | tr 'A-Z' 'a-z' | tr '_' '-').hots
    local hots_path="$HOTS_DIR/$hots_name"
    
    echo "   Destination: $hots_name"
    
    # Créer le fichier HOTS basé sur le JSON
    cat > "$hots_path" << EOF
# ===============================================================================
# SCÉNARIO HEROES OF TIME - Converti depuis JSON
# ===============================================================================
# Source: $json_file
# Généré automatiquement le $(date)
# ===============================================================================

EOF

    # Extraire les informations du JSON si possible
    if command -v jq >/dev/null 2>&1; then
        # Utiliser jq pour extraire les données structurées
        local scenario_name=$(jq -r '.scenarioName // "Scénario Converti"' "$json_path")
        local description=$(jq -r '.description // "Description non disponible"' "$json_path")
        
        echo "GAME: \"$scenario_name\"" >> "$hots_path"
        echo "# $description" >> "$hots_path"
        echo "" >> "$hots_path"
        
        # Extraire les héros
        echo "# HÉROS" >> "$hots_path"
        jq -r '.heroes[]?.name // empty' "$json_path" | while read -r hero; do
            echo "HERO: $hero" >> "$hots_path"
        done 2>/dev/null
        echo "" >> "$hots_path"
        
        # Extraire les positions initiales
        echo "# POSITIONS INITIALES" >> "$hots_path"
        jq -r '.heroes[]? | "MOV(\(.name), @\(.startPosition.x // 10),\(.startPosition.y // 10))"' "$json_path" 2>/dev/null >> "$hots_path"
        echo "" >> "$hots_path"
        
        # Extraire les états temporels si disponibles
        if jq -e '.temporalStates' "$json_path" >/dev/null 2>&1; then
            echo "# ÉTATS TEMPORELS" >> "$hots_path"
            jq -r '.temporalStates[]? | .expression // empty' "$json_path" | while read -r expr; do
                echo "$expr" >> "$hots_path"
            done 2>/dev/null
            echo "" >> "$hots_path"
        fi
        
        # Extraire les commandes si disponibles
        if jq -e '.extractedCommands' "$json_path" >/dev/null 2>&1; then
            echo "# COMMANDES EXTRAITES" >> "$hots_path"
            jq -r '.extractedCommands[]? // empty' "$json_path" 2>/dev/null >> "$hots_path"
        fi
        
    else
        # Méthode de fallback sans jq
        echo "# CONVERSION BASIQUE (jq non disponible)" >> "$hots_path"
        echo "GAME: \"$(basename "$json_file" .json)\"" >> "$hots_path"
        echo "# Converti depuis $json_file" >> "$hots_path"
        echo "" >> "$hots_path"
        echo "# TODO: Ajouter manuellement les commandes spécifiques" >> "$hots_path"
    fi
    
    echo -e "${GREEN}✅ Conversion réussie !${NC}"
    echo -e "\n📋 Aperçu du HOTS généré:"
    head -20 "$hots_path"
}

# Analyser la compatibilité de tous les scénarios
analyze_compatibility() {
    echo -e "${BLUE}📊 ANALYSE DE COMPATIBILITÉ DES SCÉNARIOS${NC}"
    echo "==========================================="
    
    echo -e "\n${GREEN}📁 Scénarios HOTS disponibles:${NC}"
    if [ -d "$HOTS_DIR" ]; then
        for file in "$HOTS_DIR"/*.hots; do
            if [ -f "$file" ]; then
                local basename=$(basename "$file")
                local filesize=$(du -h "$file" | cut -f1)
                local lines=$(wc -l < "$file")
                echo "   • $basename ($filesize, $lines lignes)"
            fi
        done
    else
        echo "   ❌ Répertoire HOTS non trouvé: $HOTS_DIR"
    fi
    
    echo -e "\n${GREEN}📁 Scénarios JSON disponibles:${NC}"
    if [ -d "$JSON_DIR" ]; then
        for file in "$JSON_DIR"/*.json; do
            if [ -f "$file" ]; then
                local basename=$(basename "$file")
                local filesize=$(du -h "$file" | cut -f1)
                echo "   • $basename ($filesize)"
                
                # Analyser le contenu JSON si possible
                if command -v jq >/dev/null 2>&1; then
                    local heroes=$(jq '.heroes | length' "$file" 2>/dev/null || echo "?")
                    local temporal=$(jq '.temporalStates | length' "$file" 2>/dev/null || echo "0")
                    echo "     ↳ Héros: $heroes, États temporels: $temporal"
                fi
            fi
        done
    else
        echo "   ❌ Répertoire JSON non trouvé: $JSON_DIR"
    fi
    
    echo -e "\n${YELLOW}💡 Recommandations:${NC}"
    echo "   1. Les scénarios HOTS sont plus compacts et scriptables"
    echo "   2. Les scénarios JSON contiennent plus de métadonnées structurées"
    echo "   3. La conversion bidirectionnelle est possible mais peut perdre des détails"
    echo "   4. Utilisez HOTS pour la logique de jeu, JSON pour les interfaces"
}

# Tester la conversion bidirectionnelle
test_conversion() {
    echo -e "${BLUE}🧪 TEST DE CONVERSION BIDIRECTIONNELLE${NC}"
    echo "======================================="
    
    local test_hots="$HOTS_DIR/simple-game.hots"
    if [ ! -f "$test_hots" ]; then
        echo -e "${RED}❌ Fichier de test non trouvé: $test_hots${NC}"
        return 1
    fi
    
    echo "🔄 Test HOTS → JSON → HOTS"
    
    # Étape 1: HOTS vers JSON
    echo "   Étape 1: Conversion HOTS vers JSON..."
    hots_to_json "simple-game.hots" > /dev/null
    
    # Étape 2: JSON vers HOTS
    echo "   Étape 2: Conversion JSON vers HOTS..."
    json_to_hots "SIMPLE_GAME.json" > /dev/null
    
    # Comparaison
    local original="$HOTS_DIR/simple-game.hots"
    local converted="$HOTS_DIR/simple-game.hots"
    
    echo -e "   ${GREEN}✅ Test de conversion bidirectionnelle terminé${NC}"
    echo "   📝 Vérifiez manuellement la cohérence des fichiers générés"
}

# Point d'entrée principal
case "$1" in
    "hots-to-json")
        if [ -z "$2" ]; then
            echo -e "${RED}❌ Nom du fichier HOTS requis${NC}"
            usage
            exit 1
        fi
        hots_to_json "$2"
        ;;
    "json-to-hots")
        if [ -z "$2" ]; then
            echo -e "${RED}❌ Nom du fichier JSON requis${NC}"
            usage
            exit 1
        fi
        json_to_hots "$2"
        ;;
    "analyze-compatibility")
        analyze_compatibility
        ;;
    "test-conversion")
        test_conversion
        ;;
    *)
        usage
        exit 1
        ;;
esac 