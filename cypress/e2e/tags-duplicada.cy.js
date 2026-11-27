// Caso de Teste esw2026-165 - Tag duplicada
// UC28 - Gerenciar Tags de atuação artigo (Administrador) - Cenário Alternativo #02
// Entrada: Nome da tag = Sociologia | Saída esperada: "Esta tag já existe"

describe('UC28 - Gerenciar Tags de atuação (Administrador)', () => {

  const admin = { email: 'admin@lumina.edu.br', senha: 'admin123' };
  const tagExistente = 'Sociologia';

  beforeEach(() => {
    // Espera o painel carregar as tags do servidor (antes disso ele mostra uma lista provisória)
    cy.intercept('GET', '**/api/admin/metricas').as('carregarPainel');

    // Login como administrador
    cy.visit('/LuminaBackend/login.html');
    cy.get('#email').type(admin.email);
    cy.get('#senha').type(admin.senha, { log: false });
    cy.get('#loginForm button[type="submit"]').click();

    // Admin é redirecionado para o painel
    cy.url().should('include', 'painel-admin.html');
    cy.wait('@carregarPainel').its('response.statusCode').should('eq', 200);

    // Abre a aba "Tags de atuação"
    cy.contains('.nav-item', 'Tags de atuação').click();
    cy.get('#tab-tags').should('have.class', 'active');
  });

  it('esw2026-165: Tag duplicada - deve exibir "Esta tag já existe"', () => {
    // Pré-condição: a tag "Sociologia" já está cadastrada
    cy.get('#tagsGrid .tag-pill')
      .filter((_, el) => el.childNodes[0].textContent.trim() === tagExistente)
      .should('have.length', 1);

    cy.get('#tagsGrid .tag-pill').its('length').then((qtdAntes) => {
      // Tenta cadastrar a tag duplicada
      cy.get('#newTagInput').clear().type(tagExistente);
      cy.contains('#tab-tags button', 'Adicionar').click();

      // Saída esperada: alerta de tag duplicada
      cy.get('#toast').should('be.visible');
      cy.get('#toastMsg').should('contain.text', 'Esta tag já existe');

      // A tag não é cadastrada de novo: a lista continua com a mesma quantidade
      cy.get('#tagsGrid .tag-pill').should('have.length', qtdAntes);
      cy.get('#tagsGrid .tag-pill')
        .filter((_, el) => el.childNodes[0].textContent.trim() === tagExistente)
        .should('have.length', 1);

      // Evidência para o TestLink
      cy.get('#toastMsg').should('be.visible');
      cy.screenshot('esw2026-165-tag-duplicada', { capture: 'viewport' });
    });
  });

});
