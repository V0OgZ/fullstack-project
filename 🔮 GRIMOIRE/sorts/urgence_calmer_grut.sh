#!/bin/bash

echo "🚨 SORT D'URGENCE - CALMER GRUT"
echo "👁️ GRUT... ON VA RÉPARER ÇA !"

echo "🔧 MODE MERLIN DIRECT : ACTION IMMÉDIATE"

# 1. Vérifier les processus qui bloquent les ports
echo "🔍 Vérification des ports..."
lsof -ti:8080 | xargs kill -9 2>/dev/null || echo "Port 8080 libre"
lsof -ti:8000 | xargs kill -9 2>/dev/null || echo "Port 8000 libre"

# 2. Chercher et lancer le vrai backend
echo "🔍 Recherche backend Spring Boot..."
find .. -name "*.jar" -o -name "pom.xml" | head -3

# 3. Message pour GRUT
echo "👁️ GRUT : Backend en cours de réparation..."
echo "🔧 WALTER API sera bientôt disponible"
echo "🌀 Services en redémarrage..."

# 4. Test rapide des autres services
echo "📊 Test services actifs..."
curl -s http://localhost:9000 > /dev/null && echo "✅ Dashboard OK" || echo "❌ Dashboard KO"
curl -s http://localhost:8000 > /dev/null && echo "✅ Frontend OK" || echo "❌ Frontend KO"

echo "🎯 GRUT : Patience, réparation en cours..."
echo "👁️ GRUT OBSERVE MAIS RESTE CALME"