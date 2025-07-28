// Utilitaire pour les traductions dans les tests de démonstration
export const getTooltipText = (key: string, language?: string) => {
  // Si aucune langue n'est spécifiée, essayer de lire depuis le localStorage
  if (!language) {
    try {
      const storedI18n = localStorage.getItem('heroes-reforged-i18n');
      if (storedI18n) {
        const parsed = JSON.parse(storedI18n);
        language = parsed.state?.language || 'fr';
      } else {
        language = 'fr'; // Langue par défaut
      }
    } catch (error) {
      language = 'fr'; // Langue par défaut en cas d'erreur
    }
  }
  
  const translations: Record<string, Record<string, string>> = {
    fr: {
      // Demo solo
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
      
      // Demo multijoueur
      'demo.multiplayer.welcome': '🏠 Bienvenue dans Heroes of Time - Mode Multijoueur !<br/>Je vais vous montrer comment créer une partie multijoueur...',
      'demo.multiplayer.loadingScenarios': '📊 Chargement des scénarios multijoueur...<br/>Veuillez patienter pendant que je récupère les missions',
      'demo.multiplayer.selectScenario': '🎯 Je choisis le scénario "Multiplayer Arena"<br/>Une bataille épique entre joueurs !',
      'demo.multiplayer.launchGame': '▶️ Clic sur le bouton "Jouer" !<br/>La bataille multijoueur commence...',
      'demo.multiplayer.gameInitialization': '🎮 Initialisation de la partie multijoueur...<br/>Création de la carte et connexion des joueurs',
      'demo.multiplayer.gameInterface': '🖥️ Interface multijoueur chargée !<br/>Voici votre royaume à défendre contre les autres joueurs',
      'demo.multiplayer.controlButtons': '🎮 Test des boutons de contrôle multijoueur - Heroes, Inventory, Castle',
      'demo.multiplayer.heroesPanel': '⚔️ Panneau Heroes multijoueur ! Gérez vos héros pour la bataille.',
      'demo.multiplayer.inventoryPanel': '🎒 Panneau Inventory multijoueur ! Équipez vos héros pour le combat.',
      'demo.multiplayer.castlePanel': '🏰 Panneau Castle multijoueur ! Fortifiez votre position.',
      'demo.multiplayer.endTurn': '🔄 Fin du tour multijoueur - Cliquez sur "End Turn" pour passer au joueur suivant.',
      'demo.multiplayer.nextTurn': '🔄 Tour du joueur suivant<br/>La bataille multijoueur continue !',
      'demo.multiplayer.finished': '🎉 Démonstration multijoueur terminée !<br/>Vous savez maintenant jouer en multijoueur<br/><br/>✨ Affrontez vos amis dans des batailles épiques ! ✨'
    },
    en: {
      // Demo solo
      'demo.welcome': '🏠 Welcome to Heroes of Time!<br/>I will show you how to play a game...',
      'demo.loadingScenarios': '📊 Loading available scenarios...<br/>Please wait while I retrieve the missions',
      'demo.selectScenario': '🎯 I choose the "Classic Conquest" scenario<br/>An epic adventure awaits you!',
      'demo.launchGame': '▶️ Click the "Play" button!<br/>The adventure begins now...',
      'demo.gameInitialization': '🎮 Initializing the game...<br/>Creating map and heroes in progress',
      'demo.gameInterface': '🖥️ Game interface loaded!<br/>Here is your kingdom to conquer',
      'demo.controlButtons': '🎮 Testing control buttons - Heroes, Inventory, Castle',
      'demo.heroesPanel': '⚔️ Heroes panel opened! You can see your heroes here.',
      'demo.inventoryPanel': '🎒 Inventory panel opened! Manage your equipped items.',
      'demo.castlePanel': '🏰 Castle panel opened! Build and manage your castles.',
      'demo.endTurn': '🔄 End turn - Click "End Turn" to finish.',
      'demo.nextTurn': '🔄 Next turn in progress<br/>Your kingdom evolves and grows!',
      'demo.finished': '🎉 Demonstration completed!<br/>You now know how to play Heroes of Time<br/><br/>✨ Have fun in your conquests! ✨',
      
      // Demo multijoueur
      'demo.multiplayer.welcome': '🏠 Welcome to Heroes of Time - Multiplayer Mode!<br/>I will show you how to create a multiplayer game...',
      'demo.multiplayer.loadingScenarios': '📊 Loading multiplayer scenarios...<br/>Please wait while I retrieve the missions',
      'demo.multiplayer.selectScenario': '🎯 I choose the "Multiplayer Arena" scenario<br/>An epic battle between players!',
      'demo.multiplayer.launchGame': '▶️ Click the "Play" button!<br/>The multiplayer battle begins...',
      'demo.multiplayer.gameInitialization': '🎮 Initializing multiplayer game...<br/>Creating map and connecting players',
      'demo.multiplayer.gameInterface': '🖥️ Multiplayer interface loaded!<br/>Here is your kingdom to defend against other players',
      'demo.multiplayer.controlButtons': '🎮 Testing multiplayer control buttons - Heroes, Inventory, Castle',
      'demo.multiplayer.heroesPanel': '⚔️ Multiplayer Heroes panel! Manage your heroes for battle.',
      'demo.multiplayer.inventoryPanel': '🎒 Multiplayer Inventory panel! Equip your heroes for combat.',
      'demo.multiplayer.castlePanel': '🏰 Multiplayer Castle panel! Fortify your position.',
      'demo.multiplayer.endTurn': '🔄 End multiplayer turn - Click "End Turn" to pass to the next player.',
      'demo.multiplayer.nextTurn': '🔄 Next player\'s turn<br/>The multiplayer battle continues!',
      'demo.multiplayer.finished': '🎉 Multiplayer demonstration completed!<br/>You now know how to play multiplayer<br/><br/>✨ Challenge your friends in epic battles! ✨'
    },
    ru: {
      // Demo solo
      'demo.welcome': '🏠 Добро пожаловать в Heroes of Time!<br/>Я покажу вам, как играть в игру...',
      'demo.loadingScenarios': '📊 Загрузка доступных сценариев...<br/>Пожалуйста, подождите, пока я получу миссии',
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
      
      // Demo multijoueur
      'demo.multiplayer.welcome': '🏠 Добро пожаловать в Heroes of Time - Режим Мультиплеер!<br/>Я покажу вам, как создать многопользовательскую игру...',
      'demo.multiplayer.loadingScenarios': '📊 Загрузка многопользовательских сценариев...<br/>Пожалуйста, подождите, пока я получу миссии',
      'demo.multiplayer.selectScenario': '🎯 Я выбираю сценарий "Multiplayer Arena"<br/>Эпическая битва между игроками!',
      'demo.multiplayer.launchGame': '▶️ Нажмите кнопку "Играть"!<br/>Многопользовательская битва начинается...',
      'demo.multiplayer.gameInitialization': '🎮 Инициализация многопользовательской игры...<br/>Создание карты и подключение игроков',
      'demo.multiplayer.gameInterface': '🖥️ Многопользовательский интерфейс загружен!<br/>Вот ваше королевство для защиты от других игроков',
      'demo.multiplayer.controlButtons': '🎮 Тестирование кнопок управления мультиплеером - Герои, Инвентарь, Замок',
      'demo.multiplayer.heroesPanel': '⚔️ Панель героев мультиплеера! Управляйте своими героями для битвы.',
      'demo.multiplayer.inventoryPanel': '🎒 Панель инвентаря мультиплеера! Экипируйте своих героев для боя.',
      'demo.multiplayer.castlePanel': '🏰 Панель замка мультиплеера! Укрепите свою позицию.',
      'demo.multiplayer.endTurn': '🔄 Завершение хода мультиплеера - Нажмите "End Turn", чтобы передать ход следующему игроку.',
      'demo.multiplayer.nextTurn': '🔄 Ход следующего игрока<br/>Многопользовательская битва продолжается!',
      'demo.multiplayer.finished': '🎉 Демонстрация мультиплеера завершена!<br/>Теперь вы знаете, как играть в мультиплеер<br/><br/>✨ Бросьте вызов своим друзьям в эпических битвах! ✨'
    }
  };
  
  return translations[language || 'fr']?.[key] || key;
};

// Fonction pour lire la langue depuis le localStorage côté navigateur
export const getStoredLanguage = () => {
  try {
    const storedI18n = localStorage.getItem('heroes-reforged-i18n');
    if (storedI18n) {
      const parsed = JSON.parse(storedI18n);
      return parsed.state?.language || 'fr';
    }
  } catch (error) {
    console.log('Erreur lors de la lecture de la langue:', error);
  }
  return 'fr';
}; 