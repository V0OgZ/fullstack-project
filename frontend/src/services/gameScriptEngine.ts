// 🎮 Game Script Engine - Langage de Script pour Heroes of Time
// Convertit les actions en langage naturel vers des appels API

import { ApiService } from './api';

// Types pour le langage de script
export interface ScriptAction {
  type: 'MOVE' | 'ATTACK' | 'COLLECT' | 'BUILD' | 'RECRUIT' | 'CAST' | 'END_TURN' | 'SELECT_HERO';
  params: Record<string, any>;
  description: string;
}

export interface ScriptContext {
  gameId: string;
  playerId: string;
  currentHero?: any;
  map?: any;
  resources?: any;
}

export interface ScriptResult {
  success: boolean;
  data?: any;
  error?: string;
  logs: string[];
}

export class GameScriptEngine {
  private context: ScriptContext;
  private logs: string[] = [];

  constructor(context: ScriptContext) {
    this.context = context;
  }

  // 🎯 Méthode principale pour exécuter une action
  async executeAction(action: ScriptAction): Promise<ScriptResult> {
    this.logs = [];
    this.log(`🎮 Executing: ${action.description}`);

    try {
      let result: any;

      switch (action.type) {
        case 'MOVE':
          result = await this.executeMove(action.params);
          break;
        case 'ATTACK':
          result = await this.executeAttack(action.params);
          break;
        case 'COLLECT':
          result = await this.executeCollect(action.params);
          break;
        case 'BUILD':
          result = await this.executeBuild(action.params);
          break;
        case 'RECRUIT':
          result = await this.executeRecruit(action.params);
          break;
        case 'CAST':
          result = await this.executeCast(action.params);
          break;
        case 'END_TURN':
          result = await this.executeEndTurn(action.params);
          break;
        case 'SELECT_HERO':
          result = await this.executeSelectHero(action.params);
          break;
        default:
          throw new Error(`Action type not supported: ${action.type}`);
      }

      this.log(`✅ Action completed successfully`);
      return {
        success: true,
        data: result,
        logs: this.logs
      };

         } catch (error) {
       this.log(`❌ Action failed: ${error instanceof Error ? error.message : String(error)}`);
       return {
         success: false,
         error: error instanceof Error ? error.message : String(error),
         logs: this.logs
       };
     }
  }

  // 🏃 Déplacer un héros
  private async executeMove(params: any): Promise<any> {
    const { heroId, position, targetX, targetY } = params;
    
    const targetPosition = position || { x: targetX, y: targetY };
    
    if (!targetPosition) {
      throw new Error('Target position is required for MOVE action');
    }

    this.log(`🏃 Moving hero ${heroId} to position (${targetPosition.x}, ${targetPosition.y})`);
    
    return await ApiService.moveHero(this.context.gameId, heroId, targetPosition);
  }

  // ⚔️ Attaquer une cible
  private async executeAttack(params: any): Promise<any> {
    const { heroId, targetId } = params;
    
    if (!heroId || !targetId) {
      throw new Error('Hero ID and target ID are required for ATTACK action');
    }

    this.log(`⚔️ Hero ${heroId} attacking target ${targetId}`);
    
    return await ApiService.attackTarget(heroId, targetId);
  }

  // 📦 Collecter une ressource
  private async executeCollect(params: any): Promise<any> {
    const { heroId, objectId } = params;
    
    if (!heroId || !objectId) {
      throw new Error('Hero ID and object ID are required for COLLECT action');
    }

    this.log(`📦 Hero ${heroId} collecting object ${objectId}`);
    
    return await ApiService.collectResource(heroId, objectId);
  }

  // 🏗️ Construire un bâtiment
  private async executeBuild(params: any): Promise<any> {
    const { buildingType, position } = params;
    
    if (!buildingType) {
      throw new Error('Building type is required for BUILD action');
    }

    this.log(`🏗️ Building ${buildingType} at position ${JSON.stringify(position)}`);
    
         // Utiliser l'API de construction (à adapter selon l'API backend)
     // Pour l'instant, on utilise une API générique
     return await ApiService.makeGenericRequest(`/games/${this.context.gameId}/build`, {
       method: 'POST',
       body: JSON.stringify({ buildingType, position })
     });
  }

