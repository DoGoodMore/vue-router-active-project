import Vue from 'vue' ;
import Vuex from 'vuex' ;

import user from './user' ;
import login from './login' ;
import getters from './getters' ;

Vue.use( vuex ) ;

export default new Vuex.Store( {
  modules: {
    user,
    login
  },
  getters
} )
