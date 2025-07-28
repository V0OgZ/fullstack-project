import { ApiService } from './api';
import { Hero } from '../types/game';

export interface ItemEffectResult {
  success: boolean;
  message: string;
  effectsApplied?: {
    attack?: number;
    defense?: number;
    knowledge?: number;
    spellPower?: number;
    movementPoints?: number;
    mana?: number;
    temporalMana?: number;
    experience?: number;
    gold?: number;
  };
}

export interface EquippedItems {
  weapon?: string;
  armor?: string;
  helmet?: string;
  boots?: string;
  ring?: string;
  amulet?: string;
  cape?: string;
}

export class MagicItemService {
  
  /**
   * Apply magical item effects to a hero's base stats (now using backend)
   */
  static async applyItemEffectsToHero(hero: Hero, equippedItems: EquippedItems): Promise<Hero> {
    try {
      const response = await ApiService.applyItemEffects(hero, equippedItems);
      return response;
    } catch (error) {
      console.error('Error applying item effects:', error);
      // Fallback to original hero if backend fails
      return hero;
    }
  }

  /**
   * Equip an item to a hero (with validation using backend)
   */
  static async equipItem(itemId: string, heroLevel: number): Promise<ItemEffectResult> {
    try {
      const response = await ApiService.validateEquipItem(itemId, heroLevel);
      return response;
    } catch (error) {
      console.error('Error validating item equip:', error);
      return {
        success: false,
        message: 'Failed to validate item equipping'
      };
    }
  }

  /**
   * Consume a consumable item (potions, scrolls, etc.) using backend
   */
  static async consumeItem(itemId: string, hero: Hero, playerGold: number): Promise<ItemEffectResult> {
    try {
      const response = await ApiService.consumeItem(itemId, hero, playerGold);
      return response;
    } catch (error) {
      console.error('Error consuming item:', error);
      return {
        success: false,
        message: 'Failed to consume item'
      };
    }
  }

  /**
   * Get total stat bonuses from equipped items using backend
   */
  static async getTotalItemBonuses(equippedItems: EquippedItems): Promise<{
    attack: number;
    defense: number;
    knowledge: number;
    spellPower: number;
    movementPoints: number;
    specialEffects: string[];
  }> {
    try {
      const response = await ApiService.getTotalItemBonuses(equippedItems);
      return response;
    } catch (error) {
      console.error('Error getting item bonuses:', error);
      return {
        attack: 0,
        defense: 0,
        knowledge: 0,
        spellPower: 0,
        movementPoints: 0,
        specialEffects: []
      };
    }
  }

  /**
   * Calculate temporal mana effects using backend
   */
  static async calculateTemporalEffects(equippedItems: EquippedItems): Promise<{
    temporalMana: number;
    temporalEffects: string[];
  }> {
    try {
      const response = await ApiService.calculateTemporalEffects(equippedItems);
      return response;
    } catch (error) {
      console.error('Error calculating temporal effects:', error);
      return {
        temporalMana: 0,
        temporalEffects: []
      };
    }
  }

  /**
   * Get all magic items from backend
   */
  static async getAllMagicItems(): Promise<any[]> {
    try {
      const response = await ApiService.getAllMagicItems();
      return response;
    } catch (error) {
      console.error('Error getting magic items:', error);
      return [];
    }
  }

  /**
   * Get magic item by ID from backend
   */
  static async getMagicItem(itemId: string): Promise<any> {
    try {
      const response = await ApiService.getMagicItem(itemId);
      return response;
    } catch (error) {
      console.error('Error getting magic item:', error);
      return null;
    }
  }
} 