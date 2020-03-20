import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {user},
  getters: {
    token: state => state.user.token,
    userName: state => state.user.name,
    userId: state => state.user.id,
    userInfo: state => state.user.info
  }
})