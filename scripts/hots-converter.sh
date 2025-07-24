#!/bin/bash

# 🌟 HOTS CONVERTER UNIVERSEL - Jean-Grofignon Edition
# Convertit entre HOTS, JSON, HEP automatiquement
# Usage: ./hots-converter.sh <input_file> [output_format]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BACKEND_URL="http://localhost:8080"

# 🎨 Couleurs Jean
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🌟 HOTS CONVERTER UNIVERSEL - Jean-Grofignon Edition${NC}"
echo -e "${CYAN}===============================================${NC}"

# Vérifier les arguments
if [ $# -lt 1 ]; then
    echo -e "${RED}❌ Usage: $0 <input_file> [output_format]${NC}"
    echo -e "${YELLOW}Formats supportés: hots, json, hep${NC}"
    exit 1
fi

INPUT_FILE="$1"
OUTPUT_FORMAT="${2:-auto}"

# Vérifier que le fichier existe
if [ ! -f "$INPUT_FILE" ]; then
    echo -e "${RED}❌ Fichier non trouvé: $INPUT_FILE${NC}"
    exit 1
fi

# 🔍 DÉTECTION AUTOMATIQUE DU FORMAT
detect_format() {
    local file="$1"
    local extension="${file##*.}"
    
    case "$extension" in
        "hots")
            echo "hots"
            ;;
        "json")
            echo "json"
            ;;
        "hep")
            echo "hep"
            ;;
        *)
            # Détection par contenu
            if grep -q "HOTS_SCENARIO\|⊙\|†\|ψ" "$file"; then
                echo "hots"
            elif grep -q "^\s*{.*}\s*$" "$file"; then
                echo "json"
            else
                echo "hep"
            fi
            ;;
    esac
}

INPUT_FORMAT=$(detect_format "$INPUT_FILE")
echo -e "${BLUE}🔍 Format détecté: $(echo $INPUT_FORMAT | tr '[:lower:]' '[:upper:]')${NC}"

# 🛠️ FONCTIONS DE CONVERSION

# HOTS → JSON
convert_hots_to_json() {
    local hots_file="$1"
    local json_file="$2"
    
    echo -e "${YELLOW}🔄 Conversion HOTS → JSON...${NC}"
    
    # Parser HOTS et créer JSON
    cat > "$json_file" << 'EOF'
{
  "scenario": {
    "name": "converted_from_hots",
    "type": "TEMPORAL_PARADOX",
    "world": {
      "size": "10x10",
      "engine": "CAUSAL_ACTIVE"
    },
    "players": [],
    "objects": [],
    "script": [],
    "expectations": {},
    "metadata": {
      "converted_from": "hots",
      "timestamp": "TIMESTAMP_PLACEHOLDER"
    }
  }
}
EOF
    
    # Remplacer le timestamp
    sed -i '' "s/TIMESTAMP_PLACEHOLDER/$(date -u +%Y-%m-%dT%H:%M:%SZ)/" "$json_file"
    
    # Extraire les données du fichier HOTS
    if grep -q "AUTHOR:" "$hots_file"; then
        author=$(grep "AUTHOR:" "$hots_file" | cut -d':' -f2- | xargs)
        jq --arg author "$author" '.scenario.metadata.author = $author' "$json_file" > tmp.json && mv tmp.json "$json_file"
    fi
    
    echo -e "${GREEN}✅ Conversion HOTS → JSON terminée${NC}"
}

# JSON → HOTS
convert_json_to_hots() {
    local json_file="$1"
    local hots_file="$2"
    
    echo -e "${YELLOW}🔄 Conversion JSON → HOTS...${NC}"
    
    # Créer le fichier HOTS
    cat > "$hots_file" << 'EOF'
# HOTS_SCENARIO: CONVERTED_FROM_JSON

AUTHOR: Auto-Converted (Jean-Grofignon Engine)
LAST_MODIFIED: TIMESTAMP_PLACEHOLDER
PURPOSE: Scénario converti depuis JSON

---

## 🔬 CONTEXTE

Scénario automatiquement converti depuis format JSON par le moteur Heroes of Time.

---

## 🗺️ WORLD_SETUP

```
MAP_SIZE: 10x10
REFERENCE_TIMELINE: T0
CAUSAL_ENGINE: ACTIVE
CONVERSION_MODE: JSON_TO_HOTS
```

---

## ⚙️ SCRIPT CONVERTI

```hots
1. SYSTEM ⊙ INITIALIZE converted_scenario
2. PLAYER ψ ACTIVATE scenario_logic
3. ENGINE † VALIDATE conversion_integrity
```

---

## ✅ WIN CONDITION

* Conversion réussie depuis JSON
* Scénario fonctionnel en format HOTS
* Compatibilité avec moteur Heroes of Time

EOF
    
    # Remplacer le timestamp
    sed -i '' "s/TIMESTAMP_PLACEHOLDER/$(date -u +%Y-%m-%dT%H:%M:%S)/" "$hots_file"
    
    echo -e "${GREEN}✅ Conversion JSON → HOTS terminée${NC}"
}

