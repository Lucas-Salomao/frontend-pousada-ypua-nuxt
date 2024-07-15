<template>
  <!-- <v-card height="400px"> -->
    <v-footer app v-bind="localAttrs" :padless="padless">
      <v-card flat tile width="100%" class=" primary text-center">
        <v-card-text class="py-2 white--text">
            <v-btn v-for="(item, index) in externalLinks" :key="index" class="mx-4" icon :href="item.url" target="_blank">
                <v-icon size="24px">{{ item.icon }}</v-icon> 
          </v-btn>
        </v-card-text>
        <v-card-text class="py-2 white--text">
          {{ new Date().getFullYear() }} —
          <strong>© Pousada Quinta do Ypuã</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script>
export default {
  data: () => ({
    externalLinks: [
      { url: 'https://api.whatsapp.com/send?phone=5548999409732&text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%20da%20pousada%20e%20tenho%20interesse%20em%20saber%20mais%20informa%C3%A7%C3%B5es.', icon: 'mdi-whatsapp' },
      { url: 'mailto:pousadaquintadoypua@gmail.com', icon: 'mdi-email' },
      { url: 'https://www.facebook.com/pousadaquintadoypua', icon: 'mdi-facebook' },
      { url: 'http://instagram.com/pousadaquintadoypua', icon: 'mdi-instagram' }, 
      // Adicione mais links aqui...
    ],
    items: ["default", "absolute", "fixed"],
    padless: true,
    variant: "fixed",
  }),
  computed: {
    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    },
  },
};
</script>
