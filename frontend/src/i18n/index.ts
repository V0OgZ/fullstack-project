import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types pour les traductions
export type Language = 'fr' | 'en';

export interface Translation {
  // Header
  gameTitle: string;
  turn: string;
  player: string;
  
  // Resources
  gold: string;
  wood: string;
  stone: string;
  mana: string;
  
  // Buttons
  endTurn: string;
  nextPlayer: string;
  credits: string;
  showZFC: string;
  hideZFC: string;
  showTimeline: string;
  hideTimeline: string;
  politicalCouncil: string;
  
  // Game Actions
  move: string;
  attack: string;
  collect: string;
  cancel: string;
  confirm: string;
  
  // Political System
  reputation: string;
  advisors: string;
  international: string;
  domestic: string;
  military: string;
  economic: string;
  diplomatic: string;
  scientific: string;
  
  // Advisor Names
  generalVolkov: string;
  drPetrov: string;
  ambassadorKozlov: string;
  profIvanova: string;
  
  // Advisor Roles
  militaryAdvisor: string;
  economicAdvisor: string;
  diplomaticAdvisor: string;
  scientificAdvisor: string;
  
  // Advisor Recommendations
  stronglySupport: string;
  support: string;
  neutral: string;
  oppose: string;
  stronglyOppose: string;
  
  // Political Events
  borderCrisis: string;
  borderCrisisDescription: string;
  militaryResponse: string;
  diplomaticSolution: string;
  economicPressure: string;
  scientificApproach: string;
  
  // Game States
  loading: string;
  error: string;
  gameNotFound: string;
  
  // Map
  position: string;
  terrain: string;
  hero: string;
  creature: string;
  
  // Terrain Types
  grass: string;
  forest: string;
  mountain: string;
  water: string;
  desert: string;
  swamp: string;
  
  // Common
  close: string;
  save: string;
  delete: string;
  edit: string;
  back: string;
  next: string;
  previous: string;
  yes: string;
  no: string;
}

// Traductions françaises
const frenchTranslations: Translation = {
  // Header
  gameTitle: 'Heroes Reforged',
  turn: 'Tour',
  player: 'Joueur',
  
  // Resources
  gold: 'Or',
  wood: 'Bois',
  stone: 'Pierre',
  mana: 'Mana',
  
  // Buttons
  endTurn: 'Fin de Tour',
  nextPlayer: 'Joueur Suivant',
  credits: 'Crédits',
  showZFC: 'Afficher ZFC',
  hideZFC: 'Masquer ZFC',
  showTimeline: 'Afficher Timeline',
  hideTimeline: 'Masquer Timeline',
  politicalCouncil: 'Conseil Politique',
  
  // Game Actions
  move: 'Déplacer',
  attack: 'Attaquer',
  collect: 'Collecter',
  cancel: 'Annuler',
  confirm: 'Confirmer',
  
  // Political System
  reputation: 'Réputation',
  advisors: 'Conseillers',
  international: 'International',
  domestic: 'Domestique',
  military: 'Militaire',
  economic: 'Économique',
  diplomatic: 'Diplomatique',
  scientific: 'Scientifique',
  
  // Advisor Names
  generalVolkov: 'Général Volkov',
  drPetrov: 'Dr. Petrov',
  ambassadorKozlov: 'Ambassadeur Kozlov',
  profIvanova: 'Prof. Ivanova',
  
  // Advisor Roles
  militaryAdvisor: 'Conseiller Militaire',
  economicAdvisor: 'Conseiller Économique',
  diplomaticAdvisor: 'Conseiller Diplomatique',
  scientificAdvisor: 'Conseiller Scientifique',
  
  // Advisor Recommendations
  stronglySupport: 'Fortement Favorable',
  support: 'Favorable',
  neutral: 'Neutre',
  oppose: 'Défavorable',
  stronglyOppose: 'Fortement Défavorable',
  
  // Political Events
  borderCrisis: 'Crise Frontalière',
  borderCrisisDescription: 'Des tensions montent à la frontière nord. Les forces ennemies se massent près de nos territoires. Nos espions rapportent une possible invasion imminente. Comment réagissons-nous ?',
  militaryResponse: 'Mobiliser nos forces et préparer une réponse militaire',
  diplomaticSolution: 'Envoyer des diplomates pour négocier',
  economicPressure: 'Imposer des sanctions économiques',
  scientificApproach: 'Développer de nouvelles technologies défensives',
  
  // Game States
  loading: 'Chargement...',
  error: 'Erreur',
  gameNotFound: 'Jeu non trouvé',
  
  // Map
  position: 'Position',
  terrain: 'Terrain',
  hero: 'Héros',
  creature: 'Créature',
  
  // Terrain Types
  grass: 'Plaine',
  forest: 'Forêt',
  mountain: 'Montagne',
  water: 'Eau',
  desert: 'Désert',
  swamp: 'Marécage',
  
  // Common
  close: 'Fermer',
  save: 'Sauvegarder',
  delete: 'Supprimer',
  edit: 'Modifier',
  back: 'Retour',
  next: 'Suivant',
  previous: 'Précédent',
  yes: 'Oui',
  no: 'Non',
};

