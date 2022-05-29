import apiInstance from "@/api";
import { authType } from "@/interfaces";
import { ActionContext, Module } from "vuex";
import { storeType } from "..";

export interface authModuleType {
  isAuthenticated: boolean;
  token: tokenType | null;
}

export interface tokenType {
  refresh: string;
  access: string;
}

const auth: Module<authModuleType, storeType> = {
  namespaced: true,
  state: (): authModuleType => ({
    isAuthenticated: false,
    token: null,
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
    setAuth(state: authModuleType, token: tokenType) {
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    unsetAuth(state: authModuleType) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.setItem("token", JSON.stringify(state.token));
    },
  },
  actions: {
    async login(
      context: ActionContext<authModuleType, storeType>,
      form: authType
    ) {
      const response = await apiInstance.post("/api/account/login", form);
      context.commit("setAuth", response.data);
    },
    async refresh(context: ActionContext<authModuleType, storeType>) {
      const response = await apiInstance.post("/api/account/refresh", {
        refresh: context.state.token?.refresh,
      });
      context.commit("setAuth", response.data);
    },
    async logout(context: ActionContext<authModuleType, storeType>) {
      await apiInstance.post("/api/account/logout", {
        refresh: context.state.token?.refresh,
      });
      context.commit("unsetAuth");
    },
  },
};

export default auth;
