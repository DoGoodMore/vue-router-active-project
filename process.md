#### 1.输入命令行vue init webpack vue-router-active-project
      (该操作需要全局安装vue-cli)

#### 2.在项目目录中安装项目相关的依赖文件( npm install )

#### 3.清空src目录( 附文件目录图 )

#### 4.重新创建vue项目所必需的目录和文件等
* 创建main.js
  ```
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
  ```
* 创建router目录 router.js ( *_import.js )
  ```
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
      redirect: '/home'
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

  ```
  ```
  //_import.development.js
  module.exports = file => {
    try {
      return require( '@/views/' + file ).default ;
    } catch (e) {
      console.log( e ) ;
      return require( '@/views/errorPage/404.vue' ).default ;
    }
  } ;
  ```

* 创建views( 对应所需要渲染的组件文件夹 )

  ![avatar](./static/pics/views文件结构.jpg)
* 创建App.vue ( 用户渲染vue实例的根组件 )
  ```
  <template>
      <router-view></router-view>
  </template>

  <script>
      export default {
          name: "App"
      }
  </script>

  <style scoped>

  </style>

  ```
