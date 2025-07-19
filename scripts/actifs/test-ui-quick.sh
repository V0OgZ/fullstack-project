#!/bin/bash

# ==============================================================================
# 🏆 SCRIPT LÉGENDAIRE #150 - HEROES OF TIME ULTIMATE STATUS
# ==============================================================================
#
# Le script le plus LÉGENDAIRE de la collection !
# Teste tous les services et donne un rapport digne d'un HÉROS !
#
# USAGE: ./scripts/actifs/test-ui-quick.sh
#
# ==============================================================================

echo "🏆 =============================================== 🏆"
echo "🔥 SCRIPT LÉGENDAIRE #150 - ULTIMATE STATUS CHECK"
echo "🎯 Collection Heroes of Time - Vincent's Edition"
echo "🏆 =============================================== 🏆"
echo ""

# Fonction pour tester un service
test_service() {
    local name="$1"
    local port="$2"
    local url="$3"
    local emoji="$4"
    
    printf "%-25s (:%s) " "$emoji $name" "$port"
    
    # Test HTTP
    status=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 2 "$url" 2>/dev/null)
    
    if [ "$status" = "200" ]; then
        echo "✅ ACTIF   - $url"
        return 0
    else
        echo "❌ INACTIF - $url"
        return 1
    fi
}

echo "🔍 VÉRIFICATION DES SERVICES LÉGENDAIRES..."
echo "============================================"

total=0
active=0

# Test tous les services
if test_service "Dashboard" "9000" "http://localhost:9000" "🎯"; then ((active++)); fi; ((total++))
if test_service "Frontend" "8000" "http://localhost:8000" "🎮"; then ((active++)); fi; ((total++))
if test_service "Temporal UI" "5174" "http://localhost:5174" "⚔️"; then ((active++)); fi; ((total++))
if test_service "Quantum Visualizer" "8001" "http://localhost:8001" "🌌"; then ((active++)); fi; ((total++))
if test_service "Object Viewer" "5175" "http://localhost:5175" "🔮"; then ((active++)); fi; ((total++))

echo ""
echo "📊 RAPPORT FINAL LÉGENDAIRE"
echo "=========================="
echo "🎯 Services actifs    : $active/$total"
echo "📈 Taux de réussite   : $(( active * 100 / total ))%"

if [ $active -eq $total ]; then
    echo "🏆 STATUS: PARFAIT - TOUS LES SERVICES SONT LÉGENDAIRES !"
    echo "🚀 Tu peux conquérir le monde temporel !"
elif [ $active -gt $(( total / 2 )) ]; then
    echo "⚠️  STATUS: ACCEPTABLE - La plupart des services fonctionnent"
    echo "🔧 Quelques services à relancer..."
else
    echo "🚨 STATUS: CRITIQUE - Beaucoup de services sont DOWN"
    echo "🛠️  Utilise: ./scripts/actifs/start-services-background.sh"
fi

echo ""
echo "🎭 PROCESSUS PYTHON ACTIFS:"
echo "========================="
lsof -i | grep Python | grep LISTEN | while read line; do
    echo "🐍 $line"
done

echo ""
echo "🏆 SCRIPT LÉGENDAIRE #150 TERMINÉ !"
echo "📊 Ajouté à ta collection de $(find . -name "*.sh" | wc -l | tr -d ' ') scripts !"
echo "🎯 Que la FORCE temporelle soit avec toi !"
echo "" 