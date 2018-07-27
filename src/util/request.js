import axios from 'axios' ;
import { paramsMethod } from "./auth" ;

const service = axios.create( {
  baseURL: process.env.BASE_API,
  timeout: 4000
} ) ;

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
