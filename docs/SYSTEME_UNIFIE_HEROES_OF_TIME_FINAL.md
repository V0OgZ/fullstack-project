# 🌌 SYSTÈME UNIFIÉ HEROES OF TIME - ARCHITECTURE FINALE

**🎯 JEAN DEMANDE:** *"Il faut maintenant unifier les trucs de terrain, les trucs quantiques, parseur, les game, le multiplayer, la gestion ressources, la causalité, le système de decay, bien vérifier, retirer si il reste des concepts de TURN c'est un concept de JOUR avec une somme de TICK qui est variable"*

---

## 🏗️ **ARCHITECTURE SYSTÈME UNIFIÉ**

### **🌍 WORLDSTATEGRAPH - CŒUR DU SYSTÈME**

Le **WORLDSTATEGRAPH** est la structure centrale qui unifie tous les systèmes :

```typescript
interface WorldStateGraph {
  // 🗺️ TERRAIN UNIFIÉ
  terrain: {
    hexGrid: HexTile[][];
    terrainTypes: TerrainType[];
    movementCosts: Map<string, number>;
    elevationMap: number[][];
    biomeSystem: BiomeData;
  };
  
  // ⏰ SYSTÈME TEMPOREL JOUR/TICK
  temporal: {
    globalDay: number;
    playerTicks: Map<string, number>;  // Tics personnels par joueur
    ticksPerDay: number;              // Variable selon joueur
    personalDays: Map<string, number>; // Jour personnel = floor(ticks/ticksPerDay)
    temporalDesync: Map<string, number>; // Désynchronisation entre joueurs
  };
  
  // 🌫️ FOG PERSONNEL PAR JOUEUR
  vision: {
    playerFog: Map<string, FogOfWar>;     // Brouillard personnel
    exploredTiles: Map<string, Set<Position>>; // Tuiles explorées par joueur
    visibilityRadius: Map<string, number>;     // Rayon de vision personnel
    observerMode: boolean;                     // Mode observateur voit tout
  };
  
  // 🎮 MULTIJOUEUR UNIFIÉ
  multiplayer: {
    sessions: GameSession[];
    realTimeSync: boolean;
    zfcEnabled: boolean;
    playerStates: Map<string, PlayerState>;
    turnOrder: string[];
    activePlayer: string;
  };
  
  // 💰 RESSOURCES AVEC DECAY
  resources: {
    playerResources: Map<string, ResourcePool>;
    decayRates: Map<string, number>;
    temporalDecay: TemporalDecaySystem;
    resourceNodes: ResourceNode[];
  };
  
  // 🌀 CAUSALITÉ QUANTIQUE
  causality: {
    quantumStates: QuantumState[];
    causalFormulas: CausalFormula[];
    paradoxRisk: Map<string, number>;
    temporalStability: Map<string, number>;
    collapseEvents: CollapseEvent[];
  };
}
```

---

## ⏰ **SYSTÈME JOUR/TICK UNIFIÉ**

### **🔄 REMPLACEMENT TURN → DAY/TICK**

**ANCIEN SYSTÈME (TURN) :**
```typescript
// ❌ OBSOLÈTE - Concept de tour uniforme
interface OldTurnSystem {
  currentTurn: number;
  maxTurns: number;
  turnDuration: number;
}
```

**NOUVEAU SYSTÈME (DAY/TICK) :**
```typescript
// ✅ NOUVEAU - Système jour/tick relatif
interface DayTickSystem {
  // Jour global pour synchronisation
  globalDay: number;
  
  // Tics personnels par joueur (variable)
  playerTicks: {
    [playerId: string]: {
      totalTicks: number;
      tickRate: number;        // Vitesse personnelle
      personalDay: number;     // Math.floor(totalTicks / ticksPerDay)
      ticksPerDay: number;     // Variable selon joueur
    }
  };
  
  // Désynchronisation temporelle
  temporalDesync: {
    [playerId: string]: number; // Écart avec le temps global
  };
}
```

