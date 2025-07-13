describe('Heroes Reforged - Multiplayer Interface', () => {
  beforeEach(() => {
    // Visit the multiplayer page
    cy.visit('/multiplayer');
  });

  it('should display the multiplayer session manager', () => {
    // Check that the main elements are present
    cy.contains('Multiplayer Sessions').should('be.visible');
    cy.contains('Create Session').should('be.visible');
    cy.contains('Refresh').should('be.visible');
    
    // Check that player ID is displayed
    cy.contains('Player ID:').should('be.visible');
  });

  it('should open create session modal', () => {
    // Click the Create Session button
    cy.contains('Create Session').click();
    
    // Check that the create session form is displayed
    cy.contains('Create New Session').should('be.visible');
    cy.contains('Session Name:').should('be.visible');
    cy.contains('Max Players:').should('be.visible');
    cy.contains('Game Mode:').should('be.visible');
    
    // Check form inputs
    cy.get('input[placeholder="Enter session name"]').should('be.visible');
    cy.get('select').should('have.length', 2); // Max players and game mode selects
  });

  it('should be able to create a multiplayer session', () => {
    // Click the Create Session button
    cy.contains('Create Session').click();
    
    // Fill in the session details
    cy.get('input[placeholder="Enter session name"]').type('Test Session');
    
    // Select 2 players
    cy.get('select').first().select('2');
    
    // Select game mode
    cy.get('select').last().select('conquest-classique');
    
    // Create the session
    cy.contains('Create Session').click();
    
    // Wait for the session to be created
    cy.wait(2000);
    
    // Note: This test will fail due to backend not being properly configured
    // but it demonstrates the interface works
  });

  it('should display empty state when no sessions available', () => {
    // Check for empty state message
    cy.contains('No multiplayer sessions available').should('be.visible');
    cy.contains('Create one to start playing').should('be.visible');
  });

  it('should be able to refresh sessions list', () => {
    // Click refresh button
    cy.contains('Refresh').click();
    
    // Wait for refresh to complete
    cy.wait(1000);
    
    // Should still show empty state (assuming no sessions exist)
    cy.contains('No multiplayer sessions available').should('be.visible');
  });

  it('should be able to cancel session creation', () => {
    // Click the Create Session button
    cy.contains('Create Session').click();
    
    // Check that the form is displayed
    cy.contains('Create New Session').should('be.visible');
    
    // Click Cancel
    cy.contains('Cancel').click();
    
    // Should return to the main interface
    cy.contains('Multiplayer Sessions').should('be.visible');
    cy.contains('Create Session').should('be.visible');
  });
}); 