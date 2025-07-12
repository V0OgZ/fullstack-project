// Heroes of Time and Magic - Advanced Spacetime Pathfinding
// Revolutionary 4D/5D algorithm for zones of causality

import { SpacetimePosition, TemporalGameState, ActionPlan } from '../types/temporal';
import { Position, Hero, Player } from '../types/game';

/**
 * Advanced pathfinding node in 4D/5D spacetime
 */
interface SpacetimeNode {
  position: SpacetimePosition;
  
  // Pathfinding data
  gCost: number;        // Cost from start
  hCost: number;        // Heuristic cost to goal
  fCost: number;        // Total cost (g + h)
  parent: SpacetimeNode | null;
  
  // Temporal properties
  arrivalTime: number;  // When we can actually arrive here
  movementPoints: number; // Movement points remaining
  artifacts: string[];  // Artifacts affecting movement
  
  // Zone properties
  zoneState: 'STABLE' | 'UNSTABLE' | 'CONTESTED' | 'CORRUPTED';
  entropyLevel: number;
  temporalBarriers: string[]; // Active barriers affecting this node
  
  // Dimensional coordinates (for 5D pathfinding)
  dimension?: string;   // Alternative timeline/dimension
}

/**
 * Movement modifier from artifacts, spells, terrain
 */
interface MovementModifier {
  type: 'ARTIFACT' | 'SPELL' | 'TERRAIN' | 'TEMPORAL_BARRIER';
  id: string;
  effect: 'SPEED_BOOST' | 'TELEPORT' | 'PHASE' | 'TIME_SKIP' | 'BLOCKED';
  value: number;        // Multiplier or absolute value
  duration?: number;    // How long the effect lasts
  conditions?: string[]; // When this modifier applies
}

/**
 * Zone of Causality - area a player can influence
 */
export interface ZoneOfCausality {
  playerId: string;
  heroId: string;
  center: SpacetimePosition;
  
  // Reachable zones at different times
  reachableZones: Map<number, Set<string>>; // time -> zone position keys
  
  // Movement efficiency
  optimalPaths: Map<string, SpacetimeNode[]>; // destination key -> path
  alternativePaths: Map<string, SpacetimeNode[][]>; // destination key -> multiple paths
  
  // Temporal properties
  stabilityMap: Map<string, number>; // zone key -> stability score
  interferenceMap: Map<string, string[]>; // zone key -> interfering player IDs
  
  // Performance cache
  lastCalculated: number;
  cacheValid: boolean;
}

/**
 * Advanced spacetime pathfinding engine
 */
export class SpacetimePathfinder {
  private gameState: TemporalGameState;
  private zonesOfCausality = new Map<string, ZoneOfCausality>();
  private nodeCache = new Map<string, SpacetimeNode>();
  
  // Performance settings
  private maxSearchDepth = 50;      // Max time units to search
  private maxSpatialRange = 100;    // Max spatial distance
  private cacheTimeout = 5;         // Cache validity in turns
  
  constructor(gameState: TemporalGameState) {
    this.gameState = gameState;
  }

  // ============================================================================
  // MAIN PATHFINDING ALGORITHMS
  // ============================================================================

  /**
   * A* pathfinding in 4D spacetime with temporal constraints
   */
  findSpacetimePath(
    start: SpacetimePosition, 
    goal: SpacetimePosition, 
    hero: Hero,
    constraints: PathfindingConstraints = {}
  ): SpacetimeNode[] | null {
    
    const openSet: SpacetimeNode[] = [];
    const closedSet = new Set<string>();
    
    const startNode = this.createNode(start, hero);
    startNode.gCost = 0;
    startNode.hCost = this.calculateHeuristic(start, goal);
    startNode.fCost = startNode.gCost + startNode.hCost;
    
    openSet.push(startNode);
    
    while (openSet.length > 0) {
      // Find node with lowest f-cost
      openSet.sort((a, b) => a.fCost - b.fCost);
      const currentNode = openSet.shift()!;
      
      const currentKey = this.getNodeKey(currentNode.position);
      closedSet.add(currentKey);
      
      // Check if we reached the goal
      if (this.isAtGoal(currentNode.position, goal)) {
        return this.reconstructPath(currentNode);
      }
      
      // Explore neighbors in 4D spacetime
      const neighbors = this.getSpacetimeNeighbors(currentNode, hero, constraints);
      
      for (const neighbor of neighbors) {
        const neighborKey = this.getNodeKey(neighbor.position);
        
        if (closedSet.has(neighborKey)) continue;
        
        const tentativeGCost = currentNode.gCost + this.calculateMovementCost(
          currentNode, neighbor, hero, constraints
        );
        
        const existingNeighbor = openSet.find(n => 
          this.getNodeKey(n.position) === neighborKey
        );
        
        if (!existingNeighbor) {
          neighbor.gCost = tentativeGCost;
          neighbor.hCost = this.calculateHeuristic(neighbor.position, goal);
          neighbor.fCost = neighbor.gCost + neighbor.hCost;
          neighbor.parent = currentNode;
          openSet.push(neighbor);
        } else if (tentativeGCost < existingNeighbor.gCost) {
          existingNeighbor.gCost = tentativeGCost;
          existingNeighbor.fCost = existingNeighbor.gCost + existingNeighbor.hCost;
          existingNeighbor.parent = currentNode;
        }
      }
    }
    
    return null; // No path found
  }

