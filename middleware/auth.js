// export default function ({ $auth, redirect }) {
//   console.log($auth.loggedIn)
//   if (!$auth.loggedIn) {
//     return redirect('/login')
//   }
// }

import routes from '../routes';

export default function ({ $auth, route, redirect }) {
  // Remove o redirecionamento para /login

  if ($auth.loggedIn) { // Verifica se o usuário está logado
    const userRole = $auth.user.role; 

    if (!checkAccess(userRole, route.path)) {
      return redirect('/'); 
    }
  }
};

function checkAccess(role, routePath) {
  const routeConfig = routes.find(route => route.path === routePath);
  if (routeConfig) {
    return routeConfig.roles.includes(role);
  }
  return false; // Se a rota não estiver configurada, nega o acesso por padrão
}