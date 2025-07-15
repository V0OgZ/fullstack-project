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
        
    // 1. Navigation directe vers la page multijoueur
    console.log('📍 1. Navigation vers la page multijoueur...');
    await page.goto('http://localhost:3000/multiplayer');
    await page.waitForLoadState('networkidle');
    
    // 2. Attente du chargement du gestionnaire de sessions
    console.log('⏳ 2. Attente du gestionnaire de sessions multijoueur...');
    await page.waitForTimeout(3000);
    
    // Check if we're in multiplayer session manager
    const createSessionBtn = page.getByTestId('create-session-btn');
    const sessionList = page.locator('.session-list');
    
    if (await createSessionBtn.count() > 0) {
      console.log('✅ Gestionnaire de sessions multijoueur chargé!');
      
      // Create a new session
      console.log('🎮 Création d\'une nouvelle session...');
      await createSessionBtn.click();
      await page.waitForTimeout(2000);
    
      // Fill session details if form is visible
      const sessionNameInput = page.locator('input[placeholder*="session name"]');
      if (await sessionNameInput.count() > 0) {
        await sessionNameInput.fill(`Demo Session ${Date.now()}`);
      }
      
      const heroNameInput = page.locator('input[placeholder*="hero name"]');
      if (await heroNameInput.count() > 0) {
        await heroNameInput.fill('DemoHero');
    }
    
      // Take screenshot of multiplayer session creation
      await page.screenshot({ 
        path: 'test-results/multiplayer-session-creation.png',
        fullPage: true
      });
      
      console.log('📸 Screenshot de la création de session sauvegardé');
    } else if (await sessionList.count() > 0) {
      console.log('📋 Liste des sessions disponibles affichée');
    
      // Check if there are any sessions to join
      const sessionItems = page.locator('.session-item');
      const sessionCount = await sessionItems.count();
      
      if (sessionCount > 0) {
        console.log(`🎯 ${sessionCount} session(s) disponible(s)`);
        
        // Try to join the first session
        const joinButton = sessionItems.first().locator('button');
        if (await joinButton.count() > 0) {
          console.log('🔗 Tentative de rejoindre la première session...');
          await joinButton.click();
          await page.waitForTimeout(3000);
        }
      } else {
        console.log('⚠️ Aucune session disponible à rejoindre');
      }
      
      // Take screenshot of session list
      await page.screenshot({ 
        path: 'test-results/multiplayer-session-list.png',
        fullPage: true
      });
    } else {
      console.log('⚠️ Interface multijoueur non détectée');
      
      // Take screenshot of current state
      await page.screenshot({ 
        path: 'test-results/multiplayer-unexpected-state.png',
        fullPage: true
      });
    }
    
    console.log('✅ === DÉMO MULTIJOUEUR TERMINÉE ===');
  });
}); 