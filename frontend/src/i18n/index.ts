import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import React from 'react'; // Added missing import for React.useEffect

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
  defense: string;
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
  retry: string;
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
  
  // Magic Inventory
  magicInventory: string;
  all: string;
  equipped: string;
  weapons: string;
  armor: string;
  accessories: string;
  artifacts: string;
  temporal: string;
  consumables: string;
  resources: string;
  allRarities: string;
  common: string;
  uncommon: string;
  rare: string;
  epic: string;
  legendary: string;
  allTypes: string;
  sortBy: string;
  name: string;
  value: string;
  rarity: string;
  onlyOwned: string;
  noObjectsFound: string;
  adjustFilters: string;
  equip: string;
  unequip: string;
  use: string;
  libraryStatistics: string;
  total: string;
  type: string;
  slot: string;
  specialEffect: string;
  horizontalTabs: string;
  verticalTabs: string;
  filterByRarity: string;
  filterByType: string;
  
  // Additional Magic Inventory keys
  magicInventoryTitle: string;
  noItemsFound: string;
  adjustFiltersOrExplore: string;
  sortByName: string;
  sortByValue: string;
  sortByRarity: string;
  equipItem: string;
  unequipItem: string;
  useItem: string;
  libraryStatsTitle: string;
  requiresLevel: string;
  objects: string;
  
  // Game Selector
  chooseScenario: string;
  classicConquest: string;
  classicDescription: string;
  mysticalConquest: string;
  mysticalDescription: string;
  multiplayerArena: string;
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

  // NEW: Missing translation keys for hardcoded strings
  modeHotSeat: string;
  testImages: string;
  imageTest: string;
  creatures: string;
  creatureGifs: string;
  redDragon: string;
  phoenix: string;
  unicorn: string;
  griffin: string;
  heroesPngs: string;
  warrior: string;
  mage: string;
  archer: string;
  paladin: string;
  filePaths: string;
  nationalReputation: string;
  nextCrisis: string;
  turns: string;
  perestroikaSystem: string;
  pending: string;
  confirmed: string;
  discarded: string;
  locked: string;
  unknown: string;
  recommendations: string;
  hideRecommendations: string;
  showRecommendations: string;
  makeDecision: string;
  severity: string;
  minor: string;
  moderate: string;
  major: string;
  catastrophic: string;
  fetchApiData: string;
  backendApiTest: string;
  apiResponse: string;
  loadingSpinner: string;
  errorMessage: string;

  // Magic Items - Weapons
  'items.sword_basic.name': string;
  'items.sword_basic.description': string;
  'items.sword_steel.name': string;
  'items.sword_steel.description': string;
  'items.sword_magic.name': string;
  'items.sword_magic.description': string;
  'items.sword_legendary.name': string;
  'items.sword_legendary.description': string;
  'items.sword_legendary.effect': string;

  // Magic Items - Armor
  'items.armor_leather.name': string;
  'items.armor_leather.description': string;
  'items.armor_chain.name': string;
  'items.armor_chain.description': string;
  'items.armor_plate.name': string;
  'items.armor_plate.description': string;
  'items.armor_dragon.name': string;
  'items.armor_dragon.description': string;
  'items.armor_dragon.effect': string;

  // Magic Items - Accessories
  'items.ring_power.name': string;
  'items.ring_power.description': string;
  'items.amulet_wisdom.name': string;
  'items.amulet_wisdom.description': string;
  'items.boots_speed.name': string;
  'items.boots_speed.description': string;
  'items.cape_stealth.name': string;
  'items.cape_stealth.description': string;
  'items.cape_stealth.effect': string;

  // Magic Items - Artifacts
  'items.crown_kings.name': string;
  'items.crown_kings.description': string;
  'items.crown_kings.effect': string;
  'items.orb_knowledge.name': string;
  'items.orb_knowledge.description': string;
  'items.staff_archmage.name': string;
  'items.staff_archmage.description': string;
  'items.staff_archmage.effect': string;

  // Magic Items - Temporal
  'items.temporal_anchor.name': string;
  'items.temporal_anchor.description': string;
  'items.temporal_anchor.effect': string;
  'items.temporal_prism.name': string;
  'items.temporal_prism.description': string;
  'items.temporal_prism.effect': string;
  'items.temporal_hourglass.name': string;
  'items.temporal_hourglass.description': string;
  'items.temporal_hourglass.effect': string;
  'items.temporal_compass.name': string;
  'items.temporal_compass.description': string;
  'items.temporal_compass.effect': string;

  // Magic Items - Consumables
  'items.potion_health.name': string;
  'items.potion_health.description': string;
  'items.potion_health.effect': string;
  'items.potion_mana.name': string;
  'items.potion_mana.description': string;
  'items.scroll_teleport.name': string;
  'items.scroll_teleport.description': string;
  'items.scroll_teleport.effect': string;
  'items.elixir_experience.name': string;
  'items.elixir_experience.description': string;

  // Magic Items - Resources
  'items.gold_pile.name': string;
  'items.gold_pile.description': string;
  'items.gold_chest.name': string;
  'items.gold_chest.description': string;
  'items.gold_vault.name': string;
  'items.gold_vault.description': string;

  // Scenario Selection
  selectScenario: string;
  chooseYourAdventure: string;
  noScenariosAvailable: string;
  initializeScenarios: string;
  category: string;
  allScenarios: string;
  singlePlayer: string;
  multiplayer: string;
  campaign: string;
  difficulty: string;
  allDifficulties: string;
  beginner: string;
  intermediate: string;
  expert: string;
  mapSize: string;
  players: string;
  duration: string;
  objectives: string;
  allObjectives: string;
  rewards: string;
  startScenario: string;
  scenarioLocked: string;
  
  // New keys for multiplayer arena and buttons
  multiplayerArenaDescription: string;
  rankedMatches: string;
  playersRange: string;
  realTimeStrategy: string;
  competitive: string;
  startGame: string;
  


  // Campaign scenario
  epicCampaign: string;
  epicCampaignDescription: string;
  storyDrivenGameplay: string;
  characterDevelopment: string;
  unlockableContent: string;
  multipleEndings: string;
  cinematicCutscenes: string;
  saveProgress: string;

  // Scenario selector UI
  availableAdventures: string;
  details: string;
  comingSoon: string;

  // Backend Scenario Names and Descriptions
  'scenarios.conquest-classic.name': string;
  'scenarios.conquest-classic.description': string;
  'scenarios.temporal-rift.name': string;
  'scenarios.temporal-rift.description': string;
  'scenarios.multiplayer-arena.name': string;
  'scenarios.multiplayer-arena.description': string;
  'scenarios.dragon-campaign.name': string;
  'scenarios.dragon-campaign.description': string;
  'scenarios.economic-race.name': string;
  'scenarios.economic-race.description': string;
  'scenarios.artifact-hunt.name': string;
  'scenarios.artifact-hunt.description': string;
  'scenarios.survival.name': string;
  'scenarios.survival.description': string;

  // Scenario Features
  'features.backend-loaded': string;
  'features.dynamic-content': string;
  'features.real-time-data': string;
  'features.epic-campaign': string;
  'features.dragon-lords': string;
  'features.ultimate-challenge': string;
  'features.balanced-gameplay': string;
  'features.all-castles': string;
  'features.standard-victory': string;

  // Castle Management
  overview: string;
  buildings: string;
  recruitment: string;
  upgrades: string;
  dailyIncome: string;
  castleSpecialty: string;
  garrison: string;
  currentBuildings: string;
  availableBuildings: string;
  construct: string;
  upgrade: string;
  recruitUnits: string;
  available: string;
  castleUpgrades: string;
  castleWalls: string;
  improvesCastleDefense: string;
  magicGuild: string;
  unlocksPowerfulSpells: string;

  // Demo System
  demonstrations: string;
  demoDescription: string;
  soloDemo: string;
  soloDemoDescription: string;
  multiplayerDemo: string;
  multiplayerDemoDescription: string;
  quickDemo: string;
  quickDemoDescription: string;
  launchDemo: string;
  launchSoloDemo: string;
  launchMultiplayerDemo: string;
  launchQuickDemo: string;
  demoNote: string;

  // Demo Tooltips
  'demo.welcome': string;
  'demo.loadingScenarios': string;
  'demo.selectScenario': string;
  'demo.launchGame': string;
  'demo.gameInitialization': string;
  'demo.gameInterface': string;
  'demo.controlButtons': string;
  'demo.heroesPanel': string;
  'demo.inventoryPanel': string;
  'demo.castlePanel': string;
  'demo.endTurn': string;
  'demo.nextTurn': string;
  'demo.finished': string;

  // Hero movement
  clickHeroToSelect: string;
  clickTileToMove: string;
  heroSelected: string;
  heroMoved: string;
  notEnoughMovement: string;
  cannotMoveHere: string;
  movementPoints: string;
  
  // Hero actions
  heroStats: string;
  noHeroSelected: string;
  selectHeroPrompt: string;
}

