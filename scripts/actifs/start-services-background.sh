#!/bin/bash

echo "🚀 DÉMARRAGE DES SERVICES HEROES OF TIME"
echo "========================================"

# Nettoyer les ports si nécessaire
echo "🧹 Nettoyage des ports..."
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
lsof -ti:8080 | xargs kill -9 2>/dev/null || true
lsof -ti:5174 | xargs kill -9 2>/dev/null || true
lsof -ti:8001 | xargs kill -9 2>/dev/null || true
lsof -ti:5175 | xargs kill -9 2>/dev/null || true
lsof -ti:8888 | xargs kill -9 2>/dev/null || true

sleep 2

# Démarrer le Frontend Principal (port 8000)
echo "🎮 Démarrage Frontend Principal (port 8000)..."
(cd frontend && python3 -m http.server 8000 > /dev/null 2>&1) &
echo "✅ Frontend Principal démarré: http://localhost:8000"

# Démarrer le Backend Spring Boot (port 8080)
echo "🔧 Démarrage Backend API (port 8080)..."
(cd backend && mvn spring-boot:run > /dev/null 2>&1) &
echo "✅ Backend API démarré: http://localhost:8080/api"

# Démarrer l'Interface Temporelle (port 5174)
echo "⚡ Démarrage Interface Temporelle (port 5174)..."
(cd frontend-temporal && python3 -m http.server 5174 > /dev/null 2>&1) &
echo "✅ Interface Temporelle démarrée: http://localhost:5174"

# 🏛️ PANOPTICON GRUT REACT - NOUVEAU DASHBOARD PRINCIPAL (port 8001)
echo "🏛️ Démarrage Panopticon GRUT React - Dashboard Principal (port 8001)..."
(cd panopticon-grut-dashboard && npm run dev > panopticon.log 2>&1) &
echo "✅ Panopticon GRUT démarré: http://localhost:8001"

# Démarrer l'Object Viewer (port 5175)
echo "🏛️ Démarrage Collection & Grammar (port 5175)..."
python3 visualizer-server-original.py > /dev/null 2>&1 &
echo "✅ Collection & Grammar démarré: http://localhost:5175"

# Démarrer le Test Runner (port 8888)
echo "🧪 Démarrage Test Runner (port 8888)..."
python3 test-runner-server.py > /dev/null 2>&1 &
echo "✅ Test Runner démarré: http://localhost:8888"

echo ""
echo "🎯 SERVICES DÉMARRÉS - ACCÈS RAPIDE:"
echo "  📊 Dashboard Principal (Panopticon GRUT): http://localhost:8001"
echo "  🎮 Frontend Principal: http://localhost:8000"
echo "  🔧 Backend API: http://localhost:8080/api"
echo "  ⚡ Interface Temporelle: http://localhost:5174"
echo "  🏛️ Collection & Grammar: http://localhost:5175"
echo "  🧪 Test Runner: http://localhost:8888"
echo ""
echo "🏆 WALTER: TOUS LES SERVICES SONT DÉMARRÉS !" 