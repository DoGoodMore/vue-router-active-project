import router from './router' ;
import { getToken } from "./util/auth";
import store from './store' ;

const whiteList = [ '/login', '/403', '/404' ] ;

router.beforeEach( ( to, from, next ) => {
  console.log( to ) ;
  if ( getToken() ) {
    if ( store.getters.roles.length ) {
      if ( to.meta.roles && to.meta.roles.length ) {
        /*to.meta.roles.indexOf( store.getters.roles[ 0 ] ) !== -1 ?
          next() : next( '/403' ) ;*/
        if ( to.meta.roles.indexOf( store.getters.roles[ 0 ] ) !== -1 ) {
          console.log( 111 ) ;
          next()
        } else {
          console.log( '22222222' ) ;
          next( '/403' )
        }
      } else {
        next() ;
      }
    } else {
      //如果当前没有获取到对应的角色信息 发送token 获取到对应的角色信息
      store.dispatch( 'getUserInfoByToken', getToken() )
        .then( () => {
          if ( to.meta.roles && to.meta.roles.length ) {
            /*to.meta.roles.indexOf( store.getters.roles[ 0 ] ) !== -1 ?
              next() : next( '/403' )*/
            if ( to.meta.roles.indexOf( store.getters.roles[ 0 ] ) !== -1 ) {
              console.log( 111 ) ;
              next()
            } else {
              console.log( '22222222' ) ;
              next( '/403' )
            }
          } else {
            console.log( 343333333 ) ;
            next( { ...to, replace: true } ) ;
          }
        } )
        .catch( err => {
          console.log( err ) ;
          next( '/login' ) ;
        } )
    }
  } else {
    // if ( whiteList.indexOf( to.path ) !== -1 ) next() ;
    if ( to.meta.roles === undefined ) next() ;
  }
} ) ;
