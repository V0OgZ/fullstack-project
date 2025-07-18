#!/bin/bash

# 🛑 Heroes of Time - ARRÊT COMPLET
# ================================

echo "🛑 Heroes of Time - ARRÊT DES SERVICES"
echo "======================================"

echo "🧹 Arrêt des processus Spring Boot..."
pkill -f "spring-boot:run" 2>/dev/null || true

echo "🧹 Arrêt des serveurs Python..."
pkill -f "python3 -m http.server" 2>/dev/null || true

echo "🧹 Arrêt des services Node.js..."
pkill -f "npm start" 2>/dev/null || true

echo "🧹 Libération des ports..."
for port in 8080 8000 5173 8001 3000; do
    lsof -ti:$port 2>/dev/null | xargs -r kill -9 2>/dev/null || true
done

sleep 2

echo "✅ Tous les services Heroes of Time arrêtés!"
echo "📊 Logs conservés:"
echo "• backend-master.log"
echo "• frontend-classique-master.log"
echo "• frontend-temporal-master.log"
echo "• quantum-visualizer-master.log" 