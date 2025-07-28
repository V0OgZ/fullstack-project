import { test, expect } from '@playwright/test';

test.describe('🗺️ Debug Map Data - Diagnostic Test', () => {
  test('should diagnose map data loading and conversion issues', async ({ page }) => {
    console.log('🗺️ Starting map data diagnostic...');
    
    // Aller directement à la page de jeu
    await page.goto('http://localhost:3000/game/conquest-classic');
    await page.waitForLoadState('networkidle');
    
    // Injecter du code pour diagnostiquer le problème
    const diagnosticData = await page.evaluate(() => {
      // Accéder au store de jeu
      const gameStore = (window as any).gameStore;
      
      // Vérifier l'état du store
      const storeState = {
        hasStore: !!gameStore,
        currentGame: gameStore?.currentGame || null,
        currentPlayer: gameStore?.currentPlayer || null,
        map: gameStore?.map || null,
        mapType: Array.isArray(gameStore?.map) ? 'array' : typeof gameStore?.map,
        mapLength: Array.isArray(gameStore?.map) ? gameStore.map.length : 0,
        mapFirstRowLength: Array.isArray(gameStore?.map) && gameStore.map.length > 0 ? gameStore.map[0]?.length : 0,
      };
      
      // Vérifier le composant TrueHeroesInterface
      const trueHeroesInterface = document.querySelector('.true-heroes-interface');
      const leftPanel = document.querySelector('.left-panel');
      const organicRenderer = document.querySelector('.left-panel > div');
      
             // Vérifier les données passées au OrganicTerrainRenderer
       let hexTilesData: any = null;
       try {
         // Essayer de reproduire la conversion
         const backendMap = gameStore?.map;
         if (backendMap && Array.isArray(backendMap)) {
           const hexTiles: any[] = [];
           for (let row = 0; row < backendMap.length; row++) {
             for (let col = 0; col < backendMap[row].length; col++) {
               const tile = backendMap[row][col];
               if (tile) {
                 let biome = 'grass';
                 switch (tile.terrain?.toLowerCase()) {
                   case 'water': biome = 'water'; break;
                   case 'forest': biome = 'forest'; break;
                   case 'mountain': biome = 'mountain'; break;
                   case 'desert': biome = 'desert'; break;
                   case 'swamp': biome = 'swamp'; break;
                   default: biome = 'grass'; break;
                 }
                 
                 const q = col;
                 const r = row - Math.floor(col / 2);
                 
                 hexTiles.push({
                   q,
                   r,
                   biome,
                   elevation: tile.elevation || Math.random() * 100,
                   humidity: tile.humidity || Math.random() * 100,
                   riverFlowDir: tile.riverFlowDir,
                   naturalBarrier: tile.naturalBarrier || false
                 });
               }
             }
           }
           hexTilesData = {
             length: hexTiles.length,
             sample: hexTiles.slice(0, 3),
             biomes: [...new Set(hexTiles.map((t: any) => t.biome))]
           };
         }
       } catch (error: any) {
         hexTilesData = { error: error.message };
       }
      
      return {
        store: storeState,
        dom: {
          hasTrueHeroesInterface: !!trueHeroesInterface,
          hasLeftPanel: !!leftPanel,
          hasOrganicRenderer: !!organicRenderer,
          organicRendererTagName: organicRenderer?.tagName,
          organicRendererChildren: organicRenderer?.children.length || 0,
          canvasCount: document.querySelectorAll('canvas').length,
          pixiElements: document.querySelectorAll('[data-pixi]').length,
        },
        hexTilesData,
        url: window.location.href,
        timestamp: new Date().toISOString()
      };
    });
    
    console.log('🔍 DIAGNOSTIC DATA:', JSON.stringify(diagnosticData, null, 2));
    
    // Prendre un screenshot pour analyse visuelle
    await page.screenshot({ path: 'test-results/05-map-data-debug.png', fullPage: true });
    
    // Attendre un peu pour voir si quelque chose se charge
    await page.waitForTimeout(3000);
    
    // Re-vérifier après un délai
    const diagnosticDataAfterDelay = await page.evaluate(() => {
      return {
        mapLength: Array.isArray((window as any).gameStore?.map) ? (window as any).gameStore.map.length : 0,
        canvasCount: document.querySelectorAll('canvas').length,
        pixiCanvasCount: document.querySelectorAll('canvas[data-pixi]').length,
        loadingElements: document.querySelectorAll('.loading').length,
        errorElements: document.querySelectorAll('.error').length,
        timestamp: new Date().toISOString()
      };
    });
    
    console.log('🔍 DIAGNOSTIC DATA AFTER DELAY:', JSON.stringify(diagnosticDataAfterDelay, null, 2));
    
    // Prendre un screenshot final
    await page.screenshot({ path: 'test-results/06-map-data-debug-final.png', fullPage: true });
    
    // Évaluer l'état du backend
    const backendStatus = await page.evaluate(async () => {
      try {
        const response = await fetch('http://localhost:8080/api/health');
        if (response.ok) {
          return { 
            status: 'connected',
            health: await response.json()
          };
        }
        return { status: 'error', message: 'Backend not responding' };
      } catch (error) {
        return { status: 'error', message: (error as Error).message };
      }
    });
    
    console.log('🔧 BACKEND STATUS:', JSON.stringify(backendStatus, null, 2));
    
    // Tester l'API de chargement de jeu
    const gameApiTest = await page.evaluate(async () => {
      try {
        const response = await fetch('http://localhost:8080/api/games/conquest-classic');
        if (response.ok) {
          const gameData = await response.json();
          return {
            status: 'success',
            hasMap: !!gameData.map,
            mapType: Array.isArray(gameData.map) ? 'array' : typeof gameData.map,
            mapLength: Array.isArray(gameData.map) ? gameData.map.length : 0,
            mapFirstRowLength: Array.isArray(gameData.map) && gameData.map.length > 0 ? gameData.map[0]?.length : 0,
            sampleTile: Array.isArray(gameData.map) && gameData.map.length > 0 && gameData.map[0].length > 0 ? gameData.map[0][0] : null
          };
        }
        return { status: 'error', message: 'Game API not responding' };
      } catch (error) {
        return { status: 'error', message: (error as Error).message };
      }
    });
    
    console.log('🎮 GAME API TEST:', JSON.stringify(gameApiTest, null, 2));
    
    // Créer un rapport complet
    const fullReport = {
      timestamp: new Date().toISOString(),
      url: page.url(),
      frontend: diagnosticData,
      frontendAfterDelay: diagnosticDataAfterDelay,
      backend: backendStatus,
      gameApi: gameApiTest,
      screenshots: [
        '05-map-data-debug.png',
        '06-map-data-debug-final.png'
      ]
    };
    
    console.log('📊 FULL DIAGNOSTIC REPORT:', JSON.stringify(fullReport, null, 2));
    
    // Vérifications pour identifier le problème
    if (gameApiTest.status === 'error') {
      console.log('❌ PROBLEM IDENTIFIED: Game API not working');
    } else if (gameApiTest.mapLength === 0) {
      console.log('❌ PROBLEM IDENTIFIED: Backend returns empty map');
    } else if (diagnosticData.store.mapLength === 0) {
      console.log('❌ PROBLEM IDENTIFIED: Frontend store has empty map');
         } else if (diagnosticData.hexTilesData && diagnosticData.hexTilesData.length === 0) {
       console.log('❌ PROBLEM IDENTIFIED: Hex tiles conversion failed');
    } else if (diagnosticData.dom.canvasCount === 0) {
      console.log('❌ PROBLEM IDENTIFIED: PIXI canvas not created');
    } else {
      console.log('✅ All data seems correct, issue might be elsewhere');
    }
    
    // Cette assertion permet de voir le rapport
    expect(fullReport.screenshots.length).toBeGreaterThan(0);
  });
}); 