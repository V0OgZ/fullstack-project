#!/bin/bash

echo "Starting Heroes of Time - Complete System"
echo "========================================"

# Kill any existing processes
echo "Stopping existing processes..."
pkill -f "spring-boot:run" 2>/dev/null || true
pkill -f "python3 -m http.server" 2>/dev/null || true
sleep 2

# Start backend
echo "Starting backend (port 8080)..."
cd backend && mvn spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 10

# Start frontend classic
echo "Starting frontend classic (port 8000)..."
cd frontend && python3 -m http.server 8000 > ../frontend-classic.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Start frontend temporal
echo "Starting frontend temporal (port 5173)..."
cd frontend-temporal && python3 -m http.server 5173 > ../frontend-temporal.log 2>&1 &
TEMPORAL_PID=$!
cd ..

echo ""
echo "All services started!"
echo "===================="
echo "Backend API: http://localhost:8080/api/temporal/health"
echo "Frontend Classic: http://localhost:8000"
echo "Frontend Temporal: http://localhost:5173"
echo ""
echo "Test the system:"
echo "cd scripts-test && ./demo-heroes-of-might-magic-complete.sh"
echo ""
echo "To stop all services:"
echo "pkill -f spring-boot:run && pkill -f http.server" 