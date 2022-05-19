import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TOUTIAO_USER = 'USER_TOKEN'

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem(TOUTIAO_USER))
  },
  getters: {},
  mutations: {
    setUser (state, user) {
      state.user = user
      window.localStorage.setItem(TOUTIAO_USER, JSON.stringify(user))
    }
  },
  actions: {},
  modules: {}
})
