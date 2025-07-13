# Heroes of Time - Railway Deployment Guide

## 🚀 Structure du Projet

```
fullstack-project/
├── server/           # Backend Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── Procfile     # Configuration Railway
├── client/          # Frontend React
│   ├── src/
│   ├── package.json
│   └── build/       # Build généré
├── railway.json     # Configuration Railway
└── README.md
```

## 🛠️ Build Local

### 1. Build Frontend
```bash
cd client
npm install
npm run build
```

### 2. Copier Frontend vers Backend
```bash
cd client
npm run copy-to-server
```

### 3. Build Backend
```bash
cd server
mvn clean package -DskipTests
```

Le JAR sera généré dans `server/target/monjeu.jar`

## 🚀 Déploiement Railway

### Configuration Automatique
Le projet est configuré pour Railway avec :
- **Procfile** : `web: java -jar target/monjeu.jar`
- **railway.json** : Configuration build et deploy
- **Maven plugins** : Build automatique du frontend

### Étapes de Déploiement

1. **Connecter à Railway**
   ```bash
   railway login
   railway init
   ```

2. **Déployer**
   ```bash
   railway up
   ```

### Build Process Railway
1. Railway détecte le projet Java
2. Exécute `mvn clean package -DskipTests`
3. Maven build le frontend automatiquement
4. Copie le build React vers `/server/src/main/resources/static`
5. Génère `monjeu.jar` avec le frontend intégré
6. Lance avec `java -jar target/monjeu.jar`

## 📦 Scripts Package.json

### Client (`/client/package.json`)
```json
{
  "scripts": {
    "build": "react-scripts build",
    "build:railway": "npm run build && npm run copy-to-server",
    "copy-to-server": "rm -rf ../server/src/main/resources/static/* && cp -r build/* ../server/src/main/resources/static/"
  }
}
```

## 🔧 Configuration Maven

### Server (`/server/pom.xml`)
- **finalName** : `monjeu` (génère monjeu.jar)
- **exec-maven-plugin** : Exécute npm build
- **maven-resources-plugin** : Copie build vers static

## 🌐 URLs de Production

Après déploiement Railway :
- **Frontend** : `https://votre-app.railway.app/`
- **API Backend** : `https://votre-app.railway.app/api/`
- **WebSocket** : `wss://votre-app.railway.app/ws`

## 🔍 Vérification

### Local
```bash
# Tester le build complet
cd server
mvn clean package -DskipTests
java -jar target/monjeu.jar

# Vérifier http://localhost:8080
```

### Railway
```bash
# Logs de déploiement
railway logs

# Status du service
railway status
```

## 📁 Fichiers Importants

### `/server/Procfile`
```
web: java -jar target/monjeu.jar
```

### `/railway.json`
```json
{
  "build": {
    "buildCommand": "cd server && mvn clean package -DskipTests"
  },
  "deploy": {
    "startCommand": "cd server && java -jar target/monjeu.jar"
  }
}
```

## 🎯 Prêt pour le Push

✅ Structure `/server` et `/client` créée  
✅ `Procfile` configuré dans `/server`  
✅ Scripts build dans `/client/package.json`  
✅ Frontend copié vers `/server/src/main/resources/static`  
✅ `railway.json` configuré  
✅ `README.md` avec instructions complètes  

**Vous pouvez maintenant push vers Railway !**

```bash
git add .
git commit -m "Configure Railway deployment"
railway up
```
