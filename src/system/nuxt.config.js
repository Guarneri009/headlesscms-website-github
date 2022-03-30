import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 3006, // デフォルト: 3000
    host: 'localhost', // デフォルト: localhost
  },
  mode: 'spa',
  router: {
    base: '/v1',
    middleware: 'cognitoAuth',
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      { 'http-equiv': 'cache-control', content: 'max-age=0' },
      { 'http-equiv': 'cache-control', content: 'no-cache' },
      { 'http-equiv': 'expires', content: '0' },
      { 'http-equiv': 'expires', content: 'Tue, 01 Jan 1980 1:00:00 GMT' },
      { 'http-equiv': 'pragma', content: 'no-cache, no-store' },
    ],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/ui.js' },
    { src: '~/plugins/amplify.js', ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    //axios単体ではファイル毎にimportでaxiosを読み込んでいましたが、nuxtjs/axiosの場合はcontextを利用してaxiosを使います。
    //axiosの記述方法ですがaxios.getからcontext.$axios.$getに変更になります。context.$axios.$getに変更するとresponseではなく直接response.dataが戻されます。
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
  ],
  markdownit: {
    runtime: true,
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */ axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
  },
  serverMiddleware: ['~/api/index.js'],
}
