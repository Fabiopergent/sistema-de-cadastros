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
    const cliente = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        consultas: []
    };

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    if (clientes.some(c => c.email === cliente.email)) {
        alert('Email já cadastrado');
        return;
    }

    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    alert('Cliente cadastrado com sucesso!');
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