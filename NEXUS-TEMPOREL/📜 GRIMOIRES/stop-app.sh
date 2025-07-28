#!/bin/bash

echo "🛑 Stopping Heroes of Time Application"
echo "======================================"

# Function to kill processes on specific ports
kill_port() {
    local port=$1
    local name=$2
    echo "🔍 Checking for $name processes on port $port..."
    
    # Find and kill processes using the port
    local pids=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pids" ]; then
        echo "🔫 Killing $name processes: $pids"
        echo "$pids" | xargs kill -9 2>/dev/null
        sleep 2
        echo "✅ $name processes stopped"
    else
        echo "✅ No $name processes found"
    fi
}

# Kill processes by PID if available
if [ -f ".pids/backend.pid" ]; then
    BACKEND_PID=$(cat .pids/backend.pid)
    echo "🔫 Killing backend process: $BACKEND_PID"
    kill -9 $BACKEND_PID 2>/dev/null
    rm .pids/backend.pid
fi

if [ -f ".pids/frontend.pid" ]; then
    FRONTEND_PID=$(cat .pids/frontend.pid)
    echo "🔫 Killing frontend process: $FRONTEND_PID"
    kill -9 $FRONTEND_PID 2>/dev/null
    rm .pids/frontend.pid
fi

# Kill any remaining processes on the ports
echo ""
echo "🧹 Cleaning up any remaining processes..."
kill_port 8080 "Backend"
kill_port 3000 "Frontend"

# Clean up PID directory
if [ -d ".pids" ]; then
    rmdir .pids 2>/dev/null
fi

echo ""
echo "✅ Application stopped successfully!"
echo "📝 Logs are preserved in logs/ directory" 