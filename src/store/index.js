import Vue from 'vue'
import Vuex from 'vuex'

import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const TOUTIAO_USER = 'USER_TOKEN'

export default new Vuex.Store({
  state: {
    user: getItem(TOUTIAO_USER)
  },
  getters: {},
  mutations: {
    setUser (state, user) {
      state.user = user
      setItem(TOUTIAO_USER, state.user)
      // window.localStorage.setItem(TOUTIAO_USER, JSON.stringify(user))
    }
  },
  actions: {},
  modules: {}
})
