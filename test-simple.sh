#!/bin/bash

echo "🧪 TEST SIMPLE BACKEND"

# Test simple - créer et utiliser un artefact hardcodé 
response=$(curl -s -X POST "http://localhost:8080/api/games" -H "Content-Type: application/json" -d '{"id": 999}')
echo "Création jeu: $response"

response=$(curl -s -X POST "http://localhost:8080/api/games/999/script" -H "Content-Type: application/json" -d '{"script": "HERO(Tesla, 5, 5)"}')
echo "Création héros: $response"

response=$(curl -s -X POST "http://localhost:8080/api/games/999/script" -H "Content-Type: application/json" -d '{"script": "USE(ARTIFACT, quantum_mirror, HERO:Tesla)"}')
echo "Test artefact: $response" 