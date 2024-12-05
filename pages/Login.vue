<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>
            <span class="headline">Digite seu usuário e senha</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Senha"
                :type="showPassword ? 'text' : 'password'"
                required
                append-icon="mdi-eye"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-btn type="submit" color="primary" class="mx-2">Entrar</v-btn>
              <v-btn to="/Cadastro" color="primary" class="mx-2">Cadastre-se</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            senha: this.password
          }
        })
        this.$router.push('/')
      } catch (error) {
        console.error('Erro ao fazer login:', error)
      }
    }
  }
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>