#!/bin/bash

echo "🚀 Starting Heroes of Time Application (Hot Reload Friendly)"
echo "============================================================="

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
        echo "$pids" | xargs kill -TERM 2>/dev/null || echo "$pids" | xargs kill -9 2>/dev/null
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

# Create logs directory
mkdir -p logs

# Function to check if a service is running
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=0
    
    echo "⏳ Waiting for $service_name to start..."
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -s $url > /dev/null 2>&1; then
            echo "✅ $service_name is running!"
            return 0
        fi
        
        sleep 2
        attempt=$((attempt + 1))
        echo -n "."
    done
    
    echo "❌ $service_name failed to start in time"
    return 1
}

# Check if we're in an interactive terminal
if [ -t 0 ]; then
    # Interactive mode - open in separate terminal tabs/windows
    echo ""
    echo "🖥️  Starting in INTERACTIVE mode (separate terminals)..."
    echo ""
    
    # Detect terminal type and open backend
    if command -v gnome-terminal &> /dev/null; then
        echo "🟢 Opening Backend in new terminal tab..."
        gnome-terminal --tab --title="Backend" --working-directory="$PWD/backend" -- bash -c "echo '🟢 Backend Starting...'; mvn spring-boot:run; exec bash"
    elif command -v osascript &> /dev/null; then
        # macOS
        echo "🟢 Opening Backend in new terminal tab..."
        osascript -e "tell application \"Terminal\" to do script \"cd $PWD/backend && echo '🟢 Backend Starting...' && mvn spring-boot:run\""
    else
        echo "🟢 Starting Backend in background..."
        cd backend
        mvn spring-boot:run &
        BACKEND_PID=$!
        cd ..
    fi
    
    # Wait for backend to start
    wait_for_service "http://localhost:8080/actuator/health" "Backend"
    
    sleep 3
    
    # Start frontend in separate terminal
    if command -v gnome-terminal &> /dev/null; then
        echo "🟦 Opening Frontend in new terminal tab..."
        gnome-terminal --tab --title="Frontend" --working-directory="$PWD/frontend" -- bash -c "echo '🟦 Frontend Starting...'; npm start; exec bash"
    elif command -v osascript &> /dev/null; then
        # macOS
        echo "🟦 Opening Frontend in new terminal tab..."
        osascript -e "tell application \"Terminal\" to do script \"cd $PWD/frontend && echo '🟦 Frontend Starting...' && npm start\""
    else
        echo "🟦 Starting Frontend in background..."
        cd frontend
        npm start &
        FRONTEND_PID=$!
        cd ..
    fi
    
    # Wait for frontend to start
    wait_for_service "http://localhost:3000" "Frontend"
    
    echo ""
    echo "🎉 Application started successfully in separate terminals!"
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend:  http://localhost:8080"
    echo "📊 Health:   http://localhost:8080/actuator/health"
    echo ""
    echo "💡 Hot reload is enabled in both terminals!"
    echo "🛑 To stop: Close the terminal tabs or run ./stop-app.sh"
    
else
    # Non-interactive mode - traditional background mode
    echo ""
    echo "🔄 Starting in BACKGROUND mode..."
    echo ""
    
    # Start backend
    echo "🟢 Starting Backend Server (Port 8080)..."
    cd backend
    mvn spring-boot:run > ../logs/backend.log 2>&1 &
    BACKEND_PID=$!
    echo "📝 Backend PID: $BACKEND_PID"
    cd ..
    
    # Wait for backend to start
    wait_for_service "http://localhost:8080/actuator/health" "Backend"
    
    # Start frontend
    echo "🟦 Starting Frontend Server (Port 3000)..."
    cd frontend
    npm start > ../logs/frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo "📝 Frontend PID: $FRONTEND_PID"
    cd ..
    
    # Wait for frontend to start
    wait_for_service "http://localhost:3000" "Frontend"
    
    # Save PIDs for stop script
    mkdir -p .pids
    echo $BACKEND_PID > .pids/backend.pid
    echo $FRONTEND_PID > .pids/frontend.pid
    
    echo ""
    echo "🎉 Application started successfully!"
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend:  http://localhost:8080"
    echo "📊 Health:   http://localhost:8080/actuator/health"
    echo ""
    echo "📝 To see backend logs: tail -f logs/backend.log"
    echo "📝 To see frontend logs: tail -f logs/frontend.log"
    echo "🛑 To stop the application, run: ./stop-app.sh"
fi

echo "" 