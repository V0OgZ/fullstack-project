const { test, expect } = require('@playwright/test');

// 🧪 TEST PLAYWRIGHT - VÉRIFICATION COMPLÈTE DES UIs
// ===================================================
// Test automatique de tous les liens des dashboards et portails
// Jean dit : "faut tout réparer c'est Jean qui le dit"

const DASHBOARDS_TO_TEST = [
  {
    name: 'Dashboard Legacy Port 9000',
    url: 'http://localhost:9000/dashboard.html',
    port: 9000
  },
  {
    name: 'Portail Vince Mode',
    url: 'http://localhost:9000/portail-vince-mode.html',
    port: 9000
  },
  {
    name: 'Portail 100 Interfaces',
    url: 'http://localhost:9000/portail-100-html-interfaces.html',
    port: 9000
  },
  {
    name: 'HOTS Web Interface',
    url: 'http://localhost:9000/hots-web-interface.html',
    port: 9000
  }
];

const EXPECTED_WORKING_LINKS = [
  // React Frontend (Port 3000)
  'http://localhost:3000',
  'http://localhost:3000/game',
  'http://localhost:3000/test/true-heroes',
  'http://localhost:3000/hexagon-test',
  
  // HTML Pocket World (Port 9000) - Liens relatifs
  'dashboard.html',
  'vince-vega-hexagon-battlefield.html',
  'omega-zero-trilogie-visuelle.html',
  'hots-console-simple.html',
  'memento-tattoos-viewer.html',
  'forge-runique.html',
  'game-assets-viewer.html',
  'hots-web-interface.html',
  'portail-vince-mode.html',
  
  // Backend API
  'http://localhost:8080/api/health'
];

const BROKEN_LINKS_TO_FIX = [];

