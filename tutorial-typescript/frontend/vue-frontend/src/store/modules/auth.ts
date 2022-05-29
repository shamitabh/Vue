import apiInstance from "@/api";
import { authType } from "@/interfaces";
import { ActionContext, Module } from "vuex";
import { storeType } from "..";

export interface authModuleType {
  isAuthenticated: boolean;
  token: tokenType | null;
  username: string;
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
    username: "",
  }),
  mutations: {
    initializeAuth(state: authModuleType) {
      if (localStorage.getItem("token")) {
        state.token = JSON.parse(localStorage.getItem("token")!);
        state.username = JSON.parse(localStorage.getItem("username")!);
        if (state.token) {
          state.isAuthenticated = true;
        }
      } else {
        localStorage.setItem("token", JSON.stringify(state.token));
        localStorage.setItem("username", JSON.stringify(state.username));
      }
    },
    setAuth(
      state: authModuleType,
      payload: { token: tokenType; username?: string }
    ) {
      state.token = payload.token;
      if (payload.username) {
        state.username = payload.username;
      }
      state.isAuthenticated = true;
      localStorage.setItem("token", JSON.stringify(state.token));
      localStorage.setItem("username", JSON.stringify(state.username));
    },
    unsetAuth(state: authModuleType) {
      state.token = null;
      state.username = "";
      state.isAuthenticated = false;
      localStorage.setItem("token", JSON.stringify(state.token));
      localStorage.setItem("username", JSON.stringify(state.username));
    },
  },
  actions: {
    async login(
      context: ActionContext<authModuleType, storeType>,
      form: authType
    ) {
      const response = await apiInstance.post("/api/account/login", form);
      context.commit("setAuth", {
        token: response.data,
        username: form.username,
      });
    },
    async refresh(context: ActionContext<authModuleType, storeType>) {
      const response = await apiInstance.post("/api/account/refresh", {
        refresh: context.state.token?.refresh,
      });
      context.commit("setAuth", { token: response.data });
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
