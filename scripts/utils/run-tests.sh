#!/bin/bash

# 🧪 Heroes of Time - Test Runner Principal
# Script qui lance le master test depuis le dossier scripts/

echo "🚀 HEROES OF TIME - TEST RUNNER"
echo "==============================="

# Vérifier que le dossier scripts existe
if [ ! -d "scripts" ]; then
    echo "❌ Dossier scripts/ non trouvé"
    exit 1
fi

# Vérifier que le script master existe
if [ ! -f "scripts/test-everything.sh" ]; then
    echo "❌ Script master test-everything.sh non trouvé dans scripts/"
    exit 1
fi

echo "📂 Lancement du script master depuis scripts/"
echo "Script: scripts/test-everything.sh"
echo ""

# Rendre le script exécutable
chmod +x scripts/test-everything.sh

# Lancer le script master
cd scripts
./test-everything.sh "$@"

echo ""
echo "🎯 Tests terminés !"
echo "📋 Logs disponibles dans le dossier courant" 