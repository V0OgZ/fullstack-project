#!/bin/bash

# 🌟 Heroes of Time - Quantum Visualizer Quick Start

echo "🌟 Heroes of Time - Quantum Visualizer"
echo "========================================"

# Check if backend is running
echo "🔍 Vérification du backend..."
if curl -s http://localhost:8080/api/temporal/health > /dev/null 2>&1; then
    echo "✅ Backend détecté sur port 8080"
else
    echo "❌ Backend non détecté"
    echo "📝 Démarrage du backend..."
    
    # Start backend in background
    cd ../backend
    mvn spring-boot:run -Dspring-boot.run.arguments="--heroes.parser.use.antlr=false" > ../quantum-visualizer/backend.log 2>&1 &
    BACKEND_PID=$!
    
    echo "⏳ Attente du démarrage du backend..."
    sleep 10
    
    # Check if backend started
    if curl -s http://localhost:8080/api/temporal/health > /dev/null 2>&1; then
        echo "✅ Backend démarré avec succès (PID: $BACKEND_PID)"
    else
        echo "❌ Échec du démarrage du backend"
        echo "📋 Vérifiez le fichier backend.log pour les erreurs"
        exit 1
    fi
    
    cd ../quantum-visualizer
fi

# Kill any existing server on port 8000
echo "🔄 Nettoyage du port 8000..."
lsof -ti:8000 | xargs kill -9 2>/dev/null || true

# Start the visualizer
echo "🚀 Démarrage de l'interface de visualisation..."
echo "🌐 Ouverture sur http://localhost:8000"
echo "📱 Appuyez sur Ctrl+C pour arrêter"

# Start Python server and open browser
python3 -m http.server 8000 &
SERVER_PID=$!

# Wait a moment and open browser
sleep 2
if command -v open > /dev/null 2>&1; then
    open http://localhost:8000
elif command -v xdg-open > /dev/null 2>&1; then
    xdg-open http://localhost:8000
else
    echo "🌐 Ouvrez manuellement: http://localhost:8000"
fi

echo "✅ Interface de visualisation démarrée"
echo "🎮 Prêt à visualiser les états quantiques !"
echo ""
echo "📚 Commandes d'exemple:"
echo "   HERO(Arthur)"
echo "   ψ001: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ MOV(Arthur, @10,10))"
echo "   †ψ001"
echo ""

# Wait for server process
wait $SERVER_PID 