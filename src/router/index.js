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
    redirect: '/login',
  },
  {
    path: '/login',
    component: _import( 'login' )
  },
  {
    path: '/home',
    component: _import( 'home' )
  },
  {
    path: '/403',
    component: _import( 'errorPage/403.vue' )
  }
] ;

//定义需要动态添加的路由列表
export const activeRoutes = [
  {
    path: '/test_1',
    component: _import( 'test_1' ),
    meta: {
      title: 'test_1',
      roles: [ '' ]
    }
  },
  {
    path: '/test_2',
    component: _import( 'test_2' ),
    meta: {
      title: 'test_2',
      roles: [ 'admin' ]
    }
  },
  {
    path: '/test_3',
    component: _import( 'test_3' ),
    meta: {
      title: 'test_3',
      roles: [ 'admin' ]
    }
  },
  {
    path: '/test_4',
    component: _import( 'test_4' ),
    meta: {
      title: 'test_4',
      roles: [ 'admin' ]
    }
  },
  {
    path: '/test_5',
    component: _import( 'test_5' ),
    meta: {
      title: 'test_5',
      roles: [ 'admin' ]
    }
  }
] ;


export default new Router( {
  routes
} )
