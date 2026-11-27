// Caso de Teste 65 – Login com Sucesso (UC02 – Realizar Login)
// Responsável: Ana Julia
//
// Pré-condição: existir um usuário ativo cadastrado
//               (usuária de teste ana.costa@usp.br / 12345678 do script do banco).
// Passos:
//   1. Acessar a tela de login (login.html)
//   2. Informar o e-mail cadastrado
//   3. Informar a senha correta
//   4. Clicar em "Login"
// Resultado esperado:
//   O sistema autentica a usuária, abre a sessão e redireciona para a
//   página de perfil (perfil.html).

import { paginas, feedback } from '../support/selectors';

describe('Caso 65 – Login com Sucesso', () => {
  let usuario;

  // Hook: executado antes de cada Caso de Teste
  beforeEach(() => {
    cy.fixture('usuarioAnaJulia').then((dados) => {
      usuario = dados.login;
    });
    cy.visit(paginas.login); // Passo 1
  });

  it('Deve fazer login com e-mail e senha válidos', () => {
    cy.intercept('POST', '**/api/auth/login').as('login');
    cy.contains('h1', 'Bem-vinda de volta').should('be.visible');

    // Passos 2 a 4
    cy.fazerLogin(usuario.email, usuario.senha);

    // Assertions (resultado esperado)
    cy.wait('@login').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.mensagem).to.eq('Login realizado com sucesso!');
      expect(response.body.dados.email).to.eq(usuario.email);
    });
    cy.location('pathname').should('eq', '/LuminaBackend/perfil.html');
    cy.window().then((win) => {
      const logado = JSON.parse(win.localStorage.getItem('lumina_usuario_logado'));
      expect(logado.email).to.eq(usuario.email);
    });
    cy.get(feedback).should('not.exist');
  });
});
