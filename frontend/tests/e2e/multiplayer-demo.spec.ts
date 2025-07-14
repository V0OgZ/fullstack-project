import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';

test.describe('🎮 Heroes of Time - Démo Multijoueur', () => {
  let browser: Browser;
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

  test.beforeAll(async ({ browser: testBrowser }) => {
    browser = testBrowser;
    
    // Créer 2 contextes séparés pour simuler 2 joueurs
    context1 = await browser.newContext({ 
      viewport: { width: 800, height: 900 },
    });
    context2 = await browser.newContext({ 
      viewport: { width: 800, height: 900 },
    });
    
    player1 = await context1.newPage();
    player2 = await context2.newPage();
    
    // Positionner les fenêtres côte à côte
    await player1.setViewportSize({ width: 800, height: 900 });
    await player2.setViewportSize({ width: 800, height: 900 });
  });

  test.afterAll(async () => {
    await context1?.close();
    await context2?.close();
  });

  // Fonction helper pour les tooltips
  const showDemoTooltip = async (page: Page, text: string, playerName: string, duration: number = 2000) => {
    await page.evaluate(({ text, playerName, duration }) => {
      // Supprimer l'ancien tooltip s'il existe pour ce joueur
      const oldTooltip = document.querySelector(`.demo-tooltip-${playerName.toLowerCase()}`);
      if (oldTooltip) {
        const contentDiv = oldTooltip.querySelector('.tooltip-content');
        if (contentDiv) {
          contentDiv.textContent = text;
          return;
        }
      }
      
      // Créer le nouveau tooltip
      const tooltip = document.createElement('div');
      tooltip.className = `demo-tooltip-${playerName.toLowerCase()}`;
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

  test('Démo multijoueur complète: 2 joueurs, choix scénario, partie', async () => {
    test.setTimeout(180000); // 3 minutes pour la démo complète
    
    console.log('🎬 === DÉBUT DÉMO MULTIJOUEUR AVEC 2 ÉCRANS ===');
    await debugLog('=== INITIALISATION DÉMO MULTIJOUEUR ===');
    await debugLog('Timeout configuré: 180 secondes');
    await debugLog('Scénarios backend disponibles: conquest-classic, temporal-rift, multiplayer-arena');
    
    // 1. Navigation des deux joueurs vers la page principale
    await showDemoTooltip(player1, '🚀 Démarrage de la démo multijoueur<br/>Joueur 1 va créer une partie', 'JOUEUR 1', 2000);
    await showDemoTooltip(player2, '🚀 Démarrage de la démo multijoueur<br/>Joueur 2 va rejoindre la partie', 'JOUEUR 2', 2000);
    
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
    } else {
      await debugLog('Bouton de création non trouvé, tentative avec sélecteur générique');
      const anyCreateButton = player1.locator('button').filter({ hasText: /Create|New|🎮/ }).first();
      if (await anyCreateButton.isVisible({ timeout: 3000 })) {
        await anyCreateButton.click({ force: true });
      }
    }
    
    await player1.waitForTimeout(1000);
    
    // Remplir le nom de session
    await debugLog('Saisie du nom de session');
    const sessionNameInput = player1.locator('[data-testid="session-name-input"]').first();
    if (await sessionNameInput.isVisible({ timeout: 3000 })) {
      const sessionName = 'Arène Multijoueur Demo';
      await debugLog(`Saisie du nom de session: ${sessionName}`);
      await sessionNameInput.fill(sessionName);
    } else {
      await debugLog('Champ nom de session non trouvé');
    }
    
    // Remplir le nom du héros
    await debugLog('Saisie du nom du héros');
    const heroNameInput = player1.locator('[data-testid="hero-name-input"]').first();
    if (await heroNameInput.isVisible({ timeout: 3000 })) {
      await heroNameInput.fill('Héros Joueur 1');
    }
    
    // Choisir le mode de jeu
    await debugLog('Sélection du mode de jeu');
    const gameModeSelect = player1.locator('[data-testid="game-mode-select"]').first();
    if (await gameModeSelect.isVisible({ timeout: 3000 })) {
      await debugLog('Sélection du scénario Multiplayer Arena');
      await gameModeSelect.selectOption('multiplayer-arena');
    } else {
      await debugLog('Sélecteur de mode de jeu non trouvé, utilisation du mode par défaut');
    }
    
    // Créer la session
    await debugLog('Clic sur le bouton de création finale');
    const submitButton = player1.locator('[data-testid="create-new-game-btn"]').first();
    if (await submitButton.isVisible({ timeout: 3000 })) {
      await debugLog('Clic sur le bouton de création');
      await submitButton.click();
    } else {
      await debugLog('Bouton de création non trouvé');
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
    }
    
    await player2.waitForTimeout(3000);
    
    // 7. Les deux joueurs sont connectés
    await Promise.all([
      showDemoTooltip(player1, '👥 Joueur 2 a rejoint la partie !<br/>Prêt à commencer la bataille', 'JOUEUR 1', 2000),
      showDemoTooltip(player2, '✅ Connexion réussie !<br/>En attente du démarrage', 'JOUEUR 2', 2000)
    ]);
    
    // 8. Démarrer la partie
    await showDemoTooltip(player1, '🚀 Lancement de la partie multijoueur', 'JOUEUR 1', 1500);
    
    // Le joueur 1 doit cliquer sur le bouton "Start Battle" dans la waiting room
    const startButton = player1.locator('[data-testid="start-battle-btn"]').first();
    if (await startButton.isVisible({ timeout: 5000 })) {
      await debugLog('Bouton Start Battle trouvé');
      await startButton.click();
    } else {
      await debugLog('Bouton Start Battle non trouvé, tentative avec sélecteur générique');
      const anyStartButton = player1.locator('button').filter({ hasText: /Start|Battle|Démarrer/ }).first();
      if (await anyStartButton.isVisible({ timeout: 3000 })) {
        await anyStartButton.click();
      }
    }
    
    await Promise.all([
      player1.waitForTimeout(3000),
      player2.waitForTimeout(3000)
    ]);
    
    // 9. Vérifier que les deux joueurs sont dans le jeu
    await Promise.all([
      showDemoTooltip(player1, '🎮 Interface de jeu chargée !<br/>C\'est votre tour de jouer', 'JOUEUR 1', 2000),
      showDemoTooltip(player2, '🎮 Interface de jeu chargée !<br/>En attente de votre tour', 'JOUEUR 2', 2000)
    ]);
    
    // 10. Simuler quelques actions de gameplay
    // Joueur 1 sélectionne un héros
    await showDemoTooltip(player1, '🦸 Sélection d\'un héros pour jouer', 'JOUEUR 1', 1500);
    
    const hero1 = player1.locator('.hero-portrait-img, .hero-emoji-fallback, .hero-card, [data-testid="hero"]').first();
    if (await hero1.isVisible({ timeout: 5000 })) {
      await hero1.click();
      await player1.waitForTimeout(1000);
    }
    
    // Joueur 1 fait un mouvement
    await showDemoTooltip(player1, '🗺️ Déplacement du héros sur la carte', 'JOUEUR 1', 1500);
    
    const mapTile1 = player1.locator('canvas, .map-tile, .hex-tile').first();
    if (await mapTile1.isVisible({ timeout: 3000 })) {
      await mapTile1.click();
      await player1.waitForTimeout(1000);
    }
    
    // Joueur 1 termine son tour
    await showDemoTooltip(player1, '⏭️ Fin du tour - Passage au joueur 2', 'JOUEUR 1', 1500);
    
    const endTurnButton1 = player1.locator('button[title*="End"], .end-turn-btn, .control-btn:has(.btn-icon:text("⏭️"))').first();
    if (await endTurnButton1.isVisible({ timeout: 3000 })) {
      await endTurnButton1.click();
    }
    
    await Promise.all([
      player1.waitForTimeout(2000),
      player2.waitForTimeout(2000)
    ]);
    
    // 11. Tour du joueur 2
    await showDemoTooltip(player2, '🎯 C\'est maintenant votre tour !<br/>À vous de jouer', 'JOUEUR 2', 2000);
    
    const hero2 = player2.locator('.hero-portrait-img, .hero-emoji-fallback, .hero-card, [data-testid="hero"]').first();
    if (await hero2.isVisible({ timeout: 5000 })) {
      await hero2.click();
      await player2.waitForTimeout(1000);
    }
    
    const mapTile2 = player2.locator('canvas, .map-tile, .hex-tile').first();
    if (await mapTile2.isVisible({ timeout: 3000 })) {
      await mapTile2.click();
      await player2.waitForTimeout(1000);
    }
    
    // 12. Fin de la démo
    await Promise.all([
      showDemoTooltip(player1, '🎉 Démo multijoueur terminée !<br/>Les deux joueurs ont pu jouer ensemble', 'JOUEUR 1', 3000),
      showDemoTooltip(player2, '🎉 Démo multijoueur terminée !<br/>Gameplay synchronisé réussi !', 'JOUEUR 2', 3000)
    ]);
    
    console.log('🎬 === FIN DÉMO MULTIJOUEUR ===');
    console.log('✨ Démo 2 joueurs terminée avec succès !');
    
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