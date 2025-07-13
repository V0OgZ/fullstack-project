describe('Test Navigation Simple', () => {
  it('Tester la navigation étape par étape', () => {
    cy.visit('/')
    
    // 1. Vérifier l'URL de départ
    cy.url().then((url) => {
      console.log('🏠 URL de départ:', url)
    })
    
    // 2. Attendre que la page se charge
    cy.contains('Heroes of Time').should('be.visible')
    cy.wait(3000)
    
    // 3. Trouver et afficher les scénarios disponibles
    cy.get('[data-testid^="scenario-card-"]').then($cards => {
      console.log(`📋 Nombre de scénarios trouvés: ${$cards.length}`)
      
      $cards.each((index, card) => {
        const testid = card.getAttribute('data-testid')
        const text = card.textContent
        console.log(`   Scénario ${index}: ${testid} - "${text.substring(0, 50)}..."`)
      })
      
      // 4. Cliquer sur le premier scénario
      if ($cards.length > 0) {
        const firstCard = $cards.first()
        const scenarioId = firstCard.attr('data-testid').replace('scenario-card-', '')
        
        console.log(`🎯 Clic sur scénario: ${scenarioId}`)
        
        // Chercher et cliquer sur le bouton play
        cy.get(`[data-testid="play-button-${scenarioId}"]`)
          .should('be.visible')
          .click()
        
        // 5. Vérifier ce qui se passe après le clic
        cy.wait(2000)
        
        cy.url().then((newUrl) => {
          console.log('🎮 URL après clic:', newUrl)
          
          if (newUrl.includes('/game/')) {
            console.log('✅ Navigation vers page de jeu réussie!')
          } else {
            console.log('❌ Pas de navigation vers page de jeu')
            console.log('📍 URL actuelle:', newUrl)
          }
        })
        
        // 6. Vérifier le contenu de la page
        cy.get('body').then($body => {
          const bodyText = $body.text()
          if (bodyText.includes('Game')) {
            console.log('✅ Page contient "Game"')
          } else {
            console.log('❌ Page ne contient pas "Game"')
            console.log('📄 Début du contenu:', bodyText.substring(0, 200))
          }
        })
      }
    })
  })
}) 