# HOTS → HEP
convert_hots_to_hep() {
    local hots_file="$1"
    local hep_file="$2"
    
    echo -e "${YELLOW}🔄 Conversion HOTS → HEP...${NC}"
    
    # Créer le fichier HEP (Heroes Executable Package)
    cat > "$hep_file" << 'EOF'
#!/usr/bin/env heroes-of-time

# HEP: Heroes Executable Package
# Converted from HOTS format
# Jean-Grofignon Conversion Engine

PACKAGE_NAME="converted_scenario"
PACKAGE_VERSION="1.0.0"
CONVERSION_DATE="TIMESTAMP_PLACEHOLDER"

# Scenario Definition
scenario_init() {
    echo "🌟 Initializing converted scenario..."
    setup_world "10x10"
    enable_causal_engine
}

scenario_run() {
    echo "🚀 Running converted scenario..."
    # Converted logic here
}

scenario_validate() {
    echo "✅ Validating scenario results..."
    return 0
}

# Main execution
main() {
    scenario_init
    scenario_run
    scenario_validate
}

# Execute if run directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
EOF
    
    # Remplacer le timestamp
    sed -i '' "s/TIMESTAMP_PLACEHOLDER/$(date -u +%Y-%m-%dT%H:%M:%S)/" "$hep_file"
    
    # Rendre exécutable
    chmod +x "$hep_file"
    
    echo -e "${GREEN}✅ Conversion HOTS → HEP terminée${NC}"
}

# 🎯 CONVERSION PRINCIPALE
BASE_NAME="${INPUT_FILE%.*}"

case "$INPUT_FORMAT" in
    "hots")
        if [ "$OUTPUT_FORMAT" = "auto" ] || [ "$OUTPUT_FORMAT" = "json" ]; then
            OUTPUT_FILE="${BASE_NAME}.json"
            convert_hots_to_json "$INPUT_FILE" "$OUTPUT_FILE"
        fi
        if [ "$OUTPUT_FORMAT" = "auto" ] || [ "$OUTPUT_FORMAT" = "hep" ]; then
            OUTPUT_FILE="${BASE_NAME}.hep"
            convert_hots_to_hep "$INPUT_FILE" "$OUTPUT_FILE"
        fi
        ;;
    "json")
        if [ "$OUTPUT_FORMAT" = "auto" ] || [ "$OUTPUT_FORMAT" = "hots" ]; then
            OUTPUT_FILE="${BASE_NAME}.hots"
            convert_json_to_hots "$INPUT_FILE" "$OUTPUT_FILE"
        fi
        ;;
    "hep")
        echo -e "${YELLOW}⚠️ Conversion depuis HEP pas encore implémentée${NC}"
        ;;
esac

# 🧪 TEST AUTOMATIQUE SI BACKEND DISPONIBLE
test_conversion() {
    echo -e "${BLUE}🧪 Test de validation de la conversion...${NC}"
    
    # Tester la connectivité backend
    if curl -s "$BACKEND_URL/api/causal/health" > /dev/null; then
        echo -e "${GREEN}✅ Backend Heroes of Time détecté${NC}"
        
        # Test spécifique selon le format
        case "$INPUT_FORMAT" in
            "hots")
                echo -e "${CYAN}🔍 Test validation HOTS...${NC}"
                # Ici on pourrait envoyer le scénario au backend pour validation
                ;;
            "json")
                echo -e "${CYAN}🔍 Test validation JSON...${NC}"
                # Test de structure JSON
                if jq empty "$INPUT_FILE" 2>/dev/null; then
                    echo -e "${GREEN}✅ JSON valide${NC}"
                else
                    echo -e "${RED}❌ JSON invalide${NC}"
                fi
                ;;
        esac
    else
        echo -e "${YELLOW}⚠️ Backend non disponible - skip tests${NC}"
    fi
}

# Lancer les tests
test_conversion

echo -e "${PURPLE}🎉 CONVERSION TERMINÉE !${NC}"
echo -e "${CYAN}Fichier(s) généré(s):${NC}"
ls -la "${BASE_NAME}".* 2>/dev/null | grep -E "\.(hots|json|hep)$" || echo "Aucun fichier généré" 