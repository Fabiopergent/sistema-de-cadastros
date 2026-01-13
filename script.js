const formCadastro = document.getElementById('formCadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        localStorage.setItem(email, JSON.stringify(usuario));

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';
    });
}
