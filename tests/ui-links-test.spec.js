const { test, expect } = require('@playwright/test');

// 🧪 TEST PLAYWRIGHT - VÉRIFICATION COMPLÈTE DES UIs VINCE MODE
// ==============================================================
// Test automatique de tous les liens des dashboards et portails
// Jean dit : "faut tout réparer c'est Jean qui le dit"

const BROKEN_LINKS = [];

test.describe('🧪 Test Complet des UIs - Mode Vince', () => {
  
  test('📊 Dashboard Legacy Port 9000', async ({ page }) => {
    console.log('🔍 Test du Dashboard Legacy...');
    
    try {
      await page.goto('http://localhost:9000/dashboard.html', { waitUntil: 'networkidle' });
      
      // Vérifier que la page se charge
      const title = await page.title();
      console.log(`📄 Page chargée: ${title}`);
      
      // Trouver tous les liens
      const links = await page.locator('a[href]').all();
      console.log(`🔗 ${links.length} liens trouvés dans le dashboard`);
      
      for (let i = 0; i < Math.min(links.length, 10); i++) { // Limiter à 10 liens pour le test
        const link = links[i];
        const href = await link.getAttribute('href');
        const text = await link.textContent();
        
        if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
          console.log(`🎯 Test: ${text?.trim()} -> ${href}`);
          
          try {
            if (href.startsWith('http')) {
              // Lien absolu - tester avec fetch
              const response = await page.request.get(href);
              if (response.status() >= 400) {
                BROKEN_LINKS.push({ source: 'Dashboard Legacy', link: href, status: response.status(), text: text?.trim() });
                console.log(`❌ CASSÉ: ${href} (${response.status()})`);
              } else {
                console.log(`✅ OK: ${href}`);
              }
            } else {
              // Lien relatif - construire l'URL complète
              const fullUrl = `http://localhost:9000/${href}`;
              const response = await page.request.get(fullUrl);
              
              if (response.status() >= 400) {
                BROKEN_LINKS.push({ source: 'Dashboard Legacy', link: href, fullUrl, status: response.status(), text: text?.trim() });
                console.log(`❌ CASSÉ: ${href} -> ${fullUrl} (${response.status()})`);
              } else {
                console.log(`✅ OK: ${href} -> ${fullUrl}`);
              }
            }
          } catch (error) {
            BROKEN_LINKS.push({ source: 'Dashboard Legacy', link: href, error: error.message, text: text?.trim() });
            console.log(`❌ ERREUR: ${href} - ${error.message}`);
          }
        }
      }
      
    } catch (error) {
      console.log(`❌ Impossible de charger le dashboard: ${error.message}`);
      BROKEN_LINKS.push({ source: 'Dashboard Legacy', error: 'Page inaccessible', details: error.message });
    }
  });

  test('🎮 Portail Vince Mode', async ({ page }) => {
    console.log('🔍 Test du Portail Vince Mode...');
    
    try {
      await page.goto('http://localhost:9000/portail-vince-mode.html', { waitUntil: 'networkidle' });
      
      const title = await page.title();
      console.log(`📄 Page chargée: ${title}`);
      
      // Tester les liens dans les cartes serveur
      const serverCards = await page.locator('.server-card').all();
      console.log(`🏗️ ${serverCards.length} cartes serveur trouvées`);
      
      for (const card of serverCards) {
        const cardTitle = await card.locator('.server-title').textContent();
        const links = await card.locator('a[href]').all();
        
        console.log(`📦 Carte: ${cardTitle?.trim()} - ${links.length} liens`);
        
        for (const link of links.slice(0, 3)) { // Limiter à 3 liens par carte
          const href = await link.getAttribute('href');
          const text = await link.textContent();
          
          if (href && !href.startsWith('#')) {
            console.log(`🎯 Test: ${text?.trim()} -> ${href}`);
            
            try {
              const testUrl = href.startsWith('http') ? href : `http://localhost:9000/${href}`;
              const response = await page.request.get(testUrl);
              
              if (response.status() >= 400) {
                BROKEN_LINKS.push({ source: 'Portail Vince', card: cardTitle?.trim(), link: href, status: response.status() });
                console.log(`❌ CASSÉ: ${href} (${response.status()})`);
              } else {
                console.log(`✅ OK: ${href}`);
              }
            } catch (error) {
              BROKEN_LINKS.push({ source: 'Portail Vince', card: cardTitle?.trim(), link: href, error: error.message });
              console.log(`❌ ERREUR: ${href} - ${error.message}`);
            }
          }
        }
      }
      
    } catch (error) {
      console.log(`❌ Impossible de charger le portail: ${error.message}`);
      BROKEN_LINKS.push({ source: 'Portail Vince', error: 'Page inaccessible', details: error.message });
    }
  });

  test('🌐 Interface Web HOTS', async ({ page }) => {
    console.log('🔍 Test de l\'Interface Web HOTS...');
    
    try {
      await page.goto('http://localhost:9000/hots-web-interface.html', { waitUntil: 'networkidle' });
      
      const title = await page.title();
      console.log(`📄 Page chargée: ${title}`);
      
      // Vérifier que l'interface se charge
      const header = await page.locator('.header h1').textContent();
      console.log(`🎮 Interface: ${header?.trim()}`);
      
      // Tester quelques boutons de commande
      const buttons = await page.locator('.command-btn').all();
      console.log(`🎯 ${buttons.length} boutons de commande trouvés`);
      
      if (buttons.length > 0) {
        // Tester le bouton status
        const statusBtn = buttons[0];
        const btnText = await statusBtn.textContent();
        console.log(`🔘 Test bouton: ${btnText?.trim()}`);
        
        await statusBtn.click();
        await page.waitForTimeout(1000);
        
        // Vérifier qu'il y a une réponse
        const output = await page.locator('#terminal-output').textContent();
        if (output && output.length > 0) {
          console.log(`✅ Interface réactive - ${output.length} caractères de sortie`);
        } else {
          console.log(`⚠️ Interface non réactive`);
          BROKEN_LINKS.push({ source: 'HOTS Interface', issue: 'Pas de réponse aux commandes' });
        }
      }
      
    } catch (error) {
      console.log(`❌ Impossible de charger l'interface HOTS: ${error.message}`);
      BROKEN_LINKS.push({ source: 'HOTS Interface', error: 'Page inaccessible', details: error.message });
    }
  });

  test('⚛️ React Frontend Port 3000', async ({ page }) => {
    console.log('🔍 Test du React Frontend...');
    
    try {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 10000 });
      
      const title = await page.title();
      console.log(`📄 React App chargée: ${title}`);
      
      // Vérifier que React se charge
      const content = await page.content();
      if (content.includes('react') || content.includes('React') || title.includes('React')) {
        console.log(`✅ React Frontend OK`);
      } else {
        console.log(`⚠️ React Frontend - contenu suspect`);
        BROKEN_LINKS.push({ source: 'React Frontend', issue: 'Contenu ne semble pas être React' });
      }
      
    } catch (error) {
      console.log(`❌ React Frontend inaccessible: ${error.message}`);
      BROKEN_LINKS.push({ source: 'React Frontend', error: 'Page inaccessible', details: error.message });
    }
  });

  test.afterAll(async () => {
    // Rapport final
    console.log('\n🎯 RAPPORT FINAL - TEST DES UIs VINCE MODE');
    console.log('==========================================');
    
    if (BROKEN_LINKS.length === 0) {
      console.log('🎉 TOUTES LES UIs FONCTIONNENT PARFAITEMENT !');
      console.log('✅ Mode Vince opérationnel à 100%');
    } else {
      console.log(`❌ ${BROKEN_LINKS.length} PROBLÈMES DÉTECTÉS :`);
      console.log('');
      
      BROKEN_LINKS.forEach((issue, index) => {
        console.log(`${index + 1}. 📍 ${issue.source}`);
        if (issue.card) console.log(`   📦 Carte: ${issue.card}`);
        if (issue.link) console.log(`   🔗 Lien: ${issue.link}`);
        if (issue.fullUrl) console.log(`   🌐 URL: ${issue.fullUrl}`);
        if (issue.status) console.log(`   📊 Status: ${issue.status}`);
        if (issue.error) console.log(`   ❌ Erreur: ${issue.error}`);
        if (issue.issue) console.log(`   ⚠️ Problème: ${issue.issue}`);
        console.log('');
      });
      
      // Sauvegarder le rapport
      const fs = require('fs');
      const report = {
        timestamp: new Date().toISOString(),
        mode: 'Vince Mode',
        total_issues: BROKEN_LINKS.length,
        issues: BROKEN_LINKS,
        summary: {
          dashboard_legacy: BROKEN_LINKS.filter(b => b.source === 'Dashboard Legacy').length,
          portail_vince: BROKEN_LINKS.filter(b => b.source === 'Portail Vince').length,
          hots_interface: BROKEN_LINKS.filter(b => b.source === 'HOTS Interface').length,
          react_frontend: BROKEN_LINKS.filter(b => b.source === 'React Frontend').length
        }
      };
      
      try {
        if (!fs.existsSync('test-results')) {
          fs.mkdirSync('test-results', { recursive: true });
        }
        fs.writeFileSync('test-results/ui-test-report-vince-mode.json', JSON.stringify(report, null, 2));
        console.log('📋 Rapport détaillé sauvé: test-results/ui-test-report-vince-mode.json');
      } catch (err) {
        console.log('⚠️ Impossible de sauver le rapport:', err.message);
      }
    }
    
    console.log('\n🔧 Jean dit: "Maintenant on répare tout ça !"');
  });
}); 