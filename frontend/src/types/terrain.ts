// Types pour le système de terrain hexagonal Heroes of Time

export type BiomeType = 
  | 'forest' 
  | 'desert' 
  | 'water' 
  | 'mountain' 
  | 'grass' 
  | 'swamp' 
  | 'snow' 
  | 'lava' 
  | 'crystal' 
  | 'corruption';

export type RiverDirection = 'N' | 'NE' | 'SE' | 'S' | 'SW' | 'NW';

export interface HexTile {
  q: number;                       // coord axiale
  r: number;
  biome: BiomeType;
  elevation: number;               // 0-100
  humidity: number;                // 0-100
  riverFlowDir?: RiverDirection;
  naturalBarrier?: boolean;        // falaise infranchissable, etc.
  
  // Propriétés calculées par le moteur
  groupId?: number;                // ID du groupe de biome
  distanceToEdge?: number;         // Distance au bord du biome
  spriteId?: string;               // ID du sprite à utiliser
  gradientDir?: { dx: number; dy: number; }; // Direction du gradient
}

export interface TerrainGroup {
  id: number;
  biome: BiomeType;
  tiles: HexTile[];
  center: { q: number; r: number; };
  area: number;
}

export interface HexMap {
  tiles: Map<string, HexTile>;     // Clé: `${q},${r}`
  groups: TerrainGroup[];
  seed: number;
  bounds: {
    minQ: number;
    maxQ: number;
    minR: number;
    maxR: number;
  };
}

// Constantes pour le rendu
export const TERRAIN_CONSTANTS = {
  TILE_WIDTH: 64,
  TILE_HEIGHT: 56,
  HEX_NEIGHBORS: [
    { q: 1, r: 0 },   // E
    { q: 1, r: -1 },  // NE
    { q: 0, r: -1 },  // NW
    { q: -1, r: 0 },  // W
    { q: -1, r: 1 },  // SW
    { q: 0, r: 1 }    // SE
  ],
  NEIGHBOR_DIRS: ['E', 'NE', 'NW', 'W', 'SW', 'SE'] as const
} as const;

// Helpers pour les coordonnées hexagonales
export interface AxialCoord {
  q: number;
  r: number;
}

export interface PixelCoord {
  x: number;
  y: number;
}

// Types pour les sprites et assets
export interface SpriteVariant {
  id: string;
  biome: BiomeType;
  type: 'core' | 'inner' | 'edge' | 'transition';
  direction?: RiverDirection;
  variantIndex?: number;
}

export interface TerrainAssets {
  terrain: Map<string, string>;    // spriteId -> asset path
  transitions: Map<string, string>; // transition -> asset path
  overlays: Map<string, string>;   // overlay -> asset path
}

// Types pour les formes macro-naturelles
export interface MacroFormation {
  type: 'gulf' | 'dunes' | 'clearing' | 'river_network';
  center: AxialCoord;
  radius: number;
  tiles: AxialCoord[];
  parameters: Record<string, any>;
}

// Types pour l'évolution temporelle (futur)
export interface TemporalState {
  vegetationLevel: number;
  floodLevel: number;
  corruption: number;
  tick: number;
}

export interface TerrainEvolution {
  currentState: TemporalState;
  history: TemporalState[];
  rules: EvolutionRule[];
}

export interface EvolutionRule {
  name: string;
  condition: (tile: HexTile, neighbors: HexTile[]) => boolean;
  effect: (tile: HexTile) => void;
  priority: number;
}