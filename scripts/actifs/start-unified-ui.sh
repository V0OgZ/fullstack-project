#!/bin/bash

# 🚀 SCRIPT DE DÉMARRAGE UNIFIÉ - HEROES OF TIME
# Démarre tous les services UI et visualiseurs

echo "🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 ="
echo "🚀 LANCEMENT SYSTÈME UNIFIÉ HEROES OF TIME"
echo "🎯 Tous les visualiseurs et interfaces"
echo "🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 ="

# Fonction pour tuer les processus sur un port
kill_port() {
    local port=$1
    echo "🧹 Nettoyage port $port..."
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
}

# Nettoyage des ports
echo "🧹 Nettoyage des anciens processus..."
kill_port 9000
kill_port 8000
kill_port 5174
kill_port 5172
kill_port 5175
kill_port 5190
kill_port 8001

echo ""
echo "⏳ Attente 2 secondes..."
sleep 2

echo ""
echo "🚀 DÉMARRAGE DES SERVICES..."

# Backend API
echo "🔧 Démarrage Backend API (port 8080)..."
cd backend && mvn spring-boot:run > ../logs/backend-unified.log 2>&1 &
cd ..

# Frontend Principal
echo "🎮 Démarrage Frontend Principal (port 8000)..."
cd frontend && python3 -m http.server 8000 > ../logs/frontend-unified.log 2>&1 &
cd ..

# UI Légendaire
echo "🏛️ Démarrage UI Légendaire (port 5190)..."
cd frontend-legendary-ui && python3 server.py > ../logs/legendary-ui-unified.log 2>&1 &
cd ..

# Temporal UI (WORKING)
echo "⚔️ Démarrage Temporal UI (port 5174)..."
cd frontend-temporal && python3 -m http.server 5174 > ../logs/temporal-ui-unified.log 2>&1 &
cd ..

# Quantum Visualizer
echo "🌌 Démarrage Quantum Visualizer (port 8001)..."
cd quantum-visualizer
python3 -m http.server 8001 --directory . > ../logs/quantum-visualizer-unified.log 2>&1 &
cd ..

# JSON Visualizer
echo "📊 Démarrage JSON Visualizer (port 5170)..."
python3 -m http.server 5170 --directory . > logs/json-visualizer-unified.log 2>&1 &

# HOTS Visualizer  
echo "🔮 Démarrage HOTS Visualizer (port 5171)..."
python3 -m http.server 5171 --directory . > logs/hots-visualizer-unified.log 2>&1 &

# Test Runner
echo "🧪 Démarrage Test Runner (port 3000)..."
python3 -m http.server 3000 --directory . > logs/test-runner-unified.log 2>&1 &

echo "🔮 Démarrage Object Viewer (port 5175)..."
python3 visualizer-server.py 5175 > logs/object-viewer-unified.log 2>&1 &

echo ""
echo "⏳ Attente de démarrage des services..."
sleep 5

echo ""
echo "🎯 SERVICES DÉMARRÉS :"
echo "🔧 Backend API         : http://localhost:8080"
echo "🎮 Frontend Principal  : http://localhost:8000"
echo "🏛️ UI Légendaire       : http://localhost:5190"
echo "⚔️ Temporal UI         : http://localhost:5174"
echo "🌌 Quantum Visualizer  : http://localhost:8001"
echo "📊 JSON Visualizer     : http://localhost:5170"
echo "🔮 HOTS Visualizer     : http://localhost:5171"
echo "🧪 Test Runner         : http://localhost:3000"
echo "🔮 Object Viewer       : http://localhost:5175"

echo ""
echo "🎮 DASHBOARD PRINCIPAL : http://localhost:9000/dashboard.html"
echo ""
echo "📋 Logs disponibles dans le dossier 'logs/'"
echo "🛑 Pour arrêter tous les services : ./scripts/actifs/stop-all-services.sh"
echo ""
echo "✅ SYSTÈME UNIFIÉ OPÉRATIONNEL !"
echo "🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =" 