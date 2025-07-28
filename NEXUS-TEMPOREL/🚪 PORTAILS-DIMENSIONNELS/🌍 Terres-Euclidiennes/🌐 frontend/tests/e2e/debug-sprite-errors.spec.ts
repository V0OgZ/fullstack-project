// 🧪 Test de détection des erreurs de sprites
// ===========================================
// Test headless pour détecter les sprites manquants et les erreurs de chargement

import { test, expect } from '@playwright/test';

// Variables globales pour capturer les erreurs
let consoleErrors: string[] = [];
let networkErrors: string[] = [];

// Helper pour setup des listeners d'erreur
const setupErrorListeners = async (page: any) => {
  // Reset des erreurs
  consoleErrors = [];
  networkErrors = [];
  
  // Capturer les erreurs de console
  page.on('console', (msg: any) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Capturer les erreurs de réseau (404, etc.)
  page.on('response', (response: any) => {
    if (response.status() >= 400) {
      networkErrors.push(`${response.status()} - ${response.url()}`);
    }
  });
};

test('🎯 Détection des sprites de terrain manquants', async ({ page }) => {
  console.log('🔍 Test de détection des sprites de terrain manquants...');
  
  await setupErrorListeners(page);
  
  // Aller à la page principale
  await page.goto('http://localhost:3000');
  
  // Attendre que l'interface se charge
  await page.waitForSelector('[data-testid="game-interface"]', { timeout: 10000 });
  
  // Déclencher un nouveau jeu pour forcer le chargement des sprites
  await page.click('button:has-text("Nouveau Jeu")');
  
  // Attendre que la carte se charge
  await page.waitForSelector('canvas', { timeout: 10000 });
  
  // Attendre un peu pour que tous les sprites tentent de se charger
  await page.waitForTimeout(3000);
  
  // Vérifier les erreurs de console liées aux sprites
  const spriteErrors = consoleErrors.filter(error => 
    error.includes('Failed to load sprite') || 
    error.includes('terrain') || 
    error.includes('sprite') ||
    error.includes('assets')
  );
  
  console.log(`📊 Erreurs de sprites détectées: ${spriteErrors.length}`);
  spriteErrors.forEach(error => console.log(`❌ ${error}`));
  
  // Vérifier les erreurs de réseau pour les assets
  const assetErrors = networkErrors.filter(error => 
    error.includes('/assets/') || 
    error.includes('.png') || 
    error.includes('.jpg') || 
    error.includes('.gif')
  );
  
  console.log(`📊 Erreurs d'assets détectées: ${assetErrors.length}`);
  assetErrors.forEach(error => console.log(`🌐 ${error}`));
  
  // Le test passe si aucune erreur de sprite n'est détectée
  expect(spriteErrors.length).toBe(0);
  expect(assetErrors.length).toBe(0);
});

test('🗺️ Vérification des sprites de terrain spécifiques', async ({ page }) => {
  console.log('🔍 Test de vérification des sprites de terrain spécifiques...');
  
  await page.goto('http://localhost:3000');
  
  // Injecter un script pour tester le chargement des sprites
  const spriteTestResults = await page.evaluate(() => {
    const sprites = [
      '/assets/terrain/grass.png',
      '/assets/terrain/forest.png',
      '/assets/terrain/water.png',
      '/assets/terrain/mountain.png',
      '/assets/terrain/desert.png',
      '/assets/terrain/swamp.png'
    ];
    
    return Promise.all(sprites.map(spritePath => {
      return new Promise<{ sprite: string; loaded: boolean; error?: string }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ sprite: spritePath, loaded: true });
        img.onerror = (error) => resolve({ 
          sprite: spritePath, 
          loaded: false, 
          error: error.toString() 
        });
        img.src = spritePath;
      });
    }));
  });
  
  console.log('📊 Résultats des tests de sprites:');
  spriteTestResults.forEach(result => {
    if (result.loaded) {
      console.log(`✅ ${result.sprite} - Chargé`);
    } else {
      console.log(`❌ ${result.sprite} - Échec: ${result.error}`);
    }
  });
  
  // Vérifier que tous les sprites terrain essentiels se chargent
  const failedSprites = spriteTestResults.filter(result => !result.loaded);
  expect(failedSprites.length).toBe(0);
});

