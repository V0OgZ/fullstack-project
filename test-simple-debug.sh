#!/bin/bash

echo "🔍 === TEST SIMPLE POUR DIAGNOSTIQUER LA PAGE D'ACCUEIL ==="

# Test 1: Vérifier que le frontend démarre
echo "📋 1. Test frontend..."
cd frontend
if npm start > /dev/null 2>&1 & then
    FRONTEND_PID=$!
    echo "✅ Frontend en cours de démarrage (PID: $FRONTEND_PID)"
    sleep 5
    
    # Vérifier que le port 3000 est ouvert
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ Frontend accessible sur localhost:3000"
    else
        echo "❌ Frontend NON accessible"
        kill $FRONTEND_PID 2>/dev/null
        exit 1
    fi
else
    echo "❌ Impossible de démarrer le frontend"
    exit 1
fi

echo ""
echo "📋 2. Test éléments de la page..."

# Test avec Cypress pour vérifier les éléments
cat > cypress/e2e/debug-page.cy.js << 'EOF'
describe('Debug Page d\'Accueil', () => {
  it('Page se charge et éléments présents', () => {
    cy.visit('/')
    
    // Vérifier que la page se charge
    cy.contains('Heroes of Time').should('be.visible')
    
    // Chercher les boutons de scénarios
    cy.get('[data-testid="scenario-conquest-classic"]', { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Classic Conquest')
    
    cy.get('[data-testid="scenario-temporal-rift"]', { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Temporal Rift')
    
    // Capturer screenshot
    cy.screenshot('page-accueil-elements')
  })

  it('Test clic sur scénario', () => {
    cy.visit('/')
    
    // Attendre que les éléments soient chargés
    cy.get('[data-testid="scenario-conquest-classic"]', { timeout: 10000 })
      .should('be.visible')
    
    // Cliquer sur le scénario
    cy.get('[data-testid="scenario-conquest-classic"]').click()
    
    // Capturer screenshot après clic
    cy.screenshot('apres-clic-scenario')
    
    // Vérifier ce qui se passe après le clic
    cy.url().then((url) => {
      cy.log('URL après clic: ' + url)
      if (url.includes('/game/')) {
        cy.log('✅ Navigation vers page de jeu réussie')
      } else {
        cy.log('❌ Pas de navigation vers page de jeu')
      }
    })
  })
})
EOF

echo "✅ Test Cypress créé"

echo ""
echo "📋 3. Lancement du test..."

# Lancer Cypress en mode headless pour le test
npx cypress run --spec "cypress/e2e/debug-page.cy.js" --headless

echo ""
echo "📋 4. Vérification des screenshots..."
if [ -d "cypress/screenshots" ]; then
    echo "✅ Screenshots disponibles dans: cypress/screenshots"
    ls -la cypress/screenshots/debug-page.cy.js/
else
    echo "❌ Pas de screenshots générés"
fi

echo ""
echo "📋 5. Nettoyage..."
kill $FRONTEND_PID 2>/dev/null || true

echo ""
echo "🎯 === RÉSUMÉ DU DIAGNOSTIC ==="
echo "- Frontend: Vérifié"
echo "- Éléments page: Testés avec Cypress"
echo "- Clics: Testés"
echo "- Screenshots: Générés pour analyse visuelle"
echo ""
echo "💡 Regardez les screenshots dans cypress/screenshots/ pour voir ce qui se passe visuellement" 