#!/bin/bash

# 🚀 HEROES OF TIME - DÉMARRAGE UNIFIÉ DES UIs
# =============================================

echo "🚀 HEROES OF TIME - DÉMARRAGE UNIFIÉ DES UIs"
echo "=============================================="
echo ""

# Nettoyage des ports
echo "🧹 Nettoyage des ports..."
lsof -ti:8080 | xargs kill -9 2>/dev/null || true  # Backend
lsof -ti:8000 | xargs kill -9 2>/dev/null || true  # Frontend Principal  
lsof -ti:8001 | xargs kill -9 2>/dev/null || true  # Quantum Visualizer
lsof -ti:8888 | xargs kill -9 2>/dev/null || true  # Test Runner
lsof -ti:5173 | xargs kill -9 2>/dev/null || true  # Temporaire (à nettoyer)
lsof -ti:9000 | xargs kill -9 2>/dev/null || true  # Dashboard

echo ""
echo "🎯 DÉMARRAGE DES SERVICES..."
echo ""

# 1. Backend Spring Boot (port 8080)
echo "⚙️  [1/5] Backend Spring Boot (port 8080)..."
cd backend
nohup mvn spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "   ✅ Backend PID: $BACKEND_PID"
echo $BACKEND_PID > ../.backend.pid
cd ..

# Attendre un peu que le backend démarre
echo "   ⏳ Attente du démarrage backend..."
sleep 5

# 2. Frontend Principal (port 8000)
echo "🎮 [2/5] Frontend Principal avec carte hexagonale (port 8000)..."
cd frontend
nohup python3 -m http.server 8000 > ../frontend-principal.log 2>&1 &
FRONTEND_PID=$!
echo "   ✅ Frontend Principal PID: $FRONTEND_PID"
echo $FRONTEND_PID > ../.frontend.pid
cd ..

# 3. Quantum Visualizer (port 8001)
echo "🔬 [3/5] Quantum Visualizer - Replay & Timeline (port 8001)..."
cd quantum-visualizer
nohup python3 -m http.server 8001 > ../quantum-visualizer.log 2>&1 &
QUANTUM_PID=$!
echo "   ✅ Quantum Visualizer PID: $QUANTUM_PID"
echo $QUANTUM_PID > ../.quantum.pid
cd ..

# 4. Test Runner Interface (port 8888)
echo "🧪 [4/5] Test Runner Interface (port 8888)..."
nohup python3 test-runner-server.py > test-runner.log 2>&1 &
TESTRUNNER_PID=$!
echo "   ✅ Test Runner PID: $TESTRUNNER_PID"
echo $TESTRUNNER_PID > .testrunner.pid

# 5. Dashboard Central Sécurisé (port 9000)
echo "🎯 [5/5] Dashboard Central Sécurisé (port 9000)..."
nohup python3 dashboard-server.py > dashboard-secure.log 2>&1 &
DASHBOARD_PID=$!
echo "   ✅ Dashboard Sécurisé PID: $DASHBOARD_PID"
echo $DASHBOARD_PID > .dashboard.pid

# 6. Frontend Temporal (port 5173)
echo "⚡ [BONUS] Frontend Temporal (port 5173)..."
cd frontend-temporal
nohup npm run dev > ../frontend-temporal.log 2>&1 &
TEMPORAL_PID=$!
echo "   ✅ Frontend Temporal PID: $TEMPORAL_PID"
echo $TEMPORAL_PID > ../.temporal.pid
cd ..

echo ""
echo "✨ TOUS LES SERVICES SONT DÉMARRÉS !"
echo "======================================="
echo ""
echo "🌐 ACCÈS AUX INTERFACES :"
echo ""
echo "   🎯 DASHBOARD CENTRAL (NOUVEAU !)"
echo "      http://localhost:9000"
echo "      → Accès centralisé à toutes les UIs"
echo "      → Indicateurs de statut en temps réel"
echo "      → Tableau de bord unifié"
echo ""
echo "   🎮 Frontend Principal (Carte Hexagonale)"
echo "      http://localhost:8000"
echo "      → Console temporelle avec carte hexagonale"
echo "      → Boutons: New Game, Add Ragnar"
echo "      → Scripts temporels: ψ, †, ⊙, Δt"
echo ""
echo "   🔬 Quantum Visualizer (Replay & Timeline)"
echo "      http://localhost:8001"
echo "      → Visualisation des graphes causaux"
echo "      → Navigation entre timelines"
echo "      → Replay des scénarios"
echo ""
echo "   ⚡ Frontend Temporal (Révolutionnaire)"
echo "      http://localhost:5173"
echo "      → Interface temporelle avancée"
echo "      → Système UTMD et animations"
echo "      → Visualisation collapse causale"
echo ""
echo "   🧪 Test Runner Interface"
echo "      http://localhost:8888"
echo "      → Exécution des tests automatisés"
echo "      → Monitoring des performances"
echo ""
echo "   ⚙️  Backend API"
echo "      http://localhost:8080"
echo "      → API REST Spring Boot"
echo "      → /api/game/*, /api/temporal/*"
echo ""
echo "📊 LOGS EN TEMPS RÉEL :"
echo "   tail -f backend.log           # Backend logs"
echo "   tail -f frontend-principal.log # Frontend logs"
echo "   tail -f quantum-visualizer.log # Quantum logs"
echo "   tail -f test-runner.log       # Test Runner logs"
echo "   tail -f dashboard.log         # Dashboard logs"
echo "   tail -f frontend-temporal.log # Temporal logs"
echo ""
echo "🛑 POUR ARRÊTER :"
echo "   ./stop-all-services.sh"
echo ""
echo "💡 TIPS :"
echo "   - Si une UI ne se charge pas, vérifiez les logs"
echo "   - Le backend peut prendre 20-30s pour démarrer complètement"
echo "   - Rafraîchissez la page si nécessaire"
echo "   - Utilisez le Dashboard pour un accès centralisé !" 