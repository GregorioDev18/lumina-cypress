describe('Lumina - Testes iniciais', () => {

  it('Deve acessar a página inicial', () => {
    cy.visit('http://localhost:8080/LuminaBackend/index.html');

    cy.url().should('include', 'LuminaBackend/index.html');
  });

});