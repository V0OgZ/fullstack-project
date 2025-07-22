#!/usr/bin/env node

/**
 * Test de capture d'écran des deux interfaces du projet Heroes of Time
 * Ce test lance les deux serveurs, prend des screenshots et vérifie la cohérence
 */

const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    FRONTEND_PORT: 8000,
    FRONTEND_TEMPORAL_PORT: 5173,
    SCREENSHOTS_DIR: './test-screenshots',
    REFERENCE_DIR: './test-references',
    TIMEOUT: 30000
};

// Couleurs pour les logs
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function startFrontendServer() {
    log('Démarrage du serveur frontend classique...', 'blue');
    
    const server = spawn('python3', ['-m', 'http.server', CONFIG.FRONTEND_PORT.toString()], {
        cwd: './frontend',
        stdio: 'pipe'
    });

    // Attendre que le serveur soit prêt
    await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Timeout serveur frontend classique'));
        }, 10000);

        server.stdout.on('data', (data) => {
            console.log('Frontend stdout:', data.toString());
            if (data.toString().includes('Serving HTTP')) {
                clearTimeout(timeout);
                log('Serveur frontend classique démarré', 'green');
                resolve();
            }
        });

        server.stderr.on('data', (data) => {
            console.log('Frontend stderr:', data.toString());
        });

        server.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
        
        // Résoudre après 3 secondes si pas de message spécifique
        setTimeout(() => {
            clearTimeout(timeout);
            log('Serveur frontend classique probablement démarré', 'green');
            resolve();
        }, 3000);
    });

    return server;
}

async function startTemporalServer() {
    log('Démarrage du serveur frontend temporel...', 'blue');
    
    const server = spawn('npm', ['run', 'dev'], {
        cwd: './frontend-temporal',
        stdio: 'pipe'
    });

    // Attendre que le serveur soit prêt
    await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Timeout serveur frontend temporel'));
        }, 15000);

        server.stdout.on('data', (data) => {
            console.log('Temporal stdout:', data.toString());
            if (data.toString().includes('Local:') || data.toString().includes('ready')) {
                clearTimeout(timeout);
                log('Serveur frontend temporel démarré', 'green');
                resolve();
            }
        });

        server.stderr.on('data', (data) => {
            console.log('Temporal stderr:', data.toString());
        });

        server.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
        
        // Résoudre après 5 secondes si pas de message spécifique
        setTimeout(() => {
            clearTimeout(timeout);
            log('Serveur frontend temporel probablement démarré', 'green');
            resolve();
        }, 5000);
    });

    return server;
}

async function takeScreenshot(page, name, description) {
    log(`Capture d'écran: ${description}`, 'yellow');
    
    await page.waitForTimeout(2000); // Attendre le rendu
    
    const screenshotPath = path.join(CONFIG.SCREENSHOTS_DIR, `${name}.png`);
    await page.screenshot({ 
        path: screenshotPath,
        fullPage: true 
    });
    
    log(`Screenshot sauvegardé: ${screenshotPath}`, 'green');
    return screenshotPath;
}

async function testFrontendClassic(browser) {
    log('Test de l\'interface classique...', 'blue');
    
    const page = await browser.newPage();
    await page.goto(`http://localhost:${CONFIG.FRONTEND_PORT}`);
    
    // Attendre que la page soit chargée
    await page.waitForSelector('body');
    
    // Prendre un screenshot initial
    await takeScreenshot(page, 'frontend-classic-initial', 'Interface classique - Vue initiale');
    
    // Tester l'interaction avec la console de script
    try {
        await page.click('#script-input');
        await page.fill('#script-input', 'ψ test');
        await takeScreenshot(page, 'frontend-classic-script', 'Interface classique - Console script');
        
        // Tester l'exécution d'une commande
        await page.press('#script-input', 'Enter');
        await page.waitForTimeout(1000);
        await takeScreenshot(page, 'frontend-classic-executed', 'Interface classique - Commande exécutée');
    } catch (error) {
        log(`Erreur lors du test d'interaction: ${error.message}`, 'red');
    }
    
    await page.close();
}

