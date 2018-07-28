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
          next()
        } else {
          //todo: 本段逻辑永远不会被执行
          next( '/403' )
        }
      } else {
        next() ;
      }
    } else {
      store.dispatch( 'getUserInfoByToken', getToken() )
        .then( () => {
          if ( to.meta.roles && to.meta.roles.length ) {
            if ( to.meta.roles.indexOf( store.getters.roles[ 0 ] ) !== -1 ) {
              next()
            } else {
              //todo: 同理 本段逻辑不会被正常值执行
              next( '/404' )
            }
          } else {
            next( { ...to, replace: true } ) ;
          }
        } )
        .catch( err => {
          console.log( err ) ;
          next( '/login' ) ;
        } )
    }
  } else {
    if ( whiteList.indexOf( to.path ) !== -1 ) next() ;
    next( '/login' ) ;
  }
} ) ;
