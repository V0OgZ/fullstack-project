#!/bin/bash

# 🚀 Heroes of Time - Frontend Startup Script
# ==========================================

echo "🚀 Heroes of Time - Frontend Temporal Interface"
echo "==============================================="

# Check if backend is running
echo "🔍 Checking backend connection..."
if curl -s http://localhost:8080/api/game/status > /dev/null 2>&1; then
    echo "✅ Backend is running on port 8080"
else
    echo "⚠️  Backend not detected. Starting backend first..."
    echo "💡 Run: cd backend && mvn spring-boot:run"
    echo ""
    echo "🚀 Starting backend in background..."
    cd backend
    nohup mvn spring-boot:run > backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    
    echo "⏳ Waiting for backend to start..."
    for i in {1..30}; do
        if curl -s http://localhost:8080/api/game/status > /dev/null 2>&1; then
            echo "✅ Backend is ready!"
            break
        fi
        echo -n "."
        sleep 1
    done
    echo ""
fi

# Start frontend server
echo "🌐 Starting frontend on port 3000..."
echo "📱 Interface URL: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8080"
echo ""
echo "🎮 FEATURES AVAILABLE:"
echo "├─ 🗺️  Temporal Game Board (20x15 grid)"
echo "├─ 📝 Script Console (ψ-states, collapse)"
echo "├─ 🌀 ψ-state Visualization"
echo "├─ 🎬 Demo Mode"
echo "└─ 📊 Real-time Status Monitoring"
echo ""
echo "💡 TIPS:"
echo "• Click tiles to generate movement commands"
echo "• Use Ctrl+Enter to execute scripts quickly"
echo "• Try the demo to see temporal mechanics in action"
echo ""

cd frontend-temporal

# Check if we have a web server available
if command -v python3 &> /dev/null; then
    echo "🐍 Using Python HTTP server..."
    python3 -m http.server 3000
elif command -v node &> /dev/null; then
    echo "📦 Using Node.js http-server..."
    npx http-server -p 3000
elif command -v php &> /dev/null; then
    echo "🐘 Using PHP built-in server..."
    php -S localhost:3000
else
    echo "❌ No web server available. Please install Python 3, Node.js, or PHP"
    echo "💡 Or open frontend-temporal/index.html directly in your browser"
    exit 1
fi