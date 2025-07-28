#!/bin/bash

echo '🚀 HEROES OF TIME - DÉMARRAGE UNIFIÉ DES UIs'
echo '=============================================='
echo ''

# Nettoyer les ports avant démarrage
echo '🧹 Nettoyage des ports...'
lsof -ti:8080 | xargs kill -9 2>/dev/null || true  # Backend
lsof -ti:8000 | xargs kill -9 2>/dev/null || true  # Frontend Principal
lsof -ti:8001 | xargs kill -9 2>/dev/null || true  # Quantum Visualizer  
lsof -ti:8888 | xargs kill -9 2>/dev/null || true  # Test Runner
lsof -ti:5173 | xargs kill -9 2>/dev/null || true  # Temporaire (à nettoyer)
sleep 3

echo ''
echo '🎯 DÉMARRAGE DES SERVICES...'
echo ''

# 1. Backend Heroes of Time (Port 8080)
echo '⚙️  [1/4] Backend Spring Boot (port 8080)...'
cd backend
nohup mvn spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "   ✅ Backend PID: $BACKEND_PID"
cd ..
echo "   ⏳ Attente du démarrage backend..."
sleep 15

# 2. Frontend Principal - Carte Hexagonale (Port 8000)
echo '🎮 [2/4] Frontend Principal avec carte hexagonale (port 8000)...'
cd frontend-temporal
nohup python3 -m http.server 8000 > ../frontend-principal.log 2>&1 &
FRONTEND_PID=$!
echo "   ✅ Frontend Principal PID: $FRONTEND_PID"
cd ..
sleep 3

# 3. Quantum Visualizer - Replay & Timeline (Port 8001)
echo '🔬 [3/4] Quantum Visualizer - Replay & Timeline (port 8001)...'
cd quantum-visualizer
nohup python3 -m http.server 8001 > ../quantum-visualizer.log 2>&1 &
QUANTUM_PID=$!
echo "   ✅ Quantum Visualizer PID: $QUANTUM_PID"
cd ..
sleep 3

# 4. Test Runner Interface (Port 8888)
echo '🧪 [4/4] Test Runner Interface (port 8888)...'
nohup python3 test-runner-server.py > test-runner.log 2>&1 &
TESTRUNNER_PID=$!
echo "   ✅ Test Runner PID: $TESTRUNNER_PID"
sleep 3

# Enregistrer les PIDs
echo "$BACKEND_PID" > .backend.pid
echo "$FRONTEND_PID" > .frontend.pid
echo "$QUANTUM_PID" > .quantum.pid
echo "$TESTRUNNER_PID" > .testrunner.pid

echo ''
echo '✨ TOUS LES SERVICES SONT DÉMARRÉS !'
echo '======================================='
echo ''
echo '🌐 ACCÈS AUX INTERFACES :'
echo ''
echo '   🎮 Frontend Principal (Carte Hexagonale)'
echo '      http://localhost:8000'
echo '      → Console temporelle avec carte hexagonale'
echo '      → Boutons: New Game, Add Ragnar'
echo '      → Scripts temporels: ψ, †, ⊙, Δt'
echo ''
echo '   🔬 Quantum Visualizer (Replay & Timeline)'  
echo '      http://localhost:8001'
echo '      → Visualisation des graphes causaux'
echo '      → Navigation entre timelines'
echo '      → Replay des scénarios'
echo ''
echo '   🧪 Test Runner Interface'
echo '      http://localhost:8888'
echo '      → Exécution des tests automatisés'
echo '      → Monitoring des performances'
echo ''
echo '   ⚙️  Backend API'
echo '      http://localhost:8080'
echo '      → API REST Spring Boot'
echo '      → /api/game/*, /api/temporal/*'
echo ''
echo '📊 LOGS EN TEMPS RÉEL :'
echo '   tail -f backend.log           # Backend logs'
echo '   tail -f frontend-principal.log # Frontend logs'
echo '   tail -f quantum-visualizer.log # Quantum logs'
echo '   tail -f test-runner.log       # Test Runner logs'
echo ''
echo '🛑 POUR ARRÊTER :'
echo '   ./stop-all-services.sh'
echo ''
echo '💡 TIPS :'
echo '   - Si une UI ne se charge pas, vérifiez les logs'
echo '   - Le backend peut prendre 20-30s pour démarrer complètement'
echo '   - Rafraîchissez la page si nécessaire'
echo '' 