export default ({ app, store }) => {
    app.router.beforeEach((to, from, next) => {
      if (store.state.accessDenied) {
        store.commit('SET_ACCESS_DENIED', false); // Reseta a flag
        next('/acessonegado');
      } else {
        next();
      }
    });
  };