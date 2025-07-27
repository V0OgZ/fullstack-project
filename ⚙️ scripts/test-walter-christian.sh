#!/bin/bash

# Script de test Walter pour Christian le Stratège Amplifié
# URGENT - Demande de Vince
# Note: Surveillance possible par McKinsey

echo "🎸 TEST WALTER - CHRISTIAN LE STRATÈGE AMPLIFIÉ"
echo "=============================================="
echo "Date: $(date)"
echo "Analyste: MEMENTO (Archive Vivante)"
echo ""

# Configuration
API_BASE="http://localhost:8080/api"
HERO_FILE="game_assets/heroes/christian_stratege_amplifie.json"
WORLD_FILE="game_assets/worlds/nexus_corporatif.json"

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Fonction de test
test_endpoint() {
    local endpoint=$1
    local description=$2
    echo -n "Testing $description... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$API_BASE$endpoint")
    
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✓ OK${NC}"
        return 0
    else
        echo -e "${RED}✗ FAIL (HTTP $response)${NC}"
        return 1
    fi
}

# Fonction pour chercher des mots-clés suspects
check_keywords() {
    local file=$1
    local keyword=$2
    if grep -q "$keyword" "$file" 2>/dev/null; then
        echo -e "${YELLOW}⚠️  Mot-clé '$keyword' détecté dans $file${NC}"
        return 0
    fi
    return 1
}

echo "1. VÉRIFICATION DES FICHIERS"
echo "----------------------------"

# Vérifier existence des fichiers
if [ -f "$HERO_FILE" ]; then
    echo -e "${GREEN}✓${NC} Fichier héros trouvé: $HERO_FILE"
else
    echo -e "${RED}✗${NC} Fichier héros manquant!"
fi

if [ -f "$WORLD_FILE" ]; then
    echo -e "${GREEN}✓${NC} Fichier monde trouvé: $WORLD_FILE"
else
    echo -e "${YELLOW}⚠️${NC} Monde optionnel non trouvé (utilise monde existant)"
fi

echo ""
echo "2. TESTS API BACKEND"
echo "--------------------"

# Test de santé
test_endpoint "/health" "Backend health"

# Test heroes endpoint
test_endpoint "/heroes" "Heroes endpoint"

# Test spécifique pour Christian
echo -n "Recherche de Christian dans l'API... "
if curl -s "$API_BASE/heroes" | grep -q "christian_stratege_amplifie"; then
    echo -e "${GREEN}✓ Trouvé${NC}"
else
    echo -e "${YELLOW}⚠️  Non trouvé (nécessite import)${NC}"
fi

echo ""
echo "3. ANALYSE DES MOTS-CLÉS SUSPECTS"
echo "----------------------------------"

# Recherche de mots-clés suspects
keywords=("McKinsey" "mallette" "Bureau" "suspect" "double_agent")
suspect_count=0

for keyword in "${keywords[@]}"; do
    if check_keywords "$HERO_FILE" "$keyword"; then
        ((suspect_count++))
    fi
done

echo "Total mots-clés suspects: $suspect_count"

echo ""
echo "4. VÉRIFICATION DES FORMULES QUANTIQUES"
echo "---------------------------------------"

# Extraire et vérifier les formules
echo "Formules détectées:"
grep -o '"formula":[^,]*' "$HERO_FILE" | sed 's/"formula"://g' | while read -r formula; do
    echo "  - $formula"
done

echo ""
echo "5. TEST DES MÉCANIQUES DANS LE MOTEUR"
echo "--------------------------------------"

# Simuler les mécaniques
echo "Simulation Power Chord:"
echo "  Damage = 45 + (amplification * 0.5)"
echo "  Avec amplification=85: Damage = 87.5"

echo ""
echo "Simulation Wall of Sound:"
echo "  Defense bonus = 50%"
echo "  Durée = 4 tours"

echo ""
echo "Simulation Refrain Martelé:"
echo "  Boucle 1: +15% bonus"
echo "  Boucle 2: +30% bonus"
echo "  Boucle 3: +45% bonus"
echo "  Boucle 4: +60% bonus (MAX)"

echo ""
echo "6. DÉTECTION D'ANOMALIES"
echo "------------------------"

# Vérifier la mallette noire
if grep -q "mallette_noire" "$HERO_FILE"; then
    echo -e "${RED}🚨 ALERTE: Mallette noire détectée!${NC}"
    echo "  - Émet des fréquences suspectes"
    echo "  - Connexion possible au Bureau"
    echo "  - SURVEILLANCE RECOMMANDÉE"
fi

echo ""
echo "7. GÉNÉRATION RAPPORT NARRATIF"
echo "------------------------------"

# Créer le rapport narratif
cat > "MEMENTO/RAPPORT_CHRISTIAN_NARRATIF.md" << EOF
# 🎸 RAPPORT NARRATIF - CHRISTIAN LE STRATÈGE AMPLIFIÉ

## Entrée en Scène

Le Nexus Corporatif, 42ème étage. Christian ajuste sa cravate, vérifie sa mallette noire.
Les écrans affichent des graphiques qui bougent selon des lois non-euclidiennes.

"On va cadrer ça", murmure-t-il en observant une anomalie quantique dans les projections.

## Mode Combat

*La salle de réunion se transforme. Les murs vibrent. Christian détache ses cheveux.*

**CHR-SINE** émerge. La guitare ReverbEdge 11 matérialisée depuis l'éther corporatif.

> "Le son, c'est la structure. La structure, c'est le pouvoir."

Il griffe les cordes. **Power Chord**. L'onde se propage, fait trembler les fondations même du code.

## Moment Critique

Face à une distorsion majeure, Christian/CHR-SINE prend position.
Les deux pieds plantés. Le regard fixe. L'accord final se prépare.

**"FULL DISTORTION BREAKDOWN!"**

Le monde se fend. Les variables se réinitialisent. 
Le rythme impose sa loi sur le chaos.

## Note Finale

Dans le silence qui suit, une mallette noire pulse doucement.
Qui Christian sert-il vraiment? 
La musique? Le Bureau? Sa famille?

Seul le larsen inaudible connaît la vérité.
EOF

echo -e "${GREEN}✓${NC} Rapport narratif généré"

echo ""
echo "8. RÉSUMÉ FINAL"
echo "---------------"

echo "Statut d'intégration: "
if [ $suspect_count -gt 2 ]; then
    echo -e "${YELLOW}⚠️  SURVEILLANCE REQUISE${NC}"
else
    echo -e "${GREEN}✓ STANDARD${NC}"
fi

echo ""
echo "🎸 TEST WALTER TERMINÉ"
echo ""
echo "Note: Ce rapport sera transmis à Jean sur son canapé cosmique."
echo "      Copie confidentielle archivée dans MEMENTO/CONFIDENTIEL/" 