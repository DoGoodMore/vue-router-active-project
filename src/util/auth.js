export const TokenKey = '__token__' ;

export function getToken() {
  return window.sessionStorage.getItem( TokenKey ) ;
}

export function paramsMethod(url, data) {
  return JSON.stringify( {
    url,
    token: getToken() || '',
    data
  } )
}

export function saveToken( token ) {
  return window.sessionStorage.setItem( TokenKey, token )
}

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
