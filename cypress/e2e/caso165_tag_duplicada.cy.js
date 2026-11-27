// Caso de Teste 165 – Tag duplicada (UC28 – Gerenciar Tags de atuação artigo – Administrador)
// Responsável: Raissa
//
// Pré-condição: administrador cadastrado (admin@lumina.edu.br / admin123 do script do banco)
//               e a tag "Sociologia" já cadastrada.
// Passos:
//   1. Fazer login como administrador
//   2. Acessar o painel administrativo e abrir "Tags de atuação"
//   3. Informar o nome de uma tag já existente (Sociologia)
//   4. Clicar em "Adicionar"
// Resultado esperado (Cenário Alternativo #02):
//   O sistema emite o alerta "Esta tag já existe" e não cadastra a tag novamente.

import { paginas, adminTags, mensagens } from '../support/selectors';

describe('Caso 165 – Tag duplicada', () => {
  let dados;

  // Hook: executado antes de cada Caso de Teste
  beforeEach(() => {
    cy.fixture('usuarioRaissa').then((fixture) => {
      dados = fixture;
    });
    cy.intercept('GET', '**/api/admin/metricas').as('carregarPainel');
    cy.visit(paginas.login);
  });

  it('Deve exibir "Esta tag já existe" ao cadastrar uma tag duplicada', () => {
    // Passo 1
    cy.fazerLogin(dados.admin.email, dados.admin.senha);
    cy.location('pathname').should('eq', paginas.painelAdmin);
    cy.wait('@carregarPainel').its('response.statusCode').should('eq', 200);

    // Passo 2
    cy.abrirTagsDeAtuacao();
    cy.get(adminTags.aba).should('have.class', 'active');

    // Pré-condição: a tag já existe uma única vez
    cy.get(adminTags.tags)
      .filter((_, el) => el.childNodes[0].textContent.trim() === dados.tagExistente)
      .should('have.length', 1);

    cy.get(adminTags.tags).its('length').then((qtdAntes) => {
      // Passos 3 e 4
      cy.adicionarTag(dados.tagExistente);

      // Assertions (resultado esperado)
      cy.get(adminTags.toast).should('be.visible');
      cy.get(adminTags.toastMsg).should('have.text', mensagens.tagDuplicada);
      cy.get(adminTags.tags).should('have.length', qtdAntes);
      cy.get(adminTags.tags)
        .filter((_, el) => el.childNodes[0].textContent.trim() === dados.tagExistente)
        .should('have.length', 1);
      cy.screenshot('caso165_tag_duplicada', { capture: 'viewport' });
    });
  });
});