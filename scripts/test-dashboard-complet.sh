#!/bin/bash

echo "🎯 TEST COMPLET DU DASHBOARD HEROES OF TIME"
echo "============================================"
echo ""

# Vérifier que tous les services sont démarrés
echo "🔍 Vérification des services..."
./hots status

echo ""
echo "🧪 Test des URLs du dashboard..."
echo "================================"

# Fonction pour tester une URL
test_url() {
    local name="$1"
    local url="$2"
    local status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status" = "200" ]; then
        echo "✅ $name: $status - OK"
    else
        echo "❌ $name: $status - ERREUR"
    fi
}

# Tester toutes les URLs
test_url "Centre de Replay" "http://localhost:9000/replay-center.html"
test_url "Mode Éthéré" "http://localhost:8000/ethereal-mode.html"
test_url "Admin Multijoueur" "http://localhost:8000/admin-multiplayer.html"
test_url "Interface Temporelle" "http://localhost:5174"
test_url "Collection & Grammar" "http://localhost:5175"
test_url "Test Runner" "http://localhost:8888"
test_url "Dashboard Principal" "http://localhost:9000/dashboard.html"

echo ""
echo "🎮 Test des boutons du dashboard..."
echo "==================================="

# Ouvrir le dashboard dans le navigateur
echo "🌐 Ouverture du dashboard..."
open http://localhost:9000/dashboard.html

echo ""
echo "📋 Instructions de test manuel :"
echo "================================"
echo "1. Cliquez sur '🎬 Centre de Replay' - Doit ouvrir le centre de replay"
echo "2. Cliquez sur '🌌 Mode Éthéré' - Doit ouvrir l'interface temporelle"
echo "3. Cliquez sur '🎮 Interface Admin' - Doit ouvrir l'admin multijoueur"
echo "4. Cliquez sur '🔮 Collection & Grammar' - Doit ouvrir la collection"
echo "5. Cliquez sur '🧪 Test Runner' - Doit ouvrir le test runner"
echo ""
echo "⚠️  Si une page blanche s'ouvre, le service correspondant est mort"
echo "💡 Utilisez './hots restart' pour redémarrer tous les services"

echo ""
echo "🔧 Vérification des processus..."
echo "================================"
echo "Processus sur les ports critiques :"
lsof -i :9000 | head -2
lsof -i :8000 | head -2
lsof -i :5174 | head -2
lsof -i :5175 | head -2
lsof -i :8888 | head -2

echo ""
echo "✅ Test complet terminé !" 