// =====================================================================
// Seletores e URLs das telas do Lumina (frontend/cadastro.html e login.html)
// =====================================================================

export const paginas = {
  cadastro: '/LuminaBackend/cadastro.html',
  login: '/LuminaBackend/login.html',
  painelAdmin: '/LuminaBackend/painel-admin.html',
  
};

export const cadastro = {
  form: '#registerForm',
  perfilPesquisadora: '.profile-btn', // 1º botão = Pesquisadora, 2º = Leitor(a)
  nome: '#name',
  email: '#email',
  area: '#field',
  instituicao: '#institution',
  lattes: '#lattes',
  senha: '#password',
  confirmarSenha: '#confirm-password',
  termos: '#terms',
  botaoCadastrar: '#registerForm button[type="submit"]',
};

export const login = {
  form: '#loginForm',
  email: '#email',
  senha: '#senha',
  botaoEntrar: '#loginForm button[type="submit"]',
};

// Caixa de mensagem que o auth.js insere no topo do formulário
export const feedback = '.form-feedback-msg';

export const mensagens = {
  cadastroSucesso: 'Cadastro realizado com sucesso! Faça login para continuar.',
  tagDuplicada: 'Esta tag já existe.',
};


// Painel do Administrador – aba "Tags de atuação" (frontend/painel-admin.html)
export const adminTags = {
  menu: '.nav-item',
  aba: '#tab-tags',
  tags: '#tagsGrid .tag-pill',
  campoNovaTag: '#newTagInput',
  botaoAdicionar: '#tab-tags button',
  toast: '#toast',
  toastMsg: '#toastMsg',
};

