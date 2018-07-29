//引入对应发送请求通信的方法
import { loginByUsername, getUserInfoByToken } from "../../api/login" ;
//引入了命名空间的变量属性
import { SET_TOKEN, SET_ROLES } from '../nameSpace' ;
//引入了保存服务器返回token值的工具类方法
import { saveToken } from "../../util/auth" ;
//引入了vue-router实例对象
import router from '../../router' ;

//将当前模块暴露
export default {
  //当前模块中存储的对应的state对象
  state: {
    //token值 初始为空串
    token: '',
    //用户名
    username: '',
    //角色列表 初始值为空
    roles: []
  },
  mutations: {//定义不同的mutation 用于改变上述中对应的属性的值
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
      //获取到用户输入的账号和用户名
      const { username, password } = userInfo ;
      //对是否为空进行验证 如果没有传入 那么将直接返回
      if ( !username || !password ) return alert( '请输入正确的账号密码后重试' ) ;
      //通过用户的输入进行请求的通信
      loginByUsername( { username: 'admin' } )
        //获取返回的数据
        .then( res => {
          //获取到token和角色列表
          const { token, roles } = res ;
          //将当前的token保存在状态管理中
          commit( SET_TOKEN, token ) ;
          //根据当前的角色信息生成对应的可访问的路由菜单列表
          dispatch( 'addRoutes', roles[ 0 ] ) ;
          //将当前的角色信息保存在状态管理中
          commit( SET_ROLES, roles ) ;
          //然后进行路由的跳转 跳转到主页界面中
          router.push( '/home' )
        } )
        .catch( err => console.log( err ) )
    },
    //通过token进行通信并拉取到对应的用户的角色信息
    getUserInfoByToken( { commit, dispatch }, token ) {
      return new Promise( ( resolve, reject ) => {
        //对token值是否为空进行判定 如果传入的token为空 那么直接返回
        if ( !token ) reject( 'token值不能为空' ) ;
        //发送请求拉取到对应的角色信息
        getUserInfoByToken( { token } )
          .then( res => {
            //获取到对应的数据
            const { token, roles } = res ;
            //同理 保存到全局的状态管理中
            commit( SET_TOKEN, token ) ;
            //生成对应的路由菜单列表
            dispatch( 'addRoutes', roles[ 0 ] ) ;
            //保存当前的角色到状态管理中
            commit( SET_ROLES, roles ) ;
            //调用resolve进入下一步流程
            resolve() ;
          } )
      } )
    }
  }
}
