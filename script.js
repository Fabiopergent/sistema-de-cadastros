// ================= FUNCIONÁRIO FIXO =================
if (!localStorage.getItem('funcionarios')) {
    const funcionarios = [
        { matricula: 'admin', nome: 'Administrador', senha: '1234' }
    ];
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
}

// ================= LOGIN CLIENTE =================
const formLoginCliente = document.getElementById('formLoginCliente');

if (formLoginCliente) {
    formLoginCliente.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('emailCliente').value;
        const senha = document.getElementById('senhaCliente').value;

        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const cliente = clientes.find(c => c.email === email && c.senha === senha);

        if (!cliente) {
            alert('Login inválido');
            return;
        }

        localStorage.setItem('usuarioLogado', JSON.stringify({ ...cliente, tipo: 'cliente' }));
        window.location.href = 'area-cliente.html';
    });
}

// ================= LOGIN FUNCIONÁRIO =================
const formLoginFuncionario = document.getElementById('formLoginFuncionario');

if (formLoginFuncionario) {
    formLoginFuncionario.addEventListener('submit', function (e) {
        e.preventDefault();

        const matricula = document.getElementById('matricula').value;
        const senha = document.getElementById('senhaFuncionario').value;

        const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
        const funcionario = funcionarios.find(f => f.matricula === matricula && f.senha === senha);

        if (!funcionario) {
            alert('Login inválido');
            return;
        }

        localStorage.setItem('usuarioLogado', JSON.stringify({ ...funcionario, tipo: 'funcionario' }));
        window.location.href = 'area-funcionario.html';
    });
}

// ================= CADASTRO CLIENTE =================
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

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.push({
        nome,
        email,
        senha,
        cpf,
        telefone,
        endereco,
        tipo: 'cliente'
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cliente cadastrado com sucesso!');
}


//===========funçao mostrar cadastro==============
function mostrarCadastro() {
    const div = document.getElementById('cadastroCliente');
    div.style.display = div.style.display === 'none' ? 'block' : 'none';
}


// ================= ÁREA DO CLIENTE =================
if (window.location.pathname.includes('area-cliente')) {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuario && usuario.tipo === 'cliente') {
        document.getElementById('dados').innerHTML = `
            <p><b>Nome:</b> ${usuario.nome}</p>
            <p><b>Email:</b> ${usuario.email}</p>
            <p><b>CPF:</b> ${usuario.cpf}</p>
            <p><b>Telefone:</b> ${usuario.telefone}</p>
            <p><b>Endereço:</b> ${usuario.endereco}</p>
        `;

        const lista = document.getElementById('consultas');
        lista.innerHTML = usuario.consultas.length
            ? usuario.consultas.map(c => `<li>${c.data} - ${c.horario} (${c.tipo})</li>`).join('')
            : '<li>Nenhuma consulta agendada</li>';
    }
}

//========FUNÇAO LOGOUT=======//

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

//===========LISTAR CLIENTES PARA AGENDAMENTO=============
function cadastrarClientesSelect() {
    const select = document.getElementById('clienteConsulta');
    if (!select) return;

    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = cliente.nome + ' - ' + cliente.email;
        select.appendChild(option);
    });
}

//EXECUTA AUTOMATICAMENTE AO CARREGAR A AREA DO FUNCONARIO
if (window.location.pathname.includes('area-funcionario')) {
    carregarClientesSelect();
}

//===========AGENDAR CONSULTA=============
function agendarConsulta() {
    const clienteId = document.getElementById('clienteConsulta').value;
    const data = document.getElementById('dataConsulta').value;
    const horario = document.getElementById('horaConsulta').value;
    const tipo = document.getElementById('tipoConsulta').value;

    if (!clienteID || !data || !horario || !tipo) {
        alert('Preencha todos os campos');
        return;
    }

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    const cliente = clientes.find(c => c.id == clienteId);

    if (!cliente) {
        alert('Cliente não encontrado');
        return;
    }

    cliente.consultas.push({
        data,
        horario,
        tipo
    });

    localStorage.setItem('clientes', JSON.stringify(clientes));

    alert('Consulyta agendada com sucesso!');
}

//=========AREA ADM===============
function mostrarCadastroFuncionario() {
    const div = document.getElementById('cadastroFuncionario');
    div.style.display = div.style.display === 'none' ? 'block' : 'none';
}

function cadastrarFuncionario() {
    const nome = document.getElementById('nomeFunc').value;
    const matricula = document.getElementById('matriculaFunc').value;
    const senha = document.getElementById('senhaFunc').value;
    const email = document.getElementById('emailFunc').value;

    if (!nome || !matricula || !senha) {
        alert('Preencha os campos obrigatórios');
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.push({
        nome,
        matricula,
        email,
        senha,
        tipo: 'funcionario'
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Funcionário cadastrado com sucesso!');
}


//============novo login==========

function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuarios.find(
        u => u.email === email && u.senha === senha
    );

    if (!usuario) {
        alert('Email ou senha inválidos');
        return;
    }

    // salva sessão
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

    // redirecionamento por tipo
    if (usuario.tipo === 'admin') {
        window.location.href = 'area-adm.html';
    } 
    else if (usuario.tipo === 'funcionario') {
        window.location.href = 'area-funcionario.html';
    } 
    else {
        window.location.href = 'area-cliente.html';
    }
}

//========logim adm ========
const adminPadrao = {
    nome: 'Administrador',
    email: 'admin@gmail.com',
    senha: '1234',
    tipo: 'admin'
};

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

const existeAdmin = usuarios.some(u => u.tipo === 'admin');

if (!existeAdmin) {
    usuarios.push(adminPadrao);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
