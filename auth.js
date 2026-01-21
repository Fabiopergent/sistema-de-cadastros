const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {

    window.location.href = 'index.html';
}

// Página atual
const pagina = window.location.pathname;

// Proteção funcionário
if (pagina.includes('area-funcionario') && usuarioLogado.tipo !== 'funcionario') {

    window.location.href = 'index.html';
}

// Proteção cliente
if (pagina.includes('area-cliente') && usuarioLogado.tipo !== 'cliente') {

    window.location.href = 'index.html';
}


// area adm


if (pagina.includes('area-adm') && usuarioLogado.tipo !== 'admin') {
    alert('Acesso permitido apenas para administradores.');
    window.location.href = 'index.html';
}



