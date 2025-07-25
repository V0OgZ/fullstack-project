#!/usr/bin/env node

// 🧪 TEST COMPLET DES UIs AVEC SCREENSHOTS - Mode Vince
// ======================================================
// Script qui teste tous les liens ET prend des screenshots
// Génère un joli rapport HTML avec images incluses

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const RESULTS = {
  tested: [],
  broken: [],
  screenshots: []
};

const UIS_TO_TEST = [
  {
    name: 'Dashboard Legacy',
    url: 'http://localhost:9000/dashboard.html',
    description: 'Dashboard principal HTML avec tous les contrôles'
  },
  {
    name: 'Portail Vince Mode', 
    url: 'http://localhost:9000/portail-vince-mode.html',
    description: 'Portail organisé pour l\'architecture simplifiée'
  },
  {
    name: 'Interface Web HOTS',
    url: 'http://localhost:9000/hots-web-interface.html',
    description: 'Console HOTS en version web avec logs temps réel'
  },
  {
    name: 'React Frontend',
    url: 'http://localhost:3000',
    description: 'Application React moderne - le futur'
  },
  {
    name: 'Hexagon Battlefield',
    url: 'http://localhost:9000/vince-vega-hexagon-battlefield.html',
    description: 'Champ de bataille hexagonal - Bestagon approved'
  },
  {
    name: 'Omega Zero Trilogie',
    url: 'http://localhost:9000/omega-zero-trilogie-visuelle.html',
    description: 'Trilogie épique contre OmégaZero'
  },
  {
    name: 'Memento Tattoos',
    url: 'http://localhost:9000/memento-tattoos-viewer.html',
    description: 'Tatouages de Memento l\'Archiviste'
  },
  {
    name: 'Forge Runique',
    url: 'http://localhost:9000/forge-runique.html',
    description: 'Atelier de création d\'artefacts'
  }
];

async function takeScreenshot(page, url, name) {
  try {
    console.log(`📸 Screenshot: ${name}`);
    
    await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
    
    // Attendre un peu que tout se charge
    await page.waitForTimeout(2000);
    
    const screenshotPath = `test-results/screenshots/${name.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    await page.screenshot({ 
      path: screenshotPath, 
      fullPage: true,
      quality: 80
    });
    
    console.log(`✅ Screenshot sauvé: ${screenshotPath}`);
    return screenshotPath;
    
  } catch (error) {
    console.log(`❌ Erreur screenshot ${name}: ${error.message}`);
    return null;
  }
}

async function testUI(page, ui) {
  console.log(`\n🎯 Test: ${ui.name}`);
  console.log(`🔗 URL: ${ui.url}`);
  
  try {
    // Tester l'accès à la page
    const response = await page.goto(ui.url, { waitUntil: 'networkidle', timeout: 10000 });
    const status = response.status();
    
    if (status >= 200 && status < 400) {
      console.log(`✅ Page accessible (${status})`);
      
      // Prendre un screenshot
      const screenshotPath = await takeScreenshot(page, ui.url, ui.name);
      
      // Vérifier le contenu
      const title = await page.title();
      const content = await page.content();
      
      RESULTS.tested.push({
        name: ui.name,
        url: ui.url,
        status,
        title,
        description: ui.description,
        screenshot: screenshotPath,
        contentLength: content.length,
        timestamp: new Date().toISOString()
      });
      
      console.log(`📄 Titre: ${title}`);
      console.log(`📊 Contenu: ${content.length} caractères`);
      
    } else {
      console.log(`❌ Page inaccessible (${status})`);
      RESULTS.broken.push({
        name: ui.name,
        url: ui.url,
        status,
        error: `HTTP ${status}`,
        description: ui.description
      });
    }
    
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`);
    RESULTS.broken.push({
      name: ui.name,
      url: ui.url,
      error: error.message,
      description: ui.description
    });
  }
}

