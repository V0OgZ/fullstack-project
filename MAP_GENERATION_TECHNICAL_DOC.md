# 🗺️ Documentation Technique - Système de Génération de Map

## 📋 Vue d'ensemble

Le système de génération de map dans Heroes of Time utilise une architecture **hybride** où :
- Le **backend** génère la structure de la map et la partage avec tous les joueurs
- Le **frontend** peut faire de la génération procédurale locale pour les démos
- En **multijoueur**, tous les joueurs reçoivent la même map du backend via WebSocket

## 🏗️ Architecture du Système

### 1. Génération Backend (Source de Vérité)

Le backend Java génère la map dans `GameService.java` :

```java
// Méthode principale de création de jeu
private Map<String, Object> createNewGame(String gameId) {
    // ... configuration du jeu ...
    
    // Génération de la map hexagonale avec héros
    Map<String, Object> map = createHexagonalMapWithHeroes(players);
    game.put("map", map);
}
```

#### Structure de la Map Backend

```java
Map<String, Object> map = {
    "id": "hex-map-1",
    "type": "hexagonal", 
    "width": 20,
    "height": 20,
    "tiles": [
        {
            "x": 0,
            "y": 0,
            "terrain": "grass",
            "walkable": true,
            "movementCost": 100,
            "hero": { /* hero data if present */ }
        },
        // ... autres tuiles
    ],
    "objects": [
        {
            "id": "goldmine_1",
            "x": 5,
            "y": 3,
            "type": "goldmine",
            "content": { "resource": "gold", "amount": 1000 }
        },
        // ... autres objets
    ]
}
```

#### Génération de Terrain Réaliste

Le backend utilise un système de génération procédurale sophistiqué :

```java
private String[][] generateRealisticTerrain(int width, int height) {
    // 1. Génération avec bruit de Perlin
    // 2. Ajout de clusters de terrain
    // 3. Ajout de rivières et lacs
    // 4. Lissage final
}
```

**Types de terrain** (distribution HOMM3) :
- `grass` : 30% - terrain de base
- `dirt` : 15% - routes et chemins
- `forest` : 15% - forêts communes
- `mountain` : 10% - obstacles (impassable)
- `water` : 8% - rivières/lacs (impassable)
- `sand` : 7% - zones désertiques
- `snow` : 7% - régions froides
- `swamp` : 4% - terrain difficile
- `rough` : 4% - terres désolées

#### Objets de la Map

Le backend place des objets sur la map :

```java
private List<Map<String, Object>> createMapObjects() {
    // Mines d'or : 1000 or/jour
    // Scieries : 2 bois/jour
    // Mines de minerai : 2 minerai/jour
    // Cavernes de cristal : 1 cristal/jour
    // Coffres au trésor : 1500-2500 or + 0-1500 XP
}
```

### 2. Réception Frontend

Le frontend reçoit la map via l'API REST ou WebSocket :

```typescript
// Dans gameService.ts
static async initializeGame(scenarioId: string): Promise<GameState> {
    // Création du jeu côté backend
    const gameData = await ApiService.createGame({
        scenarioId: scenarioId,
        playerCount: 2,
        gameMode: scenarioId
    });
    
    // Le backend retourne l'état complet incluant la map
    const fullGameState = gameData;
    
    // Transformation pour le format frontend
    const transformedGame: Game = {
        map: {
            id: fullGameState.map?.id || 'default-map',
            width: fullGameState.map?.width || 20,
            height: fullGameState.map?.height || 20,
            tiles: fullGameState.map?.tiles || [],
            objects: fullGameState.map?.objects || []
        }
        // ... autres propriétés
    };
}
```

### 3. Conversion des Tuiles dans le Store

Le store Zustand convertit le format plat en tableau 2D :

```typescript
// Dans useGameStore.ts
convertTilesToMap: (tiles: any[], width: number, height: number): Tile[][] => {
    const map: Tile[][] = [];
    for (let y = 0; y < height; y++) {
        const row: Tile[] = [];
        for (let x = 0; x < width; x++) {
            const tileIndex = y * width + x;
            const tile = tiles[tileIndex];
            if (tile) {
                row.push({
                    x: tile.x || x,
                    y: tile.y || y,
                    terrain: tile.terrain || 'grass',
                    walkable: tile.walkable !== undefined ? tile.walkable : true,
                    movementCost: tile.movementCost || 1,
                    hero: tile.hero || null,
                    creature: tile.creature || null,
                    structure: tile.structure || null,
                    isVisible: true
                });
            }
        }
        map.push(row);
    }
    return map;
}
```

