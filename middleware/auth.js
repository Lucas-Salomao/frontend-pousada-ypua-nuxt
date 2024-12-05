// export default function ({ $auth, redirect }) {
//   console.log($auth.loggedIn)
//   if (!$auth.loggedIn) {
//     return redirect('/login')
//   }
// }

// import routes from '../routes';

// export default function ({ $auth, route, redirect }) {
//   // Remove o redirecionamento para /login

//   if ($auth.loggedIn) { // Verifica se o usuário está logado
//     const userRole = $auth.user.role; 

//     if (!checkAccess(userRole, route.path)) {
//       return redirect('/'); 
//     }
//   }
// };

// function checkAccess(role, routePath) {
//   const routeConfig = routes.find(route => route.path === routePath);
//   if (routeConfig) {
//     return routeConfig.roles.includes(role);
//   }
//   return false; // Se a rota não estiver configurada, nega o acesso por padrão
// }

import routes from '../routes';
import jwtDecode from 'jwt-decode'; // Importa a biblioteca

export default function ({ $auth, route, store, redirect }) {
  const isPublicRoute = checkAccess('public', route.name);

  if ($auth.loggedIn) {
    try {
      const token = this.$auth.$storage.getUniversal('_token.local');
      const cleanToken = token.replace(/^Bearer\s+/, '');
      const decoded = jwtDecode(cleanToken);
      const userRole = decoded.role;

      if (!checkAccess(userRole, route.name)) {
        store.commit('SET_ACCESS_DENIED', true);
      } else {
        store.commit('SET_ACCESS_DENIED', false);
      }
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return redirect('/acessonegado');
    }
  } else {
    if (!isPublicRoute) {
      store.commit('SET_ACCESS_DENIED', true);
      return; // Não redirecione aqui
    }
  }
};

function checkAccess(role, routePath) {
  const routeConfig = routes.find(route => route.path === routePath);
  if (routeConfig) {
    return routeConfig.roles.includes(role);
  }
  return false;
}