import { test, expect } from '@playwright/test';

test.describe('Hero Images Debug', () => {
  test('Debug hero images loading', async ({ page }) => {
    test.setTimeout(60000);
    
    // Capturer tous les logs
    page.on('console', msg => {
      if (msg.type() === 'log' || msg.type() === 'error') {
        console.log(`[BROWSER ${msg.type().toUpperCase()}]:`, msg.text());
      }
    });
    
    console.log('🚀 Starting hero images debug test...');
    
    // 1. Navigate to game
    await page.goto('/');
    await page.waitForSelector('[data-testid="scenario-card-conquest-classic"]', { timeout: 10000 });
    await page.click('[data-testid="scenario-card-conquest-classic"]');
    console.log('✅ Navigated to game');
    
    // 2. Wait for game interface
    await page.waitForSelector('.true-heroes-interface', { timeout: 10000 });
    console.log('✅ Game interface loaded');
    
    // 3. Wait for game to stabilize
    await page.waitForTimeout(3000);
    
    // 4. Click on Heroes button
    await page.click('.control-btn[title="Heroes"]');
    console.log('✅ Heroes button clicked');
    
    // 5. Wait for hero panel
    await page.waitForTimeout(2000);
    
    // 6. Check hero images
    const heroImageInfo = await page.evaluate(() => {
      const heroPortraitImg = document.querySelector('.hero-portrait-img');
      const heroImage = document.querySelector('.hero-image');
      const heroName = document.querySelector('.hero-name');
      
      return {
        hasPortraitImg: !!heroPortraitImg,
        portraitSrc: heroPortraitImg?.getAttribute('src') || 'Not found',
        portraitLoaded: heroPortraitImg?.complete || false,
        portraitNaturalWidth: heroPortraitImg?.naturalWidth || 0,
        hasHeroImage: !!heroImage,
        heroName: heroName?.textContent || 'Unknown',
        imageElements: document.querySelectorAll('img').length,
        heroImageContainer: !!document.querySelector('.hero-image')
      };
    });
    
    console.log('🖼️ Hero image info:', heroImageInfo);
    
    // 7. Check all available hero images
    const availableImages = [
      '/assets/heroes/mage.png',
      '/assets/heroes/archer.png', 
      '/assets/heroes/paladin.png',
      '/assets/heroes/warrior.png'
    ];
    
    for (const imagePath of availableImages) {
      const imageStatus = await page.evaluate((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ src, loaded: true, width: img.width, height: img.height });
          img.onerror = () => resolve({ src, loaded: false, error: 'Failed to load' });
          img.src = src;
        });
      }, imagePath);
      
      console.log(`📸 Image ${imagePath}:`, imageStatus);
    }
    
    // 8. Cycle through heroes to test different images
    console.log('🔄 Testing hero cycling...');
    
    for (let i = 0; i < 3; i++) {
      await page.click('.control-btn[title="Heroes"]');
      await page.waitForTimeout(1000);
      
      const currentHero = await page.evaluate(() => {
        const heroName = document.querySelector('.hero-name');
        const heroImg = document.querySelector('.hero-portrait-img');
        return {
          name: heroName?.textContent || 'Unknown',
          imageSrc: heroImg?.getAttribute('src') || 'No image',
          cycle: i + 1
        };
      });
      
      console.log(`🔄 Hero cycle ${i + 1}:`, currentHero);
    }
    
    console.log('✅ Hero images debug test completed');
  });
}); 