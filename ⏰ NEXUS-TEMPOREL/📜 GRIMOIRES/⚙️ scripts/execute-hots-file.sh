#!/bin/bash

# Script générique pour exécuter un fichier HOTS ligne par ligne
# Usage: ./execute-hots-file.sh <fichier.hots> [game_id]

echo "📜 EXÉCUTEUR DE FICHIERS HOTS"
echo "============================="

# Vérifier les arguments
if [ $# -lt 1 ]; then
    echo "Usage: $0 <fichier.hots> [game_id]"
    echo "Exemple: $0 🎮 game_assets/scenarios/hots/panopticon_axis_test.hots"
    exit 1
fi

HOTS_FILE=$1
GAME_ID=${2:-1}
HOST="localhost:8080"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

# Vérifier que le fichier existe
if [ ! -f "$HOTS_FILE" ]; then
    echo -e "${RED}❌ Fichier non trouvé: $HOTS_FILE${NC}"
    exit 1
fi

echo -e "${BLUE}📂 Fichier: $HOTS_FILE${NC}"
echo -e "${BLUE}🎮 Game ID: $GAME_ID${NC}"

# Statistiques
LINE_COUNT=0
SUCCESS_COUNT=0
FAIL_COUNT=0
SKIP_COUNT=0

# Fonction pour exécuter une ligne HOTS
execute_line() {
    local line=$1
    local line_num=$2
    
    # Ignorer les lignes vides et commentaires
    if [[ -z "$line" ]] || [[ "$line" =~ ^[[:space:]]*$ ]] || [[ "$line" =~ ^[[:space:]]*# ]]; then
        SKIP_COUNT=$((SKIP_COUNT + 1))
        return
    fi
    
    LINE_COUNT=$((LINE_COUNT + 1))
    echo -e "\n${YELLOW}[Ligne $line_num]${NC} $line"
    
    # Envoyer au backend
    response=$(curl -s -X POST "http://$HOST/api/temporal/execute/$GAME_ID" \
        -H "Content-Type: application/json" \
        -d "{\"script\":\"$line\"}" 2>&1)
    
    # Vérifier le succès
    if echo "$response" | jq -e '.success == true' > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Succès${NC}"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
        
        # Afficher des infos supplémentaires pour certaines commandes
        if [[ "$line" =~ ^ψ ]]; then
            echo -e "${BLUE}→ État quantique créé${NC}"
        elif [[ "$line" =~ ^HERO ]]; then
            echo -e "${BLUE}→ Héros créé${NC}"
        elif [[ "$line" =~ ^[Σ†Ω↯] ]]; then
            echo -e "${BLUE}→ Symbole GROFI exécuté${NC}"
        fi
    else
        echo -e "${RED}❌ Échec${NC}"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        
        # Afficher l'erreur
        error=$(echo "$response" | jq -r '.error // "Erreur inconnue"' 2>/dev/null)
        echo -e "${RED}Erreur: $error${NC}"
    fi
    
    # Petit délai pour ne pas surcharger
    sleep 0.2
}

# Créer une partie si nécessaire
if [ "$GAME_ID" = "1" ]; then
    echo -e "\n${GREEN}=== CRÉATION DE LA PARTIE ===${NC}"
    response=$(curl -s -X POST "http://$HOST/api/games" \
        -H "Content-Type: application/json" \
        -d '{"gameName":"Exécution HOTS","players":["Jean","Claude"]}')
    
    new_game_id=$(echo "$response" | jq -r '.id // .gameId // 1')
    if [ "$new_game_id" != "null" ] && [ "$new_game_id" != "1" ]; then
        GAME_ID=$new_game_id
        echo -e "${GREEN}✅ Partie créée avec ID: $GAME_ID${NC}"
    fi
fi

echo -e "\n${GREEN}=== EXÉCUTION DU FICHIER ===${NC}"

# Lire et exécuter le fichier ligne par ligne
line_num=0
while IFS= read -r line; do
    line_num=$((line_num + 1))
    execute_line "$line" "$line_num"
done < "$HOTS_FILE"

echo -e "\n${GREEN}=== RÉSUMÉ ===${NC}"
echo "📊 Statistiques d'exécution:"
echo "- Lignes totales: $line_num"
echo "- Commandes exécutées: $LINE_COUNT"
echo -e "- ${GREEN}Succès: $SUCCESS_COUNT${NC}"
echo -e "- ${RED}Échecs: $FAIL_COUNT${NC}"
echo "- Ignorées (vides/commentaires): $SKIP_COUNT"

# Afficher l'état final du jeu
echo -e "\n${GREEN}=== ÉTAT FINAL DU JEU ===${NC}"
state=$(curl -s "http://$HOST/api/temporal/state/$GAME_ID")

echo -e "${BLUE}Héros:${NC}"
echo "$state" | jq -r '.heroes[] | "- \(.name) en (\(.position.x),\(.position.y))"'

echo -e "\n${BLUE}États quantiques:${NC}"
echo "$state" | jq -r '.quantumStates[] | "- \(.quantumStateId): \(.expression)"'

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "\n${GREEN}✅ Exécution complète réussie !${NC}"
else
    echo -e "\n${YELLOW}⚠️  Exécution terminée avec $FAIL_COUNT erreurs${NC}"
fi

echo -e "\n📜 Fichier HOTS exécuté avec succès ! 📜\n" 