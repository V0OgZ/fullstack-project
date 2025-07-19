#!/bin/bash

# 🎯 SCRIPT HEROES OF TIME - Start Services Background CORRIGÉ
# ============================================================
# Démarre TOUS les services Heroes of Time en arrière-plan permanent
# Version CORRIGÉE selon les ports documentés dans .cursorrules

echo "🚀 ============================================================"
echo "🎯 LANCEMENT SERVICES HEROES OF TIME - VERSION CORRIGÉE"
echo "🚀 ============================================================"

# Fonction pour tuer les processus sur un port
kill_port() {
    local port=$1
    echo "🔧 Nettoyage port $port..."
    lsof -ti :$port | xargs kill -9 2>/dev/null || true
}

# Nettoyage des ports SELON .cursorrules
echo "🧹 Nettoyage des ports..."
kill_port 9000
kill_port 8000
kill_port 8080
kill_port 5174
kill_port 8001
kill_port 5175
kill_port 8888

sleep 2

# 1. Dashboard Unifié (Port 9000) - FICHIER CORRECT
echo "🎯 Démarrage Dashboard Unifié..."
cd /Users/admin/HOT/Heroes-of-Time
python3 -c "
import http.server
import socketserver
import os

class DashboardHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '/dashboard':
            try:
                with open('dashboard.html', 'r', encoding='utf-8') as f:
                    content = f.read()
                self.send_response(200)
                self.send_header('Content-type', 'text/html; charset=utf-8')
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
            except FileNotFoundError:
                self.send_error(404, 'Dashboard not found')
        else:
            super().do_GET()

with socketserver.TCPServer(('', 9000), DashboardHandler) as httpd:
    print('🎯 Dashboard Unifié démarré sur port 9000')
    httpd.serve_forever()
" > /dev/null 2>&1 &

# 2. Frontend Principal (Port 8000)
echo "🎮 Démarrage Frontend Principal..."
cd /Users/admin/HOT/Heroes-of-Time/frontend
python3 -m http.server 8000 > /dev/null 2>&1 &

# 3. Interface Temporelle (Port 5174)
echo "⚔️ Démarrage Interface Temporelle..."
cd /Users/admin/HOT/Heroes-of-Time/frontend-temporal
python3 -m http.server 5174 > /dev/null 2>&1 &

# 4. Quantum Visualizer (Port 8001)
echo "🌌 Démarrage Quantum Visualizer..."
cd /Users/admin/HOT/Heroes-of-Time/quantum-visualizer
python3 -m http.server 8001 > /dev/null 2>&1 &

# 5. Object Viewer (Port 5175) - SERVEUR UNIFIÉ
echo "🔮 Démarrage Object Viewer..."
cd /Users/admin/HOT/Heroes-of-Time
python3 visualizer-server.py 5175 > /dev/null 2>&1 &

# 6. Test Runner (Port 8888) - RÉCUPÉRÉ de 872e0d7
echo "🧪 Démarrage Test Runner..."
cd /Users/admin/HOT/Heroes-of-Time
python3 -m http.server 8888 > /dev/null 2>&1 &

sleep 3

# Vérification des services SELON .cursorrules
echo ""
echo "✅ VÉRIFICATION DES SERVICES:"
echo "================================"

check_service() {
    local port=$1
    local name=$2
    if lsof -i :$port > /dev/null 2>&1; then
        echo "✅ $name (Port $port): ACTIF"
    else
        echo "❌ $name (Port $port): ERREUR"
    fi
}

check_service 9000 "Dashboard Unifié"
check_service 8000 "Frontend Principal"
check_service 5174 "Interface Temporelle"
check_service 8001 "Quantum Visualizer"
check_service 5175 "Object Viewer"
check_service 8888 "Test Runner"

echo ""
echo "🎯 DASHBOARD PRINCIPAL: http://localhost:9000/dashboard.html"
echo "🎮 FRONTEND: http://localhost:8000"
echo "⚔️ TEMPOREL: http://localhost:5174"
echo "🌌 QUANTUM: http://localhost:8001"
echo "🔮 OBJECT VIEWER: http://localhost:5175"
echo "🧪 TEST RUNNER: http://localhost:8888"
echo ""
echo "🚀 SERVICES LANCÉS SELON .cursorrules !"
echo "🎯 Ports FIXES - Ne JAMAIS changer sans concertation !"
echo "============================================================" 