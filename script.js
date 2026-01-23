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
    const nome = document.getElementById('clienteNome')?.value;
    const email = document.getElementById('clienteEmail')?.value;
    const senha = document.getElementById('clienteSenha')?.value;
    const cpf = document.getElementById('clienteCpf')?.value;
    const telefone = document.getElementById('clienteTelefone')?.value;
    const endereco = document.getElementById('clienteEndereco')?.value;

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
    carregarClientesNoSelect();  // atualiza o select na hora
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

//----- chama funcao cadastrar cliente ==========

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnCadastrarCliente');

    if (btn) {
        btn.addEventListener('click', mostrarCadastroCliente);
    }
});


// ==========carregar clientes salvos

function carregarClientesNoSelect() {
    const select = document.getElementById('clienteConsulta');
    if (!select) return;

    const usuarios = getUsuarios();
    const clientes = usuarios.filter(u => u.tipo === 'cliente');

select.innerHTML = '<option value="">Selecione um cliente</option>';

clientes.forEach(cliente => {
    const option = document.createElement('option');
    option.value = cliente.id;
   // option.textContent = cliente.nome + ' - ' + cliente.email;
    option.textContent = `${cliente.nome} - ${cliente.email}`;
    select.appendChild(option);
  });
}

//CHAMA AUTOMATICAMENTE OS CLIENTES CADASTRADOS NA AREA FUNCIONARIO ///
document.addEventListener('DOMContentLoaded', () => {
    carregarClientesNoSelect();
})

//=====FUNCAO AGENDAMENTO DE CONSULTA  =====


function agendarConsulta() {
    const clienteID = document.getElementById('clienteConsulta').value;
    const data = document.getElementById('dataConsulta').value;
    const horario = document.getElementById('horaConsulta').value;
    const tipo = document.getElementById('tipoConsulta').value;

    if (!clienteID || !data || !horario || !tipo) {
        alert('Preencha todos os campos');
        return;
    }

    const hoje = new Date();
    const dataConsulta = new Date(data + 'T00:00');

    if (dataConsulta < new Date(hoje.toDateString())) {
        alert('Não é permitido agendar para datas passadas');
        return;
    }

    const diaSemana = dataConsulta.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
        alert('Atendimento somente de segunda a sexta');
        return;
    }

    if (horario < '07:00' || horario > '18:00') {
        alert('Horário permitido: 07:00 às 18:00');
        return;
    }

    const usuarios = getUsuarios();
    const cliente = usuarios.find(u => u.id == clienteID);

    if (!cliente) {
        alert('Cliente não encontrado');
        return;
    }


    const horarioOcupado = usuarios.some(u =>
        u.tipo === 'cliente' &&
        u.consultas &&
        u.consultas.some(c =>
            c.data === data &&
            c.horario === horario &&
            c.status === 'ativa'
        )
    );

    if (horarioOcupado) {
        alert('Este horário já está ocupado');
        return;
    }

    if (!cliente.consultas) {
        cliente.consultas = [];
    }

    cliente.consultas.push({
        data,
        horario,
        tipo,
        status: 'ativa',
        cancelamento: null
    });

    setUsuarios(usuarios);
    alert('Consulta agendada com sucesso!');
    // ✅ LIMPAR CAMPOS (agora no lugar certo)
    document.getElementById('clienteConsulta').value = '';
    document.getElementById('dataConsulta').value = '';
    document.getElementById('horaConsulta').value = '';
    document.getElementById('tipoConsulta').value = '';
}


//=======CARREGAR CONSULTA DE CLIENTE LOGADO=======