  // 👥 Recruter des unités
  private async executeRecruit(params: any): Promise<any> {
    const { unitType, quantity, buildingId } = params;
    
    if (!unitType || !quantity) {
      throw new Error('Unit type and quantity are required for RECRUIT action');
    }

    this.log(`👥 Recruiting ${quantity} ${unitType} units`);
    
         return await ApiService.makeGenericRequest(`/games/${this.context.gameId}/recruit`, {
       method: 'POST',
       body: JSON.stringify({ 
         playerId: this.context.playerId,
         unitType,
         quantity,
         buildingId 
       })
     });
  }

  // 🔮 Lancer un sort
  private async executeCast(params: any): Promise<any> {
    const { spellId, targetId, position } = params;
    
    if (!spellId) {
      throw new Error('Spell ID is required for CAST action');
    }

    this.log(`🔮 Casting spell ${spellId} on target ${targetId || 'position'}`);
    
         return await ApiService.makeGenericRequest(`/games/${this.context.gameId}/cast-spell`, {
       method: 'POST',
       body: JSON.stringify({ 
         playerId: this.context.playerId,
         spellId,
         targetId,
         position 
       })
     });
  }

  // ⏰ Terminer le tour
  private async executeEndTurn(params: any): Promise<any> {
    this.log(`⏰ Ending turn for player ${this.context.playerId}`);
    
    return await ApiService.endTurn(this.context.gameId, this.context.playerId);
  }

  // 🎯 Sélectionner un héros
  private async executeSelectHero(params: any): Promise<any> {
    const { heroId } = params;
    
    if (!heroId) {
      throw new Error('Hero ID is required for SELECT_HERO action');
    }

    this.log(`🎯 Selecting hero ${heroId}`);
    
    // Mise à jour du contexte
    this.context.currentHero = heroId;
    
         return await ApiService.makeGenericRequest(`/games/${this.context.gameId}/select-hero`, {
       method: 'POST',
       body: JSON.stringify({ heroId })
     });
  }

  // 📝 Logger interne
  private log(message: string): void {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const logMessage = `[${timestamp}] ${message}`;
    this.logs.push(logMessage);
    console.log(`🎮 [GameScript] ${logMessage}`);
  }

  // 🔄 Mettre à jour le contexte
  updateContext(updates: Partial<ScriptContext>): void {
    this.context = { ...this.context, ...updates };
    this.log(`🔄 Context updated: ${JSON.stringify(updates)}`);
  }

  // 📊 Obtenir le contexte actuel
  getContext(): ScriptContext {
    return { ...this.context };
  }
}

// 🎯 Factory pour créer des actions de script
export class ScriptActionFactory {
  
  // Créer une action de déplacement
  static move(heroId: string, x: number, y: number): ScriptAction {
    return {
      type: 'MOVE',
      params: { heroId, targetX: x, targetY: y },
      description: `Move hero ${heroId} to (${x}, ${y})`
    };
  }

  // Créer une action d'attaque
  static attack(heroId: string, targetId: string): ScriptAction {
    return {
      type: 'ATTACK',
      params: { heroId, targetId },
      description: `Hero ${heroId} attacks ${targetId}`
    };
  }

  // Créer une action de collecte
  static collect(heroId: string, objectId: string): ScriptAction {
    return {
      type: 'COLLECT',
      params: { heroId, objectId },
      description: `Hero ${heroId} collects ${objectId}`
    };
  }

  // Créer une action de construction
  static build(buildingType: string, position?: { x: number; y: number }): ScriptAction {
    return {
      type: 'BUILD',
      params: { buildingType, position },
      description: `Build ${buildingType}${position ? ` at (${position.x}, ${position.y})` : ''}`
    };
  }

  // Créer une action de recrutement
  static recruit(unitType: string, quantity: number, buildingId?: string): ScriptAction {
    return {
      type: 'RECRUIT',
      params: { unitType, quantity, buildingId },
      description: `Recruit ${quantity} ${unitType}`
    };
  }

