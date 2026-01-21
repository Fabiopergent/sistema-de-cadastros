// ================= BANCO ÚNICO =================
function getUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

function setUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// ===== ADMIN PADRÃO =====

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

const existeAdmin = usuarios.some(u => u.tipo === 'admin');

if (!existeAdmin) {
    usuarios.push({
        nome: 'Administrador',
        email: 'admin@sistema.com',
        senha: '1234',
        tipo: 'admin'
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

//=====logim temporario 
function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    console.log("EMAIL DIGITADO:", email);
    console.log("SENHA DIGITADA:", senha);

    const usuarios = getUsuarios();
    console.log("USUÁRIOS NO SISTEMA:", usuarios);

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    console.log("USUÁRIO ENCONTRADO:", usuario);

    if (!usuario) {
        alert('Email ou senha inválidos');
        return;
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

    if (usuario.tipo === 'admin') {
        window.location.href = 'area-adm.html';
    }
}

//=======ajuste

const formLoginFuncionario = document.getElementById('formLoginFuncionario');

if (formLoginFuncionario) {
    formLoginFuncionario.addEventListener('submit', function (e) {
        e.preventDefault(); // 🔥 ISSO EVITA O RELOAD

        login();
    });
}


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

// ================= LOGOUT =================
function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

// ================= CADASTRO DE CLIENTE (FUNCIONÁRIO) =================
function mostrarCadastro() {
    const div = document.getElementById('cadastroCliente');
    if (div) {
        div.style.display = div.style.display === 'none' ? 'block' : 'none';
    }
}

function cadastrarCliente() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

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

// ================= EXIBIR DADOS DO CLIENTE =================
if (window.location.pathname.includes('area-cliente')) {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuario && usuario.tipo === 'cliente') {
        document.getElementById('dados').innerHTML = `
            <p><b>Nome:</b> ${usuario.nome}</p>
            <p><b>Email:</b> ${usuario.email}</p>
            <p><b>CPF:</b> ${usuario.cpf || '-'}</p>
            <p><b>Telefone:</b> ${usuario.telefone || '-'}</p>
            <p><b>Endereço:</b> ${usuario.endereco || '-'}</p>
        `;

        const lista = document.getElementById('consultas');
        lista.innerHTML = usuario.consultas && usuario.consultas.length
            ? usuario.consultas.map(c =>
                `<li>${c.data} - ${c.horario} (${c.tipo})</li>`
              ).join('')
            : '<li>Nenhuma consulta agendada</li>';
    }
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
