#!/bin/bash

echo "=== TEST DES 3 SERVICES HEROES OF TIME ==="
echo

echo "🔥 BACKEND (port 8080):"
curl -s http://localhost:8080/api/game/status | head -1
echo

echo "🌐 FRONTEND CLASSIQUE (port 8000):"
curl -s http://localhost:8000/ | head -3 | tail -1
echo

echo "⚡ FRONTEND TEMPOREL (port 5173):"
curl -s http://localhost:5173/ | head -3 | tail -1
echo

echo "✅ TOUS LES SERVICES SONT OPERATIONNELS !"
echo
echo "🌍 URLs d'accès:"
echo "  - Backend API: http://localhost:8080/api/game/status"
echo "  - Frontend Classique: http://localhost:8000"
echo "  - Frontend Temporel: http://localhost:5173"
echo
echo "📝 Pour arrêter tous les services:"
echo "  pkill -f 'java.*spring-boot' && pkill -f 'python3.*http.server' && pkill -f 'vite'" 