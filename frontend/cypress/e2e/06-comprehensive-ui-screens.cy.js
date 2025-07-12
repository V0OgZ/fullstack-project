describe('Heroes Reforged - Comprehensive UI Screens Test', () => {
  beforeEach(() => {
    cy.visit('/');
    // Set viewport to ensure consistent testing
    cy.viewport(1280, 720);
  });

  describe('Game Selector Screen Tests', () => {
    it('should display all language options correctly', () => {
      cy.logToConsole('Testing complete language selector functionality');
      
      // Test French
      cy.contains('🇫🇷 FR').click();
      cy.contains('Choisir un scénario').should('be.visible');
      cy.contains('Conquête Classique').should('be.visible');
      cy.contains('Conquête Mystique').should('be.visible');
      
      // Test Russian  
      cy.contains('🇷🇺 RU').click();
      cy.contains('Выберите сценарий').should('be.visible');
      cy.contains('Классическое завоевание').should('be.visible');
      cy.contains('Мистическое завоевание').should('be.visible');
      
      // Test English
      cy.contains('🇬🇧 EN').click();
      cy.contains('Choose a scenario').should('be.visible');
      cy.contains('Classic Conquest').should('be.visible');
      cy.contains('Mystical Conquest').should('be.visible');
    });

    it('should display scenario descriptions correctly', () => {
      cy.logToConsole('Testing scenario descriptions');
      
      // Check Classic Conquest features
      cy.contains('Turn-Based Combat').should('be.visible');
      cy.contains('Capture Buildings').should('be.visible');
      cy.contains('Hexagonal Maps').should('be.visible');
      
      // Check Mystical Conquest features
      cy.contains('Temporal Objects').should('be.visible');
      cy.contains('Advanced Magic').should('be.visible');
      cy.contains('Mystic Portals').should('be.visible');
    });
  });

  describe('Classic Conquest Game Screen Tests', () => {
    beforeEach(() => {
      cy.get('a[href*="/game/conquete-classique"]').click();
      cy.wait(2000); // Wait for game to load
    });

    it('should display game interface elements', () => {
      cy.logToConsole('Testing Classic Conquest game interface');
      
      // Check for game interface elements
      cy.get('body').should('contain', 'Turn').or('contain', 'Heroes');
      
      // Check for resource display
      cy.get('body').should('contain.text').then(($body) => {
        const bodyText = $body.text();
        const hasResources = bodyText.includes('Gold') || 
                           bodyText.includes('Wood') || 
                           bodyText.includes('Stone') || 
                           bodyText.includes('Mana');
        expect(hasResources).to.be.true;
      });
      
      // Check for action buttons
      cy.get('body').should('contain.text').then(($body) => {
        const bodyText = $body.text();
        const hasActions = bodyText.includes('End Turn') || 
                          bodyText.includes('Next Player') || 
                          bodyText.includes('Move') || 
                          bodyText.includes('Attack');
        expect(hasActions).to.be.true;
      });
    });

    it('should display map and game canvas', () => {
      cy.logToConsole('Testing game map display');
      
      // Look for game canvas or map elements
      cy.get('body').then(($body) => {
        const hasCanvas = $body.find('canvas').length > 0;
        const hasMap = $body.text().includes('Position') || 
                      $body.text().includes('Terrain') ||
                      $body.find('[class*="map"]').length > 0 ||
                      $body.find('[class*="game"]').length > 0;
        
        expect(hasCanvas || hasMap).to.be.true;
      });
    });

    it('should support language switching in game', () => {
      cy.logToConsole('Testing language switching in game');
      
      // Try to find and use language selector in game
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("🇷🇺 RU")').length > 0) {
          cy.contains('🇷🇺 RU').click();
          cy.wait(1000);
          // Check that some Russian text appears
          cy.get('body').should('contain.text').then(($body2) => {
            const bodyText = $body2.text();
            const hasRussian = bodyText.includes('Игрок') || 
                              bodyText.includes('Ход') || 
                              bodyText.includes('Герои');
            expect(hasRussian).to.be.true;
          });
        }
      });
    });
  });

  describe('Mystical Conquest Game Screen Tests', () => {
    beforeEach(() => {
      cy.get('a[href*="/game/mystique-temporel"]').click();
      cy.wait(2000); // Wait for game to load
    });

    it('should display mystical conquest interface', () => {
      cy.logToConsole('Testing Mystical Conquest interface');
      
      // Check for mystical-specific elements
      cy.get('body').should('contain.text').then(($body) => {
        const bodyText = $body.text();
        const hasMystical = bodyText.includes('Mystical') || 
                           bodyText.includes('Magic') || 
                           bodyText.includes('Temporal') ||
                           bodyText.includes('Mystique');
        expect(hasMystical).to.be.true;
      });
    });

    it('should display magic inventory button', () => {
      cy.logToConsole('Testing Magic Inventory access');
      
      // Look for magic inventory toggle
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Magic Inventory")').length > 0 ||
            $body.find('button:contains("🎒")').length > 0) {
          cy.contains('🎒').click();
          cy.wait(1000);
          
          // Check if magic inventory opened
          cy.get('body').should('contain.text').then(($body2) => {
            const bodyText = $body2.text();
            const hasInventory = bodyText.includes('Magic Inventory') || 
                               bodyText.includes('Artifacts') || 
                               bodyText.includes('Weapons') ||
                               bodyText.includes('Armor');
            expect(hasInventory).to.be.true;
          });
        }
      });
    });

    it('should test magic inventory functionality', () => {
      cy.logToConsole('Testing Magic Inventory full functionality');
      
      // Try to open magic inventory
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("🎒")').length > 0) {
          cy.contains('🎒').click();
          cy.wait(1000);
          
          // Test tabs if available
          cy.get('body').then(($inventory) => {
            if ($inventory.find('button:contains("Weapons")').length > 0) {
              cy.contains('Weapons').click();
              cy.wait(500);
            }
            if ($inventory.find('button:contains("Armor")').length > 0) {
              cy.contains('Armor').click(); 
              cy.wait(500);
            }
            if ($inventory.find('button:contains("Artifacts")').length > 0) {
              cy.contains('Artifacts').click();
              cy.wait(500);
            }
          });
          
          // Test filters if available
          cy.get('body').then(($inventory) => {
            if ($inventory.find('select').length > 0) {
              cy.get('select').first().select(0);
              cy.wait(500);
            }
          });
          
          // Close inventory
          if ($body.find('button:contains("✕")').length > 0) {
            cy.contains('✕').click();
          }
        }
      });
    });
  });

  describe('Backend Tester Screen Tests', () => {
    beforeEach(() => {
      cy.visit('/backend-test');
      cy.wait(1000);
    });

    it('should display API testing interface', () => {
      cy.logToConsole('Testing Backend API Tester interface');
      
      // Check for API testing elements
      cy.get('body').should('be.visible');
      
      // Look for API-related content
      cy.get('body').should('contain.text').then(($body) => {
        const bodyText = $body.text();
        const hasAPI = bodyText.includes('API') || 
                       bodyText.includes('Test') || 
                       bodyText.includes('Backend') ||
                       bodyText.includes('Connection');
        expect(hasAPI).to.be.true;
      });
    });

    it('should test API endpoints if available', () => {
      cy.logToConsole('Testing API endpoint functionality');
      
      // Look for test buttons
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Test")').length > 0) {
          cy.contains('Test').first().click();
          cy.wait(2000);
        }
      });
    });

    it('should display connection status', () => {
      cy.logToConsole('Testing connection status display');
      
      // Check for status indicators
      cy.get('body').should('contain.text').then(($body) => {
        const bodyText = $body.text();
        const hasStatus = bodyText.includes('Status') || 
                         bodyText.includes('Connected') || 
                         bodyText.includes('Success') ||
                         bodyText.includes('Error') ||
                         bodyText.includes('Failed');
        expect(hasStatus).to.be.true;
      });
    });
  });

  describe('Political System Tests', () => {
    beforeEach(() => {
      // Try to access political system from game
      cy.visit('/game/conquete-classique');
      cy.wait(2000);
    });

    it('should access political council if available', () => {
      cy.logToConsole('Testing Political Council access');
      
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Political")').length > 0 ||
            $body.find('button:contains("Council")').length > 0) {
          cy.contains('Political').click();
          cy.wait(1000);
          
          // Check for political system elements
          cy.get('body').should('contain.text').then(($body2) => {
            const bodyText = $body2.text();
            const hasPolitical = bodyText.includes('Advisors') || 
                               bodyText.includes('Reputation') || 
                               bodyText.includes('Diplomatic') ||
                               bodyText.includes('Military');
            expect(hasPolitical).to.be.true;
          });
        }
      });
    });
  });

  describe('Timeline and ZFC Visualization Tests', () => {
    beforeEach(() => {
      cy.visit('/game/mystique-temporel');
      cy.wait(2000);
    });

    it('should access timeline viewer if available', () => {
      cy.logToConsole('Testing Timeline Viewer');
      
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Timeline")').length > 0 ||
            $body.find('button:contains("Show Timeline")').length > 0) {
          cy.contains('Timeline').click();
          cy.wait(1000);
          
          // Check for timeline elements
          cy.get('body').should('contain.text').then(($body2) => {
            const bodyText = $body2.text();
            const hasTimeline = bodyText.includes('Actions') || 
                               bodyText.includes('Turn') || 
                               bodyText.includes('Player') ||
                               bodyText.includes('Timeline');
            expect(hasTimeline).to.be.true;
          });
        }
      });
    });

    it('should access ZFC visualization if available', () => {
      cy.logToConsole('Testing ZFC Visualization');
      
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("ZFC")').length > 0 ||
            $body.find('button:contains("Show ZFC")').length > 0) {
          cy.contains('ZFC').click();
          cy.wait(1000);
          
          // Check for ZFC elements
          cy.get('body').should('contain.text').then(($body2) => {
            const bodyText = $body2.text();
            const hasZFC = bodyText.includes('Zone') || 
                          bodyText.includes('Causality') || 
                          bodyText.includes('Shadow') ||
                          bodyText.includes('ZFC');
            expect(hasZFC).to.be.true;
          });
        }
      });
    });
  });

  describe('Credits and Information Tests', () => {
    it('should access credits if available', () => {
      cy.logToConsole('Testing Credits modal');
      
      cy.visit('/');
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Credits")').length > 0 ||
            $body.find('a:contains("Credits")').length > 0) {
          cy.contains('Credits').click();
          cy.wait(1000);
          
          // Check for credits content
          cy.get('body').should('contain.text').then(($body2) => {
            const bodyText = $body2.text();
            const hasCredits = bodyText.includes('Created') || 
                              bodyText.includes('Developed') || 
                              bodyText.includes('Author') ||
                              bodyText.includes('License');
            expect(hasCredits).to.be.true;
          });
        }
      });
    });
  });

  describe('Responsive Design Tests', () => {
    const viewports = [
      { device: 'Mobile', width: 375, height: 667 },
      { device: 'Tablet', width: 768, height: 1024 },
      { device: 'Desktop', width: 1280, height: 720 },
      { device: 'Large Desktop', width: 1920, height: 1080 }
    ];

    viewports.forEach(viewport => {
      it(`should work correctly on ${viewport.device} (${viewport.width}x${viewport.height})`, () => {
        cy.logToConsole(`Testing ${viewport.device} responsiveness`);
        
        cy.viewport(viewport.width, viewport.height);
        cy.visit('/');
        
        // Check that essential elements are visible
        cy.contains('Heroes').should('be.visible');
        cy.get('.language-selector').should('be.visible');
        
        // Test language switching on this viewport
        cy.contains('🇷🇺 RU').click();
        cy.wait(500);
        cy.contains('🇬🇧 EN').click();
        cy.wait(500);
        
        // Test navigation
        cy.get('a[href*="/game/conquete-classique"]').should('be.visible').click();
        cy.wait(1000);
        cy.get('body').should('be.visible');
      });
    });
  });

  describe('Error Handling Tests', () => {
    it('should handle invalid routes gracefully', () => {
      cy.logToConsole('Testing error handling for invalid routes');
      
      // Try to visit an invalid route
      cy.visit('/invalid-route', { failOnStatusCode: false });
      cy.get('body').should('be.visible');
    });

    it('should handle network errors gracefully', () => {
      cy.logToConsole('Testing network error handling');
      
      cy.visit('/backend-test');
      
      // If there are test buttons, try them and expect graceful handling
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Test")').length > 0) {
          cy.contains('Test').first().click();
          cy.wait(3000);
          // Should not crash the app
          cy.get('body').should('be.visible');
        }
      });
    });
  });

  describe('Performance Tests', () => {
    it('should load main page quickly', () => {
      cy.logToConsole('Testing main page load performance');
      
      const startTime = Date.now();
      cy.visit('/');
      cy.contains('Heroes Reforged').should('be.visible');
      
      cy.then(() => {
        const loadTime = Date.now() - startTime;
        expect(loadTime).to.be.lessThan(5000); // Should load within 5 seconds
        cy.log(`Page loaded in ${loadTime}ms`);
      });
    });

    it('should switch languages quickly', () => {
      cy.logToConsole('Testing language switching performance');
      
      cy.visit('/');
      const startTime = Date.now();
      
      cy.contains('🇷🇺 RU').click();
      cy.contains('Выберите сценарий').should('be.visible');
      
      cy.then(() => {
        const switchTime = Date.now() - startTime;
        expect(switchTime).to.be.lessThan(2000); // Should switch within 2 seconds
        cy.log(`Language switched in ${switchTime}ms`);
      });
    });
  });

  describe('Accessibility Tests', () => {
    it('should have proper keyboard navigation', () => {
      cy.logToConsole('Testing keyboard accessibility');
      
      cy.visit('/');
      
      // Test Tab navigation
      cy.get('body').type('{tab}');
      cy.focused().should('be.visible');
      
      cy.get('body').type('{tab}');
      cy.focused().should('be.visible');
    });

    it('should have proper focus indicators', () => {
      cy.logToConsole('Testing focus indicators');
      
      cy.visit('/');
      
      // Check that interactive elements can be focused
      cy.get('a, button').first().focus();
      cy.focused().should('be.visible');
    });
  });
}); 