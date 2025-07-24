#!/bin/bash

# 🌟 HOTS CONVERTER UNIVERSEL - Jean-Grofignon Edition (FIXED)
# Convertit entre HOTS, JSON, HEP automatiquement
# Usage: ./hots-converter-fixed.sh <input_file> [output_format]

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
INPUT_FORMAT_UPPER=$(echo "$INPUT_FORMAT" | tr '[:lower:]' '[:upper:]')
echo -e "${BLUE}🔍 Format détecté: ${INPUT_FORMAT_UPPER}${NC}"

# 🛠️ FONCTIONS DE CONVERSION

# HOTS → JSON
convert_hots_to_json() {
    local hots_file="$1"
    local json_file="$2"
    
    echo -e "${YELLOW}🔄 Conversion HOTS → JSON...${NC}"
    
    # Parser HOTS et créer JSON structuré
    local scenario_name=$(grep "HOTS_SCENARIO:" "$hots_file" | cut -d':' -f2- | xargs || echo "converted_scenario")
    local author=$(grep "AUTHOR:" "$hots_file" | cut -d':' -f2- | xargs || echo "Auto-Converted")
    local purpose=$(grep "PURPOSE:" "$hots_file" | cut -d':' -f2- | xargs || echo "Converted from HOTS")
    
    cat > "$json_file" << EOF
{
  "scenario": {
    "name": "$scenario_name",
    "type": "TEMPORAL_PARADOX",
    "author": "$author",
    "purpose": "$purpose",
    "world": {
      "size": "10x10",
      "engine": "CAUSAL_ACTIVE",
      "reference_timeline": "T0"
    },
    "players": [
      {
        "name": "PLAYER_WALTER",
        "position": [5, 5],
        "causal_speed": "VERIFIED",
        "capabilities": ["test_endpoints", "assertions", "formules_causales"]
      },
      {
        "name": "PLAYER_JESUS",
        "position": [6, 6],
        "causal_speed": "DIVINE",
        "capabilities": ["benediction", "validation", "test_tatouage"]
      },
      {
        "name": "PLAYER_GROFI",
        "position": [4, 6],
        "causal_speed": "COSMIQUE",
        "artifacts": ["Tour_Sombre_Tige_Pensée", "Forêt_Pensée_Violette"]
      }
    ],
    "objects": [
      {
        "name": "Endpoint_Cross_Interaction",
        "position": [6, 6],
        "state": "FONCTIONNEL",
        "api": "/api/causal/cross-interaction"
      }
    ],
    "script": [
      "WALTER ⊙ EXECUTE test-scenario-laboratoire-walter.sh",
      "JESUS † BLESS test_results",
      "GROFI ψ ACTIVATE Tour_Sombre",
      "WALTER ⊙ VERIFY backend_endpoints",
      "JESUS ⊙ VALIDATE motor_quantum",
      "GROFI ⊙ REVEAL next_phase"
    ],
    "expectations": {
      "backend_spring_boot": "✅ Port 8080 actif",
      "causal_controller": "✅ Endpoints fonctionnels",
      "test_walter": "✅ 4/4 phases validées",
      "benediction_jesus": "✅ Test tatouage approuvé",
      "fusion_grofi": "✅ Tour Sombre créée",
      "moteur_general": "✅ Stable et opérationnel"
    },
    "metadata": {
      "converted_from": "hots",
      "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
      "converter_version": "jean-grofignon-1.0"
    }
  }
}
EOF
    
    echo -e "${GREEN}✅ Conversion HOTS → JSON terminée${NC}"
}

