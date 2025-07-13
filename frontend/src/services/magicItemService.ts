import { MagicObject, getObjectById } from '../data/magicObjects';
import { Hero } from '../types/game';

export interface EquippedItems {
  weapon?: string;
  armor?: string;
  helmet?: string;
  boots?: string;
  ring?: string;
  amulet?: string;
  cape?: string;
}

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

export class MagicItemService {
  
  /**
   * Apply magical item effects to a hero's base stats
   */
  static applyItemEffectsToHero(hero: Hero, equippedItems: EquippedItems): Hero {
    const enhancedHero = { ...hero };
    let totalEffects = {
      attack: 0,
      defense: 0,
      knowledge: 0,
      spellPower: 0,
      movementPoints: 0,
      mana: 0,
      temporalMana: 0,
      experience: 0
    };

    // Apply effects from each equipped item
    Object.values(equippedItems).forEach(itemId => {
      if (itemId) {
        const item = getObjectById(itemId);
        if (item && item.effects) {
          totalEffects.attack += item.effects.attack || 0;
          totalEffects.defense += item.effects.defense || 0;
          totalEffects.knowledge += item.effects.knowledge || 0;
          totalEffects.spellPower += item.effects.spellPower || 0;
          totalEffects.movementPoints += item.effects.movementPoints || 0;
          totalEffects.mana += item.effects.mana || 0;
          totalEffects.temporalMana += item.effects.temporalMana || 0;
          totalEffects.experience += item.effects.experience || 0;
        }
      }
    });

    // Apply the cumulative effects to hero stats
    enhancedHero.stats = {
      attack: (hero.stats?.attack || 0) + totalEffects.attack,
      defense: (hero.stats?.defense || 0) + totalEffects.defense,
      knowledge: (hero.stats?.knowledge || 0) + totalEffects.knowledge,
      spellPower: (hero.stats?.spellPower || 0) + totalEffects.spellPower
    };

    // Apply movement points bonus
    enhancedHero.maxMovementPoints = (hero.maxMovementPoints || 1000) + (totalEffects.movementPoints * 100);
    enhancedHero.movementPoints = Math.min(
      enhancedHero.movementPoints || 0, 
      enhancedHero.maxMovementPoints
    );

    // Apply experience bonus
    enhancedHero.experience = (hero.experience || 0) + totalEffects.experience;

    return enhancedHero;
  }

  /**
   * Equip an item to a hero (with validation)
   */
  static equipItem(itemId: string, heroLevel: number): ItemEffectResult {
    const item = getObjectById(itemId);
    
    if (!item) {
      return {
        success: false,
        message: `Item ${itemId} not found`
      };
    }

    // Check level requirement
    if (item.requiresLevel && heroLevel < item.requiresLevel) {
      return {
        success: false,
        message: `Requires level ${item.requiresLevel} (current: ${heroLevel})`
      };
    }

    return {
      success: true,
      message: `${item.name} equipped successfully!`,
      effectsApplied: item.effects
    };
  }

  /**
   * Consume a consumable item (potions, scrolls, etc.)
   */
  static consumeItem(itemId: string, hero: Hero, playerGold: number): ItemEffectResult {
    const item = getObjectById(itemId);
    
    if (!item) {
      return {
        success: false,
        message: `Item ${itemId} not found`
      };
    }

    if (item.type !== 'consumable') {
      return {
        success: false,
        message: `${item.name} is not a consumable item`
      };
    }

    // Check if player can afford it (if it's a purchasable consumable)
    if (item.value > playerGold) {
      return {
        success: false,
        message: `Not enough gold (need ${item.value}, have ${playerGold})`
      };
    }

    let message = `Used ${item.name}`;
    const effectsApplied: any = {};

    // Apply consumable effects
    if (item.effects.mana) {
      effectsApplied.mana = item.effects.mana;
      message += ` (+${item.effects.mana} mana)`;
    }

    if (item.effects.experience) {
      effectsApplied.experience = item.effects.experience;
      message += ` (+${item.effects.experience} XP)`;
    }

    if (item.effects.specialEffect) {
      message += ` - ${item.effects.specialEffect}`;
    }

    return {
      success: true,
      message,
      effectsApplied
    };
  }

  /**
   * Get total stat bonuses from equipped items
   */
  static getTotalItemBonuses(equippedItems: EquippedItems): {
    attack: number;
    defense: number;
    knowledge: number;
    spellPower: number;
    movementPoints: number;
    specialEffects: string[];
  } {
    let totalBonuses = {
      attack: 0,
      defense: 0,
      knowledge: 0,
      spellPower: 0,
      movementPoints: 0,
      specialEffects: [] as string[]
    };

    Object.values(equippedItems).forEach(itemId => {
      if (itemId) {
        const item = getObjectById(itemId);
        if (item && item.effects) {
          totalBonuses.attack += item.effects.attack || 0;
          totalBonuses.defense += item.effects.defense || 0;
          totalBonuses.knowledge += item.effects.knowledge || 0;
          totalBonuses.spellPower += item.effects.spellPower || 0;
          totalBonuses.movementPoints += item.effects.movementPoints || 0;
          
          if (item.effects.specialEffect) {
            totalBonuses.specialEffects.push(`${item.name}: ${item.effects.specialEffect}`);
          }
        }
      }
    });

    return totalBonuses;
  }

  /**
   * Check if an item can be equipped in a specific slot
   */
  static canEquipInSlot(itemId: string, slot: string): boolean {
    const item = getObjectById(itemId);
    return item?.slot === slot || false;
  }

  /**
   * Get all temporal objects (for mystical scenario)
   */
  static getTemporalObjects(): MagicObject[] {
    const { getTemporalObjects } = require('../data/magicObjects');
    return getTemporalObjects();
  }

  /**
   * Calculate temporal mana effects
   */
  static calculateTemporalEffects(equippedItems: EquippedItems): {
    temporalMana: number;
    temporalEffects: string[];
  } {
    let temporalMana = 0;
    let temporalEffects: string[] = [];

    Object.values(equippedItems).forEach(itemId => {
      if (itemId) {
        const item = getObjectById(itemId);
        if (item && item.temporal && item.effects) {
          temporalMana += item.effects.temporalMana || 0;
          
          if (item.effects.specialEffect) {
            temporalEffects.push(`${item.name}: ${item.effects.specialEffect}`);
          }
        }
      }
    });

    return { temporalMana, temporalEffects };
  }
} 