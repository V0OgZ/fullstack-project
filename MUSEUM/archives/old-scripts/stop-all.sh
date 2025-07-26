#!/bin/bash

echo "Stopping Heroes of Time - All Services"
echo "======================================"

# Stop backend
echo "Stopping backend..."
pkill -f "spring-boot:run" 2>/dev/null || true

# Stop frontends
echo "Stopping frontends..."
pkill -f "python3 -m http.server" 2>/dev/null || true

# Wait a bit
sleep 2

# Check if processes are still running
if pgrep -f "spring-boot:run" > /dev/null; then
    echo "Force killing backend..."
    pkill -9 -f "spring-boot:run" 2>/dev/null || true
fi

if pgrep -f "python3 -m http.server" > /dev/null; then
    echo "Force killing frontends..."
    pkill -9 -f "python3 -m http.server" 2>/dev/null || true
fi

echo ""
echo "All services stopped!"
echo "===================="
echo "Logs available in:"
echo "- backend.log"
echo "- frontend-classic.log"
echo "- frontend-temporal.log" 