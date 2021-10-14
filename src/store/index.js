import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const backendUrl = 'http://localhost:4000';

export default new Vuex.Store({

  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    sendSms: ''
  },

  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, resp){
      state.status = 'success'
      state.token = resp.data.token
      state.user = resp.data.user
    },
    auth_register(state, resp){
      state.status = resp.data.status
      state.user = resp.data.user
    },
    send_sms(state, resp){
      state.sendSms = resp.data.status
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },

  actions: {

    // Login action
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${backendUrl}/login`, data: user, method: 'POST' })
        .then(resp => {
          // const token = resp.data.token
          // const user = resp.data.user
          localStorage.setItem('token', resp.data.token)
          axios.defaults.headers.common['Authorization'] = resp.data.token
          commit('auth_success', resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
  },

  // Register action
  register({commit}, user){
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({url: `${backendUrl}/send/single`, data: user, method: 'POST' })
      .then(resp => {
        console.log(resp);
        // const token = resp.data.token
        // const user = resp.data.user
        // localStorage.setItem('token', resp.data.token)
        // axios.defaults.headers.common['Authorization'] = resp.data.token
        // commit('auth_register', resp)
        // resolve(resp)
        console.log(resp);
      })
      .catch(err => {
        commit('auth_error', err)
        localStorage.removeItem('token')
        reject(err)
      })
    })
  },

  // Send single sms
  sendSingle({commit}, user){
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({url: `${backendUrl}/register`, data: user, method: 'POST' })
      .then(resp => {
        console.log(resp); 
      })
      .catch(err => {
        commit('auth_error', err)
        reject(err)
      })
    })
  },

  // Logout action
  logout({commit}){
    return new Promise((resolve) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
  },

  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },

  modules: {
    
  }
})
