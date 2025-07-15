import { test, expect } from '@playwright/test';

// Fonction pour créer des tooltips dynamiques basés sur l'état réel
const createDynamicTooltip = async (page: any, message: string, position: 'top' | 'center' | 'bottom' = 'center') => {
  await page.evaluate(({ message, position }) => {
    // Supprimer les anciens tooltips
    const existingTooltips = document.querySelectorAll('.demo-tooltip');
    existingTooltips.forEach(tooltip => tooltip.remove());
    
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
        background: rgba(26,26,46,0.85);
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
        transition: opacity 0.3s ease;
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
    
    document.body.appendChild(tooltip);
    
    // Fade in simple
    setTimeout(() => {
      tooltip.style.opacity = '1';
    }, 10);
    
  }, { message, position });
};

// Fonction pour attendre qu'un élément soit vraiment chargé avec tooltip contextuel
const waitForElementWithTooltip = async (page: any, selector: string, tooltipMessage: string, timeout = 10000) => {
  await createDynamicTooltip(page, `⏳ ${tooltipMessage}...`);
  await page.waitForTimeout(1500); // Délai pour voir le tooltip "chargement"
  
  try {
    await page.waitForSelector(selector, { state: 'visible', timeout });
    await createDynamicTooltip(page, `✅ ${tooltipMessage} - Prêt !`);
    await page.waitForTimeout(2000); // Délai pour voir le tooltip "prêt"
  } catch (error) {
    await createDynamicTooltip(page, `❌ ${tooltipMessage} - Échec !`);
    await page.waitForTimeout(2000);
    throw error;
  }
};

// Fonction pour effectuer une action avec tooltip contextuel
const performActionWithTooltip = async (page: any, action: () => Promise<void>, tooltipMessage: string) => {
  await createDynamicTooltip(page, `🎯 ${tooltipMessage}...`);
  await page.waitForTimeout(1200); // Délai pour voir le tooltip "action"
  
  try {
    await action();
    await createDynamicTooltip(page, `✅ ${tooltipMessage} - Terminé !`);
    await page.waitForTimeout(2000); // Délai pour voir le tooltip "terminé"
  } catch (error) {
    await createDynamicTooltip(page, `❌ ${tooltipMessage} - Erreur !`);
    await page.waitForTimeout(2000);
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
    }, 'Chargement de l\'interface principale<br/>Initialisation du système de jeu...');

    // 2. Attendre le chargement des scénarios avec tooltip contextuel
    await waitForElementWithTooltip(
      page, 
      '[data-testid="scenario-card-conquest-classic"]', 
      'Récupération des missions disponibles<br/>Connexion au serveur de jeu...'
    );

    await page.waitForTimeout(1000); // Pause pour admirer les scénarios

    // 3. Sélection du scénario avec navigation automatique
    await performActionWithTooltip(page, async () => {
      await page.click('[data-testid="scenario-card-conquest-classic"]');
    }, 'Sélection de la mission "Conquête Classique"<br/>Chargement de la carte de jeu...');

    await page.waitForTimeout(1500); // Pause pour la navigation

    // 4. Attendre la navigation vers le jeu
    await waitForElementWithTooltip(
      page,
      '.true-heroes-interface',
      'Initialisation du monde de jeu<br/>Placement des héros et des ressources...'
    );

    await page.waitForTimeout(1000); // Pause pour admirer l'interface

    // 5. Vérifier que l'interface est complètement chargée
    await waitForElementWithTooltip(
      page,
      '.game-header',
      'Interface de jeu prête<br/>Votre aventure peut commencer !'
    );

    await page.waitForTimeout(1500); // Pause avant de tester les boutons

    // 6. Tester les boutons de contrôle
    await performActionWithTooltip(page, async () => {
      await page.click('.control-btn[title="Heroes"]');
      await page.waitForTimeout(1500); // Délai pour voir le panneau changer
    }, 'Ouverture du panneau Héros<br/>Gestion de vos champions et leurs équipements');

    await page.waitForTimeout(1000); // Pause entre les actions

    await performActionWithTooltip(page, async () => {
      await page.click('.control-btn[title="Inventory"]');
      await page.waitForTimeout(1500); // Délai pour voir le panneau changer
    }, 'Ouverture du panneau Inventaire<br/>Gestion des objets magiques et artefacts');

    await page.waitForTimeout(1000); // Pause entre les actions

    await performActionWithTooltip(page, async () => {
      await page.click('.control-btn[title="Castle"]');
      await page.waitForTimeout(1500); // Délai pour voir le panneau changer
    }, 'Ouverture du panneau Château<br/>Construction et amélioration des bâtiments');

    await page.waitForTimeout(1500); // Pause avant l'action finale

    // 7. Effectuer une action de fin de tour
    await performActionWithTooltip(page, async () => {
      await page.click('.end-turn-btn');
      await page.waitForTimeout(3000); // Délai pour voir l'effet de fin de tour
    }, 'Fin du tour de jeu<br/>Calcul des ressources et événements...');

    // Tooltip final de succès avec délai prolongé
    await createDynamicTooltip(page, 'Démonstration terminée avec succès !<br/>🎮 Le jeu est entièrement fonctionnel<br/>✨ Prêt pour votre aventure !');
    await page.waitForTimeout(2000); // Reduced delay to avoid timeout

    console.log('✅ === DÉMO TERMINÉE AVEC SUCCÈS ===');
  });
}); 