#!/bin/bash

echo "🎭 TEST SCÉNARIO : Les Pieds Nickelés et Hawkeye ouvrent l'Opéopticon"
echo "================================================================"

# Vérifier que le backend est démarré
if ! curl -s http://localhost:8080/actuator/health > /dev/null; then
    echo "❌ Backend non démarré sur le port 8080"
    echo "💡 Démarrez avec: ./hots debug"
    exit 1
fi

echo "✅ Backend détecté sur le port 8080"

# Créer un nouveau jeu
echo "🎮 Création d'un nouveau jeu..."
GAME_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/games" \
    -H "Content-Type: application/json" \
    -d '{"id": "pieds-nickeles-opticon"}')

echo "📋 Réponse création jeu: $GAME_RESPONSE"

# Créer les héros
echo "👥 Création des héros..."

# Les Pieds Nickelés
curl -s -X POST "http://localhost:8080/api/games/pieds-nickeles-opticon/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "HERO(Ribouldingue, 5, 5)"}' > /dev/null

curl -s -X POST "http://localhost:8080/api/games/pieds-nickeles-opticon/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "HERO(Croquignol, 6, 5)"}' > /dev/null

curl -s -X POST "http://localhost:8080/api/games/pieds-nickeles-opticon/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "HERO(Filochard, 7, 5)"}' > /dev/null

# Hawkeye
curl -s -X POST "http://localhost:8080/api/games/pieds-nickeles-opticon/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "HERO(Hawkeye, 10, 10)"}' > /dev/null

echo "✅ Héros créés"

# Faire parler les héros
echo "💬 Dialogue des héros..."

curl -s -X POST "http://localhost:8080/api/games/pieds-nickeles-opticon/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "SAY(Ribouldingue, \"Moi j'\''ai un plan pour ouvrir l'\''Opéopticon !\")"}' > /dev/null

curl -s -X POST "http://localhost:8080/api/games/pieds-nickeles-opticon/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "SAY(Croquignol, \"Attendez, laissez-moi réfléchir...\")"}' > /dev/null

curl -s -X POST "http://localhost:8080/api/games/pieds-nickeles-opticon/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "SAY(Filochard, \"Moi je me tire si ça foire !\")"}' > /dev/null

# Hawkeye intervient
curl -s -X POST "http://localhost:8080/api/games/pieds-nickeles-opticon/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "SAY(Hawkeye, \"Je vois tout ! Laissez-moi ouvrir l'\''Opéopticon !\")"}' > /dev/null

# Ouvrir l'Opéopticon
echo "🔍 Ouverture de l'Opéopticon..."

curl -s -X POST "http://localhost:8080/api/games/pieds-nickeles-opticon/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "USE(ABILITY, VISION_OPTOPICON, Hawkeye)"}' > /dev/null

# Placer un point de vision
curl -s -X POST "http://localhost:8080/api/games/pieds-nickeles-opticon/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "CREATE(MARKER, VisionPoint, 15, 15)"}' > /dev/null

# Créer l'artefact de victoire
curl -s -X POST "http://localhost:8080/api/games/pieds-nickeles-opticon/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "CREATE(ARTIFACT, OpticonKey, 15, 15)"}' > /dev/null

echo "✅ Opéopticon ouvert et point de vision placé !"

# Récupérer l'état final du jeu
echo "📊 État final du jeu..."
FINAL_STATE=$(curl -s "http://localhost:8080/api/games/pieds-nickeles-opticon/state")

echo "🎯 État du jeu:"
echo "$FINAL_STATE" | jq '.' 2>/dev/null || echo "$FINAL_STATE"

echo ""
echo "🎉 SCÉNARIO TERMINÉ !"
echo "🏆 Les Pieds Nickelés et Hawkeye ont ouvert l'Opéopticon !"
echo "📍 Point de vision placé sur la map aux coordonnées (15, 15)"
echo "🔑 Artefact OpticonKey créé" 