import { cartItemType, stateType } from "@/interfaces";
import { createStore } from "vuex";

export default createStore<stateType>({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: "",
    isLoading: false,
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart")!);
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    addToCart(state, item: cartItemType) {
      const exists = state.cart.items.find(
        (cartItem) => cartItem.product.id === item.product.id
      );

      if (exists) {
        exists.quantity = exists.quantity + item.quantity;
      } else {
        state.cart.items.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
  actions: {},
});
