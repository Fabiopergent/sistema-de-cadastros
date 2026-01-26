//=======PROTECAO DE ACESSO AREA-ADM PARA INVIABILIZAR ENTRADA PELO URL

document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    const tipoPagina = document.body.dataset.tipo; // admin, funcionario, cliente

    if (!tipoPagina) return; // páginas públicas (index, login, etc)

    if (!usuario) {
        alert('Acesso não autorizado');
        window.location.href = 'index.html';
        return;
    }

    if (usuario.tipo !== tipoPagina) {
        alert('Acesso não autorizado');
        window.location.href = 'index.html';
    }
});


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

    // 🔥 DATA/HORA COMPLETA
    const agora = new Date();
    const dataHoraConsulta = new Date(`${data}T${horario}`);

    if (isNaN(dataHoraConsulta.getTime())) {
        alert('Data ou horário inválido');
        return;
    }

    // 🚫 NÃO PERMITIR PASSADO OU MESMO HORÁRIO
    if (dataHoraConsulta <= agora) {
        alert('Não é permitido agendar para agora ou horário passado');
        return;
    }

    // ⏱️ REGRA: mínimo 3 horas de antecedência
    const diferencaHoras = (dataHoraConsulta - agora) / (1000 * 60 * 60);

    if (diferencaHoras < 3) {
        alert('A consulta deve ser agendada com no mínimo 3 horas de antecedência');
        return;
    }

    // 📆 DIA DA SEMANA
    const diaSemana = dataHoraConsulta.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
        alert('Atendimento somente de segunda a sexta');
        return;
    }

    // 🕖 HORÁRIO DE ATENDIMENTO
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

    // 🚫 BLOQUEIO DE HORÁRIO DUPLICADO (GLOBAL)
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

    // 👤 FUNCIONÁRIO LOGADO
    const funcionario = JSON.parse(localStorage.getItem('usuarioLogado'));

    cliente.consultas.push({
        data,
        horario,
        tipo,
        status: 'ativa',
        criadoEm: new Date().toLocaleString(),
        agendadoPor: funcionario?.nome || 'Funcionário',
        cancelamento: null
    });

    setUsuarios(usuarios);

    alert('Consulta agendada com sucesso!');

    // LIMPAR CAMPOS
    document.getElementById('clienteConsulta').value = '';
    document.getElementById('dataConsulta').value = '';
    document.getElementById('horaConsulta').value = '';
    document.getElementById('tipoConsulta').value = '';

    // Atualiza painel
    carregarClientesNoSelect();
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
            <strong>${c.data} - ${c.horario}</strong> (${c.tipo})<br>
            <small>
                 📌 Agendada em: ${c.criadoEm || '---'} <br>
                 👤 Agendada por: ${c.agendadoPor || '---'}
            </small><br>
            <button onclick="cancelarConsulta(${cliente.id}, ${index}, 'cliente')">
                Cancelar
            </button>
