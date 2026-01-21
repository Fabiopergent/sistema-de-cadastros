const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {
    alert('Acesso negado. Faça login.');
    window.location.href = 'index.html';
}

// tipo exigido pela página
const tipoPagina = document.body.dataset.tipo;

if (tipoPagina && usuarioLogado.tipo !== tipoPagina) {
    alert('Acesso não autorizado.');
    window.location.href = 'index.html';
}
