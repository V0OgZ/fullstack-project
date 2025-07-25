#!/bin/bash

echo "🌍 Démarrage du Monde Pocket - Toutes les Interfaces HTML"
echo "========================================================"

# Tuer les anciens processus Python
echo "🔫 Nettoyage des anciens serveurs..."
pkill -f "python3 -m http.server"

# Attendre un peu
sleep 2

echo "🚀 Démarrage des serveurs..."

# Serveur principal pour quantum-visualizer et panopticon-3d (depuis racine)
echo "📡 Port 8000: Serveur racine (quantum-visualizer, panopticon-3d)"
python3 -m http.server 8000 --directory . > /dev/null 2>&1 &

# Serveur pour frontend temporal (depuis frontend-temporal)
echo "🕰️ Port 8888: Frontend Temporal"
python3 -m http.server 8888 --directory frontend-temporal > /dev/null 2>&1 &

# Serveur pour les interfaces frontend principales (depuis frontend)
echo "🎮 Port 9000: Frontend Principal (dashboard, portail, etc.)"
python3 -m http.server 9000 --directory frontend > /dev/null 2>&1 &

# Attendre que les serveurs démarrent
sleep 3

echo ""
echo "✅ Monde Pocket OPÉRATIONNEL !"
echo ""
echo "🌐 INTERFACES DISPONIBLES:"
echo "   📊 Portail Principal: http://localhost:9000/portail-100-html-interfaces.html"
echo "   🕰️ Temporal Engine:   http://localhost:8888/index-sophistique.html"
echo "   🔬 Quantum Visualizer: http://localhost:8000/quantum-visualizer/"
echo "   🎯 Panopticon 3D:     http://localhost:8000/panopticon-3d/"
echo "   📈 Dashboard:         http://localhost:9000/dashboard.html"
echo ""
echo "🎯 ACCÈS RAPIDE: http://localhost:9000/portail-100-html-interfaces.html"
echo ""
echo "🛑 Pour arrêter: pkill -f 'python3 -m http.server'" 