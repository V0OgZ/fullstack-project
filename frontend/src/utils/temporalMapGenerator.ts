import { TemporalMap, TemporalZone, SpacetimePosition } from '../types/temporal';

export interface TemporalMapConfig {
  name: string;
  description: string;
  theme: string;
  size: { width: number; height: number };
  timeLines: number[];
  defaultTimeline: number;
  specialZones: Array<{
    name: string;
    type: string;
    position: { x: number; y: number };
    radius: number;
    effect: string;
    stabilityModifier?: number;
    entropyModifier?: number;
    manaRegeneration?: number;
    timeline?: number;
  }>;
  terrain: Array<{
    type: string;
    name: string;
    color: string;
    passable: boolean;
    movementCost?: number;
    specialEffect?: string;
    positions: Array<{ x: number; y: number }> | string;
  }>;
  structures: Array<{
    name: string;
    type: string;
    position: { x: number; y: number };
    owner: string;
    garrison?: string[];
    specialAbilities?: string[];
    effect?: string;
    description: string;
  }>;
  creatures: Array<{
    name: string;
    type: string;
    position: { x: number; y: number };
    level: number;
    abilities: string[];
    description: string;
  }>;
  objects: Array<{
    name: string;
    type: string;
    position: { x: number; y: number };
    effect: string;
    description: string;
  }>;
  startingPositions: Array<{
    player: number;
    position: { x: number; y: number };
    timeline: number;
    description: string;
  }>;
  victoryConditions: Array<{
    type: string;
    description: string;
  }>;
  ambientEffects: Array<{
    name: string;
    description: string;
    effect: string;
  }>;
}

export class TemporalMapGenerator {
  private config: TemporalMapConfig | null = null;

  async loadMapConfig(mapName: string): Promise<TemporalMapConfig> {
    try {
      const response = await fetch(`/maps/${mapName}.json`);
      if (!response.ok) {
        throw new Error(`Impossible de charger la map ${mapName}`);
      }
      this.config = await response.json();
      return this.config!;
    } catch (error) {
      console.error('Erreur lors du chargement de la map:', error);
      // Fallback vers la configuration par défaut
      return this.getDefaultTemporalRiftConfig();
    }
  }

