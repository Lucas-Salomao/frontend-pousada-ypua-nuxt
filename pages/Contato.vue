<template>
  <v-container>
    <v-row>
      <v-alert
        v-model="showAlert"
        border="left"
        close-text="Close Alert"
        :type="alertType"
        :color="alertColor"
        dark
        dismissible
        shaped
        width="100%"
        >{{ errorMessage }}
      </v-alert>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="ma-4">
          <v-card-title class="headline">Contato</v-card-title>
          <v-card-text>
            <div>
              <iframe
                width="100%"
                height="500"
                style="border: 2"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                :src="`https://www.google.com/maps/embed/v1/place?key=${this.googleMapsApiKey}&q=Pousada+Quinta+do+Ypua,Laguna+SC`"
              >
              </iframe>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="ma-4">
          <v-card-title class="headline">Vamos Conversar?</v-card-title>
          <v-card-text>
            Entre em contato com a gente para informações sobre reservas,
            disponibilidade de datas, preços e outras dúvidas. Estaremos a
            disposição para atendê-lo e tornar a sua experiência com a pousada
            inesquecível.<br /><br />
            Estrada Ipua, nº 6 Laguna - SC | 88790-000<br />
            <strong>(48) 99940-9732 | pousadaquintadoypua@gmail.com</strong>
          </v-card-text>
          <v-form @submit.prevent="enviarEmail">
            <v-card-text>
              <v-text-field
                v-model="nome"
                :rules="nameRules"
                label="Nome"
              ></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
              ></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-text-field v-model="telefone" label="Telefone"></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-textarea
                v-model="mensagem"
                :rules="mensagemRules"
                :counter="200"
                label="Mensagem"
              ></v-textarea>
            </v-card-text>
            <v-card-text>
              <v-btn class="mt-2" type="submit" block>Enviar</v-btn>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      showAlert: false, // Controla a visibilidade do alerta
      errorMessage: "", // Armazena a mensagem de erro
      alertType:"error",
      alertColor:"red",
      googleMapsApiKey: null,
      valid: false,
      nome: "",
      nameRules: [
        (value) => {
          if (value) return true;

          return "Digite o nome e sobrenome";
        },
      ],
      email: "",
      emailRules: [
        (value) => {
          if (value) return true;

          return "Digite o e-mail";
        },
        (value) => {
          if (/.+@.+\..+/.test(value)) return true;

          return "E-mail deve ser válido";
        },
      ],
      mensagem: "",
      mensagemRules: [
        (value) => {
          if (value) return true;

          return "Digite a mensagem";
        },
      ],
      telefone: "",
    };
  },
  mounted() {
    this.getapikey();
  },
  methods: {
    async getapikey() {
      try {
        const response = await this.$axios.get("/maps/google-maps-key");
        this.googleMapsApiKey = response.data.apiKey;
      } catch (error) {
        this.errorMessage = error.response.data.message;
        this.alertColor="red";
        this.alertType="error";
        this.showAlert = true; // Ativa o alerta
        console.error("Erro ao obter a chave de API:", error);
      }
    },
    async enviarEmail() {
      try {
        // Envie os dados do formulário para o backend
        const response = await this.$axios.post("/email/sendemail", {
          nome: this.nome,
          email: this.email,
          telefone: this.telefone,
          mensagem: this.mensagem,
        });

        this.errorMessage = "E-mail enviado com sucesso";
        this.alertColor="green";
        this.alertType="success";
        this.showAlert = true;
        // Exiba uma mensagem de sucesso (opcional)
        console.log(response.data);
        // Limpe o formulário (opcional)
        this.nome = "";
        this.email = "";
        this.telefone = "";
        this.mensagem = "";
      } catch (error) {
        // Exiba um alerta de erro
        this.errorMessage = error.response.data || "Erro ao enviar email.";
        this.alertColor="red";
        this.alertType="error";
        this.showAlert = true;
        console.error(error);
      }
    },
  },
};
</script>
