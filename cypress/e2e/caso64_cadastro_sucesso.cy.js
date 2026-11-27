// Caso de Teste 64 – Cadastro com Sucesso (UC01 – Cadastrar Usuário)
// Responsável: Ana Julia
//
// Pré-condição: o e-mail usado ainda não está cadastrado no sistema
//               (gerado com data/hora para ser único a cada execução).
// Passos:
//   1. Acessar a tela "Criar minha conta" (cadastro.html)
//   2. Selecionar o perfil "Pesquisadora"
//   3. Preencher Nome, E-mail, Área de Atuação, Instituição, Lattes,
//      Senha e Confirmar Senha com dados válidos
//   4. Marcar o aceite dos Termos de Uso
//   5. Clicar em "Cadastrar"
// Resultado esperado:
//   O sistema cadastra o usuário, redireciona para a tela de login e exibe
//   "Cadastro realizado com sucesso! Faça login para continuar."

import { paginas, feedback, mensagens } from '../support/selectors';

describe('Caso 64 – Cadastro com Sucesso', () => {
  let usuario;

  // Hook: executado antes de cada Caso de Teste
  beforeEach(() => {
    cy.fixture('usuarioAnaJulia').then(({ cadastro: dados }) => {
      usuario = {
        ...dados,
        email: `${dados.emailBase}.${Date.now()}${dados.dominio}`,
      };
    });
    cy.visit(paginas.cadastro); // Passo 1
  });

  it('Deve cadastrar uma nova pesquisadora com dados válidos', () => {
    cy.intercept('POST', '**/api/auth/cadastro').as('cadastro');
    cy.contains('h1', 'Criar minha conta').should('be.visible');

    // Passos 2 a 5
    cy.cadastrarPesquisadora(usuario);

    // Assertions (resultado esperado)
    cy.wait('@cadastro').its('response.statusCode').should('eq', 201);
    cy.location('pathname').should('eq', paginas.login);
    cy.location('search').should('eq', '?cadastro=ok');
    cy.get(feedback)
      .should('be.visible')
      .and('have.text', mensagens.cadastroSucesso);
  });
});
