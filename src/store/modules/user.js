import { 
  USER_REQUEST,
  USER_ERROR,
  USER_SUCCESS,
  APP_DETAILS,
  APP_SUCCESS,
  SEND_SMS,
  SENT_SMS,
  APP_KEY,
  APP_KEY_STORE,
  ADD_APP,
  APP_ADDED
  } from "../actions/user";
import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";
import axios from 'axios'

const state = { status: "", profile: {}, app: {}, smsStatus: "", appKey: "", appAdd: '' };


const backendUrl = 'http://localhost:4000'; 

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.firstname,
  getApps: state => state.profile.apps,
  getKey: state => state.appKey,
  getApp: state => state.app
};
const actions = {
  //User detail
  [USER_REQUEST]: ({ commit, dispatch, rootState  }) => {
    return new Promise((resolve, reject) => {
    commit(APP_DETAILS);
    axios({url: `${backendUrl}/users/${rootState.auth.user_id}`, method: 'GET' })
              .then(resp => {
                commit(USER_SUCCESS, resp);
                resolve(resp)
              })
      .catch(err => {
        commit(USER_ERROR, err);
        // if resp is unauthorized, logout, to
        reject(err);
        dispatch(AUTH_LOGOUT);
      });
    });
  },
  //App details
  [APP_KEY]: ({ commit }, key) => {
    commit(APP_KEY_STORE, key);
  },
  //App details
  [APP_DETAILS]: ({ commit, rootState  }, details) => {
    return new Promise((resolve, reject) => {
    axios({url: `${backendUrl}/apps/${rootState.auth.user_id}/${details}`, method: 'GET' })
              .then(resp => {
                commit(APP_SUCCESS, resp);
                resolve(resp)
              })
      .catch(err => {
        reject(err);
      });
    });
  },
  //Send SMS
  [ADD_APP]: ({ commit, dispatch, rootState }, app) => {
    return new Promise((resolve, reject) => {
    axios({url: `${backendUrl}/user/${rootState.auth.user_id}`, data: app, method: 'POST' })
              .then(resp => {
                commit(APP_ADDED, resp);
                if(resp.status === 200){
                  dispatch(APP_DETAILS);
                }
                resolve(resp)
              })
      .catch(err => {
        reject(err);
      });
    });
  },
  //Send SMS
  [SEND_SMS]: ({ commit }, sms) => {
    return new Promise((resolve, reject) => {
    axios({url: `${backendUrl}/send/single`, data: sms, method: 'POST' })
              .then(resp => {
                commit(SENT_SMS, resp);
                resolve(resp)
              })
      .catch(err => {
        reject(err);
      });
    });
  },
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = "success";
    Vue.set(state, "profile", resp.data);
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {};
  },
  [APP_KEY_STORE]: (state, resp) => {
    state.appKey = resp;
  },
  [APP_SUCCESS]: (state, resp) => {
    Vue.set(state, "app", resp.data);
  },
  [APP_ADDED]: (state, resp) => {
    state.appAdd = resp.data.message;
  },
  [SENT_SMS]: (state, resp) => {
    state.smsStatus = resp.data.message;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
