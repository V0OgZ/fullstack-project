#!/bin/bash

echo "🎮 VINCE MODE - 2 SERVEURS WEB SEULEMENT"
echo "========================================"

# Tuer tous les anciens serveurs
echo "🔫 Nettoyage complet..."
pkill -f "python3 -m http.server"
pkill -f "npm start"
sleep 2

echo "🚀 Démarrage VINCE MODE..."

# 1. SERVEUR HTML POCKET (Port 9000) - Toutes les interfaces HTML legacy
echo "📱 Port 9000: HTML Pocket World (dashboard, portail, quantum-visualizer, etc.)"
cd frontend
python3 -m http.server 9000 > ../pocket-world.log 2>&1 &
cd ..

# 2. SERVEUR REACT MODERNE (Port 3000) - Le futur
echo "⚛️ Port 3000: React Frontend Moderne (en cours de développement)"
cd frontend
npm start > ../react-frontend.log 2>&1 &
cd ..

# Le backend reste sur son port habituel (8080)
echo "🏗️ Backend Spring Boot reste sur port 8080"

sleep 3

echo ""
echo "✅ VINCE MODE OPÉRATIONNEL !"
echo ""
echo "🌐 ARCHITECTURE SIMPLIFIÉE:"
echo "   ⚛️ React Moderne:    http://localhost:3000 (ton futur)"
echo "   📱 HTML Pocket:      http://localhost:9000 (legacy + dashboard)"
echo "   🏗️ Backend API:      http://localhost:8080 (Spring Boot)"
echo ""
echo "🎯 ACCÈS RAPIDE:"
echo "   📊 Dashboard Legacy:  http://localhost:9000/dashboard.html"
echo "   🌐 Portail HTML:     http://localhost:9000/portail-100-html-interfaces.html"
echo "   ⚛️ React App:        http://localhost:3000"
echo ""
echo "📋 LOGS:"
echo "   📱 HTML Pocket: tail -f pocket-world.log"
echo "   ⚛️ React:      tail -f react-frontend.log"
echo ""
echo "🛑 Pour arrêter: pkill -f 'python3 -m http.server' && pkill -f 'npm start'" 