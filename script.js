// ==================== CADASTRO ====================
const formCadastro = document.getElementById('formCadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const tipo = document.getElementById('tipo').value;

        const usuario = {
            nome,
            email,
            senha,
            tipo
        };

        localStorage.setItem(email, JSON.stringify(usuario));

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';
    });
}

// ==================== LOGIN ====================
const formLogin = document.getElementById('formLogin');

if (formLogin) {
    formLogin.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const senha = document.getElementById('loginSenha').value;

        const usuarioSalvo = localStorage.getItem(email);

        if (!usuarioSalvo) {
            alert('Usuário não encontrado');
            return;
        }

        const usuario = JSON.parse(usuarioSalvo);

        if (usuario.senha !== senha) {
            alert('Senha incorreta');
            return;
        }

        // Salva usuário logado corretamente
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        if (usuario.tipo === 'funcionario') {
            window.location.href = 'area-funcionario.html';
        } else {
            window.location.href = 'area-cliente.html';
        }

    });
}

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

const formCliente = document.getElementById('formCliente');

if (formCliente) {
    formCliente.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nomeCliente').value;
        const email = document.getElementById('emailCliente').value;
        const senha = document.getElementById('senhaCliente').value;

        const novoCliente = { nome, email, senha };

        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

        clientes.push(novoCliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));

        alert('Cliente cadastrado com sucesso!');
        formCliente.reset();
        listarClientes();
    });
}

function listarClientes() {
    const lista = document.getElementById('listaClientes');
    if (!lista) return;

    lista.innerHTML = '';

    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.textContent = `${cliente.nome} - ${cliente.email}`;
        lista.appendChild(li);
    });
}

// Carrega lista ao abrir a página
listarClientes();
