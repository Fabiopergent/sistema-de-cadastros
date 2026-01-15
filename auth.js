const usuarioLogado = localStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    alert('Acesso negado. Faça login.');
    window.location.href = 'index.html';
}