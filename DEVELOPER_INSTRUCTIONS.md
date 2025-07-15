# 🧪 Heroes of Time - Instructions Développeur

*Guide technique complet pour le développement et le débogage*

## 🚀 **Démarrage Rapide**

### ⚡ **Lancement de l'Application**
```bash
./start-app.sh     # Démarre Backend (8080) + Frontend (3000)
./stop-app.sh      # Arrête tous les services
./test-app.sh      # Tests rapides
```

### 🎯 **URLs Importantes**
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080
- **API Health**: http://localhost:8080/actuator/health
- **H2 Database**: http://localhost:8080/h2-console

---

## 🔧 **Architecture Backend-Frontend**

### ✅ **Connexions API Fonctionnelles** (Janvier 2025)

#### **Castle Management - RÉCEMMENT CORRIGÉ**
```typescript
// ✅ MAINTENANT: Connexion API réelle
const buildings = await ApiService.getPlayerBuildings(gameId, playerId);
const units = await ApiService.getAvailableUnits(gameId, playerId);
const response = await ApiService.recruitUnitsFromGame(gameId, buildingId, data);
```

#### **Endpoints Backend Disponibles** (70+ endpoints)
- **GameController** (`/api/games`): 22 endpoints
- **BuildingController** (`/api/buildings`): 25 endpoints  
- **UnitController** (`/api/units`): 15 endpoints
- **MultiplayerController** (`/api/multiplayer`): 8 endpoints
- **Contrôleurs spécialisés**: MagicItem, ZFC, AI, Scenario, Image

#### **Endpoints Critiques Manquants**
- **Combat System** (priorité HAUTE)
- **Hero Management complet** (équipement, inventaire)
- **Player Management** (ressources, statistiques)
- **Spell System** (sorts, apprentissage)

---

## 🛠️ **Scripts de Développement**

### 📜 **Scripts Principaux**
```bash
./start-app.sh     # Démarre Backend + Frontend
./stop-app.sh      # Arrête tous les services
./test-app.sh      # Tests rapides
./run-all-tests.sh # Tests complets
```

### 🎮 **Mode Démo** (NOUVEAU!)
```bash
./frontend/start-demo.sh
```
- Lance une démo visuelle avec interface graphique
- Montre le gameplay automatisé
- Nécessite que les serveurs soient lancés

### 🔍 **Mode Debug** (NOUVEAU!)
```bash
./frontend/start-debug.sh
```
- Tests headless avec capture complète des erreurs
- Analyse les erreurs "Maximum update depth exceeded"
- Sauvegarde les logs détaillés dans `frontend/debug-logs.json`
- Fournit une analyse des erreurs et des snapshots d'état

**Exemple de sortie du mode debug:**
```
📍 Test 1: Chargement de la page d'accueil
📍 Test 2: Sélection du scénario classique
❌ BOUCLE INFINIE DÉTECTÉE!
   Fichier: http://localhost:3000/static/js/bundle.js
   Ligne: 12345:67
```

### 🧪 **Tests Automatisés**
```bash
# Tests complets
./run-all-tests.sh

# Tests Playwright (E2E)
./run-playwright-tests.sh

# Tests rapides
./run-quick-tests.sh

# Tests spécifiques avec fenêtres positionnées
cd frontend && npx playwright test 01-single-demo.spec.ts --project=solo-fullscreen --headed
cd frontend && npx playwright test multiplayer-demo.spec.ts --project=multiplayer --headed
```

### 🖥️ **Configuration Fenêtres Playwright**
```bash
# Solo Demo - Fenêtre unique à gauche
- Position: (0, 0) - À GAUCHE
- Taille: 1280x800 (hauteur standard)
- Projet: solo-fullscreen

# Multiplayer Demo - 2 fenêtres côte à côte
- Player 1: Position (0, 0) - À GAUCHE
- Player 2: Position (640, 0) - À DROITE
- Taille: 640x900 chacune (hauteur optimisée)
- Projet: multiplayer

# Configuration dans playwright.config.ts
- 3 projets: solo-fullscreen, multiplayer, demo
- Fenêtres automatiquement positionnées
- Tests avec --headed pour voir les fenêtres
```

