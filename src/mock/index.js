//引入mockJs 核心依赖包
import Mock from 'mockjs' ;
//引入对应的处理请求的方法对象
import loginApi from './modules/login.js'

//调用mock方法来匹配请求 对匹配成功的请求(通过参数一的正则表达式进行匹配)进行拦截
//对匹配成功的请求调用对应请求处理对象中的对应方法 通过该方法返回对应的数据 模拟真实的通信过程
Mock.mock( /\/login\/loginByUsername/, 'post', loginApi.loginByUsername ) ;

Mock.mock( /\/login\/getUserInfoByToken/, 'post', loginApi.getUserInfoByToken ) ;

//最后暴露mock的实例对象
export default Mock ;
