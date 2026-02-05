# Sistema de Gestão de Clínica – Projeto Pessoal

## 📌 Visão Geral
Sistema web desenvolvido para simular a gestão de uma clínica de saúde, com controle de clientes, funcionários, agendamentos de consultas e área administrativa.

Projeto criado com foco em **prática de Análise e Desenvolvimento de Sistemas**, aplicando regras de negócio, controle de acesso e testes funcionais.

## 👥 Perfis de Usuário
- **Administrador**
  - Gerenciar funcionários
  - Ativar/Desativar funcionários
  - Visualizar auditorias
  - Dashboard com indicadores

- **Funcionário**
  - Agendar consultas
  - Visualizar histórico
  - Registrar atendimentos

- **Cliente**
  - Atualizar dados cadastrais
  - Visualizar consultas
  - Acessar histórico

## 📅 Regras de Negócio
- Consultas só podem ser agendadas com no mínimo 3 horas de antecedência
- Funcionários desativados não conseguem acessar o sistema
- Todas as ações são registradas em auditoria
- Controle de acesso por perfil

## 🛠 Tecnologias Utilizadas
- HTML5
- CSS3 (layout responsivo)
- JavaScript (Vanilla JS)
- LocalStorage
- GitHub Pages

## 🌐 Acesso ao Sistema
🔗 https://fabiopergent.github.io/sistema-de-cadastros/

## 📌 Observação
Este é um **projeto pessoal**, desenvolvido para fins educacionais e demonstração de habilidades práticas.

## Persistência de Dados 
Este sistema utiliza localStorage, portato os dados são armazenados localmente no navegador e não são compartilhados entre dispositivos diferentes.

05/02/26
✅ Correções no script.js:

✅ Removida função duplicada carregarDashboardAdmin()
✅ Corrigida chamada carregarFuncionarios() → carregarTabelaFuncionarios()
✅ Removida função duplicada carregarFuncionariosAdmin()
✅ Removida função excluirFuncionario() (código morto)
✅ cadastrarCliente() agora limpa campos e fecha formulário
✅ cadastrarFuncionario() agora limpa campos, fecha formulário e atualiza tabela
✅ cancelarConsulta() agora recarrega a lista na tela

✅ Correções no style.css:

✅ Removido reset duplicado do body
✅ Removida regra duplicada de button/input/select
✅ Adicionado estilo para links (<a>)
✅ Adicionada classe .btn-acesso para botões de acesso
✅ Adicionado #cadastroFuncionario aos painéis estilizados

✅ Correções nos HTML:

✅ Removido <div id="dados"> não utilizado do area-cliente.html
✅ Removido auth.js de area-cliente.html e area-funcionario.html
✅ Adicionada classe btn-acesso nos links do index.html