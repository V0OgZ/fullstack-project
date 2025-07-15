import { test, expect } from '@playwright/test';

test.describe('🔍 Debug Scenarios', () => {
  test('Debug scenario state and API calls', async ({ page }) => {
    test.setTimeout(60000);
    
    console.log('🔍 === DEBUG SCENARIOS ===');
    
    // 1. Test backend health
    console.log('🏥 1. Testing backend health...');
    const healthResponse = await page.evaluate(async () => {
      try {
        const response = await fetch('http://localhost:8080/actuator/health');
        return {
          status: response.status,
          ok: response.ok,
          data: await response.json()
        };
      } catch (error) {
        return { error: error.message };
      }
    });
    console.log('🏥 Backend health:', healthResponse);
    
    // 2. Create conquest-classic scenario
    console.log('🔨 2. Creating conquest-classic scenario...');
    const createResponse = await page.evaluate(async () => {
      try {
        const response = await fetch('http://localhost:8080/api/scenarios/predefined/conquest-classic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return {
          status: response.status,
          ok: response.ok,
          data: await response.json()
        };
      } catch (error) {
        return { error: error.message };
      }
    });
    console.log('🔨 Create scenario response:', createResponse);
    
    // 3. Get all scenarios
    console.log('📊 3. Getting all scenarios...');
    const scenariosResponse = await page.evaluate(async () => {
      try {
        const response = await fetch('http://localhost:8080/api/scenarios/all?lang=fr');
        return {
          status: response.status,
          ok: response.ok,
          data: await response.json()
        };
      } catch (error) {
        return { error: error.message };
      }
    });
    console.log('📊 All scenarios:', scenariosResponse);
    
    // 4. Navigate to frontend
    console.log('🌐 4. Navigating to frontend...');
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    // 5. Check if scenario cards are loaded
    console.log('🎮 5. Checking scenario cards...');
    const scenarioCards = await page.locator('[data-testid^="scenario-card-"]').all();
    console.log('🎮 Found scenario cards:', scenarioCards.length);
    
    for (let i = 0; i < scenarioCards.length; i++) {
      const card = scenarioCards[i];
      const testId = await card.getAttribute('data-testid');
      const isLocked = await card.locator('.locked').count() > 0;
      const playButton = await card.locator('[data-testid^="play-button-"]').count();
      
      console.log(`🎮 Card ${i + 1}: ${testId}, locked: ${isLocked}, play button: ${playButton}`);
    }
    
    // 6. Specifically check conquest-classic
    console.log('🎯 6. Checking conquest-classic specifically...');
    const conquestCard = page.locator('[data-testid="scenario-card-conquest-classic"]');
    const conquestExists = await conquestCard.count() > 0;
    console.log('🎯 Conquest card exists:', conquestExists);
    
    if (conquestExists) {
      const isLocked = await conquestCard.locator('.locked').count() > 0;
      const playButton = await conquestCard.locator('[data-testid="play-button-conquest-classic"]').count();
      const allContent = await conquestCard.innerHTML();
      
      console.log('🎯 Conquest card locked:', isLocked);
      console.log('🎯 Conquest play button:', playButton);
      console.log('🎯 Conquest card content:', allContent);
    }
    
    console.log('✅ === DEBUG COMPLETE ===');
  });
}); 