import { loginByUsername } from "../../api/login" ;
import { SET_TOKEN, SET_ROLES } from '../nameSpace' ;
import { saveToken } from "../../util/auth" ;

export default {
  state: {
    token: '',
    username: '',
    roles: []
  },
  mutations: {
    [ SET_TOKEN ]( state, token ) {
      state.token = token ;
      saveToken( token ) ;
    },
    [ SET_ROLES ]( state, roles ) {
      state.roles = roles ;
    }
  },
  actions: {
    loginByUsername( { commit, dispatch }, userInfo ) {
      const { username, password } = userInfo ;
      if ( !username || !password ) return alert( '请输入正确的账号密码后重试' ) ;
      loginByUsername( { username: 'admin' } )
        .then( res => {
          const { token, roles } = res ;
          commit( SET_TOKEN, token ) ;
          dispatch( 'addRoutes', roles[ 0 ] ) ;
          commit( SET_ROLES, roles ) ;
        } )
        .catch( err => console.log( err ) )
    }
  }
}
