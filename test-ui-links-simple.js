#!/usr/bin/env node

// 🧪 TEST SIMPLE DES UIs - Mode Vince
// ===================================
// Script Node.js simple pour tester tous les liens
// Jean dit: "faut tout réparer c'est Jean qui le dit"

const https = require('https');
const http = require('http');
const { URL } = require('url');

const BROKEN_LINKS = [];
const TESTED_LINKS = [];

// Configuration des UIs à tester
const UIS_TO_TEST = [
  {
    name: 'Dashboard Legacy',
    url: 'http://localhost:9000/dashboard.html',
    type: 'dashboard'
  },
  {
    name: 'Portail Vince Mode', 
    url: 'http://localhost:9000/portail-vince-mode.html',
    type: 'portail'
  },
  {
    name: 'Interface Web HOTS',
    url: 'http://localhost:9000/hots-web-interface.html', 
    type: 'interface'
  },
  {
    name: 'React Frontend',
    url: 'http://localhost:3000',
    type: 'react'
  }
];

// Liens connus à tester directement
const DIRECT_LINKS_TO_TEST = [
  'http://localhost:3000',
  'http://localhost:3000/game',
  'http://localhost:9000/dashboard.html',
  'http://localhost:9000/portail-vince-mode.html',
  'http://localhost:9000/vince-vega-hexagon-battlefield.html',
  'http://localhost:9000/omega-zero-trilogie-visuelle.html',
  'http://localhost:9000/hots-console-simple.html',
  'http://localhost:9000/memento-tattoos-viewer.html',
  'http://localhost:9000/forge-runique.html',
  'http://localhost:9000/game-assets-viewer.html',
  'http://localhost:9000/hots-web-interface.html',
  'http://localhost:8080/api/health'
];

function testUrl(url) {
  return new Promise((resolve) => {
    console.log(`🔗 Test: ${url}`);
    
    try {
      const urlObj = new URL(url);
      const client = urlObj.protocol === 'https:' ? https : http;
      
      const req = client.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
        const status = res.statusCode;
        
        if (status >= 200 && status < 400) {
          console.log(`✅ OK: ${url} (${status})`);
          TESTED_LINKS.push({ url, status, result: 'OK' });
          resolve({ url, status, ok: true });
        } else {
          console.log(`❌ CASSÉ: ${url} (${status})`);
          BROKEN_LINKS.push({ url, status, error: `Status ${status}` });
          resolve({ url, status, ok: false, error: `Status ${status}` });
        }
      });
      
      req.on('error', (error) => {
        console.log(`❌ ERREUR: ${url} - ${error.message}`);
        BROKEN_LINKS.push({ url, error: error.message });
        resolve({ url, ok: false, error: error.message });
      });
      
      req.on('timeout', () => {
        console.log(`⏰ TIMEOUT: ${url}`);
        BROKEN_LINKS.push({ url, error: 'Timeout' });
        req.destroy();
        resolve({ url, ok: false, error: 'Timeout' });
      });
      
      req.end();
      
    } catch (error) {
      console.log(`❌ URL INVALIDE: ${url} - ${error.message}`);
      BROKEN_LINKS.push({ url, error: `URL invalide: ${error.message}` });
      resolve({ url, ok: false, error: error.message });
    }
  });
}

async function testAllLinks() {
  console.log('🧪 DÉMARRAGE DU TEST DES UIs - MODE VINCE');
  console.log('=========================================');
  console.log('');
  
  // Vérifier d'abord que les serveurs principaux sont actifs
  console.log('🔍 Vérification des serveurs principaux...');
  const mainServers = [
    'http://localhost:3000',
    'http://localhost:8080/api/health', 
    'http://localhost:9000/dashboard.html'
  ];
  
  for (const server of mainServers) {
    await testUrl(server);
  }
  
  console.log('');
  console.log('🎯 Test des liens directs...');
  
  // Tester tous les liens directs
  for (const link of DIRECT_LINKS_TO_TEST) {
    await testUrl(link);
    // Petite pause pour éviter de surcharger
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log('');
  console.log('🎯 RAPPORT FINAL');
  console.log('================');
  
  const totalTested = TESTED_LINKS.length + BROKEN_LINKS.length;
  const successRate = Math.round((TESTED_LINKS.length / totalTested) * 100);
  
  console.log(`📊 Total testé: ${totalTested} liens`);
  console.log(`✅ Fonctionnels: ${TESTED_LINKS.length} (${successRate}%)`);
  console.log(`❌ Cassés: ${BROKEN_LINKS.length}`);
  console.log('');
  
  if (BROKEN_LINKS.length === 0) {
    console.log('🎉 PARFAIT ! Tous les liens fonctionnent !');
    console.log('✅ Mode Vince 100% opérationnel !');
  } else {
    console.log('🔧 LIENS À RÉPARER :');
    console.log('');
    
    BROKEN_LINKS.forEach((broken, index) => {
      console.log(`${index + 1}. ❌ ${broken.url}`);
      console.log(`   💥 Erreur: ${broken.error || broken.status}`);
      console.log('');
    });
    
    console.log('🧰 Jean dit: "Maintenant on répare tout ça !"');
  }
  
  // Sauvegarder le rapport
  const fs = require('fs');
  const report = {
    timestamp: new Date().toISOString(),
    mode: 'Vince Mode - Test Simple',
    total_tested: totalTested,
    success_rate: successRate,
    working_links: TESTED_LINKS,
    broken_links: BROKEN_LINKS
  };
  
  try {
    if (!fs.existsSync('test-results')) {
      fs.mkdirSync('test-results', { recursive: true });
    }
    fs.writeFileSync('test-results/ui-links-simple-report.json', JSON.stringify(report, null, 2));
    console.log('📋 Rapport sauvé: test-results/ui-links-simple-report.json');
  } catch (err) {
    console.log('⚠️ Impossible de sauver le rapport:', err.message);
  }
}

// Lancer le test
if (require.main === module) {
  testAllLinks().catch(console.error);
}

module.exports = { testAllLinks, testUrl }; 