test('🏰 Vérification des sprites de héros et bâtiments', async ({ page }) => {
  console.log('🔍 Test de vérification des sprites de héros et bâtiments...');
  
  await setupErrorListeners(page);
  
  await page.goto('http://localhost:3000');
  
  // Attendre que l'interface se charge
  await page.waitForSelector('[data-testid="game-interface"]', { timeout: 10000 });
  
  // Déclencher un nouveau jeu
  await page.click('button:has-text("Nouveau Jeu")');
  
  // Attendre que la carte se charge
  await page.waitForSelector('canvas', { timeout: 10000 });
  
  // Attendre un peu pour que tous les sprites tentent de se charger
  await page.waitForTimeout(2000);
  
  // Vérifier qu'il n'y a pas d'erreurs de héros ou de bâtiments
  const heroErrors = consoleErrors.filter(error => 
    error.includes('hero') || 
    error.includes('building') ||
    error.includes('castle')
  );
  
  const heroAssetErrors = networkErrors.filter(error => 
    error.includes('heroes') || 
    error.includes('buildings') || 
    error.includes('castles')
  );
  
  console.log(`📊 Erreurs de héros/bâtiments (console): ${heroErrors.length}`);
  console.log(`📊 Erreurs de héros/bâtiments (réseau): ${heroAssetErrors.length}`);
  
  heroErrors.forEach(error => console.log(`❌ ${error}`));
  heroAssetErrors.forEach(error => console.log(`🌐 ${error}`));
  
  // Le test passe si aucune erreur n'est détectée
  expect(heroErrors.length).toBe(0);
  expect(heroAssetErrors.length).toBe(0);
});

test('🎮 Test complet de détection d\'erreurs pendant le gameplay', async ({ page }) => {
  console.log('🔍 Test complet de détection d\'erreurs pendant le gameplay...');
  
  await setupErrorListeners(page);
  
  await page.goto('http://localhost:3000');
  
  // Attendre que l'interface se charge
  await page.waitForSelector('[data-testid="game-interface"]', { timeout: 10000 });
  
  // Déclencher un nouveau jeu
  await page.click('button:has-text("Nouveau Jeu")');
  
  // Attendre que la carte se charge
  await page.waitForSelector('canvas', { timeout: 10000 });
  
  // Simuler quelques actions de gameplay pour déclencher le chargement de sprites
  await page.waitForTimeout(1000);
  
  // Cliquer sur différentes zones de la carte
  const canvas = page.locator('canvas');
  await canvas.click({ position: { x: 200, y: 200 } });
  await page.waitForTimeout(500);
  
  await canvas.click({ position: { x: 300, y: 300 } });
  await page.waitForTimeout(500);
  
  // Essayer d'interagir avec des éléments UI
  const heroButtons = page.locator('button[data-testid*="hero"]');
  if (await heroButtons.count() > 0) {
    await heroButtons.first().click();
    await page.waitForTimeout(500);
  }
  
  // Attendre que toutes les opérations asynchrones se terminent
  await page.waitForTimeout(2000);
  
  // Résumé des erreurs détectées
  const totalConsoleErrors = consoleErrors.length;
  const totalNetworkErrors = networkErrors.length;
  
  console.log(`📊 RÉSUMÉ DES ERREURS DÉTECTÉES:`);
  console.log(`📊 Erreurs de console: ${totalConsoleErrors}`);
  console.log(`📊 Erreurs de réseau: ${totalNetworkErrors}`);
  
  if (totalConsoleErrors > 0) {
    console.log(`🔍 Erreurs de console:`);
    consoleErrors.forEach(error => console.log(`  ❌ ${error}`));
  }
  
  if (totalNetworkErrors > 0) {
    console.log(`🔍 Erreurs de réseau:`);
    networkErrors.forEach(error => console.log(`  🌐 ${error}`));
  }
  
  // Le test passe si aucune erreur critique n'est détectée
  const criticalErrors = consoleErrors.filter(error => 
    error.includes('Failed to load sprite') || 
    error.includes('TypeError') || 
    error.includes('ReferenceError')
  );
  
  expect(criticalErrors.length).toBe(0);
});

test('📊 Rapport de santé des assets', async ({ page }) => {
  console.log('🔍 Génération du rapport de santé des assets...');
  
  await page.goto('http://localhost:3000');
  
  // Test de tous les dossiers d'assets principaux
  const assetDirectories = [
    '/assets/terrain/',
    '/assets/heroes/',
    '/assets/buildings/',
    '/assets/ui/',
    '/assets/time-fantasy/'
  ];
  
  const healthReport = await page.evaluate((directories) => {
    return Promise.all(directories.map(dir => {
      return fetch(dir).then(response => {
        return {
          directory: dir,
          accessible: response.status < 400,
          error: response.status >= 400 ? `Status ${response.status}` : undefined
        };
      }).catch(error => {
        return {
          directory: dir,
          accessible: false,
          error: error.toString()
        };
      });
    }));
  }, assetDirectories);
  
  console.log('📊 RAPPORT DE SANTÉ DES ASSETS:');
  healthReport.forEach(result => {
    if (result.accessible) {
      console.log(`✅ ${result.directory} - Accessible`);
    } else {
      console.log(`❌ ${result.directory} - Inaccessible: ${result.error}`);
    }
  });
  
  // Au moins le dossier terrain doit être accessible
  const terrainAccessible = healthReport.find(r => r.directory === '/assets/terrain/')?.accessible;
  expect(terrainAccessible).toBe(true);
}); 