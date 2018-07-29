//引入vue核心库
import Vue from 'vue' ;
//引入vuex核心库
import Vuex from 'vuex' ;

//引入我们定义的对应的模块
import user from './user' ;
import login from './login' ;
//引入对应的getters
import getters from './getters' ;

//声明使用vuex
Vue.use( Vuex ) ;

//暴露对应的vuex实例对象
export default new Vuex.Store( {
  modules: {
    user,
    login
  },
  getters
} )
