import { test, expect } from '@playwright/test';

// Import translation function for demo tooltips
const getTooltipText = (key: string, language: string = 'en') => {
  const translations: Record<string, Record<string, string>> = {
    en: {
      'demo.welcome': '🏠 Welcome to Heroes of Time!<br/>I will show you how to play a game...',
      'demo.loadingScenarios': '📊 Loading available scenarios...<br/>Please wait while I fetch the missions',
      'demo.selectScenario': '🎯 I choose the "Classic Conquest" scenario<br/>An epic adventure awaits you!',
      'demo.launchGame': '▶️ Click the "Play" button!<br/>The adventure begins now...',
      'demo.gameInitialization': '🎮 Game initialization...<br/>Creating the map and heroes in progress',
      'demo.gameInterface': '🖥️ Game interface loaded!<br/>Here is your kingdom to conquer',
      'demo.controlButtons': '🎮 Testing control buttons - Heroes, Inventory, Castle',
      'demo.heroesPanel': '⚔️ Heroes panel opened! You can see your heroes here.',
      'demo.inventoryPanel': '🎒 Inventory panel opened! Manage your equipped items.',
      'demo.castlePanel': '🏰 Castle panel opened! Build and manage your castles.',
      'demo.endTurn': '🔄 End turn - Click "End Turn" to finish.',
      'demo.nextTurn': '🔄 Next turn in progress<br/>Your kingdom evolves and grows!',
      'demo.finished': '🎉 Demo completed!<br/>You now know how to play Heroes of Time<br/><br/>✨ Have fun in your conquests! ✨'
    }
  };
  return translations[language]?.[key] || key;
};

