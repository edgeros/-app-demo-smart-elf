import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    devlist: []
  },
  mutations: {
    updateDevlist(state, devlist) {
      state.devlist = devlist
    }
  },
  getters: {
    getDeviceCount(state) {
      return state.devlist.length
    }
  },
  actions: {
  },
  modules: {
  }
})