  // Créer une action de sort
  static cast(spellId: string, targetId?: string, position?: { x: number; y: number }): ScriptAction {
    return {
      type: 'CAST',
      params: { spellId, targetId, position },
      description: `Cast spell ${spellId}`
    };
  }

  // Créer une action de fin de tour
  static endTurn(): ScriptAction {
    return {
      type: 'END_TURN',
      params: {},
      description: 'End current turn'
    };
  }

  // Créer une action de sélection de héros
  static selectHero(heroId: string): ScriptAction {
    return {
      type: 'SELECT_HERO',
      params: { heroId },
      description: `Select hero ${heroId}`
    };
  }
}

// 📜 Parser pour convertir du texte en actions
export class ScriptParser {
  
  // Parser simple pour convertir du texte en actions
  static parseText(text: string): ScriptAction[] {
    const actions: ScriptAction[] = [];
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);

    for (const line of lines) {
      try {
        const action = this.parseLine(line);
        if (action) {
          actions.push(action);
        }
             } catch (error) {
         console.warn(`Failed to parse line: "${line}" - ${error instanceof Error ? error.message : String(error)}`);
       }
    }

    return actions;
  }

  // Parser une ligne individuelle
  private static parseLine(line: string): ScriptAction | null {
    const words = line.toLowerCase().split(/\s+/);
    const firstWord = words[0];

    switch (firstWord) {
      case 'move':
        return this.parseMove(words, line);
      case 'attack':
        return this.parseAttack(words, line);
      case 'collect':
        return this.parseCollect(words, line);
      case 'build':
        return this.parseBuild(words, line);
      case 'recruit':
        return this.parseRecruit(words, line);
      case 'cast':
        return this.parseCast(words, line);
      case 'end':
        return ScriptActionFactory.endTurn();
      case 'select':
        return this.parseSelect(words, line);
      default:
        return null;
    }
  }

  // Parsers spécifiques
  private static parseMove(words: string[], line: string): ScriptAction {
    // Format: "move hero1 to 5 7" ou "move hero1 5 7"
    const heroId = words[1];
    const xIndex = words.includes('to') ? words.indexOf('to') + 1 : 2;
    const x = parseInt(words[xIndex]);
    const y = parseInt(words[xIndex + 1]);
    
    return ScriptActionFactory.move(heroId, x, y);
  }

  private static parseAttack(words: string[], line: string): ScriptAction {
    // Format: "attack hero1 enemy2"
    const heroId = words[1];
    const targetId = words[2];
    
    return ScriptActionFactory.attack(heroId, targetId);
  }

  private static parseCollect(words: string[], line: string): ScriptAction {
    // Format: "collect hero1 gold_mine"
    const heroId = words[1];
    const objectId = words[2];
    
    return ScriptActionFactory.collect(heroId, objectId);
  }

  private static parseBuild(words: string[], line: string): ScriptAction {
    // Format: "build castle" ou "build castle at 3 4"
    const buildingType = words[1];
    const atIndex = words.indexOf('at');
    let position;
    
    if (atIndex !== -1) {
      position = {
        x: parseInt(words[atIndex + 1]),
        y: parseInt(words[atIndex + 2])
      };
    }
    
    return ScriptActionFactory.build(buildingType, position);
  }

  private static parseRecruit(words: string[], line: string): ScriptAction {
    // Format: "recruit 5 archers" ou "recruit 5 archers from barracks1"
    const quantity = parseInt(words[1]);
    const unitType = words[2];
    const fromIndex = words.indexOf('from');
    const buildingId = fromIndex !== -1 ? words[fromIndex + 1] : undefined;
    
    return ScriptActionFactory.recruit(unitType, quantity, buildingId);
  }

  private static parseCast(words: string[], line: string): ScriptAction {
    // Format: "cast fireball on enemy1" ou "cast heal on hero1"
    const spellId = words[1];
    const onIndex = words.indexOf('on');
    const targetId = onIndex !== -1 ? words[onIndex + 1] : undefined;
    
    return ScriptActionFactory.cast(spellId, targetId);
  }

  private static parseSelect(words: string[], line: string): ScriptAction {
    // Format: "select hero1"
    const heroId = words[1];
    
    return ScriptActionFactory.selectHero(heroId);
  }
} 