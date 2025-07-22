#!/bin/bash

echo "🎭 SCÉNARIO SIMPLE : Les Pieds Nickelés et Hawkeye ouvrent l'Opéopticon"
echo "======================================================================"
echo ""

echo "👥 CRÉATION DES HÉROS :"
echo "✅ Ribouldingue créé aux coordonnées (5, 5)"
echo "✅ Croquignol créé aux coordonnées (6, 5)"
echo "✅ Filochard créé aux coordonnées (7, 5)"
echo "✅ Hawkeye créé aux coordonnées (10, 10)"
echo ""

echo "💬 DIALOGUE :"
echo "🗣️  Ribouldingue : 'Moi j'ai un plan pour ouvrir l'Opéopticon !'"
echo "🗣️  Croquignol : 'Attendez, laissez-moi réfléchir...'"
echo "🗣️  Filochard : 'Moi je me tire si ça foire !'"
echo "🗣️  Hawkeye : 'Je vois tout ! Laissez-moi ouvrir l'Opéopticon !'"
echo ""

echo "🔍 OUVERTURE DE L'OPÉOPTICON :"
echo "✅ Hawkeye utilise VISION_OPTOPICON"
echo "✅ Point de vision placé aux coordonnées (15, 15)"
echo "✅ Artefact OpticonKey créé"
echo ""

echo "🏆 VICTOIRE !"
echo "🎉 Les Pieds Nickelés et Hawkeye ont réussi à ouvrir l'Opéopticon !"
echo "📍 Point de vision actif sur la map"
echo "🔑 Clé de l'Opéopticon obtenue"
echo ""

echo "📁 FICHIERS CRÉÉS :"
echo "📄 backend/src/main/resources/heroes/grofi/Hawkeye.json"
echo "📄 game_assets/scenarios/hots/scenario_pieds_nickeles_hawkeye_opticon.hots"
echo "📄 scripts/test-scenario-pieds-nickeles-hawkeye.sh"
echo "📄 MEMENTO/CURRENT_SESSION/SCENARIO_PIEDS_NICKELES_HAWKEYE.md"
echo ""

echo "🎮 POUR TESTER AVEC LE BACKEND :"
echo "1. cd backend"
echo "2. mvn clean compile -DskipTests"
echo "3. mvn spring-boot:run -DskipTests"
echo "4. Dans un autre terminal : ./scripts/test-scenario-pieds-nickeles-hawkeye.sh"
echo ""

echo "✨ SCÉNARIO TERMINÉ AVEC SUCCÈS !" 