### 🎮 **Tests Manuels**
```bash
# Test de fonctionnalité spécifique
./test-app.sh

# Test de performance
cd frontend && npm run test:performance

# Test de responsivité
cd frontend && npm run test:responsive
```

---

## 🎯 **Composants Critiques**

### 🏰 **Castle Management (Récemment Corrigé)**
- **Fichier**: `frontend/src/components/CastleManagementPanel.tsx`
- **État**: ✅ **Connexion API réelle**
- **Fonctionnalités**: Construction, recrutement, gestion ressources
- **Fallback**: Données mockées si API indisponible

### ⚔️ **Game Interface**
- **Fichier**: `frontend/src/components/TrueHeroesInterface.tsx`
- **État**: ✅ **Fonctionnel**
- **Fonctionnalités**: Gestion héros, tours, interface principale

### 🎮 **Game State Management**
- **Fichier**: `frontend/src/store/useGameStore.ts`
- **État**: ✅ **Optimisé**
- **Fonctionnalités**: État global, actions, API calls

---

## 🔍 **Débogage et Diagnostics**

### 🕵️ **Diagnostic Rapide**
```bash
# Vérification santé Backend
curl http://localhost:8080/actuator/health

# Vérification connexion API
curl http://localhost:8080/api/health

# Vérification scénarios
curl http://localhost:8080/api/scenarios/all
```

### 🐛 **Problèmes Fréquents**

#### **1. API Non Disponible**
```bash
# Vérification processus
lsof -i :8080  # Backend
lsof -i :3000  # Frontend

# Redémarrage
./stop-app.sh && ./start-app.sh
```

#### **4. Tests Playwright - Problèmes Fenêtres**
```bash
# Problème: Fenêtres mal positionnées
# Solution: Configuration dans playwright.config.ts mise à jour

# Problème: Tests multiplayer qui se lancent 2 fois
# Solution: Suppression du doublon 02-multiplayer-demo.spec.ts

# Problème: Viewport trop petit
# Solution: Hauteur augmentée à 900px pour tous les tests

# Vérification configuration
cat frontend/playwright.config.ts | grep -A 10 "solo-fullscreen\|multiplayer"
```

#### **2. Erreurs de Connexion Frontend-Backend**
```javascript
// Vérification dans la console navigateur
console.log('API Base URL:', process.env.REACT_APP_API_URL);
console.log('Backend Health:', await ApiService.getHealth());
```

#### **3. Problèmes de Base de Données**
```sql
-- Accès H2 Console (http://localhost:8080/h2-console)
-- URL: jdbc:h2:mem:testdb
-- User: sa
-- Password: (vide)

SELECT * FROM scenarios;
SELECT * FROM buildings;
SELECT * FROM units;
```

---

## 🎪 **Fonctionnalités Avancées**

### 🌟 **Zone de Causalité Temporelle (ZFC)**
- **Endpoint**: `/api/zfc/calculate`
- **Calcul**: Coût temporel des mouvements
- **Implémentation**: Backend Java + Frontend TypeScript

### 🎭 **Système Multijoueur**
- **Endpoints**: `/api/multiplayer/sessions`
- **WebSocket**: Support temps réel
- **État**: ✅ **Fonctionnel**

### 🔮 **Système Magique**
- **Endpoints**: `/api/magic-items`
- **Inventaire**: Gestion objets magiques
- **État**: ✅ **Complet**

---

## 📊 **Métriques et Performance**

### 🎯 **Métriques Actuelles**
- **Endpoints Backend**: 70+ (couverture 58%)
- **Connexions Fonctionnelles**: 40%
- **Connexions Mockées**: 35%
- **Tests E2E**: 26+ scenarios

