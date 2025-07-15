import { test, expect } from '@playwright/test';
import { getTooltipText } from './utils/translations';

test.describe('🎮 Heroes of Time - Multiplayer Demo', () => {
  test('Demo automatique multijoueur avec tooltips: Choisir scénario et jouer 1 tour', async ({ page }) => {
    test.setTimeout(120000); // 2 minutes pour la démo complète
    console.log('🎬 === DÉBUT DE LA DÉMO MULTIJOUEUR AVEC TOOLTIPS ===');
    
    // Fonction pour ajouter un tooltip visuel
    const showTooltip = async (text: string, position: string = 'center', duration: number = 3000) => {
      await page.evaluate(({ text, position, duration }) => {
        // Supprimer immédiatement l'ancien tooltip s'il existe
        const oldTooltip = document.querySelector('.demo-tooltip');
        if (oldTooltip) {
          oldTooltip.remove();
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
            background: linear-gradient(135deg, rgba(46,26,26,0.85) 0%, rgba(62,22,33,0.85) 50%, rgba(96,15,52,0.85) 100%);
            color: #ff6b6b;
            padding: 15px 25px;
            border-radius: 12px;
            border: 2px solid rgba(255,107,107,0.8);
            font-family: 'Georgia', serif;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            box-shadow: 0 8px 25px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,107,107,0.2);
            z-index: 10000;
            min-width: 280px;
            max-width: 480px;
            backdrop-filter: blur(5px);
            opacity: 1;
          ">
            <div style="
              background: linear-gradient(45deg, transparent 30%, rgba(255,107,107,0.1) 50%, transparent 70%);
              margin: -20px -30px 10px -30px;
              padding: 10px;
              border-radius: 12px 12px 0 0;
              font-size: 14px;
              color: #ffb3b3;
            ">⚡ DÉMO MULTIJOUEUR HEROES OF TIME ⚡</div>
            ${text}
          </div>
        `;
        
        document.body.appendChild(tooltip);
        
        // Supprimer après la durée spécifiée (simple et rapide)
        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.remove();
          }
        }, duration);
      }, { text, position, duration });
      
      // Attendre moins longtemps pour fluidité
      await page.waitForTimeout(Math.max(500, duration - 500));
    };
    
    // 1. Page principale
    await showTooltip(getTooltipText('demo.multiplayer.welcome'), 'top', 3500);
    console.log('📍 1. Navigation vers la page principale...');
    await page.goto('/');
    await page.waitForTimeout(1500);
    
    // 2. Chargement des scénarios
    await showTooltip(getTooltipText('demo.multiplayer.loadingScenarios'), 'center', 3000);
    console.log('📊 2. Attente du chargement des scénarios...');
    await page.waitForSelector('.scenario-card, [data-testid="scenario-card"]', { timeout: 10000 });
    
    // 3. Sélection du scénario multijoueur
    await showTooltip(getTooltipText('demo.multiplayer.selectScenario'), 'center', 3000);
    console.log('🎯 3. Sélection du scénario Multiplayer Arena...');
    
    // Chercher le scénario multijoueur par différents moyens
    let scenarioSelector = '.scenario-card:has-text("Multiplayer Arena")';
    let scenarioFound = await page.locator(scenarioSelector).count() > 0;
    
    if (!scenarioFound) {
      scenarioSelector = '[data-testid="scenario-card-multiplayer-arena"]';
      scenarioFound = await page.locator(scenarioSelector).count() > 0;
    }
    
    if (!scenarioFound) {
      scenarioSelector = '.scenario-card:has-text("Arena")';
      scenarioFound = await page.locator(scenarioSelector).count() > 0;
    }
    
    if (!scenarioFound) {
      scenarioSelector = '.scenario-card:has-text("Multiplayer")';
      scenarioFound = await page.locator(scenarioSelector).count() > 0;
    }
    
    if (!scenarioFound) {
      scenarioSelector = '.scenario-card';
      console.log('⚠️ Scénario multijoueur spécifique non trouvé, utilisation du premier disponible');
    }
    
    await page.click(scenarioSelector);
    await page.waitForTimeout(1000);
    
    // 4. Lancement du jeu
    await showTooltip(getTooltipText('demo.multiplayer.launchGame'), 'center', 3000);
    console.log('▶️ 4. Clic sur le bouton Jouer...');
    
    // Chercher le bouton de jeu
    let playButton = 'button:has-text("Jouer")';
    let playButtonFound = await page.locator(playButton).count() > 0;
    
    if (!playButtonFound) {
      playButton = 'button:has-text("Play")';
      playButtonFound = await page.locator(playButton).count() > 0;
    }
    
    if (!playButtonFound) {
      playButton = '[data-testid="play-button"]';
      playButtonFound = await page.locator(playButton).count() > 0;
    }
    
    if (!playButtonFound) {
      playButton = 'button[type="submit"]';
      console.log('⚠️ Bouton de jeu spécifique non trouvé, utilisation du bouton submit');
    }
    
    await page.click(playButton);
    
    // 5. Attente du chargement du jeu
    await showTooltip(getTooltipText('demo.multiplayer.gameInitialization'), 'center', 4000);
    console.log('🎮 5. Attente du chargement du jeu multijoueur...');
    await page.waitForSelector('.true-heroes-interface, .game-interface', { timeout: 30000 });
    
    // 6. Interface chargée
    await showTooltip(getTooltipText('demo.multiplayer.gameInterface'), 'top', 3000);
    console.log('🖥️ 6. Interface multijoueur chargée !');
    
    // 7. Test des boutons de contrôle
    await showTooltip(getTooltipText('demo.multiplayer.controlButtons'), 'center', 2500);
    console.log('🎮 7. Test des boutons de contrôle multijoueur...');
    
    // Test du bouton Heroes
    const heroesButton = page.locator('button:has-text("⚔️"), button[title*="hero"], button[title*="Hero"]').first();
    if (await heroesButton.isVisible()) {
      await heroesButton.click();
      await page.waitForTimeout(1000);
      await showTooltip(getTooltipText('demo.multiplayer.heroesPanel'), 'center', 2000);
      console.log('⚔️ Panneau Heroes multijoueur testé');
    }
    
    // Test du bouton Inventory
    const inventoryButton = page.locator('button:has-text("🎒"), button[title*="inventory"], button[title*="Inventory"]').first();
    if (await inventoryButton.isVisible()) {
      await inventoryButton.click();
      await page.waitForTimeout(1000);
      await showTooltip(getTooltipText('demo.multiplayer.inventoryPanel'), 'center', 2000);
      console.log('🎒 Panneau Inventory multijoueur testé');
    }
    
    // Test du bouton Castle
    const castleButton = page.locator('button:has-text("🏰"), button[title*="castle"], button[title*="Castle"]').first();
    if (await castleButton.isVisible()) {
      await castleButton.click();
      await page.waitForTimeout(1000);
      await showTooltip(getTooltipText('demo.multiplayer.castlePanel'), 'center', 2000);
      console.log('🏰 Panneau Castle multijoueur testé');
    }
    
    // 8. Fin de tour
    await showTooltip(getTooltipText('demo.multiplayer.endTurn'), 'center', 3000);
    console.log('🔄 8. Test de la fin de tour multijoueur...');
    
    const endTurnButton = page.locator('button:has-text("⭐"), button[title*="turn"], button[title*="Turn"], button:has-text("End Turn")').first();
    if (await endTurnButton.isVisible()) {
      await endTurnButton.click();
      await page.waitForTimeout(2000);
      await showTooltip(getTooltipText('demo.multiplayer.nextTurn'), 'center', 3000);
      console.log('⭐ Tour multijoueur terminé avec succès');
    }
    
    // 9. Fin de la démonstration
    await showTooltip(getTooltipText('demo.multiplayer.finished'), 'center', 5000);
    console.log('🎉 9. Démonstration multijoueur terminée avec succès !');
    
    console.log('✅ === FIN DE LA DÉMO MULTIJOUEUR AVEC TOOLTIPS ===');
  });
}); 