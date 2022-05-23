import { createStore } from "vuex";
import auth, { authModuleType } from "./modules/auth";
import cart, { cartModuleType } from "./modules/cart";
import loading, { loadingModuleType } from "./modules/loading";

export interface storeType {
  loading: loadingModuleType;
  cart: cartModuleType;
  auth: authModuleType;
}

export default createStore<storeType>({
  modules: { loading, cart, auth },
});
