import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types pour les traductions
export type Language = 'fr' | 'en' | 'ru';

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
  loadingMap: string;
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
  
  // Heroes
  myHeroes: string;
  
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
  change: string;
  choosePlayer: string;
  heroes: string;
  instructions: string;
  eachPlayerTakesturns: string;
  planActionsForCurrentPlayer: string;
  passToNextPlayerWhenDone: string;
  useChangePlayerToCorrectError: string;
  
  // Action Planner
  actionPlanner: string;
  selectHero: string;
  selectHeroForPlanning: string;
  changeHero: string;
  quickActions: string;
  recruit: string;
  clickMapToMove: string;
  clickEnemyToAttack: string;
  clickObjectToCollect: string;
  selectUnitType: string;
  level: string;
  movementPoints: string;
  
  // Game Selector
  chooseScenario: string;
  classicConquest: string;
  classicDescription: string;
  mysticalConquest: string;
  mysticalDescription: string;
  turnBasedCombat: string;
  captureBuildings: string;
  hexagonalMaps: string;
  easy: string;
  advanced: string;
  temporalObjects: string;
  advancedMagic: string;
  mysticPortals: string;
  sameInterface: string;
  mysticalAddsObjects: string;
  testBackendConnection: string;
  builtWith: string;
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
  loadingMap: 'Chargement de la carte...',
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
  
  // Heroes
  myHeroes: 'Mes Héros',
  
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
  change: 'Changer',
  choosePlayer: 'Choisir un joueur',
  heroes: 'Héros',
  instructions: 'Instructions',
  eachPlayerTakesturns: 'Chaque joueur prend son tour',
  planActionsForCurrentPlayer: 'Planifiez les actions pour le joueur actuel',
  passToNextPlayerWhenDone: 'Passez au joueur suivant lorsque vous avez terminé',
  useChangePlayerToCorrectError: 'Utilisez "Changer de joueur" pour corriger l\'erreur',
  
  // Action Planner
  actionPlanner: 'Planificateur d\'Actions',
  selectHero: 'Sélectionner un Héros',
  selectHeroForPlanning: 'Sélectionner un Héros pour le Planification',
  changeHero: 'Changer de Héros',
  quickActions: 'Actions Rapides',
  recruit: 'Recruter',
  clickMapToMove: 'Cliquez sur la carte pour déplacer',
  clickEnemyToAttack: 'Cliquez sur l\'ennemi pour attaquer',
  clickObjectToCollect: 'Cliquez sur l\'objet pour le collecter',
  selectUnitType: 'Sélectionner le Type d\'Unité',
  level: 'Niveau',
  movementPoints: 'Points de Mouvement',
  
  // Game Selector
  chooseScenario: 'Choisir un scénario',
  classicConquest: 'Conquête Classique',
  classicDescription: 'Un jeu de stratégie où vous devez conquérir le monde.',
  mysticalConquest: 'Conquête Mystique',
  mysticalDescription: 'Un jeu de rôle où vous devez résoudre des mystères.',
  turnBasedCombat: 'Combat de Tour',
  captureBuildings: 'Capturer les Bâtiments',
  hexagonalMaps: 'Cartes Hexagonales',
  easy: 'Facile',
  advanced: 'Avancé',
  temporalObjects: 'Objets Temporaires',
  advancedMagic: 'Magie Avancée',
  mysticPortals: 'Portails Mystiques',
  sameInterface: 'Interface Identique',
  mysticalAddsObjects: 'Ajoute des objets mystiques',
  testBackendConnection: 'Tester la connexion du backend',
  builtWith: 'Construit avec',
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
  loadingMap: 'Loading map...',
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
  
  // Heroes
  myHeroes: 'My Heroes',
  
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
  change: 'Change',
  choosePlayer: 'Choose a player',
  heroes: 'Heroes',
  instructions: 'Instructions',
  eachPlayerTakesturns: 'Each player takes their turn',
  planActionsForCurrentPlayer: 'Plan actions for the current player',
  passToNextPlayerWhenDone: 'Pass to the next player when done',
  useChangePlayerToCorrectError: 'Use "Change Player" to correct the error',
  
  // Action Planner
  actionPlanner: 'Action Planner',
  selectHero: 'Select Hero',
  selectHeroForPlanning: 'Select Hero for Planning',
  changeHero: 'Change Hero',
  quickActions: 'Quick Actions',
  recruit: 'Recruit',
  clickMapToMove: 'Click map to move',
  clickEnemyToAttack: 'Click enemy to attack',
  clickObjectToCollect: 'Click object to collect',
  selectUnitType: 'Select Unit Type',
  level: 'Level',
  movementPoints: 'Movement Points',
  
  // Game Selector
  chooseScenario: 'Choose a scenario',
  classicConquest: 'Classic Conquest',
  classicDescription: 'A strategy game where you must conquer the world.',
  mysticalConquest: 'Mystical Conquest',
  mysticalDescription: 'A role-playing game where you must solve mysteries.',
  turnBasedCombat: 'Turn-Based Combat',
  captureBuildings: 'Capture Buildings',
  hexagonalMaps: 'Hexagonal Maps',
  easy: 'Easy',
  advanced: 'Advanced',
  temporalObjects: 'Temporal Objects',
  advancedMagic: 'Advanced Magic',
  mysticPortals: 'Mystic Portals',
  sameInterface: 'Same Interface',
  mysticalAddsObjects: 'Adds mystical objects',
  testBackendConnection: 'Test backend connection',
  builtWith: 'Built with',
};

