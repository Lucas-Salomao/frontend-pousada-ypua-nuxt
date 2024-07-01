<template>
    <div ref="chartContainer"></div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        dados: [],
      };
    },
    mounted() {
      this.buscarDados();
    },
    methods: {
      async buscarDados() {
        try {
          const response = await axios.get('http://localhost:3000/reservas'); 
          this.dados = response.data; 
          this.criarGrafico();
        } catch (error) {
          console.error(error);
        }
      },
      criarGrafico() {
        const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
  
        const svg = d3
          .select(this.$refs.chartContainer)
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
  
        // Escalas
        const x = d3.scaleBand().range([0, width]).padding(0.1);
        const y = d3.scaleLinear().range([height, 0]);
  
        // Eixos
        const xAxis = svg.append('g').attr('transform', `translate(0,${height})`);
        const yAxis = svg.append('g');
  
        // Configurar domínios das escalas
        x.domain(this.dados.map((d) => d.dataEntrada)); // Usando dataEntrada como exemplo
        y.domain([0, d3.max(this.dados, (d) => d.valorTotal)]);
  
        // Criar barras
        svg
          .selectAll('.bar')
          .data(this.dados)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => x(d.dataEntrada))
          .attr('width', x.bandwidth())
          .attr('y', (d) => y(d.valorTotal))
          .attr('height', (d) => height - y(d.valorTotal));
  
        // Desenhar eixos
        xAxis.call(d3.axisBottom(x));
        yAxis.call(d3.axisLeft(y));
      },
    },
  };
  </script>