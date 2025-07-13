describe('Debug CORRIGÉ - Page d\'Accueil', () => {
  it('Voir ce qui est vraiment sur la page', () => {
    cy.visit('/')
    
    // Vérifier que la page se charge
    cy.contains('Heroes of Time').should('be.visible')
    
    // Attendre un moment pour que tout se charge
    cy.wait(5000)
    
    // Capturer screenshot de la page complète
    cy.screenshot('page-complete', { fullPage: true })
    
    // Chercher tous les éléments avec data-testid qui commencent par "scenario"
    cy.get('[data-testid^="scenario"]').then($elements => {
      cy.log(`Trouvé ${$elements.length} éléments de scénarios`)
      
      $elements.each((index, element) => {
        const testid = element.getAttribute('data-testid')
        cy.log(`Élément ${index}: data-testid="${testid}"`)
      })
    })
    
    // Essayer de trouver les cartes de scénarios avec les vrais identifiants
    cy.get('[data-testid^="scenario-card-"]').should('exist').then($cards => {
      cy.log(`Trouvé ${$cards.length} cartes de scénarios`)
      
      // Cliquer sur la première carte trouvée
      if ($cards.length > 0) {
        const firstCardTestId = $cards.first().attr('data-testid')
        cy.log(`Première carte: ${firstCardTestId}`)
        
        // Chercher le bouton play correspondant
        const scenarioId = firstCardTestId.replace('scenario-card-', '')
        const playButtonTestId = `play-button-${scenarioId}`
        
        cy.log(`Cherche bouton: ${playButtonTestId}`)
        
        cy.get(`[data-testid="${playButtonTestId}"]`).should('be.visible').click()
        
        // Capturer screenshot après clic
        cy.screenshot('apres-clic-reel')
        
        // Vérifier l'URL après clic
        cy.url().then((url) => {
          cy.log('URL après clic: ' + url)
        })
      }
    })
  })

  it('Test de navigation et erreurs', () => {
    cy.visit('/')
    
    // Vérifier les erreurs de console
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError')
    })
    
    // Attendre et vérifier qu'il n'y a pas d'erreurs critiques
    cy.wait(3000)
    
    cy.get('@consoleError').should('not.have.been.called')
    
    // Capturer le DOM complet pour analyse
    cy.get('body').then($body => {
      cy.log('Contenu de la page:', $body.html().substring(0, 500))
    })
  })
}) 