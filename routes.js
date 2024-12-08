export default [
  { path: '/', name: 'index', roles: ['public', 'usuario', 'funcionario', 'admin'] },
  { path: '/sobre', name: 'sobre', roles: ['public', 'usuario', 'funcionario', 'admin'] },
  { path: '/usuarios', name: 'usuarios', roles: ['admin'] },
  { path: '/hospedes', name: 'hospedes', roles: ['funcionario', 'admin'] },
  { path: '/acomodacoescarrousel', name: 'acomodacoescarrousel', roles: ['public', 'usuario', 'funcionario', 'admin'] },
  { path: '/reservas', name: 'reservas', roles: ['funcionario', 'admin'] },
  // { path: '/checkin', name: 'checkin', roles: ['funcionario', 'admin'] },
  // { path: '/checkout', name: 'checkout', roles: ['funcionario', 'admin'] },
  { path: '/relatorios', name: 'relatorios', roles: ['admin'] },
  { path: '/contato', name: 'contato', roles: ['public', 'usuario', 'funcionario', 'admin'] },
];