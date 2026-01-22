// ================= BANCO ÚNICO =================
function getUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

function setUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// ================= ADMIN PADRÃO =================
(function criarAdminPadrao() {
    const usuarios = getUsuarios();
    const existeAdmin = usuarios.some(u => u.tipo === 'admin');

    if (!existeAdmin) {
        usuarios.push({
            id: Date.now(),
            nome: 'Administrador',
            email: 'admin@sistema.com',
            senha: '1234',
            tipo: 'admin'
        });
        setUsuarios(usuarios);
    }
})();

// ================= LOGIN =================
function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const usuarios = getUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
        alert('Email ou senha inválidos');
        return;
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

    if (usuario.tipo === 'admin') {
        window.location.href = 'area-adm.html';
    } else if (usuario.tipo === 'funcionario') {
        window.location.href = 'area-funcionario.html';
    } else {
        window.location.href = 'area-cliente.html';
    }
}

// ================= FORM LOGIN FUNCIONÁRIO =================
const formLoginFuncionario = document.getElementById('formLoginFuncionario');

if (formLoginFuncionario) {
    formLoginFuncionario.addEventListener('submit', function (e) {
        e.preventDefault();
        login();
    });
}

// ================= LOGIN CLIENTE =================
function loginCliente() {
    const email = document.getElementById('emailCliente').value;
    const senha = document.getElementById('senhaCliente').value;

    const usuarios = getUsuarios();
    const cliente = usuarios.find(
        u => u.email === email && u.senha === senha && u.tipo === 'cliente'
    );

    if (!cliente) {
        alert('Email ou senha inválidos');
        return;
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(cliente));
    window.location.href = 'area-cliente.html';
}


// ================= LOGOUT =================
function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

// ================= CADASTRO DE CLIENTE =================
function mostrarCadastroCliente() {
    const div = document.getElementById('cadastroCliente');
    if (div) {
        div.style.display = div.style.display === 'none' ? 'block' : 'none';
    }
}

function cadastrarCliente() {
    const nome = document.getElementById('clienteNome').value;
    const email = document.getElementById('clienteEmail').value;
    const senha = document.getElementById('clienteSenha').value;
    const cpf = document.getElementById('clienteCpf').value;
    const telefone = document.getElementById('clienteTelefone').value;
    const endereco = document.getElementById('clienteEndereco').value;

    if (!nome || !email || !senha) {
        alert('Preencha os campos obrigatórios');
        return;
    }

    const usuarios = getUsuarios();

    if (usuarios.some(u => u.email === email)) {
        alert('Email já cadastrado');
        return;
    }

    usuarios.push({
        id: Date.now(),
        nome,
        email,
        senha,
        cpf,
        telefone,
        endereco,
        tipo: 'cliente',
        consultas: []
    });

    setUsuarios(usuarios);
    alert('Cliente cadastrado com sucesso!');
}


// ================= ÁREA ADMIN =================
function mostrarCadastroFuncionario() {
    const div = document.getElementById('cadastroFuncionario');
    if (div) {
        div.style.display = div.style.display === 'none' ? 'block' : 'none';
    }
}

function cadastrarFuncionario() {
    const nome = document.getElementById('nomeFunc').value;
    const matricula = document.getElementById('matriculaFunc').value;
    const email = document.getElementById('emailFunc').value;
    const senha = document.getElementById('senhaFunc').value;

    if (!nome || !matricula || !senha) {
        alert('Preencha os campos obrigatórios');
        return;
    }

    const usuarios = getUsuarios();

    if (usuarios.some(u => u.matricula === matricula)) {
        alert('Matrícula já cadastrada');
        return;
    }

    usuarios.push({
        id: Date.now(),
        nome,
        matricula,
        email,
        senha,
        tipo: 'funcionario'
    });

    setUsuarios(usuarios);
    alert('Funcionário cadastrado com sucesso!');
}

// ================= FORM LOGIN CLIENTE =================
const formLoginCliente = document.getElementById('formLoginCliente');

if (formLoginCliente) {
    formLoginCliente.addEventListener('submit', function (e) {
        e.preventDefault();
        loginCliente();
    });
}
