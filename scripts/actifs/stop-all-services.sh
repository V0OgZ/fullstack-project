#!/bin/bash

echo '🛑 HEROES OF TIME - ARRÊT DE TOUS LES SERVICES'
echo '==============================================='
echo ''

echo '⏹️  Arrêt des services en cours...'

# Arrêter tous les processus selon .cursorrules
echo '   Arrêt Dashboard (port 9000)...'
lsof -ti:9000 | xargs kill -9 2>/dev/null && echo '   ✅ Dashboard arrêté' || echo '   ⚠️  Dashboard déjà arrêté'

echo '   Arrêt Frontend Principal (port 8000)...'
lsof -ti:8000 | xargs kill -9 2>/dev/null && echo '   ✅ Frontend Principal arrêté' || echo '   ⚠️  Frontend Principal déjà arrêté'

echo '   Arrêt Backend API (port 8080)...'
lsof -ti:8080 | xargs kill -9 2>/dev/null && echo '   ✅ Backend API arrêté' || echo '   ⚠️  Backend API déjà arrêté'

echo '   Arrêt Interface Temporelle (port 5174)...'
lsof -ti:5174 | xargs kill -9 2>/dev/null && echo '   ✅ Interface Temporelle arrêtée' || echo '   ⚠️  Interface Temporelle déjà arrêtée'

echo '   Arrêt Quantum Visualizer (port 8001)...'
lsof -ti:8001 | xargs kill -9 2>/dev/null && echo '   ✅ Quantum Visualizer arrêté' || echo '   ⚠️  Quantum Visualizer déjà arrêté'

echo '   Arrêt Object Viewer (port 5175)...'
lsof -ti:5175 | xargs kill -9 2>/dev/null && echo '   ✅ Object Viewer arrêté' || echo '   ⚠️  Object Viewer déjà arrêté'

echo '   Arrêt Test Runner (port 8888)...'
lsof -ti:8888 | xargs kill -9 2>/dev/null && echo '   ✅ Test Runner arrêté' || echo '   ⚠️  Test Runner déjà arrêté'

# Arrêter tous les serveurs HTTP Python
echo '   Arrêt serveurs Python...'
pkill -f 'python3 -m http.server' 2>/dev/null && echo '   ✅ Serveurs Python arrêtés' || echo '   ⚠️  Aucun serveur Python actif'

# Arrêter les processus Maven Spring Boot
echo '   Arrêt processus Maven...'
pkill -f 'spring-boot:run' 2>/dev/null && echo '   ✅ Processus Maven arrêtés' || echo '   ⚠️  Aucun processus Maven actif'

# Arrêter les processus Node.js/npm
echo '   Arrêt processus Node.js...'
pkill -f 'npm start' 2>/dev/null && echo '   ✅ Processus Node.js arrêtés' || echo '   ⚠️  Aucun processus Node.js actif'

# Attendre que les processus se terminent
echo ''
echo '⏳ Attente de la fermeture complète...'
sleep 5

# Vérifier que tous les ports sont libres SELON .cursorrules
echo ''
echo '🔍 VÉRIFICATION DES PORTS SELON .cursorrules :'
ports_used=0

check_port() {
    local port=$1
    local name=$2
    if lsof -i :$port >/dev/null 2>&1; then
        echo "   ❌ Port $port ($name) encore utilisé"
        ports_used=1
    else
        echo "   ✅ Port $port ($name) libre"
    fi
}

check_port 9000 "Dashboard"
check_port 8000 "Frontend Principal"  
check_port 8080 "Backend API"
check_port 5174 "Interface Temporelle"
check_port 8001 "Quantum Visualizer"
check_port 5175 "Object Viewer"
check_port 8888 "Test Runner"

echo ''
if [ $ports_used -eq 0 ]; then
    echo '🎉 TOUS LES SERVICES SONT CORRECTEMENT ARRÊTÉS !'
    echo ''
    echo '   Tous les ports sont libres'
    echo '   Système prêt pour un nouveau démarrage'
    echo ''
    echo '🚀 Pour redémarrer :'
    echo '   ./start-all-correct.sh'
else
    echo '⚠️  CERTAINS PORTS SONT ENCORE UTILISÉS'
    echo ''
    echo '🔧 Forcer la libération :'
    echo '   sudo lsof -ti:8080,8000,5173,8001 | xargs kill -9'
    echo ''
    echo '   Puis redémarrer avec :'
    echo '   ./start-all-correct.sh'
fi

echo ''
echo '📁 LOGS CONSERVÉS :'
echo '   backend-full.log'
echo '   frontend-classique.log'
echo '   frontend-temporal.log' 
echo '   quantum-visualizer.log'
echo ''
echo '🧹 Pour nettoyer les logs :'
echo '   rm *.log' 