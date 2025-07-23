import { test, expect } from '@playwright/test';

test('🧪 Force Hero Panel Test', async ({ page }) => {
  console.log('🎬 === TEST FORCER AFFICHAGE HERO PANEL ===');
  
  // 1. Aller sur l'interface
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000);
  
  // 2. Capture avant
  await page.screenshot({ 
    path: 'screenshots/FORCE-01-before-click.png', 
    fullPage: true 
  });
  console.log('📸 Capture avant click sauvegardée');
  
  // 3. Forcer click sur Hero panel
  const heroButton = page.locator('button:has-text("⚔️")');
  const heroExists = await heroButton.isVisible().catch(() => false);
  console.log(`⚔️ Hero button exists: ${heroExists}`);
  
  if (heroExists) {
    await heroButton.click();
    await page.waitForTimeout(2000);
    
    // 4. Capture après click
    await page.screenshot({ 
      path: 'screenshots/FORCE-02-after-hero-click.png', 
      fullPage: true 
    });
    console.log('📸 Capture après click Hero sauvegardée');
    
    // 5. Rechercher spécifiquement les Enhanced panels
    const enhancedHero = page.locator('.enhanced-hero-panel');
    const enhancedHeroExists = await enhancedHero.isVisible().catch(() => false);
    const enhancedHeroCount = await enhancedHero.count();
    
    console.log(`🎯 Enhanced Hero Panel: ${enhancedHeroExists ? '✅ Visible' : '❌ Absent'} (${enhancedHeroCount} found)`);
    
    // 6. Rechercher tous les éléments avec "enhanced" dans la classe
    const enhancedElements = await page.locator('[class*="enhanced"]').count();
    console.log(`🔍 Éléments avec "enhanced": ${enhancedElements}`);
    
    // 7. Rechercher tous les panels
    const allPanels = await page.locator('[class*="panel"]').count();
    console.log(`📋 Tous les panels: ${allPanels}`);
    
    // 8. Vérifier le contenu de sidebar-content
    const sidebarContent = page.locator('.sidebar-content');
    const sidebarHTML = await sidebarContent.innerHTML().catch(() => 'Error getting HTML');
    console.log('📄 Sidebar content HTML:');
    console.log(sidebarHTML.substring(0, 500));
    
    // 9. Tester tous les panels
    const panels = ['🏔️', '⚔️', '🏰', '🎒'];
    for (const panel of panels) {
      const btn = page.locator(`button:has-text("${panel}")`);
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        await page.waitForTimeout(1000);
        
        // Capture de chaque panel
        await page.screenshot({ 
          path: `screenshots/FORCE-panel-${panel}.png`, 
          fullPage: true 
        });
        console.log(`📸 Capture panel ${panel} sauvegardée`);
        
        // Vérifier le contenu après chaque click
        const contentAfter = await sidebarContent.innerHTML().catch(() => 'Error');
        const hasEnhanced = contentAfter.includes('enhanced-') || contentAfter.includes('EnhancedHero') || contentAfter.includes('EnhancedCastle') || contentAfter.includes('EnhancedInventory');
        console.log(`  ${panel} - Enhanced content: ${hasEnhanced ? '✅ Detected' : '❌ Missing'}`);
      }
    }
    
    console.log('🎬 === FIN TEST FORCER HERO PANEL ===');
  } else {
    console.log('❌ Hero button not found - cannot test Enhanced panels');
  }
}); 