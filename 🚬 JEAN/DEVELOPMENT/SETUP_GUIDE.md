# 🛠️ Guide d'Installation - Heroes of Time
## Installation et Configuration Complète

---

## 🎯 **PRÉSENTATION**

Ce guide vous accompagne dans l'installation et la configuration complète du projet **Heroes of Time**, moteur de jeu temporel quantique développé en Java Spring Boot avec interfaces web multiples.

---

## 📋 **PRÉREQUIS**

### **Système**
- **OS** : macOS, Linux, Windows
- **RAM** : 4GB minimum (8GB recommandé)
- **Espace disque** : 2GB minimum
- **Réseau** : Connexion internet pour dépendances

### **Logiciels Requis**
- **Java 17+** - Runtime Java
- **Maven 3.6+** - Gestionnaire de dépendances
- **Node.js 16+** - Pour les frontends
- **Yarn** - Gestionnaire de packages
- **Git** - Contrôle de version

### **Vérification des Prérequis**
```bash
# Vérifier Java
java -version

# Vérifier Maven
mvn -version

# Vérifier Node.js
node -v

# Vérifier Yarn
yarn -version

# Vérifier Git
git --version
```

---

## 🚀 **INSTALLATION RAPIDE**

### **1. Cloner le Repository**
```bash
git clone https://github.com/your-username/Heroes-of-Time.git
cd Heroes-of-Time
```

### **2. Installation Backend**
```bash
cd backend
mvn clean install
```

### **3. Installation Frontend**
```bash
cd frontend
yarn install
yarn build
```

### **4. Démarrage Complet**
```bash
# Retour à la racine
cd ..

# Démarrage automatique
./hots start
```

---

## 🔧 **INSTALLATION DÉTAILLÉE**

### **Backend Spring Boot**

#### **Structure du Backend**
```
backend/
├── src/main/java/com/heroesoftimepoc/temporalengine/
│   ├── controller/          # REST API endpoints
│   ├── service/            # Logique métier
│   ├── model/              # Entités JPA
│   └── repository/         # Accès aux données
├── src/main/resources/
│   ├── heroes/             # Définitions des héros
│   ├── custom-artifacts.json # Artefacts personnalisés
│   └── application.properties
└── target/                 # Compilation Maven
```

#### **Compilation et Démarrage**
```bash
cd backend

# Nettoyer et compiler
mvn clean compile

# Lancer en mode développement
mvn spring-boot:run

# Ou en mode production
mvn spring-boot:run -Dspring.profiles.active=prod
```

#### **Configuration Backend**
```properties
# application.properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:heroesoftime
spring.jpa.hibernate.ddl-auto=create-drop
logging.level.com.heroesoftimepoc=DEBUG
```

### **Frontends Multiples**

#### **Interface Principale (Port 8000)**
```bash
cd frontend

# Installation des dépendances
yarn install

# Build de production
yarn build

# Démarrage serveur
yarn start
```

#### **Interface Temporelle (Port 5174)**
```bash
cd frontend-temporal

# Installation
yarn install

# Démarrage
yarn dev
```

#### **Visualiseur Quantique (Port 8001)**
```bash
cd quantum-visualizer

# Installation
yarn install

# Démarrage
yarn start
```

#### **Object Viewer (Port 5175)**
```bash
cd frontend-legendary-ui

# Installation
yarn install

# Démarrage
yarn dev
```

---

## 🎮 **DÉMARRAGE AUTOMATIQUE**

### **Script Principal**
```bash
# Vérifier le statut
./hots status

# Démarrer tous les services
./hots start

# Arrêter tous les services
./hots stop

# Redémarrer
./hots restart
```

### **Scripts de Service**
```bash
# Démarrage backend
./scripts/actifs/start-services-background.sh

# Arrêt complet
./scripts/stop/all.sh

# Démarrage frontends
./scripts/start/all.sh
```

---

## 🧪 **TESTS ET VALIDATION**

### **Tests Backend**
```bash
cd backend

# Tests unitaires
mvn test

# Tests d'intégration
mvn test -Dtest=IntegrationTest

# Tests complets
mvn verify
```

### **Tests Frontend**
```bash
cd frontend

# Tests unitaires
yarn test

# Tests E2E
yarn test:e2e

# Linting
yarn lint
```

### **Tests Système Complet**
```bash
# Test rapide
./hots test quick

# Test complet
./hots test final

# Test spécifique
./scripts/test/test-temporal-decay-complete.sh
```

