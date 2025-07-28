#!/bin/bash

echo '🧪 TEST RAPIDE DES INTERFACES HEROES OF TIME'
echo '============================================'
echo ''

# Fonction pour tester un port
test_port() {
    local port=$1
    local name=$2
    local url=$3
    
    echo -n "🔍 Test $name (port $port)... "
    
    if curl -s -o /dev/null -w "%{http_code}" "http://localhost:$port" | grep -q "200"; then
        echo "✅ ACTIF"
        echo "   URL: $url"
        # Afficher un aperçu du contenu
        echo -n "   Contenu: "
        curl -s "http://localhost:$port" | grep -o '<title>.*</title>' | sed 's/<[^>]*>//g' | head -1
        echo ""
    else
        echo "❌ INACTIF"
    fi
}

echo '📡 VÉRIFICATION DES SERVICES:'
echo ''

# Tester le backend
echo -n "🔍 Test Backend API (port 8080)... "
if curl -s -o /dev/null -w "%{http_code}" "http://localhost:8080/api/game/status" | grep -q "200\|404"; then
    echo "✅ ACTIF"
    echo "   Endpoints disponibles:"
    echo "   - /api/game/* (gestion des parties)"
    echo "   - /api/temporal/* (scripts temporels)"
    echo "   - /api/hero/* (gestion des héros)"
else
    echo "❌ INACTIF"
fi
echo ""

# Tester les UIs
test_port 8000 "Frontend Principal" "http://localhost:8000"
test_port 8001 "Quantum Visualizer" "http://localhost:8001"
test_port 8888 "Test Runner" "http://localhost:8888"

echo ''
echo '🎮 TEST D\'INTÉGRATION RAPIDE:'
echo ''

# Test de création de partie via l'API
echo -n "📝 Test création de partie... "
RESPONSE=$(curl -s -X POST http://localhost:8080/api/game/create \
    -H "Content-Type: application/json" \
    -d '{"gameName": "Test UI Quick", "maxPlayers": 2}' 2>/dev/null)

if echo "$RESPONSE" | grep -q "gameId"; then
    echo "✅ SUCCÈS"
    GAME_ID=$(echo "$RESPONSE" | grep -o '"gameId":[0-9]*' | grep -o '[0-9]*')
    echo "   Game ID créé: $GAME_ID"
    
    # Test d'exécution de script
    echo -n "🎯 Test script temporal... "
    SCRIPT_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/game/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d '{"script": "HERO(Ragnar)"}' 2>/dev/null)
    
    if echo "$SCRIPT_RESPONSE" | grep -q "success"; then
        echo "✅ SUCCÈS"
    else
        echo "❌ ÉCHEC"
    fi
else
    echo "❌ ÉCHEC"
fi

echo ''
echo '📊 RÉSUMÉ:'
echo '=========='

# Compter les services actifs
ACTIVE_COUNT=0
[ $(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8080/api/game/status" 2>/dev/null) == "200" -o $(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8080/api/game/status" 2>/dev/null) == "404" ] && ((ACTIVE_COUNT++))
[ $(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8000" 2>/dev/null) == "200" ] && ((ACTIVE_COUNT++))
[ $(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8001" 2>/dev/null) == "200" ] && ((ACTIVE_COUNT++))
[ $(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8888" 2>/dev/null) == "200" ] && ((ACTIVE_COUNT++))

echo "Services actifs: $ACTIVE_COUNT/4"

if [ $ACTIVE_COUNT -eq 4 ]; then
    echo ''
    echo '✅ TOUS LES SERVICES SONT OPÉRATIONNELS !'
    echo ''
    echo '🚀 PROCHAINES ÉTAPES:'
    echo '   1. Ouvrir http://localhost:8000 pour le jeu principal'
    echo '   2. Cliquer sur "New Game" pour créer une partie'
    echo '   3. Cliquer sur "Add Ragnar" pour ajouter un héros'
    echo '   4. Utiliser la console pour taper des scripts temporels'
    echo ''
    echo '📚 EXEMPLES DE SCRIPTS:'
    echo '   HERO(Arthur)              # Créer un héros'
    echo '   MOV(Arthur, @15,15)       # Déplacer un héros'
    echo '   ψ001: ⊙(Δt+2 @20,20 ⟶ MOV(Arthur, @20,20))  # État quantique'
    echo '   †ψ001                     # Effondrement quantique'
else
    echo ''
    echo '⚠️  CERTAINS SERVICES NE SONT PAS ACTIFS'
    echo ''
    echo 'Vérifiez les logs:'
    echo '   tail -f backend.log'
    echo '   tail -f frontend-principal.log'
    echo '   tail -f quantum-visualizer.log'
    echo '   tail -f test-runner.log'
fi

echo '' 