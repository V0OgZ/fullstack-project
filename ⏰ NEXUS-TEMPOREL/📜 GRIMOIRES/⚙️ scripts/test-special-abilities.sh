#!/bin/bash
# Test des capacités spéciales des scénarios épiques

echo "⚡ ========================================="
echo "   TEST DES CAPACITÉS SPÉCIALES"
echo "   Heroes of Time - Scénarios Épiques"
echo "⚡ ========================================="

API_URL="http://localhost:8080/api"

# Créer une partie de test
echo -e "\n📖 Création d'une partie de test..."
GAME_RESPONSE=$(curl -s -X POST "$API_URL/games" \
  -H "Content-Type: application/json" \
  -d '{"gameName": "test_abilities", "maxPlayers": 4}')

GAME_ID=$(echo $GAME_RESPONSE | grep -o '"id":[0-9]*' | cut -d: -f2)
echo "✓ Partie créée: ID=$GAME_ID"

# Créer les héros
echo -e "\n🦸 Création des héros..."

# Coalition des Trois
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"command": "HERO(Jean-Grofignon)"}' > /dev/null
echo "✓ Jean-Grofignon créé"

curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"command": "HERO(Claudius)"}' > /dev/null
echo "✓ Claudius créé"

curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"command": "HERO(Chlamydius)"}' > /dev/null
echo "✓ Chlamydius créé"

# Boss
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"command": "HERO(Omega-Zero)"}' > /dev/null
echo "✓ Omega-Zéro créé"

# Positionner les héros
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"command": "MOV(Jean-Grofignon, @5,5)"}' > /dev/null

curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"command": "MOV(Claudius, @6,5)"}' > /dev/null

curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"command": "MOV(Chlamydius, @5,6)"}' > /dev/null

curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"command": "MOV(Omega-Zero, @10,10)"}' > /dev/null

# Test 1: PRE_EXISTENCE_STRIKE
echo -e "\n\n💥 Test 1: FRAPPE PRÉ-EXISTANTE"
echo "Omega-Zéro attaque Jean avant d'exister..."

RESPONSE=$(curl -s -X POST "$API_URL/abilities/pre-existence-strike" \
  -H "Content-Type: application/json" \
  -d "gameId=$GAME_ID&attackerName=Omega-Zero&targetName=Jean-Grofignon")

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✓ Frappe pré-existante réussie!"
    echo "$RESPONSE" | grep -o '"damage":[0-9]*' | cut -d: -f2 | xargs -I {} echo "  Dégâts: {}"
    echo "$RESPONSE" | grep -o '"paradox":"[^"]*"' | cut -d: -f2
else
    echo "✗ Échec: $RESPONSE"
fi

# Test 2: MEMORY_INFECTION
echo -e "\n\n🧠 Test 2: INFECTION MÉMORIELLE"
echo "Omega infecte les souvenirs de la Coalition..."

RESPONSE=$(curl -s -X POST "$API_URL/abilities/memory-infection" \
  -H "Content-Type: application/json" \
  -d '{"targetNames": ["Jean-Grofignon", "Claudius", "Chlamydius"]}' \
  -G --data-urlencode "gameId=$GAME_ID" --data-urlencode "casterName=Omega-Zero")

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✓ Infection mémorielle réussie!"
    echo "$RESPONSE" | grep -o '"affected_heroes":[0-9]*' | cut -d: -f2 | xargs -I {} echo "  Héros affectés: {}"
else
    echo "✗ Échec: $RESPONSE"
fi

# Test 3: REALITY_RECOMPILE
echo -e "\n\n🔧 Test 3: RECOMPILATION DE RÉALITÉ"
echo "Claudius tente de recompiler la zone..."

# D'abord donner de l'énergie à Claudius
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"command": "CREATE(ITEM, temporal_battery, HERO:Claudius)"}' > /dev/null

RESPONSE=$(curl -s -X POST "$API_URL/abilities/reality-recompile?gameId=$GAME_ID&casterName=Claudius&x=10&y=10&radius=3")

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✓ Recompilation réussie!"
    echo "$RESPONSE" | grep -o '"tiles_affected":[0-9]*' | cut -d: -f2 | xargs -I {} echo "  Tuiles affectées: {}"
elif echo "$RESPONSE" | grep -q '"success":false'; then
    echo "⚠️  Recompilation échouée - bugs introduits!"
    echo "$RESPONSE" | grep -o '"error_type":"[^"]*"' | cut -d: -f2
else
    echo "✗ Erreur: $RESPONSE"
fi

# Test 4: SCRIBE_NONEXISTENCE
echo -e "\n\n📜 Test 4: ÉCRITURE DU NÉANT"
echo "Chlamydius efface un artefact d'Omega..."

# Donner un parchemin et de l'énergie à Chlamydius
curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"command": "CREATE(ITEM, parchemin_sale, HERO:Chlamydius)"}' > /dev/null

curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
  -H "Content-Type: application/json" \
  -d '{"command": "CREATE(ITEM, orbe_echos, HERO:Omega-Zero)"}' > /dev/null

RESPONSE=$(curl -s -X POST "$API_URL/abilities/scribe-nonexistence?gameId=$GAME_ID&scribeName=Chlamydius&targetType=ITEM&targetName=orbe_echos")

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✓ Effacement réussi!"
    echo "$RESPONSE" | grep -o '"message":"[^"]*"' | cut -d: -f2
else
    echo "✗ Échec: $RESPONSE"
fi

# Test 5: CREATE_FALSE_HEROES
echo -e "\n\n👥 Test 5: CRÉATION DE FAUX HÉROS"
echo "Omega crée des copies maléfiques..."

RESPONSE=$(curl -s -X POST "$API_URL/abilities/create-false-heroes" \
  -H "Content-Type: application/json" \
  -d '["Jean-Grofignon", "Claudius", "Chlamydius"]' \
  -G --data-urlencode "gameId=$GAME_ID")

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✓ Faux héros créés!"
    echo "$RESPONSE" | grep -o '"false_heroes_created":[0-9]*' | cut -d: -f2 | xargs -I {} echo "  Nombre: {}"
else
    echo "✗ Échec: $RESPONSE"
fi

# Test 6: Liste des capacités
echo -e "\n\n📋 Test 6: LISTE DES CAPACITÉS"
RESPONSE=$(curl -s "$API_URL/abilities/list")
echo "✓ Capacités disponibles:"
echo "$RESPONSE" | grep -o '"name":"[^"]*"' | cut -d: -f2 | sed 's/"//g' | sed 's/^/  - /'

# État final
echo -e "\n\n📊 ÉTAT FINAL DE LA PARTIE"
curl -s "$API_URL/games/$GAME_ID/state" | grep -E "(currentTurn|heroes)" | sed 's/,/\n/g' | head -20

echo -e "\n⚡ ========================================="
echo "   FIN DES TESTS - CAPACITÉS SPÉCIALES"
echo "⚡ =========================================" 