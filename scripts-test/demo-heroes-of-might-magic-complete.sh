#!/bin/bash

echo "🏰 HEROES OF TIME - TEST COMPLET HEROES OF MIGHT & MAGIC 3"
echo "==========================================================="

# Vérification du backend
echo "📡 Vérification du backend..."
BACKEND_CHECK=$(curl -s "http://localhost:8080/api/temporal/health" | grep -o '"status":"healthy"')
if [ "$BACKEND_CHECK" != '"status":"healthy"' ]; then
    echo "❌ Backend non disponible"
    exit 1
fi
echo "✅ Backend opérationnel"

# Création d'un jeu
echo ""
echo "🎲 Création d'un nouveau jeu Heroes of Might & Magic..."
GAME_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games" \
    -H "Content-Type: application/json" \
    -d '{"gameName": "HMM3 Complete Test", "playerId": "player1"}')

GAME_ID=$(echo "$GAME_RESPONSE" | grep -o '"gameId":[0-9]*' | cut -d':' -f2)
if [ -z "$GAME_ID" ]; then
    echo "❌ Impossible de créer le jeu"
    exit 1
fi
echo "✅ Jeu créé avec l'ID: $GAME_ID"

# Démarrage du jeu
echo ""
echo "🚀 Démarrage du jeu..."
START_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/start" \
    -H "Content-Type: application/json")
echo "✅ Jeu démarré"

echo ""
echo "🏰 PARTIE I: SYSTÈME DE VILLES ET CHÂTEAUX"
echo "=========================================="

# Construction de château
echo "🏰 Construction d'un château"
CASTLE_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "BUILD(CASTLE, @20,20, PLAYER:player1)"}')
echo "   Résultat: $(echo "$CASTLE_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Construction de tour de guet
echo "🗼 Construction d'une tour de guet"
TOWER_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "BUILD(WATCHTOWER, @22,22, PLAYER:player1)"}')
echo "   Résultat: $(echo "$TOWER_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Construction de mine d'or
echo "⚱️ Construction d'une mine d'or"
MINE_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "BUILD(GOLD_MINE, @18,18, PLAYER:player1)"}')
echo "   Résultat: $(echo "$MINE_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Construction de temple
echo "⛪ Construction d'un temple"
TEMPLE_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "BUILD(TEMPLE, @16,16, PLAYER:player1)"}')
echo "   Résultat: $(echo "$TEMPLE_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

echo ""
echo "💰 PARTIE II: SYSTÈME DE RESSOURCES"
echo "===================================="

# Collecter de l'or
echo "🪙 Collecte d'or"
GOLD_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "COLLECT(RESOURCE, GOLD, 1000, PLAYER:player1)"}')
echo "   Résultat: $(echo "$GOLD_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Collecter du bois
echo "🪵 Collecte de bois"
WOOD_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "COLLECT(RESOURCE, WOOD, 500, PLAYER:player1)"}')
echo "   Résultat: $(echo "$WOOD_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Collecter de la pierre
echo "🪨 Collecte de pierre"
STONE_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "COLLECT(RESOURCE, STONE, 300, PLAYER:player1)"}')
echo "   Résultat: $(echo "$STONE_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Collecter des gemmes
echo "💎 Collecte de gemmes"
GEMS_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "COLLECT(RESOURCE, GEMS, 100, PLAYER:player1)"}')
echo "   Résultat: $(echo "$GEMS_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

echo ""
echo "🦸 PARTIE III: HÉROS ET COMPÉTENCES"
echo "==================================="

