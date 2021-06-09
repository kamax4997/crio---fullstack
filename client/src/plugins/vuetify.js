import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '@/i18n'
import '@/sass/overrides.sass'

Vue.use(Vuetify);
/*Vue.use(Vuetify, {
  options: {
    customProperties: true
  }
})*/

const theme = {
  primary: '#46ad48',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
  /*primary: '#97C0E0',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',*/
};

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    // light: true,
    themes: {
      dark: theme,
      light: theme,
    },
    // options: { customProperties: true },
  },
})
