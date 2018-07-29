//引入axios的依赖包
import axios from 'axios' ;
import { paramsMethod } from "./auth" ;

//调用axios的create方法 生成对应的请求公共的请求方法
const service = axios.create( {
  baseURL: process.env.BASE_API,
  timeout: 4000
} ) ;

/*
//拦截当前的发送请求
//并修改对应的请求参数的数据结构
//即通过请求对参数的重写 让其每次请求时带上对应的参数和token值
export function paramsMethod(url, data) {
  return JSON.stringify( {
    url,
    token: getToken() || '',
    data
  } )
}
*/

service.interceptors.request.use( config => {
  return Object.assign( config, {
    data: paramsMethod( config.url.replace( config.baseURL, '' ), config.data )
  } ) ;
}, err => {
  console.log( err ) ;
  Promise.reject( err ) ;
} ) ;

service.interceptors.response.use( response => {
  //在这里对返回的数据进行统一的处理
  return response.data ;
}, err => {
  console.log( err ) ;
  Promise.reject( err ) ;
} ) ;

export default service ;
