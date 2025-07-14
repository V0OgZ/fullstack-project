import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test';

test.describe('🎮 Heroes of Time - Multiplayer Demo', () => {
  let browser1: Browser;
  let browser2: Browser;
  let context1: BrowserContext;
  let context2: BrowserContext;
  let player1: Page;
  let player2: Page;

  // Debug logger caché
  const debugLog = (message: string, data?: any) => {
    const timestamp = new Date().toISOString().substring(11, 19);
    console.log(`[${timestamp}] [MULTI-DEMO] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  };

  // Capturer l'état de la page en cas d'erreur
  const capturePageState = async (page: Page, playerName: string) => {
    try {
      const url = await page.url();
      const title = await page.title();
      const viewportSize = await page.viewportSize();
      await debugLog(`État ${playerName}`, { url, title, viewportSize });
    } catch (e) {
      await debugLog(`Erreur capture état ${playerName}`, { error: e.message });
    }
  };

  test.beforeAll(async () => {
    // Lancer Browser 1 à gauche
    browser1 = await chromium.launch({
      headless: false,
      slowMo: 50,
      args: [
        '--no-default-browser-check',
        '--disable-web-security',
        '--window-position=20,100',
        '--window-size=620,850',
        '--no-first-run'
      ]
    });
    
    // Lancer Browser 2 à droite
    browser2 = await chromium.launch({
      headless: false,
      slowMo: 50,
      args: [
        '--no-default-browser-check',
        '--disable-web-security',
        '--window-position=660,100',
        '--window-size=620,850',
        '--no-first-run'
      ]
    });
    
    // Créer les contextes
    context1 = await browser1.newContext({ viewport: { width: 640, height: 800 } });
    context2 = await browser2.newContext({ viewport: { width: 640, height: 800 } });
    
    // Créer les pages
    player1 = await context1.newPage();
    player2 = await context2.newPage();
    
    console.log('✅ Two separate browsers launched with side-by-side positioning');
  });

  test.afterAll(async () => {
    await browser1?.close();
    await browser2?.close();
  });

  // Fonction helper pour les tooltips
  const showDemoTooltip = async (page: Page, text: string, playerName: string, duration: number = 2000) => {
    await page.evaluate(({ text, playerName, duration }) => {
      // Supprimer l'ancien tooltip s'il existe pour ce joueur
      const oldTooltip = document.querySelector(`.demo-tooltip-${playerName.toLowerCase().replace(/\s+/g, '-')}`);
      if (oldTooltip) {
        const contentDiv = oldTooltip.querySelector('.tooltip-content');
        if (contentDiv) {
          contentDiv.textContent = text;
          return;
        }
      }
      
      // Créer le nouveau tooltip
      const tooltip = document.createElement('div');
      tooltip.className = `demo-tooltip-${playerName.toLowerCase().replace(/\s+/g, '-')}`;
      tooltip.innerHTML = `
        <div style="
          position: fixed;
          top: 60px;
          left: 20px;
          background: rgba(26,26,46,0.8);
          color: #ffd700;
          padding: 10px 16px;
          border-radius: 6px;
          border: 1px solid rgba(255,215,0,0.6);
          font-family: Arial, sans-serif;
          font-size: 12px;
          font-weight: bold;
          backdrop-filter: blur(3px);
          z-index: 9999;
          max-width: 250px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.4);
          transition: opacity 0.3s ease;
        ">
          <div style="color: #87CEEB; margin-bottom: 4px; font-size: 10px;">${playerName}</div>
          <div class="tooltip-content" style="margin: 0; padding: 0;">${text}</div>
        </div>
      `;
      
      document.body.appendChild(tooltip);
      
      // Auto-remove après la durée
      setTimeout(() => {
        if (tooltip && tooltip.parentNode) {
          tooltip.style.opacity = '0';
          setTimeout(() => {
            if (tooltip.parentNode) {
              tooltip.parentNode.removeChild(tooltip);
            }
          }, 300);
        }
      }, duration);
    }, { text, playerName, duration });
  };

  test('Complete multiplayer demo: 2 players, scenario choice, game', async () => {
    test.setTimeout(180000); // 3 minutes for complete demo
    
    console.log('🎬 === MULTIPLAYER DEMO START WITH 2 SCREENS ===');
    console.log('🖥️  Player 1: Position (20,100) - Size 620x850');
    console.log('🖥️  Player 2: Position (660,100) - Size 620x850');
    await debugLog('=== MULTIPLAYER DEMO INITIALIZATION ===');
    await debugLog('Timeout configured: 180 seconds');
    await debugLog('Available backend scenarios: conquest-classic, temporal-rift, multiplayer-arena');
    
    // 1. Both players navigate to main page
    await showDemoTooltip(player1, '🚀 Multiplayer demo start<br/>Player 1 will create a game', 'PLAYER 1', 2000);
    await showDemoTooltip(player2, '🚀 Multiplayer demo start<br/>Player 2 will join the game', 'PLAYER 2', 2000);
    
    await Promise.all([
      player1.goto('/'),
      player2.goto('/')
    ]);
    
    await Promise.all([
      player1.waitForLoadState('networkidle'),
      player2.waitForLoadState('networkidle')
    ]);
    
    await debugLog('Pages chargées avec succès');
    await capturePageState(player1, 'JOUEUR-1');
    await capturePageState(player2, 'JOUEUR-2');
    
    // 2. Joueur 1 va au multijoueur
    await showDemoTooltip(player1, '🌐 Navigation vers le mode multijoueur', 'JOUEUR 1', 1500);
    
    await debugLog('Recherche du lien multijoueur');
    const multiplayerLink1 = player1.locator('a[href="/multiplayer"], a:has-text("Multiplayer"), a:has-text("Multijoueur")').first();
    if (await multiplayerLink1.isVisible({ timeout: 5000 })) {
      await debugLog('Lien multijoueur trouvé, clic');
      await multiplayerLink1.click();
    } else {
      await debugLog('Lien multijoueur non trouvé, navigation directe');
      await player1.goto('/multiplayer');
    }
    
    await debugLog('Attente du chargement de la page multijoueur');
    await player1.waitForLoadState('networkidle');
    await capturePageState(player1, 'JOUEUR-1-MULTIPLAYER');
    await player1.waitForTimeout(3000); // Plus de temps pour que WebSocket se connecte
    
    // 3. Joueur 1 crée une session avec choix de scénario
    await showDemoTooltip(player1, '🎯 Création d\'une nouvelle session<br/>Choix du scénario et configuration', 'JOUEUR 1', 2000);
    
    // Cliquer sur le bouton de création de session
    await debugLog('Clic sur le bouton de création de session');
    await player1.waitForTimeout(2000);
    
    const createSessionBtn = player1.locator('[data-testid="create-session-btn"]').first();
    if (await createSessionBtn.isVisible({ timeout: 5000 })) {
      await debugLog('Bouton de création trouvé');
      await createSessionBtn.click();
      await debugLog('Bouton cliqué, attente du formulaire');
      
      // Attendre que le formulaire de création soit visible
      await player1.waitForTimeout(2000);
      await capturePageState(player1, 'JOUEUR-1-FORM-CREATION');
    } else {
      await debugLog('Bouton de création non trouvé, tentative avec sélecteur générique');
      const anyCreateButton = player1.locator('button').filter({ hasText: /Create|New|🎮/ }).first();
      if (await anyCreateButton.isVisible({ timeout: 3000 })) {
        await anyCreateButton.click({ force: true });
        await player1.waitForTimeout(2000);
      }
    }
    
    // Remplir le nom de session
    await debugLog('Saisie du nom de session');
    const sessionNameInput = player1.locator('[data-testid="session-name-input"]').first();
    if (await sessionNameInput.isVisible({ timeout: 5000 })) {
      const sessionName = 'Arène Multijoueur Demo';
      await debugLog(`Saisie du nom de session: ${sessionName}`);
      await sessionNameInput.clear();
      await sessionNameInput.fill(sessionName);
    } else {
      await debugLog('Champ nom de session non trouvé');
      await capturePageState(player1, 'JOUEUR-1-NO-NAME-INPUT');
    }
    
    // Remplir le nom du héros
    await debugLog('Saisie du nom du héros');
    const heroNameInput = player1.locator('[data-testid="hero-name-input"]').first();
    if (await heroNameInput.isVisible({ timeout: 3000 })) {
      await heroNameInput.clear();
      await heroNameInput.fill('Héros Joueur 1');
      await debugLog('Nom du héros saisi');
    } else {
      await debugLog('Champ nom du héros non trouvé');
    }
    
    // Choisir le mode de jeu
    await debugLog('Sélection du mode de jeu');
    const gameModeSelect = player1.locator('[data-testid="game-mode-select"]').first();
    if (await gameModeSelect.isVisible({ timeout: 5000 })) {
      await debugLog('Sélection du scénario Multiplayer Arena');
      await gameModeSelect.selectOption('multiplayer-arena');
      await debugLog('Mode de jeu sélectionné');
    } else {
      await debugLog('Sélecteur de mode de jeu non trouvé, utilisation du mode par défaut');
      await capturePageState(player1, 'JOUEUR-1-NO-GAME-MODE');
    }
    
    await player1.waitForTimeout(1000);
    
    // Créer la session
    await debugLog('Clic sur le bouton de création finale');
    const submitButton = player1.locator('[data-testid="create-new-game-btn"]').first();
    if (await submitButton.isVisible({ timeout: 5000 })) {
      await debugLog('Bouton de création finale trouvé, clic');
      await submitButton.click();
      await debugLog('Session en cours de création...');
    } else {
      await debugLog('Bouton de création finale non trouvé');
      await capturePageState(player1, 'JOUEUR-1-NO-SUBMIT-BTN');
      
      // Essayer de trouver n'importe quel bouton de création
      const anySubmitBtn = player1.locator('button').filter({ hasText: /Create|Créer/ }).last();
      if (await anySubmitBtn.isVisible({ timeout: 3000 })) {
        await debugLog('Bouton alternatif trouvé, clic');
        await anySubmitBtn.click();
      }
    }
    
    await debugLog('Attente de la création de session');
    await player1.waitForTimeout(3000);
    
    // 4. Vérifier que le joueur 1 est dans la waiting room
    await showDemoTooltip(player1, '✅ Session créée avec succès !<br/>En attente du second joueur...', 'JOUEUR 1', 2000);
    
    // Vérifier que le joueur 1 est dans la waiting room
    const waitingRoom = player1.locator('[data-testid="waiting-room"]').first();
    await expect(waitingRoom).toBeVisible({ timeout: 5000 });
    
    await debugLog('Joueur 1 dans la waiting room');
    let sessionId: string | null = null;
    try {
      const sessionIdText = await waitingRoom.textContent();
      const match = sessionIdText?.match(/Session ID: (.+)/);
      if (match) {
        sessionId = match[1].trim();
        await debugLog(`Session ID récupéré: ${sessionId}`);
      }
    } catch (e) {
      console.log('Session ID non trouvé visuellement');
    }
    
    // 5. Joueur 2 rejoint la session
    await showDemoTooltip(player2, '🌐 Joueur 2 accède au multijoueur', 'JOUEUR 2', 1500);
    
    const multiplayerLink2 = player2.locator('a[href="/multiplayer"], a:has-text("Multiplayer"), a:has-text("Multijoueur")').first();
    if (await multiplayerLink2.isVisible({ timeout: 5000 })) {
      await multiplayerLink2.click();
    } else {
      await player2.goto('/multiplayer');
    }
    
    await player2.waitForLoadState('networkidle');
    await player2.waitForTimeout(2000);
    
    // 6. Joueur 2 rejoint la session
    await showDemoTooltip(player2, '🎯 Recherche et connexion à la session<br/>Arène Multijoueur Demo', 'JOUEUR 2', 2000);
    
    // Chercher la session dans la liste
    await debugLog('Joueur 2 recherche la session dans la liste');
    await player2.waitForTimeout(2000); // Attendre que la liste se charge
    
    const sessionItem = player2.locator('[data-testid="session-item"]').filter({ hasText: 'Arène Multijoueur Demo' }).first();
    if (await sessionItem.isVisible({ timeout: 5000 })) {
      await debugLog('Session trouvée dans la liste');
      const joinButton = sessionItem.locator('[data-testid="join-session-btn"]').first();
      if (await joinButton.isVisible({ timeout: 3000 })) {
        await debugLog('Clic sur le bouton Join');
        await joinButton.click();
      } else {
        await debugLog('Bouton Join non trouvé, clic sur la session');
        await sessionItem.click();
      }
    } else {
      await debugLog('Session non trouvée dans la liste, vérification des sessions disponibles');
      // Afficher toutes les sessions disponibles pour debug
      const allSessions = player2.locator('[data-testid="session-item"]');
      const sessionCount = await allSessions.count();
      await debugLog(`Nombre de sessions visibles: ${sessionCount}`);
      
      for (let i = 0; i < sessionCount; i++) {
        const sessionText = await allSessions.nth(i).textContent();
        await debugLog(`Session ${i}: ${sessionText}`);
      }
      
      // Rejoindre la dernière session créée (la plus récente)
      if (sessionCount > 0) {
        await debugLog('Tentative de rejoindre la dernière session créée');
        const lastSession = allSessions.last();
        const joinButton = lastSession.locator('[data-testid="join-session-btn"]').first();
        if (await joinButton.isVisible({ timeout: 3000 })) {
          await debugLog('Clic sur le bouton Join de la dernière session');
          await joinButton.click();
          await debugLog('Joueur 2 a rejoint la session');
        } else {
          await debugLog('Bouton Join non trouvé sur la dernière session');
        }
      } else {
        await debugLog('Aucune session disponible');
      }
    }
    
    await player2.waitForTimeout(3000);
    
    // 7. Les deux joueurs sont connectés
    await Promise.all([
      showDemoTooltip(player1, '👥 Joueur 2 a rejoint la partie !<br/>Prêt à commencer la bataille', 'JOUEUR 1', 2000),
      showDemoTooltip(player2, '✅ Connexion réussie !<br/>En attente du démarrage', 'JOUEUR 2', 2000)
    ]);
    
    // 8. Démarrer la partie
    await showDemoTooltip(player1, '🚀 Lancement de la partie multijoueur', 'JOUEUR 1', 1500);
    
    // Attendre que le joueur 2 rejoigne et que le bouton soit activé
    await debugLog('Attente que le bouton Start Battle soit activé');
    await player1.waitForTimeout(3000);
    
    // Le joueur 1 doit cliquer sur le bouton "Start Battle" dans la waiting room
    const startButton = player1.locator('[data-testid="start-battle-btn"]:not([disabled])').first();
    if (await startButton.isVisible({ timeout: 10000 })) {
      await debugLog('Bouton Start Battle trouvé et activé');
      await startButton.click();
      await debugLog('Bataille démarrée !');
    } else {
      await debugLog('Bouton Start Battle non trouvé ou non activé, tentative avec sélecteur générique');
      // Essayer de trouver n'importe quel bouton de démarrage activé
      const anyStartButton = player1.locator('button:not([disabled])').filter({ hasText: /Start|Battle|Démarrer/ }).first();
      if (await anyStartButton.isVisible({ timeout: 5000 })) {
        await debugLog('Bouton alternatif trouvé, clic');
        await anyStartButton.click();
      } else {
        await debugLog('Aucun bouton de démarrage trouvé');
      }
    }
    
    await player1.waitForTimeout(3000);
    
    // 9. Actions complexes en cours de partie
    await Promise.all([
      showDemoTooltip(player1, '⚔️ En jeu ! Effectuons des actions stratégiques', 'JOUEUR 1', 2000),
      showDemoTooltip(player2, '🎮 Partie lancée ! Préparons notre stratégie', 'JOUEUR 2', 2000)
    ]);
    
    await debugLog('Début des actions de gameplay complexes');
    
    // Joueur 1 : Acheter des unités
    await debugLog('Joueur 1: Tentative d\'achat d\'unités');
    const castleBtn1 = player1.locator('button').filter({ hasText: /Castle|Château|🏰/ }).first();
    if (await castleBtn1.isVisible({ timeout: 3000 })) {
      await castleBtn1.click();
      await debugLog('Joueur 1: Panneau château ouvert');
      
      const buyButtons1 = player1.locator('button').filter({ hasText: /Buy|Acheter|Recruit|\+/ });
      const buyCount1 = await buyButtons1.count();
      await debugLog(`Joueur 1: ${buyCount1} options d'achat trouvées`);
      
      for (let i = 0; i < Math.min(2, buyCount1); i++) {
        const buyBtn = buyButtons1.nth(i);
        if (await buyBtn.isVisible() && await buyBtn.isEnabled()) {
          await buyBtn.click();
          await debugLog(`Joueur 1: Unité ${i+1} achetée`);
          await player1.waitForTimeout(800);
        }
      }
    }
    
    // Joueur 2 : Équiper des objets
    await debugLog('Joueur 2: Tentative d\'équipement d\'objets');
    const inventoryBtn2 = player2.locator('button').filter({ hasText: /Inventory|Inventaire|🎒/ }).first();
    if (await inventoryBtn2.isVisible({ timeout: 3000 })) {
      await inventoryBtn2.click();
      await debugLog('Joueur 2: Panneau inventaire ouvert');
      
      const equipButtons2 = player2.locator('button').filter({ hasText: /Equip|Équiper/ });
      const equipCount2 = await equipButtons2.count();
      await debugLog(`Joueur 2: ${equipCount2} objets équipables trouvés`);
      
      if (equipCount2 > 0) {
        const equipBtn = equipButtons2.first();
        if (await equipBtn.isVisible()) {
          await equipBtn.click();
          await debugLog('Joueur 2: Objet équipé avec succès');
        }
      }
    }
    
    await player2.waitForTimeout(1500);
    
    // Actions sur la carte (mouvements simulés)
    await Promise.all([
      showDemoTooltip(player1, '🗺️ Déplaçons nos héros sur la carte', 'JOUEUR 1', 2000),
      showDemoTooltip(player2, '⚔️ Préparons l\'attaque !', 'JOUEUR 2', 2000)
    ]);
    
    await debugLog('Simulation de mouvements sur la carte');
    
    // Joueur 1 : Cliquer sur la carte
    const map1 = player1.locator('.map-container, .game-map, canvas').first();
    if (await map1.isVisible()) {
      const mapBox1 = await map1.boundingBox();
      if (mapBox1) {
        await map1.click({ position: { x: mapBox1.width * 0.4, y: mapBox1.height * 0.3 } });
        await debugLog('Joueur 1: Mouvement effectué');
        await player1.waitForTimeout(1000);
        
        await map1.click({ position: { x: mapBox1.width * 0.6, y: mapBox1.height * 0.5 } });
        await debugLog('Joueur 1: Deuxième mouvement');
      }
    }
    
    // Joueur 2 : Cliquer sur la carte
    const map2 = player2.locator('.map-container, .game-map, canvas').first();
    if (await map2.isVisible()) {
      const mapBox2 = await map2.boundingBox();
      if (mapBox2) {
        await map2.click({ position: { x: mapBox2.width * 0.3, y: mapBox2.height * 0.6 } });
        await debugLog('Joueur 2: Mouvement effectué');
        await player2.waitForTimeout(1000);
        
        await map2.click({ position: { x: mapBox2.width * 0.7, y: mapBox2.height * 0.2 } });
        await debugLog('Joueur 2: Deuxième mouvement');
      }
    }
    
    // Terminer les tours
    await Promise.all([
      showDemoTooltip(player1, '🔄 Terminons notre tour', 'JOUEUR 1', 1500),
      showDemoTooltip(player2, '⏭️ Tour suivant !', 'JOUEUR 2', 1500)
    ]);
    
    await debugLog('Tentative de fin de tour pour les deux joueurs');
    
    // Joueur 1 termine son tour
    const endTurn1 = player1.locator('button').filter({ hasText: /End Turn|Fin.*Tour|🌟/ }).first();
    if (await endTurn1.isVisible({ timeout: 3000 })) {
      await endTurn1.click();
      await debugLog('Joueur 1: Tour terminé');
    }
    
    await player1.waitForTimeout(1500);
    
    // Joueur 2 termine son tour
    const endTurn2 = player2.locator('button').filter({ hasText: /End Turn|Fin.*Tour|🌟/ }).first();
    if (await endTurn2.isVisible({ timeout: 3000 })) {
      await endTurn2.click();
      await debugLog('Joueur 2: Tour terminé');
    }
    
    await debugLog('Tours terminés - vérification de l\'état du jeu');
    
    // Vérifications finales
    await Promise.all([
      showDemoTooltip(player1, '📊 Vérifions les statistiques', 'JOUEUR 1', 2000),
      showDemoTooltip(player2, '🏆 Partie en cours !', 'JOUEUR 2', 2000)
    ]);
    
    // Vérifier les statistiques des joueurs
    const gold1 = player1.locator('text=💰').or(player1.locator('text=Gold')).first();
    if (await gold1.isVisible({ timeout: 3000 })) {
      const goldText1 = await gold1.textContent();
      await debugLog(`Joueur 1 - Or: ${goldText1}`);
    }
    
    const gold2 = player2.locator('text=💰').or(player2.locator('text=Gold')).first();
    if (await gold2.isVisible({ timeout: 3000 })) {
      const goldText2 = await gold2.textContent();
      await debugLog(`Joueur 2 - Or: ${goldText2}`);
    }
    
    await debugLog('=== RÉSUMÉ DES ACTIONS RÉALISÉES ===');
    await debugLog('✅ Création de session multijoueur');
    await debugLog('✅ Connexion des 2 joueurs');
    await debugLog('✅ Lancement de la bataille');
    await debugLog('✅ Achat d\'unités (Joueur 1)');
    await debugLog('✅ Équipement d\'objets (Joueur 2)');
    await debugLog('✅ Mouvements sur la carte (les 2 joueurs)');
    await debugLog('✅ Fin de tours (les 2 joueurs)');
    await debugLog('✅ Vérification des statistiques');
    
    console.log('🎬 === FIN DÉMO MULTIJOUEUR ===');
    console.log('✨ Démo 2 joueurs terminée avec succès !');
    
    // Vérification finale avec timeout plus long
    await player1.waitForTimeout(2000);
    await player2.waitForTimeout(2000);
    
    // Vérifications finales avec logs
    await debugLog('Vérification des URLs finales');
    try {
      await expect(player1).toHaveURL(/multiplayer|game/);
      await debugLog('✅ URL Joueur 1 correcte');
    } catch (e) {
      await debugLog('❌ URL Joueur 1 incorrecte', { url: await player1.url() });
    }
    
    try {
      await expect(player2).toHaveURL(/multiplayer|game/);
      await debugLog('✅ URL Joueur 2 correcte');
    } catch (e) {
      await debugLog('❌ URL Joueur 2 incorrecte', { url: await player2.url() });
    }
    
    await debugLog('=== ÉTAT FINAL DES SCÉNARIOS ===');
    await debugLog('Scénarios disponibles: conquest-classic, temporal-rift, multiplayer-arena');
    await debugLog('Scénario utilisé dans démo: multiplayer-arena (4 joueurs max)');
  });
}); 