//引入vue核心库
import Vue from 'vue' ;
//引入vue-router 核心库
import Router from 'vue-router' ;

//引入动态引入对应组件的方法
export const _import = require( './_import.' + process.env.NODE_ENV ) ;

//声明使用vue-router插件
Vue.use( Router ) ;

//创建路由对象集合
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: _import( 'login' )
  },
  {
    path: '/home',
    component: _import( 'home' )
  }
] ;
export default new Router( {
  routes
} )
