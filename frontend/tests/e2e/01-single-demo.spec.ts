import { test, expect } from '@playwright/test';

// Fonction pour créer des tooltips dynamiques basés sur l'état réel
const createDynamicTooltip = async (page: any, message: string, position: 'top' | 'center' | 'bottom' = 'center') => {
  await page.evaluate(({ message, position }) => {
    // Trouver ou créer le conteneur de tooltip
    let tooltipContainer = document.querySelector('.demo-tooltip-container');
    if (!tooltipContainer) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.className = 'demo-tooltip-container';
      document.body.appendChild(tooltipContainer);
    }
    
    // Détecter le contexte actuel pour le titre dynamique
    let contextTitle = 'Heroes of Time';
    
    // Si on est dans le jeu, récupérer le nom de la map
    const mapName = document.querySelector('.map-name');
    if (mapName) {
      contextTitle = mapName.textContent || 'Heroes of Time';
    }
    
    // Si on est dans un menu de héros, récupérer le nom du héros sélectionné
    const selectedHero = document.querySelector('.hero-name.selected, .selected-hero .hero-name');
    if (selectedHero) {
      contextTitle = `Heroes of Time - ${selectedHero.textContent}`;
    }
    
    // Si on est dans la sélection de scénario
    const scenarioSelector = document.querySelector('.scenarios-grid');
    if (scenarioSelector) {
      contextTitle = 'Heroes of Time - Sélection de Mission';
    }
    
    // Créer le nouveau tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'demo-tooltip';
    tooltip.innerHTML = `
      <div style="
        position: fixed;
        top: ${position === 'top' ? '20px' : position === 'bottom' ? 'auto' : '50%'};
        bottom: ${position === 'bottom' ? '20px' : 'auto'};
        left: 50%;
        transform: translateX(-50%) ${position === 'center' ? 'translateY(-50%)' : ''};
        background: rgba(26,26,46,0.92);
        color: #ffd700;
        padding: 18px 25px;
        border-radius: 8px;
        border: 1px solid rgba(255,215,0,0.6);
        font-family: 'Georgia', serif;
        font-size: 15px;
        font-weight: normal;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        z-index: 10000;
        min-width: 280px;
        max-width: 450px;
        backdrop-filter: blur(3px);
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
      ">
        <div style="
          margin: -22px -30px 12px -30px;
          padding: 8px;
          border-radius: 8px 8px 0 0;
          font-size: 13px;
          color: #ffed4e;
          background: rgba(255,215,0,0.1);
          border-bottom: 1px solid rgba(255,215,0,0.2);
        ">${contextTitle}</div>
        ${message}
      </div>
    `;
    
    // Fade out les anciens tooltips avant d'ajouter le nouveau
    const existingTooltips = tooltipContainer.querySelectorAll('.demo-tooltip');
    existingTooltips.forEach(oldTooltip => {
      (oldTooltip as HTMLElement).style.opacity = '0';
      setTimeout(() => {
        if (oldTooltip.parentNode) {
          oldTooltip.parentNode.removeChild(oldTooltip);
        }
      }, 300);
    });
    
    tooltipContainer.appendChild(tooltip);
    
    // Fade in avec délai pour éviter les conflits
    setTimeout(() => {
      (tooltip as HTMLElement).style.opacity = '1';
    }, 100);
    
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
  await page.waitForTimeout(500);
  
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
    
    // Configuration plein écran pour single player
    await page.setViewportSize({ width: 1920, height: 1080 });
    
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
      await page.waitForTimeout(1000);
    }, '⚔️ Test du panneau Héros<br/>Gestion de vos champions...');

    await performActionWithTooltip(page, async () => {
      await page.click('.control-btn[title="Inventory"]');
      await page.waitForTimeout(1000);
    }, '🎒 Test du panneau Inventaire<br/>Gestion des objets équipés...');

    await performActionWithTooltip(page, async () => {
      await page.click('.control-btn[title="Castle"]');
      await page.waitForTimeout(1000);
    }, '🏰 Test du panneau Château<br/>Construction et amélioration...');

    // 7. Effectuer une action de fin de tour
    await performActionWithTooltip(page, async () => {
      await page.click('.end-turn-btn');
      await page.waitForTimeout(2000);
    }, '🌟 Fin du tour<br/>Passage au tour suivant...');

    // Tooltip final de succès
    await createDynamicTooltip(page, '🎉 Démonstration terminée avec succès !<br/>✨ Le jeu fonctionne parfaitement ! ✨<br/><br/>🎮 Vous pouvez maintenant jouer !');
    await page.waitForTimeout(4000);

    console.log('✅ === DÉMO TERMINÉE AVEC SUCCÈS ===');
  });
}); 