//引入路由实例对象
import router from './router' ;
//引入获取token的方法
import { getToken } from "./util/auth";
//引入vuex实例对象
import store from './store' ;

//定义白名单列表 即不需要token也能进入的路由列表
const whiteList = [ '/login', '/403', '/404' ] ;

//调用router的beforeEach对每次的路由跳转进行拦截
router.beforeEach( ( to, from, next ) => {
  //判定当前是否有token值
  if ( getToken() ) {
    //再判定当前是否有对应的角色信息
    if ( store.getters.roles.length ) {
      if ( to.meta.roles && to.meta.roles.length ) {
        //判定当前角色是否有药跳转的路由对象的权限
        if ( to.meta.roles.indexOf( store.getters.roles[ 0 ] ) !== -1 ) {
          //有权限 那么成功跳转
          next()
        } else {
          //todo: 本段逻辑永远不会被执行
          //因为我们对未定义的路由对象进行了优化 即通过*跳转404页面中
          //所以 如果当没有角色信息时候会直接匹配到404的页面中 并不会进入本次逻辑中
          //待改善


          //如果没有对应的权限 那么跳转403界面
          next( '/403' )
        }
      } else {
        //如果当前要跳转的路由对象没有对应的角色要求 那么说明该菜单不需要进行权限验证
        //进行成功跳转
        next() ;
      }
    } else {//如果当前的用户没有对应的角色列表
      //调用token获取角色信息的方法
      store.dispatch( 'getUserInfoByToken', getToken() )
        .then( () => {
          //调用之后获取到对应的角色信息
          if ( to.meta.roles && to.meta.roles.length ) {
            //同理 判定当前要跳转的路由对象是否有跳转的权限要求
            if ( to.meta.roles.indexOf( store.getters.roles[ 0 ] ) !== -1 ) {
              //如果有权限要求 切当前的角色具备权限要求
              //那么就成功跳转
              next()
            } else {
              //如果没有对应的权限 那么跳转404界面
              //todo: 同理 本段逻辑不会被正常值执行
              next( '/404' )
            }
          } else {
            //通过rank不断跳转 确保当前新生成的路由对象添加到vue实例对象中
            next( { ...to, replace: true } ) ;
          }
        } )
        .catch( err => {
          //如果获取角色信息失败 那么就跳往登录页面进行重新登录
          console.log( err ) ;
          next( '/login' ) ;
        } )
    }
  } else {//如果当前没对应的token值
    //那么判定当前要跳转的页面是否在白名单中
    //如果在白名单中 那么成功跳转
    if ( whiteList.indexOf( to.path ) !== -1 ) next() ;
    //如果没有在白名单中 那么就将其都重定向到登录路由中
    next( '/login' ) ;
  }
} ) ;
