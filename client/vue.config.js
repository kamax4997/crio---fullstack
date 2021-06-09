module.exports = {

  // publicPath: process.env.NODE_ENV === 'production'
  //   // ? '/crio'
  //   ? '/'
  //   : '/',
  // devServer: {
  //   publicPath: '',
  //   // publicPath: process.env.NODE_ENV === 'production'
  //   // ? '/test-crio/'
  //   // : '/',
  // },
  // productionSourceMap: false,
  // productionSourceMap: process.env.NODE_ENV != 'production',

  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8000',
        // target: 'http://localhost:8003',
        changeOrigin: true
      },
    }
  },


  transpileDependencies: ['vue-world-map', 'vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
