// Funções reutilizáveis (Custom Commands) para os Casos de Teste do Lumina.
// Seguindo o padrão da Aula 09: a função só executa as ações;
// as Assertions ficam no próprio Caso de Teste.

import { cadastro, login } from './selectors';

// Preenche e envia o formulário de cadastro (perfil Pesquisadora)
Cypress.Commands.add('cadastrarPesquisadora', (usuario) => {
  cy.get(cadastro.perfilPesquisadora).first().click();
  cy.get(cadastro.nome).type(usuario.nome);
  cy.get(cadastro.email).type(usuario.email);
  cy.get(cadastro.area).select(usuario.area);
  cy.get(cadastro.instituicao).type(usuario.instituicao);
  cy.get(cadastro.lattes).type(usuario.lattes);
  cy.get(cadastro.senha).type(usuario.senha, { log: false });
  cy.get(cadastro.confirmarSenha).type(usuario.senha, { log: false });
  cy.get(cadastro.termos).check();
  cy.get(cadastro.botaoCadastrar).click();
});

// Preenche e envia o formulário de login
Cypress.Commands.add('fazerLogin', (email, senha) => {
  cy.get(login.email).type(email);
  cy.get(login.senha).type(senha, { log: false });
  cy.get(login.botaoEntrar).click();
});
