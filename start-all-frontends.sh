#!/bin/bash

# 🚀 Heroes of Time - Lancement des 3 Frontends
# =============================================

echo "🚀 Heroes of Time - Démarrage des 3 Frontends"
echo "=============================================="

# Nettoyer les ports en conflit
echo "🧹 Nettoyage des ports en conflit..."
lsof -ti:8000,5173,8001 | xargs -r kill -9 2>/dev/null || true
sleep 2

# Démarrer le backend sans ANTLR
echo "🔧 Démarrage du backend (sans ANTLR)..."
cd backend
mvn spring-boot:run -Dspring-boot.run.arguments="--heroes.parser.use.antlr=false" > ../backend-no-antlr.log 2>&1 &
BACKEND_PID=$!
cd ..

# Attendre le backend
echo "⏳ Attente du backend..."
for i in {1..30}; do
    if curl -s http://localhost:8080/api/game/status > /dev/null 2>&1; then
        echo "✅ Backend prêt!"
        break
    fi
    echo -n "."
    sleep 1
done
echo ""

# Démarrer les 3 frontends
echo "🌐 Démarrage des frontends..."

# Frontend classique (port 8000)
echo "├─ 🏛️  Frontend Classique (port 8000)..."
cd frontend
python3 -m http.server 8000 > ../frontend-classique.log 2>&1 &
FRONTEND_CLASSIQUE_PID=$!
cd ..

# Frontend temporel (port 5173)
echo "├─ ⚡ Frontend Temporel (port 5173)..."
cd frontend-temporal
python3 -m http.server 5173 > ../frontend-temporal.log 2>&1 &
FRONTEND_TEMPORAL_PID=$!
cd ..

# Quantum visualizer (port 8001)
echo "└─ 🌌 Quantum Visualizer (port 8001)..."
cd quantum-visualizer
python3 -m http.server 8001 > ../quantum-visualizer.log 2>&1 &
QUANTUM_VISUALIZER_PID=$!
cd ..

# Attendre que les services soient prêts
echo "⏳ Attente des services..."
sleep 5

# Vérifier les services
echo ""
echo "🔍 Vérification des services:"
echo "├─ 🔧 Backend (8080): $(curl -s http://localhost:8080/api/game/status | head -c 20)..."
echo "├─ 🏛️  Frontend Classique (8000): $(curl -s http://localhost:8000/ | head -c 20)..."
echo "├─ ⚡ Frontend Temporel (5173): $(curl -s http://localhost:5173/ | head -c 20)..."
echo "└─ 🌌 Quantum Visualizer (8001): $(curl -s http://localhost:8001/ | head -c 20)..."

echo ""
echo "🎯 SERVICES DÉMARÉS:"
echo "┌─────────────────────────────────────────────────────────────┐"
echo "│ 🔧 Backend API      : http://localhost:8080                 │"
echo "│ 🏛️  Frontend Classique : http://localhost:8000              │"
echo "│ ⚡ Frontend Temporel  : http://localhost:5173              │"
echo "│ 🌌 Quantum Visualizer : http://localhost:8001              │"
echo "└─────────────────────────────────────────────────────────────┘"

echo ""
echo "💡 COMMANDES UTILES:"
echo "• Test des services : curl http://localhost:8080/api/game/status"
echo "• Arrêter tout : pkill -f 'java.*spring-boot' && pkill -f 'python3.*http.server'"
echo "• Logs backend : tail -f backend-no-antlr.log"
echo "• Logs frontend : tail -f frontend-*.log"

echo ""
echo "🎮 PRÊT À TESTER LES SCÉNARIOS HOTS!"
echo "🚀 Système complet démarré sans ANTLR"

# Garder le script actif
echo "⏸️  Appuyez sur Ctrl+C pour arrêter tous les services"
trap 'echo "🛑 Arrêt des services..."; kill $BACKEND_PID $FRONTEND_CLASSIQUE_PID $FRONTEND_TEMPORAL_PID $QUANTUM_VISUALIZER_PID 2>/dev/null; exit 0' INT

# Boucle infinie pour maintenir le script actif
while true; do
    sleep 10
    # Vérifier si les services sont toujours actifs
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo "❌ Backend arrêté"
        break
    fi
done 