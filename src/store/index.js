import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import auth from "./modules/auth";
import VuexPersistence from 'vuex-persist';
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    user,
    auth
  },
  plugins: [vuexLocal.plugin],
  strict: debug
});