  private getDefaultTemporalRiftConfig(): TemporalMapConfig {
    return {
      name: "Temporal Rift",
      description: "Une faille dans l'espace-temps où passé, présent et futur se mélangent",
      theme: "temporal",
      size: { width: 20, height: 15 },
      timeLines: [0, 1, 2, 3, 4],
      defaultTimeline: 2,
      specialZones: [
        {
          name: "Nexus Temporel",
          type: "temporal_nexus",
          position: { x: 10, y: 7 },
          radius: 2,
          effect: "Permet de voyager entre les époques",
          stabilityModifier: -2
        },
        {
          name: "Portail du Passé",
          type: "past_portal",
          position: { x: 3, y: 3 },
          radius: 1,
          effect: "Accès aux événements passés",
          timeline: 0
        },
        {
          name: "Portail du Futur",
          type: "future_portal",
          position: { x: 17, y: 12 },
          radius: 1,
          effect: "Vision des possibilités futures",
          timeline: 4
        },
        {
          name: "Zone d'Instabilité",
          type: "unstable_zone",
          position: { x: 6, y: 10 },
          radius: 3,
          effect: "Entropie augmentée, effets temporels imprévisibles",
          entropyModifier: 2
        },
        {
          name: "Cristaux Temporels",
          type: "time_crystals",
          position: { x: 14, y: 4 },
          radius: 1,
          effect: "Source d'énergie temporelle",
          manaRegeneration: 2
        }
      ],
      terrain: [
        {
          type: "void",
          name: "Vide Temporel",
          color: "#0a0a0a",
          passable: false,
          positions: [
            { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 18, y: 0 }, { x: 19, y: 0 },
            { x: 0, y: 14 }, { x: 1, y: 14 }, { x: 18, y: 14 }, { x: 19, y: 14 }
          ]
        },
        {
          type: "temporal_grass",
          name: "Herbe Temporelle",
          color: "#4a9f4a",
          passable: true,
          movementCost: 1,
          positions: "default"
        },
        {
          type: "chrono_forest",
          name: "Forêt Chronologique",
          color: "#2d5a2d",
          passable: true,
          movementCost: 2,
          positions: [
            { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
            { x: 2, y: 8 }, { x: 3, y: 8 }, { x: 4, y: 8 },
            { x: 15, y: 3 }, { x: 16, y: 3 }, { x: 17, y: 3 },
            { x: 15, y: 11 }, { x: 16, y: 11 }, { x: 17, y: 11 }
          ]
        },
        {
          type: "time_river",
          name: "Rivière Temporelle",
          color: "#4a8fbf",
          passable: true,
          movementCost: 2,
          specialEffect: "Les unités peuvent voyager dans le temps en suivant le courant",
          positions: [
            { x: 8, y: 1 }, { x: 9, y: 2 }, { x: 10, y: 3 }, { x: 11, y: 4 },
            { x: 12, y: 5 }, { x: 11, y: 6 }, { x: 10, y: 7 }, { x: 9, y: 8 },
            { x: 8, y: 9 }, { x: 9, y: 10 }, { x: 10, y: 11 }, { x: 11, y: 12 }
          ]
        },
        {
          type: "crystal_mountains",
          name: "Montagnes de Cristal",
          color: "#8a7a5a",
          passable: true,
          movementCost: 3,
          positions: [
            { x: 13, y: 1 }, { x: 14, y: 1 }, { x: 15, y: 1 },
            { x: 13, y: 2 }, { x: 14, y: 2 }, { x: 15, y: 2 },
            { x: 5, y: 12 }, { x: 6, y: 12 }, { x: 7, y: 12 },
            { x: 5, y: 13 }, { x: 6, y: 13 }, { x: 7, y: 13 }
          ]
        },
        {
          type: "temporal_desert",
          name: "Désert Temporel",
          color: "#d4a574",
          passable: true,
          movementCost: 1,
          positions: [
            { x: 12, y: 8 }, { x: 13, y: 8 }, { x: 14, y: 8 },
            { x: 12, y: 9 }, { x: 13, y: 9 }, { x: 14, y: 9 },
            { x: 12, y: 10 }, { x: 13, y: 10 }, { x: 14, y: 10 }
          ]
        }
      ],
      structures: [
        {
          name: "Citadelle Temporelle",
          type: "temporal_citadel",
          position: { x: 10, y: 7 },
          owner: "neutral",
          garrison: ["time_guardian", "chrono_sentinel"],
          specialAbilities: ["temporal_anchor", "time_manipulation"],
          description: "Forteresse au centre du nexus temporel"
        },
        {
          name: "Observatoire du Temps",
          type: "time_observatory",
          position: { x: 14, y: 4 },
          owner: "neutral",
          effect: "Révèle les événements futurs possibles",
          description: "Permet de voir les lignes temporelles alternatives"
        },
        {
          name: "Sanctuaire du Passé",
          type: "past_sanctuary",
          position: { x: 3, y: 3 },
          owner: "neutral",
          effect: "Accès aux connaissances anciennes",
          description: "Gardien des secrets du passé"
        },
        {
          name: "Portail du Futur",
          type: "future_gate",
          position: { x: 17, y: 12 },
          owner: "neutral",
          effect: "Transport vers les époques futures",
          description: "Porte vers les possibilités infinies"
        }
      ],
      creatures: [
        {
          name: "Gardien Temporel",
          type: "time_guardian",
          position: { x: 10, y: 6 },
          level: 5,
          abilities: ["temporal_shield", "chronostasis"],
          description: "Protecteur éternel du nexus"
        },
        {
          name: "Écho du Passé",
          type: "past_echo",
          position: { x: 4, y: 4 },
          level: 3,
          abilities: ["memory_drain", "past_vision"],
          description: "Vestige d'une époque révolue"
        },
        {
          name: "Oracle du Futur",
          type: "future_oracle",
          position: { x: 16, y: 11 },
          level: 4,
          abilities: ["prophecy", "future_sight"],
          description: "Prophète des temps à venir"
        },
        {
          name: "Anomalie Temporelle",
          type: "time_anomaly",
          position: { x: 7, y: 9 },
          level: 6,
          abilities: ["reality_distortion", "temporal_chaos"],
          description: "Entité née de l'instabilité temporelle"
        }
      ],
      objects: [
        {
          name: "Cristal de Temps",
          type: "time_crystal",
          position: { x: 5, y: 5 },
          effect: "+2 Mana temporel par tour",
          description: "Énergie temporelle cristallisée"
        },
        {
          name: "Sablier Éternel",
          type: "eternal_hourglass",
          position: { x: 15, y: 8 },
          effect: "Permet de ralentir le temps local",
          description: "Relique des premiers chronurgistes"
        },
        {
          name: "Miroir des Époques",
          type: "epoch_mirror",
          position: { x: 12, y: 3 },
          effect: "Révèle les actions des autres timelines",
          description: "Reflet des réalités alternatives"
        },
        {
          name: "Coffre Temporel",
          type: "temporal_chest",
          position: { x: 8, y: 12 },
          effect: "Contient des artefacts de différentes époques",
          description: "Trésor perdu dans le temps"
        }
      ],
      startingPositions: [
        {
          player: 1,
          position: { x: 2, y: 7 },
          timeline: 2,
          description: "Position de départ dans le présent"
        },
        {
          player: 2,
          position: { x: 18, y: 7 },
          timeline: 2,
          description: "Position de départ dans le présent"
        }
      ],
      victoryConditions: [
        {
          type: "temporal_dominance",
          description: "Contrôler le Nexus Temporel pendant 5 tours consécutifs"
        },
        {
          type: "chronological_mastery",
          description: "Avoir des unités dans au moins 4 timelines différentes"
        },
        {
          type: "temporal_artifacts",
          description: "Collecter tous les artefacts temporels de la carte"
        }
      ],
      ambientEffects: [
        {
          name: "Flux Temporel",
          description: "Les coûts en mana temporel varient selon la proximité du nexus",
          effect: "mana_cost_modifier"
        },
        {
          name: "Écho Temporel",
          description: "Les actions importantes créent des échos dans les autres timelines",
          effect: "action_echoes"
        },
        {
          name: "Instabilité Chronologique",
          description: "Certaines zones deviennent instables de manière aléatoire",
          effect: "random_instability"
        }
      ]
    };
  }

  generateTemporalMap(config: TemporalMapConfig): TemporalMap {
    const { width, height } = config.size;
    
    // Créer la grille de base
    const zones: TemporalZone[][][] = [];
    for (let t = 0; t < config.timeLines.length; t++) {
      zones[t] = [];
      for (let y = 0; y < height; y++) {
        zones[t][y] = [];
        for (let x = 0; x < width; x++) {
          zones[t][y][x] = this.createBaseZone(x, y, t, config);
        }
      }
    }

    // Appliquer les terrains spéciaux
    this.applyTerrainConfig(zones, config);

    // Appliquer les zones spéciales
    this.applySpecialZones(zones, config);

    // Placer les structures
    this.placeStructures(zones, config);

    // Placer les créatures
    this.placeCreatures(zones, config);

    // Placer les objets
    this.placeObjects(zones, config);

    return {
      name: config.name,
      description: config.description,
      size: config.size,
      timeLines: config.timeLines,
      defaultTimeline: config.defaultTimeline,
      zones,
      startingPositions: config.startingPositions.map(pos => ({
        x: pos.position.x,
        y: pos.position.y,
        t: pos.timeline
      })),
      victoryConditions: config.victoryConditions,
      ambientEffects: config.ambientEffects
    };
  }

  private createBaseZone(x: number, y: number, t: number, config: TemporalMapConfig): TemporalZone {
    return {
      position: { x, y, t },
      state: 'STABLE',
      entropy: 'NONE',
      
      // Required properties
      lastActivity: 0,
      corruptionRate: 0,
      history: [],
      predictions: [],
      
      // Map generation properties
      terrain: 'temporal_grass',
      structure: undefined,
      hero: undefined,
      objects: [],
      entities: [],
      temporalEffects: [],
      stability: 100,
      influence: new Map(),
      lastModified: 0
    };
  }

  private applyTerrainConfig(zones: TemporalZone[][][], config: TemporalMapConfig): void {
    const { width, height } = config.size;
    
    config.terrain.forEach(terrain => {
      let positions: Array<{ x: number; y: number }> = [];
      
      if (terrain.positions === "default") {
        // Appliquer par défaut à toutes les positions non spécifiées
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            positions.push({ x, y });
          }
        }
      } else if (Array.isArray(terrain.positions)) {
        positions = terrain.positions;
      }

      positions.forEach(pos => {
        if (pos.x >= 0 && pos.x < width && pos.y >= 0 && pos.y < height) {
          // Appliquer le terrain à toutes les timelines
          config.timeLines.forEach(t => {
            if (zones[t] && zones[t][pos.y] && zones[t][pos.y][pos.x]) {
              zones[t][pos.y][pos.x].terrain = terrain.type;
            }
          });
        }
      });
    });
  }

  private applySpecialZones(zones: TemporalZone[][][], config: TemporalMapConfig): void {
    config.specialZones.forEach(specialZone => {
      const centerX = specialZone.position.x;
      const centerY = specialZone.position.y;
      const radius = specialZone.radius;

      // Appliquer l'effet dans le rayon spécifié
      for (let y = centerY - radius; y <= centerY + radius; y++) {
        for (let x = centerX - radius; x <= centerX + radius; x++) {
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          if (distance <= radius) {
            const timelineIndex = specialZone.timeline ?? config.defaultTimeline;
            if (zones[timelineIndex] && zones[timelineIndex][y] && zones[timelineIndex][y][x]) {
              const zone = zones[timelineIndex][y][x];
              
                             // Appliquer les effets spéciaux
               if (specialZone.stabilityModifier && zone.stability !== undefined) {
                 zone.stability = Math.max(0, Math.min(100, zone.stability + specialZone.stabilityModifier * 10));
               }
               
               if (specialZone.entropyModifier) {
                 // Augmenter l'entropie
                 if (specialZone.entropyModifier > 0) {
                   zone.entropy = zone.entropy === 'NONE' ? 'LOW' : 
                                 zone.entropy === 'LOW' ? 'MEDIUM' : 
                                 zone.entropy === 'MEDIUM' ? 'HIGH' : 'CRITICAL';
                 }
               }
 
               // Marquer comme zone spéciale
               if (zone.temporalEffects) {
                 zone.temporalEffects.push({
                   type: specialZone.type,
                   name: specialZone.name,
                   description: specialZone.effect,
                   duration: -1, // Permanent
                   strength: 1
                 });
               }
            }
          }
        }
      }
    });
  }

  private placeStructures(zones: TemporalZone[][][], config: TemporalMapConfig): void {
    config.structures.forEach(structure => {
      const x = structure.position.x;
      const y = structure.position.y;
      const t = config.defaultTimeline;

      if (zones[t] && zones[t][y] && zones[t][y][x]) {
        zones[t][y][x].structure = {
          name: structure.name,
          type: structure.type,
          owner: structure.owner,
          description: structure.description,
          specialAbilities: structure.specialAbilities || [],
          garrison: structure.garrison || []
        };
      }
    });
  }

  private placeCreatures(zones: TemporalZone[][][], config: TemporalMapConfig): void {
    config.creatures.forEach(creature => {
      const x = creature.position.x;
      const y = creature.position.y;
      const t = config.defaultTimeline;

             if (zones[t] && zones[t][y] && zones[t][y][x]) {
         const zone = zones[t][y][x];
         if (zone.entities) {
           zone.entities.push({
             id: `creature_${creature.name}`,
             type: 'creature',
             name: creature.name,
             position: { x, y, t },
             level: creature.level,
             abilities: creature.abilities,
             description: creature.description
           });
         }
       }
    });
  }

  private placeObjects(zones: TemporalZone[][][], config: TemporalMapConfig): void {
    config.objects.forEach(object => {
      const x = object.position.x;
      const y = object.position.y;
      const t = config.defaultTimeline;

             if (zones[t] && zones[t][y] && zones[t][y][x]) {
         const zone = zones[t][y][x];
         if (zone.objects) {
           zone.objects.push({
             id: `object_${object.name}`,
             type: object.type,
             name: object.name,
             effect: object.effect,
             description: object.description
           });
         }
       }
    });
  }

  async generateTemporalRiftMap(): Promise<TemporalMap> {
    const config = await this.loadMapConfig('TemporalRift');
    return this.generateTemporalMap(config);
  }
}

// Instance singleton pour faciliter l'utilisation
export const temporalMapGenerator = new TemporalMapGenerator(); 