### 🎮 **Tests E2E Disponibles**
```bash
# Tests Actifs (frontend/tests/e2e/)
- 01-single-demo.spec.ts          # Démo solo avec tooltips
- multiplayer-demo.spec.ts        # Démo multiplayer 2 browsers
- multiplayer-ui.spec.ts          # Test interface multiplayer
- terrain-vision-demo.spec.ts     # Démo système de vision
- terrain-vision.spec.ts          # Tests vision avancés
- debug-scenarios.spec.ts         # Tests scénarios debug

# Tests Archivés (frontend/tests/e2e/archived/)
- 03-zfc-shadow-actions.spec.ts   # Actions temporelles ZFC
- 04-performance-stress-test.spec.ts # Tests performance
- 05-comprehensive-screen-tests.spec.ts # Tests écran complets
- language-availability.spec.ts   # Tests langues
- multilingual-scenarios.spec.ts  # Tests multilingues
```

### 📈 **Objectifs de Performance**
- **Temps de chargement**: < 3 secondes
- **Réponse API**: < 500ms
- **Taille bundle**: < 2MB
- **Tests coverage**: > 80%

---

## 🔧 **Configuration Développement**

### 🛡️ **Variables d'Environnement**
```bash
# Backend
SPRING_PROFILES_ACTIVE=dev
SERVER_PORT=8080
H2_CONSOLE_ENABLED=true

# Frontend
REACT_APP_API_URL=http://localhost:8080
REACT_APP_WS_URL=ws://localhost:8080
PORT=3000
```

### 📦 **Dépendances Critiques**
```json
{
  "backend": {
    "spring-boot": "2.7.18",
    "h2": "2.1.214",
    "hibernate": "5.6.15"
  },
  "frontend": {
    "react": "^18.2.0",
    "typescript": "^4.9.5",
    "playwright": "^1.40.0"
  }
}
```

---

## 🎯 **Prochaines Étapes (Roadmap)**

### 🔥 **Priorité Immédiate**
1. **Implémenter Combat System** (endpoints manquants)
2. **Compléter Hero Management** (équipement, inventaire)
3. **Ajouter Spell System** (sorts, apprentissage)
4. **Améliorer Player Management** (ressources, stats)

### 🚀 **Priorité Moyenne**
1. **Système de Trade** (échange ressources)
2. **Diplomacy** (alliances, négociations)
3. **Notifications** (événements temps réel)
4. **Analytics** (métriques avancées)

### 🎪 **Priorité Basse**
1. **Achievements** (système de récompenses)
2. **Replay System** (sauvegarde parties)
3. **Admin Tools** (gestion serveur)
4. **Advanced Analytics** (business intelligence)

---

## 🎮 **Ressources Utiles**

### 📚 **Documentation**
- **GAMESTATUS.md**: État actuel complet
- **GAMEPLAY.md**: Guide de jeu attractif
- **ARCHITECTURE.md**: Design technique
- **FRONTEND_BACKEND_CONNECTION_ANALYSIS.md**: Analyse des connexions

### 🛠️ **Outils de Développement**
- **VSCode**: Extensions TypeScript, Java, Playwright
- **Postman**: Collection API Heroes of Time
- **Chrome DevTools**: Debugging frontend
- **IntelliJ IDEA**: Développement Java backend

---

## 🏆 **Conseils Pro**

### 🎯 **Bonnes Pratiques**
1. **Toujours vérifier la santé API** avant les tests
2. **Utiliser les fallbacks** pour les connexions API
3. **Tester sur différents navigateurs** (Chrome, Firefox, Safari)
4. **Optimiser les images** pour de meilleures performances
5. **Documenter les changements** dans le code

### 🔍 **Debugging Efficace**
1. **Console navigateur** pour les erreurs frontend
2. **Logs Spring Boot** pour les erreurs backend
3. **Network tab** pour les problèmes API
4. **Playwright traces** pour les tests E2E
5. **H2 Console** pour les problèmes de données

---

*🎮 Happy Coding! Le royaume a besoin de héros développeurs!* ⚔️✨ 