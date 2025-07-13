// Unit Service - Now uses backend API with multilingual support
import { i18nService } from './i18nService';

export interface LocalizedUnit {
  id: string;
  name: string;
  description: string;
  castle: string;
  tier: number;
  variant: string;
  stats: {
    attack: number;
    defense: number;
    health: number;
    minDamage: number;
    maxDamage: number;
    speed: number;
    shots?: number;
  };
  costs: {
    gold?: number;
    wood?: number;
    stone?: number;
    ore?: number;
    crystal?: number;
    gems?: number;
    sulfur?: number;
  };
  growth: number;
  aiValue: number;
  abilities: string[];
}

export interface LocalizedCastleRoster {
  castle: string;
  castleName: string;
  castleDescription: string;
  units: {
    [tier: number]: LocalizedUnit[];
  };
}

class UnitService {
  private baseUrl = 'http://localhost:8080/api/units';
  
  // Get all units with localization
  async getAllUnitsLocalized(language?: string): Promise<LocalizedUnit[]> {
    const lang = language || i18nService.getCurrentLanguage();
    
    try {
      const response = await fetch(`${this.baseUrl}/localized/${lang}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch units: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch localized units:', error);
      return [];
    }
  }
  
  // Get unit by ID with localization
  async getUnitByIdLocalized(id: string, language?: string): Promise<LocalizedUnit | null> {
    const lang = language || i18nService.getCurrentLanguage();
    
    try {
      const response = await fetch(`${this.baseUrl}/${id}/localized/${lang}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to fetch unit ${id}: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch unit ${id}:`, error);
      return null;
    }
  }
  
  // Get units by castle with localization
  async getUnitsByCastleLocalized(castle: string, language?: string): Promise<LocalizedUnit[]> {
    const lang = language || i18nService.getCurrentLanguage();
    
    try {
      const response = await fetch(`${this.baseUrl}/castle/${castle}/localized/${lang}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch units for castle ${castle}: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch units for castle ${castle}:`, error);
      return [];
    }
  }
  
  // Get complete castle roster with localization
  async getCastleRosterLocalized(castle: string, language?: string): Promise<LocalizedCastleRoster | null> {
    const lang = language || i18nService.getCurrentLanguage();
    
    try {
      const response = await fetch(`${this.baseUrl}/castle/${castle}/roster/localized/${lang}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch castle roster for ${castle}: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch castle roster for ${castle}:`, error);
      return null;
    }
  }
  
  // Get all castle types
  async getAllCastleTypes(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/castles`);
      if (!response.ok) {
        throw new Error(`Failed to fetch castle types: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch castle types:', error);
      return ['castle', 'rampart', 'tower', 'inferno']; // Default fallback
    }
  }
  
  // Get unit statistics
  async getUnitStatistics(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/statistics`);
      if (!response.ok) {
        throw new Error(`Failed to fetch unit statistics: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch unit statistics:', error);
      return {};
    }
  }
  
  // Initialize default units (for development)
  async initializeDefaultUnits(): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('🏰 Default units initialized successfully');
    } catch (error) {
      console.error('Failed to initialize default units:', error);
    }
  }
  
  // Health check
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('Unit service health check failed:', error);
      return false;
    }
  }
  
  // === BACKWARD COMPATIBILITY METHODS (for existing code) ===
  
  // Convert LocalizedUnit to old UnitType format
  private convertToUnitType(localizedUnit: LocalizedUnit): any {
    return {
      id: localizedUnit.id,
      name: localizedUnit.name,
      castle: localizedUnit.castle,
      tier: localizedUnit.tier,
      variant: localizedUnit.variant,
      stats: {
        attack: localizedUnit.stats.attack,
        defense: localizedUnit.stats.defense,
        health: localizedUnit.stats.health,
        damage: [localizedUnit.stats.minDamage, localizedUnit.stats.maxDamage],
        speed: localizedUnit.stats.speed,
        shots: localizedUnit.stats.shots
      },
      abilities: localizedUnit.abilities.map(ability => ({
        id: ability,
        name: ability,
        description: 'Loaded from backend',
        type: 'passive' as any
      })),
      cost: localizedUnit.costs,
      growth: localizedUnit.growth,
      aiValue: localizedUnit.aiValue
    };
  }
  
  // Old getAllUnits method (for backward compatibility)
  async getAllUnits(): Promise<any[]> {
    const localizedUnits = await this.getAllUnitsLocalized();
    return localizedUnits.map(unit => this.convertToUnitType(unit));
  }
}

export const unitService = new UnitService();
export default unitService; 