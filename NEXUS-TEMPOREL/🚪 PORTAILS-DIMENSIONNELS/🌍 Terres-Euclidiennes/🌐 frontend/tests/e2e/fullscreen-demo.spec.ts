import { test, expect, chromium } from '@playwright/test';

test.describe('🎮 Heroes of Time - Mode Démo Plein Écran', () => {
  test('Lancer la démo en mode kiosque plein écran', async () => {
    // Lancer un navigateur spécial en mode kiosque
    const browser = await chromium.launch({
      headless: false,
      args: [
        '--start-fullscreen',
        '--kiosk',
        '--disable-infobars',
        '--disable-session-crashed-bubble',
        '--noerrdialogs',
        '--disable-translate',
        '--no-first-run',
        '--fast',
        '--fast-start',
        '--disable-features=TranslateUI',
        '--disk-cache-dir=/dev/null',
        '--disable-popup-blocking',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-device-discovery-notifications'
      ]
    });

    const context = await browser.newContext({
      viewport: null, // Utiliser la taille complète de l'écran
    });

    const page = await context.newPage();

    // Masquer le curseur après 3 secondes d'inactivité
    await page.addInitScript(() => {
      let cursorTimeout: any;
      const hideCursor = () => {
        document.body.style.cursor = 'none';
      };
      const showCursor = () => {
        document.body.style.cursor = 'auto';
        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(hideCursor, 3000);
      };
      
      document.addEventListener('mousemove', showCursor);
      cursorTimeout = setTimeout(hideCursor, 3000);
    });

    // Ajouter des styles pour une meilleure expérience plein écran
    await page.addStyleTag({
      content: `
        /* Masquer les barres de défilement */
        ::-webkit-scrollbar {
          display: none !important;
        }
        
        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        
        /* Style amélioré pour les tooltips en plein écran */
        .demo-tooltip {
          font-size: 20px !important;
          padding: 20px 30px !important;
          animation: pulse 2s infinite !important;
        }
        
        @keyframes pulse {
          0% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.05); }
          100% { transform: translateX(-50%) scale(1); }
        }
        
        /* Assurer que tout prend la hauteur complète */
        html, body, #root, .App {
          height: 100vh !important;
          overflow: hidden !important;
        }
      `
    });

    console.log('🚀 Démarrage de la démo en mode plein écran...');
    
    // 1. Page d'accueil
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3000);
    
    // Message de bienvenue en plein écran
    await page.evaluate(() => {
      const welcome = document.createElement('div');
      welcome.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 1s ease-out;
        ">
          <div style="text-align: center;">
            <h1 style="
              font-size: 80px;
              color: #FFD700;
              margin-bottom: 20px;
              font-family: 'Orbitron', sans-serif;
              text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
            ">⚔️ Heroes of Time ⏰</h1>
            <p style="
              font-size: 30px;
              color: #00D4FF;
              font-family: 'Inter', sans-serif;
            ">Mode Démo Plein Écran</p>
            <p style="
              font-size: 20px;
              color: #888;
              margin-top: 40px;
            ">Appuyez sur ESC pour quitter le mode plein écran</p>
          </div>
        </div>
        <style>
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        </style>
      `;
      document.body.appendChild(welcome);
      
      // Faire disparaître après 4 secondes
      setTimeout(() => {
        welcome.style.animation = 'fadeOut 1s ease-out forwards';
        setTimeout(() => welcome.remove(), 1000);
      }, 4000);
    });

    await page.waitForTimeout(5000);

    // 2. Sélection du scénario classique
    const classicButton = page.locator('text=Conquête Classique').first();
    await classicButton.waitFor({ state: 'visible', timeout: 30000 });
    
    // Effet de surbrillance avant le clic
    await page.evaluate(() => {
      const button = document.querySelector('button:has-text("Conquête Classique")') as HTMLElement;
      if (button) {
        button.style.transition = 'all 0.5s ease';
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 0 50px rgba(255, 215, 0, 0.8)';
        setTimeout(() => {
          button.style.transform = '';
          button.style.boxShadow = '';
        }, 1000);
      }
    });
    
    await page.waitForTimeout(1500);
    await classicButton.click();
    
    // 3. Attendre l'interface de jeu
    await page.waitForTimeout(3000);
    const heroesButton = page.locator('button:has-text("Heroes")').first();
    await heroesButton.waitFor({ state: 'visible', timeout: 30000 });

    // 4. Démonstration des fonctionnalités
    // Cliquer sur Heroes
    await heroesButton.click();
    await page.waitForTimeout(2000);

    // Interactions avec la carte
    const canvas = page.locator('canvas').first();
    if (await canvas.isVisible()) {
      // Mouvements fluides de la souris sur la carte
      const box = await canvas.boundingBox();
      if (box) {
        // Dessiner un pattern en étoile
        const centerX = box.x + box.width / 2;
        const centerY = box.y + box.height / 2;
        const radius = Math.min(box.width, box.height) / 3;
        
        for (let i = 0; i < 5; i++) {
          const angle = (i * 72 * Math.PI) / 180;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          await page.mouse.move(x, y, { steps: 20 });
          await page.waitForTimeout(500);
        }
        
        // Clic au centre
        await page.mouse.click(centerX, centerY);
        await page.waitForTimeout(1000);
      }
    }

    // 5. Message de fin
    await page.evaluate(() => {
      const endMessage = document.createElement('div');
      endMessage.innerHTML = `
        <div style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(26, 26, 46, 0.95);
          padding: 40px 60px;
          border-radius: 20px;
          border: 2px solid #FFD700;
          text-align: center;
          z-index: 10000;
          box-shadow: 0 0 50px rgba(255, 215, 0, 0.3);
        ">
          <h2 style="
            font-size: 40px;
            color: #FFD700;
            margin-bottom: 20px;
          ">Démo Terminée</h2>
          <p style="
            font-size: 20px;
            color: #00D4FF;
          ">Merci d'avoir regardé Heroes of Time!</p>
          <p style="
            font-size: 16px;
            color: #888;
            margin-top: 20px;
          ">La démo se fermera automatiquement...</p>
        </div>
      `;
      document.body.appendChild(endMessage);
    });

    // Attendre avant de fermer
    await page.waitForTimeout(5000);
    
    // Fermer proprement
    await context.close();
    await browser.close();
  });
}); 