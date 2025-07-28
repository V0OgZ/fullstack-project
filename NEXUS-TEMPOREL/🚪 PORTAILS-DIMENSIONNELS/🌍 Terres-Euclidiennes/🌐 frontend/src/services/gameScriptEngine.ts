/**
 * 🎮 HEROES OF TIME - Game Script Engine
 * 
 * Langage de script custom pour décrire les actions de jeu
 * Utilisé pour les tests, l'IA et la simulation de parties
 */

import { ApiService } from './api';

// Types pour le langage de script
export interface GameScript {
  name: string;
  description?: string;
  variables?: Record<string, any>;
  actions: ScriptAction[];
}

export interface ScriptAction {
  type: 'move' | 'attack' | 'build' | 'recruit' | 'end_turn' | 'collect' | 'cast_spell' | 'if' | 'loop' | 'assert' | 'wait' | 'log';
  params?: Record<string, any>;
  condition?: ScriptCondition;
  actions?: ScriptAction[]; // Pour les blocs if/loop
  else?: ScriptAction[];   // Pour les blocs if
}

export interface ScriptCondition {
  type: 'equals' | 'greater' | 'less' | 'has' | 'contains' | 'and' | 'or' | 'not';
  left?: any;
  right?: any;
  conditions?: ScriptCondition[];
}

export interface ScriptContext {
  gameId: string;
  playerId: string;
  heroId?: string;
  variables: Record<string, any>;
  gameState: any;
}

export interface ExecutionResult {
  success: boolean;
  message: string;
  data?: any;
  context: ScriptContext;
}

// Moteur d'exécution des scripts
export class GameScriptEngine {
  private apiService: typeof ApiService;
  
  constructor(apiService: typeof ApiService = ApiService) {
    this.apiService = apiService;
  }

  // Exécute un script complet
  async executeScript(script: GameScript, initialContext: Partial<ScriptContext>): Promise<ExecutionResult[]> {
    const context: ScriptContext = {
      gameId: initialContext.gameId || '',
      playerId: initialContext.playerId || '',
      heroId: initialContext.heroId,
      variables: { ...script.variables, ...initialContext.variables },
      gameState: initialContext.gameState || {}
    };

    const results: ExecutionResult[] = [];
    
    for (const action of script.actions) {
      const result = await this.executeAction(action, context);
      results.push(result);
      
      if (!result.success) {
        break; // Arrêter en cas d'erreur
      }
    }
    
    return results;
  }

  // Exécute une action individuelle
  private async executeAction(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    try {
      // Vérifier la condition si présente
      if (action.condition && !this.evaluateCondition(action.condition, context)) {
        return {
          success: true,
          message: `Condition not met, skipping ${action.type}`,
          context
        };
      }

      // Exécuter l'action selon son type
      switch (action.type) {
        case 'move':
          return await this.executeMove(action, context);
        case 'attack':
          return await this.executeAttack(action, context);
        case 'build':
          return await this.executeBuild(action, context);
        case 'recruit':
          return await this.executeRecruit(action, context);
        case 'end_turn':
          return await this.executeEndTurn(action, context);
        case 'collect':
          return await this.executeCollect(action, context);
        case 'cast_spell':
          return await this.executeCastSpell(action, context);
        case 'if':
          return await this.executeIf(action, context);
        case 'loop':
          return await this.executeLoop(action, context);
        case 'assert':
          return await this.executeAssert(action, context);
        case 'wait':
          return await this.executeWait(action, context);
        case 'log':
          return await this.executeLog(action, context);
        default:
          throw new Error(`Unknown action type: ${action.type}`);
      }
    } catch (error) {
      return {
        success: false,
        message: `Error executing ${action.type}: ${error instanceof Error ? error.message : String(error)}`,
        context
      };
    }
  }

  // Actions de base du jeu
  
  private async executeMove(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    const { heroId, targetPosition, relative } = action.params || {};
    
    // Résoudre l'ID du héros
    const resolvedHeroId = this.resolveValue(heroId || context.heroId, context);
    if (!resolvedHeroId) {
      throw new Error('Hero ID not specified');
    }
    
    // Résoudre la position cible
    let resolvedPosition;
    if (relative) {
      const currentPosition = await this.getHeroPosition(resolvedHeroId, context);
      resolvedPosition = {
        x: currentPosition.x + (targetPosition.x || 0),
        y: currentPosition.y + (targetPosition.y || 0)
      };
    } else {
      resolvedPosition = this.resolveValue(targetPosition, context);
    }
    
    // Exécuter le mouvement
    const result = await this.apiService.moveHero(context.gameId, resolvedHeroId, resolvedPosition);
    
    // Mettre à jour le contexte
    context.gameState = await this.apiService.getGame(context.gameId);
    
    return {
      success: true,
      message: `Hero ${resolvedHeroId} moved to (${resolvedPosition.x}, ${resolvedPosition.y})`,
      data: result,
      context
    };
  }

