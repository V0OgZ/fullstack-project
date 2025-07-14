import { useTranslation } from '../i18n';

// Use existing translated resources from i18n
export interface GameResources {
  heroes: string[];
  creatures: string[];
  terrains: string[];
  artifacts: string[];
  buildings: string[];
}

export const EXISTING_GAME_RESOURCES: GameResources = {
  // Heroes déjà traduits dans i18n
  heroes: [
    'warrior', 'mage', 'archer', 'paladin'
  ],
  
  // Créatures déjà traduites dans i18n  
  creatures: [
    'redDragon', 'phoenix', 'unicorn', 'griffin'
  ],
  
  // Terrains déjà traduits dans i18n
  terrains: [
    'grass', 'forest', 'mountain', 'water', 'desert', 'swamp'
  ],
  
  // Artefacts des objets magiques déjà traduits
  artifacts: [
    'items.crown_kings.name', 'items.orb_knowledge.name', 'items.staff_archmage.name',
    'items.ring_power.name', 'items.amulet_wisdom.name', 'items.temporal_anchor.name',
    'items.temporal_prism.name', 'items.temporal_hourglass.name', 'items.temporal_compass.name'
  ],
  
  // Bâtiments des ressources du château déjà traduits
  buildings: [
    'buildings', 'castleWalls', 'magicGuild', 'recruitment', 'upgrades'
  ]
};

// Name generation patterns using existing translations
const NAME_PATTERNS = [
  // Hero + Creature patterns
  '{HERO}_VS_{CREATURE}',
  '{HERO}_AND_{CREATURE}',
  '{HERO}_HUNT_{CREATURE}',
  
  // Terrain + Element patterns  
  '{TERRAIN}_OF_{CREATURE}',
  '{TERRAIN}_OF_{HERO}',
  '{BUILDING}_IN_{TERRAIN}',
  
  // Epic battle patterns
  'BATTLE_OF_{TERRAIN}',
  'SIEGE_OF_{BUILDING}',
  'QUEST_FOR_{ARTIFACT}',
  
  // Creature + Building patterns
  '{CREATURE}_GUARD_{BUILDING}',
  '{HERO}_DEFEND_{BUILDING}',
  '{ARTIFACT}_IN_{BUILDING}',
  
  // Special combinations
  'LEGEND_OF_{HERO}',
  'REALM_OF_{CREATURE}',
  'WAR_OF_{BUILDING}',
  'CHRONICLES_OF_{TERRAIN}',
  
  // Tournament style
  'TOURNAMENT_OF_{HERO}',
  'ARENA_OF_{CREATURE}',
  'CHAMPIONSHIP_OF_{BUILDING}',
  
  // Temporal/Magic themes
  'SHADOW_OF_{ARTIFACT}',
  'CURSE_OF_{TERRAIN}',
  'BLESSING_OF_{BUILDING}',
  'PROPHECY_OF_{HERO}'
];

// Get random element from array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Replace pattern placeholders with actual resource IDs
function fillPattern(pattern: string, resources: GameResources): string {
  let result = pattern;
  
  // Replace all placeholders
  result = result.replace(/{HERO}/g, getRandomElement(resources.heroes));
  result = result.replace(/{CREATURE}/g, getRandomElement(resources.creatures));
  result = result.replace(/{TERRAIN}/g, getRandomElement(resources.terrains));
  result = result.replace(/{BUILDING}/g, getRandomElement(resources.buildings));
  result = result.replace(/{ARTIFACT}/g, getRandomElement(resources.artifacts));
  
  return result;
}

// Generate a session name ID (for storage)
export function generateSessionNameId(): string {
  const pattern = getRandomElement(NAME_PATTERNS);
  return fillPattern(pattern, EXISTING_GAME_RESOURCES);
}

// Custom hook for translating session names using existing translations
export function useSessionNameTranslator() {
  const { t } = useTranslation();
  
  const translateSessionName = (nameId: string): string => {
    try {
      // Split the name by underscores and translate each part
      const parts = nameId.split('_');
      const translatedParts = parts.map(part => {
        // Try to use existing translation keys from i18n
        const lowerPart = part.toLowerCase();
        
        // Check if it's an existing translation key
        try {
          // Try direct translation for basic terms
          if (['warrior', 'mage', 'archer', 'paladin'].includes(lowerPart)) {
            return t(lowerPart as any);
          }
          if (['reddragon', 'phoenix', 'unicorn', 'griffin'].includes(lowerPart)) {
            return t(lowerPart as any);
          }
          if (['grass', 'forest', 'mountain', 'water', 'desert', 'swamp'].includes(lowerPart)) {
            return t(lowerPart as any);
          }
          if (['buildings', 'castlewalls', 'magicguild', 'recruitment', 'upgrades'].includes(lowerPart)) {
            return t(lowerPart as any);
          }
          
          // Check for item translations
          if (lowerPart.startsWith('items.')) {
            return t(lowerPart as any);
          }
          
          // Common game terms
          const gameTerms: Record<string, string> = {
            'vs': t('vs' as any) || 'vs',
            'and': t('and' as any) || 'et',
            'of': t('of' as any) || 'de',
            'in': t('in' as any) || 'dans',
            'battle': t('battle' as any) || t('attack'),
            'siege': t('siege' as any) || 'Siège',
            'quest': t('quest' as any) || 'Quête',
            'guard': t('guard' as any) || 'Garde',
            'defend': t('defend' as any) || t('defense'),
            'legend': t('legend' as any) || 'Légende',
            'realm': t('realm' as any) || 'Royaume',
            'war': t('war' as any) || 'Guerre',
            'chronicles': t('chronicles' as any) || 'Chroniques',
            'tournament': t('tournament' as any) || 'Tournoi',
            'arena': t('arena' as any) || 'Arène',
            'championship': t('championship' as any) || 'Championnat',
            'shadow': t('shadow' as any) || 'Ombre',
            'curse': t('curse' as any) || 'Malédiction',
            'blessing': t('blessing' as any) || 'Bénédiction',
            'prophecy': t('prophecy' as any) || 'Prophétie',
            'hunt': t('hunt' as any) || 'Chasse'
          };
          
          if (gameTerms[lowerPart]) {
            return gameTerms[lowerPart];
          }
          
          // Fallback: capitalize first letter
          return part.toLowerCase().replace(/^\w/, c => c.toUpperCase());
        } catch {
          return part.toLowerCase().replace(/^\w/, c => c.toUpperCase());
        }
      });
      
      return translatedParts.join(' ');
    } catch (error) {
      console.warn('Failed to translate session name:', nameId, error);
      // Fallback: convert to readable format
      return nameId.split('_').map(part => 
        part.toLowerCase().replace(/^\w/, c => c.toUpperCase())
      ).join(' ');
    }
  };
  
  return { translateSessionName };
}

// Generate multiple session name suggestions
export function generateSessionNameSuggestions(count: number = 5): string[] {
  const suggestions = new Set<string>();
  
  while (suggestions.size < count) {
    suggestions.add(generateSessionNameId());
  }
  
  return Array.from(suggestions);
}

// Validate and ensure unique session names
export function generateUniqueSessionName(existingNames: string[] = []): string {
  let attempts = 0;
  const maxAttempts = 50;
  
  while (attempts < maxAttempts) {
    const newName = generateSessionNameId();
    if (!existingNames.includes(newName)) {
      return newName;
    }
    attempts++;
  }
  
  // Fallback with timestamp if we can't generate unique name
  const timestamp = Date.now().toString().slice(-4);
  return `${generateSessionNameId()}_${timestamp}`;
} 