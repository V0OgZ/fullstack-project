#!/bin/bash

# 🎨 FORD'S STYLUS OF REALITY - ARTISTIC MESSAGE SYSTEM TEST ✨
# Test du système de messages artistiques inspiré par Anthor le Fordien

echo "🎨 FORD'S STYLUS OF REALITY - ARTISTIC TEST ✨"
echo "=============================================="

# Démarrer le frontend sur port 8000
echo "🌟 Starting Frontend Temporal Engine (Port 8000)..."
cd frontend
python3 -m http.server 8000 > ../frontend-stylus.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

# Attendre que le frontend démarre
sleep 3

# Vérifier que le backend tourne (port 8080)
echo "🔍 Checking Backend Status..."
if curl -s http://localhost:8080/health > /dev/null; then
    echo "✅ Backend is running on port 8080"
else
    echo "❌ Backend not running - starting it..."
    cd ../backend
    mvn spring-boot:run > ../backend-stylus.log 2>&1 &
    cd ../frontend
    echo "⏳ Waiting for backend to start..."
    sleep 10
fi

echo ""
echo "🎭 FORD'S STYLUS ARTISTIC SYSTEM TEST"
echo "======================================"
echo ""
echo "📖 LORE: Anthor le Fordien possède le 'Ford's Stylus of Reality'"
echo "    Un simple stylo qui réécrit le code fondamental de l'existence"
echo "    +15 spellPower, +25% realityManipulation"
echo ""
echo "🎨 FEATURES TO TEST:"
echo "   ✨ Floating quotes above heroes"
echo "   📜 Console messages with translations"
echo "   🌟 Stylus painting effects"
echo "   🎭 Reality manipulation interface"
echo ""

# Ouvrir l'interface
echo "🌐 Opening Temporal Engine Interface..."
if command -v open > /dev/null; then
    open http://localhost:8000
elif command -v xdg-open > /dev/null; then
    xdg-open http://localhost:8000
else
    echo "📋 Manual: Open http://localhost:8000 in your browser"
fi

echo ""
echo "🎮 TESTING INSTRUCTIONS:"
echo "========================"
echo ""
echo "1. 🎮 Click 'New Game' to initialize Ford's Stylus system"
echo "2. 🎭 Look for artistic welcome message in console style"
echo "3. 👤 Click on heroes to see floating quotes with magical effects"
echo "4. 🌟 Watch for automatic quotes from:"
echo "   - Anthor le Fordien: 'These violent delights have violent ends'"
echo "   - Jean-Grofignon: 'ψ État quantique en superposition ⊙'"
echo "5. ⚡ Perform actions to see temporal event messages"
echo "6. 🚬 Click 'Joint Magique' for timeline relaxation message"
echo ""
echo "🎨 VISUAL EFFECTS TO OBSERVE:"
echo "   - Stylus painting strokes when quotes appear"
echo "   - Floating bubbles above characters"
echo "   - Fading console messages with translations"
echo "   - Magical particle effects"
echo "   - Color-coded message types"
echo ""

# Tests automatiques d'API
echo "🔧 BACKEND API TESTS:"
echo "==================="

echo "📡 Testing Fourth Wall endpoints..."

echo "🏗️ Building Tour d'Ancrage Zone 8..."
curl -X POST http://localhost:8080/api/fourth-wall/build-anchor-tower \
  -H "Content-Type: application/json" \
  -d '{"worldId": "zone8", "playerId": "anthor", "resources": {"metal": 500, "crystal": 300}}' \
  2>/dev/null | jq . || echo "❌ Build endpoint failed"

echo "⚡ Activating Tour d'Ancrage..."
curl -X POST http://localhost:8080/api/fourth-wall/activate-anchor-tower \
  -H "Content-Type: application/json" \
  -d '{"towerId": "zone8-tower", "activatorId": "anthor"}' \
  2>/dev/null | jq . || echo "❌ Activation endpoint failed"

echo "📊 Checking tower status..."
curl -s http://localhost:8080/api/fourth-wall/anchor-tower/zone8-tower/status \
  2>/dev/null | jq . || echo "❌ Status endpoint failed"

echo ""
echo "🎨 FORD'S STYLUS SYSTEM IS READY!"
echo "=================================="
echo ""
echo "🌟 The artistic reality-painting interface is now active"
echo "🎭 Every message is painted with Ford's Stylus magic"
echo "✨ Experience the power of narrative rewriting"
echo ""
echo "Press Ctrl+C to stop all services when done testing"
echo ""

# Garder le script actif
trap "echo '🛑 Stopping services...'; kill $FRONTEND_PID 2>/dev/null; exit 0" INT

# Monitoring loop
while true; do
    echo "🎨 Ford's Stylus System Running - $(date)"
    echo "   Frontend: http://localhost:8000"
    echo "   Backend: http://localhost:8080"
    echo "   Backend Health: $(curl -s http://localhost:8080/health 2>/dev/null || echo 'DOWN')"
    echo ""
    sleep 30
done 