const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {
    alert('Acesso negado. Faça login.');
    window.location.href = 'index.html';
}

// Página atual
const pagina = window.location.pathname;

// Proteção funcionário
if (pagina.includes('area-funcionario') && usuarioLogado.tipo !== 'funcionario') {
    alert('Acesso permitido apenas para funcionários.');
    window.location.href = 'index.html';
}

// Proteção cliente
if (pagina.includes('area-cliente') && usuarioLogado.tipo !== 'cliente') {
    alert('Acesso permitido apenas para clientes.');
    window.location.href = 'index.html';
}

