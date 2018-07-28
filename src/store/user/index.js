import { SET_ROUTES } from "../nameSpace" ;
import router, { activeRoutes } from "../../router" ;
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
    addRoutes( { commit }, role ) {
      const routes = filterRoutes( activeRoutes, role ) ;
      commit( SET_ROUTES, routes ) ;
      router.addRoutes( routes ) ;
    }
  }
}
