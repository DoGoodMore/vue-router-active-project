//引入对应的命名空间中的属性名称
import { SET_ROUTES } from "../nameSpace" ;
//引入路由实例对象 以及预先定义好的动态路由列表
import router, { activeRoutes } from "../../router" ;
//引入路由菜单过滤的工具类函数
import { filterRoutes } from "../../util/auth" ;

export default {
  state: {
    routes: []
  },
  mutations: {
    [ SET_ROUTES ]( state, routes ) {
      state.routes = routes ;
    }
  },
  actions: {
    /*
    递归调用进行数组的过滤 将有对应权限的路由对象返回
    export function filterRoutes(routes, role) {
      if ( routes && routes.length ) {
        return routes.filter( item => {
          if ( item.children && item.children.length ) {
            filterRoutes( item.children, role ) ;
          }
          return item.meta.roles.indexOf( role ) !== -1 ;
        } )
      }
      return [] ;
    }
    */
    addRoutes( { commit }, role ) {
      //通过调用过滤的工具类函数 对动态的路由菜单进行筛选
      const routes = filterRoutes( activeRoutes, role ) ;
      //将生成之后的数组对象保存在状态管理中
      commit( SET_ROUTES, routes ) ;
      //调用路由实例对象addRoutes方法 动态添加可访问的路由列表
      router.addRoutes( routes ) ;
    }
  }
}