  /**
   * Calculate Zone of Causality for a player/hero
   */
  calculateZoneOfCausality(
    player: Player, 
    hero: Hero, 
    timeHorizon: number = 20
  ): ZoneOfCausality {
    
    const zocKey = `${player.id}_${hero.id}`;
    const existingZOC = this.zonesOfCausality.get(zocKey);
    
    // Return cached result if still valid
    if (existingZOC && 
        existingZOC.cacheValid && 
        this.gameState.currentTime - existingZOC.lastCalculated < this.cacheTimeout) {
      return existingZOC;
    }
    
    const center: SpacetimePosition = {
      x: hero.position.x,
      y: hero.position.y,
      t: this.gameState.currentTime
    };
    
    const zoc: ZoneOfCausality = {
      playerId: player.id,
      heroId: hero.id,
      center,
      reachableZones: new Map(),
      optimalPaths: new Map(),
      alternativePaths: new Map(),
      stabilityMap: new Map(),
      interferenceMap: new Map(),
      lastCalculated: this.gameState.currentTime,
      cacheValid: true
    };
    
    // Calculate reachable zones for each time slice
    for (let t = this.gameState.currentTime; t <= this.gameState.currentTime + timeHorizon; t++) {
      const reachableAtTime = this.calculateReachableZonesAtTime(hero, t);
      zoc.reachableZones.set(t, reachableAtTime);
      
             // Calculate stability and interference for each reachable zone
       Array.from(reachableAtTime).forEach(zoneKey => {
         const position = this.parseZoneKey(zoneKey);
         const stability = this.calculateZoneStability(position, player.id);
         const interference = this.detectInterference(position, player.id);
         
         zoc.stabilityMap.set(zoneKey, stability);
         zoc.interferenceMap.set(zoneKey, interference);
       });
    }
    
    this.zonesOfCausality.set(zocKey, zoc);
    return zoc;
  }

  /**
   * Dijkstra's algorithm modified for 4D spacetime
   */
  calculateReachabilityMap(
    start: SpacetimePosition,
    hero: Hero,
    maxTime: number
  ): Map<string, number> {
    
    const distances = new Map<string, number>();
    const unvisited = new Set<string>();
    const visited = new Set<string>();
    
    const startKey = this.getNodeKey(start);
    distances.set(startKey, 0);
    unvisited.add(startKey);
    
         while (unvisited.size > 0) {
       // Find unvisited node with minimum distance
       let currentKey = '';
       let minDistance = Infinity;
       
       Array.from(unvisited).forEach(nodeKey => {
         const distance = distances.get(nodeKey) || Infinity;
         if (distance < minDistance) {
           minDistance = distance;
           currentKey = nodeKey;
         }
       });
      
      if (minDistance === Infinity) break;
      
      unvisited.delete(currentKey);
      visited.add(currentKey);
      
      const currentPos = this.parseZoneKey(currentKey);
      if (currentPos.t > maxTime) continue;
      
      // Explore all spacetime neighbors
      const neighbors = this.getSpacetimeNeighbors(
        this.createNode(currentPos, hero), 
        hero
      );
      
      for (const neighbor of neighbors) {
        const neighborKey = this.getNodeKey(neighbor.position);
        
        if (visited.has(neighborKey)) continue;
        
        const edgeCost = this.calculateMovementCost(
          this.createNode(currentPos, hero),
          neighbor,
          hero
        );
        
        const newDistance = minDistance + edgeCost;
        const currentDistance = distances.get(neighborKey) || Infinity;
        
        if (newDistance < currentDistance) {
          distances.set(neighborKey, newDistance);
          unvisited.add(neighborKey);
        }
      }
    }
    
    return distances;
  }

  // ============================================================================
  // TEMPORAL INTERFERENCE DETECTION
  // ============================================================================

