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
