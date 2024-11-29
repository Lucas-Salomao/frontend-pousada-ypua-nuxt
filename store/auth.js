import Cookies from 'js-cookie';

export const state = () => ({
  loggedIn: false,
  user: null
});

export const mutations = {
  SET_LOGGED_IN(state, value) {
    state.loggedIn = value;
  },
  SET_USER(state, data) {
    state.user = data;
  }
};

export const actions = {
  logout({ commit }) {
    localStorage.removeItem('auth._token.local');
    Cookies.remove('auth._token.local');

    commit('SET_LOGGED_IN', false);
    commit('SET_USER', null);
  }
};