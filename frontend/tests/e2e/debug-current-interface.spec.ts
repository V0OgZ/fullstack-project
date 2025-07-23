import { test, expect } from '@playwright/test';

test('🔍 Debug Current Interface State', async ({ page }) => {
  console.log('🎬 === DÉBUT DEBUG INTERFACE ACTUELLE ===');
  
  // 1. Aller sur l'interface
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(5000);
  
  // 2. Capture immédiate de ce qu'on voit vraiment
  await page.screenshot({ 
    path: 'screenshots/DEBUG-01-current-interface.png', 
    fullPage: true 
  });
  console.log('📸 Capture actuelle sauvegardée');
  
  // 3. Analyser le DOM réel
  const bodyHTML = await page.locator('body').innerHTML();
  console.log('🔍 Recherche des éléments interface...');
  
  // Vérifier chaque élément spécifiquement
  const elements = [
    { name: 'TrueHeroesInterface', selector: '.true-heroes-interface' },
    { name: 'Game Layout', selector: '.game-layout' },
    { name: 'Right Sidebar', selector: '.right-sidebar' },
    { name: 'Sidebar Header', selector: '.sidebar-header' },
    { name: 'Sidebar Controls', selector: '.sidebar-controls' },
    { name: 'Sidebar Tabs', selector: '.sidebar-tab' },
    { name: 'Sidebar Content', selector: '.sidebar-content' },
    { name: 'Panel Content', selector: '.panel-content' },
    { name: 'Game Map Container', selector: '.game-map-container' },
    { name: 'Turn Counter', selector: '.turn-counter' },
    { name: 'Resources', selector: '.resources' },
    { name: 'Enhanced Hero Panel', selector: '.enhanced-hero-panel' },
    { name: 'Enhanced Castle Panel', selector: '.enhanced-castle-panel' },
    { name: 'Enhanced Inventory Panel', selector: '.enhanced-inventory-panel' }
  ];
  
  for (const element of elements) {
    const exists = await page.locator(element.selector).isVisible().catch(() => false);
    const count = await page.locator(element.selector).count();
    console.log(`${element.name}: ${exists ? '✅ Visible' : '❌ Absent'} (${count} found)`);
    
    // Si visible, capturer la zone
    if (exists && count > 0) {
      try {
        await page.locator(element.selector).first().screenshot({ 
          path: `screenshots/DEBUG-element-${element.name.replace(/\s+/g, '-').toLowerCase()}.png` 
        });
        console.log(`  📸 Capture ${element.name} sauvegardée`);
      } catch (err) {
        console.log(`  ⚠️ Impossible de capturer ${element.name}`);
      }
    }
  }
  
  // 4. Tester spécifiquement les composants Enhanced
  console.log('\n🎯 === TEST COMPOSANTS ENHANCED ===');
  
  // Vérifier imports Enhanced
  const enhancedImports = [
    'EnhancedHeroPanel',
    'EnhancedCastlePanel', 
    'EnhancedInventoryPanel'
  ];
  
  for (const component of enhancedImports) {
    const hasClass = bodyHTML.includes(component.toLowerCase()) || bodyHTML.includes(component);
    console.log(`${component}: ${hasClass ? '✅ Détecté' : '❌ Absent'}`);
  }
  
  // 5. Vérifier la structure DOM attendue
  console.log('\n📋 === STRUCTURE DOM ATTENDUE ===');
  const expectedStructure = [
    '.true-heroes-interface > .game-layout',
    '.game-layout > .game-map-container',
    '.game-layout > .right-sidebar',
    '.right-sidebar > .sidebar-header',
    '.right-sidebar > .sidebar-content'
  ];
  
  for (const path of expectedStructure) {
    const exists = await page.locator(path).isVisible().catch(() => false);
    console.log(`${path}: ${exists ? '✅' : '❌'}`);
  }
  
  // 6. Vérifier le CSS chargé
  const cssLinks = await page.locator('link[rel="stylesheet"]').count();
  const cssFiles = await page.locator('link[rel="stylesheet"]').evaluateAll(
    links => links.map(link => link.getAttribute('href'))
  );
  console.log(`\n🎨 CSS Files loaded: ${cssLinks}`);
  cssFiles.forEach((file, i) => console.log(`  ${i+1}. ${file}`));
  
  // 7. Vérifier les erreurs JavaScript
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  await page.waitForTimeout(2000);
  if (errors.length > 0) {
    console.log('\n❌ === ERREURS JAVASCRIPT ===');
    errors.forEach((error, i) => console.log(`  ${i+1}. ${error}`));
  } else {
    console.log('\n✅ Aucune erreur JavaScript détectée');
  }
  
  // 8. Capture finale avec tous les éléments surlignés
  await page.addStyleTag({
    content: `
      .true-heroes-interface { border: 5px solid red !important; }
      .game-layout { border: 3px solid blue !important; }
      .right-sidebar { border: 3px solid green !important; background: rgba(0,255,0,0.1) !important; }
      .sidebar-header { border: 2px solid orange !important; }
      .sidebar-content { border: 2px solid purple !important; }
      .panel-content { border: 2px solid cyan !important; }
      .enhanced-hero-panel { border: 3px solid yellow !important; }
      .enhanced-castle-panel { border: 3px solid pink !important; }
      .enhanced-inventory-panel { border: 3px solid lime !important; }
    `
  });
  
  await page.screenshot({ 
    path: 'screenshots/DEBUG-99-final-highlighted.png', 
    fullPage: true 
  });
  console.log('📸 Capture finale avec highlighting sauvegardée');
  
  console.log('\n🎬 === FIN DEBUG INTERFACE ACTUELLE ===');
}); 