  private async executeAttack(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    const { heroId, targetId } = action.params || {};
    
    const resolvedHeroId = this.resolveValue(heroId || context.heroId, context);
    const resolvedTargetId = this.resolveValue(targetId, context);
    
    if (!resolvedHeroId || !resolvedTargetId) {
      throw new Error('Hero ID or target ID not specified');
    }
    
    const result = await this.apiService.attackTarget(resolvedHeroId, resolvedTargetId);
    
    context.gameState = await this.apiService.getGame(context.gameId);
    
    return {
      success: true,
      message: `Hero ${resolvedHeroId} attacked ${resolvedTargetId}`,
      data: result,
      context
    };
  }

  private async executeBuild(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    const { buildingType, position } = action.params || {};
    
    const resolvedBuildingType = this.resolveValue(buildingType, context);
    const resolvedPosition = this.resolveValue(position, context);
    
    const buildData = {
      gameId: context.gameId,
      playerId: context.playerId,
      buildingType: resolvedBuildingType,
      position: resolvedPosition
    };
    
    const result = await this.apiService.startConstructionWithResources(buildData);
    
    context.gameState = await this.apiService.getGame(context.gameId);
    
    return {
      success: true,
      message: `Built ${resolvedBuildingType} at (${resolvedPosition.x}, ${resolvedPosition.y})`,
      data: result,
      context
    };
  }

  private async executeRecruit(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    const { buildingId, unitType, quantity } = action.params || {};
    
    const resolvedBuildingId = this.resolveValue(buildingId, context);
    const resolvedUnitType = this.resolveValue(unitType, context);
    const resolvedQuantity = this.resolveValue(quantity, context);
    
    const recruitData = {
      unitType: resolvedUnitType,
      quantity: resolvedQuantity
    };
    
    const result = await this.apiService.recruitUnitsFromGame(context.gameId, resolvedBuildingId, recruitData);
    
    context.gameState = await this.apiService.getGame(context.gameId);
    
    return {
      success: true,
      message: `Recruited ${resolvedQuantity} ${resolvedUnitType} from building ${resolvedBuildingId}`,
      data: result,
      context
    };
  }

  private async executeEndTurn(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    const result = await this.apiService.endTurn(context.gameId, context.playerId);
    
    context.gameState = await this.apiService.getGame(context.gameId);
    
    return {
      success: true,
      message: `Turn ended for player ${context.playerId}`,
      data: result,
      context
    };
  }

  private async executeCollect(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    const { heroId, objectId } = action.params || {};
    
    const resolvedHeroId = this.resolveValue(heroId || context.heroId, context);
    const resolvedObjectId = this.resolveValue(objectId, context);
    
    const result = await this.apiService.collectResource(resolvedHeroId, resolvedObjectId);
    
    context.gameState = await this.apiService.getGame(context.gameId);
    
    return {
      success: true,
      message: `Hero ${resolvedHeroId} collected object ${resolvedObjectId}`,
      data: result,
      context
    };
  }

  private async executeCastSpell(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    const { heroId, spellId, targetPosition } = action.params || {};
    
    const resolvedHeroId = this.resolveValue(heroId || context.heroId, context);
    const resolvedSpellId = this.resolveValue(spellId, context);
    const resolvedTargetPosition = this.resolveValue(targetPosition, context);
    
    // TODO: Implémenter l'API pour lancer des sorts
    
    return {
      success: true,
      message: `Hero ${resolvedHeroId} cast spell ${resolvedSpellId}`,
      data: null,
      context
    };
  }

  // Actions de contrôle de flux
  
  private async executeIf(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    const conditionResult = this.evaluateCondition(action.condition!, context);
    
    const actionsToExecute = conditionResult ? action.actions : action.else;
    
    if (actionsToExecute) {
      for (const subAction of actionsToExecute) {
        const result = await this.executeAction(subAction, context);
        if (!result.success) {
          return result;
        }
      }
    }
    
    return {
      success: true,
      message: `If condition ${conditionResult ? 'met' : 'not met'}`,
      context
    };
  }

  private async executeLoop(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    const { times, while: whileCondition } = action.params || {};
    
    let iterations = 0;
    const maxIterations = times || 100; // Limite de sécurité
    
    while (iterations < maxIterations) {
      // Vérifier la condition de boucle
      if (whileCondition && !this.evaluateCondition(whileCondition, context)) {
        break;
      }
      
      // Exécuter les actions de la boucle
      if (action.actions) {
        for (const subAction of action.actions) {
          const result = await this.executeAction(subAction, context);
          if (!result.success) {
            return result;
          }
        }
      }
      
      iterations++;
      
      // Si pas de condition while, faire exactement 'times' itérations
      if (!whileCondition && times) {
        if (iterations >= times) break;
      }
    }
    
    return {
      success: true,
      message: `Loop executed ${iterations} times`,
      context
    };
  }

