# 🧪 Heroes of Time - Instructions Développeur

*Guide technique complet pour le développement et le débogage*

## 🚀 **Démarrage Rapide**

### ⚡ **Lancement de l'Application**
```bash
./start-app.sh              # Démarre Backend (8080) + Frontend (3000)
./stop-app.sh               # Arrête tous les services
./test-app.sh               # Tests rapides
./run-epic-demo.sh          # 🆕 Démo du système épique
./test-backend-gameplay.sh  # 🆕 Test complet des actions backend
```

### 🎯 **URLs Importantes**
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080
- **API Health**: http://localhost:8080/actuator/health
- **H2 Database**: http://localhost:8080/h2-console

---

## 🎮 **Tests de Gameplay - NOUVEAU (Janvier 2025)**

### 🧪 **Test Backend Complet**
```bash
# Script de test complet des actions backend
./test-backend-gameplay.sh
```

**Actions testées** :
- ✅ Récupération du jeu et des bâtiments
- ✅ Bonus de château et unités disponibles
- ✅ Upgrade de bâtiments et reset croissance
- ✅ Déplacement, attaque, collecte de héros
- ✅ Fin de tour et actions en attente
- **Résultat**: 78% de réussite (11/14 tests)

### 🎭 **Test Playwright Interface**
```bash
# Test complet de l'interface TrueHeroesInterface
cd frontend
npx playwright test tests/e2e/gameplay-complete.spec.ts --headed
```

**Tests inclus** :
- ✅ Test complet des actions de gameplay
- ✅ Test du cycle de jeu complet
- ✅ Test de gestion des erreurs
- ✅ Vérification des panneaux (heroes, castle, epic)
- ✅ Test des boutons et interactions

### 🎯 **Actions de Gameplay Disponibles**

#### **Interface TrueHeroesInterface**
```typescript
// Panneaux disponibles
- Panneau Scénario: Informations sur le jeu
- Panneau Héros: Gestion des héros + actions
- Panneau Château: Gestion des bâtiments + actions
- Panneau Epic Content: Contenu épique

// Actions de héros
- 🚶 Déplacement interactif (mode clic)
- ⚔️ Attaque d'ennemis
- 💎 Collecte de ressources
- 🔮 Lancement de sorts

// Actions de château
- 🔄 Reset croissance hebdomadaire
- ⬆️ Upgrade de bâtiments
- 👥 Recrutement d'unités
- ⭐ Visualisation des bonus
```

---

## 🔧 **Architecture Backend-Frontend**

### ✅ **Connexions API Fonctionnelles** (Janvier 2025)

#### **🆕 Epic Content System - NOUVEAU**
```typescript
// ✅ NOUVEAU: Système de contenu épique complet
const heroes = await fetchEpicHeroes();
const creatures = await fetchEpicCreatures();
const hero = await fetchHeroById('arthur_pendragon');
const dragon = await fetchCreatureById('red_dragon');
```

**Endpoints Epic Content** (`/api/epic`):
- `GET /api/epic/heroes` - Tous les héros épiques
- `GET /api/epic/creatures` - Toutes les créatures épiques
- `GET /api/epic/heroes/{id}` - Héros spécifique
- `GET /api/epic/creatures/{id}` - Créature spécifique
- `GET /api/epic/heroes/race/{race}` - Héros par race
- `GET /api/epic/creatures/race/{race}` - Créatures par race

#### **Castle Management - RÉCEMMENT CORRIGÉ**
```typescript
// ✅ MAINTENANT: Connexion API réelle
const buildings = await ApiService.getPlayerBuildings(gameId, playerId);
const units = await ApiService.getAvailableUnits(gameId, playerId);
const response = await ApiService.recruitUnitsFromGame(gameId, buildingId, data);
```

#### **Endpoints Backend Disponibles** (80+ endpoints)
- **GameController** (`/api/games`): 22 endpoints
- **BuildingController** (`/api/buildings`): 25 endpoints  
- **UnitController** (`/api/units`): 15 endpoints
- **MultiplayerController** (`/api/multiplayer`): 8 endpoints
- **🆕 EpicContentController** (`/api/epic`): 6 endpoints
- **Contrôleurs spécialisés**: MagicItem, ZFC, AI, Scenario, Image

#### **Endpoints Critiques Manquants**
- **Combat System** (priorité HAUTE)
- **Hero Management complet** (équipement, inventaire)
- **Player Management** (ressources, statistiques)
- **Spell System** (sorts, apprentissage)

---

