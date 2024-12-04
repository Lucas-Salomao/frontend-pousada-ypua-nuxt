<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title>
              <span class="headline">Novo Cadastro</span>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="cadastrar">
                <v-text-field
                  v-model="editedItem.nome"
                  label="Nome"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.senha"
                  label="Senha"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  append-icon="mdi-eye"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.rg"
                  label="RG"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.cpf"
                  label="CPF"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.rua"
                  label="Rua"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.numero"
                  label="Número"
                  type="number"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.complemento"
                  label="Complemento"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.bairro"
                  label="Bairro"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.cidade"
                  label="Cidade"
                  required
                ></v-text-field>
                <v-select
                  v-model="editedItem.estado"
                  :items="estadosSiglas"
                  label="Estado"
                  required
                ></v-select>
                <v-text-field
                  v-model="editedItem.pais"
                  label="País"
                  required
                ></v-text-field>
  
                <v-btn type="submit" color="primary">Cadastrar</v-btn>
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
        estadosSiglas: [
          // ... (seus estados)
        ],
        editedItem: {
          nome: "",
          email: "",
          senha: "",
          rg: "",
          cpf: "",
          rua: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: "",
          pais: "",
          role: "usuario", // Define o papel como 'usuario' por padrão
        },
      };
    },
    methods: {
      async cadastrar() {
        try {
          const response = await this.$axios.post("/usuario", this.editedItem);
          // Exiba uma mensagem de sucesso (opcional)
          console.log(response.data);
          // Redirecione o usuário para a página de login (opcional)
          this.$router.push("/login"); 
        } catch (error) {
          // Exiba um alerta de erro
          this.errorMessage = error.response.data.message || "Erro ao criar usuário.";
          this.showAlert = true;
          console.error(error);
        }
      },
    },
  };
  </script>