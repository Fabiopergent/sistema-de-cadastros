const usuarioLogado = localStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    alert('Acesso negado. Faça login.');
    window.location.href = 'index.html';
}

const pagina = window.location.pathname;

if (pagina.includes('area-funcionario') && usuarioLogado.tipo !== 'funcionario') {
    alert('Acesso permitido apenas para funcionários.');
window.location.href = 'index.html';
}

if (pagina.inclides('area-cliente') && usuarioLogado.tipo !== 'cliente') {
    alert('Acesso permitido apenas para clientes.');
    window.location.href = 'index.html';
}