`;

        lista.appendChild(li);
    });
    
}


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
            <strong>${c.data} - ${c.horario}</strong> (${c.tipo})<br>
            <small>
                📌 Criada em: ${c.criadoEm || '---'} <br>
                👤 Agendada por: ${c.agendadoPor || '---'}
            </small><br>
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

//===== Chamada de funcoes ====== *****@@@@@@@@@@@@@

document.addEventListener('DOMContentLoaded', () => {

    // Botão cadastrar cliente (área funcionário)
    const btnCadastrar = document.getElementById('btnCadastrarCliente');
    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', mostrarCadastroCliente);
    }

    // Carregar clientes no select (se existir)
    carregarClientesNoSelect();

    // Carregar consultas do cliente logado (se estiver na área cliente)
    carregarConsultasCliente();

    // Carrega consulta de funcionarios na area ADM
    carregarFuncionariosAdmin();

    //CARREGA DASHBOARD AREA ADM
    carregarDashboardAdmin();
     
    //CARREGA OS DADOS DA AUDITORIA AREA ADM
    carregarAuditoriaAdmin();

    // Evento ao selecionar cliente (área funcionário)
    const selectCliente = document.getElementById('clienteConsulta');
    if (selectCliente) {
        selectCliente.addEventListener('change', carregarInfoCliente);
    }

});


//===== CARREGAR AREA ADM TABELA DE FUNCIONARIOS =====

function carregarFuncionariosAdmin() {
    const tabela = document.getElementById('tabelaFuncionarios');
    if (!tabela) return;

    const usuarios = getUsuarios();
    const funcionarios = usuarios.filter(u => u.tipo === 'funcionario');

    tabela.innerHTML = '';

    if (funcionarios.length === 0) {
        tabela.innerHTML = '<tr><td colspan="4">Nenhum funcionário cadastrado</td></tr>';
        return;
    }

    funcionarios.forEach(func => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${func.nome}</td>
            <td>${func.matricula}</td>
            <td>${func.email || '-'}</td>
            <td>
                <button onclick="editarFuncionario(${func.id})">✏️ Editar</button>
                <button onclick="excluirFuncionario(${func.id})">🗑️ Excluir</button>
            </td>
        `;

        tabela.appendChild(tr);
    });
}


// =======AREA ADM , ABRIR FORMULARIO DE EDICAO======

function editarFuncionario(id) {
    const usuarios = getUsuarios();
    const funcionario = usuarios.find(u => u.id === id);

    if (!funcionario) return;

    document.getElementById('editarFuncionario').style.display = 'block';
    document.getElementById('editFuncId').value = funcionario.id;
    document.getElementById('editFuncNome').value = funcionario.nome;
    document.getElementById('editFuncEmail').value = funcionario.email || '';
    document.getElementById('editFuncMatricula').value = funcionario.matricula || '';

    document.getElementById('editarFuncionario').style.display = 'block';

}


//====AREA ADM SALVAR ALTERACOES ========

function salvarEdicaoFuncionario() {
    const id = Number(document.getElementById('editFuncId').value);
    const nome = document.getElementById('editFuncNome').value;
    const email = document.getElementById('editFuncEmail').value;
    const matricula = document.getElementById('editFuncMatricula').value;

    if (!nome || !email || !matricula) {
        alert('Preencha todos os campos');
        return;
    }

    const usuarios = getUsuarios();
    const funcionario = usuarios.find(u => u.id === id);

    if (!funcionario) {
        alert('Funcionário não encontrado');
        return;
    }

    // 🔐 valida matrícula duplicada
    const matriculaDuplicada = usuarios.some(u =>
        u.tipo === 'funcionario' &&
        u.matricula === matricula &&
        u.id !== id
    );

    if (matriculaDuplicada) {
        alert('Já existe um funcionário com esta matrícula');
        return;
    }

    funcionario.nome = nome;
    funcionario.email = email;
    funcionario.matricula = matricula;

    setUsuarios(usuarios);
    alert('Funcionário atualizado com sucesso!');

    cancelarEdicaoFuncionario();
    carregarFuncionarios(); // recarrega a tabela
}


//==== AREA ADM CANCELAR EDICAO 

function cancelarEdicaoFuncionario() {
    document.getElementById('editarFuncionario').style.display = 'none';
}


// ================= DASHBOARD ADMIN =================

