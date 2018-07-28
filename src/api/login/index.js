import request from '../../util/request' ;

export function loginByUsername(data) {
  return request( {
    url: '/login/loginByUsername',
    method: 'post',
    data
  } )
}
export function getUserInfoByToken(data) {
  return request( {
    url: '/login/getUserInfoByToken',
    method: 'post',
    data
  } )
}
