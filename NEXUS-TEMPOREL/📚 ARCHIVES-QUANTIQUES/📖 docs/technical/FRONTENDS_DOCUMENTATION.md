# 🌐 Heroes of Time - Documentation des Frontends

## 📋 Vue d'ensemble

Heroes of Time dispose de **4 interfaces utilisateur** distinctes, chacune optimisée pour un usage spécifique :

- **🎮 Frontend Principal** - Interface de jeu principale
- **⚡ Frontend Temporal** - Interface temporelle avancée  
- **🔬 Quantum Visualizer** - Visualiseur quantique interactif
- **📄 Serveur Rapports** - Consultation des rapports MD

---

## 🎮 Frontend Principal (Port 8000)

### 📍 **URL :** `http://localhost:8000`

### ✨ **Fonctionnalités :**
- Interface de jeu hexagonale complète
- Création et gestion des héros (Ragnar, Arthur, etc.)
- Système de combat en temps réel
- Gestion des ressources et constructions
- Carte interactive avec fog of war
- Scénarios de jeu intégrés

### 🛠️ **Technologies :**
- React + TypeScript
- Canvas hexagonal personnalisé
- WebSocket pour le temps réel
- API REST intégrée

### 🎯 **Usage Principal :**
Interface de jeu complète pour jouer aux scénarios Heroes of Time.

---

## ⚡ Frontend Temporal (Port 5173)

### 📍 **URL :** `http://localhost:5173`

### ✨ **Fonctionnalités :**
- Gestion avancée des états quantiques (ψ-states)
- Visualisation des branches temporelles
- Interface pour les scripts temporels
- Gestion des collapses causales
- Timeline interactive
- Debug des mécaniques quantiques

### 🛠️ **Technologies :**
- Vite + React
- Moteur temporel JavaScript
- Visualisations D3.js
- API temporelle spécialisée

### 🎯 **Usage Principal :**
Interface spécialisée pour les développeurs et tests des mécaniques temporelles.

---

## 🔬 Quantum Visualizer (Port 8001)

### 📍 **URL :** `http://localhost:8001`

### ✨ **Fonctionnalités :**
- Visualisation des interférences quantiques
- Graphiques des amplitudes complexes
- Simulation des collapses d'états
- Interface de test des scénarios quantiques
- Boutons d'actions quantiques rapides
- Logs en temps réel des opérations

### 🛠️ **Technologies :**
- HTML/CSS/JavaScript pur
- Canvas pour les visualisations
- WebGL pour les effets quantiques
- Serveur HTTP Python simple

### 🎯 **Usage Principal :**
Visualisation et debug des mécaniques quantiques avancées.

---

## 📄 Serveur Rapports (Port 8888)

### 📍 **URL :** `http://localhost:8888`

### ✨ **Fonctionnalités :**
- Liste de tous les rapports MD générés
- Visualisation formatée des rapports
- Métadonnées des fichiers (taille, date)
- Navigation simple et intuitive
- Pas de fonctionnalités superflues

### 🛠️ **Technologies :**
- Python HTTP server
- HTML/CSS simple
- Markdown rendering côté serveur

### 🎯 **Usage Principal :**
Consultation rapide des rapports de tests et documentation générée.

---

## 🎛️ Dashboards de Gestion

### Dashboard Principal (Port 9000)
- **URL :** `http://localhost:9000`
- **Fonction :** Monitoring système sécurisé
- **Fonctionnalités :** HUD global, métriques, statut services

### Dashboard Mosaïque (Port 9002)
- **URL :** `http://localhost:9002/mosaic-dashboard.html`
- **Fonction :** Vue mosaïque de tous les frontends
- **Fonctionnalités :** 4 iframes simultanées, tests en arrière-plan

---

## 🔗 Intégrations Backend

### API Principal (Port 8080)
Tous les frontends communiquent avec le backend via :
- **Health Check :** `/api/temporal/health`
- **Jeux :** `/api/temporal/games`
- **Scripts :** `/api/temporal/scripts`
- **Héros :** `/api/heroes`
- **Quantum :** `/api/quantum`

### Flux de Données
```
Frontend → API REST → Service Java → Base H2 → Réponse JSON
```

---

## 🚀 Démarrage des Frontends

### Démarrage Manuel
```bash
# Frontend Principal
cd frontend && yarn start

# Frontend Temporal  
cd frontend-temporal && npm run dev

# Quantum Visualizer
cd quantum-visualizer && python3 -m http.server 8001

# Serveur Rapports
python3 simple-reports-server.py
```

### Démarrage Automatique
```bash
# Tout démarrer d'un coup
./⚙️ scripts/actifs/start-unified-ui.sh

# Ou via le dashboard
# Clic sur "🧪 Lancer Tests" dans le dashboard mosaïque
```

---

## 🎯 Choix du Frontend

### Pour jouer au jeu :
👉 **Frontend Principal** (8000)

### Pour développer/débugger :
👉 **Frontend Temporal** (5173) + **Quantum Visualizer** (8001)

### Pour voir tout en même temps :
👉 **Dashboard Mosaïque** (9002)

### Pour lire les rapports :
👉 **Serveur Rapports** (8888)

---

## 📊 Architecture Technique

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Frontend      │
│   Principal     │    │   Temporal      │
│   (React)       │    │   (Vite+React)  │
│   Port 8000     │    │   Port 5173     │
└─────────┬───────┘    └─────────┬───────┘
          │                      │
          └──────────┬───────────┘
                     │
            ┌────────▼────────┐
            │   Backend API   │
            │   Spring Boot   │
            │   Port 8080     │
            └─────────────────┘
```

---

## 🔧 Configuration

### Variables d'Environnement
```bash
BACKEND_URL=http://localhost:8080
FRONTEND_PORT=8000
TEMPORAL_PORT=5173
VISUALIZER_PORT=8001
REPORTS_PORT=8888
```

### Ports Utilisés
- **8000** - Frontend Principal
- **5173** - Frontend Temporal  
- **8001** - Quantum Visualizer
- **8080** - Backend API
- **8888** - Serveur Rapports
- **9000** - Dashboard Principal
- **9002** - Dashboard Mosaïque

---

## 📝 Notes de Développement

### Ajout d'un Nouveau Frontend
1. Créer le dossier dans `/frontend-nouveau`
2. Ajouter au script `start-unified-ui.sh`
3. Configurer l'API backend appropriée
4. Ajouter au dashboard mosaïque
5. Documenter ici

### Bonnes Pratiques
- Utiliser les mêmes conventions d'API
- Implémenter le health check
- Ajouter les logs appropriés
- Tester l'intégration avec les autres frontends

---

*Documentation mise à jour le 19 juillet 2025* 