<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>
            <span class="headline">Novo Cadastro</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="cadastrar" ref="registrationForm" v-model="valid">
              <v-text-field
                v-model="editedItem.nome"
                label="Nome"
                :rules="[v => !!v || 'Nome é obrigatório']"
                required
              ></v-text-field>
              <v-text-field
                v-model="editedItem.email"
                label="Email"
                :rules="[v => !!v || 'Email é obrigatório', v => /.+@.+\..+/.test(v) || 'Email deve ser válido']"
                required
              ></v-text-field>
              <v-text-field
                v-model="editedItem.senha"
                label="Senha"
                :type="showPassword ? 'text' : 'password'"
                :rules="[v => !!v || 'Senha é obrigatória', v => v.length >= 8 || 'Senha deve ter no mínimo 8 caracteres']"
                required
                append-icon="mdi-eye"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                v-model="confirmarSenha"
                label="Repita sua Senha"
                :type="showPassword ? 'text' : 'password'"
                :rules="[
                  v => !!v || 'Confirmação de senha é obrigatória', 
                  v => v === editedItem.senha || 'As senhas não coincidem'
                ]"
                required
                append-icon="mdi-eye"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.rg"
                label="RG"
                :rules="[v => !!v || 'RG é obrigatório']"
                required
              ></v-text-field>
              <v-text-field
                v-model="editedItem.cpf"
                label="CPF"
                :rules="[
                  v => !!v || 'CPF é obrigatório', 
                  v => /^\d{11}$/.test(v) || 'CPF deve conter 11 dígitos',
                  v => validarCPF(v) || 'CPF inválido'
                ]"
                required
              ></v-text-field>
              <v-text-field
                v-model="editedItem.rua"
                label="Rua"
                :rules="[v => !!v || 'Rua é obrigatória']"
                required
              ></v-text-field>
              <v-text-field
                v-model="editedItem.numero"
                label="Número"
                type="number"
                :rules="[v => !!v || 'Número é obrigatório']"
                required
              ></v-text-field>
              <v-text-field
                v-model="editedItem.complemento"
                label="Complemento"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.bairro"
                label="Bairro"
                :rules="[v => !!v || 'Bairro é obrigatório']"
                required
              ></v-text-field>
              <v-text-field
                v-model="editedItem.cidade"
                label="Cidade"
                :rules="[v => !!v || 'Cidade é obrigatória']"
                required
              ></v-text-field>
              <v-select
                v-model="editedItem.estado"
                :items="estadosSiglas"
                label="Estado"
                :rules="[v => !!v || 'Estado é obrigatório']"
                required
              ></v-select>
              <v-text-field
                v-model="editedItem.pais"
                label="País"
                :rules="[v => !!v || 'País é obrigatório']"
                required
              ></v-text-field>

              <v-btn 
                type="submit" 
                color="primary" 
                :disabled="!valid"
              >
                Cadastrar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validarCPF } from '../utils/validarCPF'

export default {
  data() {
    return {
      valid: false,
      showPassword: false,
      confirmarSenha: '',
      estadosSiglas: [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
        'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
        'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
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
      errorMessage: '',
      showAlert: false
    };
  },
  methods: {
    validarCPF,
    async cadastrar() {
      // Validate form before submission
      if (this.$refs.registrationForm.validate()) {
        try {
          const response = await this.$axios.post("/usuario", this.editedItem);
          // Redirecione o usuário para a página de login (opcional)
          this.$router.push("/login"); 
        } catch (error) {
          // Exiba um alerta de erro
          this.errorMessage = error.response.data.message || "Erro ao criar usuário.";
          this.showAlert = true;
          console.error(error);
        }
      }
    },
  },
};
</script>