function carregarConsultasCliente() {
    const lista = document.getElementById('consultas');
    if (!lista) return;

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuarioLogado || usuarioLogado.tipo !== 'cliente') return;

    const usuarios = getUsuarios();
    const cliente = usuarios.find(u => u.id === usuarioLogado.id);

    if (!cliente || !cliente.consultas || cliente.consultas.length === 0) {
        lista.innerHTML = '<li>Nenhuma consulta</li>';
        return;
    }

    lista.innerHTML = '';

    cliente.consultas.forEach((c, index) => {
        if (c.status === 'cancelada') return;

        const li = document.createElement('li');
        li.innerHTML = `
            ${c.data} - ${c.horario} (${c.tipo})
            <button onclick="cancelarConsulta(${cliente.id}, ${index}, 'cliente')">
                Cancelar
            </button>
        `;
        lista.appendChild(li);
    });
}


//===== CHAMAR CONSULTA AUTOMATICAMENTE DO CLIENT

document.addEventListener('DOMContentLoaded', () => {
    carregarClientesNoSelect();
    carregarConsultasCliente();
});

//======funçao de cancelamento de consulta========

function cancelarConsulta(clienteId, indexConsulta, quemCancelou) {
    const motivo = prompt('Informe o motivo do cancelamento:');

    if (!motivo || motivo.trim() === '') {
        alert('Motivo é obrigatório');
        return;
    }

    const usuarios = getUsuarios();
    const cliente = usuarios.find(u => u.id == clienteId);

    if (!cliente || !cliente.consultas[indexConsulta]) {
        alert('Consulta não encontrada');
        return;
    }

    cliente.consultas[indexConsulta].status = 'cancelada';
    cliente.consultas[indexConsulta].cancelamento = {
        motivo,
        quemCancelou,
        data: new Date().toLocaleString()
    };

    setUsuarios(usuarios);
    alert('Consulta cancelada com sucesso!');
}


//=======carregar dados ao selecionar cliente======

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('clienteConsulta');

    if (select) {
        select.addEventListener('change', carregarInfoCliente);
    }
});


//=====carregar informaçoes do cliente area funcionario====

function carregarInfoCliente() {
    const clienteId = document.getElementById('clienteConsulta').value;
    const divInfo = document.getElementById('infoCliente');

    if (!clienteId) {
        divInfo.style.display = 'none';
        return;
    }

    const usuarios = getUsuarios();
    const cliente = usuarios.find(u => u.id == clienteId);

    if (!cliente) return;

    // Mostrar painel
    divInfo.style.display = 'block';

    // Preencher contatos
    document.getElementById('editEmail').value = cliente.email || '';
    document.getElementById('editTelefone').value = cliente.telefone || '';
    document.getElementById('editEndereco').value = cliente.endereco || '';

    carregarConsultasDoCliente(cliente);
}


//===listar consultas do cliente=========

function carregarConsultasDoCliente(cliente) {
    const lista = document.getElementById('listaConsultasCliente');
    lista.innerHTML = '';

    if (!cliente.consultas || cliente.consultas.length === 0) {
        lista.innerHTML = '<li>Nenhuma consulta agendada</li>';
        return;
    }

    cliente.consultas.forEach((c, index) => {
        if (c.status === 'cancelada') return;

        const li = document.createElement('li');
        li.innerHTML = `
            ${c.data} - ${c.horario} (${c.tipo})
            <button onclick="cancelarConsulta(${cliente.id}, ${index}, 'funcionario')">
                ❌ Cancelar
            </button>
        `;
        lista.appendChild(li);
    });
}

//========= salvar alteraçao de contato do cliente========

function salvarContatoCliente() {
    const clienteId = document.getElementById('clienteConsulta').value;

    const email = document.getElementById('editEmail').value;
    const telefone = document.getElementById('editTelefone').value;
    const endereco = document.getElementById('editEndereco').value;

    const usuarios = getUsuarios();
    const cliente = usuarios.find(u => u.id == clienteId);

    if (!cliente) {
        alert('Cliente não encontrado');
        return;
    }

    cliente.email = email;
    cliente.telefone = telefone;
    cliente.endereco = endereco;

    setUsuarios(usuarios);
    alert('Contato atualizado com sucesso!');
}


