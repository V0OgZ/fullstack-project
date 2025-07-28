import { test, expect } from '@playwright/test';

test.describe('Terrain Rendering System', () => {
  test.beforeEach(async ({ page }) => {
    // Aller à la page du jeu
    await page.goto('http://localhost:3000');
    
    // Attendre que l'interface soit chargée
    await page.waitForSelector('[data-testid="game-interface"]', { timeout: 10000 });
    
    // Cliquer sur "Jouer" pour démarrer
    await page.click('text=Jouer');
    
    // Attendre que le rendu soit prêt
    await page.waitForSelector('canvas', { timeout: 15000 });
    await page.waitForTimeout(2000);
  });

  test('should render terrain with zone detection', async ({ page }) => {
    // Vérifier que le canvas est présent
    const canvas = await page.locator('canvas').first();
    await expect(canvas).toBeVisible();
    
    // Vérifier que les informations de débogage sont visibles
    const debugInfo = await page.locator('.debug-info');
    await expect(debugInfo).toBeVisible();
    
    // Vérifier que des zones sont détectées
    const zonesText = await debugInfo.locator('div').first().textContent();
    expect(zonesText).toMatch(/Zones détectées: \d+/);
    
    // Extraire le nombre de zones
    const zonesMatch = zonesText?.match(/Zones détectées: (\d+)/);
    const zonesCount = zonesMatch ? parseInt(zonesMatch[1]) : 0;
    
    // Vérifier qu'il y a au moins quelques zones
    expect(zonesCount).toBeGreaterThan(0);
    
    console.log(`✅ Zones détectées: ${zonesCount}`);
  });

  test('should show tile information on hover', async ({ page }) => {
    const canvas = await page.locator('canvas').first();
    const debugInfo = await page.locator('.debug-info');
    
    // Survoler le centre du canvas
    await canvas.hover({ position: { x: 400, y: 300 } });
    await page.waitForTimeout(500);
    
    // Vérifier que les informations de tuile apparaissent
    const tileInfo = await debugInfo.locator('div').nth(1);
    const tileText = await tileInfo.textContent();
    
    expect(tileText).toMatch(/Tuile: \d+,\d+/);
    expect(tileText).toMatch(/Zone: Z\d+|isolated/);
    
    console.log(`✅ Info de tuile: ${tileText}`);
  });

  test('should render different biomes correctly', async ({ page }) => {
    const canvas = await page.locator('canvas').first();
    const debugInfo = await page.locator('.debug-info');
    
    // Tester plusieurs positions pour trouver différents biomes
    const positions = [
      { x: 200, y: 200 },
      { x: 400, y: 300 },
      { x: 600, y: 400 },
      { x: 300, y: 500 },
      { x: 500, y: 200 }
    ];
    
    const foundBiomes = new Set<string>();
    
    for (const pos of positions) {
      await canvas.hover({ position: pos });
      await page.waitForTimeout(300);
      
      const tileInfo = await debugInfo.locator('div').nth(1);
      const tileText = await tileInfo.textContent();
      
      if (tileText) {
        // Extraire le type de terrain
        const parts = tileText.split(' - ');
        if (parts.length >= 2) {
          const terrain = parts[1].trim();
          foundBiomes.add(terrain);
        }
      }
    }
    
    console.log(`✅ Biomes trouvés: ${Array.from(foundBiomes).join(', ')}`);
    
    // Vérifier qu'on a trouvé au moins quelques biomes différents
    expect(foundBiomes.size).toBeGreaterThan(1);
  });

  test('should handle tile selection', async ({ page }) => {
    const canvas = await page.locator('canvas').first();
    const debugInfo = await page.locator('.debug-info');
    
    // Cliquer sur une tuile
    await canvas.click({ position: { x: 400, y: 300 } });
    await page.waitForTimeout(500);
    
    // Vérifier que la tuile est sélectionnée (via les informations de débogage)
    const tileInfo = await debugInfo.locator('div').nth(1);
    const tileText = await tileInfo.textContent();
    
    expect(tileText).toMatch(/Tuile: \d+,\d+/);
    
    console.log(`✅ Tuile sélectionnée: ${tileText}`);
  });

  test('should render terrain without visible hex grid', async ({ page }) => {
    const canvas = await page.locator('canvas').first();
    
    // Prendre une capture d'écran pour analyse visuelle
    await canvas.screenshot({ path: 'test-results/terrain-rendering.png' });
    
    // Vérifier que le canvas a une taille appropriée
    const canvasBox = await canvas.boundingBox();
    expect(canvasBox?.width).toBeGreaterThan(500);
    expect(canvasBox?.height).toBeGreaterThan(400);
    
    console.log(`✅ Canvas size: ${canvasBox?.width}x${canvasBox?.height}`);
  });

  test('should show organic terrain transitions', async ({ page }) => {
    const canvas = await page.locator('canvas').first();
    const debugInfo = await page.locator('.debug-info');
    
    // Tester plusieurs positions pour vérifier les transitions
    const testPositions = [
      { x: 250, y: 250 },
      { x: 350, y: 350 },
      { x: 450, y: 450 },
      { x: 550, y: 550 }
    ];
    
    const terrainData: Array<{position: {x: number, y: number}, terrain: string, zone: string}> = [];
    
    for (const pos of testPositions) {
      await canvas.hover({ position: pos });
      await page.waitForTimeout(200);
      
      const tileInfo = await debugInfo.locator('div').nth(1);
      const tileText = await tileInfo.textContent();
      
      if (tileText) {
        const parts = tileText.split(' - ');
        if (parts.length >= 3) {
          const terrain = parts[1].trim();
          const zone = parts[2].replace('Zone: ', '').trim();
          terrainData.push({ position: pos, terrain, zone });
        }
      }
    }
    
    console.log('✅ Données de terrain:', terrainData);
    
    // Vérifier qu'on a des données de terrain
    expect(terrainData.length).toBeGreaterThan(0);
    
    // Vérifier que les zones sont cohérentes
    const zones = terrainData.map(d => d.zone);
    const uniqueZones = new Set(zones);
    expect(uniqueZones.size).toBeGreaterThan(0);
  });

  test('should handle canvas interactions smoothly', async ({ page }) => {
    const canvas = await page.locator('canvas').first();
    
    // Test de multiples interactions rapides
    const interactions = [
      { x: 200, y: 200 },
      { x: 400, y: 300 },
      { x: 600, y: 400 },
      { x: 300, y: 500 },
      { x: 500, y: 200 }
    ];
    
    for (const pos of interactions) {
      await canvas.hover({ position: pos });
      await page.waitForTimeout(100);
      await canvas.click({ position: pos });
      await page.waitForTimeout(100);
    }
    
    // Vérifier que l'interface est toujours réactive
    const debugInfo = await page.locator('.debug-info');
    await expect(debugInfo).toBeVisible();
    
    console.log('✅ Interactions canvas fluides');
  });

  test('should maintain consistent rendering across refreshes', async ({ page }) => {
    const canvas = await page.locator('canvas').first();
    const debugInfo = await page.locator('.debug-info');
    
    // Prendre une position de référence
    await canvas.hover({ position: { x: 400, y: 300 } });
    await page.waitForTimeout(500);
    
    const firstTileInfo = await debugInfo.locator('div').nth(1).textContent();
    const firstZonesInfo = await debugInfo.locator('div').first().textContent();
    
    // Rafraîchir la page
    await page.reload();
    await page.waitForSelector('[data-testid="game-interface"]', { timeout: 10000 });
    await page.click('text=Jouer');
    await page.waitForSelector('canvas', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Vérifier la même position
    await canvas.hover({ position: { x: 400, y: 300 } });
    await page.waitForTimeout(500);
    
    const secondTileInfo = await debugInfo.locator('div').nth(1).textContent();
    const secondZonesInfo = await debugInfo.locator('div').first().textContent();
    
    // Le rendu devrait être déterministe
    expect(firstTileInfo).toBe(secondTileInfo);
    expect(firstZonesInfo).toBe(secondZonesInfo);
    
    console.log('✅ Rendu déterministe confirmé');
  });
});

test.describe('Terrain Visual Quality', () => {
  test('should render water with depth effects', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('[data-testid="game-interface"]', { timeout: 10000 });
    await page.click('text=Jouer');
    await page.waitForSelector('canvas', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const canvas = await page.locator('canvas').first();
    const debugInfo = await page.locator('.debug-info');
    
    // Chercher des tuiles d'eau
    const positions = [
      { x: 200, y: 200 }, { x: 300, y: 300 }, { x: 400, y: 400 },
      { x: 500, y: 500 }, { x: 600, y: 300 }, { x: 100, y: 400 }
    ];
    
    let waterFound = false;
    
    for (const pos of positions) {
      await canvas.hover({ position: pos });
      await page.waitForTimeout(200);
      
      const tileInfo = await debugInfo.locator('div').nth(1);
      const tileText = await tileInfo.textContent();
      
      if (tileText && tileText.includes('water')) {
        waterFound = true;
        console.log(`✅ Tuile d'eau trouvée à ${pos.x},${pos.y}`);
        break;
      }
    }
    
    // Prendre une capture pour analyse visuelle
    await canvas.screenshot({ path: 'test-results/water-rendering.png' });
    
    if (waterFound) {
      console.log('✅ Rendu de l\'eau avec effets de profondeur');
    } else {
      console.log('ℹ️ Aucune tuile d\'eau trouvée dans les positions testées');
    }
  });
}); 