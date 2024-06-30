<template>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Relatórios</v-card-title>
            <v-card-text>
              <v-btn color="primary" @click="gerarRelatorioOcupacoes">
                Gerar Relatório de Ocupações
              </v-btn>
              <v-btn color="secondary" @click="gerarRelatorioReservas">
                Gerar Relatório de Reservas
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  import axios from 'axios';
  
  export default {
    methods: {
      async gerarRelatorioOcupacoes() {
        try {
          const response = await axios.get('http://localhost:3000/acomodacoes');
          const doc = new jsPDF();
          doc.autoTable({ html: '#ocupacao-table' }); // Substitua pelo ID da sua tabela HTML
          doc.save('relatorio-ocupacoes.pdf');
        } catch (error) {
          console.error(error);
        }
      },
      async gerarRelatorioReservas() {
        try {
          const response = await axios.get('http://localhost:3000/reservas');
          const doc = new jsPDF();
  
          const data = response.data.map((reserva) => [
            reserva.id,
            reserva.codigo,
            reserva.dataEntrada,
            reserva.dataSaida,
            reserva.status,
            reserva.valorTotal,
          ]);
  
          doc.autoTable({
            head: [['ID', 'Código', 'Data Entrada', 'Data Saída', 'Status', 'Valor Total']],
            body: data,
          });
  
          doc.save('relatorio-reservas.pdf');
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  