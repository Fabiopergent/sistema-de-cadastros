# 🏥 Sistema de Gestão de Clínica

> Sistema web completo para gestão de clínica de saúde, com controle de usuários, agendamentos e auditoria.

[![Deploy](https://img.shields.io/badge/demo-online-success)](https://fabiopergent.github.io/sistema-de-cadastros/)
[![Status](https://img.shields.io/badge/status-concluído-blue)]()

## 📸 Screenshots

![Tela Inicial](./screenshots/home.png)
![Dashboard Admin](./screenshots/dashboard.png)
![Agendamento](./screenshots/agendamento.png)

> ⚠️ **Nota**: Adicione prints na pasta `/screenshots` no projeto

---

## 🎯 Sobre o Projeto

Sistema desenvolvido para **prática e demonstração de habilidades** em desenvolvimento web full-stack (frontend), aplicando conceitos de:

- ✅ Arquitetura de sistemas com múltiplos perfis de acesso
- ✅ Regras de negócio complexas
- ✅ Validações client-side
- ✅ Interface responsiva
- ✅ Auditoria e rastreamento de ações

---

## 👥 Perfis de Acesso

### 🔐 Administrador
- Dashboard com indicadores (clientes, funcionários, consultas)
- Cadastro e gestão de funcionários
- Ativar/Desativar funcionários
- Auditoria completa de consultas

### 🧑‍💼 Funcionário
- Cadastro de novos clientes
- Agendamento de consultas
- Visualização de histórico do cliente
- Edição de dados de contato

### 👤 Cliente
- Atualização de dados pessoais
- Visualização de consultas agendadas
- Cancelamento de consultas

---

## ⚙️ Funcionalidades Principais

### Agendamento Inteligente
- ✅ Validação de horário comercial (07:00 - 18:00)
- ✅ Bloqueio de fins de semana
- ✅ Antecedência mínima de 3 horas
- ✅ Prevenção de horários duplicados
- ✅ Incrementos de 30 minutos

### Auditoria
- Registro de quem criou cada consulta
- Histórico de cancelamentos com motivo
- Rastreamento de data/hora de cada ação

### Segurança
- Controle de acesso por perfil
- Proteção de rotas
- Desativação ao invés de exclusão (preserva histórico)

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+)
- **Estilo**: Design responsivo mobile-first
- **Armazenamento**: LocalStorage (persistência client-side)
- **Hospedagem**: GitHub Pages

---

## 🚀 Como Executar

### Opção 1: Acessar Online
🔗 [https://fabiopergent.github.io/sistema-de-cadastros/](https://fabiopergent.github.io/sistema-de-cadastros/)

### Opção 2: Rodar Localmente
```bash
# Clone o repositório
git clone https://github.com/fabiopergent/sistema-de-cadastros.git

# Entre na pasta
cd sistema-de-cadastros

# Abra o index.html no navegador
# Ou use Live Server no VS Code
```

---

## 🔑 Credenciais de Teste

### Administrador
- **Email**: `admin@sistema.com`
- **Senha**: `1234`

### Funcionário (crie um através do painel admin)

### Cliente (crie um através da área do funcionário)

---

## 📂 Estrutura do Projeto
```
sistema-de-cadastros/
├── index.html              # Página inicial
├── login-cliente.html      # Login do cliente
├── login-funcionario.html  # Login do funcionário
├── area-adm.html          # Painel administrativo
├── area-cliente.html      # Área do cliente
├── area-funcionario.html  # Área do funcionário
├── script.js              # Lógica principal
├── style.css              # Estilos globais
└── README.md              # Documentação
```

---

## 📋 Regras de Negócio Implementadas

| Regra | Descrição |
|-------|-----------|
| Antecedência | Consultas devem ser agendadas com mínimo 3h de antecedência |
| Horário comercial | Atendimento de segunda a sexta, 07:00 - 18:00 |
| Incrementos | Horários disponíveis apenas em :00 e :30 |
| Bloqueio duplicado | Não permite agendar horário já ocupado |
| Desativação | Funcionários desativados não acessam o sistema |
| Auditoria | Todas as consultas registram criador e data |

---

## 🔄 Histórico de Atualizações

### v1.1 - 05/02/2026
**Correções no script.js:**
- ✅ Removida duplicação de `carregarDashboardAdmin()`
- ✅ Corrigidas chamadas de funções inexistentes
- ✅ Formulários agora limpam após cadastro
- ✅ Listas atualizam após cancelamento

**Correções no style.css:**
- ✅ Removidas regras duplicadas
- ✅ Adicionado estilo para links
- ✅ Melhorado visual dos botões de acesso

**Melhorias de UX:**
- ✅ Seletor de horários com apenas opções válidas
- ✅ Feedback visual aprimorado

### v1.0 - Inicial
- Sistema base com 3 perfis de acesso
- CRUD completo de clientes e funcionários
- Agendamento com validações

---

## 🎓 Aprendizados

Este projeto me permitiu praticar:
- Gestão de estado com LocalStorage
- Manipulação do DOM
- Validações complexas
- Arquitetura de código escalável
- Debugging e refatoração
- Controle de versão com Git

---

## 📌 Observações

⚠️ **Persistência Local**: Os dados são armazenados no `localStorage` do navegador e não são compartilhados entre dispositivos.

💡 **Projeto Educacional**: Desenvolvido para fins de aprendizado e demonstração de habilidades técnicas.

---

## 📬 Contato
**Email- fabiopergentino1989@hotmail.com**

Desenvolvido por **[Fabio Pergentino da Silva]**

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=Linkedin&logoColor=white)](seu-linkedin)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github)](https://github.com/fabiopergent)
[![Email](https://img.shields.io/badge/-Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:seuemail@exemplo.com)

---

⭐ Se este projeto te ajudou de alguma forma, considere dar uma estrela!