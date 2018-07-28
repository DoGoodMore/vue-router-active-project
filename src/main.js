//引入vue的核心库
import Vue from 'vue' ;
//引入路由实例对象
import router from './router' ;
//引入根组件
import App from './App.vue' ;

//引入vuex实例对象
import store from './store' ;

import './accessControl' ;
//引入mockJS 模拟获取返回数据
import './mock' ;

//关闭vue的警告信息提示
Vue.config.productionTip = false ;

export default new Vue( {
  router,
  store,
  render: h => h( App )
} ).$mount( '#app' )
