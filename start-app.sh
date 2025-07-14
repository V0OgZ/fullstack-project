#!/bin/bash

echo "🚀 Starting Heroes of Time Application"
echo "======================================"

# Function to kill processes on specific ports
kill_port() {
    local port=$1
    local name=$2
    echo "🔍 Checking for existing $name processes on port $port..."
    
    # Find and kill processes using the port
    local pids=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pids" ]; then
        echo "⚠️  Found existing $name processes: $pids"
        echo "🔫 Killing existing $name processes..."
        echo "$pids" | xargs kill -9 2>/dev/null
        sleep 2
        echo "✅ $name processes stopped"
    else
        echo "✅ No existing $name processes found"
    fi
}

# Stop existing processes
echo ""
echo "🛑 Stopping existing processes..."
kill_port 8080 "Backend"
kill_port 3000 "Frontend"

echo ""
echo "⏳ Waiting for ports to be released..."
sleep 3

# Start backend
echo ""
echo "🟢 Starting Backend Server (Port 8080)..."
cd backend
mvn spring-boot:run > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "📝 Backend PID: $BACKEND_PID"
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 15

# Check if backend is running
if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
    echo "✅ Backend is running on http://localhost:8080"
else
    echo "❌ Backend failed to start. Check logs/backend.log"
    exit 1
fi

# Start frontend
echo ""
echo "🟦 Starting Frontend Server (Port 3000)..."
cd frontend
npm start > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "📝 Frontend PID: $FRONTEND_PID"
cd ..

# Wait for frontend to start
echo "⏳ Waiting for frontend to initialize..."
sleep 10

# Check if frontend is running
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend is running on http://localhost:3000"
else
    echo "❌ Frontend failed to start. Check logs/frontend.log"
    exit 1
fi

# Save PIDs for stop script
mkdir -p .pids
echo $BACKEND_PID > .pids/backend.pid
echo $FRONTEND_PID > .pids/frontend.pid

echo ""
echo "🎉 Application started successfully!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:8080"
echo "📊 Health:   http://localhost:8080/api/health"
echo ""
echo "📝 To see backend logs: tail -f logs/backend.log"
echo "📝 To see frontend logs: tail -f logs/frontend.log"
echo ""
echo "🛑 To stop the application, run: ./stop-app.sh"
echo "" 