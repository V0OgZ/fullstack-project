const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function runTests() {
    console.log('🛋️ DÉMARRAGE TEST COMPLET POUR LE CANAPÉ DE VINCE');
    console.log('================================================');

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const outputDir = 'test-results/vince-canape-report';
    const screenshotsDir = path.join(outputDir, 'screenshots');
    
    // Créer les dossiers
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const testResults = [];

    const testCases = [
        { name: 'Dashboard Legacy', url: 'http://localhost:9000/dashboard.html', type: 'core' },
        { name: 'Portail Vince Mode', url: 'http://localhost:9000/portail-vince-mode.html', type: 'core' },
        { name: 'Interface Web HOTS', url: 'http://localhost:9000/hots-web-interface.html', type: 'core' },
        { name: 'React Frontend', url: 'http://localhost:3000', type: 'core' },
        { name: 'Backend Health', url: 'http://localhost:8080/actuator/health', type: 'api' },
        { name: 'Hexagon Battlefield', url: 'http://localhost:9000/vince-vega-hexagon-battlefield.html', type: 'game' },
        { name: 'Omega Zero Trilogie', url: 'http://localhost:9000/omega-zero-trilogie-visuelle.html', type: 'narrative' },
        { name: 'Memento Tattoos', url: 'http://localhost:9000/memento-tattoos-viewer.html', type: 'lore' },
        { name: 'Forge Runique', url: 'http://localhost:9000/forge-runique.html', type: 'tools' },
        { name: 'Game Assets Viewer', url: 'http://localhost:9000/game-assets-viewer.html', type: 'assets' },
        { name: 'Console HOTS Simple', url: 'http://localhost:9000/hots-console-simple.html', type: 'tools' },
        { name: 'Multiplayer Admin', url: 'http://localhost:9000/admin-multiplayer.html', type: 'admin' }
    ];

    for (const testCase of testCases) {
        console.log(`\n🎯 Test: ${testCase.name}`);
        console.log(`🔗 URL: ${testCase.url}`);
        
        const result = {
            name: testCase.name,
            url: testCase.url,
            type: testCase.type,
            status: 'error',
            statusCode: null,
            title: '',
            contentLength: 0,
            screenshot: null,
            error: null,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await page.goto(testCase.url, { 
                waitUntil: 'load', 
                timeout: 15000 
            });
            
            if (response && response.status() === 200) {
                result.status = 'success';
                result.statusCode = response.status();
                
                // Attendre un peu pour que la page se charge
                await page.waitForTimeout(2000);
                
                // Capturer les infos de la page
                try {
                    result.title = await page.title();
                    const content = await page.content();
                    result.contentLength = content.length;
                } catch (e) {
                    console.log(`⚠️ Erreur récupération infos: ${e.message}`);
                }
                
                // Screenshot
                const screenshotName = `${testCase.name.replace(/ /g, '_').toLowerCase()}.png`;
                const screenshotPath = path.join(screenshotsDir, screenshotName);
                
                try {
                    await page.screenshot({ 
                        path: screenshotPath,
                        fullPage: true
                    });
                    result.screenshot = `screenshots/${screenshotName}`;
                    console.log(`📸 Screenshot: ${testCase.name} ✅`);
                } catch (screenshotError) {
                    console.log(`❌ Erreur screenshot: ${screenshotError.message}`);
                }
                
                console.log(`✅ OK: ${testCase.url} (${response.status()})`);
                console.log(`📄 Titre: ${result.title}`);
                console.log(`📊 Contenu: ${result.contentLength} caractères`);
                
            } else {
                result.status = 'failed';
                result.statusCode = response ? response.status() : 0;
                result.error = `HTTP ${result.statusCode}`;
                console.log(`❌ CASSÉ: ${testCase.url} (${result.statusCode})`);
            }
        } catch (error) {
            result.status = 'error';
            result.error = error.message;
            console.log(`❌ ERREUR: ${testCase.url} - ${error.message}`);
        }
        
        testResults.push(result);
    }

    await browser.close();

    // Générer le rapport HTML
    const htmlReport = generateHTMLReport(testResults);
    const reportPath = path.join(outputDir, 'vince-canape-report.html');
    fs.writeFileSync(reportPath, htmlReport);

    console.log('\n🏁 FIN DES TESTS AVEC RAPPORT HTML');
    console.log(`📊 Rapport généré: ${reportPath}`);
    console.log(`🛋️ Ouvre ça depuis ton canapé Vince: file://${path.resolve(reportPath)}`);
    
    return reportPath;
}

