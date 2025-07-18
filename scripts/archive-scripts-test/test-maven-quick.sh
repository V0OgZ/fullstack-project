#!/bin/bash

# 🧪 Heroes of Time - Tests Maven Rapides
# =======================================

echo "🧪 Heroes of Time - Tests Maven"
echo "==============================="

cd backend

echo "🔧 Compilation..."
mvn clean compile -q

echo "🧪 Tests unitaires..."
mvn test -q | grep -E "(Tests run|BUILD|FAILURE|SUCCESS)" | tail -5

echo "✅ Tests terminés"
echo "📊 Voir les détails: cd backend && mvn test" 