test.describe('🎮 Heroes of Time - Gameplay Demo', () => {
  test('Interactive demo with tooltips: Choose scenario and play turn', async ({ page }) => {
    test.setTimeout(120000); // 2 minutes for complete demo
    console.log('🎬 === GAMEPLAY DEMO WITH TOOLTIPS START ===');
    
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
         console.log('📍 1. Navigate to main page...');
    await page.goto('/');
    await page.waitForTimeout(1500);
    
         // 2. Load scenarios
     await showTooltip(getTooltipText('demo.loadingScenarios'), 'center', 3000);
     console.log('📊 2. Wait for scenarios to load...');
     await page.waitForSelector('.scenario-card, [data-testid="scenario-card"]', { timeout: 10000 });
     await page.waitForTimeout(1000);
     
     // 3. Select scenario
     await showTooltip(getTooltipText('demo.selectScenario'), 'center', 3000);
     console.log('🎯 3. Select Classic Conquest scenario...');
     const classicScenario = page.locator('text=Classic Conquest').first();
     await expect(classicScenario).toBeVisible({ timeout: 5000 });
     await page.waitForTimeout(1000);
     
     // 4. Launch game
     await showTooltip(getTooltipText('demo.launchGame'), 'center', 3000);
    console.log('▶️ 4. Click Play button...');
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
    
         // 5. Game loading
     await showTooltip(getTooltipText('demo.gameInitialization'), 'center', 3500);
     console.log('🎮 5. Wait for game to load...');
     await expect(page).toHaveURL(/game/, { timeout: 10000 });
     await page.waitForTimeout(2000);
     
     // 6. Game interface
     await showTooltip(getTooltipText('demo.gameInterface'), 'top', 3000);
     console.log('🖥️ 6. Verify game interface...');
     await page.waitForSelector('.game-page, .true-heroes-interface, .game-interface', { timeout: 15000 });
     await page.waitForTimeout(1500);
     
     // 7. Test right panel buttons
    await showTooltip(getTooltipText('demo.controlButtons'), 'center', 3000);
    await page.waitForTimeout(1500);
    
    // Test Heroes button (with icon only)
    const heroesButton = page.locator('button[title*="hero"], .control-btn:has(.btn-icon:text("⚔️"))').first();
    if (await heroesButton.isVisible()) {
      await heroesButton.click();
      await showTooltip(getTooltipText('demo.heroesPanel'), 'center', 2500);
      console.log('✅ LOG: Heroes panel opened successfully');
      await page.waitForTimeout(2000);
      
      // Try to select a hero on the map
      console.log('🔍 LOG: Attempting to select hero on map');
      const heroOnMap = page.locator('.hero-marker, [data-hero], .unit-marker').first();
      if (await heroOnMap.isVisible({ timeout: 3000 })) {
        await heroOnMap.click();
        console.log('✅ LOG: Hero selected on map');
        await showTooltip('🎯 Hero selected! Let\'s see details...', 'center', 2000);
      } else {
        console.log('❌ LOG: No heroes found on map');
      }
    }
    
    // Tester le bouton Castle et acheter des unités
    const castleButton = page.locator('button[title*="castle"], .control-btn:has(.btn-icon:text("🏰"))').first();
    if (await castleButton.isVisible()) {
      await castleButton.click();
      await showTooltip('🏰 Castle panel opened! Let\'s buy units...', 'center', 2500);
      console.log('✅ LOG: Castle panel opened successfully');
      await page.waitForTimeout(2000);
      
      // Try to buy units
      console.log('🔍 LOG: Search for unit purchase buttons');
      const buyButtons = page.locator('button').filter({ hasText: /Buy|Acheter|Recruit|\+/ });
      const buyButtonCount = await buyButtons.count();
      console.log(`🔍 LOG: ${buyButtonCount} purchase buttons found`);
      
      if (buyButtonCount > 0) {
        for (let i = 0; i < Math.min(3, buyButtonCount); i++) {
          const buyBtn = buyButtons.nth(i);
          if (await buyBtn.isVisible() && await buyBtn.isEnabled()) {
            await buyBtn.click();
            console.log(`✅ LOG: Unit ${i+1} purchase successful`);
            await showTooltip(`💰 Unit ${i+1} purchased!`, 'center', 1500);
            await page.waitForTimeout(1000);
          }
        }
      } else {
        console.log('❌ LOG: No purchase buttons found');
      }
    }
    
    // Tester le bouton Inventory
    const inventoryButton = page.locator('button[title*="inventory"], .control-btn:has(.btn-icon:text("🎒"))').first();
    if (await inventoryButton.isVisible()) {
      await inventoryButton.click();
      await showTooltip(getTooltipText('demo.inventoryPanel'), 'center', 2500);
      console.log('✅ LOG: Inventory panel opened successfully');
      await page.waitForTimeout(2000);
      
      // Try to equip items
      console.log('🔍 LOG: Search for equippable items');
      const equipButtons = page.locator('button').filter({ hasText: /Equip|Équiper/ });
      const equipCount = await equipButtons.count();
      console.log(`🔍 LOG: ${equipCount} equippable items found`);
      
      if (equipCount > 0) {
        const equipBtn = equipButtons.first();
        if (await equipBtn.isVisible()) {
          await equipBtn.click();
          console.log('✅ LOG: Item equipped successfully');
          await showTooltip('⚔️ Item equipped! Hero stronger!', 'center', 1500);
        }
      }
    }

    // 8. Terminer le premier tour
    await showTooltip(getTooltipText('demo.endTurn'), 'center', 2500);
    await page.waitForTimeout(1000);
    
    const nextTurnButton = page.locator('button[title*="End"], .end-turn-btn, .control-btn:has(.btn-icon:text("🌟"))').first();
    await nextTurnButton.click();
    await page.waitForTimeout(1000);
    console.log('✅ LOG: First turn completed!');
    
    // 9. Second turn - Advanced actions
    await showTooltip('🔄 Turn 2! Let\'s explore more actions...', 'center', 3000);
    console.log('🎮 LOG: Begin turn 2 - advanced actions');
    
    // Try to move a hero
    console.log('🔍 LOG: Attempting hero movement');
    const mapArea = page.locator('.map-container, .game-map, canvas').first();
    if (await mapArea.isVisible()) {
      // Click at different locations on the map to simulate movement
      const mapBox = await mapArea.boundingBox();
      if (mapBox) {
        await mapArea.click({ position: { x: mapBox.width * 0.3, y: mapBox.height * 0.4 } });
        await showTooltip('🚶 Moving to new territory...', 'center', 2000);
        console.log('✅ LOG: Movement command sent');
        await page.waitForTimeout(1500);
        
        await mapArea.click({ position: { x: mapBox.width * 0.6, y: mapBox.height * 0.3 } });
        await showTooltip('🗺️ Exploring the map...', 'center', 2000);
        console.log('✅ LOG: Second movement sent');
        await page.waitForTimeout(1500);
      }
    }
    
    // Complete second turn
    await nextTurnButton.click();
    console.log('✅ LOG: Second turn completed!');
    await showTooltip('🔄 Turn 3 begins! Final actions...', 'center', 2000);
    
    // 10. Final verification and statistics
    await showTooltip(getTooltipText('demo.nextTurn'), 'center', 3000);
    console.log('🔄 LOG: Verifying turn change...');
    
    // Check final statistics
    console.log('📊 LOG: Retrieving final statistics');
    const goldDisplay = page.locator('text=💰').or(page.locator('text=Gold')).first();
    if (await goldDisplay.isVisible({ timeout: 3000 })) {
      const goldText = await goldDisplay.textContent();
      console.log(`💰 LOG: Final gold: ${goldText}`);
    }
    
    const turnDisplay = page.locator('text=Turn').or(page.locator('text=Tour')).first();
    if (await turnDisplay.isVisible({ timeout: 3000 })) {
      const turnText = await turnDisplay.textContent();
      console.log(`🎯 LOG: Final turn: ${turnText}`);
    }
    
    // 11. End of complex demo
    await showTooltip(getTooltipText('demo.finished'), 'center', 4000);
    console.log('🎉 LOG: Complex demo completed successfully!');
    console.log('📋 LOG: Actions completed - Panel navigation, unit purchases, equipment, movements, 3 turns');
    console.log('✨ Demo completed successfully!');
    
    // Vérification finale
    await expect(page).toHaveURL(/game/);
  });
}); 