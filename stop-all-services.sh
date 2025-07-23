#!/bin/bash

echo '🛑 HEROES OF TIME - ARRÊT DE TOUS LES SERVICES'
echo '==============================================='
echo ''

echo '⏹️  Arrêt des services en cours...'

# Arrêter tous les processus Java (Backend Spring Boot)
echo '   Arrêt Backend (port 8080)...'
lsof -ti:8080 | xargs kill -9 2>/dev/null && echo '   ✅ Backend arrêté' || echo '   ⚠️  Backend déjà arrêté'

# Arrêter Frontend Classique (port 8000) 
echo '   Arrêt Frontend Classique (port 8000)...'
lsof -ti:8000 | xargs kill -9 2>/dev/null && echo '   ✅ Frontend Classique arrêté' || echo '   ⚠️  Frontend Classique déjà arrêté'

# Arrêter Frontend Temporal (port 5173)
echo '   Arrêt Frontend Temporal (port 5173)...'
lsof -ti:5173 | xargs kill -9 2>/dev/null && echo '   ✅ Frontend Temporal arrêté' || echo '   ⚠️  Frontend Temporal déjà arrêté'

# Arrêter Quantum Visualizer (port 8001)
echo '   Arrêt Quantum Visualizer (port 8001)...'
lsof -ti:8001 | xargs kill -9 2>/dev/null && echo '   ✅ Quantum Visualizer arrêté' || echo '   ⚠️  Quantum Visualizer déjà arrêté'

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

# Vérifier que tous les ports sont libres
echo ''
echo '🔍 VÉRIFICATION DES PORTS :'
ports_used=0

if lsof -i :8080 >/dev/null 2>&1; then
    echo '   ❌ Port 8080 encore utilisé'
    ports_used=1
else
    echo '   ✅ Port 8080 libre'
fi

if lsof -i :8000 >/dev/null 2>&1; then
    echo '   ❌ Port 8000 encore utilisé'
    ports_used=1
else
    echo '   ✅ Port 8000 libre'
fi

if lsof -i :5173 >/dev/null 2>&1; then
    echo '   ❌ Port 5173 encore utilisé'  
    ports_used=1
else
    echo '   ✅ Port 5173 libre'
fi

if lsof -i :8001 >/dev/null 2>&1; then
    echo '   ❌ Port 8001 encore utilisé'
    ports_used=1  
else
    echo '   ✅ Port 8001 libre'
fi

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