describe('Egg Timer', () => {
  it('Loads the app and clicks Fried Egg and Start Cooking', () => {
    cy.visit('http://localhost:5173');
    cy.contains('EGG TIMER');
    cy.wait(2000);
    cy.get('[data-testid="fried"]').as('FriedEggImage');
    cy.get('@FriedEggImage').should('be.visible').click();
    cy.wait(2000);
    cy.get('[data-testid="start-button"]').as('StartButton');
    cy.get('@StartButton').click();
    cy.wait(8000);
    cy.get('[data-testid="hardBoiled"]').as('HardBoiled');
    cy.get('@HardBoiled').should('be.visible').click();
    cy.get('@StartButton').click();
    cy.wait(2000);
    cy.get('[data-testid="stop-button"]').as('StopButton')
    cy.get('@StopButton').should('be.visible').should('be.enabled').click();
  });
});