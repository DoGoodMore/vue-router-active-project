import Mock from 'mockjs' ;
import loginApi from './modules/login.js'


Mock.mock( /\/login\/loginByUsername/, 'post', loginApi.loginByUsername ) ;

export default Mock ;
