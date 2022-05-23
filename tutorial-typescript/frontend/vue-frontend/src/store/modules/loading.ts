export interface loadingModuleType {
  isLoading: boolean;
}

export default {
  namespaced: true,
  state: (): loadingModuleType => ({
    isLoading: false,
  }),
};
