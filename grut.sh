#!/bin/bash

echo "👁️ GRUT AWAKENS - Lancement du Panopticon..."
echo "============================================"

# Fonction pour vérifier si un port est utilisé
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
}

# Fonction pour tuer les processus sur un port
kill_port() {
    if check_port $1; then
        echo "🔫 Nettoyage du port $1..."
        lsof -ti:$1 | xargs kill -9 2>/dev/null
        sleep 1
    fi
}

# Fonction pour lancer un service
launch_service() {
    local name=$1
    local command=$2
    local port=$3
    
    echo "🚀 Lancement de $name (port $port)..."
    eval "$command"
    sleep 2
    
    if check_port $port; then
        echo "✅ $name actif sur port $port"
    else
        echo "❌ Erreur: $name n'a pas démarré"
    fi
}

# Vérifier si on doit arrêter les services
if [ "$1" = "stop" ]; then
    echo "🛑 Arrêt de tous les services..."
    kill_port 3000
    kill_port 8000
    kill_port 8080
    echo "✅ Tous les services arrêtés"
    exit 0
fi

# Vérifier si on doit juste voir le status
if [ "$1" = "status" ]; then
    echo "📊 Status des services:"
    check_port 3000 && echo "✅ Morgana React: ACTIF (port 3000)" || echo "❌ Morgana React: INACTIF"
    check_port 8000 && echo "✅ HTML Hub: ACTIF (port 8000)" || echo "❌ HTML Hub: INACTIF"
    check_port 8080 && echo "✅ Backend API: ACTIF (port 8080)" || echo "❌ Backend API: INACTIF"
    exit 0
fi

# Si services déjà actifs, ne pas les relancer
if check_port 3000 && check_port 8000 && check_port 8080; then
    echo "✅ Tous les services sont déjà actifs!"
    echo ""
    echo "🌐 Accès GRUT Panopticon:"
    echo "👁️ Vision Fantasy: http://localhost:8000/grut-panopticon-fantasy.html"
    echo "📊 Dashboard: http://localhost:8000/dashboard.html"
    echo "🎮 Vince Map: http://localhost:8000/vince-vega-map-demo-backend.html"
    echo ""
    echo "Utilise './grut.sh stop' pour arrêter"
    exit 0
fi

# Nettoyer les ports si nécessaire
echo "🧹 Nettoyage des ports..."
kill_port 3000
kill_port 8000
kill_port 8080

# Lancer les services
echo ""
echo "🔮 Invocation des services..."
echo ""

# Backend
launch_service "Backend API" "cd backend && mvn spring-boot:run > ../logs/backend.log 2>&1 &" 8080

# Frontend React
launch_service "Morgana React" "cd frontend && npm start > ../logs/morgana.log 2>&1 &" 3000

# HTML Hub
launch_service "HTML Hub" "cd frontend/html-interfaces && python3 -m http.server 8000 > ../../logs/html-unified.log 2>&1 &" 8000

echo ""
echo "=========================================="
echo "👁️ GRUT VOIT TOUT - Services opérationnels"
echo "=========================================="
echo ""
echo "🌐 Accès rapide:"
echo "👁️ GRUT Fantasy: http://localhost:8000/grut-panopticon-fantasy.html"
echo "📊 Dashboard: http://localhost:8000/dashboard.html"
echo "🎮 Vince Map: http://localhost:8000/vince-vega-map-demo-backend.html"
echo "🌍 Tous les mondes: http://localhost:8000/"
echo ""
echo "📝 Commandes:"
echo "./grut.sh stop    - Arrêter tous les services"
echo "./grut.sh status  - Voir le status"
echo ""
echo "GRUT SURVEILLE. GRUT PROTÈGE." 