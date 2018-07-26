//引入vue的核心库
import Vue from 'vue' ;
//引入路由实例对象
import router from './router' ;
//引入根组件
import App from './App.vue' ;

//关闭vue的警告信息提示
Vue.config.productionTip = false ;

export default new Vue( {
  router,
  render: h => h( App )
} ).$mount( '#app' )
