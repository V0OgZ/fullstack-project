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
        if (oldTooltip) oldTooltip.remove();
        
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
            animation: heroesTooltip 0.5s ease-out;
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
          <style>
            @keyframes heroesTooltip {
              0% { opacity: 0; transform: translateX(-50%) translateY(-30px) scale(0.8); }
              100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
            }
          </style>
        `;
        document.body.appendChild(tooltip);
        
        // Supprimer après la durée spécifiée
        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.style.animation = 'heroesTooltip 0.3s ease-in reverse';
            setTimeout(() => tooltip.remove(), 300);
          }
        }, duration);
      }, { text, position, duration });
      
      await page.waitForTimeout(duration);
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
     
     // 7. Sélection d'un héros
     await showTooltip('🦸 Sélection de votre héros principal<br/>Ce brave guerrier mènera vos troupes !', 'center', 1500);
    console.log('🦸 7. Sélection d\'un héros...');
    const hero = page.locator('.hero-portrait-img, .hero-emoji-fallback, .hero-card, [data-testid="hero"]').first();
    if (await hero.isVisible()) {
      // Surligner le héros
      await page.evaluate(() => {
        const heroes = document.querySelectorAll('.hero, [data-testid="hero"], .hero-card');
        if (heroes.length > 0) {
          (heroes[0] as HTMLElement).style.boxShadow = '0 0 15px #00ff00, 0 0 30px #00ff00';
          (heroes[0] as HTMLElement).style.border = '2px solid #00ff00';
        }
      });
      
      await hero.click();
      await page.waitForTimeout(1000);
      console.log('✅ Héros sélectionné !');
    } else {
      console.log('⚠️ Aucun héros trouvé, continue...');
    }
    
         // 8. Déplacement sur la carte
     await showTooltip('🗺️ Déplacement sur la carte du royaume<br/>Explorons les terres environnantes !', 'center', 1500);
     console.log('🗺️ 8. Tentative de déplacement sur la carte...');
     const mapTile = page.locator('canvas, .map-tile, .hex-tile').first();
     if (await mapTile.isVisible()) {
       await mapTile.click();
       await page.waitForTimeout(1000);
       console.log('✅ Clic sur la carte effectué !');
     } else {
       console.log('⚠️ Carte non trouvée, continue...');
     }
     
     // 9. Fin du tour
     await showTooltip('⏭️ Fin du tour de jeu<br/>Passons au tour suivant pour voir l\'évolution !', 'center', 1500);
     console.log('⏭️ 9. Recherche du bouton pour finir le tour...');
     const nextTurnButton = page.locator('button:has-text("End Turn"), .end-turn-btn').first();
     if (await nextTurnButton.isVisible({ timeout: 3000 })) {
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
     } else {
       console.log('⚠️ Bouton de fin de tour non trouvé, simule avec une pause...');
       await page.waitForTimeout(1500);
     }
     
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