---

## 🔍 **DÉBOGAGE ET MONITORING**

### **Logs Backend**
```bash
# Logs en temps réel
tail -f backend/backend-active.log

# Logs Hibernate
grep "Hibernate:" backend/backend-active.log

# Logs API
grep "DEBUG.*nio-8080" backend/backend-active.log
```

### **Monitoring API**
```bash
# Santé du système
curl http://localhost:8080/api/health

# Statut des jeux
curl http://localhost:8080/api/temporal/games

# Test de création
curl -X POST http://localhost:8080/api/temporal/games \
  -H "Content-Type: application/json" \
  -d '{"gameName":"Test","playerId":"test"}'
```

### **Outils de Développement**
- **Spring Boot DevTools** - Rechargement automatique
- **H2 Console** - Interface web pour la DB (http://localhost:8080/h2-console)
- **Actuator** - Métriques et monitoring

---

## 🚀 **DÉPLOIEMENT**

### **Environnement de Développement**
```bash
# Backend
cd backend && mvn spring-boot:run

# Frontend
cd frontend && yarn dev

# Tests
./hots test quick
```

### **Environnement de Production**
```bash
# Build complet
./hots build

# Démarrage production
./hots start --prod

# Monitoring
./hots status
```

### **Configuration Production**
```properties
# application-prod.properties
server.port=8080
spring.datasource.url=jdbc:h2:file:./heroesoftime
spring.jpa.hibernate.ddl-auto=update
logging.level.com.heroesoftimepoc=INFO
```

---

## 🔧 **DÉPANNAGE**

### **Problèmes Courants**

#### **Port 8080 Occupé**
```bash
# Identifier le processus
lsof -i:8080

# Tuer le processus
kill -9 <PID>

# Ou nettoyer tous les ports
lsof -ti:8080 | xargs kill -9
```

#### **Erreur de Compilation Maven**
```bash
# Nettoyer le cache
mvn clean

# Mettre à jour les dépendances
mvn dependency:resolve

# Recompiler
mvn compile
```

#### **Erreur Node.js/Yarn**
```bash
# Nettoyer le cache
yarn cache clean

# Supprimer node_modules
rm -rf node_modules

# Réinstaller
yarn install
```

#### **Problème de Base de Données**
```bash
# Réinitialiser la DB
rm -f backend/heroesoftime.mv.db

# Redémarrer le backend
cd backend && mvn spring-boot:run
```

### **Logs d'Erreur**
```bash
# Backend
tail -f backend/backend-active.log

# Frontend
cd frontend && yarn dev

# Système
./hots status
```

---

## 📚 **RESSOURCES ADDITIONNELLES**

### **Documentation**
- **[Architecture Backend](../ARCHITECTURE/BACKEND_ARCHITECTURE.md)**
- **[API Reference](../ARCHITECTURE/API_REFERENCE.md)**
- **[Guide HOTS](../GAMEPLAY/HOTS_SCRIPTING.md)**

### **Exemples**
- **[Scénarios HOTS](../../game_assets/scenarios/hots/)**
- **[Scripts de Test](../../scripts/test/)**
- **[MEMENTO](../../MEMENTO/)**

### **Support**
- **GitHub Issues** - Rapports de bugs
- **GitHub Discussions** - Questions et discussions
- **MEMENTO** - Documentation centrale

---

## 🎯 **BONNES PRATIQUES**

### **Développement**
- ✅ **Tests automatisés** pour chaque fonctionnalité
- ✅ **Documentation** à jour dans MEMENTO/
- ✅ **Validation** des données d'entrée
- ✅ **Gestion d'erreurs** appropriée

### **Performance**
- ✅ **Optimisation** des requêtes DB
- ✅ **Cache** des données fréquentes
- ✅ **Monitoring** des performances
- ✅ **Tests de charge** réguliers

### **Sécurité**
- ✅ **Validation** des formules HOTS
- ✅ **Contrôle d'accès** aux artefacts
- ✅ **Protection** contre les exploits
- ✅ **Audit** des opérations sensibles

---

*Guide d'installation généré automatiquement par le système Heroes of Time*  
*Status: ✅ ACTIF*  
*Version: 2.0*  
*Build: SUCCESS*

---

**Dernière mise à jour** : 21 Juillet 2025 - Guide d'installation 