import Vue from 'vue'
import Vuex from 'vuex'
import CKEditor from "ckeditor4-vue";

Vue.use(CKEditor);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(63 81 181 / 0%), rgba(47 75 128)',
    barImage: '@assets/crio-bg.jpg',
    drawer: null,
    snackBar: {
      snackbar: false,
      text: '',
      type: ''
    },
    overlay: false,
    currentUser: {},
    allGlobalFridges: [{}],
    allFridgeTypes: [{}],
    notificationMsgs: []
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_SCRIM (state, payload) {
      state.barColor = payload
    },
    SHOW_SNACK_BAR (state, payload) {
      state.snackBar = payload
    },
    SHOW_OVER_LAY (state, payload) {
      state.overlay = payload
    },
    SET_CURRENT_USER (state, payload) {
      state.currentUser = payload;
    },
    SET_ALL_FRIDGES (state, payload) {
      state.allGlobalFridges = payload;
    },
    SET_FRIDGE_TYPES (state, payload) {
      state.allFridgeTypes = payload;
    },
    SET_NOTIFY_MSG (state, payload) {
      state.notificationMsgs = payload;
    }
  },
  actions: {

  },
})
