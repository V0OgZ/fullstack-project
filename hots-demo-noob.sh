#!/bin/bash
# 🎮 HOTS DEMO NOOB - Jean's Balcon Edition
# =========================================
# Script de démonstration ultra-simple pour joueurs lambda
# Utilise les formules simples et montre les animations

echo "🎮 HEROES OF TIME - DEMO POUR NOOBS"
echo "===================================="
echo "🛋️ Jean-Grofignon: 'Demo depuis mon canapé pour les joueurs lambda !'"
echo ""

# Couleurs pour le terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour attendre une touche
wait_for_key() {
    echo -e "${YELLOW}🎯 Appuyez sur ENTRÉE pour continuer...${NC}"
    read -r
}

# Fonction pour tester une formule
test_formula() {
    local formula=$1
    local description=$2
    
    echo -e "${BLUE}🔮 TEST: $description${NC}"
    echo "📝 Formule: $formula"
    echo ""
    
    # Appel API avec curl
    echo "🌐 Envoi de la formule au moteur..."
    response=$(curl -s -X POST http://localhost:8080/api/magic-formulas/execute \
        -H 'Content-Type: application/json' \
        -d "{\"formula\":\"$formula\",\"context\":{\"gameId\":\"demo-noob\"}}")
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Formule exécutée avec succès !${NC}"
        
        # Extraire le message de succès (version simple)
        success=$(echo "$response" | grep -o '"success":[^,]*' | cut -d':' -f2)
        message=$(echo "$response" | grep -o '"message":"[^"]*' | cut -d'"' -f4)
        
        if [[ "$success" == "true" ]]; then
            echo -e "${GREEN}🎉 Résultat: $message${NC}"
        else
            echo -e "${RED}❌ Erreur: $message${NC}"
        fi
    else
        echo -e "${RED}❌ Erreur de connexion au serveur${NC}"
        echo "🔧 Vérifiez que le serveur est lancé avec: ./hots start"
    fi
    
    echo ""
    wait_for_key
}

# Vérifier que le serveur est lancé
echo "🔍 Vérification du serveur..."
if ! curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
    echo -e "${RED}❌ Serveur non accessible !${NC}"
    echo "🚀 Lancez d'abord: ./hots start"
    echo "⏰ Puis attendez quelques secondes et relancez cette démo"
    exit 1
fi

echo -e "${GREEN}✅ Serveur Heroes of Time détecté !${NC}"
echo ""
wait_for_key

# DEMO 1: Soins
echo "🎯 === DÉMO 1: SOIGNER TON HÉROS ==="
echo "🛋️ Jean: 'Commençons par le plus simple: soigner !'"
echo ""
test_formula "HEAL_HERO" "Soigner le héros (récupère de la vie)"

# DEMO 2: Téléportation
echo "🎯 === DÉMO 2: TÉLÉPORTATION ==="
echo "🛋️ Jean: 'Maintenant, téléportons-nous !'"
echo ""
test_formula "TELEPORT_HERO" "Téléporter le héros (change de position)"

# DEMO 3: Énergie
echo "🎯 === DÉMO 3: MODIFIER L'ÉNERGIE ==="
echo "🛋️ Jean: 'Gérons notre énergie magique !'"
echo ""
test_formula "MODIFY_ENERGY" "Modifier l'énergie du héros"

# DEMO 4: Construction
echo "🎯 === DÉMO 4: CONSTRUIRE UN BÂTIMENT ==="
echo "🛋️ Jean: 'Créons quelque chose dans notre monde !'"
echo ""
test_formula "CREATE_BUILDING" "Construire un nouveau bâtiment"

# DEMO 5: Formule Runique Simple
echo "🎯 === DÉMO 5: PREMIÈRE FORMULE RUNIQUE ==="
echo "🛋️ Jean: 'Prêt pour une formule avec des symboles ? C'est facile !'"
echo "🔮 Explication: ψ001 = Sort numéro 1, ⊙ = Prépare, HEAL_HERO = Soigne"
echo ""
test_formula "ψ001: ⊙(HEAL_HERO)" "Formule runique de soin (version débutant)"

# DEMO 6: Formule JSON Simple
echo "🎯 === DÉMO 6: FORMULE JSON ASSET ==="
echo "🛋️ Jean: 'Les objets ont aussi des effets magiques !'"
echo "📜 Explication: paradoxRisk = Risque de paradoxe temporel"
echo ""
test_formula "paradoxRisk: 0.3, temporalStability: 0.8" "Analyser un objet magique"

# Conclusion
echo "🎉 === DÉMO TERMINÉE ! ==="
echo "🛋️ Jean-Grofignon: 'Bravo ! Tu as testé 6 formules différentes !'"
echo ""
echo "📚 RÉCAPITULATIF DE CE QUE TU AS APPRIS :"
echo "✅ HEAL_HERO - Soigne ton héros"
echo "✅ TELEPORT_HERO - Téléporte ton héros" 
echo "✅ MODIFY_ENERGY - Change ton énergie"
echo "✅ CREATE_BUILDING - Construit un bâtiment"
echo "✅ ψ001: ⊙(HEAL_HERO) - Formule runique de soin"
echo "✅ paradoxRisk: 0.3 - Analyse d'objet JSON"
echo ""
echo "🎮 PROCHAINES ÉTAPES :"
echo "1. 🌐 Ouvre http://localhost:8000 pour l'interface graphique"
echo "2. 📚 Lis docs/GAMEPLAY_POUR_LES_NOOBS_LAMBDA.md"
echo "3. 🧪 Teste d'autres formules dans l'interface"
echo "4. 🎯 Progresse vers les formules plus avancées"
echo ""
echo "🛋️ Jean: 'Depuis mon canapé, je suis fier de toi ! Tu es prêt à jouer !'"
echo ""
echo "🔗 LIENS UTILES :"
echo "📊 Dashboard: http://localhost:9000/dashboard.html"
echo "🎮 Interface Principale: http://localhost:8000"
echo "🔬 Quantum Visualizer: http://localhost:8001/quantum-visualizer/"
echo ""
echo "🎉 BIENVENUE DANS L'UNIVERS HEROES OF TIME ! 🎉" 