import Mock from 'mockjs' ;
import loginApi from './modules/login.js'


Mock.mock( /\/login\/loginByUsername/, 'post', loginApi.loginByUsername ) ;

Mock.mock( /\/login\/getUserInfoByToken/, 'post', loginApi.getUserInfoByToken ) ;

export default Mock ;