  /**
   * Detect potential interference from other players
   */
  detectInterference(position: SpacetimePosition, excludePlayerId: string): string[] {
    const interferingPlayers: string[] = [];
    
    for (const player of this.gameState.players) {
      if (player.id === excludePlayerId) continue;
      
      for (const hero of player.heroes) {
        // Check if this hero could reach the position
        const couldReach = this.couldHeroReachPosition(hero, position);
        if (couldReach) {
          interferingPlayers.push(player.id);
          break; // One hero per player is enough
        }
      }
    }
    
    // Check for planned actions that could interfere
    for (const action of this.gameState.activeActions) {
      if (action.playerId === excludePlayerId) continue;
      
      if (this.actionCouldInterfere(action, position)) {
        if (!interferingPlayers.includes(action.playerId)) {
          interferingPlayers.push(action.playerId);
        }
      }
    }
    
    return interferingPlayers;
  }

  /**
   * Calculate zone stability based on potential interference
   */
  calculateZoneStability(position: SpacetimePosition, playerId: string): number {
    let stability = 100; // Start with perfect stability
    
    // Factor in entropy
    const entropy = this.getZoneEntropy(position);
    stability -= entropy * 0.5;
    
    // Factor in interference potential
    const interference = this.detectInterference(position, playerId);
    stability -= interference.length * 15;
    
    // Factor in temporal barriers
    const barriers = this.getTemporalBarriers(position);
    stability -= barriers.length * 10;
    
    // Factor in distance from player's current position
    const player = this.gameState.players.find(p => p.id === playerId);
    if (player && player.heroes[0]) {
      const distance = this.calculateSpatialDistance(
        player.heroes[0].position, 
        position
      );
      stability -= Math.min(distance * 2, 30);
    }
    
    return Math.max(0, Math.min(100, stability));
  }

  // ============================================================================
  // HELPER METHODS
  // ============================================================================

  private createNode(position: SpacetimePosition, hero: Hero): SpacetimeNode {
    const key = this.getNodeKey(position);
    
    if (this.nodeCache.has(key)) {
      return { ...this.nodeCache.get(key)! };
    }
    
    const node: SpacetimeNode = {
      position,
      gCost: 0,
      hCost: 0,
      fCost: 0,
      parent: null,
      arrivalTime: position.t,
      movementPoints: hero.movementPoints,
      artifacts: hero.inventory.map(item => item.id),
      zoneState: this.getZoneState(position),
      entropyLevel: this.getZoneEntropy(position),
      temporalBarriers: this.getTemporalBarriers(position)
    };
    
    this.nodeCache.set(key, node);
    return { ...node };
  }

  private getSpacetimeNeighbors(
    node: SpacetimeNode, 
    hero: Hero,
    constraints: PathfindingConstraints = {}
  ): SpacetimeNode[] {
    
    const neighbors: SpacetimeNode[] = [];
    const { position } = node;
    
    // Spatial movement (8 directions)
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    
    for (const [dx, dy] of directions) {
      // Normal movement
      const newPos: SpacetimePosition = {
        x: position.x + dx,
        y: position.y + dy,
        t: position.t + 1
      };
      
      if (this.isValidPosition(newPos, constraints)) {
        neighbors.push(this.createNode(newPos, hero));
      }
      
      // Time acceleration (if hero has artifacts)
      if (this.heroCanAccelerate(hero)) {
        const acceleratedPos: SpacetimePosition = {
          x: position.x + dx * 2,
          y: position.y + dy * 2,
          t: position.t + 1 // Same time cost but double distance
        };
        
        if (this.isValidPosition(acceleratedPos, constraints)) {
          neighbors.push(this.createNode(acceleratedPos, hero));
        }
      }
    }
    
    // Temporal movement (waiting)
    const waitPos: SpacetimePosition = {
      x: position.x,
      y: position.y,
      t: position.t + 1
    };
    
    if (this.isValidPosition(waitPos, constraints)) {
      neighbors.push(this.createNode(waitPos, hero));
    }
    
    // Teleportation (if hero has artifacts)
    if (this.heroCanTeleport(hero)) {
      const teleportRange = this.getTeleportRange(hero);
      
      for (let dx = -teleportRange; dx <= teleportRange; dx++) {
        for (let dy = -teleportRange; dy <= teleportRange; dy++) {
          if (dx === 0 && dy === 0) continue;
          
          const teleportPos: SpacetimePosition = {
            x: position.x + dx,
            y: position.y + dy,
            t: position.t + 1
          };
          
          if (this.isValidPosition(teleportPos, constraints)) {
            neighbors.push(this.createNode(teleportPos, hero));
          }
        }
      }
    }
    
    return neighbors;
  }

