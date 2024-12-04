export default [
    { path: '/', roles: ['usuario', 'funcionario', 'admin'] },
    { path: '/sobre', roles: ['usuario', 'funcionario', 'admin'] },
    { path: '/usuarios', roles: ['admin'] },
    { path: '/hospedes', roles: ['funcionario', 'admin'] },
    { path: '/acomodacoes', roles: ['usuario', 'funcionario', 'admin'] },
    { path: '/reservas', roles: ['funcionario', 'admin'] },
    { path: '/checkin', roles: ['funcionario', 'admin'] },
    { path: '/checkout', roles: ['funcionario', 'admin'] },
    { path: '/relatorios', roles: ['admin'] },
    { path: '/contato', roles: ['usuario', 'funcionario', 'admin'] },
    // ... outras rotas
  ];