// Traductions françaises
const frenchTranslations: Translation = {
  // Header
  gameTitle: 'Heroes of Time',
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
  defense: 'Défendre',
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
  retry: 'Réessayer',
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
  
  // Magic Inventory
  magicInventory: 'Inventaire Magique',
  all: 'Tous',
  equipped: 'Équipé',
  weapons: 'Armes',
  armor: 'Armures',
  accessories: 'Accessoires',
  artifacts: 'Artifacts',
  temporal: 'Temporaires',
  consumables: 'Consommables',
  resources: 'Ressources',
  allRarities: 'Toutes les Rarités',
  common: 'Commun',
  uncommon: 'Non commun',
  rare: 'Rare',
  epic: 'Épique',
  legendary: 'Légendaire',
  allTypes: 'Tous les Types',
  sortBy: 'Trier par',
  name: 'Nom',
  value: 'Valeur',
  rarity: 'Rarité',
  onlyOwned: 'Seulement possédés',
  noObjectsFound: 'Aucun objet trouvé',
  adjustFilters: 'Ajuster les filtres',
  equip: 'Équiper',
  unequip: 'Déséquiper',
  use: 'Utiliser',
  libraryStatistics: 'Statistiques de la bibliothèque',
  total: 'Total',
  type: 'Type',
  slot: 'Slot',
  specialEffect: 'Effet spécial',
  horizontalTabs: 'Onglets horizontaux',
  verticalTabs: 'Onglets verticaux',
  filterByRarity: 'Filtrer par Rarité',
  filterByType: 'Filtrer par Type',
  
  // Additional Magic Inventory keys
  magicInventoryTitle: 'Inventaire Magique',
  noItemsFound: 'Aucun objet trouvé',
  adjustFiltersOrExplore: 'Ajuster les filtres ou explorer',
  sortByName: 'Trier par nom',
  sortByValue: 'Trier par valeur',
  sortByRarity: 'Trier par rareté',
  equipItem: 'Équiper l\'objet',
  unequipItem: 'Déséquiper l\'objet',
  useItem: 'Utiliser l\'objet',
  libraryStatsTitle: 'Statistiques de la bibliothèque',
  requiresLevel: 'Nécessite le niveau',
  objects: 'Objets',
  
  // Game Selector
  chooseScenario: 'Choisir un scénario',
  classicConquest: 'Conquête Classique',
  classicDescription: 'Un jeu de stratégie où vous devez conquérir le monde.',
  mysticalConquest: 'Conquête Mystique',
  mysticalDescription: 'Un jeu de rôle où vous devez résoudre des mystères.',
  multiplayerArena: 'Arène Multijoueur',
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

  // NEW: Missing translation keys for hardcoded strings
  modeHotSeat: 'Mode Hot Seat',
  testImages: 'Test des Images',
  imageTest: 'Test des Images',
  creatures: 'Créatures',
  creatureGifs: 'Créatures (GIFs)',
  redDragon: 'Dragon Rouge',
  phoenix: 'Phoenix',
  unicorn: 'Licorne',
  griffin: 'Griffon',
  heroesPngs: 'Héros (PNGs)',
  warrior: 'Guerrier',
  mage: 'Mage',
  archer: 'Archer',
  paladin: 'Paladin',
  filePaths: 'Chemins des fichiers',
  nationalReputation: 'Réputation Nationale',
  nextCrisis: 'Prochaine Crise',
  turns: 'tours',
  perestroikaSystem: 'Système Perestroika',
  pending: 'En attente',
  confirmed: 'Confirmé',
  discarded: 'Annulé',
  locked: 'Verrouillé',
  unknown: 'Inconnu',
  recommendations: 'Recommandations',
  hideRecommendations: 'Masquer les recommandations',
  showRecommendations: 'Afficher les recommandations',
  makeDecision: 'Prendre une décision',
  severity: 'Gravité',
  minor: 'Mineure',
  moderate: 'Modérée',
  major: 'Majeure',
  catastrophic: 'Catastrophique',
  fetchApiData: 'Récupérer les données API',
  backendApiTest: 'Test API Backend',
  apiResponse: 'Réponse API',
  loadingSpinner: 'Chargement en cours',
  errorMessage: 'Message d\'erreur',

  // Magic Items - Weapons
  'items.sword_basic.name': 'Épée de base',
  'items.sword_basic.description': 'Une épée simple et robuste.',
  'items.sword_steel.name': 'Épée en acier',
  'items.sword_steel.description': 'Une épée légère et rapide.',
  'items.sword_magic.name': 'Épée magique',
  'items.sword_magic.description': 'Une épée qui brille de façon mystérieuse.',
  'items.sword_legendary.name': 'Épée légendaire',
  'items.sword_legendary.description': 'Une épée qui a été forgée par un dieu.',
  'items.sword_legendary.effect': 'Augmente la puissance de l\'attaque.',

  // Magic Items - Armor
  'items.armor_leather.name': 'Armure en cuir',
  'items.armor_leather.description': 'Une armure légère et flexible.',
  'items.armor_chain.name': 'Armure en chaîne',
  'items.armor_chain.description': 'Une armure robuste et résistante.',
  'items.armor_plate.name': 'Armure en acier',
  'items.armor_plate.description': 'Une armure très résistante et lourde.',
  'items.armor_dragon.name': 'Armure de dragon',
  'items.armor_dragon.description': 'Une armure qui ressemble à un dragon.',
  'items.armor_dragon.effect': 'Augmente la résistance aux dégâts.',

  // Magic Items - Accessories
  'items.ring_power.name': 'Anneau de puissance',
  'items.ring_power.description': 'Un anneau qui augmente la puissance.',
  'items.amulet_wisdom.name': 'Amulette de sagesse',
  'items.amulet_wisdom.description': 'Un amulette qui augmente la sagesse.',
  'items.boots_speed.name': 'Bottes de vitesse',
  'items.boots_speed.description': 'Des bottes qui augmentent la vitesse.',
  'items.cape_stealth.name': 'Cape de furtivité',
  'items.cape_stealth.description': 'Une cape qui rend le porteur furtif.',
  'items.cape_stealth.effect': 'Augmente la furtivité.',

  // Magic Items - Artifacts
  'items.crown_kings.name': 'Couronne royale',
  'items.crown_kings.description': 'Une couronne qui symbolise la royauté.',
  'items.crown_kings.effect': 'Augmente la réputation.',
  'items.orb_knowledge.name': 'Orbe de connaissance',
  'items.orb_knowledge.description': 'Un orbe qui augmente la connaissance.',
  'items.staff_archmage.name': 'Baguette d\'archimage',
  'items.staff_archmage.description': 'Une baguette qui permet de lancer des sorts.',
  'items.staff_archmage.effect': 'Augmente la puissance des sorts.',

  // Magic Items - Temporal
  'items.temporal_anchor.name': 'Ancre temporelle',
  'items.temporal_anchor.description': 'Une ancre qui permet de voyager dans le temps.',
  'items.temporal_anchor.effect': 'Permet de voyager dans le temps.',
  'items.temporal_prism.name': 'Prisme temporel',
  'items.temporal_prism.description': 'Un prisme qui permet de modifier le temps.',
  'items.temporal_prism.effect': 'Permet de modifier le temps.',
  'items.temporal_hourglass.name': 'Sablier temporel',
  'items.temporal_hourglass.description': 'Un sablier qui permet de contrôler le temps.',
  'items.temporal_hourglass.effect': 'Permet de contrôler le temps.',
  'items.temporal_compass.name': 'Boussole temporelle',
  'items.temporal_compass.description': 'Une boussole qui permet de se repérer dans le temps.',
  'items.temporal_compass.effect': 'Permet de se repérer dans le temps.',

  // Magic Items - Consumables
  'items.potion_health.name': 'Potion de santé',
  'items.potion_health.description': 'Une potion qui restaure la santé.',
  'items.potion_health.effect': 'Restaure la santé.',
  'items.potion_mana.name': 'Potion de mana',
  'items.potion_mana.description': 'Une potion qui restaure le mana.',
  'items.scroll_teleport.name': 'Parchemin de téléportation',
  'items.scroll_teleport.description': 'Un parchemin qui permet de se téléporter.',
  'items.scroll_teleport.effect': 'Permet de se téléporter.',
  'items.elixir_experience.name': 'Elixir d\'expérience',
  'items.elixir_experience.description': 'Un elixir qui augmente l\'expérience.',

  // Magic Items - Resources
  'items.gold_pile.name': 'Pile d\'or',
  'items.gold_pile.description': 'Une pile d\'or qui peut être utilisée pour acheter des objets.',
  'items.gold_chest.name': 'Coffre d\'or',
  'items.gold_chest.description': 'Un coffre d\'or qui peut contenir beaucoup d\'or.',
  'items.gold_vault.name': 'Coffre-fort d\'or',
  'items.gold_vault.description': 'Un coffre-fort d\'or qui est très sécurisé.',

  // Scenario Selection
  selectScenario: 'Sélectionner un scénario',
  chooseYourAdventure: 'Choisissez votre aventure',
  noScenariosAvailable: 'Aucun scénario disponible',
  initializeScenarios: 'Initialiser les scénarios',
  category: 'Catégorie',
  allScenarios: 'Tous les scénarios',
  singlePlayer: 'Joueur unique',
  multiplayer: 'Multijoueur',
  campaign: 'Campagne',
  difficulty: 'Difficulté',
  allDifficulties: 'Toutes les difficultés',
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  expert: 'Expert',
  mapSize: 'Taille de la carte',
  players: 'Joueurs',
  duration: 'Durée',
  objectives: 'Objectifs',
  allObjectives: 'Tous les objectifs',
  rewards: 'Récompenses',
  startScenario: 'Démarrer le scénario',
  scenarioLocked: 'Verrouillé',
  
  // New keys for multiplayer arena and buttons
  multiplayerArenaDescription: 'Un jeu de stratégie multijoueur où vous pouvez affronter d\'autres joueurs en temps réel ou en tour par tour.',
  rankedMatches: 'Matches classés',
  playersRange: 'Nombre de joueurs (2-8)',
  realTimeStrategy: 'Stratégie en temps réel',
  competitive: 'Compétitif',
  startGame: 'Démarrer la partie',
  


  // Campaign scenario
  epicCampaign: 'Campagne Épique',
  epicCampaignDescription: 'Embarquez dans un voyage épique à travers des scénarios interconnectés avec une histoire riche.',
  storyDrivenGameplay: 'Gameplay narratif',
  characterDevelopment: 'Développement de personnage',
  unlockableContent: 'Contenu débloquable',
  multipleEndings: 'Fins multiples',
  cinematicCutscenes: 'Cinématiques',
  saveProgress: 'Sauvegarder les progrès',

  // Scenario selector UI
  availableAdventures: 'Choisir un scénario',
  details: 'Détails',
  comingSoon: 'Bientôt Disponible',

  // Backend Scenario Names and Descriptions
  'scenarios.conquest-classic.name': 'Conquête Classique',
  'scenarios.conquest-classic.description': 'Un scénario de conquête traditionnel où les joueurs doivent éliminer tous les ennemis ou capturer leurs villes principales.',
  'scenarios.temporal-rift.name': 'La Faille Temporelle',
  'scenarios.temporal-rift.description': 'Une faille mystérieuse dans le temps menace de déchirer la réalité. Les héros doivent naviguer à travers les zones temporelles pour rétablir l\'équilibre.',
  'scenarios.multiplayer-arena.name': 'Arène Multijoueur',
  'scenarios.multiplayer-arena.description': 'Une bataille multijoueur rapide où les joueurs s\'affrontent dans une arène plus petite pour des matchs rapides.',
  'scenarios.dragon-campaign.name': 'Campagne du Dragon',
  'scenarios.dragon-campaign.description': 'Affrontez les anciens seigneurs dragons dans cette campagne épique. Complétez d\'autres scénarios pour débloquer.',
  'scenarios.economic-race.name': 'Course Économique',
  'scenarios.economic-race.description': 'Une compétition économique pacifique où les joueurs rivalisent pour accumuler des ressources et construire le royaume le plus prospère.',
  'scenarios.artifact-hunt.name': 'Chasse aux Artefacts',
  'scenarios.artifact-hunt.description': 'Un scénario de chasse au trésor où les joueurs recherchent de puissants artefacts dispersés sur la carte.',
  'scenarios.survival.name': 'Dernier Rempart',
  'scenarios.survival.description': 'Survivez aux vagues d\'ennemis de plus en plus puissants tout en défendant votre forteresse.',

  // Scenario Features
  'features.backend-loaded': 'Chargé depuis le Backend',
  'features.dynamic-content': 'Contenu Dynamique',
  'features.real-time-data': 'Données en Temps Réel',
  'features.epic-campaign': 'Campagne Épique',
  'features.dragon-lords': 'Seigneurs Dragons',
  'features.ultimate-challenge': 'Défi Ultime',
  'features.balanced-gameplay': 'Gameplay Équilibré',
  'features.all-castles': 'Tous les Châteaux',
  'features.standard-victory': 'Victoire Standard',

  // Castle Management
  overview: 'Aperçu',
  buildings: 'Bâtiments',
  recruitment: 'Recrutement',
  upgrades: 'Améliorations',
  dailyIncome: 'Revenus quotidiens',
  castleSpecialty: 'Spécialité du château',
  garrison: 'Garnison',
  currentBuildings: 'Bâtiments actuels',
  availableBuildings: 'Bâtiments disponibles',
  construct: 'Construire',
  upgrade: 'Améliorer',
  recruitUnits: 'Recruter des unités',
  available: 'Disponible',
  castleUpgrades: 'Améliorations du château',
  castleWalls: 'Murailles du château',
  improvesCastleDefense: 'Améliore la défense du château',
  magicGuild: 'Guilde de magie',
  unlocksPowerfulSpells: 'Débloque des sorts puissants',

  // Demo System
  demonstrations: 'Démonstrations',
  demoDescription: 'Découvrez Heroes of Time avec nos démonstrations automatiques',
  soloDemo: 'Démo Solo',
  soloDemoDescription: 'Choisit un scénario, sélectionne un héros et joue automatiquement un tour complet',
  multiplayerDemo: 'Démo Multijoueur',
  multiplayerDemoDescription: '2 écrans côte à côte montrant une partie multijoueur synchronisée avec création de session et gameplay',
  quickDemo: 'Démo Rapide',
  quickDemoDescription: 'Aperçu rapide des fonctionnalités principales sans navigateur visible',
  launchDemo: 'Lancer la Démo',
  launchSoloDemo: 'Lancer la démonstration solo ? Un navigateur va s\'ouvrir pour montrer le gameplay automatique.',
  launchMultiplayerDemo: 'Lancer la démonstration multijoueur ? Deux navigateurs vont s\'ouvrir côte à côte pour montrer le jeu en réseau.',
  launchQuickDemo: 'Lancer la démonstration rapide ? Tests automatiques en arrière-plan.',
  demoNote: 'Les démonstrations utilisent des navigateurs automatisés pour montrer le gameplay sans intervention manuelle.',

  // Demo Tooltips
  'demo.welcome': '🏠 Bienvenue dans Heroes of Time !<br/>Je vais vous montrer comment jouer une partie...',
  'demo.loadingScenarios': '📊 Chargement des scénarios disponibles...<br/>Veuillez patienter pendant que je récupère les missions',
  'demo.selectScenario': '🎯 Je choisis le scénario "Classic Conquest"<br/>Une aventure épique vous attend !',
  'demo.launchGame': '▶️ Clic sur le bouton "Jouer" !<br/>L\'aventure commence maintenant...',
  'demo.gameInitialization': '🎮 Initialisation de la partie...<br/>Création de la carte et des héros en cours',
  'demo.gameInterface': '🖥️ Interface de jeu chargée !<br/>Voici votre royaume à conquérir',
  'demo.controlButtons': '🎮 Test des boutons de contrôle - Heroes, Inventory, Castle',
  'demo.heroesPanel': '⚔️ Panneau Heroes ouvert ! Vous pouvez voir vos héros ici.',
  'demo.inventoryPanel': '🎒 Panneau Inventory ouvert ! Gérez vos objets équipés.',
  'demo.castlePanel': '🏰 Panneau Castle ouvert ! Construisez et gérez vos châteaux.',
  'demo.endTurn': '🔄 Fin du tour - Cliquez sur "End Turn" pour terminer.',
  'demo.nextTurn': '🔄 Tour suivant en cours<br/>Votre royaume évolue et grandit !',
  'demo.finished': '🎉 Démonstration terminée !<br/>Vous savez maintenant jouer à Heroes of Time<br/><br/>✨ Amusez-vous bien dans vos conquêtes ! ✨',

  // Hero movement
  clickHeroToSelect: 'Cliquez sur un héros pour le sélectionner',
  clickTileToMove: 'Cliquez sur une case verte pour déplacer votre héros',
  heroSelected: 'Héros sélectionné',
  heroMoved: 'Héros déplacé avec succès',
  notEnoughMovement: 'Pas assez de points de déplacement',
  cannotMoveHere: 'Impossible de se déplacer ici',
  movementPoints: 'Points de déplacement',
  
  // Hero actions
  heroStats: 'Statistiques du héros',
  noHeroSelected: 'Aucun héros sélectionné',
  selectHeroPrompt: 'Sélectionnez un héros pour voir ses statistiques et planifier des actions',
};

