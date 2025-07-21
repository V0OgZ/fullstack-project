#!/bin/bash

echo "🌀 Démarrage du Quantum Timeline Visualizer - Heroes of Time"
echo "============================================================"

# Vérifier si Python est installé
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 n'est pas installé. Veuillez l'installer pour continuer."
    exit 1
fi

# Aller dans le répertoire du visualiseur quantique
cd quantum-visualizer

echo "📡 Démarrage du serveur HTTP sur port 5175..."
echo "🌐 URL: http://localhost:5175"
echo ""
echo "🎮 Fonctionnalités disponibles:"
echo "   ▶️  Visualisation temps réel des ψ-states"
echo "   🎯  Patterns d'interférence quantique"
echo "   📊  Graphiques de probabilités"
echo "   🗺️  Timeline map avec branches temporelles"
echo "   📝  Log temps réel des événements quantiques"
echo ""
echo "🔗 Connexion backend WebSocket: ws://localhost:8080/quantum-viz"
echo "⚠️  Si le backend n'est pas disponible, le visualiseur fonctionne en mode démo"
echo ""
echo "🚀 Appuyez sur Ctrl+C pour arrêter le serveur"
echo "============================================================"

# Démarrer le serveur HTTP
python3 -m http.server 5175

echo ""
echo "✅ Quantum Timeline Visualizer arrêté"