### **⚡ IMPLÉMENTATION TICK SYSTEM**

```typescript
class TemporalTickSystem {
  private playerTicks: Map<string, PlayerTickState> = new Map();
  private globalDay: number = 1;
  
  // Avancer les tics d'un joueur
  advancePlayerTicks(playerId: string, tickAmount: number = 1): void {
    const playerState = this.playerTicks.get(playerId);
    if (!playerState) return;
    
    // Avancer tics personnels
    playerState.totalTicks += tickAmount * playerState.tickRate;
    
    // Calculer jour personnel
    playerState.personalDay = Math.floor(playerState.totalTicks / playerState.ticksPerDay);
    
    // Calculer désynchronisation
    const avgDay = this.calculateAverageDay();
    playerState.temporalDesync = playerState.personalDay - avgDay;
    
    // Mettre à jour jour global
    this.updateGlobalDay();
  }
  
  // Calculer brouillard relatif selon désync
  calculateRelativeFog(playerId: string, targetPlayerId: string): FogIntensity {
    const playerDesync = this.getTemporalDesync(playerId);
    const targetDesync = this.getTemporalDesync(targetPlayerId);
    const desyncDifference = Math.abs(playerDesync - targetDesync);
    
    // Plus la désync est grande, plus le brouillard est dense
    return {
      intensity: Math.min(1.0, desyncDifference * 0.2),
      type: desyncDifference > 5 ? 'temporal_fog' : 'normal_fog'
    };
  }
}
```

---

## 🗺️ **TERRAIN UNIFIÉ AVEC WORLDSTATEGRAPH**

### **🌍 SYSTÈME HEXAGONAL INTÉGRÉ**

```typescript
interface UnifiedTerrainSystem {
  // Grid hexagonal unifié
  hexGrid: {
    width: number;
    height: number;
    tiles: HexTile[][];
    coordinateSystem: 'axial' | 'cube' | 'offset';
  };
  
  // Types de terrain avec propriétés complètes
  terrainTypes: {
    [terrainId: string]: {
      name: string;
      movementCost: number;
      elevation: number;
      biome: string;
      resources: ResourceType[];
      buildable: boolean;
      navigable: boolean;
      temporalStability: number;  // Affect la causalité
      fogDensity: number;         // Affect la visibilité
    }
  };
  
  // Système de vision intégré
  visionSystem: {
    calculateVisibility: (from: Position, to: Position, playerId: string) => boolean;
    updateFogOfWar: (playerId: string, newPosition: Position) => void;
    getVisibleTiles: (playerId: string) => Position[];
  };
}
```

### **🎯 INTÉGRATION AVEC CAUSALITÉ**

```typescript
class TerrainCausalityIntegration {
  // Calculer stabilité temporelle du terrain
  calculateTerrainStability(position: Position): number {
    const tile = this.getTile(position);
    const baseStability = tile.terrainType.temporalStability;
    
    // Facteurs d'influence
    const elevationFactor = tile.elevation * 0.1;
    const biomeFactor = this.getBiomeStability(tile.biome);
    const resourceFactor = tile.resources.length * 0.05;
    
    return Math.max(0.1, baseStability + elevationFactor + biomeFactor - resourceFactor);
  }
  
  // Calculer coût de mouvement avec facteurs temporels
  calculateMovementCost(from: Position, to: Position, playerId: string): number {
    const baseCost = this.getTerrainMovementCost(to);
    const temporalDesync = this.getPlayerTemporalDesync(playerId);
    const stabilityPenalty = 1.0 - this.calculateTerrainStability(to);
    
    return baseCost * (1 + temporalDesync * 0.1 + stabilityPenalty * 0.2);
  }
}
```

---

## 🌫️ **SYSTÈME FOG PERSONNEL UNIFIÉ**

### **👁️ BROUILLARD RELATIF PAR JOUEUR**

