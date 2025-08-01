#!/bin/bash

echo "🔧 APPLYING BACKEND FIXES FROM MAIN BRANCH"
echo "========================================"

# Stop all services
echo "⏹️ Stopping all services..."
./⚙️ scripts/actifs/stop-all-services.sh

# Make sure we have the package-info.java file
echo "📝 Ensuring package-info.java exists..."
mkdir -p 🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/model/
cat > 🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/model/package-info.java << 'EOF'
/**
 * Ce package contient tous les modèles d'entités JPA pour le moteur temporel.
 * Assurez-vous que toutes les classes dans ce package sont correctement annotées avec @Entity.
 */
@org.springframework.lang.NonNullApi
package com.heroesoftimepoc.temporalengine.model;
EOF

echo "✅ package-info.java created/updated"

# Make sure JPA config is correct
echo "📝 Checking JpaConfig.java..."
grep -q "@EntityScan" 🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/config/JpaConfig.java
if [ $? -ne 0 ]; then
    echo "⚠️ JpaConfig.java missing @EntityScan, fixing..."
    sed -i '' 's/@Configuration/@Configuration\n@EntityScan("com.heroesoftimepoc.temporalengine.model")/' 🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/config/JpaConfig.java
    echo "✅ Added @EntityScan to JpaConfig.java"
else
    echo "✅ JpaConfig.java already has @EntityScan"
fi

# Add import if missing
grep -q "import org.springframework.boot.autoconfigure.domain.EntityScan" 🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/config/JpaConfig.java
if [ $? -ne 0 ]; then
    echo "⚠️ JpaConfig.java missing EntityScan import, fixing..."
    sed -i '' 's/package com.heroesoftimepoc.temporalengine.config;/package com.heroesoftimepoc.temporalengine.config;\n\nimport org.springframework.boot.autoconfigure.domain.EntityScan;/' 🖥️ backend/src/main/java/com/heroesoftimepoc/temporalengine/config/JpaConfig.java
    echo "✅ Added EntityScan import to JpaConfig.java"
else
    echo "✅ JpaConfig.java already has EntityScan import"
fi

# Clean the target directory
echo "🧹 Cleaning target directory..."
rm -rf 🖥️ backend/target/classes/com/heroesoftimepoc/temporalengine/model/
echo "✅ Target directory cleaned"

# Compile the backend
echo "🔨 Compiling backend..."
cd backend && mvn clean compile
cd ..

# Start all services
echo "🚀 Starting all services..."
./⚙️ scripts/actifs/start-services-background.sh

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 15

# Test the backend
echo "🧪 Testing backend..."
curl -s "http://localhost:8080/api/game/status" || echo "Backend still not ready"

echo ""
echo "🎯 BACKEND FIXES APPLIED"
echo "======================="
echo "If the backend is still not working, try:"
echo "1. Check backend logs: tail -f backend-*.log"
echo "2. Look for JPA/Hibernate errors"
echo "3. Verify that all @Entity classes have proper annotations"
echo "4. Restart the services manually: ./⚙️ scripts/actifs/stop-all-services.sh && ./⚙️ scripts/actifs/start-services-background.sh" 