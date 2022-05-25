export interface loadingModuleType {
  isLoading: boolean;
}

export default {
  namespaced: true,
  state: (): loadingModuleType => ({
    isLoading: false,
  }),
  mutations: {
    setLoading(state: loadingModuleType, status: boolean) {
      state.isLoading = status;
    },
  },
};
