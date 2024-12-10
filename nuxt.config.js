import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Pousada Ypuã',
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  axios: {
    baseURL: process.env.VUE_APP_API_ENDPOINT
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token_acesso',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: false,
          autoFetch: false,
        },
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token_acesso' },
          user: false
        }
      }
    },
    redirect: {
      login: '/acessonegado',
      logout: '/login',
      home: '/',
      callback: false // Desativa o callback padrão
    }
  },

  router: {
    // middleware: ['auth']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    //customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        light: {
          primary: '#8B3232',     // Marrom avermelhado/bordô do logo e botões
          secondary: '#D4B996',   // Tom marrom claro (como na roupa de cama)
          accent: '#4A6741',      // Verde (como na parede)
          info: '#2196F3',        // Mantendo azul padrão para informações
          warning: '#FFC107',     // Amarelo padrão para avisos
          error: '#FF5252',       // Vermelho padrão para erros
          success: '#4CAF50',     // Verde padrão para sucesso
        },
        dark: {
          primary: '#A64452',     // Versão mais clara do bordô para modo escuro
          secondary: '#E5D3B3',   // Versão mais clara do marrom
          accent: '#5B824F',      // Versão mais clara do verde
          info: '#64B5F6',        // Azul mais claro para modo escuro
          warning: '#FFD54F',     // Amarelo mais claro para modo escuro
          error: '#FF5252',       // Mantendo vermelho para erros
          success: '#81C784',     // Verde mais claro para sucesso
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: {
    port: process.env.VUE_APP_PORT,
    host: '0.0.0.0'
  },
  env: {
    _apiEndpoint: process.env.VUE_APP_API_ENDPOINT,
    _merchantName: process.env.VUE_APP_PIX_MERCHANT_NAME,
    _merchantCity: process.env.VUE_APP_PIX_MERCHANT_CITY,
    _pixKey: process.env.VUE_APP_PIX_KEY,
    _pixEndpoint: process.env.VUE_APP_PIX_ENDPOINT,
  }
}
