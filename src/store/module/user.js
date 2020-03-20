import Vue from 'vue'
import {getUserInfo, getUserId} from '../../api/qywx'

const user = {
  state: {
    id: '',
    name: '',
    info: {}
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 获取用户ID
    GetUserId({dispatch, commit}, code) {
      return new Promise((resolve, reject) => {
        getUserId(code).then(res => {
          const d = res.data

          // 获取用户信息
          dispatch('GetUserInfo', d.userId)
          resolve(d)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({commit}, id) {
      return new Promise((resolve, reject) => {
        getUserInfo(id).then(res => {
          const d = res.data
          Vue.ls.set('userId', id, 24 * 3600 * 1000)
          commit('SET_ID', id)
          commit('SET_NAME', d.userName)
          commit('SET_INFO', d)
          resolve(d)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({commit}) {
      return new Promise((resolve) => {
        commit('SET_ID', '')
        commit('SET_NAME', '')
        commit('SET_INFO', {})
        Vue.ls.remove('userId')
      })
    }
  }
}

export default user