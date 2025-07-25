#!/bin/bash

# Heroes of Time - Script de Démonstration & Rapport
# Ce script lance l'application, exécute le test de démo multijoueur,
# et génère puis ouvre un rapport de test Playwright.

# Couleurs pour une meilleure lisibilité
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # Pas de couleur

echo -e "${BLUE}===============================================${NC}"
echo -e "${BLUE}🚀 Démarrage de la Démo et du Rapporteur 🚀${NC}"
echo -e "${BLUE}===============================================${NC}"

# Étape 1: Démarrer l'application en utilisant le script existant
echo -e "\n${YELLOW}Étape 1: Démarrage de l'application...${NC}"
# Vérifier si l'application est déjà en cours pour éviter de la redémarrer inutilement
if ! curl -s http://localhost:3000 > /dev/null; then
    ./start-app.sh
    # Donner un peu de temps à l'application pour se stabiliser
    sleep 10
else
    echo -e "${GREEN}L'application est déjà en cours d'exécution.${NC}"
fi

# Étape 2: Exécuter le test de démo multijoueur
echo -e "\n${YELLOW}Étape 2: Lancement du test de démo multijoueur...${NC}"
(cd frontend && npx playwright test tests/e2e/multiplayer-demo.spec.ts --project=multiplayer --reporter=html)

# Vérifier si le test a réussi
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Test de démo terminé avec succès!${NC}"
else
    echo -e "\n${RED}❌ Le test de démo a échoué. Veuillez vérifier les logs.${NC}"
    exit 1
fi

# Étape 3: Ouvrir le rapport de test
echo -e "\n${YELLOW}Étape 3: Ouverture du rapport de test HTML...${NC}"
(cd frontend && npx playwright show-report)

echo -e "\n${GREEN}🎉 Processus terminé!${NC}" 