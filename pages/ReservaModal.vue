<template>
    <v-card>
      <v-card-title>
        Reservar {{ acomodacao.nome }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-autocomplete
            v-model="reserva.hospedeIds"
            :items="hospedes"
            item-text="nome"
            item-value="id"
            label="Hóspedes"
            multiple
            chips
            required
            :rules="[v => v.length > 0 || 'Selecione pelo menos um hóspede']"
          />
          <v-text-field
            v-model="reserva.dataEntrada"
            label="Data de Entrada"
            type="date"
            required
            :rules="[v => !!v || 'Data de Entrada é obrigatória']"
          ></v-text-field>
          <v-text-field
            v-model="reserva.dataSaida"
            label="Data de Saída"
            type="date"
            required
            :rules="[v => !!v || 'Data de Saída é obrigatória']"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="green darken-1" text @click="criarReserva" :disabled="!valid">Reservar</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      visible: Boolean,
      acomodacao: Object,
      usuarioEmail: String,
      usuarioNome: String,
    },
    data() {
      return {
        reserva: {
          usuarioId: null,
          acomodacaoId: this.acomodacao.id,
          hospedeIds: [],
          dataEntrada: null,
          dataSaida: null,
          status: 'EM PROCESSAMENTO', // Valor padrão
        },
        hospedes: [],
        valid: false
      };
    },
    async mounted() {
      await this.fetchHospedes();
      if (this.usuarioEmail && this.usuarioNome) {
        const novoHospede = {
          nome: this.usuarioNome,
          email: this.usuarioEmail,
          // ... outros campos do hospede, se necessário ...
        };
        try {
          const response = await this.$axios.post("/hospede/", novoHospede);
          this.hospedes.push(response.data);
          this.reserva.hospedeIds.push(response.data.id);
        } catch (error) {
          console.error("Erro ao criar hóspede:", error);
          // Trate o erro adequadamente (ex: alerta para o usuário)
        }
      }
    },
    methods: {
      async fetchHospedes() {
        try {
          const response = await this.$axios.get("/hospede");
          this.hospedes = response.data;
        } catch (error) {
          console.error(error);
          // Lide com o erro de busca de hóspedes (ex: alerta)
        }
      },
      criarReserva() {
        if (this.$refs.form.validate()) {
          this.$axios.post("/reserva", this.reserva)
            .then((response) => {
              this.$emit('reserva-criada', response.data);
            })
            .catch((error) => {
              console.error("Erro ao criar reserva:", error);
              // Trate o erro de criação de reserva (ex: alerta)
            });
        }
      },
    },
    watch: {
      visible(newVal) {
        if (!newVal) {
          this.$emit('close');
        }
      },
    },
  };
  </script>