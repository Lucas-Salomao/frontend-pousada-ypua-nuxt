<template>
  <v-container fluid fill-height>
    <v-row>
      <v-alert
        v-model="showAlert"
        border="left"
        close-text="Close Alert"
        color="error"
        dark
        dismissible
        shaped
        width="100%"
        >{{ errorMessage }}
      </v-alert>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Relatórios</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Receita Total Mensal</v-card-title>
          <v-card-text>
            <v-sparkline
              v-if="custoMensal.length > 0"
              :labels="meses"
              :value="custoMensal"
              :gradient="gradient"
              :smooth="radius || false"
              :padding="padding"
              :line-width="width"
              :stroke-linecap="lineCap"
              :gradient-direction="gradientDirection"
              :fill="fill"
              :type="type"
              :auto-line-width="autoLineWidth"
              auto-draw
            ></v-sparkline>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Mês</th>
                    <th class="text-left">Receita</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in receitatotal" :key="item.mes">
                    <td>{{ item.mes }}</td>
                    <td>{{ item.receita }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

export default {
  middleware: 'auth',
  data() {
    return {
      showAlert: false, // Controla a visibilidade do alerta
      errorMessage: "", // Armazena a mensagem de erro
      width: 1,
      radius: 0,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],
      receitatotal: [], // Array para a receita total por mês
      meses: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      gradientDirection: "top",
      gradients,
      fill: false,
      type: "trend",
      autoLineWidth: false,

      dialog: false,
      menuDataEntrada: false,
      menuDataSaida: false,
      headers: [
        { text: "ID", value: "id", width: "auto" },
        { text: "Código", value: "codigo", width: "auto" },
        { text: "Usuário", value: "usuario", width: "auto" },
        { text: "Acomodação", value: "acomodacao", width: "auto" },
        { text: "Hóspedes", value: "hospedes", width: "auto" },
        { text: "Data Entrada", value: "dataEntrada", width: "auto" },
        { text: "Data Saída", value: "dataSaida", width: "auto" },
        { text: "Status", value: "status", width: "auto" },
        { text: "Valor Total", value: "valorTotal", width: "auto" },
        { text: "Ações", value: "acoes", sortable: false },
      ],
      custoMensal: [], // Array para armazenar o custo total de cada mês
      gradient: ["#FF0000", "#00FF00"], // Define o gradiente do sparkline
      reservas: [],
      usuarios: [],
      acomodacoes: [],
      hospedes: [],
      statusOptions: [
        "EM PROCESSAMENTO",
        "RESERVADO",
        "CANCELADO",
        "CONCLUIDO",
      ],
      editedIndex: -1,
      editedItem: {
        usuarioId: null,
        acomodacaoId: null,
        hospedeIds: [],
        dataEntrada: new Date().toISOString().substr(0, 10),
        dataSaida: new Date().toISOString().substr(0, 10),
        status: "EM PROCESSAMENTO",
        valorTotal: 0,
      },
      defaultItem: {
        usuarioId: null,
        acomodacaoId: null,
        hospedeIds: [],
        dataEntrada: new Date().toISOString().substr(0, 10),
        dataSaida: new Date().toISOString().substr(0, 10),
        status: "EM PROCESSAMENTO",
        valorTotal: 0,
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nova Reserva" : "Editar Reserva";
    },
  },
  mounted() {
    this.fetchReservas();
    this.fetchUsuarios();
    this.fetchAcomodacoes();
    this.fetchHospedes();
    //this.calcularCustoMensal(); // Chama a função para calcular o custo mensal
  },
  methods: {
    async fetchReservas() {
      try {
        const response = await this.$axios.get("/reserva");
        this.reservas = response.data;
        this.calcularCustoMensal();
      } catch (error) {
        this.errorMessage = error.response.data.message;
        this.showAlert = true; // Ativa o alerta
        console.error(error);
      }
    },
    async fetchUsuarios() {
      try {
        const response = await this.$axios.get("/usuario");
        this.usuarios = response.data;
      } catch (error) {
        this.errorMessage = error.response.data.message;
        this.showAlert = true; // Ativa o alerta
        console.error(error);
      }
    },
    async fetchAcomodacoes() {
      try {
        const response = await this.$axios.get("/acomodacao");
        this.acomodacoes = response.data;
      } catch (error) {
        this.errorMessage = error.response.data.message;
        this.showAlert = true; // Ativa o alerta
        console.error(error);
      }
    },
    async fetchHospedes() {
      try {
        const response = await this.$axios.get("/hospede");
        this.hospedes = response.data;
      } catch (error) {
        this.errorMessage = error.response.data.message;
        this.showAlert = true; // Ativa o alerta
        console.error(error);
      }
    },
    editItem(item) {
      this.editedIndex = this.reservas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.reservas.indexOf(item);
      confirm("Tem certeza de que deseja excluir esta reserva?") &&
        this.$axios
          .delete(`/reserva/${item.id}`)
          .then(() => {
            this.reservas.splice(index, 1);
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message;
            this.showAlert = true; // Ativa o alerta
            console.error(error);
          });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        // Atualizar reserva existente
        this.$axios
          .put(`/reserva/${this.editedItem.id}`, {
            // Envie os dados necessários para a API, incluindo usuarioId, acomodacaoId, hospedeIds, etc.
            ...this.editedItem,
          })
          .then(() => {
            Object.assign(this.reservas[this.editedIndex], this.editedItem);
            this.close();
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message;
            this.showAlert = true; // Ativa o alerta
            console.error(error);
          });
      } else {
        // Criar nova reserva
        this.$axios
          .post("/reserva", {
            // Envie os dados necessários para a API, incluindo usuarioId, acomodacaoId, hospedeIds, etc.
            ...this.editedItem,
          })
          .then((response) => {
            this.reservas.push(response.data);
            this.close();
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message;
            this.showAlert = true; // Ativa o alerta
            console.error(error);
          });
      }
    },
    calcularCustoMensal() {
      const custoMensal = Array(12).fill(0); // Inicializa o array com 12 meses com custo 0
      this.receitatotal = []; // Limpa a receita total antes de calcular
      const dataAtual = new Date();
      const anoAtual = dataAtual.getFullYear();
      const labels = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];

      // 1. Inicializa receitatotal com todos os meses e receita 0:
      labels.forEach((mes, index) => {
        this.receitatotal.push({ mes: mes, receita: 0 });
      });

      // 2. Percorre as reservas e soma as receitas aos meses correspondentes:
      this.reservas.forEach((reserva) => {
        const dataEntrada = new Date(reserva.dataEntrada);
        const mesEntrada = dataEntrada.getMonth();
        const anoEntrada = dataEntrada.getFullYear();

        if (anoEntrada === anoAtual) {
          custoMensal[mesEntrada] += reserva.valorTotal;
          this.receitatotal[mesEntrada].receita += reserva.valorTotal; // Soma a receita ao mês já existente
        }
      });
      this.custoMensal = custoMensal; // Atualiza o array custoMensal
    },
  },
};
</script>