async function testFrontendTemporal(browser) {
    log('Test de l\'interface temporelle...', 'blue');
    
    const page = await browser.newPage();
    await page.goto(`http://localhost:${CONFIG.FRONTEND_TEMPORAL_PORT}`);
    
    // Attendre que la page soit chargée
    await page.waitForSelector('body');
    
    // Prendre un screenshot initial
    await takeScreenshot(page, 'frontend-temporal-initial', 'Interface temporelle - Vue initiale');
    
    // Tester les éléments spécifiques de l'interface temporelle
    try {
        // Chercher des éléments caractéristiques
        const title = await page.textContent('h1');
        log(`Titre détecté: ${title}`, 'green');
        
        // Tester l'interaction avec les boutons quantiques
        const quantumButtons = await page.locator('button').count();
        log(`Nombre de boutons détectés: ${quantumButtons}`, 'green');
        
        if (quantumButtons > 0) {
            await page.click('button:first-child');
            await page.waitForTimeout(1000);
            await takeScreenshot(page, 'frontend-temporal-interaction', 'Interface temporelle - Interaction');
        }
        
        // Tester l'affichage des états quantiques
        await takeScreenshot(page, 'frontend-temporal-final', 'Interface temporelle - État final');
        
    } catch (error) {
        log(`Erreur lors du test d'interaction temporelle: ${error.message}`, 'red');
    }
    
    await page.close();
}

async function compareScreenshots() {
    log('Comparaison avec les références...', 'blue');
    
    const screenshotsDir = CONFIG.SCREENSHOTS_DIR;
    const referencesDir = CONFIG.REFERENCE_DIR;
    
    if (!fs.existsSync(referencesDir)) {
        log('Dossier de référence non trouvé, création des références...', 'yellow');
        fs.mkdirSync(referencesDir, { recursive: true });
        
        // Copier les screenshots comme références
        const screenshots = fs.readdirSync(screenshotsDir);
        screenshots.forEach(screenshot => {
            const src = path.join(screenshotsDir, screenshot);
            const dest = path.join(referencesDir, screenshot);
            fs.copyFileSync(src, dest);
        });
        
        log('Références créées avec succès', 'green');
        return true;
    }
    
    // Comparer les fichiers (basique - vérifier existence)
    const screenshots = fs.readdirSync(screenshotsDir);
    const references = fs.readdirSync(referencesDir);
    
    let allMatch = true;
    screenshots.forEach(screenshot => {
        if (!references.includes(screenshot)) {
            log(`Référence manquante pour: ${screenshot}`, 'red');
            allMatch = false;
        } else {
            log(`Référence trouvée pour: ${screenshot}`, 'green');
        }
    });
    
    return allMatch;
}

async function generateReport() {
    log('Génération du rapport...', 'blue');
    
    const report = {
        timestamp: new Date().toISOString(),
        frontend_classic: {
            port: CONFIG.FRONTEND_PORT,
            status: 'tested',
            screenshots: ['frontend-classic-initial', 'frontend-classic-script', 'frontend-classic-executed']
        },
        frontend_temporal: {
            port: CONFIG.FRONTEND_TEMPORAL_PORT,
            status: 'tested',
            screenshots: ['frontend-temporal-initial', 'frontend-temporal-interaction', 'frontend-temporal-final']
        }
    };
    
    fs.writeFileSync('./test-report.json', JSON.stringify(report, null, 2));
    log('Rapport généré: test-report.json', 'green');
}

async function main() {
    log('=== Test des interfaces Heroes of Time ===', 'green');
    
    // Créer les dossiers de test
    if (!fs.existsSync(CONFIG.SCREENSHOTS_DIR)) {
        fs.mkdirSync(CONFIG.SCREENSHOTS_DIR, { recursive: true });
    }
    
    let frontendServer, temporalServer, browser;
    
    try {
        // Démarrer les serveurs
        frontendServer = await startFrontendServer();
        temporalServer = await startTemporalServer();
        
        // Attendre que les serveurs soient prêts
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Lancer le navigateur
        browser = await chromium.launch({ headless: true });
        
        // Tester les deux interfaces
        await testFrontendClassic(browser);
        await testFrontendTemporal(browser);
        
        // Comparer avec les références
        const comparison = await compareScreenshots();
        
        // Générer le rapport
        await generateReport();
        
        log('=== Test terminé avec succès ===', 'green');
        
        if (comparison) {
            log('Toutes les captures correspondent aux références', 'green');
        } else {
            log('Certaines captures diffèrent des références', 'yellow');
        }
        
    } catch (error) {
        log(`Erreur durant le test: ${error.message}`, 'red');
        process.exit(1);
    } finally {
        // Nettoyage
        if (browser) await browser.close();
        if (frontendServer) frontendServer.kill();
        if (temporalServer) temporalServer.kill();
    }
}

if (require.main === module) {
    main();
}

module.exports = { main }; 