// Traductions russes
const russianTranslations: Translation = {
  // Header
  gameTitle: 'Герои Возрождения',
  turn: 'Ход',
  player: 'Игрок',
  
  // Resources
  gold: 'Золото',
  wood: 'Дерево',
  stone: 'Камень',
  mana: 'Мана',
  
  // Buttons
  endTurn: 'Конец хода',
  nextPlayer: 'Следующий игрок',
  credits: 'Авторы',
  showZFC: 'Показать ZFC',
  hideZFC: 'Скрыть ZFC',
  showTimeline: 'Показать линию времени',
  hideTimeline: 'Скрыть линию времени',
  politicalCouncil: 'Политический совет',
  
  // Game Actions
  move: 'Двигаться',
  attack: 'Атаковать',
  collect: 'Собрать',
  cancel: 'Отменить',
  confirm: 'Подтвердить',
  
  // Political System
  reputation: 'Репутация',
  advisors: 'Советники',
  international: 'Международные',
  domestic: 'Внутренние',
  military: 'Военные',
  economic: 'Экономические',
  diplomatic: 'Дипломатические',
  scientific: 'Научные',
  
  // Advisor Names
  generalVolkov: 'Генерал Волков',
  drPetrov: 'Д-р Петров',
  ambassadorKozlov: 'Посол Козлов',
  profIvanova: 'Проф. Иванова',
  
  // Advisor Roles
  militaryAdvisor: 'Военный советник',
  economicAdvisor: 'Экономический советник',
  diplomaticAdvisor: 'Дипломатический советник',
  scientificAdvisor: 'Научный советник',
  
  // Advisor Recommendations
  stronglySupport: 'Полностью поддерживает',
  support: 'Поддерживает',
  neutral: 'Нейтральный',
  oppose: 'Против',
  stronglyOppose: 'Решительно против',
  
  // Political Events
  borderCrisis: 'Пограничный кризис',
  borderCrisisDescription: 'Напряженность растет на северной границе. Вражеские силы собираются возле наших территорий. Наши шпионы сообщают о возможном неминуемом вторжении. Как мы реагируем?',
  militaryResponse: 'Мобилизовать силы и подготовить военный ответ',
  diplomaticSolution: 'Отправить дипломатов для переговоров',
  economicPressure: 'Наложить экономические санкции',
  scientificApproach: 'Разработать новые оборонительные технологии',
  
  // Game States
  loading: 'Загрузка...',
  loadingMap: 'Загрузка карты...',
  error: 'Ошибка',
  gameNotFound: 'Игра не найдена',
  
  // Map
  position: 'Позиция',
  terrain: 'Местность',
  hero: 'Герой',
  creature: 'Существо',
  
  // Terrain Types
  grass: 'Трава',
  forest: 'Лес',
  mountain: 'Гора',
  water: 'Вода',
  desert: 'Пустыня',
  swamp: 'Болото',
  
  // Heroes
  myHeroes: 'Мои герои',
  
  // Common
  close: 'Закрыть',
  save: 'Сохранить',
  delete: 'Удалить',
  edit: 'Редактировать',
  back: 'Назад',
  next: 'Далее',
  previous: 'Предыдущий',
  yes: 'Да',
  no: 'Нет',
  change: 'Изменить',
  choosePlayer: 'Выберите игрока',
  heroes: 'Герои',
  instructions: 'Инструкции',
  eachPlayerTakesturns: 'Каждый игрок делает свой ход',
  planActionsForCurrentPlayer: 'Планируйте действия для текущего игрока',
  passToNextPlayerWhenDone: 'Переходите к следующему игроку после завершения',
  useChangePlayerToCorrectError: 'Используйте "Изменить игрока" для исправления ошибки',
  
  // Action Planner
  actionPlanner: 'Планировщик действий',
  selectHero: 'Выберите героя',
  selectHeroForPlanning: 'Выберите героя для планирования',
  changeHero: 'Изменить героя',
  quickActions: 'Быстрые действия',
  recruit: 'Набор',
  clickMapToMove: 'Нажмите на карту для перемещения',
  clickEnemyToAttack: 'Нажмите на врага для атаки',
  clickObjectToCollect: 'Нажмите на объект для сбора',
  selectUnitType: 'Выберите тип юнита',
  level: 'Уровень',
  movementPoints: 'Очки передвижения',
  
  // Game Selector
  chooseScenario: 'Выберите сценарий',
  classicConquest: 'Классическое завоевание',
  classicDescription: 'Стратегическая игра, где вы должны завоевать мир.',
  mysticalConquest: 'Мистическое завоевание',
  mysticalDescription: 'Ролевая игра, где вы должны раскрыть тайны.',
  turnBasedCombat: 'Пошаговый бой',
  captureBuildings: 'Захват зданий',
  hexagonalMaps: 'Шестиугольные карты',
  easy: 'Легко',
  advanced: 'Продвинутый',
  temporalObjects: 'Временные объекты',
  advancedMagic: 'Продвинутая магия',
  mysticPortals: 'Мистические порталы',
  sameInterface: 'Тот же интерфейс',
  mysticalAddsObjects: 'Добавляет мистические объекты',
  testBackendConnection: 'Тестировать соединение с бэкендом',
  builtWith: 'Построено с',
};

// Helper function to get translations
const getTranslations = (language: Language): Translation => {
  switch (language) {
    case 'fr':
      return frenchTranslations;
    case 'en':
      return englishTranslations;
    case 'ru':
      return russianTranslations;
    default:
      return englishTranslations;
  }
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
      language: 'en',
      translations: englishTranslations,
      
      setLanguage: (language: Language) => {
        const translations = getTranslations(language);
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
    isRussian: language === 'ru',
  };
}; 