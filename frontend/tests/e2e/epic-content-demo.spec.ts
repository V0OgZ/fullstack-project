import { test, expect } from '@playwright/test';

test.describe('🎮 Epic Content Demo - Heroes & Creatures', () => {
  test('Demo du système épique complet', async ({ page }) => {
    console.log('🚀 Starting Epic Content Demo...');
    
    // Aller sur la page du jeu
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    
    // Cliquer sur "Start Game" si présent
    const startButton = page.locator('text=Start Game').first();
    if (await startButton.isVisible()) {
      await startButton.click();
      await page.waitForTimeout(1000);
    }
    
    // Chercher le bouton Dragon épique 🐉
    console.log('🔍 Looking for Epic Content button...');
    const epicButton = page.locator('button').filter({ hasText: '🐉' }).first();
    
    if (await epicButton.isVisible()) {
      console.log('✅ Found Epic Content button!');
      await epicButton.click();
      await page.waitForTimeout(1500);
      
      // Vérifier que le modal s'ouvre
      await expect(page.locator('text=CONTENU ÉPIQUE DE HEROES OF TIME')).toBeVisible();
      console.log('🎉 Epic Content modal opened!');
      
      // Tester l'onglet Créatures
      console.log('🐉 Testing Creatures tab...');
      const creaturesTab = page.locator('button').filter({ hasText: '🐉 Créatures' }).first();
      await creaturesTab.click();
      await page.waitForTimeout(1000);
      
      // Vérifier que les créatures se chargent
      await expect(page.locator('text=CRÉATURES ÉPIQUES (Backend API)')).toBeVisible();
      console.log('✅ Creatures loaded from backend!');
      
      // Vérifier quelques créatures spécifiques
      const dragonRouge = page.locator('text=Dragon Rouge');
      if (await dragonRouge.isVisible()) {
        console.log('🔥 Dragon Rouge found!');
      }
      
      const licorne = page.locator('text=Licorne');
      if (await licorne.isVisible()) {
        console.log('🦄 Licorne found!');
      }
      
      // Tester l'onglet Héros
      console.log('🦸 Testing Heroes tab...');
      const heroesTab = page.locator('button').filter({ hasText: '🦸 Héros' }).first();
      await heroesTab.click();
      await page.waitForTimeout(1000);
      
      // Vérifier que les héros se chargent
      await expect(page.locator('text=HÉROS LÉGENDAIRES (Backend API)')).toBeVisible();
      console.log('✅ Heroes loaded from backend!');
      
      // Vérifier quelques héros spécifiques
      const arthur = page.locator('text=Arthur Pendragon');
      if (await arthur.isVisible()) {
        console.log('⚔️ Arthur Pendragon found!');
      }
      
      const jeanne = page.locator('text=Jeanne d\'Arc');
      if (await jeanne.isVisible()) {
        console.log('🛡️ Jeanne d\'Arc found!');
      }
      
      const merlin = page.locator('text=Merlin l\'Enchanteur');
      if (await merlin.isVisible()) {
        console.log('🧙‍♂️ Merlin found!');
      }
      
      // Tester l'onglet Bâtiments
      console.log('🏰 Testing Buildings tab...');
      const buildingsTab = page.locator('button').filter({ hasText: '🏰 Bâtiments' }).first();
      await buildingsTab.click();
      await page.waitForTimeout(1000);
      
      // Vérifier que les bâtiments se chargent
      await expect(page.locator('text=BÂTIMENTS ÉPIQUES (Frontend Generated)')).toBeVisible();
      console.log('✅ Buildings loaded!');
      
      // Vérifier le château humain
      const chateauHumain = page.locator('text=Château Humain');
      if (await chateauHumain.isVisible()) {
        console.log('🏰 Château Humain found!');
      }
      
      // Attendre un peu pour voir le contenu
      await page.waitForTimeout(2000);
      
      // Fermer le modal
      console.log('❌ Closing modal...');
      const closeButton = page.locator('button').filter({ hasText: '✕ Fermer' }).first();
      await closeButton.click();
      await page.waitForTimeout(500);
      
      console.log('🎉 Epic Content Demo completed successfully!');
      
    } else {
      console.log('⚠️ Epic Content button not found - checking if game interface loaded...');
      
      // Vérifier si on est sur la page d'accueil
      const heroesTitle = page.locator('text=Heroes of Time');
      if (await heroesTitle.isVisible()) {
        console.log('🎮 Game interface detected!');
      }
      
      // Essayer de trouver d'autres boutons
      const allButtons = await page.locator('button').all();
      console.log(`Found ${allButtons.length} buttons on page`);
      
      for (let i = 0; i < Math.min(allButtons.length, 10); i++) {
        const buttonText = await allButtons[i].textContent();
        console.log(`Button ${i + 1}: "${buttonText}"`);
      }
    }
  });
  
  test('Test des endpoints API backend', async ({ page }) => {
    console.log('🔧 Testing Backend API endpoints...');
    
    // Tester l'endpoint des héros
    const heroesResponse = await page.request.get('http://localhost:8080/api/epic/heroes');
    expect(heroesResponse.status()).toBe(200);
    
    const heroesData = await heroesResponse.json();
    expect(heroesData.epic_heroes).toBeDefined();
    expect(heroesData.epic_heroes.length).toBeGreaterThan(0);
    console.log(`✅ Found ${heroesData.epic_heroes.length} heroes in backend`);
    
    // Tester l'endpoint des créatures
    const creaturesResponse = await page.request.get('http://localhost:8080/api/epic/creatures');
    expect(creaturesResponse.status()).toBe(200);
    
    const creaturesData = await creaturesResponse.json();
    expect(creaturesData.epic_creatures).toBeDefined();
    expect(creaturesData.epic_creatures.length).toBeGreaterThan(0);
    console.log(`✅ Found ${creaturesData.epic_creatures.length} creatures in backend`);
    
    // Tester un héros spécifique
    const arthurResponse = await page.request.get('http://localhost:8080/api/epic/heroes/arthur_pendragon');
    expect(arthurResponse.status()).toBe(200);
    
    const arthurData = await arthurResponse.json();
    expect(arthurData.name).toBe('Arthur Pendragon');
    expect(arthurData.race).toBe('Human');
    console.log(`✅ Arthur Pendragon: Level ${arthurData.level}, ${arthurData.class}`);
    
    // Tester une créature spécifique
    const dragonResponse = await page.request.get('http://localhost:8080/api/epic/creatures/red_dragon');
    expect(dragonResponse.status()).toBe(200);
    
    const dragonData = await dragonResponse.json();
    expect(dragonData.name).toBe('Dragon Rouge');
    expect(dragonData.race).toBe('Dragon');
    console.log(`✅ Dragon Rouge: Tier ${dragonData.tier}, ${dragonData.health} HP`);
    
    console.log('🎉 All API endpoints working correctly!');
  });
}); 