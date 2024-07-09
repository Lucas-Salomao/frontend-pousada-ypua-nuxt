<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Reservas
            <v-spacer />
            <v-btn color="primary" @click="dialog = true">Nova Reserva</v-btn>
          </v-card-title>
          <v-data-table :headers="headers" :items="reservas" :items-per-page="5" class="elevation-1">
            <template v-slot:item.usuario="{ item }">
              {{ item.usuario.nome }}
            </template>
            <template v-slot:item.hospedes="{ item }">
              <span v-for="hospede in item.hospedes" :key="hospede.id">
                {{ hospede.nome }}<br>
              </span>
            </template>
            <template v-slot:item.acomodacao="{ item }">
              {{ item.acomodacao.nome }} (Número: {{ item.acomodacao.numero }})
            </template>
            <template v-slot:item.acoes="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select v-model="editedItem.usuarioId" :items="usuarios" item-text="nome" item-value="id"
                  label="Usuário" required></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="editedItem.acomodacaoId" :items="acomodacoes" item-text="nome" item-value="id"
                  label="Acomodação" required></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu ref="menuDataEntrada" v-model="menuDataEntrada" :close-on-content-click="false"
                  :return-value.sync="editedItem.dataEntrada" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="editedItem.dataEntrada" label="Data de Entrada" readonly v-bind="attrs"
                      v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="editedItem.dataEntrada" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menuDataEntrada = false">
                      Cancelar
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menuDataEntrada.save(editedItem.dataEntrada)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu ref="menuDataSaida" v-model="menuDataSaida" :close-on-content-click="false"
                  :return-value.sync="editedItem.dataSaida" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="editedItem.dataSaida" label="Data de Saída" readonly v-bind="attrs"
                      v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="editedItem.dataSaida" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menuDataSaida = false">
                      Cancelar
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menuDataSaida.save(editedItem.dataSaida)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="editedItem.status" :items="statusOptions" label="Status" required></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.valorTotal" label="Valor Total" type="number" prefix="R$"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete v-model="editedItem.hospedeIds" :items="hospedes" item-text="nome" item-value="id"
                  label="Hóspedes" multiple chips></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="save">Salvar</v-btn>
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
      menuDataEntrada: false,
      menuDataSaida: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Código', value: 'codigo' },
        { text: 'Usuário', value: 'usuario' },
        { text: 'Acomodação', value: 'acomodacao' },
        { text: 'Hóspedes', value: 'hospedes' },
        { text: 'Data Entrada', value: 'dataEntrada' },
        { text: 'Data Saída', value: 'dataSaida' },
        { text: 'Status', value: 'status' },
        { text: 'Valor Total', value: 'valorTotal' },
        { text: 'Ações', value: 'acoes', sortable: false },
      ],
      reservas: [],
      usuarios: [],
      acomodacoes: [],
      hospedes: [],
      statusOptions: ['EM_PROCESSAMENTO', 'RESERVADO', 'CANCELADO', 'CONCLUIDO'],
      editedIndex: -1,
      editedItem: {
        usuarioId: null,
        acomodacaoId: null,
        hospedeIds: [],
        dataEntrada: new Date().toISOString().substr(0, 10),
        dataSaida: new Date().toISOString().substr(0, 10),
        status: 'EM_PROCESSAMENTO',
        valorTotal: 0,
      },
      defaultItem: {
        usuarioId: null,
        acomodacaoId: null,
        hospedeIds: [],
        dataEntrada: new Date().toISOString().substr(0, 10),
        dataSaida: new Date().toISOString().substr(0, 10),
        status: 'EM_PROCESSAMENTO',
        valorTotal: 0,
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nova Reserva' : 'Editar Reserva';
    },
  },
  mounted() {
    this.fetchReservas();
    this.fetchUsuarios();
    this.fetchAcomodacoes();
    this.fetchHospedes();
  },
  methods: {
    async fetchReservas() {
      try {
        const response = await api.get('/reserva');
        this.reservas = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUsuarios() {
      try {
        const response = await api.get('/usuario');
        this.usuarios = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchAcomodacoes() {
      try {
        const response = await api.get('/acomodacao');
        this.acomodacoes = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchHospedes() {
      try {
        const response = await api.get('/hospede');
        this.hospedes = response.data;
      } catch (error) {
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
      confirm('Tem certeza de que deseja excluir esta reserva?') &&
        api
          .delete(`/reserva/${item.id}`)
          .then(() => {
            this.reservas.splice(index, 1);
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
        // Atualizar reserva existente
        api
          .put(`/reserva/${this.editedItem.id}`, {
            // Envie os dados necessários para a API, incluindo usuarioId, acomodacaoId, hospedeIds, etc.
            ...this.editedItem
          })
          .then(() => {
            Object.assign(this.reservas[this.editedIndex], this.editedItem);
            this.close();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Criar nova reserva
        api
          .post('/reserva', {
            // Envie os dados necessários para a API, incluindo usuarioId, acomodacaoId, hospedeIds, etc.
            ...this.editedItem
          })
          .then((response) => {
            this.reservas.push(response.data);
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