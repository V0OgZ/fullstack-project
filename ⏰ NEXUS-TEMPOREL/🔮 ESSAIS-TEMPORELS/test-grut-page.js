const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Charger la page GRUT
  await page.goto('file:///workspace/panopticon-grut-dashboard/grut-warcraft-portal.html');
  
  // Attendre que la page soit chargée
  await page.waitForTimeout(2000);
  
  // Prendre un screenshot
  await page.screenshot({ path: 'grut-warcraft-screenshot.png', fullPage: true });
  
  console.log('✅ Screenshot capturé : grut-warcraft-screenshot.png');
  
  // Garder ouvert 5 secondes pour voir
  await page.waitForTimeout(5000);
  
  await browser.close();
})();