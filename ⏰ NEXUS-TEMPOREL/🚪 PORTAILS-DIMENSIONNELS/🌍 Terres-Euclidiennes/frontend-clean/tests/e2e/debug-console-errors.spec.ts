import { test, expect } from '@playwright/test';

test('🔍 Debug - Capture console errors', async ({ page }) => {
  console.log('🚀 Starting console error capture...');
  
  // Capturer tous les messages de console
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    
    // Afficher avec des emojis pour la clarté
    if (type === 'error') {
      console.error(`❌ CONSOLE ERROR: ${text}`);
      // Essayer d'obtenir plus de détails sur l'erreur
      msg.args().forEach(async (arg, index) => {
        try {
          const value = await arg.jsonValue();
          console.error(`   ARG[${index}]:`, value);
        } catch (e) {
          // Ignorer si on ne peut pas sérialiser
        }
      });
    } else if (type === 'warning') {
      console.warn(`⚠️  CONSOLE WARNING: ${text}`);
    } else if (type === 'log') {
      console.log(`📝 CONSOLE LOG: ${text}`);
    }
  });

  // Capturer les erreurs de page non gérées
  page.on('pageerror', error => {
    console.error(`💥 PAGE ERROR:`, error.message);
    console.error(`   Stack:`, error.stack);
  });

  // Capturer les requêtes échouées
  page.on('requestfailed', request => {
    console.error(`🔴 REQUEST FAILED: ${request.method()} ${request.url()}`);
    console.error(`   Failure:`, request.failure()?.errorText);
  });

  // Aller à la page
  console.log('📍 Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000');
  
  // Attendre un peu pour voir les erreurs initiales
  await page.waitForTimeout(3000);
  
  // Essayer de démarrer le jeu
  console.log('🎮 Trying to start a game...');
  
  try {
    // Attendre et cliquer sur un scénario
    await page.waitForSelector('.scenario-card', { timeout: 5000 });
    await page.click('.scenario-card:first-child');
    console.log('✅ Clicked on first scenario');
  } catch (e) {
    console.error('❌ Could not find/click scenario card:', e.message);
  }
  
  await page.waitForTimeout(2000);
  
  try {
    // Essayer de démarrer
    await page.click('button:has-text("Start Game")');
    console.log('✅ Clicked Start Game');
  } catch (e) {
    console.error('❌ Could not click Start Game:', e.message);
  }
  
  // Attendre pour capturer les erreurs du jeu
  await page.waitForTimeout(5000);
  
  // Prendre une capture d'écran finale
  await page.screenshot({ path: 'test-results/console-debug-final.png', fullPage: true });
  console.log('📸 Screenshot saved to test-results/console-debug-final.png');
  
  console.log('🏁 Test completed - check console output above for errors');
}); 