const formCadastro = document.getElementById('formCadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const tipo = document.getElementById('tipo').value;

        const usuario = {
            nome: nome,
            email: email,
            senha: senha,
            tipo: 'cliente'
        };

        localStorage.setItem(email, JSON.stringify(usuario));

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';
    });
}

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

        if (usuario.tipo === 'funcionario') {
            window.location.href = 'area-funcionario.html';
        } else {
            window.location.href = 'area-cliente.html';
        }

        localStorage.setItem('usuarioLogado', JSON.stringify(tipo));

    });
}

