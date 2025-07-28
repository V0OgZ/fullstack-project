# 🚀 Guide de Déploiement - Heroes of Time

## ✅ WebSocket Désactivé

L'application utilise maintenant un système de polling fiable (toutes les 5 secondes) au lieu de WebSocket. Plus de messages d'erreur "Real-time connection failed" !

## 🏗️ Structure du Projet

```
fullstack-project/
├── 🖥️ backend/          # Spring Boot (Java) - Port 8080
├── 🌐 frontend/         # React TypeScript - Port 3000
├── start-app.sh      # Script de démarrage
├── stop-app.sh       # Script d'arrêt
└── test-app.sh       # Script de test
```

## 🔧 Configuration Locale

### Prérequis
- Java 17+
- Node.js 18+
- npm ou yarn

### Démarrage Local
```bash
# Démarrer l'application complète
./start-app.sh

# Ou manuellement :
# Terminal 1 - Backend
cd backend
./mvnw spring-boot:run

# Terminal 2 - Frontend  
cd frontend
npm install
npm start
```

## 🌐 Déploiement sur Railway

### 1. Configuration Railway

Mettre à jour `railway.json` :
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd backend && ./mvnw clean package -DskipTests",
    "watchPatterns": [
      "🖥️ backend/**",
      "🌐 frontend/**"
    ]
  },
  "deploy": {
    "startCommand": "cd backend && java -jar target/demo-0.0.1-SNAPSHOT.jar",
    "healthcheckPath": "/actuator/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2. Configuration Nixpacks

Mettre à jour `nixpacks.toml` :
```toml
[phases.setup]
nixPkgs = ["openjdk17", "nodejs-18_x"]

[phases.build]
cmds = [
  "cd frontend && npm install",
  "cd frontend && npm run build",
  "cd backend && ./mvnw clean package -DskipTests"
]

[start]
cmd = "cd backend && java -jar target/demo-0.0.1-SNAPSHOT.jar"
```

### 3. Variables d'Environnement

Dans Railway, définir :
```
SPRING_PROFILES_ACTIVE=production
SERVER_PORT=8080
```

## 🌍 Déploiement sur Heroku

### 1. Procfile
```
web: cd backend && java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### 2. Configuration Backend
Ajouter dans `🖥️ backend/src/main/resources/application-production.properties` :
```properties
# Port dynamique Heroku
server.port=${PORT:8080}

# Base de données H2 (pour demo)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.h2.console.enabled=false

# CORS pour production
app.cors.allowed-origins=${FRONTEND_URL:http://localhost:3000}
```

### 3. Build Hook
Créer `package.json` à la racine :
```json
{
  "name": "heroes-of-time",
  "version": "1.0.0",
  "scripts": {
    "heroku-postbuild": "cd frontend && npm install && npm run build && cd ../backend && ./mvnw clean package -DskipTests"
  }
}
```

## ☁️ Déploiement sur Vercel (Frontend) + Backend séparé

### Frontend sur Vercel
```bash
cd frontend
vercel --prod
```

### Backend sur Railway/Heroku
Déployer seulement le dossier `🖥️ backend/`

### Configuration CORS
Dans `🖥️ backend/src/main/java/com/example/demo/config/WebConfig.java` :
```java
@CrossOrigin(origins = "https://votre-app.vercel.app")
```

## 🐳 Déploiement Docker

### 1. Dockerfile Backend
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY 🖥️ backend/target/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

### 2. Dockerfile Frontend
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY 🌐 frontend/package*.json ./
RUN npm install
COPY 🌐 frontend/ .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 3. Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: 
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "8080:8080"
    
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

## 🔍 Vérification du Déploiement

### Endpoints à tester :
- `https://your-app.com/actuator/health` - Santé du backend
- `https://your-app.com/api/scenarios/all` - API des scénarios
- `https://your-app.com/api/multiplayer/sessions` - Sessions multijoueur

### Fonctionnalités à vérifier :
- ✅ Sélection de scénarios
- ✅ Création de sessions multijoueur
- ✅ Rejoindre des sessions
- ✅ Polling des mises à jour (toutes les 5 secondes)
- ✅ Démarrage des parties

## 🐛 Dépannage

### Erreur "CORS"
Vérifier la configuration CORS dans `WebConfig.java`

### Erreur "Port déjà utilisé"
```bash
./stop-app.sh
./start-app.sh
```

### Frontend ne charge pas les scénarios
Vérifier que l'API backend est accessible :
```bash
curl https://your-backend-url/api/scenarios/all
```

## 📝 Notes Importantes

1. **Base de données** : H2 en mémoire (données perdues au redémarrage)
2. **WebSocket** : Désactivé - utilise polling fiable
3. **Performance** : Polling toutes les 5 secondes = expérience fluide
4. **Sécurité** : Pas d'authentification actuellement (développement)

## 🎯 Prêt pour la Production

L'application est maintenant prête pour le déploiement avec :
- ✅ WebSocket désactivé (plus d'erreurs)
- ✅ Polling fiable toutes les 5 secondes
- ✅ Multiplayer fonctionnel
- ✅ Génération de noms épiques
- ✅ Interface utilisateur moderne

Choisissez votre plateforme et suivez les instructions correspondantes ! 