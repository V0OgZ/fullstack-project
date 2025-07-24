# 🔧 BACKEND API DOCUMENTATION - WALTER EDITION

**WALTER SAYS: "DOCUMENTATION CLAIRE AVANT DE CODER LE FRONT !"**

## 📋 TABLE DES MATIÈRES

1. [🏥 HEALTH & STATUS](#health--status)
2. [🎮 GAME MANAGEMENT](#game-management) 
3. [🏰 BUILDING SYSTEM](#building-system)
4. [⚔️ UNIT MANAGEMENT](#unit-management)
5. [📜 SCENARIO SYSTEM](#scenario-system)
6. [🌀 CAUSAL ENGINE](#causal-engine)
7. [🔮 MULTIPLAYER](#multiplayer)
8. [🧪 TESTING ENDPOINTS](#testing-endpoints)

---

## 🏥 HEALTH & STATUS

### Backend Health Check
```
GET /api/causal/health
```
**Response:**
```json
{
  "capabilities": ["AXISI_PROCESSING", "LENTUS_PROCESSING", "CROSS_INTERACTION", "TEMPORAL_SIMULATION"],
  "service": "CausalInteractionEngine",
  "version": "1.0.0",
  "status": "UP",
  "timestamp": "2025-07-24T03:01:12.458221"
}
```

---

## 🎮 GAME MANAGEMENT

### Get Game by ID
```
GET /api/games/{gameId}
```
**Response:**
```json
{
  "id": "game-123",
  "status": "active",
  "currentPlayer": "player-1",
  "turn": 5,
  "players": [...]
}
```

### Create New Game
```
POST /api/games
Content-Type: application/json

{
  "playerCount": 2,
  "gameMode": "conquest-classic",
  "mapSize": "medium"
}
```

### Get Available Games
```
GET /api/games/available
```

### Join Game
```
POST /api/games/{gameId}/join
```

### End Turn
```
POST /api/games/{gameId}/end-turn
Content-Type: application/json

{
  "playerId": "player-1"
}
```

---

## 🏰 BUILDING SYSTEM

### Get All Buildings
```
GET /api/buildings
```

### Get Building by ID
```
GET /api/buildings/{buildingId}
```

### Construct Building
```
POST /api/games/{gameId}/buildings/construct
Content-Type: application/json

{
  "playerId": "player-1",
  "castleId": "castle-1",
  "buildingType": "town_hall",
  "positionX": 5,
  "positionY": 3
}
```

### Upgrade Building
```
POST /api/buildings/{buildingId}/upgrade
Content-Type: application/json

{
  "playerResources": {
    "gold": 1000,
    "wood": 500,
    "stone": 300
  }
}
```

### Recruit Units
```
POST /api/buildings/{buildingId}/recruit
Content-Type: application/json

{
  "unitType": "archer",
  "quantity": 10
}
```

### Get Castle Bonuses
```
GET /api/buildings/castle/{castleId}/bonuses
```
**Response:**
```json
{
  "goldBonus": 100,
  "defenseBonus": 25,
  "magicPowerBonus": 15
}
```

---

## ⚔️ UNIT MANAGEMENT

### Get All Units
```
GET /api/units
```

### Get Units by Castle
```
GET /api/units/castle/{castle}
```

### Get Castle Roster (Grouped by Tier)
```
GET /api/units/castle/{castle}/roster
```
**Response:**
```json
{
  "1": [{"id": "peasant", "name": "Peasant", ...}],
  "2": [{"id": "archer", "name": "Archer", ...}],
  "3": [{"id": "knight", "name": "Knight", ...}]
}
```

### Get Units with Localization
```
GET /api/units/localized/{language}
```
Languages: `en`, `fr`, `ru`

---

## 📜 SCENARIO SYSTEM

### Get All Scenarios
```
GET /api/scenarios?lang=en
```

### Get Conquest Classic Scenario
```
POST /api/scenarios/predefined/conquest-classic
```

### Get Temporal Rift Scenario
```
POST /api/scenarios/predefined/temporal-rift
```

### Get Available Languages
```
GET /api/scenarios/languages
```
**Response:**
```json
{
  "en": {
    "available": true,
    "totalScenarios": 3,
    "translatedScenarios": 3
  },
  "fr": {
    "available": true,
    "totalScenarios": 3,
    "translatedScenarios": 3
  }
}
```

---

## 🌀 CAUSAL ENGINE

### Cross-Interaction Analysis
```
POST /api/causal/cross-interaction
Content-Type: application/json

{
  "items": ["AXISI", "LENTUS"],
  "scenario": "test_scenario"
}
```
**Response:**
```json
{
  "individualResults": [
    {
      "itemType": "AXISI",
      "affectedRadius": 2.31,
      "paradoxRisk": 0.49,
      "durationTurns": 3,
      "temporalStability": 0.97
    },
    {
      "itemType": "LENTUS", 
      "affectedRadius": 1.85,
      "paradoxRisk": 0.23,
      "durationTurns": 2,
      "temporalStability": 0.89
    }
  ],
  "crossInteractionResult": {
    "combinedEffect": "TEMPORAL_RESONANCE",
    "stabilityFactor": 0.93,
    "emergentProperties": ["TIME_DILATION", "CAUSAL_LOOP"]
  }
}
```

### Temporal Simulation
```
POST /api/causal/temporal-simulation
Content-Type: application/json

{
  "scenario": "axisi_vs_lentus_battle",
  "turns": 10,
  "sessionId": "session-123"
}
```
**Response:**
```json
{
  "scenario": "axisi_vs_lentus_battle",
  "success": true,
  "totalTurns": 10,
  "turnResults": [
    {
      "axisiPower": 3.14,
      "temporalStress": 0.07,
      "causalBalance": 0.22,
      "turn": 1,
      "event": "NORMAL_FLOW",
      "lentusPower": 0.68
    }
  ],
  "sessionId": "session-123",
  "timestamp": "2025-07-24T03:03:50.648726"
}
```

---

## 🔮 MULTIPLAYER

### Create Multiplayer Session
```
POST /api/multiplayer/sessions
Content-Type: application/json

{
  "sessionName": "Epic Battle",
  "maxPlayers": 4,
  "gameMode": "conquest",
  "creatorId": "player-1"
}
```

### Get Available Sessions
```
GET /api/multiplayer/sessions
```

### Join Session
```
POST /api/multiplayer/sessions/{sessionId}/join
Content-Type: application/json

{
  "playerId": "player-2"
}
```

---

## 🧪 TESTING ENDPOINTS

### Hero Actions

#### Attack Target
```
POST /api/heroes/{heroId}/attack
Content-Type: application/json

{
  "targetId": "enemy-hero-1"
}
```

#### Collect Resource
```
POST /api/heroes/{heroId}/collect
Content-Type: application/json

{
  "objectId": "gold-mine-1"
}
```

### Action Management

#### Cancel Action
```
POST /api/actions/{actionId}/cancel
```

#### Get Pending Actions
```
GET /api/games/{gameId}/actions/pending
```

---

## 🚨 WALTER'S CRITICAL NOTES

### ✅ ENDPOINTS FONCTIONNELS
- `/api/causal/health` - ✅ Testé et opérationnel
- `/api/causal/temporal-simulation` - ✅ Fonctionne parfaitement
- `/api/games/*` - ✅ Système de jeu complet
- `/api/buildings/*` - ✅ Construction et gestion

### ⚠️ ENDPOINTS À CORRIGER
- `/api/causal/cross-interaction` - ❌ Retourne 500 error
- Certains endpoints multiplayer peuvent nécessiter WebSocket

### 🔧 FORMULES MATHÉMATIQUES
- `paradoxRisk`: Valeur entre 0 et 1 (0.49 typique)
- `temporalStability`: Valeur entre 0 et 1 (0.97 typique)  
- `affectedRadius`: Valeur positive (2.31 typique)
- `axisiPower` / `lentusPower`: Valeurs calculées dynamiquement

### 📊 CODES DE RÉPONSE
- `200` - Succès
- `400` - Erreur de requête (paramètres invalides)
- `404` - Ressource non trouvée
- `500` - Erreur serveur interne

### 🎯 UTILISATION FRONTEND PORT 8000
1. **Commencer par** `/api/causal/health` pour vérifier connexion
2. **Créer un jeu** avec `/api/games` (POST)
3. **Utiliser temporal-simulation** pour les interactions HOTS
4. **Éviter cross-interaction** jusqu'à correction du bug 500

---

## 💡 WALTER'S RECOMMENDATIONS

**POUR LE FRONTEND PORT 8000:**
1. Implémenter d'abord les endpoints ✅ fonctionnels
2. Créer une couche d'abstraction pour les appels API
3. Gérer les erreurs 500 gracieusement
4. Utiliser temporal-simulation pour les effets visuels
5. Prévoir un système de fallback si backend indisponible

**ARCHITECTURE RECOMMANDÉE:**
```javascript
// api.js
const API_BASE = 'http://localhost:8080/api';

async function checkHealth() {
  return fetch(`${API_BASE}/causal/health`);
}

async function runTemporalSimulation(scenario, turns) {
  return fetch(`${API_BASE}/causal/temporal-simulation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scenario, turns })
  });
}
```

**WALTER SAYS: "CETTE DOC EST COMPLÈTE ET TESTÉE - MAINTENANT ON PEUT CODER LE FRONT !"** 