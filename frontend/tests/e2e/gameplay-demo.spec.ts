import { test, expect } from '@playwright/test';

// Import translation function for demo tooltips
const getTooltipText = (key: string, language: string = 'fr') => {
  const translations: Record<string, Record<string, string>> = {
    fr: {
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
      'demo.finished': '🎉 Démonstration terminée !<br/>Vous savez maintenant jouer à Heroes of Time<br/><br/>✨ Amusez-vous bien dans vos conquêtes ! ✨'
    }
  };
  return translations[language]?.[key] || key;
};

test.describe('🎮 Heroes of Time - Gameplay Demo', () => {
  test('Demo automatique avec tooltips: Choisir scénario et jouer 1 tour', async ({ page }) => {
    test.setTimeout(120000); // 2 minutes pour la démo complète
    console.log('🎬 === DÉBUT DE LA DÉMO GAMEPLAY AVEC TOOLTIPS ===');
    
    // Fonction pour ajouter un tooltip visuel avec fade smooth
    const showTooltip = async (text: string, position: string = 'center', duration: number = 3000) => {
      await page.evaluate(({ text, position, duration }) => {
        // Supprimer l'ancien tooltip s'il existe
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
            background: linear-gradient(135deg, rgba(26,26,46,0.85) 0%, rgba(22,33,62,0.85) 50%, rgba(15,52,96,0.85) 100%);
            color: #ffd700;
            padding: 15px 25px;
            border-radius: 12px;
            border: 2px solid rgba(255,215,0,0.8);
            font-family: 'Georgia', serif;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            box-shadow: 0 8px 25px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,215,0,0.2);
            z-index: 10000;
            min-width: 280px;
            max-width: 480px;
            backdrop-filter: blur(5px);
            opacity: 1;
          ">
            <div style="
              background: linear-gradient(45deg, transparent 30%, rgba(255,215,0,0.1) 50%, transparent 70%);
              margin: -20px -30px 10px -30px;
              padding: 10px;
              border-radius: 12px 12px 0 0;
              font-size: 14px;
              color: #ffed4e;
            ">⚡ DÉMO HEROES OF TIME ⚡</div>
            ${text}
          </div>
        `;
        
        document.body.appendChild(tooltip);
        
        // Supprimer après la durée spécifiée
        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.remove();
          }
        }, duration);
      }, { text, position, duration });
      
      // Attendre seulement la moitié de la durée pour être plus rapide
      await page.waitForTimeout(Math.min(duration * 0.7, 2000));
    };
    
         // 1. Page principale
     await showTooltip(getTooltipText('demo.welcome'), 'top', 3500);
    console.log('📍 1. Navigation vers la page principale...');
    await page.goto('/');
    await page.waitForTimeout(1500);
    
         // 2. Chargement des scénarios
     await showTooltip(getTooltipText('demo.loadingScenarios'), 'center', 3000);
     console.log('📊 2. Attente du chargement des scénarios...');
     await page.waitForSelector('.scenario-card, [data-testid="scenario-card"]', { timeout: 10000 });
     await page.waitForTimeout(1000);
     
     // 3. Sélection du scénario
     await showTooltip(getTooltipText('demo.selectScenario'), 'center', 3000);
     console.log('🎯 3. Sélection du scénario Classic Conquest...');
     const classicScenario = page.locator('text=Classic Conquest').first();
     await expect(classicScenario).toBeVisible({ timeout: 5000 });
     await page.waitForTimeout(1000);
     
     // 4. Lancement du jeu
     await showTooltip(getTooltipText('demo.launchGame'), 'center', 3000);
    console.log('▶️ 4. Clic sur le bouton Play...');
    const playButton = page.locator('a[href*="/game/conquest-classic"], a[href*="conquest-classic"]').first();
    await expect(playButton).toBeVisible({ timeout: 5000 });
    
    // Surligner le bouton avant de cliquer
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('a[href*="conquest-classic"]');
      buttons.forEach(btn => {
        (btn as HTMLElement).style.boxShadow = '0 0 20px #ffd700, 0 0 40px #ffd700';
        (btn as HTMLElement).style.border = '3px solid #ffd700';
      });
    });
    
    await playButton.click();
    await page.waitForTimeout(2000);
    
         // 5. Chargement du jeu
     await showTooltip(getTooltipText('demo.gameInitialization'), 'center', 3500);
     console.log('🎮 5. Attente du chargement du jeu...');
     await expect(page).toHaveURL(/game/, { timeout: 10000 });
     await page.waitForTimeout(2000);
     
     // 6. Interface de jeu
     await showTooltip(getTooltipText('demo.gameInterface'), 'top', 3000);
     console.log('🖥️ 6. Vérification de l\'interface de jeu...');
     await page.waitForSelector('.game-page, .true-heroes-interface, .game-interface', { timeout: 15000 });
     await page.waitForTimeout(1500);
     
     // 7. Tester les boutons du panneau de droite
    await showTooltip(getTooltipText('demo.controlButtons'), 'center', 3000);
    await page.waitForTimeout(1500);
    
    // Tester le bouton Heroes (avec icône seulement)
    const heroesButton = page.locator('button[title*="hero"], .control-btn:has(.btn-icon:text("⚔️"))').first();
    if (await heroesButton.isVisible()) {
      await heroesButton.click();
      await showTooltip(getTooltipText('demo.heroesPanel'), 'center', 2500);
      await page.waitForTimeout(2000);
    }
    
    // Tester le bouton Inventory (avec icône seulement)
    const inventoryButton = page.locator('button[title*="inventory"], .control-btn:has(.btn-icon:text("🎒"))').first();
    if (await inventoryButton.isVisible()) {
      await inventoryButton.click();
      await showTooltip(getTooltipText('demo.inventoryPanel'), 'center', 2500);
      await page.waitForTimeout(2000);
    }
    
    // Tester le bouton Castle (avec icône seulement)
    const castleButton = page.locator('button[title*="castle"], .control-btn:has(.btn-icon:text("🏰"))').first();
    if (await castleButton.isVisible()) {
      await castleButton.click();
      await showTooltip(getTooltipText('demo.castlePanel'), 'center', 2500);
      await page.waitForTimeout(2000);
    }

    // 8. Terminer le tour
    await showTooltip(getTooltipText('demo.endTurn'), 'center', 2500);
    await page.waitForTimeout(1000);
    
    // Utiliser les nouveaux sélecteurs pour le bouton End Turn (avec icône check)
    const nextTurnButton = page.locator('button[title*="End"], .end-turn-btn, .control-btn:has(.btn-icon:text("✅"))').first();
    
    // Surligner le bouton
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(btn => {
        if (btn.textContent?.includes('Turn') || btn.textContent?.includes('tour')) {
          btn.style.boxShadow = '0 0 15px #ff6600, 0 0 30px #ff6600';
          btn.style.border = '2px solid #ff6600';
        }
      });
    });
    
    await nextTurnButton.click();
    await page.waitForTimeout(1000);
    console.log('✅ Tour terminé !');
    
     // 10. Vérification du tour
     await showTooltip(getTooltipText('demo.nextTurn'), 'center', 3000);
     console.log('🔄 10. Vérification du changement de tour...');
     const turnDisplay = page.locator('text=Turn, text=Tour').first();
     if (await turnDisplay.isVisible({ timeout: 3000 })) {
       console.log('✅ Affichage du tour détecté !');
     }
     
     // 11. Fin de la démo
     await showTooltip(getTooltipText('demo.finished'), 'center', 4000);
    console.log('🎉 11. Pause finale - Admirez le gameplay !');
    
    console.log('🎬 === FIN DE LA DÉMO GAMEPLAY AVEC TOOLTIPS ===');
    console.log('✨ Démo terminée avec succès !');
    
    // Vérification finale
    await expect(page).toHaveURL(/game/);
  });
}); 