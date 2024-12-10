<template>
  <v-card>
    <v-card-title>
      Reservar {{ acomodacao.nome }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <!-- Campo Data de Entrada -->
        <v-menu v-model="menuEntrada" :close-on-content-click="false" transition="scale-transition" offset-y
          min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="dataEntradaFormatada" label="Data de Entrada" prepend-icon="mdi-calendar" readonly
              v-bind="attrs" v-on="on" :rules="[v => !!v || 'Data de Entrada é obrigatória']"
              color="white"></v-text-field>
          </template>
          <v-date-picker v-model="reserva.dataEntrada" @input="menuEntrada = false" @change="calcularValorTotal"
            :min="dataMinima" color="primary" locale="pt-BR"></v-date-picker>
        </v-menu>

        <!-- Campo Data de Saída -->
        <v-menu v-model="menuSaida" :close-on-content-click="false" transition="scale-transition" offset-y
          min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="dataSaidaFormatada" label="Data de Saída" prepend-icon="mdi-calendar" readonly
              v-bind="attrs" v-on="on" :rules="[v => !!v || 'Data de Saída é obrigatória']"
              color="white"></v-text-field>
          </template>
          <v-date-picker v-model="reserva.dataSaida" @input="menuSaida = false" @change="calcularValorTotal"
            :min="dataMinimaSaida" color="primary" locale="pt-BR"></v-date-picker>
        </v-menu>

        <v-alert type="info" v-if="valorTotal > 0">
          Valor Total: {{ valorTotal | formatCurrency }} <br> OBS.: Valor somente referente as diárias.<br>Tarifas e
          tributos
          podem ser cobradas no momento do check-in.
        </v-alert>
        <v-alert type="error" v-else>
          Selecione as datas para calcular o valor total
        </v-alert>

        <!-- Novo bloco de informações de Pagamento Pix -->
        <v-expand-transition>
          <div v-if="pixTransaction" class="mt-4">
            <v-card outlined>
              <v-card-title class="subtitle-1">
                Pagamento via Pix
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field readonly label="Código Pix" :value="pixTransaction.brCode"
                      append-icon="mdi-content-copy" @click:append="copiarCodigoPix"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="text-center">
                    <img v-if="pixTransaction.qrCodeImage" :src="pixTransaction.qrCodeImage" alt="QR Code Pix"
                      class="qr-code-image" />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>
        </v-expand-transition>

      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-if="!mostrarBotaoFechar" color="red darken-1" text @click="cancelar">Cancelar</v-btn>
      <v-btn v-if="!mostrarBotaoFechar" color="green darken-1" text @click="criarReservaEPix" :disabled="!valid">Reservar</v-btn>
      <v-btn v-else color="primary" text @click="fecharModal">Fechar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    acomodacao: Object,
    usuarioId: String,
  },
  filters: {
    formatCurrency(value) {
      if (!value) return 'R$ 0,00';
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    }
  },
  data() {
    return {
      reserva: {
        usuarioId: null,
        acomodacaoId: this.acomodacao.id,
        hospedeIds: [],
        dataEntrada: null,
        dataSaida: null,
        valorTotal: null,
        status: 'EM PROCESSAMENTO',
      },
      hospedes: [],
      valid: false,
      valorTotal: "0.00",
      menuEntrada: false,
      menuSaida: false,
      pixTransaction: null, // Novo campo para armazenar a transação Pix
      mostrarBotaoFechar: false,
      endpointPix:"https://pix-1045904631112.us-central1.run.app",
    };
  },
  computed: {
    dataMinima() {
      const hoje = new Date();
      return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    },
    dataMinimaSaida() {
      // Retorna a data de entrada ou a data atual, o que for maior
      return this.reserva.dataEntrada || this.dataMinima;
    },
    dataEntradaFormatada: {
      get() {
        if (!this.reserva.dataEntrada) return '';
        return this.formatarData(this.reserva.dataEntrada);
      },
      set(value) {
        this.reserva.dataEntrada = value;
      }
    },
    dataSaidaFormatada: {
      get() {
        if (!this.reserva.dataSaida) return '';
        return this.formatarData(this.reserva.dataSaida);
      },
      set(value) {
        this.reserva.dataSaida = value;
      }
    }
  },
  methods: {
    copiarCodigoPix() {
      if (this.pixTransaction && this.pixTransaction.brCode) {
        navigator.clipboard.writeText(this.pixTransaction.brCode)
          .then(() => {
            this.$toast.success('Código Pix copiado com sucesso!');
          })
          .catch(err => {
            console.error('Erro ao copiar código Pix:', err);
            this.$toast.error('Erro ao copiar código Pix');
          });
      }
    },

    formatarData(data) {
      if (!data) return '';
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano}`;
    },
    calcularValorTotal() {
      if (this.reserva.dataEntrada && this.reserva.dataSaida) {
        const dataEntrada = new Date(this.reserva.dataEntrada);
        const dataSaida = new Date(this.reserva.dataSaida);
        const diffTime = Math.abs(dataSaida - dataEntrada);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diarias = diffDays > 0 ? diffDays : diffDays + 1;

        this.valorTotal = (diarias) * this.acomodacao.preco;
        this.reserva.valorTotal = this.valorTotal.toFixed(2);
      } else {
        this.valorTotal = 0;
        this.reserva.valorTotal = "0.00";
      }
    },
    // async criarReserva() {
    //   if (this.$refs.form.validate()) {
    //     const dataEntrada = new Date(this.reserva.dataEntrada);
    //     const dataSaida = new Date(this.reserva.dataSaida);
    //     const diffTime = Math.abs(dataSaida - dataEntrada);
    //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //     const diarias = diffDays > 0 ? diffDays : diffDays + 1;
    //     this.reserva.valorTotal = this.valorTotal.toFixed(2);

    //     try {
    //       const usuarioResponse = await this.$axios.get(`/usuario/${this.usuarioId}`);
    //       const usuario = usuarioResponse.data.usuario;

    //       let hospede;
    //       try {
    //         const hospedeResponse = await this.$axios.get(`/hospede/email/${usuario.email}`);
    //         hospede = hospedeResponse.data;
    //       } catch (error) {
    //         if (error.response && error.response.status === 404) {
    //           const novoHospede = {
    //             nome: usuario.nome,
    //             email: usuario.email,
    //             cpf: usuario.cpf,
    //             rg: usuario.rg,
    //             rua: usuario.rua,
    //             numero: usuario.numero,
    //             complemento: usuario.complemento,
    //             bairro: usuario.bairro,
    //             cidade: usuario.cidade,
    //             estado: usuario.estado,
    //             pais: usuario.pais
    //           };
    //           const criarHospedeResponse = await this.$axios.post("/hospede", novoHospede);
    //           hospede = criarHospedeResponse.data;
    //         } else {
    //           throw error;
    //         }
    //       }
    //       this.reserva.hospedeIds = [hospede.id];
    //       this.reserva.usuarioId=this.usuarioId;
    //       const reservaResponse = await this.$axios.post("/reserva", this.reserva);
    //       this.$emit('reserva-criada', reservaResponse.data);
    //       this.$emit('close');
    //     } catch (error) {
    //       console.error("Erro ao criar reserva:", error);
    //     }
    //   }
    // },

    // Método modificado para criar reserva e transação Pix
    async criarReservaEPix() {
      if (this.$refs.form.validate()) {
        try {
          // Primeiro, obtém o usuário
          const usuarioResponse = await this.$axios.get(`/usuario/${this.usuarioId}`);
          const usuario = usuarioResponse.data.usuario;

          // Verifica/cria hospede
          let hospede;
          try {
            const hospedeResponse = await this.$axios.get(`/hospede/email/${usuario.email}`);
            hospede = hospedeResponse.data;
          } catch (error) {
            if (error.response && error.response.status === 404) {
              const novoHospede = {
                nome: usuario.nome,
                email: usuario.email,
                cpf: usuario.cpf,
                rg: usuario.rg,
                rua: usuario.rua,
                numero: usuario.numero,
                complemento: usuario.complemento,
                bairro: usuario.bairro,
                cidade: usuario.cidade,
                estado: usuario.estado,
                pais: usuario.pais
              };
              const criarHospedeResponse = await this.$axios.post("/hospede", novoHospede);
              hospede = criarHospedeResponse.data;
            } else {
              throw error;
            }
          }

          // Cria a reserva
          this.reserva.hospedeIds = [hospede.id];
          this.reserva.usuarioId = this.usuarioId;
          const reservaResponse = await this.$axios.post("/reserva", this.reserva);
          const reserva = reservaResponse.data;

          // Cria a transação Pix
          const pixData = {
            merchantName: process.env.VUE_APP_PIX_MERCHANT_NAME,
            merchantCity: process.env.VUE_APP_PIX_MERCHANT_CITY,
            pixKey: process.env.VUE_APP_PIX_KEY,
            transactionAmount: this.valorTotal,
            infoAdicional: `Reserva ${reserva.id}`
          };

          endpointPix="https://pix-1045904631112.us-central1.run.app";

          const pixResponse = await this.$axios.post(endpointPix, pixData);
          this.pixTransaction = pixResponse.data;
          
          this.mostrarBotaoFechar = true;
          // Emite eventos para notificar o componente pai
          this.$emit('reserva-criada', reservaResponse.data);
          this.$emit('pix-gerado', this.pixTransaction);
        } catch (error) {
          console.error("Erro ao criar reserva ou transação Pix:", error);
          this.$toast.error('Erro ao processar reserva e pagamento');
        }
      }
    },

    resetForm() {
      this.reserva = {
        usuarioId: null,
        acomodacaoId: this.acomodacao.id,
        hospedeIds: [],
        dataEntrada: null,
        dataSaida: null,
        valorTotal: "0.00",
        status: 'EM PROCESSAMENTO',
      };
      this.valorTotal = 0;
      this.valid = false;
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
      this.menuEntrada = false;
      this.menuSaida = false;
      this.pixTransaction = null;
    },
    cancelar() {
      this.resetForm();
      this.$emit('close');
    },
    fecharModal() {
      this.resetForm(); // Limpa o formulário
      this.$emit('close');
    },
  },
  watch: {
    visible(newVal) {
      if (!newVal) {
        this.resetForm(); // Reseta ao fechar
      }
    },
  },
};
</script>

<style scoped>
.qr-code-image {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
}
</style>