test.describe('🧪 Test Complet des UIs - Mode Vince', () => {
  
  test.beforeEach(async ({ page }) => {
    // Vérifier que les serveurs sont actifs
    console.log('🔍 Vérification des serveurs...');
  });

  test('🌐 Test Dashboard Legacy Port 9000', async ({ page }) => {
    await page.goto('http://localhost:9000/dashboard.html');
    
    // Vérifier que la page se charge
    await expect(page).toHaveTitle(/Heroes of Time - Dashboard Central/);
    
    // Trouver tous les liens
    const links = await page.locator('a[href]').all();
    console.log(`📊 Dashboard Legacy: ${links.length} liens trouvés`);
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        console.log(`🔗 Test du lien: ${href}`);
        
        try {
          // Tester le lien
          if (href.startsWith('http')) {
            // Lien absolu
            const response = await page.request.get(href);
            if (response.status() >= 400) {
              BROKEN_LINKS_TO_FIX.push({ dashboard: 'Legacy', link: href, status: response.status() });
              console.log(`❌ CASSÉ: ${href} (${response.status()})`);
            } else {
              console.log(`✅ OK: ${href}`);
            }
          } else {
            // Lien relatif - ouvrir dans un nouvel onglet
            const [newPage] = await Promise.all([
              page.context().waitForEvent('page'),
              link.click({ modifiers: ['Meta'] }) // Cmd+Click sur Mac
            ]);
            
            await newPage.waitForLoadState('networkidle');
            const title = await newPage.title();
            console.log(`✅ OK (relatif): ${href} - ${title}`);
            await newPage.close();
          }
        } catch (error) {
          BROKEN_LINKS_TO_FIX.push({ dashboard: 'Legacy', link: href, error: error.message });
          console.log(`❌ ERREUR: ${href} - ${error.message}`);
        }
      }
    }
  });

  test('🎮 Test Portail Vince Mode', async ({ page }) => {
    await page.goto('http://localhost:9000/portail-vince-mode.html');
    
    // Vérifier que la page se charge
    await expect(page).toHaveTitle(/PORTAIL VINCE MODE/);
    
    // Tester les liens React
    const reactLinks = await page.locator('.server-card:has-text("REACT FRONTEND") a').all();
    console.log(`⚛️ Portail Vince: ${reactLinks.length} liens React trouvés`);
    
    for (const link of reactLinks) {
      const href = await link.getAttribute('href');
      console.log(`🔗 Test React: ${href}`);
      
      try {
        const response = await page.request.get(href);
        if (response.status() >= 400) {
          BROKEN_LINKS_TO_FIX.push({ dashboard: 'Portail Vince', link: href, status: response.status() });
          console.log(`❌ CASSÉ: ${href}`);
        } else {
          console.log(`✅ OK: ${href}`);
        }
      } catch (error) {
        BROKEN_LINKS_TO_FIX.push({ dashboard: 'Portail Vince', link: href, error: error.message });
        console.log(`❌ ERREUR: ${href}`);
      }
    }
    
    // Tester les liens HTML Pocket
    const htmlLinks = await page.locator('.server-card:has-text("HTML POCKET") a').all();
    console.log(`📱 Portail Vince: ${htmlLinks.length} liens HTML trouvés`);
    
    for (const link of htmlLinks) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        console.log(`🔗 Test HTML: ${href}`);
        
        try {
          // Pour les liens relatifs, les tester sur le même serveur
          const fullUrl = href.startsWith('http') ? href : `http://localhost:9000/${href}`;
          const response = await page.request.get(fullUrl);
          
          if (response.status() >= 400) {
            BROKEN_LINKS_TO_FIX.push({ dashboard: 'Portail Vince HTML', link: href, status: response.status() });
            console.log(`❌ CASSÉ: ${href}`);
          } else {
            console.log(`✅ OK: ${href}`);
          }
        } catch (error) {
          BROKEN_LINKS_TO_FIX.push({ dashboard: 'Portail Vince HTML', link: href, error: error.message });
          console.log(`❌ ERREUR: ${href}`);
        }
      }
    }
  });

  test('🔬 Test Interface Web HOTS', async ({ page }) => {
    await page.goto('http://localhost:9000/hots-web-interface.html');
    
    // Vérifier que la page se charge
    await expect(page).toHaveTitle(/HOTS Web Interface/);
    
    // Tester les boutons de commande
    const commandButtons = await page.locator('.command-btn').all();
    console.log(`🎮 HOTS Interface: ${commandButtons.length} commandes trouvées`);
    
    // Simuler quelques commandes
    const testCommands = ['status', 'test quick', 'help'];
    
    for (const command of testCommands) {
      console.log(`🎯 Test commande: ${command}`);
      
      // Cliquer sur le bouton correspondant
      const button = page.locator(`.command-btn:has-text("${command}")`).first();
      if (await button.count() > 0) {
        await button.click();
        
        // Attendre que les logs se mettent à jour
        await page.waitForTimeout(2000);
        
        // Vérifier qu'il y a une réponse dans les logs
        const logContent = await page.locator('#terminal-output').textContent();
        if (logContent && logContent.includes(command)) {
          console.log(`✅ Commande OK: ${command}`);
        } else {
          console.log(`⚠️ Commande sans réponse: ${command}`);
        }
      }
    }
  });

  test.afterAll(async ({ page }) => {
    // Rapport final
    console.log('\n🎯 RAPPORT FINAL - TEST DES UIs');
    console.log('================================');
    
    if (BROKEN_LINKS_TO_FIX.length === 0) {
      console.log('🎉 TOUS LES LIENS FONCTIONNENT !');
    } else {
      console.log(`❌ ${BROKEN_LINKS_TO_FIX.length} LIENS À RÉPARER :`);
      
      BROKEN_LINKS_TO_FIX.forEach((broken, index) => {
        console.log(`${index + 1}. [${broken.dashboard}] ${broken.link}`);
        if (broken.status) console.log(`   Status: ${broken.status}`);
        if (broken.error) console.log(`   Erreur: ${broken.error}`);
      });
      
      // Créer un fichier de rapport
      const fs = require('fs');
      const report = {
        timestamp: new Date().toISOString(),
        total_broken: BROKEN_LINKS_TO_FIX.length,
        broken_links: BROKEN_LINKS_TO_FIX
      };
      
      fs.writeFileSync('test-results/broken-links-report.json', JSON.stringify(report, null, 2));
      console.log('\n📋 Rapport sauvé: test-results/broken-links-report.json');
    }
  });
});

// 🚀 Configuration pour lancer le test
module.exports = {
  use: {
    headless: false, // Pour voir ce qui se passe
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...require('@playwright/test').devices['Desktop Chrome'] },
    }
  ]
}; 