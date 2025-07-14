import { test, expect } from '@playwright/test';

test.describe('🎮 Heroes of Time - Gameplay Demo', () => {
  test('Demo automatique avec tooltips: Choisir scénario et jouer 1 tour', async ({ page }) => {
    test.setTimeout(120000); // 2 minutes pour la démo complète
    console.log('🎬 === DÉBUT DE LA DÉMO GAMEPLAY AVEC TOOLTIPS ===');
    
    // Fonction pour ajouter un tooltip visuel
    const showTooltip = async (text: string, position: string = 'center', duration: number = 3000) => {
      await page.evaluate(({ text, position, duration }) => {
        // Supprimer l'ancien tooltip s'il existe
        const oldTooltip = document.querySelector('.demo-tooltip');
        if (oldTooltip) {
          // Ne pas supprimer, juste changer le contenu
          const contentDiv = oldTooltip.querySelector('.tooltip-content');
          if (contentDiv) {
            contentDiv.textContent = text;
            return;
          }
        }
        
        // Créer le nouveau tooltip seulement s'il n'existe pas
        const tooltip = document.createElement('div');
        tooltip.className = 'demo-tooltip';
        tooltip.innerHTML = `
          <div style="
            position: fixed;
            top: ${position === 'top' ? '80px' : position === 'bottom' ? 'auto' : '50%'};
            bottom: ${position === 'bottom' ? '80px' : 'auto'};
            left: 50%;
            transform: translateX(-50%) ${position === 'center' ? 'translateY(-50%)' : ''};
            background: rgba(26,26,46,0.75);
            color: #ffd700;
            padding: 12px 20px;
            border-radius: 8px;
            border: 1px solid rgba(255,215,0,0.6);
            font-family: 'Georgia', serif;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            backdrop-filter: blur(3px);
            z-index: 9999;
            min-width: 200px;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            transition: opacity 0.3s ease;
          ">
            <div class="tooltip-content" style="
              margin: 0;
              padding: 0;
            ">${text}</div>
          </div>
        `;
        
        document.body.appendChild(tooltip);
        
        // Auto-remove après la durée spécifiée
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
      }, { text, position, duration });
    };
    
         // 1. Page principale
     await showTooltip('🏠 Bienvenue dans Heroes of Time !<br/>Je vais vous montrer comment jouer une partie...', 'top', 2000);
    console.log('📍 1. Navigation vers la page principale...');
    await page.goto('/');
    await page.waitForTimeout(1000);
    
         // 2. Chargement des scénarios
     await showTooltip('📊 Chargement des scénarios disponibles...<br/>Veuillez patienter pendant que je récupère les missions', 'center', 1500);
     console.log('📊 2. Attente du chargement des scénarios...');
     await page.waitForSelector('.scenario-card, [data-testid="scenario-card"]', { timeout: 10000 });
     await page.waitForTimeout(500);
     
     // 3. Sélection du scénario
     await showTooltip('🎯 Je choisis le scénario "Classic Conquest"<br/>Une aventure épique vous attend !', 'center', 1500);
     console.log('🎯 3. Sélection du scénario Classic Conquest...');
     const classicScenario = page.locator('text=Classic Conquest').first();
     await expect(classicScenario).toBeVisible({ timeout: 5000 });
     await page.waitForTimeout(500);
     
     // 4. Lancement du jeu
     await showTooltip('▶️ Clic sur le bouton "Jouer" !<br/>L\'aventure commence maintenant...', 'center', 1500);
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
     await showTooltip('🎮 Initialisation de la partie...<br/>Création de la carte et des héros en cours', 'center', 2000);
     console.log('🎮 5. Attente du chargement du jeu...');
     await expect(page).toHaveURL(/game/, { timeout: 10000 });
     await page.waitForTimeout(1500);
     
     // 6. Interface de jeu
     await showTooltip('🖥️ Interface de jeu chargée !<br/>Voici votre royaume à conquérir', 'top', 1500);
     console.log('🖥️ 6. Vérification de l\'interface de jeu...');
     await page.waitForSelector('.game-page, .true-heroes-interface, .game-interface', { timeout: 15000 });
     await page.waitForTimeout(1000);
     
     // 7. Tester les boutons du panneau de droite
    await showTooltip('🎮 Test des boutons de contrôle - Heroes, Inventory, Castle', 'center', 1500);
    await page.waitForTimeout(1000);
    
    // Tester le bouton Heroes (avec icône seulement)
    const heroesButton = page.locator('button[title*="hero"], .control-btn:has(.btn-icon:text("⚔️"))').first();
    if (await heroesButton.isVisible()) {
      await heroesButton.click();
      await showTooltip('⚔️ Panneau Heroes ouvert ! Vous pouvez voir vos héros ici.', 'center', 1500);
      await page.waitForTimeout(1500);
    }
    
    // Tester le bouton Inventory (avec icône seulement)
    const inventoryButton = page.locator('button[title*="inventory"], .control-btn:has(.btn-icon:text("🎒"))').first();
    if (await inventoryButton.isVisible()) {
      await inventoryButton.click();
      await showTooltip('🎒 Panneau Inventory ouvert ! Gérez vos objets équipés.', 'center', 1500);
      await page.waitForTimeout(1500);
    }
    
    // Tester le bouton Castle (avec icône seulement)
    const castleButton = page.locator('button[title*="castle"], .control-btn:has(.btn-icon:text("🏰"))').first();
    if (await castleButton.isVisible()) {
      await castleButton.click();
      await showTooltip('🏰 Panneau Castle ouvert ! Construisez et gérez vos châteaux.', 'center', 1500);
      await page.waitForTimeout(1500);
    }

    // 8. Terminer le tour
    await showTooltip('🔄 Fin du tour - Cliquez sur "End Turn" pour terminer.', 'center', 1000);
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
     await showTooltip('🔄 Tour suivant en cours<br/>Votre royaume évolue et grandit !', 'center', 1500);
     console.log('🔄 10. Vérification du changement de tour...');
     const turnDisplay = page.locator('text=Turn, text=Tour').first();
     if (await turnDisplay.isVisible({ timeout: 3000 })) {
       console.log('✅ Affichage du tour détecté !');
     }
     
     // 11. Fin de la démo
     await showTooltip('🎉 Démonstration terminée !<br/>Vous savez maintenant jouer à Heroes of Time<br/><br/>✨ Amusez-vous bien dans vos conquêtes ! ✨', 'center', 2500);
    console.log('🎉 11. Pause finale - Admirez le gameplay !');
    
    console.log('🎬 === FIN DE LA DÉMO GAMEPLAY AVEC TOOLTIPS ===');
    console.log('✨ Démo terminée avec succès !');
    
    // Vérification finale
    await expect(page).toHaveURL(/game/);
  });
}); 