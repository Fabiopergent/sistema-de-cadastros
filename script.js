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
