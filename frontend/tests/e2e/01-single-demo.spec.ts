import { test, expect } from '@playwright/test';

// Fonction pour créer des tooltips dynamiques basés sur l'état réel
const createDynamicTooltip = async (page: any, message: string, position: 'top' | 'center' | 'bottom' = 'top') => {
  await page.evaluate(({ message, position }) => {
    // Supprimer les anciens tooltips
    const existingTooltips = document.querySelectorAll('.demo-tooltip');
    existingTooltips.forEach(tooltip => tooltip.remove());
    
    // Créer le nouveau tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'demo-tooltip';
    tooltip.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(22,33,62,0.95) 50%, rgba(15,52,96,0.95) 100%);
        color: #ffd700;
        padding: 20px 30px;
        border-radius: 12px;
        border: 2px solid rgba(255,215,0,0.8);
        font-family: 'Georgia', serif;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        box-shadow: 0 8px 25px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,215,0,0.2);
        z-index: 10000;
        min-width: 320px;
        max-width: 500px;
        backdrop-filter: blur(5px);
        opacity: 1;
        animation: slideIn 0.8s ease-out;
      ">
        <div style="
          background: linear-gradient(45deg, transparent 30%, rgba(255,215,0,0.1) 50%, transparent 70%);
          margin: -25px -35px 15px -35px;
          padding: 12px;
          border-radius: 12px 12px 0 0;
          font-size: 14px;
          color: #ffed4e;
          letter-spacing: 1px;
        ">⚡ DÉMO DYNAMIQUE HEROES OF TIME ⚡</div>
        ${message}
      </div>
    `;
    
    // Animation CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(tooltip);
  }, { message, position });
};

// Fonction pour attendre qu'un élément soit vraiment chargé avec tooltip contextuel
const waitForElementWithTooltip = async (page: any, selector: string, tooltipMessage: string, timeout = 10000) => {
  await createDynamicTooltip(page, `⏳ ${tooltipMessage}...`);
  
  try {
    await page.waitForSelector(selector, { state: 'visible', timeout });
    await createDynamicTooltip(page, `✅ ${tooltipMessage} - Prêt !`);
    await page.waitForTimeout(1000);
  } catch (error) {
    await createDynamicTooltip(page, `❌ ${tooltipMessage} - Échec !`);
    await page.waitForTimeout(1000);
    throw error;
  }
};

// Fonction pour effectuer une action avec tooltip contextuel
const performActionWithTooltip = async (page: any, action: () => Promise<void>, tooltipMessage: string) => {
  await createDynamicTooltip(page, `🎯 ${tooltipMessage}...`);
  await page.waitForTimeout(1500);
  
  try {
    await action();
    await createDynamicTooltip(page, `✅ ${tooltipMessage} - Terminé !`);
    await page.waitForTimeout(1000);
  } catch (error) {
    await createDynamicTooltip(page, `❌ ${tooltipMessage} - Erreur !`);
    await page.waitForTimeout(1000);
    throw error;
  }
};

test.describe('🎮 Heroes of Time - Demo Dynamique', () => {
  test('Demo avec tooltips dynamiques basés sur l\'état réel', async ({ page }) => {
    test.setTimeout(120000);
    console.log('🎬 === DÉBUT DE LA DÉMO DYNAMIQUE ===');

    // 1. Navigation avec tooltip dynamique
    await performActionWithTooltip(page, async () => {
      await page.goto('/');
    }, '🏠 Navigation vers la page d\'accueil<br/>Chargement de l\'interface principale...');

    // 2. Attendre le chargement des scénarios avec tooltip contextuel
    await waitForElementWithTooltip(
      page, 
      '[data-testid="scenario-card-conquest-classic"]', 
      '📊 Chargement des scénarios disponibles<br/>Récupération des missions depuis le serveur...'
    );

    // 3. Sélection du scénario avec navigation automatique
    await performActionWithTooltip(page, async () => {
      await page.click('[data-testid="scenario-card-conquest-classic"]');
    }, '🎯 Sélection du scénario "Conquête Classique"<br/>Navigation automatique vers le jeu...');

    // 4. Attendre la navigation vers le jeu
    await waitForElementWithTooltip(
      page,
      '.true-heroes-interface',
      '🎮 Initialisation de l\'interface de jeu<br/>Chargement de la carte et des héros...'
    );

    // 5. Vérifier que l'interface est complètement chargée
    await waitForElementWithTooltip(
      page,
      '.game-header',
      '🖥️ Interface de jeu chargée !<br/>Votre royaume vous attend...'
    );

    // 6. Tester les boutons de contrôle
    await performActionWithTooltip(page, async () => {
      await page.click('.control-btn[title="Heroes"]');
      await page.waitForTimeout(1500);
    }, '⚔️ Test du panneau Héros<br/>Gestion de vos champions...');

    await performActionWithTooltip(page, async () => {
      await page.click('.control-btn[title="Inventory"]');
      await page.waitForTimeout(1500);
    }, '🎒 Test du panneau Inventaire<br/>Gestion des objets équipés...');

    await performActionWithTooltip(page, async () => {
      await page.click('.control-btn[title="Castle"]');
      await page.waitForTimeout(1500);
    }, '🏰 Test du panneau Château<br/>Construction et recrutement...');

    // 7. Finaliser avec un message de succès
    await performActionWithTooltip(page, async () => {
      await page.waitForTimeout(3000);
    }, '✅ Démo terminée avec succès !<br/>Toutes les fonctionnalités testées...');

    // 8. Attendre un peu avant de terminer
    await page.waitForTimeout(6000);

    console.log('✅ === DÉMO TERMINÉE AVEC SUCCÈS ===');
  });
}); 