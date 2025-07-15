#!/bin/bash

# 🧪 Heroes of Time - Script de Lancement Rapide Tests Backend
# Lance les tests unitaires backend avec rapport détaillé

echo "🚀 Lancement des tests unitaires backend..."
echo "=============================================="

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "backend/test-backend-unit.sh" ]; then
    echo "❌ ERREUR: Script de tests backend non trouvé"
    echo "   Assurez-vous d'être dans le répertoire racine du projet"
    exit 1
fi

# Lancer le script de tests backend
./backend/test-backend-unit.sh

echo ""
echo "✅ Tests backend terminés!"
echo "📊 Consultez les rapports dans test-results/" 