function carregarDashboardAdmin() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuarioLogado || usuarioLogado.tipo !== 'admin') return;

    const usuarios = getUsuarios();

    const clientes = usuarios.filter(u => u.tipo === 'cliente');
    const funcionarios = usuarios.filter(u => u.tipo === 'funcionario');

    let consultasAtivas = 0;
    let consultasCanceladas = 0;
    let consultasHoje = 0;

    const hoje = new Date().toISOString().split('T')[0];

    clientes.forEach(cliente => {
        if (!cliente.consultas) return;

        cliente.consultas.forEach(c => {
            if (c.status === 'ativa') consultasAtivas++;
            if (c.status === 'cancelada') consultasCanceladas++;
            if (c.data === hoje && c.status === 'ativa') consultasHoje++;
        });
    });

    document.getElementById('totalClientes').textContent = clientes.length;
    document.getElementById('totalFuncionarios').textContent = funcionarios.length;
    document.getElementById('totalConsultasAtivas').textContent = consultasAtivas;
    document.getElementById('totalConsultasCanceladas').textContent = consultasCanceladas;
    document.getElementById('totalConsultasHoje').textContent = consultasHoje;
}

// CHAMAR AUTOMATICAMENTE
//document.addEventListener('DOMContentLoaded', () => {
  //  carregarDashboardAdmin();
//});

//=====FUNÇAO EXCLUIR FUNCIONARIO TABELA ADM=====

function excluirFuncionario(funcionarioId) {
    const confirmacao = confirm(
        'Tem certeza que deseja excluir este funcionário?\nEsta ação não poderá ser desfeita.'
    );

    if (!confirmacao) return;

    const usuarios = getUsuarios();

    const funcionario = usuarios.find(u => u.id == funcionarioId);

    if (!funcionario) {
        alert('Funcionário não encontrado');
        return;
    }

    // 🔒 Regra de segurança
    if (funcionario.tipo === 'admin') {
        alert('Não é permitido excluir o administrador do sistema');
        return;
    }

    // remove funcionário
    const novaLista = usuarios.filter(u => u.id != funcionarioId);

    setUsuarios(novaLista);

    alert('Funcionário excluído com sucesso');

    // recarrega tabela
    carregarFuncionarios();
}


//========DASHBOARD ADM AUDITORIA============

function carregarDashboardAdmin() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuario || usuario.tipo !== 'admin') return;

    const usuarios = getUsuarios();

    const clientes = usuarios.filter(u => u.tipo === 'cliente');
    const funcionarios = usuarios.filter(u => u.tipo === 'funcionario');

    let consultasAtivas = 0;
    let consultasCanceladas = 0;
    let consultasHoje = 0;

    const hoje = new Date().toISOString().split('T')[0];

    clientes.forEach(cliente => {
        if (!cliente.consultas) return;

        cliente.consultas.forEach(c => {
            if (c.status === 'ativa') consultasAtivas++;
            if (c.status === 'cancelada') consultasCanceladas++;
            if (c.data === hoje) consultasHoje++;
        });
    });

    document.getElementById('totalClientes').textContent = clientes.length;
    document.getElementById('totalFuncionarios').textContent = funcionarios.length;
    document.getElementById('totalConsultasAtivas').textContent = consultasAtivas;
    document.getElementById('totalConsultasCanceladas').textContent = consultasCanceladas;
    document.getElementById('totalConsultasHoje').textContent = consultasHoje;
}

//=========CARREGAR AUDITORIA ADM =============

function carregarAuditoriaAdmin() {
    const tabela = document.getElementById('tabelaAuditoria');
    if (!tabela) return;

    tabela.innerHTML = '';
    const usuarios = getUsuarios();

    usuarios
        .filter(u => u.tipo === 'cliente')
        .forEach(cliente => {
            if (!cliente.consultas) return;

            cliente.consultas.forEach(c => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${cliente.nome}</td>
                    <td>${c.data}</td>
                    <td>${c.horario}</td>
                    <td>${c.status}</td>
                    <td>${c.agendadoPor || '-'}</td>
                    <td>${c.criadoEm || '-'}</td>
                    <td>
                        ${
                            c.cancelamento
                                ? `${c.cancelamento.motivo}<br>
                                   <small>${c.cancelamento.quemCancelou}</small>`
                                : '-'
                        }
                    </td>
                `;

                tabela.appendChild(tr);
            });
        });
}
