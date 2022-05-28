import apiInstance from "@/api";
import { authType } from "@/interfaces";
import { ActionContext, Module } from "vuex";
import { storeType } from "..";

export interface authModuleType {
  isAuthenticated: boolean;
  token: string;
}

const auth: Module<authModuleType, storeType> = {
  namespaced: true,
  state: (): authModuleType => ({
    isAuthenticated: false,
    token: "",
  }),
  mutations: {
    initializeAuth(state: authModuleType) {
      if (localStorage.getItem("token")) {
        state.token = JSON.parse(localStorage.getItem("token")!);
        if (state.token) {
          state.isAuthenticated = true;
        }
      } else {
        localStorage.setItem("token", JSON.stringify(state.token));
      }
    },
    setAuth(state: authModuleType, token: string) {
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    unsetAuth(state: authModuleType) {
      state.token = "";
      state.isAuthenticated = false;
      localStorage.setItem("token", JSON.stringify(state.token));
    },
  },
  actions: {
    async logIn(
      context: ActionContext<authModuleType, storeType>,
      form: authType
    ) {
      const response = await apiInstance.post("/api/token/", form);
      context.commit("setAuth", response.data.auth_token);
    },
  },
};

export default auth;