## 🎮 **Nouveau Système Épique**

### **🐉 Epic Content System**
Interface accessible via le bouton 🐉 dans le jeu principal.

**Fichiers Backend**:
- `epic-heroes.json` - Données des héros légendaires
- `epic-creatures.json` - Données des créatures fantastiques
- `EpicContentController.java` - API REST pour le contenu épique

**Fichiers Frontend**:
- `epicContentAPI.ts` - Service API pour récupérer les données
- `EpicContentViewer.tsx` - Interface utilisateur principale
- `epic-content-demo.spec.ts` - Tests Playwright

**Assets SVG**:
- `/assets/creatures/` - Sprites des créatures
- `/assets/heroes/` - Portraits des héros
- `/assets/buildings/` - Images des bâtiments

### **🧪 Tests du Système Épique**
```bash
# Test complet avec interface visuelle
./run-epic-demo.sh

# Test Playwright uniquement
cd frontend
npx playwright test tests/e2e/epic-content-demo.spec.ts --headed
```

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
- Lance une démo visuelle avec menu de sélection :
  - Mode normal : avec barres du navigateur
  - Mode plein écran : interface immersive kiosque
- Montre le gameplay automatisé
- Nécessite que les serveurs soient lancés

### 🎬 **Mode Démo Plein Écran** (NOUVEAU!)
```bash
./frontend/start-fullscreen-demo.sh
```
- Lance directement en mode kiosque plein écran
- Masquage automatique du curseur
- Parfait pour présentations et salons
- Appuyez sur ESC pour quitter

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

## 🧪 **Game Script Engine System** (NOUVEAU - Janvier 2025)

### 🎯 **Vue d'Ensemble**
Le **Game Script Engine** est un système avancé de scripting intégré dans Heroes of Time qui permet d'automatiser les actions de jeu via des commandes textuelles. Il utilise l'API backend et offre une interface de test complète.

### 🔧 **Architecture**
```
GameScriptEngine (frontend/src/services/gameScriptEngine.ts)
    ├── Command Parser (analyse des commandes)
    ├── API Integration (appels backend via ApiService)
    ├── Error Handling (gestion des erreurs)
    └── Result Formatting (formatage des résultats)

GameScriptTester (frontend/src/components/GameScriptTester.tsx)
    ├── Three-Panel Interface (exemples, éditeur, résultats)
    ├── Golden Theme Design (thème cohérent avec le jeu)
    └── Real-time Testing (test en temps réel)
```

### 🎮 **Commandes Disponibles**
```bash
# Déplacement de héros
MOVE heroId TO x,y

# Construction de bâtiments
BUILD buildingType AT x,y

# Recrutement d'unités
RECRUIT unitType QUANTITY amount FROM buildingId

# Lancement de sorts
CAST spellId ON targetId

# Sélection de héros
SELECT_HERO heroId

# Fin de tour
END_TURN

# Attente
WAIT duration

# Logging
LOG message
```

### 🛠️ **Utilisation**
```typescript
// Import du service
import { GameScriptEngine } from '../services/gameScriptEngine';

// Initialisation
const scriptEngine = new GameScriptEngine();

// Exécution d'une commande
const result = await scriptEngine.executeCommand('MOVE hero1 TO 5,3');

// Exécution d'un script complet
const script = `
  SELECT_HERO hero1
  MOVE hero1 TO 5,3
  BUILD castle AT 5,3
  END_TURN
`;
const results = await scriptEngine.executeScript(script);
```

### 🎯 **Interface de Test**
Accessible via le bouton **🧪** dans `TrueHeroesInterface` :

#### **Panneau 1 - Exemples**
```
📚 COMMANDES DISPONIBLES
- MOVE hero1 TO 5,3
- BUILD castle AT 2,4
- RECRUIT archer QUANTITY 10 FROM building1
- CAST fireball ON enemy1
- SELECT_HERO hero2
- END_TURN
- WAIT 1000
- LOG "Action completed"
```

#### **Panneau 2 - Éditeur**
- Éditeur de code avec coloration syntaxique
- Boutons d'exécution pour commandes individuelles ou scripts
- Historique des commandes exécutées

#### **Panneau 3 - Résultats**
- Affichage en temps réel des résultats
- Gestion des erreurs avec détails
- Formatage JSON des réponses API

