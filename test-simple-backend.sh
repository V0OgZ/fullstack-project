#!/bin/bash

echo "🧪 TEST SIMPLE SANS ARTEFACTS DYNAMIQUES"

# Configuration
BACKEND_URL="http://localhost:8080"

# Test basique
echo "Test GET /api/games..."
response=$(curl -s -X GET "$BACKEND_URL/api/games" || echo "ERROR")
echo "Réponse: $response"

# Test création jeu
echo "Test POST /api/games..."
response=$(curl -s -X POST "$BACKEND_URL/api/games" \
    -H "Content-Type: application/json" \
    -d "{\"id\": 123}" || echo "ERROR")
echo "Réponse: $response"


