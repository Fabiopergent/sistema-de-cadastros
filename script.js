//funcionario admin fixo//
if (!localStorage.getItem('funcionarios')) {
    const funcionarios = [
        { matricula: 'admin', nome: 'Administrador', senha: '1234'}
    ];
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
}

//logim cliente//

const formLoginCliente = document.getElementById('formLoginCLiente');

if (formLoginCliente) {
    formLoginCliente.addEventListener('submit', function (e) {
        e.preventDefault()

        const email = document.getElementById('emailCliente').value;
        const senha = document.getElementById('senhaCliente').value;

        const clientes = JSON.parse(localStorage.getItem('cliente')) || [];
        const cliente = clientes.find(c => c.email === email && c.senha === senha);

        if (!cliente) {
            alert('Login inválido');
            return;
        }

        localStorage.setItem('usuarioLogado', JSON.stringify({ ...cliente, tipo: 'cliente' }));
        window.location.href = 'area-cliente.html';
    } )
}

//login funcionario//

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

//mostrar formulario//

function mostrarCadastro() {
    document.getElementById('cadastroCliente').styledisplay = 'block';
}

//cadastrar cliente//

function cadastrarCliente() {
    const cliente = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        consulta: []
    };

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    //validar email duplicado//
    if (clientes.some(C => C.email === cliente.email)) {
        alert('Email já cadastrado');
        return;
    }

    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    alert('CLiente cadastrado com sucesso!');
}

//exibir dados do cliente//
// Só roda se estiver na área do cliente
if (window.location.pathname.includes('area-cliente')) {

    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuario && usuario.tipo === 'cliente') {

        const dadosDiv = document.getElementById('dados');
        const lista = document.getElementById('consultas');

        dadosDiv.innerHTML = `
            <p><b>Nome:</b> ${usuario.nome}</p>
            <p><b>Email:</b> ${usuario.email}</p>
            <p><b>CPF:</b> ${usuario.cpf}</p>
            <p><b>Telefone:</b> ${usuario.telefone}</p>
            <p><b>Endereço:</b> ${usuario.endereco}</p>
        `;

        // Evita erro se ainda não tiver consultas
        if (usuario.consultas && usuario.consultas.length > 0) {
            usuario.consultas.forEach(c => {
                lista.innerHTML += `<li>${c.data} - ${c.horario} (${c.tipo})</li>`;
            });
        } else {
            lista.innerHTML = '<li>Nenhuma consulta agendada</li>';
        }
    }
}
