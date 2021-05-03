import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

import currentUser from "./modules/currentUser"
import user from "./modules/user"

export default new Vuex.Store({
   modules: {
      currentUser,
      user
   }
})