  private calculateHeuristic(from: SpacetimePosition, to: SpacetimePosition): number {
    // Manhattan distance in space + temporal distance
    const spatialDistance = Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
    const temporalDistance = Math.abs(to.t - from.t);
    
    return spatialDistance + temporalDistance * 0.5;
  }

  private calculateMovementCost(
    from: SpacetimeNode, 
    to: SpacetimeNode, 
    hero: Hero,
    constraints: PathfindingConstraints = {}
  ): number {
    
    let cost = 1; // Base movement cost
    
    // Spatial distance cost
    const spatialDistance = Math.abs(to.position.x - from.position.x) + 
                           Math.abs(to.position.y - from.position.y);
    cost += spatialDistance * 0.5;
    
    // Temporal cost
    const temporalDistance = to.position.t - from.position.t;
    cost += temporalDistance * 0.2;
    
    // Entropy penalty
    cost += to.entropyLevel * 0.1;
    
    // Zone state penalty
    switch (to.zoneState) {
      case 'UNSTABLE': cost += 1; break;
      case 'CONTESTED': cost += 3; break;
      case 'CORRUPTED': cost += 10; break;
    }
    
    // Temporal barriers
    cost += to.temporalBarriers.length * 2;
    
    // Movement modifier from artifacts
    const modifiers = this.getMovementModifiers(hero, to.position);
    for (const modifier of modifiers) {
      switch (modifier.effect) {
        case 'SPEED_BOOST': cost *= (1 - modifier.value * 0.1); break;
        case 'TELEPORT': cost *= 0.5; break;
        case 'BLOCKED': cost = Infinity; break;
      }
    }
    
    return Math.max(0.1, cost);
  }

  private reconstructPath(node: SpacetimeNode): SpacetimeNode[] {
    const path: SpacetimeNode[] = [];
    let current: SpacetimeNode | null = node;
    
    while (current) {
      path.unshift(current);
      current = current.parent;
    }
    
    return path;
  }

  private getNodeKey(position: SpacetimePosition): string {
    return `${position.x},${position.y},${position.t}`;
  }

  private parseZoneKey(key: string): SpacetimePosition {
    const [x, y, t] = key.split(',').map(Number);
    return { x, y, t };
  }

  private isAtGoal(position: SpacetimePosition, goal: SpacetimePosition): boolean {
    return position.x === goal.x && 
           position.y === goal.y && 
           position.t >= goal.t;
  }

  private isValidPosition(position: SpacetimePosition, constraints: PathfindingConstraints): boolean {
    // Basic bounds checking
    if (position.t < this.gameState.currentTime) return false;
    if (position.t > this.gameState.currentTime + this.maxSearchDepth) return false;
    
    const distance = Math.abs(position.x) + Math.abs(position.y);
    if (distance > this.maxSpatialRange) return false;
    
    // Custom constraints
    if (constraints.avoidZones) {
      const key = this.getNodeKey(position);
      if (constraints.avoidZones.has(key)) return false;
    }
    
    if (constraints.requireStableZones) {
      const stability = this.calculateZoneStability(position, constraints.playerId || '');
      if (stability < 50) return false;
    }
    
    return true;
  }

  // Placeholder methods - to be implemented
  private calculateReachableZonesAtTime(hero: Hero, time: number): Set<string> { return new Set(); }
  private couldHeroReachPosition(hero: Hero, position: SpacetimePosition): boolean { return false; }
  private actionCouldInterfere(action: ActionPlan, position: SpacetimePosition): boolean { return false; }
  private getZoneState(position: SpacetimePosition): 'STABLE' | 'UNSTABLE' | 'CONTESTED' | 'CORRUPTED' { return 'STABLE'; }
  private getZoneEntropy(position: SpacetimePosition): number { return 0; }
  private getTemporalBarriers(position: SpacetimePosition): string[] { return []; }
  private calculateSpatialDistance(from: Position, to: SpacetimePosition): number { return 0; }
  private heroCanAccelerate(hero: Hero): boolean { return false; }
  private heroCanTeleport(hero: Hero): boolean { return false; }
  private getTeleportRange(hero: Hero): number { return 0; }
  private getMovementModifiers(hero: Hero, position: SpacetimePosition): MovementModifier[] { return []; }
}

// Pathfinding constraints
interface PathfindingConstraints {
  playerId?: string;
  avoidZones?: Set<string>;
  requireStableZones?: boolean;
  maxEntropy?: number;
  allowedMovementTypes?: ('WALK' | 'TELEPORT' | 'FLY' | 'PHASE')[];
} 