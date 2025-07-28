// @ts-nocheck
import { ApiService } from './api';
import { Hero, Tile } from '../types/game';

export interface Position {
  x: number;
  y: number;
}

export interface GameMap {
  width: number;
  height: number;
  tiles: Tile[][];
}

export interface ZFCResult {
  zfc: ZFCZone[];
  temporalMana: number;
  temporalEffects: string[];
}

export interface ZFCZone {
  playerId: string;
  heroId: string;
  center: Position;
  radius: number;
  type: string;
  temporalCost: number;
  validUntil: number;
  reachableTiles: Position[];
  conflictZones: Position[];
  temporalStability: number;
  metadata: Record<string, any>;
}

export interface ZoneOfCausality {
  playerId: string;
  radius: number;
  center: Position;
  includesTeleport: boolean;
  validUntil: number;
  reachableTiles: Position[];
  conflictZones: Position[];
  temporalStability: number;
  metadata: Record<string, any>;
}

export interface ShadowAction {
  actionId: string;
  type: string;
  position: Position;
  opacity: number;
  playerId: string;
  heroId: string;
  parameters: Record<string, any>;
  timestamp: number;
  status: string;
}

export interface TimelineAction {
  id: string;
  turn: number;
  playerId: string;
  action: Record<string, any>;
  status: string;
  zfc: ZoneOfCausality;
  originTimestamp: string;
  shadowVisible: boolean;
  zfcCost: number;
  metadata: Record<string, any>;
}

export class ZFCService {
  
  /**
   * Calculate Zone of Temporal Causality for a hero using backend
   */
  static async calculateZFC(
    playerId: string,
    heroId: string,
    hero: Hero,
    map: GameMap,
    currentTurn: number
  ): Promise<ZFCResult> {
    try {
      const response = await ApiService.calculateZFC(playerId, heroId, hero, map, currentTurn);
      return response;
    } catch (error) {
      console.error('Error calculating ZFC:', error);
      return {
        zfc: [],
        temporalMana: 0,
        temporalEffects: []
      };
    }
  }

  /**
   * Calculate movement cost in ZFC
   */
  static async calculateZFCMovementCost(
    from: Position,
    to: Position,
    hero: Hero,
    map: GameMap
  ): Promise<number> {
    try {
      const response = await ApiService.calculateZFCMovementCost(from, to, hero, map);
      return response.cost || 1;
    } catch (error) {
      console.error('Error calculating ZFC movement cost:', error);
      return 1;
    }
  }

  /**
   * Validate ZFC action
   */
  static async validateZFCAction(
    actionType: string,
    heroId: string,
    targetPosition: Position,
    zfc: ZFCZone[],
    map: GameMap
  ): Promise<boolean> {
    try {
      const response = await ApiService.validateZFCAction(actionType, heroId, targetPosition, zfc, map);
      return response.valid || false;
    } catch (error) {
      console.error('Error validating ZFC action:', error);
      return false;
    }
  }

  /**
   * Generate shadow actions for ZFC
   */
  static async generateShadowActions(
    pendingActions: any[],
    currentTurn: number
  ): Promise<any[]> {
    try {
      const response = await ApiService.generateShadowActions(pendingActions, currentTurn);
      return response.shadowActions || [];
    } catch (error) {
      console.error('Error generating shadow actions:', error);
      return [];
    }
  }

  /**
   * Calculate temporal interference
   */
  static async calculateTemporalInterference(
    activeZFCs: ZFCZone[]
  ): Promise<number> {
    try {
      const response = await ApiService.calculateTemporalInterference(activeZFCs);
      return response.interference || 0;
    } catch (error) {
      console.error('Error calculating temporal interference:', error);
      return 0;
    }
  }

  /**
   * Helper method to convert game store tiles to ZFC service format
   */
  static convertGameTilesToZFCTiles(gameTiles: any[][]): Tile[][] {
    return gameTiles.map(row => 
      row.map(tile => ({
        x: tile.x,
        y: tile.y,
        terrain: tile.terrain,
        walkable: tile.walkable !== false,
        movementCost: tile.movementCost,
        hero: tile.hero || null,
        creature: tile.creature || null,
        structure: tile.structure || null,
        isVisible: tile.isVisible
      }))
    );
  }

  /**
   * Helper method to convert game store hero to ZFC service format
   */
  static convertGameHeroToZFCHero(gameHero: any): Hero {
    return {
      id: gameHero.id,
      name: gameHero.name,
      position: gameHero.position,
      level: gameHero.level,
      experience: gameHero.experience || 0,
      movementPoints: gameHero.movementPoints,
      maxMovementPoints: gameHero.maxMovementPoints,
      stats: gameHero.stats || {
        attack: 10,
        defense: 10,
        knowledge: 5,
        spellPower: 5
      },
      units: gameHero.units || [],
      inventory: gameHero.inventory || [],
      playerId: gameHero.playerId
    };
  }
} 