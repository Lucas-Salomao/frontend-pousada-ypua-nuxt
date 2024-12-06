// autorizacao.js
import routes from '../routes';
import jwtDecode from 'jwt-decode';

export default function (context) {

  const { $auth, route, redirect } = context;
  // Verifica se o usuário está logado
  if ($auth.loggedIn) {
    
    // // Recupera o token
    const token = $auth.$storage.getUniversal('_token.local');
    const cleanToken = token.replace(/^Bearer\s+/, '');
    
    // Decodifica o token para obter as informações do usuário
    if (cleanToken) {
      try {
        const decoded = jwtDecode(cleanToken);
        
        // Encontra a rota atual nas rotas definidas usando o path
        const currentRoute = routes.find(r => r.path === route.path);
        
        // Verifica se a rota existe e se o usuário tem permissão
        if (currentRoute) {
          // Verifica se a role do usuário está autorizada para esta rota
          const userRole = decoded.role; // Supondo que o token tenha uma propriedade 'role'
          const isAuthorized = currentRoute.roles.includes(userRole);
          
          // Se não estiver autorizado, redireciona para página de acesso negado
          if (!isAuthorized) {
            console.warn(`Usuário sem permissão para acessar ${route.path}`);
            return redirect('/acessonegado');
          }
        }
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        // Em caso de erro no token, redireciona para login
        return redirect('/acessonegado');
      }
    }
  } else {
    // Se não estiver logado, verifica se a rota permite acesso público
    console.info("Usuário não logado");
    const currentRoute = routes.find(r => r.path === route.path);
    
    if (currentRoute && !currentRoute.roles.includes('public')) {
      // Redireciona para login se a rota não for pública
      return redirect('/acessonegado');
    }
  }
}