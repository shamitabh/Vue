import { Module } from "vuex";
import { storeType } from "..";

export interface loadingModuleType {
  isLoading: boolean;
}

const loading: Module<loadingModuleType, storeType> = {
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

export default loading;