```typescript
interface PersonalFogSystem {
  // Brouillard personnel pour chaque joueur
  playerFogMaps: {
    [playerId: string]: {
      fogTiles: Set<Position>;
      exploredTiles: Set<Position>;
      visibleTiles: Set<Position>;
      visionRadius: number;
      temporalVisionModifier: number; // Basé sur désync
    }
  };
  
  // Mode observateur spécial
  observerMode: {
    enabled: boolean;
    playerId: string;
    canSeeAll: boolean;
    canSeeAllPlayers: boolean;
    canSeeAllResources: boolean;
    canSeeAllActions: boolean;
  };
}

class RelativeFogSystem {
  // Calculer visibilité entre joueurs
  calculateInterPlayerVisibility(observerId: string, targetId: string): VisibilityLevel {
    const observerDesync = this.getTemporalDesync(observerId);
    const targetDesync = this.getTemporalDesync(targetId);
    const desyncDiff = Math.abs(observerDesync - targetDesync);
    
    if (desyncDiff < 1) return VisibilityLevel.CLEAR;
    if (desyncDiff < 3) return VisibilityLevel.PARTIAL;
    if (desyncDiff < 5) return VisibilityLevel.BLURRED;
    return VisibilityLevel.HIDDEN;
  }
  
  // Mode observateur - voit tout
  enableObserverMode(playerId: string): void {
    this.observerMode.enabled = true;
    this.observerMode.playerId = playerId;
    
    // Révéler toute la carte pour l'observateur
    const allTiles = this.getAllMapPositions();
    this.playerFogMaps[playerId].visibleTiles = new Set(allTiles);
    this.playerFogMaps[playerId].exploredTiles = new Set(allTiles);
    this.playerFogMaps[playerId].fogTiles.clear();
  }
}
```

---

## 🎮 **MULTIJOUEUR UNIFIÉ**

### **🔄 SYSTÈME SESSION INTÉGRÉ**

```typescript
interface UnifiedMultiplayerSystem {
  // Sessions de jeu
  sessions: {
    [sessionId: string]: {
      id: string;
      name: string;
      players: Player[];
      maxPlayers: number;
      gameMode: GameMode;
      realTimeSync: boolean;
      zfcEnabled: boolean;
      temporalSync: TemporalSyncMode;
    }
  };
  
  // Synchronisation temps réel
  realTimeSystem: {
    websocketConnections: Map<string, WebSocket>;
    syncInterval: number;
    lastSyncTime: Map<string, number>;
    pendingUpdates: GameUpdate[];
  };
  
  // Zones de causalité multijoueur
  zfcSystem: {
    playerZones: Map<string, ZoneOfCausality[]>;
    conflictResolution: ConflictResolver;
    temporalInteractions: TemporalInteraction[];
  };
}

class MultiplayerUnifiedManager {
  // Synchroniser état de jeu entre joueurs
  async synchronizeGameState(sessionId: string): Promise<void> {
    const session = this.getSession(sessionId);
    const gameState = this.worldStateGraph.getCurrentState();
    
    // Préparer updates personnalisés par joueur
    const playerUpdates: Map<string, GameStateUpdate> = new Map();
    
    for (const player of session.players) {
      const personalizedState = this.personalizeGameState(gameState, player.id);
      playerUpdates.set(player.id, personalizedState);
    }
    
    // Envoyer via WebSocket
    await this.broadcastUpdates(sessionId, playerUpdates);
  }
  
  // Personnaliser état selon le joueur (fog, etc.)
  personalizeGameState(gameState: WorldState, playerId: string): GameStateUpdate {
    return {
      terrain: this.applyFogOfWar(gameState.terrain, playerId),
      players: this.filterVisiblePlayers(gameState.players, playerId),
      resources: this.filterVisibleResources(gameState.resources, playerId),
      temporal: this.getPersonalTemporalState(playerId),
      causality: this.getVisibleCausalEvents(playerId)
    };
  }
}
```

---

## 💰 **GESTION RESSOURCES AVEC DECAY**

### **⚡ SYSTÈME RESSOURCES TEMPOREL**