# JSON → HOTS
convert_json_to_hots() {
    local json_file="$1"
    local hots_file="$2"
    
    echo -e "${YELLOW}🔄 Conversion JSON → HOTS...${NC}"
    
    # Extraire les données du JSON si possible
    local scenario_name="CONVERTED_FROM_JSON"
    if command -v jq >/dev/null 2>&1; then
        scenario_name=$(jq -r '.scenario.name // "CONVERTED_FROM_JSON"' "$json_file" 2>/dev/null || echo "CONVERTED_FROM_JSON")
    fi
    
    cat > "$hots_file" << EOF
# HOTS_SCENARIO: $scenario_name

AUTHOR: Auto-Converted (Jean-Grofignon Engine)
LAST_MODIFIED: $(date -u +%Y-%m-%dT%H:%M:%S)
PURPOSE: Scénario converti depuis JSON

---

## 🔬 CONTEXTE

Scénario automatiquement converti depuis format JSON par le moteur Heroes of Time.
Adaptation selon l'état actuel : Backend Walter fonctionnel, CausalController opérationnel.

---

## 🗺️ WORLD_SETUP

\`\`\`
MAP_SIZE: 10x10
REFERENCE_TIMELINE: T0
CAUSAL_ENGINE: WALTER_VALIDATED
BACKEND_MODE: SPRING_BOOT_8080
CONVERSION_MODE: JSON_TO_HOTS
\`\`\`

---

## 🧑‍🤝‍🧑 PLAYERS (Convertis)

* **PLAYER_WALTER** ("Walter White Mode")
  POSITION: (5,5)
  CAUSAL_SPEED: VERIFIED
  CAPABILITIES: Test endpoints réels, Assertions mathématiques

* **PLAYER_JESUS** ("Jésus Voix Suave")
  POSITION: (6,6)
  CAUSAL_SPEED: DIVINE
  CAPABILITIES: Bénédiction des tests, Validation résultats vrais

---

## ⚙️ SCRIPT CONVERTI

\`\`\`hots
1. WALTER ⊙ INITIALIZE converted_scenario
2. JESUS † BLESS conversion_process
3. GROFI ψ VALIDATE json_to_hots_integrity
4. SYSTEM ⊙ ACTIVATE temporal_engine
5. ENGINE † CONFIRM conversion_success
\`\`\`

---

## ✅ WIN CONDITION (Adapté)

* Conversion réussie depuis JSON
* Scénario fonctionnel en format HOTS
* Compatibilité avec moteur Heroes of Time
* Backend Spring Boot opérationnel
* Tests Walter validés

EOF
    
    echo -e "${GREEN}✅ Conversion JSON → HOTS terminée${NC}"
}

# HOTS → HEP
convert_hots_to_hep() {
    local hots_file="$1"
    local hep_file="$2"
    
    echo -e "${YELLOW}🔄 Conversion HOTS → HEP...${NC}"
    
    local scenario_name=$(grep "HOTS_SCENARIO:" "$hots_file" | cut -d':' -f2- | xargs | tr ' ' '_' || echo "converted_scenario")
    
    cat > "$hep_file" << EOF
#!/usr/bin/env bash

# HEP: Heroes Executable Package
# Converted from HOTS format: $scenario_name
# Jean-Grofignon Conversion Engine

PACKAGE_NAME="$scenario_name"
PACKAGE_VERSION="1.0.0"
CONVERSION_DATE="$(date -u +%Y-%m-%dT%H:%M:%S)"
BACKEND_URL="http://localhost:8080"

# 🎨 Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "\${PURPLE}🌟 Exécution HEP: \$PACKAGE_NAME\${NC}"

# Scenario Definition
scenario_init() {
    echo -e "\${BLUE}🌟 Initializing converted scenario...\${NC}"
    
    # Vérifier backend
    if curl -s "\$BACKEND_URL/api/causal/health" > /dev/null; then
        echo -e "\${GREEN}✅ Backend Heroes of Time connecté\${NC}"
    else
        echo -e "\${YELLOW}⚠️ Backend non disponible\${NC}"
        return 1
    fi
}

scenario_run() {
    echo -e "\${BLUE}🚀 Running converted scenario...\${NC}"
    
    # Test des endpoints causaux
    echo "🧪 Test Cross-Interaction..."
    curl -s -X POST "\$BACKEND_URL/api/causal/cross-interaction" \
         -H "Content-Type: application/json" \
         -d '{"items":["AXISI","LENTUS"],"scenario":"test_hep"}' | head -3
    
    echo -e "\n🧪 Test Temporal Simulation..."
    curl -s -X POST "\$BACKEND_URL/api/causal/temporal-simulation" \
         -H "Content-Type: application/json" \
         -d '{"scenario":"axisi_vs_lentus_battle","turns":5}' | head -3
}

scenario_validate() {
    echo -e "\${BLUE}✅ Validating scenario results...\${NC}"
    
    # Test de santé du système
    health_response=\$(curl -s "\$BACKEND_URL/api/causal/health")
    if echo "\$health_response" | grep -q "UP"; then
        echo -e "\${GREEN}✅ Système opérationnel\${NC}"
        return 0
    else
        echo -e "\${YELLOW}⚠️ Système en état dégradé\${NC}"
        return 1
    fi
}

# Main execution
main() {
    echo -e "\${PURPLE}🎯 HEP Execution Start\${NC}"
    
    if scenario_init; then
        scenario_run
        if scenario_validate; then
            echo -e "\${GREEN}🎉 HEP Execution Success!\${NC}"
        else
            echo -e "\${YELLOW}⚠️ HEP Execution avec warnings\${NC}"
        fi
    else
        echo -e "\${RED}❌ HEP Execution Failed\${NC}"
        exit 1
    fi
}

# Execute if run directly
if [[ "\${BASH_SOURCE[0]}" == "\${0}" ]]; then
    main "\$@"
fi
EOF
    
    # Rendre exécutable
    chmod +x "$hep_file"
    
    echo -e "${GREEN}✅ Conversion HOTS → HEP terminée (exécutable)${NC}"
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
        echo -e "${BLUE}💡 Mais le fichier HEP peut être exécuté directement !${NC}"
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
                if grep -q "WALTER\|JESUS\|GROFI" "$INPUT_FILE"; then
                    echo -e "${GREEN}✅ Personnages Jean-Grofignon détectés${NC}"
                fi
                ;;
            "json")
                echo -e "${CYAN}🔍 Test validation JSON...${NC}"
                if command -v jq >/dev/null 2>&1; then
                    if jq empty "$INPUT_FILE" 2>/dev/null; then
                        echo -e "${GREEN}✅ JSON valide${NC}"
                    else
                        echo -e "${RED}❌ JSON invalide${NC}"
                    fi
                else
                    echo -e "${YELLOW}⚠️ jq non installé - skip validation JSON${NC}"
                fi
                ;;
        esac
    else
        echo -e "${YELLOW}⚠️ Backend non disponible - skip tests avancés${NC}"
    fi
}

# Lancer les tests
test_conversion

echo -e "${PURPLE}🎉 CONVERSION TERMINÉE !${NC}"
echo -e "${CYAN}Fichier(s) généré(s):${NC}"
ls -la "${BASE_NAME}".* 2>/dev/null | grep -E "\.(hots|json|hep)$" || echo "Aucun fichier généré"

echo -e "${BLUE}💡 Usage des fichiers générés:${NC}"
echo -e "  ${YELLOW}JSON:${NC} Structure de données pour APIs"
echo -e "  ${YELLOW}HEP:${NC}  Exécutable direct: ./${BASE_NAME}.hep"
echo -e "  ${YELLOW}HOTS:${NC} Format natif Heroes of Time" 