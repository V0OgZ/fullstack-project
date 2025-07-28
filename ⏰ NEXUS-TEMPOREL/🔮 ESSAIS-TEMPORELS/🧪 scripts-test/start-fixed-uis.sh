#!/bin/bash

echo "🚀 Starting Heroes of Time - Fixed UIs"
echo "======================================"

# Check if services are already running
echo "1. Checking current service status..."
BACKEND_PID=$(ps aux | grep "TemporalEngineApplication" | grep -v grep | awk '{print $2}')
FRONTEND_CLASSIC_PID=$(ps aux | grep "python3.*8000" | grep -v grep | awk '{print $2}')
FRONTEND_TEMPORAL_PID=$(ps aux | grep "python3.*5173" | grep -v grep | awk '{print $2}')

if [ ! -z "$BACKEND_PID" ]; then
    echo "   ✅ Backend (Spring Boot) is running - PID: $BACKEND_PID"
else
    echo "   ❌ Backend not running - will start it"
    cd backend && mvn spring-boot:run > backend.log 2>&1 &
    sleep 5
    cd ..
fi

if [ ! -z "$FRONTEND_CLASSIC_PID" ]; then
    echo "   ✅ Frontend Classic (8000) is running - PID: $FRONTEND_CLASSIC_PID"
else
    echo "   ❌ Frontend Classic not running - will start it"
    cd frontend && python3 -m http.server 8000 > ../frontend-classic.log 2>&1 &
    cd ..
fi

if [ ! -z "$FRONTEND_TEMPORAL_PID" ]; then
    echo "   ✅ Frontend Temporal (5173) is running - PID: $FRONTEND_TEMPORAL_PID"
else
    echo "   ❌ Frontend Temporal not running - will start it"
    cd frontend-temporal && python3 -m http.server 5173 > ../frontend-temporal.log 2>&1 &
    cd ..
fi

echo ""
echo "2. Testing all services..."
sleep 2

# Test backend
BACKEND_TEST=$(curl -s "http://localhost:8080/api/temporal/health" | grep -o '"status":"healthy"')
if [ "$BACKEND_TEST" == '"status":"healthy"' ]; then
    echo "   ✅ Backend API is healthy"
else
    echo "   ❌ Backend API is not responding"
fi

# Test frontends
CLASSIC_TEST=$(curl -s "http://localhost:8000/" | head -1)
if [[ "$CLASSIC_TEST" == *"<!DOCTYPE html>"* ]]; then
    echo "   ✅ Frontend Classic is accessible"
else
    echo "   ❌ Frontend Classic is not accessible"
fi

TEMPORAL_TEST=$(curl -s "http://localhost:5173/" | head -1)
if [[ "$TEMPORAL_TEST" == *"<!DOCTYPE html>"* ]]; then
    echo "   ✅ Frontend Temporal is accessible"
else
    echo "   ❌ Frontend Temporal is not accessible"
fi

echo ""
echo "🎯 PROBLEM FIXED: Frontend Temporal 'fail to fetch' on New Game"
echo "================================================================"
echo ""
echo "ISSUE: Frontend Temporal was calling /api/game/* endpoints that don't exist"
echo "SOLUTION: Fixed all endpoints to use /api/temporal/games/*"
echo ""
echo "Fixed endpoints:"
echo "• /api/game/create → /api/temporal/games"
echo "• /api/game/{id} → /api/temporal/games/{id}/state"
echo "• /api/game/{id}/script → /api/temporal/games/{id}/script"
echo "• /api/game/demo → /api/temporal/demo/create-sample-game"
echo ""
echo "🎮 Test the FIXED UIs:"
echo "====================="
echo "• Frontend Classic: http://localhost:8000/"
echo "  - Click 'New Game' button"
echo "  - Should work correctly (was already working)"
echo ""
echo "• Frontend Temporal: http://localhost:5173/"
echo "  - Click '🎲 New Game' button"
echo "  - Should work correctly NOW (was failing before)"
echo ""
echo "Both UIs now use the correct /api/temporal/* endpoints!"
echo ""
echo "🧪 Quick test of game creation:"
TEST_GAME=$(curl -s -X POST "http://localhost:8080/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d '{"gameName": "UI Fix Success", "playerId": "test"}')
echo "   $TEST_GAME" 