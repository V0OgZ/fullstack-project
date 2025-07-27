#!/bin/bash

# 🛋️ JEAN CANAPÉ LAUNCHER
# Lance tout depuis le canapé !

echo "🛋️ JEAN CANAPÉ LAUNCHER"
echo "======================="
echo ""

# Backend
echo "🚀 Lancement du Backend..."
cd backend
java -jar target/demo-0.0.1-SNAPSHOT.jar &
BACKEND_PID=$!
echo "✅ Backend lancé (PID: $BACKEND_PID)"
cd ..

# Attendre que le backend démarre
echo "⏳ Attente du backend..."
sleep 10

# Frontend Simple (Port 8000)
echo "🎮 Lancement Interface Simple..."
cd frontend-port8000
python3 -m http.server 8000 &
SIMPLE_PID=$!
echo "✅ Interface Simple lancée (PID: $SIMPLE_PID)"
cd ..

# Map Vince Vega (Port 8888)
echo "🔫 Lancement Map Vince Vega..."
cd dev/frontend
python3 -m http.server 8888 &
MAP_PID=$!
echo "✅ Map Vince Vega lancée (PID: $MAP_PID)"
cd ../..

# Frontend React (Port 3000)
echo "⚛️ Lancement Frontend React..."
cd frontend
npm start &
REACT_PID=$!
echo "✅ Frontend React lancé (PID: $REACT_PID)"
cd ..

echo ""
echo "🎉 TOUT EST LANCÉ !"
echo ""
echo "📍 URLs disponibles :"
echo "   - Backend API     : http://localhost:8080"
echo "   - Interface Simple: http://localhost:8000"
echo "   - Map Vince Vega  : http://localhost:8888/vince-vega-map-demo-backend.html"
echo "   - Frontend React  : http://localhost:3000"
echo ""
echo "🛋️ Tu peux rester sur ton canapé Jean !" 