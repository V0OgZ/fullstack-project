#!/bin/bash

# =============================================
# 🔧 SCRIPT DE DIAGNOSTIC ET FIX JPA ENTITIES
# =============================================

echo "🔍 DIAGNOSTIC DU PROBLÈME JPA 'Not a managed type: class Game'"
echo "=============================================================="

# Vérification des annotations
echo "1️⃣ Vérification des annotations @Entity..."
grep -r "@Entity" backend/src/main/java/com/heroesoftimepoc/temporalengine/model/

echo ""
echo "2️⃣ Vérification des imports Jakarta Persistence..."
grep -r "import jakarta.persistence" backend/src/main/java/com/heroesoftimepoc/temporalengine/model/

echo ""
echo "3️⃣ Vérification de la configuration JPA..."
cat backend/src/main/java/com/heroesoftimepoc/temporalengine/config/JpaConfig.java

echo ""
echo "4️⃣ Vérification des dépendances Maven..."
grep -A 20 "<dependencies>" backend/pom.xml | grep -B 20 "</dependencies>" | grep -E "hibernate|jpa|spring-data"

echo ""
echo "5️⃣ Tentative de correction automatique..."

# Création d'un fichier temporaire pour le package-info.java
echo "📝 Création d'un package-info.java pour s'assurer que le package est bien scanné..."

mkdir -p backend/src/main/java/com/heroesoftimepoc/temporalengine/model/
cat > backend/src/main/java/com/heroesoftimepoc/temporalengine/model/package-info.java << 'EOF'
/**
 * Ce package contient tous les modèles d'entités JPA pour le moteur temporel.
 * Assurez-vous que toutes les classes dans ce package sont correctement annotées avec @Entity.
 */
@org.springframework.lang.NonNullApi
package com.heroesoftimepoc.temporalengine.model;
EOF

echo "✅ package-info.java créé avec succès."

# Création d'un application.properties de secours
echo "📝 Création d'un application.properties de secours avec configuration JPA explicite..."

cp backend/src/main/resources/application.properties backend/src/main/resources/application.properties.backup

cat >> backend/src/main/resources/application.properties << 'EOF'

# CONFIGURATION JPA EXPLICITE AJOUTÉE POUR RÉSOUDRE LE PROBLÈME "Not a managed type"
spring.jpa.properties.hibernate.physical_naming_strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
spring.jpa.properties.hibernate.implicit_naming_strategy=org.hibernate.boot.model.naming.ImplicitNamingStrategyJpaCompliantImpl
spring.jpa.properties.hibernate.archive.scanner=org.hibernate.boot.archive.scan.internal.StandardScanner
spring.jpa.properties.hibernate.archive.autodetection=class,hbm
spring.jpa.properties.hibernate.scan.packages=com.heroesoftimepoc.temporalengine.model
spring.jpa.mapping-resources=META-INF/orm.xml
EOF

echo "✅ application.properties mis à jour avec configuration JPA explicite."

# Création d'un fichier orm.xml pour mapping explicite
echo "📝 Création d'un fichier orm.xml pour mapping explicite des entités..."

mkdir -p backend/src/main/resources/META-INF/
cat > backend/src/main/resources/META-INF/orm.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<entity-mappings xmlns="https://jakarta.ee/xml/ns/persistence/orm"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="https://jakarta.ee/xml/ns/persistence/orm
                                     https://jakarta.ee/xml/ns/persistence/orm/orm_3_0.xsd"
                 version="3.0">
    
    <package>com.heroesoftimepoc.temporalengine.model</package>
    
    <entity class="com.heroesoftimepoc.temporalengine.model.Game">
        <table name="games"/>
        <attributes>
            <id name="id">
                <generated-value strategy="IDENTITY"/>
            </id>
        </attributes>
    </entity>
    
    <!-- Ajoutez d'autres entités ici si nécessaire -->
    
</entity-mappings>
EOF

echo "✅ orm.xml créé avec succès."

echo ""
echo "6️⃣ Nettoyage des fichiers de compilation précédents..."
rm -rf backend/target/classes/com/heroesoftimepoc/temporalengine/model/
echo "✅ Nettoyage terminé."

echo ""
echo "7️⃣ Tentative de compilation du backend..."
cd backend && mvn clean compile

echo ""
echo "🎯 DIAGNOSTIC TERMINÉ"
echo "===================="
echo "Si la compilation a réussi, essayez de démarrer le backend avec:"
echo "cd backend && mvn spring-boot:run"
echo ""
echo "Si le problème persiste, vérifiez les points suivants:"
echo "1. Assurez-vous que toutes les classes @Entity ont un constructeur sans argument"
echo "2. Vérifiez les dépendances Maven (spring-boot-starter-data-jpa, hibernate-core)"
echo "3. Vérifiez que l'annotation @Entity utilise bien jakarta.persistence et non javax.persistence"
echo "4. Essayez d'ajouter @Table(name=\"games\") à la classe Game"
echo ""
echo "🔍 Pour plus d'informations, consultez les logs détaillés du backend." 