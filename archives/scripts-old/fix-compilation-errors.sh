#!/bin/bash

# Script de correction rapide des erreurs de compilation

echo "🔧 CORRECTION DES ERREURS DE COMPILATION"
echo "========================================"

# Corriger les appels de méthodes dans TemporalEngineService.java
echo "Correction des appels de méthodes..."

# Remplacer les appels incorrects par les bons noms
sed -i.bak 's/processQuantumObservationTriggers/processObservationTriggers/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/updateQuantumTileStates/updateTileStates/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/setupQuantumObservationTrigger/setupObservationTrigger/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/createGameHero/createHero/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/moveGameHero/moveHero/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/createGameEntity/createEntity/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/useGameItem/useItem/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/executeGameBattle/executeBattle/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/buildGameStructure/buildStructure/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/collectGameResource/collectResource/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/recruitGameUnit/recruitUnit/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/castGameSpell/castSpell/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/learnGameSpell/learnSpell/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/levelUpGameHero/levelUpHero/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/exploreGameTerritory/exploreTerritory/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/equipGameArtifact/equipArtifact/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/siegeGameTarget/siegeTarget/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java
sed -i.bak 's/captureGameObjective/captureObjective/g' backend/src/main/java/com/heroesoftimepoc/temporalengine/service/TemporalEngineService.java

echo "✅ Corrections appliquées au service principal"

# Tester la compilation
echo "🔧 Test de compilation..."
cd backend
mvn clean compile -q > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Compilation réussie !"
else
    echo "❌ Erreurs de compilation persistantes"
    echo "Affichage des erreurs..."
    mvn clean compile | grep -A 5 -B 5 "ERROR"
fi

# Nettoyer les fichiers de backup
find . -name "*.bak" -delete

echo "🎯 Correction terminée" 