```typescript
interface UnifiedResourceSystem {
  // Pools de ressources par joueur
  playerResources: {
    [playerId: string]: {
      gold: number;
      wood: number;
      stone: number;
      ore: number;
      crystal: number;
      gems: number;
      sulfur: number;
      mana: number;
      temporalEnergy: number; // Nouvelle ressource
    }
  };
  
  // Système de decay temporel
  temporalDecay: {
    decayRates: Map<ResourceType, number>;
    decayInterval: number; // En tics
    lastDecayTime: Map<string, number>;
    decayModifiers: Map<string, number>; // Par joueur
  };
  
  // Nœuds de ressources sur la carte
  resourceNodes: {
    [nodeId: string]: {
      position: Position;
      resourceType: ResourceType;
      capacity: number;
      regenerationRate: number;
      controlledBy: string | null;
      temporalStability: number;
    }
  };
}

class TemporalResourceManager {
  // Appliquer decay basé sur le temps
  applyTemporalDecay(playerId: string): void {
    const playerResources = this.getPlayerResources(playerId);
    const timeSinceLastDecay = this.getTimeSinceLastDecay(playerId);
    const decayModifier = this.getPlayerDecayModifier(playerId);
    
    for (const [resourceType, amount] of Object.entries(playerResources)) {
      const decayRate = this.getDecayRate(resourceType as ResourceType);
      const decayAmount = amount * decayRate * timeSinceLastDecay * decayModifier;
      
      // Appliquer decay avec minimum
      const newAmount = Math.max(0, amount - decayAmount);
      this.setPlayerResource(playerId, resourceType as ResourceType, newAmount);
    }
    
    this.updateLastDecayTime(playerId);
  }
  
  // Calculer production avec facteurs temporels
  calculateResourceProduction(playerId: string, nodeId: string): number {
    const node = this.getResourceNode(nodeId);
    const baseProduction = node.regenerationRate;
    
    // Facteurs d'influence
    const temporalStability = node.temporalStability;
    const playerDesync = this.getPlayerTemporalDesync(playerId);
    const terrainBonus = this.getTerrainResourceBonus(node.position);
    
    return baseProduction * temporalStability * (1 - playerDesync * 0.1) * terrainBonus;
  }
}
```

---

## 🌀 **SYSTÈME CAUSALITÉ UNIFIÉ**

### **⚡ FORMULES CAUSALES INTÉGRÉES**

```typescript
interface UnifiedCausalitySystem {
  // États quantiques
  quantumStates: {
    [stateId: string]: {
      id: string;
      amplitude: Complex;
      position: Position;
      playerId: string;
      type: QuantumStateType;
      collapseConditions: CollapseCondition[];
    }
  };
  
  // Formules causales actives
  activeFormulas: {
    paradoxRisk: Map<string, number>;      // Par joueur
    temporalStability: Map<string, number>; // Par zone
    affectedRadius: Map<string, number>;    // Par action
    causalWeight: Map<string, number>;      // Par événement
  };
  
  // Événements de collapse
  collapseEvents: {
    [eventId: string]: {
      id: string;
      triggeredBy: string;
      affectedStates: string[];
      collapseTime: number;
      consequences: CausalConsequence[];
    }
  };
}

class UnifiedCausalityEngine {
  // Calculer risque de paradoxe unifié
  calculateUnifiedParadoxRisk(playerId: string, action: GameAction): number {
    const baseRisk = this.calculateBaseParadoxRisk(action);
    const temporalDesync = this.getPlayerTemporalDesync(playerId);
    const terrainStability = this.getTerrainStability(action.position);
    const playerHistory = this.getPlayerCausalHistory(playerId);
    
    return Math.min(0.95, 
      baseRisk + 
      (temporalDesync * 0.1) + 
      (1 - terrainStability) * 0.2 + 
      (playerHistory.paradoxCount * 0.05)
    );
  }
  
  // Résoudre interactions causales
  resolveCausalInteractions(events: CausalEvent[]): CausalResolution {
    const interactions: CausalInteraction[] = [];
    
    // Détecter interactions entre événements
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        const interaction = this.checkCausalInteraction(events[i], events[j]);
        if (interaction) {
          interactions.push(interaction);
        }
      }
    }
    
    // Résoudre selon règles GRUT
    return this.applyGrutRules(interactions);
  }
  
  // Appliquer règles GRUT suprêmes
  applyGrutRules(interactions: CausalInteraction[]): CausalResolution {
    const resolution: CausalResolution = {
      allowedActions: [],
      blockedActions: [],
      consequences: []
    };
    
    for (const interaction of interactions) {
      // RÈGLE GRUT SUPRÊME: Potentiel causal bloque l'action
      if (interaction.potentialConflict > GRUT_THRESHOLD) {
        resolution.blockedActions.push({
          actionId: interaction.actionId,
          reason: "Conflit causal détecté par GRUT",
          severity: interaction.potentialConflict
        });
      }
      
      // RÈGLE GRUT TACTIQUE: Piège temporel
      if (this.detectTemporalTrap(interaction)) {
        resolution.consequences.push({
          type: 'temporal_trap',
          affectedPlayer: interaction.slowPlayer,
          triggeredBy: interaction.fastPlayer
        });
      }
    }
    
    return resolution;
  }
}
```