  private async executeAssert(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    const { condition, message } = action.params || {};
    
    const conditionResult = this.evaluateCondition(condition, context);
    
    if (!conditionResult) {
      throw new Error(message || 'Assertion failed');
    }
    
    return {
      success: true,
      message: `Assertion passed: ${message || 'condition met'}`,
      context
    };
  }

  private async executeWait(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    const { duration } = action.params || {};
    const resolvedDuration = this.resolveValue(duration, context) || 1000;
    
    await new Promise(resolve => setTimeout(resolve, resolvedDuration));
    
    return {
      success: true,
      message: `Waited ${resolvedDuration}ms`,
      context
    };
  }

  private async executeLog(action: ScriptAction, context: ScriptContext): Promise<ExecutionResult> {
    const { message, data } = action.params || {};
    
    const resolvedMessage = this.resolveValue(message, context);
    const resolvedData = this.resolveValue(data, context);
    
    console.log(`[GameScript] ${resolvedMessage}`, resolvedData);
    
    return {
      success: true,
      message: `Logged: ${resolvedMessage}`,
      context
    };
  }

  // Utilitaires
  
  private evaluateCondition(condition: ScriptCondition, context: ScriptContext): boolean {
    const { type, left, right, conditions } = condition;
    
    switch (type) {
      case 'equals':
        return this.resolveValue(left, context) === this.resolveValue(right, context);
      case 'greater':
        return this.resolveValue(left, context) > this.resolveValue(right, context);
      case 'less':
        return this.resolveValue(left, context) < this.resolveValue(right, context);
      case 'has':
        return this.resolveValue(left, context) !== undefined;
      case 'contains':
        const leftArray = this.resolveValue(left, context);
        const rightValue = this.resolveValue(right, context);
        return Array.isArray(leftArray) && leftArray.includes(rightValue);
      case 'and':
        return conditions!.every(cond => this.evaluateCondition(cond, context));
      case 'or':
        return conditions!.some(cond => this.evaluateCondition(cond, context));
      case 'not':
        return !this.evaluateCondition(conditions![0], context);
      default:
        return false;
    }
  }

  private resolveValue(value: any, context: ScriptContext): any {
    if (typeof value === 'string' && value.startsWith('$')) {
      // Variable reference
      const varName = value.substring(1);
      return context.variables[varName];
    }
    
    if (typeof value === 'string' && value.startsWith('@')) {
      // Game state reference
      const path = value.substring(1);
      return this.getNestedValue(context.gameState, path);
    }
    
    return value;
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  private async getHeroPosition(heroId: string, context: ScriptContext): Promise<{x: number, y: number}> {
    // Trouver le héros dans l'état du jeu
    for (const player of context.gameState.players || []) {
      const hero = player.heroes?.find((h: any) => h.id === heroId);
      if (hero) {
        return hero.position;
      }
    }
    throw new Error(`Hero ${heroId} not found`);
  }
}

// Exemples de scripts
export const EXAMPLE_SCRIPTS = {
  // Script simple : mouvement et attaque
  basicCombat: {
    name: 'Basic Combat',
    description: 'Move hero and attack enemy',
    variables: {
      heroId: 'hero1',
      enemyId: 'enemy1'
    },
    actions: [
      {
        type: 'move',
        params: {
          heroId: '$heroId',
          targetPosition: { x: 10, y: 10 }
        }
      },
      {
        type: 'attack',
        params: {
          heroId: '$heroId',
          targetId: '$enemyId'
        }
      }
    ]
  } as GameScript,

  // Script avec conditions
  conditionalActions: {
    name: 'Conditional Actions',
    description: 'Attack if enemy is close, otherwise move closer',
    variables: {
      heroId: 'hero1'
    },
    actions: [
      {
        type: 'if',
        condition: {
          type: 'less',
          left: '@players.0.heroes.0.position.x',
          right: 5
        },
        actions: [
          {
            type: 'attack',
            params: {
              heroId: '$heroId',
              targetId: 'enemy1'
            }
          }
        ],
        else: [
          {
            type: 'move',
            params: {
              heroId: '$heroId',
              targetPosition: { x: 4, y: 4 }
            }
          }
        ]
      }
    ]
  } as GameScript,

  // Script de jeu complet
  fullGameTurn: {
    name: 'Full Game Turn',
    description: 'Complete turn with building, recruiting, and combat',
    variables: {
      playerId: 'player1',
      heroId: 'hero1'
    },
    actions: [
      {
        type: 'log',
        params: {
          message: 'Starting turn for player $playerId'
        }
      },
      {
        type: 'build',
        params: {
          buildingType: 'barracks',
          position: { x: 5, y: 5 }
        }
      },
      {
        type: 'recruit',
        params: {
          buildingId: '@buildings.0.id',
          unitType: 'warrior',
          quantity: 2
        }
      },
      {
        type: 'move',
        params: {
          heroId: '$heroId',
          targetPosition: { x: 8, y: 8 }
        }
      },
      {
        type: 'end_turn'
      }
    ]
  } as GameScript
}; 