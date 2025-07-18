#!/bin/bash

# 🚀 Heroes of Time - MASTER SCRIPT - Lance TOUT !
# ===============================================

echo "🚀 Heroes of Time - SYSTÈME COMPLET"
echo "==================================="

# Fonction pour nettoyer les processus
cleanup() {
    echo "🧹 Nettoyage des processus existants..."
    # Kill tous les processus liés aux services
    pkill -f "spring-boot:run" 2>/dev/null || true
    pkill -f "python3 -m http.server" 2>/dev/null || true
    pkill -f "npm start" 2>/dev/null || true
    
    # Kill par port spécifique
    for port in 8080 8000 5173 8001 3000; do
        lsof -ti:$port 2>/dev/null | xargs -r kill -9 2>/dev/null || true
    done
    
    sleep 3
    echo "✅ Nettoyage terminé"
}

# Fonction pour attendre qu'un service soit prêt
wait_for_service() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1
    
    echo "⏳ Attente de $name..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            echo "✅ $name prêt!"
            return 0
        fi
        echo -n "."
        sleep 1
        ((attempt++))
    done
    
    echo "❌ $name n'a pas démarré après $max_attempts tentatives"
    return 1
}

# Étape 1: Nettoyage
cleanup

# Étape 2: Démarrage du backend
echo "🔧 Démarrage du backend (port 8080)..."
cd backend
mvn spring-boot:run -Dspring-boot.run.arguments="--heroes.parser.use.antlr=false" > ../backend-master.log 2>&1 &
BACKEND_PID=$!
cd ..

# Attendre que le backend soit prêt
wait_for_service "http://localhost:8080/api/game/status" "Backend"

# Étape 3: Démarrage des frontends
echo "🌐 Démarrage des 3 frontends..."

# Frontend Classique (port 8000)
echo "├─ 🏛️ Frontend Classique (port 8000)..."
cd frontend
python3 -m http.server 8000 > ../frontend-classique-master.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Frontend Temporel (port 5173)
echo "├─ ⚡ Frontend Temporel (port 5173)..."
cd frontend-temporal
python3 -m http.server 5173 > ../frontend-temporal-master.log 2>&1 &
TEMPORAL_PID=$!
cd ..

# Quantum Visualizer (port 8001)
echo "└─ 🌌 Quantum Visualizer (port 8001)..."
cd quantum-visualizer
python3 -m http.server 8001 > ../quantum-visualizer-master.log 2>&1 &
QUANTUM_PID=$!
cd ..

# Attendre que les frontends soient prêts
sleep 5

# Étape 4: Vérification des services
echo "🔍 Vérification des services:"
echo "├─ 🔧 Backend (8080): $(curl -s http://localhost:8080/api/game/status | head -c 30)..."
echo "├─ 🏛️ Frontend Classique (8000): $(curl -s http://localhost:8000/ | head -c 30)..."
echo "├─ ⚡ Frontend Temporel (5173): $(curl -s http://localhost:5173/ | head -c 30)..."
echo "└─ 🌌 Quantum Visualizer (8001): $(curl -s http://localhost:8001/ | head -c 30)..."

# Étape 5: Test des scénarios HOTS
echo "🎮 Lancement des tests HOTS..."
sleep 2
./test-hots-simple.sh

# Étape 6: Rapport final
echo ""
echo "🎯 SYSTÈME HEROES OF TIME COMPLET DÉMARRÉ!"
echo "=========================================="
echo "✅ Services actifs:"
echo "┌─────────────────────────────────────────────────────────────┐"
echo "│ 🔧 Backend API      : http://localhost:8080                 │"
echo "│ 🏛️ Frontend Classique : http://localhost:8000              │"
echo "│ ⚡ Frontend Temporel  : http://localhost:5173              │"
echo "│ 🌌 Quantum Visualizer : http://localhost:8001              │"
echo "└─────────────────────────────────────────────────────────────┘"
echo ""
echo "🧪 Commandes de test:"
echo "• Test API: curl http://localhost:8080/api/game/status"
echo "• Test HOTS: ./test-hots-simple.sh"
echo "• Test complet: ./test-all-scenarios-hots.sh"
echo ""
echo "📊 Logs disponibles:"
echo "• Backend: tail -f backend-master.log"
echo "• Frontend Classique: tail -f frontend-classique-master.log"
echo "• Frontend Temporel: tail -f frontend-temporal-master.log"
echo "• Quantum Visualizer: tail -f quantum-visualizer-master.log"
echo ""
echo "🛑 Pour arrêter tout:"
echo "• ./stop-everything.sh"
echo "• Ou: lsof -ti:8080,8000,5173,8001 | xargs -r kill -9"
echo ""
echo "🎯 Système prêt! Console libre pour travailler."

# Pas de wait - laisser la console libre 