<template>
  <container>
    <v-row>
      <v-alert
        v-model="showAlert"
        border="left"
        close-text="Close Alert"
        color="error"
        dark
        dismissible
        shaped
        >{{ errorMessage }}
      </v-alert>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="headline">Contato</v-card-title>
          <div>
            <iframe
              width="100%"
              height="500"
              style="border: 0"
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              :src="`https://www.google.com/maps/embed/v1/place?key=${this.googleMapsApiKey}&q=Pousada+Quinta+do+Ypua,Laguna+SC`"
            >
            </iframe>
          </div>
        </v-card>
        <v-card>
          <v-card-title class="headline">Vamos Conversar?</v-card-title>
          <v-card-text>
            Entre em contato com a gente para informações sobre reservas,
            disponibilidade de datas, preços e outras dúvidas. Estaremos a
            disposição para atendê-lo e tornar a sua experiência com a pousada
            inesquecível.<br /><br />
            Estrada Ipua, nº 6 Laguna - SC | 88790-000<br />
            <strong>(48) 99940-9732 | pousadaquintadoypua@gmail.com</strong>
          </v-card-text>
          <v-form @submit.prevent>
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
              <v-text-field
                v-model="telefone"
                label="Telefone"
              ></v-text-field>
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
  </container>
</template>

<script>
import axios from 'axios'; // Importe o axios

export default {
  data: () => ({
    showAlert: false, // Controla a visibilidade do alerta
    errorMessage: "", // Armazena a mensagem de erro
    googleMapsApiKey: null,
    valid: false,
    nome: "",
    nameRules: [
      (value) => {
        if (value) return true;

        return "Digite o nome e sobrenome";
      },
      (value) => {
        if (value?.length <= 10) return true;

        return "Precisa conter 10 ou mais caracteres";
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
    telefone: '',
  }),
  async mounted() {
    try {
      const response = await axios.get('/maps/google-maps-key');
      this.googleMapsApiKey = response.data.apiKey;
      console.log(this.googleMapsApiKey);
    } catch (error) {
      this.errorMessage =error.response.data.message
      this.showAlert = true; // Ativa o alerta
      console.error('Erro ao obter a chave de API:', error);
    }
  },
};
</script>
