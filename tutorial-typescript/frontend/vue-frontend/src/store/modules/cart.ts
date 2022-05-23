import { cartItemType, cartType } from "@/interfaces";

export interface cartModuleType {
  cart: cartType;
}

export default {
  namespaced: true,
  state: (): cartModuleType => ({
    cart: {
      items: [],
    },
  }),
  mutations: {
    initializeStore(state: cartModuleType) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart")!);
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    addToCart(state: cartModuleType, item: cartItemType) {
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
};
