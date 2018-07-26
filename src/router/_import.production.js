module.exports = file => {
  try {
    return import( '@/views/' + file ).default ;
  } catch (e) {
    console.log( e ) ;
    return import( '@/views/errorPage/404.vue' ).default ;
  }
}
