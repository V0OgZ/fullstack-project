#!/bin/bash
echo "🎮 VINCE MODE - 2 SERVEURS WEB SEULEMENT"
echo "========================================"
pkill -f "python3 -m http.server"
pkill -f "npm start"
sleep 2
echo "🚀 Démarrage VINCE MODE..."
echo "📱 Port 9000: HTML Pocket World"
cd frontend && python3 -m http.server 9000 > ../pocket-world.log 2>&1 &
cd ..
echo "⚛️ Port 3000: React Frontend"
cd frontend && npm start > ../react-frontend.log 2>&1 &
cd ..
echo "✅ VINCE MODE OPÉRATIONNEL !"