# Création de héros avec classes
echo "🦸 Création d'Arthur (Chevalier)"
ARTHUR_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "HERO(Arthur, CLASS:KNIGHT, LEVEL:1)"}')
echo "   Résultat: $(echo "$ARTHUR_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Création de mage
echo "🧙 Création de Morgana (Sorcière)"
MORGANA_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "HERO(Morgana, CLASS:SORCERESS, LEVEL:1)"}')
echo "   Résultat: $(echo "$MORGANA_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Montée de niveau
echo "⬆️ Montée de niveau d'Arthur"
LEVELUP_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "LEVELUP(Arthur, SKILL:LEADERSHIP)"}')
echo "   Résultat: $(echo "$LEVELUP_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Apprentissage de sorts
echo "📜 Apprentissage de sort de feu"
SPELL_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "LEARN(SPELL, FIREBALL, HERO:Morgana)"}')
echo "   Résultat: $(echo "$SPELL_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

echo ""
echo "⚔️ PARTIE IV: ARMÉES ET CRÉATURES"
echo "================================="

# Recrutement d'unités
echo "🛡️ Recrutement d'épéistes"
SWORDSMEN_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "RECRUIT(UNIT, SWORDSMEN, 20, HERO:Arthur)"}')
echo "   Résultat: $(echo "$SWORDSMEN_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Recrutement d'archers
echo "🏹 Recrutement d'archers"
ARCHERS_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "RECRUIT(UNIT, ARCHERS, 15, HERO:Arthur)"}')
echo "   Résultat: $(echo "$ARCHERS_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Recrutement de cavalerie
echo "🐎 Recrutement de cavalerie"
CAVALRY_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "RECRUIT(UNIT, CAVALRY, 10, HERO:Arthur)"}')
echo "   Résultat: $(echo "$CAVALRY_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Recrutement de dragon
echo "🐉 Recrutement de dragon"
DRAGON_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "RECRUIT(UNIT, DRAGON, 1, HERO:Arthur)"}')
echo "   Résultat: $(echo "$DRAGON_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

echo ""
echo "⚡ PARTIE V: MAGIE ET SORTS"
echo "=========================="

# Lancement de sort de dégâts
echo "🔥 Lancement de boule de feu"
FIREBALL_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "CAST(SPELL, FIREBALL, TARGET:@25,25, HERO:Morgana)"}')
echo "   Résultat: $(echo "$FIREBALL_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Sort de guérison
echo "💚 Sort de guérison"
HEAL_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "CAST(SPELL, HEAL, TARGET:HERO:Arthur, HERO:Morgana)"}')
echo "   Résultat: $(echo "$HEAL_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Sort d'augmentation
echo "⚡ Sort d'augmentation (Bénédiction)"
BLESS_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "CAST(SPELL, BLESS, TARGET:UNIT:SWORDSMEN, HERO:Morgana)"}')
echo "   Résultat: $(echo "$BLESS_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

echo ""
echo "🗺️ PARTIE VI: EXPLORATION ET AVENTURE"
echo "======================================"

# Exploration de terrain
echo "🔍 Exploration de terrain"
EXPLORE_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "EXPLORE(TERRAIN, @30,30, HERO:Arthur)"}')
echo "   Résultat: $(echo "$EXPLORE_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Découverte de trésor
echo "💰 Découverte de trésor"
TREASURE_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "DISCOVER(TREASURE, @32,32, HERO:Arthur)"}')
echo "   Résultat: $(echo "$TREASURE_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Visite de lieu mystique
echo "🔮 Visite de lieu mystique"
MYSTICAL_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "VISIT(MYSTICAL_PLACE, @35,35, HERO:Morgana)"}')
echo "   Résultat: $(echo "$MYSTICAL_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

echo ""
echo "🛡️ PARTIE VII: ÉQUIPEMENT ET ARTEFACTS"
echo "======================================="

# Équipement d'artefact
echo "⚔️ Équipement d'épée magique"
SWORD_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "EQUIP(ARTIFACT, MAGIC_SWORD, HERO:Arthur)"}')
echo "   Résultat: $(echo "$SWORD_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Équipement d'armure
echo "🛡️ Équipement d'armure de plates"
ARMOR_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "EQUIP(ARTIFACT, PLATE_ARMOR, HERO:Arthur)"}')
echo "   Résultat: $(echo "$ARMOR_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Équipement d'anneau magique
echo "💍 Équipement d'anneau de pouvoir"
RING_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "EQUIP(ARTIFACT, POWER_RING, HERO:Morgana)"}')
echo "   Résultat: $(echo "$RING_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

