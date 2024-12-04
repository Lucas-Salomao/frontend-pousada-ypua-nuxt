<template>
  <v-app>

    <v-app-bar app color="primary" dark :elevation="2" rounded>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Pousada Ypuã</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="goToLogin">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/sobre">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sobre</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/usuarios">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Usuários</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/hospedes">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Hóspedes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/acomodacoescarrousel">
          <v-list-item-icon>
            <v-icon>mdi-bed</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Acomodações</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item link to="/acomodacoes">
          <v-list-item-icon>
            <v-icon>mdi-bed</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Acomodações</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item link to="/reservas">
          <v-list-item-icon>
            <v-icon>mdi-calendar-check</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Reservas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/checkin">
          <v-list-item-icon>
            <v-icon>mdi-clock-in</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Check-in</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/checkout">
          <v-list-item-icon>
            <v-icon>mdi-clock-out</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Check-out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/relatorios">
          <v-list-item-icon>
            <v-icon>mdi-file-chart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Relatórios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/contato">
          <v-list-item-icon>
            <v-icon>mdi-phone</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Contato</v-list-item-title>
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

export default {
  data: () => ({
    drawer: false,
  }),
  methods: {
    goToLogin() {
      this.$router.push('/login')
    },
    async logout() {
      try {
        // await this.$axios.post('/auth/logout');
        await this.$auth.reset()
        // Opcional: redirecionar após logout
        this.$router.push('/login')
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
        // Exiba uma mensagem de erro para o usuário (opcional)
      }
    }
  },
};
</script>