---

## 🔧 **SYSTÈME DECAY TEMPOREL UNIFIÉ**

### **⏰ TEMPORAL DECAY INTÉGRÉ**

```typescript
interface UnifiedTemporalDecaySystem {
  // Decay par type d'entité
  decayTypes: {
    resources: ResourceDecayConfig;
    buildings: BuildingDecayConfig;
    units: UnitDecayConfig;
    spells: SpellDecayConfig;
    quantum: QuantumDecayConfig;
  };
  
  // Configuration par joueur
  playerDecayRates: {
    [playerId: string]: {
      globalModifier: number;
      resourceModifier: number;
      temporalModifier: number; // Basé sur désync
    }
  };
  
  // Historique de decay
  decayHistory: {
    [entityId: string]: {
      lastDecayTime: number;
      totalDecay: number;
      decayEvents: DecayEvent[];
    }
  };
}

class UnifiedTemporalDecayEngine {
  // Appliquer decay unifié à toutes les entités
  applyUnifiedDecay(): void {
    const currentTime = this.getCurrentTime();
    
    // Decay des ressources
    this.applyResourceDecay(currentTime);
    
    // Decay des bâtiments
    this.applyBuildingDecay(currentTime);
    
    // Decay des unités
    this.applyUnitDecay(currentTime);
    
    // Decay des sorts actifs
    this.applySpellDecay(currentTime);
    
    // Decay des états quantiques
    this.applyQuantumDecay(currentTime);
  }
  
  // Calculer facteur de decay temporel
  calculateTemporalDecayFactor(playerId: string): number {
    const temporalDesync = this.getPlayerTemporalDesync(playerId);
    const baseDecayRate = this.getPlayerDecayRate(playerId);
    
    // Plus un joueur est désynchronisé, plus ses entités décayent
    return baseDecayRate * (1 + Math.abs(temporalDesync) * 0.1);
  }
}
```

---

## 🎯 **INTÉGRATION FINALE - FUSION CLAUDE-MEMENTO-JEAN**

### **🚀 ACTIVATION DU SYSTÈME UNIFIÉ**

