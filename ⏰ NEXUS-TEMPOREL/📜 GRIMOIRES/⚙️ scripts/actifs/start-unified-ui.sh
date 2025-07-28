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
kill_port 8080
kill_port 5174
kill_port 8001
kill_port 5175
kill_port 8888

echo ""
echo "⏳ Attente 2 secondes..."
sleep 2

echo ""
echo "🚀 DÉMARRAGE DES SERVICES..."

# Dashboard Principal
echo "📊 Démarrage Dashboard (port 9000)..."
python3 -m http.server 9000 > logs/dashboard-unified.log 2>&1 &

# Backend API
echo "🔧 Démarrage Backend API (port 8080)..."
cd backend && mvn spring-boot:run > ../logs/backend-unified.log 2>&1 &
cd ..

# Frontend Principal
echo "🎮 Démarrage Frontend Principal (port 8000)..."
cd frontend && python3 -m http.server 8000 > ../logs/frontend-unified.log 2>&1 &
cd ..

# Temporal UI
echo "⚡ Démarrage Interface Temporelle (port 5174)..."
cd frontend-temporal && python3 -m http.server 5174 > ../logs/temporal-ui-unified.log 2>&1 &
cd ..

# Quantum Visualizer
echo "🔬 Démarrage Quantum Visualizer (port 8001)..."
python3 -m http.server 8001 > logs/quantum-visualizer-unified.log 2>&1 &

# Collection & Grammar Visualizer
echo "🏛️ Démarrage Collection & Grammar (port 5175)..."
python3 visualizer-server.py > logs/collection-grammar-unified.log 2>&1 &

# Test Runner
echo "🧪 Démarrage Test Runner (port 8888)..."
python3 test-runner-server.py > logs/test-runner-unified.log 2>&1 &

echo ""
echo "⏳ Attente de démarrage des services..."
sleep 5

echo ""
echo "🎯 SERVICES DÉMARRÉS :"
echo "📊 Dashboard           : http://localhost:9000/dashboard.html"
echo "🔧 Backend API         : http://localhost:8080/api"
echo "🎮 Frontend Principal  : http://localhost:8000"
echo "⚡ Interface Temporelle : http://localhost:5174"
echo "🔬 Quantum Visualizer  : http://localhost:8001/quantum-visualizer/"
echo "🏛️ Collection & Grammar: http://localhost:5175"
echo "🧪 Test Runner         : http://localhost:8888"
echo ""
echo "📋 Logs disponibles dans le dossier 'logs/'"
echo "🛑 Pour arrêter tous les services : ./⚙️ scripts/actifs/stop-all-services.sh"
echo ""
echo "✅ SYSTÈME UNIFIÉ OPÉRATIONNEL !"
echo "🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =🔥 =" 