export interface authModuleType {
  isAuthenticated: boolean;
  token: string;
}

export default {
  namespaced: true,
  state: (): authModuleType => ({
    isAuthenticated: false,
    token: "",
  }),
};