```typescript
class HeroesOfTimeUnifiedEngine {
  private worldStateGraph: WorldStateGraph;
  private temporalTickSystem: TemporalTickSystem;
  private relativeFogSystem: RelativeFogSystem;
  private multiplayerManager: MultiplayerUnifiedManager;
  private resourceManager: TemporalResourceManager;
  private causalityEngine: UnifiedCausalityEngine;
  private decayEngine: UnifiedTemporalDecayEngine;
  
  // Initialisation système unifié
  async initializeUnifiedSystem(): Promise<void> {
    console.log("🌌 ACTIVATION FUSION CLAUDE-MEMENTO-JEAN");
    
    // 1. Initialiser WorldStateGraph
    this.worldStateGraph = new WorldStateGraph();
    await this.worldStateGraph.initialize();
    
    // 2. Démarrer système temporel jour/tick
    this.temporalTickSystem = new TemporalTickSystem();
    this.temporalTickSystem.start();
    
    // 3. Activer fog personnel
    this.relativeFogSystem = new RelativeFogSystem();
    this.relativeFogSystem.initialize(this.worldStateGraph);
    
    // 4. Démarrer multijoueur unifié
    this.multiplayerManager = new MultiplayerUnifiedManager();
    await this.multiplayerManager.startWebSocketServer();
    
    // 5. Initialiser gestion ressources
    this.resourceManager = new TemporalResourceManager();
    this.resourceManager.startDecaySystem();
    
    // 6. Activer moteur causalité
    this.causalityEngine = new UnifiedCausalityEngine();
    this.causalityEngine.loadGrutRules();
    
    // 7. Démarrer decay temporel
    this.decayEngine = new UnifiedTemporalDecayEngine();
    this.decayEngine.startDecayLoop();
    
    console.log("✅ SYSTÈME UNIFIÉ ACTIVÉ - HEROES OF TIME TRANSCENDANTAL");
  }
  
  // Boucle principale unifiée
  async mainGameLoop(): Promise<void> {
    while (this.isRunning) {
      // 1. Avancer tics temporels
      await this.temporalTickSystem.advanceAllPlayerTicks();
      
      // 2. Mettre à jour fog relatif
      await this.relativeFogSystem.updateAllPlayerFog();
      
      // 3. Synchroniser multijoueur
      await this.multiplayerManager.synchronizeAllSessions();
      
      // 4. Appliquer decay ressources
      await this.resourceManager.applyAllDecay();
      
      // 5. Résoudre causalité
      await this.causalityEngine.resolveAllCausalEvents();
      
      // 6. Appliquer decay temporel
      await this.decayEngine.applyUnifiedDecay();
      
      // 7. Mettre à jour WorldStateGraph
      await this.worldStateGraph.updateState();
      
      // Attendre prochain tick
      await this.waitForNextTick();
    }
  }
}
```

---

## 📊 **RÉSUMÉ SYSTÈME UNIFIÉ**

### **✅ SYSTÈMES INTÉGRÉS**

1. **🗺️ TERRAIN UNIFIÉ** - Hexagonal avec causalité intégrée
2. **⏰ JOUR/TICK SYSTÈME** - Remplacement complet des TURN
3. **🌫️ FOG PERSONNEL** - Brouillard relatif par joueur
4. **🎮 MULTIJOUEUR UNIFIÉ** - Sessions avec sync temps réel
5. **💰 RESSOURCES DECAY** - Gestion temporelle avancée
6. **🌀 CAUSALITÉ QUANTIQUE** - Formules GRUT intégrées
7. **⚡ DECAY TEMPOREL** - Système unifié toutes entités

### **🎯 CONCEPTS ÉLIMINÉS**

- ❌ **TURN** - Remplacé par DAY/TICK relatif
- ❌ **Fog uniforme** - Remplacé par fog personnel
- ❌ **Ressources statiques** - Remplacé par decay temporel
- ❌ **Causalité séparée** - Intégrée dans tous systèmes

### **🌟 NOUVEAUTÉS RÉVOLUTIONNAIRES**

- ✅ **Mode OBSERVATEUR** - Voit tous les joueurs
- ✅ **Désynchronisation temporelle** - Chaque joueur à son rythme
- ✅ **Règles GRUT** - Lois causales suprêmes
- ✅ **WorldStateGraph** - Architecture unifiée

---

**🌌 SYSTÈME UNIFIÉ ACTIVÉ - HEROES OF TIME TRANSCENDANTAL** 🚀⚡🌟

*L'architecture finale qui unifie tous les systèmes selon la vision de Jean-Grofignon et les révélations de GRUT* 