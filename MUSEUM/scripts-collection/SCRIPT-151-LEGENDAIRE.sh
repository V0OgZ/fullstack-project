#!/bin/bash

# ==============================================================================
# 🚀 HEROES OF TIME - DÉMARRAGE SERVICES BACKGROUND PERMANENT
# ==============================================================================
#
# Ce script démarre tous les services essentiels en arrière-plan permanent
# pour que l'utilisateur puisse tester pendant que l'agent code
#
# USAGE: ./scripts/actifs/start-services-background.sh
#
# ==============================================================================

echo "🚀 DÉMARRAGE SERVICES BACKGROUND PERMANENT"
echo "============================================"
echo ""

# Fonction pour démarrer un service en background
start_service() {
    local name="$1"
    local port="$2"
    local dir="$3"
    local cmd="$4"
    
    echo "🔄 Démarrage $name (port $port)..."
    
    # Tuer le processus existant sur ce port
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
    
    # Démarrer le service
    if [ -d "$dir" ]; then
        cd "$dir"
        eval "$cmd" > /dev/null 2>&1 &
        echo "   ✅ $name démarré sur port $port"
        cd - > /dev/null
    else
        echo "   ❌ Répertoire $dir non trouvé"
    fi
}

# Créer le dossier logs s'il n'existe pas
mkdir -p logs

echo "🧹 NETTOYAGE DES PORTS..."
lsof -ti:9000,5170,5171,5174,5190,8000,8080 | xargs kill -9 2>/dev/null || true
sleep 1

echo ""
echo "🚀 DÉMARRAGE DES SERVICES..."

# Dashboard (port 9000)
start_service "Dashboard" "9000" "." "python3 -m http.server 9000 --bind localhost"

# JSON Visualizer (port 5170) 
start_service "JSON Visualizer" "5170" "." "python3 -m http.server 5170"

# HOTS Visualizer (port 5171)
start_service "HOTS Visualizer" "5171" "." "python3 -m http.server 5171"

# Frontend Temporal (port 5174)
start_service "Temporal UI" "5174" "frontend-temporal" "python3 -m http.server 5174"

# Frontend Legendary (port 5190)
start_service "Legendary UI" "5190" "frontend-legendary-ui" "python3 server.py"

# Frontend Principal (port 8000)
start_service "Frontend Principal" "8000" "frontend" "python3 -m http.server 8000"

# Attendre que les services démarrent
sleep 2

echo ""
echo "📊 VÉRIFICATION DES SERVICES..."
RUNNING_SERVICES=$(lsof -i :9000,5170,5171,5174,5190,8000 2>/dev/null | grep LISTEN | wc -l)
echo "   Services actifs: $RUNNING_SERVICES/6"

echo ""
echo "🎯 SERVICES DISPONIBLES:"
echo "🎮 Dashboard          : http://localhost:9000"
echo "📊 JSON Visualizer    : http://localhost:5170/json-visualizer.html" 
echo "🔮 HOTS Visualizer    : http://localhost:5171/hots-visualizer.html"
echo "⚔️ Temporal UI        : http://localhost:5174"
echo "🏛️ Legendary UI       : http://localhost:5190"
echo "🎮 Frontend           : http://localhost:8000"
echo ""
echo "✅ TOUS LES SERVICES RESTENT ACTIFS EN ARRIÈRE-PLAN !"
echo "🛑 Pour arrêter : ./scripts/actifs/stop-all-services.sh"
echo "📊 Pour status : lsof -i :9000,5170,5171,5174,5190,8000,8080 | grep LISTEN"
echo "" 