// Traductions anglaises
const englishTranslations: Translation = {
  // Header
  gameTitle: 'Heroes of Time',
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
  defense: 'Defense',
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
  retry: 'Retry',
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
  
  // Magic Inventory
  magicInventory: 'Magic Inventory',
  all: 'All',
  equipped: 'Equipped',
  weapons: 'Weapons',
  armor: 'Armor',
  accessories: 'Accessories',
  artifacts: 'Artifacts',
  temporal: 'Temporal',
  consumables: 'Consumables',
  resources: 'Resources',
  allRarities: 'All Rarities',
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
  allTypes: 'All Types',
  sortBy: 'Sort By',
  name: 'Name',
  value: 'Value',
  rarity: 'Rarity',
  onlyOwned: 'Only Owned',
  noObjectsFound: 'No objects found',
  adjustFilters: 'Adjust Filters',
  equip: 'Equip',
  unequip: 'Unequip',
  use: 'Use',
  libraryStatistics: 'Library Statistics',
  total: 'Total',
  type: 'Type',
  slot: 'Slot',
  specialEffect: 'Special Effect',
  horizontalTabs: 'Horizontal Tabs',
  verticalTabs: 'Vertical Tabs',
  filterByRarity: 'Filter by Rarity',
  filterByType: 'Filter by Type',
  
  // Additional Magic Inventory keys
  magicInventoryTitle: 'Magic Inventory',
  noItemsFound: 'No items found',
  adjustFiltersOrExplore: 'Adjust filters or explore',
  sortByName: 'Sort by Name',
  sortByValue: 'Sort by Value',
  sortByRarity: 'Sort by Rarity',
  equipItem: 'Equip Item',
  unequipItem: 'Unequip Item',
  useItem: 'Use Item',
  libraryStatsTitle: 'Library Statistics',
  requiresLevel: 'Requires Level',
  objects: 'Objects',
  
  // Game Selector
  chooseScenario: 'Choose a scenario',
  classicConquest: 'Classic Conquest',
  classicDescription: 'A strategy game where you must conquer the world.',
  mysticalConquest: 'Mystical Conquest',
  mysticalDescription: 'A role-playing game where you must solve mysteries.',
  multiplayerArena: 'Multiplayer Arena',
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

  // NEW: Missing translation keys for hardcoded strings
  modeHotSeat: 'Hot Seat Mode',
  testImages: 'Test Images',
  imageTest: 'Image Test',
  creatures: 'Creatures',
  creatureGifs: 'Creatures (GIFs)',
  redDragon: 'Red Dragon',
  phoenix: 'Phoenix',
  unicorn: 'Unicorn',
  griffin: 'Griffin',
  heroesPngs: 'Heroes (PNGs)',
  warrior: 'Warrior',
  mage: 'Mage',
  archer: 'Archer',
  paladin: 'Paladin',
  filePaths: 'File Paths',
  nationalReputation: 'National Reputation',
  nextCrisis: 'Next Crisis',
  turns: 'turns',
  perestroikaSystem: 'Perestroika System',
  pending: 'Pending',
  confirmed: 'Confirmed',
  discarded: 'Discarded',
  locked: 'Locked',
  unknown: 'Unknown',
  recommendations: 'Recommendations',
  hideRecommendations: 'Hide Recommendations',
  showRecommendations: 'Show Recommendations',
  makeDecision: 'Make Decision',
  severity: 'Severity',
  minor: 'Minor',
  moderate: 'Moderate',
  major: 'Major',
  catastrophic: 'Catastrophic',
  fetchApiData: 'Fetch API Data',
  backendApiTest: 'Backend API Test',
  apiResponse: 'API Response',
  loadingSpinner: 'Loading...',
  errorMessage: 'Error Message',

  // Magic Items - Weapons
  'items.sword_basic.name': 'Basic Sword',
  'items.sword_basic.description': 'A simple and robust sword.',
  'items.sword_steel.name': 'Steel Sword',
  'items.sword_steel.description': 'A light and fast sword.',
  'items.sword_magic.name': 'Magic Sword',
  'items.sword_magic.description': 'A sword that glows mysteriously.',
  'items.sword_legendary.name': 'Legendary Sword',
  'items.sword_legendary.description': 'A sword that was forged by a god.',
  'items.sword_legendary.effect': 'Increases attack power.',

  // Magic Items - Armor
  'items.armor_leather.name': 'Leather Armor',
  'items.armor_leather.description': 'A light and flexible armor.',
  'items.armor_chain.name': 'Chain Armor',
  'items.armor_chain.description': 'A robust and resistant armor.',
  'items.armor_plate.name': 'Steel Armor',
  'items.armor_plate.description': 'A very resistant and heavy armor.',
  'items.armor_dragon.name': 'Dragon Armor',
  'items.armor_dragon.description': 'An armor that looks like a dragon.',
  'items.armor_dragon.effect': 'Increases resistance to damage.',

  // Magic Items - Accessories
  'items.ring_power.name': 'Power Ring',
  'items.ring_power.description': 'A ring that increases power.',
  'items.amulet_wisdom.name': 'Wisdom Amulet',
  'items.amulet_wisdom.description': 'An amulet that increases wisdom.',
  'items.boots_speed.name': 'Speed Boots',
  'items.boots_speed.description': 'Boots that increase speed.',
  'items.cape_stealth.name': 'Stealth Cape',
  'items.cape_stealth.description': 'A cape that makes the wearer stealthy.',
  'items.cape_stealth.effect': 'Increases stealth.',

  // Magic Items - Artifacts
  'items.crown_kings.name': 'Crown of Kings',
  'items.crown_kings.description': 'A crown that symbolizes royalty.',
  'items.crown_kings.effect': 'Increases reputation.',
  'items.orb_knowledge.name': 'Orb of Knowledge',
  'items.orb_knowledge.description': 'An orb that increases knowledge.',
  'items.staff_archmage.name': 'Archmage Staff',
  'items.staff_archmage.description': 'A staff that allows casting spells.',
  'items.staff_archmage.effect': 'Increases spell power.',

  // Magic Items - Temporal
  'items.temporal_anchor.name': 'Temporal Anchor',
  'items.temporal_anchor.description': 'An anchor that allows traveling through time.',
  'items.temporal_anchor.effect': 'Allows traveling through time.',
  'items.temporal_prism.name': 'Temporal Prism',
  'items.temporal_prism.description': 'A prism that allows time manipulation.',
  'items.temporal_prism.effect': 'Allows time manipulation.',
  'items.temporal_hourglass.name': 'Temporal Hourglass',
  'items.temporal_hourglass.description': 'An hourglass that allows controlling time.',
  'items.temporal_hourglass.effect': 'Allows controlling time.',
  'items.temporal_compass.name': 'Temporal Compass',
  'items.temporal_compass.description': 'A compass that allows navigation through time.',
  'items.temporal_compass.effect': 'Allows navigation through time.',

  // Magic Items - Consumables
  'items.potion_health.name': 'Health Potion',
  'items.potion_health.description': 'A potion that restores health.',
  'items.potion_health.effect': 'Restores health.',
  'items.potion_mana.name': 'Mana Potion',
  'items.potion_mana.description': 'A potion that restores mana.',
  'items.scroll_teleport.name': 'Teleport Scroll',
  'items.scroll_teleport.description': 'A scroll that allows teleportation.',
  'items.scroll_teleport.effect': 'Allows teleportation.',
  'items.elixir_experience.name': 'Experience Elixir',
  'items.elixir_experience.description': 'An elixir that increases experience.',

  // Magic Items - Resources
  'items.gold_pile.name': 'Gold Pile',
  'items.gold_pile.description': 'A pile of gold that can be used to buy items.',
  'items.gold_chest.name': 'Gold Chest',
  'items.gold_chest.description': 'A gold chest that can contain a lot of gold.',
  'items.gold_vault.name': 'Gold Vault',
  'items.gold_vault.description': 'A very secure gold vault.',

  // Scenario Selection
  selectScenario: 'Choose a scenario',
  chooseYourAdventure: 'Choose your adventure',
  noScenariosAvailable: 'No scenarios available',
  initializeScenarios: 'Initialize scenarios',
  category: 'Category',
  allScenarios: 'All Scenarios',
  singlePlayer: 'Single Player',
  multiplayer: 'Multiplayer',
  campaign: 'Campaign',
  difficulty: 'Difficulty',
  allDifficulties: 'All Difficulties',
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  expert: 'Expert',
  mapSize: 'Map Size',
  players: 'Players',
  duration: 'Duration',
  objectives: 'Objectives',
  allObjectives: 'All Objectives',
  rewards: 'Rewards',
  startScenario: 'Start Scenario',
  scenarioLocked: 'Locked',
  
  // New keys for multiplayer arena and buttons
  multiplayerArenaDescription: 'A multiplayer strategy game where you can face other players in real-time or turn-by-turn.',
  rankedMatches: 'Ranked Matches',
  playersRange: 'Number of Players (2-8)',
  realTimeStrategy: 'Real-Time Strategy',
  competitive: 'Competitive',
  startGame: 'Start Game',
  


  // Campaign scenario
  epicCampaign: 'Epic Campaign',
  epicCampaignDescription: 'A campaign that offers a more immersive and richer gameplay experience.',
  storyDrivenGameplay: 'Story-Driven Gameplay',
  characterDevelopment: 'Character Development',
  unlockableContent: 'Unlockable Content',
  multipleEndings: 'Multiple Endings',
  cinematicCutscenes: 'Cinematic Cutscenes',
  saveProgress: 'Save Progress',

  // Scenario selector UI
  availableAdventures: 'Available Adventures',
  details: 'Details',
  comingSoon: 'Coming Soon',

  // Backend Scenario Names and Descriptions
  'scenarios.conquest-classic.name': 'Classic Conquest',
  'scenarios.conquest-classic.description': 'A traditional conquest scenario where players must eliminate all enemies or capture their main towns.',
  'scenarios.temporal-rift.name': 'The Temporal Rift',
  'scenarios.temporal-rift.description': 'A mysterious rift in time threatens to tear reality apart. Heroes must navigate through temporal zones to restore balance.',
  'scenarios.multiplayer-arena.name': 'Multiplayer Arena',
  'scenarios.multiplayer-arena.description': 'A fast-paced multiplayer battle where players compete in a smaller arena for quick matches.',
  'scenarios.dragon-campaign.name': 'Dragon Campaign',
  'scenarios.dragon-campaign.description': 'Face the ancient dragon lords in this epic campaign. Complete other scenarios to unlock.',
  'scenarios.economic-race.name': 'Economic Race',
  'scenarios.economic-race.description': 'A peaceful economic competition where players race to accumulate resources and build the most prosperous kingdom.',
  'scenarios.artifact-hunt.name': 'Artifact Hunt',
  'scenarios.artifact-hunt.description': 'A treasure hunting scenario where players search for powerful artifacts scattered across the map.',
  'scenarios.survival.name': 'Last Stand',
  'scenarios.survival.description': 'Survive waves of increasingly powerful enemies while defending your stronghold.',

  // Scenario Features
  'features.backend-loaded': 'Backend Loaded',
  'features.dynamic-content': 'Dynamic Content',
  'features.real-time-data': 'Real-time Data',
  'features.epic-campaign': 'Epic Campaign',
  'features.dragon-lords': 'Dragon Lords',
  'features.ultimate-challenge': 'Ultimate Challenge',
  'features.balanced-gameplay': 'Balanced Gameplay',
  'features.all-castles': 'All Castles',
  'features.standard-victory': 'Standard Victory',

  // Castle Management
  overview: 'Overview',
  buildings: 'Buildings',
  recruitment: 'Recruitment',
  upgrades: 'Upgrades',
  dailyIncome: 'Daily Income',
  castleSpecialty: 'Castle Specialty',
  garrison: 'Garrison',
  currentBuildings: 'Current Buildings',
  availableBuildings: 'Available Buildings',
  construct: 'Construct',
  upgrade: 'Upgrade',
  recruitUnits: 'Recruit Units',
  available: 'Available',
  castleUpgrades: 'Castle Upgrades',
  castleWalls: 'Castle Walls',
  improvesCastleDefense: 'Improves castle defense',
  magicGuild: 'Magic Guild',
  unlocksPowerfulSpells: 'Unlocks powerful spells',

  // Demo System
  demonstrations: 'Demonstrations',
  demoDescription: 'Discover Heroes of Time with our automated demonstrations',
  soloDemo: 'Solo Demo',
  soloDemoDescription: 'Chooses a scenario, selects a hero and automatically plays a complete turn',
  multiplayerDemo: 'Multiplayer Demo',
  multiplayerDemoDescription: '2 side-by-side screens showing a synchronized multiplayer game with session creation and gameplay',
  quickDemo: 'Quick Demo',
  quickDemoDescription: 'Quick overview of main features without visible browser',
  launchDemo: 'Launch Demo',
  launchSoloDemo: 'Launch solo demonstration? A browser will open to show automatic gameplay.',
  launchMultiplayerDemo: 'Launch multiplayer demonstration? Two browsers will open side by side to show network gaming.',
  launchQuickDemo: 'Launch quick demonstration? Automated background tests.',
  demoNote: 'Demonstrations use automated browsers to show gameplay without manual intervention.',

  // Demo Tooltips
  'demo.welcome': '🏠 Welcome to Heroes of Time!<br/>Let me show you how to play a game...',
  'demo.loadingScenarios': '📊 Loading available scenarios...<br/>Please wait while I fetch the missions',
  'demo.selectScenario': '🎯 I choose the "Classic Conquest" scenario<br/>An epic adventure awaits you!',
  'demo.launchGame': '▶️ Click the "Play" button!<br/>The adventure begins now...',
  'demo.gameInitialization': '🎮 Game initialization...<br/>Creating the map and heroes in progress',
  'demo.gameInterface': '🖥️ Game interface loaded!<br/>Here is your kingdom to conquer',
  'demo.controlButtons': '🎮 Testing control buttons - Heroes, Inventory, Castle',
  'demo.heroesPanel': '⚔️ Heroes panel opened! You can see your heroes here.',
  'demo.inventoryPanel': '🎒 Inventory panel opened! Manage your equipped items.',
  'demo.castlePanel': '🏰 Castle panel opened! Build and manage your castles.',
  'demo.endTurn': '🔄 End turn - Click "End Turn" to finish.',
  'demo.nextTurn': '🔄 Next turn in progress<br/>Your kingdom evolves and grows!',
  'demo.finished': '🎉 Demonstration complete!<br/>You now know how to play Heroes of Time<br/><br/>✨ Have fun in your conquests! ✨',

  // Hero movement
  clickHeroToSelect: 'Click on a hero to select them',
  clickTileToMove: 'Click on a green tile to move your hero',
  heroSelected: 'Hero selected',
  heroMoved: 'Hero moved successfully',
  notEnoughMovement: 'Not enough movement points',
  cannotMoveHere: 'Cannot move to this location',
  movementPoints: 'Movement Points',
  
  // Hero actions
  heroStats: 'Hero Stats',
  noHeroSelected: 'No hero selected',
  selectHeroPrompt: 'Select a hero to see their stats and plan actions',
};

