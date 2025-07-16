import { GameScriptEngine, GameScript } from './gameScriptEngine';
import { ApiService } from './api';

export class GameActionService {
  private scriptEngine: GameScriptEngine;

  constructor() {
    this.scriptEngine = new GameScriptEngine();
  }

  /**
   * Actions simples - utilisation directe des API pour la performance
   */
  async quickAction(action: 'move' | 'attack' | 'recruit', params: any) {
    switch (action) {
      case 'move':
        return ApiService.moveHero(params.gameId, params.heroId, { x: params.x, y: params.y });
      case 'attack':
        return ApiService.attackTarget(params.attackerId, params.targetId);
      case 'recruit':
        return ApiService.recruitUnits(params.buildingId, params.data);
      default:
        throw new Error(`Unknown quick action: ${action}`);
    }
  }

  /**
   * Actions complexes - utilisation des scripts pour la validation et la logique
   */
  async complexAction(scriptContent: GameScript, context: any) {
    return this.scriptEngine.executeScript(scriptContent, context);
  }

  /**
   * Actions avec validation - combine les deux approches
   */
  async validatedAction(action: string, params: any, validationScript?: GameScript, context?: any) {
    // Exécute l'action directement
    const result = await this.quickAction(action as any, params);
    
    // Valide avec un script si fourni
    if (validationScript && context) {
      const validationResult = await this.scriptEngine.executeScript(validationScript, context);
      if (!validationResult[0]?.success) {
        throw new Error(`Validation failed: ${validationResult[0]?.message}`);
      }
    }
    
    return result;
  }

  /**
   * Séquences d'actions - utilisation des scripts pour la cohérence
   */
  async executeSequence(script: GameScript, context: any) {
    return this.scriptEngine.executeScript(script, context);
  }

  /**
   * Actions avec rollback - utilisation des scripts pour la sécurité
   */
  async safeAction(script: GameScript, context: any) {
    // Pour une vraie implémentation, il faudrait ajouter save_state/restore_state au script engine
    return this.scriptEngine.executeScript(script, context);
  }
}

// Exemple d'utilisation hybride
export const gameActionService = new GameActionService();

// Usage simple et rapide
export const quickMove = (gameId: string, heroId: string, x: number, y: number) => 
  gameActionService.quickAction('move', { gameId, heroId, x, y });

// Usage complexe avec validation
export const strategicMove = (gameId: string, heroId: string, x: number, y: number) => 
  gameActionService.complexAction({
    name: 'strategic_move',
    actions: [
      { type: 'move', params: { heroId, x, y } },
      { type: 'assert', params: { condition: 'hero_at', heroId, x, y } },
      { type: 'log', params: { message: `Hero ${heroId} moved to strategic position` } }
    ]
  }, { gameId, playerId: 'player1', heroId, variables: {} });

// Usage avec validation personnalisée
export const validatedMove = (gameId: string, heroId: string, x: number, y: number) => 
  gameActionService.validatedAction('move', { gameId, heroId, x, y }, {
    name: 'validation',
    actions: [
      { type: 'assert', params: { condition: 'hero_at', heroId, x, y } },
      { type: 'assert', params: { condition: 'tile_accessible', x, y } }
    ]
  }, { gameId, playerId: 'player1', heroId, variables: {} });

// Séquence d'actions complexe
export const executeMultipleActions = (gameId: string, actions: any[]) => 
  gameActionService.executeSequence({
    name: 'multiple_actions',
    actions: [
      ...actions,
      { type: 'assert', params: { condition: 'all_actions_successful' } }
    ]
  }, { gameId, playerId: 'player1', variables: {} }); 

/**
 * 📋 EXEMPLE D'UTILISATION DANS TrueHeroesInterface.tsx
 * 
 * // Import du service
 * import { gameActionService, quickMove, strategicMove } from '../services/gameActionService';
 * 
 * // Dans le composant
 * const handleHeroMove = async (heroId: string, x: number, y: number) => {
 *   try {
 *     // Option 1: Action rapide et simple
 *     await quickMove(gameId, heroId, x, y);
 *     
 *     // Option 2: Action complexe avec validation
 *     await strategicMove(gameId, heroId, x, y);
 *     
 *     // Option 3: Séquence d'actions personnalisée
 *     await gameActionService.executeSequence({
 *       name: 'hero_turn',
 *       actions: [
 *         { type: 'move', params: { heroId, x, y } },
 *         { type: 'collect', params: { resourceType: 'gold' } },
 *         { type: 'assert', params: { condition: 'hero_has_movement_points', heroId } },
 *         { type: 'log', params: { message: 'Turn completed successfully' } }
 *       ]
 *     }, { gameId, playerId: currentPlayer.id, heroId, variables: {} });
 *     
 *   } catch (error) {
 *     console.error('Action failed:', error);
 *   }
 * };
 */ 