// Traductions anglaises
const englishTranslations: Translation = {
  // Header
  gameTitle: 'Heroes Reforged',
  turn: 'Turn',
  player: 'Player',
  
  // Resources
  gold: 'Gold',
  wood: 'Wood',
  stone: 'Stone',
  mana: 'Mana',
  
  // Buttons
  endTurn: 'End Turn',
  nextPlayer: 'Next Player',
  credits: 'Credits',
  showZFC: 'Show ZFC',
  hideZFC: 'Hide ZFC',
  showTimeline: 'Show Timeline',
  hideTimeline: 'Hide Timeline',
  politicalCouncil: 'Political Council',
  
  // Game Actions
  move: 'Move',
  attack: 'Attack',
  collect: 'Collect',
  cancel: 'Cancel',
  confirm: 'Confirm',
  
  // Political System
  reputation: 'Reputation',
  advisors: 'Advisors',
  international: 'International',
  domestic: 'Domestic',
  military: 'Military',
  economic: 'Economic',
  diplomatic: 'Diplomatic',
  scientific: 'Scientific',
  
  // Advisor Names
  generalVolkov: 'General Volkov',
  drPetrov: 'Dr. Petrov',
  ambassadorKozlov: 'Ambassador Kozlov',
  profIvanova: 'Prof. Ivanova',
  
  // Advisor Roles
  militaryAdvisor: 'Military Advisor',
  economicAdvisor: 'Economic Advisor',
  diplomaticAdvisor: 'Diplomatic Advisor',
  scientificAdvisor: 'Scientific Advisor',
  
  // Advisor Recommendations
  stronglySupport: 'Strongly Support',
  support: 'Support',
  neutral: 'Neutral',
  oppose: 'Oppose',
  stronglyOppose: 'Strongly Oppose',
  
  // Political Events
  borderCrisis: 'Border Crisis',
  borderCrisisDescription: 'Tensions are rising at the northern border. Enemy forces are massing near our territories. Our spies report a possible imminent invasion. How do we respond?',
  militaryResponse: 'Mobilize our forces and prepare a military response',
  diplomaticSolution: 'Send diplomats to negotiate',
  economicPressure: 'Impose economic sanctions',
  scientificApproach: 'Develop new defensive technologies',
  
  // Game States
  loading: 'Loading...',
  error: 'Error',
  gameNotFound: 'Game not found',
  
  // Map
  position: 'Position',
  terrain: 'Terrain',
  hero: 'Hero',
  creature: 'Creature',
  
  // Terrain Types
  grass: 'Grass',
  forest: 'Forest',
  mountain: 'Mountain',
  water: 'Water',
  desert: 'Desert',
  swamp: 'Swamp',
  
  // Common
  close: 'Close',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  back: 'Back',
  next: 'Next',
  previous: 'Previous',
  yes: 'Yes',
  no: 'No',
};

// Store pour les traductions
interface I18nStore {
  language: Language;
  translations: Translation;
  setLanguage: (language: Language) => void;
  t: (key: keyof Translation) => string;
}

export const useI18n = create<I18nStore>()(
  persist(
    (set, get) => ({
      language: 'fr',
      translations: frenchTranslations,
      
      setLanguage: (language: Language) => {
        const translations = language === 'fr' ? frenchTranslations : englishTranslations;
        set({ language, translations });
      },
      
      t: (key: keyof Translation) => {
        const { translations } = get();
        return translations[key] || key;
      },
    }),
    {
      name: 'heroes-reforged-i18n',
    }
  )
);

// Hook pour faciliter l'utilisation
export const useTranslation = () => {
  const { language, setLanguage, t } = useI18n();
  
  return {
    language,
    setLanguage,
    t,
    isEnglish: language === 'en',
    isFrench: language === 'fr',
  };
}; 