#!/bin/bash

echo "🚀 DÉMARRAGE DES SERVICES HEROES OF TIME"
echo "========================================"

# Nettoyer les ports si nécessaire
echo "🧹 Nettoyage des ports..."
lsof -ti:9000 | xargs kill -9 2>/dev/null || true
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
lsof -ti:8080 | xargs kill -9 2>/dev/null || true
lsof -ti:5174 | xargs kill -9 2>/dev/null || true
lsof -ti:8001 | xargs kill -9 2>/dev/null || true
lsof -ti:5175 | xargs kill -9 2>/dev/null || true
lsof -ti:8888 | xargs kill -9 2>/dev/null || true

sleep 2

# Démarrer le Dashboard (port 9000)
echo "📊 Démarrage Dashboard (port 9000)..."
python3 -m http.server 9000 > /dev/null 2>&1 &
echo "✅ Dashboard démarré: http://localhost:9000/dashboard.html"

# Démarrer le Frontend Principal (port 8000)
echo "🎮 Démarrage Frontend Principal (port 8000)..."
cd frontend && python3 -m http.server 8000 > /dev/null 2>&1 &
cd ..
echo "✅ Frontend Principal démarré: http://localhost:8000"

# Démarrer le Backend Spring Boot (port 8080)
echo "🔧 Démarrage Backend API (port 8080)..."
cd backend && mvn spring-boot:run > /dev/null 2>&1 &
cd ..
echo "✅ Backend API démarré: http://localhost:8080/api"

# Démarrer l'Interface Temporelle (port 5174)
echo "⚡ Démarrage Interface Temporelle (port 5174)..."
cd frontend-temporal && python3 -m http.server 5174 > /dev/null 2>&1 &
cd ..
echo "✅ Interface Temporelle démarrée: http://localhost:5174"

# Démarrer le Quantum Visualizer (port 8001)
echo "🔬 Démarrage Quantum Visualizer (port 8001)..."
python3 -m http.server 8001 > /dev/null 2>&1 &
echo "✅ Quantum Visualizer démarré: http://localhost:8001/quantum-visualizer/"

# Démarrer l'Object Viewer (port 5175)
echo "🏛️ Démarrage Collection & Grammar (port 5175)..."
python3 visualizer-server.py > /dev/null 2>&1 &
echo "✅ Collection & Grammar démarré: http://localhost:5175/hots"

# Démarrer le Test Runner (port 8888)
echo "🧪 Démarrage Test Runner (port 8888)..."
python3 test-runner-server.py > /dev/null 2>&1 &
echo "✅ Test Runner démarré: http://localhost:8888"

sleep 5

echo ""
echo "🎯 TOUS LES SERVICES SONT DÉMARRÉS !"
echo "====================================="
echo "📊 Dashboard: http://localhost:9000/dashboard.html"
echo "🎮 Frontend Principal: http://localhost:8000"
echo "🔧 Backend API: http://localhost:8080/api"
echo "⚡ Interface Temporelle: http://localhost:5174"
echo "🔬 Quantum Visualizer: http://localhost:8001/quantum-visualizer/"
echo "🏛️ Collection & Grammar: http://localhost:5175/hots"
echo "🧪 Test Runner: http://localhost:8888"
echo ""
echo "🔄 Vérification des ports..."
lsof -i :9000,8000,8080,5174,8001,5175,8888 | grep LISTEN
echo ""
echo "✅ Services prêts !" 