// Traductions russes
const russianTranslations: Translation = {
  // Header
  gameTitle: 'Герои Времени',
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
  defense: 'Защищать',
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
  retry: 'Повторить',
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
  
  // Magic Inventory
  magicInventory: 'Магический Инвентарь',
  all: 'Все',
  equipped: 'Экипированные',
  weapons: 'Оружие',
  armor: 'Броня',
  accessories: 'Аксессуары',
  artifacts: 'Артефакты',
  temporal: 'Временные',
  consumables: 'Потребляемые',
  resources: 'Ресурсы',
  allRarities: 'Все раритеты',
  common: 'Обычные',
  uncommon: 'Необычные',
  rare: 'Редкие',
  epic: 'Эпические',
  legendary: 'Легендарные',
  allTypes: 'Все типы',
  sortBy: 'Сортировать по',
  name: 'Название',
  value: 'Ценность',
  rarity: 'Редкость',
  onlyOwned: 'Только в собственности',
  noObjectsFound: 'Объекты не найдены',
  adjustFilters: 'Настроить фильтры',
  equip: 'Экипировать',
  unequip: 'Снять экипировку',
  use: 'Использовать',
  libraryStatistics: 'Статистика библиотеки',
  total: 'Всего',
  type: 'Тип',
  slot: 'Слот',
  specialEffect: 'Специальный эффект',
  horizontalTabs: 'Горизонтальные вкладки',
  verticalTabs: 'Вертикальные вкладки',
  filterByRarity: 'Фильтровать по редкости',
  filterByType: 'Фильтровать по типу',
  
  // Additional Magic Inventory keys
  magicInventoryTitle: 'Магический Инвентарь',
  noItemsFound: 'Объекты не найдены',
  adjustFiltersOrExplore: 'Настроить фильтры или исследовать',
  sortByName: 'Сортировать по имени',
  sortByValue: 'Сортировать по значению',
  sortByRarity: 'Сортировать по редкости',
  equipItem: 'Экипировать предмет',
  unequipItem: 'Снять экипировку предмета',
  useItem: 'Использовать предмет',
  libraryStatsTitle: 'Статистика библиотеки',
  requiresLevel: 'Требуется уровень',
  objects: 'Предметы',
  
  // Game Selector
  chooseScenario: 'Выберите сценарий',
  classicConquest: 'Классическое завоевание',
  classicDescription: 'Стратегическая игра, где вы должны завоевать мир.',
  mysticalConquest: 'Мистическое завоевание',
  mysticalDescription: 'Ролевая игра, где вы должны раскрыть тайны.',
  multiplayerArena: 'Мультиплеерная арена',
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

  // NEW: Missing translation keys for hardcoded strings
  modeHotSeat: 'Режим Hot Seat',
  testImages: 'Тест изображений',
  imageTest: 'Тест изображений',
  creatures: 'Существа',
  creatureGifs: 'Существа (GIF)',
  redDragon: 'Красный дракон',
  phoenix: 'Феникс',
  unicorn: 'Единорог',
  griffin: 'Грифон',
  heroesPngs: 'Герои (PNG)',
  warrior: 'Воин',
  mage: 'Маг',
  archer: 'Лучник',
  paladin: 'Паладин',
  filePaths: 'Пути к файлам',
  nationalReputation: 'Национальная репутация',
  nextCrisis: 'Следующий кризис',
  turns: 'ходов',
  perestroikaSystem: 'Система перестройки',
  pending: 'Ожидает',
  confirmed: 'Подтверждено',
  discarded: 'Отменено',
  locked: 'Заблокировано',
  unknown: 'Неизвестно',
  recommendations: 'Рекомендации',
  hideRecommendations: 'Скрыть рекомендации',
  showRecommendations: 'Показать рекомендации',
  makeDecision: 'Принять решение',
  severity: 'Серьезность',
  minor: 'Незначительная',
  moderate: 'Умеренная',
  major: 'Серьезная',
  catastrophic: 'Катастрофическая',
  fetchApiData: 'Получить данные API',
  backendApiTest: 'Тест API бэкенда',
  apiResponse: 'Ответ API',
  loadingSpinner: 'Загрузка...',
  errorMessage: 'Сообщение об ошибке',

  // Magic Items - Weapons
  'items.sword_basic.name': 'Простая меч',
  'items.sword_basic.description': 'Простая и надежная меча.',
  'items.sword_steel.name': 'Железная меча',
  'items.sword_steel.description': 'Легкая и быстрая меча.',
  'items.sword_magic.name': 'Магическая меча',
  'items.sword_magic.description': 'Меча, которая светится таинственным образом.',
  'items.sword_legendary.name': 'Легендарная меча',
  'items.sword_legendary.description': 'Меча, которая была отлита богом.',
  'items.sword_legendary.effect': 'Увеличивает силу атаки.',

  // Magic Items - Armor
  'items.armor_leather.name': 'Кожанная броня',
  'items.armor_leather.description': 'Легкая и гибкая броня.',
  'items.armor_chain.name': 'Кольчужная броня',
  'items.armor_chain.description': 'Надежная и устойчивая броня.',
  'items.armor_plate.name': 'Железная броня',
  'items.armor_plate.description': 'Очень надежная и тяжелая броня.',
  'items.armor_dragon.name': 'Драконская броня',
  'items.armor_dragon.description': 'Броня, похожая на дракона.',
  'items.armor_dragon.effect': 'Увеличивает сопротивление урону.',

  // Magic Items - Accessories
  'items.ring_power.name': 'Кольцо силы',
  'items.ring_power.description': 'Кольцо, увеличивающее силу.',
  'items.amulet_wisdom.name': 'Амулет мудрости',
  'items.amulet_wisdom.description': 'Амулет, увеличивающий мудрость.',
  'items.boots_speed.name': 'Ботинки скорости',
  'items.boots_speed.description': 'Ботинки, увеличивающие скорость.',
  'items.cape_stealth.name': 'Плащ невидимости',
  'items.cape_stealth.description': 'Плащ, делающий носителя невидимым.',
  'items.cape_stealth.effect': 'Увеличивает скрытность.',

  // Magic Items - Artifacts
  'items.crown_kings.name': 'Корона королей',
  'items.crown_kings.description': 'Корона, символизирующая королевство.',
  'items.crown_kings.effect': 'Увеличивает репутацию.',
  'items.orb_knowledge.name': 'Орб знаний',
  'items.orb_knowledge.description': 'Орб, увеличивающий знания.',
  'items.staff_archmage.name': 'Посох архимага',
  'items.staff_archmage.description': 'Посох, позволяющий применять заклинания.',
  'items.staff_archmage.effect': 'Увеличивает силу заклинаний.',

  // Magic Items - Temporal
  'items.temporal_anchor.name': 'Временная якорь',
  'items.temporal_anchor.description': 'Якорь, позволяющий путешествовать во времени.',
  'items.temporal_anchor.effect': 'Позволяет путешествовать во времени.',
  'items.temporal_prism.name': 'Временной призм',
  'items.temporal_prism.description': 'Призма, позволяющая манипулировать временем.',
  'items.temporal_prism.effect': 'Позволяет манипулировать временем.',
  'items.temporal_hourglass.name': 'Временной песочные часы',
  'items.temporal_hourglass.description': 'Песочные часы, позволяющие контролировать время.',
  'items.temporal_hourglass.effect': 'Позволяет контролировать время.',
  'items.temporal_compass.name': 'Временной компас',
  'items.temporal_compass.description': 'Компас, позволяющий навигацию во времени.',
  'items.temporal_compass.effect': 'Позволяет навигацию во времени.',

  // Magic Items - Consumables
  'items.potion_health.name': 'Зелье здоровья',
  'items.potion_health.description': 'Зелье, восстанавливающее здоровье.',
  'items.potion_health.effect': 'Восстанавливает здоровье.',
  'items.potion_mana.name': 'Зелье маны',
  'items.potion_mana.description': 'Зелье, восстанавливающее ману.',
  'items.scroll_teleport.name': 'Свиток телепортации',
  'items.scroll_teleport.description': 'Свиток, позволяющий телепортироваться.',
  'items.scroll_teleport.effect': 'Позволяет телепортироваться.',
  'items.elixir_experience.name': 'Эликсир опыта',
  'items.elixir_experience.description': 'Эликсир, увеличивающий опыт.',

  // Magic Items - Resources
  'items.gold_pile.name': 'Куча золота',
  'items.gold_pile.description': 'Куча золота, которая может быть использована для покупки предметов.',
  'items.gold_chest.name': 'Золотой сундук',
  'items.gold_chest.description': 'Золотой сундук, который может содержать много золота.',
  'items.gold_vault.name': 'Золотой сейф',
  'items.gold_vault.description': 'Очень надежный золотой сейф.',

  // Scenario Selection
  selectScenario: 'Выберите сценарий',
  chooseYourAdventure: 'Выберите свою приключение',
  noScenariosAvailable: 'Сценариев нет',
  initializeScenarios: 'Инициализировать сценарии',
  category: 'Категория',
  allScenarios: 'Все сценарии',
  singlePlayer: 'Одиночная игра',
  multiplayer: 'Мультиплеер',
  campaign: 'Кампания',
  difficulty: 'Сложность',
  allDifficulties: 'Все сложности',
  beginner: 'Начинающий',
  intermediate: 'Средний',
  expert: 'Эксперт',
  mapSize: 'Размер карты',
  players: 'Игроки',
  duration: 'Продолжительность',
  objectives: 'Цели',
  allObjectives: 'Все цели',
  rewards: 'Награды',
  startScenario: 'Начать сценарий',
  scenarioLocked: 'Заблокировано',
  
  // New keys for multiplayer arena and buttons
  multiplayerArenaDescription: 'Игра в стратегию с несколькими игроками, где вы можете сражаться с другими игроками в реальном времени или по очереди.',
  rankedMatches: 'Матчи с рейтингом',
  playersRange: 'Количество игроков (2-8)',
  realTimeStrategy: 'Стратегия в реальном времени',
  competitive: 'Конкурентный',
  startGame: 'Начать игру',
  


  // Campaign scenario
  epicCampaign: 'Эпическая кампания',
  epicCampaignDescription: 'Кампания, предлагающая более погруженный и богатый по опыту игровой процесс.',
  storyDrivenGameplay: 'Игровой процесс, управляемый историей',
  characterDevelopment: 'Развитие персонажа',
  unlockableContent: 'Неразблокируемый контент',
  multipleEndings: 'Несколько возможных концов',
  cinematicCutscenes: 'Кинематографические катсцены',
  saveProgress: 'Сохранить прогресс',

  // Scenario selector UI
  availableAdventures: 'Доступные приключения',
  details: 'Детали',
  comingSoon: 'Скоро доступно',

  // Backend Scenario Names and Descriptions
  'scenarios.conquest-classic.name': 'Классическое Завоевание',
  'scenarios.conquest-classic.description': 'Традиционный сценарий завоевания, где игроки должны уничтожить всех врагов или захватить их главные города.',
  'scenarios.temporal-rift.name': 'Временной Разлом',
  'scenarios.temporal-rift.description': 'Таинственный разлом во времени угрожает разорвать реальность. Герои должны пройти через временные зоны, чтобы восстановить равновесие.',
  'scenarios.multiplayer-arena.name': 'Многопользовательская Арена',
  'scenarios.multiplayer-arena.description': 'Быстрый многопользовательский бой, где игроки соревнуются на меньшей арене для быстрых матчей.',
  'scenarios.dragon-campaign.name': 'Кампания Дракона',
  'scenarios.dragon-campaign.description': 'Столкнитесь с древними повелителями драконов в этой эпической кампании. Завершите другие сценарии, чтобы разблокировать.',
  'scenarios.economic-race.name': 'Экономическая Гонка',
  'scenarios.economic-race.description': 'Мирное экономическое соревнование, где игроки соревнуются за накопление ресурсов и строительство самого процветающего королевства.',
  'scenarios.artifact-hunt.name': 'Охота за Артефактами',
  'scenarios.artifact-hunt.description': 'Сценарий охоты за сокровищами, где игроки ищут мощные артефакты, разбросанные по карте.',
  'scenarios.survival.name': 'Последний Рубеж',
  'scenarios.survival.description': 'Выживайте против волн все более мощных врагов, защищая свою крепость.',

  // Scenario Features
  'features.backend-loaded': 'Загружено с Backend',
  'features.dynamic-content': 'Динамический Контент',
  'features.real-time-data': 'Данные в Реальном Времени',
  'features.epic-campaign': 'Эпическая Кампания',
  'features.dragon-lords': 'Повелители Драконов',
  'features.ultimate-challenge': 'Высший Вызов',
  'features.balanced-gameplay': 'Сбалансированный Геймплей',
  'features.all-castles': 'Все Замки',
  'features.standard-victory': 'Стандартная Победа',

  // Castle Management
  overview: 'Обзор',
  buildings: 'Здания',
  recruitment: 'Набор',
  upgrades: 'Улучшения',
  dailyIncome: 'Ежедневный доход',
  castleSpecialty: 'Специализация замка',
  garrison: 'Гарнизон',
  currentBuildings: 'Текущие здания',
  availableBuildings: 'Доступные здания',
  construct: 'Строить',
  upgrade: 'Улучшать',
  recruitUnits: 'Набирать войска',
  available: 'Доступно',
  castleUpgrades: 'Улучшения замка',
  castleWalls: 'Стены замка',
  improvesCastleDefense: 'Улучшает защиту замка',
  magicGuild: 'Магическая гильдия',
  unlocksPowerfulSpells: 'Разблокирует сильные заклинания',

  // Demo System
  demonstrations: 'Демонстрации',
  demoDescription: 'Откройте для себя Heroes of Time с нашими автоматическими демонстрациями',
  soloDemo: 'Демо Соло',
  soloDemoDescription: 'Выбирает сценарий, выбирает героя и автоматически играет полный ход',
  multiplayerDemo: 'Демо Мультиплеер',
  multiplayerDemoDescription: '2 экрана рядом показывают синхронизированную игру мультиплеер с созданием сессии и геймплеем',
  quickDemo: 'Быстрая Демо',
  quickDemoDescription: 'Быстрый обзор основных функций без видимого браузера',
  launchDemo: 'Запустить Демо',
  launchSoloDemo: 'Запустить демонстрацию соло? Браузер откроется, чтобы показать автоматический геймплей.',
  launchMultiplayerDemo: 'Запустить демонстрацию мультиплеер? Два браузера откроются рядом, чтобы показать сетевую игру.',
  launchQuickDemo: 'Запустить быструю демонстрацию? Автоматические фоновые тесты.',
  demoNote: 'Демонстрации используют автоматизированные браузеры для показа геймплея без ручного вмешательства.',

  // Demo Tooltips
  'demo.welcome': '🏠 Добро пожаловать в Heroes of Time!<br/>Я покажу вам, как играть в эту игру...',
  'demo.loadingScenarios': '📊 Загрузка доступных сценариев...<br/>Пожалуйста, подождите, пока я получаю миссии',
  'demo.selectScenario': '🎯 Я выбираю сценарий "Classic Conquest"<br/>Вас ждет эпическое приключение!',
  'demo.launchGame': '▶️ Нажмите кнопку "Играть"!<br/>Приключение начинается сейчас...',
  'demo.gameInitialization': '🎮 Инициализация игры...<br/>Создание карты и героев в процессе',
  'demo.gameInterface': '🖥️ Игровой интерфейс загружен!<br/>Вот ваше королевство для завоевания',
  'demo.controlButtons': '🎮 Тестирование кнопок управления - Герои, Инвентарь, Замок',
  'demo.heroesPanel': '⚔️ Панель героев открыта! Здесь вы можете увидеть своих героев.',
  'demo.inventoryPanel': '🎒 Панель инвентаря открыта! Управляйте экипированными предметами.',
  'demo.castlePanel': '🏰 Панель замка открыта! Стройте и управляйте своими замками.',
  'demo.endTurn': '🔄 Завершение хода - Нажмите "End Turn" для завершения.',
  'demo.nextTurn': '🔄 Следующий ход в процессе<br/>Ваше королевство развивается и растет!',
  'demo.finished': '🎉 Демонстрация завершена!<br/>Теперь вы знаете, как играть в Heroes of Time<br/><br/>✨ Удачи в ваших завоеваниях! ✨',

  // Hero movement
  clickHeroToSelect: 'Нажмите на героя, чтобы выбрать его',
  clickTileToMove: 'Нажмите на зеленую клетку, чтобы переместить вашего героя',
  heroSelected: 'Герой выбран',
  heroMoved: 'Герой успешно перемещен',
  notEnoughMovement: 'Недостаточно очков передвижения',
  cannotMoveHere: 'Невозможно переместиться сюда',
  movementPoints: 'Очки передвижения',
  
  // Hero actions
  heroStats: 'Статистика героя',
  noHeroSelected: 'Герой не выбран',
  selectHeroPrompt: 'Выберите героя, чтобы увидеть его статистику и составить план действий',
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

  // Ensure translations object is up-to-date with latest keys every time the hook mounts
  React.useEffect(() => {
    setLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return {
    language,
    setLanguage,
    t,
    isEnglish: language === 'en',
    isFrench: language === 'fr',
    isRussian: language === 'ru',
  };
}; 