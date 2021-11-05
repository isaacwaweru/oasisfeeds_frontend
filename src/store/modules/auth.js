/* eslint-disable promise/param-names */
import axios from 'axios'
import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS
  } from "../actions/auth";
  import { USER_REQUEST } from "../actions/user";
  const backendUrl = 'http://localhost:4000';  
  const state = {
    token: localStorage.getItem("user-token") || "",
    register_status: "",
    status: "",
    user_id: "",
    hasLoadedOnce: false
  };
  
  const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  };
  
  const actions = {
    [AUTH_REGISTER]: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_REGISTER);
        axios({url: `${backendUrl}/register`, data: user, method: 'POST' })
              .then(resp => {
                localStorage.setItem("user-token", resp.data.token);
                const token = resp.data.token
                axios.defaults.headers.common = {
                    'Authorization': 'Bearer ' + token
                };
                commit(AUTH_REGISTER_SUCCESS, resp);
                resolve(resp)
              })
          .catch(err => {
            reject(err);
          });
      });
    },
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_REQUEST);
        axios({url: `${backendUrl}/login`, data: user, method: 'POST' })
              .then(resp => {
                localStorage.setItem("user-token", resp.data.token);
                const token = resp.data.token
                axios.defaults.headers.common = {
                    'Authorization': 'Bearer ' + token
                };
                commit(AUTH_SUCCESS, resp);
                dispatch(USER_REQUEST);
                resolve(resp)
              })
          .catch(err => {
            commit(AUTH_ERROR, err);
            localStorage.removeItem("user-token");
            reject(err);
          });
      });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
      return new Promise(resolve => {
        commit(AUTH_LOGOUT);
        localStorage.removeItem("user-token");
        resolve();
      });
    }
  };
  
  const mutations = {
    [AUTH_REGISTER]: state => {
      state.status = "loading";
    },
    [AUTH_REGISTER_SUCCESS]: (state, resp) => {
      state.status = "success";
      state.register_status = resp.data.status;
    },
    [AUTH_REQUEST]: state => {
      state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, resp) => {
      state.status = "success";
      state.token = resp.data.token;
      state.user_id = resp.data.user._id;
      state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: state => {
      state.status = "error";
      state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
      state.token = "";
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };
  