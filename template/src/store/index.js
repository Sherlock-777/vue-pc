import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'

import createLogger from 'vuex/dist/logger'

import api from '@/libs/api'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// global state
const state = {
  count: 0,
  todos: [
    { id: 1, text: '...', done: true },
    { id: 2, text: '...', done: false }
  ]
}

// global actions
const actions = {
  async userLogin ({ commit }) {
    let res = await api.auth.login({ name: 'admin', pass: '123456' }, {
      loading: 'body'
    })
    commit('user', res)
  }
}

// global mutations
const mutations = {
  increment (state) {
    state.count++
  },
  user (state, payload) {
    state.user = payload
  }
}

// global getters
const getters = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  }
}

const modules = {
  cart
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  modules,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
