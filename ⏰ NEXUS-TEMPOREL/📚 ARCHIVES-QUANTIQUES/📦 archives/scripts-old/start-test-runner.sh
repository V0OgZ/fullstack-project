#!/bin/bash

# 🎯 Heroes of Time - Lanceur Interface de Test
# ============================================
# Script pour lancer l'interface de test avec serveur

echo '🎯 Heroes of Time - Interface de Test'
echo '===================================='
echo ''

# Vérifier que Python est installé
if ! command -v python3 &> /dev/null; then
    echo '❌ Python3 n'\''est pas installé !'
    echo '💡 Installez Python3 pour utiliser l'\''interface'
    exit 1
fi

# Vérifier que les fichiers existent
if [ ! -f "test-runner-interface.html" ]; then
    echo '❌ Interface HTML non trouvée !'
    echo '📄 Assurez-vous que test-runner-interface.html est présent'
    exit 1
fi

if [ ! -f "test-runner-server.py" ]; then
    echo '❌ Serveur Python non trouvé !'
    echo '📄 Assurez-vous que test-runner-server.py est présent'
    exit 1
fi

# Rendre le serveur exécutable
chmod +x test-runner-server.py

echo '🚀 Démarrage de l'\''interface de test...'
echo ''
echo '📋 Fonctionnalités disponibles:'
echo '   🎯 Lancer tous les tests automatiquement'
echo '   🏆 Tests principaux (complet + optimisations)'
echo '   ⚡ Tests rapides (quick + UI)'
echo '   📊 Monitoring en temps réel'
echo '   🔧 Arguments personnalisés'
echo '   📄 Visualisation des scripts'
echo ''
echo '🌐 Interface web sur: http://localhost:8888'
echo '🛑 Appuyez sur Ctrl+C pour arrêter'
echo ''

# Fonction pour nettoyer à la sortie
cleanup() {
    echo ''
    echo '🧹 Nettoyage en cours...'
    # Tuer tous les processus de test en cours
    pkill -f "test-.*\.sh" 2>/dev/null
    echo '✅ Nettoyage terminé'
    echo '👋 Au revoir !'
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Lancer le serveur Python
echo '🎬 Lancement du serveur...'
python3 test-runner-server.py

# Si on arrive ici, le serveur s'est arrêté
cleanup 