### 4. Génération Frontend (Mode Démo Uniquement)

Pour les démos locales, le frontend peut générer sa propre map :

```typescript
// Dans utils/hexMapGenerator.ts
export const generateHexMap = (config: HexMapConfig): Tile[][] => {
    const { width, height, terrainDistribution } = config;
    // Génération procédurale locale
    // Utilisé UNIQUEMENT pour les démos, pas en multijoueur
}
```

## 🔄 Flux de Données Multijoueur

### 1. Création de Session
```
Client A                    Backend                     Client B
   |                           |                           |
   |-- POST /api/multiplayer/sessions -->                  |
   |                           |                           |
   |<-- Session créée ---------|                           |
   |                           |                           |
   |                           |<-- POST /join ------------|
   |                           |                           |
   |<-- WebSocket: PLAYER_JOINED ------------------------>|
```

### 2. Démarrage du Jeu
```
Client A                    Backend                     Client B
   |                           |                           |
   |-- POST /start ----------->|                           |
   |                           |                           |
   |                    Génère la map                      |
   |                           |                           |
   |<-- WebSocket: GAME_STARTED avec map complète -------->|
```

### 3. Synchronisation des Actions
```
Client A                    Backend                     Client B
   |                           |                           |
   |-- WS: MOVE_HERO --------->|                           |
   |                           |                           |
   |                    Valide et applique                 |
   |                           |                           |
   |<-- WS: GAME_UPDATE avec nouvelle position ----------->|
```

## 🎯 Points Clés pour le Multijoueur

1. **Source Unique de Vérité** : Le backend est toujours la source de vérité pour l'état de la map

2. **Pas de Génération Client** : En multijoueur, les clients ne génèrent JAMAIS leur propre map

3. **Synchronisation WebSocket** : Toutes les modifications passent par WebSocket pour garantir la cohérence

4. **Validation Backend** : Toutes les actions sont validées côté serveur avant d'être appliquées

## 🐛 Problèmes Courants et Solutions

### Désynchronisation de Map
**Problème** : Les joueurs voient des maps différentes
**Solution** : S'assurer que tous les clients reçoivent la map du backend, jamais de génération locale

### Performance
**Problème** : Chargement lent de grandes maps
**Solution** : 
- Pagination des tuiles
- Compression des données
- Mise en cache côté client

### Cohérence des Actions
**Problème** : Actions conflictuelles entre joueurs
**Solution** : 
- File d'attente des actions côté backend
- Timestamps pour l'ordre des actions
- Rollback en cas de conflit

## 📊 Format des Messages WebSocket

### Message de Création de Map
```json
{
  "type": "GAME_STARTED",
  "gameId": "game-123",
  "map": {
    "id": "hex-map-1",
    "width": 20,
    "height": 20,
    "tiles": [...],
    "objects": [...]
  },
  "players": [...]
}
```

### Message de Mise à Jour
```json
{
  "type": "MAP_UPDATE",
  "changes": [
    {
      "x": 5,
      "y": 3,
      "terrain": "forest",
      "hero": null
    }
  ]
}
```

## 🔧 Configuration

### Backend (application.properties)
```properties
# Taille maximale de map
game.map.max-width=50
game.map.max-height=50

# WebSocket
spring.websocket.message-size-limit=1048576
```

### Frontend (constants)
```typescript
export const MAP_CONFIG = {
  DEFAULT_WIDTH: 20,
  DEFAULT_HEIGHT: 20,
  MAX_ZOOM: 2,
  MIN_ZOOM: 0.5
};
```

## 📈 Optimisations Futures

1. **Streaming de Map** : Charger la map par chunks pour les grandes cartes
2. **Delta Updates** : Envoyer uniquement les changements, pas toute la map
3. **Compression** : Utiliser la compression gzip pour les données de map
4. **Cache Distribué** : Redis pour partager l'état entre serveurs 