### 🔍 **Intégration API**
```typescript
// Exemple d'intégration avec ApiService
async executeCommand(command: string): Promise<ScriptResult> {
  const parsed = this.parseCommand(command);
  
  switch (parsed.action) {
    case 'MOVE':
      return await this.apiService.makeGenericRequest(
        'POST', 
        `/api/games/${gameId}/heroes/${heroId}/move`,
        { targetPosition: parsed.params }
      );
    
    case 'BUILD':
      return await this.apiService.makeGenericRequest(
        'POST',
        `/api/games/${gameId}/buildings`,
        { buildingType: parsed.params.type, position: parsed.params.position }
      );
    
    // ... autres commandes
  }
}
```

### 🎨 **Thème Visuel**
```css
/* Thème Golden cohérent avec le jeu */
.script-tester {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #ffd700;
  border: 2px solid #ffd700;
}

.script-examples {
  background: rgba(255, 215, 0, 0.1);
  border-left: 4px solid #ffd700;
}

.script-editor {
  background: #2a2a3e;
  color: #ffffff;
  font-family: 'Courier New', monospace;
}
```

### 🧪 **Tests**
```bash
# Test du système de scripting
cd frontend
npx playwright test tests/e2e/script-tester-demo.spec.ts --headed

# Test d'intégration API
npm test -- gameScriptEngine.test.ts
```

### 🚀 **Avantages**
- ✅ **Automatisation**: Scripts de test automatiques
- ✅ **Débogage**: Interface visuelle pour tester l'API
- ✅ **Développement**: Prototypage rapide de nouvelles fonctionnalités
- ✅ **Formation**: Apprentissage des commandes de jeu
- ✅ **QA**: Tests de régression automatisés

### 📝 **Exemple de Script Complet**
```
// Script de test complet
LOG "Début du test automatisé"
SELECT_HERO hero1
MOVE hero1 TO 10,5
BUILD castle AT 10,5
WAIT 1000
RECRUIT archer QUANTITY 5 FROM castle1
LOG "Recrutement terminé"
END_TURN
LOG "Test terminé avec succès"
```

---

## 🧪 GameScript Tester - Interface Redesignée (Janvier 2025)

### Interface Moderne et Professionnelle
Le GameScript Tester a été **complètement redesigné** avec une interface moderne et élargie :

**🎨 Nouvelle Interface :**
- **Fenêtre plus grande** : Occupant 80% de l'écran au lieu d'être fixe
- **4 onglets organisés** : Script, Commandes, Exemples, Résultats
- **Maximizable/Minimizable** : Contrôles de fenêtre intuitifs
- **Design moderne** : Gradient turquoise/violet, animations fluides

**⚡ Commandes Rapides (12 boutons) :**
- 🏃 Mouvement : `MOVE hero1 TO (5, 7)`
- 🏗️ Construction : `BUILD barracks AT (10, 10)`
- 👥 Recrutement : `RECRUIT 5 soldier FROM building1`
- ⚔️ Sélection : `SELECT_HERO hero1`
- 🔮 Magie : `CAST fireball ON enemy`
- ⏱️ Attente : `WAIT 1000`
- 📝 Log : `LOG "Message de test"`
- 🔄 Fin tour : `END_TURN`
- 💰 Commerce : `TRADE gold FOR wood WITH merchant`
- 🗺️ Exploration : `EXPLORE region_north`
- ⬆️ Amélioration : `UPGRADE building1 TO level2`
- ⚔️ Bataille : `ATTACK enemy_unit WITH army1`

**📚 Exemples Organisés (9 scripts par catégorie) :**
- **🚀 Basique** : Mouvement, Construction, Recrutement
- **🎯 Avancé** : Séquence complète, Magie avancée
- **🧠 Stratégie** : Économie, Exploration complète
- **⚔️ Combat** : Bataille épique
- **🧪 Debug** : Test complet du système

**📊 Gestion des Résultats :**
- Historique complet des exécutions
- Affichage des logs et erreurs
- Statistiques de performance
- Nettoyage facile des résultats

### Utilisation
```bash
# Accéder au GameScript Tester
1. Lancer le jeu : ./start-app.sh
2. Cliquer sur le bouton 🧪 dans l'interface
3. Choisir un onglet selon vos besoins
4. Utiliser les commandes rapides ou exemples
```

### Statut Technique
- ✅ **Build réussi** : Compilation sans erreurs
- ✅ **Interface responsive** : Adaptée aux différentes tailles d'écran
- ✅ **Méthodes corrigées** : executeAction, ScriptActionFactory
- ✅ **CSS moderne** : Animations et effets de survol
- ✅ **Tests de base** : Fonctionnalités principales testées

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