#!/bin/bash

echo "🚀 DÉMARRAGE EN MODE SÉCURISÉ (SANS SPAM)"
echo "========================================="
echo ""

# Démarrer le backend
echo "1️⃣ Démarrage du backend..."
cd backend && ./mvnw spring-boot:run > ../logs/backend-safe.log 2>&1 &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"

# Attendre que le backend soit prêt
echo "2️⃣ Attente du backend..."
# Use a while loop to wait for the port to be open
while ! nc -z localhost 8080; do   
  sleep 0.1 # wait for 1/10 of a second before check again
done
echo "   ✅ Backend prêt!"

# Démarrer le frontend
echo "3️⃣ Démarrage du frontend..."
cd ../frontend && npm start > ../logs/frontend-safe.log 2>&1 &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"

# Attendre que le frontend soit prêt
echo "4️⃣ Attente du frontend..."
while ! nc -z localhost 3000; do   
  sleep 0.1
done
echo "   ✅ Frontend prêt!"

echo ""
echo "✅ Application démarrée!"
echo ""
echo "📌 Pour arrêter:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "📊 Logs:"
echo "   tail -f logs/backend-safe.log"
echo "   tail -f logs/frontend-safe.log" 