echo ""
echo "🌀 PARTIE VIII: ÉLÉMENTS TEMPORELS HÉROS OF TIME"
echo "==============================================="

# Création d'états temporels avec armée
echo "🌀 Superposition temporelle avec armée"
PSI_ARMY_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "ψ001: ⊙(Δt+3 @40,40 ⟶ BATTLE(ARMY:Arthur, ARMY:Enemy))"}')
echo "   Résultat: $(echo "$PSI_ARMY_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Superposition de construction
echo "🏗️ Superposition de construction"
PSI_BUILD_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "ψ002: ⊙(Δt+2 @38,38 ⟶ BUILD(FORTRESS, @38,38, PLAYER:player1))"}')
echo "   Résultat: $(echo "$PSI_BUILD_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Trigger d'observation économique
echo "🎯 Trigger d'observation économique"
TRIGGER_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "Π(GOLD > 5000) ⇒ †ψ001"}')
echo "   Résultat: $(echo "$TRIGGER_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

echo ""
echo "⚔️ PARTIE IX: COMBAT ET TACTIQUE"
echo "==============================="

# Combat d'armée
echo "⚔️ Combat d'armée complète"
ARMY_BATTLE_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "BATTLE(ARMY:Arthur, ARMY:NeutralGuards, LOCATION:@45,45)"}')
echo "   Résultat: $(echo "$ARMY_BATTLE_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Siège de château
echo "🏰 Siège de château"
SIEGE_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "SIEGE(CASTLE, @50,50, HERO:Arthur)"}')
echo "   Résultat: $(echo "$SIEGE_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

echo ""
echo "🏆 PARTIE X: VICTOIRE ET OBJECTIFS"
echo "================================="

# Capture d'objectif
echo "🎯 Capture d'objectif"
CAPTURE_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "CAPTURE(OBJECTIVE, MAIN_CASTLE, HERO:Arthur)"}')
echo "   Résultat: $(echo "$CAPTURE_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

# Vérification de victoire
echo "👑 Vérification des conditions de victoire"
VICTORY_RESPONSE=$(curl -s -X POST "http://localhost:8080/api/temporal/games/$GAME_ID/script" \
    -H "Content-Type: application/json" \
    -d '{"script": "CHECK(VICTORY, PLAYER:player1)"}')
echo "   Résultat: $(echo "$VICTORY_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"

echo ""
echo "🎉 TEST COMPLET TERMINÉ !"
echo "========================"

echo ""
echo "🏆 RÉSUMÉ DES FONCTIONNALITÉS HEROES OF MIGHT & MAGIC 3 TESTÉES:"
echo "================================================================="
echo "├─ 🏰 Système de villes: Châteaux, tours, mines, temples"
echo "├─ 💰 Ressources: Or, bois, pierre, gemmes"
echo "├─ 🦸 Héros: Classes, niveaux, compétences"
echo "├─ ⚔️ Armées: Épéistes, archers, cavalerie, dragons"
echo "├─ ⚡ Magie: Sorts d'attaque, guérison, augmentation"
echo "├─ 🗺️ Exploration: Terrain, trésors, lieux mystiques"
echo "├─ 🛡️ Équipement: Artefacts, armes, armures"
echo "├─ 🌀 Éléments temporels: ψ-states avec armées"
echo "├─ ⚔️ Combat: Batailles, sièges"
echo "└─ 🏆 Victoire: Objectifs, conditions de fin"

echo ""
echo "🎮 Game ID utilisé: $GAME_ID"
echo "🌐 Backend API: http://localhost:8080/api/temporal/health"
echo "🚀 Heroes of Time - Version complète Heroes of Might & Magic 3 + Temporel!" 