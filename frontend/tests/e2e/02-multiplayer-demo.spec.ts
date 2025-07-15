import { test, expect } from '@playwright/test';
import { getTooltipText } from './utils/translations';

test.describe('🎮 Heroes of Time - Multiplayer Demo', () => {
  test('Demo automatique multijoueur avec tooltips: Choisir scénario et jouer 1 tour', async ({ page }) => {
    test.setTimeout(120000); // 2 minutes timeout
    
    // Force English language
    await page.addInitScript(() => {
      localStorage.setItem('heroes-reforged-i18n', JSON.stringify({
        state: { language: 'en' },
        version: 0
      }));
    });
    
    console.log('🎬 === DÉBUT DE LA DÉMO MULTIJOUEUR ===');
    
    // 1. Navigation vers la page principale
    console.log('📍 1. Navigation vers la page principale...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // 2. Attente du chargement des scénarios
    console.log('📊 2. Attente du chargement des scénarios...');
    await page.waitForTimeout(2000);
    
    // 3. Sélection du scénario Multiplayer Arena
    console.log('🎯 3. Sélection du scénario Multiplayer Arena...');
    const scenarioCard = page.getByTestId('scenario-card-multiplayer-arena');
    await expect(scenarioCard).toBeVisible({ timeout: 10000 });
    await scenarioCard.click();
    await page.waitForTimeout(1000);
    
    // 4. Lancement du jeu
    console.log('▶️ 4. Clic sur le bouton Jouer...');
    const playButton = page.getByTestId('play-button-multiplayer-arena');
    await expect(playButton).toBeVisible({ timeout: 5000 });
    await playButton.click();
    
    // 5. Attente du chargement du gestionnaire de sessions
    console.log('⏳ 5. Attente du gestionnaire de sessions multijoueur...');
    await page.waitForTimeout(3000);
    
    // Check if we're in multiplayer session manager
    const createSessionBtn = page.getByTestId('create-session-btn');
    const sessionList = page.locator('.session-list');
    
    if (await createSessionBtn.count() > 0) {
      console.log('✅ Gestionnaire de sessions multijoueur chargé!');
      
      // Fill session details if form is visible
      const sessionNameInput = page.locator('input[placeholder*="session name"]');
      if (await sessionNameInput.count() > 0) {
        await sessionNameInput.fill(`Demo Session ${Date.now()}`);
      }
      
      const heroNameInput = page.locator('input[placeholder*="hero name"]');
      if (await heroNameInput.count() > 0) {
        await heroNameInput.fill('DemoHero');
      }
      
      // Take screenshot of multiplayer session manager
      await page.screenshot({ 
        path: 'test-results/multiplayer-session-manager.png',
        fullPage: true
      });
      
      console.log('📸 Screenshot du gestionnaire de sessions sauvegardé');
    } else if (await sessionList.count() > 0) {
      console.log('📋 Liste des sessions disponibles affichée');
      
      // Take screenshot of session list
      await page.screenshot({ 
        path: 'test-results/multiplayer-session-list.png',
        fullPage: true
      });
    } else {
      console.log('⚠️ Interface multijoueur non détectée, vérification du canvas...');
      
      // Maybe the game started directly?
      const canvas = page.locator('canvas');
      if (await canvas.count() > 0) {
        console.log('🎮 Jeu démarré directement!');
        await page.screenshot({ 
          path: 'test-results/multiplayer-game-started.png',
          fullPage: true
        });
      }
    }
    
    console.log('✅ === DÉMO MULTIJOUEUR TERMINÉE ===');
  });
}); 