function generateHTMLReport() {
  const timestamp = new Date().toLocaleString('fr-FR');
  const totalTested = RESULTS.tested.length + RESULTS.broken.length;
  const successRate = Math.round((RESULTS.tested.length / totalTested) * 100);
  
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🧪 Rapport Test UIs - Mode Vince</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Courier New', monospace;
            background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e);
            color: #00ff88;
            min-height: 100vh;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            padding: 30px;
            background: rgba(0,0,0,0.8);
            border-radius: 15px;
            border: 3px solid #00ff88;
            margin-bottom: 30px;
            animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
            from { box-shadow: 0 0 20px rgba(0,255,136,0.5); }
            to { box-shadow: 0 0 40px rgba(0,255,136,0.8); }
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 0 0 20px #00ff88;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: rgba(0,0,0,0.6);
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #444;
            text-align: center;
        }
        
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .success { color: #00ff88; }
        .error { color: #ff6b6b; }
        .info { color: #00bfff; }
        
        .ui-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
        }
        
        .ui-card {
            background: rgba(0,0,0,0.6);
            border-radius: 15px;
            padding: 20px;
            border: 2px solid #444;
            transition: all 0.3s;
        }
        
        .ui-card:hover {
            border-color: #00ff88;
            transform: translateY(-5px);
        }
        
        .ui-card.working {
            border-color: #00ff88;
        }
        
        .ui-card.broken {
            border-color: #ff6b6b;
        }
        
        .ui-title {
            font-size: 1.3em;
            margin-bottom: 10px;
            color: #00bfff;
        }
        
        .ui-url {
            font-size: 0.9em;
            color: #888;
            margin-bottom: 10px;
            word-break: break-all;
        }
        
        .ui-status {
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8em;
            margin-bottom: 15px;
            display: inline-block;
        }
        
        .status-ok {
            background: #00ff88;
            color: #000;
        }
        
        .status-error {
            background: #ff6b6b;
            color: #fff;
        }
        
        .screenshot {
            width: 100%;
            max-width: 100%;
            border-radius: 10px;
            margin: 15px 0;
            border: 2px solid #444;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .screenshot:hover {
            border-color: #00ff88;
            transform: scale(1.02);
        }
        
        .ui-description {
            font-size: 0.9em;
            color: #ccc;
            line-height: 1.4;
            margin-top: 10px;
        }
        
        .footer {
            text-align: center;
            margin-top: 50px;
            padding: 20px;
            color: #888;
        }
        
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
        }
        
        .modal-content {
            margin: auto;
            display: block;
            width: 90%;
            max-width: 1200px;
            margin-top: 5%;
        }
        
        .close {
            position: absolute;
            top: 15px;
            right: 35px;
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧪 Rapport Test UIs - Mode Vince</h1>
        <p>Généré le ${timestamp}</p>
        <p>Jean dit: "faut tout réparer c'est Jean qui le dit"</p>
    </div>
    
    <div class="stats">
        <div class="stat-card">
            <div class="stat-number info">${totalTested}</div>
            <div>UIs Testées</div>
        </div>
        <div class="stat-card">
            <div class="stat-number success">${RESULTS.tested.length}</div>
            <div>Fonctionnelles</div>
        </div>
        <div class="stat-card">
            <div class="stat-number error">${RESULTS.broken.length}</div>
            <div>Cassées</div>
        </div>
        <div class="stat-card">
            <div class="stat-number info">${successRate}%</div>
            <div>Taux de Réussite</div>
        </div>
    </div>
    
    <div class="ui-grid">
        ${RESULTS.tested.map(ui => `
            <div class="ui-card working">
                <div class="ui-title">✅ ${ui.name}</div>
                <div class="ui-url">${ui.url}</div>
                <div class="ui-status status-ok">HTTP ${ui.status} - ${ui.title}</div>
                ${ui.screenshot ? `<img src="${ui.screenshot}" alt="${ui.name}" class="screenshot" onclick="openModal('${ui.screenshot}')">` : ''}
                <div class="ui-description">${ui.description}</div>
                <div style="font-size: 0.8em; color: #666; margin-top: 10px;">
                    📊 ${ui.contentLength} caractères • 📸 Screenshot inclus
                </div>
            </div>
        `).join('')}
        
        ${RESULTS.broken.map(ui => `
            <div class="ui-card broken">
                <div class="ui-title">❌ ${ui.name}</div>
                <div class="ui-url">${ui.url}</div>
                <div class="ui-status status-error">${ui.error}</div>
                <div class="ui-description">${ui.description}</div>
                <div style="font-size: 0.8em; color: #ff6b6b; margin-top: 10px;">
                    🔧 À réparer selon Jean
                </div>
            </div>
        `).join('')}
    </div>
    
    <div class="footer">
        <p>🎮 Heroes of Time - Mode Vince Opérationnel</p>
        <p>Rapport généré automatiquement avec screenshots</p>
    </div>
    
    <!-- Modal pour agrandir les images -->
    <div id="imageModal" class="modal">
        <span class="close" onclick="closeModal()">&times;</span>
        <img class="modal-content" id="modalImage">
    </div>
    
    <script>
        function openModal(imageSrc) {
            document.getElementById('imageModal').style.display = 'block';
            document.getElementById('modalImage').src = imageSrc;
        }
        
        function closeModal() {
            document.getElementById('imageModal').style.display = 'none';
        }
        
        // Fermer le modal en cliquant à côté
        window.onclick = function(event) {
            const modal = document.getElementById('imageModal');
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
        
        console.log('🎮 Rapport UI Mode Vince chargé !');
        console.log('📊 Stats:', {
            total: ${totalTested},
            working: ${RESULTS.tested.length},
            broken: ${RESULTS.broken.length},
            success_rate: '${successRate}%'
        });
    </script>
</body>
</html>`;

  return html;
}

async function runFullTest() {
  console.log('🧪 DÉMARRAGE TEST COMPLET AVEC SCREENSHOTS');
  console.log('==========================================');
  
  // Créer les dossiers nécessaires
  if (!fs.existsSync('test-results')) {
    fs.mkdirSync('test-results', { recursive: true });
  }
  if (!fs.existsSync('test-results/screenshots')) {
    fs.mkdirSync('test-results/screenshots', { recursive: true });
  }
  
  // Lancer Playwright
  console.log('🚀 Lancement du navigateur...');
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Configurer la page
  await page.setViewportSize({ width: 1280, height: 720 });
  
  try {
    // Tester chaque UI
    for (const ui of UIS_TO_TEST) {
      await testUI(page, ui);
      // Pause entre les tests
      await page.waitForTimeout(1000);
    }
    
    console.log('\n🎯 GÉNÉRATION DU RAPPORT HTML...');
    
    // Générer le rapport HTML
    const reportHTML = generateHTMLReport();
    const reportPath = 'test-results/ui-test-report.html';
    fs.writeFileSync(reportPath, reportHTML);
    
    console.log(`📋 Rapport HTML généré: ${reportPath}`);
    console.log('🖼️ Screenshots inclus dans le rapport');
    
    // Sauvegarder aussi les données JSON
    const jsonReport = {
      timestamp: new Date().toISOString(),
      mode: 'Vince Mode - Test Complet avec Screenshots',
      total_tested: RESULTS.tested.length + RESULTS.broken.length,
      success_rate: Math.round((RESULTS.tested.length / (RESULTS.tested.length + RESULTS.broken.length)) * 100),
      working_uis: RESULTS.tested,
      broken_uis: RESULTS.broken
    };
    
    fs.writeFileSync('test-results/ui-test-data.json', JSON.stringify(jsonReport, null, 2));
    
    console.log('\n🎉 TEST TERMINÉ !');
    console.log(`📊 Résultats: ${RESULTS.tested.length}/${RESULTS.tested.length + RESULTS.broken.length} UIs fonctionnelles`);
    console.log(`🌐 Ouvrir: file://${path.resolve(reportPath)}`);
    
    // Ouvrir automatiquement le rapport
    const { exec } = require('child_process');
    exec(`open "${reportPath}"`);
    
  } finally {
    await browser.close();
  }
}

// Lancer le test si appelé directement
if (require.main === module) {
  runFullTest().catch(console.error);
}

module.exports = { runFullTest }; 