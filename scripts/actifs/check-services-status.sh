#!/bin/bash

# 🎳 WALTER'S FIX - ANTI-SCHRÖDINGER STATUS CHECK
# Plus de superposition quantique ! État binaire clair !

echo "🔍 Statut des services Heroes of Time"
echo "===================================="

# Fonction pour tester un port avec état binaire
check_port() {
    local port=$1
    local name=$2
    
    if curl -s --connect-timeout 2 http://localhost:$port > /dev/null 2>&1; then
        echo "  ✅ $name ($port) - ACTIF"
        return 0
    else
        echo "  ❌ $name ($port) - ARRÊTÉ"
        return 1
    fi
}

# Variables pour compter les services actifs
ACTIVE_COUNT=0
TOTAL_COUNT=7

# Test de chaque service - WALTER'S BINARY LOGIC
check_port 9000 "Dashboard" && ACTIVE_COUNT=$((ACTIVE_COUNT + 1))
check_port 8000 "Frontend" && ACTIVE_COUNT=$((ACTIVE_COUNT + 1))

# Backend spécial - test /api/health
if curl -s --connect-timeout 2 http://localhost:8080/api/health > /dev/null 2>&1; then
    echo "  ✅ Backend API (8080) - ACTIF"
    ACTIVE_COUNT=$((ACTIVE_COUNT + 1))
else
    echo "  ❌ Backend API (8080) - ARRÊTÉ"
fi

check_port 5174 "Temporal" && ACTIVE_COUNT=$((ACTIVE_COUNT + 1))
check_port 8001 "Quantum" && ACTIVE_COUNT=$((ACTIVE_COUNT + 1))
check_port 5175 "Visualizer" && ACTIVE_COUNT=$((ACTIVE_COUNT + 1))
check_port 8888 "Test Runner" && ACTIVE_COUNT=$((ACTIVE_COUNT + 1))

echo ""
echo "URLs d'accès:"
echo "  🎯 Dashboard: http://localhost:9000/dashboard.html"
echo "  📊 Frontend: http://localhost:8000"
echo "  ⚙️ Backend API: http://localhost:8080/api/health"
echo "  ⚔️ Temporal: http://localhost:5174"
echo "  🌌 Quantum: http://localhost:8001"
echo "  🔮 Visualizer: http://localhost:5175"
echo "  🧪 Test Runner: http://localhost:8888"
echo ""

# WALTER'S ANTI-SCHRÖDINGER LOGIC
if [ $ACTIVE_COUNT -eq $TOTAL_COUNT ]; then
    echo "🎳 WALTER: TOUS LES SERVICES SONT VRAIMENT ACTIFS ! ($ACTIVE_COUNT/$TOTAL_COUNT)"
elif [ $ACTIVE_COUNT -gt 4 ]; then
    echo "⚠️  WALTER: SERVICES PARTIELLEMENT ACTIFS ($ACTIVE_COUNT/$TOTAL_COUNT) - ACCEPTABLE"
else
    echo "🚨 WALTER: SERVICES EN PANNE ! ($ACTIVE_COUNT/$TOTAL_COUNT) - INACCEPTABLE !"
fi 