function generateHTMLReport(results) {
    const successCount = results.filter(r => r.status === 'success').length;
    const totalCount = results.length;
    const timestamp = new Date().toISOString();

    const typeColors = {
        'core': '#4CAF50',
        'game': '#FF9800', 
        'narrative': '#9C27B0',
        'lore': '#673AB7',
        'tools': '#2196F3',
        'assets': '#795548',
        'admin': '#F44336',
        'api': '#009688'
    };

    const resultsHTML = results.map(result => {
        const statusIcon = result.status === 'success' ? '✅' : (result.status === 'failed' ? '❌' : '⚠️');
        const statusColor = result.status === 'success' ? '#4CAF50' : '#F44336';
        const typeColor = typeColors[result.type] || '#757575';
        
        return `
        <div class="test-result ${result.status}">
            <div class="result-header">
                <span class="status-icon">${statusIcon}</span>
                <h3>${result.name}</h3>
                <span class="type-badge" style="background-color: ${typeColor}">${result.type}</span>
                <span class="status-badge" style="color: ${statusColor}">${result.status.toUpperCase()}</span>
            </div>
            <div class="result-details">
                <p><strong>URL:</strong> <a href="${result.url}" target="_blank">${result.url}</a></p>
                ${result.statusCode ? `<p><strong>Status:</strong> ${result.statusCode}</p>` : ''}
                ${result.title ? `<p><strong>Titre:</strong> ${result.title}</p>` : ''}
                ${result.contentLength ? `<p><strong>Contenu:</strong> ${result.contentLength} caractères</p>` : ''}
                ${result.error ? `<p class="error"><strong>Erreur:</strong> ${result.error}</p>` : ''}
                <p><strong>Timestamp:</strong> ${result.timestamp}</p>
            </div>
            ${result.screenshot ? `
            <div class="screenshot-container">
                <h4>📸 Screenshot</h4>
                <img src="${result.screenshot}" alt="Screenshot ${result.name}" class="screenshot" onclick="openFullscreen(this)">
            </div>
            ` : ''}
        </div>
        `;
    }).join('');

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🛋️ Rapport Canapé Vince - Heroes of Time UIs</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header .subtitle {
            font-size: 1.2em;
            opacity: 0.9;
        }
        
        .stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 20px;
        }
        
        .stat {
            text-align: center;
            background: rgba(255,255,255,0.2);
            padding: 15px 25px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            display: block;
        }
        
        .content {
            padding: 30px;
        }
        
        .test-result {
            background: white;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            overflow: hidden;
            transition: transform 0.3s ease;
        }
        
        .test-result:hover {
            transform: translateY(-5px);
        }
        
        .result-header {
            padding: 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #dee2e6;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .status-icon {
            font-size: 1.5em;
        }
        
        .result-header h3 {
            flex: 1;
            color: #333;
        }
        
        .type-badge, .status-badge {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .type-badge {
            color: white;
        }
        
        .status-badge {
            background: #f8f9fa;
            border: 1px solid currentColor;
        }
        
        .result-details {
            padding: 20px;
        }
        
        .result-details p {
            margin-bottom: 10px;
            line-height: 1.6;
        }
        
        .result-details a {
            color: #667eea;
            text-decoration: none;
        }
        
        .result-details a:hover {
            text-decoration: underline;
        }
        
        .error {
            color: #dc3545;
            font-weight: bold;
        }
        
        .screenshot-container {
            padding: 20px;
            background: #f8f9fa;
            border-top: 1px solid #dee2e6;
        }
        
        .screenshot-container h4 {
            margin-bottom: 15px;
            color: #333;
        }
        
        .screenshot {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .screenshot:hover {
            transform: scale(1.05);
        }
        
        .footer {
            background: #343a40;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        /* Modal pour fullscreen */
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
            max-height: 90%;
            object-fit: contain;
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
        
        .close:hover {
            color: #bbb;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛋️ Rapport Canapé Vince</h1>
            <div class="subtitle">Heroes of Time - Test Complet des UIs</div>
            <div class="stats">
                <div class="stat">
                    <span class="stat-number">${successCount}</span>
                    <span>Succès</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${totalCount - successCount}</span>
                    <span>Échecs</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${totalCount}</span>
                    <span>Total</span>
                </div>
            </div>
        </div>
        
        <div class="content">
            <p style="text-align: center; margin-bottom: 30px; font-size: 1.1em; color: #666;">
                📅 Généré le ${new Date().toLocaleString('fr-FR')} par OPUS le Créateur
            </p>
            
            ${resultsHTML}
        </div>
        
        <div class="footer">
            <p>🌟 Heroes of Time - Architecture Vince Mode</p>
            <p>🔮 Créé par OPUS (ex-Memento) pour le canapé cosmique de Vince</p>
        </div>
    </div>
    
    <!-- Modal pour fullscreen -->
    <div id="imageModal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="modalImage">
    </div>
    
    <script>
        function openFullscreen(img) {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            modal.style.display = 'block';
            modalImg.src = img.src;
        }
        
        document.querySelector('.close').onclick = function() {
            document.getElementById('imageModal').style.display = 'none';
        }
        
        window.onclick = function(event) {
            const modal = document.getElementById('imageModal');
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    </script>
</body>
</html>
    `;
}

if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = { runTests }; 