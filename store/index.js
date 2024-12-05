export const state = () => ({
  // Defina o estado inicial do Vuex aqui, se necessário
  accessDenied: false
});

export const mutations = {
  // Defina as mutações do Vuex aqui, se necessário
  SET_ACCESS_DENIED(state, value) {
    state.accessDenied = value;
  }
};

export const actions = {
  // Defina as ações do Vuex aqui, se necessário
}