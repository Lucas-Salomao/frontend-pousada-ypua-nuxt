<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Acomodações
            <v-spacer />
            <v-btn color="primary" @click="dialog = true">
              Nova Acomodação
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="acomodacoes"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.acoes="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
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
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.nome"
                  label="Nome"
                  required
                  prepend-icon="mdi-alphabetical-variant"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.numero"
                  label="Número"
                  type="number"
                  required
                  prepend-icon="mdi-numeric"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.categoria"
                  label="Categoria"
                  required
                ></v-text-field>
              </v-col> -->
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.capacidade"
                  label="Capacidade"
                  type="number"
                  required
                  prepend-icon="mdi-account-group"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.quantidadeCamas"
                  label="Quantidade de Camas"
                  type="number"
                  required
                  prepend-icon="mdi-bed"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.tipoCama"
                  label="Tipo de Cama"
                  required
                ></v-text-field>
              </v-col> -->

              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.tipoCama"
                  :items="tipoCamaOptions"
                  label="Tipo de Cama"
                  required
                  prepend-icon="mdi-bed-double-outline"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.tipoBanheiro"
                  :items="tipoBanheiroOptions"
                  label="Tipo de Banheiro"
                  required
                  prepend-icon="mdi-toilet"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comAcessibilidade" label="Acessibilidade" prepend-icon="mdi-wheelchair">
                </v-checkbox>
              </v-col>

              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="editedItem.comChuveiro"
                  label="Chuveiro"
                  prepend-icon="mdi-shower-head"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="editedItem.comBanheira"
                  label="Banheira"
                  prepend-icon="mdi-shower"
                ></v-checkbox>
              </v-col>
              <!-- <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comBide" label="Bidê">
                </v-checkbox>
              </v-col> -->

              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comToalhas" label="Toalhas" prepend-icon="mdi-hanger">
                </v-checkbox>
              </v-col>

              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comSecador" label="Secador" prepend-icon="mdi-hair-dryer">
                </v-checkbox>
              </v-col>

              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comCozinha" label="Cozinha" prepend-icon="mdi-stove">
                </v-checkbox>
              </v-col>

              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comRestaurante" label="Restaurante" prepend-icon="mdi-silverware-fork-knife">
                </v-checkbox>
              </v-col>

              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="editedItem.comArCondicionado"
                  label="Ar Condicionado"
                  prepend-icon="mdi-air-conditioner"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="editedItem.comAquecedor"
                  label="Aquecedor"
                  prepend-icon="mdi-heat-wave"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox v-model="editedItem.comTV" label="TV" prepend-icon="mdi-television">
                </v-checkbox>
              </v-col>
              <v-col cols="12" sm="6" v-if="editedItem.comTV">
                <v-text-field
                  v-model="editedItem.tamanhoTV"
                  label="Tamanho da TV (polegadas)"
                  type="number"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6" v-if="editedItem.comTV">
                <v-text-field
                  v-model="editedItem.canaisTV"
                  label="Canais de TV"
                ></v-text-field>
              </v-col> -->
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="editedItem.comWifi"
                  label="Wi-Fi"
                  prepend-icon="mdi-wifi"
                ></v-checkbox>
              </v-col>
              <!-- <v-col cols="12" sm="6" v-if="editedItem.comWifi">
                <v-text-field
                  v-model="editedItem.velocidadeWifi"
                  label="Velocidade do Wi-Fi"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" v-if="editedItem.comWifi">
                <v-checkbox
                  v-model="editedItem.wifiPago"
                  label="Wi-Fi Pago"
                ></v-checkbox>
              </v-col> -->
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="editedItem.comFrigobar"
                  label="Frigobar"
                  prepend-icon="mdi-fridge"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="editedItem.comCofre"
                  label="Cofre"
                  prepend-icon="mdi-safe"
                ></v-checkbox>
              </v-col>
              <!-- <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="editedItem.comTelefone"
                  label="Telefone"
                ></v-checkbox>
              </v-col> -->
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="editedItem.comVaranda"
                  label="Varanda"
                  prepend-icon="mdi-greenhouse"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.descricao"
                  label="Descrição"
                  rows="3"
                  required
                  counter
                  prepend-icon="mdi-text-box-multiple-outline"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.preco"
                  label="Preço"
                  prefix="R$"
                  type="number"
                  required
                  prepend-icon="mdi-cash"
                ></v-text-field>
              </v-col>

              <!-- Campo para Upload de Fotos -->
              <v-col cols="12">
                <v-file-input
                  v-model="fotos"
                  accept="image/*"
                  label="Fotos"
                  multiple
                  prepend-icon="mdi-image-multiple-outline"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-1" text @click="close">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      dialog: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'Número', value: 'numero' },
        { text: 'Capacidade', value: 'capacidade' },
        { text: 'Preço', value: 'preco' },
        { text: 'Ações', value: 'acoes', sortable: false },
      ],
      tipoBanheiroOptions: ['Privativo', 'Compartilhado'],
      tipoCamaOptions: ['Solteiro', 'Solteiro King','Beliche','Casal','Queen Size','King Size','Super King Size'],
      acomodacoes: [],
      editedIndex: -1,
      editedItem: {
        nome: '',
        numero: 0,
        // categoria: '',
        capacidade: 0,
        quantidadeCamas: 0,
        tipoCama: '',
        tipoBanheiro: '',
        comChuveiro: false,
        comBanheira: false,
        comToalhas: false,
        comSecador: false,
        comAcessibilidade: false,
        comCozinha: false,
        comRestaurante: false,
        // comBide: false,
        comArCondicionado: false,
        comAquecedor: false,
        comTV: false,
        tamanhoTV: 0,
        // canaisTV: '',
        comWifi: false,
        // velocidadeWifi: '',
        // wifiPago: false,
        comFrigobar: false,
        comCofre: false,
        // comTelefone: false,
        comVaranda: false,
        descricao: '',
        preco: 0.0,
      },
      defaultItem: {
        // ... valores padrão para os campos
      },
      fotos: [], // Array para armazenar as fotos selecionadas
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Nova Acomodação'
        : 'Editar Acomodação';
    },
  },
  mounted() {
    this.fetchAcomodacoes();
  },
  methods: {
    async fetchAcomodacoes() {
      try {
        const response = await this.$axios.get(`/acomodacao/`);
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
        this.fotos = []; // Limpa as fotos selecionadas
      });
    },
    async save() {
      // Cria um objeto FormData para enviar os dados
      const formData = new FormData();

      // Adiciona os dados da acomodação ao FormData
      for (const key in this.editedItem) {
        formData.append(key, this.editedItem[key]);
      }

      // Adiciona as fotos ao FormData
      for (let i = 0; i < this.fotos.length; i++) {
        formData.append('fotos', this.fotos[i]);
      }

      try {
        if (this.editedIndex > -1) {
          // Editar acomodação (incluindo fotos)
          const response = await this.$axios.put(
            `/acomodacao/${this.editedItem.id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          // Atualiza a acomodação na lista
          Object.assign(this.acomodacoes[this.editedIndex], response.data);
        } else {
          // Criar nova acomodação (incluindo fotos)
          const response = await this.$axios.post(`/acomodacao/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          // Adiciona a nova acomodação à lista
          this.acomodacoes.push(response.data);
        }
        this.close();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>