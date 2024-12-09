<template>
  <v-app>
    <v-app-bar app color="primary" dark :elevation="2" rounded>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Pousada Ypuã</v-toolbar-title>
      <v-spacer></v-spacer>
      <div >
        {{ getSaudacao() }},
      </div>
      <div v-if="$auth.loggedIn" class='px-4'>
        {{ userName }}
      </div>
      <div v-if="$auth.loggedIn">
        {{ userEmail }}
        <v-btn icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-btn icon @click="goToLogin">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </div>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list dense>
        <v-list-item v-for="route in filteredRoutes" :key="route.path" :to="route.path">
          <v-list-item-icon>
            <v-icon>{{ getIcon(route.path) }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ getTitle(route.path) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import routes from '../routes';
import jwtDecode from 'jwt-decode';

export default {
  data: () => ({
    drawer: false,
    userRole: null,
    userEmail: null,
    userName: null,
    isDark: true, // Adiciona o controle do tema
  }),
  computed: {
    filteredRoutes() {
      if (this.$auth.loggedIn) {
        return routes.filter(route => route.roles.includes(this.userRole));
      } else {
        return routes.filter(route => route.roles.includes('public'));
      }
    }
  },
  mounted() {
    // Move a lógica do tema para o hook mounted, que só executa no cliente
    this.initializeTheme();
  },
  created() {
    this.extractUserInfo();
  },
  methods: {
    initializeTheme() {
      // Verifica se está no ambiente do navegador
      if (process.client) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          this.isDark = savedTheme === 'dark';
          this.$vuetify.theme.dark = this.isDark;
        }
      }
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      this.$vuetify.theme.dark = this.isDark;
      // Salva apenas se estiver no cliente
      if (process.client) {
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
      }
    },
    getSaudacao() {
      const hora = new Date().getHours();
      
      if (hora >= 6 && hora < 12) {
        return 'Bom dia';
      } else if (hora >= 12 && hora < 18) {
        return 'Boa tarde';
      } else {
        return 'Boa noite';
      }
    },

    extractUserInfo() {
      try {
        if (this.$auth.loggedIn) {
          const token = this.$auth.$storage.getUniversal('_token.local');

          // Remova o prefixo 'Bearer ' se estiver presente
          const cleanToken = token.replace(/^Bearer\s+/, '');

          if (cleanToken) {
            const decoded = jwtDecode(cleanToken);

            // Extract role - adjust the key based on your JWT structure
            this.userRole = decoded.role;

            // Extract email - adjust the key based on your JWT structure
            this.userEmail = decoded.email;

            // Extract name - adjust the key based on your JWT structure
            this.userName = decoded.nome;
          }
        }
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        this.userRole = 'public';
        this.userEmail = '';
      }
    },

    goToLogin() {
      this.$router.push('/login');
    },

    async logout() {
      try {
        await this.$auth.reset();
        this.$router.push('/login');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    },
    getIcon(path) {
      switch (path) {
        case '/': return 'mdi-home';
        case '/sobre': return 'mdi-information';
        case '/usuarios': return 'mdi-account-circle';
        case '/hospedes': return 'mdi-account-group';
        case '/acomodacoescarrousel': return 'mdi-bed';
        case '/reservas': return 'mdi-calendar-check';
        // case '/checkin': return 'mdi-clock-in';
        // case '/checkout': return 'mdi-clock-out';
        case '/relatorios': return 'mdi-file-chart';
        case '/contato': return 'mdi-phone';
        default: return 'mdi-link';
      }
    },
    getTitle(path) {
      switch (path) {
        case '/': return 'Home';
        case '/sobre': return 'Sobre';
        case '/usuarios': return 'Usuários';
        case '/hospedes': return 'Hóspedes';
        case '/acomodacoescarrousel': return 'Acomodações';
        case '/reservas': return 'Reservas';
        // case '/checkin': return 'Check-in';
        // case '/checkout': return 'Check-out';
        case '/relatorios': return 'Relatórios';
        case '/contato': return 'Contato';
        default: return 'Página';
      }
    }
  },
  watch: {
    // Watch for authentication changes
    '$auth.loggedIn'(newValue) {
      if (newValue) {
        this.extractUserInfo();
      } else {
        this.userRole = 'public';
        this.userEmail = null;
        this.userName = null;
      }
    }
  }
};
</script>