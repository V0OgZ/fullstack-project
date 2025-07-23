# 📋 Liste des Services et Contrôleurs Backend

*Référence rapide pour le développement*

## 🔧 **Services Backend (14)**

| Service | Description | Méthodes Principales |
|---------|-------------|---------------------|
| **GameService** | Logique principale du jeu | `createGame`, `getGame`, `endTurn`, `moveHero`, `buildStructure` |
| **MultiplayerService** | Sessions multijoueurs | `createSession`, `joinSession`, `leaveSession`, `startSession` |
| **ScenarioService** | Gestion des scénarios | `getAllScenarios`, `getScenarioById`, `createCustomScenario` |
| **BuildingService** | Bâtiments et châteaux | `startConstruction`, `upgradeBuilding`, `recruitUnits`, `getCastleBonuses` |
| **GameStateService** | Persistance de l'état | `saveGameState`, `loadGameState`, `updateTurn` |
| **ZFCService** | Zones temporelles | `calculateZFC`, `calculateMovementCost`, `validateAction` |
| **AIService** | Intelligence artificielle | `createAIPlayer`, `processAITurn`, `calculateBestMove` |
| **MagicItemService** | Objets magiques | `getAllItems`, `applyEffects`, `validateEquip`, `consumeItem` |
| **UnitService** | Unités de combat | `getAllUnits`, `getUnitById`, `calculateCombat` |
| **ImageService** | Gestion des assets | `uploadImage`, `getImagesByCategory`, `deleteImage` |
| **SecurityAuditService** | Audit de sécurité | `logSecurityEvent`, `detectSuspiciousActivity` |
| **ScenarioGeneratorService** | Génération de maps | `generateScenario`, `randomizeMap` |
| **CampaignBalancingService** | Équilibrage | `applyDifficultyModifiers`, `calculateBalance` |
| **ScenarioLoaderService** | Chargement JSON | `loadScenarioFromFile`, `parseScenarioData` |

## 🎮 **Contrôleurs REST (11)**

| Contrôleur | Base Path | Endpoints Principaux |
|------------|-----------|---------------------|
| **GameController** | `/api/games` | `GET /{id}`, `POST /`, `POST /{id}/end-turn`, `POST /{id}/move-hero` |
| **MultiplayerController** | `/api/multiplayer` | `POST /sessions`, `GET /sessions`, `POST /sessions/{id}/join` |
| **ScenarioController** | `/api/scenarios` | `GET /`, `GET /{id}`, `POST /custom` |
| **BuildingController** | `/api/buildings` | `GET /castle/{id}`, `POST /start-construction`, `POST /{id}/upgrade` |
| **ZFCController** | `/api/zfc` | `POST /calculate`, `POST /movement-cost`, `POST /validate-action` |
| **MagicItemController** | `/api/magic-items` | `GET /`, `GET /{id}`, `POST /apply-effects` |
| **ImageController** | `/api/images` | `POST /upload`, `GET /category/{cat}`, `DELETE /{id}` |
| **AIController** | `/api/ai` | `POST /create-player`, `POST /process-turn`, `GET /metrics` |
| **UnitController** | `/api/units` | `GET /`, `GET /{id}`, `GET /castle/{castle}` |
| **EpicContentController** | `/api/epic` | `GET /heroes`, `GET /creatures`, `GET /content` |
| **TestController** | `/api/test` | `GET /health`, `GET /echo` |

## 🔌 **Endpoints Critiques pour le Frontend**

### **Gestion de Partie**
- `POST /api/games` - Créer une partie
- `GET /api/games/{gameId}` - Récupérer l'état
- `POST /api/games/{gameId}/end-turn` - Fin de tour
- `GET /api/games/{gameId}/current-player` - Joueur actuel

### **Actions de Héros**
- `POST /api/games/{gameId}/move-hero` - Déplacer héros
- `POST /api/heroes/{heroId}/attack` - Attaquer
- `POST /api/heroes/{heroId}/collect` - Collecter ressources

### **Gestion de Château**
- `GET /api/games/{gameId}/players/{playerId}/buildings` - Bâtiments du joueur
- `GET /api/games/{gameId}/players/{playerId}/units/available` - Unités disponibles
- `POST /api/games/{gameId}/buildings/construct` - Construire
- `POST /api/games/{gameId}/buildings/{buildingId}/recruit` - Recruter

### **Multijoueur**
- `GET /api/multiplayer/sessions` - Sessions disponibles
- `POST /api/multiplayer/sessions` - Créer session
- `POST /api/multiplayer/sessions/{sessionId}/join` - Rejoindre

### **ZFC (Temporel)**
- `POST /api/zfc/calculate` - Calculer zones
- `POST /api/zfc/movement-cost` - Coût de déplacement
- `POST /api/zfc/validate-action` - Valider action

## 📝 **Notes Importantes**

1. **Tous les endpoints retournent du JSON**
2. **Headers requis** : `Content-Type: application/json`
3. **Base URL** : `http://localhost:8080/api`
4. **Gestion d'erreurs** : Codes HTTP standards
5. **WebSocket** : `/ws` pour temps réel

## 🚀 **Exemple d'Utilisation**

```javascript
// Créer une partie
const response = await fetch('http://localhost:8080/api/games', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    scenarioId: 'conquest-classic',
    playerName: 'Player 1' 
  })
});

// Déplacer un héros
await fetch(`http://localhost:8080/api/games/${gameId}/move-hero`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    heroId: 'hero-1',
    position: { x: 5, y: 3 }
  })
});
``` 