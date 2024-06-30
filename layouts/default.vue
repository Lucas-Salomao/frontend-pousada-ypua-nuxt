<template>
    <v-app>
      <Navbar />
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import Navbar from "../components/Navbar.vue"
  
  export default {
    components: {
      Navbar,
    },
  };
  </script>
  