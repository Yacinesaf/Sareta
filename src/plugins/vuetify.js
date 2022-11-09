import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#21331D',
      },
      dark: {
        primary: '#8FA651',

      },
    },
  },
})

export default vuetify