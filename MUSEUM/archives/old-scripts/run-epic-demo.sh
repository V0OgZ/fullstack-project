#!/bin/bash

echo "🎮 HEROES OF TIME - EPIC CONTENT DEMO"
echo "====================================="
echo ""
echo "🚀 Starting Epic Content Demo..."
echo ""

# Attendre que les serveurs soient complètement démarrés
echo "⏳ Waiting 15 seconds for servers to initialize..."
sleep 10

# Vérifier si l'app est démarrée
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "⚠️  Application not running. Please run './start-app.sh' first!"
    exit 1
fi

if ! curl -s http://localhost:8080/actuator/health > /dev/null; then
    echo "⚠️  Backend not running. Please run './start-app.sh' first!"
    exit 1
fi

echo "✅ Application is running!"
echo ""
echo "🎯 Running Epic Content Demo..."
echo ""

cd frontend
npx playwright test tests/e2e/epic-content-demo.spec.ts --headed --project=demo

echo ""
echo "🎉 Demo completed!"
echo ""
echo "📋 Summary of what was tested:"
echo "   🐉 Epic Creatures from Backend API"
echo "   🦸 Epic Heroes from Backend API"  
echo "   🏰 Epic Buildings (Frontend Generated)"
echo "   🔧 Backend API Endpoints"
echo ""
echo "🌐 You can also test manually:"
echo "   1. Go to http://localhost:3000"
echo "   2. Click the 🐉 button in the game interface"
echo "   3. Browse through the tabs to see all content"
echo ""
echo "✨ Enjoy your epic adventure!" 