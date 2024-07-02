<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Acomodações
            <v-spacer />
            <v-btn color="primary" @click="dialog = true">Nova Acomodação</v-btn>
          </v-card-title>
          <v-data-table :headers="headers" :items="acomodacoes" :items-per-page="5" class="elevation-1">
            <template v-slot:item.acoes="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Características Gerais -->
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.nome" label="Nome" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.numero" label="Número" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.categoria" label="Categoria" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.capacidade" label="Capacidade" type="number" required></v-text-field>
              </v-col>

              <!-- Características das Camas -->
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.quantidadeCamas" label="Quantidade de Camas" type="number"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.tipoCama" label="Tipo de Cama" required></v-text-field>
              </v-col>

              <!-- Características do Banheiro -->
              <v-col cols="12" sm="6">
                <v-select v-model="editedItem.tipoBanheiro" :items="tipoBanheiroOptions" label="Tipo de Banheiro"
                  required></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comChuveiro" label="Chuveiro"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comBanheira" label="Banheira"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comBide" label="Bidê"></v-checkbox>
              </v-col>

              <!-- Comodidades Adicionais -->
              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comArCondicionado" label="Ar Condicionado"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comAquecedor" label="Aquecedor"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comTV" label="TV"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6" v-if="editedItem.comTV">
                <v-text-field v-model="editedItem.tamanhoTV" label="Tamanho da TV (polegadas)"
                  type="number"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" v-if="editedItem.comTV">
                <v-text-field v-model="editedItem.canaisTV" label="Canais de TV"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comWifi" label="Wi-Fi"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6" v-if="editedItem.comWifi">
                <v-text-field v-model="editedItem.velocidadeWifi" label="Velocidade do Wi-Fi"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" v-if="editedItem.comWifi">
                <v-checkbox v-model="editedItem.wifiPago" label="Wi-Fi Pago"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comMiniBar" label="Mini Bar"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comCofre" label="Cofre"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comTelefone" label="Telefone"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comVaranda" label="Varanda"></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedItem.vista" label="Vista" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.preco" label="Preço" prefix="R$" type="number"
                  required></v-text-field>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_ENDPOINT,
});

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'Número', value: 'numero' },
        { text: 'Categoria', value: 'categoria' },
        { text: 'Preço', value: 'preco' },
        { text: 'Ações', value: 'acoes', sortable: false },
      ],
      tipoBanheiroOptions: ['Privativo', 'Compartilhado'],
      acomodacoes: [],
      editedIndex: -1,
      editedItem: {
        nome: '',
        numero: 0,
        categoria: '',
        capacidade: 0,
        quantidadeCamas: 0,
        tipoCama: '',
        tipoBanheiro: '',
        comChuveiro: false,
        comBanheira: false,
        comBide: false,
        comArCondicionado: false,
        comAquecedor: false,
        comTV: false,
        tamanhoTV: 0,
        canaisTV: '',
        comWifi: false,
        velocidadeWifi: '',
        wifiPago: false,
        comMiniBar: false,
        comCofre: false,
        comTelefone: false,
        comVaranda: false,
        vista: '',
        preco: 0.0,
      },
      defaultItem: {
        // ... valores padrão para os campos
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nova Acomodação' : 'Editar Acomodação';
    },
  },
  mounted() {
    this.fetchAcomodacoes();
  },
  methods: {
    async fetchAcomodacoes() {
      try {
        const response = await api.get(`/acomodacao/`);
        this.acomodacoes = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    editItem(item) {
      this.editedIndex = this.acomodacoes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.acomodacoes.indexOf(item);
      confirm('Tem certeza que deseja excluir esta acomodação?') &&
        api
          .delete(`/acomodacao/${item.id}`)
          .then(() => {
            this.acomodacoes.splice(index, 1);
          })
          .catch((error) => {
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
        // Editar acomodação
        api
          .put(`/acomodacao/${this.editedItem.id}`, this.editedItem)
          .then(() => {
            Object.assign(this.acomodacoes[this.editedIndex], this.editedItem);
            this.close();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Criar nova acomodação
        api
          .post(`/acomodacao/`, this.editedItem)
          .then((response) => {
            this.acomodacoes.push(response.data);
            this.close();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>